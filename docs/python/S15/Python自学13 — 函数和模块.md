# Python自学13 — 函数和模块

在 Python 编程学习的旅程中，当代码量逐渐增加，我们会发现重复编写相同逻辑的代码不仅耗时，还会导致程序结构混乱、难以维护。而函数与模块的出现，正是为了解决这一问题 —— 它们如同编程世界中的 “积木” 与 “工具箱”，让我们能够将复杂的程序拆解为更小、更易管理的单元，实现代码的复用与结构化。本章将系统讲解函数的定义、使用与进阶特性，以及模块的创建、导入与实战应用，为后续编写大型程序奠定基础。

## 1️⃣ 为什么要用函数和模块

- **函数**：把一段可重复使用的代码封装起来，减少重复、提高可维护性。
- **模块**：把相关功能的函数、类、变量组织到一个文件中，方便管理与复用。

📌 **一句话记忆**：

> 函数解决“代码复用”的问题，模块解决“代码组织”的问题。

------

## 2️⃣ 函数基础

### 2.1 定义函数

```python
def greet(name):
    """打印问候语"""
    print(f"Hello, {name}!")
```

- `def`：定义函数的关键字
- `name`：形参（parameter）
- `"""..."""`：函数文档字符串（docstring），用于说明函数作用

------

### 2.2 调用函数

```python
greet("星哥")
```

输出：

```
Hello, 星哥!
```

------

### 2.3 参数类型

| 参数类型   | 示例                                | 说明                   |
| ---------- | ----------------------------------- | ---------------------- |
| 位置参数   | `def add(a, b)`                     | 按顺序传值             |
| 默认参数   | `def add(a, b=10)`                  | 可不传，使用默认值     |
| 可变参数   | `def sum_all(*args)`                | 接收任意数量的位置参数 |
| 关键字参数 | `def show_info(**kwargs)`           | 接收任意数量的键值对   |
| 混合使用   | `def func(a, b=1, *args, **kwargs)` | 灵活组合               |

------

### 2.4 返回值

```python
def add(a, b):
    return a + b

result = add(3, 5)
print(result)  # 8
```

- `return` 会结束函数执行并返回结果
- 没有 `return` 时，默认返回 `None`

------

## 3️⃣ 函数进阶技巧

### 3.1 函数文档与类型注解

```python
def multiply(a: int, b: int) -> int:
    """返回两个整数的乘积"""
    return a * b
```

- 类型注解不会限制类型，但能提升可读性和 IDE 提示效果

------

### 3.2 Lambda 匿名函数

```python
square = lambda x: x ** 2
print(square(4))  # 16
```

- 适合简单逻辑，复杂逻辑建议用 `def`

------

### 3.3 函数作为参数

```python
def apply(func, value):
    return func(value)

print(apply(square, 5))  # 25
```

- Python 函数是一等公民，可以作为参数传递

------

## 4️⃣ 模块基础

### 4.1 创建模块

假设有个文件 `mymath.py`：

```python
def add(a, b):
    return a + b

def sub(a, b):
    return a - b
```

------

### 4.2 导入模块

```python
import mymath

print(mymath.add(3, 5))
```

------

### 4.3 from-import 语法

```python
from mymath import add

print(add(10, 20))
```

- 只导入需要的函数，减少命名冲突

------

### 4.4 模块别名

```python
import mymath as mm
print(mm.sub(10, 3))
```

------

### 4.5 常用内置模块

| 模块       | 作用              |
| ---------- | ----------------- |
| `math`     | 数学运算          |
| `os`       | 操作系统交互      |
| `sys`      | Python 解释器相关 |
| `datetime` | 日期时间处理      |
| `random`   | 随机数生成        |

------

## 5️⃣ `__name__ == "__main__"` 用法

```python
# mymath.py
def add(a, b):
    return a + b

if __name__ == "__main__":
    print(add(2, 3))
```

- 当模块被直接运行时，`__name__` 为 `"__main__"`
- 当模块被导入时，这段代码不会执行

------

## 6️⃣ 实战案例：拆分工具模块

项目结构：

```
project/
│── main.py
└── utils.py
```

`utils.py`：

```python
def greet(name):
    return f"Hello, {name}!"

def add(a, b):
    return a + b
```

`main.py`：

```python
from utils import greet, add

print(greet("星哥"))
print(add(10, 20))
```

好处：

- 逻辑清晰
- 方便多人协作
- 模块可复用到其他项目

------

## 7️⃣ 总结与建议

- **函数**：封装逻辑，减少重复，提高可维护性

- **模块**：组织代码，方便复用与管理

- 最佳实践：

  1. 函数名、模块名用小写+下划线
2. 每个函数只做一件事
  3. 给函数写 docstring
  4. 模块按功能拆分，不要太大