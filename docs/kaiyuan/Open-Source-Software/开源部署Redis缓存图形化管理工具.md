---
title: 开源部署Redis缓存图形化管理工具
createTime: 2025/05/27 17:51:17
permalink: /article/zq36h2qn/
---
# 开源部署Redis缓存图形化管理工具



最近开发需要远程连接Redis查看数据库，因为生产环境的Redis只提供内网访问，如果开放公网则需要提供密码，有泄漏的风险。

于是就在网上找了一个基于web的项目部署Redis缓存图形化管理工具，还有权限分配的功能。

项目： https://hub.docker.com/r/aoyanfei/redis-admin

# 安装Docker

略

## 运行Docker

```
# docker pull aoyanfei/redis-admin
如果拉不下来用代理地址（你懂的原因）：
# docker pull dockerproxy.com/aoyanfei/redis-admin

# docker run -itd --restart=always --name redis-admin -p 9898:9898 aoyanfei/redis-admin

docker run -itd --restart=always --name redis-admin -p 9898:9898 dockerproxy.com/aoyanfei/redis-admin

```

运行

```
# docker run -itd --restart=always --name redis-admin -p 9898:9898 dockerproxy.com/aoyanfei/redis-admin
3ae49d1bf26b8e6b3dad5ed6884e4409c69c758fe675797c334589c4b3ec1548
# docker ps
CONTAINER ID   IMAGE                                  COMMAND                  CREATED         STATUS        PORTS                                       NAMES
3ae49d1bf26b   dockerproxy.com/aoyanfei/redis-admin   "java -jar /redis-ad…"   2 seconds ago   Up 1 second   0.0.0.0:9898->9898/tcp, :::9898->9898/tcp   redis-admin
```

用IP+9898 访问

默认用户名和密码都是 admin



## 

# 后台管理

## 登录界面

![image-20240206171453901](https://imgoss.xgss.net/picgo/image-20240206171453901.png?aliyun)



## 用户界面

修改管理员账号，删除默认账号贤心

![image-20240206172208857](https://imgoss.xgss.net/picgo/image-20240206172208857.png?aliyun)



## 配置-新增redis

系统管理--->配置

![image-20240206172904491](https://imgoss.xgss.net/picgo2025/image-20240206172904491.png?aliyun)



## 缓存管理

![image-20240206173018106](https://imgoss.xgss.net/picgo/image-20240206173018106.png?aliyun)