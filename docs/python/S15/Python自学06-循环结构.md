# Python自学06-循环结构

在 Python 中，循环结构是用于重复执行某些代码块的控制流结构。

常见的循环有 **for** 循环和 **while** 循环。

写代码像跑步：不是一口气冲到终点，而是一步步重复、调整、前进。循环就是让计算机一次次做你想要的事，直到条件满足为止。本篇带你把循环真正“用顺手”。

------

## 循环结构是什么

- **定义：** 循环是一种控制结构，用来重复执行一段代码，直到某个条件改变为止。
- **两大类型：** Python 有 `while`（基于条件）和 `for`（基于可迭代对象）。
- 典型场景：
  - **遍历：** 逐个处理列表、字符串、文件行等。
  - **搜索：** 找到第一个满足条件的元素。
  - **累积：** 求和、拼接、统计频次。
  - **生成：** 构造新列表、打印图形、生成表格。
- 选择建议：
  - **已知次数或遍历序列：** 用 `for`。
  - **基于条件持续执行：** 用 `while`。

### For 与 while 快速对照

| 项目     | for                      | while                |
| -------- | ------------------------ | -------------------- |
| 适用场景 | 遍历可迭代对象、已知次数 | 条件驱动、未知次数   |
| 终止方式 | 遍历完或 break           | 条件为假或 break     |
| 易错点   | 修改遍历对象导致遗漏     | 条件永真导致死循环   |
| 可读性   | 一般更简洁               | 逻辑灵活但需把控条件 |

------

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755050293103.png?tx)

## while 循环

- 语法：

  ```python
  while 条件:
      代码块
  else:
      可选的收尾代码
  ```

- 核心要点：

  - **条件更新：** 循环体内必须改变影响条件的变量，否则会无限循环。
  - **break 与 else：** `break` 会跳出循环并跳过 `else`；否则正常结束时才会执行 `else`。

### 示例与常见坑

- **计数式循环：**

  ```python
  i = 0
  total = 0
  while i < 5:
      total += i
      i += 1
  print(total)  # 0+1+2+3+4 = 10
  ```

- **输入重试（带限次和 else）：**

  ```python
  attempts = 0
  while attempts < 3:
      pwd = input("请输入密码: ")
      if pwd == "secret":
          print("登录成功")
          break
      attempts += 1
  else:
      print("尝试次数过多，已锁定")
  ```

- **常见错误：**

  - **忘记更新变量：** 导致死循环。
  - **条件边界写反：** `<=` 与 `<`；考虑首尾是否包含。

------

## for 循环

for 循环用于遍历可迭代对象（如列表、元组、字符串等）中的元素，按照顺序依次执行代码块。

- 语法：

  ```python
  for 变量 in 可迭代对象:
      代码块
  else:
      可选的收尾代码
  ```

- **可迭代对象：** 列表、元组、集合、字典、字符串、文件对象、`range()`、生成器等。

### 基本遍历

- 列表：

  ```python
  nums = [10, 20, 30]
  for x in nums:
      print(x)
  
  实际：
  $ cat 1.py
  nums = [10, 20, 30]
  for x in nums:
      print(x)
  $ python 1.py
  10
  20
  30
      
  ```

示例：

```
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
```



- 字符串：

  ```python
  for ch in "你好":
      print(ch)
  ```

- 字典（键、值、项）：

  ```python
  d = {"a": 1, "b": 2}
  for k in d:            # 键
      print(k)
  for v in d.values():   # 值
      print(v)
  for k, v in d.items(): # 键值对
      print(k, v)
  ```

### 嵌套循环与构造输出

- 九九乘法表：

  ```python
  for i in range(1, 10):
      for j in range(1, i + 1):
          print(f"{j}*{i}={i*j}", end="\t")
      print()
  ```

- 笛卡尔积（组合搭配）：

  ```python
  colors = ["红", "蓝"]
  sizes = ["S", "M", "L"]
  pairs = []
  for c in colors:
      for s in sizes:
          pairs.append((c, s))
  print(pairs)
  ```

------

## 常用工具 range、enumerate、zip

- **range：** 生成整数序列，常用作计数器。

  ```python
  # range(起始, 终止, 步长) 终止不包含
  for i in range(5):         # 0,1,2,3,4
      print(i)
  for i in range(1, 6):      # 1..5
      print(i)
  for i in range(10, 0, -2): # 10,8,6,4,2
      print(i)
  ```

  - **优势：** 惰性生成，节省内存。
  - **易错点：** 终止值不包含；步长为 0 会报错。

- **enumerate：** 同时拿到索引与元素。

  ```python
  fruits = ["apple", "banana", "pear"]
  for idx, name in enumerate(fruits, start=1):
      print(idx, name)
  ```

  - **优势：** 替代手写索引，代码更清晰。
  - **技巧：** `start` 调整起始编号。

- **zip：** 并行遍历多个序列。

  ```python
  names = ["A", "B", "C"]
  scores = [90, 85, 92]
  for n, s in zip(names, scores):
      print(n, s)
  ```

  - **长度不齐：** 截断为最短；如需对齐填充，可使用 `itertools.zip_longest`。
  - **解压：**

  ```python
  pairs = [("A", 1), ("B", 2)]
  xs, ys = zip(*pairs)  # xs=("A","B"), ys=(1,2)
  ```

------

## 循环控制 break、continue、else

- **break：** 立即退出当前循环。

  ```python
  for x in [3, 7, 9, 2]:
      if x % 2 == 0:
          print("找到偶数：", x)
          break
  ```

- **continue：** 跳过本次循环剩余部分，进入下一次迭代。

  ```python
  for x in range(1, 6):
      if x == 3:
          continue
      print(x)  # 输出 1,2,4,5
  ```

- **for ... else：** 没有遇到 `break` 时执行 `else`，常用于“未找到”的处理。

  ```python
  target = 7
  nums = [2, 4, 6, 8]
  for n in nums:
      if n == target:
          print("找到了")
          break
  else:
      print("未找到")  # 没触发 break 时运行
  ```

- **嵌套循环中的 break：**

  - **仅退出一层：** 需要配合标志位或封装为函数，使用 `return` 退出多层。

  ```python
  def find_pos(grid, target):
      for i, row in enumerate(grid):
          for j, val in enumerate(row):
              if val == target:
                  return i, j
      return None
  ```

------

## 实战与练习

### 实战案例

- **统计字符频次（字典计数）：**

  ```python
  s = "hello world"
  freq = {}
  for ch in s:
      if ch == " ":
          continue
      freq[ch] = freq.get(ch, 0) + 1
  print(freq)
  ```

- **去重并保留顺序：**

  ```python
  items = [1,1,2,3,2,4,3]
  seen = set()
  result = []
  for x in items:
      if x in seen:
          continue
      seen.add(x)
      result.append(x)
  print(result)  # [1,2,3,4]
  ```

- **过滤与累积（只加偶数）：**

  ```python
  nums = [1, 2, 3, 4, 5, 6]
  total = 0
  for n in nums:
      if n % 2 != 0:
          continue
      total += n
  print(total)  # 12
  ```

- **读取文件并统计行数与非空行数：**

  ```python
  line_count = 0
  nonempty = 0
  with open("data.txt", "r", encoding="utf-8") as f:
      for line in f:
          line_count += 1
          if line.strip():
              nonempty += 1
  print(line_count, nonempty)
  ```

### 练习题

1. **FizzBuzz：**  
    编写程序打印 1 到 100。遇到 3 的倍数打印 “Fizz”，5 的倍数打印 “Buzz”，同时是 3 和 5 的倍数打印 “FizzBuzz”，其余打印数字本身。

   ```python
   for i in range(1, 101):
       if i % 15 == 0:
           print("FizzBuzz")
       elif i % 3 == 0:
           print("Fizz")
       elif i % 5 == 0:
           print("Buzz")
       else:
           print(i)
   ```

2. **寻找质数：**  
    打印 2 到 100 的所有质数（用 `for ... else` 判定）。

   ```python
   for n in range(2, 101):
       for d in range(2, int(n ** 0.5) + 1):
           if n % d == 0:
               break
       else:
           print(n)
   ```

3. **扁平化二维列表：**  
    将 `[[1,2],[3,4,5],[6]]` 扁平化为 `[1,2,3,4,5,6]`（用嵌套循环）。

   ```python
   data = [[1,2],[3,4,5],[6]]
   flat = []
   for row in data:
       for x in row:
           flat.append(x)
   print(flat)
   ```

4. **并行遍历对齐输出：**  
    给定 `names = ["张三","李四","王五"]` 和 `scores = [88, 92, 79]`，输出 `1. 张三: 88` 等。

   ```python
   names = ["张三","李四","王五"]
   scores = [88, 92, 79]
   for i, (n, s) in enumerate(zip(names, scores), start=1):
       print(f"{i}. {n}: {s}")
   ```

5. **安全输入重试：**  
    模拟用户输入一个 1-10 的整数，最多 3 次，非法输入给出提示并继续，成功则打印数字并结束，失败打印“失败”。

   ```python
   tries = 0
   while tries < 3:
       raw = input("输入 1-10 的整数: ")
       if not raw.isdigit():
           print("请输入数字")
           tries += 1
           continue
       n = int(raw)
       if 1 <= n <= 10:
           print("OK:", n)
           break
       else:
           print("超出范围")
           tries += 1
   else:
       print("失败")
   ```

------

### 小结

- **首选 for：** 遍历序列、已知次数更简洁。
- **用好工具：** `range` 计数、`enumerate` 索引、`zip` 并行。
- **控制流清晰：** `break` 提前退出，`continue` 跳过本次，`for/while ... else` 负责“未找到”的优雅收尾。
- **警惕死循环：** `while` 要确保条件能变化。

想不想把这章“练成肌肉记忆”？挑 2-3 个练习亲手写一遍，再改一改边界条件试试，你会明显感觉到逻辑和直觉都被点亮了。