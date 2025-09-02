
---

## **1. 会议概述**

本次会议主要讨论了过去一周团队的工作进展、遇到的问题，以及即将提交的M1作业的具体要求。会议重点关注了开发环境问题、技术栈选择、数据库设计、应用描述、Mockup（原型设计）等内容，并对M1提交的各项内容进行了详细说明。

---

## **2. 团队工作进展及问题汇总**

### **2.1 工作进展**

- 各团队已开始S1阶段的工作，并进行了团队会议讨论项目方案。
- 部分团队已搭建开发环境并开始编写代码，但进度有所不同。
- 一些团队已经进入S2的准备阶段，而另一些团队仍在完成S1任务。

### **2.2 遇到的常见问题**

1. **开发环境问题**
    
    - 许多团队在虚拟机或Docker环境的配置上遇到了困难。
    - 可能是提供的Docker镜像存在Bug，JDL关系未正确显示。
    - 解决方案：遇到此类问题可直接联系Madassa，他会在下午的主讲课上提供解答。
2. **存储问题**

    - 有团队询问是否可以使用数据库以外的存储方式来加快视频加载速度。
    - 由于大学不提供额外的存储资源，建议学生使用自己的服务器或云端存储（如AWS、Azure的免费额度）。
    - 若无法使用云服务器，可以通过Docker环境进行开发并提交代码库。
4. **数据库设计与实体问题**
    
    - 部分团队对如何定义数据库实体存在困惑，特别是在房间预订系统中，是否应将“通知”作为一个实体存储。
    - 解决方案：团队需要合理设计数据库，确保实体的必要性，并能提供相应的业务逻辑支持。
4. **头像是否作为独立实体**
    
    - 讨论了头像是否可以作为一个完整的数据库实体。
    - 结论：头像不应作为单独实体，而应作为用户信息的一个属性，存储在用户表中。
5. **管理员角色的设计**
    
    - 讨论了是否需要为管理员创建一个单独的数据库表。
    - 建议：一般情况下，管理员和普通用户可以共享同一个用户表，并通过“角色”字段进行区分。如果管理员结构完全不同，可考虑创建单独的表，但需要合理解释设计原因。
6. **M1 提交的技术栈变更申请**
    
    - 若团队希望更改技术栈，需要填写Canvas上的表格，并在M1阶段提交。

---

## **3. M1提交要求（重点）**

### **3.1 M1 提交的组成部分**

M1的提交由以下几项主要内容组成：

#### **1. S1 评分（Ranking）**

You need to submit a ranking list of S1, which reflects the contribution of each person in S1. Specifically, you need to establish some evaluation criteria and define what the good standards are for each rule. 

For example, The quality of the mockup. If the consistent design style is followed and the functionality is clearly expressed, it is 2 points. If the common style is not followed but the functionality is clearly expressed, it is 1 point. If neither is achieved, it is 0 points.

Next, you need to record the scores of each person, Finally, you also need to provide some constructive feedback to each member, telling them where they can improve.
https://docs.google.com/document/d/1R79T_I8-ertuH-PgfCj6byYSxaOiYuHPGjKrpUOYTW0/edit?tab=t.0
- 团队成员需要对彼此的贡献进行排名，并提供排名依据。
- 需要包含：
    - 评分标准
    - 排名列表
    - 每个成员的建设性反馈


#### **2. 应用描述（App Description）**

- 团队需撰写文档，详细描述他们的应用，包括：
    - 该应用的目标是什么？
    - 该应用解决了什么现实问题？
    - 关键实体（如数据库表）有哪些？
    - 主要功能是什么？
- What is the goal of this application?
- What real-world problem does this application solve?
- What are the key entities?
- What are the main functions?

#### **3. 合并后的Mockup（原型设计）与JDL**

- Mockup需要展示应用的用户界面，并提供交互示例。
- 如果团队使用JDL进行数据库建模，需要提交完整的数据库关系图（ER图）。
- 提交时需要确保：
    - 所有团队成员的设计风格统一。
    - 采用在线原型设计工具（如Figma），并提供截图或链接。

#### **4. S2与M2的看板计划（Kanban Plan）**

- 团队需要展示他们的项目进度计划，包括S2和M2阶段的任务规划。
- 看板内容要求：
    - 每个任务卡片需包含负责人、截止日期和任务描述。
    - 任务分配要合理，确保所有成员都参与。

#### **5. 可选提交内容（非评分项）**
- **团队合作准则（Group Policy）**
    - 团队可以起草规则，例如团队会议出席要求、代码提交标准、AI工具（如ChatGPT）的使用规范等。
- **会议记录（Meeting Minutes）**
    - 建议团队记录所有会议内容，方便后续跟进。

### **3.2 评分标准**

- M1提交的某些部分不会单独评分，例如技术栈变更申请和会议记录。
- 但S1评分、应用描述、Mockup、数据库设计和看板计划将影响团队的最终成绩。

### **3.3 截止日期**

- **S1提交截止日期：** 今天（X月X日）
- **M1提交截止日期：** 下周（X月X日）
- **技术栈变更申请截止日期：** 需在M1提交时一并完成。

---

## **4. 讨论与答疑**

### **4.1 JDL文件的关系定义**

- 团队需要在JDL文件中定义实体关系，但后续仍可调整。
- 这部分的主要目标是确保团队有清晰的数据库设计思路。

### **4.2 用户反馈的获取**

- 由于今年没有固定的用户进行测试，团队可以基于自身经验或向朋友咨询来证明应用的价值。

### **4.3 Mockup的交互要求**

- 提交时需要包含界面跳转示例，或者提供详细的页面描述，而不仅仅是截图。

---

## **5. 会议总结与下一步工作**

### **5.1 总结**

- 目前大部分团队的开发进度正常，但仍有一些技术问题需要解决。
- M1提交是团队接下来的重点，所有成员需要尽快完成各项任务。
- 遇到技术问题时，可联系Madassa或在团队内部讨论解决方案。

### **5.2 下一步工作**

- 各团队需在本周内完成M1的初步准备，并在下周提交正式版本。
- 需要确保所有文档齐全，包括Mockup、JDL、Kanban计划等。
- 讨论团队合作准则，明确分工，优化任务管理。


team32 - 健身搭子。登陆不能作为entity

team33 - 捉迷藏游戏 - 去确认一下是否可以只有手机端。

team34 - 

team35

team36  - GP预定

team37 - 活动发布
Basel Alahmadi - 登陆不能作为entity


工资，进化计算，病好了，costa好吃，没买上蘑菇，意面酱热量吓人，乌冬，tic-for-tac