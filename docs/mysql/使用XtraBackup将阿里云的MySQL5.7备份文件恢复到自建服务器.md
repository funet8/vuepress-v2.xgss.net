# 使用XtraBackup将阿里云的MySQL5.7备份文件恢复到自建服务器



最近有个任务是需要把阿里云rds数据库备份再转移到ecs服务器中，本篇文章是通过官方网站上再结合自己的操作笔记备忘。

RDS数据库的版本是 myql5.7，ECS服务器上的版本是mysql5.7

![image-20221130155249636](https://imgoss.xgss.net/picgo/image-20221130155249636.png?aliyun)

# 一、备份前的准备

## 1.ECS安装mysql5.7

如果安装了，请忽略。

```
Centos7系统下编译安装Mysql5.7
# wget https://gitee.com/funet8/MYSQL/raw/master/Mysql_Shell/CentOS7_Install_mysql5_7.sh
# sh CentOS7_Install_mysql5_7.sh
```



## 2.ECS安装Percona XtraBackup

对于MySQL 5.7、5.6或5.5实例：安装[Percona XtraBackup 2.4](https://docs.percona.com/percona-xtrabackup/2.4/installation/apt_repo.html?spm=a2c4g.11186623.0.0.6e0077b8JxzrRj)。

对于MySQL 8.0实例，安装 [Percona XtraBackup 8.0](https://docs.percona.com/percona-xtrabackup/8.0/installation/apt_repo.html)。

我这边安装Percona XtraBackup 2.4 [参考网站](https://docs.percona.com/percona-xtrabackup/2.4/installation/yum_repo.html)：https://docs.percona.com/percona-xtrabackup/2.4/installation/yum_repo.html

```
安装percona-release配置工具：
root您可以通过以用户身份或使用 以下命令运行以下命令来安装 percona-release 的 yum 存储库
# yum install -y https://repo.percona.com/yum/percona-release-latest.noarch.rpm

测试存储库:
# yum list | grep percona

启用存储库：
如果Percona XtraBackup 打算与上游 MySQL 服务器结合使用，您只需要启用tools 存储库：
# percona-release enable-only tools

```

通过运行安装Percona XtraBackup

```
# yum install -y percona-xtrabackup-24

# xtrabackup -version
xtrabackup: recognized server arguments: --datadir=/var/lib/mysql 
xtrabackup version 2.4.26 based on MySQL server 5.7.35 Linux (x86_64) (revision id: 19de43b)
Percona XtraBackup 安装成功。
```



## 3.安装解压工具qpress

```
wget "http://docs-aliyun.cn-hangzhou.oss.aliyun-inc.com/assets/attach/183466/cn_zh/1608011575185/qpress-11-linux-x64.tar"
tar xvf qpress-11-linux-x64.tar
chmod 775 qpress
cp qpress /usr/bin
```



# 二、下载备份

进入RDS数据库--->实例列表--->备份恢复

![image-20221130112725052](https://imgoss.xgss.net/picgo/image-20221130112725052.png?aliyun)

复制内网地址，公网是需要收费的。

![image-20221130112852629](https://imgoss.xgss.net/picgo/image-20221130112852629.png?aliyun)



在Linux服务器上，执行如下命令下载物理备份。

```
# wget -c 'http://...' -O test1_qp.xb

命令：
# wget -c 'http://rdsbak-st-v2.oss-cn-shenzhen-internal.aliyuncs.com/custins34273877/hins19034500_data_20221129104523_qp.xb?Expires=******************************************************&Region=cn-shenzhen' -O test1_qp.xb

# ll -h test1_qp.xb 
-rw-r--r-- 1 root root 8.7G Nov 29 10:48 test1_qp.xb
```



# 二、解压和恢复备份

1.在Linux服务器上，创建一个目录（例如/home/mysql/data）用于存放解压后的文件。

```
mkdir -p /home/mysql/data
```



2.解压压缩包。根据压缩包的后缀选择解压命令。

```
## 先解包
cat test1_qp.xb | xbstream -x -v -C /home/mysql/data  【已执行】

## 然后解压
### 对于MySQL 5.6/5.7
innobackupex --decompress --remove-original /home/mysql/data 【已执行】

```

![image-20221130144623802](https://imgoss.xgss.net/picgo/image-20221130144623802.png?aliyun)



说明 您可以把test1和/home/mysql/data替换为实际的文件名和路径。

3.执行如下命令，查询解压后生成的文件。

```
ls -l /home/mysql/data
```



4.执行如下命令，恢复解压好的备份文件。

```
## MySQL 5.6/5.7
innobackupex --defaults-file=/home/mysql/data/backup-my.cnf --apply-log /home/mysql/data 【已执行】
```

![image-20221130145751052](https://imgoss.xgss.net/picgo/image-20221130145751052.png?aliyun)



1.恢复时请耐心等待，若系统返回如下类似结果，则说明备份文件已成功恢复到自建数据库。

![img](https://imgoss.xgss.net/picgo/p47412.jpg?aliyun)

2.若系统返回`xtrabackup: Unknown error 3613`，请将Percona XtraBackup更新到最新版本后再次尝试。



3.若系统返回如下报错，可以用`rm -rf /var/lib/mysql`命令清空文件夹内文件，然后用`chown -R mysql:mysql /var/lib/mysql`修改权限。

![img](https://imgoss.xgss.net/picgo/p187242.png?aliyun)



4.若系统返回如下报错，请参见[前提条件](https://help.aliyun.com/document_detail/41817.html?spm=5176.19908310.help.dexternal.6fbe1450ernae5#section-ooe-3fz-r97)中的第2项说明。

![恢复失败](https://imgoss.xgss.net/picgo/p298939.png?aliyun)



# 三、启动MySQL

1.为避免版本问题，需修改backup-my.cnf文件，具体操作步骤如下。

 执行如下命令，以文本方式编辑backup-my.cnf文件。

```
# vi /home/mysql/data/backup-my.cnf
添加如下参数：
lower_case_table_names=1
port = 61922
datadir=/home/mysql/data
        
注释掉如下自建数据库不支持的参数：

#innodb_log_checksum_algorithm
#innodb_fast_checksum
#innodb_log_block_size
#innodb_doublewrite_file
#innodb_encrypt_algorithm
#rds_encrypt_data
#redo_log_version
#master_key_id
#server_uuid
```

说明 如果自建数据库使用的是MyISAM引擎，无法兼容阿里云的InnoDB，则需要多注释掉如下参数并增加skip-grant-tables参数：

```
#innodb_log_checksum_algorithm=strict_crc32
#redo_log_version=1
skip-grant-tables
```

按Esc键，然后输入:wq并回车进行保存。

2.执行如下命令，修改文件属主，并确定文件所属为MySQL用户。

```
chown -R mysql:mysql /home/mysql/data

执行如下命令，启动MySQL进程。
mysqld --defaults-file=/home/mysql/data/backup-my.cnf --user=mysql --datadir=/home/mysql/data &

关闭本地的mysql否则会报错
[ERROR] Another process with pid 27300 is using unix socket file.


# netstat -tunpl|grep mysql
tcp6       0      0 :::61922                :::*                    LISTEN      9366/mysqld    
恢复成功。
```

![image-20221130150908531](https://imgoss.xgss.net/picgo/image-20221130150908531.png?aliyun)

root密码问题：

- 如果您的实例版本为MySQL 5.5或5.6，需要重置root密码方可正常使用。更多信息，请参见[官方文档](https://dev.mysql.com/doc/refman/8.0/en/resetting-permissions.html)。
- 如果您的实例版本为MySQL 5.7或8.0，则root密码即自建库的root密码。

- 如果启动MySQL进程报错，可以尝试修改存储引擎。更多信息，请参见[常见问题](https://help.aliyun.com/document_detail/41817.html?spm=5176.19908310.help.dexternal.6fbe1450ernae5#section-ohm-rf7-3mx)。

  

登录MySQL数据库以验证进程启动成功

```
mysql -u<源RDS实例账号> -p<对应密码>

# mysql -u<源RDS实例账号> -h127.0.0.1 -P 61922 -p<对应密码>

mysql -uxshd_mysql -h127.0.0.1 -P 61922 -p
```

进入数据库：

![image-20221130151418406](https://imgoss.xgss.net/picgo/image-20221130151418406.png?aliyun)



# 通过binlog日志恢复数据

1.下载binlog日志

```
wget -c 'URL路径' -O /data/tmp/binlog/mysql-bin1
```

2.导入数据库

```
mysqlbinlog  -d 指定数据库
mysql -f 忽略报错，强制导入
mysqlbinlog  -d '指定数据库'  /data/tmp/binlog/mysql-bin1 | mysql -u root -P61922 -f
```

# 参考文档

官方帮助文档：[阿里云-RDS MySQL物理备份文件恢复到自建数据库](https://help.aliyun.com/knowledge_detail/41817.html) https://help.aliyun.com/knowledge_detail/41817.html











