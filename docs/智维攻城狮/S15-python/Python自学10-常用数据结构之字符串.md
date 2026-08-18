# Python自学10-常用数据结构之字符串

# 前言

在Python里，字符串（`str`）几乎是最常用的数据结构之一。无论是日志处理、文件解析，还是Web开发、数据分析，你都会频繁和字符串打交道。

今天这篇文章，我们就来聊聊 **Python字符串的常见操作和实用技巧**。如果你能把这些方法都玩熟，写代码时就能少走很多弯路。

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755442724589.png?tx)

------

## 一、什么是字符串？

在Python中，字符串就是用 **单引号** `'...'` 或 **双引号** `"..."` 包裹起来的一段文本。比如：

```
s1 = 'Hello'
s2 = "Python"
print(s1, s2)
```

输出：

```
Hello Python
```

另外，Python还支持 **三引号字符串**（`'''...'''` 或 `"""..."""`），常用来写多行文本：

```
msg = """星哥玩云
Python自学系列文章
字符串篇"""
print(msg)
```

------

## 二、字符串的常见操作

### 1. 拼接与重复

```
a = "Python"
b = "学习"
print(a + b)      # 拼接
print(a * 3)      # 重复
```

输出：

```
Python学习
PythonPythonPython
```

------

### 2. 索引与切片

字符串和列表一样，也能通过 **索引** 访问字符。

```
text = "Python"
print(text[0])    # P
print(text[-1])   # n
print(text[0:4])  # Pyth
```

------

### 3. 大小写转换

```
s = "hello world"
print(s.upper())   # HELLO WORLD
print(s.lower())   # hello world
print(s.title())   # Hello World
print(s.capitalize())  # Hello world
```

------

### 4. 查找与替换

```
s = "I love Python, Python is great!"
print(s.find("Python"))     # 7
print(s.rfind("Python"))    # 14
print(s.replace("Python", "Java"))
```

------

### 5. 拆分与拼接

```
s = "apple,banana,orange"
print(s.split(","))        # ['apple', 'banana', 'orange']

fruits = ['apple', 'banana', 'orange']
print("-".join(fruits))    # apple-banana-orange
```

------

### 6. 判断类型

```
print("123".isdigit())     # True
print("abc".isalpha())     # True
print("Hello123".isalnum()) # True
print("   ".isspace())     # True
```

------

### 7. 去除空格

```
s = "   Python   "
print(s.strip())   # 去掉首尾空格
print(s.lstrip())  # 去掉左边空格
print(s.rstrip())  # 去掉右边空格
```

------

## 三、字符串格式化

### 1. f-string（推荐）

```
name = "星哥"
lang = "Python"
print(f"你好，我是{name}，我正在学习{lang}")
```

------

### 2. format方法

```
print("你好，我是{}，我正在学习{}".format("星哥", "Python"))
```

------

### 3. 百分号格式化

```
print("你好，我是%s，我正在学习%s" % ("星哥", "Python"))
```

------

## 四、实战小练习

👉 **练习1**：统计一段文本里某个单词出现的次数

```
text = "Python is great, Python is easy to learn."
count = text.lower().count("python")
print(f"Python 出现了 {count} 次")
```

👉 **练习2**：快速生成一个SQL查询语句

```
table = "users"
column = "name"
value = "Alice"
sql = f"SELECT * FROM {table} WHERE {column} = '{value}'"
print(sql)
```



## 五、总结

- 字符串是Python里最常用的数据结构之一
- 掌握 **切片、拼接、查找、替换、格式化** 等常见操作，可以让你写代码更高效
- f-string 是目前最推荐的格式化方式，既简洁又直观

字符串看似简单，但其实在日常开发中，很多Bug和技巧都和它相关。建议你多练习，尤其是文本处理和日志分析的场景。