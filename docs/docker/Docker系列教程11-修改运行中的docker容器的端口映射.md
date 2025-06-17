---
title: Docker系列教程11-修改运行中的docker容器的端口映射
createTime: 2025/05/27 17:51:17
permalink: /article/sb2gf6hm/
---


# 修改运行中的docker容器的端口映射

在docker run创建并运行容器的时候，可以通过-p指定端口映射规则。但是，我们经常会遇到刚开始忘记设置端口映射或者设置错了需要修改。当docker start运行容器后并没有提供一个-p选项或设置，让你修改指定端口映射规则。那么这种情况我们该怎么处理呢？今天Docker君教你如何修改运行中的docker容器的端口映射？

## 方法一：删除原有容器，重新建新容器

这个解决方案最为简单，把原来的容器删掉，重新建一个。当然这次不要忘记加上端口映射。

## 方法二：修改容器配置文件，重启docker服务

容器的配置文件路径：

/var/lib/docker/containers/[hash_of_the_container]/hostconfig.json

其中的hashofthecontainer是docker镜像的hash值，可以通过docker ps或者docker inspect containername查看。（CONTAINER ID就可以看出来）



![image-20200917093804772](https://imgoss.xgss.net/picgo/image-20200917093804772.png?aliyun)



```
systemctl stop docker
进入docker项目的配置目录
# cd /var/lib/docker/containers/bc96d2777c64583b2a02c5864e452e71cb370cb587f00c262e2df242fb4d8d69/
# vi hostconfig.json 
把：[{"HostIp":"","HostPort":"9022"}]改成[{"HostIp":"192.168.20.178","HostPort":"9022"}]
# vi config.v2.json

未修改之前的：
# docker ps
CONTAINER ID        IMAGE                       COMMAND             CREATED             STATUS              PORTS                                                 NAMES
bc96d2777c64        jumpserver/jms_all:latest   "./entrypoint.sh"   5 weeks ago         Up 5 weeks          192.168.20.178:9000->80/tcp, 0.0.0.0:9022->2222/tcp   jms_all

systemctl start docker
```

修改防火墙：

```
 vi /etc/sysconfig/iptables
 -A DOCKER ! -i docker0 -p tcp -m tcp --dport 9022 -j DNAT --to-destination 172.17.0.2:2222
改成
-A DOCKER -d 192.168.20.178/32 ! -i docker0 -p tcp -m tcp --dport 9022 -j DNAT --to-destination 172.17.0.2:2222

systemctl restart iptables

修改之后 重启：
systemctl start docker
CONTAINER ID        IMAGE                       COMMAND             CREATED             STATUS              PORTS                                                        NAMES
bc96d2777c64        jumpserver/jms_all:latest   "./entrypoint.sh"   5 weeks ago         Up 6 seconds        192.168.20.178:9000->80/tcp, 192.168.20.178:9022->2222/tcp   jms_all
```







## 方法三：利用docker commit新构镜像

​    docker commit：把一个容器的文件改动和配置信息commit到一个新的镜像。这个在测试的时候会非常有用，把容器所有的文件改动和配置信息导入成一个新的docker镜像，然后用这个新的镜像重起一个容器，这对之前的容器不会有任何影响。

### 1、停止docker容器

docker stop container01

### 2、commit该docker容器

docker commit container01 new_image:tag

### 3、用前一步新生成的镜像重新起一个容器

docker run --name container02 -p 80:80 new_image:tag

    优缺点：这种方式的优点是不会影响统一宿主机上的其他容器，缺点是管理起来显得比较乱，没有第二种方法那么直观。







参考：

https://www.cnblogs.com/shijf/p/10386193.html

