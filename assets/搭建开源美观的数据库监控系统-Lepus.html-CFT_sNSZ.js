import{_ as n,c as e,b as a,o as l}from"./app-BEL8OELx.js";const i={};function p(d,s){return l(),e("div",null,s[0]||(s[0]=[a(`<h1 id="搭建开源美观的数据库监控系统-lepus" tabindex="-1"><a class="header-anchor" href="#搭建开源美观的数据库监控系统-lepus"><span>搭建开源美观的数据库监控系统-Lepus</span></a></h1><h2 id="天兔数据库监控系统-lepus" tabindex="-1"><a class="header-anchor" href="#天兔数据库监控系统-lepus"><span>天兔数据库监控系统-Lepus</span></a></h2><p>欢迎大家使用天兔数据库监控系统（以下简称为Lepus）。Lepus是一套开源的数据库监控平台，目前已经支持MySQL、Oracle、PostgresQL、GreatSQL、MongoDB、Redis等数据库的基本监控和告警。Lepus无需在每台数据库服务器部署脚本或Agent，只需要在数据库创建授权帐号后，即可进行远程监控，适合监控数据库服务器较多的公司和监控云中数据库，这将为企业大大减化监控部署流程，同时Lepus系统内置了丰富的性能监控指标，让企业能够在数据库宕机前发现潜在性能问题进行处理，减少企业因为数据库问题导致的直接损失。</p><p>开源地址： https://gitee.com/lepus-group/lepus</p><p>官网： https://www.lepus.cc/</p><p>Lepus有v3版本和v5版本</p><p><img src="https://imgoss.xgss.net/picgo/mysql-leplus.webp.jpg?aliyun" alt="mysql-leplus.webp"></p><h1 id="docker安装v3版本" tabindex="-1"><a class="header-anchor" href="#docker安装v3版本"><span>Docker安装v3版本</span></a></h1><p>https://hub.docker.com/r/georce/lepus</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker run -itd --name lepus \\</span>
<span class="line">--restart always \\</span>
<span class="line">-p 83:80 \\</span>
<span class="line">-p 50920:3306 \\</span>
<span class="line">docker.io/georce/lepus</span>
<span class="line"></span>
<span class="line">http://IP:83</span>
<span class="line">USERNAME: admin</span>
<span class="line">PASSWORD: Lepusadmin</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20220617113950783.png?aliyun" alt="image-20220617113950783"></p><p>V3版本的控制面板</p><p><img src="https://imgoss.xgss.net/picgo/image-20220617114238081.png?aliyun" alt="image-20220617114238081"></p><p>本教程主要在centos7下安装v5版本，并且使用监控MySQL。</p><h2 id="系统说明" tabindex="-1"><a class="header-anchor" href="#系统说明"><span>系统说明</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">系统： centos7</span>
<span class="line">IP: 192.168.1.3</span>
<span class="line">数据库： </span>
<span class="line">192.168.1.6:3306 </span>
<span class="line">用户名：root </span>
<span class="line">密码：123456</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="软件要求" tabindex="-1"><a class="header-anchor" href="#软件要求"><span>软件要求</span></a></h2><p>Lepus-V5部署需要部署以下软件：</p><table><thead><tr><th>软件名称</th><th>推荐版本</th><th>必须</th><th>备注</th></tr></thead><tbody><tr><td>Golang</td><td>1.4-1.8</td><td>否</td><td>源码编译运行必须安装/使用二进制方式无需安装 （直接 yum install golang）</td></tr><tr><td>MySQL</td><td>5.6</td><td>是</td><td>用于存储基础数据和事件数据（本文安装教程略）</td></tr><tr><td>InfluxDB</td><td>1.x</td><td>否</td><td>事件数据默认存储MySQL，支持存储到InfluxDB,如有使用InfluxDB需求则必须需要部署（笔者未安装）</td></tr><tr><td>Redis</td><td>5.x</td><td>是</td><td>用于报警系统限流（本文安装教程略）</td></tr><tr><td>NSQ</td><td>1.2.x</td><td>是</td><td>基于gaolang的高性能消息队列，用于事件消息传输（参考以下）</td></tr></tbody></table><h2 id="centos7安装nsq" tabindex="-1"><a class="header-anchor" href="#centos7安装nsq"><span>centos7安装NSQ</span></a></h2><p>NSQ 是实时的分布式消息处理平台，其设计的目的是用来大规模地处理每天数以十亿计级别的消息。</p><p>参考文档：https://nsq.io/overview/quick_start.html</p><h3 id="_1-下载软件" tabindex="-1"><a class="header-anchor" href="#_1-下载软件"><span>1.下载软件</span></a></h3><p>二进制下载路径：https://github.com/nsqio/nsq/releases</p><p>版本：nsq-1.2.1.linux-amd64.go1.16.6.tar.gz</p><p>上传到CentOS服务器，解压即可。</p><p>启动 进入解压路径的/bin目录</p><h3 id="_2-安装nsq" tabindex="-1"><a class="header-anchor" href="#_2-安装nsq"><span>2.安装NSQ</span></a></h3><p>进入解压路径的/data/NSQ目录</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># mkdir /data/NSQ</span>
<span class="line"># wget http://js.funet8.com/centos_software/nsq-1.2.1.linux-amd64.go1.16.6.tar.gz # 备用下载地址</span>
<span class="line"># tar -zxvf nsq-1.2.1.linux-amd64.go1.16.6.tar.gz</span>
<span class="line"># cd nsq-1.2.1.linux-amd64.go1.16.6/bin</span>
<span class="line"></span>
<span class="line">1. 启动nsqlookupd(nohup 后台启动):</span>
<span class="line"># nohup ./nsqlookupd &amp;</span>
<span class="line"></span>
<span class="line">2. 启动nsqd(nohup 后台启动)</span>
<span class="line"># nohup ./nsqd --lookupd-tcp-address=192.168.1.3:4160 &amp;</span>
<span class="line"></span>
<span class="line">3. 启动nsqadmin(nohup 后台启动)</span>
<span class="line"># nohup ./nsqadmin --lookupd-http-address=192.168.1.3:4161 &amp;</span>
<span class="line"></span>
<span class="line">4. 启动日志查看：bin目录会自动生成nohup日志,查看命令如下：</span>
<span class="line"># tail -f nohup.out</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-nsq消息测试" tabindex="-1"><a class="header-anchor" href="#_3-nsq消息测试"><span>3.NSQ消息测试</span></a></h3><p>启动nsq_to_file，将消息写入/tmp文件的日志文件，文件名默认由主题topic+主机+日期时间戳组成</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># nohup ./nsq_to_file --topic=test --output-dir=/tmp --lookupd-http-address=192.168.1.3:4161 &amp;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>使用curl命令，发布一条消息,返回OK</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># curl -d &#39;hello world&#39; &#39;http://192.168.1.3:4151/pub?topic=test&#39;</span>
<span class="line">OK</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器方问web界面：http://192.168.1.3:4171/，界面如下：</p><p><img src="https://imgoss.xgss.net/picgo/image-20220617095510502.png?aliyun" alt="image-20220617095510502"></p><h2 id="安装lepus" tabindex="-1"><a class="header-anchor" href="#安装lepus"><span>安装Lepus</span></a></h2><p>Linux环境使用二进制安装Lepus</p><h3 id="_1-下载二进制版本lepus" tabindex="-1"><a class="header-anchor" href="#_1-下载二进制版本lepus"><span>1.下载二进制版本Lepus</span></a></h3><p>进入官网下载页面，根据操作系统选择Linux或者Windows对应的二进制包，下载lepus二进制包，下载地址： https://www.lepus.cc/downloads/ 。</p><p>Linux环境二进制包文件名为 ：lepus.5.x.linux-amd64.tar.gz，Windows环境二进制包文件名为：lepus.5.x.windows-amd64.zip</p><p>本文下载：lepus.5.1.linux-amd64.tar.gz</p><h3 id="_2-下载并修改文件" tabindex="-1"><a class="header-anchor" href="#_2-下载并修改文件"><span>2.下载并修改文件</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">cd /data/</span>
<span class="line">wget http://js.funet8.com/centos_software/lepus.5.1.linux-amd64.tar.gz # 备用下载地址</span>
<span class="line">tar -zxvf lepus.5.1.linux-amd64.tar.gz</span>
<span class="line">mv lepus.5.1.linux-amd64 lepus.5.1</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-导入初始化数据库" tabindex="-1"><a class="header-anchor" href="#_3-导入初始化数据库"><span>3.导入初始化数据库</span></a></h3><p>进入lepus二进制目录，并导入数据库初始化表结构和数据</p><p>在192.168.1.6的数据库上数据库&#39;lepus_db&#39;</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">cd lepus.5.1/sql</span>
<span class="line">mysql -uroot -h192.168.1.6 -P&#39;3306&#39; -p&#39;123456&#39; lepus_db &lt; init_table.sql</span>
<span class="line">mysql -uroot -h192.168.1.6 -P&#39;3306&#39; -p&#39;123456&#39; lepus_db &lt; init_data.sql</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20220616200345620.png?aliyun" alt="image-20220616200345620"></p><h3 id="_4-生成配置文件" tabindex="-1"><a class="header-anchor" href="#_4-生成配置文件"><span>4.生成配置文件</span></a></h3><p>从example中复制配置文件，并进行设置，设置里包含连接MySQL、Redis、NSQ、告警邮件网关， （MySQL、Redis、NSQ为必须安装，InfluxDB为可选，开源组件请大家自行安装部署）。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">cp etc/proxy.example.ini etc/proxy.ini</span>
<span class="line">cp etc/alarm.example.ini etc/alarm.ini</span>
<span class="line">cp etc/config.example.ini etc/config.ini</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于数据库不是本机，所以需要修改配置</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">#  vim etc/proxy.ini</span>
<span class="line">修改如下</span>
<span class="line">[main]</span>
<span class="line">port = 8800</span>
<span class="line">log = /tmp/lepus_proxy.log</span>
<span class="line">debug=1</span>
<span class="line">enable_influxdb=0</span>
<span class="line"></span>
<span class="line">[nsq]</span>
<span class="line">nsq_server = 127.0.0.1:4150</span>
<span class="line"></span>
<span class="line">[mysql]</span>
<span class="line">mysql_host = 192.168.1.6</span>
<span class="line">mysql_port = 3306</span>
<span class="line">mysql_user = root</span>
<span class="line">mysql_password = 123456</span>
<span class="line">mysql_database = lepus_db</span>
<span class="line"></span>
<span class="line">[influxdb]</span>
<span class="line">influx_host = 192.168.1.6</span>
<span class="line">influx_port = 8086</span>
<span class="line">influx_user = root</span>
<span class="line">influx_password = 123456</span>
<span class="line">influx_database = lepus_db</span>
<span class="line"></span>
<span class="line"># vim etc/alarm.ini</span>
<span class="line">修改如下</span>
<span class="line">[main]</span>
<span class="line">debug=1</span>
<span class="line">log = /tmp/lepus_alarm.log</span>
<span class="line"></span>
<span class="line">[nsq]</span>
<span class="line">nsq_server = 127.0.0.1:4150</span>
<span class="line"></span>
<span class="line">[mysql]</span>
<span class="line">mysql_host = 192.168.1.6</span>
<span class="line">mysql_port = 3306</span>
<span class="line">mysql_user = root</span>
<span class="line">mysql_password = 123456</span>
<span class="line">mysql_database = lepus_db</span>
<span class="line"></span>
<span class="line">[redis]</span>
<span class="line">redis_host = 127.0.0.1</span>
<span class="line">redis_port = 6379</span>
<span class="line">redis_pass = password</span>
<span class="line"></span>
<span class="line">[mail]</span>
<span class="line">mail_host = smtp.163.com</span>
<span class="line">mail_port = 465</span>
<span class="line">mail_user = alarm@163.com</span>
<span class="line">mail_pass = password</span>
<span class="line">mail_from = alarm@163.com</span>
<span class="line"></span>
<span class="line"># vim etc/config.ini</span>
<span class="line">修改配置</span>
<span class="line">[main]</span>
<span class="line">log_dir = /tmp/</span>
<span class="line">debug = 1</span>
<span class="line">interval = 10</span>
<span class="line">proxy = http://127.0.0.1:8800</span>
<span class="line">db_pass_key = L1e2p3u4s5Abc321</span>
<span class="line"></span>
<span class="line">[mysql]</span>
<span class="line">mysql_host = 192.168.1.6</span>
<span class="line">mysql_port = 3306</span>
<span class="line">mysql_user = root</span>
<span class="line">mysql_password = 123456</span>
<span class="line">mysql_database = lepus_db</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5.启动服务组件</p><p>请按照以下顺序依次启动组件，启动报错请检查配置文件，未报错需要将任务放到后台运行。</p><p>启动Proxy模块</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># cd /data/lepus.5.1/bin/</span>
<span class="line"># ./lepus_proxy --config=../etc/proxy.ini</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动Task模块</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># ./lepus_task --config=../etc/config.ini</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>启动Alarm模块</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">./lepus_alarm --config=../etc/alarm.ini</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>启动后可以查看进程</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># ps -ef|grep lepus</span>
<span class="line">root      3810  3135  0 Jun16 pts/0    00:00:00 ./lepus_proxy --config=../etc/proxy.ini</span>
<span class="line">root      3816  3135  0 Jun16 pts/0    00:00:00 ./lepus_task --config=../etc/config.ini</span>
<span class="line">root      5329  5000  0 09:55 pts/1    00:00:00 ./lepus_alarm --config=../etc/alarm.ini</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看运行日志，没有Error则运行正常，如果日志过多可以将配置文件debug设置为0，则不会输出debug日志。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">tail -f /tmp/lepus_proxy.log</span>
<span class="line">tail -f /tmp/lepus_task.log</span>
<span class="line">tail -f /tmp/lepus_alarm.log</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提示：Lepus安装完成后还需要安装运行Lepus Console控制台。</p><h2 id="安装lepus-console" tabindex="-1"><a class="header-anchor" href="#安装lepus-console"><span>安装Lepus-console</span></a></h2><p>Lepus Console控制台是用于配置和管理Lepus的WEB管理界面，没有控制台，Lepus也可以正常运行，您也可以通过操作数据库数据进行监控和报警，但是使用Lepus Console会让使用更加便捷，并且查询随时查询监控事件数据和性能图表。</p><h3 id="下载lepus-console安装包" tabindex="-1"><a class="header-anchor" href="#下载lepus-console安装包"><span>下载Lepus Console安装包</span></a></h3><p>1.进入官网下载页面，根据操作系统选择Linux或者Windows对应的Lepus Console二进制包，下载lepus二进制包，下载地址： https://www.lepus.cc/downloads/ 。</p><p>笔者下载 lepus-console.5.1.linux-amd64.tar.gz</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">mkdir /data/lepus-console</span>
<span class="line">cd /data/lepus-console</span>
<span class="line">wget http://js.funet8.com/centos_software/lepus-console.5.1.linux-amd64.tar.gz # 备用下载地址</span>
<span class="line">tar -zxvf lepus-console.5.1.linux-amd64.tar.gz</span>
<span class="line">mv lepus-console.5.1.linux-amd64 lepus-console.5.1</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.进入lepus-console-linux-amd64目录</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">cd lepus-console.5.1</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>3.复制和修改配置文件</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># cp setting.example.yml setting.yml</span>
<span class="line">修改配置文件</span>
<span class="line"># vim setting.yml </span>
<span class="line">填写以下，只修改mysql的配置：</span>
<span class="line">log:</span>
<span class="line">  path: &quot;/tmp/lepus_api.log&quot;</span>
<span class="line">  level: &quot;debug&quot;</span>
<span class="line">  debug: true</span>
<span class="line"></span>
<span class="line">dataSource:</span>
<span class="line">  eventStorageEngine: mysql</span>
<span class="line">  host: 192.168.1.6</span>
<span class="line">  port: 3306</span>
<span class="line">  user: root</span>
<span class="line">  password: 123456</span>
<span class="line">  database: lepus_db</span>
<span class="line">  influxHost: 127.0.0.1</span>
<span class="line">  influxPort: 8086</span>
<span class="line">  influxUser: admin</span>
<span class="line">  influxPassword:</span>
<span class="line">  influxDatabase: lepus_db</span>
<span class="line"></span>
<span class="line">token:</span>
<span class="line">  storage: &quot;mysql&quot;</span>
<span class="line">  key: &quot;S9p2+dsfM1CzLF==&quot;</span>
<span class="line">  name: &quot;lepus-pro&quot;</span>
<span class="line">  expired: &quot;3d&quot;</span>
<span class="line"></span>
<span class="line">decrypt:</span>
<span class="line">  signKey: &quot;1234567890abcdef&quot;</span>
<span class="line">  dbPassKey: &quot;L1e2p3u4s5Abc321&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4.运行控制台</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># ./lepus_console</span>
<span class="line">...</span>
<span class="line">[GIN-debug] Listening and serving HTTP on :8080</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5.访问控制台</p><p>访问 IP:8080 可以登录界面进行登录，默认管理密码为：admin/lepusadmin</p><p><img src="https://imgoss.xgss.net/picgo/image-20220617101249323.png?aliyun" alt="image-20220617101249323"></p><p>进入控制台</p><p><img src="https://imgoss.xgss.net/picgo/image-20220617101343150.png?aliyun" alt="image-20220617101343150"></p><p>至此，lepus在centos7系统下就安装完成了，再就是添加mysql监控节点和异常通知告警的配置了。</p><p><img src="https://imgoss.xgss.net/picgo/image-20220617101735813.png?aliyun" alt="image-20220617101735813"></p><p>使用手册： https://www.lepus.cc/docs/lepus-v5/manual/</p><p>参考：https://www.lepus.cc/docs/lepus-v5/</p>`,89)]))}const t=n(i,[["render",p]]),r=JSON.parse('{"path":"/mysql/%E6%90%AD%E5%BB%BA%E5%BC%80%E6%BA%90%E7%BE%8E%E8%A7%82%E7%9A%84%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9B%91%E6%8E%A7%E7%B3%BB%E7%BB%9F-Lepus.html","title":"搭建开源美观的数据库监控系统-Lepus","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"mysql/搭建开源美观的数据库监控系统-Lepus.md"}');export{t as comp,r as data};
