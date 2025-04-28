# Week 9 Markov Decision Processes
## 动机问题
某病症Q的患病率是1%
如果患病，那么检测为阳性的概率为90%
如果没患病，仍有9%的假阳性概率
那么结果为阳性的时候，患病的概率为多少？
P(Q) = 0.01
P(阳|Q) = 0.9
P(阳|非Q) = 0.09
$$P(Q\mid+)=\frac{P(+\mid Q)P(Q)}{P(+\mid Q)P(Q)+P(+\mid\neg Q)P(\neg Q)}=\frac{0.9\times0.01}{0.9\times0.01+0.09\times0.99}=\frac{0.009}{0.009+0.0891}\approx0.0917$$
那么医疗建议部门应该给出什么建议呢？
这几个哪个对？
- The probability that they have disease Q is about 8\%
	- 错了，上面计算
- Out of 10 people with a positive test, about 9\% have disease Q.
	- 也不对，首先没有0.9个人
- Out of 10 people with a positive test, about 1 has Q.
	- 这个就对了。如果1000人筛查，那么会有1000 \* 0.01 \* 0.9 + 1000 \* 0.99 \* 0.09 = 98,  其中9真阳，89假阳
	- 其实上面已经算好概率了，就是9.2\%的患病率。
- The probability that they have Q is about 1%
	- 错上加错


但是上面这些都是真实人类说出来的话。所以我们知道，人在概率推理上往往表现很差，需要一个真实的场景（Natural Frequencies）才能正确表述出来。
启示：用Natural Frequencies替代概率为人们展示信息。
![](assets/Pasted%20image%2020250428223649.webp)

## 贝叶斯定理
$$p\left(\theta\mid D\right)=\frac{p\left(D\mid\theta\right)p\left(\theta\right)}{p(D)}.$$
$$\mathrm{posterior}=\frac{\text{likelihood}\times\mathrm{prior}}{\text{marginal likelihood}}.$$
## 马尔可夫链
我们曾在 [11 - Language Modeling](../🧠%2032167-neural-computation/11%20-%20Language%20Modeling.md) 中提到过马尔可夫过程，一阶的马尔可夫就是说忽略前置一切状态，只根据当前的状态就能预测下一状态。核心特点就是 **“无后效性”**（Markov 性）：下一时刻的状态只依赖于当前状态，而与更久远的历史无关。状态无关。
$$\boxed{P(w_n\mid w_1,\ldots,w_{n-1})\mathrm{~}\approx\mathrm{~}P(w_n\mid w_{n-1})}$$
实际上，马尔可夫链依旧是有限状态机。有一系列节点，是状态集合S，只不过，把原来确定性的状态转移方程，变成了转移概率分布P(s_new|s)。
![](assets/Pasted%20image%2020250428224404.webp)
这个玩意描述了一个随机走动，或者布朗运动，每一步在当前值基础上加一个均值 0、方差sigma2的高斯噪音。下一步的增量只依赖于当前状态，符合马尔可夫性。
![](assets/Pasted%20image%2020250428224638.webp)
这个就很好理解，是一个气候的马尔可夫链。
![](assets/Pasted%20image%2020250428224654.webp)
这个是一个生病头疼的马尔可夫链。
![](assets/Pasted%20image%2020250428225257.webp)
这是一个涉及Action的马尔可夫链
其中红色的是Action，**动作的选择**是由“策略”决定。这个图怎么看？headache的情况下，如果选择服用medicine，那么有0.7的概率获得正奖励（r = +1），变为不头疼，但是也有0.3的概率得到负奖励，也就是继续头疼或者出现副作用。如果不头疼的情况下吃药，那么0.9的概率获得0奖励，也就是继续不头疼，还有0.1的概率获得负奖励(r = -1)，变为头疼。
在 MDP 中，我们要做的不只是**预测状态**，更要**选择动作**以**最大化累计奖励**。
𝑃 ( 𝑠 ′ ∣ 𝑠 , 𝑎 )告诉你“不同行动下会如何转移”， 𝑟 ( 𝑠 , 𝑎 , 𝑠 ′ )告诉你“这次转移值不值得”。

马尔可夫链的形式化定义：
- 状态集S
- 动作集A
- 转移函数 p(s_new | s, a)：在s状态下采取动作a后转移到s_new的概率
- 奖励函数r = R(s'|s)，转移所获得的标量奖励。

## 代理-环境框架
![](assets/Pasted%20image%2020250428231631.webp)
代理在上一个State的影响下选择Actions，影响新环境，得到Reward。
一个人，推荐系统在上一个state的基础上推荐采取一个action，得到新环境，以及根据主管效用 / 前景理论获得的Reward。

## 一个策略例子 - 贝尔曼方程
![](assets/Pasted%20image%2020250428232137.webp)
动作是**随机的**：
即使你指定的策略是向上，那0.8的概率朝上，但仍有10%的概率朝左朝右，这是为了模拟真实场景，比如说有风。
每跨一步 r -= 0.01
![](assets/Pasted%20image%2020250428232439.webp)
那么我们可以给出最优policy pi_star：
![](assets/Pasted%20image%2020250428232524.webp)
我们如何计算在最优策略π下的最优Value是多少呢？可以用最优贝尔曼方程来建模：
![](assets/Pasted%20image%2020250428233203.webp)
对于这个例子，就是（V和U混用了，应该用V）：
![](assets/Pasted%20image%2020250428233300.webp)
## 确定最优策略的算法
- Value iteration ：一会讲
- Policy iteration：**评估阶段**：给定策略pi，用**贝尔曼期望方程**算Vpi，**改进阶段**：用Vpi算出贪心策略pi_new，再回去评估，循环往复。
- Q-learning：一种经典的**无模型（model-free）离线**强化学习算法，通过与环境交互直接学习动作—价值函数Q(s,a), 无需事先知道状态转移方程P以及及时奖励R。
	- $$Q(s,a)\leftarrow Q(s,a)+\alpha{\left[r+\gamma\max_{a^{\prime}}Q(s^{\prime},a^{\prime})-Q(s,a)\right]}$$
- Reinforcement Learning (RL)，广义范畴，指所有通过与环境反复交互、试错学习最优策略以最大化长期累积奖励的方法。Q-learning、蒙特卡洛方法、时序差分（TD）学习、策略梯度等。
- Deep Reinforcement Learning (DRL)，在强化学习框架下，用**深度神经网络**来近似状态值函数V(s)，动作值函数Q(s,a)或策略pi(a|s)，如DQN、Deep Deterministic Policy Gradient (DDPG)、A3C/A2C、PPO。
- Proximal Policy Optimisation (PPO)：把「最大化期望累积回报」写成一个可微的目标函数，通过梯度上升（或近似信赖域方法）直接优化策略参数。


## Value Iteration
![](assets/Pasted%20image%2020250428234531.webp)
这个事Value Iteration的函数签名。
它的输入为：
常见的mdp，以及discount gamma，**ε**：允许的最大误差阈值，用来控制收敛条件。
本地变量：U, U', 长度为S的向量，分别存储“上一次”和“本次”对每个状态的估计效用（utility），初始都设为 0。
δ：记录每轮迭代中任意状态效用更新的最大变化量（max change）。

![](assets/Pasted%20image%2020250428234816.webp)
过程，先将所有格子都设为0，然后对每个点进行一次bellman 备份迭代（这并不是贝尔曼方程！不递归！）：
$$U_{k+1}(s)=R(s)+\gamma\max_a\sum_{s^{\prime}}P(s^{\prime}\mid s,a)U_k(s^{\prime})$$
然后计算变化量 |U'(s) - U(s)|，delta，则更新若大于当前。
整轮过后，若**最大变化量** δ小于收敛阈值，则循环结束。
我们是在用bellman 备份迭代，去逼近bellman最优方程！这用到了不动点定理，是一个数学证明，反正是可以逼近的。

![](assets/Pasted%20image%2020250428235832.webp)
![](assets/Pasted%20image%2020250428235837.webp)


![](assets/Pasted%20image%2020250428235845.webp)
![](assets/Pasted%20image%2020250428235851.webp)
## 总结
- 马尔可夫链仅仅描述了随机过程，并没有建模决策。如果要建模人类决策过程，可以用MDP。
- MDP用S，A，P，R来定义决策问题
- 动作的选择代表着意图，意图的结果可能不确定
- 贝尔曼方程通过及时奖励和未来奖励的综合来定义决策价值
- 价值迭代算法可以用来找到最优策略
- 最优策略有可能反直觉