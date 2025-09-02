---
tags:
  - ML
  - AI
---
# Linear Regression
本节来介绍基于最小二乘法的线性回归。
## 情景描述
真实的x，y存在这样的关系：
$$y=f(x,\omega)+\epsilon $$
其中，f(x,w) 是基准的线性，epsilon是固有噪音，这玩意没法确定。有了这个噪音，你的真实标签看起来就是这样的：
![](assets/Pasted%20image%2020241124205723.webp)
## 度为1的OLS
degree为1，说明w只有一个，外带一个截距。所以我们假设目标函数是这样的：
$$\hat{y}_i=\omega_0+\omega_1x_i$$
那么损失如果用MSE的话，就是这样的：
$$R(\omega)=\sum_{i=1}^Nr_i^2=\sum_{i=1}^N(y_i-\hat{y}_i(x_i,\omega))^2$$
为了最小化损失，所以求导：
$$\begin{aligned}\frac{\partial R(\omega_0,\omega_1)}{\partial\omega_0}&=0\\\frac{\partial R(\omega_0,\omega_1)}{\partial\omega_1}&=0\end{aligned}$$
求导得到的结果如下：
$$\begin{gathered}\sum_{i=1}^{N}x_{i}y_{i}=\omega_{0}\sum_{i=1}^{N}x_{i}+\omega_{1}\sum_{i=1}^{N}x_{i}^{2}\\\sum_{i=1}^{N}y_{i}=\omega_{0}N+\omega_{1}\sum_{i=1}^{N}x_{i}\end{gathered}$$
写成矩阵形式就是这样：
$$\left.\left(\begin{array}{c}\sum_i^Nx_iy_i\\\sum_i^Ny_i\end{array}\right.\right)=\left(\begin{array}{cc}\sum_i^Nx_i&\sum_i^Nx_i^2\\N&\sum_i^Nx_i\end{array}\right)\left(\begin{array}{c}\omega_0\\\omega_1\end{array}\right)$$
解就是这样：
$$\left(\begin{array}{c}\omega_0\\\omega_1\end{array}\right)=\left(\begin{array}{cc}\sum_i^Nx_i&\sum_i^Nx_i^2\\N&\sum_i^Nx_i\end{array}\right)^{-1}\left(\begin{array}{c}\sum_i^Nx_iy_i\\\sum_i^Ny_i\end{array}\right)$$
## 任意degree OLS
定义目标函数为这样：
$$\hat{y}_i(x_i,\omega)=\sum_{i=0}^M\omega_j\phi_j(x_i)=\omega^T\phi(x_i)$$
$$\boldsymbol{\omega}=\left(\begin{array}{c}\omega_{0}\\\omega_{1}\\\\\omega_{M}\end{array}\right),\quad \phi=\left(\begin{array}{c}\phi_{0}(x_{i})\\\phi_{1}(x_{i})\\\\\phi_{M}(x_{i})\end{array}\right)$$

其中phi是非线性变化，phi0(xi) = 1。
求导为0得到结果：
$$\begin{aligned}\frac{\partial R(\boldsymbol{\omega})}{\partial\boldsymbol{\omega}}&=\sum_{i=1}^{N}(y_{i}-\boldsymbol{\omega}^{T}\phi(\boldsymbol{x}_{i}))\phi(\boldsymbol{x}_{i})^{T}=0,\\\\\sum_{i=1}^{N}y_{i}\phi^{T}(x_{i})&=\boldsymbol{\omega}^{T}(\sum_{i=1}^{N}\phi(x_{i})\phi^{T}(x_{i}))\end{aligned}$$
如果我们记 design matrix $\Phi$为：
$$\boldsymbol{\Phi}=\left(\begin{array}{cccc}\phi_{0}(x_{1})&\phi_{1}(x_{1})&\cdots&\phi_{M}(x_{1})\\\phi_{0}(x_{2})&\phi_{1}(x_{2})&\cdots&\phi_{M}(x_{2})\\&&&\\\phi_{0}(x_{N})&\phi_{1}(x_{N})&\cdots&\phi_{M}(x_{N})\end{array}\right)$$
那么上面的带求和的式子就可以写为：
$$\omega_{OLS}=(\mathbf{\Phi}^{T}\mathbf{\Phi})^{-1}\mathbf{\Phi}^{T}\mathbf{y}$$
然而，由于 $\Phi$ 很大的时候，其逆很难算。所以在适当时你应该使用 **梯度下降。**
当梯度下降时，你可以用这些cost function:

![](assets/Pasted%20image%2020241124211209.webp)
## 非线性嵌入
这里介绍四种非线性嵌入：
![](assets/Pasted%20image%2020241124211449.webp)
