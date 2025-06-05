# 【开源安全保护】如何安装JumpServer堡垒机



# 什么是堡垒机

大家好，我是星哥，今天我以前来认识堡垒机

堡垒机（Bastion Host），也称为跳板机（Jump Server），是指在计算机网络中，作为一个中介的安全服务器，它位于内外网之间，主要用于集中管理和审计远程访问企业内部重要系统的操作。堡垒机通过严格的访问控制、日志审计和身份认证等手段，确保只有授权用户可以通过它访问企业内部的敏感服务器，并对访问过程进行全面监控。

堡垒机可以有效地降低内部系统暴露在公网中的风险，成为防止外部攻击和内部滥用的重要安全防线。

## 未添加堡垒机，如下图

![image-20241203162947055](https://imgoss.xgss.net/picgo/image-20241203162947055.png?aliyun)

## 使用堡垒机，如下图

![image-20241203163107285](https://imgoss.xgss.net/picgo/image-20241203163107285.png?aliyun)

## **堡垒机的优点**

**增强安全性**：堡垒机可以作为一道额外的防线，保护服务器免受直接连接的风险。只有堡垒机可以直接与服务器通信，从而减少了服务器直接暴露在公共网络中的风险。

**严格的权限控制**：堡垒机可以充当访问控制的关口，只有经过授权的用户才能连接到目标服务器。管理员可以在堡垒机上配置严格的访问规则，确保只有合适的人员可以访问目标服务器。

**跟踪访问日志**：堡垒机通常会记录连接和操作日志，这使得可以跟踪谁连接了服务器以及他们执行了哪些操作。这对于审计和安全审查非常重要。

**集中管理**：堡垒机提供了一个集中的访问点，管理员可以在这里管理所有对服务器的访问。这使得在一个地方控制访问权限和监控访问活动变得更加方便。



# 什么是JumpServer

JumpServer 是广受欢迎的开源堡垒机，是符合 4A 规范的专业运维安全审计系统。JumpServer 帮助企业以更安全的方式管控和登录所有类型的资产，实现事前授权、事中监察、事后审计，满足等保合规要求。

官方文档： https://docs.jumpserver.org/

开源地址：https://github.com/jumpserver/jumpserver

# 安装JumpServer

## 实验环境

本文完整的方案会用到服务器(或者虚拟机)

- 服务器一台（必须，安装 Centos7.2 以上版本系统，**如果没有备案域名请购买香港或海外区域**，http://y.xgss.net/aliyun）
- 域名或IP一个，下文以 域名 jms.xgss.net 代替（非必须，本文用用内网ip 192.168.1.121代替）
- SSL 证书一个（非必须，可以免费证书）



## 环境要求

- 支持主流 Linux 发行版本（基于 Debian / RedHat，包括国产操作系统）
- Gentoo / Arch Linux 请通过源码安装

| 操作系统    | 架构    | Linux 内核 | 软件要求                              | 最小化硬件配置        |
| ----------- | ------- | ---------- | ------------------------------------- | --------------------- |
| linux/amd64 | x86_64  | >= 4.0     | wget curl tar gettext iptables python | 2Core/8GB RAM/60G HDD |
| linux/arm64 | aarch64 | >= 4.0     | wget curl tar gettext iptables python | 2Core/8GB RAM/60G HDD |

## Ubuntu

```
apt-get update
apt-get install -y wget curl tar gettext iptables
```

## CentOS

```
yum update
yum install -y wget curl tar gettext iptables
```

# 离线安装

为什么选择离线安装，因为在线安装jumpserver很考验服务器的网络，有时候会因为网络的问题导致安装失败。

还有一种方法是docker all in one。

从飞致云社区 下载最新的 linux/amd64 [地址： community.fit2cloud.com/#/products/jumpserver/downloads ]离线包, 并上传到部署服务器的 /opt 目录。

关注公众号'星哥玩云'，回复'jumpserver'，获得jumpserver的下载地址。

```
cd /opt
tar -xf jumpserver-ce-v4.4.1-x86_64.tar.gz
cd jumpserver-ce-v4.4.1-x86_64

# 安装
./jmsctl.sh install

# 启动
./jmsctl.sh start
```



## 安装成功

```
>>> The Installation is Complete
1. You can use the following command to start, and then visit
cd /opt/jumpserver-ce-v4.4.1-x86_64
/opt/jumpserver-ce-v4.4.1-x86_64/jmsctl.sh start

2. Other management commands
/opt/jumpserver-ce-v4.4.1-x86_64/jmsctl.sh stop
/opt/jumpserver-ce-v4.4.1-x86_64/jmsctl.sh restart
/opt/jumpserver-ce-v4.4.1-x86_64/jmsctl.sh backup
/opt/jumpserver-ce-v4.4.1-x86_64/jmsctl.sh upgrade
For more commands, you can enter ./jmsctl.sh --help to understand

3. Web access
http://192.168.1.121:80
Default username: admin  Default password: ChangeMe
```

## docker ps

查看正在运行的容器

```
[root@node121 ~]# docker ps
CONTAINER ID   IMAGE                       COMMAND                  CREATED       STATUS                 PORTS                                       NAMES
27241322b803   jumpserver/koko:v4.4.1-ce   "./entrypoint.sh ./k…"   5 hours ago   Up 5 hours (healthy)   0.0.0.0:2222->2222/tcp, :::2222->2222/tcp   jms_koko
76dda2c4c06c   jumpserver/core:v4.4.1-ce   "./entrypoint.sh sta…"   5 hours ago   Up 5 hours (healthy)   8080/tcp                                    jms_core
df05a6e1df0e   jumpserver/chen:v4.4.1-ce   "./entrypoint.sh wisp"   5 hours ago   Up 5 hours (healthy)   8082/tcp                                    jms_chen
099a575dc8a9   redis:7.0-bullseye          "docker-entrypoint.s…"   5 hours ago   Up 5 hours (healthy)   6379/tcp                                    jms_redis
716f50d4f2f0   jumpserver/web:v4.4.1-ce    "/docker-entrypoint.…"   5 hours ago   Up 5 hours (healthy)   0.0.0.0:80->80/tcp, :::80->80/tcp           jms_web
5afd8a649cc4   jumpserver/lion:v4.4.1-ce   "./entrypoint.sh sup…"   5 hours ago   Up 5 hours (healthy)   4822/tcp, 8081/tcp                          jms_lion
421b962cb795   postgres:16.3-bullseye      "docker-entrypoint.s…"   5 hours ago   Up 5 hours (healthy)   5432/tcp                                    jms_postgresql
72521dbb2adc   jumpserver/core:v4.4.1-ce   "./entrypoint.sh sta…"   5 hours ago   Up 5 hours (healthy)   8080/tcp                                    jms_celery
```

## 浏览器访问

http://192.168.1.121:80 访问 jumpserver

输入用户和默认的密码，username: admin  Default password: ChangeMe，提示修改初始密码。

![image-20241203164439583](https://imgoss.xgss.net/picgo/image-20241203164439583.png?aliyun)



至此离线安装jumpserver安装成功。

# JumpServer all-in-one安装方法

这里用容器all-in-one有个好处就是方便，不会破坏宿主机原来的服务（如果是全新机就可以考虑这个问题），但是安装之后有两个BUG。

一个是nginx的一个报错，“nginx: [emerg] host not found in upstream "facelive" in /etc/nginx/includes/facelive.conf:2”

一个是需要配置配置文件，“配置文件有问题，无法登录，请联系管理员或查看最新文档，如果你是管理员，可以更新配置文件解决，设置配置项”

所以不建议没有Docker操作的小白用这个方法。

至少官方没有修复之前不建议用。

## 安装docker

省略

## Quick start

```
docker volume create jsdata
docker volume create pgdata
docker volume ls

docker run --name jms_all \
-e SECRET_KEY=PleaseChangeMe \
-e BOOTSTRAP_TOKEN=PleaseChangeMe \
-v jsdata:/opt/data \
-v pgdata:/var/lib/postgresql \
-p 2222:2222 \
-p 82:80 jumpserver/jms_all

```

## 报错

```
mv: inter-device move failed: '/opt/jumpserver/data/logs' to '/opt/data/jumpserver/logs'; unable to remove target: Directory not empty
rm: cannot remove '/var/log/nginx': Device or resource busy
>> Init database
>> Start database postgre
Removed stale pid file.

/opt/web/entrypoint.sh: Configuration complete; ready for start up
nginx: [emerg] host not found in upstream "facelive" in /etc/nginx/includes/facelive.conf:2
2024-12-03 16:55:49,570 INFO exited: web (exit status 1; not expected)
2024-12-03 16:55:50,571 INFO gave up: web entered FATAL state, too many start retries too quickly
```

![image-20241203170109111](https://imgoss.xgss.net/picgo/image-20241203170109111.png?aliyun)

## 修复nginx配置bug

进入docker

```

# docker exec -it jms_all /bin/bash

```

编辑

```
vim /etc/nginx/includes/facelive.conf
把
proxy_pass http://facelive:9999;
改成：
proxy_pass http://127.0.0.1:9999;
保存退出，再重启容器
```

重启docker容器

```
root@415e8fb4b1cd:/opt# exit
exit
[root@node121 ~]# docker restart jms_all

```

## 浏览器访问

输入用户和默认的密码，username: admin  Default password: ChangeMe

依然报错：

配置文件有问题，无法登录，请联系管理员或查看最新文档
如果你是管理员，可以更新配置文件解决，设置配置项
DOMAINS=192.168.1.121:82

![image-20241203171218906](https://imgoss.xgss.net/picgo/image-20241203171218906.png?aliyun)

## 修复bug

修复： 配置文件有问题，无法登录，请联系管理员或查看最新文档，如果你是管理员，可以更新配置文件解决，设置配置项

在网上找到的解决办法，这个方法不管用。

```
# docker exec -it jms_all /bin/bash

1.服务器上找到  
mkdir /opt/jumpserver/config/
vim /opt/jumpserver/config/config.txt

2.vi进去，找到这里，如何找。可以进入冒号模式：/DOMAINS,来进行查找。

DOMAINS="192.168.1.121:82"


```



这个方法可以修复

```
# docker exec -it jms_all /bin/bash

vim /opt/jumpserver/apps/jumpserver/conf.py
找到 'DOMAINS': '', 这一行。
把改为：
'DOMAINS': '192.168.1.121:82', # 这里换成你的地址。
保存退出
再重启容器
exit
docker restart jms_all
```

至此all-in-one安装方法可以成功登录jumpserver。

系统内存占用到2G。



参考： https://github.com/jumpserver/Dockerfile/tree/master/allinone

# 结尾

JumpServer 的安装（离线安装）和配置并不复杂，但却能显著提升企业的运维安全性和操作规范化程度。通过合理的权限划分和全面的审计功能，

下一篇文章星哥会讲如何使用JumpServer堡垒机，保护你的服务器的安全。