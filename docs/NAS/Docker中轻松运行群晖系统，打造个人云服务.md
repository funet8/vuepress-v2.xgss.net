# Docker中轻松运行群晖系统，打造个人云服务



群晖（Synology）系统以其便捷的操作和强大的功能，成为了很多家庭和企业用户的首选。而 Docker 作为一个强大的容器化平台，能够将应用与操作系统隔离，使得部署、管理和维护变得更加轻松。那么，如何在 Docker 中一键部署群辉系统呢？本文将详细介绍这一过程，让你在一分钟内轻松启动群辉系统，体验个人云服务的强大功能。

![image-20241228230715868](https://imgoss.xgss.net/picgo/image-20241228230715868.png?aliyun)

# 准备工作

在开始部署之前，确保你已经完成以下准备工作：

Docker 环境：在你的服务器或本地机器上安装并启动 Docker。你可以通过 Docker 官方文档或者一些教程进行安装。

群辉镜像：目前，群辉系统没有官方的 Docker 镜像，但我们可以通过第三方镜像来实现部署。

端口与存储规划：为了确保群辉系统能够正常运行，你需要预先规划好需要映射的端口和存储卷。

# virtual-dsm

virtual-dsm 是一个开源项目，功能是在 Docker 中运行 DiskStation Manager。我测试了一下， virtual-dsm 可以在微软 WLS2（Linux子系统）中完美运行。如果你的 Windows 开启了 WSL2 可以按照我的操作进行部署（操作很简单），也可以部署到其它支持 Docker 和 KVM 的设备上。

我的测试环境是基于 WSL2 安装的 Ubuntu 22.04 。由于 virtual-dsm 要求设备必须支持 KVM ，所以登陆到 Ubuntu 后可以通过如下命令进行检测：

硬盘最好超过50G

```
sudo apt install cpu-checker
sudo kvm-ok
```



# docker 部署

virtual-dsm 可以通过 docker run 或者 docker-compose 进行部署：

```
docker run -it --rm -p 5000:5000 --device=/dev/kvm --cap-add NET_ADMIN --stop-timeout 60 kroese/virtual-dsm:latest
```



# docker-compose 部署

我个人推荐用 docker-compose 部署会更加直观（系统需安装好 docker 和 docker-compose）：

```
version: "3"
services:
    dsm:
        container_name: dsm
        image: kroese/virtual-dsm:latest
        environment:
            DISK_SIZE: "16G"
        devices:
            - /dev/kvm
            - /dev/vhost-net
        cap_add:
            - NET_ADMIN                       
        ports:
            - 5000:5000
        volumes:
            - /opt/dsm:/storage
        restart: on-failure
        stop_grace_period: 1m
```

解释

其中 environment: 中的 DISK_SIZE: "16G" 选项可以调整硬盘大小，还可以通过 CPU_CORES: "2" 调整CPU核心数量，RAM_SIZE: "2048M" 设置内存大小。

其中 volumes: 中的 - /home/user/data:/storage 可设置挂载的本地磁盘路径，可以根据实际情况进行修改。如果只是体验一下系统，其实不用太在意这些参数。

*注意由于现在 dockerhub 主站国内被封了，所以要拉取镜像必须设置好镜像站，不然会拉取镜像失败。

# 浏览器访问

运行容器之后访问 http://IP:5000 ，然后根据指引进行 DSM 初始化设置，即可访问 DSM 的 web 控制台：

![image-20241228230411007](https://imgoss.xgss.net/picgo/image-20241228230411007.png?aliyun)



部署成功后，打开浏览器，访问 http://<宿主机IP>:5000（HTTP）或 https://<宿主机IP>:5001（HTTPS）即可进入群辉管理界面。根据提示进行首次设置，包括创建管理员账号、选择语言等。

![image-20241228230505063](https://imgoss.xgss.net/picgo/image-20241228230505063.png?aliyun)

# 优化与注意事项

## 存储空间管理

在 Docker 中运行群辉时，你需要确保宿主机有足够的存储空间来保存数据。通过 Docker 挂载卷的方式，你可以将宿主机的硬盘直接映射到群辉容器中，方便管理和扩展存储。

## 性能调优

虽然群辉系统可以通过 Docker 快速部署，但它毕竟是一个完整的操作系统，可能对宿主机的资源有一定要求。为了提高性能，可以考虑增加宿主机的内存和硬盘容量，确保群辉容器能够稳定运行。

## 网络配置

在部署群辉系统时，确保网络配置正确。如果你计划在局域网之外访问群辉系统，记得设置端口转发或使用反向代理来实现外网访问。

## 数据安全

在使用群辉系统时，一定要注意数据备份与安全。群辉自带的一些工具，如 Hyper Backup，可以帮助你定期备份数据，防止数据丢失。



# 群晖的套件中心

功能比较强大，而且可以按需安装。不少套件功能成熟运行稳定，市场认可度较高。


![image-20241228230442408](https://imgoss.xgss.net/picgo/image-20241228230442408.png?aliyun)

通过 Docker 部署群辉系统，不仅能够体验到群辉的强大功能，还能节省购买专用硬件的成本。整个部署过程简单快捷，只需要几分钟即可完成。对于个人用户和开发者来说，Docker 提供了一个灵活且高效的方式来运行群辉系统，打造自己的私有云。只需简单配置，便能享受群辉带来的强大文件管理、备份和数据存储功能。

