# Stereo Depth Estimation
## Intro
Stereogram，立体感，或者说深度感，来自双眼看到的差异（binocular disparity）。
比如说3D眼睛，左红右蓝，左眼只能看到红色过滤的部分，右眼只能看到蓝色过滤部分，就造成了左右两眼的视差，让你有立体感。

如何进行Stereo Depth Estimation，也就是立体深度估计？就是用两只眼睛，或者两个相机的视差，再加上三角测量Triangulation，就能得到深度。

当进行点位匹配的时候，可以制造Epipolar line上搜索，更加简单，特征比如SIFT能匹配上就可以了。
![[07_Stereo_Depth_Estimation-1771890148506.png|428x300]]
一个理想的双目setup是，当两个摄像机的高度在同一水平线上时，同一个点的投影的纵坐标在两个图片中相同，那么epipolar line就水平于地面了，就横着找就可以了。
![[07_Stereo_Depth_Estimation-1771890447446.png|550x316]]
在Disbarity设定下，设定baseline为b：
![[07_Stereo_Depth_Estimation-1771890700617.png|287x243]]
那么我们有：
$$\frac{x}{f}=\frac{X_L}{Z}, \frac{x^{\prime}}{f}=\frac{X_R}{Z}.$$
$$b=X_L-X_R.$$
那么就有：
$$\underbrace{d}_{\mathrm{disparity}}\triangleq x-x^{\prime}=\frac{fX_L}{Z}-\frac{fX_R}{Z}=\frac{f(X_L-X_R)}{Z}=\frac{fB}{Z}.$$
也就是$$Z=\frac{fb}{d}$$
rectified矫正后的d，只涉及水平差，所以定义为：
$$d(u,v)\triangleq u_L-u_R.$$
视差大 → 左右图位置差很多 → 物体近
视差小 → 左右图几乎重合 → 物体远
d 通常单位是 **像素**，也可以做到subpixel。
>[!NOTE] 那么这就带来一个讨论：如果我们将视差看作pixel，也就是离散的，那么这种误差会如何传递到深度？
由于我们有深度：
$$Z=\frac{fb}{d}$$对其求导：$$\frac{\partial Z}{\partial d}=-\frac{fb}{d^2}$$ $$\left|\delta Z\right|\approx\frac{fb}{d^2}\left|\delta d\right|.$$ 这告诉我们：深度对视差的敏感度和$1/d^2$成正比。如果我们的差异仅在完整像素上，误差可能会传播到最终深度。

立体感随着距离变得更加困难。
人的baseline差不多为0.065m，f约为1000px，那么通过计算，20米外的东西，就很难有立体感了。

## Matching
这是一个很典型的match场景，随着水平线搜索：
![[07_Stereo_Depth_Estimation-1771891280962.png|458x305]]
![[07_09_stereo_depth_estimation-1772069623682.png|455x316]]
对左图的每个像素窗口，沿着右图的同一条水平线滑动搜索，  找到最相似的那个位置，那个水平位移就是 disparity。
用来衡量相似度的方法有这些：
![[07_Stereo_Depth_Estimation-1771891896864.png|556x306]]
Stereo的结果是这样的：
![[07_Stereo_Depth_Estimation-1771895537701.png|583x261]]
去找d的方法就是去做出d相对C的曲线，C(u,v,d)叫做Cost volume
然而，按照像素去算太贵了。所以我们经常是聚合成一个窗口算cost：
$$\bar{C}(p,d)=\sum_{q\in\Omega(p)}w(p,q)C(q,d).$$
窗口内匹配出的d，赢者通吃，一个窗口都共用这一个d，即使可能有差距。
$$d^*(p)=\arg\min_d\bar{C}(p,d).$$

我们还应该做一个验证，用左边算完右边的d之后，再用右边算左边的，看看是不是差不多。
$$d_L(u,v)\approx d_R(u-d_L(u,v),v).$$
遮挡点造成不一致性，也就是在一张图里出现，另一张里没出现的点。

### Matching可能失效
![[07_Stereo_Depth_Estimation-1771897171871.png|491x301]]Textureless regions（无纹理区域）：多个地方可能都被匹配
Repeated patterns（重复纹理）：多个地方可能被匹配
Specularities / Non-Lambertian surface（镜面反射 / 非朗伯表面）: 有高光反射之后可能cost会变大，不好匹配了。

为了尽量避免，所以可以将原来C的minimization，转化成一个C+Regularization的最小化。
$$E(d)=\sum_pC(p,d(p))+\lambda\sum_{(p,q)\in\mathcal{N}}\rho(d(p)-d(q))$$
后面的正则化项鼓励平滑。pq是相邻像素。ρ是惩罚函数，可能是L1，L2等。

当我们使用更大的 Patch Size 的时候，我们可能会丢失一些细节信息，但是 Match 的结果会更加的 Smooth。
![[07_09_stereo_depth_estimation-1772069670510.png|465x312]]
### DP Match pipeline
如果我们将 Y 轴方向设置为右图的 pixel，X 轴方向设置为左图的 pixel，那么如果我们使用某一种 Loss 来计算每一个点上 Match 的一个 Loss，我们就可以得到一副这样的 Disparity Space Image，也就是 DSI。
![[07_09_stereo_depth_estimation-1772069773654.png|452x340]]

很显然，我们左图和右图的 disparity 应当在一个合理的范围内。我们可以限制这个范围，让 DSI 的范围缩小，只剩下这么一个对角的区域。

![[07_09_stereo_depth_estimation-1772069854194.png|515x337]]

我们可以采用 Dynamic Programming（DP）来解决像素的匹配问题。
在开始之前，DP 要遵循一个假设或者说限制，这种限制叫做 Ordering Constraints。
![[07_09_stereo_depth_estimation-1772069923556.png|568x277]]
可以看到在左图中，一切都十分合理。绿色的点投影在左右两个坐标系（或者说相机）内，都是最右边的像素。

但是，如果距离比较近的话，看到右边这张图：
1. 它在左边的照片中位于最右边的像素点
2. 但在右边的照片中，它却位于左边的像素点

DP 假设我们的场景是遵循左边这种 Ordering Constraints 的。由于遵循了 Ordering Constraints，所以说 DP 的路径就应当是一个一直往右下的路径。那么我们可以说，它的路径是一个 globally optimal monotone 的，也就是全局单调最优的。

![[07_09_stereo_depth_estimation-1772070121087.png|443x306]]

在这个 DP 中，我们有一个比较特殊的地方，就是每次 match 都有一定的 penalty。

也就是说，如果定义一个 i 和 j 的 cost 没有达到最优，那么我们会向下一直推 j，使其变成 j+1、j+2。但如果一直达不到最优，由于物理限制，我们知道它们的 disparity 不会太大，所以随着 match 次数不断增多，penalty 也会随之累加。

这导致 i 和 j 错位越多，就越难匹配，从而促使了 i 和 j 尽早匹配。这是这个 DP 比较特殊的地方。DP定义如下：

$$\mathsf{DP}(i,j)=\min\left\{\mathsf{DP}(i-1,j-1)+M(i,j),\mathsf{DP}(i-1,j)+\gamma,\mathsf{DP}(i,j-1)+\gamma\right\}$$
对于初始化：
$$\mathsf{DP}(0,0)=0,\quad\mathsf{DP}(i,0)=i\mathrm{~}\gamma,\quad\mathsf{DP}(0,j)=j\mathrm{~}\gamma.$$
为什么这样初始化？

因为 i 和 0、0 和 j 实际上没有匹配任何东西，它只是在表格中出现的这么一个点，所以就这么初始化了。

匹配结果：
![[07_09_stereo_depth_estimation-1772070510402.png|626x280]]

i+1, j+1 的时候才算匹配成功。如果是横移或者竖向移动，在 DP 中其实都算没有匹配成功，也就是我们所说的 occluded。
真实的匹配结果如图所示：
![[07_09_stereo_depth_estimation-1772070637319.png|532x278]]
其中左边使用的是 DP 算法，右边使用的是 Greedy 算法。

Greedy 就是强行匹配，即对每一个像素都进行搜索，只要求 Cost 最低。

而那些黑色的 Pixel（像素），我们称之为被 Occluded（遮挡）了。因为在 Ordering Constraints（顺序约束）以及 DP 的搜索条件下，没有找到对应的匹配。也就是说，它发生了横向或竖向的移动，这种情况下就会显示为黑色。

至于其他不显示为黑色的情况，则都是能够成功匹配到的。

对于occluded，我们可以有一个trick：
![[07_09_stereo_depth_estimation-1772070759804.png|493x295]]
其中，
**left occluded**：竖向移动，左图里的这个像素没有在右图中出现（被遮挡），用左边像素补
**right occluded**：横向移动，右图里的这个像素没有在左图中出现。用右边像素补。

这是补了的结果
![[07_09_stereo_depth_estimation-1772070865721.png]]

## 设置Stereo相机装置
### f和Baseline的trade off
我们在前面提到，在设计 Stereo 相机装置（即 Stereo Rigs）时，是有一个 trade-off 的。
$$\frac{fb}{d^2}=\frac{fb}{(fb/Z)^2}=\frac{Z^2}{fb}\quad\Rightarrow\quad|\delta Z|\approx\frac{Z^2}{fb}\left|\delta d\right|.$$
根据误差的传导公式，如果 Baseline 越大，那么 Disparity 也会更大。
如果想要误差变小，通常有两种方法：增大 Focal Length 和增大 Baseline。但为什么我们无法无限制地增大这两点呢？

1. 增大 Baseline 的限制
   如果无限制地增大 Baseline，确实更容易分辨远处的物体并产生视差。但是，两个相机相距过远会导致更多的遮挡（Occlusion），从而使得在 Matching 的过程中，无法 Match 的情况变多。

2. 增大 Focal Length 的限制
   如果我们去增大 Focal Length，那么我们的 FOV（视场角）就会变窄。这意味着虽然看得更远，但是视野范围会变小。

### Rectification
我们在上面一直讨论的是：两个相机的 Baseline 应当是水平的，那么它们的 Epipolar Lines（极线）也就是平行的。

在做 Match 点搜索时，这是一种一维（1D）的运算：
1. 它只需要在移动 X 轴方向进行搜索。
2. 它不需要移动其他的 Y 和 Z 坐标。

但是在现实生活中，我们很难让两个相机完全达到预想的水平状态。如下图所示，
![[07_09_stereo_depth_estimation-1772071447631.png|326x278]]在上方它们的极线是倾斜着的。但如果我们能够对相机坐标系进行修正（Rectification），让 Epipolar Line 重新变得水平，那么我们就可以适用于所有的情况。

下面这幅图更加说明了我们想要做什么：
![[07_09_stereo_depth_estimation-1772071474979.png|326x230]]

我们Rectification的目标，就是为了让相机好像只是经过了x方向的平移，没有旋转。

所以，我们的目标就是construct x使得其方向在baseline上，并且y和z满足于x正交，且保证点在相机前方。

所以x 轴就是平移的方向向量，这就是baseline
$$\hat{\mathbf{x}}=\frac{\mathbf{t}_{LR}}{\|\mathbf{t}_{LR}\|}.$$
构造新的y轴（折中的向下方向）：
$$\mathbf{y}_{\mathrm{avg}}=\frac{\mathbf{e}_{y}+\mathbf{R}_{LR}^{\top}\mathbf{e}_{y}}{\|\mathbf{e}_{y}+\mathbf{R}_{LR}^{\top}\mathbf{e}_{y}\|}.$$
得到z
$$\hat{\mathbf{z}}=\frac{\hat{\mathbf{x}}\times\hat{\mathbf{y}}}{\|\hat{\mathbf{x}}\times\hat{\mathbf{y}}\|}.$$
得到y
$$\hat{\mathbf{y}}\leftarrow\frac{\hat{\mathbf{z}}\times\hat{\mathbf{x}}}{\|\hat{\mathbf{z}}\times\hat{\mathbf{x}}\|}.$$
这样，xyz就是一个正交基了。

我们希望L相机先旋转到这个坐标系，R坐标系相对于L坐标系再旋转。
$${\mathbf{R}_L=\mathbf{R}_{\mathsf{rect}},\quad\mathbf{R}_R=\mathbf{R}_{\mathsf{rect}}\mathbf{R}_{LR}^\top}$$
由于Rectification不挪动相机，只是改变朝向，所以属于Homography。
回忆，如果一个相机在R1旋转下的rotation的投影为x1，R2下的投影为x2，那么我们就有Homography公式：
![[07_09_stereo_depth_estimation-1772075584686.png|596x229]]
所以我们有：
$${\mathbf{H}_L=\mathbf{K}^{\prime}\mathbf{R}_L\mathbf{K}_L^{-1},\quad\mathbf{H}_R=\mathbf{K}^{\prime}\mathbf{R}_R\mathbf{K}_R^{-1}}$$
其中K‘为平均后的内参。
这个就很形象：
![[07_09_stereo_depth_estimation-1772075768147.png|478x377]]