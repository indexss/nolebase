---
tags:
  - AI
  - DL
  - ML
  - CV
---

# CNN

## 激活函数介绍

ReLU最常用，有时用用Leaky ReLU，也可以在最后一层试试tanh，不过不要抱太大希望，只在最后一层使用sigmoid。

*   Sigmoid

    <figure><img src="../.gitbook/assets/image (3).png" alt="" width="375"><figcaption></figcaption></figure>
*   tanh

    <figure><img src="../.gitbook/assets/image (4).png" alt="" width="375"><figcaption></figcaption></figure>
*   ReLU

    <figure><img src="../.gitbook/assets/image (5).png" alt="" width="375"><figcaption></figcaption></figure>
*   Leaky ReLU

    <figure><img src="../.gitbook/assets/image (6).png" alt="" width="375"><figcaption></figcaption></figure>



## 图像基础

RGB图像是以RGB三个通道的灰度图所叠加而成的。

Binary image只有黑白，没有灰。Gray-scale图有0-255，但只有灰度一个通道。RGB是三个通道。

图像的特征还会有edges以及人脸特征点landmarks

## CNN

图像卷积操作：

<figure><img src="../.gitbook/assets/image (7).png" alt="" width="563"><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (8).png" alt="" width="375"><figcaption></figcaption></figure>

卷积层干的事，就是用卷积核和覆盖位置进行dot product。

<figure><img src="../.gitbook/assets/image (9).png" alt="" width="563"><figcaption></figcaption></figure>

卷积核总是和原图有相同的通道数。卷积得到的结果叫做activation map。activation map的通道数是由卷积核的数量决定的。

例子：ConvNet

<figure><img src="../.gitbook/assets/image (10).png" alt="" width="563"><figcaption></figcaption></figure>

### Magic Formula

卷积得到的activation map的shape公式：Magic Formula

<figure><img src="../.gitbook/assets/image (11).png" alt="" width="563"><figcaption></figcaption></figure>

1x1的卷积核经常用来做维度的升降。

### 池化层

池化层就是让一个特征的表示变得更小，更容易管理。常用的有最大池化，平均池化。

<figure><img src="../.gitbook/assets/image (12).png" alt="" width="563"><figcaption></figcaption></figure>

池化的公式：

<figure><img src="../.gitbook/assets/image (13).png" alt="" width="563"><figcaption></figcaption></figure>

VGG16的网络架构

<figure><img src="../.gitbook/assets/image (14).png" alt="" width="563"><figcaption></figcaption></figure>

### CNN的特征

Shift invariance 平移不变性。

**意味着系统产生完全相同的响应（输出），不管它的输入是如何平移的 。**

• 平移不变性是可取的，因为它使网络能够很好地泛化。

• 池化层有助于卷积网络中的平移不变性。

<figure><img src="../.gitbook/assets/image (15).png" alt="" width="375"><figcaption></figcaption></figure>

Shift equivariance 平移同变性

**意味着系统在不同位置的工作原理相同，但它的响应随着目标位置的变化而变化** 。

• 由每个卷积层参数共享导致的结果。

• 通过在多个层次上组合局部模式，实现学习长距离全局模式。

<figure><img src="../.gitbook/assets/image (16).png" alt="" width="375"><figcaption></figcaption></figure>

### CV的一些任务

<figure><img src="../.gitbook/assets/image (17).png" alt="" width="563"><figcaption></figcaption></figure>

*   Classification + Localization

    比较好想到的就是，坐标当成回归问题，分类当成softmax问题。

    <figure><img src="../.gitbook/assets/image (19).png" alt="" width="563"><figcaption></figcaption></figure>

    然而，每个图里，目标数量不同，要输出的数字数量也就不一样。
*   Object Detection（选学）

    需要对大量边界框（或其他形状）进行图像分类，这些边界框具有不同的位置和比例。这很昂贵

    对策：只看其一些子集。

    目前的方法，Faster RCNN，RCNN，YOLO都是看成分类或者回归问题，然后用CNN作为backbone
*   Semantic Segmentation

    为每一个像素都打上标签，是属于哪一类。具体方法一般用滑动窗口来取部分子图来识别属于哪一块。

<figure><img src="../.gitbook/assets/image (20).png" alt="" width="563"><figcaption></figcaption></figure>

一些上采样方法：最近邻和bed of nails

<figure><img src="../.gitbook/assets/image (21).png" alt="" width="563"><figcaption></figcaption></figure>

还有可学习上采样方式：转置卷积

<figure><img src="../.gitbook/assets/image (22).png" alt="" width="563"><figcaption></figcaption></figure>

对应的magic formula是这样的：

<figure><img src="../.gitbook/assets/image (23).png" alt="" width="563"><figcaption></figcaption></figure>

## 数据预处理

### Normalization 归一化 挪到中间

<figure><img src="../.gitbook/assets/image (24).png" alt="" width="563"><figcaption></figcaption></figure>

方法：MinMax，Zscore

<figure><img src="../.gitbook/assets/image (25).png" alt=""><figcaption></figcaption></figure>

