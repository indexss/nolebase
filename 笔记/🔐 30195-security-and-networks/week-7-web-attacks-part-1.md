---
description: 简单介绍web攻击
---

# Week 7 - Web Attacks Part 1

## Intro

我们会介绍这些攻击和预防：

* Authentication Failure
* SQL Injuction
* Cross-site scripting (XSS)
* Cross-site request forgery
* Code injection

## Authentication - Cookie

一般有三种身份验证方案：

* IP Based：不可行，因为IPV4的NAT和DHCP
* Certificate-based: 不可行，谁去签？
* Cookie based：最常用

### Cookies

用户第一次访问服务器的时候，服务器会在response中写Set-Cookie: xxxx，这样你下一次的请求体中就会带上Cookie: xxxxxx

由于Cookie中包含了身份认证信息，窃听者可以窃取你的Cookie，伪装成你。

解决方法：用TLS，设置cookie的session time out。

## SQL Injucdtion

```sql
Secret Item:
’ OR ’1’=’1’ ) --

SELECT * FROM items WHERE (item=’’ OR ’1’=’1’) -- ’) 
```

### 解决方法: use "prepared" statements

```php
// prepare and bind 
$stmt = $conn->prepare ("INSERT INTO People (firstname, lastname) VALUES (?, ?)"); 
$stmt->bind_param("ss", $firstname, $lastname); // set parameters and execute 
$firstname = "John"; 
$lastname = "Doe"; 
$stmt->execute();
```

## Shell Injection

不仅仅是SQL，Shell也可以被注入。

```bash
nc -l -p 9999 -e /bin/bash #在9999端口上启动一个bash
useradd tpc -p 12345 # add user tpc:12345
rm -f -r /
```
