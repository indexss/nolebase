# RNN

RNN是一种经典用于处理序列的模型。Transformer也可以处理序列。

## Neurons with Recurrence

### 序列任务的分类：n对n

<figure><img src="../.gitbook/assets/image (116).png" alt="" width="563"><figcaption></figcaption></figure>

我们如果可以利用前一次预测的隐藏内容（隐藏h），那么就可以处理序列内容。

<figure><img src="../.gitbook/assets/image (117).png" alt="" width="375"><figcaption></figcaption></figure>

## Vanilla RNN

<figure><img src="../.gitbook/assets/image (118).png" alt="" width="563"><figcaption></figcaption></figure>

具体来说，内部是这样的，在每个时间步重复使用相同的权重矩阵：

<figure><img src="../.gitbook/assets/image (119).png" alt="" width="563"><figcaption></figcaption></figure>

序列模型的要求以及rnn都满足了。

<figure><img src="../.gitbook/assets/image (120).png" alt="" width="563"><figcaption></figcaption></figure>

## 序列模型问题：预测下一个单词

任务定义：

<figure><img src="../.gitbook/assets/image (121).png" alt="" width="563"><figcaption></figcaption></figure>

单词想要被网络接受，就需要embedding

<figure><img src="../.gitbook/assets/image (122).png" alt=""><figcaption></figcaption></figure>

## 时间上的反向传播 Backpropagation Through Time(BPTT)

<figure><img src="../.gitbook/assets/image (123).png" alt="" width="563"><figcaption></figcaption></figure>

由于长序列，这种网络很容易梯度爆炸，或者梯度消失。

梯度爆炸解决方法：梯度clipping

梯度消失解决方法：Activation Function选个好的，或者weight initialization用个好方法，或者调整网络架构（GRU LSTM）

## LSTM

普通RNN长这样：

<figure><img src="../.gitbook/assets/image (124).png" alt="" width="563"><figcaption></figcaption></figure>

而LSTM长这样

<figure><img src="../.gitbook/assets/image (125).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (126).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (127).png" alt="" width="563"><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (129).png" alt="" width="563"><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (130).png" alt="" width="563"><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (131).png" alt="" width="563"><figcaption></figcaption></figure>

1. 保持与输出不同的单元状态
2. 使用门控制信息流

• 遗忘门消除不相关信息

• 存储当前输入的相关信息

• 有选择地更新单元状态

• 输出门返回单元状态的经过滤的版本

3. 通过时间的反向传播，保持梯度流畅。

## RNN Applications

* 情感分类

<figure><img src="../.gitbook/assets/image (132).png" alt=""><figcaption></figcaption></figure>

* 机器翻译

<figure><img src="../.gitbook/assets/image (133).png" alt=""><figcaption></figcaption></figure>

* 音乐生成

<figure><img src="../.gitbook/assets/image (134).png" alt=""><figcaption></figcaption></figure>

* 图片描述

<figure><img src="../.gitbook/assets/image (135).png" alt=""><figcaption></figcaption></figure>

## 总结

1. RNN非常适合序列建模任务
2. 通过递归关系对序列进行建模
3. 使用时间反向传播训练RNN
4. 门控单元如LSTM允许我们建模长期依赖

