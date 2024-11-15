# Week 7 - Memory management & kernel programming

### Memory Management

介绍了逻辑地址和物理地址之间的映射问题，以及如何通过内存管理技术（如分页、分段等）允许多个程序同时高效、安全地共享有限的物理内存资源。这种管理不仅需要硬件层面的支持，比如内存管理单元（MMU）来进行地址转换，还需要操作系统中内存管理子系统的高级算法，以及编译器和加载器的配合，以确保程序在执行时能够正确、有效地访问其所需的内存资源。

为实现有效的内存管理，必须在不同的阶段（编译、加载、执行）合理地进行逻辑地址到物理地址的映射。此外，通过动态链接，可以进一步提高内存使用的效率，但这需要操作系统的配合以保证安全和正确性。

1. **逻辑地址到物理地址的映射：**
   * **编译时**：生成绝对引用。例如，在MS-DOS的.com文件中，地址是在编译时就已经确定。
   * **加载时**：可以通过特殊程序来完成地址映射，这允许在程序加载到内存时动态地确定地址。
   * **执行时**：需要硬件支持来实时完成地址映射，确保程序在执行过程中访问正确的内存地址。
2. **地址映射的进一步应用——动态链接：**
   * 动态链接允许系统库的单一副本被多个程序共享。这不仅节省了内存空间，也提高了运行效率。
   * 为了实现动态链接，操作系统必须提供支持，确保同一段代码可以被多个进程安全地访问。

#### Swapping

如果内存需求太高，那么我们要将一些进程转移到disk中，经常与scheduling共同工作，低优先级被swapped out。

问题：长的transfer time以及pending io。swapping不是主要内存管理技术。

#### 碎片

交换引起两个问题：

随着时间的推移，内存中会出现许多小孔（外部碎片）

程序只比空洞略小 ⇒ 剩余太小而不符合作为空洞的条件（内部碎片）

选择洞的策略：

First-fit: Start from beginning and use first available hole

Rotating first fit: start after last assigned part of memory

Best fit: find smallest usable space

Buddy system: Have holes in sizes of power of 2. Smallest possible hole used. Split hole in two if necessary. Recombine two adjacent holes of same size.

#### 分页

如果以固定size分配内存，那么就防止的外碎片。逻辑地址和物理地址的转换通过页表。

硬件支持：如果页表小的话，那么用快速寄存器，大页表存在main memory中，但是缓存最近使用的entries

内存保护可轻松添加到分页中：

保护信息存储在页表中

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240405025546664.png" alt=""><figcaption></figcaption></figure>

#### 分段

将内存分为不同的段，根据程序的使用情况：

Data：可变，每个实例不一样

program code：不可变，每个实例一样

Symbol table: 不可变，每个实例一样，只对debugging有用

需要硬件支持，由于易于分配，页面调度通过使用内存进行分段 ⇒ 两者结合效果很好

段页式：

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240405030304422.png" alt=""><figcaption></figcaption></figure>

#### 虚拟内存

* **逻辑与物理内存的完全分离**：虚拟内存的核心思想是将程序使用的地址空间（逻辑内存）与实际的物理内存地址分开。这意味着程序在运行时使用的内存地址并不直接对应于物理内存中的实际位置。
* **程序可以拥有极大量的虚拟内存**：由于逻辑和物理内存的分离，操作系统可以为程序提供比实际物理内存大得多的地址空间。这允许程序认为自己有几乎无限的内存可用，即使物理内存有限。

可行性：**大多数程序只密集使用一小部分内存**：在任何给定时刻，程序往往只频繁使用其虚拟内存中的一小部分。这部分被称为工作集（working set）。虚拟内存系统可以只将这部分内存保留在物理内存中，而将不常用的部分存储在磁盘上。

* **高效实现是棘手的**：虚拟内存系统需要在物理内存和磁盘之间频繁地交换数据。这里的挑战来自于内存访问速度与磁盘访问速度之间的巨大差异。
* 内存访问速度与磁盘访问速度的巨大差异：
  * 内存访问速度大约是60纳秒（ns）。
  * 磁盘访问速度大约是6毫秒（ms），即6000纳秒。
  * 这意味着磁盘访问速度大约比内存访问慢100,000倍。

#### 虚拟内存需求分页

概念：**虚拟内存被划分为等长的单元**，这些单元称为“页”（pages）。每一页都有一个有效/无效（valid/invalid）位，用于指示该页是否已被加载到物理内存中。

两个决策：

1. **选择哪个进程进行“换出”（Swapping Out）**：粒度更大，出操作会将一个进程的全部内存内容移到磁盘上，包括该进程的所有页。当系统需要更多物理内存时，操作系统的“交换器”（Swapper）决定将哪个进程的全部内存移至磁盘，并且阻塞该进程。这是一个全局的内存管理决策。
2. **在需要额外页时，决定将哪些页移动到磁盘**：粒度更小，涉及单个内存页。当一个新的页需要被加载到内存中，但内存已满时，分页器需要决定哪个已存在的页应该被写回磁盘。这是“分页器”（Pager）的职责。当一个进程需要更多物理内存页时，分页器决定哪些现有的页应该被写回磁盘以释放空间。这个决策通常基于某种页面替换算法，如最近最少使用（LRU）算法。

目标：最小化Page Fault。

换页策略：

1. FIFO
2. Optimal Algorithm。无法实现，但可当成benchmark
3. LRU。选择最长时间未使用的page换出。需要硬件支持，Second-chance algorithm

#### Thrashing（抖动）

如果进程缺少它经常使用的帧，页面错误率会非常高。这就是抖动

解决方法：

1.  Working-Set model:

    将工作集定义为最近∆页中使用的页面集

    仅在主存储器中保留工作集

    ⇒ 实现高CPU利用率并防止抖动。

    难点：确定工作集
2. Page-Fault Frequency：如果frame的page fault高，就提供额外frame，删除page fault低的frame。

#### Linux Kernel Memory Management

4段

* Kernel Code
* Kernel Data
* User Code
*   User Data

    分页用于前面描述的方式

    为页面设置复杂的权限系统

4g（32bit）的话，高1g为内核，低3g为用户

64bit的话，高半为内核，低半为用户

### Kernel Programming

内核的简化结构：

```
 initialise data structures at boot time;
 while (true) {
   while (timer not gone off) {
     assign CPU to suitable process;
     execute process;
   }
   select next suitable process;
 }
```

kernel可以access all resources

内核程序不受任何内存访问或硬件访问约束

⇒ 故障的内核程序可能导致系统崩溃

#### Kernel和User progeams的interaction

Kernel通过system calls提供函数

Standard C-library提供了他们

严格区分内核数据和用户程序数据

⇒ 需要在用户程序和内核之间进行显式复制

（copy to user()，copy from user()）

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240405032842219.png" alt=""><figcaption></figcaption></figure>

此外，有中断：

内核要求硬件执行某些操作

硬件向内核发送中断，内核执行所需操作

必须快速处理中断

⇒ 从中断调用的任何代码都不能休眠

#### Linux kernel modes

内核结构产生了两种主要的内核代码模式：

* Process context：内核代码通过执行system call为user process工作
* interrupt context：内核代码处理interrupt（例如由device引起）

只有在process context情况下才能拿到user data

任何在process context中运行的代码都可能被中断随时抢占。

较低优先级的中断会被较高优先级的中断抢占。

#### Kernel modules

可以将代码加入到运行中的kernnel

有用于提供仅在硬件存在时才需要的设备驱动程序

* modprobe将模块插入运行中的内核
* rmmod从运行中的内核中移除模块（如果未使用）

#### Concurrency issues in kernel

内核中正确处理并发性很重要：

共享数据结构的操作：

* process context和interrupt context共享数据结构
* process context之间共享数据结构

即使是多处理器系统，对于在process context中运行的代码之间共享数据结构也必须仅发生在critical sections。

#### 实现mutual exclusion

*   Semaphores / Mutex。

    当进入临界区失败时，当前进程被置于睡眠状态，直到临界区可用

    ⇒ 仅在所有关键区域都处于进程上下文中时才可使用，因为中断上下文不能休眠。

    函数：DEFINE\_MUTEX（），mutex\_lock（）, mutex\_unlock()
*   Spinlocks自旋锁

    处理器反复尝试进入临界区

    可在任何地方使用

    缺点：存在忙等待

    函数：spin\_lock\_init()，spin\_lock()，spin\_unlock()

#### user space 和 kernel space的数据传输

Linux维护一个名为proc的目录，作为用户空间和内核之间的接口。

该目录中的文件并不存在于磁盘上。

对这些文件进行读写操作会被转换成内核操作，并伴随着用户空间和内核之间的数据传输。

这是一个在内核和用户空间之间进行信息交换的有用机制。

#### Major parts of the kernel

Device drivers: 在子目录驱动程序中，按类别排序

file systems: 在子目录 fs 中

scheduling and process management: 在子目录 kernel

memory management: 在子目录mm

networking code: 在子目录net

architecture specific low-level code (including assembly code): 在子目录arch

include-files: 在子目录 include

### Additional Exercises

1. The mapping of a logical address to a physical address is done in hardware by\_\_\_.

A) memory management unit (MMU) B) memory address register C) relocation register D) dynamic loading register

> A

2. In a dynamically linked library, .

A) loading is postponed until execution time B) system language libraries are treated like any other object module C) more disk space is used than in a statically linked library D) a stub is included in the image for each library-routine reference

> A

3. An address generated by a CPU is referred to as a .

A) physical address B) logical address C) post relocation register address D) memory management unit (MMU) generated address

> A错了，B

4. Consider a logical address with a page size of 8 KB. How many bits must be used to

represent the page offset in the logical address? A) 10 B) 8 C) 13 D) 12

> C

5. Consider a logical address with 18 bits used to represent an entry in a conventional

page table. How many entries are in the conventional page table?

A) 262144 B) 1024 C) 1048576 D) 18

> A

6. What is the context switch time, associated with swapping, if a disk drive with a

transfer rate of 2 MB/s is used to swap out part of a program that is 200 KB in size? Assume that no seeks are necessary and that the average latency is 15 ms. A) 300 B) 113 C) 155 D) None of the above

> B

Q2. \[Part 1] Consider a paging system with the page table stored in memory. (a) If a memory reference takes 200 nanoseconds, how long does a paged memory reference take?

> 400。 查表200 查数据200

(b) Suppose we have associative registers where finding a page-table entry (if present) takes zero time, and which contains 75% of all page-table references. What will be the effective memory reference time in this case?

> 200 \* 0.75 + 400 \* 0.25 = 250

(c) Suppose the time to find an entry in associative registers is 2 ns. What will be the access time?

> 202 \* 0.75 + 402 \* 0.25 = 252

Q3 \[Virtual Memory]. Consider a demand-paged computer system where the degree of multiprogramming is currently fixed at 4. The system was recently measured to determine utilization of CPU and the paging disk. The results are one of the following alternatives. For each case, what is happening? a. CPU utilization 13 percent; disk utilization 97 percent

> swapping

b. CPU utilization 87 percent; disk utilization 3 percent

> Ideal situation，CPU usage is high

c. CPU utilization 13 percent; disk utilization 3 percent

> Low load or IO slow.

\
