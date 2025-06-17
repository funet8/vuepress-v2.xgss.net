---
title: innodb_online_alter_log_max_size
createTime: 2025/05/27 17:51:17
permalink: /article/a9ksvlw3/
---
# 在释放一个数亿记录的表时报该错



## 阿里云RDS删除数据库过期报错：

```
...
error	Creating index 'PRIMARY' required more than 'innodb_online_alter_log_max_size' bytes of modification log. Please try again.
optimize	status	Operation failed
```



网上搜索问题

https://blog.csdn.net/hyzx_9987/article/details/112010324
在释放一个数亿记录的表时报该错
Creating index 'PRIMARY' required more than 'innodb_online_alter_log_max_size' bytes of modification

最大的在线创建索引修改日志文件大小

大致意思就是，当online_alter的时候，会将insert,update,delete的数据存在log中，log有个上限就是这个参数；如果alter花费了1小时，而在这1小时内的数据变更超过500M，那么就会失败；

## 解决方案 

```
set global innodb_online_alter_log_max_size = 10737418240，调大该值；

mysql> show variables like '%innodb_online_alter_log_max_size%';
+----------------------------------+-----------+
| Variable_name                    | Value     |
+----------------------------------+-----------+
| innodb_online_alter_log_max_size | 134217728 |
+----------------------------------+-----------+
1 row in set
默认大小为128M

set global innodb_online_alter_log_max_size=1073741824;
设置为1024G
```





## 在阿里云RDS中用命令行修改

无权限

```
mysql> set global innodb_online_alter_log_max_size=1073741824;
1227 - Access denied; you need (at least one of) the SUPER privilege(s) for this operation
```

阿里云后台的'参数设置'修改提交，之后即可生效（非重启数据库）。

![image-20220510154650487](https://imgoss.xgss.net/picgo/image-20220510154650487.png?aliyun)

修成功

```
mysql> show variables like '%innodb_online_alter_log_max_size%';
+----------------------------------+------------+
| Variable_name                    | Value      |
+----------------------------------+------------+
| innodb_online_alter_log_max_size | 1073741824 |
+----------------------------------+------------+
1 row in set
```



