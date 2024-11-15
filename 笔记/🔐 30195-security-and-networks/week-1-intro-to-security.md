---
description: Week 1 主要介绍了一下这门课要讲什么。
---

# Week 1 - Intro to Security


Rishi在课上给了一个取模算法 (Modular Arithmetic) 的例子。


## 课程大纲

Cryptography\
Access Control \
Introduction to Networking \
Security Protocols \
Web Systems and Attacks \
Other Common Attacks and Defenses

## 课程目标

▶Understand basic concepts of cryptography and SQL \
▶Understand basic concepts of cloud services, in particular storage \
▶Demonstrate an understanding of the threats to data stored on a computer, locally or in the cloud \
▶Demonstrate an understanding of the threats to data sent on the network \
▶Identify risks and use techniques to eliminate or mitigate them.

## 什么是网安？

Correctness and Efficient algorithem against an attacker.

### 我们保护什么？

取决于你的数字资产，具体来说，是Information and Infrastructure.\
例如：Sensitive Data, Control System, Hardware devices, etc.

### 如何保护？

转化一下，就是如何：

Security goal 设立安全目标\
estimate impact of attacks 估计攻击影响\
design mitigations 设计缓解措施

答：Analyse systems, spot vulnerabilities, build protection.

## 信息安全目标

**Confidentiality**: Attacker shoud not retrieve any information. 保密性：攻击者不得获取任何信息。

**Integrity and Authenticity**: Received data is authentic and the sender is genuine. 完整性和真实性：接收到的数据是真实的，发送者是真实的。

**Availability**: Data should accessible on demand. 可用性：数据应可按需获取。

## 潜在攻击者是谁？

所有人。

## 知名攻击

Ransomware 勒索病毒

Phishing 钓鱼

## Unix介绍

### file system:

<figure><img src="../.gitbook/assets/image (5) (1) (1) (1) (1) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

### 应知应会command

echo, mkdir, ls, pwd, cat, cp, mv, rmdir, rm, touch, locate(建库索引查找 快), find(实时查找 慢), grep, diff, du(disk usage, 列出目录下磁盘使用情况), head(cat 前十行), diff, tar(打包), top(性能监控), history(显示执行过的命令历史)

## Modular Arithmetic

17 mod 5 = 2    32 mod 5 = 2

乘法加法分配率都是双分配，也就是说，括号里面分配之后，括号外还要分配。

* 49 mod 5 = (17 + 32) mod 5 = (17 mod 5 + 32 mod 5) mod 5 = (2+2) mod 5 = 4
* 2^10 mod 5 = 4
* 2^11 mod 5 = (2 \* 2^10) mod 5 = (2^10 mod 5) x (2 mod 5) mod 5 = 4 x 2 mod 5 = 3
* 2^10 mod 17 = (2^5 mod 17)(2^5 mod 17) mod 17 = 15x15 mod 17 = 25x9 mod 17 = (25 mod 17)(9 mod 17) mod 17 = 8 x 9 mod 17 = <mark style="color:red;">4</mark>
* 2^100 mod 17 = (2^10 mod 17)^10 mod 17 = <mark style="color:red;">4</mark>^10 mod 17 = 2^20 mod 17 = (2^10 mod 17)^2 mod 17 = <mark style="color:red;">4</mark>^2 mod 7 = 16 mod 17 = 16

##



