# Perspective Transformation
## Homography / Collineation / Projective Transformation
2D 到 2D 的平面变换
定义：Homography 是 P2 -> P2的一个映射，也就是二维射影空间到二维射影空间的一个映射。
其中，H是一个可逆的（行列式不为0，方的）矩阵。
![[02_perspective_transformation-1770068497638.png|628x265]]
H做的事情其实就是转视角，而p'~Hp的意思得这么想。在投影坐标系中，我们算的不是点，因为点都是一条一条射线。所以实际上我们是把射线进行线性变换转的过程，而得到的点是归一化的结果。所以p' = Hp和 $\lambda p' = Hp$ 是一个意思。
![[02_perspective_transformation-1770072150668.png|747x212]]
我们说一下这个过程为什么不能被转化为，相机坐标系1 -> 世界坐标系 -> 投影到相机坐标系2的一个投影过程。
因为K是一个三维 -> 二维的过程，在投影的过程中是要丢掉深度信息的，而深度不同，相机2拍到的图也不同，所以不能这么转，除非我们清楚地知道深度是多少。

例子：
![[02_perspective_transformation-1770072481341.png|511x429]]
### homography能做什么？
![[02_perspective_transformation-1770072528958.png|587x250]]
能在扭曲形状同时保持直线性
homography保护了：
- 直线性（collinearity）
- incidence（点在线上）
- cross-ratio（四点交比）
![[02_perspective_transformation-1770072870103.png|757x209]]
没有保护：
- Euclidean lengths and angles
- parallelism 平行性
- ratios of distances 距离比值（除非给了其他结构）

### homography的自由度 DOF
#### 直线自由度：2
因为c可以永远视为1，a，b和1就可以决定，所以为2。也可以理解为两点确定一个直线。
![[02_perspective_transformation-1770073956534.png|735x159]]
也有一个一般规律：
![[02_perspective_transformation-1770074035876.png|750x120]]
P2 = R3，而由于共同放缩等价，所以3-1=2



#### Transform DOF = 2
![[02_perspective_transformation-1770074173192.png|672x275]]
tx 和 ty。也就是平移方向和距离，或者x平移1y平移1

#### Rotation DOF
二维：绕原点转（SO2） DOF = 1，因为旋转矩阵的形式是固定的，只需要给角度就可以了
二维：绕任意一个点转，DOF = 3，因为点2 + 转角度1
三维：SO3为DOF = 3，即绕x y z旋转的角度给出就可以了。

#### 2D Rigid Transformation DOF
旋转1 + 平移2 = 3
![[02_perspective_transformation-1770075144187.png|661x203]]
#### 2D Similarity Transformation DOF
缩放系数1 + Rigid Transformation 3 = 4
![[02_perspective_transformation-1770075209218.png|503x212]]
#### 2D Affine Transformation DOF
仿射2x2 = 4 + 平移 2 = 6
![[02_perspective_transformation-1770075273429.png|596x219]]
#### Transformation的层次
![[02_perspective_transformation-1770075333284.png|656x302]]
DOF意味着解决问题需要最少的点数

#### Homography Transformation DOF
H的要求：
1. 方阵
2. 可逆
这两个很难知道限制。我们换一个角度。3x3 = 9，而由于投影的尺度无所谓，也就是 H ~ aH，所以尺度不重要，所以可以限制 ||H|| = 1，则少一个自由度，也就是前8个数定了之后，最后一个就被限制了。
所以DOF = 8

### 求解Homography矩阵：解决Direct Linear Transform问题
DLT是用线性代数直接估计 homography的方法。
首先我们来看如果给一对对应点，也就是投影转换前的x y和转换后的u v，我们想要探求一下这么一对点能给Homography矩阵带来怎样的约束。
首先我们定义原来的点写为其次坐标：
$$x = (x, y, 1)^T, \qquad x' \sim Hx$$
为了更清楚看H被限制的效果，我们把H写开：
$$H =
\begin{bmatrix}
h_{11} & h_{12} & h_{13}\\
h_{21} & h_{22} & h_{23}\\
h_{31} & h_{32} & h_{33}
\end{bmatrix}$$
那么x‘
$$\tilde x' = Hx =
\begin{bmatrix}
u'\\
v'\\
w'
\end{bmatrix}
=
\begin{bmatrix}
h_{11}x + h_{12}y + h_{13}\\
h_{21}x + h_{22}y + h_{23}\\
h_{31}x + h_{32}y + h_{33}
\end{bmatrix}$$
归一化后得到
$$u = \frac{u'}{w'}, \qquad v = \frac{v'}{w'}$$
$$
u = \frac{h_{11}x + h_{12}y + h_{13}}{h_{31}x + h_{32}y + h_{33}}, v = \frac{h_{21}x + h_{22}y + h_{23}}{h_{31}x + h_{32}y + h_{33}}$$
变形一下，把分母乘上来：
$$u(h_{31}x + h_{32}y + h_{33})
=
h_{11}x + h_{12}y + h_{13}$$
$$v(h_{31}x + h_{32}y + h_{33})
=
h_{21}x + h_{22}y + h_{23}$$
移项后让一边为0，写成矩阵形式就是：
$$\begin{bmatrix}
x & y & 1 & 0 & 0 & 0 & -ux & -uy & -u\\
0 & 0 & 0 & x & y & 1 & -vx & -vy & -v
\end{bmatrix}
\; h = 0$$
我们令：
$$A_i =
\begin{bmatrix}
x_i & y_i & 1 & 0 & 0 & 0 & -u_i x_i & -u_i y_i & -u_i\\
0 & 0 & 0 & x_i & y_i & 1 & -v_i x_i & -v_i y_i & -v_i
\end{bmatrix}$$
$$h =
\begin{bmatrix}
h_{11}&h_{12}&h_{13}&
h_{21}&h_{22}&h_{23}&
h_{31}&h_{32}&h_{33}
\end{bmatrix}^T$$
我们可以看到，一个Ai，就相当于给了两个约束（列了两个线性不相关的方程），那么我们需要4个点就有了8个约束，而这个矩阵的自由度只有8，所以我们就可以得到h的解。

或者从另一个角度理解，h里面有9个未知数，有9个未知数就需要9个线性不相关的方程。一个点能列两个方程，4个点能列8个，还有一个尺度等价的方程 ||H|| = 1，所以一共9个方程，就能得到h的唯一解了。

而由于计算机求解的困难，所以我们一般不找Ah = 0，而是找一个最小值就可以了：
$$\min_{\|h\|=1} \|Ah\|^2$$
#### SVD求解DLT
复习 [99-math](99-math.md)
首先复习SVD。一个任意矩阵可以这样被分解：
![[02_perspective_transformation-1770082406741.png|642x207]]
其中U和V都是正交阵，Lambda是对角阵，对角线上的数是A的特征值，由大到小排列。
我们接下来用SVD求解DLT。
要求解：
$$\min_{\|h\|=1}\|Ah\|^2$$
那么我们先对A进行SVD分解：
$$A = U\Sigma V^\top$$
由于V是正交基，所以很容易找到一个z满足：
$$h = Vz$$
那么把原式写开：
$$\begin{aligned}
\|Ah\|^2
&= \|U\Sigma V^\top h\|^2 \\
&= \|U\Sigma V^\top Vz\|^2 \\
&= \|U\Sigma z\|^2 \quad (V^\top V = 1)\\
&= \|\Sigma z\|^2 \quad (\text{因为 }U\text{ 正交}，正交矩阵为旋转不影响长度)
\end{aligned}$$
正交矩阵不影响范数的另一个证明是：
$$\|Ux\|^2
= (Ux)^\top (Ux)$$
$$= x^\top U^\top U x$$
$$= x^\top x
= \|x\|^2$$
目前，
$$\begin{aligned}
\|Ah\|^2 = \|\Sigma z\|^2  = \sum_i \sigma_i^2 z_i^2\quad
\end{aligned} $$
而想让Ah的范数最小，就要让 ||h|| = 1的能量全用到最小的特征值上。所以这个DLT的解h就是zi = 1，也就是V的最后一列。

#### 求解DLT的一般步骤
1. 找到4个对应点 (这一步找到的点不一定真的对应，因为大多时候是计算机自动匹配的)
2. 用SVD求解homogeneous equations
3. 需要RANSAC (RAndom SAmple Consensus) 技术来改进鲁棒性
![[02_perspective_transformation-1770088478460.png|561x310]]

#### 利用Homography矩阵的几何特性更简单求解DLT
H的几何意义：在一个平面投影到图片的问题中，如果将H写为列向量h1 h2 h3，那么h1代表投影后x轴方向的vanishing point，h2代表y轴方向的，h3代表原点坐标。
证明：
$$H_{W\to I} = \begin{bmatrix} \;|\; & \;|\; & \;|\; \\ h_1 & h_2 & h_3 \\ \;|\; & \;|\; & \;|\; \end{bmatrix}$$
在平面（未投影前）中的无限远点为：
$$v_x = (1,0,0)^\top, v_y = (0,1,0)^\top$$
那么有
$$x_x \sim H v_x = H
\begin{bmatrix}
1\\0\\0
\end{bmatrix}
= h_1$$
$$
x_y \sim H v_y = H
\begin{bmatrix}
0\\1\\0
\end{bmatrix}
= h_2$$
而原点为 (0,0,1)T，所以
$$
x_0 \sim H X_{\pi,0}
= H
\begin{bmatrix}
0\\0\\1
\end{bmatrix}
= h_3$$
那么这三个我们就可以轻松得到了，我们将三个点命名为a b c。我们现在相当于知道了a b c，但是不知道应该放缩多少尺度，如果把三个向量的尺度缩放因子标记为alpha beta gamma，那么我们现在就是已经有了：
![[02_perspective_transformation-1770085941610.png|176x41]]
目标是锁定alpha beta gamma
所以我们还需要第四个点，来将a, b, c三个点的尺度因子控制住。
我们可以假设第四个点d取 (1,1,1)T，根据homography的特性，我们有：
![[02_perspective_transformation-1770085748051.png|406x86]]
由于homography是尺度固定的，所以lambda可以是任意值，可以选1. 所以上述式子就可以变成
![[02_perspective_transformation-1770086096201.png|184x83]]
这样由于a b c是一个方阵，所以直接求逆得到答案就可以了。

### Homography是投影的特殊情况
具体来说，Homography就是特殊的投影，平面投影。
平面投影就是在3D世界中一个平面上的投影投到成像传感器的一个过程，而不是不同点的投影。
首先，我们知道一般投影的方程为：
![[02_perspective_transformation-1770086634472.png|394x61]]
拆开就是
![[02_perspective_transformation-1770086651743.png|433x151]]
而如果我们选择z = 0平面作为未投影前的平面（选啥都行），那么P就会退化成：
![[02_perspective_transformation-1770086756907.png|580x306]]
此刻3x3矩阵出现，就变成了Homography


### 可以用Homography的两个场景
##### 平面场景（planar scene）
因为**所有 3D 点都在同一个物理平面上**，3D相当于退化为2D 投影天然退化成一个 homography。
![[02_perspective_transformation-1770087350079.png|716x344]]
![[02_perspective_transformation-1770087683905.png|729x416]]
##### 纯旋转场景（pure rotation）（全景照片）
![[02_perspective_transformation-1770088374225.png|430x198]]
因为**相机没有平移，只是相机自己旋转了，所有点的“深度影响”消失**，任意深度的点投影都服从同一个 homography。
x1相当于把自己的c1相机姿态当成了世界坐标系。
![[02_perspective_transformation-1770087506566.png|782x370]]
![[02_perspective_transformation-1770087587007.png|626x343]]