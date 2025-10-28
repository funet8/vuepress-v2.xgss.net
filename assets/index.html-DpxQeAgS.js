import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as e}from"./app-BiQR_lPj.js";const l={};function p(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h1 id="搭建开源美观的数据库监控系统-lepus" tabindex="-1"><a class="header-anchor" href="#搭建开源美观的数据库监控系统-lepus"><span>搭建开源美观的数据库监控系统-Lepus</span></a></h1><h2 id="天兔数据库监控系统-lepus" tabindex="-1"><a class="header-anchor" href="#天兔数据库监控系统-lepus"><span>天兔数据库监控系统-Lepus</span></a></h2><p>欢迎大家使用天兔数据库监控系统（以下简称为Lepus）。Lepus是一套开源的数据库监控平台，目前已经支持MySQL、Oracle、PostgresQL、GreatSQL、MongoDB、Redis等数据库的基本监控和告警。Lepus无需在每台数据库服务器部署脚本或Agent，只需要在数据库创建授权帐号后，即可进行远程监控，适合监控数据库服务器较多的公司和监控云中数据库，这将为企业大大减化监控部署流程，同时Lepus系统内置了丰富的性能监控指标，让企业能够在数据库宕机前发现潜在性能问题进行处理，减少企业因为数据库问题导致的直接损失。</p><p>开源地址： https://gitee.com/lepus-group/lepus</p><p>官网： https://www.lepus.cc/</p><p>Lepus有v3版本和v5版本</p><p><img src="https://imgoss.xgss.net/picgo/mysql-leplus.webp.jpg?aliyun" alt="mysql-leplus.webp"></p><h1 id="docker安装v3版本" tabindex="-1"><a class="header-anchor" href="#docker安装v3版本"><span>Docker安装v3版本</span></a></h1><p>https://hub.docker.com/r/georce/lepus</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>docker run -itd --name lepus \\</span></span>
<span class="line"><span>--restart always \\</span></span>
<span class="line"><span>-p 83:80 \\</span></span>
<span class="line"><span>-p 50920:3306 \\</span></span>
<span class="line"><span>docker.io/georce/lepus</span></span>
<span class="line"><span></span></span>
<span class="line"><span>http://IP:83</span></span>
<span class="line"><span>USERNAME: admin</span></span>
<span class="line"><span>PASSWORD: Lepusadmin</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20220617113950783.png?aliyun" alt="image-20220617113950783"></p><p>V3版本的控制面板</p><p><img src="https://imgoss.xgss.net/picgo/image-20220617114238081.png?aliyun" alt="image-20220617114238081"></p><p>本教程主要在centos7下安装v5版本，并且使用监控MySQL。</p><h2 id="系统说明" tabindex="-1"><a class="header-anchor" href="#系统说明"><span>系统说明</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>系统： centos7</span></span>
<span class="line"><span>IP: 192.168.1.3</span></span>
<span class="line"><span>数据库： </span></span>
<span class="line"><span>192.168.1.6:3306 </span></span>
<span class="line"><span>用户名：root </span></span>
<span class="line"><span>密码：123456</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="软件要求" tabindex="-1"><a class="header-anchor" href="#软件要求"><span>软件要求</span></a></h2><p>Lepus-V5部署需要部署以下软件：</p><table><thead><tr><th>软件名称</th><th>推荐版本</th><th>必须</th><th>备注</th></tr></thead><tbody><tr><td>Golang</td><td>1.4-1.8</td><td>否</td><td>源码编译运行必须安装/使用二进制方式无需安装 （直接 yum install golang）</td></tr><tr><td>MySQL</td><td>5.6</td><td>是</td><td>用于存储基础数据和事件数据（本文安装教程略）</td></tr><tr><td>InfluxDB</td><td>1.x</td><td>否</td><td>事件数据默认存储MySQL，支持存储到InfluxDB,如有使用InfluxDB需求则必须需要部署（笔者未安装）</td></tr><tr><td>Redis</td><td>5.x</td><td>是</td><td>用于报警系统限流（本文安装教程略）</td></tr><tr><td>NSQ</td><td>1.2.x</td><td>是</td><td>基于gaolang的高性能消息队列，用于事件消息传输（参考以下）</td></tr></tbody></table><h2 id="centos7安装nsq" tabindex="-1"><a class="header-anchor" href="#centos7安装nsq"><span>centos7安装NSQ</span></a></h2><p>NSQ 是实时的分布式消息处理平台，其设计的目的是用来大规模地处理每天数以十亿计级别的消息。</p><p>参考文档：https://nsq.io/overview/quick_start.html</p><h3 id="_1-下载软件" tabindex="-1"><a class="header-anchor" href="#_1-下载软件"><span>1.下载软件</span></a></h3><p>二进制下载路径：https://github.com/nsqio/nsq/releases</p><p>版本：nsq-1.2.1.linux-amd64.go1.16.6.tar.gz</p><p>上传到CentOS服务器，解压即可。</p><p>启动 进入解压路径的/bin目录</p><h3 id="_2-安装nsq" tabindex="-1"><a class="header-anchor" href="#_2-安装nsq"><span>2.安装NSQ</span></a></h3><p>进入解压路径的/data/NSQ目录</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># mkdir /data/NSQ</span></span>
<span class="line"><span># wget http://js.funet8.com/centos_software/nsq-1.2.1.linux-amd64.go1.16.6.tar.gz # 备用下载地址</span></span>
<span class="line"><span># tar -zxvf nsq-1.2.1.linux-amd64.go1.16.6.tar.gz</span></span>
<span class="line"><span># cd nsq-1.2.1.linux-amd64.go1.16.6/bin</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 启动nsqlookupd(nohup 后台启动):</span></span>
<span class="line"><span># nohup ./nsqlookupd &amp;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 启动nsqd(nohup 后台启动)</span></span>
<span class="line"><span># nohup ./nsqd --lookupd-tcp-address=192.168.1.3:4160 &amp;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 启动nsqadmin(nohup 后台启动)</span></span>
<span class="line"><span># nohup ./nsqadmin --lookupd-http-address=192.168.1.3:4161 &amp;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 启动日志查看：bin目录会自动生成nohup日志,查看命令如下：</span></span>
<span class="line"><span># tail -f nohup.out</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-nsq消息测试" tabindex="-1"><a class="header-anchor" href="#_3-nsq消息测试"><span>3.NSQ消息测试</span></a></h3><p>启动nsq_to_file，将消息写入/tmp文件的日志文件，文件名默认由主题topic+主机+日期时间戳组成</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># nohup ./nsq_to_file --topic=test --output-dir=/tmp --lookupd-http-address=192.168.1.3:4161 &amp;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>使用curl命令，发布一条消息,返回OK</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># curl -d &#39;hello world&#39; &#39;http://192.168.1.3:4151/pub?topic=test&#39;</span></span>
<span class="line"><span>OK</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器方问web界面：http://192.168.1.3:4171/，界面如下：</p><p><img src="https://imgoss.xgss.net/picgo/image-20220617095510502.png?aliyun" alt="image-20220617095510502"></p><h2 id="安装lepus" tabindex="-1"><a class="header-anchor" href="#安装lepus"><span>安装Lepus</span></a></h2><p>Linux环境使用二进制安装Lepus</p><h3 id="_1-下载二进制版本lepus" tabindex="-1"><a class="header-anchor" href="#_1-下载二进制版本lepus"><span>1.下载二进制版本Lepus</span></a></h3><p>进入官网下载页面，根据操作系统选择Linux或者Windows对应的二进制包，下载lepus二进制包，下载地址： https://www.lepus.cc/downloads/ 。</p><p>Linux环境二进制包文件名为 ：lepus.5.x.linux-amd64.tar.gz，Windows环境二进制包文件名为：lepus.5.x.windows-amd64.zip</p><p>本文下载：lepus.5.1.linux-amd64.tar.gz</p><h3 id="_2-下载并修改文件" tabindex="-1"><a class="header-anchor" href="#_2-下载并修改文件"><span>2.下载并修改文件</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cd /data/</span></span>
<span class="line"><span>wget http://js.funet8.com/centos_software/lepus.5.1.linux-amd64.tar.gz # 备用下载地址</span></span>
<span class="line"><span>tar -zxvf lepus.5.1.linux-amd64.tar.gz</span></span>
<span class="line"><span>mv lepus.5.1.linux-amd64 lepus.5.1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-导入初始化数据库" tabindex="-1"><a class="header-anchor" href="#_3-导入初始化数据库"><span>3.导入初始化数据库</span></a></h3><p>进入lepus二进制目录，并导入数据库初始化表结构和数据</p><p>在192.168.1.6的数据库上数据库&#39;lepus_db&#39;</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cd lepus.5.1/sql</span></span>
<span class="line"><span>mysql -uroot -h192.168.1.6 -P&#39;3306&#39; -p&#39;123456&#39; lepus_db &lt; init_table.sql</span></span>
<span class="line"><span>mysql -uroot -h192.168.1.6 -P&#39;3306&#39; -p&#39;123456&#39; lepus_db &lt; init_data.sql</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20220616200345620.png?aliyun" alt="image-20220616200345620"></p><h3 id="_4-生成配置文件" tabindex="-1"><a class="header-anchor" href="#_4-生成配置文件"><span>4.生成配置文件</span></a></h3><p>从example中复制配置文件，并进行设置，设置里包含连接MySQL、Redis、NSQ、告警邮件网关， （MySQL、Redis、NSQ为必须安装，InfluxDB为可选，开源组件请大家自行安装部署）。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cp etc/proxy.example.ini etc/proxy.ini</span></span>
<span class="line"><span>cp etc/alarm.example.ini etc/alarm.ini</span></span>
<span class="line"><span>cp etc/config.example.ini etc/config.ini</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于数据库不是本机，所以需要修改配置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>#  vim etc/proxy.ini</span></span>
<span class="line"><span>修改如下</span></span>
<span class="line"><span>[main]</span></span>
<span class="line"><span>port = 8800</span></span>
<span class="line"><span>log = /tmp/lepus_proxy.log</span></span>
<span class="line"><span>debug=1</span></span>
<span class="line"><span>enable_influxdb=0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[nsq]</span></span>
<span class="line"><span>nsq_server = 127.0.0.1:4150</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[mysql]</span></span>
<span class="line"><span>mysql_host = 192.168.1.6</span></span>
<span class="line"><span>mysql_port = 3306</span></span>
<span class="line"><span>mysql_user = root</span></span>
<span class="line"><span>mysql_password = 123456</span></span>
<span class="line"><span>mysql_database = lepus_db</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[influxdb]</span></span>
<span class="line"><span>influx_host = 192.168.1.6</span></span>
<span class="line"><span>influx_port = 8086</span></span>
<span class="line"><span>influx_user = root</span></span>
<span class="line"><span>influx_password = 123456</span></span>
<span class="line"><span>influx_database = lepus_db</span></span>
<span class="line"><span></span></span>
<span class="line"><span># vim etc/alarm.ini</span></span>
<span class="line"><span>修改如下</span></span>
<span class="line"><span>[main]</span></span>
<span class="line"><span>debug=1</span></span>
<span class="line"><span>log = /tmp/lepus_alarm.log</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[nsq]</span></span>
<span class="line"><span>nsq_server = 127.0.0.1:4150</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[mysql]</span></span>
<span class="line"><span>mysql_host = 192.168.1.6</span></span>
<span class="line"><span>mysql_port = 3306</span></span>
<span class="line"><span>mysql_user = root</span></span>
<span class="line"><span>mysql_password = 123456</span></span>
<span class="line"><span>mysql_database = lepus_db</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[redis]</span></span>
<span class="line"><span>redis_host = 127.0.0.1</span></span>
<span class="line"><span>redis_port = 6379</span></span>
<span class="line"><span>redis_pass = password</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[mail]</span></span>
<span class="line"><span>mail_host = smtp.163.com</span></span>
<span class="line"><span>mail_port = 465</span></span>
<span class="line"><span>mail_user = alarm@163.com</span></span>
<span class="line"><span>mail_pass = password</span></span>
<span class="line"><span>mail_from = alarm@163.com</span></span>
<span class="line"><span></span></span>
<span class="line"><span># vim etc/config.ini</span></span>
<span class="line"><span>修改配置</span></span>
<span class="line"><span>[main]</span></span>
<span class="line"><span>log_dir = /tmp/</span></span>
<span class="line"><span>debug = 1</span></span>
<span class="line"><span>interval = 10</span></span>
<span class="line"><span>proxy = http://127.0.0.1:8800</span></span>
<span class="line"><span>db_pass_key = L1e2p3u4s5Abc321</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[mysql]</span></span>
<span class="line"><span>mysql_host = 192.168.1.6</span></span>
<span class="line"><span>mysql_port = 3306</span></span>
<span class="line"><span>mysql_user = root</span></span>
<span class="line"><span>mysql_password = 123456</span></span>
<span class="line"><span>mysql_database = lepus_db</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5.启动服务组件</p><p>请按照以下顺序依次启动组件，启动报错请检查配置文件，未报错需要将任务放到后台运行。</p><p>启动Proxy模块</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># cd /data/lepus.5.1/bin/</span></span>
<span class="line"><span># ./lepus_proxy --config=../etc/proxy.ini</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>启动Task模块</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># ./lepus_task --config=../etc/config.ini</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>启动Alarm模块</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>./lepus_alarm --config=../etc/alarm.ini</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>启动后可以查看进程</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># ps -ef|grep lepus</span></span>
<span class="line"><span>root      3810  3135  0 Jun16 pts/0    00:00:00 ./lepus_proxy --config=../etc/proxy.ini</span></span>
<span class="line"><span>root      3816  3135  0 Jun16 pts/0    00:00:00 ./lepus_task --config=../etc/config.ini</span></span>
<span class="line"><span>root      5329  5000  0 09:55 pts/1    00:00:00 ./lepus_alarm --config=../etc/alarm.ini</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看运行日志，没有Error则运行正常，如果日志过多可以将配置文件debug设置为0，则不会输出debug日志。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>tail -f /tmp/lepus_proxy.log</span></span>
<span class="line"><span>tail -f /tmp/lepus_task.log</span></span>
<span class="line"><span>tail -f /tmp/lepus_alarm.log</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提示：Lepus安装完成后还需要安装运行Lepus Console控制台。</p><h2 id="安装lepus-console" tabindex="-1"><a class="header-anchor" href="#安装lepus-console"><span>安装Lepus-console</span></a></h2><p>Lepus Console控制台是用于配置和管理Lepus的WEB管理界面，没有控制台，Lepus也可以正常运行，您也可以通过操作数据库数据进行监控和报警，但是使用Lepus Console会让使用更加便捷，并且查询随时查询监控事件数据和性能图表。</p><h3 id="下载lepus-console安装包" tabindex="-1"><a class="header-anchor" href="#下载lepus-console安装包"><span>下载Lepus Console安装包</span></a></h3><p>1.进入官网下载页面，根据操作系统选择Linux或者Windows对应的Lepus Console二进制包，下载lepus二进制包，下载地址： https://www.lepus.cc/downloads/ 。</p><p>笔者下载 lepus-console.5.1.linux-amd64.tar.gz</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>mkdir /data/lepus-console</span></span>
<span class="line"><span>cd /data/lepus-console</span></span>
<span class="line"><span>wget http://js.funet8.com/centos_software/lepus-console.5.1.linux-amd64.tar.gz # 备用下载地址</span></span>
<span class="line"><span>tar -zxvf lepus-console.5.1.linux-amd64.tar.gz</span></span>
<span class="line"><span>mv lepus-console.5.1.linux-amd64 lepus-console.5.1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.进入lepus-console-linux-amd64目录</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cd lepus-console.5.1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>3.复制和修改配置文件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># cp setting.example.yml setting.yml</span></span>
<span class="line"><span>修改配置文件</span></span>
<span class="line"><span># vim setting.yml </span></span>
<span class="line"><span>填写以下，只修改mysql的配置：</span></span>
<span class="line"><span>log:</span></span>
<span class="line"><span>  path: &quot;/tmp/lepus_api.log&quot;</span></span>
<span class="line"><span>  level: &quot;debug&quot;</span></span>
<span class="line"><span>  debug: true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>dataSource:</span></span>
<span class="line"><span>  eventStorageEngine: mysql</span></span>
<span class="line"><span>  host: 192.168.1.6</span></span>
<span class="line"><span>  port: 3306</span></span>
<span class="line"><span>  user: root</span></span>
<span class="line"><span>  password: 123456</span></span>
<span class="line"><span>  database: lepus_db</span></span>
<span class="line"><span>  influxHost: 127.0.0.1</span></span>
<span class="line"><span>  influxPort: 8086</span></span>
<span class="line"><span>  influxUser: admin</span></span>
<span class="line"><span>  influxPassword:</span></span>
<span class="line"><span>  influxDatabase: lepus_db</span></span>
<span class="line"><span></span></span>
<span class="line"><span>token:</span></span>
<span class="line"><span>  storage: &quot;mysql&quot;</span></span>
<span class="line"><span>  key: &quot;S9p2+dsfM1CzLF==&quot;</span></span>
<span class="line"><span>  name: &quot;lepus-pro&quot;</span></span>
<span class="line"><span>  expired: &quot;3d&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>decrypt:</span></span>
<span class="line"><span>  signKey: &quot;1234567890abcdef&quot;</span></span>
<span class="line"><span>  dbPassKey: &quot;L1e2p3u4s5Abc321&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4.运行控制台</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># ./lepus_console</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>[GIN-debug] Listening and serving HTTP on :8080</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5.访问控制台</p><p>访问 IP:8080 可以登录界面进行登录，默认管理密码为：admin/lepusadmin</p><p><img src="https://imgoss.xgss.net/picgo/image-20220617101249323.png?aliyun" alt="image-20220617101249323"></p><p>进入控制台</p><p><img src="https://imgoss.xgss.net/picgo/image-20220617101343150.png?aliyun" alt="image-20220617101343150"></p><p>至此，lepus在centos7系统下就安装完成了，再就是添加mysql监控节点和异常通知告警的配置了。</p><p><img src="https://imgoss.xgss.net/picgo/image-20220617101735813.png?aliyun" alt="image-20220617101735813"></p><p>使用手册： https://www.lepus.cc/docs/lepus-v5/manual/</p><p>参考：https://www.lepus.cc/docs/lepus-v5/</p>`,89)]))}const t=n(l,[["render",p]]),u=JSON.parse('{"path":"/article/qg11ydtk/","title":"搭建开源美观的数据库监控系统-Lepus","lang":"en-US","frontmatter":{"title":"搭建开源美观的数据库监控系统-Lepus","createTime":"2025/05/27 17:51:17","permalink":"/article/qg11ydtk/"},"git":{"createdTime":1749111496000,"updatedTime":1750129445000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":2,"url":"https://github.com/star"}]},"readingTime":{"minutes":5.94,"words":1781},"filePathRelative":"mysql/搭建开源美观的数据库监控系统-Lepus.md"}');export{t as comp,u as data};
