---
title: 基于Linux下搭建NextCloud构建自己的私有云盘
createTime: 2025/05/27 17:51:17
permalink: /article/fkaq42ee/
---
# 基于Linux下搭建NextCloud构建自己的私有网盘

## NextCloud是什么

Nextcloud是一款开源免费的私有云存储网盘项目，可以让你快速便捷地搭建一套属于自己或团队的云同步网盘，从而实现跨平台跨设备文件同步、共享、版本控制、团队协作等功能。它的客户端覆盖了Windows、Mac、Android、iOS、Linux 等各种平台，也提供了网页端以及 WebDAV接口，所以你几乎可以在各种设备上方便地访问你的云盘。他可以帮您简单快速在个人，公司电脑、服务器甚至是树莓派等设备上架设一套属于自己或者团队专属的云同步网盘，所以它是一款开源网盘的绝佳解决方案

开源地址： https://github.com/nextcloud

![nextcloud.webp](https://imgoss.xgss.net/picgo/nextcloud.webp.jpg?aliyun)

## NextCloud的版本说明

Home 家庭版本 (免费试用即社区版本)

Enterprises 企业版本



## NextCloud的特点

Nextcloud跨平台支持微软 Windows、macOS 和 Linux 的客户端应用程序，以及适用于 Android 和 apple iOS 操作系统的移动客户端下载地址。

Nextcloud文件提供了一个内置的，具有强大的协作分享功能和桌面、移动和web界面以及WebDAV形式访问。

Nextcloud群件集成了和其他生产力特性，帮助团队更快、更容易地按照您的条件完成工作。

Nextcloud Talk通过集成的屏幕共享和SIP集成，通过浏览器和移动接口提供现场、私人音频/视频会议和文本聊天()。

Nextcloud上的文件存储在一般的目录结构中，并可透过WebDAV访问。

Nextcloud可以透过OpenID或者LDAP来实现用户群组或组群间的读写权限调整，以达到分享文件的目的和利用第三方平台的OAuth2进行接入;

Nextcloud上用户可以使用基于浏览器文本编辑器、书签服务、缩放网址服务、相册以及RSS阅读器与文本查看器;

Nextcloud具有良好的扩展性，可以将文件轻松连线到DropBox、Google云端与Amazon S3中;

Tips:

Nextcloud 扩展应用安装（可离线安装）:https://apps.nextcloud.com 



# 基于docker安装NextCloud

## 环境介绍

```
系统： centos7
软件： 已安装nginx和docker
IP地址： 192.168.1.3
域名： 自备域名和SSL证书 （非必须）
```



## 1.拉取镜像

```
docker pull nextcloud
```

## 2.创建挂载文件夹

```
mkdir -p /data/docker/nextcloud
```

运行镜像，设置文件挂载

```
docker run -itd \
--restart always \
-p 8001:80 \
--name nextcloud \
-v /data/docker/nextcloud:/var/www/html  nextcloud

参数说明：
–name：设定容器名称为nextcloud
-p 8001:80 ：端口映射，将宿主机8081端口映射到容器中的80端口
-v  /data/docker/nextcloud:/var/www/html：将容器中项目的/var/www/html数据目录映射到本地
-d 是以后台形式启动
```



访问 http://192.168.1.3:8001/

![image-20220429174017302](https://imgoss.xgss.net/picgo/image-20220429174017302.png?aliyun)



安装推荐应用

![image-20220429174349778](https://imgoss.xgss.net/picgo/image-20220429174349778.png?aliyun)



## 配置HTTP访问

首先配置nginx

```
server {
        listen       80;
        server_name  n.xgss.net;
        access_log /data/wwwroot/log/n.xgss.net-access.log main_aliyun;
        error_log /dev/null;
        
	add_header Referrer-Policy "no-referrer" always;
	add_header X-Content-Type-Options "nosniff" always;
	add_header X-Download-Options "noopen" always;
	add_header X-Frame-Options "SAMEORIGIN" always;
	add_header X-Permitted-Cross-Domain-Policies "none" always;
	add_header X-Robots-Tag "none" always;
	add_header X-XSS-Protection "1; mode=block" always;
	fastcgi_hide_header X-Powered-By;

        location / {
                proxy_pass      http://127.0.0.1:8001;
                proxy_redirect off;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
}
```

重启nginx



# nextcloud 配置办公套件

支持Office文档在线预览编辑以及文件同步

![image-20220602110127039](https://imgoss.xgss.net/picgo/image-20220602110127039.png?aliyun)

进入 "管理"--->"Nextcloud 办公套件" --->从应用商店安装它

![image-20220602132605270](https://imgoss.xgss.net/picgo/image-20220602132605270.png?aliyun)

在精选应用里面



## 客户端安装

支持windows、安卓、IOS等重要平台,当然也可以到github官网上去下载最保险。

![image-20220602134039174](https://imgoss.xgss.net/picgo/image-20220602134039174.png?aliyun)



