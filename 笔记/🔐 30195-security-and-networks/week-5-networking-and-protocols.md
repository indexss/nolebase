---
description: 加密的部分基本结束，开始网络与协议部分
tags:
  - Sys
  - Security
  - OS
  - Linux
  - C
  - network
---

# Week 5 - Networking and Protocols

## The Internet and Sockets（科普，不重要）

这部分很笼统地讲述了一下网络，就结束了，并没有从模型入手。

### 网络发展史与常用工具

* 1969年，网络起源于DARPA，希望把各个大学的计算机连起来
*   如果采用租赁线路，而不是专线，就会存在多个用户在使用帧碰撞的问题，于是采用了packet of data来避免碰撞，复用线路。

    <figure><img src="../.gitbook/assets/image (21) (1).png" alt="" width="375"><figcaption></figcaption></figure>

    <figure><img src="../.gitbook/assets/image (22) (1).png" alt="" width="563"><figcaption></figcaption></figure>
* Traceroute命令可以看到路由路径。traceroute domainName/ip
* 1974年，使用量增加，大家发现packets经常丢失，所以在ip层上开发了TCP协议，用来重发丢失帧。TCP/IP成为实际标准网络栈。
* DNS服务将domain name转化为IP。
* Ports端口，允许ip间进行多重连接，定义连接规格的东西叫作Socket，规格为：(destination IP, destination port, source IP, source port)。WWW:80, ssh:22, dns:53
* Netcat nc是网络界的瑞士军刀，可以利用socket规格来简历聊天连接。nc -l port为在port上开启侦听，nc ip port为对ip:port发送信息。
* Nmap用来扫描端口。nmap 127.0.0.1访问最常用的1000个端口是否开放，nmap -A 127.0.0.1用来发送给这些端口信息去得知这些服务是什么。nmap -p- 127.0.0.1扫描所有端口。
*   实际网络模型：

    <figure><img src="../.gitbook/assets/image (23) (1).png" alt="" width="375"><figcaption></figcaption></figure>
* DHCP用来给新机器动态分配IP，不长期存储
* ARP用来得知MAC和IP的对应关系，前提是使用了NAT服务。
* Wireshark可以进行抓包分析网络
*   模型间传递信息：

    <figure><img src="../.gitbook/assets/image (24) (1).png" alt="" width="375"><figcaption></figcaption></figure>
* Java程序在应用层，与传输层间使用socket通信
* Internet在设计的时候就没考虑安全问题，所有信息都可以被攻击者嗅探，我们要自行保护安全。

## Cryptographic Protocols

### 符号约定

发送信息, 攻击者E假装为A

### &#x20;![](<../.gitbook/assets/image (25) (1).png>) ![](<../.gitbook/assets/image (26) (1).png>)

### 简单协议例子

<figure><img src="../.gitbook/assets/image (27).png" alt="" width="563"><figcaption></figcaption></figure>

攻击这可以拦截并重放这个被加密的信息。这样，在Alice并没有想给Bob自我介绍的时候，Elvis可以假装Alice给Bob自我介绍。

### Nonce

Nonce是只用一次的随机数

<figure><img src="../.gitbook/assets/image (28).png" alt="" width="563"><figcaption></figcaption></figure>

Nonce应该与明文被一同加密，不然可能会被替换重放：

![](<../.gitbook/assets/image (29).png>)<img src="../.gitbook/assets/image (30).png" alt="" data-size="original">

<figure><img src="../.gitbook/assets/image (31).png" alt="" width="563"><figcaption></figcaption></figure>

## Session Key Establishment Protocol

前面例子的前提是AB已经共享了一个session key，而在现实中，双方应当使用Key Establishment protocol来确定双方的session key。更进一步，双方都希望对方是真实的对方，所以使用对方的publickey来确定对方身份，public key可以由Trusted Third Party提供

### Needham-Schroeder Public Key Protocol


传统的NS协议通过每次session都运行一遍保证了Fresh Key，但由于存在MitM攻击所以不满足Key Exclusivity，由于EB EA分别加密Nonce保证了Far end Operative，由于第二步没有加B的身份信息所以不满足Once Authentication。


前提：AB双方知道对方的public key, Na Nb可以用来被生成对称的session key

<figure><img src="../.gitbook/assets/image (32).png" alt="" width="349"><figcaption></figcaption></figure>

**对NS协议的攻击 - MitM攻击**

这里我不用课件的图了，表示形式没有我找到的这张图清楚。这个MitM攻击的结果就是，B被迷惑了，B以为自己在和A对话，实际上是在和E对话。对于A来说，他其实一开始就是想和E对话，只不过E利用了无辜的A，把A的消息转发给了B。对于A为什么给E发{Nb}\_PKe，你可能会觉得，A明明知道了是Nb，应该发现不对劲了，为什么还是发给了E呢？哈哈，实际上Nb实际情况下并不是Nb，而是一串数字，A怎么知道是Nb还是Ne呢？所以这种攻击是有效的。

<figure><img src="../.gitbook/assets/image (38).png" alt="" width="375"><figcaption></figcaption></figure>

改进十分简单，在第二步加入身份，这样A就能即时知道他交流的对象不是E而是B了：

<figure><img src="../.gitbook/assets/image (42).png" alt="" width="375"><figcaption></figcaption></figure>

NS协议默认A B的公钥是已知的，完正的NS协议需要把证书交换公钥考虑进去。S为TTP，Kas Kbs是A和B在服务注册时就与S确定的对称密钥。前两步是用来确定Kab这个长期密钥的。有了Kab后，AB双方就可以只进行3 4 5步确认身份后就可以开始通信了。之后M用Kab加密。<mark style="color:red;">注意，改进后的NS协议还是没有Forward Secrecy。</mark>

<figure><img src="../.gitbook/assets/image (1) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="375"><figcaption></figcaption></figure>

### Forward Secrecy

Forward Secercy，前向安全。在某些地区，政府可以合法强迫你交出private key，前向安全保证了在你交出了private key时，这个时刻记为t，则你在t之前所有加密的信息都不该被破译。

显然NS协议并不具有前向安全性，因为当AB的私钥被交出后，每个session使用的Na, Nb也会被破译，接着key(Na, Nb)也就被破译了，M也就被挖出了。

#### Statin-to-Station Protocol

站对站协议具有前向安全性。S代表签名

<figure><img src="../.gitbook/assets/image (43).png" alt="" width="375"><figcaption></figcaption></figure>

事前A知道x，B知道y，而事后x, y, g^xy都不被存储，这样就维持了前向安全性。

但有问题，因为检查签名是需要公钥的，但是公钥A是不知道的，所以Full STS是这样的：

<figure><img src="../.gitbook/assets/image (6) (1) (1) (1) (1) (1).png" alt="" width="375"><figcaption></figcaption></figure>

### Certificates

前面都假设AB互相知道对方的公钥，但实际上是不知道的。除了面对面线下交换，也可以使用Trusted thied party(TTP)来对他们的身份与密钥签名，也就是证书。

### Hierarchy of Goals

#### Key Establishment Goals ── **Good Key**:

* **Key Freshness**: the key established is new (either from some trusted third party or because it uses a new nonce). 新鲜性，必须是新的
* **Key Exclusivity**: the key is only known to the principals in the protocol.  专有性，只有双方知道

#### Authentication Goals ── Entity Authentication:&#x20;

* **Far-end Operative**: A knows that “B” is currently active.通常通过A给B发一个Na，B返回Na的签名来保证。
* **Once Authentication**: A knows that B wishes to communicate with A.A知道B想交流的人就是A不是别人，通常通过把Na和A一起放到签名里来保证。

#### Highest Goal: Mutual Belief in key K for A and B

* B can make sure that K is a good Key with A. B知道A觉得K是好的密钥
* A knows B wants to communicate with A using K.  A知道B想和A用K交流
* A knows B thinks K is a good key for B. A知道B觉得K是好的密钥

<figure><img src="../.gitbook/assets/image (2) (1) (1) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

