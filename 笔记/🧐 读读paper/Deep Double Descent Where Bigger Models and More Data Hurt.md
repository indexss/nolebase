---
tags:
  - AI
  - DL
  - 过拟合/overfitting
---
https://arxiv.org/abs/1912.02292

讨论了双重下降的现象。
这篇文章中，作者认为传统的使用参数进行衡量的模型复杂度不能很好的衡量真实的模型复杂度。模型的状态其实与分布，训练时间，参数量都有关，于是作者定义了一个Effective Model Complexity有效模型复杂度EMC。
$$\mathrm{EMC}_{\mathcal{D},\epsilon}(\mathcal{T}):=\max\left\{n\mid\mathbb{E}_{S\thicksim\mathcal{D}^n}\left[\mathrm{Error}_S(\mathcal{T}(S))\right]\leq\epsilon\right\}$$
这个意思就是说，我们允许一个微小的误差epsilon，可能是0.000001，也就是说，EMC定义为模型训练误差接近为0的时候，所使用的最大数据量。专业点说就是一个训练过程在数据分布下能够接近零训练误差的最大样本数量。

训练过程包含了模型及其参数，优化器，训练时间等等。模型参数越大，
- 模型参数量越大，如果想要和小模型达到一样的拟合度，就需要更多的数据，所以EMC越大
- 优化器越好，EMC越小。
- 训练时间越大，模型就能够有更多的机会去学习训练数据中的模式从而降低训练误差

