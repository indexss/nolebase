# Week 2 - Memory & Structures

### Memory

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240330011532299.png" alt="" width="188"><figcaption></figcaption></figure>

Text段，包含程序，可执行的指令

两个Data段分别包含已初始化和未初始化的全局和静态变量

Stack段用于存储所有局部或自动变量。当我们向函数传递参数时，它们被保存在堆栈中

Heap段用于存储动态分配的变量。**注意，图只是演示，heap段不一定从data段后开始**。

栈从高地址到低地址存

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240330012211034.png" alt=""><figcaption></figcaption></figure>

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240330012303101.png" alt=""><figcaption></figcaption></figure>

***

Local Variable暂时在stack段中，生命周期为那个函数

static variable存在data段中，数据会被保存，作用域为那个自己的函数。生命周期为全部程序。

global变量存在数据段中，作用域为所有函数，生命周期为全部程序。

***

### Pass-by-reference and Pass-by-value

pass by reference就是将指针作为参数传入。

***

函数可以返回指针

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240331223220376.png" alt=""><figcaption></figcaption></figure>

***

陷阱：不要返回一个函数内部变量指针

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240331223621351.png" alt=""><figcaption></figcaption></figure>

***

### Dynamic Memory Management

stdlib.h中提供了动态内存申请的函数

malloc():

```c
 int *p;
 // Block of memory is allocated
 if((p= (int *) malloc(3*sizeof(int)))==NULL){
   printf("Allocation failed");
   exit(-1);
 }
 // [Some statements involving p]
 // Block of memory pointed by p is released
 free(p);
```

1. 从Heap申请连续的内存空间
2. 返回第一个字节的申请到的空间
3. 如果申请失败，得到NULL指针

***

Memory leak：申请了，但没有free()ed。就是内存泄露。在C中，防止内存泄漏是你的责任

可以使用valgrind来检查是否有内存泄漏问题。

```bash
 valgrind --leak-check=full ./a.out
```

***

在现代操作系统中，应用使用的内存在应用结束时应该被释放

* 如果这个泄露内存的程序只跑短时间，那么没有严重问题
* 如果这个泄露内存的程序会跑很长时间，那么就会有问题

***

内存泄漏例子：

```c
 int main(){
   int *p1,**p2;
   p1 = malloc(sizeof(int));
   *p1=7;
   p2 = malloc(sizeof(int*));
   *p2=p1;
   return 0;
 }
```

![image-20240331224745953](file:///Users/linlishi/Library/Application%20Support/typora-user-images/image-20240331224745953.png?lastModify=1711898913)

这样会泄露出去4+8

***

```c
 int main(){
   int *p1,
   **p2;
   p1 = malloc(sizeof(int));
   *p1=7;
   p2 = malloc(sizeof(int*));
   *p2=p1;
   free(p1);
   return 0;
 }
```

这样会泄露8，因为p2指向的东西没有被释放

***

```c
 int main(){
   int *p1,
   **p2;
   p1 = malloc(sizeof(int));
   *p1=7;
   p2 = malloc(sizeof(int*));
   *p2=p1;
   free(p2);
   return 0;
 }
```

这样会泄露4，因为7没有被释放，只有那个指向7的指针被释放了

***

```c
 int main(){
   int *p1,
   **p2;
   p1 = malloc(sizeof(int));
   *p1=7;
   p2 = malloc(sizeof(int*));
   *p2=p1;
   free(p1);
   free(p2);
   return 0;
 }
```

***

不要对一个地址双重释放两次，不然会崩溃。因为在可用blocks中，会出现两个p1。

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240331232724419.png" alt=""><figcaption></figcaption></figure>

***

### Struct

typedef定义shortcut

![image-20240331233302725](https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240331233302725.png)

***

s -> x is a shortcut for (\*s).x

```c
 struct list_t {
  int elem;
  struct list *next;
 }
 myList = malloc(sizeof (struct list_t));
 myList→elem = 4;
 tmp = malloc(sizeof (struct list_t));
 tmp→elem = 5;
 myList→next = tmp;
 tmp→next = NULL; // indicates end of list
```

***

### Safe Strings

所有直接将用户输入存储为字符串的函数都存在潜在的安全风险，因为字符串的长度是未知的，不应该使用。例如：scanf "%s" 和 gets。

```c
 #include <stdio.h>
 #include <string.h>
 int main () {
   char src[40];
   char dest[100];
   printf ("Enter source string: ");
   fgets(src, 40, stdin);
 ​
   strcpy(dest, src);
   printf ("Destination string: %s", dest);
   return 0;
 }
```

```c
 #include <stdio.h>
 #include <string.h>
 #include <stdlib.h>
 int main () {
   char *str = NULL;
   size_t n = 0;
   //缓冲大小
   int res;
   printf ("Enter source string: ");
   res = getline(&str, &n, stdin);
   if (res == -1) {
     printf ("Could not read from terminal, exiting\n");
     exit(1);
   }
   printf ("Length is %ld\n", strlen(str));
   return 0;
 }
```

Practice Problems

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240401134734718.png" alt=""><figcaption></figcaption></figure>

> **Local**: The domain is within the bracket({}). In the domain, the variable is valid, out of the domain, it is invalid. The memory is allocated automatically.
>
> **Heap**: the memory in heap can be allocated by user and it will not be released unless user release it manually. And it's valid in. the whole program.
>
> **Global**: is valid in the whole program, but a local variable can be defined with the same name as global in the its domain. The memory is allocated automatically.
>
> **static variable**: static variable is only valid in the block but the value will be preserved. The memory is allocated automatically.

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240401135521166.png" alt=""><figcaption></figcaption></figure>

> 调用函数foo会创建一个包含变量a、n和i的堆栈帧。在函数foo执行完毕后，这些变量将无法访问。
>
> ```c
>  void foo (int *a, int n) {
>    int i;
>    for (i = 0; i < n; i++) {
>      printf ("a[%d] = %d\n", i, a[i]);
>    }
>  }
> ```

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240401135656357.png" alt=""><figcaption></figcaption></figure>

> the memory of a local variable we be released and inactive after the function excuted. So you will return an invalid memory. This behavior is unpredictable.
>
> ```c
>  int *foo(){
>    int i = 4;
>    return &i;
>  }
> ```

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240401135926450.png" alt=""><figcaption></figcaption></figure>

> if you pass by value, the function will create a new stack and make a copy for all of the value that you paseed in, so the modification on these values is invalid for the original valuable. But if you psss by reference, the modification will effect the value that stored in the corresponding address, so it will affect the original valuable.

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240401140213898.png" alt=""><figcaption></figcaption></figure>

> Temp is a local variable, so the problem is the sanme in Q3.

6.  The following unfinished C program declares an array of four pointers in line 5. Using nested for loops with counters i and j, complete the unfinished program to construct the two-dimensional matrix

    <figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240401140331335.png" alt=""><figcaption></figcaption></figure>

```c
 #include <stdio.h>
 #include <stdlib.h>
 int main(){
   int i,j;
   int *p[4];
   for(int i = 0; i < 4; i++){
     if(p[i] = malloc(4*sizeof(int)) == NULL){
       fprintf(stderr, "allocate fail.\n");
       exit(1);
     }
     for(j = 0; j < 4; j++) {
       p[i][j] = 4*i + j;
     }
   }
   return 0;
 }
```

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240401140641194.png" alt=""><figcaption></figcaption></figure>

> (1) the same with Q3
>
> (2) the p is a wild pointed.

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240401140801886.png" alt=""><figcaption></figcaption></figure>

> Definitely YES. But since after using p, the program end. It's ok.

\
\
