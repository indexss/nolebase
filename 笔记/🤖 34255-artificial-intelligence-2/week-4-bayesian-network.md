---
tags:
  - AI
  - DL
  - ML
---

# Week 4 - Bayesian Network

### Bayes' Theory

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240409015052841.png" alt="" width="375"><figcaption></figcaption></figure>

其中p(θ)p(x|θ) = p(x,θ)

### Bayesian Network

通过有向图的方法来表示贝叶斯网络。一种使用边缘方向表示因果关系和贝叶斯定理进行概率推断的概率图模型。

![image-20240409015919974](file:///Users/linlishi/Library/Application%20Support/typora-user-images/image-20240409015919974.png?lastModify=1712601310)

优势：

图形表示：提供不同随机变量的联合概率分布的可视化表示 - 可解释性

强大：能够捕捉随机变量之间复杂的关系

结合数据和先验知识：可以将先验知识与来自数据的统计显著信息相结合并更新 - 更好地逼近真实知识。

生成方法：生成类似于现有数据的新数据

缺点：

需要对许多概率有先验知识。

有时在计算上是棘手的。

P（Xi | Parents（Xi））

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240409020048105.png" alt=""><figcaption></figcaption></figure>

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240409020127023.png" alt=""><figcaption></figcaption></figure>

你观察到草是湿的，下雨的概率是多少？

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240409020250903.png" alt="" width="375"><figcaption></figcaption></figure>

不允许以下结构：&#x20;

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240409020643112.png" alt="" width="375"><figcaption></figcaption></figure>

### Exercise

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240409021015390.png" alt=""><figcaption></figcaption></figure>

> (a)
>
> ![image-20240409021912884](assets/a5d181f3539a38289c411ca93d8cf3bc_MD5.png)
>
> (b)
>
> ![image-20240409021710351](assets/05753e605e20a85a95e15b98f9d7fe3d_MD5.png)
>
> (c) 1+1+4+1+4=11

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240409021822346.png" alt=""><figcaption></figcaption></figure>

> (1)
>
> ![image-20240409022102589](assets/b73e93671bbb8641e054291105970698_MD5.png)
>
> (2)
>
> ![image-20240409022209915](assets/efd91342cc3cacaaf48e744108b4a78a_MD5.png)
>
> (3) 1+1+1+2+4+4+2 = 15
>
> (4) With F2 = 1, observing F4 = 1 still gives us information only about A3. If we observe F3 = 1 instead of F2, then observing F4 = 1 will give us information about A1 and A3 due to competing causes

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240409022623996.png" alt=""><figcaption></figcaption></figure>

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240409022646275.png" alt=""><figcaption></figcaption></figure>

> (a)
>
> ![image-20240409023027552](assets/288997c8ce8da9a8545557dfe292f335_MD5.png)
>
> 这题和上面完全一样。
