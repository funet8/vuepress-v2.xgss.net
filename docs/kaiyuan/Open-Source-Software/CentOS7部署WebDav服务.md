# CentOS7部署开源WebDav服务，实现全端文件共享

服务器操作系统：Centos7.8

Linux下可以用Nginx或Apache来部署WebDav服务，也可以用单独的组件。

这里用的是一个Go语言写的WebDAV Server，Github 项目地址：https://github.com/hacdias/webdav

部署流程如下。

## 1. 下载配置WebDav

在 /data/webdav-app下新建`webdav`目录。

下载并解压到指定目录，当前最新版本为 4.2.0

https://github.com/hacdias/webdav/releases

```bash
mkdir /data/webdav-app
cd /data/webdav-app
下载： wget https://github.com/hacdias/webdav/releases/download/{最新的版本号}/linux-amd64-webdav.tar.gz
wget https://github.com/hacdias/webdav/releases/download/v4.2.0/linux-amd64-webdav.tar.gz
tar -xvzf linux-amd64-webdav.tar.gz
```

在`/data/webdav-app/`目录下新建一个配置文件`config.yaml`，内容如下

```yaml
vim /data/webdav-app/config.yaml
填写以下：
# Server related settings
address: 0.0.0.0
port: 15108
auth: true
tls: false
cert: cert.pem
key: key.pem

# Default user settings (will be merged)
scope: .
modify: true
rules: []

users:
  - username: user1
    password: password1
    scope: /data
```

对外服务的端口号为`15108`，需要在安全组或防火墙里放开。

![image-20221013141821514](https://imgoss.xgss.net/picgo/image-20221013141821514.png?aliyun)

目录`/data`用于存储`user1`的文件，需要手动创建。

如果有多个用户，则遵循`yaml`的文件规范，按`user1`的格式添加到下面即可。

## 2. 添加服务

在`/usr/lib/systemd/system/`下新建文件`webdav.service`，内容如下

```bash
vim /usr/lib/systemd/system/webdav.service

[Unit]
Description=WebDAV server
After=network.target

[Service]
Type=simple
User=root
ExecStart=/data/webdav-app/webdav --config /data/webdav-app/config.yaml
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

## 3. 启动WebDav服务

```bash
systemctl daemon-reload
systemctl enable webdav
systemctl start webdav
```

查看服务状态

```bash
systemctl status webdav
```

输出类似如下

```bash
● webdav.service - WebDAV server
   Loaded: loaded (/usr/lib/systemd/system/webdav.service; enabled; vendor preset: disabled)
   Active: active (running) since Thu 2021-08-31 17:34:08 CST; 20h ago
 Main PID: 10032 (webdav)
   CGroup: /system.slice/webdav.service
           └─10032 /usr/local/webdav/webdav --config /usr/local/webdav/config.yaml
```



## 开放防火墙端口

```
# iptables
iptables -A INPUT -p tcp --dport 15108 -j ACCEPT
service iptables save
systemctl restart iptables

# firewall-cmd
firewall-cmd --zone=public --add-port=15108/tcp --permanent
firewall-cmd --reload
```



## 使用客户端连接

这里我使用raiDrive客户端连接

![image-20221013093434409](https://imgoss.xgss.net/picgo/image-20221013093434409.png?aliyun)

连接成功，至此可以使用客户端上传文件到webdav目录了。

## 使用nginx反向代理

还有一个问题能不能使用nginx的443的代理，是不是更加安全呢

```
server {
        listen 80;
        server_name  s.test1.net;
        access_log /data/wwwroot/log/s.test1.net-access.log main_aliyun;
        error_log /dev/null;
        client_max_body_size    0;
		location / {
                proxy_pass      http://127.0.0.1:15108;
                proxy_redirect off;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }	
}
```



查看日志

```
# tail -n 5 /data/wwwroot/log/s.test1.net-access.log
192.168.1.164 - user1 [13/Oct/2022:10:20:15 +0800] "PROPFIND /wwwroot/ HTTP/1.1" 207 2383 "-" "RaiDrive/2022.6.56.0" "0.002"
192.168.1.164 - user1 [13/Oct/2022:10:20:15 +0800] "PROPFIND /code-server/ HTTP/1.1" 207 1690 "-" "RaiDrive/2022.6.56.0" "0.005"
192.168.1.164 - user1 [13/Oct/2022:10:20:34 +0800] "PROPFIND / HTTP/1.1" 207 3822 "-" "RaiDrive/2022.6.56.0" "0.004"
192.168.1.164 - user1 [13/Oct/2022:10:20:34 +0800] "PROPFIND /wwwroot/ HTTP/1.1" 207 2383 "-" "RaiDrive/2022.6.56.0" "0.002"
192.168.1.164 - user1 [13/Oct/2022:10:20:34 +0800] "PROPFIND /code-server/ HTTP/1.1" 207 1690 "-" "RaiDrive/2022.6.56.0" "0.002"
```



苹果IOS系统和ios的客户端连接webdav就可以实现文件同步了。

