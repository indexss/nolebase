# Week 10 - Buffer Overflow

## Week 10 Buffer Overflow

> 本课程所有攻击基于32bit，但大多数在64bit上一样

### Intro

C语言是不带自动的内存管理器的，如果错误地管理了内存，那么attacker可以利用这些漏洞来让你的应用跑arbitrary code.

```c
 void getname(){
   char buffer[32];
   gets(buffer);
   printf("%s\n", buffer);
 }
 ​
 int main(){
   printf("enter:\n");
   getname();
   return 0;
 }
```

这个里面就有buffer overflow的风险，因为gets没有限制用户输入长度，可以远长于32位，那么就可以覆盖EIP，运行arbitrary code.

### Stack

对于这个程序：

```c
 void main(){
   function (1,2);
 }
```

栈是这么运作的：

首先，压参数入栈，顺序一般是逆序，但是由编译器决定。考试中会告诉你顺序。然后存旧的EIP（return address）和旧的EBP（old stack）

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240412042722379.png" alt="" width="375"><figcaption></figcaption></figure>

然后，EBP跑到old ebp上面，esp继续向上挪，这一部分就是function的工作空间。EIP跳转到function的代码中。

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240412042907790.png" alt="" width="375"><figcaption></figcaption></figure>

跑完function之后，EBP根据old EBP回到正确位置，ESP回到参数上面。ESP怎么回到原来的位置呢？ESP首先回到目前EBP的位置，然后进行依次pop，指到old eip，然后在进行一个ret操作，ret也会弹出栈顶的值，那么ESP就指到了1的上方。

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240412043004312.png" alt="" width="375"><figcaption></figcaption></figure>

### Buffer Overflows

EIP指向了代码运行的地方，而EIP会被存在栈里面，那么我就可以通过buffer overflow来覆盖eip的内容，从而操控return地址。

例如：这个代码

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240412044134379.png" alt="" width="563"><figcaption></figcaption></figure>

用户正常使用的是这样的：

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240412044159237.png" alt="" width="563"><figcaption></figcaption></figure>

用户乱输入一堆是这样的：

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240412044216934.png" alt="" width="563"><figcaption></figcaption></figure>

用户有目的性的覆盖EIP是这样的：

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240412044243114.png" alt="" width="563"><figcaption></figcaption></figure>

如果跳转地址代码在stack内，那么就可以这样执行代码：

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240412044334552.png" alt="" width="563"><figcaption></figcaption></figure>

那么这个CODE一般会inject什么呢？

一般会注入

`exec("/bin/sh", {NULL}, NULL)`

这玩意会帮你启动一个shell，你就可以胡作非为。

当然现代linux系统会有保护，所以你要在exec之前先跑一个这个：

`setuid(0)`

### Defense

#### Hardware - NX-bit

直接加以硬件隔绝，当EIP指向stack的时候，程序自动崩溃

#### 破解NX-bit

太简单了，我们不让EIP指向stack中，而是指向已经有的代码，在data段中的代码。我们一般会让它指向libc，因为这个库基本都会include，且功能强大。libc有system这种函数，可以直接执行shell命令。

我们也可以自己缝合代码，不断的return到代码的某个地址，不断stitch缝合出自己的代码。这个叫Return oriented programming

#### ASLR - Address Space Layout Randomization

很简单的想法，就是每次program运行的时候，给stack段和code段的base加一个随机的offset，让你猜不到你想要的地址到底在哪。

#### 破解ASLR - NOP slide

在x86指令集中，0x90是do nothing，也叫NOP。

假如说stack段2MB, 那么我们注入999000 bytes个0x90后跟shell code。这种覆盖大块内存，ASLR提供的小offset根本无法影响我们的结果。多运行几次，当运气号运行到0x90的时候，代码就会slide down到我们的shell code

#### Metasploit

* Metasploit是一个用于测试和执行已知缓冲区溢出攻击的框架。
* 如果应用程序中存在漏洞并且广为人知，那么可能会有相应的补丁，也可能会有Metasploit模块。

\
