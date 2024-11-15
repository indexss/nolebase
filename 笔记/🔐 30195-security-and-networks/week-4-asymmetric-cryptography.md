---
description: 介绍了非对称加密，以及公钥加密。
---

# Week 4 - Asymmetric Cryptography

## Introducino to Public-Key Cryptography

### Cryptography: Four Directions

* Confidentiality : 保密性
* Message Integrity : 消息完整性
* Sender Authentication : 发送者身份验证
* (soft) Sender Undeniability (non-repudiation) : 发送者不可否认，不可抵赖

接下来的课程将围绕这四个方向介绍其实现方法。

前面说过Kerckhoffs' Principle, 这里详细描述一遍：

* A cryptographic system should be secure even if everything about the system, except the key, is public knowledge.&#x20;
* Modern Applications demand even Tamper-Resistance.


### Problems about Symmetric Encryption

加密和解密用同一个key，就是对称加密，但是，像下图的情况，就需要很多个key，具体来说，每个人需要维护n-1把key，总共需要n(n-1)/2把：

<figure><img src="../.gitbook/assets/image (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="375"><figcaption></figcaption></figure>

### Asymmetric Encryption: Public Key Encryption

我们想要每个人只维护两个key: one is Public and one is Private

这两个key是 asymmetric的: 相关但不相同

公钥所有人都知道，私钥只有自己知道

公钥加密流程：

<figure><img src="../.gitbook/assets/image (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

现在，n个人的交流，只需要维持n个公钥和n个私钥

2n < n(n-1)/2  得出n>5的时候，使用公私钥就更加划算。

由于公钥私钥可以互相加解密，所以可以利用这一特性签名：

<figure><img src="../.gitbook/assets/image (2) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="375"><figcaption></figcaption></figure>

签名者用私钥签名，校对者用公钥检查看文档是否被修改，从而判定是否接受这份文件。

#### Public Key Infrastructure (PKI)

由于公钥是公开的，所以需要一个第三方权威机构来维护公钥的分发查询，这个叫作PKI。

<figure><img src="../.gitbook/assets/image (3) (1) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

1、接收者A向注册权威处注册 2、注册权威告诉服务器生成一个证书，其中包含公私钥  3、公私钥发回A 4、将A的公钥放在数据库中 5、发送者B在数据库中拿到A的公钥 6、用A的公钥加密对A的信息

## Secure Key Exchange

问题定义：我们已经有了很好的对称加密算法（如AES-CBC PKCS7）来让我们的信息在不可靠信道上传输，但问题是，如果双方没有事先约定好symmetric key，那么对称加密是行不通的，因为key不应该直接在不可靠信道上传输。所以我们需要一种方法，来在不可靠信道上安全地确立symmetric key。

### 真实世界问题解决建模

从真实世界视角上建模，我们可以想象一个双面锁箱，左右都有锁，左边的锁可以用Alice的钥匙打开，右边的可以用Bob的锁打开，锁箱就在公共区域内，也就可以类比成非可靠信道。Alice把左边的门打开，放入秘密信息（symmetric key）然后上锁，Bob从右边把门打开把信息拿走。这样，在没有事先约定好的情况下，Alice和Bob就确定了symmetric key。**Diffie Hellman Key Exchange**就用了这样的思想。

### Diffie-Hellman Key Exchange

<figure><img src="../.gitbook/assets/image (1) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

流程描述：

1. Alice和Bob先在不可靠信道上共同确定一个素数p和一个g   s.t. g < p && gcd(g, p-1) = 1
2. Alice选择一个a <- {2 .. p-2}，然后计算 $$A= g^a\ mod\ p$$，Bob选择一个b <- {2 .. p-2}，计算 $$B = g^b\ mod\ p$$
3. Alice把A发给Bob，Bob收到后把B发回给Alice
4. 对Alice来说，Alice知道a B p g，则 $$key=B^a\ mod\ p=g^{ab}\ mod\ p$$，对Bob来说，Bob知道b A p g，那么 $$key=A^b\ mod\ p=g^{ab}\ mod\ p$$


**安全性说明**

窃听者无法得知g^ab，因为窃听者能看到g^a，g^b，g，p，但是由于对数计算十分困难，而g和p一般取的都很大，实际上无法从g^a 和 g反推出a的值，b也是一样，所以窃听者无法得到g^ab


#### 对Diffie-Hellman Key Exchange 的攻击：MitM

Diffie-Hellman只有在只能被窃听的不可靠信道上才是安全的，如果这个信道上的信息可以被拦截，修改，那么就可以对其实施Man in the Middle攻击。

<figure><img src="../.gitbook/assets/image (2) (1) (1) (1) (1) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

可以看到，在Alice和Bob中间插个人是对Alice和Bob透明的，Adversary有g^ac mod p 和 g^bd mod p，相当于把两个双面锁箱连接到了一起，Alice和Bob无法察觉信息已经被盗取。

#### 如何解决MitM攻击？

#### Basic Idea: Authenticating Public Key. Requirement: Trusted Third Party: Certification Authority (CA).



## RSA Encryption

最流行的公钥加密算法，1977年被发明，在TLS和PKI中广泛运用

<figure><img src="../.gitbook/assets/image (18) (1).png" alt="" width="563"><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (19) (1).png" alt="" width="563"><figcaption></figcaption></figure>


注意！这个流程是要背下来的！


### RSA流程

RSA包括了(Gen, Enc, Dec)

* Gen函数接收一个安全参数λ，作为一个超参数
  * 准备两个素数p和q，bit size均为λ
  * N = pq, Φ(N) = (p-1)(q-1), 为小于N的正整数中与N互质的数的个数。这个函数叫[欧拉函数](https://zhuanlan.zhihu.com/p/151756874)。
  * 取一个e，满足两个条件，1\<e<Φ(N) ，e和Φ(N)互质
  * $$Z^{*}_{N} = \{0<x<N,\ gcd(x,N)=1\}$$，这个在加密和解密中有用
  * 取一个d，满足ed mod Φ(N) = 1
  * 结束，public key为(e, N)，private key为(e, d, N) <mark style="color:red;">（有的版本中没有e，因为e不必要）</mark>
* Enc函数是加密函数
  * m是明文，且在 $$Z^{*}_{N}$$中（hint中说明了这一点），并拿到PK = (e,N)，那么密文c = m^e(mod N)
* Dec函数是解密函数 <mark style="color:red;">（有的版本中没有e，因为e不必要）</mark>
  * 私钥为SK = (e,d,N) 密文刚拿到了，也在 $$Z^{*}_{N}$$中，原文m = c^d(mod N)


m一定属于 $$Z^{*}_{N}$$，等价于m小于N且与N互质，而N是由pq相乘得来的。第一个条件，m小于N很好满足，只要让pq足够大，N就会巨大无比，这样就满足m小于N。而m与N互质，是必定的，因为p q都是质数，所以在小于N，大于1的范围内，除了p q本身，就都与N互质，所以只要保证m不等于p q就没事。Eike说[维基百科](https://en.wikipedia.org/wiki/RSA\_\(cryptosystem\)#Operation)上写着，m\<N都能工作，给维基找错了属于是。


### RSA例子

p = 3, q = 11, N = 33 Φ(N) = 2\*10 = 20\
e取7, d取3，PK = (e=7, N=33) SK  = (e=7, d=3, N=33)\
注意到Z\*N如图：

<figure><img src="../.gitbook/assets/image (20) (1).png" alt="" width="375"><figcaption></figcaption></figure>

假设明文m = 4，c=4^7 mod 33 = 16\
而解密 m = 16^3 mod 33 = 4，对的上

## Digital Signatures

数字签名的目标是防伪，和真实的签名一样，我签过名的东西，如果你修改，是可以不承认的。

真实签名，是添加一段有关作者的信息到文件上，验证过程是public的。

前面说过Authenticated Encryption算是对称加密版本的数字签名，其缺点就是，由于MAC（Tag）是用AES CBC生成的，public无法验证其真实性，只有有对称密钥的人才能验证。而数字签名不是。

### 数字签名大体流程

<figure><img src="../.gitbook/assets/image (3) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

自然语言描述一下，1^k中的k相当于我们前面说的λ，超参数，生成公私钥。Sign函数通过拿到原文M，用私钥解密生成一个签名σ，附加到M后。

别人拿到附有签名的信息，用公钥加密信息（私钥解密的反函数），看内容是否和M相同，如果与M相同，说明未被篡改，如果不同就说明被篡改了。

### 数字签名模式设计：RSA Full Domain Hash

<figure><img src="../.gitbook/assets/image (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

* 需要一个公共哈希函数H，可以把一串内容哈希到小于N且与N互质的数组内。
* key的生成就是用RSA的生成函数，pk = (e,N), sk = (d,N)
* Sign的过程就是得到σ的过程，就是用RSA的私钥进行解密，注意，私钥解密与公钥加密是反函数。
* 验证，公钥加密，将上面的过程逆处理，如果得到的σ与H(M)相同，则接收，反之则拒绝。

## Saving a Key

直接把密钥写到一个文件里不是一个好习惯。我们希望，保护private key的读的权限，并确保public key是真实的。

### Java中的密码存储

KeyStore类提供了一个受密码保护的密钥与证书存储容器类。在硬盘上以KeyStore文件的形式存储。

多数java程序不创建新的key，而是使用KeyStore中已经存在的key，因为生成key需要一定的安全环境，且算力需求比较高。这样可以减少复杂性

JDK自带了一个shell命令keytool，可以在java外，命令行直接对密钥进行管理。

* 可以创建新的密钥对（公钥和私钥），生成证书请求，导入证书，以及管理`KeyStore`文件。
* 生成密钥后，这些密钥可以被导入到`KeyStore`中，并被Java程序用于加密、解密和其他安全操作。

