# 08 Informed Search
什么是Heuristic？
Heuristic是
1. 任何用于：解题、学习、探索/发现的思路或方法。
2. 采用的是“实用的方法”（通常更快、更省计算/时间）。
3. 不保证结果是最优（optimal）或完全正确/完美（perfect）。
4. 但对当下要达成的目标来说已经够用。

定制策略来选择fringe里面的下一个要展开的节点。

## Best First Search
- 思想：Best-First Search使用一个evaluation function来九三每个节点的desirability，选择去expand最desirable的未展开的节点。
- 实现：fringe中按照desirability排序，取出最优先的节点。
- 例子：
	- Greedy Search：只看离目标还有多近
	- A\* Search: 同时考虑以走代价和预计剩余代价。

依旧是Romania问题：
![[08-informed-search-1772501765763.png|541x269]]

### Greedy Search
h(n)为当前结点 (n) 到**最近目标**的“代价（cost）”的**估计**。在Romania问题中，为n到Bucharest的直线距离。**总是扩展 (h(n)) 最小的结点**，因为它“看起来”最接近目标。
![[08-informed-search-1772501912796.png]]
- Complete：一般不完备。可能陷入循环。在重复状态检测 + 状态空间有限的情况下，是完备的。
- Time：$O(b^m)$。b是分支因子，m是最大搜索深度。这是最坏情况。
- Space：$O(b^m)$，所有node都要存
- Optimal：不是。

### A\* Search
思想：尽量不去继续探索那些已经很贵的路径。有限扩展总成本更小的节点。
评价函数f(n) = g(n) + h(n)。
- g(n)：从起点到当前节点 n 的**已花费真实代价**（cost so far）。
- h(n)：从 n 到目标的**估计代价**（启发式）。需要为Admissible的。罗马尼亚问题中是直线距离。
- f(n)：经过 n 到达目标的总成本估计

A\* search使用了Admissible heuristic可采纳的启发式，要求h(n) <= h\*(n)， h\*(n)是真实剩余代价。
![[08-informed-search-1772502708610.png]]
![[08-informed-search-1772502876077.png|438x267]]
- Complete：是的，除非有无穷个节点满足f <= f(G)。
- Time：指数级，在{h的误差和解的长度}这个空间里指数级增长
- Space：保存所有节点。
- Optimal：只要启发式函数的h为admissible的，那么A\* search是optimal的。
	- 目标为G，通过不最优的方式到G节点记为G2
	- 对于G2，其g(G2)=0，其f就是走的路程g(G2)
	- 这个f(G2) = g(G2)一定大于g(G)，因为不是最短路。而由于h是Admissible的，h(n) <= g(n到G)，所以f(n) = g(n) + h(n) <= f(G) = g(G) < f(G2)，所以一定会选n。
	- 总结：A∗ expands all nodes with f (n) < C∗ ，A∗ expands some nodes with f (n) = C∗  ，A∗ expands no nodes with f (n) > C∗

#### Admissible Heuristic例子
##### 例：8 puzzle
$h_1(n)$ 错位方块数
$h_2(n)$: total Manhattan distance (只能上下左右走，目标位置的最短步数)

这里引入Dominance概念。在A星中，如果两个h都可以采纳，且如果总有h2(n) >= h1(n)，那么称h2 dominates h1 并且 is better for search。

- 我们总是选那个更大的，且满足Admissible的启发函数。

如何得到admissible的heuristic呢？一般来说就是通过relax problem来derive。例如，数错位方块数，或者曼哈顿距离，就是比严格遵守8-puzzle规定更放松的条件，就可以用来当做heuristic。

##### 例：Traveling Salesperson Problem (TSP)
要找一条最短路线（tour），**每个城市恰好访问一次**。

怎么通过relax得到heuristic呢？
- 找到符合环约束的TSP剩余答案很难
- 但是让剩下城市连通起来很简单，这也就是最小生成树Mininmum Spanning Tree。MST的计算是O(n2)的，那么h(s)就可以设置为$h(s)=w(\text{MST}(U))$，总权重。
- 然而，由于当前所在城市c和没访问的城市U集合并无连接。为了让h(s)更优，可以将heuristic设置为：$h(s)= \min_{u\in U} d(c,u) \ +\ w(\text{MST}(U))$，就是找一条让c到未访问的城市集合的最小边，加上最小生成树，也就完全连通了。


## Iterative Improvement Algorithm
在很多**优化问题**里，**不关心到达解的路径（path）**，只关心最终得到的**目标状态本身就是解**，这类问题适用Iterative Improvement Algorithm。
- 这类问题中，State的定义为一个解的集合（不一定最优，也不一定可行，只要是个解就行）
	- TSP中，就是一个完整巡回路线
	- 排课中，就是一张完整的课程表
- Iterative Improvement Algorithm保留一个current状态，然后通过improve当前状态得到neighbor，一步步把解往最优推。
	- TSP比如 2-opt，能快速逼近最优
	- n-Queens的neighbor就是移动一个皇后让冲突数下降。
- 常熟级内存占用，适合在线搜索和离线搜索。

#### Hill Climbing
一种local search，通过当前解生成neighbor，如果更好就替换，如果不好就重新生成邻居。
改进：
- Random-restart hill climbing：可以克服局部最优。如果允许无限次重启，那么就是trivially complete平凡完备。
- Random sideways moves：随机横向移动，遇到高度不变的neighbor，允许以一定策略走平路。
	- 有可能在flat local maximum上兜圈。
##### 改进：Local Beam Search
把hill climing“只保留1个当前状态”扩展为“同时保留 k 个状态”。
- 对k个状态，各自生成领居
- 把所有领居放一块，得到最好的前k个作为下一轮的k个状态。

这不等于并行跑k次搜索，因为有交换信息。

问题：k个状态变得相似，最后爬到同一个local maximum上。
改进：不选top k，而是倾向于选top的，类似轮盘赌。

#### Simulated Annealing
#### Genetic Algorithm
[Week 2 Optimization & Local Search](../Evolutionary%20Computation/Week%202%20Optimization%20&%20Local%20Search.md)







