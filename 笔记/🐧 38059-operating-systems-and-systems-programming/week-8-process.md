# Week 8 - Process

### Concepts

OS运行着多种类型的程序。例如批处理系统中的jobs，事件共享系统中的 user programs or tasks。

进程被定义为一个正在执行的程序。进程执行必须按顺序进行。

一个进程包括：

* 程序（text）和program counter（PC）
* stack
* data section
* heap

内存中是这样的：

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240406125159927.png" alt="" width="188"><figcaption></figcaption></figure>

### States

进程有多种状态：

* new: 进程刚被创建
* running：指令正在被执行
* waiting：进程在等待一些事件的发生
* ready：进程等待被分配到处理器
* terminated：进程执行结束

对于chrome来说，每个tab都是一个分别的进程

进程状态转换：

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240406125459395.png" alt=""><figcaption></figcaption></figure>

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240406221214121.png" alt=""><figcaption></figcaption></figure>

### PCB - Process Control Block

PCB中存储着进程的相关信息：

* 进程state
* Program counter
* CPU寄存器
* CPU调度信息
* 内存管理信息
* Accounting 信息
* IO状态信息

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240406125816509.png" alt="" width="188"><figcaption></figcaption></figure>

### 进程创建

父进程创建子进程，子进程创建子进程的子进程，形成一棵进程树

使用process identifier（pid）来管理和识别程序

资源共享模式：

* 父子进程共享所有资源
* 子进程共享父进程资源的子集
* 父子进程不共享资源

运行模式:

* 父子进程并行运行
* 父进程等待子进程结束后再运行

进程树：

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240406130149411.png" alt=""><figcaption></figcaption></figure>

### 进程终止

* 进程运行最后的命令后要求OS去删除它（exit系统调用）
  * 这是一种标准结束方法。父进程可以通过wait等系统调用来等待子进程结束，并获取子进程的输出数据（退出状态，返回数据）
  * 子进程结束后，由OS来负责清理，包括释放内存，关闭打开的文件等。
* 父进程可以通过指令来提前终止子进程（abort系统调用）
  * 子进程超出了分配的资源，父进程可以abort它，来防止资源滥用
  * 分配给子进程的任务不再需要，也可以abort
  * 如果父进程已经推出。一些OS不允许子进程继续运行，所有的children将会被终止（这杯叫作cascading termination 级联终止）

### 上下文切换以实现并发

Context：包括program counter, CPU register和memory managerment details.

当CPU切换到另一个今晨搞的时候，系统必须存储旧进程的状态，并加载新进程的状态。这叫作context switch

进程的上下文展现为PCB

context switch时间开销很大，系统在切换时不执行任何有用的工作。这个时间开销依赖于硬件。

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240406131303507.png" alt="" width="375"><figcaption></figcaption></figure>

### Scheduling

问题定义：计算机中很多资源是被竞争的（CPU资源，磁盘资源和其他资源）。调度作为OS的重要功能，定义了一种方法来管理进程对这些资源的访问。

这通常通过对某种资源有一个等待队列，然后通过选择一个该队列里的进程来获取资源来实现。

进程的队列一般有这么几种

* Job queue：系统中的所有进程集合
* Ready queue：存储在memory中的所有进程的集合，准备好并等待执行
* Device queue：等待IO设备的进程集合

进程可以在各个队列间迁移（migrate）

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240406132032100.png" alt="" width="375"><figcaption></figcaption></figure>

调度的workflow：

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240406132338631.png" alt=""><figcaption></figcaption></figure>

### 成功的Schedule

调度问题定义：当多个进程准备好执行命令的时候，应该调度哪一个来获取CPU资源？

前提知识：

1. CPU IO Burst Cycle: 进程一般是先运算一段，再等待IO，IO后继续运算，这就是CPU IO Burst Cycle。在IO之前运算的那一段时间我们叫作CPU Burst。IO操作叫作IO Burst。经验表明，IO操作会在固定的CPU时间只hioufasheng，也就是说，CPU Burst时间一般是固定的。所以我们可以让一个进程运行到IO操作时进行调度。
2. Pre-emptive Scheduling: 抢占式调度。资源可以被其他进程提前抢占。

评判指标：

* CPU utilisation：cpu利用率
* Throughput：吞吐量：在给定时间内完成的进程数量
* Turnaround time：周转时间：每个过程执行所需的时间
* Waiting time：在ready queue中所花费的时间
* Response time：响应时间，请求提交和第一次响应生成之间的时间

有两种处理器：

* IO bound process：花费更多时间进行I/O操作而不是计算，有许多短的CPU爆发
* CPU bound process：花费更多时间进行计算；几个非常长的CPU突发

### 调度算法

* FCFS：先来先服务。易于实现，但可能导致CPU intensive process（CPU burst更长的进程）的长时间等待。进程太长的话，可能导致处理器的monopolise（垄断），进程太短导致太多的context switch
  * 带抢占的FCFS叫作Round-Robin（RR时间片轮转）。是时间共享系统的标准方法
* SJF（Shortest Job First）：短作业优先，CPU-burst time最短的先上。这个方法无法实现，因为你无法预知进程的运行时间。但这是一个可以用来评价其他算法的方法。
  * 如果真的想预知新的进程，τn+1 = αtn + (1 − α)τn，这种加权的愚蠢方案可以用一用。这种方法仅仅能用于预测，是一种完全的经验主义。
*   Priority Scheduling：CPU分配给最高优先级的。同优先级FCFS。

    * 两种变体。
    * 抢占式：新创造的进程，高优先级就立即抢占了。
    * 非抢占：新创建的进程永远先等待。

    缺点：低优先级进程容易starve。解决方法：一段时间后增加优先级。
* Multilevel Queue Scheduling：当流程可以划分为组的时候使用（例如交互式和批处理进程）
  * 将准备队列分为不同的队列，用不同的调度算法。队列之间的调度通常实现为**抢占式**优先级调度。
  * 一般会这样划分：
    * System processes
    * Interactive processes
    * Interactive editing processes
    * Batch processes
  * 还可以根据CPU-burst的长度划分。例如1ms, 2ms 4ms
* Symmetric multiprocessing(SMP): 多核心处理器用对称多重处理
  * 所有处理器核心都相同，可以单独被调度
  * 对Linux来说，每个核心都有自己的ready queue, 或者共享ready queue.

**Processor Affinity**: 处理器亲和力。指一个进程对它当前正在运行的CPU的偏好。在多处理器系统中，这可以提高性能，因为它利用了进程状态（比如缓存）在一个处理器上的持续性。

* Soft Affinity: 一个进程需要重新调度时，系统会倾向于选择它之前运行过的CPU，但这不是强制的。如果那个CPU不可用，进程可以在另一个CPU上运行。
* Hard Affinity: 将进程绑定到一个特定的CPU上。这意味着该进程只会在指定的CPU上运行，即使系统中有其他CPU空闲时也不会改变。

优点：缓存保持有效，避免耗时的缓存失效和恢复，无需重新初始化。

**Load Balancing**：平衡加载。平等使用每个核，有悖于亲和加载。

* Push Migration：定期检查负载，并将进程推送到负载较低的CPU
* Pull Migration：空闲的CPU从繁忙的CPU中拉取进程

#### Linux 实现

Linux中多个schedulers可能共存，分配固定份额的CPU time to each scheduler

重要的schedulers：

* Round robin shceduler with priorities(default scheduler)。在Linux中，通过运行时间的累积维护了一个有序进程树，这样就可以快速选出运行时间最少的进程。每次选择迄今为止获得最少运行时间的进程，防止starve。即使优先级高也没用。插入新进程就按照树的规则插入，权重用于在运行时间相同时进行tie breaking.
*   Real time scheduler(进程需要显式说明自己要用这个，一般为FIFO)

    不带权的RR：



    <figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240406221430026.png" alt=""><figcaption></figcaption></figure>

    <figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240406221446826.png" alt=""><figcaption></figcaption></figure>

