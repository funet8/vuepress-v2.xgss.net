# Python自学17 - Python读写CSV文件

在数据处理和分析的工作中，CSV（Comma-Separated Values，逗号分隔值）文件是一种非常常见的数据存储格式。

它结构简单、易于阅读，并且被广泛应用于 Excel、数据库、数据分析工具等场景之间的数据传输。

Python 作为一门强大的编程语言，提供了多种便捷的方式来读写 CSV 文件，本次课程将详细介绍两种常用的方法：使用 Python 内置的csv模块和第三方库pandas，帮助大家轻松掌握 CSV 文件的操作技巧。

------

## 1️⃣ 什么是 CSV 文件

- **纯文本格式**，以逗号（`,`）分隔字段
- 每一行代表一条记录
- 第一行通常是表头（列名）
- 兼容性好，可用 Excel、Google Sheets、数据库等直接打开

示例：

```
Name,Age,City
Alice,30,New York
Bob,25,Los Angeles
Charlie,35,Chicago
```

------

## 2️⃣ Python 读写 CSV 的常用方式

Python 提供了两种主流方式：

| 方法         | 特点                   | 适用场景             |
| ------------ | ---------------------- | -------------------- |
| `csv` 标准库 | 内置，无需安装         | 小文件、简单读写     |
| `pandas` 库  | 功能强大，支持数据分析 | 大文件、复杂数据处理 |

------

## 3️⃣ 使用 `csv` 模块读写

### 3.1 读取 CSV 文件

```python
import csv

# 读取 CSV 文件
with open('input.csv', mode='r', newline='', encoding='utf-8') as infile:
    reader = csv.reader(infile)
    for row in reader:
        print(row)  # 每行是一个列表
```

**注意事项：**

- `newline=''` 避免多余空行
- `encoding='utf-8-sig'` 可避免 Excel 打开时中文乱码

------

### 3.2 写入 CSV 文件

```python
import csv

data = [
    ['Name', 'Age', 'City'],
    ['Alice', 30, 'New York'],
    ['Bob', 25, 'Los Angeles']
]

with open('output.csv', mode='w', newline='', encoding='utf-8-sig') as outfile:
    writer = csv.writer(outfile)
    writer.writerows(data)  # 一次写入多行
```

------

### 3.3 使用字典读写（更直观）

```python
import csv

# 写入
with open('people.csv', mode='w', newline='', encoding='utf-8-sig') as f:
    fieldnames = ['Name', 'Age', 'City']
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerow({'Name': 'Alice', 'Age': 30, 'City': 'New York'})
    writer.writerow({'Name': 'Bob', 'Age': 25, 'City': 'Los Angeles'})

# 读取
with open('people.csv', mode='r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row['Name'], row['City'])
```

------

## 4️⃣ 使用 `pandas` 读写（推荐数据分析场景）

```python
import pandas as pd

# 读取
df = pd.read_csv('input.csv', encoding='utf-8')
print(df.head())

# 写入
df.to_csv('output.csv', index=False, encoding='utf-8-sig')
```

**优势：**

- 支持按列筛选、数据统计、缺失值处理等
- 读取速度快，适合大数据量

------

## 5️⃣ 常见问题与优化建议

1. 中文乱码
   - 用 `utf-8-sig` 编码写入，Excel 打开正常
2. 多余空行
   - 打开文件时加 `newline=''`
3. 大文件读取慢
   - `pandas.read_csv()` 加 `chunksize` 分块读取
4. 字段中包含逗号
   - 使用 `quotechar='"'` 包裹字段

------

## 6️⃣ 实战案例：合并多个 CSV 文件

```python
import pandas as pd
import glob

# 获取所有 CSV 文件路径
files = glob.glob('data/*.csv')

# 读取并合并
df_list = [pd.read_csv(file) for file in files]
merged_df = pd.concat(df_list, ignore_index=True)

# 保存
merged_df.to_csv('merged.csv', index=False, encoding='utf-8-sig')
print("合并完成！")
```

------

## 7️⃣ 总结

- **小文件** → `csv` 标准库足够
- **大文件/数据分析** → `pandas` 更高效
- 注意编码、换行、分隔符等细节
- 结合自动化脚本，可轻松实现批量数据处理



