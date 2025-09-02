---
description: 接着第7周讲web攻击
tags:
  - Sys
  - Security
  - OS
  - Linux
  - C
  - network
---

# Week 8 - Web Attacks Part 2


本讲座第二块内容讲了Automated Protocol Verification，但与考试无关，故不记录。


## Cross Site Scripting (XSS)

浏览器很愚蠢，它会执行服务器发来的所有指令，所以攻击者可以利用这一点强迫网站发一些他想要的内容给你。

如果网站在输入框上没有做好防护的话，攻击者就可以注入他的恶意JS脚本，而部分JS对客户端不可见，所以用户无法察觉。

### Reflected XSS

反射型XSS不会影响所有用户，只影响发起攻击的人

假设服务端代码这么写：

```java
String searchQuery = request.getParameter("searchQuery");
...
PrintWriter out = response.getWriter();
out.println("<h1>" + "Results for " + searchQuery + "</h1>");
```

如果我让searchQuery = \<script>alert("pwnd")\</script>，那么这段代码就被注入到了攻击者的网页中，只有攻击者能看到，其他用户不受影响

### Stored XSS

存储型XSS影响全部用户

服务端：

```java
String postMsg = db.getPostMsg(0); 
...
PrintWriter out = response.getWriter(); 
out.println("<p>" + postMsg);
```

postMsg = \<script>alert("pwnd")\</script>，那么所有用户都会收到弹窗。

### XSS Steal Cookie

JS可以获取Cookie并发回给攻击者，攻击者就可以伪装别的用户了。

### XSS Phishing

JS可以注入一个假的登录页面，拿到用户的账号密码，然后GG

### XSS Run Exploits

攻击者注入一段JS脚本对浏览器及其插件攻击，如果爆炸成功，那么用户的机器就会被安装恶意软件，从而变成僵尸网络的一部分。

### 解决方法：Sanitisation 消毒

将用户所有的输入内容消毒是很难的

消毒依靠上下文，比如\<script>, a:hover, \<a href="">

消毒依赖攻击类型，如js，SQL

可以复用[别人的消毒](https://cheatsheetseries.owasp.org/cheatsheets/Cross\_Site\_Scripting\_Prevention\_Cheat\_Sheet.html)。

#### 发现问题 1

<figure><img src="./assets/image (44).png" alt="" width="563"><figcaption></figcaption></figure>

清除输入值中的`<script>`标签，通过将任何出现的`<script>`标签（及其内容）替换为文字“SCRIPT BLOCKED”。

问题：

* 限制性太强，可能正常的输入也会被替换
* 浏览器接受格式错误的输入：\<script>malicious code<

#### 发现问题2 ： 推特bug

推特上如果用户post www.site.com，那么推特展示\<a href="www.a.com">www.a.com\</a>\
如果某人post了一个这样的东西

\`http://t.co/@"style="font-size:999999999999px; "onmouseover=".../\`

那么就会：

<figure><img src="./assets/image (45).png" alt="" width="375"><figcaption></figcaption></figure>

#### PHP提供消毒函数

<figure><img src="./assets/image (46).png" alt="" width="563"><figcaption></figcaption></figure>

## Cross Site Request Forgery (CSRF)

### CSRF流程

* A访问一个安全性很弱的网站，并登录，获得Cookie
* 攻击者攻击安全性很弱的网站，插入链接，诱导A访问攻击者的网站
* 攻击者的网站里面有一些自动提交表单的代码或者其他恶意代码，提交地址为那个安全性很弱的代码。
* 用户带着cookie和攻击者网站里面的js向原安全性弱网站发起请求，用户和攻击者代码被执行，GG

### 解决方法

* 检查Referer header。
  * Referer HTTP头是一个由浏览器发送的字段，表明当前请求是从哪个页面链接过来的。
  * 有时不起作用：
    * 攻击者常规方法无法更改Referer header，但可以用JavaScript或Meta标签诱导浏览器发出想要的header
    * 高级用户可以修改Referer头
    * 代理服务器和防火墙由于隐私问题可能会删掉header
* 每次提供表单时，都添加token，并在提交时检查其是否有效
  * 如果攻击者可以知道token是如何生成的，并拿到token，则无效
  * 如果token没有nonce，那么可能会被重放

## XML External Entities

XML使用时可以添加 external entity 从而访问外部文件，这就可以被利用。

<figure><img src="./assets/image (47).png" alt="" width="563"><figcaption></figcaption></figure>

## Broken Access Control

垃圾的权限管理有可能会带来攻击。比如，在该用post的时候用了get：

<figure><img src="./assets/image (48).png" alt="" width="563"><figcaption></figcaption></figure>

## Path Traversal

用户可能可以手动访问服务器的任何文件：

<figure><img src="./assets/image (49).png" alt="" width="563"><figcaption></figcaption></figure>

### Fix

使用Linux的Access Control来解决问题。给服务器创造一个特殊的用户，只能访问公共文件。

## Security Misconfiguration

安全相关的信息权限应该正确设置。例如

* 报错信息不应该被所有人看见
* 目录结构不应该被别人看到
* 管理员面板不应该被所有人能够访问

## Insecure Deserialisation

在用户可以上传文件的页面，用户上传文件之后，如果经过了不安全的反序列化，那么可能会被上传一些恶意文件并执行。例如可以修改请求来控制文件的后缀名，用户将恶意代码伪装成jpg图片上传到文件夹，结果进入文件夹之后变成了php代码，用户就可以访问执行。Assignment 4中的文件注入就是这样。

## Using Components with Known Vulnerabilities

如果一个新的补丁刚发布，但可能其本身就有安全漏洞，应当被验证后再使用。

## Insufficient Logging and Monitoring

未记录可审计事件, 未记录警告和错误消息, 日志未监控可疑活动 都会带来安全隐患。

