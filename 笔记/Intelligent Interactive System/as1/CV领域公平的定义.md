**Examining fairness principles**

I’m digging into the paper's section on fairness definitions: individual fairness, group fairness (including demographic parity, equal opportunity, equality of odds), counterfactual fairness, and bias amplification.

在这篇名为 _“Fairness and Bias Mitigation in Computer Vision: A Survey”_ 的论文中，与“公平性评测标准”最直接相关的内容位于 **2.2 Fairness Definitions**（第2.2节）中。作者并没有单独给出一节来详细介绍“评测指标”（metrics），而是通过介绍不同的**公平性定义**和“bias amplification”来阐述他们在CV任务中常用的“评判标准”或“衡量方法”。具体如下：

---

## 1. 论文中讨论的公平性定义（评判标准）

### **(1) Individual Fairness（个体公平）**

- **核心思想**：对相似的个体给予相似的决策（“treat similar individuals similarly”）。
- **形式化**：使用 Lipschitz 条件来保证：如果在特征空间两点距离很近，那么模型输出的结果也应当很接近。

> 原文摘录：
> 
> > “Individual fairness seeks to ‘treat similar individuals similarly.’ One of the first attempts to formulate this objective... a small distance in feature space must translate to a small change in the model’s decision...”

这类定义通常用于强调模型对单个样本/个体的一致性，避免在特征上极为相近的两个样本只因敏感属性的差别就被赋予截然不同的结果。

---

### **(2) Group Fairness（群体公平）**

- **核心思想**：模型输出与“某个敏感属性（群体）”在统计或条件概率上保持独立/相同。
- **论文中提到的三种具体形式**：
    1. **Demographic Parity (DP)**：也称为 _Statistical Parity_。
        - 要求不同敏感属性群体（如男女）在“接受”或“阳性”预测上的概率相同，  P(Y^=1∣S=0)=P(Y^=1∣S=1)\; P(\hat{Y}=1 \mid S=0) = P(\hat{Y}=1 \mid S=1)P(Y^=1∣S=0)=P(Y^=1∣S=1)。
    2. **Equal Opportunity (EO)**：
        - 只关注“真实正例”的情况下，各群体的真阳性率（TPR）应当相同：  P(Y^=1∣Y=1,S=0)=P(Y^=1∣Y=1,S=1)\;P(\hat{Y}=1 \mid Y=1, S=0) = P(\hat{Y}=1 \mid Y=1, S=1)P(Y^=1∣Y=1,S=0)=P(Y^=1∣Y=1,S=1)。
    3. **Equality of Odds (EOO)**：
        - 要求模型对不同群体的真阳性率（TPR）和假阳性率（FPR）都相同：  P(Y^=1∣Y=1,S=0)=P(Y^=1∣Y=1,S=1)\;P(\hat{Y}=1 \mid Y=1,S=0) = P(\hat{Y}=1 \mid Y=1,S=1)P(Y^=1∣Y=1,S=0)=P(Y^=1∣Y=1,S=1) 且   P(Y^=1∣Y=0,S=0)=P(Y^=1∣Y=0,S=1)\;P(\hat{Y}=1 \mid Y=0,S=0) = P(\hat{Y}=1 \mid Y=0,S=1)P(Y^=1∣Y=0,S=0)=P(Y^=1∣Y=0,S=1)。

> 原文摘录：
> 
> > “Group fairness... There are three main definitions: Demographic Parity (DP), Equal Opportunity (EO), and Equality of Odds (EOO)…”

这类定义主要用来衡量在“群体”层面上是否存在显著的性能差异，或者决策结果分布是否一致。

---

### **(3) Counterfactual Fairness（反事实公平）**

- **核心思想**：对于某个个体，如果我们“在不改变其其他特征因果关系”的前提下，干预（intervene）敏感属性 SSS 并生成“反事实样本”，则模型输出应当一致。
- **形式化**：    P(Y^S←s∣X,U)=P(Y^S←s′∣X,U)\;\;P(\hat{Y}_{S\leftarrow s} \mid X, U) = P(\hat{Y}_{S\leftarrow s'} \mid X, U)P(Y^S←s​∣X,U)=P(Y^S←s′​∣X,U)，其中 UUU 是潜在的未观测因素，sss、s′s's′ 分别是两个不同的敏感属性取值。

> 原文摘录：
> 
> > “Counterfactual fairness... it requires identical decision probabilities for a sample and its counterfactual counterpart... considering the changes in other attributes that result from the alteration of the sensitive attribute.”

在CV领域，如果假设可以生成一张“仅敏感属性不同、其他保持不变”的图像，模型的预测结果应保持一致，这就对应了“反事实公平”。

---

### **(4) Bias Amplification（偏差放大）**

- **核心思想**：比较“模型预测中某一偏差”与“训练数据本身中的偏差”之间的差距。若模型预测所体现的偏差度高于数据中的偏差度，则称其“放大了偏差”。
- **具体场景**：如在图像描述生成或活动识别中，模型对某类群体的刻板印象比真实数据中的分布更甚，就会被视作“bias amplification”。

> 原文摘录：
> 
> > “Bias amplification... difference in the biases exhibited by a trained machine learning model relative to the biases present in the data used to train such a model.”

这对许多CV任务（例如图像描述生成、场景理解）尤其重要，即便数据里有一定偏差，模型也不应该在推断时将该偏差进一步放大。

---

## 2. 论文对这些标准的应用场景

- 在“**2.2 Fairness Definitions**”中，论文将这些标准用在对CV模型的评估：
    - **Individual Fairness**：更加微观，倾向于衡量局部一致性。
    - **Group Fairness**：最常见，用于衡量对“男女”“不同种族”“不同年龄段”等群体是否存在性能或输出概率上的差异。
    - **Counterfactual Fairness**：引入“因果关系”或“反事实样本”概念，评估模型若改变仅敏感属性后的结果一致性。
    - **Bias Amplification**：则是一种额外的量化方式，考察模型在数据本身存在的偏差基础上是否“火上浇油”。

作者并没有提供公式化的“度量指标”（如ACC差异、TPR差异、或MAE差异等）的详细表格，但上述几种公平性定义，在机器学习和计算机视觉领域都常被转化为相应的评价指标。例如：

- **Demographic Parity** → 检查各群体的正例率或预测标签分布是否一致。
- **Equal Opportunity** → 比较各群体的“召回率”或TPR。
- **Equality of Odds** → 同时比较TPR与FPR差异度。
- **Counterfactual Fairness** → 需要配合因果图或生成反事实图像进行对比。
- **Bias Amplification** → 统计模型预测偏差与数据集原生偏差之差。

---

## 3. 小结

- **论文核心**：主要从**概念与定义**（Individual/Group/Counterfactual Fairness + Bias Amplification）的角度讨论了如何“衡量和理解”偏差，而非直接以具体的“衡量公式”或“指标表格”来呈现。
- **原因**：很多计算机视觉相关工作使用的测量指标其实都是根据这些定义衍生出来的，例如衡量TPR差异、FPR差异、Accuracy 差异、或者Worst-group Accuracy等等。
- **对于读者**：如果要在具体实验中量化这些公平性指标，通常需要结合（1）数据集中对敏感属性的标注，(2) 真实标签 YYY，以及(3) 模型预测 Y^\hat{Y}Y^。然后对照**demographic parity**等公式化度量进行计算。

因此，综上所述，这篇survey主要**从四个方面（个体公平/群体公平/反事实公平/偏差放大）**来阐述公平性评估的核心概念和使用场景，相当于给出了CV领域衡量模型偏差时常见的理论框架。