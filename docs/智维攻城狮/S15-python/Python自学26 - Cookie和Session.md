# Python自学26 - Cookie和Session

在学习 Web 开发时，**Cookie** 和 **Session** 是两个绕不开的概念。它们解决了 HTTP 协议“无状态”的问题，让服务器能够“记住”用户的状态，从而实现登录、购物车、个性化推荐等功能。本文将结合 Python 的示例来理解两者的区别与应用。

## Cookie 基础

- **定义**：Cookie 是存储在客户端浏览器中的一小段数据，由服务器发送并保存在用户本地。
- 特点：
  - 存储在浏览器端
  - 可以设置过期时间
  - 用户可手动清除
  - 容量有限（一般每个域名 4KB 左右）

### Python 设置 Cookie 示例（Flask）

```python
from flask import Flask, make_response, request

app = Flask(__name__)

@app.route('/set_cookie')
def set_cookie():
    resp = make_response("Cookie 已设置")
    resp.set_cookie("username", "Alice", max_age=60*60)  # 1小时有效
    return resp

@app.route('/get_cookie')
def get_cookie():
    username = request.cookies.get("username")
    return f"当前用户: {username}" if username else "未找到 Cookie"

if __name__ == '__main__':
    app.run(debug=True)
```

------

##  Session 基础

- **定义**：Session 是存储在服务器端的用户会话信息，通常依赖 Cookie 来保存 Session ID。
- 特点：
  - 数据保存在服务器，更安全
  - 通过唯一的 Session ID 区分用户
  - 适合存储敏感信息（如登录状态）

### Python 使用 Session 示例（Flask）

```python
from flask import Flask, session

app = Flask(__name__)
app.secret_key = "my_secret_key"  # 必须设置密钥

@app.route('/login')
def login():
    session['user'] = 'Alice'
    return "用户已登录"

@app.route('/profile')
def profile():
    user = session.get('user')
    return f"欢迎回来, {user}" if user else "请先登录"

@app.route('/logout')
def logout():
    session.pop('user', None)
    return "已退出登录"

if __name__ == '__main__':
    app.run(debug=True)
```





## Cookie 与 Session 的区别

| 特性     | Cookie（客户端存储） | Session（服务器端存储）    |
| -------- | -------------------- | -------------------------- |
| 存储位置 | 浏览器端             | 服务器端                   |
| 安全性   | 较低，容易被篡改     | 较高，敏感信息存储安全     |
| 存储容量 | 每个域名约 4KB       | 理论上无限（受服务器限制） |
| 生命周期 | 可设置过期时间       | 默认随会话结束而销毁       |
| 应用场景 | 记住用户名、偏好设置 | 登录状态、购物车、权限管理 |



好的，我们来写一个 **“记住我登录”** 的完整示例。这里用 **Flask** 框架演示，结合 **Session** 和 **Cookie**，实现用户勾选“记住我”后，即使关闭浏览器再打开，也能保持登录状态。

# Flask 实现“记住我登录”

## 核心思路

1. 用户登录时，校验用户名和密码。
2. 如果勾选了“记住我”，则设置一个持久化的 Cookie（比如 7 天有效）。
3. Session 存储用户登录状态，Cookie 保存 Session ID。
4. 下次访问时，如果 Cookie 还有效，自动恢复登录状态。



## 示例代码

```python
from flask import Flask, request, redirect, url_for, render_template_string, session, make_response
import datetime

app = Flask(__name__)
app.secret_key = "my_secret_key"  # 必须设置密钥

# 模拟用户数据库
users = {"alice": "123456", "bob": "password"}

# 简单的登录页面模板
login_page = """
<form method="POST">
  用户名: <input type="text" name="username"><br>
  密码: <input type="password" name="password"><br>
  <label><input type="checkbox" name="remember"> 记住我</label><br>
  <input type="submit" value="登录">
</form>
"""

@app.route('/')
def index():
    user = session.get('user')
    if user:
        return f"欢迎回来, {user}! <a href='/logout'>退出</a>"
    return "你还没有登录，<a href='/login'>去登录</a>"

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get("username")
        password = request.form.get("password")
        remember = request.form.get("remember")

        # 校验用户名和密码
        if username in users and users[username] == password:
            session['user'] = username
            resp = make_response(redirect(url_for("index")))

            # 如果勾选了“记住我”，设置 Cookie 有效期 7 天
            if remember:
                expire_date = datetime.datetime.now() + datetime.timedelta(days=7)
                resp.set_cookie("remember_me", username, expires=expire_date)
            return resp
        else:
            return "用户名或密码错误！<a href='/login'>重试</a>"
    return render_template_string(login_page)

@app.before_request
def load_user_from_cookie():
    """如果 session 里没有用户，但 Cookie 里有，就自动登录"""
    if 'user' not in session:
        username = request.cookies.get("remember_me")
        if username in users:
            session['user'] = username

@app.route('/logout')
def logout():
    session.pop('user', None)
    resp = make_response("已退出登录 <a href='/'>返回首页</a>")
    resp.delete_cookie("remember_me")  # 删除 Cookie
    return resp

if __name__ == '__main__':
    app.run(debug=True)
```



##  运行效果

1. 打开 `/login`，输入用户名和密码，勾选“记住我”。
2. 登录成功后，关闭浏览器再打开，访问 `/`，仍然显示已登录状态。
3. 点击“退出”，清除 Session 和 Cookie，下次访问需要重新登录。





## 总结

- **Cookie**：适合存储一些非敏感的、需要跨会话的小数据，比如“记住用户名”、“主题颜色”。
- **Session**：适合存储敏感的、与用户身份相关的数据，比如“是否已登录”、“购物车内容”。
- 在实际开发中，二者常常结合使用：**Session 存储核心数据，Cookie 保存 Session ID**。

