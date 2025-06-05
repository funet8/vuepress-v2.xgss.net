# Docker Compose

## Compose 简介
Docker Compose  是 Docker 官方编排（Orchestration）项目之一，负责快速在集群中部署分布式应用。

Docker Compose  项目是 Docker 官方的开源项目，负责实现对 Docker 容器集群的快速编排。从功能上看，跟  OpenStack  中的  Heat  十分类似。其代码目前在 https://github.com/docker/compose 上开源。


在日常工作中，经常会碰到需要多个容器相互配合来完成某项任务的情况。例如要实现一个 Web 项目，除了 Web 服务容器本身，往往还需要再加上后端的数据库服务容器，甚至还包括负载均衡容器等。

Compose允许用户通过一个单独的  docker-compose.yml  模板文件（YAML 格式）来定义一组相关联的应用容器为一个项目（project）。

Compose  中有两个重要的概念：
服务 ( service  )：一个应用的容器，实际上可以包括若干运行相同镜像的容器实例。
项目 ( project  )：由一组关联的应用容器组成的一个完整业务单元，在  docker-compose.yml  文件中定义。

Docker for Mac  、 Docker for Windows  自带  docker-compose  二进制文件，安装 Docker 之
后可以直接使用。
```
[www@node2 ~]$ docker-compose --version
docker-compose version 1.19.0, build 9e633ef
```

## Compose 使用

### 术语
首先介绍几个术语。
服务 ( service  )：一个应用容器，实际上可以运行多个相同镜像的实例。
项目 ( project  )：由一组关联的应用容器组成的一个完整业务单元。
可见，一个项目可以由多个服务（容器）关联而成， Compose  面向项目进行管理。

### 场景
最常见的项目是 web 网站，该项目应该包含 web 应用和缓存。
下面我们用  Python  来建立一个能够记录页面访问次数的 web 网站。

1.web 应用
新建文件夹，在该目录中编写  app.py  文件


```
mkdir ~/python_web
vi ~/python_web/app.py
填写一下内容：

from flask import Flask
from redis import Redis
app = Flask(__name__)
redis = Redis(host='redis', port=6379)
@app.route('/')
def hello():
count = redis.incr('hits')
return 'Hello World! 该页面已被访问 {} 次。\n'.format(count)
if __name__ == "__main__":
app.run(host="0.0.0.0", debug=True)
```
2.编写  Dockerfile  文件，内容为
```
vi ~/python_web/Dockerfile

FROM python:3.6-alpine
ADD . /code
WORKDIR /code
RUN pip install redis flask
CMD ["python", "app.py"]
```
3.编写  docker-compose.yml  文件
这个是 Compose 使用的主模板文件。
```
vi ~/python_web/docker-compose.yml

version: '3'
services:
web:
build: .
ports:
	- "5000:5000"
redis:
image: "redis:alpine"
```
4.运行 compose 项目
```
$ docker-compose up
```
报错：
```
[www@node2 ~]$ cd python_web/
[www@node2 python_web]$ docker-compose up
ERROR: In file './docker-compose.yml', service must be a mapping, not a NoneType.
```

### 一般步骤

1、定义Dockerfile，方便迁移到任何地方；
2、编写docker-compose.yml文件；
3、运行`docker-compose up` 启动服务

1.准备工作：提前下载好镜像：
```
docker pull mysql 
docker pull wordpress
```
2.需要新建一个空白目录，例如wptest。新建一个docker-compose.yml
```
version: '2'
services:
    web: 
      image: wordpress:latest 
      links: 
        - db
      ports: 
        - "8002:80"
      environment:
        WORDPRESS_DB_HOST: db:3306
        WORDPRESS_DB_PASSWORD: 123456
    db: 
      image: mysql 
      environment: 
        - MYSQL_ROOT_PASSWORD=123456
```
3.以上命令的意思是新建db和wordpress容器。等同于：

```
$ docker run --name db -e MYSQL_ROOT_PASSWORD=123456 -d mysql
$ docker run --name some-wordpress --link db:mysql -p 8002:80 -d wordpress
```
4.好，我们启动应用：

```
$ docker-compose up -d  #后台运行，
```
### 常用命令
```
docker-compose  ps #命令查看状态
docker-compose  logs #查看日志
docker-compose stop #停止
docker-compose restart # 重启
```

