# 07 Basic Search

## 定义问题求解Agent
这是一种通用Agent的子集
方法：
- 确定目标，什么算成功
- 将目标转化为形式化formulate的问题
- 搜索

solution是一个actions的sequence

## 问题类型
![[07-basic-search-1772494579428.png|654x350]]
这里可以用吸尘器世界来表示这些问题类型
![[07-basic-search-1772496243380.png|371x300]]
- single state：起始5，能看到全局。
	- solution：right suck
- conformant：起始不知道在哪，可能是{1,2,3,4,5,6,7,8}。
	- 执行right之后，不管原先在哪里，状态变为{2,4,6,8}。
	- 这样，2的答案是suck left suck，4的答案是left suck，6的答案是suck，8的答案是不动。
	- 合取之后为right suck left suck
- Contingency: 知道起始状态为5
	- suck可能弄脏原本干净的地毯（动作有不可预测性），
	- 吸尘器只有局部传感器（partially observable），只能看当前位置是否有脏。
	- 所以答案为 right, if dirt then suck.

## Problem Formulation问题形式化
### Single-State Problem Formulation
问题由4项定义：
- initial state：在Arad
- （action）successor function S(x)，是一系列action–state pairs，比如$S(\text{Arad})=\{\langle \text{Arad}\rightarrow \text{Zerind},\ \text{Zerind}\rangle,\dots\}$
- goal test
	- explicit：x = Bucharest
	- implicit：无灰尘(x) (吸尘器世界)
- path cost (可加additive)
	- 常见是：总距离、执行动作数、总时间等
	- 从状态x通过动作a到y的代价：$c(x,a,y)$，总是大于等于0

解是一串actions的序列，从initial state带到goal state
#### 例：罗马尼亚地图
![[07-basic-search-1772496720869.png|662x393]]
- 你在罗马尼亚度假，**当前在 Arad**。
- 明天的飞机从 Bucharest起飞，所以必须赶到那里。

Formulate：
- goal：到Bucharest
- states：不同的cities
- actions：城市间驾驶
- 解：例如Arad → Sibiu → Fagaras → Bucharest

#### 例：吸尘器世界状态转换图
![[07-basic-search-1772497279620.png|610x386]]

#### 例：8-Puzzle问题
![[07-basic-search-1772497399999.png|606x410]]

#### 例：机器人装配问题
![[07-basic-search-1772497476563.png|616x351]]

## Tree Search
Tree search是离线，在状态空间里做搜索。探索方式是对已发现的state expand其successors.
通用框架：
![[07-basic-search-1772497694036.png|600x197]]

在实践中我们会碰到States和Nodes。
- State：对“物理/世界配置”的一种表示
- Node：搜索数的数据结构，包含parent，children，depth，path cost g(x)（从起点到当前节点的累计成本）
State本身没有什么parent children，只有nodes有。

### Uninformed Search
定义：strategies use only the information available in the problem definition.![[07-basic-search-1772500198921.png]]
#### BFS (Breadth-first search)
维护一个边界/候选节点集合叫 **fringe**，fringe是FIFO的队列。边界条件是这样的：
![[07-basic-search-1772498057729.png|543x246]]
- Complete：在分支因子b （每个节点有多少个孩子）有限的情况下，complete
- Time：$1 + b + b^2 + b^3 + \cdots + b^d + b(b^d-1) = O(b^{d+1})$
- Space: $1 + b + b^2 + b^3 + \cdots + b^d + b(b^d-1) = O(b^{d+1})$
- Optimal: 如果每个step的cost相同，那么最优。非均匀代价的情况下，不是的。

BFS的内存消耗是一个很大的问题。
#### UCS (Uniform-cost search)
UCS相当于把fringe改成了一个按从起点到节点n的累计路径代价的priority queue（最小堆）。
在每一步cost相同的情况下退化为BFS。

- Complete：如果每一步的代价都有下界epsilon并且epsilon > 0，那么完备。
- Time: 所有$g(n) \le C^*$的节点都会被考虑到。$C^*$为最优解的总代价。其时间复杂度为：$O\!\left(b^{\lceil C^*/\epsilon \rceil}\right)$。这是因为每走一步至少要花$\epsilon$，那么走$C^*$的代价最多走$\left\lceil \frac{C^*}{\epsilon}\right\rceil$步 (depth)。由于每个节点最多扩展b个节点，那么深度不超过D的节点总数最多就是 $1+b+b^2+\cdots+b^D \ =\ O(b^D)$，所以时间复杂度就是$O\!\left(b^{\lceil C^*/\epsilon \rceil}\right)$。
- Space：同Time。
- Optimal：是最优。
#### DFS (Depth-first search)
fringe改为一个stack。
- Complete: 在无限深度的搜索空间中，不完备。在有环的图中，也不完备。在有限的状态空间中完备。
- Time：$O(b^m)$，m是最大搜索深度。当m远大于d（目标所在深度）的时候，十分糟糕。但当解十分多（dense）的时候，DFS可能更快。
- Space：$O(bm)$。最深路径m X 最大分支b。线性空间
- Optimal：不是。
#### IDS (Iterative deepening search)
是一种iterative deepening 迭代加深。
DLS是在DFS的基础上加一个最大深度上限l。
- 一开始l为1，然后进行dfs
- 如果找到解，停止
- 如果没找到，l + 1，再进行dfs。每次增加深度之后都要**从头**进行DFS。

- Complete：是的
- Time：最优解的深度为d，b为分支因子。$(d+1)b^0 + db^1 + (d-1)b^2 + \cdots + b^d = O(b^d)$。这是因为深度 0 的根节点会被访问 (d+1) 次，深度1访问d次，以此类推。
  虽然有重复，但总成本仍由最深一层$b^d$主导，所以时间复杂度和BFS同阶。
- Space：$O(b^d)$。
- Optimal：当每一步代价相同时，是optimal。可以尝试修改UCS（把深度上限改成累计代价上限逐步加深）来解决问题。
当解在最右方时，IDS比BFS好。BFS 不一定要等节点“出队并扩展”时才检查是否为目标；可以在“生成子节点并入队”时就做 goal test。  这样当目标在某层较靠后位置时，可能减少不必要的进一步生成与等待。

>[!note] Repeated States
>搜索问题，如果不检测是否已访问，那么就会做大量重复工作。可以维护一个“已访问/已生成”集合（closed set / visited）。这也是为什么图搜索（Graph Search）可能比树搜索（Tree Search）指数级更高效，因为树不能记录已访问集合。



