# Docker部署开源私有云相册，给你的照片一个家



大家好，我是星哥，在这个数字化时代，照片不仅是一种记录生活的方式，更是一种方便并分享还原真时刻的工具。

访问云相册最大的惊喜是，您可以随时随地查看和分享图片，而且私密性且灵活的 PhotoPrism 是这款开源私有云相册的最大优势。

今天，我们将与您分享如何在云服务器上部署 PhotoPrism，以构建一个尊重您图片私密的解决方案。

# PhotoPrism是个啥

PhotoPrism是一款适用于去中心化网络的人工智能照片应用程序。它利用最新技术自动标记和查找图片，而不会妨碍您。您可以在家中、私人服务器上或在云中运行它。

官方介绍：

PhotoPrism® is an AI-Powered Photos App for the Decentralized Web.

It makes use of the latest technologies to tag and find pictures automatically without getting in your way. You can run it at home, on a private server, or in the cloud.

开源地址：https://github.com/photoprism/photoprism

![image-20241230185834205](https://imgoss.xgss.net/picgo/image-20241230185834205.png?aliyun)

# 准备工作

- 云服务器、NAS、虚拟机等等（必须，云服务器：http://y.xgss.net/aliyun 或 https://y.xgss.net/tx）
- 已安装Docker或Docker Compose，如果不会看看我之前的教程，或者参考官方文档。

# Docker安装photoprism

## 1.新建目录

可以根据实际情况创建

```
mkdir -p /data/docker/photoprism/Pictures # 原始媒体文件（请勿删除）
mkdir -p /data/docker/photoprism/storage # 目录要可写，存储文件夹用于缓存、数据库和附属文件
```



## 2.直接运行docker run

```
docker run -itd \
--restart always \
--name photoprism \
--security-opt seccomp=unconfined \
--security-opt apparmor=unconfined \
-p 2342:2342 \
-e PHOTOPRISM_UPLOAD_NSFW="true" \
-e PHOTOPRISM_ADMIN_PASSWORD="insecure" \
-v /data/docker/photoprism/storage:/photoprism/storage \
-v /data/docker/photoprism/Pictures:/photoprism/originals \
photoprism/photoprism:latest
```

国内的网络环境太差了，用了香港的节点，速度很快就好了。

## 命令解释

```
docker run：Docker命令行工具用来创建并运行新容器的命令。

-itd：

-i：保持容器的标准输入（STDIN）打开，即使不附加到容器终端。
-t：分配一个伪终端。
-d：后台运行容器。
--restart always：设置容器的重启策略为“always”，这意味着无论容器因为什么原因退出，Docker都会自动重启它。

--name photoprism：为容器指定一个名称，这里是photoprism。

--security-opt seccomp=unconfined：设置安全选项，禁用seccomp（安全计算模式），允许容器内的进程执行任何系统调用。

--security-opt apparmor=unconfined：设置安全选项，禁用AppArmor（一个Linux内核安全模块），允许容器内的进程执行任何操作。

-p 2342:2342：将容器内部的2342端口映射到宿主机的2342端口，这样可以通过宿主机的2342端口访问容器内运行的服务。


-e PHOTOPRISM_ADMIN_PASSWORD="insecure"：设置环境变量PHOTOPRISM_ADMIN_PASSWORD为insecure，这是PhotoPrism管理员账户的初始密码。出于安全考虑，建议在启动后立即更改密码。

-v /data/docker/photoprism/storage:/photoprism/storage：挂载卷，将宿主机的/data/docker/photoprism/storage目录挂载到容器的/photoprism/storage目录，用于存储PhotoPrism的数据。

-v /data/docker/photoprism/Pictures:/photoprism/originals：挂载卷，将宿主机的/data/docker/photoprism/Pictures目录挂载到容器的/photoprism/originals目录，用于存储上传的照片。

photoprism/photoprism:latest：指定要运行的Docker镜像，这里是photoprism/photoprism的最新版本。
```

部署完成后，您可以通过访问http://localhost:2342来打开PhotoPrism的管理界面，默认账号为admin，密码为insecure（建议立即修改密码）

# Docker Compose安装photoprism

选取一种方式安装即可。

## 1.Docker Compose配置文件

首先，您需要下载PhotoPrism的docker-compose.yml文件：

```
wget https://dl.photoprism.app/docker/docker-compose.yml

```

## 2.修改配置文件

修改docker-compose.yml文件，指定数据持久化的位置和其他配置。

例如：

指定原始照片的存储位置和配置等元数据的存储位置。
设置网站标题、名称和文件大小限制等。

## 3.运行服务

完成配置后，执行以下命令来运行PhotoPrism服务：

```
docker-compose up -d
```



# 使用photoprism

![image-20241230164612870](https://imgoss.xgss.net/picgo/image-20241230164612870.png?aliyun)



打开浏览器输入：localhost:2342，就能看到PhotoPrism的登录界面了。

第一次使用时需要设置管理员账号和密码。

初始账号是：admin，密码是：insecure，您后期可以在帐户设置页面上更改它。

登录好以后就可以进入到PhotoPrism界面来使用了。

## 设置中文

点击设置，Language

![image-20241230164906326](https://imgoss.xgss.net/picgo/image-20241230164906326.png?aliyun)

## 修改密码

点击设置，账户，更改密码

![image-20241230165100503](https://imgoss.xgss.net/picgo/image-20241230165100503.png?aliyun)

## 上传图片



![image-20241230171923653](https://imgoss.xgss.net/picgo/image-20241230171923653.png?aliyun)



# 结尾

通过在云服务器上部署PhotoPrism，可以轻松搭建一个私有云相册，实现对个人照片的私密、安全、高效管理。本文仅为一个简单的部署指南，PhotoPrism还有更多高级功能等待用户探索。