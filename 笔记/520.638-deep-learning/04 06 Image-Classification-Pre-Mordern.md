# Image Classification
## k-NN
优点：
- 简单
- 不用训练
缺点：
- 计算太麻烦，每个training set都要计算
- 训练O1，测试On
- 难以找到最佳的距离衡量算法

![[Image-Classification-1770691240373.png|632x456]]
![[Image-Classification-1770691282592.png|636x491]]
### 用Validation确定k
在Training set中分一部分作为Validation set，选表现最优的k。相当于我们自己的test set
![[Image-Classification-1770691433805.png|656x132]]

还可以k-fold cross validation
![[Image-Classification-1770691486025.png|702x272]]

## Face Recognition
### Eigenfaces (PCA) - Subspace based
如果一个NxM的图，就是NM维。这其实没啥问题，但是，由于人脸之间高度相关，有很多东西一样，比如说都有两个眼睛一个嘴，那么感觉用NM维度真么高就比较浪费。
所有Subspace方法，都是想要利用这部分重合的信息，降低维度，在用更小的维度尝试表示更高维的向量，尽可能少的丢失信息。
#### Principal Component Analysis (PCA)
PCA的目标就是选一组基（正交），使得在这个基上，点的方差最高。
![[Image-Classification-1770692860916.png|330x217]]
如果你选的方向 **沿着数据“最长的方向”**，那么点到这条线的 **垂直距离自然最小**。
![[Image-Classification-1770692897995.png|385x172]]
一个可视化的PCA过程：
![[Image-Classification-1770692916183.png|509x281]]
#### Eigenface
如何计算两个脸之间的距离？
1. 先进行subspace投影
2. 在计算其L2距离

从线代的视角看PCA。
我们PCA的目标其实就是一个线性变换W，使得W线性变换之后的协方差S最大。
![[Image-Classification-1770693281450.png|468x276]]
![[Image-Classification-1770693297391.png|469x210]]
而线代告诉我们，这组基向量一定就是S的特征值。他们就是W最高能量的轴从高到低排序。
那么Eigenface的训练过程就可以表示为：
![[Image-Classification-1770693436995.png|553x217]]
然而，BBT的维度是nxn，n是特征的维度，巨大无比，而BTB的维度是NxN。是基的数量，要小得多。我们要用一些trick简化这个计算过程：
![[Image-Classification-1770693507466.png|477x310]]
这样，就可以用BTB更简单得到BBT的特征值了。

如何测试？
![[Image-Classification-1770693624695.png|435x219]]
#### PCA的弊端
然而，PCA也有一些问题。PCA只关心协方差，不关心高阶结构（多模态、环形、非线性流形）。在这种情况下，PCA没啥意义。
![[Image-Classification-1770693838775.png|417x188]]

### Fisherfaces (LDA) - Subspace based
为了克服PCA遇到的问题，LDA试图找到一组基，让类间方差最大，类内方差最小。
![[Image-Classification-1770694090095.png|469x293]]
![[Image-Classification-1770694254588.png|471x432]]
怎么找这样的基？
先定义符号：
![[Image-Classification-1770694302005.png|478x236]]
然后计算scatter：
![[Image-Classification-1770694360802.png|483x261]]
要找到线性变换W
![[Image-Classification-1770694395749.png|487x171]]
s.t. 怎么解这个argmax？其实就是一个广义特征值问题。
![[Image-Classification-1770694431128.png|493x292]]
就是解 SB​ 相对于 SW​ 的广义特征向量

然而，由于有时候SW不可逆（奇异，singular），解不了。
另外，n >> N，和PCA一样，不好解。

怎么做？先PCA，再FLD：
![[Image-Classification-1770694847541.png|296x123]]
LDA的测试：
![[Image-Classification-1770694869344.png|481x275]]


### Sparse Representation-based Classification (SRC)
假设我们有很多类的人脸，每一类是一堆同一个人的不同照片。把 **所有训练样本（不分人）** 拼成一个大字典矩阵D
D=\[D1​, D2​, ⋯, DC\], Dc为第c个人的所有图像。
如果测试样本来自第 c 类，它主要可以由第 c 类的训练样本线性表示出来，哪个类的重构误差最小，就判成哪一类
![[04 06 Image-Classification-Pre-Mordern-1770695746242.png|609x298]]
![[04 06 Image-Classification-Pre-Mordern-1770695763246.png|614x332]]
SRC的结果对于遮挡是鲁棒的。
![[04 06 Image-Classification-Pre-Mordern-1770695807810.png|617x480]]

### Support Vector Machines (SVMs)
[3 - SVM Classification](../38965-machine-learning/3%20-%20SVM%20Classification.md)
