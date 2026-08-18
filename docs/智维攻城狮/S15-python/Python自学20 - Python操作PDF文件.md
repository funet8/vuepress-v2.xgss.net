# Python自学20 - Python操作PDF文件

在自动化办公和数据处理场景中，PDF 是一种常见的文档格式。Python 提供了多种库来操作 PDF 文件，常见任务包括 **读取、提取文本、提取表格、合并、拆分、旋转、加密/解密** 等。



 本文将介绍两类主流方案：

- **`pdfplumber`**：擅长提取文本和表格
- **`pypdf`（PyPDF2 升级版）**：擅长结构化操作（合并、拆分、旋转、加密等）

------

## 1. 环境准备

```bash
pip install pdfplumber
pip install pypdf
```

> `pypdf` 是 `PyPDF2` 的继任者，API 更现代化，性能更好。

------

## 2. 使用 pdfplumber 提取内容

### 2.1 提取文本

```python
import pdfplumber

with pdfplumber.open("example.pdf") as pdf:
    for page in pdf.pages:
        text = page.extract_text()
        print(text)
```

- **优点**：对扫描版 PDF 也能较好提取（结合 OCR 工具效果更佳）
- **适用场景**：全文检索、内容分析

------

### 2.2 提取表格并保存为 Excel

```python
import pdfplumber
from openpyxl import Workbook

with pdfplumber.open("table.pdf") as pdf:
    table = pdf.pages[0].extract_table()

wb = Workbook()
ws = wb.active
for row in table:
    ws.append(row)
wb.save("output.xlsx")
```

- **适用场景**：财务报表、数据统计表格提取

------

## 3. 使用 pypdf 操作 PDF 结构

### 3.1 读取 PDF 基本信息

```python
from pypdf import PdfReader

reader = PdfReader("example.pdf")
print("页数：", len(reader.pages))
print("元数据：", reader.metadata)
```

------

### 3.2 合并 PDF

```python
from pypdf import PdfMerger

merger = PdfMerger()
merger.append("file1.pdf")
merger.append("file2.pdf")
merger.write("merged.pdf")
merger.close()
```

------

### 3.3 拆分 PDF

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("example.pdf")
for i, page in enumerate(reader.pages):
    writer = PdfWriter()
    writer.add_page(page)
    with open(f"page_{i+1}.pdf", "wb") as f:
        writer.write(f)
```

------

### 3.4 旋转页面

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("example.pdf")
writer = PdfWriter()

page = reader.pages[0]
page.rotate(90)  # 顺时针旋转90度
writer.add_page(page)

with open("rotated.pdf", "wb") as f:
    writer.write(f)
```

------

### 3.5 加密 PDF

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("example.pdf")
writer = PdfWriter()

for page in reader.pages:
    writer.add_page(page)

writer.encrypt("123456")  # 设置密码
with open("encrypted.pdf", "wb") as f:
    writer.write(f)
```

------

## 4. 常见问题与优化建议

| 问题         | 解决方案                                         |
| ------------ | ------------------------------------------------ |
| 提取文本乱码 | 尝试 `pdfplumber` 或结合 OCR（如 `pytesseract`） |
| 表格错位     | 调整 `pdfplumber` 的 `table_settings` 参数       |
| 大文件合并慢 | 分批合并，减少内存占用                           |
| 批量处理     | 使用 `glob` 遍历文件夹批量操作                   |

------

## 5. 总结

- **pdfplumber**：适合内容提取（文本、表格）
- **pypdf**：适合结构化操作（合并、拆分、旋转、加密）
- 两者结合，可以覆盖绝大多数 PDF 自动化需求
- 在批量处理、自动化办公、数据分析等场景中，Python 操作 PDF 能显著提升效率

