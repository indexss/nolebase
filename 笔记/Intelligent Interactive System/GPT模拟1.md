### Question 1 ‑ Intelligent Urban Traffic Management (30 marks)

A large UK city plans to deploy an intelligent traffic‑signal network that cooperates with connected and autonomous vehicles (CAVs) to minimise congestion, energy consumption and pollution while treating all districts fairly.

| Part | Task                                                                                                                                                                                                                                                                                                                                                                                                             | Marks |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| (a)  | **MDP & RL design** – Formulate the traffic‑signal control problem as a Markov Decision Process. Clearly define state space, action set, reward function (including equity‑of‑service considerations) and the episode horizon. Outline how Deep Q‑Learning or Policy‑Gradient methods could be used to learn an optimal control policy, and describe how you would evaluate convergence.                         | 12    |
| (b)  | **Fairness & Responsible AI** – Discuss two potential sources of algorithmic bias that could arise in this setting (e.g. richer neighbourhoods receiving shorter queues). For each, propose a technical or organisational mitigation (e.g. counter‑factual evaluation, demographic‑parity regulariser, participatory governance).                                                                                | 10    |
| (c)  | **Cooperative Game‑theoretic signal coordination** – Model the interaction between two adjacent junction controllers as a 2‑player game where each can choose “Cooperate” (share green‑wave time) or “Defect” (prioritise its own queue). Provide a 2×2 payoff matrix and identify any Nash equilibria. Explain how introducing a side‑payment or repeated‑game shadow can promote the socially optimal outcome. | 8     |
(a) **MDP & RL设计** - 将交通信号控制问题制定为马尔可夫决策过程。清晰地定义状态空间、动作集、奖励函数（包括服务公平性考虑）和情节时限。概述如何使用深度Q学习或策略梯度方法来学习最优控制策略，并描述您将如何评估收敛性。
状态：各路口方向排队程度，平均车速，时间段，等待时间差
动作：切换灯（东西绿南北红，全部红4s清场等）
奖励：最小化排队程度，等待时间，最大化车速
算法：Deep Q-Learning 以经网络近似Q。
(b) **公平性和负责任的人工智能** - 讨论在这种情况下可能出现的两种算法偏见的潜在来源（例如，更富裕的社区接受更短的队列）。 对于每种情况，提出技术或组织上的缓解措施（例如，反事实评估，人口平等规范器，参与式治理）。
- 监控摄像头在富裕区更密集 → 数据量高 → 模型优先优化该区。
	- 缓解：加入区域采样权重
- 单纯最小化总体平均延误，忽视弱势群体通勤需求。
	- 多目标优化（延误、排放、公平度）
(c) **合作博弈论信号协调** - 将两个相邻交叉口控制器之间的互动建模为一个2人博弈，每个人可以选择“合作”（共享绿波时间）或“背叛”（优先考虑自己的队列）。提供一个2×2的收益矩阵，并确定任何纳什均衡。解释如何引入边际支付或重复博弈阴影可以促进社会最优结果。
![](assets/Pasted%20image%2020250512135140.webp)
DD是纳什均衡
促进合作方法：
- 侧支付 (Side-Payment)：
	- 若 A 帮助 B 获得 5 单位收益，B 支付给 A 一定转移支付，确保 A 合作后净收益 ≥ 背叛收益；
	- 重复博弈：在日常多次交互中采用“触发策略”，若对方合作则继续合作，否则惩罚。


---

### Question 2 ‑ Conversational Digital Health Coach (30 marks)

A start‑up is building a multimodal chatbot that gives personalised lifestyle advice (diet, exercise, sleep) while safeguarding user wellbeing and privacy.

| Part | Task                                                                                                                                                                                                                                                                                            | Marks |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| (a)  | **Supervised intent‑classification pipeline** – Describe the data collection, feature/embedding design, model training and cross‑validation steps needed to classify user intents (question, diary entry, emergency alert, etc.).                                                               | 8     |
| (b)  | **Metric choice in imbalanced healthcare data** – Compare accuracy, precision, recall, F1 and ROC‑AUC for this scenario. Explain, with formulas, why precision‑recall is often preferred when predicting rare critical health events.                                                           | 7     |
| (c)  | **Prospect Theory in behaviour change** – Define _loss aversion_ and _reference dependence_. Show, with one concrete framing example, how the coach could reduce unhealthy snacking by leveraging prospect‑theoretic message framing, and discuss one ethical risk of this persuasive strategy. | 10    |
| (d)  | **Privacy & LLM deployment** – Identify two privacy threats when an LLM processes sensitive health data (e.g. training‑data leakage, membership inference). Suggest one technical safeguard and one regulatory requirement (e.g. UK GDPR, ISO 27701) to address them.                           | 5     |
一家初创公司正在开发一款多模式聊天机器人，为用户提供个性化的生活方式建议（饮食、运动、睡眠），同时保护用户的健康和隐私。
(a) **受监督意图分类流程** - 描述收集数据、特征/嵌入设计、模型训练和交叉验证步骤，以便对用户意图（问题、日记条目、紧急警报等）进行分类。
- **数据收集**：访谈脚本 + 合成对话收集 n≈104n\approx10^4n≈104 条带标签语句。
- **文本表示**：使用 _Clinical‑BERT_ 取 CLS 向量；合并来自穿戴设备的时序特征（步数、心率）。
- **模型**：双塔 (text + sensor) -> 全连接 -> softmax；5‑折交叉验证。
- **部署**：置信度阈值 < 0.4 时 fallback 至人工客服。

(b)在不平衡的医疗数据中选择度量标准 - 比较准确率、精确度、召回率、F1在这种情况下的表现。用公式解释为什么在预测罕见的重要健康事件时通常更喜欢精确率-召回率。
Precision: TP / TP + FP
Recall: TP / TP + FN
F1: 2P . R / (P + R)
喜欢用如果只是用Accuracy，由于本来TP就少，所以即使预测错了也可以很高。
而如果用Precision，就一定要提高TP的占比，避免假阳性
用Recall的话，就要提高TP的占比，避免假阴性。

(c) **行为改变中的前景理论** - 定义 _损失厌恶_ 和 _参照依赖_。通过一个具体的框架示例，展示教练如何通过利用前景理论的信息框架来减少不健康的零食，并讨论这种说服策略的一个道德风险。
损失厌恶：人们失去一些东西的痛苦程度大于得到相同量东西的辛福感
参照点：人们不通过绝对价值来衡量获得/损失，而是通过一个参照点来衡量相对得失。
缓解框架：少吃少摄入
利用框架：多吃的话，相当于白费了40分钟的跑步
伦理风险：对自主性的改变，操纵心理，应提供退出选项与心理支持。

(d) **隐私和LLM部署** - 在LLM处理敏感健康数据时，识别两个隐私威胁（例如，训练数据泄露，成员推断）。建议一个技术保障和一个监管要求（例如，英国GDPR，ISO 27701）来解决这些问题。
- 训练数据泄露：当模型被查询或微调时，可能无意中重现训练集中包含的患者姓名、诊断记录等敏感信息
- 成员资格推断：攻击者通过对比模型对某条数据的输出信心度，可以判断该条记录是否出现在训练集中
- 技术保障：联邦学习+差分隐私（Differential Privacy）（每一次梯度更新添加噪声）
- **合规**：英国 GDPR第 9 条“特殊类别数据” → 需合法依据 + DPIA；ISO 27701 数据隐私扩展要求定期审计。

---

### Question 3 ‑ AI‑Driven Recruitment Platform (40 marks)

An international job‑matching platform uses machine‑learning pipelines to screen CVs, cluster candidates, rank interviewees and generate interview questions automatically.

| Part                                                                                                                | Task                                                                                                                                                                                                                                                                                               | Marks |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| (a)                                                                                                                 | **Representation learning for candidate profiles** – Propose a data pipeline that converts raw CV text and structured fields into vector embeddings suitable for downstream tasks. Include preprocessing, model choice (e.g. SBERT, doc2vec), dimensionality reduction and storage considerations. | 10    |
| (b)                                                                                                                 | **Evaluation metrics under fairness constraints** – Explain, with equations, why overall accuracy can be misleading in recruitment. Illustrate how precision, recall and equal‑opportunity difference would be calculated for a protected group (e.g. gender).                                     | 5     |
| (c)                                                                                                                 | **Bias‑mitigation strategy design** – Outline an end‑to‑end approach (pre‑processing, in‑processing or post‑processing) to detect and reduce disparate impact in the ranking model while maintaining utility. Justify your design choices.                                                         | 10    |
| (d)                                                                                                                 | **Essay (≈ 1 page, ~400 words) – Ethical analysis (15 marks)**                                                                                                                                                                                                                                     |       |
| Critically analyse the ethical implications of using AI in recruitment. Your discussion should cover:               |                                                                                                                                                                                                                                                                                                    |       |
| • Privacy concerns in collecting and using candidate data                                                           |                                                                                                                                                                                                                                                                                                    |       |
| • How algorithmic bias can affect hiring decisions and workforce diversity                                          |                                                                                                                                                                                                                                                                                                    |       |
| • Whether AI tools mitigate or exacerbate existing inequalities                                                     |                                                                                                                                                                                                                                                                                                    |       |
| • The balance between automated decision‑making and human oversight                                                 |                                                                                                                                                                                                                                                                                                    |       |
| • Concrete safeguards or regulatory measures that could promote fair, transparent and accountable hiring practices. |                                                                                                                                                                                                                                                                                                    |       |

(a) **候选人简介的表示学习** - 提出一个数据管道，将原始简历文本和结构化字段转换为适用于下游任务的向量嵌入。包括预处理、模型选择（例如SBERT，doc2vec）、降维和存储考虑
- 预处理：pdf -》文本提取 -〉 用命名实体识别（NER）抽取公司名、职务、项目。-.
- 嵌入生成: 文本用pretrained SBERT提取句向量
(b) 在公平约束条件下的评估指标 - 用方程式解释为什么整体准确率在招聘中可能会误导。说明如何计算受保护群体（例如性别）的精确度、召回率和平等机会差异。
Accuracy无法体现不同性别假阴率差异。

(c) **偏见缓解策略设计** - 概述一种端到端方法（预处理、处理中或后处理），以检测和减少排名模型中的不平等影响，同时保持效用。证明您的设计选择。

预处理：用无偏数据集
处理中：采用一些对抗结构，可以有效缓解
推理中：一些后处理方法可以

(d) 批判性分析在招聘中使用人工智能的道德影响。您的讨论应涵盖：
• 在收集和使用候选人数据时的隐私问题
- 
• 算法偏见如何影响招聘决策和员工多样性
- 邮编
• AI工具是否减轻或加剧现有的不平等。
- kpi -》安全候选人
- 可能会抛弃非典型
• 自动决策与人工监督之间的平衡
- 人机双规，ai可以做信息提取，最后的决策需要留给人类，也可以给出一个置信度，但只能作为参考，不能完全自动化。
• 促进公平、透明和负责任的招聘实践的具体保障措施或监管措施。
- 隐私微调、联邦学习

