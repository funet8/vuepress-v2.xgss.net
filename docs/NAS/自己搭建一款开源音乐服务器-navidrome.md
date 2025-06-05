# 自建一款开源音乐服务-Navidrome



Navidrome，一个开源的音乐服务器和播放器，提供了一个优雅且功能丰富的解决方案，让你的音乐库无论在何处都能触手可及。本文将带你一步步搭建自己的Navidrome音乐服务器，让你的音乐生活更加自由和个性化。

# Navidrome

官网： https://www.navidrome.org/

开源地址：https://github.com/navidrome/navidrome

![Navidrome_music](https://imgoss.xgss.net/picgo/Navidrome_music.jpg?aliyun)

## 主要功能

• 处理非常大的音乐收藏

• 几乎可播放任何音频格式

• 读取并使用你精心标记的各种元数据

• 多用户，每个用户都有自己的播放次数、播放列表、收藏夹等

• 资源占用率非常低

• 多平台，在 macOS、Linux 和 Windows 上运行。还提供 Docker 镜像

• 适用于所有主要平台的即用型二进制文件，包括 Raspberry Pi

• 自动监控你的库的变化，导入新文件和重新加载新的元数据

• 基于 Material UI 的主题、现代和响应式的 Web 界面

• 与所有 Subsonic/Madsonic/Airsonic 客户端兼容

• 在传输中进行转码，可按用户/播放器设置，支持 Opus 编码

• 支持中文界面

# 搭建Navidrome

1.准备环境
首先，你需要一台服务器来运行 Navidrome。这可以是一台物理服务器，也可以是一个虚拟机或者 Docker 容器。

2.需要安装docker和docker-compose

## 安装Navidrome



```
# 新建目录
mkdir -p /www/docker/navidrome
cd /www/docker/navidrome

# 编辑
vim /www/docker/navidrome/docker-compose.yml
根据实际需要修改参数：

version: "3"
services:
  navidrome:
    image: deluan/navidrome:latest
    user: 1000:1000 # should be owner of volumes
    ports:
      - "4533:4533"
    restart: unless-stopped
    environment:
      # Optional: put your config options customization here. Examples:
      ND_SCANSCHEDULE: 1h
      ND_LOGLEVEL: info  
      ND_SESSIONTIMEOUT: 24h
      ND_BASEURL: ""
    volumes:
      - "/www/docker/navidrome/data:/data"
      - "/www/docker/navidrome/music:/music:ro"
```



解释

```
ND_SCANSCHEDULE: 1h 表示每小时扫描一次音乐库。
ND_LOGLEVEL: info 设置日志记录级别为info。
ND_SESSIONTIMEOUT: 24h 设置会话超时时间为24小时。
ND_BASEURL: "" 设置基础URL为空。


 /www/docker/navidrome/data 是 Navidrome 存储其数据库和缓存的位置。
/www/docker/navidrome/music 是存储音乐文件的位置，如果想上传音乐请上传到此目录
```







## 访问Navidrome

如果一切正常，浏览器访问4533端口即可访问Navidrome，第一次访问需要设置admin账号和密码。

![image-20240830152048929](https://imgoss.xgss.net/picgo/image-20240830152048929.png?aliyun)

进入后台

## 更改语言



点击右侧头像 “Personal” 在Language中切换简体中文

![image-20240830152225645](https://imgoss.xgss.net/picgo/image-20240830152225645.png?aliyun)

## 上传音乐

在 /www/docker/navidrome/music 中上传你的音乐

```
www/docker/navidrome/music# ls
001.Jay-斗牛.flac        003.Jay-黑色幽默.flac  005.Jay-龙卷风.flac  007.Jay-完美主义.flac  009.Jay-伊斯坦堡.flac
002.Jay-反方向的钟.flac  004.Jay-可爱女人.flac  006.Jay-娘子.flac    008.Jay-星晴.flac      010.Jay-印第安老斑鸠.flac
```

![image-20240830153129661](https://imgoss.xgss.net/picgo/image-20240830153129661.png?aliyun)

![image-20240830153658801](https://imgoss.xgss.net/picgo/image-20240830153658801.png?aliyun)

# 手机客户端

除了使用浏览器访问外，Navidrome 还应该与所有 Subsonic 客户端兼容。以下客户端经过测试并确认可以正常工作

笔者使用iPhone手机下载

## 安卓

• Symfonium

• DSub

• Tempo

• substreamer

• Subtracks

• Ultrasonic

## IOS

• play:Sub 【收费】

• substreamer

• Amperfy

• iSub

![image-20240830160303243](https://imgoss.xgss.net/picgo/image-20240830160303243.png?aliyun)

![image-20240830160316483](https://imgoss.xgss.net/picgo/image-20240830160316483.png?aliyun)

# 结尾

通过自己动手搭建一款开源音乐服务器 - Navidrome，你不仅可以摆脱商业音乐流媒体服务的各种限制，还能享受到高度定制化的音乐体验。无论你是音乐发烧友，还是技术爱好者，Navidrome 都是一个值得一试的项目。希望这篇文章能够帮助你顺利搭建并使用 Navidrome，开启属于你自己的音乐之旅。