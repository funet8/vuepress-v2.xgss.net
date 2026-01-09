# 如何将堡塔云WAF备份、迁移到新的服务器



使用了一段时间的堡塔云WAF，觉得免费版的还是不错的，但是一直在单机运行，没有备份就没有安全感！

今天，星哥就结合实际案例，带你走一遍低风险的 WAF 备份流程，确保你在操作中既有底又高效。



## 需求分析

1.需要将生产环境的堡塔WAF备份

2.将备份文件拷贝到另外一台服务器中

3.恢复备份文件，实现备份+迁移堡塔WAF的工作。

官方的参考文档：

```
https://www.kancloud.cn/kern123/cloudwaf/3209672
```

问题在于需要停机备份

```
停止WAF：btw stop
```

在线服务一秒钟都无法停机，所以现在需要做个不停机、自动的备份方案。

实际操作中可以不停机，数据不会丢失。



## 服务器环境

两台服务器A 和B 

A作为源服务器，将文件和数据库打包备份。

B作为目标服务器，将备份文件恢复到此服务器中。

```
A的IP ： 192.168.1.3
B的IP ： 192.168.1.2
```

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755160031884.png?tx)

### 打包备份

在A服务器中操作

```
cd /www/ && tar -zcvf cloud_waf.tar.gz cloud_waf

ll -h
total 97M
drwxr-xr-x 7 root root 4.0K Aug  5 17:43 cloud_waf
-rw-r--r-- 1 root root  97M Aug 13 18:11 cloud_waf.tar.gz
```



### 下载备份文件 cloud_waf.tar.gz

可以使用 Xftp、Winscp 等工具下载到本地电脑中，然后再上传到新的服务器到 /root 目录

```
scp cloud_waf.tar.gz root@B服务器IP:/root/
```



## 目标服务器需要做的步骤

### 解压

```
tar -zxf cloud_waf.tar.gz
cd cloud_waf
# 查看备份文件
ll
total 5612
-rw-r--r-- 1 root root   65137 Jul 29 17:52 btw.init
-rw-r--r-- 1 root root     347 Jul 29 17:52 btw.service
-rw-r--r-- 1 root root   54595 Jul 29 17:52 cloudwaf_check.sh
drwxr-xr-x 8 root root     155 Aug  4 10:41 console
-rw-r--r-- 1 root root   65575 Jul 29 17:52 master_btw.init
-rw-r--r-- 1 root root   55090 Jul 29 17:52 master_cloudwaf_check.sh
drwxr-xr-x 5 root root      38 Jul 24 14:02 mysql
drwxr-xr-x 5 root root      41 Jul 24 14:02 nginx
-rw-r--r-- 1 root root   65908 Jul 29 17:52 slave_btw.init
-rw-r--r-- 1 root root   42877 Jul 29 17:52 slave_cloudwaf_check.sh
-rw-r--r-- 1 root root 4521218 Jul 29 17:52 submit.gz
drwxr-xr-x 7 root root      92 May 26 15:55 vhost
-rw-r--r-- 1 root root  853792 Jul 29 17:52 waf-acme_sh.zip
drwxr-xr-x 8 root root     138 Aug 13 16:52 wwwroot
```



### 建立目录与恢复mysql数据

```
mkdir -pv /www/cloud_waf/nginx/conf.d/waf/

\cp -arpf /root/cloud_waf/nginx/conf.d/waf/mysql_default.pl /www/cloud_waf/nginx/conf.d/waf/mysql_default.pl

mv /root/cloud_waf/mysql /www/cloud_waf/mysql
```

### 在目标服务器中安装宝塔云WAF

```
URL=https://download.bt.cn/cloudwaf/scripts/install_cloudwaf.sh && if [ -f /usr/bin/curl ];then curl -sSO "$URL" ;else wget -O install_cloudwaf.sh "$URL";fi;bash install_cloudwaf.sh
```

注意：这里请忽略显示的登录信息，因为下面会将源服务器的云WAF数据恢复到目标服务器中。

安装成功

![image-20250814145906941](https://imgoss.xgss.net/picgo-tx2025/image-20250814145906941.png?tx)



### 安装成功后，等待5秒，停止云WAF

```
sleep 5 && btw stop
```

### 等待5秒后，恢复旧云WAF的数据

```
sleep 5 && \cp -arpf /root/cloud_waf/* /www/cloud_waf
```

注意：查看是否有错误

### 启动云WAF

```
btw start

显示：
btw start
Starting cloudwaf_nginx...  done
Starting cloudwaf_mysql...  done
Starting ipfilter...    done
Starting bt-cloudwaf... done
```

## 验证是否成功

请使用旧的云WAF帐号与密码进行登录，如果忘记了可以使用 btw 10 命令重置密码

![image-20250814155442628](https://imgoss.xgss.net/picgo-tx2025/image-20250814155442628.png?tx)



## 检查云WAF功能是否正常？

如何检查：可以检查旧的云WAF有数据的界面，比如

首页概览
拦截日志
操作日志
网站列表

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755158533140.png?tx)

显示有数据，则迁移正常。

# 宝塔云的mysql密码

一开始备份想要做文件和mysql数据库的分开备份，就要知道mysql的密码，查找了很久终于找到了

### 查找mysql密码

```
cd /www/cloud_waf
vi ./cloudwaf_check.sh

check_database=$(docker exec -i $MYSQL_NAME mysql -u root -p"$MYSQL_PASS" -e " SHOW DATABASES LIKE 'btwaf';" 2>&1 )
找到MYSQL_PASS的关键字
MYSQL_PASS="$PASS_config"
```

PASS_config又是什么，搜索一下

```

PASS_config=$(cat $setup_path/nginx/conf.d/waf/config/config.json | sed -nE 's/.*"password":\s*"([^"]*)".*/\1/p')
把  $setup_path 改成服务器路径：

PASS_config=$(cat /www/cloud_waf/nginx/conf.d/waf/config/config.json | sed -nE 's/.*"password":\s*"([^"]*)".*/\1/p')

[root@node2 cloud_waf]# echo $PASS_config
e7ddd5e2XXXXXXXXXXX (就是mysql的密码)

```



### 登录mysql

试着登录一下mysql，进入容器登录mysql

```
[root@node2 cloud_waf]# docker exec -it cloudwaf_mysql /bin/bash
bash-4.4# 
bash-4.4# 
bash-4.4# mysql -p
输入刚才的密码
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 389132
Server version: 8.1.0 MySQL Community Server - GPL

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
```



### 新增一个远程mysql账号

使用以下命令：

创建管理员账号(密码要尽量设置复杂，我是本地测试的所以设置 123456)：

```
CREATE USER 'star'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
```

授予管理员权限：

```
GRANT ALL PRIVILEGES ON *.* TO 'star'@'%' WITH GRANT OPTION;
```

刷新权限：

```
FLUSH PRIVILEGES;
```

![image-20250815095920171](https://imgoss.xgss.net/picgo-tx2025/image-20250815095920171.png?tx)

验证一下是否可以远程登录

```
mysql -u'star' -h'192.168.1.2' -P'33060' -p'123456'
ERROR 2002 (HY000): Can't connect to MySQL server on '192.168.1.2' (115)
```

居然远程报错,把防火墙放开

```
firewall-cmd --zone=public --add-port=33060/tcp --permanent
firewall-cmd --reload

[root@node2 cloud_waf]# iptables -L -n|grep 3306
ACCEPT     tcp  --  0.0.0.0/0            172.17.0.2           tcp dpt:3306
ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0            tcp dpt:33060 ctstate NEW,UNTRACKED
```

端口已放开，还是不能远程连接mysql。

端口也放开了、重启了mysql才可以远程连接mysql了

```
systemctl restart docker
```

![image-20250815102132314](https://imgoss.xgss.net/picgo-tx2025/image-20250815102132314.png?tx)

再就可以使用mysqldump等数据库备份工具备份数据库。

用Navicat查看数据表：

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755224592760.png?tx)

端口放开33060，生产环境要慎用，密码一定要复杂的！



## 最后

堡塔云 WAF 迁移并不复杂，但细节决定成败。提前备份、环境一致是稳妥迁移的三大关键。照着星哥这套流程执行，也能胸有成竹。



