---
title: 群晖NAS配置之自有服务器frp实现内网穿透
createTime: 2025/05/27 17:51:17
permalink: /article/2z491qtl/
---
# 群晖NAS配置之自有服务器frp实现内网穿透

# 什么是frp

frp 是一个专注于内网穿透的高性能的反向代理应用，支持 TCP、UDP、HTTP、HTTPS 等多种协议，且支持 P2P 通信。可以将内网服务以安全、便捷的方式通过具有公网 IP 节点的中转暴露到公网。今天跟大家分享一下frp实现内网穿透

![frps-datu](https://imgoss.xgss.net/picgo/frps-datu.png?aliyun)

# 为什么使用 frp ？

通过在具有公网 IP 的节点上部署 frp 服务端，可以轻松地将内网服务穿透到公网，同时提供诸多专业的功能特性，这包括：

1. 客户端服务端通信支持 TCP、QUIC、KCP 以及 Websocket 等多种协议
2. 采用 TCP 连接流式复用，在单个连接间承载更多请求，节省连接建立时间，降低请求延迟。
3. 代理组间的负载均衡。
4. 端口复用，多个服务通过同一个服务端端口暴露。
5. 支持 P2P 通信，流量不经过服务器中转，充分利用带宽资源。
6. 多个原生支持的客户端插件（静态文件查看，HTTPS/HTTP 协议转换，HTTP、SOCK5 代理等），便于独立使用 frp 客户端完成某些工作。
7. 高度扩展性的服务端插件系统，易于结合自身需求进行功能扩展。
8. 服务端和客户端 UI 页面。

开源地址： https://github.com/fatedier/frp

FRP文档： https://gofrp.org

# 安装frp

## 下载frp

1. 前往 [frp GitHub发布页面](https://github.com/fatedier/frp/releases)，找到最新版本。例如，假设最新版本是 `v0.52.3`。

2. 下载适用于CentOS 7架构的frp服务器二进制文件。例如，对于64位架构，你可以使用：

   

```
mkdir -p /data/
cd /data/
wget https://github.com/fatedier/frp/releases/download/v0.52.3/frp_0.52.3_linux_amd64.tar.gz
```

解压下载的文件：

```
tar zxvf frp_0.52.3_linux_amd64.tar.gz 
mv frp_0.52.3_linux_amd64 frp
# ll
total 29996
-rwxr-xr-x 1 1001 127 13905920 Oct 24 10:56 frpc
-rw-r--r-- 1 1001 127      142 Oct 24 10:57 frpc.toml
-rwxr-xr-x 1 1001 127 16789504 Oct 24 10:56 frps
-rw-r--r-- 1 1001 127       16 Oct 24 10:57 frps.toml
-rw-r--r-- 1 1001 127    11358 Oct 24 10:57 LICENSE
```



## 配置frp服务器

添加frp服务器的配置。以下是一个示例：

有关如何编写配置文件，请参考： https://gofrp.org/zh-cn/docs/examples/

```
vi frps.toml
bindPort = 7000
vhostHTTPPort = 80
# auth.token = "abcdef" #安全验证不能有数字
```



使用以下命令启动服务器：./frps -c ./frps.toml

```
./frps -c ./frps.toml
2023/11/28 13:34:03 [I] [root.go:102] frps uses config file: ./frps.toml
2023/11/28 13:34:03 [I] [service.go:200] frps tcp listen on 0.0.0.0:7000
2023/11/28 13:34:03 [I] [root.go:111] frps started successfully
```

## 防火墙配置

如果启用了防火墙，请打开必要的端口（默认是7000）：

HTTP 请求的监听端口为 80

```
sudo firewall-cmd --zone=public --add-port=7000/tcp --permanent
sudo firewall-cmd --reload
或者
iptables -A INPUT -p tcp --dport 7000 -j ACCEPT
service iptables save
systemctl restart iptables.service

iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -I INPUT -p tcp --match multiport --dports 6000:7000 -j ACCEPT #批量开放6000-7000的端口。
service iptables save
systemctl restart iptables

service iptables save
systemctl restart iptables
```



## 设置systemd服务（可选但建议）

创建一个frp的systemd服务文件：

```
vi /etc/systemd/system/frps.service
```

添加以下内容：

```
[Unit]
Description=frp服务器
After=network.target

[Service]
Type=simple
ExecStart=/data/frp/frps -c /data/frp/frps.toml
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

启用并启动frp服务：

```
systemctl enable frps
systemctl start frps
```

验证服务是否启动

```
systemctl restart frps
# netstat -tunpl|grep 7000
tcp6       0      0 :::7000                 :::*                    LISTEN      19949/frps   
```



## 群晖nas客户端配置frp

### 下载frp客户端

用ssh连接登录群晖，

下载适用于群晖架构的frp客户端

前往 frp GitHub发布页面，找到适用于群晖的版本。确保下载与群晖架构相匹配的frp客户端。

下载frp客户端。

```
cd /root
wget https://github.com/fatedier/frp/releases/download/v0.52.3/frp_0.52.3_linux_amd64.tar.gz
tar -zxvf frp_0.52.3_linux_amd64.tar.gz 
mv frp_0.52.3_linux_amd64 frp
cd /root/frp
ls
frpc  frpc.toml  frps  frps.toml  LICENSE
```



### 配置frp客户端

```
vi frpc.toml
```



```
[common]
serverAddr = "127.0.0.1"
serverPort = 7000

[[proxies]]
name = "stars-nas-ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = 6000
```



将 serverAddr 替换为frp服务器的IP地址

确保 token 与frp服务器上配置的token匹配。

根据需要配置其他端口转发规则，上述示例是将本地的SSH服务（本地端口22）映射到远程端口6000。

### 运行frp客户端

```
# /root/frp/frpc -c /root/frp/frpc.toml
2023/11/28 13:58:38 [I] [root.go:139] start frpc service for config file [/root/frp/frpc.toml]
2023/11/28 13:58:38 [I] [service.go:299] [c22cfeca075e01e1] login to server success, get run id [c22cfeca075e01e1]

如果需要后台运行，可以使用类似 nohup ./frpc -c frpc.ini & 这样的命令。

nohup /root/frp/frpc -c /root/frp/frpc.toml >/dev/null 2>&1 &
```



测试：

```
ssh -o Port=6000 user@{frp服务器ip}
Synology strongly advises you not to run commands as the root user, who has
the highest privileges on the system. Doing so may cause major damages
to the system. Please note that if you choose to proceed, all consequences are
at your own risk.
user@star-nas:~$ 
```

至此可以远程登录ssh

## 域名解析

![image-20231128155546735](https://imgoss.xgss.net/picgo/image-20231128155546735.png?aliyun)

## 开放web和ssh

```
vi /root/frp/frpc.toml
serverAddr = "xx.xx.xx.xx"
serverPort = 7000

[[proxies]]
name = "stars-nas-ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 60920
remotePort = 6000

[[proxies]]
name = "web"
type = "http"
localPort = 80
customDomains = ["nasweb.frp.xgss.net"]

[[proxies]]
name = "web2"
type = "http"
localPort = 5000
customDomains = ["nas.frp.xgss.net"]
```



## 检查

![image-20231128161122393](https://imgoss.xgss.net/picgo/image-20231128161122393.png?aliyun)

![image-20231128161137610](https://imgoss.xgss.net/picgo/image-20231128161137610.png?aliyun)

内网穿透成功。

如果你 vhostHTTPPort = 8080 则这里访问的域名需要加端口：

```
nasweb.frp.xgss.net:8080
nas.frp.xgss.net:80
```



## windows客户端

### 下载Windows客户端

前往 [frp GitHub发布页面](https://github.com/fatedier/frp/releases)，找到最新版本

```
https://github.com/fatedier/frp/releases/download/v0.52.3/frp_0.52.3_windows_amd64.zip
或者
http://js.funet8.com/centos_software/frp/frp_0.52.3_windows_amd64.zip
```

下载解压到桌面位置

![image-20231128162736001](https://imgoss.xgss.net/picgo/image-20231128162736001.png?aliyun)

### 编辑frpc.toml配置文件

```
serverAddr = "x.x.x.x"
serverPort = 7000

[[proxies]]
name = "test-tcp"
type = "tcp"
localIP = "127.0.0.1"
localPort = 3389
remotePort = 6002
```



### 编写start.bat，并运行

用记事本编辑，再用管理员身份运行。

```
@echo off
cd /d C:\Users\Administrator\Desktop\frp
frpc.exe -c frpc.toml
```

![image-20231128162931360](https://imgoss.xgss.net/picgo/image-20231128162931360.png?aliyun)

![image-20231128163008961](https://imgoss.xgss.net/picgo/image-20231128163008961.png?aliyun)

测试远程登录。

![image-20231128162620137](https://imgoss.xgss.net/picgo/image-20231128162620137.png?aliyun)



# 设置开机启动

## 开机启动方法1

此设置需要用户登录才可以运行脚本

```
在 Windows 10 中可以通过以下步骤来设置 bat 文件开机自动运行：

1、打开“运行”对话框，按 Win + R 键。

2、输入 shell:startup

3、在“启动”文件夹中创建一个快捷方式，指向要运行的 bat 文件。

4、重启电脑，bat 文件就会在系统启动时自动运行。

```

bat批处理脚本解决Windows10开机后桌面频繁启动:https://blog.csdn.net/FisrtBqy/article/details/130077994

## 开机启动方法2

设置开机启动

右击此电脑→管理→任务计划程序→右侧的“创建任务”

![image-20240702111819150](https://imgoss.xgss.net/picgo/image-20240702111819150.png?aliyun)

### 常规

![image-20240702111906733](https://imgoss.xgss.net/picgo/image-20240702111906733.png?aliyun)

### 触发器

开始任务选择启动时。

![image-20240702111958454](https://imgoss.xgss.net/picgo/image-20240702111958454.png?aliyun)

### 操作

选择启动frp的脚本。

![image-20240702112045284](https://imgoss.xgss.net/picgo/image-20240702112045284.png?aliyun)

重启测试是否能开机启动。

# 配置校验

通过执行 frpc verify -c ./frpc.toml 或 frps verify -c ./frps.toml 可以对配置文件中的参数进行预先校验。

```
./frps verify -c ./frps.toml 
frpc: the configuration file ./frpc.toml syntax is ok

```

如果出现此结果，则说明新的配置文件没有错误，否则会输出具体的错误信息。

# 配置拆分

通过 `includes` 参数可以在主配置中包含其他配置文件，从而实现将代理配置拆分到多个文件中管理。

```toml
# frpc.toml
serverAddr = "x.x.x.x"
serverPort = 7000
includes = ["./confd/*.toml"]
# ./confd/test.toml
[[proxies]]
name = "ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = 6000
```

上述配置在 frpc.toml 中通过 includes 额外包含了 `./confd` 目录下所有的 toml 文件的代理配置内容，效果等价于将这两个文件合并成一个文件。

需要注意的是 includes 指定的文件中只能包含代理配置，通用参数的配置只能放在主配置文件中。

# 安全认证Token

Token 身份认证是一种简单的身份认证方式，只需要在 frp 的客户端 frpc 和服务端 frps 配置文件中配置相同的 token 即可。

## 配置示例

```toml
# frps.toml
bindPort = 7000
auth.token = "abc"

# frpc.toml
auth.token = "abc"
```



# 配置HTTPS

文档： https://gofrp.org/zh-cn/docs/examples/https2http/

使用 https2http 插件将本地 HTTP 服务转换为 HTTPS 服务，以供外部访问。

## 配置 frps.toml

```
bindPort = 7000
vhostHTTPSPort = 443
```

## 配置 frpc.toml

```
serverAddr = "x.x.x.x"
serverPort = 7000

[[proxies]]
name = "test_htts2http"
type = "https"
customDomains = ["test.yourdomain.com"]

[proxies.plugin]
type = "https2http"
localAddr = "127.0.0.1:80"

# HTTPS 证书相关的配置
crtPath = "./server.crt"
keyPath = "./server.key"
hostHeaderRewrite = "127.0.0.1"
requestHeaders.set.x-from-where = "frp"

```

## 获取HTTPS证书



## 访问 HTTPS 服务

打开您的 Web 浏览器，访问域名



# 总结

ngrok和frp的各有优缺点

## ngrok 的优点

简单易用：ngrok拥有非常简洁的用户界面和易于使用的命令行工具，使得内网穿透变得非常容易。

快速搭建：你不需要拥有自己的服务器，只需下载ngrok客户端即可开始使用。

跨平台支持：ngrok支持多种操作系统，包括Windows、Linux和macOS等。

具备安全特性：ngrok提供了基本的身份验证和TLS加密传输等安全特性。



## ngrok 的缺点

限制版和付费版：ngrok提供了免费版，但其功能有限，如并发连接数和隧道数量的限制。付费版则提供更多高级功能。

不开源：ngrok的源代码并未公开，因此在安全性方面用户难以进行审查。



## frp优点：

开源免费：frp是开源软件，可以免费使用，且有活跃的社区支持。
配置灵活：frp提供了灵活的配置选项，允许用户进行端口映射、TCP/UDP转发等。
自托管：你可以轻松地在自己的服务器上自行搭建和管理frp服务。
支持多种代理类型：包括TCP、HTTP和UDP等多种类型的代理。

## frp缺点：

配置相对复杂：对于新手来说，frp的配置可能相对复杂，需要一定的学习和理解。
需要自行搭建服务器：使用frp需要自己拥有服务器，并进行相应的部署和维护。