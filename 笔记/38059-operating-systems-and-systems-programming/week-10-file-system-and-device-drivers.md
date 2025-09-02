---
tags:
  - Sys
  - OS
  - Linux
  - C
---
# Week 10 - File system & Device Drivers

### File System

#### 功能

主要用于存储永久数据。是速度瓶颈。

容量在如今并不是问题，因为存储很便宜，但是备份成了一个问题。

逻辑视角：是文件的树状结构。还有读写文件，创建目录的功能。

物理视角：一系列的块，可以读取和写入。操作系统必须将逻辑视图映射到物理视图，必须强加树结构并为每个文件分配块。

#### 实现方法

主要有两种。

* 链表。问题：seek很慢，O(n)
* 索引分配（indexed allocation）：将指针存储在一个位置：所谓的索引块（类似于页表）。为了应对巨大不同的文件大小，可能会引入间接索引块。

在Linux中，index block叫作inodes

inodes中存储了文件的附加信息，例如size和权限

#### FAT

F(ile) A(llocation) T(able)，用于解释文件系统概念。现代的文件系统往往更复杂。这里采用FAT16讲解。

Sector扇区 = 磁盘单元（例如 512 字节），又称块blcok

Cluster = 多个sectores（因子为 1、2、4，...，128）

（这里：假设簇 = 1 扇区）

使用链表（“cluster chain”）将簇分组

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240407202428432.png" alt=""><figcaption></figcaption></figure>

这个图是其中boot sector的16进制实例。这里面红色的圈圈住的信息，所对应的位置都可以查表得到。

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240407203038556.png" alt=""><figcaption></figcaption></figure>

这个是FAT：

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240407221651358.png" alt=""><figcaption></figcaption></figure>

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240407221916711.png" alt=""><figcaption></figcaption></figure>

Root Directory下的文件：

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240407221810344.png" alt=""><figcaption></figcaption></figure>

FAT的一些限制：

最大卷大小（max volume size）: 2 GB (2^16 · 32 kB)

最大文件体积：2GB

最多文件数量：65460（32kB clusters）

最长文件名：8 + 3

FAT32 / exFAT有更高的限制

而新的文件系统，NTFS, ext4已经克服了这些limits, 使用了其他的DS，例如B-tree for dir structure, bitmap for allocation

#### Caching

缓存是在memory中用于存储目录或最近使用的文件缓存的磁盘块

这些内容会被定期写入磁盘，大大提升了效率。

当系统崩溃时会出现不一致性，所以说计算机必须正常关闭。

#### Journaling File System

为了在系统崩溃的时候最小化数据丢失，采用了和数据库一样的事务逻辑。

* 定义事务点Transaction points: 保证了文件系统状态的一致性，这意味着无论何时系统崩溃，文件系统都可以恢复到最后一次成功的事务点，确保了在该点之前的所有操作都已成功完成，且文件系统处于一致状态。
* 为每个写操作都保持log file. 记录足够的信息去揭开事务点之后发生的任何changes

#### Disk

*   磁盘访问被分为三个步骤

    * 寻道Seek：head移到正确的磁道
    * 延迟Latency：移到正确的block
    * 传输Transfer：数据传输

    硬盘驱动器（HDDs）：寻道和延迟所需时间远大于传输时间

    ⇒ 数据分布和调度算法对HDD性能有重要影响，对SSD影响较小
* 磁盘调度算法
  * FCFS
  * Shortest Seek Time First：选择磁头移动最短的。
    * 缺点：starve，disk中间会被preferred
  * SCAN-scheduling：电梯， continuously scans the disk from en to end (lift strategy)
  * LOOK-scheduling：对SCAN的改进，不移动到头，而是移动到最后一块就往回走。

对于不同的任务，可以采用不同的访问算法。

对于内存和磁盘的Swap空间，我们就不使用间接访问方法，因为时间很crutial。

在这种情况下，系统设计者可能会选择一种算法，它以增加内部碎片（例如，不充分利用存储空间）为代价，来优化速度。这意味着为了获得更快的性能，系统可能会分配更多的空间而不是尽可能紧凑地存储数据。

#### File System Linux实现

Linux为所有的文件系统设计了通用接口，叫作virtual file system(VFS)

VFS维护了：

* inodes for files and directories
* Caches, in particular for directories
* Superblocks for file systems

所有的file system call (open read write close)首先访问VFS，在必要情况下，VFS从真正的文件系统中选择合适的操作。

#### Disk Scheduler Linux实现

内核使得不同FS使用不同scheduler成为可能。

默认的scheduler就是完全Fair Queuing based on lift strategy。此外，为每个进程的磁盘请求单独设置队列，队列以RR方式服务。

还有适用于SSD的No-op scheduler: FIFO

### Drivers

见Week 5



\
