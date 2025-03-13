Regarding M1 marking, if anyone asks, let them know that the process has started, and we aim to release the marks by the end of next week.

bcs ddl of s2 and m2 are very close, so
I suggest that they develop the front-end and back-end together to avoid overlooking some issues and causing rework.

I also suggest that they start considering accessibility features. I think some simple accessibility features are easier to develop in front-end development, and for dark theme, setting a state in the cookie is simpler.


I have a team, their cicd pipeline may have some issues, their develop version website is working, but for the production website, their database has some problems. They used the react technology stack. They asked me if they could submit using the develop website.


capped at 70.


本项目是通过深度学习方法来解决gaze estimation这一任务，其中涉及到一些legal, social, ethical, and professional issues。接下来，我们将分开讨论

Legal
这一部分将会涉及到数据隐私，数据版权的问题。我们的项目使用了EVE数据集和EyeDiap数据集。
对于EVE数据集，它的版权归属于Swiss Federal Institute of Technology in Zurich，并采用了CC BY-NC-SA 4.0协议进行传播，这表明了使用它的项目只能用于科学研究，而不能商用，本项目符合了这一规定。
由于EVE数据集明确承认了GDPR合规考虑因素，该数据集需要提供学生和拥有永久职位导师的教育邮箱来获取。对于本项目，我们采取了合法的官方渠道获取了这一数据集，并遵守其所有限制。

对于EyeDiap数据集，该数据集为idiap research institute在2014年发布。其访问时受限的，需要提供学生和拥有永久职位导师的教育邮箱来获取。由于GDPR于2018年生效，所以我们并未得知是否满足GDPR协议，但数据集的文档中明确提到了，对每个参与者都被明确告知了任务，且没有收集敏感信息



### **1. Legal (法律问题)**

这一部分主要讨论你的项目涉及的法律合规性，包括数据隐私、版权、责任等问题。

- **数据隐私 (Data Privacy)**  
    你的项目使用了 **EVE 数据集**，需要明确数据的来源是否合法，是否符合 GDPR（通用数据保护条例）或其他数据保护法律。如果你的系统未来要处理用户的眼动数据，是否会涉及用户的隐私问题？你是否有必要向用户征求同意？
    
- **数据版权 (Data Ownership and Licensing)**  
    EVE 数据集是否有明确的使用许可？你是否遵守了数据集的使用条款？如果你的项目未来要商业化或开源，如何处理数据的版权问题？
    
- **算法透明性与责任 (Algorithm Accountability)**  
    你的深度学习模型可能会用于分析用户的视线数据，但如果模型给出了错误的预测（例如，在医疗或驾驶场景中），谁应该对此负责？是否需要考虑可解释性（Explainability）来增强法律合规性？
    

---

### **2. Social (社会问题)**

这里主要探讨你的项目对社会的潜在影响，包括技术滥用、可访问性和社会接受度等。

- **技术滥用 (Potential Misuse)**  
    你的视线估计模型可能被用于**监控、广告、用户行为分析等场景**，但是否可能会被恶意使用？例如，它可能用于侵犯用户隐私的监视系统，或者用于未经许可的行为追踪。
    
- **公平性和包容性 (Fairness and Inclusivity)**  
    你的模型是否对不同人群（不同种族、年龄、性别、眼部健康状况）表现一致？如果你的数据集主要来自特定人群，是否可能导致偏见？如何改进模型的公平性？
    
- **技术接受度 (Public Acceptance)**  
    公众是否愿意接受基于人工智能的视线追踪技术？如果你的项目被应用到实际系统（如远程教育、医疗诊断、驾驶辅助），人们是否会信任它？
    

---

### **3. Ethical (伦理问题)**

这一部分需要探讨你的项目可能涉及的道德困境，包括数据收集的伦理性、算法偏见、用户知情权等。

- **用户知情同意 (Informed Consent)**  
    你是否会在实际应用中收集用户的眼动数据？如果是，用户是否明确知晓并同意他们的数据被如何使用？
    
- **算法偏见 (Algorithmic Bias)**  
    你的模型是否对某些用户群体有更好的预测效果，而对其他群体效果较差？如果有，是否会导致不公平现象？如何改进以减少偏见？
    
- **滥用与伦理界限 (Misuse and Ethical Boundaries)**  
    你的模型是否可能被用于非道德用途，例如未经用户同意的视线跟踪（广告行业可能滥用这种技术以监视用户注意力）？你是否有任何方式来减少这些风险？
    

---

### **4. Professional (专业问题)**

这一部分主要与专业行为规范相关，比如 BCS（英国计算机学会）Code of Conduct、IEEE 伦理规范等。

- **遵守专业行为准则 (Professional Code of Conduct)**  
    BCS Code of Conduct 或 ACM Code of Ethics 强调了计算机科学家的责任，包括尊重用户隐私、确保技术不会对社会造成伤害。你的项目是否遵循这些原则？
    
- **研究与开发中的责任 (Responsibility in Research & Development)**  
    作为一名人工智能方向的研究者，你是否采取了足够的措施来确保你的模型是可靠的？你是否清楚地记录了你的数据来源、算法的局限性，以便其他人能理解你的工作？
    
- **开源与社区贡献 (Open Source & Community Contribution)**  
    如果你的项目未来开源，是否遵循适当的开源许可证（如 MIT、Apache）？你是否有意向让社区对你的研究做出贡献？你的代码是否足够透明和可复现，以便同行评审和改进？
    

---

### **总结**

你的 **Legal, Social, Ethical and Professional Issues** 章节可以按照以下结构组织：

1. **Legal (法律)**：数据隐私、数据集版权、算法责任等。
2. **Social (社会)**：技术滥用、社会公平性、公众接受度等。
3. **Ethical (伦理)**：用户知情同意、算法偏见、滥用风险等。
4. **Professional (专业)**：遵循行业准则、研究责任、开源规范等。

你可以根据你的具体项目内容，选择最相关的点进行深入展开，同时可以参考相关法律法规（如 GDPR、BCS Code of Conduct）来增强说服力。

你对这个结构满意吗？或者你有特别想强调的点？

4o

##### 您说：

BCS Code of Conduct是什么

###### ChatGPT 说：

**BCS Code of Conduct**（英国计算机学会行为准则）是由 **BCS, The Chartered Institute for IT**（英国计算机学会，英国IT专业人员的官方机构）制定的一套专业行为准则，旨在指导计算机科学家、工程师和IT从业者在职业活动中的道德和专业行为。

### **BCS Code of Conduct 的核心原则**

BCS Code of Conduct 包含四个主要原则，每个原则都规定了IT从业者应遵守的道德和专业标准：

#### **1. 公众利益（The Public Interest）**

- 计算机从业者应**优先考虑公众利益**，确保技术不会对社会造成伤害。
- 遵守数据保护法规（如 GDPR），保护用户隐私和机密信息。
- 避免开发或支持可能被滥用的技术，例如侵犯隐私的监控系统或歧视性算法。
- **你的项目相关性：**
    - 你需要考虑视线追踪技术是否可能被滥用于监控或未经用户同意的数据收集。
    - 确保你的技术不会带来社会不公或隐私侵犯。

#### **2. 责任（Duty to the Authority, the Profession and the Public）**

- 计算机从业者应**遵守法律和行业规范**，并且以负责任的方式开展工作。
- 确保软件、系统和人工智能模型的可靠性，尽可能减少错误和风险。
- 维护计算机科学专业的声誉，避免误导性宣传或不负责任的开发行为。
- **你的项目相关性：**
    - 你的视线估计模型需要透明地报告准确率、局限性，并确保算法不会对特定群体存在偏见。
    - 如果你的研究涉及用户数据，需要遵守 GDPR 之类的隐私法规。

#### **3. 诚信（Duty to the Profession）**

- 计算机从业者应**以诚实和正直的方式行事**，避免误导用户或雇主。
- 在研究和开发过程中，不得抄袭他人作品，应正确引用参考文献。
- 处理敏感数据时，保持数据机密性，不滥用用户信任。
- **你的项目相关性：**
    - 你在使用 EVE 数据集时，需要确保数据来源的合法性，并遵守使用协议。
    - 在你的论文或代码中，正确引用和标注数据集来源、已有方法的参考文献。

#### **4. 专业能力（Duty to Relevant Authority）**

- 计算机从业者应**不断提升自己的专业能力**，并确保自己的技术符合行业标准。
- 不应在自己**不具备专业能力**的情况下从事某项工作，避免不负责任的开发。
- **你的项目相关性：**
    - 你需要确保你的深度学习模型经过充分测试，并提供清晰的技术文档，使其他研究人员能够理解和复现你的工作。
    - 你需要保证代码的正确性，避免因错误导致模型失效或误导用户。

---

### **如何在你的毕设报告中应用 BCS Code of Conduct？**

在 **Professional Issues** 部分，你可以提到：

1. 你的项目如何**符合 BCS Code of Conduct**，例如你如何确保你的算法是透明、可靠、合乎道德的。
2. 你如何**保护数据隐私和用户权利**，例如使用数据集时是否遵循许可协议，是否避免不必要的数据收集。
3. 你如何**减少技术风险**，例如如何保证算法不会对某些群体有偏见，并且模型的预测结果不会被滥用。

---

### **总结**

BCS Code of Conduct 强调：

- 公众利益：确保技术不会对社会有害，遵守隐私法规。
- 责任：确保技术的可靠性，减少风险，遵守法律。
- 诚信：不误导用户，正确引用研究来源。
- 专业能力：不断学习，确保技术的准确性和可靠性。

在你的毕设报告里，你可以结合这些原则来说明你的项目是如何遵循这些专业行为准则的，比如**保护数据隐私、避免技术滥用、确保公平性和可靠性等**。

如果你有具体的项目细节，我可以帮你调整措辞，使其更符合你的研究方向！

4o

##### 您说：

如果我要写这一小节，我该如何开头？

###### ChatGPT 说：

好的！你这一小节的开头其实可以稍微正式一点，先说明为什么在项目中要考虑**Legal, Social, Ethical and Professional Issues**，然后再逐个展开。这里给你一个**通用模板**，你可以根据你的项目和风格调整：


社会问题
对于社会问题，我们将主要讨论公平问题，技术滥用问题以及社会接受度问题。对于公平问题，我们已尽力减少算法的bias。EVE和EyeDiap数据集中使用了不同肤色的数据，让我们的模型能够对不同肤色都起作用。另外，对于戴眼镜的用户，我们也做过测试。由于数据集中包括了戴眼镜的训练数据，我们的算法也能对他们一视同仁。对于技术滥用问题，由于我们使用了EVE数据集，其遵守的CC BY-NC-SA 4.0协议使得本算法也禁止商用，这在一定程度上也减少了算法滥用的可能性。最后，对于算法的社会接受度，大量工作都将gaze estimation算法应用于自动驾驶，在线教育任务中。只要合理拟定数据使用协议，用户将会愿意信任算法来辅助自己的体验。


对于社会问题，我们将主要讨论公平问题，技术滥用问题以及社会接受度问题。关于**公平性**，我们在算法和数据层面已经尽力**减少算法偏见**。所使用的**EVE**和**EyeDiap**数据集均包含**不同肤色**的参与者数据，这使得模型具备一定的**跨种族泛化能力**。此外，我们还针对**佩戴眼镜**的用户进行了测试，由于训练数据中也包含了**戴眼镜**的参与者数据，实验结果表明，模型对**佩戴眼镜和未佩戴眼镜**的用户都能保持**相近的预测精度**，体现了一定的包容性。关于**技术滥用**，虽然视线估计技术在广告投放、用户行为分析等领域存在被**滥用**的风险，但本项目使用的**EVE数据集**遵循**CC BY-NC-SA 4.0**协议，这意味着本项目的成果**仅限非商业科研使用**，不能被用于商业监控或广告追踪等用途。这一使用限制**在一定程度上降低了技术滥用的可能**。关于**社会接受度**，目前已有大量研究将视线估计技术应用于**自动驾驶**、**在线教育**等领域，并展示了其**潜在价值**。在实际应用中，只要**明确告知用户数据的用途**并**签署合理的数据使用协议**，用户对于此类技术的**信任度**将显著提升。因此，我们认为视线估计技术在**特定应用场合**具备较高的社会接受度。

专业问题
我们将讨论开源问题以及专业行为准则。对于开源问题，我们希望开源社区不断发展，所以本项目的代码将基于GPL协议进行开源。然而，为了遵守EVE数据集的**CC BY-NC-SA 4.0**协议中再创作不可商用的规定，我们将不公开参数文件以及相关数据集这类数据集衍生产品。对于专业行为准则方面，我们严格遵守BCS Code of Conduct，即遵守他人隐私，开源代码以展示我所知道和学习我不知道的。本项目也保证IT的真实性，开源将证明这一切。

然而，EYEDIAP缺少官方提供的数据划分与数据预处理，这使得比较变得困难。为解决这一问题，我们采用了Cheng et al. 提供的preprocessing and normalization method来使得测评更加标准。另外，我们使用了由GazeHub公开的数据预处理方式将数据分为4簇，以便进行4折交叉验证。

另外，由于PDA Loss的计算需要头部与屏幕的相对坐标，而EYEDIAP提供的以悬浮球为目标的数据并未提供坐标，所以我们使用了以屏幕作为目标的部分进行了实验。我们对于每个对比的模型都做了相同的处理，以确保公平性。

我们将输入图像的尺寸设置为256x256, 并采用上述的超参数设置，模型的总参数量为14.89M parameters。相比之下，在不带后方Transformer的情况下，ResNet-18的参数量为11.69M，而ResNet-34参数量为21.80M，这说明了RTDNet的参数量并不算大，与已有方法相当。在精度为FP32的全精度情况下，需要显存2.82G，用RTX 4090D进行一段30帧的视频推理需要0.03s，170 GFLOPs，这证明了我们的模型可以玩成在线实时推理的任务。

项目管理
本项目开始时间为2024年6月，整体开发周期大约为5个月。本项目的开发方法论为迭代开发模式，根据实验结果不断调整模型的结构，增加实验，以逐步完善工作。本项目有以下几个里程碑：
确定选题
项目初期，我与导师多次交流，选定了video based gaze estimation为我的项目方向。

文献调研与baseline复现，
在明确方向后，我阅读了导师推荐的相关论文，并复现了多个本方向的baseline模型。同时，我学习了多个模型开源实现的评估方法，开发了一个通用的模型评估框架，为后续的研究奠定了基础。

模型设计与确定
在基本了解本研究方向后，我查阅了大量文献，设计了5个不同的候选模型，逐一进行实验后并与导师交流，确定了一种模型架构作为本项目的模型。之后为增强本架构的可解释性，我将模型可视化后与导师沟通修改模型，不断评估其性能。

超参数的设定
我对模型进行了超参数的网格搜索，以确定性能最佳的超参数。

对比实验与消融实验
为了完善对比实验的内容，我又复现了很多论文的模型来与我的模型进行对比。我也对我的模型进行了消融实验，还确定了普氏距离为对比轨迹相似度的metric。

论文撰写与展示
在这一阶段我开始了论文主体的撰写。另外，为了demostrate方便，我还编写了一个展示网站来展示我的工作。


是否能得到延期需要向nodule lead反应，但据我所知，只有个人提交能够延期，团队提交无法延期。

Hi, A student reacted to me that they treated notification as an entity, but were told in the M1 review that it should be treated as a function. However, they believed that their notification had CRUD functionality, and have some features like `filter` and `search`. With only one week left until the deadline for M2, it would be difficult to change the entity. How should this situation be handled?