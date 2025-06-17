---
title: 群晖NAS配置之ZeroTier实现内网穿透
createTime: 2025/05/27 17:51:17
permalink: /article/07k1evvv/
---
# 群晖NAS配置之ZeroTier实现内网穿透

# 前言-内网穿透

内网穿透是指通过一种技术让外部网络可以访问到内网的NAS设备，这样即使在不同网络环境下，也能够远程访问和管理NAS设备。以下是一些常见的内网穿透方案：

## Synology官方提供的QuickConnect

Synology官方提供了QuickConnect服务，可以通过Synology账号远程访问NAS设备。用户可以在NAS控制面板中设置和管理QuickConnect服务，使其在不同网络环境下访问NAS变得更加简单。

## Synology的DDNS服务

Synology NAS支持使用DDNS（动态域名解析）服务，可以为NAS设备设置一个动态域名，使用户可以通过域名访问NAS，而不必担心动态IP地址变化带来的问题。

## VPN（虚拟专用网络）

通过在路由器上设置VPN服务器，或者使用NAS自身的VPN服务，可以建立安全的远程连接，让用户远程访问内网资源，包括NAS设备。

## 端口转发/端口映射

在路由器上设置端口转发（或称端口映射），将指定端口的流量转发到NAS设备上，这样用户就可以通过特定端口来访问NAS。但要确保端口转发时考虑到安全性，避免暴露不必要的服务或端口。

## 第三方内网穿透服务

使用类似于ngrok、frp、ZeroTier等第三方工具或服务进行内网穿透，这些服务可以帮助用户将内网设备暴露到公网上，但需要注意安全性和隐私保护。

这篇文章就来介绍ZeroTier实现内网穿透，ZeroTier异地组网是一个非常不错的内网穿透方式，特点就是免费，不限流。

缺点是免费用户只有25个

![zerotier-pic](https://imgoss.xgss.net/picgo/zerotier-pic.jpg?aliyun)

# 步骤

1. 注册ZeroTier账号

2. 群晖Nas中配置ZeroTier

3. 安装ZeroTier客户端


# 注册ZeroTier账号

进入ZeroTier官网，注册账号 https://www.zerotier.com/ 

创建网络

![image-20231123174454849](https://imgoss.xgss.net/picgo/image-20231123174454849.png?aliyun)

点击：create a network

![image-20231123175043351](https://imgoss.xgss.net/picgo/image-20231123175043351.png?aliyun)



# 群晖Nas中配置ZeroTier

群晖DSM6.X下载相关套件安装以后要加入网络然后授权即可，DSM7.0以上可以使用第三方套件或者docker，这里我们使用官方推荐的docker方式。

## 创建目录ZeroTier

登录群辉，打开File Station，在docker目录下新建文件夹并重命名为ZeroTier，然后赋予读写权限。

![image-20231123194007723](https://imgoss.xgss.net/picgo/image-20231123194007723.png?aliyun)

## 拉取镜像

由于我的docker镜像注册表失败，本文用ssh登录操作，不在nas的docker操作。

如果没有的话请在套件中心进行下载→注册表→搜索 zerotier-synology 双击选择最新版本下载

```
root@star-nas:~# docker pull zerotier/zerotier-synology
Using default tag: latest
latest: Pulling from zerotier/zerotier-synology
63b65145d645: Pull complete 
fb097512307f: Pull complete 
fb0fa1a4a4a5: Pull complete 
646d6766cba7: Pull complete 
f49b23d91910: Pull complete 
87ef921da0c2: Pull complete 
Digest: sha256:9adf1cb6e8b0ca8f80d28d2a7c4cfa18d102552a13a7f6f1b7923d75da408a07
Status: Downloaded newer image for zerotier/zerotier-synology:latest
docker.io/zerotier/zerotier-synology:latest
```

![image-20231124093751745](https://imgoss.xgss.net/picgo/image-20231124093751745.png?aliyun)



## 创建一个持久的 TUN

参考： https://docs.zerotier.com/synology/

使用vi工具编写脚本到路径: /usr/local/etc/rc.d/tun.sh 这将使得 /dev/net/tun 在启动时调用

```
# echo -e '#!/bin/sh' >> /usr/local/etc/rc.d/tun.sh
# echo -e 'insmod /lib/modules/tun.ko' > /usr/local/etc/rc.d/tun.sh
```



```
给这段脚本添加权限（其实应该先vi这个空的脚本，然后添加权限，最后在写入上面的脚本内容，不然会提示你readonly）
# chmod a+x /usr/local/etc/rc.d/tun.sh
运行脚本：
# /usr/local/etc/rc.d/tun.sh

检查TUN的运行状态（可选）：
# ls /dev/net/tun
/dev/net/tun
```



## 启动镜像

```
# docker run -d \
--name zerotier \
--restart=always \
--net=host \
--device=/dev/net/tun \
--cap-add=NET_ADMIN \
--cap-add=SYS_ADMIN \
-v /volume1/docker/ZeroTier:/var/lib/zerotier-one \
zerotier/zerotier-synology
```

## 加入网络

```
命令： docker exec -it <docker容器的名字> zerotier-cli join <替换zerotier的网络ID>

# docker exec -it zerotier zerotier-cli join 123456789
200 join OK
```

![image-20231124104652623](https://imgoss.xgss.net/picgo/image-20231124104652623.png?aliyun)

如果不是200 join ok，择要看看你的docker日志

```
# docker logs zerotier
```



## 常用命令

在 ZeroTier 后台授权当前设备，然后查看状态：

```
# docker exec -it zerotier zerotier-cli listnetworks
200 listnetworks <nwid> <name> <mac> <status> <type> <dev> <ZT assigned ips>
200 listnetworks 1c33c1ced0cfbfc5  c6:c3:ed:5e:04:17 ACCESS_DENIED PRIVATE zt2lrq44iv -
```



# zerotier官网网络授权

zerotier 官网，登录以后进入配置界面，在页面最下面对已经出现的设备进行授权，授权的方式为在□中打上√，取消打√即为取消授权。（如果没出现请稍等几秒之后刷新界面）

![image-20231124103928771](https://imgoss.xgss.net/picgo/image-20231124103928771.png?aliyun)

在 Auth这里打钩

![image-20231124104036709](https://imgoss.xgss.net/picgo/image-20231124104036709.png?aliyun)

# 客户端安装

ZeroTier客户端支持 苹果IOS，苹果MAC，安卓，微软的Windows和linux等常用的系统，本文只介绍Windows和安卓

## Windows系统

### 1.下载Windows软件

去官网下载：https://www.zerotier.com/download/

![image-20231124102330369](https://imgoss.xgss.net/picgo/image-20231124102330369.png?aliyun)

### 2.输入网络ID

安装之后，在电脑右下角输入Network ID

![image-20231124102522297](https://imgoss.xgss.net/picgo/image-20231124102522297.png?aliyun)

Windows系统的ip是：

![image-20231124105342063](https://imgoss.xgss.net/picgo/image-20231124105342063.png?aliyun)



### 3.测试访问NAS

如图访问成功，则说明zerotier组成的VPN网络成功。

![image-20231124103358912](https://imgoss.xgss.net/picgo/image-20231124103358912.png?aliyun)

## 安卓系统

### 1.安装ZeroTier的手机APP

![image-20231124111017541](https://imgoss.xgss.net/picgo/image-20231124111017541.png?aliyun)

### 2.添加网络

![image-20231124111057862](https://imgoss.xgss.net/picgo/image-20231124111057862.png?aliyun)

### 3.填写网络ID

![image-20231124111125012](https://imgoss.xgss.net/picgo/image-20231124111125012.png?aliyun)

### 4.测试访问Nas

![image-20231124111143526](https://imgoss.xgss.net/picgo/image-20231124111143526.png?aliyun)

# 总结

其实没有公网IP的情况下，内网穿透的方案很多。比如还有FRP、NPS等，但是需要用到代理服务器

也可以选择像零遁NAS伴侣，蒲公英X1盒子，或者花生壳盒子这样专业的内网穿透硬件

所以今天介绍的这款ZeroTier就是给不想花钱，并且喜欢折腾的小伙伴准备的。它支持的平台多，一次搭建后期无脑使用，可谓是一劳永逸，虽说速度并不能完全保证（我这边是时快时慢），但是它完全可以作为无公网IP实现内网穿透的备用方案。

