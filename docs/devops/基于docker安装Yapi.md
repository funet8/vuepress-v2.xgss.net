# Linux系统下基于Docker安装Yapi，并且迁移Yapi数据

本文主要讲四个部分：

1.什么是Yapi

2.Centos7 下基于docker安装Yapi

3.Yapi数据迁移

4.利用Nginx反向代理

## 什么是Yapi

YApi 是高效、易用、功能强大的 api 管理平台，旨在为开发、产品、测试人员提供更优雅的接口管理服务。可以帮助开发者轻松创建、发布、维护 API，YApi 还为用户提供了优秀的交互体验，开发人员只需利用平台提供的接口数据写入工具以及简单的点击操作就可以实现接口的管理。

![image-20230208145718401](https://imgoss.xgss.net/picgo/image-20230208145718401.png?aliyun)

### 1.权限管理

YApi 成熟的团队管理扁平化项目权限配置满足各类企业的需求

### 2.可视化接口管理

基于 websocket 的多人协作接口编辑功能和类 postman 测试工具，让多人协作成倍提升开发效率

### 3.Mock Server

易用的 Mock Server，再也不用担心 mock 数据的生成了

### 4.自动化测试

完善的接口自动化测试,保证数据的正确性

### 5.数据导入

支持导入 swagger, postman, har 数据格式，方便迁移旧项目

### 6.插件机制

强大的插件机制，满足各类业务需求



## 官方文档

http://yapi.smart-xwork.cn/

Git仓库： https://github.com/YMFE/yapi

# Centos7 下基于docker安装Yapi



## 一、安装Docker

已安装的可忽略

```
yum install  docker
systemctl start docker
systemctl enable docker
```



## 二、docker启动配置Mongo



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

至此，Yapi基于docker环境安装完成，就可以使用了

还需要把旧的服务器数据迁移到这个yapi中。

# 将旧的Yapi项目导入到新的Yapi中

由于旧的服务器快到期了，需要将旧的Yapi的数据导入到新的Yapi中。

登录旧的服务器

## 1.查看mongodb数据库

```
# mongo
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
yapi    0.015GB
> exit
bye

```



## 2.导出mongodb数据库

### 导出语法

```
# mongodump -h dbhost -d dbname -o dbdirectory
-h MongoDB所在服务器地址，例如本机就是127.0.0.1，还可以指定端口号，如：127.0.0.1:27017
-d 需要备份导出的数据库实例名称
-o 备份导出数据存放的地址。

例如：
mongodump -h 127.0.0.1:27017 -d yapi -o /root/
```



实际操作，进入到docker中，导出导入数据库。

新的和旧的服务器要可以联通。否则还是打包文件来操作。

```
进入docker环境中：
# docker exec -it yapi-mongodb /bin/bash

将远程的mongodb导入到新的yapi中。
mongodump -h 192.168.1.21:27017 -d yapi -o yapi192.168.1.21/
```



## 3.导入mongodb数据库

### 导入语法：

```

# mongorestore -h <hostname><:port> -d dbname <path>
path    需要导入的数据所在的位置
```

实际操作

```
如下所示：

# mongorestore -h 127.0.0.1:27017 -d yapi yapi192.168.1.21/yapi

```



## 4.验证

数据是否都导入正确。

从原来的接口数为0现在有3000多，至此迁移成功。

![image-20230214193557949](https://imgoss.xgss.net/picgo/image-20230214193557949.png?aliyun)



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




