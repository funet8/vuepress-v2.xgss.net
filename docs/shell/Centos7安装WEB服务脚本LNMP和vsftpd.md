# Centos7安装WEB服务脚本LNMP和vsftpd

本文主要介绍笔者经常用到的shell脚本，在centos7系统下安装LNMP和FTP，还有redis和docker，主要针对服务器的。
L=Linux(这里系统Centos7)，N=Nginx（Yum安装 nginx），M=Mysql(这里安装MariaDB-10.2.9)，P=PHP7和PHP8

![shell.webp](https://imgoss.xgss.net/picgo/shell.webp.jpg?aliyun)

## 安装nginx

脚本说明：
1.yum 安装nginx

2.将nginx主配置改为 /etc/nginx/nginx.conf

3.nginx的子站点配置防止目录：/data/conf/sites-available/

```
# wget https://gitee.com/funet8/centos6_LANP_dockerfile/raw/master/centos7_intall_php7.3/CentOS7.x_Nginx.sh
# sh CentOS7.x_Nginx.sh
```



 

## 安装openresty（与Nginx二选一）

脚本说明：
1.源码包安装openresty-1.19.9.1

2.将nginx主配置改为 /etc/nginx/nginx.conf

3.nginx的子站点配置防止目录：/data/conf/sites-available/

4.配置WAF

```
# wget https://gitee.com/funet8/waf/raw/master/CentOS7_install_openresty.sh

# sh CentOS7_install_openresty.sh    
```



## 安装php7.3.7

脚本说明：

1.下载PHP7.3.3源码包安装

2.安装openssl、memcache、phpredis扩展

3.修改配端口7300，时区、PHP进程数等。

4.安装目录 /usr/local/php7.3 ，用户 www。

```
端口:7300
wget https://gitee.com/funet8/centos6_LANP_dockerfile/raw/master/centos7_intall_php7.3/CentOS7_Install_PHP7.3_PHPFPM.sh
上传安装包
sh CentOS7_Install_PHP7.3_PHPFPM.sh
```





## 安装php8.0.8

脚本说明：

1.下载php-8.0.8源码包安装

2.安装 phpredis、zip扩展

3.修改配置，端口

```
wget  https://gitee.com/funet8/centos6_LANP_dockerfile/raw/master/centos7_install_php8/centos7_install_php8.sh
端口:8100
sh centos7_install_php8.sh

将PHP改为PHP8
rm /usr/bin/php
cp -a /data/php-8.0.8/bin/php8.0  /usr/bin/php
```



## 安装Vsftpd

功能介绍：

1.创建常用目录

2.yum安装vsftpd，开放iptables的端口

3.修改配置，默认用户 yxkj_web，密码 Password123，22端口改为62920。

```
# wget https://gitee.com/funet8/centos6_LANP_dockerfile/raw/master/shell/3-CentOS7.x_Vsftp.sh
修改参数
# sh 3-CentOS7.x_Vsftp.sh


增加用户
# wget https://gitee.com/funet8/centos6_LANP_dockerfile/raw/master/shell/3-CentOS6_7_Vsftp_Add_User.sh
```



## 安装MariaDB数据库

脚本说明：

1.下载MariaDB-10.2.9 RPM安装包。

2.移除所有原有的mysql软件包和配置文件

3.创建用户和用户组 mysql，端口 3306

```
安装数据库
# wget https://gitee.com/funet8/MYSQL/raw/master/RPM_Install_MariaDB/RPM_Install_MariaDB-Centos7-more-port.sh
# sh RPM_Install_MariaDB-Centos7-more-port.sh
```



## 安装MariaDB多端口

多端口脚本说明：
端口： 61920 61921 61922 61923 61924
数据库文件目录： /data/mysql/$port
数据库配置目录： /data/mysql/etc/
数据库慢查询目录： /data/mysql/slowQuery/
数据库配置：   /data/mysql/etc/$port.cnf

默认用户： star_user 密码： Passwd123

```
# wget https://gitee.com/funet8/MYSQL/raw/master/more-mysql-instance/more-mysql-instance.sh

# sh more-mysql-instance.sh
```

   

## 安装redis

1.下载 redis源码包

2.修改端口63920，数据持久化目录： /data/redis/${redis_port}

3.默认密码：q7N3swPfFfsdfs4fyPBqN4Zd1

```
wget https://gitee.com/funet8/centos6_LANP_dockerfile/raw/master/shell/CentOS7.x_Redis_install.sh
修改redis密码
sh CentOS7.x_Redis_install.sh
```



## 安装Docker

脚本说明

1.yum安装 docker

2.修改docker镜像默认存储位置 /data/docker/images

3.中国官方镜像加速

```
wget https://gitee.com/funet8/centos6_LANP_dockerfile/raw/master/shell/CentOS6_7_intall_docker.sh
sh CentOS6_7_intall_docker.sh
```



