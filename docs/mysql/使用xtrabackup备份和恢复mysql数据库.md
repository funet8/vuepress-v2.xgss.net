# 使用xtrabackup备份和恢复mysql数据库

## mysqldump

一种逻辑备份方式，将数据转换成sql文件，其最大的缺陷就是备份和恢复时间很长，对于一个小于10G的数据库而言，这个速度还是可以接受的，但是如果数据库较大，那在使用mysqldump备份就非常不合适了。

## lvm

是一种采用逻辑卷快照功能对数据进行备份，可以实现几乎热备，但是备份过程较为复杂(来回切换终端)，很难用shell脚本直接实现，不过现在似乎有个工具mylvmbackup可以实现自动化备份，但是没有尝试过。

## Xtrabackup

对MyISAM表只能实现温备，并且不支持增量备份，所以每次对MyISAM表备份都是全备。

XtraBackup更多高级特性通常只能在innodb存储引擎上实现，而且高级特性还都依赖于mysql数据库对innodb引擎实现了单独表空间，否则没办法实现单表或单库导出



那么今天就和大家聊聊第三款开源备份工具xtrabackup：

官方站点：http://www.percona.com

官方在线文档：http://www.percona.com/doc/percona-xtrabackup/2.2/

最新软件包下载地址：http://www.percona.com/downloads/XtraBackup/

```
mysql> show global variables like '%innodb_file_per_table%';

+-----------------------+-------+
| Variable_name         | Value |
+-----------------------+-------+
| innodb_file_per_table | ON    |
+-----------------------+-------+
```



## 系统说明

系统：CentOS release 6.7
数据库： 10.0.25-MariaDB
数据库目录： /var/lib/mysql --软连接--> /data/mysql
备份目录：/backup/

# 二、安装

XtraBackup本篇文章采用yum安装方式

## 1、yum安装

```
# wget http://www.percona.com/downloads/XtraBackup/XtraBackup-2.2.9/binary/redhat/6/x86_64/percona-xtrabackup-2.2.9-5067.el6.x86_64.rpm
# rpm -ivh percona-xtrabackup-2.2.9-5067.el6.x86_64.rpm
warning: percona-xtrabackup-2.2.9-5067.el6.x86_64.rpm: Header V4 DSA/SHA1 Signature, key ID cd2efd2a: NOKEY
error: Failed dependencies:
        perl(DBD::mysql) is needed by percona-xtrabackup-2.2.9-5067.el6.x86_64
        perl(Time::HiRes) is needed by percona-xtrabackup-2.2.9-5067.el6.x86_64
# yum -y install perl-Time-HiRes perl-DBD-MySQL perl-IO-Socket-SSL
```



## 2、查看Xtrabackup安装的工具

```
# rpm -ql percona-xtrabackup |grep bin
/usr/bin/innobackupex
/usr/bin/xbcrypt
/usr/bin/xbstream
/usr/bin/xtrabackup
```



## 3、XtraBackup中主要包含了三个工具

xbsteam 支持流式备份
xtrbackup 用于热备innodb、xtradb表中数据的工具，不能备份其它类型的表，也不能备份数据表结构
innobackupex 是将xtrabackup进行封装的perl脚本，提供了备份MyISAM表的能力

# 三、innobackupex几个非常重要的参数

--apply-log
一般情况下，在备份完成后，数据尚且不能用于恢复操作，因为备份的数据中可能会包含尚未提交的事务或已经提交但尚未同步至数据文件中的事务。因此，此时数据文件仍处理不一致状态。“准备”的主要作用正是通过回滚未提交的事务及同步已经提交的事务至数据文件也使得数据文件处于一致性状态。


--redo-only
准备(prepare)增量备份与整理完全备份有着一些不同，尤其要注意的是：
(1)需要在每个备份(包括完全和各个增量备份)上，将已经提交的事务进行“重放”。“重放”之后，所有的备份数据将合并到完全备份上。
(2)基于所有的备份将未提交的事务进行“回滚”。

--copy-back
该选项用于执行恢复(还原)操作，其通过复制所有数据相关的文件至mysql服务器DATADIR目录中来执行恢复过程。innobackupex通过backup-my.cnf来获取DATADIR目录的相关信息。

# 四、innobackup备份语法



## 1.完全备份+完全恢复

```
完全备份
# innobackupex --user=DBUSER --password=DBUSERPASS  /path/to/BACKUP-DIR/
innobackupex --user=root --password=123456  /backup
准备一个完全备份
innobackupex --apply-log  /path/to/BACKUP-DIR

从一个完全备份中恢复数据
# innobackupex --copy-back /path/to/BACKUP-DIR
innobackupex --copy-back /backup

修改datadir目录权限
# chown -R  mysql:mysql  /mydata/data/

innobackupex --defaults-file=/etc/my.cnf --user=root  --copy-back /backup/2016-07-07_14-32-33/
恢复操作出现错误
innobackupex: Error: no 'datadir' option in group 'mysqld' in server configuration file '/etc/my.cnf' at /usr/bin/innobackupex line 4506.
解决办法：
vi /etc/my.cnf 在[mysqld]选项下面添加：
datadir                = /data/mysql
出现错误：
innobackupex: Error: Original data directory '/data/mysql' is not empty! at /usr/bin/innobackupex line 2194.
```



## 2.完全备份+增量备份+完全恢复

```
完全备份：
# innobackupex --user=DBUSER --password=DBUSERPASS  /path/to/BACKUP-DIR/

第一次增量备份
# innobackupex --user=DBUSER --password=DBUSERPASS --incremental /backup --incremental-basedir=BASEDIR

第二次增量备份
# innobackupex --user=DBUSER --password=DBUSERPASS --incremental /backup --incremental-basedir=BASEDIR

准备：
执行完全备份redo

# innobackupex --apply-log --redo-only BASE-DIR
执行第一次增量备份redo

# innobackupex --apply-log --redo-only BASE-DIR --incremental-dir=INCREMENTAL-DIR-1

执行第二次增量备份redo

# innobackupex --apply-log --redo-only BASE-DIR --incremental-dir=INCREMENTAL-DIR-2

还原：

# innobackupex --copy-back BASE-DIR

解释：
其中BASE-DIR指的是完全备份所在的目录，
而INCREMENTAL-DIR-1指的是第一次增量备份的目录，
INCREMENTAL-DIR-2指的是第二次增量备份的目录，
其它依次类推，即如果有多次增量备份，每一次都要执行如上操作；

```







# 五、以上两种方式案列重放

## 1.完全备份+完全恢复



### 1、实验前的准备工作

```
# service mysqld stop
# rm -rf /mydata/data/*	
# /usr/local/mysql/scripts/mysql_install_db --user=mysql --datadir=/mydata/data/ --basedir=/usr/local/mysql/
# service mysqld start
# mysqladmin -uroot -p password 123456
# mysql -uroot -p123456
mysql> create database jiaowu;
mysql> use jiaowu;
mysql> set sql_log_bin = 0;
mysql> source /root/tutor.sql;    //导入tutor数据表
mysql> set sql_log_bin = 1;
mysql> select * from tutor;
+------+---------------+--------+------+
| TID  | Tname         | Gender | Age  |
+------+---------------+--------+------+
|    1 | ZhengYansheng | M      |   25 |
|    2 | LiJian        | M      |   26 |
|    3 | OuYangyu      | M      |   27 |
|    4 | LuoChenghui   | M      |   25 |
|    5 | LiuYunbo      | M      |   25 |
|    6 | FuJian        | M      |   24 |
|    7 | LiMenglu      | F      |   23 |
|    8 | BaoYintu      | M      |   28 |
|    9 | WangYana      | F      |   25 |
+------+---------------+--------+------+
9 rows in set (0.00 sec)
```



### 2、innobackupex对DB进行完全备份

```
# innobackupex --user=root --password=123456 /backup/

如果执行正确，其最后输出的几行信息通常如下：
innobackupex: Backup created in directory '/backup/2015-03-18_21-00-17'
innobackupex: MySQL binlog position: filename 'mysql-bin.000003', position 332
150318 21:00:23  innobackupex: Connection to database server closed
150318 21:00:23  innobackupex: completed OK!
```

### 3、查看备份目录和文件

```
# ls /backup/
2015-03-18_21-00-17
# ls /backup/2015-03-18_21-00-17/
backup-my.cnf  jiaowu  performance_schema  xtrabackup_binlog_info  xtrabackup_info
ibdata1        mysql   test                xtrabackup_checkpoints  xtrabackup_logfile
```

### 4、准备一个完全备份

```
# innobackupex --user=root --password=123456 --apply-log /backup/2015-03-18_21-00-17/
```

### 5、这里还是采用老方法直接删除所有的数据文件

```
# service mysqld stop
# rm -rf /mydata/data/*
```

### 6、从一个完全备份中恢复数据库

```
innobackupex --copy-back /backup/2015-03-18_21-00-17/
```

### 7、修改数据目录权限

```
# chown -R mysql.mysql /mydata/data/
```

### 8、启动mysqld服务

```
service mysqld start
```

### 9、登陆mysql查看是否是否一致

```
# mysql -e 'use jiaowu;select * from tutor;'
+------+---------------+--------+------+
| TID  | Tname         | Gender | Age  |
+------+---------------+--------+------+
|    1 | ZhengYansheng | M      |   25 |
|    2 | LiJian        | M      |   26 |
|    3 | OuYangyu      | M      |   27 |
|    4 | LuoChenghui   | M      |   25 |
|    5 | LiuYunbo      | M      |   25 |
|    6 | FuJian        | M      |   24 |
|    7 | LiMenglu      | F      |   23 |
|    8 | BaoYintu      | M      |   28 |
|    9 | WangYana      | F      |   25 |
+------+---------------+--------+------+

```

数据已经成功恢复到数据库当中



## 2.完全备份+增量备份+完全恢复

```
1、实验前的准备工作
# service mysqld stop
# rm -rf /mydata/data/*     //删除原来的备份文件
# rm -rf /backup/*
# /usr/local/mysql/scripts/mysql_install_db --user=mysql --datadir=/mydata/data/ --basedir=/usr/local/mysql/
# service mysqld start
# mysqladmin -uroot -p password 123456
# mysql -uroot -p123456
mysql> create database jiaowu;
mysql> use jiaowu;
mysql> set sql_log_bin = 0;
mysql> source /root/tutor.sql;   //导入tutor数据表
mysql> set sql_log_bin = 1;
mysql> select * from tutor;
+------+---------------+--------+------+
| TID  | Tname         | Gender | Age  |
+------+---------------+--------+------+
|    1 | ZhengYansheng | M      |   25 |
|    2 | LiJian        | M      |   26 |
|    3 | OuYangyu      | M      |   27 |
|    4 | LuoChenghui   | M      |   25 |
|    5 | LiuYunbo      | M      |   25 |
|    6 | FuJian        | M      |   24 |
|    7 | LiMenglu      | F      |   23 |
|    8 | BaoYintu      | M      |   28 |
|    9 | WangYana      | F      |   25 |
+------+---------------+--------+------+
9 rows in set (0.00 sec)

2、innobackupex对DB进行完全备份
# innobackupex --user=root --password=123456 /backup/
如果执行正确，其最后输出的几行信息通常如下：
innobackupex: Backup created in directory '/backup/2015-03-18_21-14-49'
innobackupex: MySQL binlog position: filename 'mysql-bin.000003', position 332
150318 21:14:54  innobackupex: Connection to database server closed
150318 21:14:54  innobackupex: completed OK!

3、仅查看备份目录
# ls /backup/
2015-03-18_21-14-49

4、操作数据库并插入数据
# mysql jiaowu;
mysql> insert into tutor(TID) values(11);
mysql> insert into tutor(TID) values(12);
mysql> insert into tutor(TID) values(13);
mysql> select * from tutor;
+------+---------------+--------+------+
| TID  | Tname         | Gender | Age  |
+------+---------------+--------+------+
|    1 | ZhengYansheng | M      |   25 |
|    2 | LiJian        | M      |   26 |
|    3 | OuYangyu      | M      |   27 |
|    4 | LuoChenghui   | M      |   25 |
|    5 | LiuYunbo      | M      |   25 |
|    6 | FuJian        | M      |   24 |
|    7 | LiMenglu      | F      |   23 |
|    8 | BaoYintu      | M      |   28 |
|    9 | WangYana      | F      |   25 |
|   11 | NULL          | NULL   | NULL |
|   12 | NULL          | NULL   | NULL |
|   13 | NULL          | NULL   | NULL |
+------+---------------+--------+------+
12 rows in set (0.00 sec)

5、执行第一次增量备份并查看备份目录
# innobackupex --user=root --password=123456 --incremental /backup/ --incremental-basedir=/backup/2015-03-18_21-14-49/
# ls /backup/
2015-03-18_21-14-49  2015-03-18_21-18-45

6、再次操作数据库并插入多条数据
# mysql jiaowu;
mysql> insert into tutor(TID) values(21);
mysql> insert into tutor(TID) values(22);
mysql> insert into tutor(TID) values(23);
mysql> select * from tutor;
+------+---------------+--------+------+
| TID  | Tname         | Gender | Age  |
+------+---------------+--------+------+
|    1 | ZhengYansheng | M      |   25 |
|    2 | LiJian        | M      |   26 |
|    3 | OuYangyu      | M      |   27 |
|    4 | LuoChenghui   | M      |   25 |
|    5 | LiuYunbo      | M      |   25 |
|    6 | FuJian        | M      |   24 |
|    7 | LiMenglu      | F      |   23 |
|    8 | BaoYintu      | M      |   28 |
|    9 | WangYana      | F      |   25 |
|   11 | NULL          | NULL   | NULL |
|   12 | NULL          | NULL   | NULL |
|   13 | NULL          | NULL   | NULL |
|   21 | NULL          | NULL   | NULL |
|   22 | NULL          | NULL   | NULL |
|   23 | NULL          | NULL   | NULL |
+------+---------------+--------+------+
15 rows in set (0.00 sec)

7、执行第二次增量备份并查看备份文件
# innobackupex --user=root --password=123456 --incremental /backup/ --incremental-basedir=/backup/2015-03-18_21-18-45/
# ls /backup/
2015-03-18_21-14-49  2015-03-18_21-18-45  2015-03-18_21-22-31

解释：
2015-03-18_21-14-49：为innobackupex的完全备份目录
2015-03-18_21-18-45：为innobackupex的第一次增量备份目录
2015-03-18_21-22-31：为innobackupex的第二次增量备份目录

8、开始准备innobackupex
首先执行完全备份redo-only
# innobackupex --user=root --password=123456 --apply-log --redo-only /backup/2015-03-18_21-14-49/
执行第一个增量备份redo-only
# innobackupex --user=root --password=123456 --apply-log --redo-only /backup/2015-03-18_21-14-49/ --incremental-dir=/backup/2015-03-18_21-18-45/
执行第二个增量备份redo-only
# innobackupex --user=root --password=123456 --apply-log --redo-only /backup/2015-03-18_21-14-49/ --incremental-dir=/backup/2015-03-18_21-22-31/

#####模拟数据库故障#####
9、这里还是采用老方法直接删除所有的数据文件
# service mysqld stop
# rm -rf /mydata/data/*

10、从完全备份中恢复数据库
# innobackupex --user=root --password=123456 --copy-back /backup/2015-03-18_21-14-49/

11、修改数据目录权限
# chown -R mysql.mysql /mydata/data/
 
12、启动mysqld服务
# service mysqld start
 
13、登陆mysql查看是否是否一致
# mysql -e 'use jiaowu;select * from tutor;'
+------+---------------+--------+------+
| TID  | Tname         | Gender | Age  |
+------+---------------+--------+------+
|    1 | ZhengYansheng | M      |   25 |
|    2 | LiJian        | M      |   26 |
|    3 | OuYangyu      | M      |   27 |
|    4 | LuoChenghui   | M      |   25 |
|    5 | LiuYunbo      | M      |   25 |
|    6 | FuJian        | M      |   24 |
|    7 | LiMenglu      | F      |   23 |
|    8 | BaoYintu      | M      |   28 |
|    9 | WangYana      | F      |   25 |
|   11 | NULL          | NULL   | NULL |
|   12 | NULL          | NULL   | NULL |
|   13 | NULL          | NULL   | NULL |
|   21 | NULL          | NULL   | NULL |
|   22 | NULL          | NULL   | NULL |
|   23 | NULL          | NULL   | NULL |
+------+---------------+--------+------+

#两次增量添加的数据也已经成功添加到数据库当中。恢复成功
```







# 六、Xtrabackup的高级功能

## 流式压缩功能

Xtrabackup对备份的数据文件支持“流”功能，即可以将备份的数据通过STDOUT传输给tar程序进行归档，而不是默认的直接保存至某备份目录中。要使用此功能，仅需要使用--stream选项即可。如：

```
# innobackupex --user=root --password=123456 --stream=tar  /backup | gzip > /backup/`date +%F_%H-%M-%S`.tar.gz
```



甚至也可以使用类似如下命令将数据备份至其它服务器：强烈推荐这种方式

```
innobackupex --user=root --password=123456 --stream=tar  /backup | ssh root@192.168.1.100  'cat - > /backup/`date +%F_%H-%M-%S`.tar'
```



在执行本地备份时，还可以使用--parallel选项对多个文件进行并行复制（暂时还没有看懂此选项）

```
此外，在执行本地备份时，还可以使用--parallel选项对多个文件进行并行复制。此选项用于指定在复制时启动的线程数目。当然，在实际进行备份时要利用此功能的便利性，也需要启用innodb_file_per_table选项或共享的表空间通过innodb_data_file_path选项存储在多个ibdata文件中。对某一数据库的多个文件的复制无法利用到此功能。其简单使用方法如下：

# innobackupex --parallel  /path/to/backup

同时，innobackupex备份的数据文件也可以存储至远程主机，这可以使用--remote-host选项来实现：

# innobackupex --remote-host=root@www.magedu.com  /path/IN/REMOTE/HOST/to/backup
```

# 七、使用Xtrabackup对数据库进行部分备份

Xtrabackup也可以实现部分备份，即只备份某个或某些指定的数据库或某数据库中的某个或某些表。但要使用此功能，必须启用innodb_file_per_table选项，即每张表保存为一个独立的文件。同时，其也不支持--stream选项，即不支持将数据通过管道传输给其它程序进行处理。



此外，还原部分备份跟还原全部数据的备份也有所不同，即你不能通过简单地将prepared的部分备份使用--copy-back选项直接复制回数据目录，而是要通过导入表的方向来实现还原。当然，有些情况下，部分备份也可以直接通过--copy-back进行还原，但这种方式还原而来的数据多数会产生数据不一致的问题，因此，无论如何不推荐使用这种方式。



### 1)创建部分备份

创建部分备份的方式有三种：

正则表达式(--include)

枚举表文件(--tables-file)

列出要备份的数据库(--databases)。

```
(a)使用--include
使用--include时，要求为其指定要备份的表的完整名称，即形如databasename.tablename，如：
# innobackupex --include='^mageedu[.]tb1'  /path/to/backup

(b)使用--tables-file
此选项的参数需要是一个文件名，此文件中每行包含一个要备份的表的完整名称；如：
# echo -e 'mageedu.tb1\nmageedu.tb2' > /tmp/tables.txt
# innobackupex --tables-file=/tmp/tables.txt  /path/to/backup

(c)使用--databases
此选项接受的参数为数据名，如果要指定多个数据库，彼此间需要以空格隔开；同时，在指定某数据库时，也可以只指定其中的某张表。此外，此选项也可以接受一个文件为参数，文件中每一行为一个要备份的对象。如：
# innobackupex --databases="mageedu testdb"  /path/to/backup
```

### 2)整理(preparing)部分备份

```
prepare部分备份的过程类似于导出表的过程，要使用--export选项进行：
# innobackupex --apply-log --export  /pat/to/partial/backup
```

此命令执行过程中，innobackupex会调用xtrabackup命令从数据字典中移除缺失的表，因此，会显示出许多关于“表不存在”类的警告信息。同时，也会显示出为备份文件中存在的表创建.exp文件的相关信息。

### 3)还原部分备份

还原部分备份的过程跟导入表的过程相同。当然，也可以通过直接复制prepared状态的备份直接至数据目录中实现还原，不要此时要求数据目录处于一致状态。

案列演示：

对jiaowu数据库进行备份和还原

```
1、查看数据库和表
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| jiaowu             |
| mysql              |
| performance_schema |
| test               |
+--------------------+
5 rows in set (0.00 sec)
mysql> select * from jiaowu.tutor;
+------+---------------+--------+------+
| TID  | Tname         | Gender | Age  |
+------+---------------+--------+------+
|    1 | ZhengYansheng | M      |   25 |
|    2 | LiJian        | M      |   26 |
|    3 | OuYangyu      | M      |   27 |
|    4 | LuoChenghui   | M      |   25 |
|    5 | LiuYunbo      | M      |   25 |
|    6 | FuJian        | M      |   24 |
|    7 | LiMenglu      | F      |   23 |
|    8 | BaoYintu      | M      |   28 |
|    9 | WangYana      | F      |   25 |
|   11 | NULL          | NULL   | NULL |
|   12 | NULL          | NULL   | NULL |
|   13 | NULL          | NULL   | NULL |
|   21 | NULL          | NULL   | NULL |
|   22 | NULL          | NULL   | NULL |
|   23 | NULL          | NULL   | NULL |
+------+---------------+--------+------+

2、innobackupex进行备份
# innobackupex --user=root --password=123456 --databases='jiaowu' /opt/

3、准备并导入jiaowu表
# innobackupex --user=root --password=123456 --apply-log --export /opt/2015-03-18_22-46-47/

4、删除jiaowu数据库
# rm -rf /mydata/data/jiaowu

5、登陆数据库查看是否还存在jiaowu数据库
[root@localhost ~]# mysql -e 'show databases;'
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| test               |
+--------------------+
#jiaowu数据库不存在了

6、还原jiaowu数据库
# cp -a /opt/2015-03-18_22-46-47/jiaowu/ /mydata/data/

7、修改jiaowu权限
# chown -R mysql.mysql /mydata/data/jiaowu

8、再次查看jiaowu数据库是否存在
[root@localhost ~]# mysql -e 'use jiaowu;show tables;'
+------------------+
| Tables_in_jiaowu |
+------------------+
| tutor            |
+------------------+

#jiaowu数据库已经被还原并且表tutor还在。成功！！！
```



# 八、导入或导出单张表

默认情况下，InnoDB表不能通过直接复制表文件的方式在mysql服务器之间进行移植，即便使用了innodb_file_per_table选项。而使用Xtrabackup工具可以实现此种功能，

不过，此时需要“导出”表的mysql服务器启用了innodb_file_per_table选项（严格来说，是要“导出”的表在其创建之前，mysql服务器就启用了innodb_file_per_table选项），

并且“导入”表的服务器同时启用了innodb_file_per_table和innodb_expand_import选项。



### 1)“导出”表

```
导出表是在备份的prepare阶段进行的，因此，一旦完全备份完成，就可以在prepare过程中通过--export选项将某表导出了：
# innobackupex --apply-log --export /path/to/backup
```

此命令会为每个innodb表的表空间创建一个以.exp结尾的文件，这些以.exp结尾的文件则可以用于导入至其它服务器。

### 2)“导入”表

```
要在mysql服务器上导入来自于其它服务器的某innodb表，需要先在当前服务器上创建一个跟原表表结构一致的表，而后才能实现将表导入：
mysql> CREATE TABLE mytable (...)  ENGINE=InnoDB;

然后将此表的表空间删除：
mysql> ALTER TABLE mydatabase.mytable  DISCARD TABLESPACE;

接下来，将来自于“导出”表的服务器的mytable表的mytable.ibd和mytable.exp文件复制到当前服务器的数据目录，然后使用如下命令将其“导入”：
mysql> ALTER TABLE mydatabase.mytable  IMPORT TABLESPACE;
```

案列演示：

```
1、查看表
mysql> use jiaowu;
Database changed
mysql> show tables;
+------------------+
| Tables_in_jiaowu |
+------------------+
| tutor            |
+------------------+
1 row in set (0.00 sec)

2、修改表的存储引擎为InnoDB
mysql> alter table tutor engine=innodb;
Query OK, 15 rows affected (0.05 sec)
Records: 15  Duplicates: 0  Warnings: 0

3、innobackupex对其进行备份
# innobackupex --user=root --password=123456 --databases='jiaowu.tutor' /opt/

4、准备并导出
# innobackupex --user=root --password=123456 --apply-log --export /opt/2015-03-18_23-05-44/

5、删除此表的表空间
mysql> ALTER TABLE jiaowu.tutor DISCARD TABLESPACE;
Query OK, 0 rows affected (0.01 sec)

mysql> use jiaowu;
Database changed
mysql> select * from tutor;        #数据已经不存在了
ERROR 1030 (HY000): Got error -1 from storage engine

6、接下来，将来自于“导出”表的服务器的mytable表的mytable.ibd和mytable.exp文件复制到当前服务器的数据目录，然后使用如下命令将其“导入”：并修改权限
# cp /opt/2015-03-18_23-24-23/jiaowu/{tutor.exp,tutor.ibd} /mydata/data/jiaowu/
cp：是否覆盖"/mydata/data/jiaowu/tutor.exp"？ yes
# chown -R mysql.mysql /mydata/data/jiaowu/*
mysql> ALTER TABLE jiaowu.tutor IMPORT TABLESPACE;
Query OK, 0 rows affected (0.00 sec)
mysql> use jiaowu;
Database changed
mysql> select * from tutor;
+------+---------------+--------+------+
| TID  | Tname         | Gender | Age  |
+------+---------------+--------+------+
|    1 | ZhengYansheng | M      |   25 |
|    2 | LiJian        | M      |   26 |
|    3 | OuYangyu      | M      |   27 |
|    4 | LuoChenghui   | M      |   25 |
|    5 | LiuYunbo      | M      |   25 |
|    6 | FuJian        | M      |   24 |
|    7 | LiMenglu      | F      |   23 |
|    8 | BaoYintu      | M      |   28 |
|    9 | WangYana      | F      |   25 |
|   11 | NULL          | NULL   | NULL |
|   12 | NULL          | NULL   | NULL |
|   13 | NULL          | NULL   | NULL |
|   21 | NULL          | NULL   | NULL |
|   22 | NULL          | NULL   | NULL |
|   23 | NULL          | NULL   | NULL |
+------+---------------+--------+------+
15 rows in set (0.00 sec)

#单表还原已经成功！结束。
```








参考：
http://467754239.blog.51cto.com/4878013/1621711

http://blog.51yip.com/mysql/1650.html
