---
title: Docker系列教程4-使用DockerHub并将镜像推送到自有仓库
createTime: 2025/05/27 17:51:17
permalink: /article/jxg5jf9k/
---
# Docker系列教程4：使用Docker Hub并将镜像推送到自有仓库

# DockerHub是什么

目前 Docker 官方维护了一个公共仓库 Docker Hub，其中已经包括了数量超过 2,650,000 的镜像。大部分需求都可以通过在 Docker Hub 中直接下载镜像来实现。

我更愿意把他类比 github，docker是存放镜像，github是存放代码的。

这样自己制作的镜像就可以把它推送（docker push）到DockerHub，要使用的时候直接拉取（docker pull），让开发更加灵活。

本次教程主要有三部分就教**1.如何使用DockerHub**，当然由于DockerHub在国内访问慢的原因，**2.将镜像推送到阿里云的DockerHub仓库**，**3.创建一个私有Docker仓库**。

![image-20221205105530964](https://imgoss.xgss.net/picgo/image-20221205105530964.png?aliyun)

# 一、使用Docker Hub

Docker Hub 存放着 Docker镜像 及其组件的所有资源。Docker Hub 可以帮助你与同事之间协作，并获得功能完整的 Docker。为此，它提供的服务有：

*   Docker 镜像主机
*   用户认证
*   自动镜像构建和工作流程工具，如构建触发器和 web hooks
*   整合了 GitHub 和 BitBucket

##  1.创建 Docker Hub 账户

[注册账户](https://hub.docker.com/)： https://hub.docker.com/ ，输入个人信息，如果有账号可以忽略。

![image-20221203152739869](https://imgoss.xgss.net/picgo/image-20221203152739869.png?aliyun)

## 2.通过命令来登录 

```
## 登录
# docker login
输入注册的账号和密码

账号是：starb

##退出
# docker logout
```

输入用户名和密码。

![image-20221203155516562](https://imgoss.xgss.net/picgo/image-20221203155516562.png?aliyun)

## 3.给镜像打个标签

你可以给现有的镜像添加标记，然后提交和构建。我们可以使用`docker tag`命令。让我们给`training/webapp`镜像添加一个新的标签。

```
1.拉取镜像：
# docker pull training/webapp
Trying to pull repository docker.io/training/webapp

2.查看镜像:
# docker images training/webapp
REPOSITORY                  TAG                 IMAGE ID            CREATED             SIZE
docker.io/training/webapp   latest              6fae60ef3446        7 years ago         349 MB

3.重新打镜像：
# docker tag 6fae60ef3446 starb/webapp:v1.1

4.查看新的标签：
# docker images starb/webapp
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
newtag/webapp       v1.1                6fae60ef3446        7 years ago         349 MB
```



## 4.向Docker Hub推送镜像

一旦你构建或创造一个新的镜像，你可以使用`docker push`命令推送到Docker Hub。可以对其他人公开进行分享，或把它添加到你的私人仓库中。

```
# docker push starb/webapp:v1.1
The push refers to a repository [docker.io/newtag/webapp]
5f70bf18a086: Preparing 
```

![image-20221203160125609](https://imgoss.xgss.net/picgo/image-20221203160125609.png?aliyun)

再进入你的dockerHub个人页面

![image-20221203160243598](https://imgoss.xgss.net/picgo/image-20221203160243598.png?aliyun)

有了刚才push的镜像。

可以把自己的

## 5.把镜像设置为私有

私有需要登录之后才能拉取，免费的账号私有仓库只能是一个，公共仓库无限制。

![image-20221203161536173](https://imgoss.xgss.net/picgo/image-20221203161536173.png?aliyun)

![image-20221203161604928](https://imgoss.xgss.net/picgo/image-20221203161604928.png?aliyun)

## 6.拉取刚才的镜像

在其他的服务器作为客户端就可以拉取镜像了

```
# docker pull starb/webapp:v1.1
```



# 二、使用阿里云Docker镜像仓库加速

官方镜像下载有时候实在是慢，于是开通了阿里云开发者帐号。

1.阿里云-云容器Hub服务：[https://cr.console.aliyun.com/](https://cr.console.aliyun.com/)

使用方法跟DockerHub大同小异，只是仓库地址改为阿里云的地址，速度比官网杠杠滴。

## 1.登录阿里云docker registry:

```
$ sudo docker login --username=funet8@163.com registry.cn-shenzhen.aliyuncs.com
```

登录registry的用户名是您的阿里云账号全名，密码是您开通服务时设置的密码。

你可以在镜像管理首页点击右上角按钮修改docker login密码。

## 2.从registry中拉取镜像：

```
$ sudo docker pull registry.cn-shenzhen.aliyuncs.com/funet8/centos7.1:[镜像版本号]
```

## 3.将镜像推送到registry：

```
$ sudo docker login --username=funet8@163.com registry.cn-shenzhen.aliyuncs.com
$ sudo docker tag [ImageId] registry.cn-shenzhen.aliyuncs.com/funet8/centos7.1:[镜像版本号]
$ sudo docker push registry.cn-shenzhen.aliyuncs.com/funet8/centos7.1:[镜像版本号]
```



其中[ImageId],[镜像版本号]请你根据自己的镜像信息进行填写。

### **注意您的网络环境**

```
从ECS推送镜像时，可以选择走内网，速度将大大提升，并且将不会损耗您的公网流量。

如果您申请的机器是在经典网络，请使用 registry-internal.cn-hangzhou.aliyuncs.com 作为registry的域名登录, 并作为镜像名空间前缀

如果您申请的机器是在vpc网络的，请使用 registry-vpc.cn-hangzhou.aliyuncs.com 作为registry的域名登录, 并作为镜像名空间前缀

```

sample:

使用docker tag重命名镜像，并将它通过私网ip推送至registry：

```
$ sudo docker images

REPOSITORY                                                         TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
registry.aliyuncs.com/acs/agent                                    0.7-dfb6816         37bb9c63c8b2        7 days ago          37.89 MB

$ sudo docker tag 37bb9c63c8b2 registry..aliyuncs.com/acs/agent:0.7-dfb6816

```



# 三、创建私有仓库registry

有时候使用 Docker Hub 这样的公共仓库可能不方便，用户可以创建一个本地仓库供私人使用。

## 安装运行 docker-registry

你可以使用官方 `registry` 镜像来运行。

```shell
# docker run -d -p 5000:5000 --restart=always --name registry registry
或者：
# docker run -d \
-p 5000:5000 \
-v /opt/data/registry:/var/lib/registry \
registry

# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
ac3a01e3641f        registry            "/entrypoint.sh /e..."   7 seconds ago       Up 4 seconds        0.0.0.0:5000->5000/tcp   confident_aryabhata
```

这将使用官方的 `registry` 镜像来启动私有仓库。默认情况下，仓库会被创建在容器的 `/var/lib/registry` 目录下。你可以通过 `-v` 参数来将镜像文件存放在本地的指定路径。例如下面的例子将上传的镜像放到本地的 `/opt/data/registry` 目录。



## 在私有仓库上传、搜索、下载镜像



创建好私有仓库之后，就可以使用 `docker tag` 来标记一个镜像，然后推送它到仓库。例如私有仓库地址为 `127.0.0.1:5000`。

### 查看已有的镜像

```
# docker image ls
REPOSITORY                                         TAG                 IMAGE ID            CREATED             SIZE
docker.io/registry                                 latest              81c944c2288b        2 weeks ago         24.1 MB
docker.io/adguard/adguardhome                      latest              18aae264c84e        8 weeks ago         81 MB
```



### 使用 docker tag将 adguardhome打标签

```
格式为： docker tag IMAGE[:TAG] [REGISTRY_HOST[:REGISTRY_PORT]/]REPOSITORY[:TAG]

# docker tag docker.io/adguard/adguardhome 127.0.0.1:5000/adguardhome:v1.0
查看：
# docker images|grep adguardhome
127.0.0.1:5000/adguardhome                         v1.0                18aae264c84e        8 weeks ago         81 MB
docker.io/adguard/adguardhome                      latest              18aae264c84e        8 weeks ago         81 MB
```

### 使用 docker push上传标记的镜像

```
# docker push 127.0.0.1:5000/adguardhome:v1.0
The push refers to a repository [127.0.0.1:5000/adguardhome]
5f70bf18a086: Pushed 
d4178a974467: Pushed 
7a26e5e5ccf8: Pushed 
e5bf41d9e3f6: Pushed 
994393dc58e7: Pushed 
v1.0: digest: sha256:2a474fedc96c41c3b1c48d1b1dacbfbe78fb194353dced082914bf5d1e5c2217 size: 1368
```

### 用 curl 查看仓库中的镜像。

```
$ # curl 127.0.0.1:5000/v2/_catalog
{"repositories":["adguardhome"]}

表明镜像已经被成功上传了。
```





先删除已有镜像，再尝试从私有仓库中下载这个镜像。

```
删除镜像：
# docker image rm 127.0.0.1:5000/adguardhome:v1.0
# docker images|grep adguardhome
docker.io/adguard/adguardhome                      latest              18aae264c84e        8 weeks ago         81 MB

拉取镜像
#  docker pull 127.0.0.1:5000/adguardhome:v1.0
Trying to pull repository 127.0.0.1:5000/adguardhome ... 
v1.0: Pulling from 127.0.0.1:5000/adguardhome
Digest: sha256:2a474fedc96c41c3b1c48d1b1dacbfbe78fb194353dced082914bf5d1e5c2217
Status: Downloaded newer image for 127.0.0.1:5000/adguardhome:v1.0

查看镜像：
# docker images|grep adguardhome
127.0.0.1:5000/adguardhome                         v1.0                18aae264c84e        8 weeks ago         81 MB
docker.io/adguard/adguardhome                      latest              18aae264c84e        8 weeks ago         81 MB
```



## 配置非 https 仓库地址

如果你不想使用 `127.0.0.1:5000` 作为仓库地址，比如想让本网段的其他主机也能把镜像推送到私有仓库。你就得把例如 `192.168.1.3:5000` 这样的内网地址作为私有仓库地址，这时你会发现无法成功推送镜像。

```
# docker pull 192.168.1.3:5000/adguardhome:v1.0
Trying to pull repository 192.168.1.3:5000/adguardhome ... 
Get https://192.168.1.3:5000/v1/_ping: http: server gave HTTP response to HTTPS client
```



这是因为 Docker 默认不允许非 `HTTPS` 方式推送镜像。我们可以通过 Docker 的配置选项来取消这个限制，或者查看下一节配置能够通过 `HTTPS` 访问的私有仓库。

### Ubuntu 16.04+, Debian 8+, centos 7

对于使用 `systemd` 的系统，请在 `/etc/docker/daemon.json` 中写入如下内容（如果文件不存在请新建该文件）

```
{
  "registry-mirror": [
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ],
  "insecure-registries": [
    "192.168.1.3:5000"
  ]
}
再重启
```



测试

```
# docker pull 192.168.1.3:5000/adguardhome:v1.0
Trying to pull repository 192.168.1.3:5000/adguardhome ... 
v1.0: Pulling from 192.168.1.3:5000/adguardhome
213ec9aee27d: Pull complete 
31f9e8542749: Pull complete 
35797e6c4bae: Pull complete 
3c40b1afc955: Download complete 
4f4fb700ef54: Download complete 
```



# Docker 镜像加速

国内从 DockerHub 拉取镜像有时会遇到困难，此时可以配置镜像加速器。Docker 官方和国内很多云服务商都提供了国内加速器服务，例如：

网易：https://hub-mirror.c.163.com/

阿里云：https://<你的ID>.mirror.aliyuncs.com

七牛云加速器：https://reg-mirror.qiniu.com

当配置某一个加速器地址之后，若发现拉取不到镜像，请切换到另一个加速器地址。国内各大云服务商均提供了 Docker 镜像加速服务，建议根据运行 Docker 的云平台选择对应的镜像加速服务。

```
https://cr.console.aliyun.com/
登录：
https://cr.console.aliyun.com/cn-shenzhen/instances/mirrors 
```



![image-20221203161839102](https://imgoss.xgss.net/picgo/image-20221203161839102.png?aliyun)

## 配置镜像加速器

针对Docker客户端版本大于 1.10.0 的用户

您可以通过修改daemon配置文件/etc/docker/daemon.json来使用加速器

```
$ sudo mkdir -p /etc/docker
$ sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://otow63ff.mirror.aliyuncs.com"] # 可以设置自己的地址
}
EOF
$ sudo systemctl daemon-reload
$ sudo systemctl restart docker
```



以上就是使用DockerHub和用阿里云的DockerHub加速的教程，用好了真的很方便。