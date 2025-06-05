# 两种方法教你如何在Linux系统中安装Yapi



大家好，我是星哥，这篇文章讲介绍两种方法教你如何在Linux系统中安装Yapi，并且使用nginx反向代理。

# 什么是Yapi

YApi 是高效、易用、功能强大的 api 管理平台，旨在为开发、产品、测试人员提供更优雅的接口管理服务。可以帮助开发者轻松创建、发布、维护，YApi 还为用户提供了优秀的交互体验，开发人员只需利用平台提供的接口数据写入工具以及简单的点击操作就可以实现接口的管理。

# YApi 的特性

- **权限管理：** YApi 拥有比较成熟的团队管理扁平化项目权限配置，它可以满足各类企业的需求
- **可视化接口管理：** 使用 websocket 技术开发的多人协作接口编辑功能，让多人协作 成倍提升开发效率
- **Mock Server：** 简单快捷的 Mock Server 应用， mock 数据的生成非常方便
- **自动化测试：** 比较完善的接口自动化测试,保证数据的正确性
- **数据导入：** 支持导入 Swagger, Postman, Har 数据格式，方便迁移旧项目
- **插件机制：** 比较强大的插件机制，它可以满足各类业务需求

![image-20230208145718401](https://imgoss.xgss.net/picgo/image-20230208145718401.png?aliyun)



## 官方文档

开源地址： https://github.com/YMFE/yapi

# Centos7 下基于docker安装Yapi



## 一、安装Docker

```
yum install  docker
systemctl start docker
systemctl enable docker
```



## 二、安装并配置Mongo

```
# mkdir -p /data/docker/mongo
# cd  /data/docker/mongo
# mkdir db
# vim mongo.conf
填写一下内容，保存：
systemLog:
  destination: file
  path: /var/log/mongodb/mongod.log
  logAppend: true
storage:
  dbPath: /data/db
net:
  port: 27017
  bindIp: 0.0.0.0
```

docker启动mongo

```
# docker run -itd \
-p 27017:27017 \
--name yapi-mongodb \
--restart always \
-v /data/docker/mongo/db:/data/db \
-v /data/docker/mongo/mongo.conf:/data/mongo.conf \
-e TZ=Asia/Shanghai mongo:4.0.4
```



## 三、初始化 Yapi 数据库索引及管理员账号

```
# docker run -it --rm  \
--link yapi-mongodb:mongo  \
--entrypoint npm  \
--workdir /api/vendors  registry.cn-hangzhou.aliyuncs.com/anoy/yapi  run install-server

> yapi-vendor@1.8.5 install-server /api/vendors
>  node server/install.js
log: mongodb load success...
初始化管理员账号成功,账号名："admin@admin.com"，密码："ymfe.org"
```



## 四、启动 Yapi 服务

```
# docker run -d  --name yapi  \
 --restart always \
--link yapi-mongodb:mongo  \
--workdir /api/vendors  \
-p 3000:3000  registry.cn-hangzhou.aliyuncs.com/anoy/yapi  server/app.js
```



访问 http://localhost:3000 

```
登录账号: admin@admin.com
密码: ymfe.org
```



![image-20230208152434166](https://imgoss.xgss.net/picgo/image-20230208152434166.png?aliyun)

至此，Yapi基于Docker环境安装完成，就可以使用了

# 使用npm安装

## 环境准备

在开始安装之前，请确保您的Linux系统已经安装了以下软件：

- **Node.js:** Yapi是基于Node.js开发的，所以需要先安装Node.js。
- **MongoDB:** Yapi使用MongoDB作为数据库。

## 1.安装npm

```
npm install -g yarn
```

## 2.克隆Yapi项目

```
git clone https://github.com/YMFE/yapi.git
cd yapi
```

## 3.安装依赖:

```
yarn
```

## 4.启动Yapi:

```
yarn start
```

# Nginx反向代理

这步操作主要是用域名便于记忆，不用记 192.168.1.3:3000 的IP来访问。

```
server {
        listen       80;
        server_name  yapi.XXX.com;
        #root /path/;
        access_log /data/wwwroot/log/yapi.XXX.com-access.log;
        error_log off;

        location / {
                index index.php index.html;
                proxy_pass      http://192.168.1.3:3000;
                proxy_redirect off;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        }
}
```



# 结尾

综上所述，Yapi作为一款功能强大的接口管理平台，在提高开发效率、保证接口质量方面具有显著优势。