import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as i,o as e}from"./app-w0bMFjFL.js";const p={};function l(t,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h1 id="rocky-linux-9-源码包安装php7" tabindex="-1"><a class="header-anchor" href="#rocky-linux-9-源码包安装php7"><span>Rocky Linux 9 源码包安装php7</span></a></h1><p>大家好！我是星哥。尽管现在 PHP 版本已迭代至 8.x，但有时为了兼容遗留系统或特定应用需求，我们仍需部署特定版本的 PHP。最主要的是之前的项目采用的PHP7.3，未来兼容旧的项目， 今天，星哥将手把手带大家在 Rocky Linux 9 环境下，从源码编译安装 PHP 7.3.7。</p><p>你可能会问，为何不直接使用 dnf 或 yum 安装呢？原因有三：</p><ol><li><strong>版本精确控制</strong>： 仓库中通常提供的是最新或LTS版本，而源码编译能让你安装到任何你需要的精确版本，例如本次的 PHP 7.3.7。</li><li><strong>性能优化</strong>： 编译时可以根据你的硬件和特定需求，开启或关闭特定的扩展和优化选项，从而获得更优的性能。</li><li>环境纯净： 避免了包管理器可能带来的不必要的依赖包，保持系统环境的精简。</li></ol><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1752746767671.png?tx" alt="img"></p><h1 id="快速安装" tabindex="-1"><a class="header-anchor" href="#快速安装"><span>快速安装</span></a></h1><p>Rocky Linux 9系统中源码包安装php7.3 phpfpm，shell脚本</p><p>安装目录为：/data/app/php7.3 、用户为 www 、端口自定义为 7300 。</p><p>安装扩展</p><p>需要安装：</p><p>openssl</p><p>phpredis</p><p>pcntl</p><p>amqp</p><p>rabbitmq</p><p>swoole</p><p>开机启动配置文件： /etc/systemd/system/php7.3-fpm.service</p><p>启动命令： systemctl start php7.3-fpm.service</p><p>停止命令： systemctl stop php7.3-fpm.service</p><p>重启命令： systemctl restart php7.3-fpm.service</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 使用：</span></span>
<span class="line"><span># gitee:</span></span>
<span class="line"><span># wget https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/Rocky_Linux_9_Install_PHP7_3_PHPFPM.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_PHP7_3_PHPFPM.sh</span></span>
<span class="line"><span># github:</span></span>
<span class="line"><span># wget https://raw.githubusercontent.com/funet8/Rocky-Linux-Shell/refs/heads/main/shell/Rocky_Linux_9_Install_PHP7_3_PHPFPM.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_Install_PHP7_3_PHPFPM.sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-新建用户和用户组" tabindex="-1"><a class="header-anchor" href="#_1-新建用户和用户组"><span>1.新建用户和用户组</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>groupadd $USER</span></span>
<span class="line"><span>useradd -g $USER $USER</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-安装编译-php-依赖包" tabindex="-1"><a class="header-anchor" href="#_2-安装编译-php-依赖包"><span>2.安装编译 PHP 依赖包</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 清理缓存并更新软件包列表</span></span>
<span class="line"><span>	dnf clean all</span></span>
<span class="line"><span>	dnf makecache</span></span>
<span class="line"><span>	dnf groupinstall &quot;Development Tools&quot; -y</span></span>
<span class="line"><span>	dnf install -y wget gcc gcc-c++ make \\</span></span>
<span class="line"><span>		autoconf automake libtool \\</span></span>
<span class="line"><span>		bison re2c \\</span></span>
<span class="line"><span>		libxml2-devel \\</span></span>
<span class="line"><span>		sqlite-devel \\</span></span>
<span class="line"><span>		bzip2-devel \\</span></span>
<span class="line"><span>		libcurl-devel curl-devel \\</span></span>
<span class="line"><span>		libffi-devel \\</span></span>
<span class="line"><span>		libpng-devel \\</span></span>
<span class="line"><span>		libwebp-devel \\</span></span>
<span class="line"><span>		libjpeg-devel \\</span></span>
<span class="line"><span>		oniguruma \\</span></span>
<span class="line"><span>		libzip \\</span></span>
<span class="line"><span>		libicu-devel \\</span></span>
<span class="line"><span>		openssl-devel \\</span></span>
<span class="line"><span>		libuuid-devel \\</span></span>
<span class="line"><span>		systemd-devel \\</span></span>
<span class="line"><span>		libxslt-devel \\</span></span>
<span class="line"><span>		readline-devel</span></span>
<span class="line"><span>	dnf install -y perl perl-core perl-FindBin</span></span>
<span class="line"><span>	dnf install -y c-ares-devel</span></span>
<span class="line"><span>	dnf install -y compat-openssl11</span></span>
<span class="line"><span>	dnf install -y freetype-devel</span></span>
<span class="line"><span>	dnf install -y gmp-devel</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>	wget http://js.funet8.com/rocky-linux/php/oniguruma-devel-6.9.6-1.el9.6.x86_64.rpm</span></span>
<span class="line"><span>	dnf -y install oniguruma-devel-6.9.6-1.el9.6.x86_64.rpm</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	#wget https://dl.rockylinux.org/pub/rocky/9/devel/x86_64/os/Packages/l/libzip-devel-1.7.3-8.el9.x86_64.rpm</span></span>
<span class="line"><span>	wget http://js.funet8.com/rocky-linux/php/libzip-devel-1.7.3-8.el9.x86_64.rpm</span></span>
<span class="line"><span>	dnf -y install libzip-devel-1.7.3-8.el9.x86_64.rpm</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-安装低版本的openssl" tabindex="-1"><a class="header-anchor" href="#_3-安装低版本的openssl"><span>3.安装低版本的openssl</span></a></h2><p>这一块采坑了很久</p><p>在 Rocky Linux 9 上安装 OpenSSL 1.1.x（用于编译 PHP 7.3.x）是可行的，不会影响系统自带的 OpenSSL 3.x，只需将其安装到指定路径并在 PHP 编译时引用。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cd /usr/local/src</span></span>
<span class="line"><span>	wget http://js.funet8.com/rocky-linux/php/openssl-1.1.1u.tar.gz</span></span>
<span class="line"><span>	tar -zxf openssl-1.1.1u.tar.gz</span></span>
<span class="line"><span>	cd openssl-1.1.1u</span></span>
<span class="line"><span>	./config --prefix=/usr/local/openssl-1.1.1 --openssldir=/usr/local/openssl-1.1.1 shared zlib</span></span>
<span class="line"><span>	make -j$(nproc)</span></span>
<span class="line"><span>	make install</span></span>
<span class="line"><span>	export LD_LIBRARY_PATH=/usr/local/openssl-1.1.1/lib:$LD_LIBRARY_PATH</span></span>
<span class="line"><span>	# 验证</span></span>
<span class="line"><span>	/usr/local/openssl-1.1.1/bin/openssl version</span></span>
<span class="line"><span>	# 系统永久生效</span></span>
<span class="line"><span>	echo &#39;export LD_LIBRARY_PATH=/usr/local/openssl-1.1.1/lib:$LD_LIBRARY_PATH&#39; &gt; /etc/profile.d/openssl1.1.sh</span></span>
<span class="line"><span>	chmod +x /etc/profile.d/openssl1.1.sh</span></span>
<span class="line"><span>	source /etc/profile.d/openssl1.1.sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-编译安装php7-3" tabindex="-1"><a class="header-anchor" href="#_4-编译安装php7-3"><span>4.编译安装php7.3</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>mkdir -p /data/app/php7.3</span></span>
<span class="line"><span>mkdir -p /data/software/php7.3 &amp;&amp; cd /data/software/php7.3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cd /data/software/php7.3</span></span>
<span class="line"><span>		# wget https://www.php.net/distributions/php-7.3.7.tar.gz</span></span>
<span class="line"><span>		wget http://js.funet8.com/rocky-linux/php/php-7.3.7.tar.gz</span></span>
<span class="line"><span>		tar -zxf php-7.3.7.tar.gz</span></span>
<span class="line"><span>		cd php-7.3.7</span></span>
<span class="line"><span>		export PKG_CONFIG_PATH=/usr/local/openssl-1.1.1/lib/pkgconfig</span></span>
<span class="line"><span>		export CFLAGS=&quot;-I/usr/local/openssl-1.1.1/include&quot;</span></span>
<span class="line"><span>		export LDFLAGS=&quot;-L/usr/local/openssl-1.1.1/lib&quot;		</span></span>
<span class="line"><span>		</span></span>
<span class="line"><span>		./configure \\</span></span>
<span class="line"><span>		--prefix=/data/app/php7.3 \\</span></span>
<span class="line"><span>		--with-config-file-path=/data/app/php7.3/etc \\</span></span>
<span class="line"><span>		--with-fpm-user=www \\</span></span>
<span class="line"><span>		--with-fpm-group=www \\</span></span>
<span class="line"><span>		--enable-fpm \\</span></span>
<span class="line"><span>		--enable-inline-optimization \\</span></span>
<span class="line"><span>		--disable-debug \\</span></span>
<span class="line"><span>		--disable-rpath \\</span></span>
<span class="line"><span>		--enable-shared \\</span></span>
<span class="line"><span>		--enable-soap \\</span></span>
<span class="line"><span>		--with-libxml-dir \\</span></span>
<span class="line"><span>		--with-xmlrpc \\</span></span>
<span class="line"><span>		--with-openssl=/usr/local/openssl-1.1.1 \\</span></span>
<span class="line"><span>		--with-openssl-dir \\</span></span>
<span class="line"><span>		--with-mhash \\</span></span>
<span class="line"><span>		--with-pcre-regex \\</span></span>
<span class="line"><span>		--with-sqlite3 \\</span></span>
<span class="line"><span>		--with-zlib \\</span></span>
<span class="line"><span>		--enable-bcmath \\</span></span>
<span class="line"><span>		--with-iconv \\</span></span>
<span class="line"><span>		--with-bz2 \\</span></span>
<span class="line"><span>		--enable-calendar \\</span></span>
<span class="line"><span>		--with-curl \\</span></span>
<span class="line"><span>		--with-cdb \\</span></span>
<span class="line"><span>		--enable-dom \\</span></span>
<span class="line"><span>		--enable-exif \\</span></span>
<span class="line"><span>		--enable-fileinfo \\</span></span>
<span class="line"><span>		--enable-filter \\</span></span>
<span class="line"><span>		--with-pcre-dir \\</span></span>
<span class="line"><span>		--enable-ftp \\</span></span>
<span class="line"><span>		--with-gd \\</span></span>
<span class="line"><span>		--with-jpeg-dir \\</span></span>
<span class="line"><span>		--with-png-dir \\</span></span>
<span class="line"><span>		--with-zlib-dir \\</span></span>
<span class="line"><span>		--with-freetype-dir \\</span></span>
<span class="line"><span>		--enable-gd-jis-conv \\</span></span>
<span class="line"><span>		--with-gettext \\</span></span>
<span class="line"><span>		--with-gmp \\</span></span>
<span class="line"><span>		--with-mhash \\</span></span>
<span class="line"><span>		--enable-json \\</span></span>
<span class="line"><span>		--enable-mbstring \\</span></span>
<span class="line"><span>		--enable-mbregex \\</span></span>
<span class="line"><span>		--enable-mbregex-backtrack \\</span></span>
<span class="line"><span>		--with-onig \\</span></span>
<span class="line"><span>		--enable-pdo \\</span></span>
<span class="line"><span>		--with-mysqli=mysqlnd \\</span></span>
<span class="line"><span>		--with-pdo-mysql=mysqlnd \\</span></span>
<span class="line"><span>		--with-zlib-dir \\</span></span>
<span class="line"><span>		--with-pdo-sqlite \\</span></span>
<span class="line"><span>		--with-readline \\</span></span>
<span class="line"><span>		--enable-session \\</span></span>
<span class="line"><span>		--enable-shmop \\</span></span>
<span class="line"><span>		--enable-simplexml \\</span></span>
<span class="line"><span>		--enable-sockets \\</span></span>
<span class="line"><span>		--enable-sysvmsg \\</span></span>
<span class="line"><span>		--enable-sysvsem \\</span></span>
<span class="line"><span>		--enable-sysvshm \\</span></span>
<span class="line"><span>		--enable-wddx \\</span></span>
<span class="line"><span>		--with-libxml-dir \\</span></span>
<span class="line"><span>		--with-xsl \\</span></span>
<span class="line"><span>		--enable-zip \\</span></span>
<span class="line"><span>		--enable-mysqlnd-compression-support \\</span></span>
<span class="line"><span>		--with-pear \\</span></span>
<span class="line"><span>		--enable-opcache</span></span>
<span class="line"><span></span></span>
<span class="line"><span>make &amp;&amp; make install</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-配置环境变量" tabindex="-1"><a class="header-anchor" href="#_5-配置环境变量"><span>5.配置环境变量</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>	cp -a /data/app/php7.3/bin/php /data/app/php7.3/bin/php7.3</span></span>
<span class="line"><span>	echo &quot;export PATH=$PATH:/data/app/php7.3/bin&quot;&gt;&gt;/etc/profile	</span></span>
<span class="line"><span>	source /etc/profile</span></span>
<span class="line"><span>	php7.3 -v</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-修改php7-3配置文件" tabindex="-1"><a class="header-anchor" href="#_6-修改php7-3配置文件"><span>6.修改php7.3配置文件</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cp /data/software/php7.3/php-7.3.7/php.ini-production /data/app/php7.3/etc/php.ini</span></span>
<span class="line"><span>	cp /data/software/php7.3/php-7.3.7/sapi/fpm/php-fpm.conf /data/app/php7.3/etc/php-fpm.conf</span></span>
<span class="line"><span>	cp /data/app/php7.3/etc/php-fpm.d/www.conf.default /data/app/php7.3/etc/php-fpm.d/www.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	# 修改 PHP-FPM 配置</span></span>
<span class="line"><span>    sed -i &quot;s|^listen = 127.0.0.1:9000|listen = 127.0.0.1:7300|&quot; &quot;/data/app/php7.3/etc/php-fpm.d/www.conf&quot;</span></span>
<span class="line"><span>    sed -i &quot;s|^;listen.allowed_clients|listen.allowed_clients|&quot; &quot;/data/app/php7.3/etc/php-fpm.d/www.conf&quot;</span></span>
<span class="line"><span>    sed -i &quot;s|^;pid = run/php-fpm.pid|pid = run/php-fpm.pid|&quot; &quot;/data/app/php7.3/etc/php-fpm.conf&quot;</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>    # 修改php进程数</span></span>
<span class="line"><span>	sed -i &quot;s/pm\\.max\\_children \\= 5/pm\\.max\\_children \\= 20/g&quot; &quot;/data/app/php7.3/etc/php-fpm.d/www.conf&quot;</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>    # 修改 request_terminate_timeout = 30 （请求终止超时）</span></span>
<span class="line"><span>	sed -i &quot;s/\\;request\\_terminate\\_timeout \\= 0/request\\_terminate\\_timeout \\= 30/g&quot; &quot;/data/app/php7.3/etc/php-fpm.d/www.conf&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 修改 PHP.ini 配置</span></span>
<span class="line"><span>    sed -i &quot;s|^;date.timezone =|date.timezone = Asia/Shanghai|&quot; &quot;/data/app/php7.3/etc/php.ini&quot;</span></span>
<span class="line"><span>    sed -i &quot;s|^memory_limit = 128M|memory_limit = 256M|&quot; &quot;/data/app/php7.3/etc/php.ini&quot;</span></span>
<span class="line"><span>    sed -i &quot;s|^;cgi.fix_pathinfo=1|cgi.fix_pathinfo=0|&quot; &quot;/data/app/php7.3/etc/php.ini&quot;</span></span>
<span class="line"><span>    sed -i &quot;s|^upload_max_filesize = 2M|upload_max_filesize = 32M|&quot; &quot;/data/app/php7.3/etc/php.ini&quot;</span></span>
<span class="line"><span>    sed -i &quot;s|^post_max_size = 8M|post_max_size = 32M|&quot; &quot;/data/app/php7.3/etc/php.ini&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-安装php扩展" tabindex="-1"><a class="header-anchor" href="#_7-安装php扩展"><span>7.安装php扩展</span></a></h2><h3 id="安装phpredis扩展" tabindex="-1"><a class="header-anchor" href="#安装phpredis扩展"><span>安装phpredis扩展</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cd /data/software/php7.3</span></span>
<span class="line"><span>	wget http://js.funet8.com/rocky-linux/php/phpredis.tar.gz</span></span>
<span class="line"><span>	tar -zxvf phpredis.tar.gz</span></span>
<span class="line"><span>	cd phpredis</span></span>
<span class="line"><span>	/data/app/php7.3/bin/phpize</span></span>
<span class="line"><span>	./configure --with-php-config=/data/app/php7.3/bin/php-config</span></span>
<span class="line"><span>	make &amp;&amp; make install</span></span>
<span class="line"><span>	echo &quot;extension=/data/app/php7.3/lib/php/extensions/no-debug-non-zts-20180731/redis.so&quot; &gt;&gt; /data/app/php7.3/etc/php.ini </span></span>
<span class="line"><span>	/data/app/php7.3/bin/php -m|grep redis</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装pcntl扩展" tabindex="-1"><a class="header-anchor" href="#安装pcntl扩展"><span>安装pcntl扩展</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cd /data/software/php7.3/php-7.3.7/ext/pcntl</span></span>
<span class="line"><span>	/data/app/php7.3/bin/phpize</span></span>
<span class="line"><span>	./configure --with-php-config=/data/app/php7.3/bin/php-config</span></span>
<span class="line"><span>	make &amp;&amp; make install</span></span>
<span class="line"><span>	echo &quot;extension=/data/app/php7.3/lib/php/extensions/no-debug-non-zts-20180731/pcntl.so&quot; &gt;&gt; /data/app/php7.3/etc/php.ini </span></span>
<span class="line"><span>	/data/app/php7.3/bin/php -m|grep pcntl</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装-rabbitmq" tabindex="-1"><a class="header-anchor" href="#安装-rabbitmq"><span>安装 rabbitmq</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cd /data/software/php7.3</span></span>
<span class="line"><span>	# wget -c https://github.com/alanxz/rabbitmq-c/releases/download/v0.8.0/rabbitmq-c-0.8.0.tar.gz</span></span>
<span class="line"><span>	wget -c http://js.funet8.com/centos_software/rabbitmq-php/rabbitmq-c-0.8.0.tar.gz</span></span>
<span class="line"><span>	tar zxf rabbitmq-c-0.8.0.tar.gz</span></span>
<span class="line"><span>	cd rabbitmq-c-0.8.0</span></span>
<span class="line"><span>	./configure --prefix=/usr/local/rabbitmq-c-0.8.0-b</span></span>
<span class="line"><span>	make &amp;&amp; make install</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装-amqp-1-11-0-扩展" tabindex="-1"><a class="header-anchor" href="#安装-amqp-1-11-0-扩展"><span>安装 amqp-1.11.0 扩展</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cd /data/software/php7.3</span></span>
<span class="line"><span>	#wget -c http://pecl.php.net/get/amqp-1.11.0.tgz</span></span>
<span class="line"><span>	wget -c http://js.funet8.com/centos_software/rabbitmq-php/amqp-1.11.0.tgz</span></span>
<span class="line"><span>	tar -zxvf amqp-1.11.0.tgz </span></span>
<span class="line"><span>	cd  amqp-1.11.0</span></span>
<span class="line"><span>	/data/app/php7.3/bin/phpize</span></span>
<span class="line"><span>	./configure --with-php-config=/data/app/php7.3/bin/php-config --with-amqp --with-librabbitmq-dir=/usr/local/rabbitmq-c-0.8.0-b</span></span>
<span class="line"><span>	make &amp;&amp; make install</span></span>
<span class="line"><span>	echo &#39;[amqp]&#39;&gt;&gt; /data/app/php7.3/etc/php.ini </span></span>
<span class="line"><span>	echo &quot;extension=/data/app/php7.3/lib/php/extensions/no-debug-non-zts-20180731/amqp.so&quot; &gt;&gt; /data/app/php7.3/etc/php.ini </span></span>
<span class="line"><span>	/data/app/php7.3/bin/php -m|grep amqp</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装-swoole-扩展" tabindex="-1"><a class="header-anchor" href="#安装-swoole-扩展"><span>安装 swoole 扩展</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>dnf install -y c-ares-devel</span></span>
<span class="line"><span>	cd /data/software/php7.3</span></span>
<span class="line"><span>	wget http://js.funet8.com/centos_software/swoole-src-4.8.13.tar.gz</span></span>
<span class="line"><span>	tar -zxvf swoole-src-4.8.13.tar.gz</span></span>
<span class="line"><span>	cd swoole-src-4.8.13</span></span>
<span class="line"><span>	/data/app/php7.3/bin/phpize</span></span>
<span class="line"><span>	./configure --enable-openssl --enable-sockets --enable-mysqlnd --enable-swoole-curl --enable-cares  --with-php-config=/data/app/php7.3/bin/php-config</span></span>
<span class="line"><span>	make &amp;&amp; make install</span></span>
<span class="line"><span>	echo &quot;extension=/data/app/php7.3/lib/php/extensions/no-debug-non-zts-20180731/swoole.so&quot; &gt;&gt; /data/app/php7.3/etc/php.ini </span></span>
<span class="line"><span>	echo &#39;swoole.use_shortname = off&#39; &gt;&gt; /data/app/php7.3/etc/php.ini </span></span>
<span class="line"><span>	/data/app/php7.3/bin/php -m|grep swoole</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-创建开机启动脚本" tabindex="-1"><a class="header-anchor" href="#_8-创建开机启动脚本"><span>8.创建开机启动脚本</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cat &gt; /etc/systemd/system/php7.3-fpm.service &lt;&lt; EOF</span></span>
<span class="line"><span>[Unit]</span></span>
<span class="line"><span>Description=PHP 7.3 FastCGI Process Manager</span></span>
<span class="line"><span>After=network.target</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Service]</span></span>
<span class="line"><span>Type=simple</span></span>
<span class="line"><span>PIDFile=/data/app/php7.3/var/run/php-fpm.pid</span></span>
<span class="line"><span>ExecStart=/data/app/php7.3/sbin/php-fpm --nodaemonize --fpm-config /data/app/php7.3/etc/php-fpm.conf</span></span>
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
<span class="line"><span>systemctl enable php7.3-fpm.service</span></span>
<span class="line"><span>systemctl start php7.3-fpm.service</span></span>
<span class="line"><span>echo &quot;systemctl restart php7.3-fpm.service&quot; &gt; /root/restart_php7.3.sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-配置防火墙" tabindex="-1"><a class="header-anchor" href="#_9-配置防火墙"><span>9.配置防火墙</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>firewall-cmd --zone=public --add-port=7300/tcp --permanent</span></span>
<span class="line"><span>    firewall-cmd --reload</span></span>
<span class="line"><span>    firewall-cmd --zone=public --list-ports</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此Rocky Linux 9 源码包安装php7完成。</p><h1 id="最后" tabindex="-1"><a class="header-anchor" href="#最后"><span>最后</span></a></h1><p>希望本篇教程对你有所帮助。如果你在操作过程中遇到任何问题，欢迎在评论区留言交流。我是星哥，我们下期见！</p><p>写文不易，如果你都看到了这里，请点个赞和在看，分享给更多的朋友；也别忘了关注星哥玩云！这里有满满的干货分享，还有轻松有趣的技术交流～点个赞、分享给身边的小伙伴，一起成长，一起玩转技术世界吧！ 😊</p>`,54)]))}const r=n(p,[["render",l]]),v=JSON.parse('{"path":"/Rocky-Linux/9.Rocky-Linux-9-%E6%BA%90%E7%A0%81%E5%8C%85%E5%AE%89%E8%A3%85php7.html","title":"Rocky Linux 9 源码包安装php7","lang":"en-US","frontmatter":{},"git":{"createdTime":1752822279000,"updatedTime":1752822279000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}]},"readingTime":{"minutes":4.95,"words":1484},"filePathRelative":"Rocky-Linux/9.Rocky-Linux-9-源码包安装php7.md"}');export{r as comp,v as data};
