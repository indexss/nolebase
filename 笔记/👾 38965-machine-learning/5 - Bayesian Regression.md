# Bayesian Regression
## 频率派 vs 贝叶斯派
拿线形回归举例。频率派认为，参数w都是定的，而误差来自于不可学习的噪声epsilon
贝叶斯派认为，参数w都是一个条件概率分布，而误差来自于w分布你选择不同的w。数据量越大，这个分布就越集中。
贝叶斯派：
$$P(\omega\mid y,X)=\frac{P(y\mid X,\omega)P(\omega)}{P(y\mid X)} \rightarrow  P(\omega\mid y,X)\propto P(y\mid X,\omega)P(\omega)$$
## 概率视角下的线性回归
我们认为，w是确定的，不确定性来自于噪声epsilon：
$$\mathbf{y}=\hat{y}(\mathbf{x},\boldsymbol{\omega})+\epsilon $$
而我们认为噪声epsilon为高斯分布，且记 $\beta = \frac {1} {\sigma ^2}$ , 那么有：
$$p(y\mid\mathbf{x},\omega,\beta)=\mathcal{N}(y\mid\hat{y}(\mathbf{x},\omega),\beta^{-1})$$
对于多元正态分布，方差会被换成协方差矩阵 $\Sigma$ 。由于我们的训练集给出了X和y，那么我们认为这样出现的概率就应当最高。所以我们应当使得P(y|X)最高，加上w不确定的情况下，就变成了我们希望p(y|X, w)最高。似然函数：
$$p(\mathbf{y}\mid\mathbf{X},\boldsymbol{\omega},\beta)=\prod_{i=1}^{N}\mathcal{N}(y_{i}\mid\boldsymbol{\omega}^{T}\phi(x_{i}),\beta^{-1})$$
对数似然：
$$\mathcal{L}=\ln p(\mathbf{y}\mid\mathbf{X},\boldsymbol{\omega},\beta)=-\frac{ND}{2}\ln(2\pi)-\frac{N}{2}\ln\beta-\frac{1}{2}\sum_{i=1}^{N}\beta(y_{i}-\boldsymbol{\omega}^{T}\phi(x_{i}))^{2}$$
而由于前两项都是定值，所以我们最大化L就相当于要最小化：
$$R(\omega)=\sum_{i=1}^N(y_i-\omega^T\phi(x_i))^2=\sum_{i=1}^N(y_i-\hat{y}_i(x_i,\omega))^2$$
这就可以看出，在点估计，频率派的视角下来看，OLS和MLE是一样的。

## 贝叶斯视角下的线性回归
当数据和模型处于一个过定状态的时候，你最后学出的内容可以是一条线，并认为误差是噪声带来的：
![](assets/Pasted%20image%2020241124222539.webp)
但当系统欠定的时候，实际上可以有多个线，且每个线的可能性不太一样，这里就需要贝叶斯派，用概率来确定参数的family。
![](assets/Pasted%20image%2020241124222632.webp)
在频率视角中，当我们得到似然函数之后，我们做的是最大似然函数。但是在贝叶斯视角中，我们先停在似然函数：
$$p(\mathbf{y}\mid\mathbf{X},\boldsymbol{\omega},\beta)=\prod_{i=1}^N\mathcal{N}(y_i\mid\boldsymbol{\omega}^T\phi(x_i),\sigma^2)$$
由于多变量的不确定性太难推导，所以我们这里就只考虑，w0，即截距不确定的情况下的贝叶斯视角。
首先，我们有先验知识，认为w0是服从高斯分布的：
$$p(\omega_0)\sim\mathcal{N}(0,\alpha)$$
那么似然函数为：
$$P(y\mid X,\omega_0, \omega_1,\sigma^2)=\prod_{i=1}^N\mathcal{N}(y_i\mid\omega_1x_i+\omega_0,\sigma^2)$$
根据贝叶斯定理，我们有：
$$P(\omega_0\mid y,X,\omega_1\ ,\sigma^2)\propto P(y\mid X,\omega_0, \omega_1, \sigma^2)P(\omega_0)$$
两边取对数，贝叶斯的分母化为const：
$$\ln p(\omega_{0}\mid\mathbf{y},\mathbf{x},\omega_{1},\sigma^{2})=\left\{-\frac{1}{2\sigma^{2}}\sum_{i=1}^{N}(y_{i}-\omega_{1}x_{i}-\omega_{0})^{2}-\frac{\omega_{0}^{2}}{2\alpha}\right\}+const$$
通过一个复杂的配方过程，我们可以把上面这个结果凑成下面的形式：
$$\ln p(\omega_0\mid\mathbf{y},\mathbf{x},\omega_1,\sigma^2)=-\frac1{\sigma_{post}^2}(\omega_0-\mu_{post})^2+const$$
$$p(\omega_0\mid\mathbf{y},\mathbf{x},\omega_1,\sigma^2)\sim\mathcal{N}(\mu_{post},\sigma_{post}^2)$$
$$\mu_{post}=\frac{N\alpha}{N\alpha+\sigma^2}\mu_{ML},\quad\sigma_{post}^2=\frac{\sigma^2\alpha}{N\alpha+\sigma^2}$$
其中 $\mu_{ML}$ 是omega在MLE的情况下的截距omega_0
这个形式揭示了，后验分布依旧是一个高斯分布。如果不想只在w0上用不确定性，而是想要推广到所有的w都想要不确定性，那么：
先给出w的先验是高斯分布：
$$P(\omega)=\mathcal{N}(\omega\mid0,\alpha^{-1}I)$$
利用先验和似然，得出w的后验分布：
$$P(\omega\mid y,X)\propto P(y\mid X,\omega)P(\omega)$$
$$\ln p(\boldsymbol{w}\mid\mathbf{y},\mathbf{x})=-\frac{\beta}{2}\sum_{i=1}^{N}\left\{y_{i}-\boldsymbol{w}^{T}\phi(x_{i})\right\}^{2}-\frac{\alpha}{2}\boldsymbol{w}^{T}\boldsymbol{w}+\mathrm{const}$$
配方之后，得到后验依旧是高斯分布：
$$p(\omega\mid\mathbf{y},\mathbf{x})=\mathcal{N}(\omega\mid\mathbf{m}_{post},\mathbf{S}_{post})$$
$$\mathbf{m}_{post}=\beta\mathbf{S}_{post}\mathbf{\Phi}^{T}\mathbf{y},\quad\mathrm{~}\quad\mathbf{S}_{post}^{-1}=\alpha\mathbb{I}+\beta\mathbf{\Phi}^{T}\mathbf{\Phi}$$
其中，$\Phi$ 是design matrix，上一节讲过。
随着观测数据 N 的增加，后验分布变得越来越集中。这说明参数的不确定性下降，数据越多时，似然函数对后验分布的影响逐渐占主导，后验分布更依赖于观测数据。
![](assets/Pasted%20image%2020241124224754.webp)
## 贝叶斯流派估计新数据
预测分布由此公式算出：
$$P(y_*\mid x_*,X,y)=\int P(y_*\mid x_*,\omega)P(\omega\mid X,y)d\omega $$
其中，右侧的后半部分已经有了，前半部分呢？对于训练集我们有：
$$P(y_i\mid x_i,\omega)=\mathcal{N}(y_i\mid\omega^\top\phi(x_i),\beta^{-1})$$
而由于我们认为，测试集和训练集的采集方法是一样的，即分布是一样的，所以y\* 同样满足：
$$P(y_*\mid x_*,\omega)=\mathcal{N}(y_*\mid\omega^\top\phi(x_*),\beta^{-1})$$
