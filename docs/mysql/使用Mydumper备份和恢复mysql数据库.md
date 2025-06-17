---
title: 使用Mydumper备份和恢复mysql数据库
createTime: 2025/05/27 17:51:17
permalink: /article/b8nhzzpv/
---
# 使用Mydumper备份和恢复mysql数据库



Mydumper 是一个高性能 MySQL 数据库备份工具，设计用于解决 mysqldump 在备份大型数据库时遇到的性能瓶颈问题。与 mysqldump 相比，

## 优势

### 并发备份

Mydumper 可以利用多个线程并行导出数据库，大幅缩短备份时间，特别是在多核 CPU 环境下。

### 最小锁定时间

Mydumper 设计用来尽可能减少对数据库的锁定时间，通过非阻塞备份来最小化对生产环境的影响。

### 导出/导入操作的优化

Mydumper 对输出的数据文件进行了优化，便于高效导入。与之配合使用的 Myloader 工具可以并发导入这些数据文件，大幅度缩短数据恢复时间。

### 灵活的备份选项

Mydumper 允许用户灵活选择备份哪些数据库或表，支持各种过滤选项，满足不同的备份需求。

### 更好的压缩和分块

 Mydumper 支持输出文件的压缩，也支持按文件大小对输出文件进行分块，便于管理和传输。

### 易于使用

相比 mysqldump，Mydumper 提供了更多易于使用的选项和更好的性能，使其成为大型数据库环境下的备选备份工具。



Mydumper 如此强大，使其在需要快速、高效备份 MySQL 数据库的场景中，成为了首选工具。尤其适合于大规模数据库的备份和恢复工作。

## Mydumper主要特性

1.轻量级C语言写的
2.多线程备份，备份后会生成多个备份文件
3.事务性和非事务性表一致的快照(适用于0.2.2以上版本)
4.快速的文件压缩
5.支持导出binlog
6.多线程恢复(适用于0.2.1以上版本)
7.以守护进程的工作方式，定时快照和连续二进制日志(适用于0.5.0以上版本)
8.开源 (GNU GPLv3)

开源地址： https://github.com/mydumper/mydumper

## 安装Mydumper

系统： centos7



```
# yum -y  install glib2-devel mysql-devel zlib-devel pcre-devel zlib gcc-c++ gcc cmake


# cd /data/software/
# wget https://launchpad.net/mydumper/0.9/0.9.1/+download/mydumper-0.9.1.tar.gz
# tar zxf mydumper-0.9.1.tar.gz
# cd mydumper-0.9.1/
# cmake .
# make && make install

安装完成后生成两个二进制文件mydumper和myloader位于/usr/local/bin目录下

# ls /usr/local/bin/my*
/usr/local/bin/mydumper  /usr/local/bin/myloader
```

### 安装完成

```
mydumper --help
myloader --help
```



### mydumper 参数解释

```
-B, --database              要备份的数据库，不指定则备份所有库
-T, --tables-list           需要备份的表，名字用逗号隔开
-o, --outputdir             备份文件输出的目录
-s, --statement-size        生成的insert语句的字节数，默认1000000
-r, --rows                  将表按行分块时，指定的块行数，指定这个选项会关闭 --chunk-filesize
-F, --chunk-filesize        将表按大小分块时，指定的块大小，单位是 MB
-c, --compress              压缩输出文件
-e, --build-empty-files     如果表数据是空，还是产生一个空文件（默认无数据则只有表结构文件）
-x, --regex                 是同正则表达式匹配 'db.table'
-i, --ignore-engines        忽略的存储引擎，用都厚分割
-m, --no-schemas            不备份表结构
-k, --no-locks              不使用临时共享只读锁，使用这个选项会造成数据不一致
--less-locking              减少对InnoDB表的锁施加时间（这种模式的机制下文详解）
-l, --long-query-guard      设定阻塞备份的长查询超时时间，单位是秒，默认是60秒（超时后默认mydumper将会退出）
--kill-long-queries         杀掉长查询 (不退出)
-b, --binlogs               导出binlog
-D, --daemon                启用守护进程模式，守护进程模式以某个间隔不间断对数据库进行备份
-I, --snapshot-interval     dump快照间隔时间，默认60s，需要在daemon模式下
-L, --logfile               使用的日志文件名(mydumper所产生的日志), 默认使用标准输出
--tz-utc                    跨时区是使用的选项，不解释了
--skip-tz-utc               同上
--use-savepoints            使用savepoints来减少采集metadata所造成的锁时间，需要 SUPER 权限
--success-on-1146           Not increment error count and Warning instead of Critical in case of table doesn't exist
-h, --host                  连接的主机名
-u, --user                  备份所使用的用户
-p, --password              密码
-P, --port                  端口
-S, --socket                使用socket通信时的socket文件
-t, --threads               开启的备份线程数，默认是4
-C, --compress-protocol     压缩与mysql通信的数据
-V, --version               显示版本号
-v, --verbose               输出信息模式, 0 = silent, 1 = errors, 2 = warnings, 3 = info, 默认为 2
```

### myloader 参数解释

```
-d, --directory                   备份文件的文件夹
-q, --queries-per-transaction     每次事物执行的查询数量，默认是1000
-o, --overwrite-tables            如果要恢复的表存在，则先drop掉该表，使用该参数，需要备份时候要备份表结构
-B, --database                    需要还原的数据库
-e, --enable-binlog               启用还原数据的二进制日志
-h, --host                        主机
-u, --user                        还原的用户
-p, --password                    密码
-P, --port                        端口
-S, --socket                      socket文件
-t, --threads                     还原所使用的线程数，默认是4
-C, --compress-protocol           压缩协议
-V, --version                     显示版本
-v, --verbose                     输出模式, 0 = silent, 1 = errors, 2 = warnings, 3 = info, 默认为2
```



## 备份数据库

```
# mkdir -p /data/backup/mysql/

# mydumper -u root -h 192.168.1.12 -p 123456  -P 61920 -B DBName  -o /data/backup/mysql/

```



从上面可以可以看出

备份所生成的文件 
目录中包含一个metadata文件

记录了备份数据库在备份时间点的二进制日志文件名，日志的写入位置，

如果是在从库进行备份，还会记录备份时同步至主库的二进制日志文件及写入位置 
每个表有两个备份文件：

database.table-schema.sql 表结构文件

database.table.sql 表数据文件

## 恢复数据库

```
# 删除 beta 库
root@localhost [(none)]>drop database DBName;
# myloader 恢复
# myloader -u root -p 123456 -h 192.168.1.12 -P 61920 -B DBName -d /data/backup/mysql/
# 验证
root@localhost [(none)]>show databases;
```





