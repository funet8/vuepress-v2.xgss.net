# Docker部署搭建一个开源强大的图书管理系统



大家好，我是星哥，作为一个电子图书收集者，想要管理自己的几百本的电子书，确实不好整理，直到我发现这个开源项目。而且可以在Docker中部署。搭建一个开源且强大的图书管理系统，管理并且在线浏览自己搜集到的电子书。

# talebook简介

一个简洁但强大的私人书籍管理系统。

它基于calibre项目构建，具备书籍管理、在线阅读与推送、用户管理、SSO登录、从百度/豆瓣拉取书籍信息等功能。

开源地址：https://github.com/talebook/talebook

**友情提醒：中国境内网站，个人是不允许进行在线出版的，维护公开的书籍网站是违法违规的行为！建议仅作为个人使用！**

# 主要特点

- 美观的界面：由于Calibre自带的网页太丑太难用，于是基于Vue，独立编写了新的界面，支持PC访问和手机浏览；
- 支持多用户：为了网友们更方便使用，开发了多用户功能，支持豆瓣（已废弃）、QQ、微博、Github等社交网站的登录；
- 支持在线阅读：借助epub.js 库，支持了网页在线阅读电子书（章评功能开发中）；
- 支持批量扫描导入书籍；
- 支持邮件推送：可方便推送到Kindle；
- 支持OPDS：可使用KyBooks等APP方便地读书；
- 支持一键安装，网页版初始化配置，轻松启动网站；
- 优化大书库时文件存放路径，可以按字母分类、或者文件名保持中文；
- 支持快捷更新书籍信息：支持从百度百科、豆瓣搜索并导入书籍基础信息；
- 支持私人模式：需要输入访问码，才能进入网站，便于小圈子分享网站；



![image-20241216111158059](https://imgoss.xgss.net/picgo/image-20241216111158059.png?aliyun)

# 硬件环境

星哥演示在在云服务器上，当然如果你有NAS也可以在NAS上安装，任何支持docker的硬件。

本文完整的方案会用到域名、云服务器：

- 服务器一台（必须，安装 Centos7.2 以上版本系统，如果没有请戳，http://y.xgss.net/aliyun  or http://y.xgss.net/tx 叩谢）

- 域名一个，下文以 book.xgss.net 演示。

- SSL 证书一个（三个月免费即可，本文用宝塔自动申请）

  

# Docker部署

首先是不要安装docker，这步就不介绍了。

部署比较简单，建议采用docker

执行命令 

```
docker run -d --name calibre -p <本机端口>:80 -v <本机data目录>:/data talebook/calibre-webserver
```

星哥执行如下：

```
docker run -itd --name talebook \
--restart always \
-p 8081:80 \
-v /data/docker/talebook:/data \
talebook/calibre-webserver
```

![image-20241213182416049](https://imgoss.xgss.net/picgo/image-20241213182416049.png?aliyun)

解释

```
-itd
这三个选项的组合表示容器启动时的行为：
-i (interactive)：让容器保持标准输入流打开，允许你与容器交互。通常与 -t 一起使用。
-t (tty)：分配一个伪终端，使容器可以正常处理终端输入。
-d (detached)：让容器在后台运行，而不占用当前的终端窗口。如果不加 -d，容器会在前台运行并输出日志。

--name talebook: 
给容器命名为 "talebook"，方便管理。

--restart always: 
设置容器在停止后自动重启。

-p 8081:80 端口随意设置一个本地不冲突的端口即可（宿主机端口为8081，docker为80）；

-v /data/docker/talebook:/data 
这是一个卷挂载（volume mount）选项，用于将宿主机上的某个目录挂载到容器内：
/data/docker/talebook：宿主机上的路径，容器将使用这个路径来存储数据，我们的书籍就可以放到这里了。
/data：容器内部的路径，指定容器内的路径来挂载宿主机上的文件夹。

```

部署成功

```
docker ps
CONTAINER ID   IMAGE                        COMMAND                  CREATED          STATUS          PORTS                                                 NAMES
f5303bfe1480   talebook/calibre-webserver   "/var/www/talebook/d…"   18 minutes ago   Up 18 minutes   443/tcp, 0.0.0.0:8081->80/tcp, :::8081->80/tcp        talebook
```

## 安装Talebook

通过IP+端口访问，注意防火墙和安全策略要开放端口 8081.

![image-20241213183415680](https://imgoss.xgss.net/picgo/image-20241213183415680.png?aliyun)

填写资料

是否开启私人图书馆模式，如果开启每次进入就需要输入访问码

![image-20241213183659701](https://imgoss.xgss.net/picgo/image-20241213183659701.png?aliyun)

# 配置站点

再宝塔面板中配置 http://book.xgss.net

## 添加站点

网站中，首先配置http，域名要解析到服务器中。

![image-20241216101220342](https://imgoss.xgss.net/picgo/image-20241216101220342.png?aliyun)

## 配置SSL

再

![image-20241216101347058](https://imgoss.xgss.net/picgo/image-20241216101347058.png?aliyun)

证书申请成功，如果要强制HTTPS，就勾选这里。

到期提醒设置，也要勾选。

![image-20241216101459127](https://imgoss.xgss.net/picgo/image-20241216101459127.png?aliyun)

## 访问站点

出现下图则表示，证书和站点都配置成功。

这个是默认的站点，下一步要把默认改为我们的docker镜像提供的服务。

![image-20241216101543527](https://imgoss.xgss.net/picgo/image-20241216101543527.png?aliyun)

添加反向代理

在站点管理里面点击“反向代理”，添加代理名称，目标URL填本机的8081端口。

![image-20241216101735920](https://imgoss.xgss.net/picgo/image-20241216101735920.png?aliyun)

## 再访问域名

访问https的站点，如图则成功

输入安装时候配置的密码，进入系统，这样站点配置完成。

![image-20241216102222222](https://imgoss.xgss.net/picgo/image-20241216102222222.png?aliyun)

# 使用Talebook

## 导入书籍

进入后台做一些基础的设置，把测试的数据删掉

```
由于docker部署的时候是这样的，
-v /data/docker/talebook:/data 
我们就可以把图书上传到这个目录

/data/docker/talebook/books/imports
```

![image-20241216104921305](https://imgoss.xgss.net/picgo/image-20241216104921305.png?aliyun)



扫码书籍之后，导入全部书籍

![image-20241216105223479](https://imgoss.xgss.net/picgo/image-20241216105223479.png?aliyun)



既可在线阅读了

![image-20241216105345849](https://imgoss.xgss.net/picgo/image-20241216105345849.png?aliyun)

# 结尾

通过Docker部署Talebook，用户可以轻松搭建一个功能强大且易于使用的个人书籍管理系统。无论是个人用户还是小型组织，都可以通过Talebook来管理和分享自己的电子书籍收藏。Talebook的丰富功能和便捷操作体验，将大大提高你的图书管理效率。