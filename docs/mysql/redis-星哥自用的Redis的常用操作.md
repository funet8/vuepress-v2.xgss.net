---
title: redis-星哥自用的Redis的常用操作
createTime: 2025/05/27 17:51:17
permalink: /article/uaxwjf34/
---
# 星哥自用的Redis的常用操作



Redis 是一款高性能的开源内存数据库，以其卓越的速度和多功能性广泛应用于缓存、消息队列、会话管理等场景。

在日常开发与运维过程中，星哥总结了一些常用的 Redis 操作方法，这篇文章旨在分享这些实用的 Redis 命令，希望对读者的实际工作有所帮助。

![image-20241225163049638](https://imgoss.xgss.net/picgo/image-20241225163049638.png?aliyun)

## 1.命令行连接Redis

无密码

```
redis-cli -h 127.0.0.1 -p 6379
```

有密码

```
redis-cli -h 127.0.0.1 -p 6379 -a 123456 
```

## 2.停止Redis

无密码

```
redis-cli -h 127.0.0.1 -p 6379 shutdown
```

有密码

```
redis-cli -h 127.0.0.1 -p 6379 -a 123456 shutdown
```



# 进入Reids

## 1.查看server版本内存使用连接等信息

执行 info 命令会返回关于 Redis 服务器的各种统计信息、配置参数和性能数据。具体来说，info 命令默认会显示所有可用的统计信息，但你也可以通过给命令传递参数来查看特定类别的信息。

```
redis 127.0.0.1:6379> info  
```

### info演示

```
127.0.0.1:63920> info
# Server
redis_version:3.2.5
redis_git_sha1:00000000
redis_git_dirty:0
redis_build_id:d0475cbecb2a8a75
redis_mode:standalone
os:Linux 3.10.0-1160.108.1.el7.x86_64 x86_64
arch_bits:64
multiplexing_api:epoll
gcc_version:4.8.5
process_id:1292
run_id:be217118cef41cf9b7eff1c530d4a9b670767844
tcp_port:63920
uptime_in_seconds:78344
uptime_in_days:0
hz:10
lru_clock:7060047
executable:/usr/local/bin/redis-server
config_file:/data/conf/63920.conf

# Clients
connected_clients:1
client_longest_output_list:0
client_biggest_input_buf:0
blocked_clients:0

# Memory
used_memory:2193296
used_memory_human:2.09M
used_memory_rss:12120064
used_memory_rss_human:11.56M
used_memory_peak:3200752

只查看CPU信息
127.0.0.1:63920> info CPU
# CPU
used_cpu_sys:52.03
used_cpu_user:27.55
used_cpu_sys_children:0.63
used_cpu_user_children:0.36
127.0.0.1:63920> 
```

## 2.获取客户连接列表

```
client list  
```

### client list  演示

```
127.0.0.1:63920> client list  
id=3115 addr=127.0.0.1:38478 fd=5 name= age=0 idle=0 flags=N db=0 sub=0 psub=0 multi=-1 qbuf=0 qbuf-free=32768 obl=0 oll=0 omem=0 events=r cmd=client

```

## 3.终止某个客户端连接

```
redis 127.0.0.1:63920> client kill 127.0.0.1:38478
```



## 4.当前保存key的数量

```
redis 127.0.0.1:63920> dbsize
演示：

127.0.0.1:63920> dbsize
(integer) 35
```

## 5.立即保存数据到硬盘

```
redis 127.0.0.1:63920> save

演示
127.0.0.1:63920> save
OK
```

## 6.异步保存数据到硬盘

```
redis 127.0.0.1:63920> bgsave

演示
127.0.0.1:63920> bgsave
Background saving started
```

## 7.当前库中移除所有key

**慎重使用**

在 Redis 中，FLUSHDB 命令用于删除当前数据库中的所有键（keys）。Redis 默认支持 16 个数据库（编号从 0 到 15），每个数据库是相互独立的，FLUSHDB 命令仅会影响当前所选择的数据库，而不会清空其他数据库。

```
127.0.0.1:63920> flushdb
```

## 8.移除所有key从所有库中

**慎重使用**

在 Redis 中，FLUSHALL 命令用于删除 Redis 实例中的所有数据库中的所有键（keys）。它会清空 Redis 实例中的所有数据，而不仅仅是当前选择的数据库。

```
127.0.0.1:63920> flushall
```

## 9.获取上次成功保存到硬盘的unix时间戳



```
redis 127.0.0.1:63920> lastsave                     

演示
127.0.0.1:63920> lastsave
(integer) 1735113701
```

## 10.查询慢查询日志条数

在 Redis 中，SLOWLOG LEN 命令用于获取 慢查询日志 中的条目数。慢查询日志是 Redis 用来记录执行时间超过特定阈值的命令的日志，通常用于排查性能瓶颈。

```
redis 127.0.0.1:6379> slowlog len


redis 127.0.0.1:6379> slowlog get                     #返回所有的慢查询日志，最大值取决于slowlog-max-len配置
redis 127.0.0.1:6379> slowlog get 2                 #打印两条慢查询日志
redis 127.0.0.1:6379> slowlog reset                 #清空慢查询日志信息
```

## 11.获取所有配置项

在 Redis 中，CONFIG GET * 命令用于获取当前 Redis 实例的所有配置参数及其值。该命令返回 Redis 的配置设置，包括默认配置和在运行时通过 CONFIG SET 命令更改过的配置项。

```
redis 127.0.0.1:6379> config get * 

演示
127.0.0.1:63920> config get * 
  1) "dbfilename"
  2) "dump.rdb"
  3) "requirepass"
  4) ""
  5) "masterauth"
  6) ""
  7) "unixsocket"
  8) ""
  9) "logfile"
 10) "/data/wwwroot/log/redis_63920.log"
```



## 12.获取 redis 中所有的 key

```
KEYS *
```



## 13.删除某个key

del 关键字

```
127.0.0.1:63920> KEYS *
1) "user"
2) "name"
127.0.0.1:63920> del user
(integer) 1
127.0.0.1:63920> KEYS *
1) "name"
```



## 14.批量删除

```
REDIS_HOST="127.0.0.1"
REDIS_PORT="6379"
REDIS_PASSWD="123456"

redis-cli -h $REDIS_HOST -p $REDIS_PORT -a $REDIS_PASSWD keys 'key*' | xargs  redis-cli -h $REDIS_HOST -p $REDIS_PORT -a $REDIS_PASSWD del
```



## 15.批量删除

```
# redis-cli -a pass(密码) keys "keywords*" | xargs redis-cli -a pass(密码) del

```



删除 端口为 6585 密码为 123456 且数据库为1 中所有UPLOAD_开头的key

```
/usr/bin/redis-cli -n 1 -p 6585 -a 123456 keys 'UPLOAD_*' | xargs /usr/bin/redis-cli -n 1 -p 6585 -a 123456 del

```



# redis-dump数据导出导入方式

## 1.安装redis-dump工具

```
[root@172.20.0.3 ~]# yum install ruby rubygems ruby-devel -y

更改gem源

[root@172.20.0.3 ~]# gem sources --add http://gems.ruby-china.org/ --remove http://rubygems.org/
http://gems.ruby-china.org/ added to sources
source http://rubygems.org/ not present in cache
[root@172.20.0.3 ~]# gem sources -l
*** CURRENT SOURCES ***
 
http://gems.ruby-china.org/
[root@172.20.0.3 ~]# gem install redis-dump -V
```

## 2.redis-dump导出

```
[root@172.20.0.3 ~]# redis-dump -u :password@172.20.0.1:6379 > 172.20.0.1.json
```



## 3.redis-load导入

```
[root@172.20.0.3 ~]# cat 172.20.0.1.json | redis-load -u :password@172.20.0.2:6379
```

