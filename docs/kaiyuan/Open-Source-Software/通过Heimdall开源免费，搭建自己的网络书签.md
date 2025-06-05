# 通过Docker安装Heimdall开源免费，搭建自己的网络书签

Heimdall 是一款网络书签仪表盘，它内置了超过 300 款网络服务图标，以及接通了部分服务的 API，可以实现一个非常漂亮的网络书签、内网门户页面。

- Heimdall 开源地址：https://github.com/linuxserver/Heimdall
- Heimdall 官网：https://heimdall.site/

## Docker安装



在群辉nas里通过docker安装：

```
docker run -itd --name=heimdall \
--restart always \
-v /volume1/docker/heimdall:/config \
-e PGID=1000 -e PUID=1000 \
-p 2001:80 \
linuxserver/heimdall
```



其中 -v 是挂载配置文件夹，-e 是设置运行用户权限，一般情况下默认即可，-p 是映射端口，可自定义。

然后就能直接在内网通过 ip:8443 访问了。当然也可以放在公网上使用，毕竟支持多用户，和朋友一起也很开心。

浏览器访问：IP+端口



## 修改语言

![image-20240429165307378](https://imgoss.xgss.net/picgo/image-20240429165307378.png?aliyun)







