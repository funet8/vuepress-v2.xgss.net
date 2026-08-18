# Python自学07-从新手到高手——分支与循环结构实战解析

在 Python 自学的道路上，**分支结构**和**循环结构**是掌握编程逻辑的核心武器。理解它们，就像为你的代码装上了“方向盘”和“发动机”——会转弯、能循环，才能跑得远。

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755134866564.png?tx)

## 🧭 1. 分支结构——让代码有判断力

分支结构的核心是条件判断，根据不同条件执行不同的代码块。

### 1.1 `if` 单分支
```python
score = 85
if score >= 60:
    print("恭喜，及格了！")
```

### 1.2 `if-else` 双分支

```python
score = 55
if score >= 60:
    print("恭喜，及格了！")
else:
    print("很遗憾，下次加油！")
```

### 1.3 多分支 `if-elif-else`

```python
score = 92
if score >= 90:
    print("优秀")
elif score >= 75:
    print("良好")
elif score >= 60:
    print("及格")
else:
    print("不及格")
```

**实战小贴士**：

- 判断条件要尽量简洁明了
- 避免多余的判断，例如`elif score < 90 and score >= 75`可以简化为`elif score >= 75`

------

## 🔄 2. 循环结构——让代码重复有序地运行

循环就是让某段代码重复执行，直到满足某个退出条件。

### 2.1 `while` 循环

```python
count = 0
while count < 5:
    print("当前计数：", count)
    count += 1
```

**特点**：先判断条件，条件成立才进入循环。

### 2.2 `for` 循环

```python
for i in range(5):
    print("这是第", i, "次循环")
```

**特点**：按顺序遍历一个序列（如列表、字符串、数字范围等）。

### 2.3 `break` 与 `continue`

```python
# break 示例
for i in range(10):
    if i == 5:
        break
    print(i)

# continue 示例
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)
```

------

## 🛠 3. 分支 + 循环的实战案例

### **案例：猜数字游戏**

```python
import random

target = random.randint(1, 100)
attempts = 0

while True:
    guess = int(input("猜一个 1-100 的数字: "))
    attempts += 1
    if guess > target:
        print("太大了！")
    elif guess < target:
        print("太小了！")
    else:
        print(f"恭喜你猜对了！共用 {attempts} 次机会。")
        break
```

**亮点**：

- 循环负责重复猜测的过程
- 分支结构负责根据不同猜测结果做出反馈
- `break` 用于结束循环



### 案例：简易 ATM 模拟系统

```
balance = 1000  # 初始余额

while True:
    print("\n--- ATM 系统 ---")
    print("1. 查询余额")
    print("2. 存款")
    print("3. 取款")
    print("4. 退出")

    choice = input("请选择操作：")

    if choice == "1":
        print(f"当前余额：{balance} 元")
    elif choice == "2":
        deposit = float(input("请输入存款金额："))
        balance += deposit
        print(f"存款成功！当前余额：{balance} 元")
    elif choice == "3":
        withdraw = float(input("请输入取款金额："))
        if withdraw <= balance:
            balance -= withdraw
            print(f"取款成功！当前余额：{balance} 元")
        else:
            print("余额不足！")
    elif choice == "4":
        print("感谢使用，再见！")
        break
    else:
        print("输入有误，请重新选择。")
```

运行结果：

```
--- ATM 系统 ---
1. 查询余额
2. 存款
3. 取款
4. 退出
请选择操作：1
当前余额：1000 元
```





------

## 💡 总结

分支与循环不仅是 Python 的基础，更是所有编程语言的通用思维模式。掌握它们，就等于掌握了代码的“方向控制”和“动力系统”。

学习建议：

- 多做一些小练习，例如成绩判断、九九乘法表、批量数据处理等
- 在项目中多思考逻辑结构，写出简洁、高效、易读的代码