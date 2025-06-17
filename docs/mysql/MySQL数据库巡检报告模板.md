---
title: MySQL数据库巡检报告模板
createTime: 2025/05/27 17:51:17
permalink: /article/pbns4t40/
---
# 如何做一个MySQL的自动巡检脚本



作为一个运维工程师，巡检少不了，如何做一个MySQL的自动巡检脚本（语言不限），最好能提供一些巡检指标、巡检项目、巡检语句的解释、最终的巡检文件等等。

本文是根据公众号@墨天轮的，根据这个文章 https://mp.weixin.qq.com/s/jHs7_lerBBIeDBDXraGW5Q 。

文章末尾有获取shell的巡检脚本和《MySQL数据库巡检报告模板.pdf》的方法。

![mysql-xunjian2](https://imgoss.xgss.net/picgo/mysql-xunjian2.jpg?aliyun)

## 输出结果页面

使用shell脚本输出html页面的截图

![image-20241013233714183](https://imgoss.xgss.net/picgo/image-20241013233714183.png?aliyun)

## 数据库版本

```
select version();
```

## 数据库大小

```
SELECT table_schema "Database name", sum( table_rows ) "No. of rows", sum( data_length ) / 1024 / 1024 "Size data (MB)", sum( index_length)/ 1024 / 1024 "Size index (MB)" FROM information_schema.TABLES GROUP BY table_schema;
```

## 自增 ID 使用

```
SELECT table_schema, table_name,ENGINE, Auto_increment FROM information_schema.TABLES WHERE TABLE_SCHEMA NOT IN( "INFORMATION_SCHEMA", "PERFORMANCE_SCHEMA","MYSQL", "SYS") limit 30;
```



## 存储引擎不是 innodb 的表

```
SELECT TABLE_SCHEMA, TABLE_NAME,ENGINE FROM INFORMATION_SCHEMA.TABLES WHERE ENGINE != 'innodb' AND TABLE_SCHEMA NOT IN ( "INFORMATION_SCHEMA", "PERFORMANCE_SCHEMA", "MYSQL", "SYS" );
```

## 无主键的表

```
SELECT t1.table_schema, t1.table_name, t1.table_type FROM information_schema.TABLES t1 LEFT OUTER JOIN information_schema.TABLE_CONSTRAINTS t2 ON t1.table_schema = t2.TABLE_SCHEMA AND t1.table_name = t2.TABLE_NAME AND t2.CONSTRAINT_NAME IN ( 'PRIMARY' ) WHERE t2.table_name IS NULL AND t1.TABLE_SCHEMANOT IN ( 'information_schema', 'performance_schema', 'test', 'mysql', 'sys' ) AND t1.table_type = "BASE TABLE";
```



## 运行线程状态查询

查看当前并发 线程是否状态正常。检查 state 列是否存在 wait for xxx lock 的状态，如果有则存在锁事务；

```
show full processlist;

mariadb> show full processlist;
+-----+-------------+---------------------+------+---------+------+--------------------------+-----------------------+----------+
| Id  | User        | Host                | db   | Command | Time | State                    | Info                  | Progress |
+-----+-------------+---------------------+------+---------+------+--------------------------+-----------------------+----------+
|   2 | system user |                     | NULL | Daemon  | NULL | InnoDB purge worker      | NULL                  |    0.000 |
|   1 | system user |                     | NULL | Daemon  | NULL | InnoDB purge coordinator | NULL                  |    0.000 |
|   3 | system user |                     | NULL | Daemon  | NULL | InnoDB purge worker      | NULL                  |    0.000 |
|   4 | system user |                     | NULL | Daemon  | NULL | InnoDB purge worker      | NULL                  |    0.000 |
|   5 | system user |                     | NULL | Daemon  | NULL | InnoDB shutdown handler  | NULL                  |    0.000 |
| 113 | root        | 192.168.1.251:11537 | NULL | Query   |    0 | init                     | show full processlist |    0.000 |
+-----+-------------+---------------------+------+---------+------+--------------------------+-----------------------+----------+
6 rows in set (0.04 sec)
```



## InnoDB 死锁检查

查看 LATEST DETECTED, DEADLOCK 输出段，若存在，则需要摘取相应的语句。

```
show engine innodb status;
```



## InnoDB 长事务检查

检查 TRANSACTIONS 输出段，看是否存在 ACTIVE 时间过长的事务，若存在，则需要关注

```
show engine innodb status;
```



## 指定 TCP/IP连接的侦听队列的大小

back_log 参数的值指出在 MySQL 暂时停止响应新请求之前的短时间内多少个请求可以被存在堆栈中。如果系统在一个短时间内有很多连接，则需要增大该参数的值。不同的操作系统在这个队列。默认值为 50。对于 Linux 系统推荐设置为小于 512 的整数。

```
show variables like 'back_log%';
```

## max_allowed_packet包的值

客户端和服务器均有自己的max_allowed_packet 变量，如打算处理大的信息包，必须增加客户端和服务器上的该变量。一般情况下，服务器默认max-allowed-packet 为 1MB

```
show variables like 'max_allowed_packet%';
```



## 交互式连接超时时间

交互式连接超时时间(mysql 工具、mysqldump 等),参数默认值：28800 秒（8 小时），建议调小。

```
show variables like 'interactive_timeout%';
```



## 非交互式连接超时时间

非交互式连接超时时间，默认的连接mysql api 程序,jdbc 连接数据库等,参数默认值：28800 秒（8 小时），建议调小。

```
show variables like 'wait_timeout%';
```

## skip_name_resolve

使用该参数后可加快内网地址的请求

```
show variables like 'skip_name_resolve%';
```



## 最大连接数检查

若 max_used_connections 逼近max_connections ，则需要调大max_connections。
max_used_connections / max_connections * 100% （理想值≈ 85%）

```
show global status like 'max_used_connections';
show global variables like 'max_connections';
```

## 当前连接数检查

应小于 max_connections

```
show global status like 'Threads_connected';
```



## 异常连接检查

检 查 Aborted_clients 以 及Aborted_connects 值是否正常

Aborted_clients: 表示客户端连接被中止的次数。这通常是因为客户端超时、错误或其他原因导致连接中断。
Aborted_connects: 表示尝试建立连接但被中止的次数。这可能由于客户端连接过多、服务器资源不足、网络问题或其他原因导致。

```
show global status like 'aborted%';
```



## 开启 binlog 日志

binlog 日志开启，能实时记录保存DML 操作

```
show variables like 'log_bin%';
```



## binlog 保留天数

让mysql 自动清理若干天前的binlog

```
show variables like 'expire_logs_days%';
```

## 文件打开限制数



```
show variables like 'open_files_limit%';
```



## 线程池缓存大小



```
show variables like 'thread_cache_size%';
```



## 排序缓冲区大小

```
show variables like 'sort_buffer_size%';
```

## 内连接缓冲区大小

```
show variables like 'join_buffer_size%';
```



## InnoDB 存储引擎缓存分配大小

物理内存的 50% - 75%



```
show global variables like 'innodb_buffer_pool_size';
```



## 展示Innodb_io_capacity的全局变量

控制 InnoDB 引擎的 I/O 操作速率

sata/sas 硬盘这个值在 200。
sas raid10: 2000。
ssd 硬盘：8000。
fusion-io（闪存卡）：25,000-50,000。

```
show global variables like 'innodb_io_capacity';
```



## 表缓存检查

若 opened_tables 过大，则需要调大table_open_cache 值

```
show global status like '%opened_tables%';
show variables like '%table_open_cache%';
```



## 查询缓存检查

一般情况下，需要禁用 query_cache

```
show variables like '%query_cache%';
```



## 表缓存检查

```
show global status like '%opened_tables%';
```



## InnoDB 独立表空间

```
show variables like 'innodb_file_per_table%';
```



## InnoDB 打开文件数

```
show variables like 'innodb_open_files%';
```



## InnoDB 并发线程

```
show variables like 'innodb_thread_concurrency%';
```



## InnoDB 将缓存中的redo 日志回写到日志文件的设置

建议设为 1

```
show variables like 'innodb_flush_log_at_trx_commit%';
```





## InnoDB 日志缓冲大小

```
show variables like 'sync_binlog%';

show variables like 'innodb_log_buffer_size%';
```





## InnoDB 日志文件大小

```
show variables like 'innodb_log_file_size%';
```



## InnoDB 日志文件组

```
show variables like 'innodb_log_files_in_group%';
```



QPS 检查 (间隔执行,通过两次的间隔时间做差值，计算 QPS)

```
show status like 'queries';
```



## 读写比检查

读请求是 com_select；
写请求是 com_insert；
com_update;com_delete 通过统计读写的请求数，算出读写比例。

```
show status like 'com_%'
```



## InnoDB Buffer Pool 检查

```
show status like 'Innodb_buffer_pool_read_requests';
show status like 'Innodb_buffer_pool_reads';
```



## 临时表检查

```
show global status like '%tmp%';
```



## 存储引擎binlog 磁盘使用比例

Binlog_cache_disk_use / Binlog_cache_use

```

show global status like 'Binlog_cache_disk_use';

show global status like 'Binlog_cache_use';

```



## 存储引擎磁盘临时表创建数

```
show global status like 'Created_tmp_disk_tables';
```



存储引擎全表扫描比例

```
(Handler_read_rnd_next + Handler_read_rnd) / (Handler_read_rnd_next + Handler_read_rnd + Handler_read_first + Handler_read_next + Handler_read_k
ey + Handler_read_prev)


```



存储引擎索引使用

```
(Handler_read_first + Handler_read_key + Handler_read_next + Handler_read_prev


show global status like 'Handler_read_first';
show global status like 'Handler_read_key';
show global status like 'Handler_read_next';
show global status like 'Handler_read_prev';


```

## 存储引擎空余内存大小

```
show global status like 'Innodb_buffer_pool_pages_free';

```

## 存储引擎重做日志等待

```
show global status like 'Innodb_log_waits';
show global status like 'Innodb_log_writes';

Innodb_log_waits/ Innodb_log_writes

```

## 存储引擎表锁等待比例

```
Table_locks_waited / (Table_locks_waited + Table_locks_immediate)

show global status like 'Table_locks_waited';
show global status like 'Table_locks_immediate';

```



## 存储引擎线程缓存

```
show global status like 'threads_created';

```

## 并发线程查询

应小于 10，过大，说明并发数太多，存在慢语句

```
show global status like 'threads_running%';

```

## 慢查询日志开启

```
show variables like '%slow%';

```

## 慢查询查询时间

```
show variables like 'long_query_time%';
```

# 获取pdf和脚本



关注公众号，关注公众号回复"MySQL巡检"

![image-20241013172819225](https://imgoss.xgss.net/picgo/image-20241013172819225.png?aliyun)










































