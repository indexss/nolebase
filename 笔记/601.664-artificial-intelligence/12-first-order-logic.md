# 12 First Order Logic

## 为何使用FOL
Propositional Logic的优点和缺点
- 优点
	- 声明式，公式/句子的**语法形式直接对应事实**。
	- 允许表达**不完全/或/否定信息**
	- 可以用谓词组合
	- 上下文无关
- 缺点
	- 表达能力有限
	- 只能用“原子命题 + 逻辑连接词”拼句子，**缺少变量、量词、关系结构**，因此很难“概括性地”表达规律。
	- 比如说：坑会导致相邻格子有风，这个就不能不能在保留语义的情况下写出来。

FOL
- 世界包含objects，relations，functions
	- object：人，房子
	- relations：part of，has color
	- Functions：father of，best friend
![[12-first-order-logic-1772599494345.png|646x268]]
## Syntax 和 Semantic
Syntax：
![[12-first-order-logic-1772599536529.png|486x337]]
（Predicates是谓词）
- **原子句子** = “谓词(...)” 或 “项=项”，是逻辑里最小的真/假判断单位。
- **项**用来“指代对象/值”，可以由**函数嵌套**构造得很复杂。
	- ![[12-first-order-logic-1772599592075.png|754x249]] 

- 复杂句子：原子句子用连接词连接起来。
	- ![[12-first-order-logic-1772599731384.png]]
- 如何判断FOL的句子是否为真？需要看Model和Interpretation
	- Model **模型 = 世界（对象）+ 事实结构（关系）**
		- 论域元素，也就是世界里的物体集合
		- 对象之间的关系
	- Interpretation 指派
		- 规定“符号 a,P,f 分别指模型里的哪个对象/关系/函数”。
	- 原子句为真，当且仅当term属于模型，且每个term之间的关系属实。
### 例：Model of FOL
![[12-first-order-logic-1772600029441.png|588x446]]
![[12-first-order-logic-1772600079044.png|587x401]]
### Universal Quantification
全称用推出，存在用且。
![[12-first-order-logic-1772600147530.png|711x340]]
$$\forall x \; At(x,JHU) \land Smart(x)$$是错误的
$$(\forall x\, At(x,JHU)) \land (\forall x\, Smart(x))$$是正确的
$$\forall x \; (At(x,JHU) \Rightarrow Smart(x))$$
也是正确的

### Existential Quantification
全称用推出，存在用且。
![[12-first-order-logic-1772600395850.png|725x357]]
![[12-first-order-logic-1772600459319.png|725x405]]
注意：
- $\exists x\,\forall y$和$\forall y\,\exists x$不同
- $\forall x\,P(x)\;\equiv\;\neg\exists x\,\neg P(x)$
- $\exists x\,P(x)\;\equiv\;\neg\forall x\,\neg P(x)$

### Equality
 - 一阶逻辑里的“相等”是语义概念
	 - term1 = term2 为真，当且仅当 term1 和 term2 指代同一个对象。
- satisfiable
	- 存在某个模型，使$1=2$和$\forall x\ \times(\mathrm{Sqrt}(x), \mathrm{Sqrt}(x)) = x$同时为真。
- true
	- 2=2
- 例子：用 Parent 定义（全）Sibling
	- $\forall x,y\ \mathrm{Sibling}(x,y)\ \Leftrightarrow\ \Big[\neg(x=y)\ \land\ \exists m,f\ \neg(m=f)\ \land\mathrm{Parent}(m,x)\land \mathrm{Parent}(f,x)\land\mathrm{Parent}(m,y)\land \mathrm{Parent}(f,y)\Big]$

## 例子
![[12-first-order-logic-1772600814864.png]]
- First cousin是指表亲，就是父母的兄弟姐妹的孩子。

![[12-first-order-logic-1772600843538.png]]

### 每个农夫都拥有一头驴
$$\forall f\,(Farmer(f)\Rightarrow \exists d\,(Donkey(d)\land Own(f,d)))$$
$$\exists d\,(Donkey(d)\land \forall f\,(Farmer(f)\land Own(f,d)))$$
### 所有人类都住在同一个星球上
$$\exists p\,(Planet(p)\land \forall h\,(Human(h)\land LivesOn(h,p)))$$
### 每个“拥有驴的农夫”都会喂他拥有的那头驴
错误写法：
$$\forall f\; (Farmer(f)\land \exists d\,(Donkey(d)\land Own(f,d)\Rightarrow Feeds(f,d)))$$
因为出现了 P -> Q，所以只需要让P为假，那么整体就为真了。如果d是猪，那么P就假了，就变成任意农夫且猪，无意义了。

正确写法：
$$\forall f\forall d\,((Farmer(f)\land Donkey(d)\land Own(f,d))\Rightarrow Feeds(f,d))$$

### FOL的局限性：
-  需要“对谓词量化”
- 无法修饰程度。非常好和好，没有very这个谓词。
## Wumpus World例子
KB
![[12-first-order-logic-1772601510749.png|775x475]]
FOL推断隐藏属性
![[12-first-order-logic-1772601588450.png|777x446]]

Fluent为可变事实：
![[12-first-order-logic-1772601625086.png|738x373]]
- 建模时需要明确：**每个动作会让哪些 fluents 变成什么**，并默认其他不受影响的 fluents 继续保持（这是后续会涉及的“状态更新/继承”思想）。

世界会变，不能把事实当永久。
![[12-first-order-logic-1772601707994.png|729x526]]

 用一阶逻辑描述“动作”对世界状态的影响
![[12-first-order-logic-1772601794305.png|737x380]]
用统一谓词描述状态：
$$P \text{ 在后继状态为真} \;\Leftrightarrow\;
(\text{有动作使 } P \text{ 成立}) \;\vee\; (P \text{ 原本成立且未被破坏})$$
$$\forall a,s\;\; Holding(Gold, Result(a,s)) \Leftrightarrow
\Big[(a=Grab \land AtGold(s)) \;\vee\; (Holding(Gold,s)\land a\neq Release)\Big]$$

 “查询”出一个计划
 ![[12-first-order-logic-1772601966629.png|774x334]]这假设代理对从 S0 开始的计划感兴趣，并且 S0 是唯一描述的情况。

更好的方法：给出动作序列。
![[12-first-order-logic-1772602186593.png|816]]
1. 空计划不改变状态： $\forall s, PlanResult([,],s)=s$
2. 先执行第一个动作，再执行剩余计划: $\forall a,p,s;; PlanResult([a|p],s)=PlanResult(p,;Result(a,s))$
- **规划系统**是专门为“这种找计划的推理/搜索”优化的推理器