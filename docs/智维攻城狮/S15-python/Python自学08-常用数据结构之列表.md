# Python自学08-常用数据结构之列表



大家好，这里是**星哥玩云**，今天我们继续Python自学系列的第八篇——带你深入了解Python中最常用、最灵活的**数据结构之一——列表（List）**。

列表几乎无处不在，从处理简单的任务清单，到存储复杂的数据集合，Python的列表都能游刃有余地帮你搞定。今天，我们不仅要学会怎么用，还要学会怎么用得漂亮、高效。

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755222274233.png?tx)

## 一、列表是什么？
列表（List）是Python内置的一种可变（Mutable）、有序（Ordered）的数据结构，用来存放一组元素。它的特点是：
- **有序**：元素按照插入的顺序排列。
- **可变**：支持增、删、改操作。
- **类型不限**：可以存储数字、字符串、对象，甚至是另一个列表。

创建一个列表很简单：
```python
# 创建列表
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = ["Python", 3.14, True, [1, 2, 3]]

print(fruits)
```



## 二、常用操作

列表的强大在于它的灵活操作。我们先来看看常用方法和用法。

### 1. 访问元素

```python
fruits = ["apple", "banana", "cherry"]
print(fruits[0])  # apple
print(fruits[-1]) # cherry
```

**小技巧**：负数索引可以从右往左数，`-1` 是最后一个元素。

### 2. 添加元素

```python
fruits.append("orange")  # 末尾添加
fruits.insert(1, "grape") # 指定位置插入
```

### 3. 删除元素

```python
fruits.remove("banana") # 按值删除
del fruits[0]           # 按索引删除
last = fruits.pop()     # 弹出末尾元素
```

### 4. 修改元素

```python
fruits[0] = "watermelon"
```

### 5. 切片操作

```python
numbers = [0, 1, 2, 3, 4, 5]
print(numbers[1:4]) # [1, 2, 3]
print(numbers[:3])  # [0, 1, 2]
print(numbers[::2]) # [0, 2, 4]
```



## 三、常用方法速查表

| 方法           | 作用             | 示例                   |
| -------------- | ---------------- | ---------------------- |
| `append(x)`    | 末尾添加         | `list.append(5)`       |
| `insert(i, x)` | 指定位置插入     | `list.insert(1, "hi")` |
| `remove(x)`    | 删除第一个匹配值 | `list.remove("hi")`    |
| `pop([i])`     | 弹出并返回元素   | `list.pop(0)`          |
| `sort()`       | 排序（默认升序） | `list.sort()`          |
| `reverse()`    | 反转列表         | `list.reverse()`       |
| `count(x)`     | 统计元素出现次数 | `list.count(2)`        |
| `index(x)`     | 查找元素索引     | `list.index("hi")`     |



## 四、列表推导式——优雅的创建方式

Python的**列表推导式**让你用一行代码完成复杂的列表生成，非常优雅。

```python
# 生成0到9的平方
squares = [x**2 for x in range(10)]
print(squares)

# 生成偶数
evens = [x for x in range(20) if x % 2 == 0]
```



## 五、列表与性能优化

在实际工作中，列表操作虽然灵活，但要注意性能：

- **大量插入/删除**建议使用`collections.deque`，性能更好。
- **频繁查找**时，可以考虑用`set`替代列表。
- **深拷贝与浅拷贝**要分清：

```python
import copy
a = [[1,2],[3,4]]
b = copy.deepcopy(a) # 深拷贝，互不影响
```



## 六、总结

列表是Python初学者最先接触、也是使用频率最高的数据结构之一。掌握它的常用方法、切片、推导式，不仅能写出更简洁的代码，还能大幅提升你的工作效率。



> **星哥寄语**：别小看一个小小的`[]`，它可能装下的是你整个项目的数据世界。