# Word Vectors

## Word Vectors简介

Q: 以前的NLP是怎样让计算机中反映出词汇的意义呢？

A: 

1. 使用一个专家库如WordNet，其中包含了synonym set同义词集和hypernyms上位词。

   缺点挺多的，比如需要人力，主观，缺少新意思，且在某些语境下可能不对。

<img src="./assets/image-20241115014910319.png" alt="image-20241115014910319" />

2. one-hot向量表示词语

   的确能表示了，但是太稀疏，且由于每个词的独热向量是正交的，所以无法衡量词之间的相似度。

**现代做法：Word Vectors**

理论依据是分布语义学：一个词的含义由经常出现在附近的词给出。You shall know a word by the company it keeps

当一个词w出现在text中，它的context是它左右一个固定size的window中的词

<img src="./assets/image-20241115015605935.png" alt="image-20241115015605935" style="zoom:50%;" />

可以看到，上下文确实给出了banking的意思。

所以我们希望，通过w的context，构建一个dense vector去embedding每个词。另外，我们也希望意义相近的词，通过向量的点乘，我们希望其得分更高，得分反应相似度。

## Word2Vec 2013

Word2Vec的思想是，由于一个词的意思可以通过其周围的词

```handwritten-ink
{
	"versionAtEmbed": "0.2.6",
	"filepath": "💬 CS224N-Natural Language Processing with Deep Learning/assets/Ink/Writing/2024.11.15 - 19.24pm.writing"
}
```
ok

