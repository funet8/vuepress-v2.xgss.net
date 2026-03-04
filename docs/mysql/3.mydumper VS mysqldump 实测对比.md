# 数据库备份谁更快？mydumper VS mysqldump 实测对比



在日常运维或者开发环境中，**数据库备份与恢复**都是绕不开的话题。MySQL 官方自带的 `mysqldump` 工具一直是很多人的首选，但随着数据量的增长，`mysqldump` 在速度和效率上的短板越来越明显。于是，社区里出现了性能更强的替代方案——`mydumper`/`myloader`。

今天星哥就带大家做一个实测对比，看看 **mysqldump 和 mydumper 在备份、恢复上的速度差距**，结果可能会让你有点惊讶。

- **备份工具**：`mydumper` vs `mysqldump`
- **恢复工具**：`myloader` vs `mysql`

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1757758263065.png?tx)

## 测试环境说明

为了保证对比公平，我们在相同环境下进行了测试：

- **数据库版本**：MySQL 5.7
- **数据量**：数据库约 24 万行，总大小约 20GB
- **硬件配置**：8 核 CPU，32GB 内存，SSD 硬盘
- **工具版本**：  
  - mysqldump：MySQL 官方自带版本  
  - mydumper/myloader：v0.19.4

备份星哥玩云的的wordpress数据库，DB总共有24万条左右的数据

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1757663730310.png?tx)



## mydumper 备份时间的命令

```
DB_user='root' #改成你的
DB_host='X.X.X.X' #改成你的
DB_port='3306'
DB_passwd='12345678'  #改成你的
DB_name='dbname'  #改成你的
DB_backup_pwd='/data/backup/mysql/xgss_mydumper'

计算备份时间
start_time=$(date +%s)
mydumper -u $DB_user -h $DB_host -p $DB_passwd  -P $DB_port -B $DB_name  -o $DB_backup_pwd
end_time=$(date +%s)
echo "备份耗时：$((end_time - start_time)) 秒"

```



## mydumper  备份成功

### 备份时间

```
备份耗时：509 秒
```

### 备份目录大小

```
du -sh /data/backup/mysql/xgss_mydumper
256M    /data/backup/mysql/xgss_mydumper
```

## myloader恢复数据库

将刚才备份的数据库恢复到本机

```
start_time=$(date +%s)
myloader -u root -p '123456' -h 127.0.0.1 -P 3306 -B www_xgss_net -d /data/backup/mysql/xgss_mydumper
end_time=$(date +%s)
echo "恢复耗时：$((end_time - start_time)) 秒"

```

实际显示如下：

```
[root@node8 ~]# start_time=$(date +%s)
[root@node8 ~]# myloader -u root  -h 127.0.0.1 -P 61922 -p '123456' -B www_xgss_net -d /data/backup/mysql/xgss_mydumper
end_time=$(date +%s)
echo "备份耗时：$((end_time - start_time)) 秒"
[root@node8 ~]# end_time=$(date +%s)
[root@node8 ~]# echo "备份耗时：$((end_time - start_time)) 秒"
备份耗时：3 秒
```



| 参数                      | 作用                                   |
| ------------------------- | -------------------------------------- |
| `-u` / `-p` / `-h` / `-P` | 数据库连接信息                         |
| `-B db01`                 | 恢复到的目标数据库（不存在会自动创建） |
| `-d`                      | 备份目录（mydumper 输出目录）          |
| `-t 6`                    | 恢复线程数（可根据 CPU/IO 调整）       |
| `-o`                      | 覆盖已存在的表（DROP 后重建）          |
| `-v 3`                    | 日志详细级别（1~3）                    |

### 恢复之后查看表

为什么行数会变多？看看什么原因

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1757666191025.png?tx)



## mysqldump 备份时间的命令

```
DB_user='root' #改成你的
DB_host='X.X.X.X' #改成你的
DB_port='3306'
DB_passwd='12345678'  #改成你的
DB_name='dbname'  #改成你的
DB_backup_pwd='/data/backup/mysql/xgss_mysqldump'

mkdir -p $DB_backup_pwd

start_time=$(date +%s)
mysqldump -u $DB_user -h $DB_host -P $DB_port -p$DB_passwd  $DB_name > $DB_backup_pwd/$DB_name.sql
end_time=$(date +%s)
echo "备份耗时：$((end_time - start_time)) 秒"
```

## mysqldump 备份成功

### 备份时间

```
备份耗时：445 秒
```

### 备份目录大小

```
du -sh /data/backup/mysql/xgss_mysqldump
256M    /data/backup/mysql/xgss_mysqldump
```



## mysql恢复数据库

恢复命令

```
start_time=$(date +%s)
mysql -u root -h 127.0.0.1 -P 61922 -p'123456' www_xgss_net2 < /data/backup/mysql/xgss_mysqldump/xgss2.sql
end_time=$(date +%s)
echo "备份耗时：$((end_time - start_time)) 秒"
```

### 备份耗时

```
备份耗时：22 秒
```

备份前的数据量

```
mysql> SELECT SUM(table_rows) AS total_rows
FROM information_schema.tables
WHERE table_schema = 'www_xgss_net';
+------------+
| total_rows |
+------------+
| 274473     |
+------------+
1 row in set (0.02 sec)
```



恢复之后的数据量

```
mysql> SELECT SUM(table_rows) AS total_rows
FROM information_schema.tables
WHERE table_schema = 'www_xgss_net';
+------------+
| total_rows |
+------------+
| 304427     |
+------------+
1 row in set (0.02 sec)

mysql> SELECT SUM(table_rows) AS total_rows
FROM information_schema.tables
WHERE table_schema = 'www_xgss_net2';
+------------+
| total_rows |
+------------+
| 296875     |
+------------+
1 row in set (0.02 sec)
```



## 结论

| 工具      | 时间  | mysql数据量 |
| --------- | ----- | ----------- |
| mydumper  | 509秒 | 274473      |
| myloader  | 3秒   | 304427      |
| mysqldump | 445秒 | 274473      |
| mysql     | 22秒  | 296875      |

通过本次对比测试，我们可以得到一个直观结论：

- **mysqldump/mysql**：适合小型数据库、低频备份场景，工具简单、稳定，但在大数据量场景下效率较差。
- **mydumper/myloader**：在大规模数据库备份/恢复中优势显著，支持多线程并行，速度是 mysqldump/mysql 的 4~5 倍，非常适合线上高频备份和数据迁移。