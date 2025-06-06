import{_ as n,c as a,b as e,o as i}from"./app-BEL8OELx.js";const l={};function t(c,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="linux安装rsync和inotify实现文件夹实时同步" tabindex="-1"><a class="header-anchor" href="#linux安装rsync和inotify实现文件夹实时同步"><span>Linux安装rsync和inotify实现文件夹实时同步</span></a></h1><h2 id="需求说明" tabindex="-1"><a class="header-anchor" href="#需求说明"><span>需求说明</span></a></h2><p>在web服务器中，作为代码发布机A，文件同步到服务器B,C,D等集群中，可以忽略某个文件和目录。</p><p>A服务器：内网IP: 192.168.1.2</p><p>B服务器：内网IP： 192.168.1.3</p><p>A和B的www用户，或者root用户免密登录。</p><p><img src="https://imgoss.xgss.net/picgo/rsyncheinotify.jpg?aliyun" alt="rsyncheinotify"></p><h2 id="rsync介绍" tabindex="-1"><a class="header-anchor" href="#rsync介绍"><span>rsync介绍</span></a></h2><p>rsync是linux系统下的数据镜像备份工具。使用快速增量备份工具Remote Sync可以远程同步，支持本地复制，或者与其他SSH、rsync主机同步。</p><h2 id="inotify介绍" tabindex="-1"><a class="header-anchor" href="#inotify介绍"><span>inotify介绍</span></a></h2><p>inotify是一种强大的、细粒度的、异步的文件系统事件监控机制，linux内核从2.6.13起，加入了inotify支持，通过inotify可以监控文件系统中添加、删除，修改、移动等各种细微事件，利用这个内核接口，第三方软件就可以监控文件系统下文件的各种变化情况，而inotify-tools就是这样的一个第三方软件。</p><h2 id="_1-安装rsync" tabindex="-1"><a class="header-anchor" href="#_1-安装rsync"><span>1.安装rsync</span></a></h2><p>A和B都做</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">yum -y install xinetd</span>
<span class="line">yum -y install rsync</span>
<span class="line"></span>
<span class="line">chkconfig  rsync  on</span>
<span class="line"></span>
<span class="line">service xinetd restart</span>
<span class="line">systemctl restart xinetd</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>A上操作：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">rsync -av root@192.168.1.3:/rsynctest/1.txt /root</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>B上操作</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">rsync -av /rsynctest/2.txt root@192.168.1.2:/root</span>
<span class="line">rsync -av -e &quot;ssh -p 22&quot; /rsynctest/2.txt root@192.168.1.2:/root 		【如果ssh的开启的端口不是22 则用-e指定ssh端口】</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-安装-inotify" tabindex="-1"><a class="header-anchor" href="#_2-安装-inotify"><span>2.安装 inotify</span></a></h2><p>只在A上操作即可。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">安装inotify-tools</span>
<span class="line">yum install inotify-tools -y</span>
<span class="line"></span>
<span class="line">也可以安装包</span>
<span class="line">wget http://js.地址funet8地址.com/centos_software/inotify-tools-3.14.tar.gz</span>
<span class="line">tar -zxvf inotify-tools-3.14.tar.gz </span>
<span class="line">cd inotify-tools-3.14</span>
<span class="line">./configure</span>
<span class="line">make </span>
<span class="line">make install</span>
<span class="line"></span>
<span class="line">inotifywait -m /root	【查看inotify-tools是否运行正常】</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">新开一个终端：</span>
<span class="line">[root@localhost ~]# cd /root</span>
<span class="line">[root@localhost ~]# touch bb.txt</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>监控到</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># inotifywait -m /root</span>
<span class="line">Setting up watches.</span>
<span class="line">Watches established.</span>
<span class="line">/root/ OPEN .bash_profile</span>
<span class="line">/root/ ACCESS .bash_profile</span>
<span class="line">/root/ CLOSE_NOWRITE,CLOSE .bash_profile</span>
<span class="line">/root/ OPEN .bashrc</span>
<span class="line">/root/ ACCESS .bashrc</span>
<span class="line">/root/ CLOSE_NOWRITE,CLOSE .bashrc</span>
<span class="line">/root/ CREATE bb.txt</span>
<span class="line">/root/ OPEN bb.txt</span>
<span class="line">/root/ ATTRIB bb.txt</span>
<span class="line">/root/ CLOSE_WRITE,CLOSE bb.txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="网站实时同步脚本" tabindex="-1"><a class="header-anchor" href="#网站实时同步脚本"><span>网站实时同步脚本</span></a></h2><p>test.sh 为要运行网站实时同步脚本 其中定义了要同步的网站的路径，要同步到的ip地址，哪些后缀名的文件忽略监控，同步的用户名，同步的文件列表，哪些文件不需要同步。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">cat test.sh</span>
<span class="line">#!/bin/sh</span>
<span class="line">SRC=/data/wwwroot/web/test/ #代码发布服务器目录</span>
<span class="line">DST=/data/wwwroot/web/test/ #目标服务器目录</span>
<span class="line"></span>
<span class="line">IP=&quot;192.168.1.3 192.168.1.4&quot; # 这里可以用hostname，多个主机用空格</span>
<span class="line">USER=www</span>
<span class="line">inotifywait -mrq $SRC -e modify,delete,create,close_write,attrib  | while read D E F  </span>
<span class="line">        do  </span>
<span class="line">                for i in $IP</span>
<span class="line">                do</span>
<span class="line">                        #排除后缀名和目录</span>
<span class="line">                        /usr/bin/rsync -e &#39;ssh -p 60920&#39; \\</span>
<span class="line">                        -ahqzt --exclude &quot;*.swp&quot; \\</span>
<span class="line">                        --exclude &quot;*.svn&quot; \\</span>
<span class="line">                        --exclude &quot;test/&quot; \\</span>
<span class="line">                        --exclude &quot;runtime/&quot; \\</span>
<span class="line">                        --delete $SRC $USER@$i:$DST</span>
<span class="line">                done</span>
<span class="line">        done</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">增加权限：</span>
<span class="line">chmod +x test.sh</span>
<span class="line"></span>
<span class="line">后台运行：</span>
<span class="line">nohup ./test.sh &gt; nohup_test 2&gt;&amp;1 &amp;</span>
<span class="line"></span>
<span class="line">生成一个文件才能触发文件同步</span>
<span class="line">touch /data/wwwroot/web/test/test_rsync_\`date +%Y%m%d-%H:%M:%S\`.html</span>
<span class="line"></span>
<span class="line">删除测试文件</span>
<span class="line">rm -rf /data/wwwroot/web/test/test_rsync*.html</span>
<span class="line"></span>
<span class="line">测试文件是否同步</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28)]))}const r=n(l,[["render",t]]),p=JSON.parse('{"path":"/linux-basis/Linux%E5%AE%89%E8%A3%85rsync%E5%92%8Cinotify%E5%AE%9E%E7%8E%B0%E6%96%87%E4%BB%B6%E5%A4%B9%E5%AE%9E%E6%97%B6%E5%90%8C%E6%AD%A5.html","title":"Linux安装rsync和inotify实现文件夹实时同步","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"linux-basis/Linux安装rsync和inotify实现文件夹实时同步.md"}');export{r as comp,p as data};
