---
title: Docker系列教程6-使用dockerfile创建镜像
createTime: 2025/05/27 17:51:17
permalink: /article/t6xf1tqc/
---
# 使用dockerfile创建镜像

## 1.克隆 dockerfile

```
yum install git
git clone https://gitee.com/funet8/docker-training.git
```


## 2.进入相应目录构建进行

```
cd docker-training/centos7
# ls
aliyun-epel.repo  aliyun-mirror.repo  Dockerfile  supervisord.conf
构建镜像:
docker build -t  funet8/centos:7.2 .
```


## 3.运行容器

```
# docker run -itd -p 60921:22 --name FCentos  funet8/centos:7.2

# docker run -itd  --name FCentos3 funet8/centos:7.2


# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                   NAMES
5da308c6f987        funet8/centos:7.2   "/usr/bin/supervisord"   11 minutes ago      Up 11 minutes       0.0.0.0:60921->22/tcp   FCentos
```


## 4.进入容器

```
# docker exec -it FCentos /bin/bash
[root@5da308c6f987 /]# 
```


## 构建mysql镜像和容器

```
cd docker-training/mysql/

构建mariadb镜像:
docker build -t  funet8/centos_mariadb .
启动镜像：
docker run -itd -p 60920:3306 --name Mariadb1 funet8/centos_mariadb
docker run -itd -p 60922:3306 --name Mariadb2 -v /data/mysql:/var/lib/mysql  funet8/centos_mariadb
进入容器：
docker exec -it Mariadb1 /bin/bash

```

















