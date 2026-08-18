# Python自学21 - Python处理图像

在数据可视化、自动化办公、AI 应用和多媒体开发中，**图像处理**是一个非常常见且实用的技能。Python 拥有丰富的图像处理库，可以轻松完成读取、编辑、转换、批量处理等任务。本文将带你快速入门 Python 图像处理的核心方法与实战技巧。

------

## 1️⃣ 常用图像处理库

| 库名             | 特点                                            | 适用场景                           |
| ---------------- | ----------------------------------------------- | ---------------------------------- |
| **Pillow**       | Python Imaging Library (PIL) 的升级版，简单易用 | 基础图像处理（裁剪、缩放、加水印） |
| **OpenCV**       | 功能强大，支持计算机视觉算法                    | 图像识别、视频处理、机器视觉       |
| **scikit-image** | 基于 NumPy 的科学图像处理                       | 图像分析、特征提取                 |
| **imageio**      | 轻量级读写图像/视频                             | 格式转换、简单读取                 |

> 建议：入门先用 **Pillow**，进阶再结合 **OpenCV**。

------

## 2️⃣ Pillow 基础操作

### 2.1 安装

```bash
pip install pillow
```

### 2.2 读取与保存图片

```python
from PIL import Image

# 打开图片
img = Image.open("example.jpg")

# 保存为 PNG 格式
img.save("output.png")
```

### 2.3 查看图像信息

```python
print(img.format)   # JPEG
print(img.size)     # (宽, 高)
print(img.mode)     # RGB
```

------

## 3️⃣ 常见图像处理操作

### 3.1 缩放与裁剪

```python
# 缩放
resized = img.resize((200, 200))
resized.save("resized.jpg")

# 裁剪 (左, 上, 右, 下)
cropped = img.crop((100, 100, 400, 400))
cropped.save("cropped.jpg")
```

### 3.2 旋转与翻转

```python
# 旋转 90 度
rotated = img.rotate(90)
rotated.save("rotated.jpg")

# 水平翻转
flipped = img.transpose(Image.FLIP_LEFT_RIGHT)
flipped.save("flipped.jpg")
```

### 3.3 添加滤镜

```python
from PIL import ImageFilter

blurred = img.filter(ImageFilter.BLUR)
blurred.save("blurred.jpg")
```

------

## 4️⃣ 批量处理图片

批量处理是自动化的核心场景，例如批量压缩、加水印、格式转换。

```python
import os
from PIL import Image

input_dir = "images"
output_dir = "output"

os.makedirs(output_dir, exist_ok=True)

for file in os.listdir(input_dir):
    if file.lower().endswith((".jpg", ".png")):
        img = Image.open(os.path.join(input_dir, file))
        img_resized = img.resize((800, 800))
        img_resized.save(os.path.join(output_dir, file))
```

------

## 5️⃣ 进阶：OpenCV 简单示例

```bash
pip install opencv-python
import cv2

# 读取图片
img = cv2.imread("example.jpg")

# 转灰度
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# 保存
cv2.imwrite("gray.jpg", gray)
```

------

## 6️⃣ 实战建议

- **统一尺寸**：批量处理前先确定目标尺寸，避免比例失真
- **压缩优化**：保存时可调整 `quality` 参数减少文件体积
- **格式转换**：JPG 适合照片，PNG 适合透明背景，WebP 适合网页优化
- **自动化脚本**：将常用处理封装成函数，结合命令行参数批量执行

------

## 7️⃣ 小结

- **Pillow** 适合快速入门和日常处理
- **OpenCV** 适合计算机视觉和复杂图像分析
- 批量处理 + 自动化脚本能极大提升效率
- 图像处理不仅是美化，更是数据分析、AI 应用的重要前置步骤