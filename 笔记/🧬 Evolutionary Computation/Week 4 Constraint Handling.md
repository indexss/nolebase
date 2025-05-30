 # Week 4 Constraint Handling
## Motivation
想象你要设计一堵墙，你是施工方，省钱是你的目的，但是会有Constrain，就是说，稳固度要达标。那么这个问题就可以大概表示为：
Minimize: $$
f(X) = ... 
$$ Subject to:
$$g_1(X) <= 0 , g_2(X) <= 0 ...$$
## Constraint Optimization数学形式
![](assets/Pasted%20image%2020250222184413.webp)
## EA解决Constraint优化问题的策略
- Dead penalty：抛弃infeasible的解
- Panalty Funtion：通过将惩罚函数引入目标函数，将一个受限问题转化为一个无约束问题。
- Repair：修复不可行解到可行
- Hybrid：结合多种上述方式

## Penalty Function Approach
### Essence
惩罚函数其实是一种变形的fitness函数
用于改变一个个体的rank, 从而影响selection

有几种Panalty形式：
### Static Penalties
pre-defined and fixed panalty function
$$f^{\prime}(\mathbf{x})=f(\mathbf{x})+\sum_{i=1}^mr_i(G_i(\mathbf{x}))^2$$
Equality constraints可以被转化为不等式形式：
$$h_j(\mathbf{x})\Longrightarrow h_j(\mathbf{x})-\epsilon\leq0$$
### Dynamic Penalty Functions
$$f^{\prime}(\mathbf{x})=f(\mathbf{x})+r(t)\sum_{i=1}^mG_i^2(\mathbf{x})+c(t)\sum_{j=1}^pH_j^2(\mathbf{x})$$
the larger the generation number, the larger the penalty coefficients
常用的因子函数：
![](assets/Pasted%20image%2020250222184917.webp)

## Stochastic Ranking
前面说了，Panalty Function的目的是用于改变fitness从而改变一个个体的rank, 从而影响selection。那为什么不直接改变rank呢？
![](assets/Pasted%20image%2020250222185219.webp)
其实像是一个bubble sort。

## Repair
我们先来一个图，Is是不合法的解，Ir是一个合法解。
![](assets/Pasted%20image%2020250222185420.webp)
方法：维护两个种群，一个是用于进化的种群，里面会有可行解和不可行解，而另一个种群全是用于参考的可行解，会在算法中用到，不进化，但是会发生变化。
![](assets/Pasted%20image%2020250222185656.webp)
这就是用加权平均的方法把不可行解和参考可行解进行一个结合，生成一个新解z，如果z的fitness好于Ir, 这样就意味着它违反constrains肯定比Ir还小了，那么就直接把Is用z替换。如果不是，那么就以Pr的概率用z替换Is。
![](assets/Pasted%20image%2020250222185910.webp)

一些超参数选择tips：
![](assets/Pasted%20image%2020250222185954.webp)

