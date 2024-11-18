# Word Vectors
## Word Vectors简介

Q: 以前的NLP是怎样让计算机中反映出词汇的意义呢？

A: 
1. 使用一个专家库如WordNet，其中包含了synonym set同义词集和hypernyms上位词。
   缺点挺多的，比如需要人力，主观，缺少新意思，且在某些语境下可能不对。
![](./assets/image-20241115014910319.png)
2. one-hot向量表示词语

   的确能表示了，但是太稀疏，且由于每个词的独热向量是正交的，所以无法衡量词之间的相似度。

**现代做法：Word Vectors**

理论依据是分布语义学：一个词的含义由经常出现在附近的词给出。You shall know a word by the company it keeps

当一个词w出现在text中，它的context是它左右一个固定size的window中的词
![](./assets/image-20241115015605935.png)
可以看到，上下文确实给出了banking的意思。

所以我们希望，通过w的context，构建一个dense vector去embedding每个词。另外，我们也希望意义相近的词，通过向量的点乘，我们希望其得分更高，得分反应相似度。

## Word2Vec 2013

Word2Vec的思想是，由于一个词的意思可以通过其周围的词得到，那么反过来，当一个中心词出现的时候，周围几个词出现的概率也应该最大（这个是skip gram的想法，cbow的想法正好反过来，是用p(Wt|Wt+2)）。

![](assets/Pasted%20image%2020241118014612.webp)

为了概率最大，很自然就想到了似然函数，以及常用的取对数简便运算的方法。

![](assets/Pasted%20image%2020241118015914.webp)

那么，P怎么算的呢？这里定义v_w是w做中间词的时候的词向量，u_w是w做上下文的时候的词向量。那么P就有利用softmax这样的定义：
注意，这里面的V大概率是你的语料库所有词。

![](assets/Pasted%20image%2020241118020129.webp)

这样，之后做梯度下降就可以了！
