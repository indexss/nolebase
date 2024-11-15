---
description: 介绍了编码，简单的加密，着重讲解了对称加密的知识。
---

# Week 3 - Symmetric Cryptography

## Code versus Ciphers

编码是一种表示数据的方式，如ASCII, Hex, Base64, etc.

cipher是一种不知道规则就难以从code到data的模式。

* 几乎都用到了key
* 编码前叫plain text, 编码后叫cipher text
* 加密；encryption，解密：decryption

### 编码举例：

<figure><img src="../.gitbook/assets/image (6) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="375"><figcaption></figcaption></figure>

### Hex：

<figure><img src="../.gitbook/assets/image (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

### ASCII 不赘述

### Base64: 可打印字符最短的编码方式，使用Hex

<figure><img src="../.gitbook/assets/image (2) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="375"><figcaption></figcaption></figure>

### Caesar Cipher

统一向前或后推n个字母。n rotations

<mark style="color:red;">Kerckhoffs's principle: A cipher should be secure even if the attacker knows everything about it apart from the key.</mark>

但最多就26个key.

更好的方案是指定某个字母替换另一个字母，这样就有26! 种key。

但其实这种也不行，因为字母语言有频率分析，对应这张表就可以大差不差猜出来：

<figure><img src="../.gitbook/assets/image (3) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="375"><figcaption></figcaption></figure>

## Symmetric Cryptography

### Pre Knowledge

* Modular Arithmetric
* XOR
*   One Time Pads 一次性(例子用的加法)

    对于任意长度的密文，如果不知道密钥，则该密文是与同一长度的明文加密相同概率的所有相同长度明文。

    问题：密钥太长，且只能用一次

    <figure><img src="../.gitbook/assets/image (4) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>



## Block Ciphers

现代加密都以明文块加密，由一系列permutations, substitutions重复在每个块上组成，permutations和substitutions由key控制。

### AES

AES是最先进的块加密，每块长128bits。

会生成10个round keys，由128位的主密钥生成。

使用一种Permutation: ShiftRows

使用三种Substitution: SubBytes，MixColumns，AddRoundKeys

AES过程：

1.  每块128bits，由4\*4矩阵表示，每个元素一个byte

    <figure><img src="../.gitbook/assets/image (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>


2.  SubBytes: S-box

    <figure><img src="../.gitbook/assets/image (2) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

    S-box是一个16\*16的表，每个元素都是1个byte，使用加密字节的高4位和低四位分别定位S-box的行和列，从而定位替换元素，进而进行替换。0x53就定位到5行3列。
3.  ShiftRows

    <figure><img src="../.gitbook/assets/image (3) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

    第0行shift 0，第1行shift 1，第i行shift i
4.  MixColumn

    <figure><img src="../.gitbook/assets/image (4) (1) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

    这里c(x) = 3x^3 + x^2 + x +2
5.  AddRoundKey

    <figure><img src="../.gitbook/assets/image (5) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

#### AES安全性来源：

没有数学证明是不可逆的，但是已经很好了。

有一种side channel attack，通过通测量功耗、执行时间等盘外招来破译，后面会将到。

安全保障来源：

1. 行和列微小的shuffle会带来输出的级大变化。
2. 需要至少一个非线性操作，在AES中由SubByte提供。

### DES

Data Encryption Standard，是旧标准，由IBM在1970年代设计。S-boxes是一种替换方法，而我们不知道NSA是否给S-boxes加了这种替换，有人认为这是NSA给自己留的后门。IP和IP-1在密码学上别没有意义。

<figure><img src="../.gitbook/assets/image (14) (1).png" alt="" width="263"><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (16) (1).png" alt="" width="322"><figcaption></figcaption></figure>

DES基于Feistel函数，也就是图中的F函数，见：[维基百科](https://zh.wikipedia.org/wiki/%E8%B3%87%E6%96%99%E5%8A%A0%E5%AF%86%E6%A8%99%E6%BA%96#%E8%B2%BB%E6%96%AF%E5%A6%A5%E5%87%BD%E6%95%B0%EF%BC%88F%E5%87%BD%E6%95%B0%EF%BC%89)

现在很弱，1080Ti 15天就能破译。

在AES出现之前，使用一种丑陋至极的方法暂时替代DES - 3-DES。E是加密，D是解密，其实就是用K1加密后，再用K2解密出一堆东西，再用K3加密。

<figure><img src="../.gitbook/assets/image (4) (1) (1) (1) (1) (1) (1).png" alt="" width="375"><figcaption></figcaption></figure>

### Padding

Block Cipher必须要固定长度的plain text block，所以有时需要填充，但接收者需要能分辨填充内容和原文。

不采用以下方法：

* 末尾随机生成bytes
* 全添加0
* 添加固定信息，如“This is padding"

而采用以下规格：

**PKCS 5/7**

PKCS是一种方法，如果缺1 byte就填充01，缺2 bytes就填充0202，3就030303。如果不需要填充就加一个新的block，16161616...来表示结束。

PKCS 5就只能填8个byte的block，而PKCS 7就比较通用，什么块都能填。

### Block Cipher Modes

1.  ECB

    每块单独加密，加密块顺序同明文块，原文块相同则密文块相同

    <figure><img src="../.gitbook/assets/image (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

    <figure><img src="../.gitbook/assets/image (2) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="375"><figcaption></figcaption></figure>
2.  CBC

    每一块都和前一块的结果XOR，第一块和Initialization Vector(IV) XOR，可解决重放攻击。

    <figure><img src="../.gitbook/assets/image (3) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="375"><figcaption></figcaption></figure>

    <figure><img src="../.gitbook/assets/image (4) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

    <figure><img src="../.gitbook/assets/image (5) (1) (1) (1) (1) (1) (1).png" alt="" width="375"><figcaption></figcaption></figure>

    <figure><img src="../.gitbook/assets/image (6) (1) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

    <figure><img src="../.gitbook/assets/image (7) (1) (1) (1) (1).png" alt="" width="375"><figcaption></figcaption></figure>

    CBC用到的一种思想：Probabilistic Encryption

    使用随机元素让加密变得独一无二，CBC用了IV。

    然而，IV一定要是随机的，而不能使固定的，曾经的Zerologon漏洞就让Windows有了安全漏洞。

    > windows的rpc（远程身份调用）采用了CFB8，CFB8本身有IV，但windows在实现的时候固定了IV为0。AES-CFB8采用0 IV，所以全0原文出来就是全0密文。



    > 另一个例子是Playstation盗版卡带事件。索尼游戏卡带分为两部分：用户数据和游戏数据，如图所示。盗版商的目的是获得未被K加密的Game和Data。由于不知道K，不能获得。
    >
    > 破解方法是这样的：由于游戏卡带中游戏本体数据不变，但用户数据常变化，如果使用CBC加密就太浪费算力了，所以使用互不影响的ECB加密模式。而这样就出现了问题：用户可以通过改变用户数据从而探测到用户数据的边界，进而把绿色的用户数据删掉，替换成蓝色的游戏数据。由于Playstation会解密用户数据，所以盘安装上之后，绿色部分被自动解密，也就是游戏数据被自动解密，这样盗版商就拿到了游戏数据，进而可以批量盗版。



    <figure><img src="../.gitbook/assets/image (8) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>
3. CTR

<figure><img src="../.gitbook/assets/image (9) (1) (1) (1) (1).png" alt="" width="375"><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (13) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

我们发现，CTR并未对原文直接进行加密，而是同加密IV+CTR进行异或，这就出现了问题。

如我们密文目前C1 = B1 XOR E(IV)

这个等式可以变成 C1 XOR A = B1 XOR A XOR E(IV)

也就是说，我们可以在不知道Key的情况下，如果知道原文，我们就可以替换目标密文，很危险。
