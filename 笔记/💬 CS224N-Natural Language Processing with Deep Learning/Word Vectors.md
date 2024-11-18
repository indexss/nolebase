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
从向量化的角度看，就是这样计算的

![](assets/Pasted%20image%2020241118025546.webp)

这种做法之下，我们用V和U的平均值当作词向量，那么similar words在向量空间中的距离就会变近。
为什么要用两个向量？Easier optimization.
用于训练的损失函数：
1. Naïve softmax（简单但昂贵的损失函数，在有许多输出类别时），上面讨论的就是这个，负log。
2. 更优化的变体，如分层softmax
3. 负采样 negative sampling

## Negative Sampling
上面我们看到，分母那个巨大的加和乘法，计算量巨大，所以会有负采样。
负采样的想法是，我们不去管分母那个了，因为太大了。我们只去管context中，这些context的出现概率应该接近1，而不在context中的词，我们希望出现概率接近0。我们只需要采样几个不在context里面的词就可以

$$
J_{neg-sample}(u_o,v_c,U)=-\log\sigma(u_o^Tv_c)-\sum_{k\in\{K\text{ sampled indices}\}}\log\sigma(-\boldsymbol{u}_k^T\boldsymbol{v}_c)
$$
-log之后就变成优化最小了，所以前半部分随着优化会变小，后半部分由于也要变小，所以加负号。
这里我们用了sigmoid函数做激活，也是为了转为概率。
那么这些非context的点是怎么取出来的呢？就是靠采样，怎么采？
采样用了 P(w) = U(w)^3/4 / Z, 这里U是unigram分布。这样取power，可以让低频的词多被采样到。
这样需要优化的东西，就只有2m+1个词（m是半个窗口），以及2km个负采样，k是一个超参数。这样，梯度计算就很简单稀疏了。

## SGD中的梯度形状问题

