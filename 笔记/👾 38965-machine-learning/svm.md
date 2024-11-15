# SVM

## SVM的General Idea

Margin：指的是决策边界到某个类别点的最短距离。

那么决策边界在哪比较好呢？对于两个类别，margin都最大，也就是说，对于两个类别的最近点都距离最大的时候，这个边界比较好。

support vector：那些距离正好等于margin的点就是支持向量。也就是距离决策边界最近的每个阵营的点。

SVM的输出直接就是标签-1，1，而不是像逻辑回归一样给你一个概率，然后取大概率。

<figure><img src="../.gitbook/assets/image (13) (1).png" alt="" width="375"><figcaption></figcaption></figure>

那么SVM模拟了一个怎样的函数呢？（也就是说，假设集是啥）

<figure><img src="../.gitbook/assets/image (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (7) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (5) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

那么优雅地写出这个式子，就变成了这样：

<figure><img src="../.gitbook/assets/image (8) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

为什么|h(x)| = yh(x)? 因为y=1 h(x) > 0, y=-1 h(x) < 0，所以成立。

<figure><img src="../.gitbook/assets/image (9) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

注意，下面两个约束是等价的。为什么？

上面的条件是 y h(x) > 0, 下面的条件写开了就是 y h(x) >=1，满足了下面一定满足上面。为什么？因为在这里我们忽略y，因为|y| = 1，这就说明，|h(x)| >= 1。这个是很好实现的，只要同时用因子k放缩w，b就能达到。

于是问题进一步化简成为了：

<figure><img src="../.gitbook/assets/image (10) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (11) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

那么问题就变成了

<figure><img src="../.gitbook/assets/image (12) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

当然，把x换成phi(x)，运用非线性变化，就可以求解非线性分类问题了。

## 求解SVM问题

<figure><img src="../.gitbook/assets/image (75).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (76).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (77).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (78).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (79).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (80).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (81).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (82).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (83).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (84).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (85).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (87).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (88).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (89).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (90).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (91).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (92).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (93).png" alt=""><figcaption></figcaption></figure>
