# Python自学25 - Django快速上手

在前面的学习中，我们已经掌握了 Python 的基础语法、模块、虚拟环境以及一些常见的第三方库。今天，我们要迈入一个全新的领域——**Web 开发**。而在 Python 的 Web 框架中，**Django** 无疑是最具代表性的一员。它功能强大、生态完善，被称为“开箱即用”的框架，非常适合快速构建网站和后台系统。

## 什么是 Django？

- **全功能框架**：Django 提供了从数据库 ORM、模板引擎、表单处理到用户认证的一整套解决方案。
- **快速开发**：只需几行命令，就能生成一个可运行的 Web 项目。
- **安全可靠**：内置防护机制（如防 SQL 注入、XSS、CSRF 攻击）。
- **大厂背书**：Instagram、Pinterest、Disqus 等知名网站都使用 Django。

------

## ⚙️ 环境准备

在开始之前，请确保你已经安装了 Python（推荐 3.9+）和虚拟环境工具。

```bash
# 创建虚拟环境
python -m venv venv

# 激活虚拟环境 (Windows)
venv\Scripts\activate

# 激活虚拟环境 (Mac/Linux)
source venv/bin/activate

# 安装 Django
pip install django
```

安装完成后，可以通过以下命令确认版本：

```bash
django-admin --version
```

------

## 🚀 创建第一个 Django 项目

1. **新建项目**

   ```bash
   django-admin startproject mysite
   cd mysite
   ```

   目录结构大致如下：

   ```
   mysite/
       manage.py
       mysite/
           __init__.py
           settings.py
           urls.py
           wsgi.py
   ```

2. **运行开发服务器**

   ```bash
   python manage.py runserver
   ```

   打开浏览器访问 `http://127.0.0.1:8000/`，你会看到 Django 的欢迎页面。

------

## 📝 创建第一个应用 (App)

在 Django 中，**项目（Project）**是整体，而**应用（App）**是功能模块。比如一个电商网站可能有 `users`、`products`、`orders` 等应用。

```bash
python manage.py startapp blog
```

生成的 `blog` 目录包含：

```
blog/
    admin.py
    apps.py
    models.py
    views.py
    urls.py (需要手动创建)
```

------

## 🔗 配置 URL 与视图

1. 在 `blog/views.py` 中写一个简单的视图函数：

   ```python
   from django.http import HttpResponse
   
   def index(request):
       return HttpResponse("Hello, Django!")
   ```

2. 在 `blog/urls.py` 中配置路由：

   ```python
   from django.urls import path
   from . import views
   
   urlpatterns = [
       path('', views.index, name='index'),
   ]
   ```

3. 在项目的 `mysite/urls.py` 中引入 `blog`：

   ```python
   from django.contrib import admin
   from django.urls import path, include
   
   urlpatterns = [
       path('admin/', admin.site.urls),
       path('blog/', include('blog.urls')),
   ]
   ```

现在访问 `http://127.0.0.1:8000/blog/`，就能看到页面输出 **Hello, Django!**

------

## 🗄️ 使用数据库与模型

Django 内置 ORM，可以直接用 Python 类定义数据库表。

在 `blog/models.py` 中：

```python
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
```

然后执行：

```bash
python manage.py makemigrations
python manage.py migrate
```

这样数据库表就创建好了。

------

## 🛠️ Django 管理后台

Django 自带一个强大的后台管理系统。

1. 在 `blog/admin.py` 注册模型：

   ```python
   from django.contrib import admin
   from .models import Post
   
   admin.site.register(Post)
   ```

2. 创建超级用户：

   ```bash
   python manage.py createsuperuser
   ```

3. 登录后台：访问 `http://127.0.0.1:8000/admin/`，输入账号密码，就能在后台管理 `Post` 数据。

------

## 🎯 总结

通过以上步骤，我们已经完成了：

- 安装 Django 并创建项目
- 新建应用并配置路由
- 编写视图函数并返回响应
- 使用 ORM 定义模型并迁移数据库
- 进入 Django 自带的后台管理系统

这就是 Django 的“快速上手”流程。接下来，你可以尝试：

- 使用模板系统渲染 HTML 页面
- 编写表单并处理用户输入
- 构建一个简单的博客系统