---
title: 配置Docker配置镜像加速器
createTime: 2025/05/27 17:51:17
permalink: /article/uypkm0vf/
---
# 配置Docker配置镜像加速器

## 配置Docker配置镜像加速器

```
vi /etc/docker/daemon.json

{
"registry-mirrors": [
	"https://docker.m.daocloud.io", 
    "https://noohub.ru", 
    "https://huecker.io",
    "https://dockerhub.timeweb.cloud",
	"https://f3e2e938202649e9b525ffb7272d7486.mirror.swr.myhuaweicloud.com",  
    "https://otow63ff.mirror.aliyuncs.com",
    "https://docker.1panel.live",
    "http://mirrors.ustc.edu.cn/",
    "http://mirror.azure.cn/",
    "https://hub.rat.dev/",
    "https://docker.ckyl.me/",
    "https://docker.chenby.cn",
    "https://docker.hpcloud.cloud",
    "https://docker.m.daocloud.io",
    "https://d-hub.xgss.net"  
	],
  "data-root": "/data/docker-lib"
}


systemctl daemon-reload
systemctl restart docker
docker info

registry-mirrors： 配置镜像加速器。
data-root： 指定 Docker 数据存储的根目录。

```

