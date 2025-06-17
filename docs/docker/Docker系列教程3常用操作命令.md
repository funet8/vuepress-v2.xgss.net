---
title: Docker系列教程3常用操作命令
createTime: 2025/05/27 17:51:17
permalink: /article/kyxk3ae1/
---
# Docker系列教程3：常用操作命令



上次分享了Docker的一些入门知识点和docker的安装，这次主要讲docker的常用操作命令。

# Docker使用镜像常用命令

## 1. 获取镜像

```
docker pull ubuntu:14.04
docker pull ubuntu 			#默认从registry.hub.docker.com中获取
docker pull hub.c.163.com/public/ubuntu:14.04		#从网易蜂巢下载镜像
docker run -d -p 80:80 --name webserver nginx		#没有镜像会先下载
```

## 2.查看镜像信息

```
docker images
docker inspect ubuntu:13.10
docker history ubuntu
```

## 3.查找镜像

```
docker search TERM
docker search centos
docker search nginx
```

## 4.删除镜像

```
docker rmi IMAGE
docker rmi ubuntu:13.10    
docker rmi -f ubuntu:13.10	#强制删除镜像
```

## 5.创建镜像的三个方法

### 1.基于已有镜像的容器创建

```
docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
# docker run -it ubuntu:14.04 /bin/bash
root@cd391ad59121:/# 
记住容器ID：cd391ad59121
```

```
提交新的镜像：
docker commit -m "added a new file lxxxx" -a "jishubu lxx" cd391ad59121 test:0.1
查看：
# docker images
REPOSITORY                    TAG                 IMAGE ID            CREATED             SIZE
test                          0.1                 b2ac4664aadb        16 seconds ago      188 MB
```



### 2.基于本地模板导入

从一个操作系统模板导入一个镜像

```
cat centos-6-x86_64-minimal.tar.gz |docker import - centos6min
```



### 3.基于Dockerfile创建

```
FROM	docker.io/0702/centos7 
MAINTAINER star  <funet8@163.com>
ENV TZ "Asia/Shanghai"
ENV TERM xterm
#新建用户和用户组
RUN groupadd www && useradd -g www www
等等
```




## 6.保存和导出镜像 

保存： docker save

```
docker save <myimage>:<tag> | gzip > <myimage>_<tag>.tar.gz
docker save -o ubuntu_14.04.tar ubuntu:14.04
```

通过文件将镜像复制给他人

导入： docker load

```
docker load < ubuntu_14.04.tar
```

导入镜像

```
gunzip -c <myimage>_<tag>.tar.gz | docker load
```



## 7.上传镜像

使用 docker push 默认上传到docker hub官方

```
docker pust NAME[:TAG] |[REGISTRY_HOST[:REGISTRY_PORT ] /] NAME[:TAG]
```

# Docker操作容器常用命令

## 一、创建容器

### 1.新建容器

```
docker create --help
docker create -it ubuntu:latest
```

create、run命令支持选项都非常复杂

### 2.启动容器

```
docker start NAMES
```

### 3.创建并启动容器

```
docker run ubuntu:15.10 /bin/echo "hello world"
docker run -it ubuntu:15.10 /bin/bash 
docker run -v /data/mysql:/var/lib/mysql -p 61920:3306 --name mariadb -d mariadb:latest
docker run -d --name myFpm -p 9000:9000 -v  /data/wwwroot/web:/usr/share/nginx/html bitnami/php-fpm
docker run -d --name myNginx -p 80:80 -v /data/wwwroot/web:/usr/share/nginx/html -v /data/wwwroot/log:/var/log/nginx nginx
```

-i 分配一个伪终端并绑定到容器的标准输出上
-t 容器的标准输入保持打开
-p 表示Docker 镜像内部容器端口暴露给主机
-v标识来给容器内添加一个数据卷，你也可以在一次docker run命令中多次使用-v标识挂载多个数据卷

### 4.守护态运行

```
docker run -d ubuntu:15.10 /bin/sh -c "while true;do echo hello world; sheep 1;done"
```

###  5.查看容器

```
docker ps -l
docker logs NAMES  #显示容器的标准输出
docker top NAMES   #docker top 来查看容器内部运行的进程
```



## 二、停止、启动、重启容器

```
docker stop NAME
docker start NAME
docker restart NAME
```

## 三、进入容器

### 1、 exec命令（推荐）

```
docker exec -it lxx-wordpress /bin/bash
```

### 2、attach 命令（不推荐）

```
# docker run -itd ubuntu:14.04
522681d4c41c7c34ad04779e83253352d1080e85eb9c8f2d1e25f81758379d19
# docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
522681d4c41c        ubuntu:14.04        "/bin/bash"         12 seconds ago      Up 10 seconds                           distracted_perlman
# docker attach distracted_perlman
root@522681d4c41c:/# 
```

### 3、nsenter工具

需要安装软件，不推荐

## 四、删除容器

```
docker rm NAMES
docker rm -f NAMES  #强制删除
```

## 五、导入和导出容器

1.导出容器 -docker export

```
# docker run -itd ubuntu:14.04 /bin/bash
# docker export -o test_for_run.tar loving_bohr
```

2.导入容器 docker import

```
docker import test_for_run.tar  test/ubuntu:v1.0
docker images
REPOSITORY                    TAG                 IMAGE ID            CREATED             SIZE
test/ubuntu                   v1.0                69f170a40e6f        6 seconds ago       175.1 MB
```



## Docker save load export import的区别

## export

export命令用于持久化容器（不是镜像）。所以，我们就需要通过以下方法得到容器ID：

```
sudo docker ps -a
接着执行导出：
sudo docker export <CONTAINER ID> > /home/export.tar
```

## save

Save命令用于持久化镜像（不是容器）。所以，我们就需要通过以下方法得到镜像名称：

```
sudo docker images
接着执行保存：
sudo docker save busybox-1 > /home/save.tar
```

使用export比使用save保存的文件要小一些

## load save

两者的使用方法是一样的，导入压缩包生成镜像

```
docker import - busybox-1-export:latest
```

docker import可以重新指定镜像的名字

```
docker load < /home/save.tar
```



## **它们之间到底存在什么不同呢？**

首先，docker import可以重新指定镜像的名字，docker load不可以

其次，我们发现导出后的版本会比原来的版本稍微小一些。那是因为导出后，会丢失历史和元数据。执行下面的命令就知道了：
显示镜像的所有层(layer)

```
sudo docker images --tree
```

执行命令，显示下面的内容。正你看到的，导出后再导入(exported-imported)的镜像会丢失所有的历史，而保存后再加载（saveed-loaded）的镜像没有丢失历史和层(layer)。这意味着使用导出后再导入的方式，你将无法回滚到之前的层(layer)，同时，使用保存后再加载的方式持久化整个镜像，就可以做到层回滚（可以执行docker tag 来回滚之前的层）。

# 文件权限管理


实际环境中docker程序中生成的文件权限 在宿主机上显示的是 500


在宿主上查看www用户的ID

```
# cat /etc/passwd |grep www
www:x:1001:1001::/home/www:/sbin/nologin
```


进入docker虚拟机

```
# usermod -u 1001 www
# groupmod -g 1001 www
```


将所需要的目录更改权限

```
chown www.www -R /data/web/dir/   
```



# 常用命令图

有牛人总结了docker的操作命令，看图：

![docker常用命令](https://imgoss.xgss.net/picgo/docker常用命令.png?aliyun)

# 总结一下常用命令

其中<>阔起来的参数为必选，[]阔起来为可选 

```
docker version 查看docker的版本号，包括客户端、服务端、依赖的Go等

docker info 查看系统(docker)层面信息，包括管理的images, containers数等

docker search  在docker index中搜索image

docker pull  从docker registry server 中下拉image

docker push  推送一个image或repository到registry

docker push :TAG 同上，指定tag

docker inspect  查看image或container的底层信息

docker images TODO filter out the intermediate image layers (intermediate image layers 是什么)

docker images -a 列出所有的images

docker ps 默认显示正在运行中的container

docker ps -l 显示最后一次创建的container，包括未运行的

docker ps -a 显示所有的container，包括未运行的

docker logs  查看container的日志，也就是执行命令的一些输出

docker rm  删除一个或多个container

docker rm `docker ps -a -q` 删除所有的container

docker ps -a -q | xargs docker rm 同上, 删除所有的container

docker rmi  删除一个或多个image

docker start/stop/restart  开启/停止/重启container

docker start -i  启动一个container并进入交互模式

docker attach  attach一个运行中的container

docker run  使用image创建container并执行相应命令，然后停止

docker run -i -t  /bin/bash 使用image创建container并进入交互模式, login shell是/bin/bash

docker run -i -t -p  将container的端口映射到宿主机的端口

docker commit  [repo:tag] 将一个container固化为一个新的image，后面的repo:tag可选


docker build
寻找path路径下名为的Dockerfile的配置文件，使用此配置生成新的image
docker build -t repo[:tag] 同上，可以指定repo和可选的tag
docker build -  使用指定的dockerfile配置文件，docker以stdin方式获取内容，使用此配置生成新的image

docker port  查看本地哪个端口映射到container的指定端口，其实用docker ps 也可以看到

```





