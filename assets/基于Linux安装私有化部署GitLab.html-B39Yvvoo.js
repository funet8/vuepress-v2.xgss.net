import{_ as a,c as n,b as e,o as i}from"./app-BEL8OELx.js";const l={};function t(d,s){return i(),n("div",null,s[0]||(s[0]=[e(`<h1 id="再见github和码云-基于linux安装私有化部署gitlab代码仓库" tabindex="-1"><a class="header-anchor" href="#再见github和码云-基于linux安装私有化部署gitlab代码仓库"><span>再见Github和码云！基于Linux安装私有化部署GitLab代码仓库</span></a></h1><p>最近访问自己的Gitee开源仓库时候，需要手动提交审核，并且同意gitee.com的条款，好在审核1-2小时就审核通过了，但还是有些膈应。Github也是经常性抽风，不如就自己搭建gitlab的仓库，没有条条框框的限制。</p><p><img src="https://imgoss.xgss.net/picgo/image-20220520161426092.png?aliyun" alt="image-20220520161426092"></p><p>同意条款：</p><p><img src="https://imgoss.xgss.net/picgo/image-20220520161822355.png?aliyun" alt="image-20220520161822355"></p><h2 id="什么是gitlab" tabindex="-1"><a class="header-anchor" href="#什么是gitlab"><span>什么是Gitlab</span></a></h2><p>GitLab 是一个用于仓库管理系统的开源项目，使用Git作为代码管理工具，并在此基础上搭建起来的Web服务，可通过Web界面进行访问公开的或者私人项目。它拥有与Github类似的功能，能够浏览源代码，管理缺陷和注释。</p><p><img src="https://imgoss.xgss.net/picgo/gitlabcangku.jpg?aliyun" alt="gitlabcangku"></p><h2 id="前期准备" tabindex="-1"><a class="header-anchor" href="#前期准备"><span>前期准备</span></a></h2><p>一台Linux服务器，vm虚拟机或者云服务器均可，<strong>内存要大于1G</strong>（别问，问就是：Whoops, GitLab is taking too much time to respond.），硬盘大于20G。</p><p>本次使用centos7</p><p>可选： 域名一个，SSL证书。</p><h1 id="安装gitlab的三种方法" tabindex="-1"><a class="header-anchor" href="#安装gitlab的三种方法"><span>安装Gitlab的三种方法</span></a></h1><p>1.官方Linux安装包</p><p>2.docker安装</p><p>3.下载想要的rpm包安装</p><p>相对于三种方法，个人更加推荐使用docker。</p><h2 id="一、官方linux安装包" tabindex="-1"><a class="header-anchor" href="#一、官方linux安装包"><span>一、官方Linux安装包</span></a></h2><h2 id="_1-安装和配置必须的依赖项" tabindex="-1"><a class="header-anchor" href="#_1-安装和配置必须的依赖项"><span>1. 安装和配置必须的依赖项</span></a></h2><p>在 CentOS 7上，下面的命令也会在系统防火墙中打开 HTTP、HTTPS 和 SSH 访问。这是一个可选步骤，如果您打算仅从本地网络访问GitLab，则可以跳过它。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">sudo yum install -y curl policycoreutils-python openssh-server perl</span>
<span class="line">sudo systemctl enable sshd</span>
<span class="line">sudo systemctl start sshd</span>
<span class="line">sudo firewall-cmd --permanent --add-service=http</span>
<span class="line">sudo firewall-cmd --permanent --add-service=https</span>
<span class="line">sudo systemctl reload firewalld</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-下载-安装极狐gitlab" tabindex="-1"><a class="header-anchor" href="#_2-下载-安装极狐gitlab"><span>2. 下载/安装极狐GitLab</span></a></h2><p>配置GitLab 软件源镜像。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">curl -fsSL https://packages.gitlab.cn/repository/raw/scripts/setup.sh | /bin/bash</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>执行如下命令开始安装：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">EXTERNAL_URL=&quot;https://gitlab.example.com&quot; yum install -y gitlab-jh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="_3-访问极狐gitlab-实例并登录" tabindex="-1"><a class="header-anchor" href="#_3-访问极狐gitlab-实例并登录"><span>3. 访问极狐GitLab 实例并登录</span></a></h2><p>除非您在安装过程中指定了自定义密码，否则将随机生成一个密码并存储在 /etc/gitlab/initial_root_password 文件中(出于安全原因，24 小时后，此文件会被第一次 <code>gitlab-ctl reconfigure</code> 自动删除，因此若使用随机密码登录，建议安装成功初始登录成功之后，立即修改初始密码）。使用此密码和用户名 <code>root</code> 登录。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"> cat /etc/gitlab/initial_root_password</span>
<span class="line"> Password: qZiiPJmRgReOLaBbB9FQ8ZJULnu2nqxwBjHnzozvCwI=</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>登录gitlab页面即可</p><h1 id="二、基于docker安装gitlab" tabindex="-1"><a class="header-anchor" href="#二、基于docker安装gitlab"><span>二、基于docker安装Gitlab</span></a></h1><h2 id="_1-安装docker" tabindex="-1"><a class="header-anchor" href="#_1-安装docker"><span>1.安装docker</span></a></h2><p>略</p><h2 id="_2-运行docker" tabindex="-1"><a class="header-anchor" href="#_2-运行docker"><span>2.运行docker</span></a></h2><p>官方文档：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">export GITLAB_HOME=/srv/gitlab</span>
<span class="line">sudo docker run --detach \\</span>
<span class="line">  --hostname gitlab.example.com \\</span>
<span class="line">  --publish 443:443 --publish 80:80 --publish 22:22 \\</span>
<span class="line">  --name gitlab \\</span>
<span class="line">  --restart always \\</span>
<span class="line">  --volume $GITLAB_HOME/config:/etc/gitlab \\</span>
<span class="line">  --volume $GITLAB_HOME/logs:/var/log/gitlab \\</span>
<span class="line">  --volume $GITLAB_HOME/data:/var/opt/gitlab \\</span>
<span class="line">  --shm-size 256m \\</span>
<span class="line">  registry.gitlab.cn/omnibus/gitlab-jh:latest</span>
<span class="line">  </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于服务器的443、80端口被占用，所有这里改成</p><p>文件目录： /data/docker/gitlab/</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker run -itd \\</span>
<span class="line">--hostname gitlab.xgss.net \\</span>
<span class="line">-p 444:443 -p 81:80 --name gitlab \\</span>
<span class="line">--restart always \\</span>
<span class="line">-v /data/docker/gitlab/config:/etc/gitlab \\</span>
<span class="line">-v /data/docker/gitlab/logs:/var/log/gitlab \\</span>
<span class="line">-v /data/docker/gitlab/data:/var/opt/gitlab \\</span>
<span class="line">-v /etc/localtime:/etc/localtime \\</span>
<span class="line">gitlab/gitlab-ce:latest</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解释</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"># gitlab.xgss.net  解析到服务器ip</span>
<span class="line">访问： http://gitlab.xgss.net:81/</span>
<span class="line">或者通过服务器的nginx再代理转发过去，就不用加端口了。</span>
<span class="line"></span>
<span class="line">server {</span>
<span class="line">        listen       80;</span>
<span class="line">        server_name  gitlab.xgss.net;</span>
<span class="line">        access_log /data/wwwroot/log/gitlab.xgss.net-access.log main_aliyun;</span>
<span class="line">        error_log /dev/null;</span>
<span class="line">        location / {</span>
<span class="line">                proxy_pass      http://127.0.0.1:81;</span>
<span class="line">                proxy_redirect off;</span>
<span class="line">                proxy_set_header Host $host;</span>
<span class="line">                proxy_set_header X-Real-IP $remote_addr;</span>
<span class="line">                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span>
<span class="line">        }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20220520164950184.png?aliyun" alt="image-20220520164950184"></p><p>查看密码</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">cat /data/docker/gitlab/config/initial_root_password </span>
<span class="line">Password: fSXXjErvK*****</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重置密码：</p><p><img src="https://imgoss.xgss.net/picgo/image-20220520165701988.png?aliyun" alt="image-20220520165701988"></p><p>由于我安装的是gitlab的英文版，可以汉化。也可以直接安装docker gitlab中文版的镜像</p><h2 id="汉化版的gitlab" tabindex="-1"><a class="header-anchor" href="#汉化版的gitlab"><span>汉化版的gitlab</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker pull twang2218/gitlab-ce-zh:latest</span>
<span class="line">启动</span>
<span class="line"></span>
<span class="line">docker run -itd \\</span>
<span class="line">--hostname gitlab.xgss.net \\</span>
<span class="line">-p 444:443 -p 81:80 --name gitlab \\</span>
<span class="line">--restart always \\</span>
<span class="line">-v /data/docker/gitlab/config:/etc/gitlab \\</span>
<span class="line">-v /data/docker/gitlab/logs:/var/log/gitlab \\</span>
<span class="line">-v /data/docker/gitlab/data:/var/opt/gitlab \\</span>
<span class="line">-v /etc/localtime:/etc/localtime \\</span>
<span class="line">twang2218/gitlab-ce-zh:latest</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20220520171358994.png?aliyun" alt="image-20220520171358994"></p><h1 id="三、下载rpm包安装" tabindex="-1"><a class="header-anchor" href="#三、下载rpm包安装"><span>三、下载rpm包安装</span></a></h1><h2 id="_1-下载rpm包" tabindex="-1"><a class="header-anchor" href="#_1-下载rpm包"><span>1.下载rpm包</span></a></h2><p>gitlab包RPM官方下载：https://packages.gitlab.com/gitlab/gitlab-ce ，你可以选择任意想要的版本下载。</p><p>我选择gitlab-ce-8.2.2-ce.0.el6.x86_64.rpm，这个版本比较老，建议下载最新的，</p><p>把下载的文件放到百度网盘：</p><p>链接：https://pan.baidu.com/s/1-N_BAKRzz4lm8blu25Oz7w 提取码：0pwc</p><h2 id="_2-通过rpm安装" tabindex="-1"><a class="header-anchor" href="#_2-通过rpm安装"><span>2.通过rpm安装</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">#  yum install -y curl openssh-server postftix cronie wget</span>
<span class="line">#  yum install -y postfix</span>
<span class="line"># systemctl enable postfix</span>
<span class="line"># systemctl start postfix</span>
<span class="line">#  lokkit -s http -s ssh</span>
<span class="line">#  wget https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh</span>
<span class="line">#  sh script.rpm.sh </span>
<span class="line"></span>
<span class="line"># rz 【上传gitlab-ce-8.2.2-ce.0.el6.x86_64.rpm】</span>
<span class="line"># yum install -y gitlab-ce-8.2.2-ce.0.el6.x86_64.rpm </span>
<span class="line"># gitlab-ctl reconfigure</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-访问gitlab" tabindex="-1"><a class="header-anchor" href="#_3-访问gitlab"><span>3.访问gitlab</span></a></h2><p>访问： http://192.168.1.243/</p><p>初始密码： Username: root Password: 5iveL!fe</p><p>修改初始密码。</p><p>就可以使用gitlab的后台创建项目和用户。</p><p>运行多年之后的截图：</p><p><img src="https://imgoss.xgss.net/picgo/image-20220520162449484.png?aliyun" alt="image-20220520162449484"></p><h3 id="修改配置ip或者域名" tabindex="-1"><a class="header-anchor" href="#修改配置ip或者域名"><span>修改配置IP或者域名</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">vi /opt/gitlab/embedded/service/gitlab-rails/config/gitlab.yml</span>
<span class="line"></span>
<span class="line"> gitlab:</span>
<span class="line">   ## Web server settings</span>
<span class="line">   host: 192.168.1.243   # 这里也可以改成域名</span>
<span class="line">   port: 80</span>
<span class="line">   https: false</span>
<span class="line">重启服务,就可以了    </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更改配置后，执行如下命令（加载配置生效）：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">sudo gitlab-ctl reconfigure</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>服务打开、关闭、重启：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">gitlab-ctl start</span>
<span class="line">gitlab-ctl stop</span>
<span class="line">gitlab-ctl restart</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="四、gitlab的备份与恢复" tabindex="-1"><a class="header-anchor" href="#四、gitlab的备份与恢复"><span>四、Gitlab的备份与恢复</span></a></h1><p>如果使用docker安装则直接备份gitlab目录即可。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">gitlab-ctl start</span>
<span class="line"></span>
<span class="line">gitlab所有的工程目录：</span>
<span class="line">/var/opt/gitlab/</span>
<span class="line">仓库文件</span>
<span class="line">/var/opt/gitlab/git-data/repositories</span>
<span class="line">默认备份目录，修改此目录：</span>
<span class="line">/var/opt/gitlab/backups	</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新建gitlab的备份目录</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># mkdir /home/git_bak	</span>
<span class="line"># chown git:root -R /home/git_bak/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>修改配置文件</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">vi /opt/gitlab/embedded/service/gitlab-rails/config/gitlab.yml</span>
<span class="line"></span>
<span class="line">  backup:</span>
<span class="line">    path: &quot;/var/opt/gitlab/backups&quot; </span>
<span class="line">改为：</span>
<span class="line">  backup:</span>
<span class="line">    path: &quot;/home/git_bak&quot;</span>
<span class="line"></span>
<span class="line">有的版本/etc/gitlab/gitlab.rb</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启服务</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># gitlab-ctl restart		【重启】</span>
<span class="line"># /opt/gitlab/bin/gitlab-rake gitlab:backup:create	【备份git】</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="恢复gitlab备份方法" tabindex="-1"><a class="header-anchor" href="#恢复gitlab备份方法"><span>恢复Gitlab备份方法</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># gitlab-ctl stop unicorn</span>
<span class="line"># gitlab-ctl stop sidekiq</span>
<span class="line"></span>
<span class="line"># gitlab-rake gitlab:backup:restore BACKUP=1459415571	【恢复备份】</span>
<span class="line">Unpacking backup ... </span>
<span class="line">[root@localhost backups]# gitlab-ctl start</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="gitlab定时自动备份" tabindex="-1"><a class="header-anchor" href="#gitlab定时自动备份"><span>gitlab定时自动备份</span></a></h2><p>添加定时脚本：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># vi /etc/crontab</span>
<span class="line">添加以下：</span>
<span class="line">#周六凌晨2点备份gitlab文件</span>
<span class="line">0 2 * * 1 root /home/git_bak/gitbak.sh  &gt;&gt; /home/git_bak/gitbak.log</span>
<span class="line"></span>
<span class="line">cat /home/git_bak/gitbak.sh</span>
<span class="line">#备份GIT################################################################</span>
<span class="line">/opt/gitlab/bin/gitlab-rake gitlab:backup:create</span>
<span class="line">sleep 30</span>
<span class="line"></span>
<span class="line">################自动删除7天前gitlab备份文件#########################</span>
<span class="line">ndays=&quot;7&quot;</span>
<span class="line">wheredir=&quot;/home/git_bak/*&quot;</span>
<span class="line">find $wheredir -mtime +$ndays -name &quot;*_gitlab_backup.tar&quot; -exec rm -rf {} \\;</span>
<span class="line">sleep 30</span>
<span class="line"></span>
<span class="line">#备份文件推送到内网其他服务器中。</span>
<span class="line">#/usr/bin/rsync -ahqzt -e &quot;ssh -p 22&quot;  --delete /home/git_bak/    root@192.168.1.10:/data/backup/192.168.1.9/gitlab_bak/</span>
<span class="line"></span>
<span class="line">#  systemctl restart crond</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看备份目录：</p><p>双保险：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">ll -h /home/git_bak/</span>
<span class="line">total 49G</span>
<span class="line">-rw------- 1 git  git   24G May  9 03:31 1652036724_gitlab_backup.tar</span>
<span class="line">-rw------- 1 git  git   25G May 16 03:38 1652641989_gitlab_backup.tar</span>
<span class="line">-rw-r--r-- 1 root root 1.9M May 16 03:38 gitbak.log</span>
<span class="line">-rwxr-xr-x 1 root root 2.1K Sep  5  2020 gitbak.sh</span>
<span class="line"></span>
<span class="line">备份服务器中的文件：</span>
<span class="line"># ll -h /data/backup/192.168.1.9/gitlab_bak/</span>
<span class="line">total 49G</span>
<span class="line">-rw------- 1 nginx dockerroot  24G May  9 03:31 1652036724_gitlab_backup.tar</span>
<span class="line">-rw------- 1 nginx dockerroot  25G May 16 03:38 1652641989_gitlab_backup.tar</span>
<span class="line">-rw-r--r-- 1 root  root       1.9M May 16 03:38 gitbak.log</span>
<span class="line">-rwxr-xr-x 1 root  root       2.1K Sep  5  2020 gitbak.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参考文件</p><p>官方Linux安装包： https://about.gitlab.cn/install/</p><p>官方GitLab Docker 镜像： https://docs.gitlab.cn/jh/install/docker.html</p>`,91)]))}const r=a(l,[["render",t]]),c=JSON.parse('{"path":"/git/%E5%9F%BA%E4%BA%8ELinux%E5%AE%89%E8%A3%85%E7%A7%81%E6%9C%89%E5%8C%96%E9%83%A8%E7%BD%B2GitLab.html","title":"再见Github和码云！基于Linux安装私有化部署GitLab代码仓库","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"git/基于Linux安装私有化部署GitLab.md"}');export{r as comp,c as data};
