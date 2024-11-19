---
tags:
  - NLP
  - AI
  - DL
  - ML
---

# Dependency Parsing

## 语义学基础
当我们谈论一个句子的时候，有两种分析方式，
- 一种叫Constituency成分结构，也叫phrase structure grammar短语结构语法，也叫context-free grammars (CFGs) 上下文无关文法
- 另一种叫Dependency structure依赖关系结构
接下来就来介绍这两种分析方式

### CFGs
CFG的视角认为，句子是由一个一个phrase短语组成的，而短语是由单词words组成的，所以一个句子可以被分为一个一个短语之后，再把短语分为单词，这是一种nested结构。
基本单词：`the`、`cat`、`a`、`dog`、`large`、`barking`
多个单词嵌套在一起组合成短语，例如：`the cat`、`a large dog`
短语可以嵌套在更大的短语中。 `the large barking dog`，这个短语是由多个部分组成的，里面包含冠词 `the`，形容词 `large`，动词形容词 `barking`，以及名词 `dog`。你可以看到这种结构包含了修饰关系，是层次化的，其中 `large barking` 修饰 `dog`，而整个短语再与冠词 `the` 组合。


### Dependency structure
举个例子
![](assets/Pasted%20image%2020241119014519.webp)
如果我们不确定`from space` 这个短语是依赖于`whales` 还是 `scientists` 的，我们就没法得到正确的语义，依赖结构就表明了这种关系。
依赖结构的观点认为，语言的结构是一个这样的树结构，箭头通常用于表示语法关系（主语、介词宾语、同位语等）：

![](assets/Pasted%20image%2020241119014752.webp)
依存语法大概用这种方法分析一个句子


![](assets/Pasted%20image%2020241119014945.webp)
逐渐也诞生了一些依存树数据库，比如Brown corpus (1967; PoS tagged 1979); Lancaster-IBM Treebank (starting late 1980s); Marcus et al. 1993, The Penn Treebank, Computational Linguistics; Universal Dependencies: http://universaldependencies.org/

帮助确定是否存在依存关系一般有四条经验
1. 双词关系（Bilexical affinities）`discussion`（讨论）与 `issues`（问题）之间的依存关系是合理的，这意味着这两个词常常一起出现，且有明确的语义关系。在语法解析中，这种双词之间的相互联系可以用来判断是否有依存关系。
2. 依存距离（Dependency distance）依存距离是指依存关系中的两个单词之间的距离。通常，依存关系更可能发生在相邻或距离较近的单词之间。
3. 中间的干扰项（Intervening material）依存关系很少会跨越干扰动词或标点符号。也就是说，如果两个词之间有很多动词或标点符号，它们之间可能不太会存在直接的依存关系。
4. 依存中心词的容量（Valency of heads）中心词的容量，或称为“配价”，是指一个中心词（通常是动词或名词）能够接受多少个依存项（比如宾语、状语等）。配价描述了一个中心词通常会有多少依存从属词，以及这些从属词通常处于哪个方向（左边还是右边）。


## Dependency Parsing
有了上面的依存结构的基础，我们就想要给一个句子做dependency parsing.

