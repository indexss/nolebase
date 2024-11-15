# GNN

## 图介绍

图在很多领域都有应用

• 现代神经网络架构通常设计用于规则序列和网格&#x20;

• 图可以具有任意大小和拓扑结构

<figure><img src="../.gitbook/assets/image (136).png" alt=""><figcaption></figcaption></figure>

Graph(V, E)中，V是vertices(顶点)或node，E是边。边分为有向和无向

无向图邻居不用解释。有向图分为出邻居和入邻居。例如，A -> B，A的出邻居是B，B的入邻居是A

图可以用邻接矩阵表示。如果无权重，有边则1，无边则0，有权重，有数则为权重，无边则0

## GNN应用和训练框架

预测个体节点的属性或标签

示例：

* 预测社交网络中用户的兴趣&#x20;
* 预测蛋白质在蛋白质相互作用网络中的功能

<figure><img src="../.gitbook/assets/image (137).png" alt=""><figcaption></figcaption></figure>

## 消息传递



## pooling



## Permutation invariance and equivariance
