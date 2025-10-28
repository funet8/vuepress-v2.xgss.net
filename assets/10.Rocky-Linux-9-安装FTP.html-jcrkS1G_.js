import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as e}from"./app-BiQR_lPj.js";const l={};function p(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h1 id="rocky-linux-9-安装ftp服务器搭建实战-一文学会-高效文件传输" tabindex="-1"><a class="header-anchor" href="#rocky-linux-9-安装ftp服务器搭建实战-一文学会-高效文件传输"><span>Rocky Linux 9 安装FTP服务器搭建实战：一文学会，高效文件传输！</span></a></h1><p>大家好，我是星哥，之前的文章中介绍了在Rocky Linux 9系统中安装LNMP，今天继续来安装vsftpd软件。</p><p>文件传输的效率和安全性至关重要。FTP（File Transfer Protocol）作为一种经典的文件传输协议，在许多场景下依然扮演着不可或缺的角色。</p><p>本文将详细介绍如何在Rocky Linux 9上安装和配置FTP服务器，帮助您快速搭建一个稳定高效的文件传输平台。</p><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1752825175735.png?tx" alt="img"></p><h1 id="快速安装" tabindex="-1"><a class="header-anchor" href="#快速安装"><span>快速安装</span></a></h1><p>功能：Rocky Linux 9系统中源码包安装 Vsftpd 的shell脚本</p><p>端口：62920</p><p>FTP用户： www</p><p>FTP日志存放路径： /data/wwwroot/ftp_log/</p><p>登录用户名和密码： yxkj_web Password123 【请修改密码】</p><p>FTP配置文件：/data/conf/vsftpd/vsftpd.conf</p><p>被动模式端口范围： 9000-9045</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 使用：</span></span>
<span class="line"><span># gitee:</span></span>
<span class="line"><span># wget https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/Rocky_Linux_9_Install_Vsftpd.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_Vsftpd.sh</span></span>
<span class="line"><span># github:</span></span>
<span class="line"><span># wget https://raw.githubusercontent.com/funet8/Rocky-Linux-Shell/refs/heads/main/shell/Rocky_Linux_9_Install_Vsftpd.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_Vsftpd.sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-新建用户和用户组" tabindex="-1"><a class="header-anchor" href="#_1-新建用户和用户组"><span>1.新建用户和用户组</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>groupadd www</span></span>
<span class="line"><span>useradd -g www www</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-新建目录" tabindex="-1"><a class="header-anchor" href="#_2-新建目录"><span>2.新建目录</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>mkdir -p /data/wwwroot/ftp</span></span>
<span class="line"><span>chown www:www -R /data/wwwroot/ftp</span></span>
<span class="line"><span>chown www:www -R /data/wwwroot/web/</span></span>
<span class="line"><span>mkdir -p /data/conf/vsftpd/</span></span>
<span class="line"><span>mkdir -p /data/wwwroot/ftp_log/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-安装vsftp" tabindex="-1"><a class="header-anchor" href="#_3-安装vsftp"><span>3.安装vsftp</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>dnf clean all</span></span>
<span class="line"><span>dnf makecache</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 安装 vsftpd</span></span>
<span class="line"><span>dnf install -y vsftpd</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装完成后检查版本：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vsftpd -version</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="_4-修改vsftp主配置文件" tabindex="-1"><a class="header-anchor" href="#_4-修改vsftp主配置文件"><span>4.修改vsftp主配置文件</span></a></h2><h3 id="关键配置项说明" tabindex="-1"><a class="header-anchor" href="#关键配置项说明"><span>关键配置项说明</span></a></h3><table><thead><tr><th>配置项</th><th>默认值</th><th>修改后值</th><th>说明</th></tr></thead><tbody><tr><td>anonymous_enable</td><td>YES</td><td>NO</td><td>禁用匿名登录（<strong>安全第一</strong>，避免未授权访问）</td></tr><tr><td>local_enable</td><td>YES</td><td>YES</td><td>允许本地用户登录</td></tr><tr><td>write_enable</td><td>YES</td><td>YES</td><td>允许用户写入文件（上传/创建目录）</td></tr><tr><td>chroot_local_user</td><td>NO</td><td>YES</td><td>限制用户只能访问自己的主目录（防止越权访问系统文件）</td></tr><tr><td>allow_writeable_chroot</td><td>无</td><td>YES</td><td>解决用户主目录写权限冲突（<strong>必须添加</strong>，否则登录失败）</td></tr></tbody></table><p>配置FTP配置文件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>mv  /etc/vsftpd/vsftpd.conf /etc/vsftpd/vsftpd.conf.bak</span></span>
<span class="line"><span>cat &gt; /data/conf/vsftpd/vsftpd.conf &lt;&lt; EOF</span></span>
<span class="line"><span>#ftp时间和系统同步,如果启动有错误，请注销</span></span>
<span class="line"><span>use_localtime=NO</span></span>
<span class="line"><span>#添加此行，解决客户端登陆缓慢问题！重要！默认vsftpd开启了DNS反响解析！这里需要关闭，如果启动有错误，请注销！</span></span>
<span class="line"><span>reverse_lookup_enable=NO</span></span>
<span class="line"><span>#默认无此行，ftp端口为21，添加listen_port=2222把默认端口修改为2222，注意：防火墙同时要开启2222端口</span></span>
<span class="line"><span>listen_port=62920</span></span>
<span class="line"><span>#禁止匿名用户</span></span>
<span class="line"><span>anonymous_enable=NO</span></span>
<span class="line"><span>#设定本地用户可以访问。注意：主要是为虚拟宿主用户，如果该项目设定为NO那么所有虚拟用户将无法访问</span></span>
<span class="line"><span>local_enable=YES</span></span>
<span class="line"><span>#全局设置，是否容许写入（无论是匿名用户还是本地用户，若要启用上传权限的话，就要开启他）</span></span>
<span class="line"><span>write_enable=YES</span></span>
<span class="line"><span>#创建或上传后文件的权限掩码，文件的权限是644</span></span>
<span class="line"><span>local_umask=022</span></span>
<span class="line"><span>#禁止匿名用户上传</span></span>
<span class="line"><span>anon_upload_enable=NO</span></span>
<span class="line"><span>#禁止匿名用户建立目录</span></span>
<span class="line"><span>anon_mkdir_write_enable=NO</span></span>
<span class="line"><span>#设定开启目录标语功能，进入目录时可以显示一些设定的信息，可以通过message_file=.message来设置</span></span>
<span class="line"><span>dirmessage_enable=YES</span></span>
<span class="line"><span>#设定开启日志记录功能</span></span>
<span class="line"><span>xferlog_enable=YES</span></span>
<span class="line"><span>#主动连接的端口号</span></span>
<span class="line"><span>connect_from_port_20=YES</span></span>
<span class="line"><span>#设定禁止上传文件更改宿主</span></span>
<span class="line"><span>chown_uploads=NO</span></span>
<span class="line"><span>#设定Vsftpd的服务日志保存路径。注意，该文件默认不存在。必须要手动touch出来，并且由于这里更改了Vsftpd的服务宿主用户为手动建立的Vsftpd。必须注意给与该用户对日志的写入权限，否则服务将启动失败</span></span>
<span class="line"><span>xferlog_file=/data/wwwroot/ftp_log//vsftpd_xferlog.log</span></span>
<span class="line"><span>#格式化日志格式，使用标准格式</span></span>
<span class="line"><span>xferlog_std_format=YES</span></span>
<span class="line"><span># 如果启用该选项，将生成两个相似的日志文件，默认在 /var/log/xferlog 和 /var/log/vsftpd.log 目录下。前者是 wu-ftpd 类型的传输日志，可以利用标准日志工具对其进行分析；后者是Vsftpd类型的日志。</span></span>
<span class="line"><span>dual_log_enable=YES</span></span>
<span class="line"><span>vsftpd_log_file=/data/wwwroot/ftp_log//vsftpd.log</span></span>
<span class="line"><span>#设定支撑Vsftpd服务的宿主用户为手动建立的Vsftpd用户。注意，一旦做出更改宿主用户后，必须注意一起与该服务相关的读写文件的读写赋权问题。比如日志文件就必须给与该用户写入权限等</span></span>
<span class="line"><span>nopriv_user=vsftpd</span></span>
<span class="line"><span>#设定支持异步传输功能</span></span>
<span class="line"><span>async_abor_enable=YES</span></span>
<span class="line"><span>#设定支持ASCII模式的上传</span></span>
<span class="line"><span>ascii_upload_enable=YES</span></span>
<span class="line"><span>#设定支持ASCII模式的下载</span></span>
<span class="line"><span>ascii_download_enable=YES</span></span>
<span class="line"><span>#设定Vsftpd的登陆欢迎语</span></span>
<span class="line"><span>ftpd_banner=Welcome to FTP service</span></span>
<span class="line"><span>#禁止本地用户登出自己的FTP主目录（NO表示禁止登出，YES表示允许登出）</span></span>
<span class="line"><span>chroot_local_user=NO</span></span>
<span class="line"><span>#禁止虚拟用户登出自己的FTP主目录，即限定在自己的目录内，不让他出去，就比如如果设置成NO，那么当你登陆到ftp的时候，可以访问服务器的其他一些有权限目录。设置为YES后，即锁定你的目录了</span></span>
<span class="line"><span>chroot_list_enable=YES</span></span>
<span class="line"><span>#文件中的用户被禁锢在自己的宿主目录中。/etc/vsftp/chroot_list本身是不存在的，这要建立vim /etc/vsftp/chroot_list，然后将帐户输入一行一个，保存就可以了</span></span>
<span class="line"><span>chroot_list_file=/etc/vsftpd/chroot_list</span></span>
<span class="line"><span>#设为YES时，以standalone方式来启动，否则以超级进程的方式启动。顺便展开说明一下，所谓StandAlone模式就是该服务拥有自己的守护进程支持，在ps -A命令下我们将可用看到vsftpd的守护进程名。如果不想工作在StandAlone模式下，则可以选择SuperDaemon模式，在该模式下vsftpd将没有自己的守护进程，而是由超级守护进程Xinetd全权代理，与此同时，Vsftp服务的许多功能将得不到实现。</span></span>
<span class="line"><span>listen=YES</span></span>
<span class="line"><span>#设定PAM服务下Vsftpd的验证配置文件名。因此，PAM验证将参考/etc/pam.d/下的vsftpd文件配置</span></span>
<span class="line"><span>pam_service_name=vsftpd</span></span>
<span class="line"><span>#在/etc/vsftpd/user_list中的用户将不得使用FTP,设为YES的时候，如果一个用户名是在userlist_file参数指定的文件中，那么在要求他们输入密码之前，会直接拒绝他们登陆</span></span>
<span class="line"><span>userlist_enable=YES</span></span>
<span class="line"><span>#设为YES时，ftp服务器将使用tcp_wrappers作为主机访问控制方式,支持 TCP Wrappers 的防火墙机制</span></span>
<span class="line"><span>tcp_wrappers=NO</span></span>
<span class="line"><span>#设定空闲连接超时时间，这里也可以不设置，将具体数值留给每个具体用户具体指定，当然如果不指定的话，还是使用系统的默认值600，单位秒。</span></span>
<span class="line"><span>idle_session_timeout=300</span></span>
<span class="line"><span>#空闲1秒后服务器断开</span></span>
<span class="line"><span>data_connection_timeout=1</span></span>
<span class="line"><span>#########################################################</span></span>
<span class="line"><span># ssl设置												#</span></span>
<span class="line"><span>#########################################################</span></span>
<span class="line"><span>ssl_enable=NO</span></span>
<span class="line"><span>allow_anon_ssl=NO</span></span>
<span class="line"><span>force_local_data_ssl=YES</span></span>
<span class="line"><span>force_local_logins_ssl=YES</span></span>
<span class="line"><span>ssl_tlsv1=YES</span></span>
<span class="line"><span>ssl_sslv2=NO</span></span>
<span class="line"><span>ssl_sslv3=NO</span></span>
<span class="line"><span>rsa_cert_file=/etc/vsftpd/vsftpd.pem</span></span>
<span class="line"><span>ssl_ciphers=HIGH</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 是否启用隐式ssl功能，不建议开启</span></span>
<span class="line"><span>implicit_ssl=YES</span></span>
<span class="line"><span># 隐式ftp端口设置，如果不设置，默认还是21，但是当客户端以隐式ssl连接时，默认会使用990端口，导致连接失败！！</span></span>
<span class="line"><span>listen_port=62920</span></span>
<span class="line"><span># 输出ssl相关的日志信息</span></span>
<span class="line"><span>#debug_ssl=YES</span></span>
<span class="line"><span>#########################################################</span></span>
<span class="line"><span>#以下这些是关于Vsftpd虚拟用户支持的重要配置项目。</span></span>
<span class="line"><span>#默认Vsftpd.conf中不包含这些设定项目，需要自己手动添加配置</span></span>
<span class="line"><span>#########################################################</span></span>
<span class="line"><span>#设定启用虚拟用户功能</span></span>
<span class="line"><span>guest_enable=YES</span></span>
<span class="line"><span>#指定虚拟用户的宿主用户（这个是我们后面要新建的用户），系统默认是ftp用户，这里是全局设置，在虚拟用户的配置文件中也可以单独指定来覆盖全局设置的用户</span></span>
<span class="line"><span>guest_username=$FTP_USER</span></span>
<span class="line"><span>#设定虚拟用户个人Vsftp的配置文件存放路径。也就是说，这个被指定的目录里，将存放每个Vsftp虚拟用户个性的配置文件，一个需要注意的</span></span>
<span class="line"><span>#地方就是这些配置文件名必须和虚拟用户名相同。</span></span>
<span class="line"><span>#比如说vsftpd.conf的配置文件，你复制到这个目录下，你要mv一下，配置成虚拟用户的名称</span></span>
<span class="line"><span>user_config_dir=/data/conf/vsftpd/vconf</span></span>
<span class="line"><span>#当该参数激活（YES）时，虚拟用户使用与本地用户相同的权限。</span></span>
<span class="line"><span>#当此参数关闭（NO）时，虚拟用户使用与匿名用户相同的权限。默认情况下此参数是关闭的（NO）。</span></span>
<span class="line"><span>virtual_use_local_privs=YES</span></span>
<span class="line"><span>#设置被动模式的端口范围</span></span>
<span class="line"><span>pasv_min_port=9000</span></span>
<span class="line"><span>#设置被动模式的端口范围</span></span>
<span class="line"><span>pasv_max_port=9045</span></span>
<span class="line"><span>#保持5秒</span></span>
<span class="line"><span>accept_timeout=5</span></span>
<span class="line"><span>#1秒后重新连接</span></span>
<span class="line"><span>connect_timeout=1</span></span>
<span class="line"><span>#解决vsftpd: refusing to run with writable root inside chroot ()错误</span></span>
<span class="line"><span>allow_writeable_chroot=YES</span></span>
<span class="line"><span>EOF</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>建立Vsftpd配置文件软链接</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>ln -s /data/conf/vsftpd/vsftpd.conf /etc/vsftpd/vsftpd.conf</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>用openssl生成vsftpd的证书</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>openssl req -x509 -nodes -days 3650 -newkey rsa:2048 \\</span></span>
<span class="line"><span>-keyout /etc/vsftpd/vsftpd.pem \\</span></span>
<span class="line"><span>-out /etc/vsftpd/vsftpd.pem \\</span></span>
<span class="line"><span>-subj &quot;/C=CN/ST=Guangdong/L=Shenzhen/O=MyCompany/OU=IT/CN=ftp.yourdomain.com&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-虚拟用户配置文件" tabindex="-1"><a class="header-anchor" href="#_5-虚拟用户配置文件"><span>5.虚拟用户配置文件</span></a></h2><p>建立虚拟用户名单文件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 建立虚拟用户名单文件</span></span>
<span class="line"><span>touch /etc/vsftpd/virtusers</span></span>
<span class="line"><span># 用echo命令输出加引号的字符串时，将字符串原样输出；</span></span>
<span class="line"><span># 用echo命令输出不加引号的字符串时，将字符串中的各个单词作为字符串输出，各字符串之间用一个空格分割。</span></span>
<span class="line"><span>echo &quot;yxkj_web</span></span>
<span class="line"><span>Password123&quot; &gt; /etc/vsftpd/virtusers</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成虚拟用户数据文件：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>dnf install -y libdb-utils</span></span>
<span class="line"><span>db_load -T -t hash -f /etc/vsftpd/virtusers /etc/vsftpd/virtusers.db</span></span>
<span class="line"><span># 设定PAM验证文件，并指定对虚拟用户数据库文件进行读取</span></span>
<span class="line"><span>chmod 600 /etc/vsftpd/virtusers.db</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 在/etc/pam.d/vsftpd的文件头部加入以下信息（在后面加入无效，或是将vsftpd原内容全部注释掉，在文件末尾加）</span></span>
<span class="line"><span>cp /etc/pam.d/vsftpd  /etc/pam.d/vsftpd.bak</span></span>
<span class="line"><span># 注意：如果系统为64为，则下面的lib改为lib64，否则配置失败</span></span>
<span class="line"><span># 注释文件</span></span>
<span class="line"><span>sed -ir &#39;s/^/#/g&#39; /etc/pam.d/vsftpd</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;auth sufficient /lib64/security/pam_userdb.so db=/etc/vsftpd/virtusers</span></span>
<span class="line"><span>account sufficient /lib64/security/pam_userdb.so db=/etc/vsftpd/virtusers&#39; &gt;&gt; /etc/pam.d/vsftpd</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 添加默认支撑Vsftpd服务的宿主用户，-M：不创建家目录</span></span>
<span class="line"><span>useradd vsftpd -M -s /bin/false</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># 创建保存虚拟用户配置文件的目录</span></span>
<span class="line"><span>mkdir -p /data/conf/vsftpd/vconf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cd /data/conf/vsftpd/vconf</span></span>
<span class="line"><span># 这里创建三个虚拟用户配置文件</span></span>
<span class="line"><span>touch yxkj_web</span></span>
<span class="line"><span># 创建要将哪些用户固定在家目录的配置文件</span></span>
<span class="line"><span>touch /etc/vsftpd/chroot_list</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编辑用户yxkj_web配置文件，其他的跟这个配置文件类似</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cd /data/conf/vsftpd/vconf/ </span></span>
<span class="line"><span>for VUSER in yxkj_web ;do </span></span>
<span class="line"><span>cat &gt; $VUSER &lt;&lt; EOF</span></span>
<span class="line"><span>#启用虚拟用户,centos下yes必须为小写字母 </span></span>
<span class="line"><span>#guest_enable=yes </span></span>
<span class="line"><span>#通过此项可以配置不同的虚拟用户属于不同宿主用户，默认则用全局配置中的设置</span></span>
<span class="line"><span>#映射本地虚拟用户 </span></span>
<span class="line"><span>guest_username=www</span></span>
<span class="line"><span>#如果当时创建用户的时候锁定一个目录了，那就可以不写 </span></span>
<span class="line"><span>local_root=/data/wwwroot/ftp/$VUSER</span></span>
<span class="line"><span>#用户会话空闲后10分钟</span></span>
<span class="line"><span>idle_session_timeout=600</span></span>
<span class="line"><span>#将数据连接空闲2分钟断</span></span>
<span class="line"><span>data_connection_timeout=120</span></span>
<span class="line"><span>#最大客户端连接数 </span></span>
<span class="line"><span>max_clients=10 </span></span>
<span class="line"><span>#每个ip最大连接数 </span></span>
<span class="line"><span>max_per_ip=5 </span></span>
<span class="line"><span>#限制上传速率，0为无限制 </span></span>
<span class="line"><span>local_max_rate=0</span></span>
<span class="line"><span>#设置一个文件名或者目录名式样（注意：只能是文件名或是目录名，不支持路径模式）以阻止在任何情况下访问它们。并不是隐藏它们，而是拒绝任何试图对它们进行的操作（下载，改变目录层，和其他有影响的操作）。</span></span>
<span class="line"><span>deny_file={*.mov,.private}</span></span>
<span class="line"><span>#设置了一个文件名或者目录名（注意：只能是文件名或是目录名，不支持路径模式）列表，这个列表内的资源会被隐藏，不管是否有隐藏属性。但如果用户知道了它的存在，将能够对它进行完全的访问。</span></span>
<span class="line"><span>hide_file={.hidden,hide*}</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 创建测试用户ftp目录</span></span>
<span class="line"><span>mkdir -p /data/wwwroot/ftp/$VUSER</span></span>
<span class="line"><span># 将用户固定在家目录</span></span>
<span class="line"><span>echo $VUSER &gt;&gt; /etc/vsftpd/chroot_list</span></span>
<span class="line"><span>done</span></span>
<span class="line"><span></span></span>
<span class="line"><span>chown www:www  -R /data/wwwroot/ftp</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-开机启动-挂载" tabindex="-1"><a class="header-anchor" href="#_6-开机启动-挂载"><span>6.开机启动(挂载)</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>systemctl enable rc-local &amp;&gt;/dev/null</span></span>
<span class="line"><span>if [ $? -ne 0 ]; then</span></span>
<span class="line"><span>    echo &quot;rc-local.service 不存在，开始创建 systemd 单元...&quot;</span></span>
<span class="line"><span>    # 创建 rc-local.service 单元文件</span></span>
<span class="line"><span>    cat &lt;&lt;EOF | sudo tee /etc/systemd/system/rc-local.service &gt;/dev/null</span></span>
<span class="line"><span>[Unit]</span></span>
<span class="line"><span>Description=/etc/rc.d/rc.local Compatibility</span></span>
<span class="line"><span>ConditionPathExists=/etc/rc.d/rc.local</span></span>
<span class="line"><span>After=network.target</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Service]</span></span>
<span class="line"><span>Type=forking</span></span>
<span class="line"><span>ExecStart=/etc/rc.d/rc.local start</span></span>
<span class="line"><span>TimeoutSec=0</span></span>
<span class="line"><span>RemainAfterExit=yes</span></span>
<span class="line"><span>GuessMainPID=no</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Install]</span></span>
<span class="line"><span>WantedBy=multi-user.target</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    echo &quot;已创建 rc-local.service&quot;</span></span>
<span class="line"><span>	# 创建 /etc/rc.d/rc.local 文件（如果不存在）</span></span>
<span class="line"><span>    if [ ! -f /etc/rc.d/rc.local ]; then</span></span>
<span class="line"><span>        sudo bash -c &#39;echo -e &quot;#!/bin/bash\\n\\nexit 0&quot; &gt; /etc/rc.d/rc.local&#39;</span></span>
<span class="line"><span>        echo &quot;已创建 /etc/rc.d/rc.local 文件并添加 exit 0&quot;</span></span>
<span class="line"><span>    fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 添加执行权限</span></span>
<span class="line"><span>    sudo chmod +x /etc/rc.d/rc.local</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 重新加载 systemd 并启用 rc-local</span></span>
<span class="line"><span>    sudo systemctl daemon-reload</span></span>
<span class="line"><span>    sudo systemctl enable rc-local</span></span>
<span class="line"><span>    echo &quot;已启用 rc-local.service&quot;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 启动服务</span></span>
<span class="line"><span>systemctl start rc-local</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 显示服务状态</span></span>
<span class="line"><span>systemctl status rc-local --no-pager</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mount --bind /data/wwwroot/web  /data/wwwroot/ftp/yxkj_web</span></span>
<span class="line"><span>echo &quot;##vsftpd-user-mount##&quot; &gt;&gt; /etc/rc.local</span></span>
<span class="line"><span>echo &quot;mount --bind /data/wwwroot/web  /data/wwwroot/ftp/yxkj_web&quot; &gt;&gt; /etc/rc.local</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-配置防火墙" tabindex="-1"><a class="header-anchor" href="#_7-配置防火墙"><span>7.配置防火墙</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 配置防火墙</span></span>
<span class="line"><span>firewall-cmd --zone=public --add-port=62920/tcp --permanent</span></span>
<span class="line"><span>firewall-cmd --reload</span></span>
<span class="line"><span>firewall-cmd --zone=public --list-ports</span></span>
<span class="line"><span>#firewall-cmd 放开9000至9045端口</span></span>
<span class="line"><span>firewall-cmd --zone=public --permanent --add-port=9000-9045/tcp</span></span>
<span class="line"><span>firewall-cmd --reload</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#启动服务并设置开机自启</span></span>
<span class="line"><span>systemctl restart vsftpd</span></span>
<span class="line"><span>systemctl enable vsftpd</span></span>
<span class="line"><span>systemctl status vsftpd</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-使用ftp软件登录" tabindex="-1"><a class="header-anchor" href="#_8-使用ftp软件登录"><span>8.使用FTP软件登录</span></a></h2><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1752825021388.png?tx" alt="img"></p><h2 id="新建一个vsftp用户" tabindex="-1"><a class="header-anchor" href="#新建一个vsftp用户"><span>新建一个vsftp用户</span></a></h2><p>添加新用户的方法</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>建立虚拟用户名单文件 vi /etc/vsftpd/virtusers</span></span>
<span class="line"><span>生成虚拟用户数据文件 db_load -T -t hash -f /etc/vsftpd/virtusers /etc/vsftpd/virtusers.db</span></span>
<span class="line"><span>建立虚拟用户个人vsftp的配置文件 cp /data/conf/vsftpd/vconf/yxkj_web /data/conf/vsftpd/vconf/zhts_new</span></span>
<span class="line"><span>修改用户的ftp目录：修改文件：/data/conf/vsftpd/vconf/zhts_new中的local_root=/data/wwwroot/ftp/zhts_new</span></span>
<span class="line"><span>创建用户ftp目录 mkdir -p /data/wwwroot/ftp/zhts_new</span></span>
<span class="line"><span>将用户固定在家目录 echo zhts_new &gt;&gt; /etc/vsftpd/chroot_list</span></span>
<span class="line"><span>mkdir -p /data/wwwroot/web/test.web.com /data/wwwroot/ftp/test/test.web.com</span></span>
<span class="line"><span>chown www.www -R /data/wwwroot/web /data/wwwroot/ftp/test</span></span>
<span class="line"><span>绑定路径： mount --bind /data/wwwroot/web/test.web.com /data/wwwroot/ftp/test/test.web.com</span></span>
<span class="line"><span>开机启动： echo &quot;mount --bind /data/wwwroot/web/test.web.com /data/wwwroot/ftp/test/test.web.com&quot; &gt;&gt; /etc/rc.local</span></span>
<span class="line"><span>重启服务 systemctl restart vsftpd</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h1><p>通过以上步骤，你已成功在Rocky Linux 9上搭建了一个安全的FTP服务器。关键配置包括禁用匿名登录、限制用户目录、开放防火墙端口。</p><p>如有任何问题或建议，欢迎在评论区留言交流！觉得有用的话，别忘了点赞收藏哦~</p><p>写文不易，如果你都看到了这里，请点个赞和在看，分享给更多的朋友；也别忘了关注星哥玩云！这里有满满的干货分享，还有轻松有趣的技术交流～点个赞、分享给身边的小伙伴，一起成长，一起玩转技术世界吧！ 😊</p>`,52)]))}const r=n(l,[["render",p]]),v=JSON.parse('{"path":"/Rocky-Linux/10.Rocky-Linux-9-%E5%AE%89%E8%A3%85FTP.html","title":"Rocky Linux 9 安装FTP服务器搭建实战：一文学会，高效文件传输！","lang":"en-US","frontmatter":{},"git":{"createdTime":1754468658000,"updatedTime":1754468658000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}]},"readingTime":{"minutes":11.11,"words":3333},"filePathRelative":"Rocky-Linux/10.Rocky-Linux-9-安装FTP.md"}');export{r as comp,v as data};
