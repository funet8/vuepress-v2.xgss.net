---
title: 使用Docker部署开源的WPSOffice
createTime: 2025/05/27 17:51:17
permalink: /article/3lm836as/
---
# 使用Docker部署开源的WPS-Office



# 一、前言

越来越多的企业和个人开始将应用程序部署在Docker容器中。传统的办公软件往往需要在本地安装，且只能在单个设备上使用，这对远程办公、多人协作的效率提出了挑战。

搭建一个网页版的 WPS Office 能够有效解决这些问题，让您可以通过浏览器直接访问和编辑文档，而不需要本地安装软件。尤其在资源有限的设备上，这种方式可以显著节省存储空间和系统资源。

![image-20241227173302443](https://imgoss.xgss.net/picgo/image-20241227173302443.png?aliyun)

# 二、准备工作

准备服务器

- 服务器一台（必须，安装 Centos7.2 以上版本系统，**如果没有备案域名请购买香港或海外区域**，http://y.xgss.net/aliyun）

- 系统中安装docker或docker-compose

  

# Docker-wps-office

本项目使用到的github
https://github.com/linuxserver/docker-wps-office
WPS Office是一款轻量级、功能丰富、兼容性强的综合办公套件。作为一款便捷、专业的办公软件，WPS Office 允许您以 Writer、Presentation、Spreadsheet 和 PDF 格式编辑文件，从而提高您的工作效率。



# docker 构建Docker-wps-office

## 1.构建命令

```
docker run -itd \
  --name=wps-office \
  --security-opt seccomp=unconfined `#optional` \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Asia/Shanghai \
  -p 3000:3000 \
  -p 3001:3001 \
  -v /data/docker/wps-office/config:/config \
  --shm-size="1gb" \
  --restart unless-stopped \
  lscr.io/linuxserver/wps-office:latest
```

## 2.解释

容器是使用运行时传递的参数（例如上面的参数）进行配置的。这些参数以冒号分隔，分别表示&lt;external&gt;:&lt;internal&gt;。

例如，-p 8080:80 将从容器内部公开端口 80，以便可以从容器外部端口 8080 上的主机 IP 进行访问。

```
-p 3000:3000	WPS Office 桌面的端口
-p 3001:3001	WPS Office 桌面 GUI HTTPS。
-e PUID=1000	用户ID
-e PGID=1000	用户组ID
-e TZ=Etc/UTC	指定要使用的时区  ，笔者使用中国上海的时区
-v /config	容器中的用户主目录，存储程序设置和文档
--shm-size=	使用时占用的内存
--security-opt seccomp=unconfined 仅适用于 Docker 引擎，许多现代 GUI 应用程序需要它在旧主机上运行，因为 Docker 不知道系统调用。
```

## 3.查看状态

```
docker ps
CONTAINER ID   IMAGE                                   COMMAND   CREATED              STATUS              PORTS                              NAMES
c6b0238876b2   lscr.io/linuxserver/wps-office:latest   "/init"   About a minute ago   Up About a minute   0.0.0.0:3000-3001->3000-3001/tcp   wps-office
```

## 4.浏览器输入ip端口即可使用

![image-20241227165747726](https://imgoss.xgss.net/picgo/image-20241227165747726.png?aliyun)



# 使用docker-compose构建Docker-wps-office



## 1.创建目录

```
mkdir -p /data/docker/wps-office
cd /data/docker/wps-office
```

## 2.编辑docker-compose.yml

```
vim docker-compose.yml
```

填写一下信息

```
version: "3.9"
services:  # 定义服务
  wps-office:  # 服务名称，代表 WPS Office 容器服务
    image: lscr.io/linuxserver/wps-office:chinese  # 镜像地址和版本，使用 LinuxServer 提供的 WPS Office 中文版镜像
    container_name: wps-office  # 设置容器名称为 wps-office
    privileged: true  # 授予容器特权模式，允许访问更多的系统资源（例如硬件）
    security_opt:
      - seccomp:unconfined  # 取消 seccomp 安全配置（可选），放宽容器的系统调用限制
    environment:  # 配置环境变量
      - PUID=1000  # 容器内的用户ID，通常与主机上的用户ID保持一致，避免权限问题
      - PGID=1000  # 容器内的用户组ID，通常与主机上的组ID保持一致
      - TZ=Asia/Shanghai  # 设置时区为上海时区
      - CUSTOM_USER=admin  # 自定义用户名，容器内部使用的用户名
      - PASSWORD=admin  # 用户密码
    volumes:  # 配置数据卷，用于持久化存储和共享文件
      - ./config:/config  # 将主机上的 ./config 目录映射到容器内的 /config 目录，存储 WPS Office 的配置文件
      - ./Desktop:/config/Desktop #左侧Desktop可以改成自定义的目录存放文档，映射目录到wps的桌面目录
      - ./Fonts:/usr/share/fonts/wps-fonts  # 将主机上的 ./Fonts 目录映射到容器的字体文件夹，方便添加字体,新增字体直接添加此目录的。
    ports:  # 配置端口映射，将容器内部端口映射到主机端口
      - 3005:3000  # http用将主机的 3005 端口映射到容器的 3000 端口
      - 3006:3001  # https用将主机的 3006 端口映射到容器的 3001 端口
    shm_size: "1gb"  # 共享内存大小设置为 1GB，以避免 WPS Office 使用过程中内存不足的问题
    restart: always  # 设置容器的重启策略为 always，确保容器在崩溃或系统重启后自动重启
    network_mode: bridge  # 设置网络模式为桥接模式，使容器可以通过宿主机网络访问外部资源


```

为了保证搭建完的wps字体库完整我准备了字体文件
需要的下载
[点我下载字体文件](https://pan.xunlei.com/s/VOB4MVDT-85tAKTP-KKz1EkyA1?pwd=39gq)  https://pan.xunlei.com/s/VOB4MVDT-85tAKTP-KKz1EkyA1?pwd=39gq

## 3.运行容器

```
docker-compose up -d #运行容器
docker-compose ps  #查看是否开启成功
```

## 4.查看docker状态

```
docker-compose ps
docker ps
```



## 5.浏览器输入ip端口即可使用

成功以后需要打开自己相应的端口(3005)防火墙就可以web端访问了

![img](https://imgoss.xgss.net/picgo/image-1730964011544.png?aliyun)



## 6.使用本地输入法的设置

![img](https://imgoss.xgss.net/picgo/image-1730964258672.png?aliyun)

## 7.上传文件的操作

![img](https://imgoss.xgss.net/picgo/image-1730964333202.png?aliyun)

# 结尾

通过本文的介绍，我们详细阐述了如何使用Docker部署开源的WPS Office。Docker的轻量级、可移植性和易管理性为我们提供了极大的便利。通过这种方式，我们可以轻松地搭建一个私有化的办公平台，满足个性化的需求。此外，Docker还可以实现WPS Office的快速扩展、高可用性以及与其他服务的集成，为企业和个人用户提供更加灵活、高效的办公解决方案。





