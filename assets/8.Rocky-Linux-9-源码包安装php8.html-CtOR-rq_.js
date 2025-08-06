import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,b as i,o as e}from"./app-B4PqXO1v.js";const p={};function l(d,s){return e(),n("div",null,s[0]||(s[0]=[i(`<h1 id="rocky-linux-9-源码包安装php8" tabindex="-1"><a class="header-anchor" href="#rocky-linux-9-源码包安装php8"><span>Rocky Linux 9 源码包安装php8</span></a></h1><p>大家好，我是星哥！今天咱们不聊yum一键安装的“快餐式”部署，来点儿硬核的——源码编译安装PHP 8.3。为什么要折腾源码？因为它能让你深度定制PHP功能、启用最新特性，还能避开系统默认源的版本限制。</p><p>话不多说，跟着星哥一步步把PHP 8.3.3 在Rocky Linux 9上从0到1跑起来，顺便把性能榨干！</p><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1752581819875.png?tx" alt="img"></p><h1 id="快速安装" tabindex="-1"><a class="header-anchor" href="#快速安装"><span>快速安装</span></a></h1><p>Rocky Linux 9系统中源码包安装php8.3.3 并且使用phpfpm</p><p>安装目录为：/data/app/php8.3</p><p>用户为 www</p><p>端口自定义为 8300</p><p>需要PHP安装扩展</p><p>zip</p><p>openssl</p><p>libmemcached</p><p>phpredis</p><p>pcntl</p><p>amqp</p><p>rabbitmq</p><p>swoole</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 使用：</span></span>
<span class="line"><span># gitee:</span></span>
<span class="line"><span># wget https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/Rocky_Linux_9_Install_PHP8_3_PHPFPM.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_PHP8_3_PHPFPM.sh</span></span>
<span class="line"><span># github:</span></span>
<span class="line"><span># wget https://raw.githubusercontent.com/funet8/Rocky-Linux-Shell/refs/heads/main/shell/Rocky_Linux_9_Install_PHP8_3_PHPFPM.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_PHP8_3_PHPFPM.sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-新建用户和用户组" tabindex="-1"><a class="header-anchor" href="#_1-新建用户和用户组"><span>1.新建用户和用户组</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>groupadd www</span></span>
<span class="line"><span>useradd -g www www</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-安装epel仓库" tabindex="-1"><a class="header-anchor" href="#_2-安装epel仓库"><span>2.安装EPEL仓库</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>dnf install -y epel-release</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="_3-安装依赖" tabindex="-1"><a class="header-anchor" href="#_3-安装依赖"><span>3.安装依赖</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 清理缓存并更新软件包列表</span></span>
<span class="line"><span>dnf clean all</span></span>
<span class="line"><span>dnf makecache</span></span>
<span class="line"><span>dnf install -y  wget libxml2-devel sqlite-devel bzip2-devel libcurl-devel libffi-devel libpng-devel libwebp-devel libjpeg-devel oniguruma libzip</span></span>
<span class="line"><span>dnf install -y gcc make autoconf automake libtool bison gcc  libicu-devel openssl-devel</span></span>
<span class="line"><span>dnf install -y gcc gcc-c++ make autoconf automake libtool bison re2c  openssl-devel libxml2-devel libpng-devel  libjpeg-devel  libicu-devel curl-devel   sqlite-devel libuuid-devel systemd-devel libxslt-devel readline-devel</span></span>
<span class="line"><span></span></span>
<span class="line"><span>dnf groupinstall &quot;Development Tools&quot; -y</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-安装oniguruma-devel和libzip-devel" tabindex="-1"><a class="header-anchor" href="#_4-安装oniguruma-devel和libzip-devel"><span>4.安装oniguruma-devel和libzip-devel</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>wget https://dl.rockylinux.org/pub/rocky/9/devel/x86_64/os/Packages/o/oniguruma-devel-6.9.6-1.el9.6.x86_64.rpm</span></span>
<span class="line"><span>dnf -y install oniguruma-devel-6.9.6-1.el9.6.x86_64.rpm</span></span>
<span class="line"><span></span></span>
<span class="line"><span>wget https://dl.rockylinux.org/pub/rocky/9/devel/x86_64/os/Packages/l/libzip-devel-1.7.3-8.el9.x86_64.rpm</span></span>
<span class="line"><span>dnf -y install libzip-devel-1.7.3-8.el9.x86_64.rpm</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-下载php8解压安装" tabindex="-1"><a class="header-anchor" href="#_5-下载php8解压安装"><span>5.下载php8解压安装</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>mkdir -p /data/app/php8.3 /data/software/php8.3</span></span>
<span class="line"><span>mkdir -p /data/software &amp;&amp; cd /data/software</span></span>
<span class="line"><span>cd /data/software</span></span>
<span class="line"><span>    wget https://www.php.net/distributions/php-8.3.3.tar.gz</span></span>
<span class="line"><span>	tar -zxf php-8.3.3.tar.gz</span></span>
<span class="line"><span>	cd /data/software/php-8.3.3</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>    ./configure \\</span></span>
<span class="line"><span>    --with-fpm-user=www \\</span></span>
<span class="line"><span>    --with-fpm-group=www \\</span></span>
<span class="line"><span>    --prefix=/data/app/php8.3 \\</span></span>
<span class="line"><span>    --with-config-file-path=/data/app/php8.3/etc \\</span></span>
<span class="line"><span>    --with-openssl \\</span></span>
<span class="line"><span>    --with-zlib \\</span></span>
<span class="line"><span>    --with-bz2 \\</span></span>
<span class="line"><span>    --with-curl \\</span></span>
<span class="line"><span>    --enable-bcmath \\</span></span>
<span class="line"><span>    --enable-gd \\</span></span>
<span class="line"><span>    --with-webp \\</span></span>
<span class="line"><span>    --with-jpeg \\</span></span>
<span class="line"><span>    --with-mhash \\</span></span>
<span class="line"><span>    --enable-mbstring \\</span></span>
<span class="line"><span>    --with-imap-ssl \\</span></span>
<span class="line"><span>    --with-mysqli \\</span></span>
<span class="line"><span>    --enable-exif \\</span></span>
<span class="line"><span>    --with-ffi \\</span></span>
<span class="line"><span>    --with-zip \\</span></span>
<span class="line"><span>    --enable-sockets \\</span></span>
<span class="line"><span>    --with-pcre-jit \\</span></span>
<span class="line"><span>    --enable-fpm \\</span></span>
<span class="line"><span>    --with-pdo-mysql \\</span></span>
<span class="line"><span>    --enable-pcntl</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    make &amp;&amp; make install</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-安装phpredis扩展" tabindex="-1"><a class="header-anchor" href="#_6-安装phpredis扩展"><span>6.安装phpredis扩展</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cd /data/software/php8.3</span></span>
<span class="line"><span>	wget  http://js.funet8.com/centos_software/php8/phpredis-6.0.2.tar.gz</span></span>
<span class="line"><span>	tar xzf phpredis-6.0.2.tar.gz</span></span>
<span class="line"><span>	cd /data/software/php8.3/phpredis-6.0.2</span></span>
<span class="line"><span>	/data/app/php8.3/bin/phpize</span></span>
<span class="line"><span>	./configure --with-php-config=/data/app/php8.3/bin/php-config</span></span>
<span class="line"><span>	make &amp;&amp; make install</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-安装swoole扩展" tabindex="-1"><a class="header-anchor" href="#_7-安装swoole扩展"><span>7.安装swoole扩展</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cd /data/software/php8.3</span></span>
<span class="line"><span>	wget  http://js.funet8.com/centos_software/php8/swoole-src-5.1.2.tar.gz</span></span>
<span class="line"><span>	tar -zxf swoole-src-5.1.2.tar.gz</span></span>
<span class="line"><span>	cd /data/software/php8.3/swoole-src-5.1.2</span></span>
<span class="line"><span>	/data/app/php8.3/bin/phpize</span></span>
<span class="line"><span>	./configure --with-php-config=/data/app/php8.3/bin/php-config</span></span>
<span class="line"><span>	make &amp;&amp; make install</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-安装rabbitmq扩展" tabindex="-1"><a class="header-anchor" href="#_8-安装rabbitmq扩展"><span>8.安装rabbitmq扩展</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cd /data/software/php8.3</span></span>
<span class="line"><span>wget -c http://js.funet8.com/centos_software/rabbitmq-php/rabbitmq-c-0.8.0.tar.gz</span></span>
<span class="line"><span>tar zxf rabbitmq-c-0.8.0.tar.gz</span></span>
<span class="line"><span>		cd rabbitmq-c-0.8.0</span></span>
<span class="line"><span>		./configure --prefix=/usr/local/rabbitmq-c-0.8.0</span></span>
<span class="line"><span>		make &amp;&amp; make install</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-安装amqp扩展" tabindex="-1"><a class="header-anchor" href="#_9-安装amqp扩展"><span>9.安装amqp扩展</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cd /data/software/php8.3</span></span>
<span class="line"><span>		wget  http://js.funet8.com/centos_software/php8/amqp-2.1.2.tgz</span></span>
<span class="line"><span>		tar -zxf amqp-2.1.2.tgz</span></span>
<span class="line"><span>		cd /data/software/php8.3/amqp-2.1.2</span></span>
<span class="line"><span>		/data/app/php8.3/bin/phpize</span></span>
<span class="line"><span>		./configure --with-php-config=/data/app/php8.3/bin/php-config --with-amqp --with-librabbitmq-dir=/usr/local/rabbitmq-c-0.8.0</span></span>
<span class="line"><span>		make &amp;&amp; make install</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_10-配置php配置" tabindex="-1"><a class="header-anchor" href="#_10-配置php配置"><span>10.配置php配置</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cp /data/software/php-8.3.3/php.ini-production /data/app/php8.3/etc/php.ini</span></span>
<span class="line"><span>	cp /data/software/php-8.3.3/sapi/fpm/php-fpm.conf /data/app/php8.3/etc/php-fpm.conf</span></span>
<span class="line"><span>	cp /data/app/php8.3/etc/php-fpm.d/www.conf.default /data/app/php8.3/etc/php-fpm.d/www.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 修改 PHP-FPM 配置</span></span>
<span class="line"><span>    sed -i &quot;s|^listen = 127.0.0.1:9000|listen = 127.0.0.1:8300|&quot; &quot;/data/app/php8.3/etc/php-fpm.d/www.conf&quot;</span></span>
<span class="line"><span>    sed -i &quot;s|^;listen.allowed_clients|listen.allowed_clients|&quot; &quot;/data/app/php8.3/etc/php-fpm.d/www.conf&quot;</span></span>
<span class="line"><span>    sed -i &quot;s|^;pid = run/php-fpm.pid|pid = run/php-fpm.pid|&quot; &quot;/data/app/php8.3/etc/php-fpm.conf&quot;</span></span>
<span class="line"><span>    # 修改php进程数</span></span>
<span class="line"><span>	sed -i &quot;s/pm\\.max\\_children \\= 5/pm\\.max\\_children \\= 20/g&quot; /data/app/php8.3/etc/php-fpm.d/www.conf</span></span>
<span class="line"><span>    # 修改 request_terminate_timeout = 30 （请求终止超时）</span></span>
<span class="line"><span>	sed -i &quot;s/\\;request\\_terminate\\_timeout \\= 0/request\\_terminate\\_timeout \\= 30/g&quot; /data/app/php8.3/etc/php-fpm.d/www.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 修改 PHP.ini 配置</span></span>
<span class="line"><span>    sed -i &quot;s|^;date.timezone =|date.timezone = Asia/Shanghai|&quot; &quot;/data/app/php8.3/etc/php.ini&quot;</span></span>
<span class="line"><span>    sed -i &quot;s|^memory_limit = 128M|memory_limit = 256M|&quot; &quot;/data/app/php8.3/etc/php.ini&quot;</span></span>
<span class="line"><span>    sed -i &quot;s|^;cgi.fix_pathinfo=1|cgi.fix_pathinfo=0|&quot; &quot;/data/app/php8.3/etc/php.ini&quot;</span></span>
<span class="line"><span>    sed -i &quot;s|^upload_max_filesize = 2M|upload_max_filesize = 32M|&quot; &quot;/data/app/php8.3/etc/php.ini&quot;</span></span>
<span class="line"><span>    sed -i &quot;s|^post_max_size = 8M|post_max_size = 32M|&quot; &quot;/data/app/php8.3/etc/php.ini&quot;</span></span>
<span class="line"><span>    #sed -i &quot;s|^max_execution_time = 30|max_execution_time = 300|&quot; &quot;/data/app/php8.3/etc/php.ini&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #添加扩展</span></span>
<span class="line"><span>	echo &#39;extension=redis.so&#39;&gt;&gt; /data/app/php8.3/etc/php.ini</span></span>
<span class="line"><span>	#echo &#39;extension=zip.so&#39;&gt;&gt; /data/app/php8.3/etc/php.ini</span></span>
<span class="line"><span>	echo &#39;extension=swoole.so&#39;&gt;&gt; /data/app/php8.3/etc/php.ini</span></span>
<span class="line"><span>	echo &#39;extension=amqp.so&#39;&gt;&gt; /data/app/php8.3/etc/php.ini</span></span>
<span class="line"><span>	# 显示扩展</span></span>
<span class="line"><span>	/data/app/php8.3/bin/php -m|grep redis</span></span>
<span class="line"><span>	/data/app/php8.3/bin/php -m|grep zip</span></span>
<span class="line"><span>	/data/app/php8.3/bin/php -m|grep swoole</span></span>
<span class="line"><span>	/data/app/php8.3/bin/php -m|grep amqp</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_11-配置环境变量" tabindex="-1"><a class="header-anchor" href="#_11-配置环境变量"><span>11.配置环境变量</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cp -a /data/app/php8.3/bin/php /data/app/php8.3/bin/php8.3</span></span>
<span class="line"><span>	echo &quot;export PATH=$PATH:/data/app/php8.3/bin&quot;&gt;&gt;/etc/profile</span></span>
<span class="line"><span>	source /etc/profile</span></span>
<span class="line"><span>	php8.3 -v</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_12-开机启动脚本配置" tabindex="-1"><a class="header-anchor" href="#_12-开机启动脚本配置"><span>12.开机启动脚本配置</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cat &gt; /etc/systemd/system/php8.3-fpm.service &lt;&lt; EOF</span></span>
<span class="line"><span>[Unit]</span></span>
<span class="line"><span>Description=PHP 8.3 FastCGI Process Manager</span></span>
<span class="line"><span>After=network.target</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Service]</span></span>
<span class="line"><span>Type=simple</span></span>
<span class="line"><span>PIDFile=/data/app/php8.3/var/run/php-fpm.pid</span></span>
<span class="line"><span>ExecStart=/data/app/php8.3/sbin/php-fpm --nodaemonize --fpm-config /data/app/php8.3/etc/php-fpm.conf</span></span>
<span class="line"><span>ExecReload=/bin/kill -USR2 \\$MAINPID</span></span>
<span class="line"><span>ExecStop=/bin/kill -SIGINT \\$MAINPID</span></span>
<span class="line"><span>PrivateTmp=true</span></span>
<span class="line"><span>RestartSec=5s</span></span>
<span class="line"><span>Restart=on-failure</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Install]</span></span>
<span class="line"><span>WantedBy=multi-user.target</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span>systemctl daemon-reload</span></span>
<span class="line"><span>systemctl enable php8.3-fpm.service</span></span>
<span class="line"><span>systemctl start php8.3-fpm.service</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_13-配置防火墙" tabindex="-1"><a class="header-anchor" href="#_13-配置防火墙"><span>13.配置防火墙</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>    firewall-cmd --zone=public --add-port=8300/tcp --permanent</span></span>
<span class="line"><span>    firewall-cmd --reload</span></span>
<span class="line"><span>    firewall-cmd --zone=public --list-ports</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="最后" tabindex="-1"><a class="header-anchor" href="#最后"><span>最后</span></a></h1><p>折腾了这么久，可能有同学会问：“yum install php不香吗？”星哥想说，源码编译的“爽”在于“掌控感”——你可以精确控制PHP的每一个功能，启用最新特性，甚至针对服务器硬件优化编译参数。当然，代价是需要手动处理依赖和升级，但对于追求极致性能和定制化的场景（如生产环境、高性能API服务）</p><p>写文不易，如果你都看到了这里，请点个赞和在看，分享给更多的朋友；也别忘了关注星哥玩云！这里有满满的干货分享，还有轻松有趣的技术交流～点个赞、分享给身边的小伙伴，一起成长，一起玩转技术世界吧！ 😊</p>`,48)]))}const r=a(p,[["render",l]]),h=JSON.parse('{"path":"/Rocky-Linux/8.Rocky-Linux-9-%E6%BA%90%E7%A0%81%E5%8C%85%E5%AE%89%E8%A3%85php8.html","title":"Rocky Linux 9 源码包安装php8","lang":"en-US","frontmatter":{},"git":{"createdTime":1752822279000,"updatedTime":1752822279000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}]},"readingTime":{"minutes":3.58,"words":1073},"filePathRelative":"Rocky-Linux/8.Rocky-Linux-9-源码包安装php8.md"}');export{r as comp,h as data};
