---
title: OwnCloud
createTime: 2025/05/27 17:51:17
permalink: /article/0q9gfw32/
---
# OwnCloud搭建自己的私有云盘

# OwnCloud 是什么

ownCloud 跨平台支持 Windows、Mac、Android、iOS、Linux 等平台，而且还提供了网页版和 WebDAV 形式访问，因此你可以在任何电脑、手机上都能轻松获取你的文件了，是一个开源免费专业的私有云存储项目，它能帮你快速在个人电脑或服务器上架设一套专属的私有云文件同步网盘，可以像 Dropbox 那样实现文件跨平台同步、共享、版本控制、团队协作等等。 ownCloud 能让你将所有的文件掌握在自己的手中，只要你的设备性能和空间充足，那么用起来几乎没有任何限制。 官网：https://owncloud.com/

ownCloud 不仅适用于个人使用，对经常需要传输共享文件、远程协作等需求的团队或公司更是合适！功能上也很强大：能支持文件分享、获取文件链接、文件版本历史控制 (文件删除恢复)、文件评论协作、文件共享(可设置读写权限)、图片音乐和文档等文件预览、开放 API、支持第三方应用整合等等。除了云存储之外，ownCloud 还可以用于同步日历、电子邮件联系人、网页浏览器的书签等功能。

![pexels-sarah-chai-7267390](http://imgoss.xgss.net/picgo/pexels-sarah-chai-7267390.jpg?aliyunoss)

ownCloud 项目使用了 PHP+MySQL 的经典组合，无论在自己的电脑上或是 VPS 服务器上，基本上只要能跑 WordPress 网站的机器都能运行了，安装服务器端就像用 PHP 程序建站一样简单。官方建议在 Linux (如 Ubuntu 或 CentOS) 系统下搭建，对于 Windows 作为主机的用户，可以通过 WAMP、XAMPP 等工具搭建简单的运行环境。另外，ownCloud 还提供了搭建好环境的虚拟机文件，你可以直接在 VMWare、VirtualBox、Hyper-V 中运行 ownCloud 服务器端。

## 本文需要

1.域名（非必须）

2.服务器笔者使用腾讯云（1核+2G+100G+5M）土豪可以购买更大的配置。内网使用VMware虚拟机搭建也是可以的。

3.系统：Centos7

## 使用到的技术

Linux（基于Centos7） Docker（或者LNMP，本文将数据库），Nginx+SSL等



# 基于docker安装ownCloud

1.安装docker（省略）

拉取镜像、运行

```
# docker pull owncloud
# docker images
REPOSITORY           TAG                 IMAGE ID            CREATED             SIZE
docker.io/owncloud   latest              327bd201c5fb        2 years ago         618 MB
# docker run -itd --name owncloud --restart always -p 83:80 -v /data/wwwroot/web/o.xgss.net:/var/www/html/data -d owncloud
使用IP+端口的方式访问，不点安装

```

ownCloud文件则是原封不动地将文件保存在服务器硬盘，目录结构也跟网页版 (客户端) 上看到的一样，只要别人有权限访问你的主机，那么就能绕过 ownCloud 直接查看或拷走所有用户的文件了。不过，ownCloud 这种方式也有它的优点，就是当有一天你不再想用 ownCloud，或者它因各种原因挂掉了，你的文件的备份和导出都非常方便！

ownCloud 主机服务器端还支持将文件上传到公有云服务，如 Amazon S3、Dropbox、FTP、Google Drive、OpenStack Object Storage、SMB、WebDAV、SFTP 等远程服务器，所以更加灵活。



## 2.域名解析

将 o.xgss.net 域名解析到服务器中  123.123.123.xxx

## 3.申请免费SSL证书

如果不使用https则此步骤可省略

我这边申请免费的阿里云的一年免费证书。

![image-20210830170404621](http://imgoss.xgss.net/picgo/image-20210830170404621.png?aliyunoss)

![image-20210830170417072](http://imgoss.xgss.net/picgo/image-20210830170417072.png?aliyunoss)

填写域名和基本信息

![image-20210830170447488](http://imgoss.xgss.net/picgo/image-20210830170447488.png?aliyunoss)

选择最简单的DNS验证

![image-20210830170505648](http://imgoss.xgss.net/picgo/image-20210830170505648.png?aliyunoss)

下载nxing证书

![image-20210830170938178](http://imgoss.xgss.net/picgo/image-20210830170938178.png?aliyunoss)

## 4.配置nginx

安装NGINX（省略）

http的配置

````
########################o.xgss.net############################################
upstream ownCloud_server{
    server  127.0.0.1:83;
}
server {
    listen   80;
    server_name o.xgss.net;    
    access_log /data/wwwroot/log/o.xgss.net.log main_zdy;
    error_log off;

    proxy_set_header X-Forwarded-For $remote_addr;

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        add_header Cache-Control  "no-cache";
    
        proxy_pass http://ownCloud_server;
        limit_rate 256m;        # 用户下载限速
        client_max_body_size 0; # 允许上传的文件大小无限制
        #client_max_body_size 5G;   # 允许上传的文件5G
    }
}

````

https的配置

```
upstream ownCloud_server{
    server  127.0.0.1:83;
}
# http 跳转 https
server {
  listen       80;
  access_log off;
  error_log off;
  server_name  o.xgss.net;
  return 301   https://$host$request_uri;
}
server {
	listen 443 ssl;
    server_name o.xgss.net;    
    access_log /data/wwwroot/log/o.xgss.net_ssl.log main_aliyun;
    error_log off;
    
  ssl_certificate /data/wwwroot/web/cert/o.xgss.net.pem;
  ssl_certificate_key /data/wwwroot/web/cert/o.xgss.net.key;
  ssl_session_timeout 5m;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
  ssl_prefer_server_ciphers on;
  
   proxy_set_header X-Forwarded-For $remote_addr;
    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        add_header Cache-Control  "no-cache";
    
        proxy_pass http://ownCloud_server;
        limit_rate 256m;        # 用户下载限速
        client_max_body_size 0; # 允许上传的文件大小无限制
        #client_max_body_size 5G;   # 允许上传的文件5G
    }
}

```

浏览器访问安装

默认使用SQLlite即可，如果有mysql的则可填写mysql的配置

![image-20210830172852816](http://imgoss.xgss.net/picgo/image-20210830172852816.png?aliyunoss)

下载客户端

![image-20210830172955047](http://imgoss.xgss.net/picgo/image-20210830172955047.png?aliyunoss)



# 客户端配置

ownCloud私有云盘搭建安装完成，支持跨平台支持 Windows、Mac、Android、iOS、Linux 等。以下介绍几个最常见的客户端的安装方法。

## Windows客户端

官网下载： https://owncloud.com/desktop-app/

![image-20210830184526448](http://imgoss.xgss.net/picgo/image-20210830184526448.png?aliyunoss)

## IOS客户端

App Store上搜索 owncloud即可安装

![微信图片_20210830182958](http://imgoss.xgss.net/picgo/微信图片_20210830182958.jpg?aliyunoss)

## Android客户端



官网下载https://owncloud.com/mobile-apps/

华为应用商店搜索 owncloud即可安装

![微信图片_20210830182846](http://imgoss.xgss.net/picgo/微信图片_20210830182846.jpg?aliyunoss)

## MAC客户端

官网下载： https://owncloud.com/desktop-app/

![image-20210830184526448](http://imgoss.xgss.net/picgo/image-20210830184526448.png?aliyunoss)

## WebDAV连接（windows客户端）

下载软件 RAiDrive

![image-20210830180433654](http://imgoss.xgss.net/picgo/image-20210830180433654.png?aliyunoss)