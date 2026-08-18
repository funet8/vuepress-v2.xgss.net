# Python自学18 - Python读写Excel文件

在日常数据处理和分析工作中，Excel 文件是最常用的数据存储格式之一。Python 作为一门强大的编程语言，拥有多个专门用于读写 Excel 文件的库，能够帮助我们高效地处理 Excel 中的数据，摆脱手动操作的繁琐。本文将详细介绍 Python 中读写 Excel 文件的常用库和具体实现方法，包括xlrd（读取 Excel 文件）、xlwt（写入 Excel 文件）以及支持新版 Excel 格式的openpyxl库，同时通过实例演示完整的操作流程，帮助大家快速掌握这一实用技能。

------

## 1️⃣ 常用库对比

在开始读写 Excel 文件之前，我们需要先了解 Python 中常用的 Excel 处理库及其适用场景。不同的库支持的 Excel 版本和功能有所差异，选择合适的库是高效处理数据的第一步。

| 库名           | 支持格式               | 主要功能                     | 适用场景         |
| -------------- | ---------------------- | ---------------------------- | ---------------- |
| **pandas**     | `.xlsx` `.xls` `.xlsm` | 高效读取/写入，支持数据分析  | 数据处理、分析   |
| **openpyxl**   | `.xlsx`                | 读写、修改单元格、样式、公式 | 报表生成、格式化 |
| **xlrd**       | `.xls`                 | 读取老版本 Excel             | 兼容旧文件       |
| **xlwt**       | `.xls`                 | 写入老版本 Excel             | 兼容旧文件       |
| **pyxlsb**     | `.xlsb`                | 读取二进制 Excel             | 特殊格式         |
| **xlsxwriter** | `.xlsx`                | 高性能写入、格式控制         | 大数据写入       |

------

## 2️⃣ 使用 pandas 快速读写

pandas 是数据分析神器，读写 Excel 十分简单。

```python
import pandas as pd

# 读取 Excel
df = pd.read_excel("data.xlsx")
print(df.head())

# 写入 Excel
df.to_excel("output.xlsx", index=False)
```

**优点**：

- 一行代码搞定读写
- 支持多 sheet
- 可直接配合数据分析

------

## 3️⃣ 使用 openpyxl 精细操作

openpyxl 专注 `.xlsx` 格式，支持单元格样式、公式、图表等。

```python
from openpyxl import load_workbook, Workbook

# 读取 Excel
wb = load_workbook("data.xlsx")
sheet = wb.active
for row in sheet.iter_rows(values_only=True):
    print(row)

# 写入 Excel
wb_new = Workbook()
ws = wb_new.active
ws.title = "Report"
ws.append(["姓名", "成绩"])
ws.append(["张三", 90])
wb_new.save("report.xlsx")
```

**适用场景**：需要修改单元格样式、合并单元格、插入图片等。

------

## 4️⃣ 处理 `.xls` 老版本文件

```python
import xlrd

wb = xlrd.open_workbook("old.xls")
sheet = wb.sheet_by_index(0)
for i in range(sheet.nrows):
    print(sheet.row_values(i))
```

⚠️ **注意**：`xlrd` 2.0+ 不再支持 `.xlsx`，如需支持请安装旧版本：

```bash
pip install xlrd==1.2.0
```

------

## 5️⃣ 读取 `.xlsb` 二进制文件

```python
from pyxlsb import open_workbook

with open_workbook("data.xlsb") as wb:
    with wb.get_sheet(1) as sheet:
        for row in sheet.rows():
            print([item.v for item in row])
```

------

## 6️⃣ 大文件优化技巧

- **pandas 分块读取**

```python
chunks = pd.read_excel("big.xlsx", chunksize=10000)
for chunk in chunks:
    process(chunk)  # 自定义处理逻辑
```

- **openpyxl 流式读取**

```python
wb = load_workbook("big.xlsx", read_only=True)
for row in wb.active.iter_rows(values_only=True):
    print(row)
```

- **xlsxwriter 常量内存模式**（写入大数据）

```python
import xlsxwriter
wb = xlsxwriter.Workbook("big_output.xlsx", {'constant_memory': True})
ws = wb.add_worksheet()
for i in range(1000000):
    ws.write(i, 0, i)
wb.close()
```

------

## 7️⃣ 常见问题与解决方案

| 问题             | 解决方案                                     |
| ---------------- | -------------------------------------------- |
| 读取加密 Excel   | 使用 `msoffcrypto-tool` 解密                 |
| 写入后文件打不开 | 确保 `save()` 或 `close()` 正确调用          |
| 中文乱码         | 指定 `encoding="utf-8"`（CSV 场景）          |
| 版本冲突         | 检查 `pandas`、`openpyxl`、`xlrd` 版本兼容性 |

------

## 8️⃣ 总结

- **快速读写** → 用 pandas
- **精细控制** → 用 openpyxl
- **兼容老文件** → 用 xlrd / xlwt
- **特殊格式** → 用 pyxlsb / xlsxwriter
- **大文件优化** → 分块读取、流式写入

掌握这些方法，你就能应对绝大多数 Excel 处理需求

