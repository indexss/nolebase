# 11 Logical Agents
## Knowledge-based agents
- KB-Based Agent由两部分组成
	 - Inference Engine
	 - Knowledge Base
- KB是什么？
	 - 是一组陈述sentences，用formal language形式化语言定义
- KB Based Agent如何工作？
	- TELL方法，是一种Declarative approach的方法。TELL就是执行$KB \leftarrow KB \cup \{\varphi\}$ （更新KB）
	- Ask方法，自己问自己，根据KB和推理引擎得到决策。
- 从两个视角看KB Agent
	- 从Knowledge level（知识层），我们只关心Agent知道哪些知识就行，不用知道工程实现方法。
	- 从Implementation Level（工程实现层），我们关心KB如何存储知识，推理引擎，算法如何实现

一个KB Agent的伪代码为：
![[11-logical-agents-1772591179795.png|605x205]]
其实就是：
- 把当前感知加入KB
- 向KB提问得到行动
- 把执行的行动写回KB
- 循环

KB Agent需要有的能力：
- 表示state action的能力
- percept
- 更新KB
- 推理世界的隐藏事实
- 推断action

### 例：Wumpus World
我们常用PEAS来描述一个Agent。在Wumpus World中，Agent是左下角的人。
PEAS = **P**erformance measure（评价指标）、**E**nvironment（环境规则）、**A**ctuators（可执行动作）、**S**ensors（可感知信号）
- P
	- 拿到gold +1000
	- 死亡 -1000
	- 走路 -1
	- 射箭 -10
- E
	- Wumpus 相邻格子会臭
	- Pit相邻格子有风
	- Glitter（闪光）只和金子在同一格
	- 面向Wumpus射箭，Wumpus会死
	- 只有一根箭
	- 和金子在同一格，可以grab金子
	- Release把金子丢在当前格
- A
	- 左转右转
	- 前进
	- 抓，放
	- 射箭
- S
	- Breeze 风传感器（旁边有坑）
	- Glitter传感器（识别金子）
	- Smell传感器（提示附近有Wumpus）
![[11-logical-agents-1772591898897.png|359x357]]
- Observable：不是完全可observe，看不到全局
- Deterministic：是的，没有随机性
- Episodic：不是，前一个会影响后一个
- Static：是的，Wumpus和Pit不动
- Discrete：是的
- Single Agent：是的
![[11-logical-agents-1772592487345.png]]
在遇到tight spot（无必然安全动作局面时，通过假设先验分布为P均匀分布，来尽量避免走高概率为P的点。）![[11-logical-agents-1772592599209.png|337x287]]
如果条件更紧，比如在1，1的时候就已经Smell到了，那么可以先盲射一箭。中了游戏结束，不中也得到了信息。

## Logic: models and entailment
- Logic是用逻辑化语言表示信息的方法
- Syntax定义了哪些合法。
- Semantic让断言有了真假。

### Entailment 蕴含
- **蕴含** （$\vDash$）表示“一个结论必然从另一个前提出发成立”，也就是“前提为真时，结论一定为真”。
	- $KB \vDash \alpha$ 意味，KB为真，alpha一定为真。KB约束更强
		- 例如：KB里面有R和J赢了
		- 如果alpha为：R或J赢了
		- 那么alpha在KB在一定为真，所以蕴含
	- Entail是一个Syntax，Entail是否成立由Semantic决定。

如果用Models来思考（模型就是能让一个命题真的情况），$KB \vDash \alpha$可以画为：
![[11-logical-agents-1772593392128.png|378x325]]
- KB = Ravens won and Jays won  
- α = Ravens won

蕴含关系：
![[11-logical-agents-1772593962615.png|573x238]]
KB = world + observation，KB entail alpha1

不蕴含关系：
![[11-logical-agents-1772594027363.png|305x221]]
KB 不entail alpha2
### Inference 推理
-  $KB \vdash_i \alpha$ 推理过程i
	- Soundness可靠性：不产生假阳性，推出的都是真的后果。$KB \vdash_i \alpha$ 只在 $KB \vDash \alpha$的情况下成立。
	- Completeness完备性：真的后果都能推出。只要逻辑上KB能推出alpha，那么一个推理过程i完备意为他一定最终能$KB \vdash_i \alpha$
## Propositional (Boolean) logic
![[11-logical-agents-1772594445985.png|571x286]]
![[11-logical-agents-1772594794073.png|585x324]]
Wumpus World的断言：
![[11-logical-agents-1772594857794.png|544x425]]
这个情况的真值表就如下，用真值表满足所有R的，就是valid KB model
![[11-logical-agents-1772594954677.png|547x215]]
## Equivalence, Validity, Satisfiability
### Equivalence 逻辑等价
$\alpha \equiv \beta$ 当且仅当$\alpha \vDash \beta$且$\beta \vDash \alpha$
![[11-logical-agents-1772595195800.png|772x332]]
### Validity 有效性
一个句子（公式）如果在**所有模型**（所有可能的真值赋值/世界）里都为真（永真），就叫 **valid**
比如：
- 永真式：$A \lor \neg A$
- $(A \land (A \Rightarrow B)) \Rightarrow B$
### Satisfiability 可满足
如果可以真，那么就是Satisfiable的，比如$A \lor B$
永不为真，那么就是unsatisfiable的，比如$A \land \neg A$

- 可满足和蕴含的关系：
	- $KB \vDash \alpha \quad \text{当且仅当} \quad (KB \land \neg \alpha)\ \text{是不可满足的}$
	- 可以用反证法证明这个关系$KB \vDash \alpha$
		- 证明不存在满足KB且不满足alpha的模型。

## Inference rules
### 证明方法
证明一般有两种：
- Model Checking: 通过“找一个满足/反例的模型”来判断公式是否成立。
	- **truth table enumeration（真值表枚举）**
	- **improved backtracking（改进的回溯）**
	- **heuristic search in model space（在模型空间做启发式搜索）**
		- min-conflicts like hill climbing
- Application of inference rules: 使用推理规则
	- **Legitimate (sound) generation（合法/可靠的生成）**，每一步保真
	- **证明 = 一串推理规则的应用序列**
		- 可以将推理规则作为标准搜索算法中的运算符使用。
	- 通常需要将句子翻译成范式
 
Horn Form（霍恩形式）是一种受限的知识库（KB）表示法：不是所有 KB 都能写成这种形式。
- KB = 多个Horn子句的conjunction
	- Horn clauses只有两种形态
		- Fact：C
		- Rule：$B \Rightarrow A$
- 重要推理规则 Modus Ponens肯定前件。对 Horn 形式，Modus Ponens 推理是**完备的**
	- $$\frac{\alpha_1,\ldots,\alpha_n \qquad (\alpha_1\land\cdots\land\alpha_n \Rightarrow \beta)}{\beta}$$
	- 上面是前提，下面是结论。
	- 可以用于Forward chaining和Backward Chaining

#### 例：KB推理搜索
- 思想：在知识库 (KB) 里，**只要某条规则的前提（premises）都已被 (KB) 满足**，就“触发”（fire）这条规则，把它的结论加入 (KB)。
![[11-logical-agents-1772596338563.png|637x298]]
### Forward chaining
- 是一种数据驱动的推理方法，从给定的原子命题出发
	- 比如A，B
- 迭代推出更多真命题。反复检查规则，看看能不能从当前已知事实推出新结论
	- $A \land B \Rightarrow C$
- 停止条件：没有推理可做 / 达到目标
![[11-logical-agents-1772596750739.png]]
- 数字为未解决前提数。
- Agenda加入premise为0的节点。

![[11-logical-agents-1772596835546.png|711x393]]
### Backward channing
- 目标驱动，从最终结论出发，倒着找，知道能找到事实。
- 要避免死循环
	- 可以维护一个stack，如果一个goal已经在stack中，阻止这条路经
- 要避免重复计算
	- 对于新的子目标，要查看是否为真 / 假。
![[11-logical-agents-1772597152751.png|642x701]]

- 前向链可能做很多irrelevant工作
- 后向链问题驱动，适合问题解决
	- 复杂度可能远小于线性。**BC 在很多情况下甚至不需要看完 KB**

### Resolution
Resolution为归结，多用于CNF合取范式的推理。CNF的clauses都是合取的。
$$(A \vee \neg B)\ \wedge\ (B \vee \neg C \vee \neg D)$$
推理的方法就是把一堆东西加在一块消：
$$\frac{\ell_1\vee\cdots\vee\ell_k,\quad m_1\vee\cdots\vee m_n}{\ell_1\vee\cdots\vee\ell_{i-1}\vee\ell_{i+1}\vee\cdots\vee\ell_k\vee m_1\vee\cdots\vee m_{j-1}\vee m_{j+1}\vee\cdots\vee m_n}$$
比如：
$$\frac{P_{1,3}\lor P_{2,2},\quad\neg P_{2,2}}{P_{1,3}}$$
Resolution是Sound 并且complete的。

例子：
转化为CNF：
![[11-logical-agents-1772597614545.png|624x401]]
![[11-logical-agents-1772597653031.png|620x344]]
![[11-logical-agents-1772598834173.png|662x165]]
![[11-logical-agents-1772598856409.png|587x275]]


在Wumpus世界中，Logical Agent为
- Action
	- 看到glitter 结束
	- 未探索的安全spot -> 就去探索
	- 如果可能有Wampus -> 就射
	- 不要冒险时要冒险走可能有风险的格子
- 用propositional logic推断世界状态
- 用heuristic search决定做什么动作