---
title: datax-web
createTime: 2025/05/27 17:51:17
permalink: /article/j98cmeh9/
---
# 开源DataX集成可视化项目Datax-Web的安装

# 关于datax-web项目

在做DataX项目测试的时候又收到github的推荐邮件，推荐了一个datax-web的开源项目，这不是瞌睡遇到枕头，再研究研究这个项目是不是符合数据同步的要求。

[datax-web](https://github.com/WeiYe-Jing/datax-web) ： https://github.com/WeiYe-Jing/datax-web

主要的功能： https://github.com/WeiYe-Jing/datax-web#features

![image-20230321174026865](https://imgoss.xgss.net/picgo/image-20230321174026865.png?aliyun)

DataX Web是在DataX之上开发的分布式数据同步工具，提供简单易用的 操作界面，降低用户使用DataX的学习成本，缩短任务配置时间，避免配置过程中出错。用户可通过页面选择数据源即可创建数据同步任务，支持RDBMS、Hive、HBase、ClickHouse、MongoDB等数据源，RDBMS数据源可批量创建数据同步任务，支持实时查看数据同步进度及日志并提供终止同步功能，集成并二次开发xxl-job可根据时间、自增主键增量同步数据。

任务"执行器"支持集群部署，支持执行器多节点路由策略选择，支持超时控制、失败重试、失败告警、任务依赖，执行器CPU.内存.负载的监控等等。后续还将提供更多的数据源支持、数据转换UDF、表结构同步、数据同步血缘等更为复杂的业务场景。

先看一下后台

![image-20230331170510415](https://imgoss.xgss.net/picgo/image-20230331170510415.png?aliyun)

# DataX Web架构图

![datax-webjiagou](https://imgoss.xgss.net/picgo/datax-webjiagou.png?aliyun)

# DataX Web安装

## 系统说明

IP: 192.168.1.3

系统: centos7

已安装： DataX 、mysql5.7

## 基础软件安装

- MySQL (5.5+) 必选，对应客户端可以选装, Linux服务上若安装mysql的客户端可以通过部署脚本快速初始化数据库
- JDK (1.8.0_xxx) 必选
- Maven (3.6.1+) 必选
- DataX 必选
- Python (2.x) (支持Python3需要修改替换datax/bin下面的三个python文件，替换文件在doc/datax-web/datax-python3下) 必选，主要用于调度执行底层DataX的启动脚本，默认的方式是以Java子进程方式执行DataX，用户可以选择以Python方式来做自定义的改造

基础软件安装参照： [https://github.com/WeiYe-Jing/datax-web/blob/master/doc/datax-web/datax-web-deploy-V2.1.1.md](https://github.com/WeiYe-Jing/datax-web/blob/master/doc/datax-web/datax-web-deploy-V2.1.1.md)

## DataX Web安装包准备

下载官方提供的版本tar版本包:[点击下载](https://pan.baidu.com/s/13yoqhGpD00I82K4lOYtQhg)  https://pan.baidu.com/s/13yoqhGpD00I82K4lOYtQhg 提取码：cpsk

备用下载： http://js.funet8.com/centos_software/datax-web-2.1.2.tar.gz

## 开始部署

### 解压安装包

在选定的安装目录，解压安装包

```
# tar -zxvf datax-web-2.1.2.tar.gz 
datax-web-2.1.2/packages/datax-admin_2.1.2_1.tar.gz
datax-web-2.1.2/packages/datax-executor_2.1.2_1.tar.gz
datax-web-2.1.2/bin/
datax-web-2.1.2/bin/db/
datax-web-2.1.2/bin/db/datax_web.sql
datax-web-2.1.2/bin/install.sh
datax-web-2.1.2/bin/start-all.sh
datax-web-2.1.2/bin/start.sh
datax-web-2.1.2/bin/stop-all.sh
datax-web-2.1.2/bin/stop.sh
datax-web-2.1.2/README.md
datax-web-2.1.2/userGuid.md
```

### 执行一键安装脚本

进入解压后的目录，找到bin目录下面的install.sh文件，如果选择交互式的安装，则直接执行

```
# cd datax-web-2.1.2
# ./bin/install.sh
```



实际操作：

```
# ./bin/install.sh
2023-03-22 17:58:32.784 [INFO] (21522) Creating directory: [/data/datax-web-2.1.2/bin/../modules].
2023-03-22 17:58:32.800 [INFO] (21522)  ####### Start To Uncompress Packages ######
2023-03-22 17:58:32.805 [INFO] (21522) Uncompressing....
Do you want to decompress this package: [datax-admin_2.1.2_1.tar.gz]? (Y/N)Y
2023-03-22 17:58:36.983 [INFO] (21522)  Uncompress package: [datax-admin_2.1.2_1.tar.gz] to modules directory
Do you want to decompress this package: [datax-executor_2.1.2_1.tar.gz]? (Y/N)Y
2023-03-22 17:58:45.670 [INFO] (21522)  Uncompress package: [datax-executor_2.1.2_1.tar.gz] to modules directory
2023-03-22 17:58:46.176 [INFO] (21522)  ####### Finish To Umcompress Packages ######
Scan modules directory: [/data/datax-web-2.1.2/bin/../modules] to find server under dataxweb
2023-03-22 17:58:46.181 [INFO] (21522)  ####### Start To Install Modules ######
2023-03-22 17:58:46.183 [INFO] (21522) Module servers could be installed:
 [datax-admin]  [datax-executor] 
Do you want to confiugre and install [datax-admin]? (Y/N)Y  
2023-03-22 17:58:54.896 [INFO] (21522)  Install module server: [datax-admin]
Start to make directory
2023-03-22 17:58:54.957 [INFO] (21580)  Start to build directory
2023-03-22 17:58:54.959 [INFO] (21580) Creating directory: [/home/data/datax-web-2.1.2/modules/datax-admin/bin/../logs].
2023-03-22 17:58:55.028 [INFO] (21580) Directory or file: [/home/data/datax-web-2.1.2/modules/datax-admin/bin/../conf] has been exist
2023-03-22 17:58:55.030 [INFO] (21580) Creating directory: [/home/data/datax-web-2.1.2/modules/datax-admin/bin/../data].
end to make directory
Start to initalize database
2023-03-22 17:58:55.544 [INFO] (21580)  Scan out mysql command, so begin to initalize the database
Do you want to initalize database with sql: [/data/datax-web-2.1.2/bin/db/datax_web.sql]? (Y/N)Y
Please input the db host(default: 127.0.0.1): 192.168.1.3
Please input the db port(default: 3306): 61920
Please input the db username(default: root): star      
Please input the db password(default: ): 123456
Please input the db name(default: dataxweb)
mysql: [Warning] Using a password on the command line interface can be insecure.
Do you want to confiugre and install [datax-executor]? (Y/N)Y
2023-03-22 18:00:27.099 [INFO] (21522)  Install module server: [datax-executor]
2023-03-22 18:00:27.153 [INFO] (21711)  Start to build directory
2023-03-22 18:00:27.156 [INFO] (21711) Creating directory: [/home/data/datax-web-2.1.2/modules/datax-executor/bin/../logs].
2023-03-22 18:00:27.184 [INFO] (21711) Directory or file: [/home/data/datax-web-2.1.2/modules/datax-executor/bin/../conf] has been exist
2023-03-22 18:00:27.186 [INFO] (21711) Creating directory: [/home/data/datax-web-2.1.2/modules/datax-executor/bin/../data].
2023-03-22 18:00:27.210 [INFO] (21711) Creating directory: [/home/data/datax-web-2.1.2/modules/datax-executor/bin/../json].
2023-03-22 18:00:27.234 [INFO] (21522)  ####### Finish To Install Modules ######
```

在交互模式下，对各个模块的package压缩包的解压以及configure配置脚本的调用，都会请求用户确认,可根据提示查看是否安装成功，如果没有安装成功，可以重复尝试； 如果不想使用交互模式，跳过确认过程，则执行以下命令安装

```
./bin/install.sh --force
```

数据库

![image-20230322180121385](https://imgoss.xgss.net/picgo/image-20230322180121385.png?aliyun)

```
# cat ./modules/datax-admin/conf/bootstrap.properties
#Database
DB_HOST=192.168.1.3
DB_PORT=61920
DB_USERNAME=star
DB_PASSWORD=123456
DB_DATABASE=dataxweb
```

## 配置

安装完成之后，在项目目录： /modules/datax-admin/bin/env.properties 配置邮件服务(可跳过)

```
# cat  ./modules/datax-admin/bin/env.properties
MAIL_USERNAME=""
MAIL_PASSWORD=""
```

此文件中包括一些默认配置参数，例如：server.port，具体请查看文件。

在项目目录下/modules/datax-execute/bin/env.properties 指定PYTHON_PATH的路径

```
vi ./modules/datax-execute/bin/env.properties

### 执行datax的python脚本地址
PYTHON_PATH=

### 保持和datax-admin服务的端口一致；默认是9527，如果没改datax-admin的端口，可以忽略
DATAX_ADMIN_PORT=

```

实际修改

```
# vi ./modules/datax-executor/bin/env.properties
## PYTHON脚本执行位置
#PYTHON_PATH=/home/hadoop/install/datax/bin/datax.py
PYTHON_PATH=/data/datax/bin/datax.py
```



此文件中包括一些默认配置参数，例如：executor.port,json.path,data.path等，具体请查看文件。

## 启动服务

一键启动所有服务

```
./bin/start-all.sh
```

中途可能发生部分模块启动失败或者卡住，可以退出重复执行，如果需要改变某一模块服务端口号，则：

```
vi ./modules/{module_name}/bin/env.properties
```

找到SERVER_PORT配置项，改变它的值即可。 当然也可以单一地启动某一模块服务：

```
./bin/start.sh -m {module_name}
```

- 一键取消所有服务

```
./bin/stop-all.sh
```

当然也可以单一地停止某一模块服务：

```
./bin/stop.sh -m {module_name}
```



## 查看服务（注意！注意！）

在Linux环境下使用JPS命令，查看是否出现DataXAdminApplication和DataXExecutorApplication进程，如果存在这表示项目运行成功

如果项目启动失败，请检查启动日志：modules/datax-admin/bin/console.out或者modules/datax-executor/bin/console.out

------

Tips: 脚本使用的都是bash指令集，如若使用sh调用脚本，可能会有未知的错误

## 运行

部署完成后，在浏览器中输入 http://ip:port/index.html 就可以访问对应的主界面（ip为datax-admin部署所在服务器ip,port为为datax-admin 指定的运行端口）

```
开放端口：
iptables -A INPUT -p tcp --dport 9504 -j ACCEPT
iptables -A INPUT -p tcp --dport 9999 -j ACCEPT
iptables -A INPUT -p tcp --dport 9527 -j ACCEPT

service iptables save
systemctl restart iptables
```



IP+端口。直接访问会报错，刚开始以为配置错误呢。要加 index.html，比如： 192.168.1.3:9527/index.html

![image-20230322193732343](https://imgoss.xgss.net/picgo/image-20230322193732343.png?aliyun)

http://192.168.1.3:9527/index.html

![image-20230327145732737](https://imgoss.xgss.net/picgo/image-20230327145732737.png?aliyun)

输入用户名 admin 密码 123456 就可以直接访问系统



###  运行日志

部署完成之后，在modules/对应的项目/data/applogs下(用户也可以自己指定日志，修改application.yml 中的logpath地址即可)，用户可以根据此日志跟踪项目实际启动情况

如果执行器启动比admin快，执行器会连接失败，日志报"拒绝连接"的错误，一般是先启动admin,再启动executor,30秒之后会重连，如果成功请忽略这个异常。

# 进入系统

下次来记录datax-web的后台配置。

![image-20230327161147535](https://imgoss.xgss.net/picgo/image-20230327161147535.png?aliyun)



参考： https://github.com/WeiYe-Jing/datax-web/blob/master/doc/datax-web/datax-web-deploy.md

