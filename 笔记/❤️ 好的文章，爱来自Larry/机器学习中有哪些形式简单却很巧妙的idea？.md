---
tags:
  - ML
  - AI
  - DL
  - trick
---


| Archive 自 | Archive 创建于      | 分类  | 原始作者 | 原始地址                                                             | 原始资源创建时间         | 原始资源更新时间         |
| --------- | ---------------- | --- | ---- | ---------------------------------------------------------------- | ---------------- | ---------------- |
| 知乎        | 2024-11-18 11:15 | 分类  | momo | [链接](https://www.zhihu.com/question/347847220/answer/3351403565) | 2024-01-05 14:40 | 2024-01-05 15:09 |

机器学习中有哪些形式简单却很巧妙的idea？

1. self-gating基本加上都涨点

变体有context gating和SE模块等

核心思想都是用自己gate自己

基本形式是 y = sigmoid(wx)x

2. 各种重建，先把输入corrupt一下，然后用autoencoder重建一下，基本都能让feature更robust，何凯明的MAE也是如此。

3. 各种dropout，是个地方都可以试着加点dropout，embedding可以加dropout，attention可以加，ffn可以加，mlp可以加，输入上也可以直接加，相当于某种corrupt

4. mixup，也是个神级idea，输入上a类+b类混合一下，然后label也变成a+b混合，基本也是无脑增强，必定涨点

5. 对比学习大神器，核心就看如何构造正样本和负样本。有个惊艳的idea，同一个输入foward两次，因为dropout不同，就可以当正样本，也是无脑涨点

6. 未完待续