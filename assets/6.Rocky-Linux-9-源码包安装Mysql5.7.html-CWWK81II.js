import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as i,o as l}from"./app-B4PqXO1v.js";const e={};function p(d,s){return l(),a("div",null,s[0]||(s[0]=[i(`<h1 id="rocky-linux-9系统中源码包安装mysql5-7" tabindex="-1"><a class="header-anchor" href="#rocky-linux-9系统中源码包安装mysql5-7"><span>Rocky Linux 9系统中源码包安装Mysql5.7</span></a></h1><p>大家好，我是星哥，今天继续来盘盘Rocky Linux 9系统。</p><p>对于那些寻求在 Rocky Linux 9 上从源码编译安装 MySQL 5.7 的开发者和系统管理员来说，虽然 MySQL 5.7 已经不再是最新的版本，但在某些特定场景下，例如兼容性需求或深度定制，源码安装仍然是不可或缺的选项。</p><h2 id="为什么选择源码安装" tabindex="-1"><a class="header-anchor" href="#为什么选择源码安装"><span>为什么选择源码安装？</span></a></h2><p>通过源码包安装 MySQL 5.7 具有以下优势：</p><p><strong>最大程度的定制化：</strong> 你可以根据自己的需求，在编译时启用或禁用特定功能，优化性能。</p><p><strong>解决依赖问题：</strong> 对于一些特定环境，预编译包可能存在依赖冲突，源码安装可以更灵活地处理这些问题。</p><p><strong>学习和调试：</strong> 编译过程有助于深入理解 MySQL 的构建和运行机制，方便进行故障排除和性能调优。</p><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1751536295547.png?tx" alt="img"></p><h1 id="快速安装" tabindex="-1"><a class="header-anchor" href="#快速安装"><span>快速安装</span></a></h1><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 使用：</span></span>
<span class="line"><span># gitee:</span></span>
<span class="line"><span># wget https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/Rocky_Linux_9_Install_MySQL5_7.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_MySQL5_7.sh</span></span>
<span class="line"><span># github:</span></span>
<span class="line"><span># wget https://raw.githubusercontent.com/funet8/Rocky-Linux-Shell/refs/heads/main/shell/Rocky_Linux_9_Install_MySQL5_7.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_MySQL5_7.sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="功能介绍" tabindex="-1"><a class="header-anchor" href="#功能介绍"><span>功能介绍</span></a></h2><p>功能：Rocky Linux 9系统中源码包安装 mysql5.7</p><p>mysql安装的目录：/data/app/mysql5.7/install</p><p>mysql数据库目录:/data/app/mysql5.7/data</p><p>mysql数据库配置目录:/data/app/mysql5.7/etc</p><p>mysql数据库Binlog配置目录： /data/app/mysql5.7/binlog</p><p>mysql端口为： 61570</p><p>mysql root密码为： CQ1234567</p><h2 id="_0-定义变量" tabindex="-1"><a class="header-anchor" href="#_0-定义变量"><span>0.定义变量</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># --- 变量定义 ---</span></span>
<span class="line"><span>MYSQL_USER=&quot;mysql&quot;</span></span>
<span class="line"><span>MYSQL_GROUP=&quot;mysql&quot;</span></span>
<span class="line"><span># 打开MySQL-Community-Server官方下载页面: https://downloads.mysql.com/archives/community/</span></span>
<span class="line"><span># DOWNLOAD_URL=&quot;https://downloads.mysql.com/archives/get/p/23/file/mysql-boost-5.7.44.tar.gz&quot;</span></span>
<span class="line"><span>DOWNLOAD_URL=&quot;http://js.funet8.com/rocky-linux/mysql/mysql-boost-5.7.44.tar.gz&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>MYSQL_DIR=&quot;/data/software/&quot;</span></span>
<span class="line"><span>Mysql_path=&#39;/data/app/mysql5.7&#39;</span></span>
<span class="line"><span>#mysql安装的目录</span></span>
<span class="line"><span>Mysql_app=&#39;/data/app/mysql5.7/install&#39;</span></span>
<span class="line"><span>#mysql数据库目录</span></span>
<span class="line"><span>Mysql_data=&#39;/data/app/mysql5.7/data&#39;</span></span>
<span class="line"><span>#mysql数据库配置目录</span></span>
<span class="line"><span>Mysql_etc=&#39;/data/app/mysql5.7/etc&#39;</span></span>
<span class="line"><span>#mysql数据库binlog目录</span></span>
<span class="line"><span>Mysql_binlog=&#39;/data/app/mysql5.7/binlog&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>MYSQL_PORT=&quot;61570&quot; # 自定义端口</span></span>
<span class="line"><span># server_id来唯一的标识某个数据库实例，并在链式或双主复制结构中用它来避免sql语句的无限循环</span></span>
<span class="line"><span>Server_Id=&#39;1&#39;</span></span>
<span class="line"><span>MYSQL_PassWord=&quot;CQ1234567&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-创建用户" tabindex="-1"><a class="header-anchor" href="#_1-创建用户"><span>1.创建用户</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>groupadd mysql</span></span>
<span class="line"><span>useradd -M -g mysql -s /sbin/nologin mysql</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-安装依赖包" tabindex="-1"><a class="header-anchor" href="#_2-安装依赖包"><span>2.安装依赖包</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>dnf install -y make gcc-c++ cmake bison  perl autoconf ncurses-devel openssl-devel libtirpc</span></span>
<span class="line"><span>    mkdir /data/software/</span></span>
<span class="line"><span>    cd /data/software/</span></span>
<span class="line"><span>    wget http://js.funet8.com/rocky-linux/mysql/libtirpc-devel-1.3.3-9.el9.x86_64.rpm</span></span>
<span class="line"><span>    wget http://js.funet8.com/rocky-linux/mysql/rpcgen-1.4-9.el9.x86_64.rpm</span></span>
<span class="line"><span>    # 安装依赖包</span></span>
<span class="line"><span>    rpm -ivh libtirpc-devel-1.3.3-9.el9.x86_64.rpm</span></span>
<span class="line"><span>    rpm -ivh rpcgen-1.4-9.el9.x86_64.rpm</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-安装mysql" tabindex="-1"><a class="header-anchor" href="#_3-安装mysql"><span>3.安装mysql</span></a></h2><p>新建mysql目录</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>mkdir -p /data/app/mysql5.7 /data/app/mysql5.7/install /data/app/mysql5.7/data /data/app/mysql5.7/etc /data/app/mysql5.7/binlog</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>下载mysql，并且安装</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cd /data/software/</span></span>
<span class="line"><span>wget http://js.funet8.com/rocky-linux/mysql/mysql-boost-8.0.39.tar.gz</span></span>
<span class="line"><span>tar -zxvf mysql-boost-5.7.44.tar.gz</span></span>
<span class="line"><span>cd mysql-5.7.44/</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>cmake -DCMAKE_INSTALL_PREFIX=/data/app/mysql5.7/install -DMYSQL_DATADIR=/data/app/mysql5.7/data -DMYSQL_UNIX_ADDR=/data/app/mysql5.7/etc/mysql.sock -DSYSCONFDIR=/data/app/mysql5.7/install -DWITH_MYISAM_STORAGE_ENGINE=1 -DWITH_ARCHIVE_STORAGE_ENGINE=1 -DWITH_BLACKHOLE_STORAGE_ENGINE=1 -DWITH_INNOBASE_STORAGE_ENGINE=1 -DWITH_MEMORY_STORAGE_ENGINE=1 -DWITH_READLINE=1 -DMYSQL_TCP_PORT=61570 -DENABLED_LOCAL_INFILE=1 -DWITH_PARTITION_STORAGE_ENGINE=1 -DEXTRA_CHARSETS=all -DDEFAULT_CHARSET=utf8mb4 -DDEFAULT_COLLATION=utf8mb4_general_ci -DWITH_BOOST=boost/boost_1_59_0/</span></span>
<span class="line"><span>make &amp;&amp; make install</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-创建配置文件" tabindex="-1"><a class="header-anchor" href="#_4-创建配置文件"><span>4.创建配置文件</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vi /data/app/mysql5.7/etc/my.cnf</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>填写如下配置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>[client]</span></span>
<span class="line"><span>default-character-set = utf8mb4</span></span>
<span class="line"><span>[mysqld]</span></span>
<span class="line"><span>### 基本属性配置</span></span>
<span class="line"><span>port = 61570</span></span>
<span class="line"><span>datadir=/data/app/mysql5.7/data</span></span>
<span class="line"><span>socket=/data/app/mysql5.7/etc/mysql.sock</span></span>
<span class="line"><span># 禁用主机名解析</span></span>
<span class="line"><span>skip-name-resolve</span></span>
<span class="line"><span># 默认的数据库引擎</span></span>
<span class="line"><span>default-storage-engine = InnoDB</span></span>
<span class="line"><span>### 字符集配置</span></span>
<span class="line"><span>character-set-client-handshake = FALSE</span></span>
<span class="line"><span>character-set-server = utf8mb4</span></span>
<span class="line"><span>collation-server = utf8mb4_unicode_ci</span></span>
<span class="line"><span>init_connect=&#39;SET NAMES utf8mb4&#39;</span></span>
<span class="line"><span>### GTID</span></span>
<span class="line"><span># server_id来唯一的标识某个数据库实例，并在链式或双主复制结构中用它来避免sql语句的无限循环</span></span>
<span class="line"><span>server_id = 1</span></span>
<span class="line"><span># 为保证 GTID 复制的稳定, 行级日志</span></span>
<span class="line"><span>binlog_format = row</span></span>
<span class="line"><span># 开启 gtid 功能</span></span>
<span class="line"><span>gtid_mode = on</span></span>
<span class="line"><span># 保障 GTID 事务安全</span></span>
<span class="line"><span># 当启用enforce_gtid_consistency功能的时候,</span></span>
<span class="line"><span># MySQL只允许能够保障事务安全, 并且能够被日志记录的SQL语句被执行,</span></span>
<span class="line"><span># 像create table ... select 和 create temporarytable语句,</span></span>
<span class="line"><span># 以及同时更新事务表和非事务表的SQL语句或事务都不允许执行</span></span>
<span class="line"><span>enforce-gtid-consistency = true</span></span>
<span class="line"><span># 以下两条配置为主从切换, 数据库高可用的必须配置</span></span>
<span class="line"><span># 开启 binlog 日志功能</span></span>
<span class="line"><span>log_bin = /data/app/mysql5.7/binlog/mysql-bin</span></span>
<span class="line"><span># 开启从库更新 binlog 日志</span></span>
<span class="line"><span>log-slave-updates = on</span></span>
<span class="line"><span>### 慢查询日志</span></span>
<span class="line"><span># 打开慢查询日志功能</span></span>
<span class="line"><span>slow_query_log = 1</span></span>
<span class="line"><span># 超过2秒的查询记录下来</span></span>
<span class="line"><span>long_query_time = 2</span></span>
<span class="line"><span># 记录下没有使用索引的查询</span></span>
<span class="line"><span>log_queries_not_using_indexes = 1</span></span>
<span class="line"><span>slow_query_log_file = /data/app/mysql5.7/etc/slow-61570.log</span></span>
<span class="line"><span>### 自动修复</span></span>
<span class="line"><span># 记录 relay.info 到数据表中</span></span>
<span class="line"><span>relay_log_info_repository = TABLE</span></span>
<span class="line"><span># 记录 master.info 到数据表中</span></span>
<span class="line"><span>master_info_repository = TABLE</span></span>
<span class="line"><span># 启用 relaylog 的自动修复功能</span></span>
<span class="line"><span>relay_log_recovery = on</span></span>
<span class="line"><span># 在 SQL 线程执行完一个 relaylog 后自动删除</span></span>
<span class="line"><span>relay_log_purge = 1</span></span>
<span class="line"><span>### 数据安全性配置</span></span>
<span class="line"><span># 关闭 master 创建 function 的功能</span></span>
<span class="line"><span>log_bin_trust_function_creators = off</span></span>
<span class="line"><span># 每执行一个事务都强制写入磁盘</span></span>
<span class="line"><span>sync_binlog = 1</span></span>
<span class="line"><span># timestamp 列如果没有显式定义为 not null, 则支持null属性</span></span>
<span class="line"><span># 设置 timestamp 的列值为 null, 不会被设置为 current timestamp</span></span>
<span class="line"><span>explicit_defaults_for_timestamp=true</span></span>
<span class="line"><span>### 优化配置</span></span>
<span class="line"><span># 优化中文全文模糊索引</span></span>
<span class="line"><span>ft_min_word_len = 1</span></span>
<span class="line"><span># 默认库名表名保存为小写, 不区分大小写</span></span>
<span class="line"><span>lower_case_table_names = 1</span></span>
<span class="line"><span># 单条记录写入最大的大小限制</span></span>
<span class="line"><span># 过小可能会导致写入(导入)数据失败</span></span>
<span class="line"><span>max_allowed_packet = 256M</span></span>
<span class="line"><span># 半同步复制开启</span></span>
<span class="line"><span>#rpl_semi_sync_master_enabled = 1</span></span>
<span class="line"><span>#rpl_semi_sync_slave_enabled = 1</span></span>
<span class="line"><span># 半同步复制超时时间设置</span></span>
<span class="line"><span>#rpl_semi_sync_master_timeout = 1000</span></span>
<span class="line"><span># 复制模式(保持系统默认)</span></span>
<span class="line"><span>#rpl_semi_sync_master_wait_point = AFTER_SYNC</span></span>
<span class="line"><span># 后端只要有一台收到日志并写入 relaylog 就算成功</span></span>
<span class="line"><span>#rpl_semi_sync_master_wait_slave_count = 1</span></span>
<span class="line"><span># 多线程复制</span></span>
<span class="line"><span>#slave_parallel_type = logical_clock</span></span>
<span class="line"><span>#slave_parallel_workers = 4</span></span>
<span class="line"><span>### 连接数限制</span></span>
<span class="line"><span>max_connections = 3000</span></span>
<span class="line"><span># 验证密码超过20次拒绝连接</span></span>
<span class="line"><span>max_connect_errors = 20</span></span>
<span class="line"><span># back_log值指出在mysql暂时停止回答新请求之前的短时间内多少个请求可以被存在堆栈中</span></span>
<span class="line"><span># 也就是说，如果MySql的连接数达到max_connections时，新来的请求将会被存在堆栈中</span></span>
<span class="line"><span># 以等待某一连接释放资源，该堆栈的数量即back_log，如果等待连接的数量超过back_log</span></span>
<span class="line"><span># 将不被授予连接资源</span></span>
<span class="line"><span>back_log = 500</span></span>
<span class="line"><span>open_files_limit = 65535</span></span>
<span class="line"><span># 服务器关闭交互式连接前等待活动的秒数</span></span>
<span class="line"><span>interactive_timeout = 3600</span></span>
<span class="line"><span># 服务器关闭非交互连接之前等待活动的秒数</span></span>
<span class="line"><span>wait_timeout = 3600</span></span>
<span class="line"><span>### 内存分配</span></span>
<span class="line"><span># 指定表高速缓存的大小。每当MySQL访问一个表时，如果在表缓冲区中还有空间</span></span>
<span class="line"><span># 该表就被打开并放入其中，这样可以更快地访问表内容</span></span>
<span class="line"><span>table_open_cache = 1024</span></span>
<span class="line"><span># 为每个session 分配的内存, 在事务过程中用来存储二进制日志的缓存</span></span>
<span class="line"><span>binlog_cache_size = 2M</span></span>
<span class="line"><span># 在内存的临时表最大大小</span></span>
<span class="line"><span>tmp_table_size = 128M</span></span>
<span class="line"><span># 创建内存表的最大大小(保持系统默认, 不允许创建过大的内存表)</span></span>
<span class="line"><span># 如果有需求当做缓存来用, 可以适当调大此值</span></span>
<span class="line"><span>max_heap_table_size = 16M</span></span>
<span class="line"><span># 顺序读, 读入缓冲区大小设置</span></span>
<span class="line"><span># 全表扫描次数多的话, 可以调大此值</span></span>
<span class="line"><span>read_buffer_size = 1M</span></span>
<span class="line"><span># 随机读, 读入缓冲区大小设置</span></span>
<span class="line"><span>read_rnd_buffer_size = 8M</span></span>
<span class="line"><span># 高并发的情况下, 需要减小此值到64K-128K</span></span>
<span class="line"><span>sort_buffer_size = 1M</span></span>
<span class="line"><span># 每个查询最大的缓存大小是1M, 最大缓存64M 数据</span></span>
<span class="line"><span>query_cache_size = 64M</span></span>
<span class="line"><span>query_cache_limit = 1M</span></span>
<span class="line"><span># 提到 join 的效率</span></span>
<span class="line"><span>join_buffer_size = 16M</span></span>
<span class="line"><span># 线程连接重复利用</span></span>
<span class="line"><span>thread_cache_size = 64</span></span>
<span class="line"><span>### InnoDB 优化</span></span>
<span class="line"><span>## 内存利用方面的设置</span></span>
<span class="line"><span># 数据缓冲区</span></span>
<span class="line"><span>innodb_buffer_pool_size=2G</span></span>
<span class="line"><span>## 日志方面设置</span></span>
<span class="line"><span># 事务日志大小</span></span>
<span class="line"><span>innodb_log_file_size = 256M</span></span>
<span class="line"><span># 日志缓冲区大小</span></span>
<span class="line"><span>innodb_log_buffer_size = 4M</span></span>
<span class="line"><span># 事务在内存中的缓冲</span></span>
<span class="line"><span>#innodb_log_buffer_size = 3M</span></span>
<span class="line"><span># 主库保持系统默认, 事务立即写入磁盘, 不会丢失任何一个事务</span></span>
<span class="line"><span>innodb_flush_log_at_trx_commit = 1</span></span>
<span class="line"><span># mysql 的数据文件设置, 初始100, 以10M 自动扩展</span></span>
<span class="line"><span>innodb_data_file_path = ibdata1:10M:autoextend</span></span>
<span class="line"><span># 为提高性能, MySQL可以以循环方式将日志文件写到多个文件</span></span>
<span class="line"><span>innodb_log_files_in_group = 3</span></span>
<span class="line"><span>##其他设置</span></span>
<span class="line"><span># 如果库里的表特别多的情况，请增加此值</span></span>
<span class="line"><span>innodb_open_files = 800</span></span>
<span class="line"><span># 为每个 InnoDB 表分配单独的表空间</span></span>
<span class="line"><span>innodb_file_per_table = 1</span></span>
<span class="line"><span># InnoDB 使用后台线程处理数据页上写 I/O(输入)请求的数量</span></span>
<span class="line"><span>innodb_write_io_threads = 8</span></span>
<span class="line"><span># InnoDB 使用后台线程处理数据页上读 I/O(输出)请求的数量</span></span>
<span class="line"><span>innodb_read_io_threads = 8</span></span>
<span class="line"><span># 启用单独的线程来回收无用的数据</span></span>
<span class="line"><span>innodb_purge_threads = 1</span></span>
<span class="line"><span># 脏数据刷入磁盘(先保持系统默认, swap 过多使用时, 调小此值, 调小后, 与磁盘交互增多, 性能降低)</span></span>
<span class="line"><span># innodb_max_dirty_pages_pct = 90</span></span>
<span class="line"><span># 事务等待获取资源等待的最长时间</span></span>
<span class="line"><span>innodb_lock_wait_timeout = 120</span></span>
<span class="line"><span># 开启 InnoDB 严格检查模式, 不警告, 直接报错</span></span>
<span class="line"><span>innodb_strict_mode=1</span></span>
<span class="line"><span># 允许列索引最大达到3072</span></span>
<span class="line"><span>innodb_large_prefix = on</span></span>
<span class="line"><span>[mysqldump]</span></span>
<span class="line"><span># 开启快速导出</span></span>
<span class="line"><span>quick</span></span>
<span class="line"><span>default-character-set = utf8mb4</span></span>
<span class="line"><span>max_allowed_packet = 256M</span></span>
<span class="line"><span>[mysql]</span></span>
<span class="line"><span># 开启 tab 补全</span></span>
<span class="line"><span>auto-rehash</span></span>
<span class="line"><span>default-character-set = utf8mb4</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-mysql初始化" tabindex="-1"><a class="header-anchor" href="#_5-mysql初始化"><span>5.mysql初始化</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span></span></span>
<span class="line"><span>chown mysql.mysql -R /data/app/mysql5.7</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 初始化数据库</span></span>
<span class="line"><span>/data/app/mysql5.7/install/bin/mysqld --defaults-file=/data/app/mysql5.7/etc/my.cnf --initialize --user=mysql &gt; /data/app/mysql5.7/etc/mysql_install.log </span></span>
<span class="line"><span></span></span>
<span class="line"><span>#mysql初始密码</span></span>
<span class="line"><span>mysql_passwd_init=\`cat \${Mysql_etc}/mysql_install.log | grep  password |awk &#39;{print $NF}&#39;\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 启动mysql</span></span>
<span class="line"><span>/data/app/mysql5.7/install/support-files/mysql.server start</span></span>
<span class="line"><span></span></span>
<span class="line"><span>修改密码：</span></span>
<span class="line"><span>/data/app/mysql5.7/install/bin/mysqladmin -u root -hlocalhost -P61570 -p password CQ1234567</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 关闭mysql</span></span>
<span class="line"><span>/data/app/mysql5.7/install/support-files/mysql.server stop</span></span>
<span class="line"><span></span></span>
<span class="line"><span>再次执行：</span></span>
<span class="line"><span>chown mysql.mysql -R /data/app/mysql5.7</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-开机启动" tabindex="-1"><a class="header-anchor" href="#_6-开机启动"><span>6.开机启动</span></a></h2><p>使用 rc.local 作为启动文件。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>echo &quot;添加Mysql5.7开机自启动脚本&quot; &gt;&gt; /etc/rc.local</span></span>
<span class="line"><span>echo &quot;nohup \${Mysql_app}/bin/mysqld_safe --defaults-file=\${Mysql_etc}/my.cnf --user=\${MYSQL_USER} &gt; /dev/null 2&gt;&amp;1 &amp;&quot;&gt;&gt; /etc/rc.local</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#启用rc-local</span></span>
<span class="line"><span>systemctl enable rc-local</span></span>
<span class="line"><span>systemctl start rc-local</span></span>
<span class="line"><span>chmod +x /etc/rc.d/rc.local</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-添加环境变量" tabindex="-1"><a class="header-anchor" href="#_7-添加环境变量"><span>7.添加环境变量</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>echo &#39;#mysql5.7&#39; &gt;&gt; /etc/profile</span></span>
<span class="line"><span>echo &quot;export PATH=$PATH:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin:/data/app/mysql5.7/install/bin&quot; &gt;&gt; /etc/profile</span></span>
<span class="line"><span>source /etc/profile</span></span>
<span class="line"><span>mysql -V</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-开启防火墙" tabindex="-1"><a class="header-anchor" href="#_8-开启防火墙"><span>8.开启防火墙</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>firewall-cmd --zone=public --add-port=61570/tcp --permanent</span></span>
<span class="line"><span>firewall-cmd --reload</span></span>
<span class="line"><span># 查看所有端口</span></span>
<span class="line"><span>firewall-cmd --zone=public --list-ports</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-新建一个管理员账号" tabindex="-1"><a class="header-anchor" href="#_9-新建一个管理员账号"><span>9.新建一个管理员账号</span></a></h2><p>创建一个名字star账号，密码为 PASs5566a ，管理员权限的账号</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span></span></span>
<span class="line"><span>#  /data/app/mysql5.7/install/bin/mysql -u root -h localhost -P61570 -p&#39;CQ1234567&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># CREATE USER &#39;star&#39;@&#39;%&#39; IDENTIFIED BY &#39;PASs5566a&#39;;</span></span>
<span class="line"><span># GRANT  all privileges ON * . * TO &#39;star&#39;@&#39;%&#39; IDENTIFIED BY &#39;PASs5566a&#39;; </span></span>
<span class="line"><span># GRANT ALL PRIVILEGES ON * . * TO &#39;star&#39;@&#39;%&#39; WITH GRANT OPTION MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0 ;</span></span>
<span class="line"><span># flush privileges;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h1><p>以上就是通过源码包安装 MySQL 5.7 虽然的步骤，让你对 MySQL 的配置和运行有更深入的理解，并能满足特定的定制化需求。</p><p>在生产环境中，请务必关注安全性，定期备份数据，并根据实际负载对 MySQL 进行性能优化。</p><p>如果你在安装过程中遇到任何问题，欢迎在评论区留言交流！</p><p>写文不易，如果你都看到了这里，请点个赞和在看，分享给更多的朋友；也别忘了关注星哥玩云！这里有满满的干货分享，还有轻松有趣的技术交流～点个赞、分享给身边的小伙伴，一起成长，一起玩转技术世界吧！ 😊</p>`,51)]))}const v=n(e,[["render",p]]),t=JSON.parse('{"path":"/Rocky-Linux/6.Rocky-Linux-9-%E6%BA%90%E7%A0%81%E5%8C%85%E5%AE%89%E8%A3%85Mysql5.7.html","title":"Rocky Linux 9系统中源码包安装Mysql5.7","lang":"en-US","frontmatter":{},"git":{"createdTime":1752136049000,"updatedTime":1752136049000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}]},"readingTime":{"minutes":7.99,"words":2396},"filePathRelative":"Rocky-Linux/6.Rocky-Linux-9-源码包安装Mysql5.7.md"}');export{v as comp,t as data};
