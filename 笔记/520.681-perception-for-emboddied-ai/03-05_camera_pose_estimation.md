# Single View Pose Estimation
## Plane Homography Camera Pose Estimation
我们说的Homography是一个$\mathbb{P}^2\to\mathbb{P}^2$ 的过程，所以其H矩阵的维度是3x3
上一节我们提到，当映射前的对象为一个平面时，我们可以认为这个过程是一个Homography。因为其KRT矩阵会退化成一个3x3的矩阵。原因是我们可以任意一个维度为0（为方便选z = 0），那么过程就退化为：
$$\lambda\boldsymbol{x}=\mathbf{K}\left[\mathbf{R}\left|\mathbf{t}\right]\right.\begin{bmatrix}X\\Y\\0\\1\end{bmatrix}=\mathbf{K}\left[\mathbf{~R}_{1}\mathbf{~R}_{2}\mathbf{~t}\right]\begin{bmatrix}X\\Y\\1\end{bmatrix}.$$
这就是一个3x3的矩阵，可以用Homography解释了。

现在我们认为，KR1R2t就是H，那么我们如何从H还原回R1 R2 t呢？
其实很简单。由于K是相机的内参矩阵，我们是已知的，那么我们就能求K的逆。然而，由于H是尺度不变的，R1 R2 t的尺度无法确定吗？不是的。由于旋转矩阵的特性（正交，每一个基都是单位方向向量，也就是模长为1），那么我们可以根据R1 R2的模来确定尺度，从而还原出R1 R2 t。R3可以通过R1 R2的叉乘得到。

$$\widehat{\mathbf{H}}=\mathbf{K}^{-1}\mathbf{H}=[\begin{array}{c}\hat{\boldsymbol{h}}_{1}&\hat{\boldsymbol{h}}_{2}&\hat{\boldsymbol{h}}_{3}\end{array}].$$
$$s=\frac{1}{\|\hat{\boldsymbol{h}}_1\|}\quad(\approx\frac{1}{\|\hat{\boldsymbol{h}}_2\|}).$$
实际中我们用两根轴的平均：
$$s\approx\frac{1}{2}{\left(\frac{1}{\|\hat{\boldsymbol{h}}_1\|}+\frac{1}{\|\hat{\boldsymbol{h}}_2\|}\right)}$$
$$\mathbf{R}_1=s\hat{\boldsymbol{h}}_1,\quad\mathbf{R}_2=s\hat{\boldsymbol{h}}_2,\quad\mathbf{t}=s\hat{\boldsymbol{h}}_3,\quad\mathbf{R}_3=\mathbf{R}_1\times\mathbf{R}_2.$$
是否结束了？没有。在现实中，我们得到的这个R不一定是正交矩阵，因为我们的点选的可能是有误差的。为了保证其正交性，我们就要强行让其正交，方法是SVD。
具体来说，把已有的R分成U S V之后，U和V是旋转，S是尺度放缩。理想情况下S应该是一个1的对角阵，实际可能不是，我们就要迫使S是一个对角阵。
$$\mathbf{R}=\mathbf{U}\operatorname{diag}(1,1,\det(\mathbf{U}\mathbf{V}^{\top}))\mathbf{V}^{\top}.$$
为什么多一个det UVT呢？其实就是一个符号问题。理想中我们要UVT就可以了，但实际上这个东西如果是负的，也就是镜面情况也成立。所以如果UV的绝对值是正1，那么在这里就能保证是正。如果是负数，那么这个负也可以把它扭过来。

最后我们还要检查一下是否合法。计算：
$$\boldsymbol{X}_c=\mathbf{R}\boldsymbol{X}+\mathbf{t}$$
如果z大多数都大于0，就合法，反之不合法。这个过程叫Cheirality手性。因为如果点都在相机的后面，其实也成立，只不过我们不要这个解。如果都在后面，我们就给R和t都加个负号，变成-R -t

然后就是一个例子了 April Tag的pose estimation
![[03_single_view_pose_estimation-1770775880834.png|699x211]]
![[03_single_view_pose_estimation-1770775893063.png|660x332]]这个slide中H和K没乘，是分开的，写的有歧义。
![[03_single_view_pose_estimation-1770775916102.png|683x390]]
![[03_single_view_pose_estimation-1770775931957.png|690x332]]
重建误差不为0，很正常，因为可能不是平面，有错误的识别标点等。反正就是不准确。

## Non-planer Camera Pose Estimation
### PnP问题 Perspective-N-Points
已知：
- 内参矩阵K
- n个对应点 (3D点坐标，其对应点2D点坐标)
求：
- R和t
![[03_single_view_pose_estimation-1770776682284.png|422]]
##### 解法1：最小化重建误差（最小二乘）
很直观，就和名字一样。
首先定义一个函数Pi
$$\pi\left(\mathbf{K}(\mathbf{R}\boldsymbol{X}+\mathbf{t})\right)=\begin{bmatrix}\frac{f_{x}X_{c}}{Z_{\varepsilon_{c}}}+c_{x}\\\frac{f_{y}Y_{c}}{Z_{c}}+c_{y}\end{bmatrix},\quad\begin{bmatrix}X_{c}\\Y_{c}\\Z_{c}\end{bmatrix}=\mathbf{R}\boldsymbol{X}+\mathbf{t}.$$
X是世界坐标。Xc是相机坐标系坐标，piKRX+t其实就是拍照，得到所有X的照片坐标。

那么我们的目标就是最小化重建误差：
$$\min_{\mathbf{R}\in SO(3),\mathbf{t}\in\mathbb{R}^3}\sum_{i=1}^n\left\|\boldsymbol{x}_i-\pi{\left(\mathbf{K}(\mathbf{R}\boldsymbol{X}_i+\mathbf{t})\right)}\right\|_2^2.$$
我们用r来替代这个差值：
$$\min_{\boldsymbol{x}}\frac{1}{2}\sum_{i=1}^{m}r_{i}(\boldsymbol{x})^{2}\quad\Longleftrightarrow\quad\min_{\boldsymbol{x}}\frac{1}{2}\|\boldsymbol{r}(\boldsymbol{x})\|^{2},$$
这就是一个非线性优化问题。一般我们用Gauss-Newton或者Levenberg-Marquardt解决。是否为线性，说的是r(x)是否能写成Ax + b的形式，而不是在说别的。由于r(x)里面有了fx/z, 就相当于fr1X/r3X，x出现在了除法上，就不是线性了。

首先，线性最小二乘是有封闭解的：
![[03_single_view_pose_estimation-1770777295388.png|719x252]]
PnP没法直接用这个结论。因为不是线性的，但我们可以用迭代方法，每一个迭代里面用一个很小的线性去拟合非线性。
![[03_single_view_pose_estimation-1770777910789.png|569x235]]
方法就是用一阶泰勒展开：
$$\boldsymbol{r}(\boldsymbol{x}_k+\Delta\boldsymbol{x})\approx\boldsymbol{r}(\boldsymbol{x}_k)+\boldsymbol{J}(\boldsymbol{x}_k)\operatorname{\Delta\boldsymbol{x}}.$$
那么对于delta x来说，这个式子就是线性的：
	$$F(\Delta x_{around x_k})\approx\frac{1}{2}\left\|r(x_k)+J(x_k)\Delta x\right\|^2 = \frac{1}{2}\parallel J\Delta x-(-r)\parallel^2$$
这里不是说 r(x) 变线性了，而是在“当前点附近”，把 r(x) 对 Δx 线性化了。
###### Gauss-Newton Method
那么这玩意可以用线性最小二乘的公式，得到最优封闭解delta x
$$\boldsymbol{J}^{\top}\boldsymbol{J}\Delta\boldsymbol{x}=-\boldsymbol{J}^{\top}\boldsymbol{r}.$$
之后，更新x。$$\boldsymbol{x}_{k+1}=\boldsymbol{x}_k+\Delta\boldsymbol{x}.$$
对于J的计算，可以用解析解，也可以用数值解。解析解因为有rotation不好算，可以用数值解。


###### Levenberg-Marquardt (LM)
唯一变化是加了一个lambda I
$$\left(\boldsymbol{J}^{\top}\boldsymbol{J}+\lambda\boldsymbol{I}\right)\Delta\boldsymbol{x}=-\boldsymbol{J}^{\top}\boldsymbol{r},\quad\lambda\geq0.$$
其实相当于就是一个L1 norm。这个是为了当J用数值解计算不准时，不至于走太歪，限制delta x的大小罢了。思想很简单。

###### 问题1：R可能无效
不管用GN还是LM，都要对R额外注意，因为有限制，比如det = 1，正交的限制。
$$\min_{R\in SO(3),t\in\mathbb{R}^3}\sum_i\|x_i-\pi(K(RX_i+t))\|^2$$
两个旋转矩阵相加 ≠ 旋转矩阵，一个小数值误差就会导致R无效。可以用合法的值初始化，每一步都进行SVD合法化处理，来避免问题。

###### 问题2：outliers and initialization
- Outliers introduce errors
- Bad initialization prevents convergence

![[03_single_view_pose_estimation-1770780116660.png|621x209]]

##### 解法2：P3P: 最小求解器 + outlier拒绝
3个点解决PnP会带来4个解，再加一个最后一个点来得到独立解。
3 个点 → 会导出一个四次多项式 → 最多 4 个实解 → 对应 4 个相机位姿。后面会更详细讲解为什么是四个解。
![[03_single_view_pose_estimation-1770780238273.png|618x236]]

首先，对于第i个像素点，去掉内参得到射线，并得到其方向向量。
$$\hat{\boldsymbol{x}}_i\sim\mathbf{K}^{-1}\begin{bmatrix}u_i\\v_i\\1\end{bmatrix},\quad\boldsymbol{d}_i=\frac{\hat{\boldsymbol{x}}_i}{\|\hat{\boldsymbol{x}}_i\|}\in\mathbb{R}^3.$$
现在我们相当于处于这个境地：
![[03_single_view_pose_estimation-1770780878590.png|402x174]]
知道camera，知道d13 d12 d23，知道d1 d2 d3的方向向量，但不知道距离。
定义：
$$d_{23}=\|\boldsymbol{P}_{2}-\boldsymbol{P}_{3}\|,\quad d_{13}=\|\boldsymbol{P}_{1}-\boldsymbol{P}_{3}\|,\quad d_{12}=\|\boldsymbol{P}_{1}-\boldsymbol{P}_{2}\|.$$
$$\alpha=\angle(\boldsymbol{d}_2,\boldsymbol{d}_3),\quad\beta=\angle(\boldsymbol{d}_1,\boldsymbol{d}_3),\quad\gamma=\angle(\boldsymbol{d}_1,\boldsymbol{d}_2).$$
根据余弦定理：
$$d_2^2+d_3^2-2d_2d_3\cos\alpha=d_{23}^2$$$$d_1^2+d_3^2-2d_1d_3\cos\beta=d_{13}^2,$$$$d_1^2+d_2^2-2d_1d_2\cos\gamma=d_{12}^2.$$
通过消元法可以化解为一个四次多项式，能解出4对d1 d2 d3的长度。
根据 $\boldsymbol{p}_i=d_i\boldsymbol{u}_i$ ，我们可以得到三个点p1 p2 p3的相机坐标。我们也有P1 P2 P3也就是世界坐标，目标求R t，也就是：
$$\min_{\mathbf{R}\in SO(3),\mathrm{~}\mathbf{t}\in\mathbb{R}^3}\mathrm{~}\sum_i\lVert\boldsymbol{p}_i-(\mathbf{R}\boldsymbol{P}_i+\mathbf{t})\rVert_2^2.$$
这就是 Procrustes 问题。如何解决Procrustes问题？
![[03_single_view_pose_estimation-1770782363019.png|486x209]]

那么4个解如何确定那个解是对的？use a 4th point。计算重投影误差；选择误差最小且深度为正的解。
![[03_single_view_pose_estimation-1770782633147.png|748x349]]
###### 解决Procrustes问题 (3D -> 3D pose estimation)
在P3P中，当我们求出d1 d2 d3后（虽然有四组），我们就相当于有了三个点的相机坐标系坐标了。那么，我们现在有这三个点的世界坐标系坐标。问题就从PnP问题的2D 3D pose estimation到了一个3D 3D的pose estimation问题。这个问题叫做Procrustes问题。
问题定义：给定两组空间点，以及对应关系，解出R t。
问题优化的目标是：
$$f(\mathbf{t})=\sum_{i=1}^N\|\mathbf{R}\boldsymbol{x}_i+\mathbf{t}-\boldsymbol{y}_i\|_2^2.$$
我们尝试找到封闭的最优t\*：
$$\frac{\partial f}{\partial\mathbf{t}}=2\sum_{i=1}^{N}(\mathbf{R}\boldsymbol{x}_{i}+\mathbf{t}-\boldsymbol{y}_{i})=0.$$
$$N\mathbf{t}=\sum_{i=1}^{N}\boldsymbol{y}_{i}-\mathbf{R}\sum_{i=1}^{N}\boldsymbol{x}_{i}\quad\Longrightarrow\boxed{\mathbf{t}^{*}=\bar{\boldsymbol{y}}-\mathcal{R}\bar{\boldsymbol{x}},\quad}$$
那么后面我们就可以把t用这个R换掉。
我们定义xc和yc为去掉t的点（中心化后的）：
$$\boldsymbol{x}_{c}=\boldsymbol{x}_{i}-\bar{\boldsymbol{x}},\quad\boldsymbol{y}_{c}=\boldsymbol{y}_{i}-\bar{\boldsymbol{y}}.$$
那么问题可以转化为：
$$\min_{\mathbf{R}\in\mathrm{SO}(d)}\|\mathbf{R}\mathbf{X}_{c}-\mathbf{Y}_{c}\|_{F}^{2}.$$
展开：
$$\|\mathbf{R}\mathbf{X}_c-\mathbf{Y}_c\|_F^2=\|\mathbf{R}\mathbf{X}_c\|_F^2+\|\mathbf{Y}_c\|_F^2-2\operatorname{tr}(\mathbf{R}\mathbf{X}_c\mathbf{Y}_c^\top).$$
>[!note] 我们补充一下。这个F范数，名叫Frobenius norm。几何意义就是把一个矩阵拉直后的长度。所以只要一个矩阵不让这个玩意的长度改变，那么它的F范数就不变。$$\|\mathbf{A}\|_F=\sqrt{\sum_{i=1}^m\sum_{j=1}^nA_{ij}^2}=\sqrt{\mathrm{tr}(\mathbf{A}^\top\mathbf{A})}=\|\mathrm{vec}(\mathbf{A})\|_2.$$

所以 $\|\mathbf{R}\mathbf{X}_c\|^2_{F}=\|\mathbf{X}_c\|^2_{F}$，因为旋转矩阵没有改变其长度。
所以上式就变为：
$$\min_{\mathbf{R}\in\mathrm{SO}(d)}\|\mathbf{R}\mathbf{X}_c-\mathbf{Y}_c\|_F^2=\|\mathbf{X}_c\|_F^2(Const)+\|\mathbf{Y}_c\|_F^2(Const)-2\operatorname{tr}(\mathbf{R}\mathbf{X}_c\mathbf{Y}_c^\top)$$
$$\Longleftrightarrow \max_{\mathbf{R}\in\mathrm{SO}(d)}\mathrm{~tr}(\mathbf{RH}),\quad\mathbf{~H}=\mathbf{X}_c\mathbf{Y}_c^\top\in\mathbb{R}^{d\times d}.$$
那这个就简单了。SVD分解H，trH，让H对角线转正能量最大。所以逆着转就可以了。在恢复的过程中要注意手性，注意不要反射。
$$\mathbf{H}=\mathbf{U}\mathbf{\Sigma}\mathbf{V}^\top.$$
$$\begin{aligned}\mathbf{D}&=\mathrm{diag}(1,\ldots,1,\det(\mathbf{V}\mathbf{U}^{\top})).\\\\\mathbf{R}^{*}&=\mathbf{V}\mathbf{D}\mathbf{U}^{\top}\in\mathrm{SO}(d).\end{aligned}$$
有了R之后，就可以代入算出t了。
用三个点就可以的原因是，三不共线的点就可以确定一个正交基。有了正交基就可以算旋转和t了。
![[03_04_single_view_pose_estimation-1770853672101.png|444x344]]
### PNP问题拒绝outlier
##### RANSAC
RANSAC的对象是使用P3P这个minimum solver去迭代。
![[03_04_single_view_pose_estimation-1770853746582.png|611x152]]

在Count inlier的时候，要手动设定一个超参，比如说欧几里得距离小于某个值，就算inlier.
![[03_04_single_view_pose_estimation-1770853823332.png|518x384]]
RANSAC的全过程：
其中MSS是 Minimal Sample Set
![[03_04_single_view_pose_estimation-1770854006777.png|648x246]]
- 随机采样最小集合（MSS）
- 拟合一个模型 θk
- 找到内点集合 $\mathcal{I}_k$
- 如果内点数更多 → 更新 best fit
- 循环，最终返回最优参数。
###### RANSAC 概率分析所需轮次下限
如果设
- $w$ 为inlier比率（自己猜的）
- $s$ 为 MSS 的 size
- $p$ 为希望的成功概率。成功的定义为抽到的 MSS 全部都是 inliers。
那么一次fit就成功的事件为，一次抽到s个inlier：
$$\Pr(\mathrm{all~}s\text{ are inliers})=w\cdot w\cdots w=w^s.$$
那么一次失败的概率为：
$$\Pr(\text{trial fails})=1-w^s.$$
那N次都失败的概率为：
$$\Pr(\text{fail in all }N)=(1-w^s)^N.$$
那么N次至少成功1次的概率为：
$$1-(1-w^s)^N$$
我们希望其大于等于p
$$\begin{aligned}1-(1-w^s)^N\geq p\quad\Longleftrightarrow\quad(1-w^s)^N\leq1-p.\end{aligned}$$
解得N的下限：
$$N\left.\log(1-w^s)\leq\log(1-p)\quad\Longleftrightarrow\quad N\geq\frac{\log(1-p)}{\log(1-w^s)}.\right.$$
##### Hough Transform
这个方法的foundation是，我们先换一种方法描述直线。直线除了可以用ax+by+c的形式表示，还可以用法线方向角theta和法线长度$\rho$来定义。
![[03-05_camera_pose_estimation-1770859018967.png|597x233]]

那么我们的参数空间从a b c就变到了 rho 和 theta。
如果我们固定一个点 $(x_0,y_0)$，那么在参数空间中（横轴为theta，纵轴为rho），图像是这样的一条曲线：
$$\rho(\theta)=x_0\cos\theta+y_0\sin\theta.$$
![[03-05_camera_pose_estimation-1770859294828.png|585x252]]
那么欧氏空间一个点在参数空间就是一条曲线，参数空间一个点在欧氏空间就是一条直线。
可以看到，这四条线交到了同一个点，那么这个点代表的参数组合代表的欧氏空间直线就是过四个点共线的参数组合。
共同的交点叫做peak。

参数空间一条曲线代表一个点，如果把这些曲线的亮度叠加（相当于多出一个新维度，vote维度），那么交点就是最高（亮度最大）的点。
![[03-05_camera_pose_estimation-1770859491497.png|577x333]]
当这些点显然不共一条线时，voting结果是这样的：
![[03-05_camera_pose_estimation-1770859519692.png|581x233]]
可以用这种方法发现多个共线的线：
![[03-05_camera_pose_estimation-1770859567512.png|582x232]]
所以Hough Transform这个方法的好处是，可以找到最共线的那条线，也可以找到多个点中的pattern。

现实中怎么用来找出曲线，或者直线，或者任何能在参数空间表示的线来最佳拟合点呢？
思路就是，在参数空间里面画grid（也就是离散化一个一个theta rho的组合），然后看看有几个点满足这个组合，就voting加一票。最后就得到了voting数组，取最高者即可。
![[03-05_camera_pose_estimation-1770859799409.png|624x297]]
比如说不用直线为例子了，我们用圆的探测来作为例子。圆的参数空间图长这样：
![[03-05_camera_pose_estimation-1770859852232.png|688x308]]
然而，对于椭圆这样参数一多的模型，就搞不了了，参数量爆炸了，bin累积起来太多了，5维空间。
![[03-05_camera_pose_estimation-1770859992052.png|599x380]]


