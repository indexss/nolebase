---
tags:
  - AI
  - DL
  - ML
---
# Backpropagation

## Perceptron 感知机

这是真实的神经元建模：

<figure><img src="./assets/image (94).png" alt="" width="563"><figcaption></figcaption></figure>

如果我们从数学上建模这样的神经元，就是这样的：

<figure><img src="./assets/image (95).png" alt="" width="563"><figcaption></figcaption></figure>

我们现在要开始讲解感知机。首先，我们复习一下解析几何知识。

> 如果一个平面/直线是以wTx + b = 0的形式给出的，那么，w就是平面的法向量，b是平面在法向量上平移的距离。
>
> 而如果两个向量点乘，a = (a1 .. an), b = (b1 .. bn), dot(a,b) = a1b1 +..+ anbn为标量，长度为b在a方向上的投影长度。

有了这样的前置复习知识，就来看感知机。

<figure><img src="./assets/image (97).png" alt="" width="563"><figcaption></figcaption></figure>

在图里面，x不是横坐标，而是一个向量x = (x1 .. xn), 指向某个方向，w为hyperplane的法向量，与hyperplane垂直。dot(x,w)为x在w上的投影（这里可能写错顺序了）。

<figure><img src="./assets/image (98).png" alt="" width="375"><figcaption></figcaption></figure>

而b的引入就是让平面在w的方向上前进后退。为了便于研究，我们先不考虑有b的情况。我们只考虑wx。

那么感知机算法就是：

<figure><img src="./assets/image (100).png" alt=""><figcaption></figcaption></figure>

这里解释一下。首先我们看到，红色的圆是没有被正确的分类的。这个时候，ywTx是 < 0的。这时，x是指向红色圆圈的向量。y为正或负1。w+yx的意思就是，如果，y为-1，则yx为x的反方向向量，w+yx做平行四边形法则，向量加法，让w这个法向量旋转，使得y为-1的红色圆圈更容易被分到-1的类别里去。y=1同理。



这个算法挺优美的，但是问题就是，当我们想要训练一个多层的感知机的时候，就不管作用了。

<figure><img src="./assets/image (101).png" alt=""><figcaption></figcaption></figure>

## Chain Rule

Chain Rule没啥好说的，就是链式求导。f(g(x))对x的导数就是f'(g(x)) \* g'(x)

前面埋了个问题，就是虽然感知机算法很优美，但是一旦变成多层感知机，就没法用这个方法了。所以就想到梯度下降了，梯度下降要求导，sgn又没法求导，所以寻求一个新的激活函数去替换sgn，那就想到了sigmoid。

<figure><img src="./assets/image (102).png" alt="" width="563"><figcaption></figcaption></figure>

训练的时候，我们损失用的是均方差MSE。

<figure><img src="./assets/image (103).png" alt="" width="375"><figcaption></figcaption></figure>

那如果只看一层的话，单层的感知机的训练就从感知机算法变成了这样：

<figure><img src="./assets/image (104).png" alt="" width="563"><figcaption></figcaption></figure>

## Backpropagation

多层感知机，MLP又叫Feed-Forward-Network。为了训练，就要知道梯度怎么反向传播。

我们可以借助计算图（有向无环）来帮助我们算梯度。首先，这张图展示了从前往后算梯度的劣势，劣势就是，你需要重复计算相同的内容很多次。

<figure><img src="./assets/image (106).png" alt=""><figcaption></figcaption></figure>

但你如果反着算，就不用重复计算梯度了，可以重复利用。

<figure><img src="./assets/image (107).png" alt="" width="563"><figcaption></figcaption></figure>

<figure><img src="./assets/image (108).png" alt="" width="563"><figcaption></figcaption></figure>

## Loss Function

这里介绍几种常用的Loss Function

* 二分类问题 - MSE均方差

<figure><img src="./assets/image (109).png" alt="" width="375"><figcaption></figcaption></figure>

* 二分类问题 - 二分交叉熵

<figure><img src="./assets/image (110).png" alt="" width="375"><figcaption></figcaption></figure>

* 多分类问题 - MSE

sigmoid换成了softmax，从而预测每个类的概率。

<figure><img src="./assets/image (111).png" alt="" width="563"><figcaption></figcaption></figure>

*   多分类问题 - 交叉熵

    当然，用交叉熵也可以。

<figure><img src="./assets/image (112).png" alt="" width="358"><figcaption></figcaption></figure>

* 回归 - 均方差

<figure><img src="./assets/image (114).png" alt="" width="375"><figcaption></figcaption></figure>

* 回归 - 均绝对误差

<figure><img src="./assets/image (115).png" alt="" width="375"><figcaption></figcaption></figure>
