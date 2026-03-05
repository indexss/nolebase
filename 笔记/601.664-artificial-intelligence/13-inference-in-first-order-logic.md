# 13 Inference in First-Order Logic

## FOL简化为命题推理
### Universal Instantiation 全称实例化
![[13-inference-in-first-order-logic.pdf-1772602929300.png|689x328]]
### Existential Instantiation 存在实例化
![[13-inference-in-first-order-logic.pdf-1772602970925.png|704x343]]
- 这里的 C1 叫 **Skolem constant**：专门用来给“存在的那个对象”起一个新名字。

KB的实例化：
![[13-inference-in-first-order-logic.pdf-1772603118963.png|750x400]]

- 问题：冗余
	- 我们想要把KB中的FOL都变成propositional的，然后去resolution解决。
	- 然而，有的函数符号可能会产生无限的项，KB就爆炸了
	- 但是，Herbrand定理告诉我们，如果这个问题在KB里面可解决，那么只需要有限多个实例就可以解决。也就是semidecidable。
![[13-inference-in-first-order-logic.pdf-1772603284270.png|739x383]]
直觉上，我们只需要用 (1)(2)(3) 就能推出，但是我们还需要展开greedy的一堆，数量就爆炸了。
## Unification
我们如果已经有了一条推理规则：
$$\forall x\; \big( King(x)\land Greedy(x)\big)\Rightarrow Evil(x)$$
并且我们有两个前提：
- $King(John)$ John是国王
- $\forall y\; Greedy(y)$ 所有人都贪婪

那么我们如果想要推理成功，就需要一组substitution（Unification），来把内容代换：
$$\theta=\{x/John,\; y/John\}$$
我们就能完成推理。所以这个过程中我们做了两个事情：
- **Unification（合一）**：找到使两边公式形式一致的变量替换（这里就是让 King(x) 变成 King(John)，Greedy(x) 变成 Greedy(John)）。
- **Generalized Modus Ponens（广义假言推理）**：当你有 P⇒Q，并且能得到 P（通过合一/实例化），就推出 Q。
### 概念
- **合一**要解决的问题：给定两个项/原子式 α,β，能否找到一个**替换（substitution）** θ，使得把 θ 同时应用到两者后它们变成**同一个表达式**。
	- $\text{UNIFY}(\alpha,\beta)=\theta$ 当且仅当$\alpha\theta=\beta\theta$，$\alpha\theta$表示对$\alpha$中的变量按$\theta$替换。
![[13-inference-in-first-order-logic-1772659191349.png|757x207]]

## 广义Modus Ponens
在FOL中，Modus Ponens使用的子句，为definite clausees。意思为，只能有一个变量是正的，其它都应该是负的合取。

那么推理就是：
$$\frac{p_1^{\prime},p_2^{\prime},\ldots,p_n^{\prime},(p_1\wedge p_2\wedge\ldots\wedge p_n\Rightarrow q)}{q\theta}$$
意思是：
- 对于前提事实$p_1', p_2', \dots, p_n'$
- 有规则$(p_1 \land p_2 \land \cdots \land p_n \Rightarrow q)$
- 若存在一组替换$\theta$使得所有$p_i' \theta = p_i \theta$
- 那么得到结论$q\theta$，q在theta替换下成立。
![[13-inference-in-first-order-logic-1772659677002.png]]

## Forward, Backward Chaining
### Forward Chaining
例：
1. **法律规则**：如果一个人是美国人，并且把武器卖给敌对国家，那么他就是罪犯。国家 Nono 是美国的敌人。Nono 有一些导弹（missiles）。Nono 的所有导弹都是 Col. West 卖给它的。Col. West 是美国人。
上面这个故事中，我们可以把KB建立为：
![[13-inference-in-first-order-logic-1772660269006.png|712x413]]
如何推理？ Forward Chain：
![[13-inference-in-first-order-logic-1772663613012.png|778x62]]

![[13-inference-in-first-order-logic-1772663625148.png|779x253]]

![[13-inference-in-first-order-logic-1772663640636.png|778x387]]

Forward Chain对于FO的Definite Clauses是Sound并且Complete的。
alpha如果不被蕴含，那么前向链可能不能终止，这不可避免。

增强推理方面：
- 只匹配那些“前提里包含上一轮新增 literal（事实）”的规则。
	- 因为没增加literal的规则不可能从k-1到k平白无故被触发，没有信息增量。
- 可以用数据库indexing让事实检索更快，接近O（1）
- 合取前提（conjunctive premises）匹配是 NP-hard
- FC在演绎数据库（deductive databases）中十分常用。

图着色用FC就很难解决。

![[13-inference-in-first-order-logic-1772664366462.png|741x405]]

![[13-inference-in-first-order-logic-1772664420050.png|769x412]]
1) 外层循环：直到推不出新东西
2) 遍历知识库中的每条规则r
3) 找到能满足前提的代换 $\theta$
4) 推出新结论并去重: 如果 (q') **不是** (KB) 或 `new` 里已有句子的“纯改名版本”(renaming)，才把它加入 `new`。

### Backward Chaining
- **从“要证明的结论/查询（query）出发”**倒着找
- 检查能否由规则和事实推出
- 对前提递归

![[13-inference-in-first-order-logic-1772664607375.png]]

![[13-inference-in-first-order-logic-1772664627101.png|720x191]]

![[13-inference-in-first-order-logic-1772664645177.png|729x222]]

![[13-inference-in-first-order-logic-1772664658612.png|732x335]]

![[13-inference-in-first-order-logic-1772664694630.png|736x368]]

![[13-inference-in-first-order-logic-1772664713071.png|743x370]]

![[13-inference-in-first-order-logic-1772664730989.png|747x352]]
- 深度优先，递归，空间是线性的
- 不完备，因为可能loops。
	- 可以做循环检测
- 低效，可能重复证明一个子目标
	- 记录以证明
- logic programming中常用

![[13-inference-in-first-order-logic-1772664850694.png|769x387]]

$$\text{answers} \leftarrow \text{FOL-BC-ASK}(KB,\ \text{new\_goals},\ \text{COMPOSE}(θ', θ))\ \cup\ \text{answers}$$
compose是代换合成，代换theta
## Logic Programming
在逻辑编程里，**计算 = 在逻辑知识库（KB, knowledge base）上做推理（inference）**。

Prolog语言是用Horn clauses + backward chaining + 一些增强（bell + whistles）。
Prolog程序的基本语法：
$$\text{head} \;:-\; \text{literal}_1,\ldots,\text{literal}_n.$$
- 要证明head成立，就要证明literal1 - n成立。
![[13-inference-in-first-order-logic-1772665162782.png|759x222]]
输入之后，prolog会用反向查询自动推理。
- 深度优先、从左到右的反向链推理
- 内置一些算术
- 封闭世界假设：失败即否定。
	- 当系统在知识库里**无法推出** `dead(joe)` 时，`alive(joe)` 查询会成功。
## Resolution
归结就是消消乐。
![[13-inference-in-first-order-logic-1772665290040.png|710x393]]
complete for FOL。

但是要注意把结论转为合取范式：
1. 消去implications
2. 将否定往内推
![[13-inference-in-first-order-logic-1772665401268.png|726x369]]
![[13-inference-in-first-order-logic-1772665477917.png|729x416]]
例子：
![[13-inference-in-first-order-logic-1772665518446.png|728x439]]
![[13-inference-in-first-order-logic-1772665533211.png|728x450]]

