---
tags:
  - NLP
  - AI
  - DL
  - ML
---
# Sequence to Sequence Models and Machine Translation
## 特征值推导 Vanilla RNN的梯度消失问题
![](assets/Pasted%20image%2020241123045744.webp)
复习一下上次的知识。当J4想要对Wh求导的时候，由于Wh在第一步到第四步是共享的，所以是J对wh|i的加和：
 $$
 \frac{\partial J^{(4)}}{\partial W_h}=\frac{\partial J^{(4)}}{\partial W_h}|_{(4)}+\frac{\partial J^{(4)}}{\partial W_h}|_{(3)}+\frac{\partial J^{(4)}}{\partial W_h}|_{(2)}+\frac{\partial J^{(4)}}{\partial W_h}|_{(1)}$$
而当我们要计算 $\frac{\partial J^{(4)}}{\partial W_h}|_{(1)}$ 的时候，会被break down为：
$$
\frac{\partial J^{(4)}}{\partial W_h}|_{(1)} = \frac{\partial J^{(4)}}{\partial h_1} \cdot \frac{\partial h_1}{\partial W_h}
$$
这里面就要用到 $\frac{\partial J^{(4)}}{\partial h_1}$ 。而经过上图可以看到，这个玩意的计算有一条长长的h联乘。
那么 $\frac {\partial h^{(t)}} {\partial h^{(t-1)}}$ 怎么算呢？
我们知道ht的计算公式：
$$\boldsymbol{h}^{(t)}=\sigma\left(\boldsymbol{W}_h\boldsymbol{h}^{(t-1)}+\boldsymbol{W}_x\boldsymbol{x}^{(t)}+\boldsymbol{b}_1\right)$$
那么就是：
$$\frac{\partial\boldsymbol{h}^{(t)}}{\partial\boldsymbol{h}^{(t-1)}}=\operatorname{diag}\left(\sigma^{\prime}\left(\boldsymbol{W}_h\boldsymbol{h}^{(t-1)}+\boldsymbol{W}_x\boldsymbol{x}^{(t)}+\boldsymbol{b}_1\right)\right)\boldsymbol{W}_h$$
为什么会出现diag？慢慢来. 我们令：
$$z = \sigma\left(\boldsymbol{W}_h\boldsymbol{h}^{(t-1)}+\boldsymbol{W}_x\boldsymbol{x}^{(t)}+\boldsymbol{b}_1\right)$$
$$
h^{(t)} = \sigma\left( z \right)
$$
那么
$$\frac{\partial\boldsymbol{h}^{(t)}}{\partial\boldsymbol{h}^{(t-1)}}=\frac{\partial\boldsymbol{h}^{(t)}}{\partial\boldsymbol{z}^{(t)}}\cdot\frac{\partial\boldsymbol{z}^{(t)}}{\partial\boldsymbol{h}^{(t-1)}}$$
后半部分好说，就是Wh, 前半部分呢？由于sigma是逐个用在元素上的，所以h向量对z向量的偏导，就是一个jacobian矩阵：
$$\frac{\partial\boldsymbol{h}^{(t)}}{\partial\boldsymbol{z}^{(t)}}=\begin{bmatrix}\sigma^{\prime}(z_{1}^{(t)})&0&\cdots&0\\0&\sigma^{\prime}(z_{2}^{(t)})&\cdots&0\\\\0&0&\cdots&\sigma^{\prime}(z_{n}^{(t)})\end{bmatrix}=\operatorname{diag}(\sigma^{\prime}(\boldsymbol{z}^{(t)}))$$
所以就有上面的diag。
之后，为了简便运算，我们将sigma看为线形的恒等函数，那么diag就变成了eye矩阵了。所以有
$$\begin{aligned}\frac{\partial\boldsymbol{h}^{(t)}}{\partial\boldsymbol{h}^{(t-1)}}&=\mathrm{diag}\left(\sigma^{\prime}\left(\boldsymbol{W}_h\boldsymbol{h}^{(t-1)}+\boldsymbol{W}_x\boldsymbol{x}^{(t)}+\boldsymbol{b}_1\right)\right)\boldsymbol{W}_h\\&=\boldsymbol{I}\boldsymbol{W}_h=\boldsymbol{W}_h\end{aligned}$$
之后，根据距离，就会有指数的堆积：
$$\begin{aligned}
\frac{\partial J^{(i)}(\theta)}{\partial\boldsymbol{h}^{(j)}}& =\frac{\partial J^{(i)}(\theta)}{\partial\boldsymbol{h}^{(i)}}\prod_{j\boldsymbol{<}t\leq i}\frac{\partial\boldsymbol{h}^{(t)}}{\partial\boldsymbol{h}^{(t-1)}} \\
&=\frac{\partial J^{(i)}(\theta)}{\partial\boldsymbol{h}^{(i)}}\prod_{j<t\leq i}\boldsymbol{W}_h=\frac{\partial J^{(i)}(\theta)}{\partial\boldsymbol{h}^{(i)}}\boxed{\boldsymbol{W}_h^\ell}
\end{aligned}$$
然而，你没法说Wh small，这是不严谨的，所以其实还能往下推。首先回忆一下特征值。对于矩阵$W_h$，如果存在一个非零向量$q_i$和一个标量$\lambda_i$ s.t.
$$W_hq_i=\lambda_iq_i$$
那么$\lambda_i$就是$W_h$的特征值，$q_i$就是特征向量。几何意义是，这表示矩阵$W_h$​ 在特征向量方向 $q_i$​ 上只会缩放，不会改变方向，缩放因子是特征值 $\lambda_i$。
那么就有
$$W_h^\ell q_i=\lambda_i^\ell q_i$$
这很直观。接着，对于任意向量x，其实都可以被q线性表示:
$$x=\sum_{i=1}^nc_iq_i$$
于是就有：
$$W_h^\ell x=W_h^\ell\left(\sum_{i=1}^nc_iq_i\right) = \sum_{i=1}^nc_iW_h^\ell q_i = \sum_{i=1}^nc_i\lambda_i^\ell q_i$$
所以，我们说Wh小，不是说Wh某个元素小，而是特征值小。这样就能看出梯度消失：
$$\frac{\partial J^{(i)}(\theta)}{\partial\boldsymbol{h}^{(i)}}\boldsymbol{W}_h^\ell=\sum_{i=1}^nc_i\boxed{\lambda_i^\ell}\boldsymbol{q}_i\approx\boldsymbol{0}\text{ (for large }\ell)$$
这里我们把激活函数看成线形的了，但如果不是线性的，特征值的放缩仍然起主导作用。特征值需满足 $|\lambda_i|<\gamma$ ,gamma是激活函数相关常数。
最后，这就导致了远处的梯度信号丢失，因为它比近处的梯度信号要小得多。因此，模型权重基本上只针对近效果进行更新，而不是长期效果。
如何解决呢？在vanilla RNN中，hidden state不断被重写：
$$\boldsymbol{h}^{(t)}=\sigma\left(\boldsymbol{W}_h\boldsymbol{h}^{(t-1)}+\boldsymbol{W}_x\boldsymbol{x}^{(t)}+\boldsymbol{b}\right)$$
我们可以用分开的记忆去做这件事。

## LSTM
LSTM 是一种特殊类型的递归神经网络（RNN），1997年提出，专门设计用来解决 **梯度消失问题**，从而更好地捕获长期依赖信息。
LSTM 的设计通过“门机制”（如输入门、遗忘门和输出门）来有选择地保留或丢弃信息，从而解决了权重矩阵幂次导致梯度消失的问题。

> [!tip] 
现代 LSTM 的一些关键改进来自于 Gers 等人在 2000 年的工作，他们在原始模型上提出了重要的扩展，例如“遗忘门”的引入。
然而，其在2006年才被广泛关注。原因是Alex Graves 的研究引入了 **CTC（Connectionist Temporal Classification）**，用于处理语音识别等序列学习任务。CTC 的发明极大地拓展了 LSTM 在实际应用中的能力。
LSTM 真正开始“爆火”是在 2013 年，当 Geoffrey Hinton 将其引入 Google 的语音识别系统后。这是因为 Alex Graves 在 Hinton 的团队中完成博士后研究。通过 Hinton 的推广，LSTM 被成功应用于工业界，特别是在大规模语音识别任务中展现了卓越的性能。

### 设计
不同于vanilla RNN，其有两个state。
在t步时，有hidden state $h^{(t)}$ 和cell state $c^{(t)}$ . 每个向量的长度都是n，cell存储了长期信息。LSTM可以读，写，删 cell中的内容，就像电脑中的RAM。
那么每次如何选择读写删什么内容呢？由gates决定。 gates是被算出来的，输出的值是概率。
gates都是长度为n的向量，每一个时间步中，每个gates中的元素可以选择open(1), closed(0), 或者in-between。gates的值是动态的，其值是基于现在上下文算出来的。

![](assets/Pasted%20image%2020241123062537.webp)
接下来看其结构：
![](assets/Pasted%20image%2020241123062808.webp)
接下来看一下为什么说LSTM解决了梯度消失的问题。

### 梯度推导
参考：[How LSTM networks solve the problem of vanishing gradients](../How%20LSTM%20networks%20solve%20the%20problem%20of%20vanishing%20gradients.md)

RNN中梯度爆炸的原因是我们需要计算递归导数$\frac{\partial h_{t}}{\partial h_{i}}$ 。其中，$\frac{\partial h_{t}}{\partial h_{t-1}}$ 会加剧Wh特征值范围的塌缩。如果Wh的特征值是0-1，那么梯度就快速消失了。如果大于1，那就快速爆炸了。
而LSTM中，ht是根据ct算出的，所以ht的梯度并不直接依赖于ht-1。在LSTM中，直接传递梯度的是c。那么我们看看c的导数。
由于有：
$$\boldsymbol{c}^{(t)}=\boldsymbol{f}^{(t)}\odot\boldsymbol{c}^{(t-1)}+\boldsymbol{i}^{(t)}\odot\tilde{\boldsymbol{c}}^{(t)}$$
那么
$$\begin{aligned}
\frac{\partial c_{t}}{\partial c_{t-1}}& =\frac{\partial}{\partial c_{t-1}}[c_{t-1}\otimes f_{t}\oplus\tilde{c}_{t}\otimes i_{t}] \\
&=\frac{\partial}{\partial c_{t-1}}[c_{t-1}\otimes f_{t}]+\frac{\partial}{\partial c_{t-1}}[\tilde{c}_{t}\otimes i_{t}] \\
&=\frac{\partial f_{t}}{\partial c_{t-1}}\cdot c_{t-1}+\frac{\partial c_{t-1}}{\partial c_{t-1}}\cdot f_{t}+\frac{\partial i_{t}}{\partial c_{t-1}}\cdot\tilde{c}_{t}+\frac{\partial\tilde{c}_{t}}{\partial c_{t-1}}\cdot i_{t}
\end{aligned}$$
代入导数，就是:
$$\begin{aligned}
\frac{\partial c_{t}}{\partial c_{t-1}}& =\sigma^{\prime}\big(W_{f}\cdot[h_{t-1},x_{t}]\big)\cdot W_{f}\cdot o_{t-1}\otimes tanh^{\prime}(c_{t-1})\cdot c_{t-1} \\
&+f_{t} \\
&+\sigma^{\prime}(W_{i}\cdot[h_{t-1},x_{t}])\cdot W_{i}\cdot o_{t-1}\otimes tanh^{\prime}(c_{t-1})\cdot\tilde{c}_{t} \\
&+\sigma^{\prime}(W_{C}\cdot[h_{t-1},x_{t}])\cdot W_{C}\cdot o_{t-1}\otimes tanh^{\prime}(c_{t-1})\cdot i_{t}
\end{aligned}$$
那我们把这四项记为At Bt Ct Dt.
那么损失函数Ek对W的导数就可以记为：
$$\frac{\partial E_{k}}{\partial W}=\frac{\partial E_{k}}{\partial h_{k}}\frac{\partial h_{k}}{\partial c_{k}}\Big(\prod_{t=2}^{k}[A_{t}+B_{t}+C_{t}+D_{t}]\Big)\frac{\partial c_{1}}{\partial W}$$
可以看到，其实ACD都会比较小，因为乘了一堆激活函数。但是B不会，因为B是ft，而ft在0到1.所以ft想忘，那么A+B+C+D -> B就小了，梯度就没了。如果ft不想忘，那么A+B+C+D -> B就大了，梯度就又有了。
你也许会说，那ft如果小的话，地图不还是消失吗？是的，但是没关系。因为ft的作用是遗忘，如果ft小的话，网络也认为该遗忘了，所以遗忘了没事。如果大的话，不该遗忘的时候就不会消失。

### 梯度消失专题
梯度消失/爆炸并不是RNN特有的问题。只不过RNN是最不稳定的罢了。它可以发生在所有类型的神经网络架构中，包括前馈网络（Feedforward）和卷积神经网络（Convolutional Neural Networks, CNN），尤其是在非常深的网络中。
链式规则和非线性激活函数的选择可能导致梯度在反向传播中逐渐变得非常小（梯度消失）或者非常大（梯度爆炸）。因此，底层的层学习得非常慢，导致训练困难。
解决方法:
- 残差连接（Residual Connections，ResNet）
- DenseNet（密集连接网络）：每一层直接连接到所有未来层，确保信息和梯度可以无障碍地流动。
- HighwayNet（公路网络）类似于残差连接，但身份连接和变换层之间通过动态门控机制进行控制。灵感来源于LSTM的门控机制，但用于深度前馈网络或卷积网络。
![](assets/Pasted%20image%2020241123072128.webp)
