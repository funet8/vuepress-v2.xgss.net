# 给你的NAS无限可能，安装小晓雅全家桶影音库



家庭存储和娱乐的需求日益增长。无论是高清电影、电视剧，还是音乐和照片，我们都希望有一个稳定且高效的系统来管理和享受这些资源。而网络附加存储（NAS）作为家庭数据中心的核心，其功能的强大与否直接决定了我们的体验。

如果你正在寻找一种方法来提升你的NAS功能，那么小晓雅全家桶影音库无疑是一个绝佳的选择。通过这个强大的工具，能享受到前所未有的娱乐体验。本文将详细介绍如何安装和配置小晓雅全家桶影音库，让你的NAS焕发出新的光彩。

![image-20240828191249211](https://imgoss.xgss.net/picgo/image-20240828191249211.png?aliyun)

# 开源地址

使用 Docker Compose 一键部署服务，兼容群晖，Linux，Windows，Mac，包含所有X86和Arm架构

开源地址：https://github.com/monlor/docker-xiaoya

## 基础功能

- 所有脚本集成到 Docker 镜像，避免污染系统环境
- 合并jellyfin和emby的x86和arm镜像，部署时无需区分镜像名
- 自动清理阿里云盘，默认每10分钟一次
- 自动更新小雅alist中的云盘数据，默认每天一次
- 自动更新emby服务配置，默认每周一次
- 自动更新emby媒体数据，默认每天一次
- 支持小雅夸克网盘资源，挂载自定义夸克网盘资源
- 支持小雅PikPak网盘资源，挂载自定义PikPak资源
- 支持小雅阿里云盘资源，挂载自定义阿里云盘资源
- 支持WebDav，TvBox服务
- [Beta]适配Armv7设备，包括alist, emby和jellyfin

# 安装小晓雅全家桶

## 测试环境

```
系统： ubuntu 22.04
IP： 192.168.1.23
硬盘： 500G空闲

如果安装Alist + Emby + Jellyfin	至少有300G硬盘
```

## 部署硬件配置

![image-20240828173321315](https://imgoss.xgss.net/picgo/image-20240828173321315.png?aliyun)

## 安装脚本

```
新建目录把文件放到次目录
# mkdir -p /data/docker/xiaoya

# export GH_PROXY=https://gh.monlor.com/ IMAGE_PROXY=ghcr.monlor.com && bash -c "$(curl -fsSL ${GH_PROXY}https://raw.githubusercontent.com/monlor/docker-xiaoya/main/install.sh)"

```

### 数据保存位置

```
1. Docker卷（数据保存在:  /data/docker-file/volumes）
2. 服务部署目录（数据保存在: /data/docker/xiaoya）
请选择数据保存位置（默认为1）: 2
```





### 阿里云盘token获取方式教程

https://alist.nn.ci/zh/guide/drivers/aliyundrive.html

点击“获取 Token”，然后用阿里云盘APP扫码获取。

![image-20240828174043598](https://imgoss.xgss.net/picgo/image-20240828174043598.png?aliyun)

![image-20240828174021297](https://imgoss.xgss.net/picgo/image-20240828174021297.png?aliyun)

```
阿里云盘token

请输入阿里云盘TOKEN(默认为): XXXXXXXX
```



### 阿里云盘Open token获取方式教程

https://alist.nn.ci/zh/guide/drivers/aliyundrive_open.html

```
请输入阿里云盘Open TOKEN(默认为):  XXXX 粘贴你的Open token
```



### 阿里云盘缓存目录ID

进入阿里云盘网页版，资源盘里面创建一个文件夹，点击文件夹，复制浏览器阿里云盘地址末尾的文件夹ID（最后一个斜杠/后面的一串字符串）


```
请输入阿里云盘缓存目录ID(默认为): XXXXXXX

https://www.aliyundrive.com/drive/file/all/XXXXXXX
```

## 夸克网盘Cookie

登陆夸克网盘，浏览器F12，点击network，随便点一个请求，找到里面的Cookie值 https://pan.quark.cn/

```
请输入夸克网盘Cookie值(默认为):  XXXXX
```

## 115网盘

登陆115网盘，浏览器F12，点击network，随便点一个请求，找到里面的Cookie值

```
请输入115网盘Cookie值(默认为):  XXX
```

# 部署类型

```
部署类型：
1. alist + emby (默认)
2. alist
3. alist + jellyfin
4. alist + emby + jellyfin
请选择部署服务类型: 4
建议选择2
本机测试安装emby报错 '当前没有兼容的流。请稍后再试或联系您的管理员以获取详细信息'
本机测试安装jellyfin报错 'nginx-502 Bad Gateway'
```



服务开始部署，如果部署emby/jellyfin，下载并解压60G元数据需要一段时间，请耐心等待...
脚本执行完成不代表服务启动完成，请执行下面的命令查看日志来检查部署情况.

具体安装了可能超过10个小时。

## 服务管理

```
查看日志：/data/docker/xiaoya/manage.sh logs
启动服务：/data/docker/xiaoya/manage.sh start
停止服务：/data/docker/xiaoya/manage.sh stop
重启服务：/data/docker/xiaoya/manage.sh restart
加载配置：/data/docker/xiaoya/manage.sh reload

高级用户自定义配置：/data/docker/xiaoya/env
修改env或者compose配置后，需要执行上面的加载配置reload命令生效！
```



> 服务正在部署，请查看日志等待部署成功后，尝试访问下面的地址
> alist: http://192.168.1.23:5678, http://XX.XX.XX.116:5678 【公网IP，由于测试机没有公网ip】
> webdav: http://192.168.1.23:5678/dav, http://XX.XX.XX.116:5678/dav, 默认用户密码: guest/guest_Api789
> tvbox: http://192.168.1.23:5678/tvbox/my_ext.json, http://XX.XX.XX.116:5678/tvbox/my_ext.json
> emby: http://192.168.1.23:2345, http://XX.XX.XX.116:2345, 默认用户密码: xiaoya/1234
> jellyfin: http://192.168.1.23:2346, http://XX.XX.XX.116:2346, 默认用户密码：ailg/5678



## 访问alist IP+5678

http://192.168.1.23:5678

![image-20240828175010381](https://imgoss.xgss.net/picgo/image-20240828175010381.png?aliyun)

随便访问一个电影，会在你的阿里云盘的目录（阿里云盘缓存目录ID）中生成一个文件，电影看完10分钟会自动删除。

![image-20240828175942994](https://imgoss.xgss.net/picgo/image-20240828175942994.png?aliyun)

## 访问emby IP+2345

http://192.168.1.23:2345

报错： 当前没有兼容的流。请稍后再试或联系您的管理员以获取详细信息。

![image-20240828175316435](https://imgoss.xgss.net/picgo/image-20240828175316435.png?aliyun)

## 访问jellyfin IP+2346 不可用

报错： 502 Bad Gateway

# 卸载小雅全家桶

卸载脚本

```
# export GH_PROXY=https://gh.monlor.com/ IMAGE_PROXY=ghcr.monlor.com && bash -c "$(curl -fsSL ${GH_PROXY}https://raw.githubusercontent.com/monlor/docker-xiaoya/main/uninstall.sh)"
```

![image-20240828180402081](https://imgoss.xgss.net/picgo/image-20240828180402081.png?aliyun)

卸载完成。

# 结尾

经过简单的几步操作，你的NAS就完成了小晓雅全家桶影音库的安装和配置。此刻，你已经拥有了一套强大而灵活的家庭娱乐系统，无论是观看最新的4K电影，还是重温经典的音乐专辑，都能轻松实现。