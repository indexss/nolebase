# Week 2 Cooperation & Game Theory
## 例子 Cooperative Lane Changing Assistant
- **Zimmermann 等人（2018）** 使用 **博弈论（game theory）** 来奖励那些让其他车辆并道的司机。
- 在 **模拟实验（simulator study）** 中，该辅助系统**记录**了哪些司机愿意让其他车辆进入车道。
- 该系统**向其他司机提供这些记录**，以帮助他们进行决策。
- 司机可以选择**优先帮助**那些过去曾经帮助过他人的司机。

## 例子 Tragedy of the Commons
- 每位农民都在说 **“I want another cow!”（我想要再多一头牛！）**。
- 牧场上的牛正在吃草，暗示着草地是有限的资源。
- 如果每个农民都只考虑**自己的利益**，不断增加牛的数量，最终**牧场的草地将被过度放牧，导致整个生态系统崩溃**。

## **关键概念**

- **纯粹的自我利益 vs. 利他主义**（Pure self-interest versus altruism）
- **延迟自我利益**（Deferred self-interest）
- **亲属、群体和邻里利益**（Kin, group and neighbour interest）
- **合作 vs. 背叛**（Cooperation versus defection）
- **公地悲剧**（Tragedy of the commons）
- **非零和博弈**（Non zero-sum games）

## Cooperative AI
研究如何让人工智能帮助人类实现共同福利（joint welfare）。 **合作型 AI 旨在研究如何让 AI 在人与人、AI 与 AI 之间促进合作，而不仅仅是独立决策**。

它不同于**对齐 AI、可信 AI 或有益 AI**，因为它关注**如何优化集体利益**，而不是仅仅保证 AI 符合某一方的目标。对于**解决全球性问题（如环境保护、经济公平、国际协调）** 具有重要意义。
- **对齐 AI（Aligned AI）**：
    - 目标是让 AI **符合人类的目标和价值观**，防止 AI 偏离预期行为。
    - 重点在于**控制和约束 AI**，避免它带来负面影响。
- **可信 AI（Trustworthy AI）**：
    - 关注**安全性、可解释性、公平性和隐私保护**。
    - 目标是让 AI 的决策过程**透明、可靠且可验证**。
- **有益 AI（Beneficial AI）**：
    - 关注**AI 的长期影响**，确保 AI **整体上对社会有益**，而不仅仅是执行任务。
    - 例如，OpenAI 的目标是开发 **“造福全人类的 AI”**。

**合作的演化过程**：
1. **人类之间的合作**（最基本的形式）。
2. **借助工具促进合作**（技术增强合作能力）。
3. **人与 AI 之间的合作**（AI 作为协作伙伴）。
4. **社会级别的合作**（组织和社会如何整合 AI 进行大规模协作）。

## Game Theory
博弈论的基础假设如下：
- **决策者理性地** 追求明确的目标（如**偏好、奖励和效用**）。
	- 对于一件事，有一个行动集合A（如增税等），结果集合C（如短期财政收入增加，长期投资减少），以及结果函数g（社会运行机理），将A映射到C。每个决策者都会有自己的偏好关系，决策者会考虑g(A)是否达到了自己想要的偏好关系。
- **决策者会考虑** 其他决策者的行为（即他们的知识和预期）。
	- 换句话说，决策者会**战略性地思考**，以**最大化自身效用**。
- **博弈论并不是传统意义上的“游戏”**，而是一种**数学方法**，用于研究**合作和非合作行为的决策过程**。

博弈论可以用于存在不确定性的情况中，一般不确定性来自于以下几个方面：
- 对环境的客观了解不确定
- 对博弈中的事件信息不完全
- 对其他玩家的行动不确定
- 对其他玩家的推理方式不确定
而每个人都有一个Subjective Expected Utility，SEU，即主观期望效用，决策者会根据自己对不确定性事件的**主观概率估计**来做出选择，而不仅仅是客观数据。这意味着**即使没有确切信息**，玩家仍然可以基于**自身的信念和经验**进行策略决策。

### 例：囚徒困境
你和另一个人已经被判2年，但其实你们两个还犯了另一个案子。
- 如果你认罪，对方不认罪
	- 你只需要服刑1年，你作为污点证人，对方判10年
- 你不认罪，对方认罪
	- 你判10年，对方判1年
- 你们都认罪
	- 都只判3年
- 都不认罪
	- 只需要服刑原来的2年

这是Game Matrix，或者叫Payoff Matrix
![](assets/Pasted%20image%2020250130221041.webp)
可以看到，如果B认罪，那么A认罪最佳，B不认罪，A也是认罪最佳，对B也是一样。也就是说，对A和B来说，认罪都是理性选择。
那么这个game的纳什均衡就是双方都认罪。但是，其实最佳集体策略是双方都否认。
> 如果在某个策略组合下，没有玩家可以通过单方面改变自己的策略来获得更高收益，那么这个策略组合就是一个纳什均衡

### 例：协调博弈
有两个投资项目，A和B，如果公司X和公司Y都做A投资，那么双方都可以收获10，如果公司X和公司Y都做B投资，那么双方都可以收获5。但如果双方投资了不同项目，则无收益
![](assets/Pasted%20image%2020250130221954.webp)
这里，纳什均衡为AA或者BB。
分析：如果对方选A，那么我无法做出选A之外的其他更好决定，我选A，对方无法做出选A以外的更好决策，所以AA为纳什均衡，对BB也一样。如果是AB，那么单方面改选可以收获更多，所以不是纳什均衡。

我个人感觉纳什均衡有点像局部最优。

### 例：懦夫博弈（A Game of Chicken）
- **两名玩家** 从道路的**相对两端**向彼此驶来。
- **目标** 是**比对方更晚转向**。
- **如果一名玩家转向**，他们被认为是“懦夫”（"chicken"）。
- **如果双方都不转向**，他们会**相撞**。

Payoff Matrix
![](assets/Pasted%20image%2020250130222521.webp)
这个里面的纳什均衡是1 -1和-1 1
对于左下角，当我就是要直行的话，对方直行会从-1变成-100，所以对方无法单方面作出最好决策；当对方一定要转向的时候，我如果转向，收益就从1变成0了，所以我不转，所以是纳什均衡。

### 例：鹰-鸽博弈（Hawk/Dove Game）
- 在**鹰-鸽博弈**中，**两个玩家竞争有限的资源**。
- **如果双方都选择“鸽”策略**，那么**他们平分资源**。
- **竞争是有代价的**，它**消耗能量，并且不一定能成功**。
- **如果双方都选择“鹰”策略**，那么**竞争的能量消耗将抵消所有可能获得的资源收益**。
- **如果一个玩家选择“鹰”策略，而另一个玩家选择“鸽”策略**，那么 **“鹰”玩家获得大部分资源，而“鸽”玩家仅获得一小部分资源 **。

![](assets/Pasted%20image%2020250130224132.webp)

### 例：猎鹿博弈（Stag Hunt）
**两个猎人外出捕猎晚餐。**
- **在狩猎范围内有两只兔子和一只鹿**。
- **每个猎人只能携带捕猎特定猎物的装备**，即**他们必须决定是去猎兔子还是猎鹿**。
- **鹿的肉比两只兔子的总和还要多**，但是**必须两个猎人合作才能成功捕获鹿**。
- **如果选择猎兔子，每个猎人都可以单独行动并成功捕获猎物**。
![](assets/Pasted%20image%2020250130224826.webp)

### 练习：自动驾驶汽车博弈
- 在未来，**自动驾驶汽车（AVs）** 预计需要**最大限度地保护行人**——当存在碰撞危险时，它们应立即停车并保持高度可靠性。
- 然而，**如果AV每次遇到行人阻挡都会停车**，那么行人可能会习得**他们始终具有优先权**，导致**AV几乎无法正常行驶**。
- **用博弈论建模此情境，并推导其纳什均衡**。
- **提出一个解决方案，使AV能够正常行驶，同时增强对行人的保护**。
![](assets/Pasted%20image%2020250130230438.webp)
纳什均衡已用黄色标出。
解决方案：建立通信，车向人发送信号。
### 练习：性别战（The battle of the sexes）
了**一对情侣（Alice 和 Bob）要决定晚上去哪儿约会**的场景：
- **Alice** 想去看 **芭蕾舞**（Ballet）。
- **Bob** 想去看 **拳击比赛**（Boxing）。
- 但 **他们都更希望在一起，而不是各自单独去**。
![](assets/Pasted%20image%2020250130231029.webp)



#### **总结（Summary）**

- **智能交互系统** 需要与**人类**合作，同时也需要**促进人类与机器的沟通**，尤其是在由人类和机器共同组成的混合系统中。
- **合作可以提高交互效率**，例如在**半自动驾驶车辆**中的应用。
- **但合作是困难的**，因为有时**背叛（不合作）可能带来更大的短期利益**。
- **博弈论提供了一种框架**，用于**预测人类和机器何时会合作，何时会选择背叛**，这取决于任务的**激励结构**。
- **现实世界中的问题可以使用博弈论建模**，并且可以**通过合理的激励机制来促进合作**。