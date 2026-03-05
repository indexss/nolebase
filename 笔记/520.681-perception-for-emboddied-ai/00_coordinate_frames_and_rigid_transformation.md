	# 00-Coordinate Frames and Rigid Transformation

## 引入
首先用了Moravec 悖论引入这门课
👉 **对计算机来说，“像人一样思考”反而容易，“像婴儿一样感知和行动”却极其困难。**
这门课叫 **Perception for Embodied AI**，核心就在解决 Moravec 悖论里**最难的那一半**：
- 3D 几何
- 坐标系 & 刚体变换
- 传感器（相机 / LiDAR / IMU）
- 机器人如何“看懂并存在于真实世界”

Agent需要离散的，干净的，确定的输入，而真实的物理世界有一堆不确定性，比如：
- **Lighting changes**：光照变化
- **Low light**：弱光 / 夜晚
- **Occlusion**：遮挡（东西被挡住）
- **Noise**：传感器噪声
- **Fast motion**：快速运动 / 运动模糊
这些可能让同一个东西在传感器里面看起来完全不一样。

## Coordinate Frames and Rigid Transformation 坐标系和刚体变换
首先，机器人的位姿（pose）可以用一个机器人底盘（Chassis）上的坐标系所表示，原点为质心。
![[00-Coordinate Frames and RigidTransformation-1769456008808.png|624x290]]
那么，Rigid Transformation就是指这样的平移与旋转，形状不变，所以是Rigid。
![[00-Coordinate Frames and RigidTransformation-1769456170209.png|621x383]]
**SE(2)**：
- S = Special
- E = Euclidean
- 2 = 二维
T下1上2表示，把坐标系2中的点，变到1中的变化矩阵。上标是目前在的坐标系，下标是目标坐标系。
这里一般不要兑换顺序，因为一般右乘为在自身坐标系下运动，而左乘为世界坐标系下移动，后面会提到。左和右说的是变换向量的位置。
左乘的话，坐标系不动，向量 / 点真的在空间中被旋转、被移动
右乘的话，坐标系在动，向量/点在真实空间中没动， **你换了一套坐标系来描述它**。
比如这个逆时针旋转45度的矩阵，如果左乘一个点，那么就是点旋转45度，逆时针旋转。如果右乘到点上，那就是将整个坐标周逆时针旋转45度。两个的结果不一样。
![[00-Coordinate Frames and RigidTransformation-1769456376981.png|715x347]]
可以看到，在变换一个坐标系（frame）时：点会受平移 + 旋转的影响，向量只受旋转的影响。
在坐标系 {1} 里定义一个刚体变换：绕原点逆时针旋转 **45°**，之后平移。

O2​=RO1​+t是对于点的影响，而只旋转是对向量的影响。

![[00-Coordinate Frames and RigidTransformation-1769459614126.png|650x410]]
这个slide说明了怎么Transform一个点。也提醒了我们注意坐标系的重要性。
首先p1代表了坐标系1下的P的向量，p2代表了坐标系2下OP的向量。t上1下2表示参考系1下，O2的向量。
在做向量加法的时候，一定要确保所有的向量都在一个坐标系下。
首先我们明确一个东西，上标代表所选的坐标系，也就是最后读数的那个坐标系，而下标表示原来所在的坐标系。

这个结果说明了，一个向量只需要经过旋转矩阵作用就可以了，而一个点，要先加上坐标轴原点移动，再施以旋转。

### 旋转矩阵
2D
![[00-Coordinate Frames and RigidTransformation-1769460440823.png|608x340]]
3D
![[00-Coordinate Frames and RigidTransformation-1769460489409.png|617x362]]

#### 检查旋转矩阵是否合法
![[00-Coordinate Frames and RigidTransformation-1769461246874.png|630x401]]
1. 逆是否和转置相同。也就是RTR为I。如果形象的说，也就是R的每个列向量都要两两正交，且都为单位向量
2. 行列式结果要为+1。如果为-1，那么就涉及到了镜像反转。下面是一个求行列式的复习。
![[00-Coordinate Frames and RigidTransformation-1769461194558.png|405x145]]
![[00-Coordinate Frames and RigidTransformation-1769461214806.png|572x339]]

#### 旋转是一个群代数
群满足：
![[00-Coordinate Frames and RigidTransformation-1769461462254.png|336x403]]

比如，一个平面旋转群为：
![[00-Coordinate Frames and RigidTransformation-1769461582741.png|755x88]]
一个3D旋转群为：
![[00-Coordinate Frames and RigidTransformation-1769461623819.png|764x374]]
一些常见的群还有：
![[00-Coordinate Frames and RigidTransformation-1769462142368.png|773x198]]
SO和SE有什么区别？
SO就是我们说的旋转群，只有旋转，不能把平移t放到矩阵里面。
- 注意，只有SO满足转置为逆，SE是不满足这一点的！一定要注意！
而SE就是把t也合并到矩阵里的形式：
![[00-Coordinate Frames and RigidTransformation-1769462371769.png|463x229]]
合并的详细说明在这里：
![[00-Coordinate Frames and RigidTransformation-1769462494361.png|648x346]]
这个东西的学名叫做 Homogeneous Transformation 齐次变化。
对于点来说，补1齐次，对于向量，补0齐次。
![[00-Coordinate Frames and RigidTransformation-1769462713709.png|657x272]]
再重述一遍，T上C下A表示，在C坐标系下，一个点A坐标系下点的坐标。
也就是把点A坐标系里点的坐标，转化为点C坐标系里点的坐标。

#### opencv中的位姿转换
OpenCV 里说的 _camera pose_，通常指的是：world → camera 的变换。
![[00-Coordinate Frames and RigidTransformation-1769464222245.png|668x311]]
### 左乘与右乘的问题
从一个本质的，庸俗的角度来讲，左乘的话，坐标系不动，向量 / 点真的在空间中被旋转、被移动
右乘的话，坐标系在动，向量/点在真实空间中没动， **你换了一套坐标系来描述它**。
比如这个逆时针旋转45度的矩阵，如果左乘一个点，那么就是点旋转45度，逆时针旋转。如果右乘到点上，那就是将整个坐标周逆时针旋转45度。两个的结果不一样。

而如果从机器人的角度出发，那么如果T是基于世界坐标系的，那么就左乘（pre-multiplication）。如果是基于自身相机的，那就右乘（post-multiplication）
![[00-Coordinate Frames and RigidTransformation-1769464647624.png|638x386]]
- 世界坐标系是**固定的**
- 在固定参考系里施加变化 ⇒ **pre-multiply（左乘）**

- 增量定义在**当前 B 坐标系**
- 坐标系本身在变 ⇒ **post-multiply（右乘）**

### 链式法则
![[00-Coordinate Frames and RigidTransformation-1769465150754.png|716x320]]
- **矩阵从右往左读**
- **坐标系标签要首尾相接**

## Parameterization of Rotations 旋转参数化
这一段讲了旋转的不同表达方式。

| 表示法             | 参数数 | 是否冗余            | 是否有奇异性 | 常见用途       |
| --------------- | --- | --------------- | ------ | ---------- |
| Rotation Matrix | 9   | ✅ 实际自由度只有 **3** | ❌      | 理论 / 刚体变换  |
| Axis–Angle      | 3   | ❌               | ⚠️     | 李代数 / 优化   |
| Quaternion      | 4   | ⚠️              | ❌      | 机器人 / SLAM |
| Euler Angles    | 3   | ❌               | ❌❌     | 人类理解       |

### Axis-Angle
![[00-Coordinate Frames and RigidTransformation-1769465969408.png|692x307]]
核心思想：任意一个 3D 旋转，都可以看成绕某一根单位轴 u，旋转一个角度 θ。
指数坐标下，ϕ=θu，也叫旋转向量。
我们可以得到u和theta的表达式。
然而，这种表示方法不唯一，因为(u,θ) 和 (−u,−θ) 表示**同一个旋转**，theta为0和pi的时候轴方向随便选，具有二义性。
所以这个是紧凑的，但是不是唯一表示。

#### Axis-Angle to rotation matrix
![[00-Coordinate Frames and RigidTransformation-1769466536335.png|702x223]]
通过 **skew-symmetric matrix（反对称矩阵）** 和 **矩阵指数**，具体结果就是 **Rodrigues 公式**。
那么什么是skew-symmetric matrix？
![[00-Coordinate Frames and RigidTransformation-1769467477118.png|510]]
在机器人和视觉中，hat operator也可以用这个表示：
![[00-Coordinate Frames and RigidTransformation-1769467509971.png|715x99]]
Key identity:![[00-Coordinate Frames and RigidTransformation-1769467602440.png|446x255]]
vee operator是逆运算。
一个Axis到Matrix的例子：
![[00-Coordinate Frames and RigidTransformation-1769467991290.png|559x366]]
#### rotation matrix to Axis-Angle
![[00-Coordinate Frames and RigidTransformation-1769468239499.png|717x297]]
![[00-Coordinate Frames and RigidTransformation-1769468280764.png|716x465]]

![[00-Coordinate Frames and RigidTransformation-1769468514572.png|324x501]]
计算角速度：
![[00-Coordinate Frames and RigidTransformation-1769469766695.png|759x290]]
这里不直接用trace计算角度，是因为角速度是向量不是标量，需要有方向。

这页 slide 本质上是在用 **李群的一阶近似** R(t+Δt)≈exp(ω∧Δt)R(t)

![[00-Coordinate Frames and RigidTransformation-1769470271757.png|652x383]]
李代数近似：
![[00-Coordinate Frames and RigidTransformation-1769470295132.png]]
严格求导来求的话：
![[00-Coordinate Frames and RigidTransformation-1769470566510.png|699x431]]
### Euler Angles and Roll-pitch-yaw
用 3 个标量参数来表示一个 3D 旋转：
- **roll**：绕 x 轴转（ϕ）
- **pitch**：绕 y 轴转（θ）
- **yaw**：绕 z 轴转（ψ）
这 3 个角度合在一起，就描述了一个姿态
先x转，再y转，再z转
![[00-Coordinate Frames and RigidTransformation-1769470705290.png|738x431]]

### Quaternions 四元数
![[00-Coordinate Frames and RigidTransformation-1769470827721.png|710x313]]
四维向量，单位长度，表示一个三维旋转
qw为cos二分之theta，而剩下的xyz为usin二分之theta。
旋转如图所示。

##### 四元数代数
![[00-Coordinate Frames and RigidTransformation-1769471361695.png|707x296]]
旋转链式法则：
![[00-Coordinate Frames and RigidTransformation-1769471457940.png|710x284]]
##### 和旋转矩阵转换
![[00-Coordinate Frames and RigidTransformation-1769471560522.png|1369|709x217]]
总是要记得每次用完四元数之后，都要重新归一化。一旦不单位化：
- 出现 **缩放 + 剪切**
- 直接破坏几何意义

##### 和Axis-Angle转换
![[00-Coordinate Frames and RigidTransformation-1769471710374.png|709x328]]
##### SLERP Interpolation 球面线性插值
![[00-Coordinate Frames and RigidTransformation-1769471850614.png|718x146]]
解决什么问题？给定两个姿态（四元数表示）q0和q1，在中间生成一个姿态序列，使得角速度恒定，差值平滑，路径是最短旋转路径。
SLERP 做的是从q0沿着大圆走到q1

Ω的算法是这样，是因为q为单位向量，模为1，所以
![[00-Coordinate Frames and RigidTransformation-1769472078949.png|365x92]]


