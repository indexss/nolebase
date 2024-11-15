# GD & Linear Classification

## Gradient Descent

这一节介绍三种梯度下降：GD，SGD和Minibatch SGD。其区别在于，GD一次使用所有数据集进行下降，SGD随机挑选一个样本，Minibatch SGD随机挑选一个样本batch。

### GD

就是简单的梯度下降。

<figure><img src="../.gitbook/assets/image (26).png" alt="" width="563"><figcaption></figcaption></figure>

### Stochastic Gradient Descent (SGD)

GD易于实现，但计算是昂贵的，因为一次要计算所有的样本，所以我们想要拆解问题。

我们知道, 损失函数是有这样的特性的。Ci代表第i个样本的损失

$$
C(w) = \frac{1}{n}\Sigma^{n}_{i=1}C_i(w)
$$

那我们能不能利用这个特性提升优化的效率？可以。

我们可以只计算一个样本的梯度，然后假设这个梯度是有代表性的。

1. 在第t个iter，我们随机抽取一个样本index <- \{ 1..n \}
1. 我们计算随机梯度 $$ \nabla C_i(w^{(t)}) $$
1. 用这一个梯度代替整个梯度&#x20;

<figure><img src="../.gitbook/assets/image (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

如果想要少的迭代次数，且样本数量较少，想精准一点，选择GD。

如果精度要求一般，样本太多，那就用SGD。

SGD一般使用一个动态的学习率，公式为 $$\eta_t = \frac{c}{\sqrt t}$$ ，其中c是超参数。随着时间推后，学习率变小。

### Minibatch SGD

我们一次用一些，一批样本来计算随机梯度，而不是一个一个计算。

我们这次选择一批进行更新

<figure><img src="../.gitbook/assets/image (2) (1).png" alt="" width="375"><figcaption></figcaption></figure>

b是batch size。

<figure><img src="../.gitbook/assets/image (3) (1).png" alt="" width="563"><figcaption></figcaption></figure>

对于批次的抽样，可以放回，也可以不放回。

&#x20;Minibatch SGD就是GD和SGD的折中。

## Linear classification

任务定义：

<figure><img src="../.gitbook/assets/image (4) (1).png" alt="" width="563"><figcaption></figcaption></figure>

&#x20;我们理想中的Loss是0-1 loss。具体来说，就是这样：

<figure><img src="../.gitbook/assets/image (5) (1).png" alt="" width="563"><figcaption></figcaption></figure>

这看起来很好，但是问题就是在于，这玩意不连续。所以我们要换一个损失函数，

首先定义一些东西。

在神经计算中，margin和machine learning那门课不太一样。machine learning SVM中定义的间隔是指某个类别的点到决策边界的最短距离。而在这里，margin被定义为ywTx.也就是yh(x)

margin为正，代表正确预测。负为错误，而margin的绝对值表示了预测的置信度。

我们这里定义 surrogate Loss function如下（代理损失函数）：

<figure><img src="../.gitbook/assets/image (6) (1).png" alt="" width="563"><figcaption></figcaption></figure>

loss变小，margin正的越大，越达成目标。

在这里，为了详细一点，我们对其进行梯度下降。注意，这里对Ci进行了加和，从而得到了C。

<figure><img src="../.gitbook/assets/image (7) (1).png" alt="" width="563"><figcaption></figcaption></figure>

这里我们先对Ci求梯度。

<figure><img src="../.gitbook/assets/image (8) (1).png" alt="" width="563"><figcaption></figcaption></figure>

如果只用SGD，那么迭代方式就是这样：

<figure><img src="../.gitbook/assets/image (9) (1).png" alt="" width="563"><figcaption></figcaption></figure>

有趣的点是，我们前面说过，我们这里定义margin就是 $$y_i h(x_i)$$。在这样定义的情况下，我们可以知道，wt+1的margin一定大于wt的， 证明很简单：

<figure><img src="../.gitbook/assets/image (10) (1).png" alt="" width="563"><figcaption></figcaption></figure>
