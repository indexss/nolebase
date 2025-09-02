# SVM Regression
## 两种SVR
![](assets/Pasted%20image%2020241124230644.webp)
对于左边的tube SVR来说，当点在tube内的时候，就没有error，当点在tube外才有。tube的error叫做 epsilon-insensitive error.
当 |s-y| 比较小的时候，tube约等于squared，且更少被outlier影响。
![](assets/Pasted%20image%2020241124230909.webp)

## SVR定义
我们要找到一条tube，tube的宽度由人为确定。这个tube可以让所有的点都在tube内。
那么问题就转化成了：
$$\min\frac12\|\mathbf{w}\|^2$$
$$\begin{aligned}&s.t. y_i-\mathbf{w}_1\cdot\mathbf{x}_i-b\leq\varepsilon;\\&\mathbf{w}_1\cdot\mathbf{x}_i+b-y_i\leq\varepsilon;\end{aligned}$$
然而，这就有问题了。如果你的data本身就不能被塞到一个tube中怎么办呢？这里就引入slack变量，转化为凸优化问题。只有超出tube的部分，才会对损失函数产生线性惩罚。
![](assets/Pasted%20image%2020241124231519.webp)
引入拉格朗日乘子进行凸优化：
$$\begin{aligned}
L:=& \frac12\|w\|^2+C\sum_{i=1}^\ell(\xi_i+\xi_i^*)-\sum_{i=1}^\ell(\eta_i\xi_i+\eta_i^*\xi_i^*) \\
&-\sum\alpha_i(\varepsilon+\xi_i-y_i+\langle w,x_i\rangle+b) \\
&-\sum_{i=1}^\ell\alpha_i^*(\varepsilon+\xi_i^*+y_i-\langle w,x_i\rangle-b) \\
&\text{Lagrange multipliers}\quad\alpha_i^{(*)},\eta_i^{(*)}\geq0.
\end{aligned}$$
这里面yita也是拉格朗日乘子，用来惩罚超出tube的部分。那么接下来根据kkt条件我们有：
$$\begin{aligned}
\partial_{b}L& =\sum_{i=1}^\ell(\alpha_i^*-\alpha_i)=0 \\
\partial_{w}L& =w-\sum_{i=1}^\ell(\alpha_i-\alpha_i^*)x_i=0 \\
\partial_{\xi_i^{(*)}}L& =C-\alpha_i^{(*)}-\eta_i^{(*)}=0 
\end{aligned}$$
全部代入L得到：
$$\text{maximize}\quad\begin{cases}-\frac{1}{2}\sum_{i,j=1}^\ell(\alpha_i-\alpha_i^*)(\alpha_j-\alpha_j^*)\langle x_i,x_j\rangle\\-\varepsilon\sum_{i=1}^\ell(\alpha_i+\alpha_i^*)+\sum_{i=1}^\ell y_i(\alpha_i-\alpha_i^*)\end{cases}\\\text{subject to}\quad\sum_{i=1}^\ell(\alpha_i-\alpha_i^*)=0\quad\text{and}\quad\alpha_i,\alpha_i^*\in[0,C]$$
其中支撑向量是超出tube的部分。接下来就可以用SMO了。具体可以去看 [3 - SVM Classification](3%20-%20SVM%20Classification.md)
