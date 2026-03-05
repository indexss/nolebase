# Knowledge Representation

## Representation systems
我们的目标是让AI做常识推理，就得先把知识用某种形式表示出来。
知识种类有：
- objects
- events
- procedures
- relations
- mental states
- meta knowledge

Representation System的四个关键性质：
- 表示充分性 representational adequacy
	- 语言太弱的话，无法表示，就谈不上后面的推理
- 推理充分性 Inferential adequacy 
	- 可以对已有知识进行推理得到新知识
- Inferential efficiency 推理效率
	- 推理过程能被引导到更有可能成功的方向
	- 有限资源情况下也能给出近结果
- Acquisitional efficiency
	- 能够自己获取知识
	- 如果能自动化是最理想的
## Categories and objects
### Categories
![[14-knowledge-representation-1772672131383.png|686x409]]
种类的关系：
- 互斥 Disjoint
	-  Disjoint( {Animals, Vegetables} )
- 穷尽分解 ExhaustiveDecomposition
	- ExhaustiveDecomposition( {Americans, Canadians, Mexicans}, NorthAmericans )
- 划分 Partition
	- Partition( {Males, Females}, Animals )
这些关系都可以用FOL表示

### Objects
Objects可以有关系：比如Partof
- PartOf(Bucharest, Romania)  
- PartOf(Romania, EasternEurope)  
- PartOf(EasternEurope, Europe)  
- PartOf(Europe, Earth)

可以用Partof定义composite objects复合对象双足动物：
![[14-knowledge-representation-1772672538852.png]]
最后一句：对任何 (l_3)，如果 (l_3) 是腿且属于 (a)，那么它只能是 (l_1) 或 (l_2)。  
这句非常关键：避免出现“除了 (l_1,l_2) 之外还有第三条腿”。

### Prototypes
- **自然类别（natural categories）很难用“严格定义”刻画**：比如“鸟”这个类别，现实中有很多例外（企鹅不会飞）。
- 解决思路：引入**原型/典型成员（prototype / typical members）**
$$\exists b \in Typical(Bird) \Rightarrow CanFly(b)$$
### Hierarchies and Inheritance
- Hierarchy (or taxonomy) 是一种很自然的方式来组织“类别”（category），例如“动物→哺乳动物→大象”。
- 重要性：
	- 同一组东西往往共享属性
	- 可以避免重复定义
	- 说大象是哺乳动物，你就已经得到了很多信息
- 继承是对层次结构中路径进行推理的结果
	- a是否从b继承
	- 等价于问题：**从 a 出发沿着 `:IS-A` 关系走，b 是否可达？**

传递Transitive闭包关系：
- $$\text{Clyde is Elephant},\ \text{Elephant is Gray} \Rightarrow \text{Clyde is Gray}$$
#### 严格继承（Strict Inheritance）的格结构（Lattice）
Lattice就是有向无环图，这种情况下允许多继承：
![[14-knowledge-representation-1772673026686.png|668x232]]
在这种继承网络里，对某个节点（如 _Ernest_）做推理时，**只要存在一条向上的路径**能到达某个概念/属性节点，那么该结论就被支持（可以推出）。

#### Defeasible Inheritance可被推翻的继承
![[14-knowledge-representation-1772673858204.png|719x192]]
- 继承的属性并不总是有效，并且可以被覆盖（无效化）
- 推理时以焦点为起点向上找属性，**最近的（最具体的）信息胜出**。

- 在格中，每条边都有支持，或不支持。如果同时存在支持或反对，那么看最短的那条path。**不是所有路径都会被用来得出结论**。
- 如果出现了Ambiguity，也就是相同长的path同时出现支持和反对，就需要显示处理
	- 我们有偏好，可以有一个偏好策略
	- 有Credulous轻信的推理，也就是有一个path成立就相信
	- 有Skeptical怀疑式的推理，都成立才接受。

Ontologies 本体论就是，用一套**共享的概念体系**来描述世界中的“有哪些东西、它们如何分类、彼此是什么关系”。

![[14-knowledge-representation-1772676032438.png|729x345]]

## Frames
表，就是一种描述简单模式的事实：
![[14-knowledge-representation-1772676095286.png|522x175]]

- **Frame** 是一种知识表示方式：用一组“**属性/槽（slots）**”及其对应的“**取值（values）**”来描述某个**现实世界实体（entity）**。
- 每个Frame是
	- 一类物品，或者
	- 一个实例
![[14-knowledge-representation-1772676149021.png|547x319]]

怎么用Frame来做知识发现和检索？
- **信息存储方式**：知识以 _frames + slots_ 的形式保存
- **关键点**：部分slot会触发Actions。
	- 当某些槽被填入、满足条件或被访问时，可能触发推理/执行动作

- Frames 是模板，有结构，只需要根据情境填入具体指
	- 填充后，智能体可能采取行动，也可能探索其他frame

- Frames可扩展，比如说添加默认值，约束，继承关系
	- 触发frame的信息
	- 与其他frame的关系
	- slot填好后的触发动作
	- 默认值
	- 允许留空
	- 包含其他frame，形成hierarchy
		- ![[14-knowledge-representation-1772676404891.png|214x177]]
- Frame于面向对象很相似
	- slots为属性
	- 触发动作为method
## Events and scripts
#### Events
目前为止，facts被认为是独立于时间的，不随时间变化的。
- 但现实中很多知识与时间有关：当某件事**正在发生**时，哪些条件为真？因此需要用事件（event）来表达“在某段时间里发生了什么”。

事件在特定时间内可能正在进行，也可能没有进行。
- Happens(E,t) 可能为真也可能为假——取决于事件是否覆盖该时刻。

只在特定时间点为真的facts叫fluents。
- 比如：At(Tom, Baltimore)

Events谓词：
![[14-knowledge-representation-1772676654620.png|733x297]]

Initialtes举例：Initiates (开门，门开着，t) 开门这个事件使得门开着这个事实在t时刻为真

由于时间是瞬间，而没啥意义，所以我们经常用Time intervals时间区间表示时间。
![[14-knowledge-representation-1772676807096.png|688x240]]

#### Scripts
定义：**Script** 是一种**结构化知识表示**，用来描述在某个**特定情境（context）下，通常会发生的**固定/刻板的事件序列（stereotyped sequence of events）**。
- Script用来在KB中组织events
- 与frame的概念很像

script由许多部件组成：
![[14-knowledge-representation-1772676931678.png|639x264]]
- props是道具：组成脚本的实体，比如桌子，食物等等

例：![[14-knowledge-representation-1772676993971.png|624x362]]
script中，可以用一组标准化的动作符号来表示动作：
![[14-knowledge-representation-1772677061019.png|639x422]]
## Examples
### Cyc
Cyc 是“常识知识库 + 推理系统”
- 目标：把人类常识拆成**数以百万计**的知识片段，并用形式化方式录入（codify），让机器能用这些常识进行推理。
- 名字来源于encyclopedia百科全书的缩写。

基本结构
- 有一些facts： 
	- “Every tree is a plant”（每棵树都是植物）
	- “Plants die eventually”（植物最终都会死亡）
- 有推理引擎：
	- 本质是用逻辑规则做演绎推理。
	- “Trees die eventually”（树最终也会死亡）
- CycL Language：用谓词逻辑的风格表示推理。
	- #$isa = instance of
	- #$genls = subclass of
	- basic Boolean: \#\$and, \#\$or, \#\$not, \#\$implies, ...
	- quantifies: #$
- 具有Ontology 分层结构
	- 上层普世真理，宽泛概念
	- 中层通用抽象层
	- 下层领域知识
### Expert Systems
基于专家知识构建专业系统
方法：
- 采访专家得到领域知识
- 用逻辑规则形式化
- 然后就可以复制专家推理了

优点：
- 写规则比写程序简单，专家可以亲自参与
- 规则容易被inspect检查和修改
- 可解释
缺点：
- 专家其实自己也不知道自己的推理是怎么来的
- 知识很难被编码成逻辑规则
- 专家没动力去帮助一个可以取代自己的系统

### Semantic Web
- **关于世界的知识是“分散在各处”的**：不同人、组织、网站各自掌握一部分信息，没有一个统一的中心库。
	- 但是WWW主要服务人类，不是结构化存储的，机器不好利用。
- 为了让分布在网页上的知识能被**自动集成、推理、复用**，需要一种让机器能直接读取“语义”的网络形式，即**机器可读的 Web**（常见方向如语义网、结构化数据/知识图谱等）。这就是语义网。

理想状态的Semantic Web：
**数据发现（Discovery）→ 数据获取与整合（搞成XML）（Ingestion & Aggregation）→ 分析（Analysis）→ 自动化（Automation）**

比如：想找一篇论文。
 1) 传统方案：中心化仓库
- 做法：找一个人或机构维护一个**中央数据库/仓库**，大家把论文信息交给它统一管理。
- 隐含问题：依赖中心维护者，更新/扩展/标准不一定一致，容易形成瓶颈。

1) 语义网方案：在自己网站定义 schema
- 做法：在个人/机构网站上，用 **XML schema** 定义论文信息的“属性”与结构（哪些字段、字段类型、约束等），并按此发布数据。
- 关键前提：必须有**定义良好、规范的 XML schema**，这样不同网站的数据才能被自动理解与整合。

RDF: Resource Description Framework:
![[14-knowledge-representation-1772677760987.png|568x335]]

可以用SPARQL来访问RDF中的数据。

