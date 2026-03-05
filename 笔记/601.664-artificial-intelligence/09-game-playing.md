# 09 Game Playing
## Games
games中，我们有一个 unpredictable 的 opponent。我们的 solution 是 strategy，表明了 opponent 任意 reply 的回击手段。

如果有 time limits，那么很难找到 goal，只能 approximate。
根据 Games 是否 deterministic、是否有 complete observation，我们可以将它们分为四种：
![[09-game-playing-1772505956887.png|674x311]]
Checker 跳棋，Othello黑白棋
Backgammon双陆棋，Monopoly大富翁（骰子）
Battleships海军旗，对方舰队位置隐藏
Bridge桥牌，Poker扑克，Scrabble拼字游戏：有随机的发牌/抽字母，也有隐藏手牌。
## Perfect play
### minimax decision
对象：perfect-information，deterministic的game
想法：选择能到达最高minimax value的下一步。

- Compete：当树finite时完备
- Optimal：当对手也是最优对手的情况下是最优的。如果对手不是最优，那么仍会给出一个保底最强的策略，但不一定是最高的策略，因为过于保守（把对手当做完美）
- Time：$O(b^m)$
- Space：$O(bm)$ DFS
![[09-game-playing-1772506431106.png]]
- 上三角后是我的行动，想最大化
- 下三角是对方的行动，想最小化
- 逻辑上要先用DFS把整棵树先刨出来
- 然后按树的从下往上标minimax值，最后得到最优策略。
### α–β pruning
Minimax需要遍历整个树才能标完minimax value，太慢了，其实可以剪枝。
- **α：MAX 的“目前最好下界”**，**β：MIN 的“目前最好上界”**；
- 一旦发现某分支不可能打破 α 或 β，就可以提前剪枝，减少 minimax 的搜索量。
![[09-game-playing-1772507011657.png]]

- Safe：剪枝不影响结果
- 走的顺序很重要。先搜索好的分支，能够得到强的界，尽早剪枝。
- Time：当完美排序的情况下，$T = O\!\left(b^{m/2}\right)$
- 但是仍然很慢
## Resource limits and approximate evaluation
当一个游戏能计算出optimal strategy，我们叫solved。
- tictactoe：solved了，双方最优为平局
- Checkers 跳棋：目前已解决的最大游戏。2007
	- 按照最优策略，至少能强制平局
- 大多数游戏太复杂，并未被solved。

对于太复杂 / 资源受限的情况下，我们有两种standard approach：
- 使用Cutoff-test替代Terminal-Test
	- 比如限制深度
- 使用Evaluation function替代Utility
	- Utility为终局的真实收益
	- Eval为非终局时对局面好坏做评估的函数。
### Evaluation Functions
局面评估函数。
在国际象棋中，可以写成linear weighted sum：$$Eval(s)=w_1f_1(s)+w_2f_2(s)+\ldots+w_nf_n(s)$$f可以是某种特征：
- 比如白皇后 - 黑皇后的差值
- 也可以是pawn 兵的价值
	- bishop = 3 pawn, knight = 3 pawn, rock = 5 pawn
	- 算场上兵力
- 可以用ML去approach
	- 收集大量对弈数据，记录结果，你和一个线性函数。
	- AI也可以self-play，从而不依赖人类棋谱。

问题：
- Quiescence（静态局面）：如果局面不稳定，比如bishop马上被吃，那么Eval不可靠
	- 所以我们就得继续往下搜索几步，直到局面稳定
- Horizon Effect：
	- adverse move（不利的一手）有时只能delay，无法避免。
	- 在下面几步可能看起来还是没事，一旦超过这个深度，坏事立马发生。

#### Forward Pruning
- 想法：对于明显坏的手，就避免计算
- 做法：在还没搜到预设的最大深度（max-depth）之前，只要判断当前局面“够差”，就**提前截断**该分支，不再往下扩展。
- 风险：有些局面**一开始看起来吃亏**，但继续往后走可能出现反转，比如诱导，战术

- 典型方案：Beam Search
	- 每一层只保留固定数量 k 个“最有希望”的走法继续向下搜，其余全部丢弃。
- 技巧：
	- 用查表替代搜索。
		- 在开局和残局的时候，可以直接背谱
		- 6子残局在2006年已被solved。
	- 不用exact value而用monotonic
		- eval只需要满足a>b f(a)>f(b)即可，不需要有精确值，因为我们只比大小
		- 可以简化eval函数

### 被解决的deterministic games的关键技术
- 跳棋：关键技术是endgame database查表
- 国际象棋：快速搜索+复杂评估+选择性加深部分路线（未公开方法）
- 围棋：用神经网络来eval局面。
## Game of chance
这类博弈除了玩家决策，还会出现**随机事件**，是Nondeterministic的，一般引入了骰子。
**Expectiminimax**树（抛硬币例子）：
![[09-game-playing-1772508661491.png|443x329]]
其算法伪代码为：
![[09-game-playing-1772508703375.png|721x161]]

Expectminimax也可做一种类似α-β剪枝的操作：
![[09-game-playing-1772509016526.png]]

如果我们有先验知识，人为设计，可以提前给叶子节点做bound，那么就可尽早剪枝：
![[09-game-playing-1772509332499.png]]

#### 被解决的nondeterministic games的关键技术
- Backgammon由于引入投色子，增加了b。
- backgammon本身走法树也大
- 当深度越深，概率被分散到很多结果上，lockahead带来的收益diminished
- α-β剪枝由于需要用期望，智能剪掉小部分的枝，效果不佳
- TDGAMMON算法通过用深度2的搜索（不追求很深）+超强EVAL来达到世界冠军的水平。
#### Exact Value很重要
![[09-game-playing-1772509694863.png|551x218]]
在非确定性博弈中，数值的准确性会影响策略选择。
- 只有Eval做正线性变换（+常数，乘正数）才能策略不变
- Eval和期望收益成正比
## Game of imperfect information
比如说扑克牌，你不知道全局信息（对方的手牌），所以一个动作的价值取决于information state（观察到的信息集合）以及belief state（对真实状态的概率分布）

真实状态不可见，就可以把搜索对象从“真实局面树”改为用information state树，
- 树上的节点：当前的信息。
- 边：对手的动作，你的动作，以及可能观察到的结果

导致的理性行为：
- 为获取信息行动
- 向队友传递信号
- 随机化行动减少信息泄露

- 扑克 AI 的核心挑战：**不完全信息 + 随机性 + 多人博弈 + 欺骗**bluff。
	- 可选动作少，但状态空间巨大
- 因此更接近“推断 + 概率决策 + 对手建模”，而不是传统确定性棋类那种“算出唯一最优着法”。

