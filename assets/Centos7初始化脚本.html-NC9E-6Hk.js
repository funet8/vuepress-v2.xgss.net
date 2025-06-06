import{_ as e,c as n,b as a,o as i}from"./app-BEL8OELx.js";const l={};function d(t,s){return i(),n("div",null,s[0]||(s[0]=[a(`<h1 id="centos7初始化脚本" tabindex="-1"><a class="header-anchor" href="#centos7初始化脚本"><span>Centos7初始化脚本</span></a></h1><h2 id="初始化脚本" tabindex="-1"><a class="header-anchor" href="#初始化脚本"><span>初始化脚本</span></a></h2><p>进入centos7系统，使用脚本</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># wget https://gitee.com/funet8/centos6_LANP_dockerfile/raw/master/shell/CentOS7.x_system_init_shell_mini.sh</span>
<span class="line"></span>
<span class="line">修改hostname和端口</span>
<span class="line">HOSTNAME=&quot;node2&quot;</span>
<span class="line">SSH_PROT=&quot;60920&quot;</span>
<span class="line"></span>
<span class="line">执行脚本：</span>
<span class="line"># sh CentOS7.x_system_init_shell_mini.sh</span>
<span class="line"></span>
<span class="line">功能介绍：</span>
<span class="line"># 1、先ping百度域名，看能否解析域名、修改主机名和ssh端口</span>
<span class="line"># 主要功能:</span>
<span class="line">#	1.修改主机名</span>
<span class="line">#   2.安装wget、tar、lrzsz等常用工具</span>
<span class="line">#   3.将默认源换为阿里云</span>
<span class="line">#   4.安装常用类库</span>
<span class="line">#   5.rc.local添加执行权限</span>
<span class="line">#   6.安装 net-tools</span>
<span class="line">#   7.增加第三方资源库</span>
<span class="line">#   8.关闭SELINUX</span>
<span class="line">#   9.设置UTF-8</span>
<span class="line">#   10.系统时间设置和定时任务</span>
<span class="line">#   11.修改主机SSH端口</span>
<span class="line">#   12.删除MySQL、shell历史记录</span>
<span class="line">#   13.隐藏服务器系统信息</span>
<span class="line">#   14.优化Linux内核参数</span>
<span class="line">#   15. CentOS系统优化【/etc/profile】</span>
<span class="line">#   16.关闭系统自带firewalld防火墙，安装iptables</span>
<span class="line">#   17.安装yum-fastestmirror</span>
<span class="line">#   18.重建缓存、系统升级</span>
<span class="line">#   19.重启系统</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/centos7-chushihua.jpg?aliyun" alt="centos7-chushihua"></p><h2 id="最简单的系统初始化命令" tabindex="-1"><a class="header-anchor" href="#最简单的系统初始化命令"><span>最简单的系统初始化命令</span></a></h2><p>如果不运行上面的脚本。</p><h3 id="_1-安装上传下载软件" tabindex="-1"><a class="header-anchor" href="#_1-安装上传下载软件"><span>1.安装上传下载软件</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">yum install -y lrzsz</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_2-修改主机名" tabindex="-1"><a class="header-anchor" href="#_2-修改主机名"><span>2.修改主机名</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">hostnamectl set-hostname web-name</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_3-允许ssh端口60920-iptables" tabindex="-1"><a class="header-anchor" href="#_3-允许ssh端口60920-iptables"><span>3.允许ssh端口60920-iptables</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">iptables -A INPUT -p tcp --dport 60920 -j ACCEPT</span>
<span class="line">service iptables save</span>
<span class="line">systemctl restart iptables.service</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-允许ssh端口60920-firewall" tabindex="-1"><a class="header-anchor" href="#_4-允许ssh端口60920-firewall"><span>4.允许ssh端口60920-firewall</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">firewall-cmd --zone=public --add-port=60920/tcp --permanent</span>
<span class="line">firewall-cmd --reload</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-修改ssh端口" tabindex="-1"><a class="header-anchor" href="#_5-修改ssh端口"><span>5.修改SSH端口</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">sed -i &quot;s/#Port 22/ListenAddress 0.0.0.0:60920/&quot; /etc/ssh/sshd_config</span>
<span class="line">systemctl restart sshd</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-允许ip转发功能" tabindex="-1"><a class="header-anchor" href="#_6-允许ip转发功能"><span>6.允许ip转发功能</span></a></h3><p>视具体服务器功能而定。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">echo &#39;net.ipv4.ip_forward=1&#39; &gt;&gt; /etc/sysctl.conf</span>
<span class="line">sysctl -p</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="挂载硬盘" tabindex="-1"><a class="header-anchor" href="#挂载硬盘"><span>挂载硬盘</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># fdisk -l</span>
<span class="line"># fdisk /dev/vdb</span>
<span class="line">...</span>
<span class="line">Command (m for help): n</span>
<span class="line">Select (default p): p</span>
<span class="line">Command (m for help): wq</span>
<span class="line">格式化：</span>
<span class="line"># mkfs.ext4 /dev/vdb1</span>
<span class="line"></span>
<span class="line">echo &#39;/dev/vdb1 /home ext4 defaults 0 0&#39; &gt;&gt; /etc/fstab</span>
<span class="line"># mount -a</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="新建常用目录" tabindex="-1"><a class="header-anchor" href="#新建常用目录"><span>新建常用目录</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">wget https://gitee.com/funet8/centos6_LANP_dockerfile/raw/master/shell/create_dir.sh</span>
<span class="line">sh create_dir.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>新建目录作用介绍</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># /data/wwwroot/web  作用：存放WEB应用程序</span>
<span class="line"># /data/wwwroot/log  作用：存放WEB日志</span>
<span class="line"># /data/wwwroot/mysql_log 作用：存放MYSQL日志</span>
<span class="line"># /home/data/wwwroot/log/other/ 作用：存放VSFTP日志</span>
<span class="line"># /data/conf 作用：存放应用程序配置文件</span>
<span class="line"># /data/conf/sites-available 作用：存放nginx站点配置文件</span>
<span class="line"># /data/conf/shell 作用：存放shell脚本</span>
<span class="line"># /home/data/backup 作用：存放备份文件</span>
<span class="line"># /home/data/software 作用：存放安装软件目录</span>
<span class="line"># /home/data/wwwroot/nginx_old_log/ 作用：存放Nginx切割日志</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,26)]))}const r=e(l,[["render",d]]),p=JSON.parse('{"path":"/shell/Centos7%E5%88%9D%E5%A7%8B%E5%8C%96%E8%84%9A%E6%9C%AC.html","title":"Centos7初始化脚本","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"shell/Centos7初始化脚本.md"}');export{r as comp,p as data};
