---
title: 开源的数据同步中间件-DBSyncer
createTime: 2025/05/27 17:51:17
permalink: /article/ek4hzsyu/
---
# 开源的数据同步中间件-DBSyncer

# 项目介绍

DBSyncer是一款开源的数据同步中间件，提供Mysql、Oracle、SqlServer、Elasticsearch(ES)、Kafka、SQL(Mysql/Oracle/SqlServer)等同步场景。支持上传插件自定义同步转换业务，提供监控全量和增量数据统计图、应用性能预警等。



开源地址：https://gitee.com/ghi/dbsyncer

- 组合驱动，自定义库同步到库组合，关系型数据库与非关系型之间组合，任意搭配表同步映射关系

- 实时监控，驱动全量或增量实时同步运行状态、结果、同步日志和系统日志

- 开发插件，自定义转化同步逻辑

  ![开源的数据同步中间件-DBSyncer](https://imgoss.xgss.net/picgo/开源的数据同步中间件-DBSyncer.jpg?aliyun)


# 安装部署

## 系统介绍

```
centos7

ip:192.168.1.8

需要部署安装JDK和Maven
```



## 安装JDK 1.8

如果安装了可以忽略

```
# mkdir /data/software/
# cd /data/software/
# wget http://js.funet8.com/centos_software/jdk-8u211-linux-x64.tar.gz
# mkdir /usr/local/java/
# tar -zxvf jdk-8u211-linux-x64.tar.gz -C /usr/local/java/

# echo '
export JAVA_HOME=/usr/local/java/jdk1.8.0_211
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH
'>> /etc/profile

# source /etc/profile

# ln -s /usr/local/java/jdk1.8.0_211/bin/java /usr/bin/java

# java -version
```



## 安装maven

```
# mkdir /data/maven
# cd /data/maven
# wget http://mirrors.cnnic.cn/apache/maven/maven-3/3.5.4/binaries/apache-maven-3.5.4-bin.tar.gz
备用下载地址：
# wget http://js.funet8.com/centos_software/apache-maven-3.5.4-bin.tar.gz
# tar -zxvf apache-maven-3.5.4-bin.tar.gz

配置maven：  
# vim /etc/profile
在配置文件配置中加上：

export MAVEN_HOME=/data/maven/apache-maven-3.5.4
export PATH=$MAVEN_HOME/bin:$PATH

使配置立即生效
# source  /etc/profile

# mvn --version
Apache Maven 3.5.4
```



## 下载安装包

https://gitee.com/ghi/dbsyncer/releases ，这里我下载v1.1.7-Beta版本

```
# cd /data/wwwroot/web/
# wget http://js.funet8.com/centos_software/dbsyncer-v1.1.7-Beta.tar.gz
解压
# tar -zxvf dbsyncer-v1.1.7-Beta.tar.gz 
# cd dbsyncer-v1.1.7-Beta
编译包
# sh build.sh 
...
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 03:17 min
[INFO] Finished at: 2022-04-28T16:40:21+08:00
[INFO] ------------------------------------------------------------------------
‘/data/wwwroot/web/dbsyncer-v1.1.7-Beta/dbsyncer-web/target/dbsyncer-1.1.7-Beta.zip’ -> ‘/data/wwwroot/web/dbsyncer-v1.1.7-Beta/dbsyncer-1.1.7-Beta.zip’

# unzip dbsyncer-1.1.7-Beta.zip 
# cd dbsyncer-1.1.7-Beta 
# ./bin/startup.sh
```



查看端口

```
# netstat -tunpl|grep 18686
tcp6       0      0 :::18686                :::*                    LISTEN      5754/java     
```

开放端口(非必要)

```
iptables -A INPUT -p tcp --dport 18686 -j ACCEPT
service iptables save
systemctl restart iptables.service
```





### 打开浏览器访问

http://IP:18686  

http://192.168.1.8:18686/

### 账号和密码

admin/admin

![image-20220428165146386](https://imgoss.xgss.net/picgo/image-20220428165146386.png?aliyun)

# 同步MySQL数据库

```
192.168.1.6:3306 同步到---> 192.168.1.8:61921

192.168.1.6:61922
root
123456

192.168.1.8:61921
root
123456
同步数据库 dzzoffice

mysql -u root -h 192.168.1.6 -P61922 -p'123456'
mysql -u root -h 192.168.1.8 -P61921 -p'123456'
查看binlog日志
> show binary logs;
```



目标库的server_id不能为1

```
mysqladmin -u root -h 192.168.1.8 -p123456 -P61921 shutdown
修改mysql的配置文件
server_id=1 改为 server_id=100
再次启动
/usr/bin/mysqld_safe --defaults-file=/data/mysql/etc/61921.cnf &
```





## 添加连接

进入后台点击 “添加连接”

![image-20220428181006187](https://imgoss.xgss.net/picgo/image-20220428181006187.png?aliyun)

![image-20220428181020667](https://imgoss.xgss.net/picgo/image-20220428181020667.png?aliyun)

添加驱动

![image-20220428181251742](https://imgoss.xgss.net/picgo/image-20220428181251742.png?aliyun)

启动

![image-20220428181231313](https://imgoss.xgss.net/picgo/image-20220428181231313.png?aliyun)

![image-20220428181337970](https://imgoss.xgss.net/picgo/image-20220428181337970.png?aliyun)



优点： 开源系统，使用上类似于阿里云的DTS，如果作为数据同步使用还可以，作为生产环境就需要多测试了

主要用于A库的某数据库同步到B库

## 增量同步配置（源库）

Mysql

- Dump Binlog二进制日志。Master同步Slave, 创建IO线程读取数据，写入relaylog，基于消息订阅捕获增量数据。
- 配置

修改my.ini文件

```
#服务唯一ID
server_id=1
log-bin=mysql_bin
binlog-format=ROW
max_binlog_cache_size = 256M
max_binlog_size = 512M
expire_logs_days = 7
#监听同步的库, 多个库使用英文逗号“,”拼接
replicate-do-db=test
```

## **Oracle**

- CDN注册订阅。监听增删改事件，得到rowid，根据rowid执行SQL查询，得到变化数据。
- 授予账号监听权限, 同时要求目标源表必须定义一个长度为18的varchar字段，通过接收rowid值实现增删改操作。

```
grant change notification to 你的账号
```

# 定时

![DBSyncer 一款开源的数据同步中间件](https://imgoss.xgss.net/picgo/5eb194cd687f4b669d44cba753f4c30d.png?aliyun)

假设源表数据格式

![DBSyncer 一款开源的数据同步中间件](https://imgoss.xgss.net/picgo/a957bb7f7fcb4fb8847e635bf20ea31d.png?aliyun)



# 预览

![DBSyncer 一款开源的数据同步中间件](https://imgoss.xgss.net/picgo/aab4da41d1154f3e96bb406c04454693.png?aliyun)

驱动管理

![DBSyncer 一款开源的数据同步中间件](https://imgoss.xgss.net/picgo/6422d911c563406495b6c64ceb1b4072.png?aliyun)



## 驱动详情

![DBSyncer 一款开源的数据同步中间件](https://imgoss.xgss.net/picgo/29520029fb8b46c080f2926cd86ffe1c.png?aliyun)



## 驱动表字段关系配置

![DBSyncer 一款开源的数据同步中间件](https://imgoss.xgss.net/picgo/3180974b153f4727bd0bbda41f64086f.png?aliyun)



## 监控

![img](https://imgoss.xgss.net/picgo/000645_35a544b3_376718.png?aliyun)

## 上传插件

![img](https://imgoss.xgss.net/picgo/232643_9b1f3f64_376718.png?aliyun)