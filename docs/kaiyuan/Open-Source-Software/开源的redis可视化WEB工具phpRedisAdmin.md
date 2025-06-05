# 开源的redis可视化WEB工具phpRedisAdmin



最近由于工作需要需要在服务器里安装一个redis可视化工具，在本文中，我们将向您介绍如何使用phpRedisAdmin以及如何配置它。

## 什么是phpRedisAdmin？

phpRedisAdmin是一个基于Web的Redis管理工具。它允许您轻松地管理Redis数据库，包括创建、编辑和删除数据库、查看记录和执行命令等操作。它也支持从备份文件中还原数据库。

github地址：https://github.com/ErikDubbelboer/phpRedisAdmin

有两种方式安装phpRedisAdmin，一种是docker，一种是需要php环境



![image-20231103141905745](https://imgoss.xgss.net/picgo/image-20231103141905745.png?aliyun)

# 基于Docker安装phpRedisAdmin（推荐）



## 1.安装Docker环境

省略

## 2.基于Docker安装phpRedisAdmin

在 Docker Hub 上提供了一个公共的 phpRedisAdmin Docker 镜像，它是从最新标签构建的。文件 includes/config.environment.inc.php 被用作配置文件，以允许使用环境变量作为配置值。

### 示例：

```
docker run --rm -it -e REDIS_1_HOST=myredis.host -e REDIS_1_NAME=MyRedis -p 80:80 erikdubbelboer/phpredisadmin
```

此外，还提供了一个用于测试和开发的 Docker Compose 清单。只需执行 docker-compose up --build 来启动它，然后浏览至 http://localhost。有关配置详细信息，请查看 docker-compose.yml 文件。

### 环境变量摘要

```
REDIS_1_HOST - 定义 Redis 服务器的主机

REDIS_1_NAME - 定义 Redis 服务器的名称

REDIS_1_PORT - 定义 Redis 服务器的端口

REDIS_1_AUTH - 定义 Redis 服务器的密码

REDIS_1_AUTH_FILE - 定义包含 Redis 服务器密码的文件

REDIS_1_DATABASES - 您可以修改配置以阻止 phpRedisAdmin 使用 CONFIG 命令

ADMIN_USER - 定义用户界面基本认证的用户名

ADMIN_PASS - 定义用户界面基本认证的密码
```





### 一个docker多个redis实例

```
docker run \
-itd --name redis-web \
--restart always \
-e REDIS_1_HOST=192.168.0.251 -e REDIS_1_NAME=Redis-jiankong -e  REDIS_1_PORT=123 -e  REDIS_1_AUTH=123456 \
-e REDIS_2_HOST=192.168.0.2 -e REDIS_2_NAME=Redis01 \
-e REDIS_3_HOST=192.168.0.3 -e REDIS_3_NAME=Redis02 \
-p 82:80 erikdubbelboer/phpredisadmin:latest

```



浏览器中访问

![image-20231103140507175](https://imgoss.xgss.net/picgo/image-20231103140507175.png?aliyun)



# 基于PHP环境安装phpRedisAdmin



## 通过GIT克隆PHP代码

前提是需要有PHP环境

您也可以进行手动安装：

```
git clone https://github.com/ErikDubbelboer/phpRedisAdmin.git
cd phpRedisAdmin
git clone https://github.com/nrk/predis.git vendor
```



## 通过Composer 

要通过 Composer 安装 phpRedisAdmin，您需要执行以下命令：

```
curl -s http://getcomposer.org/installer | php
php composer.phar create-project -s dev erik-dubbelboer/php-redis-admin path/to/install
```

您也可以复制 includes/config.sample.inc.php 到 includes/config.inc.php 并根据您特定的 Redis 配置进行编辑。

## 编辑配置

```
cp includes/config.sample.inc.php includes/config.inc.php

vi includes/config.inc.php

更加具体的配置编辑

    array(
      'name'   => 'local server', // Optional name.
      'host'   => '127.0.0.1',
      'port'   => 6379,
      'filter' => '*',
      'scheme' => 'tcp', // Optional. Connection scheme. 'tcp' - for TCP connection, 'unix' - for connection by unix domain socket
      'path'   => '', // Optional. Path to unix domain socket. Uses only if 'scheme' => 'unix'. Example: '/var/run/redis/redis.sock'
      'hide'   => false, // Optional. Override global setting. Hide empty databases in the database list.

      // Optional Redis authentication.
      'auth' => '123456' // Warning: The password is sent in plain-text to the Redis server.
    ),

```

如果有需要还可以利用nginx做反向代理访问域名。

phpRedisAdmin是一个功能强大的Redis管理工具，可以帮助您轻松地管理Redis数据库。在本文中，我们介绍了如何使用phpRedisAdmin以及如何配置它。希望这篇文章对您有所帮助！