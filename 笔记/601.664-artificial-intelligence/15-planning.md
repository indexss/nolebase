# 15 Planning

## Search vs. Planning
例子任务：**“买到牛奶、香蕉、以及一个无线电钻”**（get milk, bananas, and a cordless drill）
- 标准搜索算法会失败，因为每做一步都会产生新的分支，形成一棵巨大的搜索树；而真正通向目标（Finish）的路径只是其中很少一部分。
	- ![[15-planning-1772678039792.png|400x249]]
Planning一般做这三件事：
- 改进动作与目标的表示（representation）以便选择
- 通过子目标（subgoaling）分而治之（divide-and-conquer）
- 放松“必须按顺序构造解”的要求
![[15-planning-1772678128969.png|610x144]]

## STRIPS operators
![[15-planning-1772678216999.png|380x238]]
- STRIPS 用三元组来描述动作：**Action / Precondition / Effect**。
- 减弱表达能力，加快计算。
## Partial-order planning
- 不是把所有动作严格排成一条线，而是只规定“必须先后”的约束；不相关的步骤可以并行/任意交换顺序执行。
	- 由一组步骤steps以及两类关键关系组成：因果联系**和时间顺序约束。
		- Start step：initial state
		- Finish step：finish的前提就是达成目标的前提
		- causal link因果链接：表示“某一步的结果支持了另一步的前提“
		- Temporal ordering：部分序，有一些步骤有严格的时间顺序关系，但不是全部都有。添加他们。
	- complete： **当且仅当** 所有步骤的每个前提条件都被满足
	- achieved：它是早期步骤的结果，并且没有可能的干预步骤将其撤销。
例子：
![[15-planning-1772678714074.png|317x392]]

![[15-planning-1772678755101.png|440x611]]
可以有的操作：
- **add a link（添加因果链接）**
- **add a step（添加步骤/动作）**，当存在一个 open condition（某个前提条件还没人能提供）时，就**加入一个新的动作**，使它的效果能够实现该条件。
- **order one step wrt another（添加排序约束以消除冲突）**
在open condition无法实现，或者冲突无法排序的时候，就backtrack。

- **clobberer（破坏者）**：一个可能插入在中间的动作，会把因果链所依赖的条件“弄没了”（使 p 不再成立），从而威胁该因果链。
	- 比如：$Go(Home)$会破坏$At(Supermarket)$。一万内一旦执行回家，就不在超市了。
- 解决clobber的方法：
	- Demotion：把clobberer放到因果链的产生者前
	- Promotion：放到因果链的使用者后。
	- ![[15-planning-1772679035938.png|567x314]]

- POP是一种非确定性的算法。
	- 可能会遇到choice point，失败之后会回溯，到这个点换一种选法。
		- 选哪个动作来满足某个需求：某个条件缺了（need），你要决定用哪一步操作把它补上（add）。
		- **处理 clobberer（破坏者）的选择：demotion 或 promotion**
		- $S_{need}$ 的选择不可撤销。回溯只在选择点发生，挑哪个需要先解决是无法被回溯覆盖的。
- POP是sound，complete，systematic的。
- 可以扩展到支持析取，全称量词，否定，条件等。
- 启发式可以加速
- 子目标多，相互关联弱的时候效果好。
![[15-planning-1772679316185.png|644x482]]
## Real World Example
![[15-planning-1772679342379.png|609x456]]
- `~Flat(Spare)`：备胎没瘪。
- `Intact(Spare)`：备胎是完好的。
- `Off(Spare)`：备胎当前不在车轮轴上（不装在车上）。
- `On(Tire1)`：Tire1 这条胎装在车上。
- `Flat(Tire1)`：Tire1 是瘪的

现实生活中，规划可能出错，这是因为：
- Incomplete information 信息可能无法提供完整
	- $Intact(Spare)$：这个前提有的时候会忘了写。有的时候我们只会写hasSpare.
	- inflate(x)给x充气。有的时候可以导致$Inflate(x)\ \text{causes}\ Inflated(x)\ \vee\ SlowHiss(x)\ \vee\ Burst(x)\ \vee\ BrokenPump\ \vee\cdots$，结果不确定。
- Incorrect information 有的信息可能不正确
- incorrect / missing postconditions 后置的效果可能缺失或者写错
- Qualification problem：资格问题，人没有能力去穷尽所有的条件和结果。

解决方法：
- ### Conformant / Sensorless planning（一致规划/无传感器规划）
	- 在不依赖前置信息的情况下给出规划
	- 几乎不可能存在，搜索空间太大，做对几率太小
	- ![[15-planning-1772679944004.png|466x409]]
- ### Conditional planning
	-  主动规划“如何获取信息”（**observation actions，观测动作**），然后**针对不同观测结果准备不同分支子计划**（contingency）。
	- $[\text{Check(Tire1)},\ \text{if Intact(Tire1) then Inflate(Tire1) else CallAAA}]$
	- 昂贵，不少case甚至可能很小概率发生
- ### Monitoring / Replanning
	- 先假设“正常情况”会发生，执行过程中**持续监控进展**；一旦发现偏离预期，再**现场重规划**
	- 意外情况可能导致失败，难以补救。
## Conditional planning
- 当**世界是非确定性（nondeterministic）**或**部分可观测（partially observable）**时，智能体执行动作后并不能唯一确定当前真实状态。因此需要维护一个**信念状态（belief state）**：表示“当前可能处于哪些世界状态的集合/分布”。
- 此时获得的**感知/观测（percept）**通常会带来信息，用来**缩小不确定性**：把原来的信念状态**分裂（split up）**成多个更小的可能集合。
![[15-planning-1772680073896.png|659x271]]

条件计划检查（KB + 的任何后果 + 感知）  
\[. . . , if C then P lanA else P lanB, . . .\]
- 执行时并不是只看初始信息，而是：
	1. 用**当前 KB**去检验条件 C（把 C 与当前已知信息进行匹配/推理）
	2. 若 C 为真，执行 **then** 分支 PlanA
	3. 否则执行 **else** 分支 PlanB
- 对**每一种可能出现的 percept（观察结果）**，都要有“某个可执行的计划分支”。
	-  **博弈（game playing）**：对对手的**每一种走法**都要有回应（某种 response）。
	- **反向链推理（backward chaining）**：要找到“某条规则”，使得该规则的**每个前提（premise）**都能被满足（即 AND 条件都成立）

![[15-planning-1772680283313.png|528x321]]

## Monitoring and Replanning
- 使用POP算法规划
- 一步一步执行计划
- 没回自行一步，就和感知到的世界所对比验证
- 当preconditions和剩余计划的前提不一致的时候，就是failure

![[15-planning-1772680496146.png|603x332]]
- 监控（monitor）：执行完动作后检查关键条件是否达成，比如是否真的满足 `Color(Chair,Red)`。
- 若环境“不配合”（例如油漆太稀、被擦掉、传感器误判、动作效果不确定），检查可能失败。
- 重规划（replan）：失败后生成新计划，最自然的修复动作就是**再次刷漆**。
- 于是整体行为变成：**刷 → 检查 → 不够红 → 再刷 → 再检查 … 直到成功**，形成“loop until success”的涌现行为。

