---
title: Docker系列教程5-使用dockerfile基本语法
createTime: 2025/05/27 17:51:17
permalink: /article/p123jmer/
---
# 使用dockerfile创建镜像

文本格式的配置文件，用户可以使用它快速创建自定义的镜像。
dockerfile分为四部分：基础镜像信息、维护者信息、镜像操作指令、容器启动时执行命令。

## 1.FROM（指定基础镜像、必须）

```
FROM <image>  
FROM <image>:<tag>
```
## 2.MAINTAINER（用来指定镜像创建者信息）

```
MAINTAINER star xxx@163.com
```
## 3.RUN（安装软件用）

每条RUN指令将在当前镜像的基础上执行指令命令，并且提交为新的镜像

```
RUN <command> ; RUN ["executable","param1","param2"]
RUN apt-get update
```
## 4.CMD（镜像启动时执行）

每个CMD只能有一条命令，指定多了只有最后一条会被执行

```
CMD /user/sbin/nginx
```


## 5.LABEL(镜像的元数据标签信息)

```
LABEL <key>=<value> <key>=<value>...
例如：
LABEL VERSION="1.0"
LABEL description="this test illustrates"
```


## 6.EXPORSE(镜像内监听端口)

```
例如：
EXPORSE 80 22 443
```


## 7.ENV(指定环境变量)

```
格式：
ENV <KEY><VALUE>
ENV PG_MAJOR 9.3
```


## 8.ADD(添加)

可以是dockerfile所在目录的相对路径也可以是一个URL，也可以是个tar包（会自动解压到dest路径下）

```
格式： 
ADD <src> <dest>
ADD supervisord.conf /etc/supervisord.conf
```


## 9.COPY(复制)

```
格式： COPY <src> <dest>
复制本地主机的<src>到镜像中<dest>目录，目标路径不存在会自动创建，当本地目录为源目录时，推荐使用COPY
```


## 10.ENTRYPOINT（镜像启动时执行）

```
两种格式：
ENTRYPOINT ["excutable","param1","param2"]   #exec调用执行
ENTRYPOINT command param1 param2			 #shell中执行
例如：
ENTRYPOINT ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisord.conf"]
```


## 11.VOLUME(创建挂载点)

```
格式： 
VOLUME ["/data"]
```


## 12.USER(指定运行容器的用户名uid) 

当服务不需要管理员权限的时候，可以通过制定该命令运行用户。

```
格式： 
USER daemon
```
## 13.WORKDIR(为后续RUN、CMD和ENTRYPOINT)

指定配置工作目录

```
WORKDIR /path/to/workdir

# 在 /p1/p2 下执行 vim a.txt
WORKDIR /p1 
WORKDIR p2 
RUN vim a.txt
```


## 14.ARG 指定镜像内的参数


```
这些参数在执行docker build命令时才以 --build-arg<varname>=<value>格式传入。

格式：
ARG<name>[=<default value>]
则可以用--build-arg<varname>=<value>来指定参数值
```


## 15.ONBUILD（在子镜像中执行）

ONBUILD 指定的命令在构建镜像时并不执行，而是在它的子镜像中执行。

```
ONBUILD <Dockerfile关键字>  
```


## 16.STOPSIGNAL（指定容器启动接受退出的信号）

所使用的信号必须是内核系统调用表中的合法的值，如：9、SIGKILL。

```
STOPSIGNAL signal
```


## 17.HEALTHCHECK

（健康检查 1.12以后支持）



## 18.SHELL

（指定其他命令使用shell时的默认类型）



#  Dockerfile文件中的CMD和ENTRYPOINT指令差异对比

https://www.cnblogs.com/lienhua34/p/5170335.html

CMD指令和ENTRYPOINT指令的作用都是为镜像指定容器启动后的命令，那么它们两者之间有什么各自的优点呢？
为了更好地对比CMD指令和ENTRYPOINT指令的差异，我们这里再列一下这两个指令的说明

## **CMD**

```
支持三种格式
    CMD ["executable","param1","param2"] 使用 exec 执行，推荐方式；
    CMD command param1 param2 在 /bin/sh 中执行，提供给需要交互的应用；
    CMD ["param1","param2"] 提供给 ENTRYPOINT 的默认参数；
```

指定启动容器时执行的命令，每个 Dockerfile 只能有一条 CMD 命令。如果指定了多条命令，只有最后一条会被执行。
如果用户启动容器时候指定了运行的命令，则会覆盖掉 CMD 指定的命令。

## **ENTRYPOINT**

```
两种格式：
    ENTRYPOINT ["executable", "param1", "param2"]
    ENTRYPOINT command param1 param2（shell中执行）。
```

从上面的说明，我们可以看到有两个共同点：

1.  **都可以指定shell或exec函数调用的方式执行命令；**
2.  **当存在多个CMD指令或ENTRYPOINT指令时，只有最后一个生效；**

而它们有如下差异：
		1.**差异1：CMD指令指定的容器启动时命令可以被docker run指定的命令覆盖，而ENTRYPOINT指令指定的命令不能被覆盖，而是将docker run指定的参数当做ENTRYPOINT指定命令的参数。**
		2.**差异2：CMD指令可以为ENTRYPOINT指令设置默认参数，而且可以被docker run指定的参数覆盖；**

下面分别对上面两个差异点进行详细说明，

## 差异1

CMD指令指定的容器启动时命令可以被docker run指定的命令覆盖；而ENTRYPOINT指令指定的命令不能被覆盖，而是将docker run指定的参数当做ENTRYPOINT指定命令的参数。






















