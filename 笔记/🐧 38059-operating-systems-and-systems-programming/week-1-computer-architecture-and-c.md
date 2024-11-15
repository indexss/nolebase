# Week 1 - Computer Architecture & C

### 冯·诺伊曼系统

从应用场景的角度来说，曾经计算机分为两种：

* Application Specific Computer
* General Purpose Computer

Application Specific Computer的bottleneck在于，Programming required major re-wiring.

为了改进这一点，冯·诺伊曼发明了von Neumann Architecture system，是stored-program computer， a computer that stores program instructions in memory.

VNA的优点就是Re-prrogramming doesn't requrire any hardware modifications

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240328063807830.png" alt="" width="375"><figcaption></figcaption></figure>

#### CPU

由两个主要部件组成：Control Unit(CU) & Arithmetic and Logic Unit(ALU)

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240328064026497.png" alt="" width="375"><figcaption></figcaption></figure>

ALU负责实施具体的运算。

CU负责：

* Retrieves the operands
* Ask ALU to compute symbol "\*" or "+" ..
* Store the result
* Jumps to next line

**ALU**

ALU是执行arthmetic和logical operations的电路的union。

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240328065234890.png" alt="" width="563"><figcaption></figcaption></figure>

**CU**

负责程序运行阶段指令一条一条的执行。

**Register**

Register是靠近ALU的small storage elements。

register用于暂存计算中的数据

ALU可以很快从register中读取数据

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240328065441478.png" alt="" width="375"><figcaption></figcaption></figure>

**register的优点**

VNA computer的三个主要部件中没有寄存器，可以用Memory去存数据。缺点就是内存的读写相比register的读写还是慢，且对于多次使用的元素，每次使用都要读取。用寄存器的话可以把多次要使用到的元素存在寄存器中，读取一次，而ALU从register中读data是0 time overhead的，所以更快。

**改进后CPU**

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240328065846884.png" alt="" width="375"><figcaption></figcaption></figure>

#### Memory

内存用于存both program instructions and data.

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240328064409407.png" alt="" width="375"><figcaption></figcaption></figure>

对于程序员来说，我们将memory视为storage element

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240328070157342.png" alt="" width="375"><figcaption></figcaption></figure>

Memory由很多cells组成，每个cell能存一小段数据，每个cell都有自己的address。 E.g. 0 \~ N-1

在数据read/write操作发生时，CPU生成要存/取的内存地址，Memory Management Unit(MMU，一个CPU模块)从对应的地址读写内容。

C语言中，用指针来操纵内存。

#### I/O interfaces

I/O用来接收和发送来自连接设备的信息。链接的设备（monitor, keyboard, mouse）叫作peripheral devices（外围设备）。

#### Run Program on VNA computer

```
 main(){
   readIO a;
   readIO b;
   c = a + b;
   store c;
   d = a - b;
   print d;
 }
```

1. 程序存在memory中
2. CU读到readIO，理解到数据a需要由用户输入
3. 用户从外围设备输入data，传到了ALU
4. b也传到了ALU
5. CU指挥ALU进行加运算，算出c
6. CU将ALU中计算得到的c拷贝到Memory
7. CU指挥ALU进行减操作，得到d
8. CU将ALU中计算得到的d发送到外围设备display

### C Program

由于作者比较熟悉这一块，很大部分内容都会被省略。具体内容请参考课堂slides

```
 char c = 'A', d;
```

这种写法中，d是un-initialized，包含garbage value initially。

***

Array size必须是constant，否则会causes malfunction

```
 int array_size;
 ... // user input
 int a[array_size] // 这样会报错
 ​
 //  ----------------
   
 int array_size = 4; //这样不会报错 
  
```

***

二维数组在内存中的映射关系

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240328071659493.png" alt="" width="375"><figcaption></figcaption></figure>

***

字符串最后有\0

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240328080036352.png" alt=""><figcaption></figcaption></figure>

***

strcpy(dest, src) - copy a string strcat(str, "abc") - concatenate two strings strlen(str) - get string length strcmp(str1, str2) - compare two strings

***

<figure><img src="../.gitbook/assets/image (51).png" alt=""><figcaption></figcaption></figure>

***

A byte consists of 2 Hex digits

a digit is called bit.

***

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240330005533715.png" alt="" width="375"><figcaption></figcaption></figure>

***

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240330005632725.png" alt="" width="375"><figcaption></figcaption></figure>

因为地址是8 bytes

***

**栈**用于存储函数的局部变量和上下文，它的操作是自动的；而**堆**用于存储程序运行时动态分配的内存，需要程序员手动管理。

***

char \*ptr = "Comp Sc"; 在只读数据段，不能修改

char arr\[] = "Comp Sc"; 在堆或者数据段，可以修改

***

### Practice Problems

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240331234344713.png" alt=""><figcaption></figcaption></figure>

> 1.2. use the I/O interfaces to store a value in the registers.
>
> 3. uses the ALU to compute the sum and stores the result in the register c.
> 4. stores the value of the register c in main memory.
> 5. uses the ALU to compute the difference and stores in the register d.
> 6. uses the I/O interfaces to print the value of d.

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240331234541473.png" alt=""><figcaption></figcaption></figure>

> Acces to registers inside the CPU is much faster than main mem- ory. You may save read and write-access to memory by using registers which is accessed frequently. The instructions given in the first ques-tion are an example: the registers a and b are used several times, saving memory access time.
>
> CPU内部寄存器的访问速度比主存储器快得多。您可以通过使用频繁访问的寄存器来节省对内存的读写访问。
>
> 第一个问题中给出的指令是一个例子：寄存器a和b被多次使用，从而节省了内存访问时间。

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240331234711774.png" alt=""><figcaption></figcaption></figure>

> Pointer store memory address.

![image-20240331234756133](file:///Users/linlishi/Library/Application%20Support/typora-user-images/image-20240331234756133.png?lastModify=1711900546)

> Pointer and arrays can be transfered each other. The name of the array is a Pointer that point the address of the 1st unit. If you allocated an array by using pointer, you can also visit the i th unit by using \*(p+i).

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240331235013731.png" alt=""><figcaption></figcaption></figure>

> Conclusion: swap the value the pointer px and pointer py pointed to.

6. What will be the output of this program?

```
 int main () {
   float arr[5] = {12.5,10.0,13.5,90.5,0.5};
   float *ptr1 = &arr[0];
   float *ptr2 = ptr1 + 3;
   printf ("%f\n", *ptr2);
   printf ("%ld\n", ptr2 - ptr1);
   return 0;
 }
```

90.5

3

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240331235334187.png" alt=""><figcaption></figcaption></figure>

> 2, 1

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240331235431728.png" alt=""><figcaption></figcaption></figure>

> String is stored as a continuous array of char in memory, 13bytes totle, 12 for hello world! and 1 for \0

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240331235649723.png" alt=""><figcaption></figcaption></figure>

> Copy t string into s.

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240331235750797.png" alt=""><figcaption></figcaption></figure>

> the same with 9

\


\
