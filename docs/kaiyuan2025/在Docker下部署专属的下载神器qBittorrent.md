# 在Docker下部署专属的下载神器qBittorrent



# 前言

qBittorrent 是一款轻量级且功能丰富的开源 BitTorrent 客户端，广受用户好评。
它提供了直观的界面和大量的功能，能够满足大部分用户的下载需求。

通过 Docker 部署 qBittorrent 可以让我们更方便地在不同的环境下使用它，同时享受容器化带来的隔离和易于管理的优势。本文星哥将带你一步步完成在 Docker 中部署 qBittorrent 的操作。

![image-20250107165027359](https://imgoss.xgss.net/picgo/image-20250107165027359.png?aliyun)

# 准备工作

- 云服务器、NAS、虚拟机等  【 阿里云优惠： [https://y.xgss.net/aliyun](https://y.xgss.net/aliyun) 或 腾讯云优惠： [https://y.xgss.net/tx](https://y.xgss.net/tx) 】
- 本篇文章在Centos7.9系统下演示，当然其他支持Docker系统亦可
- 安装docker和docker-compose 【本篇文章不细讲，可以看星哥之前的教程或者官方文档】

# 部署

### 安装Docker环境

省略

### 创建文件夹

可根据实际情况创建，最好放到硬盘空间充足的目录。

```
mkdir -p /data/docker/qbittorrent/config
mkdir -p /data/docker/qbittorrent/downloads
cd /data/docker/qbittorrent
```

### 编写 Docker Compose 配置文件

创建 docker-compose.yml 的文件

```
vi docker-compose.yml
```



并添加以下内容：

```
version: '3'
services:
  qbittorrent:
    image: linuxserver/qbittorrent
    container_name: qbittorrent
    restart: unless-stopped
    ports:
      - "6881:6881"
      - "6881:6881/udp"
      - "8082:8080"
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Shanghai
    volumes:
      - /data/docker/qbittorrent/config:/config
      - /data/docker/qbittorrent/config:/downloads
```

### 启动容器

在命令行中进入存放 docker-compose.yml文件的目录，然后执行以下命令：

```
docker-compose up -d
```

### 访问 Web 界面

在浏览器中输入 `http://localhost:8080`，即可访问 qBittorrent 的 Web 界面。

![image-20250107164204520](https://imgoss.xgss.net/picgo/image-20250107164204520.png?aliyun)

## 查找用户名和密码

用户名和密码使用docker ps和docker logs查看

查看docker的状态

```
# docker ps
CONTAINER ID   IMAGE                     COMMAND   CREATED         STATUS         PORTS                                                                                                                             NAMES
46017ddad10f   linuxserver/qbittorrent   "/init"   4 minutes ago   Up 3 minutes   0.0.0.0:6881->6881/tcp, :::6881->6881/tcp, 0.0.0.0:8080->8080/tcp, 0.0.0.0:6881->6881/udp, :::8080->8080/tcp, :::6881->6881/udp   qbittorrent
```

docker logs 查看日志

```
docker logs qbittorrent
```

![image-20250107164503581](https://imgoss.xgss.net/picgo/image-20250107164503581.png?aliyun)

会显示用户名和密码

```
The WebUI administrator username is: admin
The WebUI administrator password was not set. A temporary password is provided for this session: VQ8vcV9Qs
```

再次登录

![image-20250107164700486](https://imgoss.xgss.net/picgo/image-20250107164700486.png?aliyun)

## 设置中文

选项，Behavior，改成简体中文

![image-20250107164802950](https://imgoss.xgss.net/picgo/image-20250107164802950.png?aliyun)

## 持久化数据

为确保数据的持久性，推荐使用 Docker 数据卷将下载数据和配置文件存储在宿主机中。你可以将宿主机的目录挂载到容器的相应目录，这样即使容器被删除或重启，数据也不会丢失。



## 总结

通过 Docker 部署 qBittorrent，不仅能快速创建一个专属的下载工具，还能够利用 Docker 提供的容器化管理和隔离机制，使得整个系统更加稳定和高效。在容器化的环境下，你可以随时迁移或者升级 qBittorrent，而不必担心对宿主机的影响。同时，Docker 还方便了资源的管理和调配，提升了使用体验。

写文不易，如果你都看到了这里，请点个赞和在看，分享给更多的朋友；也别忘了关注星哥玩云！这里有满满的干货分享，还有轻松有趣的技术交流～点个赞、分享给身边的小伙伴，一起成长，一起玩转技术世界吧！ 😊

