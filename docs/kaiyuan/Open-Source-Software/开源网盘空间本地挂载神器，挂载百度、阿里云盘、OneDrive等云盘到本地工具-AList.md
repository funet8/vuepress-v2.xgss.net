---
title: 开源网盘空间本地挂载神器，挂载百度、阿里云盘、OneDrive等云盘到本地工具-AList
createTime: 2025/05/27 17:51:17
permalink: /article/ndu1naw2/
---
# 开源网盘空间本地挂载神器，挂载百度、阿里云盘、OneDrive等云盘到本地工具-AList



## 什么是Alist

一个支持多种存储，支持网页浏览和 WebDAV 的文件列表程序，由 gin 和 Solidjs 驱动。

AList 是一款免费开源支持多存储的自建网盘程序 (文件列表程序)，可以轻松在 VPS 服务器、NAS、普通电脑 Win、Mac、Linux 上部署。它除了能作为一款自建网盘 (将文件保存在设备硬盘上) 外，最大的特色就是支持「挂载各大主流网盘」，免费将它们的空间“据为己用”！

alist 文档： https://alist.nn.ci/zh/

alist开源地址： https://github.com/alist-org/alist



![alist-logo2](https://imgoss.xgss.net/picgo/alist-logo2.png?aliyun)



## 支持的存储

![image-20230815160529357](https://imgoss.xgss.net/picgo/image-20230815160529357.png?aliyun)

## 支持存储

```
本地存储
Crypt
阿里云盘Open
阿里云盘
OneDrive /APP/ SharePoint（国际版, 世纪互联,de,us）
天翼云盘 (个人云, 家庭云)
GoogleDrive
123云盘/分享
 FTP / SFTP
PikPak / 分享
S3
又拍云对象存储
 WebDAV(支持无API的OneDrive/SharePoint)
 Teambition（中国，国际）
分秒帧
中国移动云盘 (个人云, 家庭云)
中国联通云盘
四川电信魔盘
Yandex.Disk
百度网盘 / 分享
夸克网盘
迅雷网盘
蓝奏云
阿里云盘分享
谷歌相册
Mega.nz
一刻相册
TeraBox -海外百度
AList v2/v3
 SMB
别名
115
Seafile
 Cloudreve
Trainbit
UrlTree
 IPFS
UC
Dropbox
腾讯微云
```



## 安装Alist

### 1.window系统

通过 https://github.com/alist-org/alist/releases 下载对应的版本，笔者的系统是win11，就下载 alist-windows-amd64-upx.zip

![image-20230815155753011](https://imgoss.xgss.net/picgo/image-20230815155753011.png?aliyun)

在命令行中

```
.\alist.exe server
第一次运行会出现一个随机密码
用户名：admin
密码：随机生成
```



![image-20230815155602391](https://imgoss.xgss.net/picgo/image-20230815155602391.png?aliyun)

Alist 服务成功启动之后，我们就能通过浏览器访问它了：

本机访问：http://127.0.0.1:5244

局域网访问：http://局域网IP:5244

公网访问：http://服务器公网IP:5244 (如部署在云服务器上可直接互联网访问)，如果是家庭宽带无公网 IP 的，那么需要额外配置「内网穿透」才可以实现。

![image-20230815160207669](https://imgoss.xgss.net/picgo/image-20230815160207669.png?aliyun)



### 2.linux系统安装

```
# cd /data/app
在github中下载 alist-linux-amd64.tar.gz
# wget http://js.funet8.com/centos_software/alist-linux-amd64.tar.gz


# 解压下载的文件，得到可执行文件：
tar -zxvf alist-linux-amd64.tar.gz
# 授予程序执行权限：
chmod +x alist
# 运行程序
./alist server

./alist: /usr/lib64/libc.so.6: version `GLIBC_2.28' not found (required by ./alist)

# 获得管理员信息 以下两个不同版本，新版本也有随机生成和手动设置
# 低于v3.25.0版本
./alist admin

# 高于v3.25.0版本
# 随机生成一个密码
./alist admin random
# 手动设置一个密码 `NEW_PASSWORD`是指你需要设置的密码
./alist admin set NEW_PASSWORD

```

### 3.Docker部署alist

安装docker：略

系统：linux

```
docker 安装alist
# docker run -itd \
--name alist \
-p 5244:5244 \
--restart unless-stopped \
-v /data/docker/alist:/opt/alist/data \
xhofe/alist

查看密码： 
# docker logs alist
INFO[2024-04-26 03:26:18] reading config file: data/config.json        
INFO[2024-04-26 03:26:18] config file not exists, creating default config file 
INFO[2024-04-26 03:26:18] load config from env with prefix:            
INFO[2024-04-26 03:26:18] init logrus...                               
INFO[2024-04-26 03:26:18] Successfully created the admin user and the initial password is: JF218P6X 

查看到
用户名： admin
密码： JF218P6X

```

访问 IP+端口



## nginx反向代理

宝塔中添加域名



![image-20230815164150976](https://imgoss.xgss.net/picgo/image-20230815164150976.png?aliyun)



![image-20230815164453628](https://imgoss.xgss.net/picgo/image-20230815164453628.png?aliyun)

### 域名访问

# 添加阿里云盘

1.后台 ---> 存储 --->添加

![image-20230815174426192](https://imgoss.xgss.net/picgo/image-20230815174426192.png?aliyun)

选择阿里云盘OPEN

获取刷新令牌： [https://alist.nn.ci/tool/aliyundrive/request](https://alist.nn.ci/tool/aliyundrive/request)

手机登录app，扫码，同意，点击I have scan，获取刷新令牌填写到后台。

![image-20230815174942789](https://imgoss.xgss.net/picgo/image-20230815174942789.png?aliyun)

![image-20230815174558522](https://imgoss.xgss.net/picgo/image-20230815174558522.png?aliyun)



# 添加百度网盘

## 1.添加驱动

alist后台--->存储--->添加

![image-20230816103752775](https://imgoss.xgss.net/picgo/image-20230816103752775.png?aliyun)

## 2.选择百度网盘，填入信息

```
挂载路径： /百度网盘 （可以随便写）
刷新令牌，可以通过以下地址获取
```

获取刷新令牌： [https://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=iYCeC9g08h5vuP9UqvPHKKSVrKFXGa1v&redirect_uri=https://alist.nn.ci/tool/baidu/callback&scope=basic,netdisk&qrcode=1](https://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=iYCeC9g08h5vuP9UqvPHKKSVrKFXGa1v&redirect_uri=https://alist.nn.ci/tool/baidu/callback&scope=basic,netdisk&qrcode=1)

[点击这里](https://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=iYCeC9g08h5vuP9UqvPHKKSVrKFXGa1v&redirect_uri=https://alist.nn.ci/tool/baidu/callback&scope=basic,netdisk&qrcode=1) 

![image-20230816104222804](https://imgoss.xgss.net/picgo/image-20230816104222804.png?aliyun)

![image-20230816104628610](https://imgoss.xgss.net/picgo/image-20230816104628610.png?aliyun)

回到主页即看到

![image-20230816104408644](https://imgoss.xgss.net/picgo/image-20230816104408644.png?aliyun)

# 配置WebDAV

首先下载 [raidrive](https://www.raidrive.com/) 客户端配置。

## 内网地址

```
地址： http：127.0.0.1:5244
目录： /dav
账号：admin
密码： 随机生成的密码
连接
```



![image-20230816103337897](https://imgoss.xgss.net/picgo/image-20230816103337897.png?aliyun)



## 公网配置

```
地址： https：alist.xgss.net 
端口: 443
目录： /dav
账号：admin
密码：随机生成的密码
点击连接
```



![image-20230815174215857](https://imgoss.xgss.net/picgo/image-20230815174215857.png?aliyun)



最后可以当做电脑的一块硬盘使用

![image-20230816150901848](https://imgoss.xgss.net/picgo/image-20230816150901848.png?aliyun)