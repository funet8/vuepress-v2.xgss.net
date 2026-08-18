# Python自学19-Python操作Word和PowerPoint文件



## 1. 前言

在日常办公中，Word 和 PowerPoint 是最常用的文档类型。

手动处理大量这类文件时，不仅耗时还容易出错。而 Python 凭借其丰富的第三方库，能够高效地实现对 Word 和 PowerPoint 文件的创建、编辑、读取等操作，极大地提升工作效率。

无论是批量生成合同、自动化制作汇报PPT，还是提取文档内容做分析，Python 都能显著提升效率，减少重复劳动。本文将详细介绍如何使用 Python 操作 Word 和 PowerPoint 文件，帮助大家掌握这一实用技能。

## 2. 常用库对比

| 库名        | 支持类型     | 核心功能                     | 优点                           | 难度 |
| ----------- | ------------ | ---------------------------- | ------------------------------ | ---- |
| python-docx | Word (.docx) | 读写段落、表格、图片、样式   | 社区成熟、语法简单             | ⭐⭐   |
| docxtpl     | Word (.docx) | 模板填充生成文档             | 支持 Jinja2 模板，适合批量生成 | ⭐⭐   |
| python-pptx | PPT (.pptx)  | 操作幻灯片、形状、图片、图表 | 功能强大，适合自动化生成       | ⭐⭐⭐  |
| pywin32     | Word/PPT     | 调用本机 Office COM 接口     | 控制力强，接近 VBA             | ⭐⭐⭐⭐ |

> **建议**：跨平台优先用 `python-docx` / `python-pptx`，Windows 且需精细控制时用 `pywin32`。

------

## 3. 操作 Word 文档

### 3.1 读取与修改 Word（python-docx）

```python
from docx import Document

# 打开文档
doc = Document("demo.docx")

# 读取段落
for para in doc.paragraphs:
    print(para.text)

# 添加段落
doc.add_paragraph("这是新添加的段落。")

# 保存
doc.save("demo_modified.docx")
```

------

### 3.2 模板批量生成 Word（docxtpl）

```python
from docxtpl import DocxTemplate

tpl = DocxTemplate("合同模板.docx")
context = {
    "name": "张三",
    "date": "2025-09-18",
    "role": "Python开发工程师"
}
tpl.render(context)
tpl.save("合同_张三.docx")
```

**应用场景**：批量生成合同、通知书、证书等。

------

## 4. 操作 PowerPoint 文档

### 4.1 创建 PPT（python-pptx）

```python
from pptx import Presentation
from pptx.util import Inches

prs = Presentation()

# 添加标题幻灯片
slide = prs.slides.add_slide(prs.slide_layouts[0])
slide.shapes.title.text = "Python 自动化 PPT"
slide.placeholders[1].text = "副标题内容"

# 添加图片
slide2 = prs.slides.add_slide(prs.slide_layouts[5])
slide2.shapes.add_picture("image.jpg", Inches(1), Inches(1), width=Inches(4))

prs.save("demo.pptx")
```

------

### 4.2 修改已有 PPT

```python
from pptx import Presentation

prs = Presentation("demo.pptx")
for slide in prs.slides:
    for shape in slide.shapes:
        if shape.has_text_frame:
            shape.text_frame.text = shape.text_frame.text.replace("旧词", "新词")
prs.save("demo_updated.pptx")
```

------

## 5. 高级玩法：调用本机 Office（pywin32）

适合需要：

- 导出为 PDF
- 保留复杂格式
- 调用 Office 内置功能（如动画、宏）

示例（Word 转 PDF）：

```python
import win32com.client as win32

word = win32.Dispatch("Word.Application")
doc = word.Documents.Open(r"C:\path\demo.docx")
doc.SaveAs(r"C:\path\demo.pdf", FileFormat=17)  # 17 = PDF
doc.Close()
word.Quit()
```

------

## 6. 实战案例：批量生成入职通知书 + 汇报PPT

```python
from docxtpl import DocxTemplate
from pptx import Presentation

staff_list = [
    {"name": "张三", "date": "2025-09-20", "role": "数据分析师"},
    {"name": "李四", "date": "2025-09-22", "role": "后端开发"}
]

# 批量生成 Word
tpl = DocxTemplate("通知书模板.docx")
for s in staff_list:
    tpl.render(s)
    tpl.save(f"通知书_{s['name']}.docx")

# 自动生成 PPT 汇报
prs = Presentation()
for s in staff_list:
    slide = prs.slides.add_slide(prs.slide_layouts[1])
    slide.shapes.title.text = f"{s['name']} 入职汇报"
    slide.placeholders[1].text = f"岗位：{s['role']}\n入职日期：{s['date']}"
prs.save("入职汇报.pptx")
```

------

## 7. 总结

- **python-docx / python-pptx**：跨平台、适合批量生成与内容提取
- **docxtpl**：模板批量生成神器
- **pywin32**：Windows 下精细控制 Office
- 可结合 **NLP** 做文档内容分析、关键词提取
- 可与 **调度脚本**（如 Airflow、Crontab）结合，实现全自动化办公流



