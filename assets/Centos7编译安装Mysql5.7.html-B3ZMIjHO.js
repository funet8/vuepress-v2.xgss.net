import{_ as n,c as a,b as e,o as l}from"./app-BEL8OELx.js";const i={};function d(c,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="centos7编译安装mysql5-7" tabindex="-1"><a class="header-anchor" href="#centos7编译安装mysql5-7"><span>Centos7编译安装Mysql5.7</span></a></h1><h2 id="系统说明" tabindex="-1"><a class="header-anchor" href="#系统说明"><span>系统说明</span></a></h2><p>系统： centos7</p><p>IP： 192.168.1.4</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">MySQL访问端口: 61920  #默认 3306</span>
<span class="line">软件包存放目录： /data/software</span>
<span class="line">mysql安装的目录：/data/mysql5.7/app</span>
<span class="line">mysql数据存放目录： /data/mysql5.7/data</span>
<span class="line">mysql数据库配置： /data/mysql5.7/etc</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20221130170141687.png?aliyun" alt="image-20221130170141687"></p><h2 id="_1-安装依赖" tabindex="-1"><a class="header-anchor" href="#_1-安装依赖"><span>1.安装依赖</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># yum install -y gcc gcc-c++ openssl openssl-devel ncurses-devel</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="_2-下载文件" tabindex="-1"><a class="header-anchor" href="#_2-下载文件"><span>2.下载文件</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">	# mkdir -p /data/software</span>
<span class="line">	# cd /data/software</span>
<span class="line">	# wget http://js.funet8.com/centos_software/mysql-boost-5.7.34.tar.gz</span>
<span class="line">	# wget http://js.funet8.com/centos_software/cmake-3.21.1.tar.gz	</span>
<span class="line">	</span>
<span class="line">	# 备用下载：</span>
<span class="line">	# wget https://downloads.mysql.com/archives/get/p/23/file/mysql-boost-5.7.34.tar.gz</span>
<span class="line">	# wget https://github.com/Kitware/CMake/releases/download/v3.21.1/cmake-3.21.1.tar.gz</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-安装cmake" tabindex="-1"><a class="header-anchor" href="#_3-安装cmake"><span>3.安装CMake</span></a></h2><p>编译Mysql5.7需要用到CMake，没有CMake的先下载安装，官网 https://cmake.org/download/</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># cd /data/software</span>
<span class="line">安装CMake</span>
<span class="line"># tar -zxvf cmake-3.21.1.tar.gz</span>
<span class="line"># cd cmake-3.21.1</span>
<span class="line"># ./configure</span>
<span class="line"># make &amp;&amp; make install</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-安装mysql5-7" tabindex="-1"><a class="header-anchor" href="#_4-安装mysql5-7"><span>4.安装Mysql5.7</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># tar -zxvf mysql-boost-5.7.34.tar.gz</span>
<span class="line"># cd mysql-5.7.34/</span>
<span class="line"># mkdir -p /data/mysql5.7/data /data/mysql5.7/app /data/mysql5.7/etc</span>
<span class="line"># mkdir /var/run/mysqld</span>
<span class="line"></span>
<span class="line">新建mysql用户和mysql用户组：</span>
<span class="line"># groupadd mysql</span>
<span class="line"># useradd -M -g mysql -s /sbin/nologin/ mysql</span>
<span class="line"># chown -R mysql:mysql /data/mysql5.7</span>
<span class="line"></span>
<span class="line"># yum install -y </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>开始Cmake编译Mysql</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># cmake . -DWITH_BOOST=/data/software/mysql-5.7.34/boost/boost_1_59_0 \\</span>
<span class="line">-DCMAKE_INSTALL_PREFIX=/data/mysql5.7/app \\</span>
<span class="line">-DMYSQL_DATADIR=/data/mysql5.7/data \\</span>
<span class="line">-DDEFAULT_CHARSET=utf8mb4 \\</span>
<span class="line">-DDEFAULT_COLLATION=utf8mb4_general_ci \\</span>
<span class="line">-DEXTRA_CHARSETS=all \\</span>
<span class="line">-DENABLED_LOCAL_INFILE=1 \\</span>
<span class="line">-DMYSQL_USER=mysql \\</span>
<span class="line">-DMYSQL_TCP_PORT=61920</span>
<span class="line"># make &amp;&amp; make install</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-mysql配置文件" tabindex="-1"><a class="header-anchor" href="#_5-mysql配置文件"><span>5.MySQL配置文件</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">	# echo &quot;[client]</span>
<span class="line">	default-character-set = utf8mb4</span>
<span class="line">	[mysqld]</span>
<span class="line">	### 基本属性配置</span>
<span class="line">	port = 61920</span>
<span class="line">	datadir=/data/mysql5.7/data</span>
<span class="line">	# 禁用主机名解析</span>
<span class="line">	skip-name-resolve</span>
<span class="line">	# 默认的数据库引擎</span>
<span class="line">	default-storage-engine = InnoDB</span>
<span class="line">	### 字符集配置</span>
<span class="line">	character-set-client-handshake = FALSE</span>
<span class="line">	character-set-server = utf8mb4</span>
<span class="line">	collation-server = utf8mb4_unicode_ci</span>
<span class="line">	init_connect=&#39;SET NAMES utf8mb4&#39;</span>
<span class="line">	### GTID</span>
<span class="line">	# server_id来唯一的标识某个数据库实例，并在链式或双主复制结构中用它来避免sql语句的无限循环</span>
<span class="line">	server_id = 1</span>
<span class="line">	# 为保证 GTID 复制的稳定, 行级日志</span>
<span class="line">	binlog_format = row</span>
<span class="line">	# 开启 gtid 功能</span>
<span class="line">	gtid_mode = on</span>
<span class="line">	# 保障 GTID 事务安全</span>
<span class="line">	# 当启用enforce_gtid_consistency功能的时候,</span>
<span class="line">	# MySQL只允许能够保障事务安全, 并且能够被日志记录的SQL语句被执行,</span>
<span class="line">	# 像create table ... select 和 create temporarytable语句,</span>
<span class="line">	# 以及同时更新事务表和非事务表的SQL语句或事务都不允许执行</span>
<span class="line">	enforce-gtid-consistency = true</span>
<span class="line">	# 以下两条配置为主从切换, 数据库高可用的必须配置</span>
<span class="line">	# 开启 binlog 日志功能</span>
<span class="line">	log_bin = on</span>
<span class="line">	# 开启从库更新 binlog 日志</span>
<span class="line">	log-slave-updates = on</span>
<span class="line">	### 慢查询日志</span>
<span class="line">	# 打开慢查询日志功能</span>
<span class="line">	slow_query_log = 1</span>
<span class="line">	# 超过2秒的查询记录下来</span>
<span class="line">	long_query_time = 2</span>
<span class="line">	# 记录下没有使用索引的查询</span>
<span class="line">	log_queries_not_using_indexes = 1</span>
<span class="line">	slow_query_log_file = \${Mysql_path}/slow-\${MYSQL_PORY}.log</span>
<span class="line">	### 自动修复</span>
<span class="line">	# 记录 relay.info 到数据表中</span>
<span class="line">	relay_log_info_repository = TABLE</span>
<span class="line">	# 记录 master.info 到数据表中</span>
<span class="line">	master_info_repository = TABLE</span>
<span class="line">	# 启用 relaylog 的自动修复功能</span>
<span class="line">	relay_log_recovery = on</span>
<span class="line">	# 在 SQL 线程执行完一个 relaylog 后自动删除</span>
<span class="line">	relay_log_purge = 1</span>
<span class="line">	### 数据安全性配置</span>
<span class="line">	# 关闭 master 创建 function 的功能</span>
<span class="line">	log_bin_trust_function_creators = off</span>
<span class="line">	# 每执行一个事务都强制写入磁盘</span>
<span class="line">	sync_binlog = 1</span>
<span class="line">	# timestamp 列如果没有显式定义为 not null, 则支持null属性</span>
<span class="line">	# 设置 timestamp 的列值为 null, 不会被设置为 current timestamp</span>
<span class="line">	explicit_defaults_for_timestamp=true</span>
<span class="line">	### 优化配置</span>
<span class="line">	# 优化中文全文模糊索引</span>
<span class="line">	ft_min_word_len = 1</span>
<span class="line">	# 默认库名表名保存为小写, 不区分大小写</span>
<span class="line">	lower_case_table_names = 1</span>
<span class="line">	# 单条记录写入最大的大小限制</span>
<span class="line">	# 过小可能会导致写入(导入)数据失败</span>
<span class="line">	max_allowed_packet = 256M</span>
<span class="line">	# 半同步复制开启</span>
<span class="line">	#rpl_semi_sync_master_enabled = 1</span>
<span class="line">	#rpl_semi_sync_slave_enabled = 1</span>
<span class="line">	# 半同步复制超时时间设置</span>
<span class="line">	#rpl_semi_sync_master_timeout = 1000</span>
<span class="line">	# 复制模式(保持系统默认)</span>
<span class="line">	#rpl_semi_sync_master_wait_point = AFTER_SYNC</span>
<span class="line">	# 后端只要有一台收到日志并写入 relaylog 就算成功</span>
<span class="line">	#rpl_semi_sync_master_wait_slave_count = 1</span>
<span class="line">	# 多线程复制</span>
<span class="line">	#slave_parallel_type = logical_clock</span>
<span class="line">	#slave_parallel_workers = 4</span>
<span class="line">	### 连接数限制</span>
<span class="line">	max_connections = 1500</span>
<span class="line">	# 验证密码超过20次拒绝连接</span>
<span class="line">	max_connect_errors = 20</span>
<span class="line">	# back_log值指出在mysql暂时停止回答新请求之前的短时间内多少个请求可以被存在堆栈中</span>
<span class="line">	# 也就是说，如果MySql的连接数达到max_connections时，新来的请求将会被存在堆栈中</span>
<span class="line">	# 以等待某一连接释放资源，该堆栈的数量即back_log，如果等待连接的数量超过back_log</span>
<span class="line">	# 将不被授予连接资源</span>
<span class="line">	back_log = 500</span>
<span class="line">	open_files_limit = 65535</span>
<span class="line">	# 服务器关闭交互式连接前等待活动的秒数</span>
<span class="line">	interactive_timeout = 3600</span>
<span class="line">	# 服务器关闭非交互连接之前等待活动的秒数</span>
<span class="line">	wait_timeout = 3600</span>
<span class="line">	### 内存分配</span>
<span class="line">	# 指定表高速缓存的大小。每当MySQL访问一个表时，如果在表缓冲区中还有空间</span>
<span class="line">	# 该表就被打开并放入其中，这样可以更快地访问表内容</span>
<span class="line">	table_open_cache = 1024</span>
<span class="line">	# 为每个session 分配的内存, 在事务过程中用来存储二进制日志的缓存</span>
<span class="line">	binlog_cache_size = 2M</span>
<span class="line">	# 在内存的临时表最大大小</span>
<span class="line">	tmp_table_size = 128M</span>
<span class="line">	# 创建内存表的最大大小(保持系统默认, 不允许创建过大的内存表)</span>
<span class="line">	# 如果有需求当做缓存来用, 可以适当调大此值</span>
<span class="line">	max_heap_table_size = 16M</span>
<span class="line">	# 顺序读, 读入缓冲区大小设置</span>
<span class="line">	# 全表扫描次数多的话, 可以调大此值</span>
<span class="line">	read_buffer_size = 1M</span>
<span class="line">	# 随机读, 读入缓冲区大小设置</span>
<span class="line">	read_rnd_buffer_size = 8M</span>
<span class="line">	# 高并发的情况下, 需要减小此值到64K-128K</span>
<span class="line">	sort_buffer_size = 1M</span>
<span class="line">	# 每个查询最大的缓存大小是1M, 最大缓存64M 数据</span>
<span class="line">	query_cache_size = 64M</span>
<span class="line">	query_cache_limit = 1M</span>
<span class="line">	# 提到 join 的效率</span>
<span class="line">	join_buffer_size = 16M</span>
<span class="line">	# 线程连接重复利用</span>
<span class="line">	thread_cache_size = 64</span>
<span class="line">	### InnoDB 优化</span>
<span class="line">	## 内存利用方面的设置</span>
<span class="line">	# 数据缓冲区</span>
<span class="line">	innodb_buffer_pool_size=2G</span>
<span class="line">	## 日志方面设置</span>
<span class="line">	# 事务日志大小</span>
<span class="line">	innodb_log_file_size = 256M</span>
<span class="line">	# 日志缓冲区大小</span>
<span class="line">	innodb_log_buffer_size = 4M</span>
<span class="line">	# 事务在内存中的缓冲</span>
<span class="line">	innodb_log_buffer_size = 3M</span>
<span class="line">	# 主库保持系统默认, 事务立即写入磁盘, 不会丢失任何一个事务</span>
<span class="line">	innodb_flush_log_at_trx_commit = 1</span>
<span class="line">	# mysql 的数据文件设置, 初始100, 以10M 自动扩展</span>
<span class="line">	innodb_data_file_path = ibdata1:10M:autoextend</span>
<span class="line">	# 为提高性能, MySQL可以以循环方式将日志文件写到多个文件</span>
<span class="line">	innodb_log_files_in_group = 3</span>
<span class="line">	##其他设置</span>
<span class="line">	# 如果库里的表特别多的情况，请增加此值</span>
<span class="line">	innodb_open_files = 800</span>
<span class="line">	# 为每个 InnoDB 表分配单独的表空间</span>
<span class="line">	innodb_file_per_table = 1</span>
<span class="line">	# InnoDB 使用后台线程处理数据页上写 I/O(输入)请求的数量</span>
<span class="line">	innodb_write_io_threads = 8</span>
<span class="line">	# InnoDB 使用后台线程处理数据页上读 I/O(输出)请求的数量</span>
<span class="line">	innodb_read_io_threads = 8</span>
<span class="line">	# 启用单独的线程来回收无用的数据</span>
<span class="line">	innodb_purge_threads = 1</span>
<span class="line">	# 脏数据刷入磁盘(先保持系统默认, swap 过多使用时, 调小此值, 调小后, 与磁盘交互增多, 性能降低)</span>
<span class="line">	# innodb_max_dirty_pages_pct = 90</span>
<span class="line">	# 事务等待获取资源等待的最长时间</span>
<span class="line">	innodb_lock_wait_timeout = 120</span>
<span class="line">	# 开启 InnoDB 严格检查模式, 不警告, 直接报错</span>
<span class="line">	innodb_strict_mode=1</span>
<span class="line">	# 允许列索引最大达到3072</span>
<span class="line">	innodb_large_prefix = on</span>
<span class="line">	[mysqldump]</span>
<span class="line">	# 开启快速导出</span>
<span class="line">	quick</span>
<span class="line">	default-character-set = utf8mb4</span>
<span class="line">	max_allowed_packet = 256M</span>
<span class="line">	[mysql]</span>
<span class="line">	# 开启 tab 补全</span>
<span class="line">	auto-rehash</span>
<span class="line">	default-character-set = utf8mb4&quot;&gt; /data/mysql5.7/etc/61920.cnf</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="初始化数据库" tabindex="-1"><a class="header-anchor" href="#初始化数据库"><span>初始化数据库</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># rm -rf  /data/mysql5.7/data/* (如果有文件请删掉否则会报错)</span>
<span class="line">初始化数据</span>
<span class="line"># /data/mysql5.7/app/bin/mysqld --defaults-file=/data/mysql5.7/etc/61920.cnf --initialize --user=mysql</span>
<span class="line"></span>
<span class="line">启动数据库：</span>
<span class="line"># /data/mysql5.7/app/bin/mysqld_safe --defaults-file=/data/mysql5.7/etc/61920.cnf &amp;</span>
<span class="line"></span>
<span class="line">查看mysql是否启动成功</span>
<span class="line"># netstat -tunpl |grep mysql</span>
<span class="line"></span>
<span class="line">初始化完成的时候会提示生成了一个临时的Mysql root密码，记住</span>
<span class="line">A temporary password is generated for root@localhost: sTi:!,BhL7=s</span>
<span class="line"></span>
<span class="line">#修改密码：</span>
<span class="line"># /data/mysql5.7/app/bin/mysqladmin -u root -hlocalhost -P61920 -p&#39;sTi:!,BhL7=s&#39; password 123456</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-开机自启动mysql服务" tabindex="-1"><a class="header-anchor" href="#_7-开机自启动mysql服务"><span>7.开机自启动mysql服务</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">echo &quot;#开机启动mysql5.7&quot; &gt;&gt; /etc/rc.local</span>
<span class="line">echo &quot;/data/mysql5.7/app/bin/mysqld_safe --defaults-file=/data/mysql5.7/etc/61920.cnf &amp;&quot; &gt;&gt; /etc/rc.local</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-添加环境变量" tabindex="-1"><a class="header-anchor" href="#_8-添加环境变量"><span>8.添加环境变量</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># echo &quot;export PATH=$PATH:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin:\${Mysql_app}/bin&quot; &gt;&gt; /etc/profile</span>
<span class="line"># source /etc/profile</span>
<span class="line"># mysql -V</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-开启防火墙" tabindex="-1"><a class="header-anchor" href="#_9-开启防火墙"><span>9.开启防火墙</span></a></h2><p>如果有防火墙则开启</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># firewall-cmd 和 iptables选择其中一个，我这边用的是 iptables。</span>
<span class="line"># iptables</span>
<span class="line">iptables -I INPUT -p tcp --dport 61920 -j ACCEPT</span>
<span class="line">service iptables save</span>
<span class="line">systemctl restart iptables.service</span>
<span class="line">	</span>
<span class="line"># firewall</span>
<span class="line"># firewall-cmd --zone=public --add-port=61920/tcp --permanent</span>
<span class="line"># firewall-cmd --reload</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_10-基本操作" tabindex="-1"><a class="header-anchor" href="#_10-基本操作"><span>10.基本操作</span></a></h2><h3 id="进入实例mysql实例" tabindex="-1"><a class="header-anchor" href="#进入实例mysql实例"><span>进入实例mysql实例</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># mysql  -u root -hlocalhost -P&quot;61920&quot; -p&quot;123456&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="新增远程用户-root-mysql" tabindex="-1"><a class="header-anchor" href="#新增远程用户-root-mysql"><span>新增远程用户: root_mysql</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># mysql&gt; CREATE USER &#39;root_mysql&#39;@&#39;%&#39; IDENTIFIED BY &#39;12345678&#39;;</span>
<span class="line"># mysql&gt; GRANT  all privileges ON * . * TO &#39;root_mysql&#39;@&#39;%&#39; IDENTIFIED BY &#39;123456&#39;;</span>
<span class="line"># mysql&gt; GRANT ALL PRIVILEGES ON * . * TO &#39;root_mysql&#39;@&#39;%&#39; WITH GRANT OPTION MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0 ;</span>
<span class="line"># mysql&gt; flush privileges;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关闭实例" tabindex="-1"><a class="header-anchor" href="#关闭实例"><span>关闭实例</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"># mysqladmin -uroot -hlocalhost -P&quot;\${MYSQL_PORY}&quot; -p&quot;$Mysql_Password&quot;  shutdown</span>
<span class="line"># mysqladmin -uroot -hlocalhost -P&quot;61920&quot; -p&quot;123456&quot;  shutdown</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="启动mysql" tabindex="-1"><a class="header-anchor" href="#启动mysql"><span>启动mysql</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># mysqld_safe --defaults-file=/data/mysql5.7/etc/61920.cnf  &amp;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="shell脚本" tabindex="-1"><a class="header-anchor" href="#shell脚本"><span>SHELL脚本</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># wget https://gitee.com/funet8/MYSQL/raw/master/Mysql_Shell/CentOS7_Install_mysql5_7.sh</span>
<span class="line"># sh CentOS7_Install_mysql5_7.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div>`,39)]))}const p=n(i,[["render",d]]),r=JSON.parse('{"path":"/mysql/Centos7%E7%BC%96%E8%AF%91%E5%AE%89%E8%A3%85Mysql5.7.html","title":"Centos7编译安装Mysql5.7","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"mysql/Centos7编译安装Mysql5.7.md"}');export{p as comp,r as data};
