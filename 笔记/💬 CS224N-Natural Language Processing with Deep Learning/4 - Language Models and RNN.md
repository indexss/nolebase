# Language Models and RNN
## 训练Trick

这一部分大多是克服过拟合的。对过拟合更深刻的解释，可以看这篇文章 https://arxiv.org/abs/1912.02292
我已经做过解读，链接 [Deep Double Descent Where Bigger Models and More Data Hurt](../🧐%20读读paper/Deep%20Double%20Descent%20Where%20Bigger%20Models%20and%20More%20Data%20Hurt.md)
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

## Language Modeling
总的来说，Language Model是一种预测下一个词是什么的模型。
![](assets/Pasted%20image%2020241120143356.webp)
