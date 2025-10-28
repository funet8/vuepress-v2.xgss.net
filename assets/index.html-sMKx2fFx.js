import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as e}from"./app-BiQR_lPj.js";const l={};function p(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h1 id="linux搭建开源企业邮箱系统ewomail" tabindex="-1"><a class="header-anchor" href="#linux搭建开源企业邮箱系统ewomail"><span>Linux搭建开源企业邮箱系统EwoMail</span></a></h1><h2 id="ewomail是什么" tabindex="-1"><a class="header-anchor" href="#ewomail是什么"><span>EwoMail是什么</span></a></h2><p>EwoMail是基于Linux的开源邮件服务器软件，集成了众多优秀稳定的组件，是一个快速部署、简单高效、多语言、安全稳定的邮件解决方案，帮助你提升运维效率，降低 IT 成本，兼容主流的邮件客户端，同时支持电脑和手机邮件客户端。</p><h2 id="项目文档" tabindex="-1"><a class="header-anchor" href="#项目文档"><span>项目文档</span></a></h2><p>开源项目：https://gitee.com/laowu5/EwoMail</p><p>官方文档：http://doc.ewomail.com/docs/ewomail/jianjie</p><h2 id="服务器环境-腾讯云" tabindex="-1"><a class="header-anchor" href="#服务器环境-腾讯云"><span>服务器环境（腾讯云）</span></a></h2><p>前期准备，需要域名，国内需要备案</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>需求centos7/8 64位系统</span></span>
<span class="line"><span>172.21.0.15（内）</span></span>
<span class="line"><span>49.232.171.74（公网）</span></span>
<span class="line"><span>centos7+1核+1G+40G</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/email-EwoMail.jpg?aliyun" alt="email-EwoMail"></p><h1 id="系统初始化" tabindex="-1"><a class="header-anchor" href="#系统初始化"><span>系统初始化</span></a></h1><p>适当运行脚本</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>新建常用文件路径</span></span>
<span class="line"><span>wget https://raw.githubusercontent.com/funet8/centos6_LANP_dockerfile/master/shell/create_dir.sh</span></span>
<span class="line"><span></span></span>
<span class="line"><span>初始化系统脚本</span></span>
<span class="line"><span>wget https://raw.githubusercontent.com/funet8/centos6_LANP_dockerfile/master/shell/CentOS7.x_system_init_shell_mini.sh</span></span>
<span class="line"><span>重新登陆服务器要改端口 60920</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="腾讯云解封25端口" tabindex="-1"><a class="header-anchor" href="#腾讯云解封25端口"><span>腾讯云解封25端口</span></a></h1><p>https://cloud.tencent.com/document/product/213/40436</p><h1 id="新建swap分区" tabindex="-1"><a class="header-anchor" href="#新建swap分区"><span>新建SWAP分区</span></a></h1><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>#内存为32G以上则不考虑 </span></span>
<span class="line"><span>#内存在16G至32G之间，交换分区配置为8G</span></span>
<span class="line"><span>#内存在4G至16G之间，交换分区配置为4G </span></span>
<span class="line"><span>#内存小于4G的则配置交换分区为2G </span></span>
<span class="line"><span></span></span>
<span class="line"><span>安装前</span></span>
<span class="line"><span># free -m</span></span>
<span class="line"><span>              total        used        free      shared  buff/cache   available</span></span>
<span class="line"><span>Mem:            991         164          73           0         752         683</span></span>
<span class="line"><span>Swap:             0           0           0</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># wget https://gitee.com/funet8/centos6_LANP_dockerfile/raw/master/shell/aliyun_swap.sh</span></span>
<span class="line"><span>修改 size_block 变量</span></span>
<span class="line"><span># sh aliyun_swap.sh</span></span>
<span class="line"><span></span></span>
<span class="line"><span>安装后</span></span>
<span class="line"><span># free -m</span></span>
<span class="line"><span>              total        used        free      shared  buff/cache   available</span></span>
<span class="line"><span>Mem:            991         162          61           0         767         686</span></span>
<span class="line"><span>Swap:          2047           0        2047</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="安装ewomail开源版" tabindex="-1"><a class="header-anchor" href="#安装ewomail开源版"><span>安装ewomail开源版</span></a></h1><h2 id="git安装-centos7-8" tabindex="-1"><a class="header-anchor" href="#git安装-centos7-8"><span>git安装 （centos7/8）</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>yum -y install git</span></span>
<span class="line"><span>cd /root</span></span>
<span class="line"><span>git clone https://gitee.com/laowu5/EwoMail.git</span></span>
<span class="line"><span>cd /root/EwoMail/install</span></span>
<span class="line"><span>#需要输入一个邮箱域名，不需要前缀，列如下面的 your-domain.com</span></span>
<span class="line"><span>sh ./start.sh your-domain.com</span></span>
<span class="line"><span></span></span>
<span class="line"><span># firewall-cmd --zone=public --add-port=60920/tcp --permanent</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="遇到的登陆不了ssh的问题" tabindex="-1"><a class="header-anchor" href="#遇到的登陆不了ssh的问题"><span>遇到的登陆不了ssh的问题</span></a></h2><p>由于初始脚本中使用的是iptables的策略，而ewomail开源策略使用的是firewall-cmd导致无法登陆。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>开放ssh端口：</span></span>
<span class="line"><span># firewall-cmd --zone=public --add-port=60920/tcp --permanent</span></span>
<span class="line"><span>重启防火墙：</span></span>
<span class="line"><span># firewall-cmd --reload</span></span>
<span class="line"><span># iptables -nL</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="访问地址-将ip更换成你服务器ip即可" tabindex="-1"><a class="header-anchor" href="#访问地址-将ip更换成你服务器ip即可"><span>访问地址（将IP更换成你服务器IP即可）</span></a></h2><p>邮箱管理后台：<a href="http://49.232.171.74:8010/" target="_blank" rel="noopener noreferrer">http://49.232.171.74:8010</a> （默认账号admin，密码ewomail123）</p><p>web邮件系统：<a href="http://49.232.171.74:8000/" target="_blank" rel="noopener noreferrer">http://49.232.171.74:8000</a></p><p>phpmyadmin：<a href="http://49.232.171.74:8020/" target="_blank" rel="noopener noreferrer">http://49.232.171.74:8020/</a></p><h1 id="常规配置-视情况操作" tabindex="-1"><a class="header-anchor" href="#常规配置-视情况操作"><span>常规配置（视情况操作）</span></a></h1><p>http://doc.ewomail.com/docs/ewomail/changguipeizhi</p><h2 id="修改密码" tabindex="-1"><a class="header-anchor" href="#修改密码"><span>修改密码</span></a></h2><p>登陆：http://IP:8010 ， 点击”个人资料”进行修改。</p><h2 id="修改资料" tabindex="-1"><a class="header-anchor" href="#修改资料"><span>修改资料</span></a></h2><p>修改后台标题，备案资料，语言种类等等。。</p><h2 id="webmail修改端口" tabindex="-1"><a class="header-anchor" href="#webmail修改端口"><span>webmail修改端口</span></a></h2><p>nginx 配置文件 /ewomail/nginx/conf/vhost/rainloop.conf</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vi /ewomail/nginx/conf/vhost/rainloop.conf</span></span>
<span class="line"><span>将8000改为80</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ssl证书" tabindex="-1"><a class="header-anchor" href="#ssl证书"><span>SSL证书</span></a></h2><p>不需要</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>操作的时候请备份要替换的配置文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>webmail的https</span></span>
<span class="line"><span>复制/ewomail/nginx/conf/vhost/rainloop.conf.ssl 替换rainloop.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1、系统自带了本地SSL证书，imap,smtp,nginx都会使用它，你可以默认也使用，安装的时候根据你的域名生成。</span></span>
<span class="line"><span>2、使用互联网经过认证的证书，将你申请生成的nginx证书替换以下2个文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>公匙 /etc/ssl/certs/dovecot.pem</span></span>
<span class="line"><span>私匙 /etc/ssl/private/dovecot.pem</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果你使用默认本地证书，就不用进行替换，复制文件替换后就可以了。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>最后执行命令重启</span></span>
<span class="line"><span>service nginx restart</span></span>
<span class="line"><span>systemctl restart postfix dovecot</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mysql优化配置" tabindex="-1"><a class="header-anchor" href="#mysql优化配置"><span>mysql优化配置</span></a></h2><p>1.06版本默认mysql是针对1G内存以下进行优化的，如果你服务器内存大于1G，请以下操作</p><p>将 /ewomail/mysql/etc/my-huge.cnf 替换 /ewomail/mysql/etc/my.cnf</p><p>重启mysql</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>service mysqld restart</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="mysql数据库" tabindex="-1"><a class="header-anchor" href="#mysql数据库"><span>mysql数据库</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>忘记管理员</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果忘记管理员密码，需要进入数据库修改。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>查看数据库密码</span></span>
<span class="line"><span></span></span>
<span class="line"><span>进入服务器执行命令：cat /ewomail/config.ini</span></span>
<span class="line"><span></span></span>
<span class="line"><span># cat /ewomail/config.ini</span></span>
<span class="line"><span>domain：your-domain.com</span></span>
<span class="line"><span>mysql-root-password：ybXkgm7T944sO***** （星号处理）</span></span>
<span class="line"><span>mysql-ewomail-password：wIm9Hb9Yi******</span></span>
<span class="line"><span></span></span>
<span class="line"><span>打开http://IP:8020 （ewomail默认安装了phpmyadmin，为了安全，可以关闭或更换端口）</span></span>
<span class="line"><span>打开ewomail数据库，找到i_admin表，将password改为3bb3733de472b226208307ec1e689347</span></span>
<span class="line"><span>这样就可以把密码改回ewomail123，重新使用默认账号和密码登录即可。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="域名解析-重要" tabindex="-1"><a class="header-anchor" href="#域名解析-重要"><span>域名解析-重要</span></a></h1><p>http://doc.ewomail.com/docs/ewomail/domain_dns</p><p><img src="https://imgoss.xgss.net/picgo/m_a8f7fce25341e4034b536b9554aab6d1_r.png?aliyun" alt="img"></p><p>遇到问题 @的txt记录跟cname记录冲突，所以删除cname记录</p><p>根据DNS解析协议标准，当TXT与CNAME同时存在会触发CNAME的排他性标准，导致DNS会解析错乱。因为TXT一般为验证性解析，如果您是需要利用TXT进行相关验证的话可以先做TXT解析记录，等到TXT解析记录验证成功了再进行CNAME添加。</p><h1 id="dkim设置-防垃圾邮件" tabindex="-1"><a class="header-anchor" href="#dkim设置-防垃圾邮件"><span>DKIM设置（防垃圾邮件）</span></a></h1><p>DKIM是电子邮件验证标准，域名密钥识别邮件标准，主要是用来防止被判定为垃圾邮件。</p><p>http://doc.ewomail.com/docs/ewomail/dkim</p><p>每个域名都需要添加一个dkim的key，EwoMail默认安装后已自动添加主域名dkim，只需要设置好dkim的dns即可。</p><h2 id="获取dkim-key" tabindex="-1"><a class="header-anchor" href="#获取dkim-key"><span>获取dkim key</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>centos7/8</span></span>
<span class="line"><span># amavisd -c /etc/amavisd/amavisd.conf showkeys</span></span>
<span class="line"><span>; key#1 1024 bits, i=dkim, d=your-domain.com, /ewomail/dkim/mail.pem</span></span>
<span class="line"><span>dkim._domainkey.your-domain.com.     3600 TXT (</span></span>
<span class="line"><span>  &quot;v=DKIM1; p=&quot;</span></span>
<span class="line"><span>  &quot;XXXXXXX&quot;)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>复制输出的信息，打开http://www.ewomail.com/list-20.html 整理dkim信息</p><p>整理完成后会在“整理显示区域”显示解析记录，接下来设置域名解析即可完成。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>域名：your-domain.com	</span></span>
<span class="line"><span>记录类型： TXT</span></span>
<span class="line"><span>主机记录：dkim._domainkey</span></span>
<span class="line"><span>记录值：</span></span>
<span class="line"><span>v=DKIM1;p=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="自定义访问路径" tabindex="-1"><a class="header-anchor" href="#自定义访问路径"><span>自定义访问路径</span></a></h1><p>如果在apache修改了后台管理或webmail的访问路径，需要修改PHP配置文件才能正常使用webmail。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vi /ewomail/www/ewomail-admin/core/config.php</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;?php</span></span>
<span class="line"><span>//配置文件</span></span>
<span class="line"><span>return [</span></span>
<span class="line"><span>    &#39;dbhost&#39; =&gt; &#39;localhost&#39;,//数据库连接地址</span></span>
<span class="line"><span>    &#39;dbuser&#39; =&gt; &#39;ewomail&#39;,//数据库账号</span></span>
<span class="line"><span>    &#39;dbpw&#39; =&gt; &#39;wIm9Hb9YiP3lMxVF&#39;,</span></span>
<span class="line"><span>    &#39;dbname&#39; =&gt; &#39;ewomail&#39;,//数据库名称</span></span>
<span class="line"><span>    &#39;dbcharset&#39; =&gt; &#39;utf8&#39;,//数据库编码</span></span>
<span class="line"><span>    &#39;dbprefix&#39;=&gt; &#39;i_&#39;,//数据库表的前缀</span></span>
<span class="line"><span>    &#39;code_key&#39; =&gt; &#39;22jCVkIiArtSEpYe&#39;,</span></span>
<span class="line"><span>    &#39;url&#39; =&gt; &#39;http://mail.your-domain.com:8010&#39;,</span></span>
<span class="line"><span>    &#39;webmail_url&#39; =&gt; &#39;http://mail.your-domain.com:8000&#39;,</span></span>
<span class="line"><span>    &#39;maildir&#39;=&gt;&#39;/ewomail/mail&#39;,//邮件存放目录，邮件安装后请不要修改</span></span>
<span class="line"><span>    &#39;home_default&#39; =&gt;&#39;Center&#39;,//默认项目</span></span>
<span class="line"><span>    &#39;home_allow&#39; =&gt; [&#39;Center&#39;,&#39;Api&#39;],//允许项目</span></span>
<span class="line"><span>    &#39;module_default&#39; =&gt;&#39;Index&#39;,//默认模块</span></span>
<span class="line"><span>    &#39;action_default&#39; =&gt;&#39;index&#39;,//默认控制器</span></span>
<span class="line"><span>    &#39;prefix&#39;=&gt;&#39;ewomail_&#39;,//网站通用前缀，包括session,cookie</span></span>
<span class="line"><span></span></span>
<span class="line"><span>];</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="降低内存占用" tabindex="-1"><a class="header-anchor" href="#降低内存占用"><span>降低内存占用</span></a></h1><p>正式环境不用操作。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vim /etc/amavisd/amavisd.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#在文件尾部加上该行参数</span></span>
<span class="line"><span>@bypass_virus_checks_maps = (1);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#最后按下esc键，输入:wq保存</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#修改文件（参考上面的例子操作命令修改）</span></span>
<span class="line"><span>vim /usr/lib/systemd/system/amavisd.service</span></span>
<span class="line"><span>在 Wants=clamd@amavisd.service 前面加上#符号</span></span>
<span class="line"><span>#保存文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>systemctl daemon-reload</span></span>
<span class="line"><span>systemctl stop clamd@amavisd</span></span>
<span class="line"><span>systemctl disable clamd@amavisd</span></span>
<span class="line"><span>systemctl restart amavisd</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="网易邮箱大师客户端配置" tabindex="-1"><a class="header-anchor" href="#网易邮箱大师客户端配置"><span>网易邮箱大师客户端配置</span></a></h1><p><img src="http://imgoss.xgss.net/picgo/image-20210409160203025.png?aliyunoss" alt="image-20210409160203025"></p><h1 id="挂载nfs" tabindex="-1"><a class="header-anchor" href="#挂载nfs"><span>挂载NFS</span></a></h1><p>正式环境操作，考虑到附件可能会很大，如果单独购买云硬盘是不够的，购买NFS或者使用共享存储。这里生成环境购买nfs，挂载到 /ewomail。</p><h2 id="关闭服务" tabindex="-1"><a class="header-anchor" href="#关闭服务"><span>关闭服务</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>service php-fpm stop</span></span>
<span class="line"><span>service nginx stop</span></span>
<span class="line"><span>service mysqld stop</span></span>
<span class="line"><span>systemctl stop postfix dovecot amavisd</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mv /ewomail /ewomail_bak</span></span>
<span class="line"><span>mkdir /ewomail</span></span>
<span class="line"><span></span></span>
<span class="line"><span>yum -y install nfs-utils</span></span>
<span class="line"><span></span></span>
<span class="line"><span>执行以下命令，提高同时发起的NFS请求数量：</span></span>
<span class="line"><span>echo &quot;options sunrpc tcp_slot_table_entries=128&quot; &gt;&gt;  /etc/modprobe.d/sunrpc.conf</span></span>
<span class="line"><span>echo &quot;options sunrpc tcp_max_slot_table_entries=128&quot; &gt;&gt;  /etc/modprobe.d/sunrpc.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span># mkdir /aliyun_nfs</span></span>
<span class="line"><span># chown 777 -R /aliyun_nfs</span></span>
<span class="line"><span># mount -t nfs -o vers=3,nolock,proto=tcp,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport xxxxxxxxxxxxxxx:/ /aliyun_nfs</span></span>
<span class="line"><span></span></span>
<span class="line"><span># mkdir -p /aliyun_nfs/ewomail/</span></span>
<span class="line"><span></span></span>
<span class="line"><span># mount -t nfs -o vers=3,nolock,proto=tcp,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport xxxxxxxxxxxxxxx:/ewomail /ewomail</span></span>
<span class="line"><span></span></span>
<span class="line"><span># df -h |grep aliyun</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>service php-fpm start</span></span>
<span class="line"><span>service nginx start</span></span>
<span class="line"><span>service mysqld start</span></span>
<span class="line"><span>systemctl start postfix dovecot amavisd</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="数据库备份" tabindex="-1"><a class="header-anchor" href="#数据库备份"><span>数据库备份</span></a></h1><p>http://doc.ewomail.com/docs/ewomail/data_backup</p><p>EwoMail 主要目录在/ewomail，相关的数据与文件都存放在该目录。</p><h2 id="mysql备份" tabindex="-1"><a class="header-anchor" href="#mysql备份"><span>MYSQL备份</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cat /ewomail/config.ini</span></span>
<span class="line"><span></span></span>
<span class="line"><span>查看root密码，是否能登陆</span></span>
<span class="line"><span># mysql -u root -p&#39;ybXkgm7T944sOlaD&#39;</span></span>
<span class="line"><span># 导出数据库sql</span></span>
<span class="line"><span># mkdir /data/backup</span></span>
<span class="line"><span># mysqldump -u root  -P 3306 -p&#39;ybXkgm7T944sOlaD&#39; ewomail &gt; /data/backup/ewomail.sql</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="文件打包备份" tabindex="-1"><a class="header-anchor" href="#文件打包备份"><span>文件打包备份</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># tar -zcf /data/backup/ewomail.tar.gz /ewomail/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h1 id="重装" tabindex="-1"><a class="header-anchor" href="#重装"><span>重装</span></a></h1><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>无法重装</span></span>
<span class="line"><span></span></span>
<span class="line"><span>卸载：</span></span>
<span class="line"><span>systemctl stop nginx php-fpm mysqld postfix dovecot amavisd</span></span>
<span class="line"><span>rm -rf /ewomail</span></span>
<span class="line"><span>mv /usr/lib/systemd/system/mysqld.service  /usr/lib/systemd/system/mysqld.service_bak</span></span>
<span class="line"><span>mv /etc/rc.d/init.d/mysqld /etc/rc.d/init.d/mysqld_bak</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,81)]))}const t=n(l,[["render",p]]),m=JSON.parse('{"path":"/article/skon65nw/","title":"Linux搭建开源企业邮箱系统EwoMail","lang":"en-US","frontmatter":{"title":"Linux搭建开源企业邮箱系统EwoMail","createTime":"2025/05/27 17:51:17","permalink":"/article/skon65nw/"},"git":{"createdTime":1749111496000,"updatedTime":1750129445000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":2,"url":"https://github.com/star"}]},"readingTime":{"minutes":6,"words":1801},"filePathRelative":"kaiyuan/Open-Source-Software/Linux搭建开源企业邮箱系统EwoMail.md"}');export{t as comp,m as data};
