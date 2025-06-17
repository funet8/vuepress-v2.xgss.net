---
title: Jenkins_Github
createTime: 2025/05/27 17:51:18
permalink: /article/e1aaz5it/
---
# Gitbook+Jenkins+Github实现文档持续集成

## 需求说明

为了搭建一个gitbook+github的团队协作文档系统，然后通过jenkins实现持续集成，也就是当你在gitlab上修改文档以后，jenkins会自动build此项目，这个时候你再通过浏览器访问就是修改后的内容。

## 技术栈说明

Gitbook： 是一个基于 Node.js 的命令行工具，可使用 Github/Git 和 Markdown 来制作精美的电子书，GitBook 并非关于 Git 的教程。

Jenkins：是一个开源软件项目，是基于Java开发的一种持续集成工具，用于监控持续重复的工作，旨在提供一个开放易用的软件平台，使软件项目可以进行持续集成 。

Github：是一个面向开源及私有软件项目的托管平台，因为只支持Git作为唯一的版本库格式进行托管，故名GitHub。



## 系统说明

```
系统： Centos7

IP： 192.168.1.5(内网穿透、腾讯云服务器)

域名： gitbook.xgss.net

github:https://github.com/funet8/g.xgss.net.git
gitee:https://gitee.com/funet8/g.xgss.net.git

https://www.gitbook.com/
```

# Jenkins和Github配置

写了这么多在说gitbook，现在说说一下jenkins，安装jenkins省略。

## 重要前提

1.GitHub收到提交的代码后要主动通知Jenkins，所以Jenkins所在服务器一定要有外网IP，否则GitHub无法访问，我的Jenkins服务器是部署在腾讯云的云主机上，带有外网IP（如果只有内网，那则需要用到内网穿透工具才能实现）；

2.本次实战要提交源码到GitHub，所以您需要有一个GitHub号，并在上面创建项目；

3.如果是内网的gitlab+jenkins则不需要有外网IP



## 基本流程

将编写的文件提交Github，Github通过Webhook钩子，通知执行jenkins，jenkins执行上线脚本或者构建动作，完成整个流程。



## 新建jenkins任务

回到主页 –> 新建任务 –> 新建一个自由风格的软件项目

![image-20210909175533313](http://imgoss.xgss.net/picgo/image-20210909175533313.png?aliyunoss)



配置触发器

身份令牌这个可以随便写，尽量复杂一些

![image-20210915182209327](http://imgoss.xgss.net/picgo/image-20210915182209327.png?aliyunoss)

生成钩子地址 JENKINS_URL/job/gitbook.xgss.net_github_online/build?token=TOKEN_NAME。将这个地址填写到github的项目webhook中。

http://0.0.0.0+端口/job/任务名/build?token=TOKEN值的链接

## 构建执行脚本

![image-20210909182715587](http://imgoss.xgss.net/picgo/image-20210909182715587.png?aliyunoss)



## Github 设置 webhooks

进入GitHub上指定的项目 –> setting –> WebHooks&Services –> add webhook –> 输入刚刚部署地址

JENKINS_URL/job/gitbook.xgss.net_github_online/build?token=TOKEN_NAME

![image-20210915182818437](http://imgoss.xgss.net/picgo/image-20210915182818437.png?aliyunoss)

## 测试能否自动提交

在git push看jenkins 能否自动执行。

有报错，在点击看具体的报错

![image-20210915184202566](http://imgoss.xgss.net/picgo/image-20210915184202566.png?aliyunoss)



发现只能有get方法，post方法会报403



写了一个shell脚本每次写完自动提交，并且通知jenkins

```
# 提交
git add .

git commit -m "提交修改文档"

git push

# webhook钩子
curl "http://JENKINS_URL/job/项目名/build?token=密钥"

#修改以下参数
SERVER='http://IP:8080'
Job_Name='gitbook.xgss.net_github_online'
Token='token123456'
USER='name'
Password='1234'

#使用curl触发jenkins
curl --user $USER:${Password} ${SERVER}/job/${Job_Name}/build?token=${Token}
```

