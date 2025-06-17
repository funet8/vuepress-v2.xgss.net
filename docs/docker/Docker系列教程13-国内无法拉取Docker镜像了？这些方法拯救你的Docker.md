---
title: Docker系列教程13-国内无法拉取Docker镜像了？这些方法拯救你的Docker
createTime: 2025/05/27 17:51:17
permalink: /article/rh4iwxix/
---
# 国内无法拉取Docker镜像了？这些方法拯救你的Docker



最近各大高校以及容器技术社区，由于众所周不知的原因， 纷纷关闭多个镜像加速站点。

这极大地影响了工作效率和开发进度。面对这一困境，本文将为你介绍几种有效的解决方案，帮助你顺利拉取Docker镜像，继续你的开发工作。

![image-20240705114601834](https://imgoss.xgss.net/picgo/image-20240705114601834.png?aliyun)

今天就介绍几个方法让拯救你的Docker

方法1: 某些云镜像加速

方法2: 使用Docker Hub并将镜像推送到阿里云自有仓库

方法3:使用Github Action 构建docker镜像

方法4: 部署DockerHub的代理

方法5: 镜像仓库前缀替换

![image-20240705163035256](https://imgoss.xgss.net/picgo/image-20240705163035256.png?aliyun)

# 一、某些云镜像加速

这里某些云包括但不限于国内的几大云，阿里云、腾讯云、华为云，使用的方法都大同小异，这里介绍华为云的用户

## 镜像加速不可用

腾讯云镜像加速器地址：https://mirror.ccs.tencentyun.com

中国科学技术大学：https://docker.mirrors.ustc.edu.cn

Docker官方镜像（中国区）镜像加速：https://registry.docker-cn.com

网易云镜像加速器地址：http://hub-mirror.c.163.com

南京大学镜像加速器地址：https://docker.nju.edu.cn

## 镜像加速可用镜像源

阿里云镜像加速器地址：https://XXXXX.mirror.aliyuncs.com

华为云的镜像加速地址：XXX.mirror.swr.myhuaweicloud.com

Daocloud 镜像加速器地址：https://docker.m.daocloud.io



## 华为云镜像加速

进入华为云搜索“容器镜像服务”或者 "SWR" ，进入控制台

点击 “镜像资源”---> “镜像中心”---> "镜像加速器"

![image-20240704174353786](https://imgoss.xgss.net/picgo/image-20240704174353786.png?aliyun)

操作说明
### 安装/升级容器引擎客户端

推荐安装1.11.2以上版本的容器引擎客户端

### 配置镜像加速器

针对容器引擎客户端版本大于 1.11.2 的用户
以root用户登录容器引擎所在的虚拟机

修改“/etc/docker/daemon.json”文件（如果没有，可以手动创建），在该文件内添加如下内容：

```
vi /etc/docker/daemon.json

{
    "registry-mirrors": [ "https://你的地址.mirror.swr.myhuaweicloud.com" ]
}

按“Esc”，输入:wq保存并退出。

systemctl restart docker
```



### 重启容器引擎

配置完成后，执行systemctl restart docker重启容器引擎。 如果重启失败，则检查操作系统其他位置

（如：/etc/sysconfig/docker、/etc/default/docker）是否配置了registry-mirrors参数，删除此参数并重启容器引擎即可。

### 确认配置结果

执行docker info，当Registry Mirrors字段的地址为加速器的地址时，说明加速器已经配置成功。

## 阿里云镜像加速



https://cr.console.aliyun.com/

![image-20240705110013415](https://imgoss.xgss.net/picgo/image-20240705110013415.png?aliyun)



### 镜像加速器

点击"镜像工具"--->镜像加速器

![image-20240705110321808](https://imgoss.xgss.net/picgo/image-20240705110321808.png?aliyun)



# 二、使用Docker Hub并将镜像推送到自有仓库



之前写过一篇文章： https://mp.weixin.qq.com/s/OrcBrtrZRwie3Q8eYVfl-A

画个图说明：

![image-20240705153238249](https://imgoss.xgss.net/picgo/image-20240705153238249.png?aliyun)

当然也可以打包下载到本地

```
docker save busybox > busybox.tar
docker load < busybox.tar
```



# 三、使用Github Action 构建docker镜像

## 前置条件

1.可以访问Github，国内环境github时而抽风体质，如果没有科学环境也可以使用  https://github.com/521xueweihan/GitHub520 +SwitchHosts 基本还是可以使用的（有的话就当我没说）。 

2.有个github账号

3.免费版Action 每天能使用1小时，每个月33小时（基本上够用）。



参考博主悟空的日常：[使用Github Action 构建docker镜像](http://wkdaily.cpolar.cn/archives/gc) http://wkdaily.cpolar.cn/archives/gc

## 1.要有一个github账号

没有账号就需要注册一个。

 https://github.com

## 2.fork项目DockerTarBuilder

fork 叉子叉到自己的仓库中： https://github.com/wukongdaily/DockerTarBuilder

![image-20240704165355729](https://imgoss.xgss.net/picgo/image-20240704165355729.png?aliyun)

## 3.点击 Actions

点击Actions选项卡，再点击同意

![image-20240704165435226](https://imgoss.xgss.net/picgo/image-20240704165435226.png?aliyun)



选择平台，再填入镜像名

![image-20240704165730904](https://imgoss.xgss.net/picgo/image-20240704165730904.png?aliyun)

## 4.下载镜像

点击 All workflows

![image-20240704165853901](https://imgoss.xgss.net/picgo/image-20240704165853901.png?aliyun)

![image-20240704165932860](https://imgoss.xgss.net/picgo/image-20240704165932860.png?aliyun)

## 5.解压恢复镜像

将下载好的压缩包上传到docker宿主机上。

```
解压
# unzip docker-images-tar.zip
Archive:  docker-images-tar.zip
  inflating: x86-64-images.tar.gz    
再解压：
#tar -zxvf x86-64-images.tar.gz
# ls -lh alpine:latest-amd64.tar
-rw------- 1 mysql 127 7.8M 7月   4 16:57 alpine:latest-amd64.tar

导入
# docker load < alpine:latest-amd64.tar

导入成功。
# docker images
REPOSITORY                                         TAG                 IMAGE ID            CREATED             SIZE
alpine                                             latest              a606584aa9aa        13 days ago         7.8 MB
```





# 四、部署DockerHub的代理

## 1.前置条件

有个github账号

有个cloudflare账号



## 2.访问并fork如下项目到自己的仓库

https://github.com/cmliu/CF-Workers-docker.io

## 3.部署到cf的pages服务中

### 3.1登录cloudflare并点击Worker和Pages

点击 “Worker和Pages”再点 概述

点击 “点击pages”再点 “连接到Git”

![image-20240705160146960](https://imgoss.xgss.net/picgo/image-20240705160146960.png?aliyun)



### 3.2 点击pages

连接GitHub

![image-20240705160205349](https://imgoss.xgss.net/picgo/image-20240705160205349.png?aliyun)

容易登录之后



### 3.3 选择刚才fork的仓库

![image-20240705160312609](https://imgoss.xgss.net/picgo/image-20240705160312609.png?aliyun)

点击 保存并部署

![image-20240705160428536](https://imgoss.xgss.net/picgo2025/image-20240705160428536.png?aliyun)

构建和部署

![image-20240705160448775](https://imgoss.xgss.net/picgo/image-20240705160448775.png?aliyun)

继续处理项目

![image-20240705160516489](https://imgoss.xgss.net/picgo/image-20240705160516489.png?aliyun)



## 4.访问并记录刚才部署的代理网站

部署成功，点击访问站点。

![image-20240705160657935](https://imgoss.xgss.net/picgo/image-20240705160657935.png?aliyun)



## 5.自定义域名

这步不是必须

因为cloudflare提供的域名太长不利于记忆，可以使用自有的域名，解析

我这里配置的域名 `dockerhub.xgss.net`  再域名解析过来

![image-20240705161003351](https://imgoss.xgss.net/picgo/image-20240705161003351.png?aliyun)

![image-20240705161210924](https://imgoss.xgss.net/picgo/image-20240705161210924.png?aliyun)

```
# ping dockerhub.xgss.net
PING cf-workers-docker-io-1wu.pages.dev (172.66.47.123) 56(84) bytes of data.
64 bytes from 172.66.47.123 (172.66.47.123): icmp_seq=1 ttl=53 time=988 ms
64 bytes from 172.66.47.123 (172.66.47.123): icmp_seq=2 ttl=53 time=996 ms

```



## 6.修改配置文件

```
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://docker.fxxk.dedyn.io"]  # 请替换为您自己的Worker自定义域名
}
EOF

sudo systemctl daemon-reload
sudo systemctl restart docker
sudo docker info

```



# 五、镜像仓库前缀替换

如果由于网络限制，你无法直接访问某些镜像仓库，还可以尝试通过修改镜像仓库前缀来拉取镜像。一些国内的服务商提供了镜像仓库的镜像服务，你可以将原有的仓库前缀替换为对应的国内服务商的前缀。

例如，将docker.io替换为docker.m.daocloud.io等。这种方法虽然可能不是所有镜像都适用，但能解决一部分镜像拉取问题。

https://github.com/DaoCloud/public-image-mirror?tab=readme-ov-file#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95

# 总结

以上就是拯救你的Docker 几种方法，希望本文介绍的这些方法能够帮助到你，让你的Docker之旅更加顺畅无阻。