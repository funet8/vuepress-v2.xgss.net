import{_ as e,c as n,b as a,o as i}from"./app-BEL8OELx.js";const l={};function t(r,s){return i(),n("div",null,s[0]||(s[0]=[a(`<h1 id="基于linux安装私有化部署svn代码仓库" tabindex="-1"><a class="header-anchor" href="#基于linux安装私有化部署svn代码仓库"><span>基于Linux安装私有化部署SVN代码仓库</span></a></h1><p>SVN作为新一代代码版本管理工具，有很多优点，管理方便，逻辑明确，安全性高，代码一致性高。SVN数据存储有两种方式，BDB（事务安全表类型）和FSFS（一种不需要数据库的存储系统），为了避免在服务器连接中断时锁住数据，FSFS是一种更安全也更多人使用的方式。SVN的运行方式也有两种，一种是独立服务器，另一种是借助apache服务，各有利弊，下面就介绍一下这两种方式各自的部署步骤。</p><p><img src="https://imgoss.xgss.net/picgo/svn.webp.jpg?aliyun" alt="svn.webp"></p><h2 id="_1-安装subversion" tabindex="-1"><a class="header-anchor" href="#_1-安装subversion"><span>1.安装subversion</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">[root@localhost ~]# yum -y  install  subversion</span>
<span class="line">[root@localhost home]# mkdir -p /home/svn  				#创建svn目录</span>
<span class="line">[root@localhost home]# chmod -R 777 /home/svn  			#修改目录权限为777</span>
<span class="line">[root@localhost home]# svnadmin create /home/svn/repos    #创建一个svn版本仓库repos （repos 名字自己起）</span>
<span class="line">[root@localhost home]# cd /home/svn/repos/conf   		    #进入repos版本仓库下的配置文件目录</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-设置开机启动文件" tabindex="-1"><a class="header-anchor" href="#_2-设置开机启动文件"><span>2.设置开机启动文件</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">1.编辑/etc/rc.local：</span>
<span class="line"></span>
<span class="line">[root@localhost ~]# vi /etc/rc.local</span>
<span class="line">文件内容如下（在touch /var/lock/subsys/local下面添加一行）</span>
<span class="line"></span>
<span class="line">#添加：</span>
<span class="line">svnserve    -d  -r  /home/svn</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-启动svn服务" tabindex="-1"><a class="header-anchor" href="#_3-启动svn服务"><span>3.启动SVN服务</span></a></h2><p>1.启动svn服务，svn服务默认端口为3690，可以使用“netstat -netpl”命令查看服务启动是否成功：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">[root@localhost ~]# #svnserve  -d  -r  /home/svn</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>2.添加防火墙规则，或者关闭防火墙</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">[root@localhost ~]# vi /etc/sysconfig/iptables</span>
<span class="line">添加以下内容：</span>
<span class="line">-A INPUT -m state --state NEW -m tcp -p tcp --dport 3690 -j ACCEPT</span>
<span class="line">保存后重启防火墙</span>
<span class="line">[root@localhost ~]# service iptables restart</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>svnadmin create /home/svn/gamebox svnadmin create /home/svn/sdk</p><p>将打包过来的文件覆盖。</p><p>如果已经有svn在运行，可以换一个端口运行</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># svnserve -d -r /home/svn/repos –listen-port 3391</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>这样同一台服务器可以运行多个svnserve</p><p>停止svn</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># killall svnserve    //停止</span>
<span class="line"># svnserve -d -r /home/svn/repos // 启动</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>2.启动成功后就可以使用了 a.建议采用TortoiseSVN， 连接地址为: svn://your server address （如果指定端口需要添加端口 :端口号</p><h2 id="备份" tabindex="-1"><a class="header-anchor" href="#备份"><span>备份</span></a></h2><p>备份svn项目：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">svnadmin dump /home/svn/gamebox/ &gt; /home/svnbak/gamebox20160525</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>恢复：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">svnadmin load /home/svn/gamebox/ &lt; /home/svnbak/gamebox20160525</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>将原先服务器的配置文件备份后复制到新服务器中</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">#/opt/svn/iitshare/conf目录下</span>
<span class="line">authz、passwd、svnserve.conf文件</span>
<span class="line"></span>
<span class="line">新建项目：</span>
<span class="line">svnadmin create /home/svn/webgame</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">修改配置：</span>
<span class="line"></span>
<span class="line">[root@zck password]# killall svnserve    //停止</span>
<span class="line">[root@zck password]# svnserve -d -r /home/svn // 启动</span>
<span class="line"></span>
<span class="line">svn地址：</span>
<span class="line">svn://192.168.1.9/sdk</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参考： http://www.linuxidc.com/Linux/2014-01/95640.htm http://www.jb51.net/os/RedHat/73031.html</p>`,28)]))}const c=e(l,[["render",t]]),p=JSON.parse('{"path":"/git/%E5%9F%BA%E4%BA%8ELinux%E5%AE%89%E8%A3%85%E7%A7%81%E6%9C%89%E5%8C%96%E9%83%A8%E7%BD%B2SVN%E4%BB%A3%E7%A0%81%E4%BB%93%E5%BA%93.html","title":"基于Linux安装私有化部署SVN代码仓库","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"git/基于Linux安装私有化部署SVN代码仓库.md"}');export{c as comp,p as data};
