# Docker下部署socks5和pptp服务端，实现代理上网



在日常工作中星哥经常要搭建socks5（以下称为ss5）和pptp，来实现代理上网，之前一直使用脚本安装，有些不方便想想能不能用docker一键部署。

socks5和PPTP（Point-to-Point Tunneling Protocol）作为常见的和代理工具，已经成为了用户获取隐私保护和突破网络限制的关键工具。

本文将介绍如何在Docker容器中部署SS5和PPTP服务端，为您的网络带来更强的安全性和隐私保护。

![image-20250115185452294](https://imgoss.xgss.net/picgo/image-20250115185452294.png?aliyun)

# 准备工作

- 云服务器、NAS、虚拟机等  【 阿里云优惠： [https://y.xgss.net/aliyun](https://y.xgss.net/aliyun) 或 腾讯云优惠： [https://y.xgss.net/tx](https://y.xgss.net/tx) 】
- 本篇文章在Centos7.9系统下演示，当然其他支持Docker系统亦可
- 安装docker和docker-compose 【本篇文章不细讲，可以看星哥之前的教程或者官方文档】



# Docker部署ss5服务器

我们使用以下命令启动一个 Docker 容器：

### 启动命令

```
docker run -itd --restart always \
--name socks5 \
-p 1080:1080 \
-e PROXY_USER=myuser \
-e PROXY_PASSWORD=mypassword \
-e PROXY_SERVER=0.0.0.0:1080 xkuma/socks5
```

### 命令解释

```
1. docker run:
这是启动一个新的容器的基础命令，表示运行一个新的容器实例。

2. -itd:
这个参数包含了三个选项：

-i：表示“交互式”，即保持容器的标准输入流打开，允许在容器内部进行交互。
-t：分配一个伪终端，用于控制台输出。
-d：表示“后台运行”（detached），即容器在后台运行，而不是占用当前的终端。
3. --restart always:
表示容器在退出时会自动重启。如果容器因任何原因停止，它会自动尝试重新启动。此设置适合需要长期运行的服务，例如代理服务。

4. --name socks5:
指定容器的名字为socks5。容器可以通过名字来访问，而不需要使用容器ID。

5. -p 1080:1080:
映射容器内的端口到主机系统的端口。在这种情况下，容器内的1080端口会映射到主机的1080端口。由于Socks5代理通常使用1080端口，所以这是暴露代理端口的设置。

6. -e PROXY_USER=myuser:
通过环境变量传递代理的用户名。容器启动时，PROXY_USER环境变量会设置为myuser，用于Socks5代理认证的用户名。

7. -e PROXY_PASSWORD=mypassword:
通过环境变量传递代理的密码。容器启动时，PROXY_PASSWORD环境变量会设置为mypassword，用于Socks5代理认证的密码。

8. -e PROXY_SERVER=0.0.0.0:1080:
通过环境变量配置代理服务的监听地址和端口。PROXY_SERVER设置为0.0.0.0:1080，表示代理服务会监听所有网络接口上的1080端口。

9. xkuma/socks5:
这是Docker镜像的名字。在这里，xkuma/socks5是一个公开的Socks5代理镜像。它包含了Socks5代理服务的所有必要代码和配置，能够在容器中运行一个Socks5代理服务。
```

### 查看状态

```
# docker ps
CONTAINER ID   IMAGE                COMMAND                  CREATED          STATUS          PORTS                    NAMES
df197d1987a5   xkuma/socks5         "/bin/scoks5"            4 seconds ago    Up 3 seconds    0.0.0.0:1080->1080/tcp   socks5
```



## 开放端口

服务器的防火墙或者云服务器的安全组策略都需要打开 1080 端口。

这里我只演示centos7的命令

### iptables

```
iptables -A INPUT -p tcp --dport 1080  -j ACCEPT
service iptables save
systemctl restart iptables
```

### firewalld

```
# firewall-cmd --zone=public --add-port=1080/tcp --permanent
# firewall-cmd --reload
```

## 客户端验证

这里我使用火狐浏览器的FoxyProxy插件，当然你也可以使用其他支持ss5的工具



![image-20250115185016500](https://imgoss.xgss.net/picgo/image-20250115185016500.png?aliyun)

使用ip查询

![image-20250115185254644](https://imgoss.xgss.net/picgo/image-20250115185254644.png?aliyun)

至此使用Docker部署ss5服务器完成。

# Docker部署PPTP服务器

PPTP（点对点隧道协议）是一种常见的VPN协议，虽然它的安全性已经被一些新型的VPN协议所取代，但由于其配置简单、广泛支持，仍然在某些场景下得到使用。

## 1.创建Dockerfile



```
FROM ubuntu:20.04

# 安装PPTP和其它依赖
RUN apt-get update && \
    apt-get install -y pptpd && \
    apt-get clean

# 配置PPTP
RUN echo "option /usr/sbin/pptpd" >> /etc/pptpd.conf && \
    echo "localip 10.0.0.1" >> /etc/pptpd.conf && \
    echo "remoteip 10.0.0.100-200" >> /etc/pptpd.conf

# 设置VPN账户
RUN echo "vpnuser pptpd password *" >> /etc/ppp/chap-secrets

# 打开PPTP服务
CMD ["pptpd", "--debug", "--fg"]
```

## 2.构建Docker镜像

```
docker build -t my-pptp-server .
```

## 3.运行Docker容器

```
docker run -d \
    --name pptp-server \
    --privileged \
    -p 1723:1723 \
    -p 47:47 \
    my-pptp-server
```



## 4.客户端连接

服务器地址：你的服务器IP
用户名：vpnuser
密码：password

# 总结

通过Docker部署SS5和PPTP服务端可以为您的网络提供更高效的管理和维护方式。Docker容器化的优势使得配置和部署更加灵活，尤其在跨平台和高可用性场景下非常适用。



