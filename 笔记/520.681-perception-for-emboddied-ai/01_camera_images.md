# Cameras and Images
## Projection Principal

薄透镜公式：
![[01_camera_images-1769642738753.png|826x481]]
对焦，就是让上面这个等式成立的过程，也就是让b对上像的过程。
由于a，也就是物基本等于无限大，那么对焦这个过程可以省略为b=f
![[01_camera_images-1769642802827.png|823x269]]
小孔成像中，根据相似三角形的比值关系，可以有这么一个公式：
![[01_camera_images-1769642842984.png|847x479]]
把小孔成像拓展到3D空间，那么就有这样的公式
![[01_camera_images-1769643160110.png|850x441]]
其中Z为物体距离相机的X轴距离。
投影这个过程是丢失了尺度信息的，所以一个投影点，可以是一个近但小的东西投出来的，也可以是一个远但大的东西投过来的。
![[01_camera_images-1769643305610.png|842x439]]
## 欧氏空间中点和线的表示方式
点可以直接由列向量表示
线可以把原来的线写成ax+bx+c=0的形式后，\[a,b,c\]T来表示
![[01_camera_images-1769643394728.png|849x299]]

注意，其实x y 1就是点x y的齐次形式。
所以，如果一个点和一个线做点乘，如果为0，就是点在线上。
上面说的东西也可以拓展道3D空间：
![[01_camera_images-1769643517004.png|687x475]]
叉乘，对于两个**向量**来说，得到一个a到b右手坐标垂直的向量，幅值为absin(theta)
其几何意义其实就是ab形成的平行四边形的面积
![[01_camera_images-1769643658134.png|1680|708x332]]
想写成向量坐标的形式，就可以直接用行列式来算。
两个齐次直线叉乘，得到结果将z归一化为1，结果的x y就是两个直线相交点的坐标。
![[01_camera_images-1769643865892.png|742x220]]
如果用齐次项的行列式去计算两条平行线的交点
![[01_camera_images-1769744566929.png|657x226]]
得到的结果为：
$$x = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 1 & -1 & 1 \\ 1 & -1 & -2 \end{vmatrix}$$
交点坐标为$[3, 3, 0]^T$。第三项为0，做归一化的时候，相当于3/0 = infinity，所以说无限远处的交点。

## Projection Geometry
虽然平行线不会有交点，但是在透视关系中，我们会看到一个交点。
![[01_camera_images-1769744747483.png|465x295]]
这个灭点的产生原理是这个公式
$$w = f \cdot \frac{W}{Z}$$
当两条平行线的远处，也就是Z无限大的时候，w会趋于0，所以再大的物体在远处也会形成一个点。那这个点怎么在照片上确定位置的呢？这样：
![[01_camera_images-1769746141317.png|1630|470x291]]
O是眼睛，蓝色玻璃是传感器，铁轨的光到眼睛被传感器截了之后自然会形成一个点，这就是灭点的投影。

如果想要把欧几里得坐标映射到投影坐标，也就是$\mathbb{R}^n \rightarrow \mathbb{P}^n$，那么就要用齐次坐标$(xw, yw, w)$，作用：
- 处理无限远的点，让w为0
- 通过变换w，x，y同步放缩，这对于投影更自然，因为一个点可能是由不同点投影来的

符号与变化规定：
$(x_1, \dots, x_n)^\top \in \mathbb{R}^n \longmapsto (x_1, \dots, x_n, 1)^\top \in \mathbb{P}^n$，$\begin{bmatrix} x \\ y \end{bmatrix}$ -> $\begin{bmatrix} x \\ y \\ 1 \end{bmatrix}$
投影等价性：
对于两个非零的向量u，v，u~v s.t. v=λu
$$\begin{bmatrix} 1 \\ 2 \\ 1 \end{bmatrix} \sim \begin{bmatrix} 2 \\ 4 \\ 2 \end{bmatrix} \sim \begin{bmatrix} -3 \\ -6 \\ -3 \end{bmatrix}$$
投影点可以连成一条射线：
![[01_camera_images-1769795138440.png|578x251]]
w=1代表depth=1时点的位置坐标。

两个点做叉乘，得到的是穿过两个点的直线：
![[01_camera_images-1769795228627.png|693x300]]

矩阵化投影：
原来我们的公式为：
$x = f\frac{X}{Z}$， $y = f\frac{Y}{Z}$
用了齐次坐标之后，就可以用矩阵的形式表示：
$$\begin{bmatrix} u \\ v \\ w \end{bmatrix} = \begin{bmatrix} f & 0 & 0 & 0 \\ 0 & f & 0 & 0 \\ 0 & 0 & 1 & 0 \end{bmatrix} \begin{bmatrix} X \\ Y \\ Z \\ 1 \end{bmatrix}, (x, y) = \left( \frac{u}{w}, \frac{v}{w} \right)$$

如何计算x=1和x=2两条线的交点?
![[01_camera_images-1769795878891.png|623]]

相机中如何计算投影点坐标？
首先点坐标乘内参矩阵，然后再归一化，可以证明，只需要归一化一次，在乘之前归一，和之后归一结果一样。
![[01_camera_images-1769796362106.png|539x259]]
![[01_camera_images-1769796376659.png|630x240]]
![[01_camera_images-1769796442653.png|632x226]]

这里面cx cy应该是啥？在数学层面，我们会以传感器的左上角为中心，而cx cy是把中心挪到几何中心。所以为1/2的长宽。
![[01_camera_images-1769798467603.png|627x294]]
若考虑廉价传感器x和y轴不垂直，可能会有skew倾斜校正参数s：
$$\begin{bmatrix} u \\ v \\ 1 \end{bmatrix} = 
\underbrace{\begin{bmatrix} f_x & s & c_x \\ 0 & f_y & c_y \\ 0 & 0 & 1 \end{bmatrix}}_{K}
\begin{bmatrix} X/Z \\ Y/Z \\ 1 \end{bmatrix}$$
相机坐标系点的投影练习：
![[01_camera_images-1769798836808.png|1543|586x392]]
世界坐标系的点要先转到相机坐标系再投影：
![[01_camera_images-1769798871780.png|580x338]]
齐次形式一个比较好的特性就是，可以直接乘KRT了，不用单独拿出来T，相当于拿到了投影空间。
![[01_camera_images-1769798935564.png|613x388]]
应用：
![[01_camera_images-1769799748550.png|752x407]]
照片里面有了tag的坐标了，定一个tag为中心的坐标系，K也知道，就能求出来RT了。

还有全景图拼接。
也可以计算transform，这样就可以贴图上去。
![[01_camera_images-1769803078969.png|741x496]]
![[01_camera_images-1769803095882.png|740x514]]
