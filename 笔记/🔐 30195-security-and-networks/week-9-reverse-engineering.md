---
description: 简单介绍逆向工程
tags:
  - Sys
  - Security
  - OS
  - Linux
  - C
  - network
---

# Week 9 - Reverse Engineering

### Code Can be Data

在我们前面看到的网络攻击中，比如SQL injection，XSS（跨站脚本），Buffer overflow中，都是让服务器接收数据Data，而服务器误将Data运行，Data就成了Code

而反过来，Code也可以是Data。已经编译好的Binary code，或者executable code也可以被编辑。

### Binaries

Binaries被写为汇编语言，比Java byte code要底层的多，Assembly在一个cpu上能运行，在另一个上可能就不能。

Ghidra是一款开源的免费反编译工具。IDA pro是收费的

### Some x86 Commands

x86和8086的汇编基本没区别

PUSH, POP, CALL(execute function) JMP, RET,RETN,RETF(end a fund and restart calling code), MOV

#### 栈

在x86架构中，栈底指针为EBP，顶为ESP，x86的栈是反过来的，栈底内存地址更高，栈顶更低。一个cell为4byte。

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240411031832274.png" alt="" width="375"><figcaption></figcaption></figure>

当你push一个数之后，又pop，数据并没有被删除，而是ESP会向栈底移动一个cell（4）

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240411032241584.png" alt=""><figcaption></figcaption></figure>

对于带调用函数的程序，栈长这样。注意，下面是栈底，但内存高，从下到上调用参数的反过来的，EBP指向原EBP地址，也就是C的下面。

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240411031953888.png" alt=""><figcaption></figcaption></figure>

当函数运行结束后，栈就成了这样：

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240411032133754.png" alt=""><figcaption></figcaption></figure>

#### 顺序

x86的assembly并没有反过来，mov eax, \[esp+1Ch]就是吧右边移到左边。

#### Flags

* ZF：Zero Flag, 1 if result is 0
* SF: Sign Flag, 1 if result is negative
* OF: Overflow Flag, 1 if operation overflowed

#### Compare and Test

* CMP a b: a-b and set flags
* TEST a b: a and b and set flags

#### Jump

* JZ和JE一样：ZF=1就跳
* JNE和JNZ一样：ZF=0就跳
* JL：if less than，SF=1且OF!=1就跳

#### Patterns

P1:

```wasm
mov eax, [esp+1Ch]
add [esp+1Ch], eax
```

P2:

```wasm
cmp [esp+1Ch], 3
jle loc_80483DF
```

P3:

```wasm
mov [esp+4], eax
mov [esp], offset s1 ;"exit"
call _strcmp
```

第一行，存数据到栈上

第二行，存exit到栈上

第三行，call函数

### 常用的逆向密码技巧

* 使用strings，查看所有用到的string，找到像密码的试一试就可以了
* 使用debugger找到key test的过程并检查寄存器中的值
* 把JEQ和JNEQ替换一下，就可以运行到密码正确的分支
* 跳过整个执行check密码的代码

### 逆向防御

* 动态构建代码
  * attacker还是能运行代码
* 对binary加密
  * 你的程序肯定包含这key的明文，attacker还是能找到它
* 混淆代码，例如混合数据和代码，使其不清楚哪个是哪个
  * 可以将攻击速度减慢数月甚至数年！
* 使用online activation
* 需要在线内容
* 基于硬件的保护，即把代码的一部分存储和运行在防篡改的硬件中。
