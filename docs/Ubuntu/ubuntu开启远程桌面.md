# ubuntu开启远程桌面VNC


ubuntu开启远程桌面

在Ubuntu上启用远程桌面通常涉及安装和配置VNC服务器或者使用内置的远程桌面协议（VNC、XRDP或者SSH）。以下是使用VNC服务器的一个基本示例：

## 安装VNC服务器软件

```
sudo apt update
sudo apt install tightvncserver
```

## 设置VNC密码

```
vncpasswd
```

## 设置权限

编辑VNC服务器配置文件以启用访问权限

```
sudo nano /etc/tightvncserver/vncserver.conf
```

确保取消注释或添加以下行以允许远程连接：

```
# 允许远程连接localhost = your-server-ip
```

## 启动VNC服务器

你可以指定一个分辨率和颜色深度

```
vncserver :1 -geometry 1280x720 -depth 24
```

## 配置防火墙

允许VNC连接（默认端口为5900）：

```
sudo ufw allow 5900/tcp
sudo ufw enable
sudo ufw status
```



从远程客户端连接到VNC服务器，使用VNC查看器或其他支持VNC协议的软件，输入服务器IP和端口（默认为`:1`）。

注意：如果你想使用Ubuntu自带的远程桌面（基于XRDP），步骤会有所不同，包括安装`xrdp`、配置防火墙等。

以上步骤可能会根据你的具体需求和Ubuntu版本稍有变化。