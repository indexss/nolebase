---
description: 讲解了HTTPS协议和Tor协议
tags:
  - Sys
  - Security
  - OS
  - Linux
  - C
  - network
---

# Week 6 - TLS & Tor

## SSL/TLS Protocol

### Basic Information

SSL (Secure Sockets Layer) 被更名为 TLS (Transport Layer Security)。

基于非对称加密提供加密的信息交流和身份认证

协议栈可以变化，例：RSA(非对称) + DES(对称) + DH(密钥交换)，是在运行前商量好的。

TLS跑在应用层和传输层（TCP/UDP）之间，加密解密操作对应用层透明。

<figure><img src="../.gitbook/assets/image (3) (1) (1) (1) (1) (1).png" alt="" width="188"><figcaption></figcaption></figure>

### X.509 Standard for Certificates

包含了主体，主题的公钥，颁发者姓名等等

颁发者对Certificates的哈希签了名

如果你相信这个颁发者，并通过了签名认证，则你可以相信这个公钥

### TLS流程

<figure><img src="../.gitbook/assets/image (1) (1) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

### TLS-DHE流程

引入DHE来获得Forward Secrecy。S知道x，C知道y

<figure><img src="../.gitbook/assets/image (2) (1) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

### TLS Cipher Suites

<figure><img src="../.gitbook/assets/image (3) (1) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (4) (1) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

### TLS Handshake

<figure><img src="../.gitbook/assets/image (5) (1) (1) (1) (1) (1).png" alt="" width="563"><figcaption></figcaption></figure>

### TLS Weeknesses

* Configuration Weekness
  *   Cipher downgrading

      选择Cipher suite是Client和Server取交集。攻击者可以迫使你选低级suite，从而攻击。
  *   Self-signed certificates

      公司如果服务器很多，维护证书的工作量就很大，有人就开始自签证书。自签的问题就是，public key可能会被替换，就很容易遭受MitM。
* Direct Attack against implementations
  * Apple's goto fail bug ： goto fail; goto fail;
  * [LogJam](https://zhuanlan.zhihu.com/p/32697829) ：将DF中的g^a g^b换成短的t\_a, t\_b，对DHE\_EXPORT有效。
  * [HeartBleed](https://zhuanlan.zhihu.com/p/32697829)

### TLS 1.3

2018新标准，删除了太弱的suites，简化握手提高效率，强制使用前向保密，除非实施MitM，否则无法被拦截。



## Tor

### VPN

直接网络连接会揭露你的ip地址，VPN承诺了匿名性，使对方看不到你的ip。

VPN通过加密和证书确保安全，目标服务器只能看到VPN提供者的ip，ISP只能看到你和vpn的链接，全局观察者可能能看出你的真实意图。你对于VPN提供者来说没有隐私。


首先明确一个概念，inbound(ingoing) IP 和outbound(outgoing) IP。对于服务器提供商来说，inbound IP就是用户访问服务器时需要的IP，而outbound IP是服务器在访问别的服务器或API的时候，对方看到的IP地址。inbound IP一般只有一个，而outbound可以有多个，这种设计是因为有的服务要占用相同的端口，设置多个outbound IP可以在不同的IP上用同一个端口，减少冲突。


例1：WIFI提供者：知道你的ip，知道你在连接到VPN（inbound IP），不知道VPN的outbound IP，也不知道你的目标服务器ip，也看不到你和网站交流的内容（加密）。

例2：VPN提供商：知道你的ip，当然知道你再连接vpn，知道vpn outbound ip，知道你浏览的网站，但不着调你和网站交流的内容（加密）。

例3：网站提供商：不知道你的ip，大概率不知道你在用VPN（但可能通过vpn的outbound ip猜出来你在用，但是服务器是不知道vpn的inbound的），知道VPN的outbound IP，当然知道你再浏览什么网站，当然知道你发来的内容是什么。

### Onion Routing Protocol

你可以使用多个代理来获得最佳隐私性。Onion Routing就是这样保证你的隐私的，Tor网络使用了Onion Routing Protocol。

每个Node仅知道前一个节点的ip和后一个节点的ip，每个node的公钥是已知的，源ip只有node1知道，目标ip只有node3知道，用户选择3个代理（node）。

<figure><img src="../.gitbook/assets/image (2) (1) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

### Tor完整流程

1. Bob在Tor提供的服务器中选择一些Introduction Points介绍点。介绍点是Tor网络中的中继node，客户端通过介绍点向隐藏服务器发送请求。Bob和介绍点间的通信经过3层加密。
2. Bob生成一对公私钥，公钥通过哈希之后转变为一个.onion地址，私钥保持私密。
3. Bob把公钥，介绍点，.onion地址发送到DHT（DB）中。DB不加密。
4. Alice通过某种途径知道了Bob的服务，于是查DB找到了Bob发布的详细信息，Alice拿到Bob的公钥和介绍点列表。
5. Alice在Tor网络中选择一个Rendezvous point会合点。Alice和会合点间有3层加密。
6. Alice给Bob写一段信息告诉Bob自己的会合点信息以及一个one time secret，用Bob的公钥加密，让介绍点转发给Bob。
7. Bob收到信息，用私钥解密知道了one time secert和会合点信息，Bob用与会合点建立3层加密隧道，这样Alice和Bob之间就有了至少6层的加密，Alice和会合点3层，会合点和Bob3层。one time secret用于Alice和Bob生成一个session key，保证信息在会合点上的安全，因为会合点可以拿到信息的明文。

### Anonymity != Security

Tor协议本身是安全的，但是并不代表你使用了Tor你就安全了。

例：FBI仍旧可以攻击罪犯服务器，植入恶意软件来攻破你的网站

例：用户ISP和被威胁的ISP不能相同，见[哈佛虚假炸弹案](https://arstechnica.com/information-technology/2013/12/use-of-tor-helped-fbi-finger-bomb-hoax-suspect/)。

例：卫报开发的[Securedrop](https://www.theguardian.com/securedrop)使用Tor来保证新闻线索提供人的匿名性，但仍有安全隐患。
