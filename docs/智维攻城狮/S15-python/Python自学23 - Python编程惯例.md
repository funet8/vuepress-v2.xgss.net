# Python自学23 - Python编程惯例

在 Python 自学过程中，“能写出运行的代码” 只是第一步，“写出规范、易读、易维护的代码” 才是进阶关键。Python 社区有一套公认的编程惯例（核心是 PEP 8 规范），它像 “代码的语法手册”，统一了代码风格，让不同开发者的代码 “看起来像一个人写的”。本节课我们将系统学习 Python 编程惯例，从基础格式到进阶语法，逐步养成 Pythonic（符合 Python 特性）的编程习惯。本文将梳理 Python 编程中常见的惯例与最佳实践。



在学习具体规则前，先明确遵守惯例的 3 个核心价值：

1. **提升可读性**：规范的代码无需过多注释，他人（或未来的你）能快速理解逻辑；

1. **降低协作成本**：团队开发时，统一的风格避免 “因格式争论”，聚焦业务逻辑；

1. **减少隐藏 bug**：部分惯例（如缩进、命名）能规避因格式混乱导致的语法错误（如缩进不一致引发的IndentationError）。



------

## 📝 1. 命名规范（PEP 8 推荐）

Python 的核心编程惯例来自**PEP 8（Python Enhancement Proposal 8）**，这是 Python 创始人 Guido van Rossum 主导制定的 “代码风格指南”，也是我们本节课的核心学习内容。

- **变量与函数**：使用小写字母，单词间用下划线分隔

  ```python
  user_name = "Alice"
  def calculate_total(price, tax_rate):
      return price * (1 + tax_rate)
  ```

- **类名**：采用大驼峰命名（PascalCase）

  ```python
  class DataProcessor:
      pass
  ```

- **常量**：全大写，单词间用下划线

  ```python
  MAX_RETRY = 5
  ```

- **私有属性**：前置下划线 `_`

  ```python
  _cache = {}
  ```

------

## 🎨 2. 代码风格

- **缩进**：统一使用 4 个空格（不要用 Tab 混合）

- **行宽**：建议不超过 79 个字符

- **空行**：函数、类之间空两行；类内方法之间空一行

- 导入顺序

  ：标准库 → 第三方库 → 本地模块

  ```python
  import os
  import requests
  from my_project.utils import helper
  ```

------

## 💬 3. 注释与文档

- **行内注释**：紧跟代码，前留两个空格

  ```python
  x = x + 1  # 增加计数
  ```

- **块注释**：独立成段，解释逻辑

  ```python
  # 检查用户是否已登录
  # 如果未登录则跳转到登录页
  ```

- **文档字符串（Docstring）**：用于函数、类、模块说明

  ```python
  def add(a: int, b: int) -> int:
      """
      返回两个整数的和。
  
      Args:
          a (int): 第一个整数
          b (int): 第二个整数
  
      Returns:
          int: 两数之和
      """
      return a + b
  ```

------

## ⚡ 4. 常见最佳实践

- **避免使用通配符导入**

  ```python
  # 不推荐
  from math import *
  
  # 推荐
  from math import sqrt, pi
  ```

- **使用列表推导式而非冗长循环**

  ```python
  squares = [x**2 for x in range(10)]
  ```

- **异常处理要具体**

  ```python
  try:
      result = 10 / x
  except ZeroDivisionError:
      print("除数不能为零")
  ```

- **保持函数简洁**：一个函数只做一件事，避免过长

- **善用内置函数与标准库**：如 `enumerate()`、`zip()`、`collections`

------

## 📌 5. 总结

Python 的魅力不仅在于语法简洁，更在于它倡导的 **“优雅、明确、简洁”** 的编程哲学。遵循这些惯例，你的代码将更具可读性和可维护性，也更符合社区标准。



