import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as e}from"./app-BiQR_lPj.js";const l={};function p(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h1 id="软件安装流程" tabindex="-1"><a class="header-anchor" href="#软件安装流程"><span>软件安装流程</span></a></h1><h2 id="系统初始化-必须" tabindex="-1"><a class="header-anchor" href="#系统初始化-必须"><span>系统初始化（必须）</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>dnf install -y wget</span></span>
<span class="line"><span>wget https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/Rocky_Linux_9_system_init_shell_mini.sh</span></span>
<span class="line"><span>sh Rocky_Linux_9_system_init_shell_mini.sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建常用的目录-必须" tabindex="-1"><a class="header-anchor" href="#创建常用的目录-必须"><span>创建常用的目录（必须）</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>wget https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/create_dirs.sh</span></span>
<span class="line"><span>sh create_dirs.sh</span></span>
<span class="line"><span></span></span>
<span class="line"><span>或者</span></span>
<span class="line"><span></span></span>
<span class="line"><span>wget -q -O - https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/create_dirs.sh | bash -sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装nginx" tabindex="-1"><a class="header-anchor" href="#安装nginx"><span>安装Nginx</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span></span></span>
<span class="line"><span>gitee（国内）:</span></span>
<span class="line"><span>wget https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/Rocky_Linux_9_Dnf_Install_Nginx.sh</span></span>
<span class="line"><span>sh Rocky_Linux_9_Dnf_Install_Nginx.sh</span></span>
<span class="line"><span></span></span>
<span class="line"><span>github:</span></span>
<span class="line"><span>wget https://raw.githubusercontent.com/funet8/Rocky-Linux-Shell/refs/heads/main/shell/Rocky_Linux_9_Dnf_Install_Nginx.sh</span></span>
<span class="line"><span>sh Rocky_Linux_9_Dnf_Install_Nginx.sh</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 主要功能介绍</span></span>
<span class="line"><span># 1.dnf安装nginx</span></span>
<span class="line"><span># 2.firewall-cmd放开 80和443端口</span></span>
<span class="line"><span># 3.nginx配置文件：</span></span>
<span class="line"><span># 主配置文件：/data/conf/nginx.conf</span></span>
<span class="line"><span># 站点配置文件：/data/conf/sites-available/nginx_*</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="php7-3-7" tabindex="-1"><a class="header-anchor" href="#php7-3-7"><span>php7.3.7</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># gitee:</span></span>
<span class="line"><span># wget https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/Rocky_Linux_9_Install_PHP7_3_PHPFPM.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_PHP7_3_PHPFPM.sh</span></span>
<span class="line"><span># github:</span></span>
<span class="line"><span># wget https://raw.githubusercontent.com/funet8/Rocky-Linux-Shell/refs/heads/main/shell/Rocky_Linux_9_Install_PHP7_3_PHPFPM.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_PHP7_3_PHPFPM.sh</span></span>
<span class="line"><span></span></span>
<span class="line"><span>介绍</span></span>
<span class="line"><span>Filename:    Rocky_Linux_9_Install_PHP7_3_PHPFPM.sh</span></span>
<span class="line"><span>Revision:    1.0</span></span>
<span class="line"><span>Date:        2025/06/25</span></span>
<span class="line"><span>Author:      star</span></span>
<span class="line"><span>Email:       star@xgss.net</span></span>
<span class="line"><span>Description: Rocky Linux 9系统中源码包安装php7.3 phpfpm，shell脚本</span></span>
<span class="line"><span>安装目录为：/data/app/php7.3 、用户为 www 、端口自定义为 7300 。</span></span>
<span class="line"><span>安装扩展</span></span>
<span class="line"><span>需要安装：</span></span>
<span class="line"><span>openssl</span></span>
<span class="line"><span>phpredis</span></span>
<span class="line"><span>pcntl</span></span>
<span class="line"><span>amqp</span></span>
<span class="line"><span>rabbitmq</span></span>
<span class="line"><span>swoole</span></span>
<span class="line"><span>开机启动配置文件： /etc/systemd/system/php7.3-fpm.service</span></span>
<span class="line"><span>启动命令： systemctl start php7.3-fpm.service</span></span>
<span class="line"><span>停止命令： systemctl stop php7.3-fpm.service</span></span>
<span class="line"><span>重启命令： systemctl restart php7.3-fpm.service</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="php8-3-3" tabindex="-1"><a class="header-anchor" href="#php8-3-3"><span>php8.3.3</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span></span></span>
<span class="line"><span># 使用：</span></span>
<span class="line"><span># gitee:</span></span>
<span class="line"><span># wget https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/Rocky_Linux_9_Install_PHP8_3_PHPFPM.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_PHP8_3_PHPFPM.sh</span></span>
<span class="line"><span># github:</span></span>
<span class="line"><span># wget https://raw.githubusercontent.com/funet8/Rocky-Linux-Shell/refs/heads/main/shell/Rocky_Linux_9_Install_PHP8_3_PHPFPM.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_PHP8_3_PHPFPM.sh</span></span>
<span class="line"><span></span></span>
<span class="line"><span>功能：Rocky Linux 9系统中源码包安装php8.3.3 并且使用phpfpm，shell脚本</span></span>
<span class="line"><span>安装目录为：/data/app/php8.3</span></span>
<span class="line"><span>用户为 www </span></span>
<span class="line"><span>端口自定义为 8300</span></span>
<span class="line"><span></span></span>
<span class="line"><span>需要PHP安装扩展</span></span>
<span class="line"><span>zip</span></span>
<span class="line"><span>openssl</span></span>
<span class="line"><span>libmemcached</span></span>
<span class="line"><span>phpredis</span></span>
<span class="line"><span>pcntl</span></span>
<span class="line"><span>amqp</span></span>
<span class="line"><span>rabbitmq</span></span>
<span class="line"><span>swoole</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装-composer" tabindex="-1"><a class="header-anchor" href="#安装-composer"><span>安装 composer</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>su -l www</span></span>
<span class="line"><span></span></span>
<span class="line"><span>curl -sS https://getcomposer.org/installer | php</span></span>
<span class="line"><span>sudo  curl -sS https://getcomposer.org/installer | php</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#移动至系统服务：</span></span>
<span class="line"><span># 赋予www用户 sudo 权限</span></span>
<span class="line"><span>echo &#39;www ALL=(ALL) NOPASSWD:ALL&#39; &gt;&gt;/etc/sudoers</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sudo mv composer.phar /usr/bin/composer</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#查看版本： </span></span>
<span class="line"><span>composer --version</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#替换内地镜像源（如果你服务器不是中国内地的不考虑这个）</span></span>
<span class="line"><span>composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装mysql5-7" tabindex="-1"><a class="header-anchor" href="#安装mysql5-7"><span>安装mysql5.7</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 使用：</span></span>
<span class="line"><span># gitee:</span></span>
<span class="line"><span># wget https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/Rocky_Linux_9_Install_MySQL5_7.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_MySQL5_7.sh</span></span>
<span class="line"><span># github:</span></span>
<span class="line"><span># wget https://raw.githubusercontent.com/funet8/Rocky-Linux-Shell/refs/heads/main/shell/Rocky_Linux_9_Install_MySQL5_7.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_MySQL5_7.sh</span></span>
<span class="line"><span># -------------------------------------------------------------------------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 功能：Rocky Linux 9系统中源码包安装 mysql5.7，shell脚本</span></span>
<span class="line"><span># mysql安装的目录：/data/app/mysql5.7/install</span></span>
<span class="line"><span># mysql数据库目录:/data/app/mysql5.7/data</span></span>
<span class="line"><span># mysql数据库配置目录:/data/app/mysql5.7/etc</span></span>
<span class="line"><span># mysql端口为： 61570</span></span>
<span class="line"><span># mysql root密码为： CQ1234567</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装mysql8" tabindex="-1"><a class="header-anchor" href="#安装mysql8"><span>安装mysql8</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 使用：</span></span>
<span class="line"><span># gitee:</span></span>
<span class="line"><span># wget https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/Rocky_Linux_9_Install_MySQL8.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_MySQL8.sh</span></span>
<span class="line"><span># github:</span></span>
<span class="line"><span># wget https://raw.githubusercontent.com/funet8/Rocky-Linux-Shell/refs/heads/main/shell/Rocky_Linux_9_Install_MySQL8.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_MySQL8.sh</span></span>
<span class="line"><span># -------------------------------------------------------------------------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># 功能：Rocky Linux 9系统中源码包安装 mysql8，shell脚本</span></span>
<span class="line"><span># mysql安装的目录：/data/app/mysql8/install</span></span>
<span class="line"><span># mysql数据库目录:/data/app/mysql8/data</span></span>
<span class="line"><span># mysql数据库配置目录:/data/app/mysql8/etc</span></span>
<span class="line"><span># mysql数据库binlog目录:/data/app/mysql8/binlog</span></span>
<span class="line"><span># mysql端口为： 61800</span></span>
<span class="line"><span># mysql root密码为： CQ12345678</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装vsftpd" tabindex="-1"><a class="header-anchor" href="#安装vsftpd"><span>安装Vsftpd</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>功能：Rocky Linux 9系统中源码包安装 Vsftpd 的shell脚本</span></span>
<span class="line"><span>端口：62920</span></span>
<span class="line"><span>FTP用户： www</span></span>
<span class="line"><span>FTP日志存放路径： /data/wwwroot/ftp_log/</span></span>
<span class="line"><span>登录用户名和密码： yxkj_web Password123 【请修改密码】</span></span>
<span class="line"><span>FTP配置文件：/data/conf/vsftpd/vsftpd.conf</span></span>
<span class="line"><span>被动模式端口范围： 9000-9045</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>使用：</span></span>
<span class="line"><span>gitee:</span></span>
<span class="line"><span>wget https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/Rocky_Linux_9_Install_Vsftpd.sh</span></span>
<span class="line"><span>sh Rocky_Linux_9_Install_Vsftpd.sh</span></span>
<span class="line"><span>github:</span></span>
<span class="line"><span>wget https://raw.githubusercontent.com/funet8/Rocky-Linux-Shell/refs/heads/main/shell/Rocky_Linux_9_Install_Vsftpd.sh</span></span>
<span class="line"><span>sh Rocky_Linux_9_Install_Vsftpd.sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装redis" tabindex="-1"><a class="header-anchor" href="#安装redis"><span>安装Redis</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 功能：Rocky Linux 9系统中源码包安装 Redis 的shell脚本</span></span>
<span class="line"><span># 安装版本：redis-7.4.1</span></span>
<span class="line"><span># 端口：63920</span></span>
<span class="line"><span># 配置所在的目录： /data/conf/</span></span>
<span class="line"><span># 密码： YpassWord666 【请修改密码】</span></span>
<span class="line"><span># redis持久化目录：/data/redis/端口号</span></span>
<span class="line"><span># redis日志： /data/redis/端口号/redis_端口号.log</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># 使用：</span></span>
<span class="line"><span># gitee:</span></span>
<span class="line"><span># wget https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/Rocky_Linux_9_Install_Redis.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_Redis.sh</span></span>
<span class="line"><span># github:</span></span>
<span class="line"><span># wget https://raw.githubusercontent.com/funet8/Rocky-Linux-Shell/refs/heads/main/shell/Rocky_Linux_9_Install_Redis.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_Redis.sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装docker和docker-compose" tabindex="-1"><a class="header-anchor" href="#安装docker和docker-compose"><span>安装Docker和docker-compose</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 功能：Rocky Linux 9系统中源码包安装 Docker 和docker-compose 的shell脚本</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># 使用：</span></span>
<span class="line"><span># gitee:</span></span>
<span class="line"><span># wget https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/Rocky_Linux_9_Install_Docker.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_Docker.sh</span></span>
<span class="line"><span># github:</span></span>
<span class="line"><span># wget https://raw.githubusercontent.com/funet8/Rocky-Linux-Shell/refs/heads/main/shell/Rocky_Linux_9_Install_Docker.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_Docker.sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装nodejs" tabindex="-1"><a class="header-anchor" href="#安装nodejs"><span>安装Nodejs</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># Filename:    Rocky_Linux_9_Install_Nodejs.sh</span></span>
<span class="line"><span># Revision:    1.0</span></span>
<span class="line"><span># Date:        2024/07/22</span></span>
<span class="line"><span># Author:      star</span></span>
<span class="line"><span># Email:       star@xgss.net</span></span>
<span class="line"><span># 功能: Rocky Linux 9系统中源码包安装Nodejs，shell脚本</span></span>
<span class="line"><span># 安装目录为：/data/app/nodejs-v22.17.1</span></span>
<span class="line"><span># nodejs官网：https://nodejs.org/zh-cn</span></span>
<span class="line"><span># 安装版本： v22.17.1 LTS版</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 使用：</span></span>
<span class="line"><span># gitee:</span></span>
<span class="line"><span># wget https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/Rocky_Linux_9_Install_Nodejs.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_Nodejs.sh</span></span>
<span class="line"><span># github:</span></span>
<span class="line"><span># wget https://raw.githubusercontent.com/funet8/Rocky-Linux-Shell/refs/heads/main/shell/Rocky_Linux_9_Install_Nodejs.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_Nodejs.sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装ansible" tabindex="-1"><a class="header-anchor" href="#安装ansible"><span>安装ansible</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>dnf install epel-release -y</span></span>
<span class="line"><span>dnf install ansible -y</span></span>
<span class="line"><span>ansible --version</span></span>
<span class="line"><span></span></span>
<span class="line"><span># vi /etc/ansible/hosts</span></span>
<span class="line"><span></span></span>
<span class="line"><span># cp /etc/ansible/hosts /etc/ansible/hosts.bak</span></span>
<span class="line"><span># cat /dev/null &gt; /etc/ansible/hosts</span></span>
<span class="line"><span></span></span>
<span class="line"><span>添加：</span></span>
<span class="line"><span>[home_web]</span></span>
<span class="line"><span>web01:60920</span></span>
<span class="line"><span>web02:60920</span></span>
<span class="line"><span></span></span>
<span class="line"><span>hostnamectl set-hostname web01</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装zabbix服务端" tabindex="-1"><a class="header-anchor" href="#安装zabbix服务端"><span>安装Zabbix服务端</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>rocky linux 9 源码包安装zabbix服务端</span></span>
<span class="line"><span></span></span>
<span class="line"><span>源码包安装zabbix客户端</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装zabbix客户端" tabindex="-1"><a class="header-anchor" href="#安装zabbix客户端"><span>安装Zabbix客户端</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>## 安装Zabbix客户端</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h1 id="其他软件" tabindex="-1"><a class="header-anchor" href="#其他软件"><span>其他软件</span></a></h1><h2 id="安装socks5代理服务端" tabindex="-1"><a class="header-anchor" href="#安装socks5代理服务端"><span>安装Socks5代理服务端</span></a></h2><h3 id="docker部署socks5代理服务端" tabindex="-1"><a class="header-anchor" href="#docker部署socks5代理服务端"><span>Docker部署Socks5代理服务端</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>docker run -itd --restart always \\</span></span>
<span class="line"><span>--name socks5 \\</span></span>
<span class="line"><span>-p 1080:1080 \\</span></span>
<span class="line"><span>-e PROXY_USER=myuser \\</span></span>
<span class="line"><span>-e PROXY_PASSWORD=mypassword2017 \\</span></span>
<span class="line"><span>-e PROXY_SERVER=0.0.0.0:1080 xkuma/socks5</span></span>
<span class="line"><span></span></span>
<span class="line"><span>端口：1080</span></span>
<span class="line"><span>用户: myuser</span></span>
<span class="line"><span>密码： mypassword2017</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装pptd" tabindex="-1"><a class="header-anchor" href="#安装pptd"><span>安装pptd</span></a></h2><h2 id="安装frp" tabindex="-1"><a class="header-anchor" href="#安装frp"><span>安装FRP</span></a></h2>`,37)]))}const t=n(l,[["render",p]]),h=JSON.parse('{"path":"/Rocky-Linux/0.Rocky-Linux-9%E8%BD%AF%E4%BB%B6%E5%AE%89%E8%A3%85%E6%B5%81%E7%A8%8B.html","title":"软件安装流程","lang":"en-US","frontmatter":{},"git":{"createdTime":1752136049000,"updatedTime":1754468658000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":3,"url":"https://github.com/star"}]},"readingTime":{"minutes":3.17,"words":950},"filePathRelative":"Rocky-Linux/0.Rocky-Linux-9软件安装流程.md"}');export{t as comp,h as data};
