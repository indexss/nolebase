# Linear Models

## Machine Learning & Neural Computation

An algorithm is said to learn from **experience E** with respect to some class of **tasks T** and performance **measure P**, if its performance at tasks in T, as measured by P, improves with experience E.

如果一个算法针对某类任务 T，其在性能度量 P 下的表现随着经验 E 的增加而提高，那么我们称该算法从经验 E 中学习了。

### T的种类

Classification: 从R映射到类型，或者给出每个类的机率。

Regression: 从输入向量预测一个数值。

Machine translation: 从原语言字符串到目标与阿严字符串

### E的定义

E就是训练集

### P的定义

其实就是损失函数

> 神经计算通过利用神经网络（NNs）来处理机器学习问题。

### 神经

<figure><img src="../.gitbook/assets/image (11) (1).png" alt=""><figcaption></figcaption></figure>

神经网络是解决机器学习问题的一种方式。其他方式包括：

• 自然计算（例如，遗传算法）

• 决策树（例如，随机森林）

• 统计方法（例如，贝叶斯）

• 决策边界（例如，支持向量机）



## 机器学习基础

机器学习的种类分为有监督学习，无监督学习和强化学习

有监督不必多说。

无监督就是在无标签的情况下，使用clustering algorithm去分簇

强化学习就是用代理去看是否能得到奖励。



这里说一下损失函数。测试的损失可以被表示为这样：

$$
Err_{\text{test}}(f) = Err_{\text{train}}(f) + (Err_{\text{test}}(f) - Err_{\text{train}}(f))
$$

其中我们定义训练和测试时的gap叫做泛化误差。所以测试的err就等于训练err + 泛化误差。好的模型gap小。



如何分数据？

<figure><img src="../.gitbook/assets/image (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

## Linear regression

学出一个 f(x) = wTx+b的模型去拟合数据

均方差MSE。平方的原因是，忽略正负，惩罚大residual：

<figure><img src="../.gitbook/assets/image (3) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

在一维情况下，我们可以用求导的方式求出最优w

<figure><img src="../.gitbook/assets/image (4) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

在多维情况下，我们如果还是想通过求导的方式得到最优解，就用矩阵形式

<figure><img src="../.gitbook/assets/image (5) (1) (1).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (6) (1) (1).png" alt=""><figcaption></figcaption></figure>

## 多项式回归

<figure><img src="../.gitbook/assets/image (7) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

但是我们其实不需要一个新的回归算法。只需要非线性嵌入就可以了

<figure><img src="../.gitbook/assets/image (9) (1) (1).png" alt=""><figcaption></figcaption></figure>

既然转换成了线形回归，那么最优的w公式也可套

<figure><img src="../.gitbook/assets/image (10) (1) (1).png" alt="" width="375"><figcaption></figcaption></figure>

显然，如果嵌入的维度太高了，就容易过拟合

那么如何解决过拟合问题呢？加正则项

<figure><img src="../.gitbook/assets/image (11) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

这是损失函数，在损失函数里面加了w^2, 最后就会让w变小，从而使得其对一些噪声不敏感，从而减小过拟合。

求导为0，得到

<figure><img src="../.gitbook/assets/image (12) (1).png" alt=""><figcaption></figcaption></figure>

