import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as e}from"./app-BiQR_lPj.js";const l={};function p(c,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h1 id="使用免费绿色工具chfs-将文件夹共享成网盘" tabindex="-1"><a class="header-anchor" href="#使用免费绿色工具chfs-将文件夹共享成网盘"><span>使用免费绿色工具chfs，将文件夹共享成网盘</span></a></h1><p>需求：</p><p>业务需求方有个需要将apk包上传到服务器中，通过chfs可以将服务器目录共享出来，可以可以登录后台自行上传apk文件包。</p><p>本文就教大家三个知识点</p><p>1.centos7下使用chfs，共享目录。</p><p>2.使用shell脚本，后台运行chfs</p><p>3.脚本使用脚本监控chfs是否运行，如果没有运行则重启脚本。</p><p>4.使用nginx反向代理（不使用IP地址）。</p><p><img src="https://imgoss.xgss.net/picgo/chfs-wangpang.jpg?aliyun" alt="chfs-wangpang"></p><h2 id="什么是chfs" tabindex="-1"><a class="header-anchor" href="#什么是chfs"><span>什么是chfs</span></a></h2><p>官网： http://iscute.cn/chfs</p><p>CuteHttpFileServer/chfs是一个免费的、HTTP协议的文件共享服务器，使用浏览器可以快速访问。它具有以下特点：</p><ul><li>单个文件，核心功能无需其他文件</li><li>跨平台运行，支持主流平台：Windows，Linux和Mac</li><li>界面简洁，简单易用</li><li>支持扫码下载和手机端访问，手机与电脑之间共享文件非常方便</li><li>支持账户权限控制和地址过滤</li><li>支持快速分享文字片段</li><li>支持webdav协议</li></ul><p>与其他常用文件共享方式（如FTP，飞秋，网盘，自己建站）相比，具有使用简单，适用场景更多的优点，在个人使用以及共享给他人的场景中非常方便快捷。</p><h2 id="一、linux下安装部署" tabindex="-1"><a class="header-anchor" href="#一、linux下安装部署"><span>一、linux下安装部署</span></a></h2><h3 id="系统说明" tabindex="-1"><a class="header-anchor" href="#系统说明"><span>系统说明</span></a></h3><p>系统：centos7 配置：2C2G+100G IP：192.168.1.4 软件： nginx1.16+php5.6</p><h3 id="下载并解压" tabindex="-1"><a class="header-anchor" href="#下载并解压"><span>下载并解压</span></a></h3><p>下载对应的chfs工具：http://iscute.cn/tar/chfs/2.0/</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cd /data/wwwroot/web/</span></span>
<span class="line"><span>mkdir chfs &amp;&amp; cd chfs</span></span>
<span class="line"><span>wget http://iscute.cn/tar/chfs/2.0/chfs-linux-amd64-2.0.zip</span></span>
<span class="line"><span>备用下载：http:// js.funet8.com/centos_software/chfs-linux-amd64-2.0.zip</span></span>
<span class="line"><span>unzip chfs-linux-amd64-2.0.zip</span></span>
<span class="line"><span>chmod +x chfs</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="防火墙开启端口" tabindex="-1"><a class="header-anchor" href="#防火墙开启端口"><span>防火墙开启端口</span></a></h3><p>根据实际端口开启9000端口，修改你自己的端口防火墙</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>iptables：</span></span>
<span class="line"><span>iptables -A INPUT -p tcp --dport 9000 -j ACCEPT</span></span>
<span class="line"><span>service iptables save </span></span>
<span class="line"><span>systemctl restart iptables</span></span>
<span class="line"><span></span></span>
<span class="line"><span>firewall：</span></span>
<span class="line"><span>firewall-cmd --zone=public --add-port=9000/tcp --permanent # 开放 9000 端口</span></span>
<span class="line"><span>firewall-cmd --reload                                      # 重启firewall</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="启动命令" tabindex="-1"><a class="header-anchor" href="#启动命令"><span>启动命令</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>只允许本机访问：</span></span>
<span class="line"><span># ./chfs --port=9000 \\</span></span>
<span class="line"><span>--path=&quot;/data/wwwroot/web/&quot; \\</span></span>
<span class="line"><span>--allow=&quot;127.0.0.1,192.168.1.164&quot; \\</span></span>
<span class="line"><span>--rule=&quot;::|admin:123456:rwd|user01:123456:rwd|user02:123456:r&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="浏览器访问-ip-端口" tabindex="-1"><a class="header-anchor" href="#浏览器访问-ip-端口"><span>浏览器访问： ip+端口</span></a></h3><p>http://192.168.1.4:9000</p><p><img src="https://imgoss.xgss.net/picgo/image-20220531173109212.png?aliyun" alt="image-20220531173109212"></p><p>非192.168.1.164或者 127.0.0.1 客户端访问则是Forbidden</p><h2 id="二、使用shell脚本-后台运行chfs" tabindex="-1"><a class="header-anchor" href="#二、使用shell脚本-后台运行chfs"><span>二、使用shell脚本，后台运行chfs</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># vi /data/wwwroot/web/chfs/chfs_start.sh</span></span>
<span class="line"><span>填写以下：</span></span>
<span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 启动chfs</span></span>
<span class="line"><span>cd /data/wwwroot/web/chfs/</span></span>
<span class="line"><span>./chfs  --port=9000 \\</span></span>
<span class="line"><span>--path=&quot;/data/wwwroot/web/apk_download/&quot; \\</span></span>
<span class="line"><span>--allow=&quot;127.0.0.1,192.168.1.164&quot; \\</span></span>
<span class="line"><span>--rule=&quot;::|admin:123456:rwd|user01:123456:rwd|user02:123456:r&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 使用：</span></span>
<span class="line"><span># chmod +x /data/wwwroot/web/chfs/chfs_start.sh</span></span>
<span class="line"><span># nohup /data/wwwroot/web/chfs/chfs_start.sh &amp;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、监控脚本" tabindex="-1"><a class="header-anchor" href="#三、监控脚本"><span>三、监控脚本</span></a></h2><p>脚本使用脚本监控chfs是否运行，如果没有运行则重启脚本</p><p>将脚本定时任务中，每隔5分钟检测一次进程，chfs_start，如果没有检测到，则启动。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vi /data/wwwroot/web/chfs/jiankong_app.sh</span></span>
<span class="line"><span>填写以下：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#sh的文件名不要有grep的关键字</span></span>
<span class="line"><span>###########################################################</span></span>
<span class="line"><span># vi /data/wwwroot/web/chfs/jiankong_app.sh</span></span>
<span class="line"><span># chmod +x /data/wwwroot/web/chfs/jiankong_app.sh</span></span>
<span class="line"><span># crontab 定时 </span></span>
<span class="line"><span># echo &#39;*/5 * * * * www /data/wwwroot/web/chfs/jiankong_app.sh&#39; &gt;&gt; /etc/crontab </span></span>
<span class="line"><span># systemctl restart crond</span></span>
<span class="line"><span></span></span>
<span class="line"><span>LogFile=&quot;/data/wwwroot/web/chfs/jiankong_app.log&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>process_pid=\`ps -aux|grep -v &#39;grep&#39;|grep -c &#39;chfs_start&#39;\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#echo &quot;$process_pid&quot;</span></span>
<span class="line"><span>#关键字的个数，可以使用 grep -c</span></span>
<span class="line"><span>if [ $process_pid -eq 0 ]</span></span>
<span class="line"><span>then</span></span>
<span class="line"><span>	cd /data/wwwroot/web/chfs/</span></span>
<span class="line"><span>	nohup  /data/wwwroot/web/chfs/chfs_start.sh &amp;</span></span>
<span class="line"><span>	now=\`date  +%Y-%m-%d[%H:%M:%S]\`</span></span>
<span class="line"><span>	echo &quot;at $now restart chfs&quot; &gt;&gt; $LogFile</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>fi</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、nginx反向代理" tabindex="-1"><a class="header-anchor" href="#四、nginx反向代理"><span>四、nginx反向代理</span></a></h2><p>nginx的配置如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>upstream chfs_web {</span></span>
<span class="line"><span>                keepalive      4000;</span></span>
<span class="line"><span>                server  127.0.0.1:9000 max_fails=3  fail_timeout=30s;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>server  {</span></span>
<span class="line"><span>		listen          80;</span></span>
<span class="line"><span>		server_name     tool-chfs.XXX.com;</span></span>
<span class="line"><span>		access_log          /data/wwwroot/log/tool-chfs.XXX.com-access.log main_aliyun;</span></span>
<span class="line"><span>		error_log           /dev/null;</span></span>
<span class="line"><span>		location / {		</span></span>
<span class="line"><span>			client_max_body_size 1000m;</span></span>
<span class="line"><span>			proxy_pass              http://chfs_web;</span></span>
<span class="line"><span>			proxy_http_version 1.1;</span></span>
<span class="line"><span>			proxy_set_header Connection &quot;&quot;;</span></span>
<span class="line"><span>			proxy_set_header        X-Real-IP  $remote_addr;</span></span>
<span class="line"><span>			proxy_set_header        Host             $host;</span></span>
<span class="line"><span>			proxy_set_header        X-Forwarded-For  $proxy_add_x_forwarded_for;                </span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#nginx报错：client intended to send too large body: 29826117 bytes</span></span>
<span class="line"><span>#解决方法：  client_max_body_size 1000m;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>client_max_body_size，如果上传文件很大则，则需要修改client_max_body_size的值。</p><h3 id="官方常用命令" tabindex="-1"><a class="header-anchor" href="#官方常用命令"><span>官方常用命令</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>//都使用默认参数，共享目录为程序运行目录，监听端口号为80</span></span>
<span class="line"><span>chfs</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//共享目录为D盘，监听端口号为8080</span></span>
<span class="line"><span>chfs --path=&quot;d:/&quot; --port=8080</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//共享目录为&quot;d:\\\\projects&quot;和&quot;e:\\\\nsis&quot;，监听端口号为80</span></span>
<span class="line"><span>chfs --path=&quot;d:\\\\projects|e:\\\\nsis&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//白名单模式，允许192.168.1.2-192.168.1.100以及192.168.1.200进行访问</span></span>
<span class="line"><span>chfs --allow=&quot;192.168.1.2-192.168.1.100,192.168.1.200&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//黑名单模式，禁止192.168.1.2-192.168.1.100以及192.168.1.200进行访问</span></span>
<span class="line"><span>chfs --allow=&quot;not(192.168.1.2-192.168.1.100,192.168.1.200)&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//匿名用户具有只读权限（默认情况下匿名用户具有读写权限）</span></span>
<span class="line"><span>//账户ceshizu，密码为ceshizu123，对根目录的权限为只读，但对test目录具有读写权限</span></span>
<span class="line"><span>//账户yanfazu，密码为yanfazu123，对根目录的权限为只读，但对yanfa目录具有读写权限</span></span>
<span class="line"><span>chfs --rule=&quot;::r|ceshizu:ceshizu123:r:test:rw|yanfazu:yanfazu123:r:yanfa:rw&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//匿名用户什么权限都没有（默认情况下匿名用户具有读写权限）</span></span>
<span class="line"><span>//账户admin，密码为admin123，具有读写权限</span></span>
<span class="line"><span>//账户zhangsan，密码为zhangsan123，对根目录的权限为不可读写，但对zhangsanfiles目录具有读写权限</span></span>
<span class="line"><span>chfs --rule=&quot;::|admin:admin123:rw|zhangsan:zhangsan123::zhangsanfiles:rw&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//通过配置文件进行配置，该文件可以不存在，待以后需要更改配置时使用</span></span>
<span class="line"><span>chfs --file=&quot;d:\\chfs\\chfs.ini&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,41)]))}const t=n(l,[["render",p]]),h=JSON.parse('{"path":"/article/8g8z6pl0/","title":"使用免费绿色工具chfs，将文件夹共享成网盘","lang":"en-US","frontmatter":{"title":"使用免费绿色工具chfs，将文件夹共享成网盘","createTime":"2025/05/27 17:51:17","permalink":"/article/8g8z6pl0/"},"git":{"createdTime":1749111496000,"updatedTime":1750129445000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":2,"url":"https://github.com/star"}]},"readingTime":{"minutes":3.95,"words":1186},"filePathRelative":"kaiyuan/Open-Source-Software/使用免费绿色工具chfs，将文件夹共享成网盘.md"}');export{t as comp,h as data};
