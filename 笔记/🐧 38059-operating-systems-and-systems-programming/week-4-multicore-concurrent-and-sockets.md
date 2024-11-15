# Week 4 - Multicore, Concurrent & Sockets

### Muticore

#### Recap: Memory Hierarchy

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240401154700735.png" alt=""><figcaption></figcaption></figure>

经过改造的von Neumann Computer。单核cpu

Applications are demanding more resources!

Alternative solution:

• Put many processing cores on the microprocessor chip.

• The number of cores doubles with each generation.

例子

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240401162515240.png" alt=""><figcaption></figcaption></figure>

所以简化后的架构为

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240401162716876.png" alt="" width="375"><figcaption></figcaption></figure>

由于每个核有不同的cache，而多个核可能会对同一个数据进行修改，那么data coherence就很重要。

Coherence protocols： different cores must never see different values for the same shared data.

#### MSI protocol

each cache line is labeled with a state.

M: been modified

S: this data is sharing

I: invalid

![image-20240401163140883](https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240401163140883.png)

![image-20240401163212772](https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240401163212772.png)

![image-20240401163224394](https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240401163224394.png)

![image-20240401163237730](https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240401163237730.png)

![image-20240401163248331](https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240401163248331.png)

![image-20240401163302543](https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240401163302543.png)

#### multicore programming

Option 1: 程序直接以处理器内核为目标变成，太痛苦

Option 2: 使用concurrency platform

* Pthreads and WinAPI threads
* OpenMP

#### Concurrent Programming

单线程服务器可能会导致阻塞

并发服务器不会有这种问题，其中一个服务器阻塞了，别的也可以正常运行

• Task2 is parallel to Task1 and Task3

• Parallel（同时） tasks are always concurrent.

• Concurrent tasks may not be parallel (Task1 and Task3)

• So, ‘concurrency’ is a more general term

• 任务2与任务1和任务3并行

• 并行任务总是同时进行的。

• 同时进行的任务可能不是并行的（任务1和任务3）

• 因此，“并发性”是一个更一般化的术语

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240402235111017.png" alt="" width="375"><figcaption></figcaption></figure>

#### 使用Threads实现Concurrency

什么是Thread?

> A thread of execution is the smallest sequence of programmed instructions that can be managed independently by a scheduler, which is typically a part of the operating system.

对于线程来说，栈数据是自己的，而heap, global data和其他资源例如打开的文件，sockets是共享的。

在C中想多线程编程就要用pthread.h。在链接的时候，要加上-lpthread

想要创建线程，就要用pthread\_create()

```c
int pthread_create(  pthread_t *thread_id, // ID number for thread  
                     const pthread_attr_t *attr, // controls thread attributes  
                     void *(*function)(void *), // function to be executed  
                     void *arg // argument of function);
```

成功的话会返回0.不成功返回非0.由于我们使用系统默认的属性，所以attr通常设为NULL.

看到arg是一个指针，只能传入一个参数，所以当我们想要运行一个多参数的函数的时候，我们需要以结构体的形式传入。

e.g.

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240404010454545.png" alt="" width="563"><figcaption></figcaption></figure>

main线程不会自动等待线程1，2的结束再结束，所以如果不加sleep(1)，那么就打印不出来东西，因为main进程结束了，整个就结束了。为了解决这个问题，我们就需要介绍pthreads的Synchronization Mechanism

pthreads提供三种Synchronization Mechanisms:

* Joins
* Mutual exclusions
* Condition varibales

**pthread\_join()**

```c
int pthread_join(  pthread_t thread_id, // ID of thread to "join"  
                   void **value_pntr // address of function’s return value);
```

一般会把\*\*value\_pntr设置为NULL. join是阻塞函数，会阻塞线程。

这个join有一些问题，因为如果多个线程都尝试读写shared varibale的时候，会产生race condition:

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240404011332164.png" alt="" width="563"><figcaption></figcaption></figure>

**Mutex lock**

为了解决Race condition, 我们就需要互斥锁，mutex lock provides mutual exclusion to shared resources.

语法

```c
pthread_mutex_t mutex1 = PTHREAD_MUTEX_INITIALIZER;
...
pthread_mutex_lock( &mutex1 );
counter++;
pthread_mutex_unlock( &mutex1 );
...
```

被锁起来的区域叫Critical region，里面是access serially。

但如果多个进程锁的顺序不对，就可能导致死锁。

还有一个函数叫pthread\_mutex\_trylock，一般的lock在无法锁定后就阻塞了，但对于trylock，无法锁定就会返回一个非0，不死等。

```c
...
pthread_mutex_lock(&mutex1);
// Now test if already locked
while ( pthread_mutex_trylock(&mutex2) ){
 // unlock resource to avoid deadlock
 	pthread_mutex_unlock(&mutex1);
 ...
 // wait here for some time
 ...
 	pthread_mutex_lock(&mutex1);
}
count++;
pthread_mutex_unlock(&mutex1);
pthread_mutex_unlock(&mutex2);
...
```

* Thread tries to acquire mutex2
* and if it fails, then it releases mutex1 to avoid deadlock

**Condition variables**

不是常用的wait 和 signal(P V)原语，而是条件变量。信号量是Semaphore, 条件变量是condition variable，`pthread_cond_wait`时，它会自动释放与条件变量相关联的互斥锁，并阻塞等待条件变量被触发。在这个过程中，条件变量不关心其等待队列中有多少线程。`pthread_cond_signal`时，它会唤醒在条件变量上等待的至少一个线程。如果使用`pthread_cond_broadcast`，则会唤醒在该条件变量上等待的所有线程。

语法：

```c
pthread_cond_t condition_cond = PTHREAD_COND_INITIALIZER;

pthread_cond_wait( &condition_cond, &condition_mutex );
//The condition variable and a mutex variable associated with the condition variable
//wait本身会阻塞程序，为了避免死锁，会释放mutex锁，在收到signal后，会再拿回mutex锁。
pthread_cond_signal( &condition_cond );
```

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240404020432058.png" alt="" width="563"><figcaption></figcaption></figure>

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240404020442223.png" alt="" width="563"><figcaption></figcaption></figure>

条件变量的状态机图：

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240404021229636.png" alt=""><figcaption></figcaption></figure>

为什么条件变量需要搭配互斥锁使用？ 因为仅在waiting的情况下，才会检查是否有signal。如果在waiting之前signal就来了，那么thread就会错过，进入无限等待。这个互斥锁是用来序列化操作条件变量的过程的，从而防止上面无限等待的情况发生，

#### 并发编程应用：并发链表

链表要有以下原语：

* Insert：插入新node，保证sorted order
* Delete：删除一个存在的node
* Member：如果node存在，返回true，反之false

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240404021705899.png" alt=""><figcaption></figcaption></figure>

这个链表的并发性很差，体现在，读的情况下，可以并发，但写的时候，无法并发。因为难以保证顺序。

解决方法

1.  只有一个线程可以访问list

    问题：确实解决了问题，但是由于大多数操作为读，这样写代码会让并发性变得很烂。
2.  对每个节点上锁

    问题：每个节点都要有一个锁，存储消耗大，且代码写起来太痛苦。
3.  好方法：使用Read-write locks

    读写分开，分别上锁，allow multiple threads to read, but allow only one thread to write.

    ```c
    pthread_rwlock_t lock = PTHREAD_RWLOCK_INITIALIZER;
    //for just reading 
    pthread_rwlock_rdlock(&lock);
    //for read-write access
    pthread_rwlock_wrlock(&lock);
    //only one unlock function
    pthread_rwlock_unlock(&lock);
    ```





    <figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240404022413375.png" alt=""><figcaption></figcaption></figure>

    <figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240404022453283.png" alt=""><figcaption></figcaption></figure>

### Sockets

#### C-S架构

* 有服务器进程，等待客户端请求并处理它们。
* 多个客户端可以链接并要求服务
* socket格式为：ip ports

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240404022848462.png" alt=""><figcaption></figcaption></figure>

#### 底层逻辑

服务器端：

Sockets是cs链接的端点。

* Server通过`socket`系统调用创建端点。这个玩意返回一个套接字描述符
* Server指定要监听的端口和协议（TCP UDP），并将信息保存在sockaddr\_in6结构体中。这里用了ipv6，如果想用ipv4的话，就是sockaddr\_in结构体
* 通过bind系统调用，Server将socketaddr\_in6结构体中的信息（端口，协议）分配给socket。这一步周是为了将socket和端口关联起来。
* 通过accept系统调用，server在端口上监听服务器链接请求。
* 一旦连接建立，服务器可以用read系统调用来读信息，通过write系统调用写信息。
* 结束后，server通过close系统调用关闭连接。

客户端端：

* 客户端用socket系统调用创建端点
* 客户端用connect系统调用链接服务器（端口号自动分配）
* 用write系统调用写信息，用read系统调用读信息
* close系统调用关闭连接。

#### 并发性

良好处理并发对于实现socket程序至关重要

关键点：服务器程序可以为每个传入连接创建单独的线程，任意数量的线程共享内存且可能同时运行

可能导致需要同步的竞争条件

使用适当的互斥。

### Practice Questions

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240404025431036.png" alt=""><figcaption></figcaption></figure>

> To make it possible to execute several parts of program concurrently.

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240404025527955.png" alt=""><figcaption></figcaption></figure>

> Global variables, Data in heap and Open files

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240404025558712.png" alt=""><figcaption></figcaption></figure>

> The code which is included in the mutex\_lock and mutex\_unlock, which is executed serializely. switching between threads must be limited to ensure correct execution of the program.

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240404025725809.png" alt=""><figcaption></figcaption></figure>

> Other thread may wait and do noting while one thread is working in critical section. We must to keep waiting time(critical part) as small as possible.

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240404025842194.png" alt=""><figcaption></figcaption></figure>

> The dead wait will happen, which means other threads will wait for the thread which is being blocked, and the thread being blocked cannot be freed forever. the process dead.

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240404030031233.png" alt=""><figcaption></figcaption></figure>

```c
#include <stdio.h>
#include <stdlib.h>
int totalCalls = 0;
char *fun1 () {
  static int isExecuted = 0;
  char *result;
  isExecuted++;
  ---
  totalCalls++;
  ---
  result = malloc(5);
  return result;
}
char *fun2 () {
  static int isExecuted = 0;
  char *result;
  isExecuted++;
  ---
  totalCalls++;
  ---
  result = malloc(10);
  return result;
}
```

> 如图

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240404030344549.png" alt=""><figcaption></figcaption></figure>

> 用读写锁没有意义，因为totalcalls被修改了。没有读的需求。

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240404030448204.png" alt=""><figcaption></figcaption></figure>

```c
#include <stdio.h>
#include <stdlib.h>
char *msg = "This is a message";
void fun1 () {
  if (msg != NULL) {
  	msg = NULL;
  }
}
char *fun2 () {
  char *result;
  if (msg == NULL || (strlen(msg) > 5)) {
  	return NULL;
  }
  result = malloc(6);
  strcpy(result, msg);
  return result;
}
```

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240404030527349.png" alt=""><figcaption></figcaption></figure>

> ```c
> #include <stdio.h>
> #include <stdlib.h>
> #include <string.h>
> #include <pthread.h>
>
> char *msg = "This is a message";
> pthread_rwlock_t lock = PTHREAD_RWLOCK_INITIALIZER;
>
> void fun1() {
>   pthread_rwlock_wrlock(&lock);
>   if (msg != NULL) {
>     msg = NULL;
>   }
>   pthread_rwlock_unlock(&lock);
> }
>
> char *fun2() {
>   char *result = NULL;
>   pthread_rwlock_rdlock(&lock);
>   if (msg != NULL && strlen(msg) <= 5) {
>     result = malloc(6);
>     if (result != NULL) {
>       strcpy(result, msg);
>     }
>   }
>   pthread_rwlock_unlock(&lock);
>   return result;
> }
> ```
>
> \
>
