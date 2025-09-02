## Question 1 Mental‑health triage chatbot  (30 marks)

A youth mental‑health charity wants to deploy an LLM‑based chatbot to act as a **first‑line triage service** for incoming text messages.

**(a) System design and hallucination control**  
Outline an architecture (e.g. Retrieval‑Augmented Generation, safety filters) that minimises hallucinations while preserving empathic dialogue. Explain two ways in which _behavioural data_ gathered during use could be fed back to improve the model (10 marks).
概述一种架构（例如检索增强生成，安全过滤器），该架构在保留共情对话的同时最大程度地减少幻觉。解释在使用过程中收集的行为数据如何反馈以改进模型的两种方式（10分）。
**整体框架**：首选使用 _检索增强生成_（RAG）——LLM 先根据用户输入检索经审核的心理学知识库，再在检索结果上进行生成，可显著降低“编造案例”风险。结合**安全过滤器**（关键词屏蔽 + 意图分类器）拦截自残鼓励等有害输出。


**(b) Bias, privacy and fairness**  
Using concrete examples, discuss how _algorithmic bias_ might arise in this setting and propose **two technical** and **one organisational** mitigation strategy, paying attention to user‑data privacy (10 marks).
使用具体例子讨论在这种情况下算法偏见可能如何产生，并提出两种技术和一种组织的缓解策略，注意用户数据隐私（10分）。
训练语料中对少数族裔、LGBTQ 群体的刻板印象；青少年俚语欠缺导致误识别。
缓解：再采样 / 重加权，**差分隐私微调**，在去噪梯度下训练，防止模型泄露敏感细节。

**(c) Evaluation strategy**  
For crisis‑detection classification inside the chatbot, justify the choice of **precision, recall and F1** over accuracy, and describe how you would construct an _annotated test set_ to monitor real‑world performance over time (10 marks).
- **为何选 Precision / Recall / F1**：自杀危机样本远少于普通求助文本，准确率 (Accuracy) 容易被多数类“掩盖”；高 _Recall_ 可减少漏报，高 _Precision_ 避免误报惊扰，两者调和即 F1。

---

## Question 2 Autonomous drone delivery & decision‑making  (30 marks)

A start‑up is launching **multi‑rotor drones** that must share urban airspace with manned helicopters.

**(a) Formulating an MDP**  
Define the state space, action set, transition model and reward function for a drone‑navigation **Markov Decision Process** (8 marks).
为一种无人机导航**马尔可夫决策过程**定义状态空间、动作集、转移模型和奖励函数（8分）。
- **状态 _s_**：〈经纬度、高度、速度向量、剩余电量、近邻飞行器距 〉。
- **动作 _a_**：{攀升，下降，左／右横移，加速，减速，悬停}。
- **转移 P(s′|s,a)**：结合城市 3‑D 地图和气象 API 生成的 _概率图_；
- **奖励 R(s,a,s′)**：送达 +100，冲突预警 −100，能耗 −(β·耗电)。此定义可直接嵌入经典 RL 算法。

**(b) Training the policy**  
Compare **value‑iteration**, **Q‑learning** and **Proximal Policy Optimisation (PPO)** for this task. Describe how you would incorporate _historical flight logs_ and _simulated roll‑outs_ in a two‑stage training pipeline (8 marks).
比较**值迭代**、**Q学习**和**Proximal Policy Optimisation (PPO)**在这个任务中的表现。描述您将如何在两阶段训练流程中结合_历史飞行日志_和_模拟滚动_（8分）。
- **Value‑Iteration**：需已知转移模型，适合小网格离线规划；
- **Q‑Learning**：在仿真中探索，离散动作空间易收敛；
- **PPO**：在连续动作、复杂动力学场景下更稳定。
- **两阶段流程**：① 用 _历史飞行日志_ 预训练 Q 表或策略网络；② 在高保真模拟器中 _Domain Randomisation_ 微调，弥补日志罕见情景的稀疏性。

**(c) Game‑theoretic interaction**  
Model the interaction between one drone and one helicopter as a 2‑player strategic game (actions: _Yield_ / _Proceed_). Draw the payoff matrix and determine any Nash equilibrium, commenting on its adequacy for safety‑critical settings (6 marks).
将一个无人机和一架直升机之间的互动建模为一个2人策略游戏（行动：_让路_ / _继续前进_）。绘制收益矩阵并确定任何纳什均衡，评论其在安全关键环境中的适用性（6分）。
![](assets/Pasted%20image%2020250512144633.webp)
纳什均衡是右上和左下


**(d) Human pilots & Prospect Theory**  
Explain how _loss aversion_ and _reference dependence_ may affect human pilots’ responses to the drone’s manoeuvres, and how the drone’s policy could exploit / mitigate these effects for smoother coordination (8 marks).
解释 _损失厌恶_ 和 _参照依赖_ 如何影响人类飞行员对无人机动作的反应，以及无人机的政策如何利用/减轻这些影响以实现更顺畅的协调（8分）。

| 概念                             | 对直升机飞行员的影响                                       | 无人机策略的应对                                                    |
| ------------------------------ | ------------------------------------------------ | ----------------------------------------------------------- |
| **损失厌恶（loss aversion）**        | 飞行员对“潜在碰撞损失” 的主观痛苦大于对“节省 30 秒飞行时间” 的收益 → 倾向主动让行。 | 无人机可通过**显式让行信号**（灯光、轨迹放缓）放大对方感知风险，促使其让行；也可避免突然加速造成“损失感” 激增。 |
| **参照依赖（reference dependence）** | 飞行员以当前航迹/高度为参照；任何偏离视为“损失”。                       | 无人机提前广播计划路径，让对方将其并入参照系；若需快速变轨，可先发微幅提示，使参照点逐步迁移，降低对方的损失感受。   |

---

## Question 3 AI‑powered personalised learning platform  (40 marks)

An online learning provider wishes to use AI to **summarise lectures**, **model student topics** and **recommend personalised study plans**.

**(a) Topic modelling for learning materials**  
Describe how **Latent Dirichlet Allocation (LDA)** can be applied to lecture transcripts. Include the generative assumption and the inference procedure for obtaining per‑document topic distributions (10 marks).
描述如何将**潜在狄利克雷分配（LDA）**应用于讲座记录。包括获取每个文档主题分布的生成假设和推断过程（10分）。
**生成假设**：文档先从 Dirichlet(α) 采样主题分布 θ，再为每个单词先采样主题 _z_，再采样词 _w_∼Categorical(β_z)。
- **推断**：常用吉布斯采样或变分 EM 求 P(z,θ|w)；输出每篇讲义的主题向量便于下游任务。

**(b) From topics to recommendations**  
Propose an algorithm that combines the LDA topic vectors with **student interaction logs** (clicks, quiz scores) to recommend next‑best resources. Discuss one advantage and one limitation of using a generative model for this purpose (10 marks).
提出一种算法，将LDA主题向量与**学生互动日志**（点击、测验分数）结合起来，以推荐下一个最佳资源。讨论使用生成模型进行此目的的一个优点和一个局限性（10分）。
**优点**：生成模型可解释，“为什么推荐”可用高权重主题词说明；
**局限**：LDA 话题独立性假设过强，面对跨学科内容易稀释语义。
对学生 u 建立向量 〈θ_u, q_u〉，θ_u 为其阅读材料主题平均，q_u 为测验得分向量；将资源 i 的主题 θ_i 拼接后，经矩阵分解或神经协同过滤，预测 _学习增益_ Δ.

**(c) Offline & online evaluation**  
Suggest suitable offline metrics and outline an _A/B‑test_ to compare the new recommender against a popularity baseline while controlling for cohort effects (5 marks).

**(d) Essay — Ethical and societal implications of AI‑driven personalised education** (15 marks)

“Large‑scale deployment of AI tutors promises greater engagement and equity, yet risks amplifying bias and eroding human agency.”

Write **about one page** critically analysing this statement. Your answer should cover:

- data‑privacy concerns in educational contexts
	    - 学习日志与面部表情属于敏感信息；应采用 _最小必要原则_ 与联邦学习，降低集中泄露风险。
- potential **bias** in adaptive‑learning algorithms and its impact on student outcomes
	    - 模型若主要基于富裕地区样本，可能将低带宽设备判为“低能力”，产生恶性循环。需定期做 _Group‑Fairness 审计_，并在损失函数中加入公平正则化。
- the tension between _automation_ and _human oversight_ in pedagogy
	    - 过度依赖 AI 可能使教师“降级”为监考员，削弱教育的人文关怀；应设计 _教师‑AI 协同界面_，让老师可查看推荐依据并一键调整学习路径。
- safeguards (technical and policy) to ensure fair, transparent and inclusive use of AI in education
	    - 技术：差分隐私、模型卡片、可解释可视化；
	    
	- 政策：明确数据归属与申诉通道，建立独立伦理委员会；
    
	- 社会：鼓励开源课件共享，缩小地区数字鸿沟。  
	    通过多方协作，方能在促进学习的同时守护公正与自主。

Real‑world examples will strengthen your argument.


![](assets/7AC4FA92-376F-487C-93E1-AE2E3D82FB0D.webp)


