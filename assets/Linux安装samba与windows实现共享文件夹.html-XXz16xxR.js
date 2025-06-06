import{_ as e,c as a,b as n,o as i}from"./app-BEL8OELx.js";const l={};function d(t,s){return i(),a("div",null,s[0]||(s[0]=[n(`<h1 id="linux安装samba与windows实现共享文件夹" tabindex="-1"><a class="header-anchor" href="#linux安装samba与windows实现共享文件夹"><span>Linux安装samba与windows实现共享文件夹</span></a></h1><p>Linux与Linux间通过什么共享文件呢——NFS，Windows与Windows之间呢——共享文件功能，那Windows与Linux之间通过samba。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">samba：只能在内网使用，类似于windows的网络邻居（文件共享服务）</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>samba两个守护进程： smbd 【监听139端口，TCP端口】 负责用户验证和文件共享 nmbd 【监听137和138端口 UDP端口】 负责处理浏览共享和计算机名称解析</p><h2 id="检查是否安装samba" tabindex="-1"><a class="header-anchor" href="#检查是否安装samba"><span>检查是否安装samba</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">rpm -qa|grep samba</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>否则，使用yum安装</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># yum install samba</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/linux-install-saba.jpg?aliyun" alt="linux-install-saba"></p><h2 id="配置samba" tabindex="-1"><a class="header-anchor" href="#配置samba"><span>配置samba</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># chkconfig smb on   </span>
<span class="line"># chkconfig nmb on</span>
<span class="line">/etc/init.d/smb start</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Centos7</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">systemctl enable smb.service</span>
<span class="line">systemctl enable nmb.service</span>
<span class="line">systemctl start smb</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="新建smb用户用于访问linux共享文件" tabindex="-1"><a class="header-anchor" href="#新建smb用户用于访问linux共享文件"><span>新建smb用户用于访问Linux共享文件</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># useradd smb       # 新建用户</span>
<span class="line"># smbpasswd -a smb  # 修改密码</span>
<span class="line"></span>
<span class="line">#smbpasswd -x smb  # 删除smb用户</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时/home目录会增加一个smb的用户。该Linux用户目录将可直接共享到Windows下。若要共享其它文件，按步骤3配置文件。如果不用了，删除smb用户也是可以的，</p><p>samba配置文件【/etc/samba/smb.conf】。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">[tmp]</span>
<span class="line">comment = Tmp Directories</span>
<span class="line">path = /tmp                         # 共享的Linux目录</span>
<span class="line">public = no                         # 目录不公开</span>
<span class="line">writeable = yes                     # 可写</span>
<span class="line">browseable = yes                    # 可读</span>
<span class="line">valid users = smb                   # 访问用户，上面新建的，也可以使用原来已有的</span>
<span class="line"></span>
<span class="line">复制去掉注释</span>
<span class="line"></span>
<span class="line">分配权限</span>
<span class="line">chown smb.smb -R /data2T/smb</span>
<span class="line">或者：</span>
<span class="line">chmod 777 -R /data2T/smb</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="让smaba通过防火墙" tabindex="-1"><a class="header-anchor" href="#让smaba通过防火墙"><span>让smaba通过防火墙</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">编辑 /etc/sysconfig/iptables 文件</span>
<span class="line"></span>
<span class="line">-A INPUT -m state --state NEW -m tcp -p tcp --dport 139 -j ACCEPT</span>
<span class="line">-A INPUT -m state --state NEW -m tcp -p tcp --dport 445 -j ACCEPT</span>
<span class="line">-A INPUT -m state --state NEW -m udp -p udp --dport 137 -j ACCEPT</span>
<span class="line">-A INPUT -m state --state NEW -m udp -p udp --dport 138 -j ACCEPT</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启防火墙</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># /etc/rc.d/init.d/iptables restart</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>在Windows下使用Win+R开启运行窗口，输入</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">\\\\192.168.1.6</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>此时使用</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># smbstatus</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>centos7</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">yum -y install samba samba-client</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>启动samba</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">systemctl start smb</span>
<span class="line">systemctl status smb</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>设置开机自启动</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># systemctl enable smb</span>
<span class="line">Created symlink from /etc/systemd/system/multi-user.target.wants/smb.service to /usr/lib/systemd/system/smb.service.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="新建smb用户用于访问linux共享文件-1" tabindex="-1"><a class="header-anchor" href="#新建smb用户用于访问linux共享文件-1"><span>新建smb用户用于访问Linux共享文件</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># useradd smb       # 新建用户</span>
<span class="line"># smbpasswd -a smb  # 修改密码</span>
<span class="line"></span>
<span class="line">#smbpasswd -x smb  # 删除smb用户</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建需要共享的目录</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">mkdir -p /data/smb</span>
<span class="line">chown smb.smb -R /data/smb</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>samba配置文件【/etc/samba/smb.conf】。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># cp /etc/samba/smb.conf /etc/samba/smb.conf_bak</span>
<span class="line">[tmp]</span>
<span class="line">comment = Tmp Directories</span>
<span class="line">path = /tmp                         # 共享的Linux目录</span>
<span class="line">public = no                         # 目录不公开</span>
<span class="line">writeable = yes                     # 可写</span>
<span class="line">browseable = yes                    # 可读</span>
<span class="line">valid users = smb                   # 访问用户，上面新建的，也可以使用原来已有的</span>
<span class="line"></span>
<span class="line">复制去掉注释</span>
<span class="line"></span>
<span class="line">vi /etc/samba/smb.conf</span>
<span class="line">复制以下内容：</span>
<span class="line">[global]</span>
<span class="line">	workgroup = MYGROUP</span>
<span class="line">	server string = Samba Server Version %v</span>
<span class="line">	log file = /var/log/samba/log.%m</span>
<span class="line">	# max 50KB per log file, then rotate</span>
<span class="line">	max log size = 50</span>
<span class="line">	security = user</span>
<span class="line">	passdb backend = tdbsam</span>
<span class="line"></span>
<span class="line">#============================ Share Definitions ==============================</span>
<span class="line">[beijing]</span>
<span class="line">comment = Tmp Directories</span>
<span class="line">path = /data/smb</span>
<span class="line">public = no</span>
<span class="line">writeable = yes</span>
<span class="line">browseable = yes</span>
<span class="line">valid users = smb</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启服务</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">systemctl restart smb</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="让smaba通过防火墙-1" tabindex="-1"><a class="header-anchor" href="#让smaba通过防火墙-1"><span>让smaba通过防火墙</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">vi /etc/sysconfig/iptables </span>
<span class="line"></span>
<span class="line">-A INPUT -m state --state NEW -m tcp -p tcp --dport 139 -j ACCEPT</span>
<span class="line">-A INPUT -m state --state NEW -m tcp -p tcp --dport 445 -j ACCEPT</span>
<span class="line">-A INPUT -m state --state NEW -m udp -p udp --dport 137 -j ACCEPT</span>
<span class="line">-A INPUT -m state --state NEW -m udp -p udp --dport 138 -j ACCEPT</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启防火墙服务</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">systemctl restart iptables</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="阿里云服务器ecs的samba配置方法" tabindex="-1"><a class="header-anchor" href="#阿里云服务器ecs的samba配置方法"><span>阿里云服务器ECS的samba配置方法</span></a></h3><p>https://blog.csdn.net/XHG1993/article/details/78872724</p>`,46)]))}const c=e(l,[["render",d]]),p=JSON.parse('{"path":"/file-system/Linux%E5%AE%89%E8%A3%85samba%E4%B8%8Ewindows%E5%AE%9E%E7%8E%B0%E5%85%B1%E4%BA%AB%E6%96%87%E4%BB%B6%E5%A4%B9.html","title":"Linux安装samba与windows实现共享文件夹","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"file-system/Linux安装samba与windows实现共享文件夹.md"}');export{c as comp,p as data};
