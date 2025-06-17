---
title: Docker系列教程10-Docker-备份还原镜像
createTime: 2025/05/27 17:51:17
permalink: /article/tbgf8iy5/
---
# Docker-备份还原镜像

## 一、镜像备份

1、如果是正在运行的容器，则先要把容器打包成镜像

将该暂停的容器打包成镜像
```
docker commit 容器id 新的镜像名
```

查看镜像列表
```
docker images
```
              

2、备份成tar压缩文件导出到D盘docker_backup文件夹
```
docker save 镜像id > /data/docker/backup/压缩.tar
```



## 二、镜像恢复

1、将备份文件夹内的备份文件恢复到docker的镜像
```
docker load < /data/docker/backup/压缩.tar
```


## docker加载新的镜像后repository和tag名称都为none的解决方法

可以使用命令:
```
docker tag [image id] [name]:[版本]
例如:

docker tag b03b74b01d97 docker-redis:0.0.1
```





