# 如何给公司节约成本，搭建免费开源监控系统uptime-kuma

由于业务需要，我司的产品越来越多，api接口监控相对比较薄弱，对此要搭建HTTP(s)的监控系统，之前一直使用第三方的监控系统，比如阿里云的云监控。

## 基本流程

1.了解需求。

2.通过各种途径了解有没有相关免费解决方案

3.本地搭建实施，评估上线。 

4.上线部署 使用。

本文记录希望找到开源监控系统走的弯路，apimonitor和apitestplatform都有这样或者那样的问题。最终找到对应的开源监控uptime-kuma，并且有以外惊喜，如果有其他的需求也可以按照此流程进行。

![mianfei-uptime-kuma](https://imgoss.xgss.net/picgo/mianfei-uptime-kuma.jpg?aliyun)

## 业务需求

1.开源、免费

2.定时监控生产环境的接口链接，如果出现访问非200的、超时，则报警。

3.告警方式： 邮件、短信、钉钉群通知、电话等

4.支持本地Linux服务器部署

5.类似阿里云的“云监控”--站点监控，如图。第三方参考解决方案https://www.jiankongbao.com/

# 测试系统

服务器系统： Centos7

IP地址： 192.168.1.5

服务器已安装： nginx和docker

# 开源产品

在网上搜索、问同事和相关从业经验的人，是否有相关的监控产品。

# 一、系统监控产品apimonitor（项目已关闭）

apimonitor有api探测、api监控、http请求模拟、系统接口监控等功能，可以模拟http页面操作过程，并根据请求耗时和响应结果监控系统接口可用性和正确性。

开源地址： https://gitee.com/ecar_team/apimonitor

查看功能部分符合，但是需要二次开发，可以在此开源项目上开发

**1.新增告警功能，通过邮件、短信、钉钉群通知等。**

**2.新增访问时长记录。**



# 二、apitestplatform（亲测有bug）

一个web界面的接口自动化测试平台

git地址：https://github.com/342164796/apitestplatform

## 安装步骤

```
cd /data
git clone https://github.com/342164796/apitestplatform
cd apitestplatform/
首次部署需要在settings.py文件里修改mysql的地址和账户名密码为自己的数据库地址
vi apitestplatform/settings.py
'default': {
        'ENGINE': 'django.db.backends.mysql',
        'HOST': "*.*.*.*",
        'NAME': "apitestplatform",
        'USER': "user",
        'PASSWORD': "password",
        'PORT': "3306",
        # 'CHARSET': 'utf8',
        # 'COLLATION': 'utf8_general_ci',
    }

2.初始化数据库，执行如下命令：
python3.6 manage.py makemigrations
python3.6 manage.py migrate

python3.6 manage.py runserver

    
```

## 安装的踩坑记录

### **1.SyntaxError: invalid syntax**

```
# python manage.py runserver 
  File "manage.py", line 14
    ) from exc
         ^
SyntaxError: invalid syntax
python 版本太低，系统自带为2.7
升级安装 python3.6
# python -V
Python 2.7.5

# python3.6 -V
Python 3.6.8
```

### **2.Couldn't import Djang**

没有安装django

```
# python3.6 manage.py runserver 
Couldn't import Django. Are you sure it's installed and available on your PYTHONPATH environment variable? Did you forget to activate a virtual environment?

安装 Django

虚拟环境里用python3安django和uwsgi
（如果用于生产的话，则需要指定安装和你项目相同的版本）

pip3.6 install django
pip3.6 install uwsgi
```

### **3.没有安装pymysql**

```
再次报错：
# python3.6 manage.py runserver 
ModuleNotFoundError: No module named 'pymysql'
解决：
# pip3.6 install pymysql
再次报错：
# python3.6 manage.py runserver 
ModuleNotFoundError: No module named 'django_crontab'
```



### 4.没有安装django-crontab

```
报错
django.db.utils.OperationalError: (2003, "Can't connect to MySQL server on '*.*.*.*' ([Errno -2] Name or service not known)")
解决：
# pip3.6 install django-crontab

```



启动成功

```
# python3.6 manage.py runserver 
You have 29 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, base, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.
March 02, 2022 - 10:31:01
Django version 3.2.12, using settings 'apitestplatform.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

## 启动成功

```
# python3.6 manage.py runserver 

Django version 3.2.12, using settings 'apitestplatform.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

## nginx反向代理

```

server {
        listen       80;
        server_name  apitest.test.me;
        #root /data/wwwroot/web/apitest.test.me/;
        access_log /data/wwwroot/log/apitest.test.me-access.log main_aliyun;
        error_log off;

        location / {
                proxy_pass      http://127.0.0.1:8000;
                proxy_redirect off;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        }

}

绑定hosts访问
192.168.1.5 apitest.test.me
```

![image-20220302191408547](https://imgoss.xgss.net/picgo/image-20220302191408547.png?aliyun)

**添加项目报错：**

![image-20220302191630117](https://imgoss.xgss.net/picgo/image-20220302191630117.png?aliyun)

由于不太清楚报错的原因。放弃此开源项目。

# 三、开源监控uptime-kuma

继续百度搜索查找，在知乎的页面中找到一个@无为无谓 的回答，页面https://www.zhihu.com/question/23755976

他推荐了一个开源产品，uptime-kuma。

uptime-kuma地址：https://github.com/louislam/uptime-kuma

反向代理教程： https://github.com/louislam/uptime-kuma/wiki/Reverse-Proxy

演示网站: 

https://demo.uptime.kuma.pet:27000/ 创建管理员账号，有10分钟的体验时间。

![image-20220303095626971](https://imgoss.xgss.net/picgo/image-20220303095626971.png?aliyun)

查看演示基本能满足需要，在本地搭建测试，功能都符合我的要求，居然还有惊喜，首先界面很精美，再次除了有基本的HTTP(S)的监控的，还有TCP端口监控、PING监控、HTTP（s）关键字监控、DNS监控、Push监控、Steam Game Server监控，功能相当多，重点是都是免费的，只要有服务器，或者局域网的虚拟机（可访问外网）就可以监控你的各种服务。

## docker部署uptime-kuma

本次使用docker安装如果，需要非docker参考开源文档。

```
# mkdir -p /data/docker/uptime-kuma/data
# docker run -d --restart=always -p 3001:3001 -v /data/docker/uptime-kuma/data:/app/data --name uptime-kuma louislam/uptime-kuma:1


# netstat -tunpl|grep 3001
tcp6       0      0 :::3001                 :::*                    LISTEN      29542/docker-proxy- 
```

访问：

http://192.168.1.5:3001 访问，创建管理员账号。

![image-20220303095955001](https://imgoss.xgss.net/picgo/image-20220303095955001.png?aliyun)

## nginx代理访问

```
server  {
    listen 80;
    server_name    uptime.test.me;
    location / {
        proxy_pass         http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection "upgrade";
        proxy_set_header   Host $host;
    }
}
绑定hosts访问
192.168.1.5 uptime.test.me
```



## 基本设置

设置里面功能还比较齐全，有外观设置，消息通知重点是消息通知有，邮件、钉钉、短信、飞书等等的第三方通知，相当齐全。



![image-20220303100108350](https://imgoss.xgss.net/picgo/image-20220303100108350.png?aliyun)

## 外观设置

![image-20220303100124220](https://imgoss.xgss.net/picgo/image-20220303100124220.png?aliyun)

## 通知设置

![image-20220303100147192](https://imgoss.xgss.net/picgo/image-20220303100147192.png?aliyun)

## 创建监控项

![image-20220303101158956](https://imgoss.xgss.net/picgo/image-20220303101158956.png?aliyun)

### HTTPS监控图

![image-20220303101238140](https://imgoss.xgss.net/picgo/image-20220303101238140.png?aliyun)

## 端口TCP检测

![image-20220303103938780](https://imgoss.xgss.net/picgo/image-20220303103938780.png?aliyun)

关闭nginx，80端口：

```
systemctl stop nginx
```

报错：

![image-20220303104845202](https://imgoss.xgss.net/picgo/image-20220303104845202.png?aliyun)



## 重置密码

Docker环境

```
docker exec -it <container name> npm run reset-password
```

非Docker环境

```
# cd 项目目录
# npm run reset-password
```

https://github.com/louislam/uptime-kuma/wiki/Reset-Password-via-CLI

## 配置消息通知

Uptime Kuma提供多种的消息推送，详情请参考：https://github.com/louislam/uptime-kuma/issues/284

![image-20220303143854247](https://imgoss.xgss.net/picgo/image-20220303143854247.png?aliyun)

我这里需要Bark手机APP、配置邮件、钉钉群通知的演示，还有阿里云短信也是比较方便快捷的提醒。

### 配置Bark

Brak是苹果系统的一款推送软件。ios手机安装app，APP内可以获取推送地址： https://api.day.app/{密钥}/这里改成你自己的推送内容

```
https://api.day.app/{密钥}/这里改成你自己的推送内容
```



![image-20220303135120761](https://imgoss.xgss.net/picgo/image-20220303135120761.png?aliyun)

后面不能有中文，有测试测试会报错

![image-20220303135219785](https://imgoss.xgss.net/picgo/image-20220303135219785.png?aliyun)

点击“测试一下”收到消息

![image-20220303135341440](https://imgoss.xgss.net/picgo/image-20220303135341440.png?aliyun)

模拟测试

![image-20220303140013934](https://imgoss.xgss.net/picgo/image-20220303140013934.png?aliyun)

恢复测试：

![image-20220303140125375](https://imgoss.xgss.net/picgo/image-20220303140125375.png?aliyun)

### 钉钉群通知

了解更多：https://developers.dingtalk.com/document/robots/custom-robot-access

钉钉群获取WebHookUrl：假设为https://oapi.dingtalk.com/robot/send?access_token=abc123456

WebHookUrl:填写完整的地址、SecretKey则填写abc123456的值，我开始填写了错了，测试很久没有通过。

![image-20220303153135776](https://imgoss.xgss.net/picgo/image-20220303153135776.png?aliyun)

### 配置邮箱

如图配置，主机名、端口号、密码不是163的登录密码，需要在163邮箱后台开通开启IMAP/SMTP服务。获取授权密码。

![image-20220303152548306](https://imgoss.xgss.net/picgo/image-20220303152548306.png?aliyun)

测试发送邮件：

![image-20220303152834582](https://imgoss.xgss.net/picgo/image-20220303152834582.png?aliyun)

## 禁用身份验证

这是可选的，如果不禁用游客访问需要用户名和密码，但是你关掉后，就可以自由访问了。（后台后上角的设置，然后拉到最下面即可看到！）

![image-20220303143355330](https://imgoss.xgss.net/picgo/image-20220303143355330.png?aliyun)

## 设置Status Page

这个功能还是很重要的，可以把新建的监控服务放置到这个监控页面，这样就可以随时随地的看到每个系统的状态了。

点击右上角的Status Page，开始编辑，具体看图：

![image-20220303143512692](https://imgoss.xgss.net/picgo/image-20220303143512692.png?aliyun)

首页默认就会是这样的状态页。

![image-20220303143559272](https://imgoss.xgss.net/picgo/image-20220303143559272.png?aliyun)