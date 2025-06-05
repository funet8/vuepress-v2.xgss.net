# 把浏览器中写代码，春节假期也要'愉快'的coding



马上就要春节，春节是一个放松、团聚的时刻，然而对于不少开发者（牛马）来说，假期也许意味着可以更自由地玩耍，如果有比较重要的任务的话，家里没有开发环境此时我们应该如何解决呢。

# code-server

**code-server** 是一个将 Visual Studio Code（VS Code）IDE 托管在远程服务器上的工具。通过浏览器，你可以像本地运行 VS Code 一样使用它，并且还能跨设备随时访问。这个开源项目的本质是通过远程服务器运行 VS Code 编辑器，然后将其界面通过 Web 端呈现给用户，使得用户无论在任何设备上，只要有浏览器，就可以进行开发。



开源仓库:   https://github.com/coder/code-server

Docker Hub： https://hub.docker.com/r/linuxserver/code-server



![image-20250123172735512](https://imgoss.xgss.net/picgo/image-20250123172735512.png?aliyun)

## 准备工作

- 云服务器、NAS、虚拟机等  【 阿里云优惠： [https://y.xgss.net/aliyun](https://y.xgss.net/aliyun) 或 腾讯云优惠： [https://y.xgss.net/tx](https://y.xgss.net/tx) 】
- 本篇文章在Centos7.9系统下演示，当然其他支持Docker系统亦可
- 安装docker和docker-compose 【本篇文章不细讲，可以看星哥之前的教程或者官方文档】

# docker安装code-server



```
docker run -d \
--name=code-server \
-e PUID=1000 \
-e PGID=1000 \
-e TZ=Asia/Shanghai \
-e PASSWORD=88888888 \
-e PROXY_DOMAIN=code-server.my.domain \
-e DEFAULT_WORKSPACE=/config/workspace \
-p 8443:8443 \
-v /data/docker/code-server/config:/config \
--restart unless-stopped \
lscr.io/linuxserver/code-server:latest
```



## 解释

-p 8443:8443 web gui 
-e PUID=1000 for UserID 
-e PGID=1000 for GroupID 

请参阅下面的说明 
-e TZ=Etc/UTC 指定要使用的时区，
-e PASSWORD=password 可选的 web gui 密码，如果未提供 PASSWORD 或 HASHED_PASSWORD，则不会进行身份验证。 
-e HASHED_PASSWORD= 可选的 web gui 密码，覆盖 PASSWORD，有关如何创建它的说明如下。 
-e SUDO_PASSWORD=密码 如果设置了此可选变量，用户将可以使用指定的密码在代码服务器终端中进行 sudo 访问。 
-e SUDO_PASSWORD_HASH= 可以选择通过哈希设置 sudo 密码（优先于 SUDO_PASSWORD var）。格式为$type$salt$hashed。 
-e PROXY_DOMAIN=code-server.my.domain 如果设置此可选变量，则将代理此域以进行子域代理。请参阅文档 
-e DEFAULT_WORKSPACE=/config/workspace 如果设置了此可选变量，代码服务器将默认打开此目录 -v /config 包含所有相关配置文件。



![image-20250123171546929](https://imgoss.xgss.net/picgo/image-20250123171546929.png?aliyun)

参考：https://hub.docker.com/r/linuxserver/code-server

# docker-compose安装code-server



```
---
services:
  code-server:
    image: lscr.io/linuxserver/code-server:latest
    container_name: code-server
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Etc/UTC
      - PASSWORD=password #optional
      - HASHED_PASSWORD= #optional
      - SUDO_PASSWORD=password #optional
      - SUDO_PASSWORD_HASH= #optional
      - PROXY_DOMAIN=code-server.my.domain #optional
      - DEFAULT_WORKSPACE=/config/workspace #optional
    volumes:
      - /path/to/code-server/config:/config
    ports:
      - 8443:8443
    restart: unless-stopped

```



# 浏览器访问

浏览器访问，使用IP+端口访问

输入docker中设置的“PASSWORD”的密码，即可登录系统。

![image-20250123165509966](https://imgoss.xgss.net/picgo/image-20250123165509966.png?aliyun)



## 配置中文

在左下角，点击设置，再点击“Extensions”



![image-20250123170615277](https://imgoss.xgss.net/picgo/image-20250123170615277.png?aliyun)

搜索chinese，点击 install

![image-20250123170639765](https://imgoss.xgss.net/picgo/image-20250123170639765.png?aliyun)

![image-20250123171016909](https://imgoss.xgss.net/picgo2025/image-20250123171016909.png?aliyun)

选择中文，重启之后切换成中文

![image-20250123171040387](https://imgoss.xgss.net/picgo/image-20250123171040387.png?aliyun)

## 克隆代码

```
cd /data/docker/code-server/config/workspace
git clone https://github.com/funet8/g.xgss.net
即可看到自己的代码。
```

![image-20250123171403476](https://imgoss.xgss.net/picgo/image-20250123171403476.png?aliyun)

# 结尾

通过开源的 code-server，任何地方的开发环境都能唾手可得。在假期中，享受编程的同时，也能保持和朋友、家人们的美好时光。而你，是否也准备好开始这个假期的编程之旅了呢？



写文不易，如果你都看到了这里，请点个赞和在看，分享给更多的朋友；也别忘了关注星哥玩云！这里有满满的干货分享，还有轻松有趣的技术交流～点个赞、分享给身边的小伙伴，一起成长，一起玩转技术世界吧！ 😊



