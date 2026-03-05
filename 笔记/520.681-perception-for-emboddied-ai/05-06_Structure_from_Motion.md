# Two-view Structure from Motion (SfM)
新任务叫SfM。
任务界定：
- 场景固定
- 相机移动
- 有两张同一时间同一相机在不同location拍摄的照片
求：
- R T
- 3D点坐标
![[05_Structure_from_Motion-1770862671405.png|495x312]]
## Epipolar Constrain
![[05_Structure_from_Motion-1770862753545.png|446x251]]
首先x1 x2的scale都是1，normalized过
我们有：
$$\text{Camera 1: }\boldsymbol{x}_1\sim\boldsymbol{X}\text{ (in camera-1 coordinates).}$$
$$\text{Camera 2: }\boldsymbol{x}_2\sim\mathbf{R}\boldsymbol{X}+\mathbf{T}.$$
写成等号形式就是：
$$\lambda_1\boldsymbol{x}_1=\boldsymbol{X},\quad\lambda_2\boldsymbol{x}_2=\mathbf{R}\boldsymbol{X}+\mathbf{T}.$$
移项：
$$\lambda_2\boldsymbol{x}_2-\mathbf{T}=\lambda_1\mathbf{R}\boldsymbol{x}_1.$$
两边同时叉乘一个T：
$$\mathbf{T}\times(\lambda_2\boldsymbol{x}_2-\mathbf{T})=\mathbf{T}\times(\lambda_1\mathbf{R}\boldsymbol{x}_1).$$
>[!note] 如果想用正常的矩阵乘法来实现叉乘，就要用Skew Matrix
>$$\widehat{T}=\left[\mathbf{T}\right]_{\times}=\begin{bmatrix}0&-T_{z}&T_{y}\\T_{z}&0&-T_{x}\\-T_{y}&T_{x}&0\end{bmatrix}$$
> 这玩意乘了之后效果和叉乘一样。有时 $\left[\mathbf{T}\right]_{\times}$ 也写成 $\widehat{T}$

由于：
$$\mathbf{T}\times\mathbf{T}=\mathbf{0}.$$
原式就变成：
$$\lambda_2(\mathbf{T}\times\boldsymbol{x}_2)=\lambda_1(\mathbf{T}\times(\mathbf{R}\boldsymbol{x}_1)).$$
左右同乘x2T
$$\lambda_{2}\boldsymbol{x}_{2}^{\top}(\mathbf{T}\times\boldsymbol{x}_{2})=\lambda_{1}\boldsymbol{x}_{2}^{\top}(\mathbf{T}\times(\mathbf{R}\boldsymbol{x}_{1})).$$
由于 T x x2的结果与x2垂直，所以x2T与其相乘后为0。所以左边部分为0 。那么Epipolar Constrain就变成了：
$${x}_{2}^{\top}(\mathbf{T}\times(\mathbf{R}\boldsymbol{x}_{1})) = 0$$
用skew matrix变个形：
$$\boldsymbol{x}_2^T\widehat{T}R\boldsymbol{x}_1=0$$
这个东西有什么几何意义？为啥这玩意一定成立？还是看这个图：
![[05_Structure_from_Motion-1770862753545.png|446x251]]
x1这个射线，x2，也就是x1旋转而来Rx1，以及translation T这个先三点共面。
T x Rx1相当于是一个垂直于这个平面的向量，和x2相乘，垂直肯定为0。
所以这个等式其实就是说了一件事：
- 第二个图的射线必须落在由第一条射线和移动射线构成的平面内。这个平面就叫做Epipolar Plane，由O1，O2，P确定。

化简一下。定义Essential Matrix：
$$\mathbf{E}\triangleq\left[\mathbf{T}\right]_\times\mathbf{R}\in\mathbb{R}^{3\times3}.$$
这个Epipolar Constrain可以写成：
$$\boldsymbol{x}_2^\top\mathbf{E}\boldsymbol{x}_1=0.$$
### Epipolar Matrix的性质
#### Rank = 2
R 是满秩的，乘一个可逆矩阵不会改变 rank。所以：
$$\mathrm{rank}(\mathbf{E})=\mathrm{rank}(\left[\mathbf{T}\right]_{\times}\mathbf{R})=\mathrm{rank}(\left[\mathbf{T}\right]_{\times}).$$
>[!note]
>rank 的定义是：所有可能输出张成的空间的维度。也就是含有有效信息的量。可以化简后看不为0的行数，但是也可以看其作用在一个向量后，向量的空间维度。
>当T作用在一个任意向量v上后，其输出必定垂直于T这个拉直的向量，所以都在一个平面里，而一个平面里所有的向量用两个数就可以表示了，所以rank为2.$$[T]_\times v=T\times v$$
#### E有两个相同的特征值
$$\mathbf{E}\triangleq\left[\mathbf{T}\right]_\times\mathbf{R}\in\mathbb{R}^{3\times3}.$$
旋转不改变矩阵如何拉扯空间，所以R对E的特征值没用。E和Tx有着相同的特征值。
> [!note] 特征值的几何意义
> 特征值就是把矩阵除去旋转后，每个轴拉伸的度量。
> 我们把任意向量$x$分解成两部分$\begin{aligned}&x_\parallel\parallel t&x_\perp\perp t\end{aligned}$
> $t\times x_\parallel=0$，说明有一个方向被压缩成 0，所以有一个奇异值是 0。
> $t\times x_\perp$，$\|t\times x_\perp\|=\|t\|\|x_\perp\|$，不管你选那个方向（垂直有两个方向），都被统一放大||t||倍。

### Epipolar几何: Epipolar Line
还是这张图：
![[05_Structure_from_Motion-1770862753545.png|446x251]]
e1称为Epipole，是The projection of the other camera’s origin in the current image。当然也是T的投影
l1称为Epipolar Lines，是连接投影点和Epipole的线

如果我们把Essential矩阵当成是一种Translation，那么这个Translation的作用是将x1变成view 2的Epipolar Line。
因为我们有
$$\boldsymbol{x}_2^\top\mathbf{E}\boldsymbol{x}_1=0.$$
而如果把Ex1看成一个整体，我们记得点在线上的条件就是xl = 0。
而这里把Ex1看成整体之后，Ex1就变成线了，就是l2.x2在l2上。
$$\boldsymbol{\ell}_2\sim\mathbf{E}\boldsymbol{x}_1.$$
$$\boldsymbol{\ell}_{1}\sim\mathbf{E}^{\top}\boldsymbol{x}_{2}.$$
为什么我们这么关心Epipolar line？
因为我们知道x2一定过Epipolar line。所以当我们知道x1，以及E的时候，我们搜索x2的时候就不需要全图搜索了，只搜索这条线上就可以了。
- 重点：E没有给我们点对点的关系，而是一种点对线的关系。

### 从Essential Matrix还原R和T
#### 还原T
T能恢复方向，恢复不了距离，因为E尺度不敏感。
$$\mathbf{E}=\mathbf{U}\operatorname{diag}(\sigma,\sigma,0)\mathbf{V}^{\top},$$
当两个奇异值不同时，可以求平均强制相同：
$$\sigma=\frac{\lambda_1+\lambda_2}{2}.$$
那么Translation就相似于：
$$\hat{\mathbf{T}}\sim\mathbf{U}(:,3).$$
> [!note] 为什么U的第三列就是？
> 1️⃣ 从 SVD 的定义开始  
对  
$$E = U \Sigma V^T$$  其中  
$$\Sigma = \mathrm{diag}(\sigma, \sigma, 0)$$  SVD 的含义是：  
$V$：输入空间的正交基  
$U$：输出空间的正交基  
奇异值：沿这些基方向的拉伸倍数  
2️⃣ 关键：零奇异值意味着什么？  
第三个奇异值是 $0$。  
这意味着：  
存在一个方向 $v_3$，使得  
$$E v_3 = 0$$  这叫做：  
右零空间（right null space）  
同样，  
存在一个方向 $u_3$，使得  
$$u_3^T E = 0$$  这叫：  
左零空间（left null space）  
3️⃣ Essential matrix 的特殊结构  
我们知道：  
$$E = [t]_\times R$$  关键性质：  
$$[t]_\times t = 0$$  因为：  
$$t \times t = 0$$  所以：  
$$E R^T t = 0$$  说明：  
$R^T t$ 在 $E$ 的右零空间里。  
4️⃣ 更关键的一步  
再看：  
$$E^T = R^T [t]_\times^T$$  而 skew-symmetric 矩阵满足：  
$$[t]_\times^T = -[t]_\times$$  所以：  
$$E^T t = 0$$  这意味着：  
$t$ 在 $E$ 的左零空间。  
5️⃣ 左零空间是谁？  
在 SVD 里：  
左零空间就是：  
$$U(:,3)$$  也就是说：  
$U$ 的第三列张成左零空间。  
因为第三个奇异值是 $0$。  
6️⃣ 所以结论来了  
我们刚刚证明：  
$$E^T t = 0$$  说明：  
$t$ 是 $E$ 的左零空间向量。  
而：  
SVD 中左零空间正是：  
$$U(:,3)$$  因此：  
$$t \sim U(:,3)$$  （只差一个符号 $\pm$）
#### 还原R
还是假设E是：
$$\mathbf{E}=\mathbf{U}\operatorname{diag}(\sigma,\sigma,0)\mathbf{V}^{\top},$$
为了强制旋转合法，中间夹一个：
$$\mathbf{W}=\begin{bmatrix}0&-1&0\\1&0&0\\0&0&1\end{bmatrix},$$
那么合法的R就有：
$$\mathbf{R}_{1}=\mathbf{UWV}^{\top},\quad\mathbf{R}_{2}=\mathbf{UW}^{\top}\mathbf{V}^{\top}.$$
注意，由于det R要为1，所以如果$\det(\mathbf{U}\mathbf{V}^\top)=-1$，那么让U或V相反数一下。

#### 配对R T
由于我们R求出两个合法的，而T只能确定方向，不能确定尺度，所以我们可能得到四组解：
$$(\mathbf{R}_{1},\mathbf{~+}\hat{\mathbf{T}}),\mathbf{~(R}_{1},\mathbf{~-}\hat{\mathbf{T}}),\mathbf{~(R}_{2},\mathbf{~+}\hat{\mathbf{T}}),\mathbf{~(R}_{2},\mathbf{~-}\hat{\mathbf{T}}).$$
所以还是用老方法：Cheirality test来排除无效解。具体来说，根据R和T，以及照片中点的坐标x1和x2，可以让两个射线相交得到一个3D点，看这个3D点的深度是在两个相机前还是后就可以了。

### 通过点对求解E
和求H一样，我们看看一对点能给E带来多少线性约束。
$$\boldsymbol{x}_2^\top\mathbf{E}\boldsymbol{x}_1=0.$$
$$x_2^TEx_1=[u_2v_21]\begin{bmatrix}E_{11}&E_{12}&E_{13}\\E_{21}&E_{22}&E_{23}\\E_{31}&E_{32}&E_{33}\end{bmatrix}\begin{bmatrix}u_1\\v_1\\1\end{bmatrix}$$
等于0，变形之后可以写成：
$$(\underbrace{u_{1}u_{2},\mathrm{~}v_{1}u_{2},\mathrm{~}u_{2},\mathrm{~}u_{1}v_{2},\mathrm{~}v_{1}v_{2},\mathrm{~}v_{2},\mathrm{~}u_{1},\mathrm{~}v_{1},\mathrm{~}1}_{\boldsymbol{a}^{\top}=(\boldsymbol{x}_{2}\otimes\boldsymbol{x}_{1})^{\top}})\mathbf{E}_{s}=0.$$
相当于，一对点能带来1个线性约束。
那么E的自由度是8，所以我们最后需要8对点来解决E。用RANSEC可以套住。
然而，还是有可能因为点选的不好，导致我们的：
$$\boldsymbol{x}_2^\top \mathbf{E} \boldsymbol{x}_1 \neq 0.$$
如何强行矫正这个问题？
首先我们有：
$$(\underbrace{u_{1}u_{2},\mathrm{~}v_{1}u_{2},\mathrm{~}u_{2},\mathrm{~}u_{1}v_{2},\mathrm{~}v_{1}v_{2},\mathrm{~}v_{2},\mathrm{~}u_{1},\mathrm{~}v_{1},\mathrm{~}1}_{\boldsymbol{a}^{\top}=(\boldsymbol{x}_{2}\otimes\boldsymbol{x}_{1})^{\top}})\mathbf{E}_{s}=0.$$
然后我们写出constraint矩阵：
$$\chi=\begin{bmatrix}\boldsymbol{a}_1^\top\\\vdots\\\boldsymbol{a}_n^\top\end{bmatrix}\in\mathbb{R}^{n\times9}.$$
对这个矩阵进行SVD
$$\chi=\mathbf{U}_\chi\Sigma_\chi\mathbf{V}_\chi^\top,$$
那么F就可以是Vx的最后一列。
然后强行修正，使其满足E的约束：
$$\mathbf{F}=\mathbf{U}\operatorname{diag}(\lambda_1,\lambda_2,\lambda_3)\mathbf{V}^\top,\quad\lambda_1\geq\lambda_2\geq\lambda_3.$$
$$\mathbf{E}=\mathbf{U}\operatorname{diag}(\sigma,\sigma,0)\mathbf{V}^{\top},\quad\sigma=\frac{\lambda_1+\lambda_2}{2}.$$

## 通过 Triangulation 三角测量重建
我们现在的情况是，有了E和两个点在图像中的位置，我们想在想要求现实中点的3D坐标。
求解3D坐标的过程叫做Reconstruction，方法叫Triangulation三角约束。

我们可以将所有投影任务归于这个方程下（前提：K为I，不然得加上K）：
$$\lambda_2\boldsymbol{x}_2=\lambda_1\mathbf{R}\boldsymbol{x}_1+\gamma\operatorname{T}.$$
其中，
- **$\boldsymbol{x}_1$ 和 $\boldsymbol{x}_2$**：分别是该三维点在相机 1 和相机 2 图像上的**2D 投影方向**（或者说是归一化坐标/射线向量）。
- **$\lambda_i$ 和 $\mu_i$**：分别是该点在相机 1 和相机 2 中的**深度 (Depth)**。
    - _注意：方向向量乘以深度（如 $\lambda_i \boldsymbol{p}_i$），就得到了该点在该相机坐标系下的完整 3D 坐标。_
- **$\mathbf{R}$ 和 $\mathbf{T}$**：是连接两个相机的**旋转矩阵**和平移向量（即相机的相对运动）。

那么对于SfM问题中，我们有了E之后，相当于有了x1和x2，R和T，缺少了两个深度lambda 1和lambda 2，以及T的尺度gamma。
如果我们将这个约束写成一个线性系统，可以整理成：
$$\underbrace{\begin{bmatrix}\underbrace{\mathbf{R}\boldsymbol{x}_1}_{3\times1}&\underbrace{-\boldsymbol{x}_2}_{3\times1}&\underbrace{\mathbf{T}}_{3\times1}\end{bmatrix}}_{3\times3}\underbrace{\begin{bmatrix}\lambda_1\\\lambda_2\\\gamma\end{bmatrix}}_{3\times1}=\underbrace{\mathbf{0}}_{3\times1}.$$
这个可以用SVD去解。

当我们知道gamma的时候，也就是T的移动尺度知道时，问题可以进一步简化成：
$$\lambda_2\boldsymbol{x}_2=\lambda_1\mathbf{R}\boldsymbol{x}_1+\mathbf{T}.$$
$$\underbrace{\begin{bmatrix}\boldsymbol{x}_{2}&-\mathbf{R}\boldsymbol{x}_{1}\end{bmatrix}}_{3\times2}\underbrace{\begin{bmatrix}\lambda_{2}\\\lambda_{1}\end{bmatrix}}_{2\times1}=\underbrace{\mathbf{T}}_{3\times1}.$$
### 前面所有问题都是特殊的Trianglation问题
Trianglation（gamma吸收到T里了）：
$$\mu_i\boldsymbol{q}_i=\mathbf{T}+\lambda_i\mathbf{R}\boldsymbol{p}_i$$
那么前面我们学过的所有问题都是特殊的约束：
![[05_Structure_from_Motion-1771886945331.png|596x152]]
这些问题都能solve。
其中有两种特殊情况。
##### 特殊情况1：homography
Homography就是两种特殊情况，要么然只有R，要么然都在平面上。
当只有R，无T的时候，E = 0，相当于没有3D信息，所以就无法恢复深度了。
当都在平面上时，这就是一个homography，无法区分“真实3D结构”还是“平面假象”，也无法恢复深度。
> 多个 (R,T) 可能对应同一个 E
##### 特殊情况2：Small Parallax 小视差
- 点太远
- 平移太小
- 两视图变化不大
就会导致小视差，没有视差，就没有结构信息。


当没有相机矫正的时候，会有一个变形，加上矫正信息，矩阵叫Fundamental Matrix
![[05_Structure_from_Motion-1771887500968.png|640x320]]

#### RANSEC解决Trangulation
完备的trangulation需要8对点，而RANSEC只需要5对，最多产生10个点，可以通过多轮迭代去掉。
![[05_Structure_from_Motion-1771887589391.png|808x172]]
解决E之后，我们只需要一对点，就能求出其对应的3D坐标。

### 再强调一个关键点

Triangulation 能恢复的 3D：只能恢复 **相对尺度**
因为 T 只有方向，没有绝对长度。
所以整个场景会有一个 global scale ambiguity。


总结：
![[05_Structure_from_Motion-1771887671816.png|636x174]]