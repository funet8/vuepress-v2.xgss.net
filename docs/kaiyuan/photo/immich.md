# 自建私有云相册：Docker一键部署Immich，照片视频备份利器

# 前言

随着人们手机、PC、平板等电子产品多样，我们拍摄和保存的照片和视频数量也在不断增加。如何高效地管理和备份这些珍贵的记忆成为了一个重要的问题。

传统的云备份虽然方便，但受限于云空间大小和隐私保护的问题。而私有云相册则成为了一个理想的解决方案，其中开源的Immich更是以其强大的功能和易用性脱颖而出。

今天星哥将介绍如何在云服务器或NAS上利用Docker一键部署Immich，打造一个属于自己的私有云相册。

# Immich

Immich是一款基于开源技术的私有云相册管理工具，旨在提供快速、自动化的照片和视频备份功能。其特点包括：

开源地址：https://github.com/immich-app/immich 目前已有 55K+的star数量

官方地址：https://immich.app/

![image-20241231154644994](https://imgoss.xgss.net/picgo/image-20241231154644994.png?aliyun)

## Immich 私有云相册的一些特性

- **多平台支持**：提供了移动端和 Web 网页端版本，可以在任何设备上随时访问相册。
- **自动备份**： 和 iCloud、谷歌相册 一样，Immich 支持后台自动备份照片和视频。
- **选择性备份**：支持备份指定的相册，而不必备份所有的照片和视频。
- **高级搜索功能**：用户可以根据元数据、对象、人脸等条件进行搜索，轻松找到照片。
- **安全性**： Immich 完全开源，且数据存储在你自己的服务器上。数据安全可控，同时还支持 OAuth 进行身份验证。
- **多用户支持和分享**： Immich 支持多用户，并允许用户创建**共享相册**，与朋友、家人或合作伙伴分享照片和视频。
- **地理位置信息**： 应用程序提供了地图视图，允许用户查看和浏览地理位置信息，以及在地图上查看媒体内容。
- **人脸识别和聚合**： Immich 可识别人脸并进行聚合，使用户能够更轻松地组织和查找他们的照片。
- **离线支持**： 移动端应用程序提供离线支持，允许在没有网络的情况下查看照片和视频。

## 功能特性

| 特征                                     | 移动应用 | 网页 |
| :--------------------------------------- | :------- | :--- |
| 上传和查看视频和照片                     | ✅        | ✅    |
| 打开应用程序时自动备份                   | ✅        | ❌    |
| 用于备份的选择性相册                     | ✅        | ❌    |
| 将照片和视频下载到本地设备               | ✅        | ✅    |
| 多用户支持                               | ✅        | ✅    |
| 相册和共享相簿                           | ✅        | ✅    |
| 可擦洗/可拖动的滚动条                    | ✅        | ✅    |
| 支持RAW（HEIC，HEIF，DNG，APPLE ProRaw） | ✅        | ✅    |
| 元数据视图（EXIF、地图）                 | ✅        | ✅    |
| 按元数据、对象和图像标签搜索             | ✅        | ❌    |
| 管理功能（用户管理）                     | ❌        | ✅    |
| 后台备份                                 | ✅        | ❌    |
| 虚拟滚动                                 | ✅        | ✅    |
| OAuth 支持                               | ✅        | ✅    |
| 实时照片备份和播放                       | iOS      | ✅    |
| 用户自定义存储结构                       | ✅        | ✅    |
| 公开分享                                 | ❌        | ✅    |

## 备份功能

配置好服务器端，登录移动应用之后，给于相册权限，就可以备份了，支持前台备份与后台备份，使用起来非常简单，有中文界面

# 准备工作

- 云服务器、NAS、虚拟机等等（必须，云服务器：http://y.xgss.net/aliyun 或 https://y.xgss.net/tx）
- 已安装Docker或Docker Compose，如果不会看看我之前的教程，或者参考官方文档。
- 域名（非必须）

# Docker-compose安装 Immich

## 1.安装Docker 和 Docker-compose

省略



## 2.下载.env文件

安装 Immich 很容易，先修改配置文件 .env：

```
mkdir -p /data/docker/immich

cd  /data/docker/immich

wget -O .env https://github.com/immich-app/immich/releases/latest/download/example.env
```



查看文件

```
  cat .env
# You can find documentation for all the supported env variables at https://immich.app/docs/install/environment-variables

# The location where your uploaded files are stored
UPLOAD_LOCATION=./library
# The location where your database files are stored
DB_DATA_LOCATION=./postgres

# To set a timezone, uncomment the next line and change Etc/UTC to a TZ identifier from this list: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List
# TZ=Etc/UTC
TZ=Asia/Shanghai

# The Immich version to use. You can pin this to a specific version like "v1.71.0"
IMMICH_VERSION=release

# Connection secret for postgres. You should change it to a random password
# Please use only the characters `A-Za-z0-9`, without special characters or spaces
DB_PASSWORD=postgres

# The values below this line do not need to be changed
###################################################################################
DB_USERNAME=postgres
DB_DATABASE_NAME=immich
```



把时区改成上海

```
# TZ=Etc/UTC
改成
TZ=Asia/Shanghai
```



实际上，只需要修改里面的 UPLOAD_LOCATION 部分，使用绝对路径，这是保存照片的路径。

其它设置保持默认，然后就可以安装了：

## 3.下载docker-compose.yml运行

```
wget https://github.com/immich-app/immich/releases/latest/download/docker-compose.yml

docker-compose up -d

docker-compose down # 关闭

```

查看运行状态

```
docker ps
CONTAINER ID   IMAGE                                                COMMAND                  CREATED              STATUS                        PORTS                    NAMES
8afd5060a34b   ghcr.io/immich-app/immich-server:release             "tini -- /bin/bash s…"   About a minute ago   Up About a minute (healthy)   0.0.0.0:2283->2283/tcp   immich_server
e8a54115e963   redis:6.2-alpine                                     "docker-entrypoint.s…"   About a minute ago   Up About a minute (healthy)   6379/tcp                 immich_redis
e7ccc41993ba   tensorchord/pgvecto-rs:pg14-v0.2.0                   "docker-entrypoint.s…"   About a minute ago   Up About a minute (healthy)   5432/tcp                 immich_postgres
ec4d59c06e34   ghcr.io/immich-app/immich-machine-learning:release   "tini -- ./start.sh"     About a minute ago   Up About a minute (healthy)                            immich_machine_learning
```

## 4.浏览器打开

在浏览器打开：`IP:2283` 就可以创建用户进入 Immich 了。

![image-20241231161436485](https://imgoss.xgss.net/picgo/image-20241231161436485.png?aliyun)

## 设置管理员账号

![image-20241231161550071](https://imgoss.xgss.net/picgo/image-20241231161550071.png?aliyun)



# 下载客户端

Immich 的官方 App

- [Apple App Store](https://apps.apple.com/us/app/immich/id1613945652)
- [F-Droid](https://f-droid.org/packages/app.alextran.immich)
- [GitHub Releases (apk)](https://github.com/immich-app/immich/releases)



# Nginx配置（可选）

## 1. 配置HTTPS

为了提升安全性，可以通过反向代理（如NGINX）配置HTTPS。以下是一个基本配置示例：

```
server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://127.0.0.1:2283;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 2. 数据备份

为防止数据丢失，建议定期备份数据库和存储文件夹。

```
备份：library 和 postgres 文件夹。
```



# 总结

通过Docker一键部署Immich，您可以快速搭建一个功能强大、隐私安全的私有云相册。无论是家庭日常记录，还是旅行照片备份，Immich都能满足您的需求。如果您对数据隐私和存储控制有较高要求，不妨尝试一下！

