---
title: 安卓手机上安装Linux开源模拟器-Termux
createTime: 2025/05/27 17:51:17
permalink: /article/y2vt75s9/
---
# 安卓手机上安装Linux开源模拟器-Termux

## 什么是Termux

Termux是一款基于 Android 平台的开源 Linux 终端模拟器，使用 pkg(apt) 进行软件包的管理。最重要的是，它无需手机 root 权限，因此，绝大多数 Android 都可以运行。

Termux本质上是一个终端模拟器加上一套Linux的最小系统。这里的系统指的是用户态的系统，最终还是要运行在下面的Linux内核上的，而且受到Android系统本身的安全限制。比如在没有root的系统上无法访问特定路径或者没有写入权限。

![Termux](https://imgoss.xgss.net/picgo/Termux.gif?aliyun)

## Termux可以做什么

目前来说，它能做一些简单的 Linux 任务

```
享受 Bash 和 Zsh
运行 Nginx,MySQL，Redis 等服务器软件
使用 Vim 编辑文件
通过 SSH 访问服务器
使用 GCC 和 Clang 编译代码
使用 Git 检查项目
```



## 一、安装Termux

无需多言，首先你需要一个按说手机，再下载按说app。

开源地址： https://github.com/termux/termux-app

APP下载地址： https://github.com/termux/termux-app/releases

https://f-droid.org/en/packages/com.termux/

下载对应版本，由于笔者手机是arm 64位的，这边下载 ‘termux-app_v0.118.0 github-debug_arm64-v8a.apk’

![image-20220616175542234](https://imgoss.xgss.net/picgo/image-20220616175542234.png?aliyun)




## 二、环境准备

打开 Termux 以后，就是一个全屏的命令行界面。虽然可以用手机的触摸键盘输入命令，但还是推荐使用蓝牙键盘。

安装之后的命令行界面：

![image-20220616180543026](https://imgoss.xgss.net/picgo/image-20220616180543026.png?aliyun)

## 三、更新系统

更新一下系统，保证使用最新版本。

> ```bash
> # 连接远程仓库，获取软件包信息
> $ apt update
> 
> # 更新本地已经安装的软件包
> $ apt upgrade
> 
> # 安装 sl 软件包
> $ apt install sl
> 
> # 运行，上面命令安装测试包sl，然后运行。如果一切正常，会显示一个火车的命令行动画。
> 
> $ sl
> ```

## 四、访问本机存储

手机 App 默认只能访问自己的数据，如果要访问手机的存储，需要请求权限。

> ```bash
> $ termux-setup-storage
> ```

执行上面的命令以后，会跳出一个对话框，询问是否允许 Termux 访问手机存储，点击"允许"。

这会在当前目录下生成一个storage子目录，它是手机存储的符号链接，后文下载文件就是到这个目录去下载。

## 五、软件包管理

除了apt命令，Termux 还提供pkg命令进行软件包管理。

```
# 安装软件包

$ pkg install [package name]

# 卸载软件包

$ pkg uninstall [package name]

# 列出所有软件包

$ pkg list-all
```

其实，`pkg`的[底层](https://github.com/termux/termux-packages/issues/2151#issuecomment-486184252)就是`apt`，只是运行前会执行一次`apt update`，保证安装的是最新版本。所以，`apt install sl`基本等同于`pkg install sl`。

Termux 支持的软件包清单，可以到[这里](https://github.com/termux/termux-packages/tree/master/packages)查看。

## 六、Node.js

下面，安装 Node.js。

> ```bash
> $ apt install nodejs
> ```

安装完成后，就可以运行 JavaScript 脚本了。比如，新建一个脚本`hello.js`。

> ```javascript
> $ apt install -y vim-python
> 
> $ vim hello.js
> // hello.js
> console.log('hello world');
> ```

然后，执行这个脚本。

> ```bash
> $ node hello.js
> hello world
> ```

## 七、架设 Server

现在，通过 Node.js 运行 HTTP Server。

首先，安装 npm 模块[`http-server`](https://www.npmjs.com/package/http-server)。

> ```bash
> $ npm install -g http-server
> ```

然后，运行 Server。

> ```bash
> $ http-server
> ```

正常情况下，命令行会提示 Server 已经在 8080 端口运行了，并且还会提示外部可以访问的 IP 地址。

举例来说，手机的局域网 IP 是 192.168.2.6，那么我们通过桌面电脑的浏览器访问`http://192.168.2.6:8080`，就可以看到 Termux 的根目录了。进入下面的`storage`子目录，就可以下载手机文件了。

## 八、Python

不使用 Node.js，而使用其他方法架设 HTTP Server 也是可以的。下面演示 Python 的方法。

> ```bash
> $ apt install python
> $ python -m http.server 8080
> ```

然后，桌面电脑就可以访问手机了。

## 九、安装nginx

### 安装nginx

```
$ pkg install nginx 
```

### 启动nginx

默认是启动的如果关闭的话输入命令nginx启动

```
$ nginx
```

### nginx常用命令

```
nginx -s quit //优雅停止nginx，有连接时会等连接请求完成再杀死worker进程

nginx -s reload //优雅重启，并重新载入配置文件nginx.conf

nginx -s reopen //重新打开日志文件，一般用于切割日志

nginx -v //查看版本

nginx -t //检查nginx的配置文件

nginx -h //查看帮助信息

nginx -V //详细版本信息，包括编译参数

nginx -c filename //指定配置文件

pkg files nginx 查看nginx路径
```

浏览器输入127.0.0.1:8080看到以下界面即成功

### 查看ip

```
$ ifconfig
```



Termux 是非常强大的工具，除了上面的方法，还可以架设 [Apache 服务器](http://www.termuxtutorials.ga/2018/06/how-to-install-apache2-in-termux-termux.html)，或者通过其他途径（FTP、SSH、Rsync）访问手机，这里就不详细介绍了。

