---
title: 开源免费简洁美观的网盘系统Z-File
createTime: 2025/05/27 17:51:17
permalink: /article/tez36g36/
---
# 开源免费简洁美观的网盘系统Z-File

## 什么是zfile

此项目是一个在线文件目录的程序, 支持各种对象存储和本地存储, 使用定位是个人放常用工具下载, 或做公共的文件库.

前端基于 h5ai 的原有功能使用 Vue 重新开发、后端采用 SpringBoot, 数据库采用内嵌数据库.

Z-File 的功能整体上与 Cloudreve 比较相似，但 ZFile 是基于 Java 开发的，而后者是 PHP 的，大家可以根据实际情况选择。另作者也表示，Z-File 不会向多账户方向开发，代码结构会保持相对简单，所以更加适合个人自用而不是用于搭建多人网盘。

## 系统特色

* Docker 支持
* 文件数据库 (免安装)
* 直链功能
* 图片模式
* 文件夹密码
* 忽略文件夹
* 自定义 JS, CSS
* 自定义目录的 readme 说明文件
* 支持在线浏览文本文件, 视频, 图片, 音乐. (支持 FLV 和 HLS)
* 文件/目录二维码
* 同时挂载多个存储策略
* 缓存动态开启, ~~缓存自动刷新 (v2.2 及以前版本支持)~~
* ~~全局搜索 (v2.2 及以前版本支持)~~
* 支持 S3 协议, 阿里云 OSS, FTP, 华为云 OBS, 本地存储, MINIO, OneDrive 国际/家庭/个人版/世纪互联版/SharePoint, , 七牛云 KODO, 腾讯云 COS, 又拍云 USS.

## 部署方法

### 系统说明

```
系统：centos7

配置：2C2G+100G

IP：192.168.1.4

软件： nginx1.16
```



### 1.安装依赖

```
# yum install -y java-1.8.0-openjdk unzip
```



### 2.下载项目

```
我的安装目录为：/data/wwwroot/web/
su -l www
cd /data/wwwroot/web/
wget -P https://c.jun6.net/ZFILE/zfile-release.war
mkdir z.xgss.net && unzip zfile-release.war -d z.xgss.net
chmod +x /data/wwwroot/web/z.xgss.net/bin/*.sh
```

### 常用命令

```
/data/wwwroot/web/z.xgss.net/bin/start.sh       # 启动项目
/data/wwwroot/web/z.xgss.net/bin/stop.sh        # 停止项目
/data/wwwroot/web/z.xgss.net/bin/restart.sh     # 重启项目
```



由于服务器8080端口被占用，所以修改端口为9000

```
vim /data/wwwroot/web/z.xgss.net/WEB-INF/classes/application.yml
port: 8080 改为 9000
再次启动项目
/data/wwwroot/web/z.xgss.net/bin/start.sh
```



### 防火墙开启端口

根据实际端口开启9000端口，修改你自己的端口防火墙

```
iptables：
iptables -A INPUT -p tcp --dport 9000 -j ACCEPT
service iptables save 
systemctl restart iptables

firewall：
firewall-cmd --zone=public --add-port=9000/tcp --permanent # 开放 9000 端口
firewall-cmd --reload                                      # 重启firewall

```

启动：
/data/wwwroot/web/z.xgss.net/bin/start.sh

```
/data/wwwroot/web/zfile/bin/start.sh 
apm home: 
OPTS param: 
Starting the zfile-2.7 ...OK!
PID: 7006
```

### 浏览器访问： ip+端口

http://192.168.1.4:9000

![image-20220531191554175](https://imgoss.xgss.net/picgo/image-20220531191554175.png?aliyun)

填写相关信息



进入后台

![image-20220531191724690](https://imgoss.xgss.net/picgo/image-20220531191724690.png?aliyun)



## 配置nginx

域名： z.xgss.net

nginx配置如下，zfile的端口为84：

```
server {
	listen 80;
    server_name z.xgss.net;
    access_log /data/wwwroot/log/z.xgss.net.log main_aliyun;
    error_log off;

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:84;
    }
}
```





![image-20210901102300531](https://imgoss.xgss.net/picgo/image-20210901102300531.png?aliyun)

## 配置驱动器

支持本地存储、阿里云OSS、腾讯云COS、FTP、ONEDRIVE 七牛云等，这里显示本地存储

![image-20210901102720907](https://imgoss.xgss.net/picgo/image-20210901102720907.png?aliyun)

![image-20210901102629350](https://imgoss.xgss.net/picgo/image-20210901102629350.png?aliyun)



## 参考地址

演示站地址: https://zfile.jun6.net/

后端 github 地址: https://github.com/zhaojun1998/zfile

后端 github 地址: https://github.com/zhaojun1998/zfile-vue

部署教程地址:
https://github.com/zhaojun1998/zfile



