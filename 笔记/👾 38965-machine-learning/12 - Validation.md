# Validation
**Validation**: Checking the bottom line
![](assets/Pasted%20image%2020250423182327.webp)
给定M个模型假设空间 $\mathcal{H}_1,\ldots,\mathcal{H}_M$，每个模型假设空间给定了对应的算法：$A_1,\ldots,A_M$
- 目标：选出最优的 $\mathcal{H}_{m^*}$ ，并希望他在新样本上的期望泛化误差 $E_{\mathrm{out}}(g_{m^*})$ 尽可能低。
- 挑战：Eout 无法直接计算，因为你没有真实的数据。
**模型选择**：在候选的Hm中，用某种策略（交叉验证、信息准则、贝叶斯证据等）去估计各自的泛化误差，然后 pick 那个最有希望在“真实环境”里表现最好的m\*。

我们有几种方法来做模型选择
- 根据Ein选：这是最容易过拟合的方法，几乎更复杂的模型永远会得到更好的结果
- Etest选择。如果有测试集的话，就对每个候选算法Am在D上训练处gm，在Dtest上算出Etest，选Etest最小的那个模型
	- 根据**有限样本版 Hoeffding+并 union bound**，对这M个候选假设同时推界，都能保证（以高概率）$$E_{\mathrm{out}}(g_{m^{*}})\leq E_{\mathrm{test}}(g_{m^{*}})+O{\left(\sqrt{\frac{\log M}{N_{\mathrm{test}}}}\right)}.$$
	- 但是哪里来的全新测试集？一旦把它当做模型选择就算作弊。任何后来用它报告的测试误差，都已经被“调过”模型，对它过拟合了一次。

## 实战做法 - Validation Set
![](assets/Pasted%20image%2020250423203935.webp)
如何划分？
随机划分。训练集N-K，验证集K。在训练集上跑学习算法，得到假设g-，在Dval上验证误差：
$$E_{\mathrm{val}}(g^-)=\frac{1}{K}\sum_{(x,y)\in\mathcal{D}_{\mathrm{val}}}e{\left(g^-(x),y\right)}.$$
这里面对于分类任务，就是01误差，对于回归任务，就是平方误差
如果K取得太大，剩下的训练样本就太少，g-本身就会很差。如果K太小，验证误差的方差就会上升、评估不稳定。
一般取数据的20\% 作为验证集。

如果用全量D训练，会得到最终模型g，如果只用子集Dtrain训练，就得到g-。他只是用来验证误差的模型，不是最后产品。
我们需要让Eval和Eout关联起来，只有当我们能保证这K个样本和未来要碰到的测试点是**同分布独立采样**的，Eval才能成为对真实Eout的无偏估计。

接下来，我们要对Eval进行均值和方差的分析。分析均值是为了研究，它是不是无偏地接近Eout。研究方差是为了明确，它的波动有多大？需要多大的K才能使估计稳定可靠。

### 均值分析
我们想要证明，验证误差：
$$E_{\mathrm{val}}(g^-)=\frac{1}{K}\sum_{(x,y)\in\mathcal{D}_{\mathrm{val}}}e{\left(g^-(x),y\right)}.$$
是对真实泛化误差：
$$E_{\mathrm{out}}(g^-)=\mathbb{E}_{x\sim p(x)}{\left[e{\left(g^-(x),f(x)\right)}\right]}$$
的无偏估计，也就是证明：
$$\mathbb{E}_{\mathcal{D}_{\mathrm{val}}}[E_{\mathrm{val}}(g^-)]=E_{\mathrm{out}}(g^-).$$
在所有可能的Dval上的平均值。

我们来算左边：
$$\mathbb{E}_{\mathcal{D}_{\mathrm{val}}}[E_{\mathrm{val}}(g^{-})]=\mathbb{E}_{\mathcal{D}_{\mathrm{val}}}\left[\frac{1}{K}\sum_{\boldsymbol{x}_{n}\in\mathcal{D}_{\mathrm{val}}}\mathrm{e}(g^{-}(\boldsymbol{x}_{n}),y_{n})\right]$$
因为线性，所以EDval可以进去：
$$=\frac{1}{K}\sum_{\boldsymbol{x}_n\in\mathcal{D}_{\mathrm{val}}}\mathbb{E}_{\mathcal{D}_{\mathrm{val}}}\left[\mathrm{e}(g^-(\boldsymbol{x}_n),y_n)\right]$$
而由于Dval是独立同分布抽取的，所以Dval单点的分布就是真实分布：
$$\mathbb{E}_{\mathrm{D}_{\mathrm{val}}}\begin{bmatrix}e(g^-(x_n),y_n)\end{bmatrix}=\mathbb{E}_{x_n\sim p(x)}\begin{bmatrix}e(g^-(x_n),f(x_n))\end{bmatrix}=E_{\mathrm{out}}(g^-).$$
### 方差分析
我们想要知道方差随着K大小的变化的趋势。
$$\sigma_{\mathrm{val}}^{2}=\mathrm{Var}_{\mathcal{D}_{\mathrm{val}}}{\left[E_{\mathrm{val}}(g^{-})\right]}=\mathrm{Var}_{\mathcal{D}_{\mathrm{val}}}{\left[\frac{1}{K}\sum_{(x_n,y_{n})\in\mathcal{D}_{\mathrm{val}}}e{\left(g^{-}(x_n),y_{n}\right)}\right]}.$$
1/K可以提出来：
$$=\frac{1}{K^2}\sum_{\boldsymbol{x}_n\in\mathcal{D}_{\mathrm{val}}}\underbrace{\mathrm{Var}_{\mathcal{D}_{\mathrm{val}}}\left[\mathrm{e}(g^-(\boldsymbol{x}_n),y_n)\right]}_{\overset{\mathrm{def}}{\operatorname*{\operatorname*{=}}}\sigma^2(g^-)}$$
$$\sigma_{\mathrm{val}}^{2}=\frac{1}{K^{2}}\sum_{n=1}^{K}\sigma^{2}(g^{-})=\frac{1}{K}\sigma^{2}(g^{-}).$$
所以结论为：
$$\boxed{\sigma_{\mathrm{val}}^{2}=\frac{\sigma^{2}(g^{-})}{K}.}$$
验证误差的方差随着验证集大小K增加而线性下降。

我们考虑在二分类问题使用01loss，那么我们有：
$$\sigma_{\mathrm{val}}^2=\mathrm{~Var}{\left[\frac{1}{K}\sum_{n=1}^Ke{\left(g^-(x_n),y_n)\right]}\right.}=\mathrm{~}\frac{1}{K^2}\sum_{n=1}^K\mathrm{Var}{\left[e{\left(g^-(x_n),y_n)\right]}\right.}=\mathrm{~}\frac{1}{K}\mathrm{Var}{\left[e{\left(g^-(x),y\right)}\right]}.$$
而由于二分类问题的Var(e)是一个伯努利随机变量，所以其方差是p(1-p)，因此
$$\sigma_{\mathrm{val}}^{2}=\begin{array}{c}\frac{1}{K}p(1-p)\end{array}\leq\begin{array}{c}\frac{1}{K}\cdot\frac{1}{4}=\end{array}\frac{1}{4K},$$
所以结论为：当K趋向无穷时，验证误差的随机波动可以通过增大验证集规模任意地控制到很小。

### 是否泛化
验证误差是否能很好的泛化到Eout呢？
- 均值：无偏估计。**验证误差的期望**正好等于模型的**真实泛化误差**，是一个**无偏估计**。
- 方差：O(1/K)。$$\sigma_{\mathrm{val}}^2=\mathrm{~Var}{\left[\frac{1}{K}\sum_{n=1}^Ke(g^-(x_n),y_n)\right]}=\mathrm{~}\frac{1}{K^2}\sum_{n=1}^K\mathrm{Var}{\left[e(g^-(x_n),y_n)\right]}=\mathrm{~}\frac{1}{K}\mathrm{Var}{\left[e(g^-(x),y)\right]}=O{\left(\frac{1}{K}\right)}.$$
- Hoeffding 不等式的应用
	- 因为Eval(g-)是K个Bernoulli 变量的平均，由 Hoeffding 不等式可推出：$$E_{\mathrm{out}}(g^{-})\leq E_{\mathrm{val}}(g^{-})+O{\left(\frac{1}{\sqrt{K}}\right)}.$$也就是说，只要验证集足够大，验证误差不仅无偏，而且波动很小，能够以 $O(1/\sqrt{K})$ 的速度收敛到泛化误差。
- 对于**固定假设**h的Hoeffding保证是：$$E_{\mathrm{out}}(h)\leq E_{\mathrm{in}}(h)+O{\left(\frac{1}{\sqrt{N}}\right)},$$ N是训练集大小，而**验证误差**的 Hoeffding 保证只依赖于验证集大小K，

结论：把数据分成训练集和验证集后，用验证集来估计并选择模型时，
- 验证误差的期望正好是该模型的真实错误（无偏）。
- 验证误差的标准误差为 $O(1/\sqrt{K})$ ，可以任意小
- 因此，验证集方法既**可行**又**可靠**，是我们在实践中进行模型选择和超参数调优的根基。

### 大K还是小K
**验证集越大**，对验证误差的估计越**稳定**（波动小），这看起来“越好”。
但如果K极大，那么训练用数据就只有N-K，导致g-本身的泛化能力变差。验证误差的**期望**会上升
如果把K取得很小，模型本身不错，但验证集太小，估计方差大，验证误差很**不稳定**。
![](assets/Pasted%20image%2020250423220136.webp)
灰带是验证误差波动，蓝带是bias。左端K小验证误差波动（灰带）非常大。右端K大，虽然灰带（方差）收窄，但曲线的期望（Bias）向上抬，说明模型因训练数据不足而性能下降。

典型的**经验法则**是把约五分之一作为验证集。如果特别在意方差，可以用**交叉验证**（cross-validation）把验证过程重复多次，再平均结果，从而在不牺牲训练数据规模的前提下，进一步降低估计的方差。

### 基于Validation来选模型
- 准备M个不同模型：$$\mathcal{H}_1,\mathcal{H}_2,\ldots,\mathcal{H}_M.$$
- 训练各个“子模型”，将原始数据集D随机划分为训练集Dtrain和验证集Dval。对每个候选模型Hm在训练集上运行学习算法Am得到一个临时模型：$$g_m^-=\mathcal{A}_m\left(\mathcal{D}_{\mathrm{train}}\right),\quad m=1,\ldots,M.$$
- 在验证集上评估每个临时模型的平均误差：$$E_m\mathrm{~=~}E_{\mathrm{val}}{\left(g_m^-\right)}\mathrm{~=~}\frac{1}{K}\sum_{(x,y)\in\mathcal{D}_{\mathrm{val}}}e{\left(g_m^-(x),y\right)}.$$
- 选择最优模型。取验证误差最低的一号：$$m^*=\arg\min_{1\leq m\leq M}E_m.$$
- 一旦选定了m\*，可以用全量数据集D重新训练一遍，得到最终模型。
显然，我们有：
$$\underbrace{E_{\mathrm{out}}(g_{m^{*}})}_{\text{最终模型的泛化误差}}\leq\underbrace{E_{\mathrm{out}}(g_{m^{*}}^{-})}_{\text{临时模型的泛化误差}}\leq\underbrace{E_{\mathrm{val}}(g_{m^{*}}^{-})}_{\text{最小验证误差}}+O{\left(\sqrt{\frac{\ln M}{K}}\right)}.$$

## Cross Validation
### Leave-one-out Cross Validation
原始数据集N个点：
$$\mathcal{D}=\{(x_1,y_1),\mathrm{~}(x_2,y_2),\mathrm{~}\ldots,\mathrm{~}(x_N,y_N)\}.$$
把第 n个样本剔除，剩下：$$\mathcal{D}_n=\mathcal{D}\setminus\{(x_n,y_n)\}.$$
在剔除后的训练集上训练：
$$g_n^-=\mathcal{A}(\mathcal{D}_n)\mathrm{~.}$$
计算这个模型在被剔除的点上的验证误差：
$$e_{n}=E_{\mathrm{val}}{\left(g_{n}^{-}\right)}=\ell{\left(g_{n}^{-}(x_{n}),y_{n}\right)},$$
重复N次，得到：$$ e_1,e_2,\ldots,e_N$$
最终的估计是所有e的平均：
$$E_{\mathrm{cv~}}=\frac{1}{N}\sum_{n=1}^Ne_n.$$
优点：
- 用尽了几乎所有数据做训练，避免了“训练样本太少”的欠拟合风险；
- 对泛化误差的估计更稳定、无偏。
缺点：
- 需要训练 N次，计算量通常会很大。
	- 在带L2正则的岭回归场景，Ecv有快速计算公式。岭回归有解析解：$$w^*(\lambda)=\left(A^\top A+\lambda I\right)^{-1}A^\top y,$$ 我们定义帽子矩阵：$$H(\lambda)=A{\left(A^\top A+\lambda I\right)}^{-1}A^\top,\quad\hat{y}=Hy,$$ 那么Ecv的速算公式就是：$$E_{\mathrm{loocv}}=\frac{1}{N}\sum_{n=1}^N\left(\frac{\hat{y}_n-y_n}{1-H_{nn}(\lambda)}\right)^2,$$ 能O(Nd\^2)地计算出所有留一误差, 而不用训练N次。我们可以用使得Ecv最小的lambda作为模型。

我们来证明Ecv是一个Eout的无偏估计。我们记：
$$g^{(D)}=\text{ 在全数据集 }D\text{ 上训练得到的模型,}$$
它的总体样本外误差（对所有可能训练集D做平均）：
$$E_{\mathrm{out}}(N)=\mathbb{E}_{D}[E_{\mathrm{out}}(g^{(D)})].$$
N为训练集规模。
而：
$$\begin{aligned}\mathbb{E}\begin{bmatrix}E_{\mathrm{cv}}\end{bmatrix}&=\mathbb{E}_D\left[\frac{1}{N}\sum_{n=1}^Ne_n\right]\\&=\frac{1}{N}\sum_{n=1}^N\mathbb{E}_D[e_n]\\&=\mathbb{E}_D[e_n]\\&=E_{\mathrm{out}}(N-1).\end{aligned}$$
于是：
$$\boxed{\mathbb{E}{\begin{bmatrix}E_{\mathrm{cv}}\end{bmatrix}}=E_{\mathrm{out}}(N-1)}$$
我们说留一法几乎无偏估计了Eout


### V-fold Cross Validation
其实本质上就是Leave More-Than-One Out。
把整个数据集随机分成V fold，每一份大小约为N/V，记为 $\mathcal{D}_1,\ldots,\mathcal{D}_V$
第v次用Dv作为验证集，其余V-1份联合起来作为训练集算出验证误差：
$$E_{\mathrm{val}}^{(v)}(g_v^-)=\frac{1}{|\mathcal{D}_v|}\sum_{(x,y)\in\mathcal{D}_v}e{\left(g_v^-(x),y\right)}.$$
总体误差就是V次误差的平均：
$$E_{\mathrm{cv}}(\mathcal{H},\mathcal{A})=\frac{1}{V}\sum_{v=1}^VE_{\mathrm{val}}^{(v)}(g_v^-).$$
V一般取5或10 （？）


