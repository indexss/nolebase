# Week 5 - OS Design Principles and System Calls

### Operating System Description

* A program that acts as an intermediary between a ‘user’ of a computer and the computer hardware
* The one program that is at all times running on the computer, with all else being systems programs and application programs

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240404233854419.png" alt=""><figcaption></figcaption></figure>

OS work as:

* Resource Allocator: Manages all hardware resources and decides between conflicting requests for efficient and fair resource use (e.g. accessing CPU, disk or other devices)
* Control System: Controls execution of programs to prevent errors and improper use of the computer (e.g. protects one user process from crashing another)

### OS Basic Building Blocks

#### Bootstrap

Bootstrap在开机或者重启的时候加载，通常存在ROM / EPROM，被称为固件(firmware, BIOS Basic Input/Output System)。

Bootstrap用于初始化系统的各个方面，比如探测已连接设备，检查内存错误

Bootstrap会加载操作系统kernel并开启其运行。

#### System Structure

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240404235423003.png" alt=""><figcaption></figcaption></figure>

*   Device Controllers是电脑内部的部件，需要链接外部资源。

    Bus（总线）链接CPU，controller和memory

    OS Kernel在CPU内跑，通过controllers管理设备。
*   IO设备和CPU可以execute concurrently（CPU不需要等待键盘输入所有内容）。并发是通过interrupt实现的。

    每个controller负责一种特定的设备类型

    每个controller有一个local buffer，例如通用数据的内存存储 与/或 控制寄存器。

    CPU和设备交流数据的方法是，把数据从main memory移到controller buffers，把数据从buffers移到memory。例如，写数据到屏幕，读取鼠标坐标

    IO操作指的是外部设备把消息存到/拿消息从 controller的buffer。

    controller通知CPU它已经完成操作，通过`interrupt`。

#### Interrupts

* Interrupt可以以多种方式实现，但通常是以interrupt vector来实现的
* interrupt vector是内存中的一个保存部分，用来追踪哪个interrupt对应哪个interrupt Service Routine的地址，当发生终端的时候，os会根绝interrupt vector table去找到对应的ISR,并执行
* 对于每个interrupt，OS运行适当的Interrupt Service Routine去处理。
* 中断指令的地址被保存，以便在中断完成后可以恢复处理。
* 软件程序也可以产生interrupts，通过system calls，例如，当一个错误出现的时候会发生system call。由软件生成的中断称为trap。

#### Storage

* Main memory - CPU能直接访问的唯一大存储介质
* Secondary storage - 提供大的non-volatile（不易挥发）的存储容量
  * 例如磁盘
  * 碟片表面被分为tracks（磁道），而后被分为sectors（扇区）
  * disk controller决定了device和conputer的交互

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240405001825887.png" alt="" width="375"><figcaption></figcaption></figure>

### OS Service

带Service的OS架构

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240405002159730.png" alt=""><figcaption></figcaption></figure>

注意到，system call是基于services的

gui，batch和command line是在user interfaces之上的，因为这三种都是某种user interfaces。

batch就是批处理，其在user interfaces之上是因为它是一种用户向系统提交指令的一种方式。

#### Interfaces：与OS的交互

用户通过interfaces与OS间接交互，例如GUI或者command line

Processes通过向OS kernel发起system call来与OS交互。为了稳定性，这些calls不是对kernel functions的直接call。

#### Processes Services

* program excution: OS必须能够载入一段程序到内存并运行，结束运行，正常结束或者异常结束。
* IO operations：运行的程序可能需要IO，可能涉及到文件（与disk IO）或者IO设备。
* file system manipulation：programs需要能够读写文件 or 目录，创建删除，搜索，list，权限管理。
* interprocess communication(IPC)：允许processes共享数据通过message passing或shared memory

#### OS Services

* Error handling: 对错误处理，比如除0，尝试读取首先内存区域，设备故障
* Resource allocation：进程可能会竞争资源，例如CPU，memory，IO
* Accounting：统计能力，比如使用了多少磁盘空间？使用了多少网络带宽？
* Protection and Security：多用户系统的权限控制，并发程序不互相影响

#### System Call

* 是OS提供的Services的编程接口（打开文件，读取文件等）
* 一般用C写
* 一般用high level的API进行访问，而不是直接进行system call
* 常用的API：Win32 for Windows，POSIX for UNIX like system
* API允许程序在不获取root privileges的情况下访问内核，它会将user mode转化为kernel mode
*

    <figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240405005246153.png" alt="" width="375"><figcaption></figcaption></figure>
*

    <figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240405005330191.png" alt="" width="375"><figcaption></figcaption></figure>

> user mode和kernel mode的例子：
>
> 想象你在一家公司工作：
>
> 用户模式：
>
> * **工作范围限定**：你作为一名员工，有你的办公桌和电脑。你可以在你的电脑上进行各种工作，比如写报告、发送电子邮件等。但你不能更改办公室的安全系统或者修改其他员工的工作记录，因为这超出了你的权限。
> * **申请特殊权限**：如果你需要进入公司的服务器房间（一个受限的区域），你需要向管理人员提出请求。如果他们批准了你的请求，他们会陪你进入或代你完成任务。
>
> 内核模式：
>
> * **管理层权限**：管理人员有更多的权限。他们可以进入服务器房间，更改安全设置，访问所有员工的工作记录等。
> * **严格的规则和审核**：尽管管理人员有更多的权限，但他们在行使这些权限时仍然受到公司政策和法律的约束。即使是CEO，也不能随意查看员工的个人信息或者更改财务记录，他们需要有合法的理由，并且通常需要其他形式的审核或同意。

对于文件有以下的system calls（是POSIX提供的system call API）

* open: 在操作系统中注册文件，必须在对文件进行任何操作前进行。会返回一个文件描述符，是一个index into the list of open files maintained by the OS
* read: 读数据
* write：写数据
* Close：De-register

#### Trap

用户进程通过call一个在standard C library中名为system call wrapper function。这个wrapper function发起一个low-level的trap指令（汇编中）用来从user mode切换为kernel mode。wrapper function只用来发起system call，没有别的作用。

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240405010237591.png" alt=""><figcaption></figcaption></figure>

在这之中会有一些magic。为了解决无法从user mode调用kernel mode函数的问题，在发出trap instructions之前，会在一个众所周知的地方（rigister，stack）中存储一个索引，然后，一旦切换到kernel mode，这个index就会被用来查找内核的服务函数，进行调用。某些函数调用可能需要参数，这些参数可以通过寄存器传结构体指针。

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240405010740510.png" alt="" width="563"><figcaption></figcaption></figure>

### OS Architecture

#### Traditional UNIX

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240405010910147.png" alt=""><figcaption></figcaption></figure>

#### 模块化kernel

大多数现代操作系统实现了模块化kernel，使用类似面向对象的方法，每个核心组件都是独立的，它们通过已知接口相互通信。

可以在内核中按需加载，因此您可以下载新的设备驱动程序到您的操作系统并在运行时加载，或者当插入设备时加载。

总的来说，类似于分层架构，但更加灵活，因为所有需要驱动程序或内核功能都不需要编译进内核二进制文件。

但注意，这些separation of modules是逻辑层面的，而不是显示层面的，因为所有的kernel code在同一个特权地址空间内运行，所以你可以写一个删除其他module的module。

这有益于微内核架构。

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240405011344020.png" alt="" width="375"><figcaption></figcaption></figure>

#### Microkernel

微内核设计就是尽可能把原来在kernel mode中运行的内容转移到user space，例如文件系统，设备驱动

其通信使用message passing

* 例如，硬盘设备的设备驱动程序可以在用户空间中运行所有逻辑
* 但是当它需要直接与硬件通信时，使用特权I/O端口指令，它必须向内核发送请求这样做的消息。

好处：

* 更容易扩展
* 更容易迁移
* 更可靠（如果设备驱动程序失败，它可以重新加载）
* 更安全，因为内核代码少不复杂，因此不太可能出现1安全漏洞
* 系统可以从device driver中恢复，这通常会在Windows中引起“蓝屏死机”，在Linux中引起“内核恐慌”。

坏处：

* 用户空间到内核空间的性能开销通信

### Virtual Machines

* 虚拟机允许在一个操作系统中运行另一个操作系统
* 虚拟机提供与底层裸硬件相同的接口
* 操作系统主机创建了一个假象，即一个进程拥有自己的处理器和（虚拟）内存。
* 每个客人都会提供一个（虚拟）底层计算机的副本，因此可以在Linux上安装例如Windows 10 作为客人操作系统。

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240405012027798.png" alt=""><figcaption></figcaption></figure>

### Linux Device Drivers

设备驱动程序是一种允许其他程序通过controller与外部设备进行交流的软件。

设备驱动程序在kernel mode下运行（某些设备管理软件可能会在用户模式下运行，但通常这些不会被称为“驱动程序”）。

**用户视角**

每个设备驱动在`/dev`目录下都有一个特殊的文件与之关联，通过五个系统调用与设备交互：

* `open`：使设备可用。
* `read`：从设备读取数据。
* `write`：向设备写入数据。
* `ioctl`：在设备上执行操作（可选的）。
* `close`：使设备不可用。

**内核视角**

* 每个文件可能有与之相关联的函数，当对应的系统调用被执行时，这些函数会被调用。
* `linux/fs.h`文件列出了所有可对文件执行的操作。
* 设备驱动至少实现了`open`、`read`、`write`和`close`这几个函数。

#### 自动设备识别

目前，我们已经看到了设备如何通过显式方式添加和使用

而如今，设备的自动识别很重要。这需要适当的硬件支持。

例如，每个设备响应唯一的vendor（制造商） id and product id当被探测（prbed）时。对于一些特定的devices（USB），设备还会响应种类（usb-storage）

每个设备驱动程序都保留一个列表，列出它负责的设备和类型。

所有的设备相关信息都在/sys文件系统下，是user space.

kernel会跟踪这个信息：

* 在OS中，一个kernel中的special program会在boot time遍历所有的驱动，记录下每个设备的id和类型。
* 对于每个找到的device，kernel给userspace发送信息
* userspace的特殊程序（udev）在/dev中生成对应的条目，加载合适的模块

#### 设备分类

内核还跟踪

* 设备的物理依赖：例如链接到USB-hub上的设备
* 总线：处理器和一个或多个设备之间的通道。可以是物理的（例如pci，usb），也可以是逻辑的。
* 设备类型：例如键盘，鼠标

#### 驱动的interrupts handling

* 设备发送interrupt
* CPU选择合适的handler
* Handler处理interrupt：两个重要任务
  * 要传输到/从设备的数据
  * 唤醒等待数据传输完成的进程
* 中断处理程序清除设备的中断位，这对下一个中断到达是必需的

中断处理时间必须尽可能短

数据传输快，其余处理慢

⇒ 将中断处理分为两半：

顶半部由中断处理程序直接调用

仅在设备和适当内核缓冲区之间传输数据，并安排软件中断以启动底半部

底半部仍在中断上下文中运行并完成剩余的处理（例如通过协议栈工作和唤醒进程）

### 总结

#### 内存管理

* 管理有限资源十分重要
* 每个进程需要隔离memory
* 如果memory需求太高，那么需要swap
* 通过查询paging和segmentation去达到这一点
* 需要硬件支持

#### 内核编程

* 内核对所有资源都能访问
* 和用户进程有分别的内存区域
* 有两种内核代码。
  * 处理终端的内核代码
  * 通过system call为用户进程服务的

#### 驱动

驱动实现了open read write close with common structure.

### Practice Problems

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240405013816615.png" alt=""><figcaption></figcaption></figure>

> Commands executed in kernel mode have no restrictions, while operations that may affect security cannot be executed in user mode.

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240405014008283.png" alt=""><figcaption></figcaption></figure>

> 1 3 5 6 7 8 (4?)

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240405014226339.png" alt=""><figcaption></figcaption></figure>

> The kernel runs all the time, hence any leaked memory will never be recovered. If there is insufficient memory left, the OS will crash.

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240405014300009.png" alt=""><figcaption></figcaption></figure>

> Some interrupts are typically disabled while interrupts are processed. A long interrupt processing time increases the danger of losing other interrupts.

<figure><img src="https://cdn.jsdelivr.net/gh/indexss/imagehost@main/img/image-20240405014326093.png" alt=""><figcaption></figcaption></figure>

> The security and safety mechanmisms enforced by the OS may be bypassed, resulting in illegal data access or system crashes.

\
