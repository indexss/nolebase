# Language Models and RNN
## 训练Trick

这里的内容是讲一些克服过拟合的trick的，但OpenAI的结果显示，其实不存在所谓的过拟合，存在double descent。我在里面也讨论了下面trick的内容。
论文链接： https://arxiv.org/abs/1912.02292
而这篇paper我已经做过解读，可以参考： [Deep Double Descent Where Bigger Models and More Data Hurt](../🧐%20读读paper/Deep%20Double%20Descent%20Where%20Bigger%20Models%20and%20More%20Data%20Hurt.md)  
### 使用正则化应对过拟合
$$J(\theta)=\frac{1}{N}\sum_{i=1}^{N}-\log\left(\frac{e^{f_{y_i}}}{\sum_{c=1}^{C}e^{f_c}}\right)\boxed{+\lambda\sum_{k}\theta_k^2}$$
**经典观点：**
这个是L2正则。L2正则的原理就是，当我们去argmin theta J的时候，前半部分缩小是没有问题的。后半部分的正则项，如果想要小，那么每个theta都不能太大，这就会让theta整体趋于小，也就是说，不让某个神经元过于敏感，从而防止过拟合的发生。

**目前观点：**

> [!warning] ⚠️ 过拟合的奇怪表述
这里有个很怪的说法，slide认为训练集的误差接近0就叫过拟合，我认为不是，我认为过拟合是一个相对概念，train降test升才叫过拟合，单看train降到0也不能叫过拟合，但是为了展示这个观点，我把观点放在这。

目前观点认为，正则化只是增加模型的泛化性，和过拟合没关系，即使你疯狂过拟合（这里指train loss接近0），你的test也可以降，因为你家了正则。
下面的图，横轴是模型规模。

![](assets/Pasted%20image%2020241120070209.webp)


### 使用Dropout应对过拟合
训练时按照p的概率使得神经元输入为0，测试时输出乘以1-p。最后乘1-p是因为p是drop的概率，所以1-p就是不drop，也就是期望。
![](assets/Pasted%20image%2020241120071517.webp)
这种每次屏蔽一部分神经元的方法，可以避免模型中神经元共适应(co adaptation)
为什么dropout有效呢？原因是，
- 很多时候特征是互相依赖的。如果所有的神经元都有效，那么神经元可能会过度依赖这种关系从而过拟合。通过随机屏蔽的方法，可以让特征独立地发挥作用，减少对依赖关系的利用，从而增强泛化性。所以dropout也被看成是特征依赖的强正则化。
- 另一方面，dropout相当于训练了多个子模型，并进行了集成，降低了单一模型过拟合训练数据的风险
- 在测试时通过权重调整整合子模型的能力。

### 权重初始化
如果权重全部设置为0，那么输出一样，就会学到相同的特征。
所以就会有下面的方法：
- w都随机成小随机数
- 对于隐藏层的b，设置为0，对于输出层，也就是最后一层的b，设置成结果的平均值，或者avg(sigmoid^-1(结果))
- 把所有w按照uniform(-r, r)生成。r别太小太大
- Xavier 初始化确保输入层和输出层的激活值具有相同的方差，从而避免梯度消失或梯度爆炸问题。这有助于减缓梯度消失或爆炸问题，特别是在深层网络中。var为方差，n为神经元数量。
$$\mathrm{Var}(W_i)=\frac2{n_\mathrm{in}+n_\mathrm{out}}$$
- 随着层归一化Layer Normalization的应用，对这些初始化技巧的需求可能会减少。

### Optimizer
对于大多数优化器，建议的初始学习率是 0.001。
- SGD **足够好用** ，但手动调整学习率对于获得良好效果至关重要。学习率初始值可以设置得较高（例如 0.1 或 0.01）。随着训练的进行，每隔 k 个 epoch 将学习率减半，以应对损失函数的下降。
- Adagrad能够自动调整参数的学习率，适合稀疏特征问题。但容易“早停”（stall early），即后期学习率会过小，导致训练停滞。
- RMSprop改进了 Adagrad，控制了学习率的衰减速度，更适合深度学习中的长时间训练。
- Adam结合了 Adagrad 和 RMSprop 的优点，适合大多数任务，是许多场景下的默认选择。
- AdamW考虑了权重衰减的优化（weight decay），更适合大型模型。
- NAdamW在 AdamW 基础上引入了 Nesterov 动量加速，更适合语言模型（如词向量）和速度要求较高的场景。

## Language Model
### Intro
总的来说，Language Model是一种预测下一个词是什么的模型。
![](assets/Pasted%20image%2020241120143356.webp)
如果更正式的写，就是这样：
$$P(\boldsymbol{x}^{(t+1)}|\boldsymbol{x}^{(t)},\ldots,\boldsymbol{x}^{(1)})$$
xt是前面的词，而xt+1可以是语料库V里面的任何一个词。
语言模型也可以这样解释：LM是一个系统，可以为一句话分配概率。
例如，如果我们有一句话x1 ... xT, 那么这句话的概率就是：
$$\begin{aligned}P(\boldsymbol{x}^{(1)},\ldots,\boldsymbol{x}^{(T)})&=P(\boldsymbol{x}^{(1)})\times P(\boldsymbol{x}^{(2)}|\boldsymbol{x}^{(1)})\times\cdots\times P(\boldsymbol{x}^{(T)}|\boldsymbol{x}^{(T-1)},\ldots,\boldsymbol{x}^{(1)})\\&=\prod_{t=1}^TP(\boldsymbol{x}^{(t)}|\boldsymbol{x}^{(t-1)},\ldots,\boldsymbol{x}^{(1)})\end{aligned}$$
而这就是LM的核心功能。你通过条件概率的链式法则把一个概率拆解成下面的联乘形式后，语言模型的作用就体现在给定前面的词x1 - xt-1, 预测xt的概率。

这里就是LM的一个应用：
![](assets/Pasted%20image%2020241121202140.webp)


### n-gram Language Model

n-gram LM 是在DL出现之前最常用的一种语言模型。 n-gram是由 **n 个连续单词** 组成的单词块。
例如句子The students opened their \_\_\_\_\_
1-gram: “the”, “students”, “opened”, “their”
2-gram: “the students”, “students opened”, “opened their”
3-gram: “the students opened”, “students opened their”
4-gram: “the students opened their”

想法就是，收集关于不同n-gram的频率统计数据，并利用这些数据来预测下一个单词。

n-gram有一个假设，叫做Markov assumption: 每个单词 x(t+1)的出现只依赖于前面 n−1个单词，而不依赖更久远的上下文。n是n-gram的n
$$P(x^{(t+1)}|x^{(t)},x^{(t-1)},\ldots,x^{(1)})=P(x^{(t+1)}|x^{(t)},x^{(t-1)},\ldots,x^{(t-n+2)})$$
而根据条件概率的公式，我们有：
$$P(x^{(t+1)}|x^{(t)},x^{(t-1)},\ldots,x^{(t-n+2)})=\frac{P(x^{(t+1)},x^{(t)},\ldots,x^{(t-n+2)})}{P(x^{(t)},x^{(t-1)},\ldots,x^{(t-n+2)})}$$
那我们怎么得到n-gram和(n-1)-gram的联合概率呢？用大型语料库中的**频率估计概率**：
$$P(x^{(t+1)}|x^{(t)},\ldots,x^{(t-n+2)})\approx\frac{\mathrm{count}(x^{(t+1)},x^{(t)},\ldots,x^{(t-n+2)})}{\mathrm{count}(x^{(t)},x^{(t-1)},\ldots,x^{(t-n+2)})}$$
例子：
![](assets/Pasted%20image%2020241121203208.webp)
那么在这个例子中，语料库中student open there book 是400次比 student open their exams是100次，所以4-gram LM选择book为w。
但是如果联系更前面的上文，我们知道proctor是监考员，所以应该选择exam。这是n-gram的问题之一。接下来我们来讨论n-gram的问题：

#### 问题1: 稀疏性问题 (Sparsity Problems)
问题1: 如果分子从来没有出现过怎么办？
$$P(w|\text{students opened their})=\frac{\mathrm{count}(\text{students opened their }w)}{\mathrm{count}(\text{students opened their})}=0$$
引入 **平滑技术 (Smoothing)**，从而让模型可以处理所有分子不存在的情况。
$$\mathrm{count}(w)\to\mathrm{count}(w)+\delta $$
问题2: 如果分母从来没有出现过怎么办？
$$P(w|\text{students opened their})=\frac{\mathrm{count}(\text{students opened their }w)}{\mathrm{count}(\text{students opened their})}=\frac{?}0$$
可以用**backoff**策略。回退上下文。
$$P(w|\text{students opened their})\approx P(w|\text{opened their})$$
实际上，n 越大，n-gram 的组合数量呈指数增长，导致数据稀疏性加剧。通常n 不会取太大值（通常不超过 5），否则模型的稀疏性问题会难以解决。

#### 问题2: 储存问题(Storage Problems)
如果你的语料库有V个词，那么可能的n-gram就有 $V^n$ 种，那么V变大，需要存储的模式就更多。

实际中，一个3-gram的LM的效果是这样的：

> today the price of gold per ton , while production of shoe lasts and shoe industry , the bank intervened just after it considered and rejected an imf demand to rebuild depleted european stocks , sept 30 end primary 76 cts a share .

语法大概没问题，但是不连贯，所以考虑想要用神经网络。


### Fixed-window Neural Language Model
无稀疏性问题，也没有存储问题。
但有新问题：窗口永远不够大，且由于每个词在的位置不一样，每个词被处理的权重也不一样，这不一定是一个缺点，就是在这里提一下。
![](assets/Pasted%20image%2020241121205107.webp)
### RNN
以前学过，这里简单聊一下。首先就是一个简单的例子：

![](assets/Pasted%20image%2020241121205521.webp)
RNN优点：任意长度都可以处理，且所有长度的W维度都一样。每个时间步词的处理都是对称的。
缺点：慢，且难以利用很长时间步以前的内容。这些缺点将会在后面详谈。


#### 如何训练RNN？
拿一个大文字语料库 $\boldsymbol{x}^{(1)},\ldots,\boldsymbol{x}^{(T)}$ 喂给RNN, 得到每一个时间步的输出分布 $\hat{y}^{(t)}$ , $\hat{y}^{(t)}$ 向量的每一位都是一个概率。
然后和ground truth, one-hot向量 $y^{(t)}$ 算cross-entropy:
$$J^{(t)}(\theta)=CE(\boldsymbol{y}^{(t)},\hat{\boldsymbol{y}}^{(t)})=-\sum_{w\in V}\boldsymbol{y}_w^{(t)}\log\hat{\boldsymbol{y}}_w^{(t)}=-\log\hat{\boldsymbol{y}}_{\boldsymbol{x}_{t+1}}^{(t)}$$
而整个训练集上的loss就是这样：
$$J(\theta)=\frac1T\sum_{t=1}^TJ^{(t)}(\theta)=\frac1T\sum_{t=1}^T-\log\hat{\boldsymbol{y}}_{\boldsymbol{x}_{t+1}}^{(t)}$$
训练的示意图如下：
![](assets/Pasted%20image%2020241121232526.webp)

这里面存在一个叫Teaching Forcing的技巧，或者叫训练与测试的差距：
就比如说，当我们给出the这个词的时候，我们输出的东西是y1hat, 输出的hidden state是h1，但是问题就是，真实场景中，我们应当拿y1hat作为x2输入，而不是ground truth x2，students。在这里输入ground truth x可以快速帮助模型训练，防止错误累积，导致模型训练不稳定。
**但Teaching Forth其实也存在潜在问题。** 在测试阶段，模型需要使用自己预测的结果作为下一步的输入，这可能与训练阶段的行为不一致，从而影响性能。

[test1121](test1121.pdf)
