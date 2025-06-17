---
title: 群晖NAS配置之自有服务器ngrok实现内网穿透
createTime: 2025/05/27 17:51:17
permalink: /article/a6gg40u0/
---
# 群晖NAS配置之自有服务器ngrok实现内网穿透

# 前言-内网穿透

内网穿透是指通过一种技术让外部网络可以访问到内网的NAS设备，这样即使在不同网络环境下，也能够远程访问和管理NAS设备。以下是一些常见的内网穿透方案：

## Synology官方提供的QuickConnect：

Synology官方提供了QuickConnect服务，可以通过Synology账号远程访问NAS设备。用户可以在NAS控制面板中设置和管理QuickConnect服务，使其在不同网络环境下访问NAS变得更加简单。

## Synology的DDNS服务：

Synology NAS支持使用DDNS（动态域名解析）服务，可以为NAS设备设置一个动态域名，使用户可以通过域名访问NAS，而不必担心动态IP地址变化带来的问题。

## VPN（虚拟专用网络）：

通过在路由器上设置VPN服务器，或者使用NAS自身的VPN服务，可以建立安全的远程连接，让用户远程访问内网资源，包括NAS设备。

## 端口转发/端口映射：

在路由器上设置端口转发（或称端口映射），将指定端口的流量转发到NAS设备上，这样用户就可以通过特定端口来访问NAS。但要确保端口转发时考虑到安全性，避免暴露不必要的服务或端口。

## 第三方内网穿透服务：

使用类似于ngrok、frp等第三方工具或服务进行内网穿透，这些服务可以帮助用户将内网设备暴露到公网上，但需要注意安全性和隐私保护。

这篇文章就来介绍自有服务器ngrok实现内网穿透

![ngrok--1024x640](https://imgoss.xgss.net/picgo/ngrok--1024x640.png?aliyun)

# 前提条件

1.需要有个域名，如果是国内服务器，还需要备案

2.需要有个服务器 [推荐使用阿里云99元/年 ](http://d.xgss.net/2) 访问：http://d.xgss.net/2

3.系统是centos7

# 域名解析

选择二级域名域名 ngrok.xgss.net 三级域名使用泛解析 *.ngrok.xgss.net，为了后面指定域名比如 nas.ngrok.xgss.net就不用再解析了

```
ngrok.xgss.net  	A解析到    云服务器公网IP
*.ngrok.xgss.net	A解析到	云服务器公网IP
```

![image-20231127104128762](https://imgoss.xgss.net/picgo/image-20231127104128762.png?aliyun)

# 安装Ngrok服务端

通过远程ssh连接服务器。

**下载常用依赖库**

```
yum -y install zlib-devel openssl-devel perl hg cpio expat-devel gettext-devel curl curl-devel perl-ExtUtils-MakeMaker hg wget gcc gcc-c++
```

**安装go和git**

```
# yum -y install git go
```

要注意git版本必须大于1.7.9,go版本必须大于1.4,否则可能有意想不到的错误

```
查看版本
# git --version
git version 1.8.3.1
# go version
go version go1.13 linux/amd64
```



## 开始安装ngrok 

个人习惯安装到 /data/ 目录下 如果你想安装到其他目录 则进入你想安装的目录

### 1.下载源码

```
mkdir /data/
cd /data/
# git clone https://github.com/inconshreveable/ngrok.git ngrok
```

### 2.生成证书

```
cd /data/ngrok
#生成并替换源码里默认的证书，注意域名要修改为你自己的，这里是一个虚拟的测试域名
NGROK_DOMAIN="ngrok.xgss.net"
#测试一下有没有设置成功
echo $NGROK_DOMAIN

openssl genrsa -out rootCA.key 2048

openssl req -x509 -new -nodes -key rootCA.key -subj "/CN=$NGROK_DOMAIN" -days 5000 -out rootCA.pem

openssl genrsa -out device.key 2048

openssl req -new -key device.key -subj "/CN=$NGROK_DOMAIN" -out device.csr

openssl x509 -req -in device.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out device.crt -days 5000
```

之后会在 ngrok 目录下生成 root,device 等六个文件。 然后需要拷贝到配置的目录中，在编译的时候会使用这些文件。

### 3.替换证书

```
//一行一行执行，然后会提示是否覆盖，输入 “y” 回车就可以了

# cp -rf rootCA.pem assets/client/tls/ngrokroot.crt
cp: overwrite ‘assets/client/tls/ngrokroot.crt’? y

# cp -rf device.crt assets/server/tls/snakeoil.crt
cp: overwrite ‘assets/server/tls/snakeoil.crt’? y

# cp -rf device.key assets/server/tls/snakeoil.key
cp: overwrite ‘assets/server/tls/snakeoil.key’? y
```

到这个地方，证书生成已经复制的准备工作已经完成了。

### 4.生成服务端

```
make release-server
```

### 

这样就会在bin目录下生成ngrokd 这个文件,就是我们ngrok的服务器程序

### 5.编译客户端ngrok

可以根据不同系统的命令如下：

```
32位linux客户端: GOOS=linux GOARCH=386 make release-client
64位linux客户端: GOOS=linux GOARCH=amd64 make release-client
32位windows客户端: GOOS=windows GOARCH=386 make release-client
64位windows客户端: GOOS=windows GOARCH=amd64 make release-client
32位mac平台客户端:GOOS=darwin GOARCH=386 make release-client
64位mac平台客户端:GOOS=darwin GOARCH=amd64 make release-client
ARM平台linux客户端: GOOS=linux GOARCH=arm make release-client
```

我这里是64位linux和64位windows客户端，mac系统编译

```
GOOS=linux GOARCH=amd64 make release-client
GOOS=windows GOARCH=amd64 make release-client
GOOS=darwin GOARCH=amd64 make release-client
```

依次执行这3个命令之后就会在bin目录里面生成所有的客户端文件，客户端平台是文件夹的名字，客户端放在对应的目录下，当前Linux平台客户端就直接在bin目录下一个ngrok的程序

### 6.配置启动服务器 

- httpAddr 是访问普通的http使用的端口号，用后面用 子域名.ngrok.xgss.net 来访问服务
- httpsAddr 是访问的https使用的端口号,同上，只不过是需要https的服务访问才用这个端口(一般用不上)
- tunnelAddr 是ngrok通道的端口号，这个端口是Ngrok用来通信的，所以这个端口在服务器上和客户端上设置必须要对应才可以正常的链接，默认端口是4443

完整命令:

```
bin/ngrokd -domain="$NGROK_DOMAIN" -httpAddr=":80" -httpsAddr=":443" -tunnelAddr=":4443"
```

我使用的

```
bin/ngrokd -domain="$NGROK_DOMAIN" -httpAddr=":80"
nohup /data/ngrok/bin/ngrokd -domain="ngrok.xgss.net" -httpAddr=":80" -httpsAddr=":443" -tunnelAddr=":4443" &
不输出 nohup.out
nohup /data/ngrok/bin/ngrokd -domain="ngrok.xgss.net" -httpAddr=":80" -httpsAddr=":443" -tunnelAddr=":4443" >/dev/null 2>&1 &
```



### 7.服务端配置自启动

```
chmod +x /etc/rc.d/rc.local
echo 'nohup /data/ngrok/bin/ngrokd -domain="ngrok.xgss.net" -httpAddr=":80" -httpsAddr=":443" -tunnelAddr=":4443" >/dev/null 2>&1 &' >> /etc/rc.d/rc.local


# 是否正常
# netstat -tunpl|grep ngrok
tcp6       0      0 :::80                   :::*                    LISTEN      21387/ngrokd        
tcp6       0      0 :::4443                 :::*                    LISTEN      21387/ngrokd        
tcp6       0      0 :::443                  :::*                    LISTEN      21387/ngrokd   

# curl http://ngrok.xgss.net
Tunnel ngrok.xgss.net not found
正常
```



监控ngork服务，如果服务异常关闭了则自动启动

```

vi /root/jiankong.sh
编写以下：
#!/bin/bash
process_pid=`ps -aux|grep -v 'grep'|grep -c 'ngrok'`
#echo "$process_pid"
#关键字的个数，可以使用 grep -c

if [ $process_pid -eq 0 ]
    then
    pkill ngrok
	nohup /data/ngrok/bin/ngrokd -domain=ngrok.7477.com -httpAddr=:80 -httpsAddr=:443 -tunnelAddr=:4443 >/dev/null 2>&1 &
    now=`date  +%Y-%m-%d[%H:%M:%S]`
    echo "at $now start ngrok" >> /data/restart_ngrok.log
fi


```

定时执行

```
# chmod +x /root/jiankong.sh
# echo '*/5 * * * * root /root/jiankong.sh' >> /etc/crontab
# systemctl restart crond
```

测试

```
# cat /data/restart_ngrok.log
# pkill ngrok
# /root/jiankong.sh
# # cat /data/restart_ngrok.log
at 2023-11-27[15:16:57] start ngrok
```

到此ngrok安装完成。

# 下载ngrok客户端文件

下载客户端

```
ls /data/ngrok/bin
darwin_386  darwin_amd64  go-bindata  linux_386  linux_arm  ngrok  ngrokd  windows_386  windows_amd64

其中 /data/ngrok/bin/ngrok 是linux的客户端
其中 windows_amd64 是windows的客户端
# cd /data/ngrok/bin
# tar -zcvf ngork-client.tar.gz ngrok darwin_amd64/ windows_amd64/
ngrok
darwin_amd64/
darwin_amd64/ngrok
windows_amd64/
windows_amd64/ngrok.exe
把 ngork-client.tar.gz 文件下载配置。
```



# Linux客户端配置

 下载ngrok服务器文件 /data/ngrok/bin/ngrok 到 在192.168.1.4 /root/ngrok目录上群晖NAS上操作：

# 群晖使用ngork映射ssh端口

需求： 群晖上配置 ngork的 22端口映射



```
root@star-nas:~# mkdir  /root/ngrok
root@star-nas:~# vi /root/ngrok/start_ngrok.sh

# cat start_ngrok.sh 
#!/bin/bash
pkill ngrok
#ngrok-web协议
/root/ngrok/ngrok -subdomain=nas -config="/root/ngrok/ngrok.cfg" 5000 >/dev/null 2>&1 &

root@star-nas:~/ngrok# cat /root/ngrok/ngrok.cfg
server_addr: "ngrok.xgss.net:4443"
trust_host_root_certs: false
root@star-nas:~/ngrok# chmod +x /root/ngrok/start_ngrok.sh

```



# 群晖使用ngork映射web端口

需求： 群晖上配置 ngork的 80端口映射到公网



 新建配置文件：

```
mkdir /data/ngrok
vi /data/ngrok/ngrok_8000.cfg
填写一下内容

server_addr: "ngrok.xgss.net:4443"
trust_host_root_certs: false

vi /data/ngrok/ngrok_8082.cfg
填写一下内容
server_addr: "ngrok.xgss.net:4443"
trust_host_root_certs: false
将在服务器中生成的ngrok文件上传目录中/data/ngrok/
chmod +x /data/ngrok/ngrok
nohup /data/ngrok/ngrok -log=/data/ngrok/ngrok_8000.log -subdomain=seafiles -config="/data/ngrok/ngrok_8000.cfg" 8000 &
nohup /data/ngrok/ngrok -log=/data/ngrok/ngrok_8082.log -subdomain=down -config="/data/ngrok/ngrok_8082.cfg" 8082 &
netstat -tunpl |grep ngrok
tcp        0      0 127.0.0.1:4040          0.0.0.0:*               LISTEN      20609/ngrok
```

日志： -log=/data/ngrok/ngrok_8000.log 是记录ngrok的日志，如果前期调试的时候加上这个参数，如果不能访问就可以查看到底是什么问题
 子域名： -subdomain=seafiles 是定义访问的时候的子域名，现在访问 [seafiles.ngrok.xgss.net](http://seafiles.ngrok.xgss.net) 就可以访问到这一台机器上8000端口的服务

```
ngrok
Tunnel Status online
Version 1.7/1.7
Forwarding https://test.ngrok.xgss.net -> 127.0.0.1:80
Forwarding http://test.ngrok.xgss.net -> 127.0.0.1:80
Web Interface 127.0.0.1:4040
Conn 0
Avg Conn Time 0.00ms
```



到这里不出意外的话就会启动成功了,访问test.ngrok.xgss.net的时候就是你本地的ip了.你可以通过apache或nginx配置test.ngrok.xgss.net域名指定你的目录开始使用。

# windows客户端配置

在D盘新建一个目录 ngrok，如图有四个文件功能分别是

add.bat是将start.bat添加到开机启动项，ngrok.cfg是端口的配置，ngrok.exe是服务端下载的文件，start.bat启动ngrok

![image-20220308171141389](https://imgoss.xgss.net/picgo/image-20220308171141389.png?aliyun)

### add.bat内容

```
reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run /v lin /t REG_SZ /d D:\ngrok\start.bat /f
```

### ngrok.cfg的内容

```
server_addr: "ngrok.xgss.net:4443"
trust_host_root_certs: false

tunnels:
    mstsc:
        remote_port: 3378
        proto:
         tcp: "127.0.0.1:3389"
```

start.bat的内容

```
D:
cd D:\ngrok
ngrok -config=ngrok.cfg start mstsc
```

双击start.bat

![image-20220308171620506](https://imgoss.xgss.net/picgo/image-20220308171620506.png?aliyun)

测试用手机4G网络远程连接本机

地址： ngrok.xgss.net:3378

可以远程连接即可。

