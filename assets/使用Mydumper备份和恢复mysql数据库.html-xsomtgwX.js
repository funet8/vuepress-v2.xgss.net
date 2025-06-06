import{_ as n,c as a,b as e,o as l}from"./app-BEL8OELx.js";const i={};function d(p,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="使用mydumper备份和恢复mysql数据库" tabindex="-1"><a class="header-anchor" href="#使用mydumper备份和恢复mysql数据库"><span>使用Mydumper备份和恢复mysql数据库</span></a></h1><p>Mydumper 是一个高性能 MySQL 数据库备份工具，设计用于解决 mysqldump 在备份大型数据库时遇到的性能瓶颈问题。与 mysqldump 相比，</p><h2 id="优势" tabindex="-1"><a class="header-anchor" href="#优势"><span>优势</span></a></h2><h3 id="并发备份" tabindex="-1"><a class="header-anchor" href="#并发备份"><span>并发备份</span></a></h3><p>Mydumper 可以利用多个线程并行导出数据库，大幅缩短备份时间，特别是在多核 CPU 环境下。</p><h3 id="最小锁定时间" tabindex="-1"><a class="header-anchor" href="#最小锁定时间"><span>最小锁定时间</span></a></h3><p>Mydumper 设计用来尽可能减少对数据库的锁定时间，通过非阻塞备份来最小化对生产环境的影响。</p><h3 id="导出-导入操作的优化" tabindex="-1"><a class="header-anchor" href="#导出-导入操作的优化"><span>导出/导入操作的优化</span></a></h3><p>Mydumper 对输出的数据文件进行了优化，便于高效导入。与之配合使用的 Myloader 工具可以并发导入这些数据文件，大幅度缩短数据恢复时间。</p><h3 id="灵活的备份选项" tabindex="-1"><a class="header-anchor" href="#灵活的备份选项"><span>灵活的备份选项</span></a></h3><p>Mydumper 允许用户灵活选择备份哪些数据库或表，支持各种过滤选项，满足不同的备份需求。</p><h3 id="更好的压缩和分块" tabindex="-1"><a class="header-anchor" href="#更好的压缩和分块"><span>更好的压缩和分块</span></a></h3><p>Mydumper 支持输出文件的压缩，也支持按文件大小对输出文件进行分块，便于管理和传输。</p><h3 id="易于使用" tabindex="-1"><a class="header-anchor" href="#易于使用"><span>易于使用</span></a></h3><p>相比 mysqldump，Mydumper 提供了更多易于使用的选项和更好的性能，使其成为大型数据库环境下的备选备份工具。</p><p>Mydumper 如此强大，使其在需要快速、高效备份 MySQL 数据库的场景中，成为了首选工具。尤其适合于大规模数据库的备份和恢复工作。</p><h2 id="mydumper主要特性" tabindex="-1"><a class="header-anchor" href="#mydumper主要特性"><span>Mydumper主要特性</span></a></h2><p>1.轻量级C语言写的 2.多线程备份，备份后会生成多个备份文件 3.事务性和非事务性表一致的快照(适用于0.2.2以上版本) 4.快速的文件压缩 5.支持导出binlog 6.多线程恢复(适用于0.2.1以上版本) 7.以守护进程的工作方式，定时快照和连续二进制日志(适用于0.5.0以上版本) 8.开源 (GNU GPLv3)</p><p>开源地址： https://github.com/mydumper/mydumper</p><h2 id="安装mydumper" tabindex="-1"><a class="header-anchor" href="#安装mydumper"><span>安装Mydumper</span></a></h2><p>系统： centos7</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># yum -y  install glib2-devel mysql-devel zlib-devel pcre-devel zlib gcc-c++ gcc cmake</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"># cd /data/software/</span>
<span class="line"># wget https://launchpad.net/mydumper/0.9/0.9.1/+download/mydumper-0.9.1.tar.gz</span>
<span class="line"># tar zxf mydumper-0.9.1.tar.gz</span>
<span class="line"># cd mydumper-0.9.1/</span>
<span class="line"># cmake .</span>
<span class="line"># make &amp;&amp; make install</span>
<span class="line"></span>
<span class="line">安装完成后生成两个二进制文件mydumper和myloader位于/usr/local/bin目录下</span>
<span class="line"></span>
<span class="line"># ls /usr/local/bin/my*</span>
<span class="line">/usr/local/bin/mydumper  /usr/local/bin/myloader</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装完成" tabindex="-1"><a class="header-anchor" href="#安装完成"><span>安装完成</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">mydumper --help</span>
<span class="line">myloader --help</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mydumper-参数解释" tabindex="-1"><a class="header-anchor" href="#mydumper-参数解释"><span>mydumper 参数解释</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">-B, --database              要备份的数据库，不指定则备份所有库</span>
<span class="line">-T, --tables-list           需要备份的表，名字用逗号隔开</span>
<span class="line">-o, --outputdir             备份文件输出的目录</span>
<span class="line">-s, --statement-size        生成的insert语句的字节数，默认1000000</span>
<span class="line">-r, --rows                  将表按行分块时，指定的块行数，指定这个选项会关闭 --chunk-filesize</span>
<span class="line">-F, --chunk-filesize        将表按大小分块时，指定的块大小，单位是 MB</span>
<span class="line">-c, --compress              压缩输出文件</span>
<span class="line">-e, --build-empty-files     如果表数据是空，还是产生一个空文件（默认无数据则只有表结构文件）</span>
<span class="line">-x, --regex                 是同正则表达式匹配 &#39;db.table&#39;</span>
<span class="line">-i, --ignore-engines        忽略的存储引擎，用都厚分割</span>
<span class="line">-m, --no-schemas            不备份表结构</span>
<span class="line">-k, --no-locks              不使用临时共享只读锁，使用这个选项会造成数据不一致</span>
<span class="line">--less-locking              减少对InnoDB表的锁施加时间（这种模式的机制下文详解）</span>
<span class="line">-l, --long-query-guard      设定阻塞备份的长查询超时时间，单位是秒，默认是60秒（超时后默认mydumper将会退出）</span>
<span class="line">--kill-long-queries         杀掉长查询 (不退出)</span>
<span class="line">-b, --binlogs               导出binlog</span>
<span class="line">-D, --daemon                启用守护进程模式，守护进程模式以某个间隔不间断对数据库进行备份</span>
<span class="line">-I, --snapshot-interval     dump快照间隔时间，默认60s，需要在daemon模式下</span>
<span class="line">-L, --logfile               使用的日志文件名(mydumper所产生的日志), 默认使用标准输出</span>
<span class="line">--tz-utc                    跨时区是使用的选项，不解释了</span>
<span class="line">--skip-tz-utc               同上</span>
<span class="line">--use-savepoints            使用savepoints来减少采集metadata所造成的锁时间，需要 SUPER 权限</span>
<span class="line">--success-on-1146           Not increment error count and Warning instead of Critical in case of table doesn&#39;t exist</span>
<span class="line">-h, --host                  连接的主机名</span>
<span class="line">-u, --user                  备份所使用的用户</span>
<span class="line">-p, --password              密码</span>
<span class="line">-P, --port                  端口</span>
<span class="line">-S, --socket                使用socket通信时的socket文件</span>
<span class="line">-t, --threads               开启的备份线程数，默认是4</span>
<span class="line">-C, --compress-protocol     压缩与mysql通信的数据</span>
<span class="line">-V, --version               显示版本号</span>
<span class="line">-v, --verbose               输出信息模式, 0 = silent, 1 = errors, 2 = warnings, 3 = info, 默认为 2</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="myloader-参数解释" tabindex="-1"><a class="header-anchor" href="#myloader-参数解释"><span>myloader 参数解释</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">-d, --directory                   备份文件的文件夹</span>
<span class="line">-q, --queries-per-transaction     每次事物执行的查询数量，默认是1000</span>
<span class="line">-o, --overwrite-tables            如果要恢复的表存在，则先drop掉该表，使用该参数，需要备份时候要备份表结构</span>
<span class="line">-B, --database                    需要还原的数据库</span>
<span class="line">-e, --enable-binlog               启用还原数据的二进制日志</span>
<span class="line">-h, --host                        主机</span>
<span class="line">-u, --user                        还原的用户</span>
<span class="line">-p, --password                    密码</span>
<span class="line">-P, --port                        端口</span>
<span class="line">-S, --socket                      socket文件</span>
<span class="line">-t, --threads                     还原所使用的线程数，默认是4</span>
<span class="line">-C, --compress-protocol           压缩协议</span>
<span class="line">-V, --version                     显示版本</span>
<span class="line">-v, --verbose                     输出模式, 0 = silent, 1 = errors, 2 = warnings, 3 = info, 默认为2</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="备份数据库" tabindex="-1"><a class="header-anchor" href="#备份数据库"><span>备份数据库</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># mkdir -p /data/backup/mysql/</span>
<span class="line"></span>
<span class="line"># mydumper -u root -h 192.168.1.12 -p 123456  -P 61920 -B DBName  -o /data/backup/mysql/</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面可以可以看出</p><p>备份所生成的文件 目录中包含一个metadata文件</p><p>记录了备份数据库在备份时间点的二进制日志文件名，日志的写入位置，</p><p>如果是在从库进行备份，还会记录备份时同步至主库的二进制日志文件及写入位置 每个表有两个备份文件：</p><p>database.table-schema.sql 表结构文件</p><p>database.table.sql 表数据文件</p><h2 id="恢复数据库" tabindex="-1"><a class="header-anchor" href="#恢复数据库"><span>恢复数据库</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 删除 beta 库</span>
<span class="line">root@localhost [(none)]&gt;drop database DBName;</span>
<span class="line"># myloader 恢复</span>
<span class="line"># myloader -u root -p 123456 -h 192.168.1.12 -P 61920 -B DBName -d /data/backup/mysql/</span>
<span class="line"># 验证</span>
<span class="line">root@localhost [(none)]&gt;show databases;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,38)]))}const c=n(i,[["render",d]]),m=JSON.parse('{"path":"/mysql/%E4%BD%BF%E7%94%A8Mydumper%E5%A4%87%E4%BB%BD%E5%92%8C%E6%81%A2%E5%A4%8Dmysql%E6%95%B0%E6%8D%AE%E5%BA%93.html","title":"使用Mydumper备份和恢复mysql数据库","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"mysql/使用Mydumper备份和恢复mysql数据库.md"}');export{c as comp,m as data};
