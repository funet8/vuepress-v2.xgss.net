---
title: Docker系列教程2Docker的安装
createTime: 2025/05/27 17:51:17
permalink: /article/79vu2oh8/
---
# Docker系列教程2:Docker的安装



上次分享了Docker的一些入门知识点，这次讲在Linux、MacOs、Windows系统下如何安装docker。

## Linux 一键脚本安装

```
#CentOS 7、Debian、Ubuntu

curl -sSL https://get.docker.com/ | sh
systemctl start docker
systemctl enable docker.service
```



![dockerinstall](https://imgoss.xgss.net/picgo/dockerinstall.jpg?aliyun)

# CentOS7安装Docker

Docker 对CentOS的版本：
CentOS 7 （64-bit）
前提条件：
Docker 运行在CentOS 7 上，要求系统为64位、系统内核为3.10以上

```
# cat /etc/redhat-release     # 查看系统版本号
CentOS Linux release 7.3.1611 (Core)
 
# uname -r        # 查看内核
3.10.0-514.el7.x86_64
```



## yum安装docker

```
# yum -y install docker        # 安装Docker(CentOS7系统CentOS-Extras库中已带Docker)
# systemctl start docker        # 启动Docker
# systemctl enable docker    # 加入开机自启动
```



## Docker 更换配置国内镜像

docker设置国内镜像源： https://www.cnblogs.com/eddyz/p/17168828.html

使用 Docker 构建和部署应用程序时，几乎都需要下载一些基础镜像和依赖库。但由于国内网络比较特殊，想要从官方的 Docker Hub 仓库下载会极其缓慢，甚至会出现连接超时、无法下载等情况。为了解决网络问题，我们需要配置使用国内的镜像仓库，来加快镜像的下载速度。

```
vim /etc/docker/daemon.json

{
    "registry-mirrors": [
        "https://hub-mirror.c.163.com",
        "https://mirror.baidubce.com",
        "https://dockerproxy.com",
        "https://docker.nju.edu.cn"
    ]
}
```

修改之后重启 Docker 服务：

```
sudo systemctl daemon-reload
sudo systemctl restart docker
```





## yum安装高版本

```
# 安装
yum -y install yum-utils device-mapper-persistent-data lvm2
yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
yum -y install docker-ce docker-ce-cli containerd.io
# 配置
mkdir /etc/docker
vim /etc/docker/daemon.json
{
    "exec-opts": ["native.cgroupdriver=systemd"],
    "graph": "/data/docker"
}
# 启动
systemctl enable docker --now
docker info
```



## 修改docker默认的镜像存储位置

由于docker镜像文件很大，会占用系统磁盘，把

```
######修改docker默认存储位置
mkdir /home/data
ln -s /home/data /data
mkdir -p /data/docker/images
systemctl stop docker.service
cd /var/lib
cp -rf docker docker.bak
mv /var/lib/docker /data/docker/images

ln -s /data/docker/images/docker /var/lib/docker

######Docker 中国官方镜像加速
cat > /etc/docker/daemon.json << EOFI
{"registry-mirrors": ["https://registry.docker-cn.com"]}

```



## 安装docker-compose

非必须。

Docker-Compose 是用来管理容器的，类似用户容器管家，我们有N多台容器或者应用需要启动的时候，如果手动去操作，是非常耗费时间的，如果有了 Docker-Compose 只需要一个配置文件就可以帮我们搞定，但是 Docker-Compose 只能管理当前主机上的 Docker，不能去管理其他服务器上的服务。

```
方法一
# yum -y install docker-compose
查看安装的版本
docker-compose -v

方法二：
# curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

# CentOS8安装Docker

### 1.安装docker

```
# yum install -y docker

# docker -v
Emulate Docker CLI using podman. Create /etc/containers/nodocker to quiet msg.
podman version 3.3.1
[root@localhost yum.repos.d]# podman -v
podman version 3.3.1
```

### 2.启动docker

报错 docker和podman冲突。

```
启动报错，错误如下：
Failed to start docker.service: Unit docker.service not found.
错误分析：CentOS 8 中安装 docker 和 Podman 冲突

解决方式：
1.查看是否安装 Podman 
rpm -q podman

2.删除podman(输入yes，然后等待...)
dnf remove podman

3.重装docker
# yum install -y yum-utils  device-mapper-persistent-data  lvm2
# yum-config-manager  --add-repo   https://download.docker.com/linux/centos/docker-ce.repo
# yum install -y docker-ce docker-ce-cli containerd.io
# yum install -y  docker-ce docker-ce-cli
```

### 3.启动docker

```
systemctl start docker

查看版本
# docker -v
Docker version 20.10.21, build baeda1f

查看状态
systemctl status docker
```

### 4.配置

```
mkdir -p /etc/docker

将阿里云配置写入daemon.json
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://xirgurp7.mirror.aliyuncs.com"]
}
EOF

加载配置
systemctl daemon-reload

重启docker
systemctl restart docker
systemctl enable docker
```



# macOS安装Docker

## 系统要求

要求系统最低为 macOS 必须是 10.15 或更高版本， Catalina、Big Sur 或者 Monterey，建议升级到最新版本的 macOS。

## 使用 Homebrew 安装

 已经支持 Docker Desktop for Mac，因此可以很方便的使用 Homebrew Cask 来进行安装：

```
$ brew install --cask docker
```



## 手动下载安装

如果需要手动下载，请[点击下载](https://desktop.docker.com/mac/main/amd64/Docker.dmg) Docker Desktop for Mac。https://desktop.docker.com/mac/main/amd64/Docker.dmg

如果你的电脑搭载的是 M1 芯片（arm64 架构），请[点击下载](https://desktop.docker.com/mac/main/arm64/Docker.dmg) Docker Desktop for Mac https://desktop.docker.com/mac/main/arm64/Docker.dmg



如同 macOS 其它软件一样，安装也非常简单，双击下载的 .dmg 文件，然后将那只叫  的鲸鱼图标拖拽到 Application 文件夹即可。

![img](https://imgoss.xgss.net/picgo/install-mac-dmg.png?aliyun)

## 运行

从应用中找到 Docker 图标并点击运行。

![img](https://imgoss.xgss.net/picgo/install-mac-apps.png?aliyun)

运行之后，会在右上角菜单栏看到多了一个鲸鱼图标，这个图标表明了 Docker 的运行状态。

![img](https://imgoss.xgss.net/picgo/install-mac-menubar.png?aliyun)

每次点击鲸鱼图标会弹出操作菜单。
之后，你可以在终端通过命令检查安装后的 Docker 版本。

```
$ docker --version
$ docker info
```



如果都正常的话，可以尝试运行一个 ：

```
$ docker run -d -p 80:80 --name webserver nginx
```


服务运行后，可以访问 ，如果看到了 "Welcome to nginx!"，就说明 Docker Desktop for Mac 安装成功了。

要停止 Nginx 服务器并删除执行下面的命令：

```
$ docker stop webserver
$ docker rm webserver
```



# windows11中安装docker

## 一、检查电脑是否开启虚拟化功能

打开任务管理器，查看性能选项卡中的CPU信息，在右下角可以看到虚拟化是否开启。如未开启需要重启到BIOS中进行修改。



## 二、在启用或关闭windows功能中打开windows相关功能

在控制面板中搜索“启用或关闭”---> 点击“启用或关闭 windows功能”，在其中，我们需要选择“适用于linux的windows子系统”选项。

如图：

![image-20221201170901109](https://imgoss.xgss.net/picgo/image-20221201170901109.png?aliyun)

 重启后生效，然后进行下一步。



## 三、下载WSL软件，并安装

运行windows11的终端，输入wsl --list --online选择要安装的版本。

这里选择比较常用的ubuntu20.04进行安装，在终端中输入

wsl --install -d Ubuntu-20.04

等待安装结束。如果安装失败，可以手动下载离线包安装：https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi

安装完毕后，可以在终端输入wsl进行检查。



## 四、下载Docker

来到Docker官网：https://www.docker.com/get-started/ 选择对应的版本

![image-20221201171259903](https://imgoss.xgss.net/picgo/image-20221201171259903.png?aliyun)



软件安装完毕后出现绿色则安装成功：

![image-20221201171159865](https://imgoss.xgss.net/picgo/image-20221201171159865.png?aliyun)

至此各个系统的安装docker教程完成。
