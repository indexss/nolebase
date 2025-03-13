# C 位技巧
## 枚举n-bit组合
```c
for (int i = 0; i < 8; i++) {  // 3 位总共有 2^3 = 8 种组合
    top->a = (i >> 2) & 1;  // 取 i 的第 2 位（最高位）
    top->b = (i >> 1) & 1;  // 取 i 的第 1 位（中间位）
    top->c = i & 1;
}
```

## popcount计算二进制中1的个数
```c
#include <stdio.h>
#include <stdlib.h>

int popcount(int x) {
  int count = 0;
  while (x) {
    x -= (x & -x);
    count++;
  }
  return count;
}

int main(int argc, char **argv) {
  int x = atoi(argv[1]);
  int r = popcount(x);
  printf("%d", r);
  return 0;
}

```

## 判断是否为2的幂
只有2的幂二进制里只有1个bit是1
```c
int isPowerOf2(int x) {
    return x > 0 && (x & (x - 1)) == 0;
}
```

## 交换两个数
```c
x ^= y;
y ^= x;
x ^= y;
```

## 最低/高位1的位置，求前导/尾随0的个数
```c
int lowestBitIndex(int x) {
    return __builtin_ctz(x);  // GCC和Clang自带，也可以用于求尾随0的个数
}

int highestBitIndex(int x) {
    return 31 - __builtin_clz(x);  // GCC/Clang提供，也可以用于求前导0的个数
}
```

## 设置第k位
```c
x |= (1 << k); //为1
x &= ~(1 << k); //为0
```

## 取第k位
```c
(x >> k) & 1;
```

## 构建最低位1的bit
```c
y & -y
//去掉最低位的1
y -= (y & -y)
```