# Python自学15 - 文件读写和异常处理

在 Python 编程中，文件读写是与外部数据交互的核心操作，而异常处理则是保证程序稳定性的关键机制。无论是处理配置文件、存储用户数据，还是读取日志信息，都离不开文件操作；同时，程序运行中难免出现错误（如文件缺失、数据格式错误），合理的异常处理能让程序更健壮。本章将系统讲解文件读写的完整流程和异常处理的实用技巧，帮助你解决实际开发中的数据交互与错误控制问题。

## 文件读写基础

Python 提供了内置的 `open()` 函数来操作文件，基本语法为：

```python
open(file, mode='r', encoding=None)
```

### 常用文件打开模式

| 模式 | 含义             | 注意事项                     |
| ---- | ---------------- | ---------------------------- |
| `r`  | 只读（默认）     | 文件不存在会报错             |
| `w`  | 写入（覆盖）     | 文件不存在会创建，存在会清空 |
| `a`  | 追加写入         | 文件不存在会创建             |
| `b`  | 二进制模式       | 可与其他模式组合，如 `rb`    |
| `t`  | 文本模式（默认） | 可与其他模式组合，如 `rt`    |
| `+`  | 读写模式         | 如 `r+`、`w+`                |

------

### 读取文件

```python
# 读取整个文件
with open('test.txt', 'r', encoding='utf-8') as f:
    content = f.read()
    print(content)

# 按行读取
with open('test.txt', 'r', encoding='utf-8') as f:
    for line in f:
        print(line.strip())

# 读取所有行到列表
with open('test.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    print(lines)
```

------

### 写入文件

```python
# 覆盖写入
with open('output.txt', 'w', encoding='utf-8') as f:
    f.write("Hello, Python!\n")

# 追加写入
with open('output.txt', 'a', encoding='utf-8') as f:
    f.write("追加一行内容\n")
```

------

### 读写二进制文件

```python
# 复制图片
with open('input.jpg', 'rb') as src, open('copy.jpg', 'wb') as dst:
    dst.write(src.read())
```

------

## 异常处理基础

在文件操作中，最常见的问题是**文件不存在**、**权限不足**等，这些都需要异常处理来保证程序不崩溃。

### 基本结构

```python
try:
    f = open('test.txt', 'r', encoding='utf-8')
    content = f.read()
except FileNotFoundError:
    print("文件不存在，请检查路径")
except PermissionError:
    print("没有权限访问该文件")
except Exception as e:
    print(f"发生未知错误: {e}")
finally:
    if 'f' in locals():
        f.close()
```

------

### `try-except-else-finally` 组合

```python
try:
    with open('test.txt', 'r', encoding='utf-8') as f:
        data = f.read()
except FileNotFoundError:
    print("文件未找到")
else:
    print("文件读取成功")
finally:
    print("无论是否出错，这里都会执行")
```

------

### 捕获多个异常

```python
try:
    result = 10 / 0
except (ZeroDivisionError, FileNotFoundError) as e:
    print(f"捕获到异常: {e}")
```

------

### 自定义异常

```python
class MyCustomError(Exception):
    pass

try:
    raise MyCustomError("这是一个自定义异常")
except MyCustomError as e:
    print(f"捕获到自定义异常: {e}")
```

------

## 文件操作 + 异常处理实战

下面是一个**安全读取文件**的函数模板，适合在项目中直接复用：

```python
from pathlib import Path

def safe_read_file(file_path):
    path = Path(file_path)
    if not path.exists():
        print(f"❌ 文件不存在: {file_path}")
        return None
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()
    except UnicodeDecodeError:
        print("⚠️ 文件编码错误，请检查编码格式")
    except Exception as e:
        print(f"❌ 读取文件时出错: {e}")
    return None

# 调用
content = safe_read_file('data.txt')
if content:
    print(content)
```

------

## 星哥的实战建议

- **优先使用 `with open()`**：自动管理资源，避免忘记关闭文件。
- **明确编码**：处理中文文件时显式指定 `encoding='utf-8'`。
- **异常分级处理**：针对常见错误单独捕获，其他用 `Exception` 兜底。
- **结合 `pathlib`**：路径处理更优雅，跨平台无忧。
- **日志记录**：在异常处理中记录日志，方便排查问题。



## 总结

### 文件读写

- 核心流程：打开（open()）→ 操作（read()/write()）→ 关闭（close()），推荐用with语句自动管理文件生命周期；

- 关键参数：open()的 “模式” 决定操作类型（如r只读、w写入、a追加），“encoding” 解决中文乱码；

- 大文件处理：用for循环逐行读取，避免内存占用过高。

### 异常处理

- 核心语法：try-except-else-finally，捕获指定异常并执行自定义逻辑；

- 常见异常：FileNotFoundError（文件不存在）、ValueError（数值错误）、UnicodeDecodeError（编码错误）；

- 最佳实践：捕获具体异常、用finally释放资源、自定义异常满足特殊需求。

