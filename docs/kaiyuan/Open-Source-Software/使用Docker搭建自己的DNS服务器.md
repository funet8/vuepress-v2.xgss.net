---
title: 使用Docker搭建自己的DNS服务器
createTime: 2025/05/27 17:51:17
permalink: /article/dyw34ryk/
---
# 使用Docker搭建自己的DNS服务器



在开发运维程中经常需要自定义一个域名来管理服务，通常的方法是修改hosts文件，但还有一种更便捷的方法，从源头上解决问题，也就是使用DNS来实现。

## **1.搭建**

搭建依然使用docker，安装前请安装好docker的运行时环境。

```javascript
# 创建一个持久化存放文件的目录
mkdir -p /data/docker/bind

# 使用容器创建应用
docker run --name bind -d --restart=always \
--publish 53:53/tcp --publish 53:53/udp --publish 10000:10000/tcp \
--volume /data/docker/bind:/data \
sameersbn/bind:9.16.1-20200524
```

![img](https://imgoss.xgss.net/picgo/d9946be6b57cf2cdf094c7a39b8a575d.png?aliyun)

默认占用53的tcp和udp的DNS访问端口，这个请不要更改，以及10000的管理面板端口。外网访问时，请在防火墙中放行此端口。

```javascript
firewall-cmd --add-port={53,10000}/tcp --permanent
firewall-cmd --add-port=53/udp --permanent
firewall-cmd --reload
```

## **2.访问**

使用你的https://ip:10000在浏览器中打开。

![img](https://imgoss.xgss.net/picgo/1d1bc11c8e4da26905b20bc05370f341.png?aliyun)

在高级内打开此网页，使用默认账户密码root/password登录。

![img](https://imgoss.xgss.net/picgo/983724727b9f8b4473adb0aff81048f2.png?aliyun)

调整语言为中文，部分菜单可能仍会显示为英文。

![img](https://imgoss.xgss.net/picgo/f38daaa0ae3bd17609c967cbeeef0278.png?aliyun)

## **3.配置**

尝试绑定一下dns，依次点击图标中的例子。

![img](https://imgoss.xgss.net/picgo/dda956d39390dcec506e21ac4a897b5b.png?aliyun)

任意填写一个名称，比如我以cn为域名后缀，填写邮箱，然后点击新建。

![img](https://imgoss.xgss.net/picgo/1d55c58196f46573c7146b759cce8672.png?aliyun)

选择地址。

![img](https://imgoss.xgss.net/picgo/4ffefbee877496d1e294c3af5c932420.png?aliyun)

填写域名和ip地址。

![img](https://imgoss.xgss.net/picgo/bca1af51b7c3264628a4ffb634639e1a.png?aliyun)

可以看到我们的aaa.cn域名，已经解析到192.168.31.92这个ip上了。

![img](https://imgoss.xgss.net/picgo/081b6d054a0267c29994ef25219ffb44.png?aliyun)



重启一下服务，执行以下命令，这样才能使用配置生效：

```javascript
docker restart bind
```

# **4.使用**

将电脑的dns地址指向服务器地址，比如我在Mac下修改DNS地址。Windows修改方式类似。

![img](https://imgoss.xgss.net/picgo/4df99b99c59acbbcd77a8e71539c64f4.png?aliyun)

如果是公网就填公网地址。做一下ping测试，发现已经正常解析了。

![img](https://imgoss.xgss.net/picgo/0c99cc9f93206027278053b9ba0d2289.png?aliyun)

到这个时候，其实还有一个问题，就是除了我们设置的域名之外的网站是无法访问的。如果想访问百度之类的公网网站，进行如下设置：

```javascript
vim /data/docker/bind/bind/etc/resolv.conf
```

加入以下DNS地址：

```javascript
nameserver 114.114.114.114
nameserver 8.8.8.8
```

修改另一个配置文件：

```javascript
vim /data/docker/bind/bind/etc/named.conf.options
```

添加一行，内容如下：

```javascript
allow-query { any; };
```

![img](https://imgoss.xgss.net/picgo/2b16bc99996c2e55483c527b5667389f.png?aliyun)

再次重启一下bind服务，发现已经可以正常地访问互联网了，同时也能正常访问自定义的域名。

最后放上github的地址：

```javascript
https://hub.docker.com/r/sameersbn/bind
```