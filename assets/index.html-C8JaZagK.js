import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as e}from"./app-BiQR_lPj.js";const l={};function p(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h1 id="使用xtrabackup备份和恢复mysql数据库" tabindex="-1"><a class="header-anchor" href="#使用xtrabackup备份和恢复mysql数据库"><span>使用xtrabackup备份和恢复mysql数据库</span></a></h1><h2 id="mysqldump" tabindex="-1"><a class="header-anchor" href="#mysqldump"><span>mysqldump</span></a></h2><p>一种逻辑备份方式，将数据转换成sql文件，其最大的缺陷就是备份和恢复时间很长，对于一个小于10G的数据库而言，这个速度还是可以接受的，但是如果数据库较大，那在使用mysqldump备份就非常不合适了。</p><h2 id="lvm" tabindex="-1"><a class="header-anchor" href="#lvm"><span>lvm</span></a></h2><p>是一种采用逻辑卷快照功能对数据进行备份，可以实现几乎热备，但是备份过程较为复杂(来回切换终端)，很难用shell脚本直接实现，不过现在似乎有个工具mylvmbackup可以实现自动化备份，但是没有尝试过。</p><h2 id="xtrabackup" tabindex="-1"><a class="header-anchor" href="#xtrabackup"><span>Xtrabackup</span></a></h2><p>对MyISAM表只能实现温备，并且不支持增量备份，所以每次对MyISAM表备份都是全备。</p><p>XtraBackup更多高级特性通常只能在innodb存储引擎上实现，而且高级特性还都依赖于mysql数据库对innodb引擎实现了单独表空间，否则没办法实现单表或单库导出</p><p>那么今天就和大家聊聊第三款开源备份工具xtrabackup：</p><p>官方站点：http://www.percona.com</p><p>官方在线文档：http://www.percona.com/doc/percona-xtrabackup/2.2/</p><p>最新软件包下载地址：http://www.percona.com/downloads/XtraBackup/</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>mysql&gt; show global variables like &#39;%innodb_file_per_table%&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>+-----------------------+-------+</span></span>
<span class="line"><span>| Variable_name         | Value |</span></span>
<span class="line"><span>+-----------------------+-------+</span></span>
<span class="line"><span>| innodb_file_per_table | ON    |</span></span>
<span class="line"><span>+-----------------------+-------+</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="系统说明" tabindex="-1"><a class="header-anchor" href="#系统说明"><span>系统说明</span></a></h2><p>系统：CentOS release 6.7 数据库： 10.0.25-MariaDB 数据库目录： /var/lib/mysql --软连接--&gt; /data/mysql 备份目录：/backup/</p><h1 id="二、安装" tabindex="-1"><a class="header-anchor" href="#二、安装"><span>二、安装</span></a></h1><p>XtraBackup本篇文章采用yum安装方式</p><h2 id="_1、yum安装" tabindex="-1"><a class="header-anchor" href="#_1、yum安装"><span>1、yum安装</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># wget http://www.percona.com/downloads/XtraBackup/XtraBackup-2.2.9/binary/redhat/6/x86_64/percona-xtrabackup-2.2.9-5067.el6.x86_64.rpm</span></span>
<span class="line"><span># rpm -ivh percona-xtrabackup-2.2.9-5067.el6.x86_64.rpm</span></span>
<span class="line"><span>warning: percona-xtrabackup-2.2.9-5067.el6.x86_64.rpm: Header V4 DSA/SHA1 Signature, key ID cd2efd2a: NOKEY</span></span>
<span class="line"><span>error: Failed dependencies:</span></span>
<span class="line"><span>        perl(DBD::mysql) is needed by percona-xtrabackup-2.2.9-5067.el6.x86_64</span></span>
<span class="line"><span>        perl(Time::HiRes) is needed by percona-xtrabackup-2.2.9-5067.el6.x86_64</span></span>
<span class="line"><span># yum -y install perl-Time-HiRes perl-DBD-MySQL perl-IO-Socket-SSL</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、查看xtrabackup安装的工具" tabindex="-1"><a class="header-anchor" href="#_2、查看xtrabackup安装的工具"><span>2、查看Xtrabackup安装的工具</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># rpm -ql percona-xtrabackup |grep bin</span></span>
<span class="line"><span>/usr/bin/innobackupex</span></span>
<span class="line"><span>/usr/bin/xbcrypt</span></span>
<span class="line"><span>/usr/bin/xbstream</span></span>
<span class="line"><span>/usr/bin/xtrabackup</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、xtrabackup中主要包含了三个工具" tabindex="-1"><a class="header-anchor" href="#_3、xtrabackup中主要包含了三个工具"><span>3、XtraBackup中主要包含了三个工具</span></a></h2><p>xbsteam 支持流式备份 xtrbackup 用于热备innodb、xtradb表中数据的工具，不能备份其它类型的表，也不能备份数据表结构 innobackupex 是将xtrabackup进行封装的perl脚本，提供了备份MyISAM表的能力</p><h1 id="三、innobackupex几个非常重要的参数" tabindex="-1"><a class="header-anchor" href="#三、innobackupex几个非常重要的参数"><span>三、innobackupex几个非常重要的参数</span></a></h1><p>--apply-log 一般情况下，在备份完成后，数据尚且不能用于恢复操作，因为备份的数据中可能会包含尚未提交的事务或已经提交但尚未同步至数据文件中的事务。因此，此时数据文件仍处理不一致状态。“准备”的主要作用正是通过回滚未提交的事务及同步已经提交的事务至数据文件也使得数据文件处于一致性状态。</p><p>--redo-only 准备(prepare)增量备份与整理完全备份有着一些不同，尤其要注意的是： (1)需要在每个备份(包括完全和各个增量备份)上，将已经提交的事务进行“重放”。“重放”之后，所有的备份数据将合并到完全备份上。 (2)基于所有的备份将未提交的事务进行“回滚”。</p><p>--copy-back 该选项用于执行恢复(还原)操作，其通过复制所有数据相关的文件至mysql服务器DATADIR目录中来执行恢复过程。innobackupex通过backup-my.cnf来获取DATADIR目录的相关信息。</p><h1 id="四、innobackup备份语法" tabindex="-1"><a class="header-anchor" href="#四、innobackup备份语法"><span>四、innobackup备份语法</span></a></h1><h2 id="_1-完全备份-完全恢复" tabindex="-1"><a class="header-anchor" href="#_1-完全备份-完全恢复"><span>1.完全备份+完全恢复</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>完全备份</span></span>
<span class="line"><span># innobackupex --user=DBUSER --password=DBUSERPASS  /path/to/BACKUP-DIR/</span></span>
<span class="line"><span>innobackupex --user=root --password=123456  /backup</span></span>
<span class="line"><span>准备一个完全备份</span></span>
<span class="line"><span>innobackupex --apply-log  /path/to/BACKUP-DIR</span></span>
<span class="line"><span></span></span>
<span class="line"><span>从一个完全备份中恢复数据</span></span>
<span class="line"><span># innobackupex --copy-back /path/to/BACKUP-DIR</span></span>
<span class="line"><span>innobackupex --copy-back /backup</span></span>
<span class="line"><span></span></span>
<span class="line"><span>修改datadir目录权限</span></span>
<span class="line"><span># chown -R  mysql:mysql  /mydata/data/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>innobackupex --defaults-file=/etc/my.cnf --user=root  --copy-back /backup/2016-07-07_14-32-33/</span></span>
<span class="line"><span>恢复操作出现错误</span></span>
<span class="line"><span>innobackupex: Error: no &#39;datadir&#39; option in group &#39;mysqld&#39; in server configuration file &#39;/etc/my.cnf&#39; at /usr/bin/innobackupex line 4506.</span></span>
<span class="line"><span>解决办法：</span></span>
<span class="line"><span>vi /etc/my.cnf 在[mysqld]选项下面添加：</span></span>
<span class="line"><span>datadir                = /data/mysql</span></span>
<span class="line"><span>出现错误：</span></span>
<span class="line"><span>innobackupex: Error: Original data directory &#39;/data/mysql&#39; is not empty! at /usr/bin/innobackupex line 2194.</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-完全备份-增量备份-完全恢复" tabindex="-1"><a class="header-anchor" href="#_2-完全备份-增量备份-完全恢复"><span>2.完全备份+增量备份+完全恢复</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>完全备份：</span></span>
<span class="line"><span># innobackupex --user=DBUSER --password=DBUSERPASS  /path/to/BACKUP-DIR/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第一次增量备份</span></span>
<span class="line"><span># innobackupex --user=DBUSER --password=DBUSERPASS --incremental /backup --incremental-basedir=BASEDIR</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第二次增量备份</span></span>
<span class="line"><span># innobackupex --user=DBUSER --password=DBUSERPASS --incremental /backup --incremental-basedir=BASEDIR</span></span>
<span class="line"><span></span></span>
<span class="line"><span>准备：</span></span>
<span class="line"><span>执行完全备份redo</span></span>
<span class="line"><span></span></span>
<span class="line"><span># innobackupex --apply-log --redo-only BASE-DIR</span></span>
<span class="line"><span>执行第一次增量备份redo</span></span>
<span class="line"><span></span></span>
<span class="line"><span># innobackupex --apply-log --redo-only BASE-DIR --incremental-dir=INCREMENTAL-DIR-1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>执行第二次增量备份redo</span></span>
<span class="line"><span></span></span>
<span class="line"><span># innobackupex --apply-log --redo-only BASE-DIR --incremental-dir=INCREMENTAL-DIR-2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>还原：</span></span>
<span class="line"><span></span></span>
<span class="line"><span># innobackupex --copy-back BASE-DIR</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解释：</span></span>
<span class="line"><span>其中BASE-DIR指的是完全备份所在的目录，</span></span>
<span class="line"><span>而INCREMENTAL-DIR-1指的是第一次增量备份的目录，</span></span>
<span class="line"><span>INCREMENTAL-DIR-2指的是第二次增量备份的目录，</span></span>
<span class="line"><span>其它依次类推，即如果有多次增量备份，每一次都要执行如上操作；</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="五、以上两种方式案列重放" tabindex="-1"><a class="header-anchor" href="#五、以上两种方式案列重放"><span>五、以上两种方式案列重放</span></a></h1><h2 id="_1-完全备份-完全恢复-1" tabindex="-1"><a class="header-anchor" href="#_1-完全备份-完全恢复-1"><span>1.完全备份+完全恢复</span></a></h2><h3 id="_1、实验前的准备工作" tabindex="-1"><a class="header-anchor" href="#_1、实验前的准备工作"><span>1、实验前的准备工作</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># service mysqld stop</span></span>
<span class="line"><span># rm -rf /mydata/data/*	</span></span>
<span class="line"><span># /usr/local/mysql/scripts/mysql_install_db --user=mysql --datadir=/mydata/data/ --basedir=/usr/local/mysql/</span></span>
<span class="line"><span># service mysqld start</span></span>
<span class="line"><span># mysqladmin -uroot -p password 123456</span></span>
<span class="line"><span># mysql -uroot -p123456</span></span>
<span class="line"><span>mysql&gt; create database jiaowu;</span></span>
<span class="line"><span>mysql&gt; use jiaowu;</span></span>
<span class="line"><span>mysql&gt; set sql_log_bin = 0;</span></span>
<span class="line"><span>mysql&gt; source /root/tutor.sql;    //导入tutor数据表</span></span>
<span class="line"><span>mysql&gt; set sql_log_bin = 1;</span></span>
<span class="line"><span>mysql&gt; select * from tutor;</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span>| TID  | Tname         | Gender | Age  |</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span>|    1 | ZhengYansheng | M      |   25 |</span></span>
<span class="line"><span>|    2 | LiJian        | M      |   26 |</span></span>
<span class="line"><span>|    3 | OuYangyu      | M      |   27 |</span></span>
<span class="line"><span>|    4 | LuoChenghui   | M      |   25 |</span></span>
<span class="line"><span>|    5 | LiuYunbo      | M      |   25 |</span></span>
<span class="line"><span>|    6 | FuJian        | M      |   24 |</span></span>
<span class="line"><span>|    7 | LiMenglu      | F      |   23 |</span></span>
<span class="line"><span>|    8 | BaoYintu      | M      |   28 |</span></span>
<span class="line"><span>|    9 | WangYana      | F      |   25 |</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span>9 rows in set (0.00 sec)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、innobackupex对db进行完全备份" tabindex="-1"><a class="header-anchor" href="#_2、innobackupex对db进行完全备份"><span>2、innobackupex对DB进行完全备份</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># innobackupex --user=root --password=123456 /backup/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果执行正确，其最后输出的几行信息通常如下：</span></span>
<span class="line"><span>innobackupex: Backup created in directory &#39;/backup/2015-03-18_21-00-17&#39;</span></span>
<span class="line"><span>innobackupex: MySQL binlog position: filename &#39;mysql-bin.000003&#39;, position 332</span></span>
<span class="line"><span>150318 21:00:23  innobackupex: Connection to database server closed</span></span>
<span class="line"><span>150318 21:00:23  innobackupex: completed OK!</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、查看备份目录和文件" tabindex="-1"><a class="header-anchor" href="#_3、查看备份目录和文件"><span>3、查看备份目录和文件</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># ls /backup/</span></span>
<span class="line"><span>2015-03-18_21-00-17</span></span>
<span class="line"><span># ls /backup/2015-03-18_21-00-17/</span></span>
<span class="line"><span>backup-my.cnf  jiaowu  performance_schema  xtrabackup_binlog_info  xtrabackup_info</span></span>
<span class="line"><span>ibdata1        mysql   test                xtrabackup_checkpoints  xtrabackup_logfile</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、准备一个完全备份" tabindex="-1"><a class="header-anchor" href="#_4、准备一个完全备份"><span>4、准备一个完全备份</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># innobackupex --user=root --password=123456 --apply-log /backup/2015-03-18_21-00-17/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_5、这里还是采用老方法直接删除所有的数据文件" tabindex="-1"><a class="header-anchor" href="#_5、这里还是采用老方法直接删除所有的数据文件"><span>5、这里还是采用老方法直接删除所有的数据文件</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># service mysqld stop</span></span>
<span class="line"><span># rm -rf /mydata/data/*</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6、从一个完全备份中恢复数据库" tabindex="-1"><a class="header-anchor" href="#_6、从一个完全备份中恢复数据库"><span>6、从一个完全备份中恢复数据库</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>innobackupex --copy-back /backup/2015-03-18_21-00-17/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_7、修改数据目录权限" tabindex="-1"><a class="header-anchor" href="#_7、修改数据目录权限"><span>7、修改数据目录权限</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># chown -R mysql.mysql /mydata/data/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_8、启动mysqld服务" tabindex="-1"><a class="header-anchor" href="#_8、启动mysqld服务"><span>8、启动mysqld服务</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>service mysqld start</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_9、登陆mysql查看是否是否一致" tabindex="-1"><a class="header-anchor" href="#_9、登陆mysql查看是否是否一致"><span>9、登陆mysql查看是否是否一致</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># mysql -e &#39;use jiaowu;select * from tutor;&#39;</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span>| TID  | Tname         | Gender | Age  |</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span>|    1 | ZhengYansheng | M      |   25 |</span></span>
<span class="line"><span>|    2 | LiJian        | M      |   26 |</span></span>
<span class="line"><span>|    3 | OuYangyu      | M      |   27 |</span></span>
<span class="line"><span>|    4 | LuoChenghui   | M      |   25 |</span></span>
<span class="line"><span>|    5 | LiuYunbo      | M      |   25 |</span></span>
<span class="line"><span>|    6 | FuJian        | M      |   24 |</span></span>
<span class="line"><span>|    7 | LiMenglu      | F      |   23 |</span></span>
<span class="line"><span>|    8 | BaoYintu      | M      |   28 |</span></span>
<span class="line"><span>|    9 | WangYana      | F      |   25 |</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数据已经成功恢复到数据库当中</p><h2 id="_2-完全备份-增量备份-完全恢复-1" tabindex="-1"><a class="header-anchor" href="#_2-完全备份-增量备份-完全恢复-1"><span>2.完全备份+增量备份+完全恢复</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>1、实验前的准备工作</span></span>
<span class="line"><span># service mysqld stop</span></span>
<span class="line"><span># rm -rf /mydata/data/*     //删除原来的备份文件</span></span>
<span class="line"><span># rm -rf /backup/*</span></span>
<span class="line"><span># /usr/local/mysql/scripts/mysql_install_db --user=mysql --datadir=/mydata/data/ --basedir=/usr/local/mysql/</span></span>
<span class="line"><span># service mysqld start</span></span>
<span class="line"><span># mysqladmin -uroot -p password 123456</span></span>
<span class="line"><span># mysql -uroot -p123456</span></span>
<span class="line"><span>mysql&gt; create database jiaowu;</span></span>
<span class="line"><span>mysql&gt; use jiaowu;</span></span>
<span class="line"><span>mysql&gt; set sql_log_bin = 0;</span></span>
<span class="line"><span>mysql&gt; source /root/tutor.sql;   //导入tutor数据表</span></span>
<span class="line"><span>mysql&gt; set sql_log_bin = 1;</span></span>
<span class="line"><span>mysql&gt; select * from tutor;</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span>| TID  | Tname         | Gender | Age  |</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span>|    1 | ZhengYansheng | M      |   25 |</span></span>
<span class="line"><span>|    2 | LiJian        | M      |   26 |</span></span>
<span class="line"><span>|    3 | OuYangyu      | M      |   27 |</span></span>
<span class="line"><span>|    4 | LuoChenghui   | M      |   25 |</span></span>
<span class="line"><span>|    5 | LiuYunbo      | M      |   25 |</span></span>
<span class="line"><span>|    6 | FuJian        | M      |   24 |</span></span>
<span class="line"><span>|    7 | LiMenglu      | F      |   23 |</span></span>
<span class="line"><span>|    8 | BaoYintu      | M      |   28 |</span></span>
<span class="line"><span>|    9 | WangYana      | F      |   25 |</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span>9 rows in set (0.00 sec)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2、innobackupex对DB进行完全备份</span></span>
<span class="line"><span># innobackupex --user=root --password=123456 /backup/</span></span>
<span class="line"><span>如果执行正确，其最后输出的几行信息通常如下：</span></span>
<span class="line"><span>innobackupex: Backup created in directory &#39;/backup/2015-03-18_21-14-49&#39;</span></span>
<span class="line"><span>innobackupex: MySQL binlog position: filename &#39;mysql-bin.000003&#39;, position 332</span></span>
<span class="line"><span>150318 21:14:54  innobackupex: Connection to database server closed</span></span>
<span class="line"><span>150318 21:14:54  innobackupex: completed OK!</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3、仅查看备份目录</span></span>
<span class="line"><span># ls /backup/</span></span>
<span class="line"><span>2015-03-18_21-14-49</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4、操作数据库并插入数据</span></span>
<span class="line"><span># mysql jiaowu;</span></span>
<span class="line"><span>mysql&gt; insert into tutor(TID) values(11);</span></span>
<span class="line"><span>mysql&gt; insert into tutor(TID) values(12);</span></span>
<span class="line"><span>mysql&gt; insert into tutor(TID) values(13);</span></span>
<span class="line"><span>mysql&gt; select * from tutor;</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span>| TID  | Tname         | Gender | Age  |</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span>|    1 | ZhengYansheng | M      |   25 |</span></span>
<span class="line"><span>|    2 | LiJian        | M      |   26 |</span></span>
<span class="line"><span>|    3 | OuYangyu      | M      |   27 |</span></span>
<span class="line"><span>|    4 | LuoChenghui   | M      |   25 |</span></span>
<span class="line"><span>|    5 | LiuYunbo      | M      |   25 |</span></span>
<span class="line"><span>|    6 | FuJian        | M      |   24 |</span></span>
<span class="line"><span>|    7 | LiMenglu      | F      |   23 |</span></span>
<span class="line"><span>|    8 | BaoYintu      | M      |   28 |</span></span>
<span class="line"><span>|    9 | WangYana      | F      |   25 |</span></span>
<span class="line"><span>|   11 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   12 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   13 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span>12 rows in set (0.00 sec)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5、执行第一次增量备份并查看备份目录</span></span>
<span class="line"><span># innobackupex --user=root --password=123456 --incremental /backup/ --incremental-basedir=/backup/2015-03-18_21-14-49/</span></span>
<span class="line"><span># ls /backup/</span></span>
<span class="line"><span>2015-03-18_21-14-49  2015-03-18_21-18-45</span></span>
<span class="line"><span></span></span>
<span class="line"><span>6、再次操作数据库并插入多条数据</span></span>
<span class="line"><span># mysql jiaowu;</span></span>
<span class="line"><span>mysql&gt; insert into tutor(TID) values(21);</span></span>
<span class="line"><span>mysql&gt; insert into tutor(TID) values(22);</span></span>
<span class="line"><span>mysql&gt; insert into tutor(TID) values(23);</span></span>
<span class="line"><span>mysql&gt; select * from tutor;</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span>| TID  | Tname         | Gender | Age  |</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span>|    1 | ZhengYansheng | M      |   25 |</span></span>
<span class="line"><span>|    2 | LiJian        | M      |   26 |</span></span>
<span class="line"><span>|    3 | OuYangyu      | M      |   27 |</span></span>
<span class="line"><span>|    4 | LuoChenghui   | M      |   25 |</span></span>
<span class="line"><span>|    5 | LiuYunbo      | M      |   25 |</span></span>
<span class="line"><span>|    6 | FuJian        | M      |   24 |</span></span>
<span class="line"><span>|    7 | LiMenglu      | F      |   23 |</span></span>
<span class="line"><span>|    8 | BaoYintu      | M      |   28 |</span></span>
<span class="line"><span>|    9 | WangYana      | F      |   25 |</span></span>
<span class="line"><span>|   11 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   12 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   13 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   21 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   22 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   23 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span>15 rows in set (0.00 sec)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>7、执行第二次增量备份并查看备份文件</span></span>
<span class="line"><span># innobackupex --user=root --password=123456 --incremental /backup/ --incremental-basedir=/backup/2015-03-18_21-18-45/</span></span>
<span class="line"><span># ls /backup/</span></span>
<span class="line"><span>2015-03-18_21-14-49  2015-03-18_21-18-45  2015-03-18_21-22-31</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解释：</span></span>
<span class="line"><span>2015-03-18_21-14-49：为innobackupex的完全备份目录</span></span>
<span class="line"><span>2015-03-18_21-18-45：为innobackupex的第一次增量备份目录</span></span>
<span class="line"><span>2015-03-18_21-22-31：为innobackupex的第二次增量备份目录</span></span>
<span class="line"><span></span></span>
<span class="line"><span>8、开始准备innobackupex</span></span>
<span class="line"><span>首先执行完全备份redo-only</span></span>
<span class="line"><span># innobackupex --user=root --password=123456 --apply-log --redo-only /backup/2015-03-18_21-14-49/</span></span>
<span class="line"><span>执行第一个增量备份redo-only</span></span>
<span class="line"><span># innobackupex --user=root --password=123456 --apply-log --redo-only /backup/2015-03-18_21-14-49/ --incremental-dir=/backup/2015-03-18_21-18-45/</span></span>
<span class="line"><span>执行第二个增量备份redo-only</span></span>
<span class="line"><span># innobackupex --user=root --password=123456 --apply-log --redo-only /backup/2015-03-18_21-14-49/ --incremental-dir=/backup/2015-03-18_21-22-31/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#####模拟数据库故障#####</span></span>
<span class="line"><span>9、这里还是采用老方法直接删除所有的数据文件</span></span>
<span class="line"><span># service mysqld stop</span></span>
<span class="line"><span># rm -rf /mydata/data/*</span></span>
<span class="line"><span></span></span>
<span class="line"><span>10、从完全备份中恢复数据库</span></span>
<span class="line"><span># innobackupex --user=root --password=123456 --copy-back /backup/2015-03-18_21-14-49/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>11、修改数据目录权限</span></span>
<span class="line"><span># chown -R mysql.mysql /mydata/data/</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>12、启动mysqld服务</span></span>
<span class="line"><span># service mysqld start</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>13、登陆mysql查看是否是否一致</span></span>
<span class="line"><span># mysql -e &#39;use jiaowu;select * from tutor;&#39;</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span>| TID  | Tname         | Gender | Age  |</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span>|    1 | ZhengYansheng | M      |   25 |</span></span>
<span class="line"><span>|    2 | LiJian        | M      |   26 |</span></span>
<span class="line"><span>|    3 | OuYangyu      | M      |   27 |</span></span>
<span class="line"><span>|    4 | LuoChenghui   | M      |   25 |</span></span>
<span class="line"><span>|    5 | LiuYunbo      | M      |   25 |</span></span>
<span class="line"><span>|    6 | FuJian        | M      |   24 |</span></span>
<span class="line"><span>|    7 | LiMenglu      | F      |   23 |</span></span>
<span class="line"><span>|    8 | BaoYintu      | M      |   28 |</span></span>
<span class="line"><span>|    9 | WangYana      | F      |   25 |</span></span>
<span class="line"><span>|   11 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   12 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   13 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   21 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   22 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   23 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#两次增量添加的数据也已经成功添加到数据库当中。恢复成功</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="六、xtrabackup的高级功能" tabindex="-1"><a class="header-anchor" href="#六、xtrabackup的高级功能"><span>六、Xtrabackup的高级功能</span></a></h1><h2 id="流式压缩功能" tabindex="-1"><a class="header-anchor" href="#流式压缩功能"><span>流式压缩功能</span></a></h2><p>Xtrabackup对备份的数据文件支持“流”功能，即可以将备份的数据通过STDOUT传输给tar程序进行归档，而不是默认的直接保存至某备份目录中。要使用此功能，仅需要使用--stream选项即可。如：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># innobackupex --user=root --password=123456 --stream=tar  /backup | gzip &gt; /backup/\`date +%F_%H-%M-%S\`.tar.gz</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>甚至也可以使用类似如下命令将数据备份至其它服务器：强烈推荐这种方式</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>innobackupex --user=root --password=123456 --stream=tar  /backup | ssh root@192.168.1.100  &#39;cat - &gt; /backup/\`date +%F_%H-%M-%S\`.tar&#39;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>在执行本地备份时，还可以使用--parallel选项对多个文件进行并行复制（暂时还没有看懂此选项）</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>此外，在执行本地备份时，还可以使用--parallel选项对多个文件进行并行复制。此选项用于指定在复制时启动的线程数目。当然，在实际进行备份时要利用此功能的便利性，也需要启用innodb_file_per_table选项或共享的表空间通过innodb_data_file_path选项存储在多个ibdata文件中。对某一数据库的多个文件的复制无法利用到此功能。其简单使用方法如下：</span></span>
<span class="line"><span></span></span>
<span class="line"><span># innobackupex --parallel  /path/to/backup</span></span>
<span class="line"><span></span></span>
<span class="line"><span>同时，innobackupex备份的数据文件也可以存储至远程主机，这可以使用--remote-host选项来实现：</span></span>
<span class="line"><span></span></span>
<span class="line"><span># innobackupex --remote-host=root@www.magedu.com  /path/IN/REMOTE/HOST/to/backup</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="七、使用xtrabackup对数据库进行部分备份" tabindex="-1"><a class="header-anchor" href="#七、使用xtrabackup对数据库进行部分备份"><span>七、使用Xtrabackup对数据库进行部分备份</span></a></h1><p>Xtrabackup也可以实现部分备份，即只备份某个或某些指定的数据库或某数据库中的某个或某些表。但要使用此功能，必须启用innodb_file_per_table选项，即每张表保存为一个独立的文件。同时，其也不支持--stream选项，即不支持将数据通过管道传输给其它程序进行处理。</p><p>此外，还原部分备份跟还原全部数据的备份也有所不同，即你不能通过简单地将prepared的部分备份使用--copy-back选项直接复制回数据目录，而是要通过导入表的方向来实现还原。当然，有些情况下，部分备份也可以直接通过--copy-back进行还原，但这种方式还原而来的数据多数会产生数据不一致的问题，因此，无论如何不推荐使用这种方式。</p><h3 id="_1-创建部分备份" tabindex="-1"><a class="header-anchor" href="#_1-创建部分备份"><span>1)创建部分备份</span></a></h3><p>创建部分备份的方式有三种：</p><p>正则表达式(--include)</p><p>枚举表文件(--tables-file)</p><p>列出要备份的数据库(--databases)。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>(a)使用--include</span></span>
<span class="line"><span>使用--include时，要求为其指定要备份的表的完整名称，即形如databasename.tablename，如：</span></span>
<span class="line"><span># innobackupex --include=&#39;^mageedu[.]tb1&#39;  /path/to/backup</span></span>
<span class="line"><span></span></span>
<span class="line"><span>(b)使用--tables-file</span></span>
<span class="line"><span>此选项的参数需要是一个文件名，此文件中每行包含一个要备份的表的完整名称；如：</span></span>
<span class="line"><span># echo -e &#39;mageedu.tb1\\nmageedu.tb2&#39; &gt; /tmp/tables.txt</span></span>
<span class="line"><span># innobackupex --tables-file=/tmp/tables.txt  /path/to/backup</span></span>
<span class="line"><span></span></span>
<span class="line"><span>(c)使用--databases</span></span>
<span class="line"><span>此选项接受的参数为数据名，如果要指定多个数据库，彼此间需要以空格隔开；同时，在指定某数据库时，也可以只指定其中的某张表。此外，此选项也可以接受一个文件为参数，文件中每一行为一个要备份的对象。如：</span></span>
<span class="line"><span># innobackupex --databases=&quot;mageedu testdb&quot;  /path/to/backup</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-整理-preparing-部分备份" tabindex="-1"><a class="header-anchor" href="#_2-整理-preparing-部分备份"><span>2)整理(preparing)部分备份</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>prepare部分备份的过程类似于导出表的过程，要使用--export选项进行：</span></span>
<span class="line"><span># innobackupex --apply-log --export  /pat/to/partial/backup</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>此命令执行过程中，innobackupex会调用xtrabackup命令从数据字典中移除缺失的表，因此，会显示出许多关于“表不存在”类的警告信息。同时，也会显示出为备份文件中存在的表创建.exp文件的相关信息。</p><h3 id="_3-还原部分备份" tabindex="-1"><a class="header-anchor" href="#_3-还原部分备份"><span>3)还原部分备份</span></a></h3><p>还原部分备份的过程跟导入表的过程相同。当然，也可以通过直接复制prepared状态的备份直接至数据目录中实现还原，不要此时要求数据目录处于一致状态。</p><p>案列演示：</p><p>对jiaowu数据库进行备份和还原</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>1、查看数据库和表</span></span>
<span class="line"><span>mysql&gt; show databases;</span></span>
<span class="line"><span>+--------------------+</span></span>
<span class="line"><span>| Database           |</span></span>
<span class="line"><span>+--------------------+</span></span>
<span class="line"><span>| information_schema |</span></span>
<span class="line"><span>| jiaowu             |</span></span>
<span class="line"><span>| mysql              |</span></span>
<span class="line"><span>| performance_schema |</span></span>
<span class="line"><span>| test               |</span></span>
<span class="line"><span>+--------------------+</span></span>
<span class="line"><span>5 rows in set (0.00 sec)</span></span>
<span class="line"><span>mysql&gt; select * from jiaowu.tutor;</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span>| TID  | Tname         | Gender | Age  |</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span>|    1 | ZhengYansheng | M      |   25 |</span></span>
<span class="line"><span>|    2 | LiJian        | M      |   26 |</span></span>
<span class="line"><span>|    3 | OuYangyu      | M      |   27 |</span></span>
<span class="line"><span>|    4 | LuoChenghui   | M      |   25 |</span></span>
<span class="line"><span>|    5 | LiuYunbo      | M      |   25 |</span></span>
<span class="line"><span>|    6 | FuJian        | M      |   24 |</span></span>
<span class="line"><span>|    7 | LiMenglu      | F      |   23 |</span></span>
<span class="line"><span>|    8 | BaoYintu      | M      |   28 |</span></span>
<span class="line"><span>|    9 | WangYana      | F      |   25 |</span></span>
<span class="line"><span>|   11 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   12 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   13 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   21 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   22 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   23 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2、innobackupex进行备份</span></span>
<span class="line"><span># innobackupex --user=root --password=123456 --databases=&#39;jiaowu&#39; /opt/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3、准备并导入jiaowu表</span></span>
<span class="line"><span># innobackupex --user=root --password=123456 --apply-log --export /opt/2015-03-18_22-46-47/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4、删除jiaowu数据库</span></span>
<span class="line"><span># rm -rf /mydata/data/jiaowu</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5、登陆数据库查看是否还存在jiaowu数据库</span></span>
<span class="line"><span>[root@localhost ~]# mysql -e &#39;show databases;&#39;</span></span>
<span class="line"><span>+--------------------+</span></span>
<span class="line"><span>| Database           |</span></span>
<span class="line"><span>+--------------------+</span></span>
<span class="line"><span>| information_schema |</span></span>
<span class="line"><span>| mysql              |</span></span>
<span class="line"><span>| performance_schema |</span></span>
<span class="line"><span>| test               |</span></span>
<span class="line"><span>+--------------------+</span></span>
<span class="line"><span>#jiaowu数据库不存在了</span></span>
<span class="line"><span></span></span>
<span class="line"><span>6、还原jiaowu数据库</span></span>
<span class="line"><span># cp -a /opt/2015-03-18_22-46-47/jiaowu/ /mydata/data/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>7、修改jiaowu权限</span></span>
<span class="line"><span># chown -R mysql.mysql /mydata/data/jiaowu</span></span>
<span class="line"><span></span></span>
<span class="line"><span>8、再次查看jiaowu数据库是否存在</span></span>
<span class="line"><span>[root@localhost ~]# mysql -e &#39;use jiaowu;show tables;&#39;</span></span>
<span class="line"><span>+------------------+</span></span>
<span class="line"><span>| Tables_in_jiaowu |</span></span>
<span class="line"><span>+------------------+</span></span>
<span class="line"><span>| tutor            |</span></span>
<span class="line"><span>+------------------+</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#jiaowu数据库已经被还原并且表tutor还在。成功！！！</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="八、导入或导出单张表" tabindex="-1"><a class="header-anchor" href="#八、导入或导出单张表"><span>八、导入或导出单张表</span></a></h1><p>默认情况下，InnoDB表不能通过直接复制表文件的方式在mysql服务器之间进行移植，即便使用了innodb_file_per_table选项。而使用Xtrabackup工具可以实现此种功能，</p><p>不过，此时需要“导出”表的mysql服务器启用了innodb_file_per_table选项（严格来说，是要“导出”的表在其创建之前，mysql服务器就启用了innodb_file_per_table选项），</p><p>并且“导入”表的服务器同时启用了innodb_file_per_table和innodb_expand_import选项。</p><h3 id="_1-导出-表" tabindex="-1"><a class="header-anchor" href="#_1-导出-表"><span>1)“导出”表</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>导出表是在备份的prepare阶段进行的，因此，一旦完全备份完成，就可以在prepare过程中通过--export选项将某表导出了：</span></span>
<span class="line"><span># innobackupex --apply-log --export /path/to/backup</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>此命令会为每个innodb表的表空间创建一个以.exp结尾的文件，这些以.exp结尾的文件则可以用于导入至其它服务器。</p><h3 id="_2-导入-表" tabindex="-1"><a class="header-anchor" href="#_2-导入-表"><span>2)“导入”表</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>要在mysql服务器上导入来自于其它服务器的某innodb表，需要先在当前服务器上创建一个跟原表表结构一致的表，而后才能实现将表导入：</span></span>
<span class="line"><span>mysql&gt; CREATE TABLE mytable (...)  ENGINE=InnoDB;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>然后将此表的表空间删除：</span></span>
<span class="line"><span>mysql&gt; ALTER TABLE mydatabase.mytable  DISCARD TABLESPACE;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>接下来，将来自于“导出”表的服务器的mytable表的mytable.ibd和mytable.exp文件复制到当前服务器的数据目录，然后使用如下命令将其“导入”：</span></span>
<span class="line"><span>mysql&gt; ALTER TABLE mydatabase.mytable  IMPORT TABLESPACE;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>案列演示：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>1、查看表</span></span>
<span class="line"><span>mysql&gt; use jiaowu;</span></span>
<span class="line"><span>Database changed</span></span>
<span class="line"><span>mysql&gt; show tables;</span></span>
<span class="line"><span>+------------------+</span></span>
<span class="line"><span>| Tables_in_jiaowu |</span></span>
<span class="line"><span>+------------------+</span></span>
<span class="line"><span>| tutor            |</span></span>
<span class="line"><span>+------------------+</span></span>
<span class="line"><span>1 row in set (0.00 sec)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2、修改表的存储引擎为InnoDB</span></span>
<span class="line"><span>mysql&gt; alter table tutor engine=innodb;</span></span>
<span class="line"><span>Query OK, 15 rows affected (0.05 sec)</span></span>
<span class="line"><span>Records: 15  Duplicates: 0  Warnings: 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3、innobackupex对其进行备份</span></span>
<span class="line"><span># innobackupex --user=root --password=123456 --databases=&#39;jiaowu.tutor&#39; /opt/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4、准备并导出</span></span>
<span class="line"><span># innobackupex --user=root --password=123456 --apply-log --export /opt/2015-03-18_23-05-44/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5、删除此表的表空间</span></span>
<span class="line"><span>mysql&gt; ALTER TABLE jiaowu.tutor DISCARD TABLESPACE;</span></span>
<span class="line"><span>Query OK, 0 rows affected (0.01 sec)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mysql&gt; use jiaowu;</span></span>
<span class="line"><span>Database changed</span></span>
<span class="line"><span>mysql&gt; select * from tutor;        #数据已经不存在了</span></span>
<span class="line"><span>ERROR 1030 (HY000): Got error -1 from storage engine</span></span>
<span class="line"><span></span></span>
<span class="line"><span>6、接下来，将来自于“导出”表的服务器的mytable表的mytable.ibd和mytable.exp文件复制到当前服务器的数据目录，然后使用如下命令将其“导入”：并修改权限</span></span>
<span class="line"><span># cp /opt/2015-03-18_23-24-23/jiaowu/{tutor.exp,tutor.ibd} /mydata/data/jiaowu/</span></span>
<span class="line"><span>cp：是否覆盖&quot;/mydata/data/jiaowu/tutor.exp&quot;？ yes</span></span>
<span class="line"><span># chown -R mysql.mysql /mydata/data/jiaowu/*</span></span>
<span class="line"><span>mysql&gt; ALTER TABLE jiaowu.tutor IMPORT TABLESPACE;</span></span>
<span class="line"><span>Query OK, 0 rows affected (0.00 sec)</span></span>
<span class="line"><span>mysql&gt; use jiaowu;</span></span>
<span class="line"><span>Database changed</span></span>
<span class="line"><span>mysql&gt; select * from tutor;</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span>| TID  | Tname         | Gender | Age  |</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span>|    1 | ZhengYansheng | M      |   25 |</span></span>
<span class="line"><span>|    2 | LiJian        | M      |   26 |</span></span>
<span class="line"><span>|    3 | OuYangyu      | M      |   27 |</span></span>
<span class="line"><span>|    4 | LuoChenghui   | M      |   25 |</span></span>
<span class="line"><span>|    5 | LiuYunbo      | M      |   25 |</span></span>
<span class="line"><span>|    6 | FuJian        | M      |   24 |</span></span>
<span class="line"><span>|    7 | LiMenglu      | F      |   23 |</span></span>
<span class="line"><span>|    8 | BaoYintu      | M      |   28 |</span></span>
<span class="line"><span>|    9 | WangYana      | F      |   25 |</span></span>
<span class="line"><span>|   11 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   12 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   13 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   21 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   22 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>|   23 | NULL          | NULL   | NULL |</span></span>
<span class="line"><span>+------+---------------+--------+------+</span></span>
<span class="line"><span>15 rows in set (0.00 sec)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#单表还原已经成功！结束。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参考： http://467754239.blog.51cto.com/4878013/1621711</p><p>http://blog.51yip.com/mysql/1650.html</p>`,93)]))}const v=n(l,[["render",p]]),u=JSON.parse('{"path":"/article/3fgt2ok7/","title":"使用xtrabackup备份和恢复mysql数据库","lang":"en-US","frontmatter":{"title":"使用xtrabackup备份和恢复mysql数据库","createTime":"2025/05/27 17:51:17","permalink":"/article/3fgt2ok7/"},"git":{"createdTime":1749111496000,"updatedTime":1750129445000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":2,"url":"https://github.com/star"}]},"readingTime":{"minutes":14.63,"words":4390},"filePathRelative":"mysql/使用xtrabackup备份和恢复mysql数据库.md"}');export{v as comp,u as data};
