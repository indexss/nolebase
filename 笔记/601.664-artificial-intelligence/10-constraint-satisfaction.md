# 10 Constraint Satisfaction
## Constraint Satisfaction Problem
### 例：图着色问题
![[10-constraint-satisfaction-1772510632443.png|468x297]]
### CSP 与 Generic Search
- Generic Search对于内部状态不关心，state是黑盒，只关心state的goal test，eval和successor。
- CSP中需要care 
	- State 用一组变量$X_i$表示，每个$X_i$的取值来自它的domain $D_i$
	- goal test不再是走到某个节点，而是**找到一个allowable combinations of values，使得所有约束都满足**。
- CSP的Formal representation可以formal represent成：
	- Variable
	- Domain
	- Constrain
### CSP的种类
- Discrete Variables
	- 值域有限的情况
		- n个变量，值域大小为d，枚举为$O(d^n)$。
		- 暴力搜索会爆炸，比如Boolean CSP（MAXSAT），是NP-complete
	- 值域无限的情况
		- 工作调度，任务的开始时间和结束时间理论无上限
		- 需要constraint language来约束：$StartJob_1 + 5 \le StartJob_3$
		- 如果约束为线性的，可解；非线性的，不可判定（不保证有解）
- Continuous Variables
	- 哈勃望远镜观测的开始/结束时间
	- 若约束是**linear**，可以用 线性规划方法在多项式时间（poly time）内求解。
### Constrain类型
- Unary一元：$SA \ne green$
- Binary二元：$SA \ne WA$
- Higher-order：cryptarithmetic（字母算术）里的“按列约束
- soft constrains（preference）：允许取 green，但 red 更优。
	- 常见建模方式为一个cost，在满足硬constrain的前提下最小化cost。

### Constraint Graph
图着色问题的Constraint Graph
![[10-constraint-satisfaction-1772511388669.png|241x230]]
CSP为Binary，Constrain Map如上，node为variables，arc为约束。
可以用graph来加速搜索，例如，T在图上是一个孤立问题，可以独立解决。
### 朴素解决方案
- 朴素想法：用Incremental的方法，从一个直观的傻方案开始，然后fix它。
- States为目前的value的assign
	- initial state为$\emptyset$
	- successor function为：**选择一个还没赋值的变量**，给它赋一个值，不与当前冲突。
		- 如果找不到不冲突的，那么这个分支就fail了。
- Goal test：是否complete。
- 分支因子随着当前搜索深度l变化：$b = (n-\ell)\, d$，所以叶子规模为：$n!\, d^n$，规模巨大。
## Backtracking Search
- 变量赋值顺序可交换
- 每次选择并赋值一个变量，而不是一次给一组变量赋值，这样分支数就是该变量的值域大小，b=d，叶子数为$d^n$
- **每次只给一个变量赋值**的CSP的DFS搜索，就叫做backtracking search。backtracking体现在，一旦当前部分赋值违反约束，就**退回上一步换一个值**继续试。
	- 是uninformed算法。
- 可解决最大n约为25的n皇后问题
![[10-constraint-satisfaction-1772511978261.png|602x357]]
![[10-constraint-satisfaction-1772512837463.png|630x295]]
#### 改进Backtracking
- 下一步该给哪个variable赋值（变量选择）
- 取值按照什么数值排序（取值排序策略）
- 是否可以提前预测失败（失败检测）
- 能够利用问题结构（结构化加速）

##### 变量选择：Minimum remaining values (MRV) 
优先选择“合法取值（legal values）最少”的变量来赋值。
![[10-constraint-satisfaction-1772513042721.png|684x194]]
###### Degree Heuristic
当MRV遇到tie需要裁决的时候，用Degree Heuristic：在所有“尚未赋值”的变量中，选一个对**其他尚未赋值变量**施加约束最多的变量。
![[10-constraint-satisfaction-1772513170584.png|692x139]]
##### 取值排序：Least Constraining Value (LCV)
注意LCV用于赋值层面。当赋值时，优先尝试那个**对其他未赋值变量限制最少**的取值。
![[10-constraint-satisfaction-1772513271567.png|698x179]]

这三个策略融合之后，可以解决1000皇后。

##### 失败检测：Forward Checking
**提前发现“未来必然失败”的分支**，从而尽早剪枝。
想法：每当给某个变量赋值后，立刻检查所有**尚未赋值的相邻变量**，如果未赋值变量的合法取值集合为空，就回溯。
（这个例子里没有用MRV，每一步是随便选的Variables）
![[10-constraint-satisfaction-1772513822680.png|619x280]]
由于SA没有值了，在涂色V之后，就应当立刻回溯，并得到结论：NT和SA不能同时为蓝色。
![[10-constraint-satisfaction-1772513976678.png|605x235]]
##### 失败检测：Arc Consistency
比如图着色问题，相邻的两个variables X和Y之间会有arc，也就是constrain。那么Arc Consistency也是一个让我们提前剪枝的方法：
- 如果X -> Y（有向），那么$\forall x \in D(X),\ \exists y \in D(Y)\ \text{s.t.}\ C(x,y)\ \text{成立}$

比如还是这个情况：
![[10-constraint-satisfaction-1772514489478.png|589x209]]
NSW和SA之间有arc，而对于NSW的每一个值（红，蓝），SA只有蓝，所以NSW的蓝不可能出现在解中，所以NSW的蓝可以提前删掉，简化情况。

删掉NSW的蓝色之后，再比如考虑另一个Arc：
![[10-constraint-satisfaction-1772514645865.png|606x213]]
现在NSW只有红，V -> NSW，V有（红绿蓝），显然V的红不能留，删掉。

删掉V的红之后，再考虑另一个Arc：
![[10-constraint-satisfaction-1772514739699.png|653x220]]
Arc SA->NT，SA是蓝，NT只有蓝，所以SA的蓝要被删掉。
- 如果X丢掉了一个值，那么X的领居需要被重新检查
- Arc consistency可以比forward checking更早发现失败
- 何时运行？
	- 可以在搜索前运行一次AC，先把不可能的值删掉
	- 在每次assignment后也可以进行一次AC剪枝。
![[10-constraint-satisfaction-1772514928104.png|639x333]]
实现中，使用AC3来做AC剪枝。3是历史版本号，没啥实际意义。
朴素实现时间复杂度$O(n^2 d^3)$，但可用更高效的数据结构降到$O(n^2 d^2)$。检测全部是NP hard。
###### 更进一步：Path Consistency
$$\forall a\in D_i,\forall b\in D_j,\; (X_i=a,X_j=b)\ \Rightarrow\ \exists c\in D_k:
\ C_{ik}(a,c)\land C_{jk}(b,c)$$
###### 推广：k-Consistency
k-consistency = check all constraints for each k-variable subset。
- k=1是节点一致性
- k=2是AC
- k=3是path Consistency
k越高越贵，高k在实践中一般不用。
## Problem structure and problem decomposition
在图着色中，T是一个单独的子问题，可以独立解决。这种独立子问题可以用Constrain graph的connected components连通分量来识别。

- 定理：如果CSP图无环（树），CSP可以在$O(n d^2)$的时间解决。而一般的CSP，需要$O(d^n)$的时间解决。
	- 合理利用结构可以加速解决CSP问题。

### 树CSP算法
1. 选择一个节点作为root形成树，生成一个变量序列$X_1, X_2, \dots, X_n$满足：**每个节点的父节点在它之前出现**（parent precedes child）
2. 对于j从n到2（从下到上），执行$\text{REMOVEINCONSISTENT}(Parent(X_j), X_j)$ $$\text{若 } \neg \exists x \in D(X_j)\ \text{s.t. } C_{P,X_j}(p,x)\ \text{成立，则删除 } p \in D(P)$$ **删除父节点域中那些在子节点域里找不到支持值的取值**。
3. 对于j从1到n（从上到下），给Xj赋值，使其与父节点满足约束。

##### 将一般CSP化为Tree-Structured CSP
一般CSP都有环。
- 可以选一个变量instantiate赋值，prune neighbor‘s domains。
- 一般不是选一个变量就能成树了，要选择多个变量作为cutset割集，使得剩下部分为tree
- 如果c为cutset的大小，可以在$O\!\left(d^{c}\cdot (n-c)\, d^{2}\right)$内求解。
	- $d^{c}$为cutset的组合
	- $(n-c)d^2$：树能在$O((n-c)d^2)$解决。
![[10-constraint-satisfaction-1772516784404.png|581x249]]
## Local search
> Iterative min-conflicts is usually effective in practice. **实践中通常很有效**

 用迭代式局部搜索解 CSP，可以用hill-climing, simulated annealing等local search方法来解决CSP。
- 使用时：
	- 允许当前赋值里**有些约束不满足**（unsatisfied constraints）$$h(n) = \text{当前状态 } n \text{ 中被违反的约束总数}$$
	- 通过operator不断reassign变量，使得break constrain越来越小。
- 如何选择Variable：可以随机选择有冲突的变量
- 如何选择取值：通过min conflicts heuristic选，选择使**违反约束数量最少**的那个值。

#### 例：n皇后
![[10-constraint-satisfaction-1772517308659.png|516x311]]
可以利用先验知识限定这个问题：
- 假设**每一列恰好放 1 个皇后**，问题就变成：第 i列的皇后应该放在**第几行**？
![[10-constraint-satisfaction-1772517392425.png|594x317]]

对于n皇后，从随机开始，Min-Conflicts往往能在几乎常数时间找到解，成功概率高，n = 10000000也能很快解出。
- 然而，CSP有一个critical ratio，当一个通常很快能解决的问题，$$R=\frac{\text{number of constraints}}{\text{number of variables}}$$R落到一个很窄的区间时，会突然变难。![[10-constraint-satisfaction-1772517570315.png|270x160]]
