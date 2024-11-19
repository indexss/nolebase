---
description: 本周内容比较多，但多数为intro类型
tags:
  - Sys
  - Security
  - OS
  - Linux
  - C
  - network
---

# Week 2 - Hash, MACs, Authenticated Encryption, Access Control


目前，通过密钥分发协议和对称加密可以保证密钥是安全的，但是我们仍需要检测ciphertext manipulation。这时候，Hash，MACs和Authenticated Encryption就可以解决问题。


## Hash

### 定义

A hash of any message is a short string generated from that message.

### 特性

1. 同一个字符串Hash后结果总是相同
2. 任何对原文小的修改都会对Hash后的结果影响很大，完全不同
3. 找出Hash函数的逆函数很困难
4. 找到两个不同的原文，但拥有相同的哈希值很难。

### 对Hash的攻击

1. Preimage attack: 前像攻击，碰运气找一个M，使得Hash(M) == 被Hash的原文。几乎不可能实现
2.  Collision attack: 找两个不同的信息，拥有相同Hash值。

    对于一个安全的Hash，如果哈希出n位，那么应该计算2^n/2次才能找到碰撞。

    推导：

    <figure><img src="../.gitbook/assets/image (13) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>
3.  Prefix collision attack:&#x20;

    攻击者可以选择两个不同的前缀p1和p2,然后附在不同的字符串m1,m2前面，那么有：

    ```java
     hash(p1 ∥ m1) = hash(p2 ∥ m2)
    ```

### Birthday Paradox 生日悖论

至少要多少个人，使得其中有两人生日相同的概率为50%？

答案是23。23人，就有C 23 2 = 23\*22/2 = 253对生日。而两个人生日不同的概率是364/365，那么都不同的概率是364/365 ^ 253 == 0.4995。

这个例子说明了很容易碰撞。

### Hash函数举例

#### SHA Family

1993年 NIST发明了SHA-0。1995年改进修复为SHA-1。

1.  SHA1

    生日攻击应该需要2^80次哈希test，但2005年有人发现了2^63次的攻击，所以没人相信SHA1了。
2.  SHA2

    用了更长的Hash，256bits or 512bits。但由于基于SHA1，和SHA1有同样的弱点，密码学家不满意。
3.  SHA3比赛

    2008年10月31号开始，在2014年被用作NIST标准。

#### MD Family

MD4和MD5都不安全，但如果只关心preimage attack的话，或者只关心完整性的话，还可以 MD6就是Ron Rivest对SHA3做出的修改。很好用。



## Message Authentication Codes

### 介绍

MACs和MD5 Hash校验的思想比较相似，但是不太一样。MACs可以校验信息来源和信息完整性，而MD5只能验证信息完整性。

MACs思想：use a key to ensure that message has not been changed

例子：

<figure><img src="../.gitbook/assets/image (2) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

可以看到，MACs实际上就是数字签名的对称加密版本。

### 对MACs的攻击

Length extension attack：Add data to a MAC withoud knowing the key.

原理：很多MAC是通过MD Hash实现的，而MD有个特点，如果攻击者能够获得一个消息$$M$$的散列值$$H(M)$$和该消息的长度，即使不知道消息内容，也能够计算$$M$$加上某个附加数据$$D$$后的散列值$$H(M∥D)$$。一些MAC是这样实现的：$$MACk​(M)=H(k∥M)$$。

### 分块加密 Block Cipher Modes

#### CBC

<figure><img src="../.gitbook/assets/image (3) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt=""><figcaption><p>CBC mode</p></figcaption></figure>


IV与块同长，第一个IV随机选择，不需要保密，后面的IV均为前一个的密文。

CBC解密基于这个式子：对于 A1 xor A2 = B1, 那么有B1 xor A2 = A1

流程为，先通过key解密，再和IV（前一个的密文异或），得到块明文，最后再拼接。


CBC MAC：

<figure><img src="../.gitbook/assets/image (6) (1) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (15) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>


注意！\[LI Security and Networks 2022-23]

看到最后一个块添加了len(m)。原因是会被攻击。

假如我们的原信息m，被分为m0 .. mt-1块

而我们有一个信息m'0, 满足m'0 != m0 但是hash(m0) == hash(m'0)，由于第一块不收到前面加密的约束，那么第一块就可以被替换，这样m'0 // m1 // .. //mt-1结合成的假信息m''和m就有相同的tag（MAC）。

为什么加了一个len就可以解决呢？因为即使有m'0 != m0 hash(m0) == hash(m'0)的情况存在，但是很难有len(m'0) == len(m0)。所以多添加一层验证就能解决问题。


Hash MAC:

<figure><img src="../.gitbook/assets/image (5) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="375"><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (16) (1) (1).png" alt="" width="188"><figcaption></figcaption></figure>

### Broken Hash to MAC 用CBC MAC替换垃圾的Hash MAC

<figure><img src="../.gitbook/assets/image (7) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

一般用AES加密。块加密模式还有CBC，ECB和CTR，后面会提到。

**注意**：如果我知道了原文的话，我可以替换CTR加密的密文，从而攻击。这个在assignment 2里有用到。

## Authenticated Encryption Modes

前面提到的原文攻击，可以通过Authenticated  Encryption Modes解决。

原理是：当只使用AES加密后，你无法知道一段文字是密文还是被篡改的密文。认证加密的一般做法是把MAC加到密文中，这样，你就可以通过MAC（类似签名）来判断密文有没有被篡改了。

### CCM mode

CCM全称为CTR with CBC-MAC，CCM不复杂，但被证实是安全的。过程如下：

1. 用AES CBC生成MAC（Tag）
2. 原文P并行通过CTR加密，等Tag算好后也用CTR加密，由于CTR可以并行执行，所以把密文拼接起来就行。

<figure><img src="../.gitbook/assets/image (14) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

## Access Control

Access Control就是Linux中的文件权限管理，分别管理创建者，同用户组，其他人的读，写执行权限。

### Access Control Matrix

这是一个有关所有实例权限的矩阵，问题是维持这一个矩阵十分困难，且矩阵被破坏后，所有的控制权就都丧失了，代价太大，应当分布式存储。

<figure><img src="../.gitbook/assets/image (8) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

### Access Control Lists (ACLs)

我们不想存一个巨大的矩阵，所以用ACL。思想：把文件和他的权限信息存在一起。

UNIX中的ACL：

<figure><img src="../.gitbook/assets/image (9) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

目录权限指示符含义：\


<figure><img src="../.gitbook/assets/image (10) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

程序指示符：

有时会看到s。

<figure><img src="../.gitbook/assets/image (11) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

在主人运行位上的s是setuid，运行该程序的人会在程序运行的时候以主人的身份运行。

在组运行位的s是setgid，不是以启动它的用户所属组的权限运行，而是以拥有该文件的组运行。换句话说，进程的 `gid` 与文件的 `gid` 相同。

### 不同的用户指示符

对于进程的PCB，里面会存着这样的uid：

* real uid : ruid, 所有者的uid
* effective uid: euid, 运行者的uid。一般与root不同，但是如果程序有setuid位，那么euid = ruid。euid设定了除访问文件系统外其他内容的访问权限，而对文件系统的权限，由fsuid设定。
* file system uid: fsuid, 决定了一个进程在尝试访问文件系统中的文件或目录时，系统如何评估该进程的权限。一般与euid相同。
* saved user uid: suid, 当euid被更改时，旧的euid会被保存为suid。非特权进程只能把euid改为ruid或者suid。

### 授予更高权限的危险

1. 用户能够运行更高权限的进程
2. 如果passwd程序中有编程错误，那么可以使用root权限进行计算机操控
3. 竞态条件问题：在检查“是否能被访问”和“实际访问”期间，如果文件的权限被修改，或者文件本身被修改（如assignment 1中的链接），那么就可能导致危险行为

原则：Principle of Least Privilege.

## Storing Password

密码不以明文存储，而是以哈希后密文存储。

更进一步，会存储(Salt, Hash)，其中Salt是盐值，Hash是原文和Salt的哈希值。这样，同密码的两个用户就会有不同的哈希值。

### Windows密码哈希

windows将密码哈希存储在system32/config/SAM，这个文件要Admin等级才能阅读，这个文件被另一个key加密。

由于Windows采用密码哈希的缓存与SAM对比进行密码校验，就会产生危险。攻击流程为：通过某种方式获得一个普通用户的账号密码，然后使用windows的漏洞进行越权，变为admin，然后就把windows管理员的密码哈希文件传给自己。这样就可以通过这个缓存文件登录管理员账号了。

也可以用Linux启动电脑，然后窃取SAM文件

### 密码窃取与保护措施

1. 用户名和密码可能会被钓鱼。最好的防护方法：
   1. 多因素认证: multi-factor authentication
   2. 公钥认证
2. 密码注入：通过拿到硬盘找到密码文件，注入自己的hash。
   1. 全盘加密
3.  电池安全：BIOS权限很大，通过蛮力破解BIOS密码几乎不可能，但扣掉电池可以重设密码。

    <figure><img src="../.gitbook/assets/image (12) (1) (1) (1) (1).png" alt="" width="375"><figcaption></figcaption></figure>

总解决方法：

1. 为重要文件加密
2. 全盘加密，但有问题，key可以被brute force，且在休眠状态不安全。



