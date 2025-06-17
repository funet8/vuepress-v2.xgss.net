---
title: 搭建开源美观的数据库监控系统-Lepus
createTime: 2025/05/27 17:51:17
permalink: /article/qg11ydtk/
---
# 搭建开源美观的数据库监控系统-Lepus



## 天兔数据库监控系统-Lepus

欢迎大家使用天兔数据库监控系统（以下简称为Lepus）。Lepus是一套开源的数据库监控平台，目前已经支持MySQL、Oracle、PostgresQL、GreatSQL、MongoDB、Redis等数据库的基本监控和告警。Lepus无需在每台数据库服务器部署脚本或Agent，只需要在数据库创建授权帐号后，即可进行远程监控，适合监控数据库服务器较多的公司和监控云中数据库，这将为企业大大减化监控部署流程，同时Lepus系统内置了丰富的性能监控指标，让企业能够在数据库宕机前发现潜在性能问题进行处理，减少企业因为数据库问题导致的直接损失。

开源地址： https://gitee.com/lepus-group/lepus

官网： https://www.lepus.cc/

Lepus有v3版本和v5版本

![mysql-leplus.webp](https://imgoss.xgss.net/picgo/mysql-leplus.webp.jpg?aliyun)

# Docker安装v3版本

https://hub.docker.com/r/georce/lepus

```
docker run -itd --name lepus \
--restart always \
-p 83:80 \
-p 50920:3306 \
docker.io/georce/lepus

http://IP:83
USERNAME: admin
PASSWORD: Lepusadmin

```

![image-20220617113950783](https://imgoss.xgss.net/picgo/image-20220617113950783.png?aliyun)

V3版本的控制面板

![image-20220617114238081](https://imgoss.xgss.net/picgo/image-20220617114238081.png?aliyun)



本教程主要在centos7下安装v5版本，并且使用监控MySQL。

## 系统说明

```
系统： centos7
IP: 192.168.1.3
数据库： 
192.168.1.6:3306 
用户名：root 
密码：123456
```

## 软件要求

Lepus-V5部署需要部署以下软件：

| 软件名称 | 推荐版本 | 必须 | 备注                                                         |
| -------- | -------- | ---- | ------------------------------------------------------------ |
| Golang   | 1.4-1.8  | 否   | 源码编译运行必须安装/使用二进制方式无需安装 （直接 yum install golang） |
| MySQL    | 5.6      | 是   | 用于存储基础数据和事件数据（本文安装教程略）                 |
| InfluxDB | 1.x      | 否   | 事件数据默认存储MySQL，支持存储到InfluxDB,如有使用InfluxDB需求则必须需要部署（笔者未安装） |
| Redis    | 5.x      | 是   | 用于报警系统限流（本文安装教程略）                           |
| NSQ      | 1.2.x    | 是   | 基于gaolang的高性能消息队列，用于事件消息传输（参考以下）    |



## centos7安装NSQ

NSQ 是实时的分布式消息处理平台，其设计的目的是用来大规模地处理每天数以十亿计级别的消息。

参考文档：https://nsq.io/overview/quick_start.html

### 1.下载软件

二进制下载路径：https://github.com/nsqio/nsq/releases

版本：nsq-1.2.1.linux-amd64.go1.16.6.tar.gz

上传到CentOS服务器，解压即可。

启动
进入解压路径的/bin目录

### 2.安装NSQ

进入解压路径的/data/NSQ目录

```
# mkdir /data/NSQ
# wget http://js.funet8.com/centos_software/nsq-1.2.1.linux-amd64.go1.16.6.tar.gz # 备用下载地址
# tar -zxvf nsq-1.2.1.linux-amd64.go1.16.6.tar.gz
# cd nsq-1.2.1.linux-amd64.go1.16.6/bin

1. 启动nsqlookupd(nohup 后台启动):
# nohup ./nsqlookupd &

2. 启动nsqd(nohup 后台启动)
# nohup ./nsqd --lookupd-tcp-address=192.168.1.3:4160 &

3. 启动nsqadmin(nohup 后台启动)
# nohup ./nsqadmin --lookupd-http-address=192.168.1.3:4161 &

4. 启动日志查看：bin目录会自动生成nohup日志,查看命令如下：
# tail -f nohup.out
```



### 3.NSQ消息测试

启动nsq_to_file，将消息写入/tmp文件的日志文件，文件名默认由主题topic+主机+日期时间戳组成

```
# nohup ./nsq_to_file --topic=test --output-dir=/tmp --lookupd-http-address=192.168.1.3:4161 &
```

使用curl命令，发布一条消息,返回OK

```
# curl -d 'hello world' 'http://192.168.1.3:4151/pub?topic=test'
OK
```

浏览器方问web界面：http://192.168.1.3:4171/，界面如下：

![image-20220617095510502](https://imgoss.xgss.net/picgo/image-20220617095510502.png?aliyun)

## 安装Lepus

Linux环境使用二进制安装Lepus

### 1.下载二进制版本Lepus

进入官网下载页面，根据操作系统选择Linux或者Windows对应的二进制包，下载lepus二进制包，下载地址： https://www.lepus.cc/downloads/  。

Linux环境二进制包文件名为 ：lepus.5.x.linux-amd64.tar.gz，Windows环境二进制包文件名为：lepus.5.x.windows-amd64.zip

本文下载：lepus.5.1.linux-amd64.tar.gz

### 2.下载并修改文件

```
cd /data/
wget http://js.funet8.com/centos_software/lepus.5.1.linux-amd64.tar.gz # 备用下载地址
tar -zxvf lepus.5.1.linux-amd64.tar.gz
mv lepus.5.1.linux-amd64 lepus.5.1
```



### 3.导入初始化数据库

进入lepus二进制目录，并导入数据库初始化表结构和数据

在192.168.1.6的数据库上数据库'lepus_db'

```
cd lepus.5.1/sql
mysql -uroot -h192.168.1.6 -P'3306' -p'123456' lepus_db < init_table.sql
mysql -uroot -h192.168.1.6 -P'3306' -p'123456' lepus_db < init_data.sql
```

![image-20220616200345620](https://imgoss.xgss.net/picgo/image-20220616200345620.png?aliyun)

### 4.生成配置文件

从example中复制配置文件，并进行设置，设置里包含连接MySQL、Redis、NSQ、告警邮件网关，
（MySQL、Redis、NSQ为必须安装，InfluxDB为可选，开源组件请大家自行安装部署）。

```
cp etc/proxy.example.ini etc/proxy.ini
cp etc/alarm.example.ini etc/alarm.ini
cp etc/config.example.ini etc/config.ini
```

由于数据库不是本机，所以需要修改配置

```
#  vim etc/proxy.ini
修改如下
[main]
port = 8800
log = /tmp/lepus_proxy.log
debug=1
enable_influxdb=0

[nsq]
nsq_server = 127.0.0.1:4150

[mysql]
mysql_host = 192.168.1.6
mysql_port = 3306
mysql_user = root
mysql_password = 123456
mysql_database = lepus_db

[influxdb]
influx_host = 192.168.1.6
influx_port = 8086
influx_user = root
influx_password = 123456
influx_database = lepus_db

# vim etc/alarm.ini
修改如下
[main]
debug=1
log = /tmp/lepus_alarm.log

[nsq]
nsq_server = 127.0.0.1:4150

[mysql]
mysql_host = 192.168.1.6
mysql_port = 3306
mysql_user = root
mysql_password = 123456
mysql_database = lepus_db

[redis]
redis_host = 127.0.0.1
redis_port = 6379
redis_pass = password

[mail]
mail_host = smtp.163.com
mail_port = 465
mail_user = alarm@163.com
mail_pass = password
mail_from = alarm@163.com

# vim etc/config.ini
修改配置
[main]
log_dir = /tmp/
debug = 1
interval = 10
proxy = http://127.0.0.1:8800
db_pass_key = L1e2p3u4s5Abc321

[mysql]
mysql_host = 192.168.1.6
mysql_port = 3306
mysql_user = root
mysql_password = 123456
mysql_database = lepus_db
```





5.启动服务组件

请按照以下顺序依次启动组件，启动报错请检查配置文件，未报错需要将任务放到后台运行。

启动Proxy模块

```
# cd /data/lepus.5.1/bin/
# ./lepus_proxy --config=../etc/proxy.ini

```

启动Task模块

```
# ./lepus_task --config=../etc/config.ini

```

启动Alarm模块

```
./lepus_alarm --config=../etc/alarm.ini
```

启动后可以查看进程

```
# ps -ef|grep lepus
root      3810  3135  0 Jun16 pts/0    00:00:00 ./lepus_proxy --config=../etc/proxy.ini
root      3816  3135  0 Jun16 pts/0    00:00:00 ./lepus_task --config=../etc/config.ini
root      5329  5000  0 09:55 pts/1    00:00:00 ./lepus_alarm --config=../etc/alarm.ini
```


查看运行日志，没有Error则运行正常，如果日志过多可以将配置文件debug设置为0，则不会输出debug日志。

```
tail -f /tmp/lepus_proxy.log
tail -f /tmp/lepus_task.log
tail -f /tmp/lepus_alarm.log
```


提示：Lepus安装完成后还需要安装运行Lepus Console控制台。

##  安装Lepus-console

Lepus Console控制台是用于配置和管理Lepus的WEB管理界面，没有控制台，Lepus也可以正常运行，您也可以通过操作数据库数据进行监控和报警，但是使用Lepus Console会让使用更加便捷，并且查询随时查询监控事件数据和性能图表。

### 下载Lepus Console安装包

1.进入官网下载页面，根据操作系统选择Linux或者Windows对应的Lepus Console二进制包，下载lepus二进制包，下载地址： https://www.lepus.cc/downloads/  。

笔者下载 lepus-console.5.1.linux-amd64.tar.gz

```
mkdir /data/lepus-console
cd /data/lepus-console
wget http://js.funet8.com/centos_software/lepus-console.5.1.linux-amd64.tar.gz # 备用下载地址
tar -zxvf lepus-console.5.1.linux-amd64.tar.gz
mv lepus-console.5.1.linux-amd64 lepus-console.5.1

```

2.进入lepus-console-linux-amd64目录

```
cd lepus-console.5.1
```

3.复制和修改配置文件

```
# cp setting.example.yml setting.yml
修改配置文件
# vim setting.yml 
填写以下，只修改mysql的配置：
log:
  path: "/tmp/lepus_api.log"
  level: "debug"
  debug: true

dataSource:
  eventStorageEngine: mysql
  host: 192.168.1.6
  port: 3306
  user: root
  password: 123456
  database: lepus_db
  influxHost: 127.0.0.1
  influxPort: 8086
  influxUser: admin
  influxPassword:
  influxDatabase: lepus_db

token:
  storage: "mysql"
  key: "S9p2+dsfM1CzLF=="
  name: "lepus-pro"
  expired: "3d"

decrypt:
  signKey: "1234567890abcdef"
  dbPassKey: "L1e2p3u4s5Abc321"
```



4.运行控制台

```
# ./lepus_console
...
[GIN-debug] Listening and serving HTTP on :8080
```

5.访问控制台

访问 IP:8080 可以登录界面进行登录，默认管理密码为：admin/lepusadmin

![image-20220617101249323](https://imgoss.xgss.net/picgo/image-20220617101249323.png?aliyun)

进入控制台

![image-20220617101343150](https://imgoss.xgss.net/picgo/image-20220617101343150.png?aliyun)

至此，lepus在centos7系统下就安装完成了，再就是添加mysql监控节点和异常通知告警的配置了。

![image-20220617101735813](https://imgoss.xgss.net/picgo/image-20220617101735813.png?aliyun)



使用手册： https://www.lepus.cc/docs/lepus-v5/manual/

参考：https://www.lepus.cc/docs/lepus-v5/



