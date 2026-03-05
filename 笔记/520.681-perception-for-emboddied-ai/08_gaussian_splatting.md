# Gaussian Splatting for Novel View Synthesis
## Intro
我们现在已经可以通过Stereo来重建3D点坐标了，得到的是一堆点云
然而，我们是不满足于点云的，点云之间会有空洞，视觉上也不连续，而且也没有真是的图像（颜色）
所以，我们要从Reconstruction，到Render。

前提：
normalization 2D坐标：将坐标根据光心归一化：
$$\begin{aligned}x_n=\frac{u-c_x}{f_x},\quad&y_n=\frac{v-c_y}{f_y}\end{aligned}$$
恢复相机坐标的3D点云坐标：
$$(X,Y,Z)^\top=z\left(x_n,y_n,1\right)^\top\quad\Rightarrow\quad X=zx_n,Y=zy_n,Z=z$$
目标：
![[08_gaussian_splatting-1771899730705.png]]
## Novel View Synthesis
定义任务：
- 从多视角图像中学习一个可渲染的 3D 表示，使得可以在任意新视角生成图像。图里面DSLR是单反相机。
![[08_gaussian_splatting-1771899847663.png|615x371]]

## Neural Radiance Field （NeRF）
### Radiance Field 辐射场
![[08_gaussian_splatting-1771900865525.png|350x235]]
我们想知道，在空间中任意一点，从任意方向看过去，你能看到什么？

- 什么是Radiance？我们认为，光就是一种辐射，一个辐射源（光源），给一个方向，就应该给出发出光的颜色和强度。
   为什么需要方向？因为很多物体在不同角度下发出的颜色是不同的，比如说镜面反射，高光之类的。
- 什么是Radiance Field？就是Radiance + 场景。我们给定了光源，方向，就知道颜色了，但在Field中，会有其他物体，所以可能会有遮挡。所以Radiance Field就是一个定义遮挡关系，光源，方向，给出颜色和光强度的场。

 那么我们就定义，Radiance Field就是一个定义在 3D 空间 + 方向上的函数，描述了哪里有物体（光源），发出什么颜色（颜色），是否被遮挡。

### NeRF全过程
NeRF就是去训练一个MLP，学习这样一个函数：
$$f_\theta:(\boldsymbol{x}\in\mathbb{R}^3,\boldsymbol{d}\in\mathbb{R}^3)\mapsto\begin{pmatrix}\sigma(\boldsymbol{x}),&\boldsymbol{c}(\boldsymbol{x},\boldsymbol{d})\end{pmatrix}.$$
其中：
- x为3D世界坐标
- d为方向向量
输出：
- $\sigma(x)$ volume density，表示“这个位置有多少物质”，用来控制遮挡。注意这个表示的是某一点是否有遮挡，而是否被遮挡要对这个东西积分，后面会说。
- $c(\boldsymbol{x},\boldsymbol{d})$ 颜色，表示朝方向 d 发出的颜色


NeRF目标：
![[08_gaussian_splatting-1771901383291.png|607x283]]
#### 训练NeRF
![[08_gaussian_splatting-1771901553363.png|614x355]]
输入：3D位置以及观察方向
输出：Color + Density
那么结果是怎么监督的呢？NeRF不监督真实的密度函数和颜色。
NeRF在得到color和density之后，通过积分得到一个投影的颜色，然后根据这个颜色与GT上的颜色做loss。所以NeRF只用 2D 图像监督，没有3D GT。

#### 通过NeRF渲染
ok，假设我们现在已经有了NeRF模型，能给出原点和方向的sigma和c，那么如果我们定义相机坐标为o，沿着相机朝向的渲染范围为tn到tf：
$$\boldsymbol{x}(t)=\boldsymbol{o}+t\operatorname{\boldsymbol{d},\quad}\quad t\in[t_n,t_f],$$
那么2D颜色的结果为：
$$\boldsymbol{C}(\boldsymbol{o},\boldsymbol{d})=\int_{t_n}^{t_f}T(t)\sigma(\boldsymbol{x}(t))\boldsymbol{c}(\boldsymbol{x}(t),\boldsymbol{d})dt$$
其中：
- $c(x,d)$ 为点沿方向d发出的颜色
- $\sigma(x)$ 为体密度（控制遮挡），大了容易遮光，小了更透明
- $T(t)=\exp\left(-\int_{t_n}^t\sigma(\boldsymbol{x}(s))ds\right)$，这个东西是关键，它表示从相机到 t 之间还没有遮住的概率，sigma在之前越大，Tt越小。
这公式可以大概理解为：
$$\text{visibility}\times\mathrm{opacity}\times\mathrm{color}$$
$$(还看得见) \times (这里有多少物体) \times (这里是什么颜色)$$
![[08_gaussian_splatting-1771902631126.png|259x272]]
那这个图为例：
- 前面黑点：没有密度 → 可见
- 黄点后面的黑点：有密度但不可见（被挡住）
- 黄色点：第一处明显密度的位置。渲染的权重大多集中在第一次接触物体表面的位置，这就是 NeRF 能恢复“表面”的原因。

##### 离散化NeRF渲染
如果我们真的做积分，那么计算速度可想而知太慢了，不现实。所以我们要用计算机的艺术，把它离散化。

现实中不能做连续积分，所以在 ray 上采样 K 个点 $\{t_k\}_{k=1}^K$，每个step size表示为：$\delta_k=t_{k+1}-t_k$
我们定义：
$$\sigma_k=\sigma(x(t_k))$$$$c_k=c(x(t_k),d)$$
接下来我们定义一个重要的东西：αₖ
$$\alpha_k=1-\exp(-\sigma_k\delta_k)$$
它的物理意义是：在第 k 小段内，光被“击中（吸收，挡住）”的概率。那么T就可以离散化表示成：
$$T_k=\prod_{j<k}(1-\alpha_j),$$
意思是，没有被挡住的概率。之后，我们定义权重：
$$w_k=T_k\alpha_k$$
意思是，前面没被挡住 × 这里被吸收，就是这里能存下多少光。
那么离散渲染公式就是：
$$C\approx\sum_{k=1}^Kw_kc_k+T_{K+1}C_{bg}$$
意思是每个点按权重加起来，剩余没被吸收的部分给背景。我们有时也会省略第二项背景项。
这是离散NeRF渲染的过程，权重会集中在物体表面：
![[08_gaussian_splatting-1771903418931.png|593x321]]

#### NeRF缺点
根据上面的渲染过程，我们很明显能看到一个问题：如果NeRF想要渲染一个像素点，就需要对整条射线上的点进行建模，每个点都要让MLP的函数计算一遍，很慢。

所以，我们要转向Gaussian Splatting，这个方法允许我们：
- 更快的渲染速度
- 几何层面的显式表达，而不是隐式的场。

## Gaussian Splatting 高斯溅射
### Gaussians描述Radiance Field
不像NeRF，我们得需要MLP去得到一个原点+方向 -> 密度+颜色的随深度连续变化的函数，我们将场景表示为：
$$\mathrm{Scene}=\sum_{i=1}^N\mathrm{Gaussian}_i$$
每个高斯为：
 $$\mathrm{Gaussian}_i:\{\mu_i\in\mathbb{R}^3,\mathrm{~}\Sigma_i\in\mathbb{R}^{3\times3},\mathrm{~}\alpha_i\in(0,1),\mathrm{~}c_i\in\mathbb{R}^3\}$$
 $$G_i(x)=\alpha_i\exp\left(-\frac{1}{2}(x-\mu_i)^T\Sigma_i^{-1}(x-\mu_i)\right)$$
其中：
- $\mu_i$ 为高斯中心
- $\Sigma_i$ 为协方差，来描述高斯是球还是个椭球，以及形状朝向
- $\alpha_i$为这个Gaussian遮挡光的能力，也就是透明度，1不透明，0透明，它对应 NeRF 里的 density x 积分后的 opacity。
- $c_i$ 为颜色
![[08_gaussian_splatting-1771904320584.png|542x194]]
### 初始化Gaussian
对于每个高斯的中心，我们就用SfM得到的点云中的每一个点作为一个中心。
对于每个高斯，颜色密度啥的都可以随机生成。

### 快速渲染思路：Rasterization光栅化
首先，如果像NeRF一样，对于一条ray上的每个采样点进行渲染，就像这样：
![[08_gaussian_splatting-1771904596096.png|645x273]]
很容易看到一个问题，就是很多采样点都不在Gaussian的内部（Sparse），所以很多点就是废点。
那么我们就转变思路，我们不往出走，那么就让Gaussian往我们这边打，这就叫Rasterization光栅化。不再“ray marching”，而是“把3D高斯投影到2D图像上”。一个 3D Gaussian投影后就会成为一个2D 椭圆 Gaussian，每个pixel 只看覆盖它的 Gaussians即可。这就是Gaussian渲染的思路。
![[08_gaussian_splatting-1771905003459.png]]

#### 问题：3D Gaussian的准确2D投影大概率不是2D Gaussian
回忆：在3D到2D的投影中，我们要除以深度z：
![[08_gaussian_splatting-1771905188236.png|564x307]]
然而，一个高斯椭球距离你眼睛的距离是不一样的，这就导致了一个非线性变化。所以投影后，线性变化f和c是ok的，还可以当成2D gaissian被参数吸收，但是不同的z无法被吸收，所以会变形：
![[08_gaussian_splatting-1771905268070.png|367x345]]
为了简单，我们要用到一个方法，叫做local affine approximation，就和SVD一样的思路，强迫是一个最接近的仿射。
这个最接近的2D Gaussian是：
$$\Sigma_{2D}=J\Sigma_{3D}J^T$$
---
推导：
令$$\mu=(X,Y,Z)^T$$
投影：
$$\pi(X,Y,Z)=\begin{pmatrix}f_xX/Z+c_x\\f_yY/Z+c_y\end{pmatrix}$$
对xyz求导有：
$$J=\begin{bmatrix}\frac{f_x}{Z}&0&-\frac{f_xX}{Z^2}\\0&\frac{f_y}{Z}&-\frac{f_yY}{Z^2}\end{bmatrix}$$
令$Y=f(X)$，则在mu附近一阶泰勒展开：
$$f(x)\approx f(\mu)+J(x-\mu)$$
于是：
$$Y-\mathbb{E}[Y]\approx J(X-\mu)$$
代入协方差：
$$\operatorname{Cov}(\boldsymbol{Y})\boldsymbol{\approx}\operatorname{Cov}(J(\boldsymbol{X}-\mu))=J\operatorname{Cov}(\boldsymbol{X})J^\top=J\Sigma J^\top$$
---
### 渲染过程
首先，我们定义权重就是2D Gaussian方程：
$$w_i(p)=\exp\left(-\frac{1}{2}(p-u_i)^\top\Sigma_{2D,i}^{-1}(p-u_i)\right)$$
然后我们有一个本Gaussian的透明度$\alpha_i\in(0,1)$，那么这个Gaussian遮的光就是：
$$\hat{\alpha}_i(p)=\alpha_i\left.w_i(p)\right.$$
这里面的alpha i是初始化就有的。
然后，将Gaussian按照从前往后排序，去进行alpha blending。注意，一定要排序！不能交换。
$$C=\sum_{i=1}^N\boldsymbol{c}_i\hat{\alpha}_i\prod_{j=1}^{i-1}\left(1-\hat{\alpha}_j\right)$$
在渲染的时候，还要用一个技巧：tile-based rasterizer分块光栅化
因为如果每渲染一个pixel，就要遍历所有的Gaussian，那就太慢，太多了，有很多都没用。分块光栅化的原来是，把2D图片分为多个16x16或者32x32的块，在这个块中，我们渲染pixel的时候只去遍历2D投影椭球能覆盖这个块的Gaussian，这就可以加速了。
![[08_gaussian_splatting-1771907141105.png|510x229]]
另外，Gaussian的渲染是可以并行进行的，所以很快。

### 训练过程
#### Loss定义
Loss定义如下，用L1距离：
$$\mathcal{L}_{\mathrm{photo}}=\sum_v\lVert\hat{I}^{(v)}-I^{(v)}\rVert_1.$$
算的是给定视角v，整个投影图像和GT的Loss。然而实际训练中，还要加入一个SSIM（结构相似度），Loss变成：
$$\mathcal{L}=(1-\lambda)\mathcal{L}_1+\lambda\mathcal{L}_\mathrm{D-SSIM}$$
这样可以保证颜色一致，结构一致，避免只学到平均色。

---
SSIM：比较的是 **局部 patch 的统计结构是否一致**。
给定两个小窗口（patch）x y，是从不同view看同一个3D位置的patch，算出均值方差协方差：
$$\mu_x=\mathbb{E}[x],\quad\mu_y=\mathbb{E}[y]$$
$$\sigma_x^2,\sigma_y^2$$
$$\sigma_{xy}$$
那么SSIM的定义为：
$$\mathrm{SSIM}(x,y)=\frac{(2\mu_x\mu_y+C_1)(2\sigma_{xy}+C_2)}{(\mu_x^2+\mu_y^2+C_1)(\sigma_x^2+\sigma_y^2+C_2)}$$
C1，C2为常数，一般L为dynamic range，k1=0.01，k2=0.03。
$$C_1=(k_1L)^2,C_2=(k_2L)^2$$
这里面包含了亮度一致性：
$$\frac{2\mu_x\mu_y}{\mu_x^2+\mu_y^2}$$
对比度一致性：
$$\frac{2\sigma_x\sigma_y}{\sigma_x^2+\sigma_y^2}$$
还有结构一致性：
$$\frac{\sigma_{xy}}{\sigma_x\sigma_y}$$
其实就是确保，两个view看同一个位置（x y两个patch），所还原出来的3D高斯差不多。

---
#### Pruning和Densification
另外，在训练过程中，Gaussian的数量不是一成不变的，而是会动态调整的。这个过程称为Pruning（剪枝）和Densification（稠密化）。
![[08_gaussian_splatting-1771908194487.png|502x268]]
在一个2D区域内，Gaussian 数量有限，有可能无法准确表达区域内的每个像素的颜色组合，那么就复制一个Gaussian。如果Gaussian太大，整个区域就糊了，那么就分割成两个继续优化。

具体来说，Pruning情况：
- α 太小 → 删（太透明，有没有都一样）
- 如果 Gaussian 太大 → 删（糊了）

Densify的情况：
- Gaussian 很大 + 梯度大。这说明覆盖的区域误差大，但表现力不足，说明糊了，说明需要更细致的表现，分割成小的。
- Gaussian 很小 + 梯度大。说明结构方向差不多对了，但是表现不过去。那就Clone 一个，然后往梯度方向移动

### 评估过程
不用L1了，而是用一个新指标PSNR：
$$\mathrm{MSE}(I,\hat{I})=\frac{1}{HW}\sum_{u,v}\left(I(u,v)-\hat{I}(u,v)\right)^2.$$$$\mathrm{PSNR}(I,\hat{I})=10\log_{10}\left(\frac{\mathrm{MAX}_I^2}{\mathrm{MSE}(I,\hat{I})}\right)$$
很简单，其实就是均方差，PSNR是一个只有关于均方差的metric，MSE越低，PSNR越高越好：
$$\mathrm{PSNR}\propto-\log(\mathrm{MSE})$$
用这玩意主要是相当于变成了分贝dB的形式，比较好量化。

### 高斯溅射Full Pipeline
Full Pipeline：
![[08_gaussian_splatting-1771908784134.png]]

optimization循环：
![[08_gaussian_splatting-1771908869168.png|880x307]]
1. 随机选一张或多张训练图片（已知相机 pose + intrinsics，以及真实图像）
2. 用当前 Gaussians 渲染预测图像
3. 计算加了Regularizer的Loss
4. 反向传播
5. Adam更新参数
6. 每M个iterations，就去检查一下要不要prune或者densify。