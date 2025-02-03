以下总结基于论文 _“A Review on Fairness in Machine Learning”_ 的章节结构，并概述每个章节的主要内容，供中文读者快速了解论文整体脉络。
https://dl.acm.org/doi/full/10.1145/3494672?casa_token=BoKZflwMjyQAAAAA%3AYxyZ-vDHYOzSTk_BcRzvDQm2dKGHx9t31feOsu6DwFm8cyNQbE74yCmqdlgHiH6yQNnT3vs0ICjD
---

## 论文主要结构

1. **Abstract（摘要）**
2. **1 Introduction（引言）**
3. **2 Potential Causes of Unfairness（算法不公平的潜在原因）**
4. **3 Fairness Definitions and Measures（公平性定义与衡量指标）**
5. **4 Fairness-enhancing Mechanisms（提升算法公平性的机制）**
6. **5 Emerging Research on Algorithmic Fairness（算法公平性新兴研究方向）**
7. **6 Discussion and Conclusion（讨论与总结）**
8. **Footnotes（脚注）**
9. **Appendix A: Fairness-related Datasets（常用公平性数据集附录）**
10. **Appendix B: Supplementary Materials（补充材料）**
    - B.1 Additional Measures for Algorithmic Fairness（其他公平衡量指标）
    - B.2 Measure Categories（衡量指标分类与不可能性结果）
    - B.3 Emerging Notions of Fairness Measures for Classification（新兴公平性概念）
    - B.4 A Demonstration of Selected Fairness Enhancing Mechanisms（典型公平性机制示例）
    - B.5 Paper Selection Procedure（文献检索与筛选过程）

另外，论文后还包含 **References**（参考文献）、**Cited By**（被引情况）、**Index Terms**（索引词）、**Recommendations**（推荐条目）及其他在 ACM Digital Library 常见的出版信息。

---

## 各章节主要内容概述

### **Abstract（摘要）**

论文首先指出当今机器学习（ML）与人工智能（AI）算法在医疗、交通、教育、招聘、贷款等领域都有大量实际应用，但由于历史数据或模型自身的原因，算法决策结果可能内在地带有不公平性。本文的目标是对算法公平性的主要概念进行回顾，介绍如何识别、衡量以及改进 ML 模型的公平性，重点关注分类任务领域，并且也讨论超越分类任务的新兴研究方向。

---

### **1 Introduction（引言）**

- 说明了当今社会越来越多的决策已经由 ML 算法来辅助或直接作出，这些决策对人群的影响广泛且深远。
- 指出人们常以为“机器比人更客观”，但实际上算法会从历史数据中继承或放大数据中潜藏的偏见。
- 列举了著名的算法歧视案例（美国刑事司法系统的再犯预测、招聘算法歧视女性等），凸显问题的严峻性。
- 强调算法公平性研究的必要性与挑战性：需要平衡模型的准确性与不同类型的公平定义。
- 简要介绍文章的整体结构与主旨：从不公平性的成因、衡量指标、改进机制、以及新兴子领域等方面进行综述。

---

### **2 Potential Causes of Unfairness（算法不公平的潜在原因）**

- 概括了数据层面和算法层面导致不公平的几类根源：
    1. 历史数据中已经存在的偏见（例如以往招聘主要男性，所以模型学到“男性更适合技术岗位”）。
    2. 缺失数据或抽样偏差，使得训练集对某些群体表现不充分或不准确。
    3. 模型优化目标通常是总体误差最小，容易忽视少数群体利益。
    4. 敏感属性（如种族、性别）可能会被其他“代理”特征（proxy attributes）隐式学习到，即使表面上没使用种族、性别字段，也会产生间接歧视。
- 通过示例（如 SAT 分数与不同群体真实潜力不一致）阐明为何即使看上去“合理”的特征，也可能导致歧视。

---

### **3 Fairness Definitions and Measures（公平性定义与衡量指标）**

1. **法律层面**：先介绍了法律上常见的“两种歧视”定义——“显性区别对待”（Disparate Treatment）和“隐性差别影响”（Disparate Impact）。
2. **常见的群体公平指标**：
    - **Disparate Impact / Demographic Parity / Statistical Parity**：要求不同群体的正向预测率相似；
    - **Equalized Odds**：要求不同群体在真阳性率（TPR）和假阳性率（FPR）上都尽量接近；
    - **Equal Opportunity**：只关注真阳性率相等；
    - 以及其他常见指标（Predictive Parity、Calibration 等）及其冲突与适用场景。
3. **个体公平（Individual Fairness）**：相似个体要获得相似决策。难点在于如何定义“相似度”。
4. **冲突和不可能性结果**：阐明了这些指标彼此可能无法兼得，如无法同时满足 Equalized Odds 和 Calibration 等。还强调了 **公平-准确性** 的权衡关系：越追求公平，模型预测精度可能下降，除非特殊情况。
5. **总结**：指出算法使用何种指标要结合具体背景、法律规定和道德考量。

---

### **4 Fairness-enhancing Mechanisms（提升算法公平性的机制）**

该章节对比了三大类“提升算法公平性”的方法，每类各自的代表性研究、优缺点以及适用场景：

1. **Pre-Process（前处理）**
    
    - 在数据输入到模型之前，对数据或特征做修正或重加权，如改变某些样本标签、对数据分布进行“修复”(reparation)，去除或模糊敏感信息。
    - 优点：能与后续任意 ML 算法搭配使用，不依赖特定模型；
    - 缺点：可能影响数据可解释性，并不一定能保证对最终算法的准确度损失最小化。
2. **In-Process（训练过程）**
    
    - 在算法训练阶段对目标函数或训练过程做修改；比如在损失函数中加上“公平性正则项”或加入约束条件，来同时最小化预测误差和不公平程度。
    - 优点：可直接在优化时控制公平-准确度的平衡；
    - 缺点：往往需要对模型可控性高，对具体算法结构有要求（例如需要可加入约束或正则的模型）。
3. **Post-Process（后处理）**
    
    - 在模型得出的预测结果上做校正，如根据不同群体分别设置不同阈值来达到公平指标。
    - 优点：对原模型几乎“无侵入”，可以对任意训练好的模型结果二次修正；
    - 缺点：往往牺牲更多的整体准确性，且可能明显对不同群体采用不同策略，在实际部署或法律层面引起争议。

**4.4 Which Mechanism to Use?（如何选择机制）**

- 结合可解释性、对敏感信息的可用性、模型结构适配度、准确性损失大小等多角度给出建议。
- 引用了一些对机制的对比实证（如 Friedler 等人的大规模对比实验），指出不同数据集、不同公平指标下，没有某种方法一定优于所有其他方法。

---

### **5 Emerging Research on Algorithmic Fairness（算法公平性新兴研究方向）**

论文在此总结了传统主要关注“分类任务”的公平性研究之外，近几年出现的多个子领域或新方向：

1. **Fair Sequential Learning（序列/反馈循环中的公平）**
    
    - 探讨在多步决策、强化学习等情境下，短期决策会影响长期结果，以及“探索与利用”（exploration vs. exploitation）的公平权衡。
    - 还涉及反馈循环可能导致的偏差放大，如预测警力部署越多的地区，未来越容易出现更多“记录在案”犯罪，从而进一步强化不公平。
2. **Fair Adversarial Learning（对抗式公平学习）**
    
    - 基于 GAN 等对抗网络的思路，让一个对抗器去推断敏感属性、另一个网络来最小化这种推断能力，以实现公平。
    - 或者利用 GAN 来生成“去敏感化”的数据、嵌入表示等。对计算机视觉、文本处理等都有相关应用。
3. **Fair Word Embedding（词向量的公平性）**
    
    - 经典词向量学习（如 word2vec、GloVe）包含性别、种族等偏见，如“程序员”更靠近“男性”等。
    - 相应研究提出后处理或训练阶段嵌入修正（debiasing）方法，但也有工作指出一些方法只是“隐藏”而非彻底消除偏见。
4. **Fair Visual Description（视觉描述中的公平）**
    
    - 图像分类、图像标注或人脸识别往往对特定人种、肤色不够准确，从而产生明显的偏见。
    - 在多标签、图像字幕生成等更复杂场景下，如何减少歧视倾向、如何获得准确且不带偏见的标注，是难点所在。
5. **Fair Recommender Systems（公平推荐系统）**
    
    - 涉及两种主要视角：对用户的公平（某些用户群体不被过度忽视或歧视）和对项目/提供方的公平（避免只推高知名度或高曝光的单一群体/商品），形成多方博弈。
    - 还探讨排名中的公平，如在搜索结果/排名列表中，给不同群体或候选人足够展示机会。
6. **Fair Causal Learning（因果视角的公平）**
    
    - 使用因果图、反事实分析等方法，判断哪些特征/路径导致不公平，并区分在因果结构下哪些歧视是“合法”或“可接受”的，哪些则是必须消除的。
    - 解决如“选择偏差”等问题，帮助提高对不公平根源的可解释性。
7. **Fair Private Learning（兼顾隐私与公平）**
    
    - 结合差分隐私（Differential Privacy）或安全多方计算（SMC）等方法，既保证不泄露个人隐私又能在训练中使用敏感属性来提高公平性。
    - 讨论集中式或分布式场景下如何安全地利用敏感信息以纠正偏见。

---

### **6 Discussion and Conclusion（讨论与总结）**

- 对整个公平性研究现状做出总结，认为随着算法影响不断扩大，“公平”需求不可避免。
- 重申剩余挑战：
    - 数据本身固有偏差的难题；
    - 缺乏统一评价基准——指标、数据集、算法在不同场景下差异很大；
    - 可解释性、透明度和长远影响监测等尚待深入。
- 提到因果推理、合规性、隐私保护、多目标优化等方向可能提供解决思路。
- 强调要从法律、社会、伦理多角度来综合考量，呼吁建立更健全的实验对比和开放基准。

---

### **Footnotes（脚注）**

在文中对一些核心概念或文献引用的补充说明，如对“特权学习（privileged learning）”的额外阐述等。

---

### **Appendix A: Fairness-related Datasets（常用公平性数据集附录）**

- 介绍了在公平性研究领域经常用来测试、评估算法的公开数据集，如 Adult、COMPAS、German Credit、Ricci Promotion 等。
- 概述了每个数据集的目标任务、敏感属性、数据规模及特征内容。

---

### **Appendix B: Supplementary Materials（补充材料）**

1. **B.1 Additional Measures for Algorithmic Fairness**
    
    - 扩展了正文对公平指标的讨论，如 Overall Accuracy Equality、Predictive Parity、Calibration、Mean Difference 等，并在表格中总结。
2. **B.2 Measure Categories（衡量指标分类与不可能性结果）**
    
    - 更系统地梳理了常见指标与“独立性/区分性/充分性”等概念，以及指标间的冲突与不兼容结论。
3. **B.3 Emerging Notions of Fairness Measures for Classification（新兴公平性概念）**
    
    - 涉及程序公平（procedural fairness）、偏好驱动的公平（preference-based fairness）、同时兼顾群体与个体公平的方法、成对公平（pairwise fairness）等。
4. **B.4 A Demonstration of Selected Fairness Enhancing Mechanisms（典型公平性机制示例）**
    
    - 针对前处理、中过程、后处理各列举一个具体算法机制做详细讲解，包括其实现思路、公式等。
5. **B.5 Paper Selection Procedure（文献检索与筛选过程）**
    
    - 说明作者在撰写本综述时如何利用 Google Scholar 进行关键词检索、筛选，并补充了参考文献的选取方式。

---

## 总结

这篇综述论文系统梳理了机器学习公平性研究中的关键概念、常用指标、提升算法公平性的三大主要机制以及它们的优劣势，最终还概括了诸多新兴的研究方向（如因果学习、对抗式学习、多方博弈等），并提出了未来面临的挑战与机遇。对于希望快速了解该领域的研究者或实践者，本篇文章提供了较为全面的入门参考。