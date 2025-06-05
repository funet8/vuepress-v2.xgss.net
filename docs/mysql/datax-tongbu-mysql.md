# 阿里巴巴开源DataX全量同步多个MySQL数据库

# 前言

上次 写了[阿里巴巴高效的离线数据同步工具DataX](https://mp.weixin.qq.com/s/_ZXqA3H__Kwk-9O-9dKyOQ)： https://mp.weixin.qq.com/s/_ZXqA3H__Kwk-9O-9dKyOQ 安装DataX这个开源工具，并且同步备份了几张数据表。但是发现一个问题，就是每张表都需要单独写一个 job。如果数据表有几百张是不是要写几百个，这个不太现实了。

正当一筹莫展之际看到看到 @慌途L  https://blog.csdn.net/qq_25112523/article/details/109276879 的文章，我根据文章这篇文章优化了一下，先理一下思路。

![img](https://imgoss.xgss.net/picgo/e3606d85c0629ba2dcd0e67c906dfec0edc5faba.jpg?aliyun)

# 思路

实现的目标如图，要将源数据库的所有数据全量同步到目标数据库中。

![image-20230321171446281](https://imgoss.xgss.net/picgo/image-20230321171446281.png?aliyun)



## 三个步骤

1.源库的数据库结构导入到目标库中

2.读取目标库中的所有表名

3.通过DataX执行脚本同步所有数据表。

# 操作流程

## 1.源库的数据库结构导入到目标库中

利用shell脚本读取数据库，导出表结构

https://gitee.com/funet8/MYSQL/raw/master/DataX/Mysql_Init.sh

```
vim /data/datax/script/Mysql_Init.sh 
填写以下内容，全量备份执行一次即可
```



```
#!/bin/bash
. /etc/profile

# 读库的变量
r_ip="192.168.1.6"
r_port="3306"
r_username="root"
r_password="123456"

# 写入库的变量
w_ip="192.168.1.4"
w_port="61920"
w_username="star"
w_password="123456"

# 获取库名
Mysql_Names=`mysql -h$r_ip -u$r_username -p$r_password -P$r_port -e "show databases\G" |grep 'Database'|awk -F'Database: ' '{print $2}' |grep -v 'information_schema\|performance_schema\|test\|sys\|mysql\|test1|'`

function Mysql_Init(){
	mysql_path="/data/datax/mysql/"
	mkdir $mysql_path
	for DataBase in $Mysql_Names;
		do
		#1.导出数据库结构：
		mysqldump -d ${DataBase} -h$r_ip -u$r_username -p$r_password -P$r_port > ${mysql_path}${DataBase}.sql
		#2.创建数据库
		mysql -h$w_ip -u$w_username -p$r_password -P$w_port -e "CREATE database ${DataBase} CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;"
		#3.导入数据库结构：
		mysql -u$w_username -h$w_ip -P$w_port -p$w_password ${DataBase} < ${mysql_path}${DataBase}.sql
	done
}
#数据库初始化导出、导入数据库
Mysql_Init
```



## 2.读取目标库中的所有库名、表名循环



https://gitee.com/funet8/MYSQL/raw/master/DataX/all_Sync_Task.sh

```
# vi /data/datax/script/all_Sync_Task.sh 
填写以下内容
#!/bin/bash
. /etc/profile

# 读库的变量
r_ip="192.168.1.6"
r_port="3306"
r_username="root"
r_password="123456"

# 写入库的变量
w_ip="192.168.1.4"
w_port="61920"
w_username="star"
w_password="123456"

Tool_Datax='/usr/bin/python2.7 /data/datax/bin/datax.py'

# 获取库名
Mysql_Names=`mysql -h$r_ip -u$r_username -p$r_password -P$r_port -e "show databases\G" |grep 'Database'|awk -F'Database: ' '{print $2}' |grep -v 'information_schema\|performance_schema\|test\|sys\|mysql\|test1|'`

for dbname in $Mysql_Names;
	do
		# 获取表名
		table_tchema=`mysql -h$r_ip -u$r_username -p$r_password -P$r_port -e "use ${dbname}; show full tables;"|grep 'TABLE'|awk '{print $1}'`
		#echo $table_tchema;
		
		#循环导入数据库
		for table_name in $table_tchema;
			do
				echo $table_name;
				$Tool_Datax  /data/datax/job/mysql2mysql_All.json -p "-Dr_ip=$r_ip -Dr_port=$r_port -Dr_dbname=$dbname -Dr_username=$r_username -Dr_password=$r_password -Dw_ip=$w_ip -Dw_port=$w_port -Dw_dbname=$dbname -Dw_username=$w_username -Dw_password=$w_password -Dtable_name=$table_name"
		done
done


#DataX全量同步(某一张表)
#$Tool_Python  /data/datax/job/mysql2mysql_dzzoffice.json -p "-Dr_ip=$r_ip -Dr_port=$r_port -Dr_dbname=$r_dbname -Dr_username=$r_username -Dr_password=$r_password -Dw_ip=$w_ip -Dw_port=$w_port -Dw_dbname=$w_dbname -Dw_username=$w_username -Dw_password=$w_password"

# DataX全量同步(多个文件直接写多个执行命令)
#$Tool_Python  /data/datax/job/mysql2mysql_All.json -p "-Dr_ip=$r_ip -Dr_port=$r_port -Dr_dbname=$r_dbname -Dr_username=$r_username -Dr_password=$r_password -Dw_ip=$w_ip -Dw_port=$w_port -Dw_dbname=$w_dbname -Dw_username=$w_username -Dw_password=$w_password -Dtable_name=$table_name"
```







撰写job脚本

```
# vim /data/datax/job/mysql2mysql_All.json
```

https://gitee.com/funet8/MYSQL/raw/master/DataX/mysql2mysql_All.json

```
{
    "job": {
		"setting": {
            "speed": {
                "channel": 10
            },
			"errorLimit": {
                "record": 0,
                "percentage": 0.02
            }
        },
        "content": [
            {
                "reader": {
                    "name": "mysqlreader", 
                    "parameter": {
						"column": ["*"],
                        "connection": [
                            {
                                "jdbcUrl": ["jdbc:mysql://${r_ip}:${r_port}/${r_dbname}?serverTimezone=Asia/Shanghai&characterEncoding=utf8&useSSL=false&zeroDateTimeBehavior=convertToNull"],
                                "table": ["${table_name}"]
                            }
                        ], 
						"username": "${r_username}",
                        "password": "${r_password}"
                    }
                }, 
                "writer": {
                    "name": "mysqlwriter", 
                    "parameter": {
						"writeMode": "update",
                        "column": ["*"],
                        "session": [
                        	"set session sql_mode='ANSI'"
                        ],
                        "connection": [
                            {
                                "jdbcUrl": "jdbc:mysql://${w_ip}:${w_port}/${w_dbname}?serverTimezone=Asia/Shanghai&characterEncoding=utf8&useSSL=false&zeroDateTimeBehavior=convertToNull", 
                                "table": ["${table_name}"]
                            }
                        ],
						"username": "${w_username}",
                        "password": "${w_password}"
                    }
                }
            }
        ]
    }
}

```

## 3.通过DataX执行脚本同步所有数据表。

执行脚本

```
# sh /data/datax/script/all_Sync_Task.sh 
会输出信息
```

![image-20230321173659358](https://imgoss.xgss.net/picgo/image-20230321173659358.png?aliyun)

说明同步成功，如果有报错，根据报错解决BUG即可。

# 结果展示

## 源数据库

![image-20230320102328525](https://imgoss.xgss.net/picgo/image-20230320102328525.png?aliyun)



## 同步之前

![image-20230320102231494](https://imgoss.xgss.net/picgo2025/image-20230320102231494.png?aliyun)



## 同步之后

![image-20230320103457137](https://imgoss.xgss.net/picgo/image-20230320103457137.png?aliyun)



至此全量同步完成。



参考： https://blog.csdn.net/qq_25112523/article/details/109276879