---
tags:
  - Sys
  - OS
  - Linux
  - C
---
# Week 9 - Mutual Exclusion for Cooperating Processes

### 动机

进程间通过使用shared memory进行合作，当多个进程共享memory data的时候，就很容易出错。本节讲了以下内容：

* 维护shared data一致性的挑战
  * Atomicity（原子性），Race Condition，Mutual Exclusion
* 解决方法：
  * Locks for Mutual Exclusion
  * Peterson算法, 用于临界区（critical section）
  * 硬件锁test and set
  * 信号量Semaphores

进程间通信（Interprocess Communication）：

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240406222945128.png" alt=""><figcaption></figcaption></figure>

### 共享内存面临的挑战 - Critical Section Problem

问题例：假设两个进程共享一个变量 count。如果进程 A 和进程 B 几乎同时调用，则无法保证结果。

```c
 section 1:
 Process A: count++;
 Process B: count--;
 ​
 section 2:
 Process A: count = 2*count;
 Process B: count--;
 ​
 section 3:
 Process A: x = count; [...]; count = x;
 Process B: count--;
```

对于section1来说，AB的运行顺序没有影响

对于section2，就会影响。

The execution of Process A is not atomic. 实际上，section2的程序在CPU上也不是原子的。这个就是Critical Section Problem.

**问题定义：**当共享内存的程序，访问数据的顺序matters，那么我们说这是竞态（Race Condition）。OS Kernel充满了潜在的Race Condition, 因为CPU允许interrupts，preempts，并且同一时间服务多个processes。race condition的主要来源就是interleaving（交错进行）of processes manipulating the data. 我们希望避免多个进程access the shared data at the same time.

**解决方法：**每个进程都有临界区critical section。临界区每次只有一个进程可以访问。我们的目的就是设计一种协议来实现这个想法。

**协议要求：**对于解决critical section problem的协议，我们需要保证：

* Mutual Exclusion 互斥访问
* Progress 没有无限制的阻塞。
* Bounded Waiting：存在一个bounded time which allow any process to enter their critical section.

**问题假设：**每个进程运行速度都不为0，关于N个进程的相对速度没有任何假设。

**天真的想法：**

* 我们不能进制抢占吗？
  * 这意味着在进程之间公平共享资源的能力减少，并且对交互应用程序没有快速的I/O处理。
* 我们能否在共享内存中有一个进程保留的“令牌”？
  * 可以，其实锁就是这个思想。

### 锁算法

解决所有critical section问题都需要lock

进入临界区之前获得锁，退出临界区后释放锁

general pattern:

```c
 do {
   [acquire lock]
     [critical section]
   [release lock]
     [remainder section]
 } while (TRUE);
```

锁宏观想法：

* 只要能保证只有一方能拿到锁，那么互斥性就保证了
* 总是存在performance penalty: 锁一定会拖慢进程的运行速度，但我们愿意做出这个牺牲
* 基于锁的协议或算法通常相当微妙。
* 如果假设更少，问题就会变得更加复杂（我们现在假设程序的每行都是原子化的，但事实不是这样）。
* 如果考虑时间和延迟（同步和异步协议领域（realm）），情况会变得更加复杂。
* 如果考虑故障或攻击，情况会变得更加复杂。

这些属于分布式系统或者分布式算法的研究，包括Fault tolerance, byzantine fault tolerance.

**Naive Locking Algorithm**

```c
 is_in[i] = FALSE; // I’m not in the section
 do {
   while (is_in[j]){}; // Wait whilst j is in the critical section
   is_in[i] = TRUE; // I’m in the critical section now.
     [critical section]
   is_in[i] = FALSE; // I’ve finished in the critical section now.
     [remainder section]
 } while (TRUE);
```

问题：如果i和j其中一个从while loop中出来，那么i和j都是false，那么他俩都能进入临界区。

#### Therefore we introduce Peterson’s Algorithm：

假设：假设CPU的寄存器LOAD和STORE指令是原子操作（在现代CPU上并不现实，这只是教育示例）。

两个进程share 2 variables：

`int turn;`

`Boolean wants_in[2]`

```c
 do {
   wants_in[i] = TRUE; // I want access...
   turn = j; // but, please, you go first
   while (wants_in[j] && turn == j){}; // if you are waiting and it is
   // your turn, I will wait.
     [critical section]
   wants_in[i] = FALSE; // I no longer want access.
     [remainder section]
 } while (TRUE);
```

当两个进程都感兴趣时，它们通过turn实现公平性，这会导致它们交替访问。

peterson算法很有意思，但是缺点：

* 我们假设了CPU指令的原子性
* 只支持2个进程，多个进程复杂性会大幅提升
* 不必要的等待，具体情况如下：在另一个进程离开剩余部分之后但循环结束后又开始一个新循环设置turn之前
* 软件实现方法
* 可能会出现硬件或软件错误，甚至恶意攻击，无法优雅地处理 - 一个需要容错或拜占庭协议。

> 拜占庭协议的名字来源于拜占庭将军问题（Byzantine Generals Problem），这是一个经典的思想实验，它阐释了分布式系统在面临组件可能发生任意失败时的可靠通信问题。在这个问题中，几位将军和他们的军队围攻一座城市，需要通过信使来协调是否攻城。然而，一些将军可能会变得不忠诚，发送错误的信息。问题在于如何确保忠诚的将军们能够达成一致的行动计划，尽管有可能受到不忠诚将军或损坏的信使的干扰。

### Synchronisation Hardware

现代机器提供特殊的原子硬件指令TestAndSet 或 Swap，这些指令实现了相同的目标：

TestAndSet：测试内存地址（即读取它）并在一条指令中设置它

Swap：交换两个内存地址的内容在一条指令中进行

我们可以使用这些来实现简单锁以实现互斥。

#### TestAndSet Instruction

```c
 boolean TestAndSet (boolean *target) {
   boolean original = *target; // Store the original value
   *target = TRUE; // Set the variable to TRUE
   return original: // Return the original value
 }
```

简而言之：这个单个CPU指令将一个变量设置为TRUE，并返回原始值。

如果它返回FALSE，我们知道只有我们的线程将值从FALSE更改为TRUE；如果它返回TRUE，

我们知道我们没有更改该值。

用testandset做一个锁

```c
 do {
   while (TestAndSet(&lock)){} ; // wait until we successfully
   // change lock from false to true
     [critical section]
   lock = FALSE; // Release lock
     [remainder section]
 } while (TRUE);
```

TestAndSet的原子性质保证了，在任何时刻只能有一个进程能够改变 `lock` 的状态。所以互斥锁。但这个方法没有实现bounded waiting，因为上下文切换的不可预测

**实现了bounded waiting的TestAndSet mutex lock**

All data structures are initialised to FALSE.

**wants in\[]** is an array of waiting flags, one for each process.

**lock** is a boolean variable used to lock the critical section.

这个算法不要深究。

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240407004050380.png" alt=""><figcaption></figcaption></figure>

#### Spinlock

对于testandset实现的简单互斥锁：

```c
 do {
   while (TestAndSet(&lock)){} ; // wait until we successfully
   // change lock from false to true
     [critical section]
   lock = FALSE; // Release lock
     [remainder section]
 } while (TRUE);
```

while在不断地spin，知道进入临界区。这叫作Spinlock。

这很浪费CPU资源，尤其是临界区被用户占领后，会被占用很长时间。

#### Sleep and Wakeup

我们不想要自旋锁，而是在不能进入临界区后直接休眠，在机会来临时awake就行。

`sleep()`和`wakeup()`在threading lib中或 在kernel service call中经常使用

带这两个的锁：

```c
 do {
   while (TestAndSet(&lock)) { // If we can’t get the lock, sleep.
     sleep();
   }
     [critical section]
   wake_up(all); // Wake all sleeping threads.
   lock = FALSE; // Release lock
     [remainder section]
 } while (TRUE);
```

仍然在数据一致性上有一些问题。在while()判断和sleep()不是原子的，这就有可能出现问题。当while判断后，如果有其他进程interrupt了当前的进程，而在被中断情况下如果其他进程发来了wake\_up信号，那么当前进程就会不停睡下去，无法被唤醒。

所以我们需要将判断是否sleep和sleep操作绑定为一个原子操作。但这在代码方面是不可能的，所以我们需要让os保证在上下文切换之前就强制释放锁。实现这一功能的核心代码叫作semaphore，也就是信号量，这是一种由操作系统提供的同步机制，可以确保当进程/线程需要等待某个条件时，它们以原子方式进入等待状态。包含P(wait) V(signal)两个元操作。

### Semaphores

* 解决了忙等问题
* 却报了bounded waiting time 和 progress

P(wait) : -1, V(signal): +1

S被初始化为同时允许进入临界区的最大进程数量（资源数量）。

如果碰到wait，count == 0，把自己加到sleepers并阻塞，不是的话就自减，进入临界区。

如果碰到signal，count++，并向sleepers发出一个唤醒信号，通常FIFO唤醒

信号量有两种用法：

* S初始化为资源数量，用以计数，整数值可以在无限域内变化。
* S初始化为一个Binary，也就是互斥锁。就是一个初始为1的信号量。

```c
 Semaphore mutex; // Initialized to 1
   do {
     wait(mutex); // Unlike the pure spin-lock, we are blocking here.
       [critical section]
     signal(mutex);
       [remainder section]
 } while (TRUE);
```

模拟在kernel中实现一个信号量：

首先，我们要保证下面的每一行都是原子的，这个由kernel（OS）来保证。

```c
 typedef struct {
   int count;
   process_list; // Hold a list of waiting processes/threads
 } Semaphore;
```

```c
 void wait(Semaphore *S) {
   S -> count--;
   if (S->count < 0) {
     add process to S->process_list;
     sleep();
   }
 }
```

```c
 void signal(Semaphore *S) {
   S->count++;
   if (S->count <= 0) { // If at least one waiting process, let him in.
     remove next process, P, from S->process_list
     wakeup(P);
   }
 }
```

### Deadlock and Priority Inversion

Deadlock，死锁，大于等于两个进程循环等待对方。

例如：

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240407021440830.png" alt="" width="375"><figcaption></figcaption></figure>

Priority Inversion: 优先级反转：当较低优先级的进程持有高优先级进程所需的锁时，会出现调度问题。

#### Readers-Writers Problem

**问题定义**

共享的数据集或文件可能在多个进程间被并发访问，因此可能有多个读者和写者对其进行操作

* Reader：只读取数据，不更改数据
* Writer：能读能写

我们希望：

1. 读者与写者互斥。写的时候不能读，读的时候不能写。
2. 多个读者可以共同读。
3. 只有一个写者可以写。

**解决方法**

mutex = 1 互斥访问 read\_count

wrt = 1 读写互斥

readcount = 0 读者计数

```c
 //Writer
 while(True) {
   wait(wrt); // Wait for write lock.
   // perform writing
   signal(wrt); // Release write lock.
 }
```

```c
 while(True) {
   wait(mutex) // Wait for mutex to change read_count.
   read_count++;
   if (read_count == 1){ // If we are first reader, lock out writers.
     wait(wrt)
   }
   signal(mutex) // Release mutex so other readers can enter.
   // perform reading
   wait(mutex) // Decrement read_count as we leave.
   read_count--;
   if (read_count == 0){
     signal(wrt) // If we are the last reader to
   }
   signal(mutex) // leave, release write lock
 }
```

#### Linux kernel representation of semaphores

wait(mutex)是内核中的mutex\_lock

signal(mutex)是内核中的mutex\_unlock

这是一个二进制信号量

内核中的down\_read和down\_write是读写二进制信号量

在Linux内核中也有计数信号量

\
