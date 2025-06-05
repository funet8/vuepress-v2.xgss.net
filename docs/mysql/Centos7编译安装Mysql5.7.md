

# Centos7编译安装Mysql5.7



## 系统说明

系统： centos7

IP： 192.168.1.4

```
MySQL访问端口: 61920  #默认 3306
软件包存放目录： /data/software
mysql安装的目录：/data/mysql5.7/app
mysql数据存放目录： /data/mysql5.7/data
mysql数据库配置： /data/mysql5.7/etc
```

![image-20221130170141687](https://imgoss.xgss.net/picgo/image-20221130170141687.png?aliyun)

## 1.安装依赖

```
# yum install -y gcc gcc-c++ openssl openssl-devel ncurses-devel
```



## 2.下载文件

```
	# mkdir -p /data/software
	# cd /data/software
	# wget http://js.funet8.com/centos_software/mysql-boost-5.7.34.tar.gz
	# wget http://js.funet8.com/centos_software/cmake-3.21.1.tar.gz	
	
	# 备用下载：
	# wget https://downloads.mysql.com/archives/get/p/23/file/mysql-boost-5.7.34.tar.gz
	# wget https://github.com/Kitware/CMake/releases/download/v3.21.1/cmake-3.21.1.tar.gz
```





## 3.安装CMake

编译Mysql5.7需要用到CMake，没有CMake的先下载安装，官网 https://cmake.org/download/

```
# cd /data/software
安装CMake
# tar -zxvf cmake-3.21.1.tar.gz
# cd cmake-3.21.1
# ./configure
# make && make install
```



## 4.安装Mysql5.7

```
# tar -zxvf mysql-boost-5.7.34.tar.gz
# cd mysql-5.7.34/
# mkdir -p /data/mysql5.7/data /data/mysql5.7/app /data/mysql5.7/etc
# mkdir /var/run/mysqld

新建mysql用户和mysql用户组：
# groupadd mysql
# useradd -M -g mysql -s /sbin/nologin/ mysql
# chown -R mysql:mysql /data/mysql5.7

# yum install -y 
```



**开始Cmake编译Mysql**

```
# cmake . -DWITH_BOOST=/data/software/mysql-5.7.34/boost/boost_1_59_0 \
-DCMAKE_INSTALL_PREFIX=/data/mysql5.7/app \
-DMYSQL_DATADIR=/data/mysql5.7/data \
-DDEFAULT_CHARSET=utf8mb4 \
-DDEFAULT_COLLATION=utf8mb4_general_ci \
-DEXTRA_CHARSETS=all \
-DENABLED_LOCAL_INFILE=1 \
-DMYSQL_USER=mysql \
-DMYSQL_TCP_PORT=61920
# make && make install
```



## 5.MySQL配置文件

```
	# echo "[client]
	default-character-set = utf8mb4
	[mysqld]
	### 基本属性配置
	port = 61920
	datadir=/data/mysql5.7/data
	# 禁用主机名解析
	skip-name-resolve
	# 默认的数据库引擎
	default-storage-engine = InnoDB
	### 字符集配置
	character-set-client-handshake = FALSE
	character-set-server = utf8mb4
	collation-server = utf8mb4_unicode_ci
	init_connect='SET NAMES utf8mb4'
	### GTID
	# server_id来唯一的标识某个数据库实例，并在链式或双主复制结构中用它来避免sql语句的无限循环
	server_id = 1
	# 为保证 GTID 复制的稳定, 行级日志
	binlog_format = row
	# 开启 gtid 功能
	gtid_mode = on
	# 保障 GTID 事务安全
	# 当启用enforce_gtid_consistency功能的时候,
	# MySQL只允许能够保障事务安全, 并且能够被日志记录的SQL语句被执行,
	# 像create table ... select 和 create temporarytable语句,
	# 以及同时更新事务表和非事务表的SQL语句或事务都不允许执行
	enforce-gtid-consistency = true
	# 以下两条配置为主从切换, 数据库高可用的必须配置
	# 开启 binlog 日志功能
	log_bin = on
	# 开启从库更新 binlog 日志
	log-slave-updates = on
	### 慢查询日志
	# 打开慢查询日志功能
	slow_query_log = 1
	# 超过2秒的查询记录下来
	long_query_time = 2
	# 记录下没有使用索引的查询
	log_queries_not_using_indexes = 1
	slow_query_log_file = ${Mysql_path}/slow-${MYSQL_PORY}.log
	### 自动修复
	# 记录 relay.info 到数据表中
	relay_log_info_repository = TABLE
	# 记录 master.info 到数据表中
	master_info_repository = TABLE
	# 启用 relaylog 的自动修复功能
	relay_log_recovery = on
	# 在 SQL 线程执行完一个 relaylog 后自动删除
	relay_log_purge = 1
	### 数据安全性配置
	# 关闭 master 创建 function 的功能
	log_bin_trust_function_creators = off
	# 每执行一个事务都强制写入磁盘
	sync_binlog = 1
	# timestamp 列如果没有显式定义为 not null, 则支持null属性
	# 设置 timestamp 的列值为 null, 不会被设置为 current timestamp
	explicit_defaults_for_timestamp=true
	### 优化配置
	# 优化中文全文模糊索引
	ft_min_word_len = 1
	# 默认库名表名保存为小写, 不区分大小写
	lower_case_table_names = 1
	# 单条记录写入最大的大小限制
	# 过小可能会导致写入(导入)数据失败
	max_allowed_packet = 256M
	# 半同步复制开启
	#rpl_semi_sync_master_enabled = 1
	#rpl_semi_sync_slave_enabled = 1
	# 半同步复制超时时间设置
	#rpl_semi_sync_master_timeout = 1000
	# 复制模式(保持系统默认)
	#rpl_semi_sync_master_wait_point = AFTER_SYNC
	# 后端只要有一台收到日志并写入 relaylog 就算成功
	#rpl_semi_sync_master_wait_slave_count = 1
	# 多线程复制
	#slave_parallel_type = logical_clock
	#slave_parallel_workers = 4
	### 连接数限制
	max_connections = 1500
	# 验证密码超过20次拒绝连接
	max_connect_errors = 20
	# back_log值指出在mysql暂时停止回答新请求之前的短时间内多少个请求可以被存在堆栈中
	# 也就是说，如果MySql的连接数达到max_connections时，新来的请求将会被存在堆栈中
	# 以等待某一连接释放资源，该堆栈的数量即back_log，如果等待连接的数量超过back_log
	# 将不被授予连接资源
	back_log = 500
	open_files_limit = 65535
	# 服务器关闭交互式连接前等待活动的秒数
	interactive_timeout = 3600
	# 服务器关闭非交互连接之前等待活动的秒数
	wait_timeout = 3600
	### 内存分配
	# 指定表高速缓存的大小。每当MySQL访问一个表时，如果在表缓冲区中还有空间
	# 该表就被打开并放入其中，这样可以更快地访问表内容
	table_open_cache = 1024
	# 为每个session 分配的内存, 在事务过程中用来存储二进制日志的缓存
	binlog_cache_size = 2M
	# 在内存的临时表最大大小
	tmp_table_size = 128M
	# 创建内存表的最大大小(保持系统默认, 不允许创建过大的内存表)
	# 如果有需求当做缓存来用, 可以适当调大此值
	max_heap_table_size = 16M
	# 顺序读, 读入缓冲区大小设置
	# 全表扫描次数多的话, 可以调大此值
	read_buffer_size = 1M
	# 随机读, 读入缓冲区大小设置
	read_rnd_buffer_size = 8M
	# 高并发的情况下, 需要减小此值到64K-128K
	sort_buffer_size = 1M
	# 每个查询最大的缓存大小是1M, 最大缓存64M 数据
	query_cache_size = 64M
	query_cache_limit = 1M
	# 提到 join 的效率
	join_buffer_size = 16M
	# 线程连接重复利用
	thread_cache_size = 64
	### InnoDB 优化
	## 内存利用方面的设置
	# 数据缓冲区
	innodb_buffer_pool_size=2G
	## 日志方面设置
	# 事务日志大小
	innodb_log_file_size = 256M
	# 日志缓冲区大小
	innodb_log_buffer_size = 4M
	# 事务在内存中的缓冲
	innodb_log_buffer_size = 3M
	# 主库保持系统默认, 事务立即写入磁盘, 不会丢失任何一个事务
	innodb_flush_log_at_trx_commit = 1
	# mysql 的数据文件设置, 初始100, 以10M 自动扩展
	innodb_data_file_path = ibdata1:10M:autoextend
	# 为提高性能, MySQL可以以循环方式将日志文件写到多个文件
	innodb_log_files_in_group = 3
	##其他设置
	# 如果库里的表特别多的情况，请增加此值
	innodb_open_files = 800
	# 为每个 InnoDB 表分配单独的表空间
	innodb_file_per_table = 1
	# InnoDB 使用后台线程处理数据页上写 I/O(输入)请求的数量
	innodb_write_io_threads = 8
	# InnoDB 使用后台线程处理数据页上读 I/O(输出)请求的数量
	innodb_read_io_threads = 8
	# 启用单独的线程来回收无用的数据
	innodb_purge_threads = 1
	# 脏数据刷入磁盘(先保持系统默认, swap 过多使用时, 调小此值, 调小后, 与磁盘交互增多, 性能降低)
	# innodb_max_dirty_pages_pct = 90
	# 事务等待获取资源等待的最长时间
	innodb_lock_wait_timeout = 120
	# 开启 InnoDB 严格检查模式, 不警告, 直接报错
	innodb_strict_mode=1
	# 允许列索引最大达到3072
	innodb_large_prefix = on
	[mysqldump]
	# 开启快速导出
	quick
	default-character-set = utf8mb4
	max_allowed_packet = 256M
	[mysql]
	# 开启 tab 补全
	auto-rehash
	default-character-set = utf8mb4"> /data/mysql5.7/etc/61920.cnf
```





## 初始化数据库

```
# rm -rf  /data/mysql5.7/data/* (如果有文件请删掉否则会报错)
初始化数据
# /data/mysql5.7/app/bin/mysqld --defaults-file=/data/mysql5.7/etc/61920.cnf --initialize --user=mysql

启动数据库：
# /data/mysql5.7/app/bin/mysqld_safe --defaults-file=/data/mysql5.7/etc/61920.cnf &

查看mysql是否启动成功
# netstat -tunpl |grep mysql

初始化完成的时候会提示生成了一个临时的Mysql root密码，记住
A temporary password is generated for root@localhost: sTi:!,BhL7=s

#修改密码：
# /data/mysql5.7/app/bin/mysqladmin -u root -hlocalhost -P61920 -p'sTi:!,BhL7=s' password 123456

```



## 7.开机自启动mysql服务

```
echo "#开机启动mysql5.7" >> /etc/rc.local
echo "/data/mysql5.7/app/bin/mysqld_safe --defaults-file=/data/mysql5.7/etc/61920.cnf &" >> /etc/rc.local
```



## 8.添加环境变量

```
# echo "export PATH=$PATH:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin:${Mysql_app}/bin" >> /etc/profile
# source /etc/profile
# mysql -V
```



## 9.开启防火墙

如果有防火墙则开启

```
# firewall-cmd 和 iptables选择其中一个，我这边用的是 iptables。
# iptables
iptables -I INPUT -p tcp --dport 61920 -j ACCEPT
service iptables save
systemctl restart iptables.service
	
# firewall
# firewall-cmd --zone=public --add-port=61920/tcp --permanent
# firewall-cmd --reload
```



## 10.基本操作

### 进入实例mysql实例

```
# mysql  -u root -hlocalhost -P"61920" -p"123456"
```

### 新增远程用户: root_mysql

```
# mysql> CREATE USER 'root_mysql'@'%' IDENTIFIED BY '12345678';
# mysql> GRANT  all privileges ON * . * TO 'root_mysql'@'%' IDENTIFIED BY '123456';
# mysql> GRANT ALL PRIVILEGES ON * . * TO 'root_mysql'@'%' WITH GRANT OPTION MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0 ;
# mysql> flush privileges;
```

### 关闭实例

```

# mysqladmin -uroot -hlocalhost -P"${MYSQL_PORY}" -p"$Mysql_Password"  shutdown
# mysqladmin -uroot -hlocalhost -P"61920" -p"123456"  shutdown
```

### 启动mysql

```
# mysqld_safe --defaults-file=/data/mysql5.7/etc/61920.cnf  &
```



## SHELL脚本

```
# wget https://gitee.com/funet8/MYSQL/raw/master/Mysql_Shell/CentOS7_Install_mysql5_7.sh
# sh CentOS7_Install_mysql5_7.sh
```











