import{_ as s,c as a,b as e,o as i}from"./app-BEL8OELx.js";const l={};function p(t,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h1 id="nginx从入门到放弃02-nginx基本命令和新建web站点" tabindex="-1"><a class="header-anchor" href="#nginx从入门到放弃02-nginx基本命令和新建web站点"><span>Nginx从入门到放弃02-Nginx基本命令和新建WEB站点</span></a></h1><p>通过上一篇文章我们知道了的一些基础知识还有在centos7上安装nginx，yum源或者通过编译，但是通过两种方式安装后的nginx的目录结构略有不同，默认提供的资源与配置略有不同，我们暂且先以编译安装的方式进行介绍。</p><p>笔者把自己总结的文档分为几遍，合集在 https://g.xgss.net/nginx/</p><p><img src="https://imgoss.xgss.net/picgo/nginx-webapp.webp.jpg?aliyun" alt="nginx-webapp.webp"></p><h2 id="一、nginx的常用命令" tabindex="-1"><a class="header-anchor" href="#一、nginx的常用命令"><span>一、Nginx的常用命令</span></a></h2><p>查看nginx编译过后的目录结构：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># ll /data/nginx</span></span>
<span class="line">total <span class="token number">0</span></span>
<span class="line">drwx------ <span class="token number">2</span> nobody root   <span class="token number">6</span> Jun <span class="token number">23</span> <span class="token number">11</span>:16 client_body_temp</span>
<span class="line">drwxr-xr-x <span class="token number">2</span> root   root <span class="token number">333</span> Jun <span class="token number">23</span> <span class="token number">13</span>:20 conf    <span class="token comment"># 存放了nginx相关的配置文件</span></span>
<span class="line">drwx------ <span class="token number">2</span> nobody root   <span class="token number">6</span> Jun <span class="token number">23</span> <span class="token number">11</span>:16 fastcgi_temp</span>
<span class="line">drwxr-xr-x <span class="token number">2</span> root   root  <span class="token number">40</span> Jun <span class="token number">23</span> <span class="token number">11</span>:15 html    <span class="token comment"># 默认提供的web服务的”根目录”</span></span>
<span class="line">drwxr-xr-x <span class="token number">2</span> root   root  <span class="token number">58</span> Jun <span class="token number">23</span> <span class="token number">13</span>:31 logs    <span class="token comment"># logs目录是nginx日志的存放目录</span></span>
<span class="line">drwxr-xr-x <span class="token number">2</span> root   root <span class="token number">135</span> Jun <span class="token number">23</span> <span class="token number">11</span>:15 modules <span class="token comment"># 存放了一些模块会用到的库</span></span>
<span class="line">drwx------ <span class="token number">2</span> nobody root   <span class="token number">6</span> Jun <span class="token number">23</span> <span class="token number">11</span>:16 proxy_temp</span>
<span class="line">drwxr-xr-x <span class="token number">2</span> root   root  <span class="token number">19</span> Jun <span class="token number">23</span> <span class="token number">11</span>:15 sbin  <span class="token comment">#存放了nginx的二进制文件</span></span>
<span class="line">drwx------ <span class="token number">2</span> nobody root   <span class="token number">6</span> Jun <span class="token number">23</span> <span class="token number">11</span>:16 scgi_temp</span>
<span class="line">drwx------ <span class="token number">2</span> nobody root   <span class="token number">6</span> Jun <span class="token number">23</span> <span class="token number">11</span>:16 uwsgi_temp</span>
<span class="line"></span>
<span class="line">nginx path prefix: “/data/nginx”</span>
<span class="line">nginx binary file: “/data/nginx/sbin/nginx”</span>
<span class="line">nginx modules path: “/data/nginx/modules”</span>
<span class="line">nginx configuration prefix: “/data/nginx/conf”</span>
<span class="line">nginx configuration file: “/data/nginx/conf/nginx.conf”</span>
<span class="line">nginx pid file: “/data/nginx/logs/nginx.pid”</span>
<span class="line">nginx error log file: “/data/nginx/logs/error.log”</span>
<span class="line">nginx http access log file: “/data/nginx/logs/access.log”</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>常用命令</p><h3 id="_1-启动nginx" tabindex="-1"><a class="header-anchor" href="#_1-启动nginx"><span>1.启动nginx</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/data/nginx/sbin/nginx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_2-获取帮助" tabindex="-1"><a class="header-anchor" href="#_2-获取帮助"><span>2.获取帮助</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/data/nginx/sbin/nginx -h</span>
<span class="line">/data/nginx/sbin/nginx -?</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>例如：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># /data/nginx/sbin/nginx -?</span></span>
<span class="line">nginx version: nginx/1.22.0</span>
<span class="line">Usage: nginx <span class="token punctuation">[</span>-?hvVtTq<span class="token punctuation">]</span> <span class="token punctuation">[</span>-s signal<span class="token punctuation">]</span> <span class="token punctuation">[</span>-p prefix<span class="token punctuation">]</span></span>
<span class="line">             <span class="token punctuation">[</span>-e filename<span class="token punctuation">]</span> <span class="token punctuation">[</span>-c filename<span class="token punctuation">]</span> <span class="token punctuation">[</span>-g directives<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">Options:</span>
<span class="line">  -?,-h         <span class="token builtin class-name">:</span> this <span class="token builtin class-name">help</span></span>
<span class="line">  <span class="token parameter variable">-v</span>            <span class="token builtin class-name">:</span> show version and <span class="token builtin class-name">exit</span></span>
<span class="line">  <span class="token parameter variable">-V</span>            <span class="token builtin class-name">:</span> show version and configure options <span class="token keyword">then</span> <span class="token builtin class-name">exit</span></span>
<span class="line">  <span class="token parameter variable">-t</span>            <span class="token builtin class-name">:</span> <span class="token builtin class-name">test</span> configuration and <span class="token builtin class-name">exit</span></span>
<span class="line">  <span class="token parameter variable">-T</span>            <span class="token builtin class-name">:</span> <span class="token builtin class-name">test</span> configuration, dump it and <span class="token builtin class-name">exit</span></span>
<span class="line">  <span class="token parameter variable">-q</span>            <span class="token builtin class-name">:</span> suppress non-error messages during configuration testing</span>
<span class="line">  <span class="token parameter variable">-s</span> signal     <span class="token builtin class-name">:</span> send signal to a master process: stop, quit, reopen, reload</span>
<span class="line">  <span class="token parameter variable">-p</span> prefix     <span class="token builtin class-name">:</span> <span class="token builtin class-name">set</span> prefix path <span class="token punctuation">(</span>default: /data/nginx/<span class="token punctuation">)</span></span>
<span class="line">  <span class="token parameter variable">-e</span> filename   <span class="token builtin class-name">:</span> <span class="token builtin class-name">set</span> error log <span class="token function">file</span> <span class="token punctuation">(</span>default: logs/error.log<span class="token punctuation">)</span></span>
<span class="line">  <span class="token parameter variable">-c</span> filename   <span class="token builtin class-name">:</span> <span class="token builtin class-name">set</span> configuration <span class="token function">file</span> <span class="token punctuation">(</span>default: conf/nginx.conf<span class="token punctuation">)</span></span>
<span class="line">  <span class="token parameter variable">-g</span> directives <span class="token builtin class-name">:</span> <span class="token builtin class-name">set</span> global directives out of configuration <span class="token function">file</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-查看nginx版本" tabindex="-1"><a class="header-anchor" href="#_3-查看nginx版本"><span>3.查看nginx版本</span></a></h3><p>使用”-v”选项(小写v)可以查看nginx的版本信。</p><p>使用”-V”选项(大写V)可以查看当前nginx的编译信息。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/data/nginx/sbin/nginx -V</span>
<span class="line">/data/nginx/sbin/nginx -v</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>例如</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># /data/nginx/sbin/nginx -V</span>
<span class="line">nginx version: nginx/1.22.0</span>
<span class="line">built by gcc 4.8.5 20150623 (Red Hat 4.8.5-36) (GCC) </span>
<span class="line">built with OpenSSL 1.0.2k-fips  26 Jan 2017</span>
<span class="line">TLS SNI support enabled</span>
<span class="line">configure arguments: --prefix=/data/nginx --with-file-aio --with-http_auth_request_module --with-http_ssl_module --with-http_v2_module --with-http_realip_module --with-http_addition_module --with-http_xslt_module=dynamic --with-http_geoip_module=dynamic --with-http_sub_module --with-http_dav_module --with-http_flv_module --with-http_mp4_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_random_index_module --with-http_secure_link_module --with-http_degradation_module --with-http_slice_module --with-http_stub_status_module --with-http_perl_module=dynamic --with-pcre --with-pcre-jit --with-stream=dynamic --with-stream_ssl_module</span>
<span class="line">[root@node3 nginx]# /data/nginx/sbin/nginx -v</span>
<span class="line">nginx version: nginx/1.22.0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-检查配置文件是否错误" tabindex="-1"><a class="header-anchor" href="#_3-检查配置文件是否错误"><span>3.检查配置文件是否错误</span></a></h3><p>这个命令是非常有用的，在修改配置之后查看自己是否配置成功，如果有错误，而未修改重启nginx可能会出现nginx无法服务的问题。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># /data/nginx/sbin/nginx -t</span>
<span class="line">nginx: the configuration file /data/nginx/conf/nginx.conf syntax is ok</span>
<span class="line">nginx: configuration file /data/nginx/conf/nginx.conf test is successful</span>
<span class="line"></span>
<span class="line"># /data/nginx/sbin/nginx -T   测试配置,显示并退出</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-重载、关闭nginx" tabindex="-1"><a class="header-anchor" href="#_4-重载、关闭nginx"><span>4.重载、关闭nginx</span></a></h3><p>”-s”选项的作用就是向正在运行的nginx进程发送信号，信号的可用值有stop, quit, reopen, reload</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">/data/nginx/sbin/nginx <span class="token parameter variable">-s</span>  stop</span>
<span class="line">/data/nginx/sbin/nginx <span class="token parameter variable">-s</span>  reload</span>
<span class="line"></span>
<span class="line"><span class="token function">pkill</span> nginx <span class="token comment">#杀死nginx</span></span>
<span class="line">/data/nginx/sbin/nginx <span class="token parameter variable">-s</span> start <span class="token comment"># 错误的命令</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>”/data/nginx/sbin/nginx -s stop”命令表示向nginx进程发送stop信号， “-s reload”重载配置文件。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">quit信号：与stop信号的作用类似，quit信号作用也是用于停止nginx服务，quit信号和stop信号的区别在于，nignx进程收到stop信号以后会立即停止服务，而收到quit信号后，不会再接收新的请求，但是会先处理完已经接受的链接请求，处理完这些请求之后再停止服务，这种停止方式被称之为”优雅的停止”。</span>
<span class="line"></span>
<span class="line">reload信号：reload信号的作用就是在不停止服务的情况下重载配置文件，比如，nginx正在正常的提供服务，此时，管理员修改了nginx.conf文件中的配置指令，管理员希望新的配置立刻生效，但是又不希望重启nginx服务，此时就可以使用”nginx -s reload”命令重载配置文件，以便在不重启nginx的情况下载入新的配置，同时避免了因重启而造成的服务中断。</span>
<span class="line"></span>
<span class="line">reopen信号：利用reopen信号可以使nignx进程重新打开日志文件，以便实现日志分割的效果，关于日志切割的话题会单独总结一片文章，reopen信号也会在届时进行演示，此处不用纠结。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、nginx配置一个web站点" tabindex="-1"><a class="header-anchor" href="#二、nginx配置一个web站点"><span>二、Nginx配置一个WEB站点</span></a></h2><p>启动nginx之后，通过浏览器访问IP，我们可以访问默认的HTTP服务。</p><p>虚拟主机 就是把一台物理服务器划分成多个“虚拟”的服务器，每一个虚拟主机都可以有独立的域名和独立的目录，可以独立发布一个网站。</p><p><img src="https://imgoss.xgss.net/picgo/image-20220623150705802.png?aliyun" alt="image-20220623150705802"></p><p>默认的首页为 /data/nginx/html/index.html</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># ll /data/nginx/html/</span>
<span class="line">total 8</span>
<span class="line">-rw-r--r-- 1 root root 497 Jun 23 11:15 50x.html</span>
<span class="line">-rw-r--r-- 1 root root 615 Jun 23 11:15 index.html</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，nginx.conf文件中会有很多注释的行，我们把注释去掉</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># sed -i &#39;/^[[:space:]]*#/&#39;d conf/nginx.conf</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># cat  conf/nginx.conf</span></span>
<span class="line">worker_processes  <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">events <span class="token punctuation">{</span></span>
<span class="line">    worker_connections  <span class="token number">1024</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">http <span class="token punctuation">{</span></span>
<span class="line">    include       mime.types<span class="token punctuation">;</span></span>
<span class="line">    default_type  application/octet-stream<span class="token punctuation">;</span></span>
<span class="line">    sendfile        on<span class="token punctuation">;</span></span>
<span class="line">    keepalive_timeout  <span class="token number">65</span><span class="token punctuation">;</span></span>
<span class="line">    server <span class="token punctuation">{</span></span>
<span class="line">        listen       <span class="token number">80</span><span class="token punctuation">;</span></span>
<span class="line">        server_name  localhost<span class="token punctuation">;</span></span>
<span class="line">        location / <span class="token punctuation">{</span></span>
<span class="line">            root   html<span class="token punctuation">;</span></span>
<span class="line">            index  index.html index.htm<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        error_page   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html<span class="token punctuation">;</span></span>
<span class="line">        location <span class="token operator">=</span> /50x.html <span class="token punctuation">{</span></span>
<span class="line">            root   html<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先来说说最常用到的配置语法，示例如下：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">http <span class="token punctuation">{</span></span>
<span class="line">  </span>
<span class="line">  <span class="token punctuation">..</span>.</span>
<span class="line">  <span class="token punctuation">..</span>.</span>
<span class="line">  </span>
<span class="line">  server <span class="token punctuation">{</span></span>
<span class="line">    <span class="token punctuation">..</span>.</span>
<span class="line">    <span class="token punctuation">..</span>.</span>
<span class="line">    </span>
<span class="line">    location <span class="token punctuation">..</span>. <span class="token punctuation">{</span></span>
<span class="line">        <span class="token punctuation">..</span>.</span>
<span class="line">        <span class="token punctuation">..</span>.</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    </span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  server <span class="token punctuation">{</span></span>
<span class="line">    <span class="token punctuation">..</span>.</span>
<span class="line">    <span class="token punctuation">..</span>.</span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"> </span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上述语法配置示例可以看出，上述示例可以分为几个逻辑部分，<strong>http部分、server部分、location部分</strong>，每个”配置块”都是使用大括号”{ }”作为分界线的，而且，从缩进可以看出，它们是有层级关系的，http中可以配置多个server，一个server中可以配置多个location，我们知道，nginx最基础的功能就是用来提供http服务，所以，跟http有关的公共配置，可以放置在http块中，http块中又可以配置多个server，那么server代表了什么呢？我们在一台主机中安装了nginx，那么能不能让这台nginx主机同时提供多个web服务呢？答案是肯定的，每一个server就代表一个http服务，我们可以同时配置多个server，以便同时提供多个http服务，不同的server可以使用不同的配置，写入到某个server块中的配置只对对应的http服务生效，如果多个server存在共同的公用配置，则可以将共同的配置写在http块中，以便多个server共享这些配置，一个server块中又可以有一个或多个location，location又是什么意思呢？当我们访问一个网络上的资源时，都是通过url访问的，你可以把location当做url的一部分。</p><p>笔者的nginx配置</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">vim</span> /data/nginx/conf/nginx.conf</span>
<span class="line">填写以下配置：</span>
<span class="line"><span class="token comment">#user  nobody;</span></span>
<span class="line">worker_processes  auto<span class="token punctuation">;</span></span>
<span class="line">error_log  /data/wwwroot/log/nginx_error.log  crit<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 用来指定进程id的存储文件位置</span></span>
<span class="line"><span class="token comment">#pid        /var/run/nginx.pid; # yum安装的pid</span></span>
<span class="line">pid    logs/nginx.pid<span class="token punctuation">;</span></span>
<span class="line"><span class="token comment"># 用于绑定worker进程和CPU，该值必须和Linux内核打开文件数关联起来，如将该值设置为65535就必须在Linux命令行中执行 ulimit -HSn 65535</span></span>
<span class="line">worker_rlimit_nofile <span class="token number">65535</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">events <span class="token punctuation">{</span></span>
<span class="line">	use epoll<span class="token punctuation">;</span></span>
<span class="line">    worker_connections  <span class="token number">65535</span><span class="token punctuation">;</span></span>
<span class="line">	multi_accept on<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">http <span class="token punctuation">{</span></span>
<span class="line">    include       mime.types<span class="token punctuation">;</span></span>
<span class="line">    default_type  application/octet-stream<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">	log_format  main  <span class="token string">&#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line">                      <span class="token string">&#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line">                      <span class="token string">&#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    access_log  /data/wwwroot/log/nginx_access.log  main<span class="token punctuation">;</span></span>
<span class="line">	</span>
<span class="line">	<span class="token comment">#获取真实IP地址</span></span>
<span class="line">	map <span class="token variable">$http_x_forwarded_for</span>  <span class="token variable">$clientRealIp</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token string">&quot;&quot;</span>      <span class="token variable">$remote_addr</span><span class="token punctuation">;</span></span>
<span class="line">                ~^<span class="token punctuation">(</span>?P<span class="token operator">&lt;</span>firstAddr<span class="token operator">&gt;</span><span class="token punctuation">[</span><span class="token number">0</span>-9<span class="token punctuation">\\</span>.<span class="token punctuation">]</span>+<span class="token punctuation">)</span>,?.*$  <span class="token variable">$firstAddr</span><span class="token punctuation">;</span></span>
<span class="line">   <span class="token punctuation">}</span>      </span>
<span class="line"></span>
<span class="line"><span class="token comment">###自定义访问日志类型</span></span>
<span class="line"><span class="token comment">#log_format  main_aliyun  &#39;$clientRealIp - $remote_user [$time_local] &quot;$request&quot; $status $body_bytes_sent &quot;$http_referer&quot; &quot;$http_user_agent&quot; &quot;$request_time&quot;&#39;;</span></span>
<span class="line">    </span>
<span class="line"><span class="token comment">#log_format  main_zdy  &#39;$request_time IP:$http_x_forwarded_for - RealIP:$clientRealIp - [$time_local] $request - $status - $http_user_agent - $host - from:$http_referer  - POST:$request_body - COOKIE:$http_cookie&#39;;</span></span>
<span class="line"></span>
<span class="line">log_format  main_aliyun  <span class="token string">&#39;$clientRealIp - $remote_user [$time_local] &quot;$request&quot; $status $body_bytes_sent &quot;$http_referer&quot; &quot;$http_user_agent&quot; &quot;$request_time&quot;&#39;</span><span class="token punctuation">;</span></span>
<span class="line">log_format  main_zdy  <span class="token string">&#39;$clientRealIp - $remote_user [$time_local] &quot;$request&quot; $status $body_bytes_sent &quot;$http_referer&quot; &quot;$http_user_agent&quot; &quot;$request_time&quot;&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">	<span class="token comment"># 是否开启高效文件传输模式，将tcp_nopush和tcp_nodelay两个指令设置为on用于防止网络阻塞</span></span>
<span class="line">     sendfile        on<span class="token punctuation">;</span></span>
<span class="line">     tcp_nopush     on<span class="token punctuation">;</span></span>
<span class="line">     tcp_nodelay  on<span class="token punctuation">;</span></span>
<span class="line"> </span>
<span class="line">     <span class="token comment"># 隐藏nginx的版本显示，增强安全性</span></span>
<span class="line">     server_tokens off<span class="token punctuation">;</span></span>
<span class="line"> </span>
<span class="line">     <span class="token comment"># 用于设置客户端连接保持活动的超时时间，单位为秒，默认为75s</span></span>
<span class="line">     keepalive_timeout  <span class="token number">30</span><span class="token punctuation">;</span></span>
<span class="line">     <span class="token comment"># 用于指定响应客户端的超时时间，这个超时仅限于两个连接活动之间的时间，默认为60s</span></span>
<span class="line">     send_timeout <span class="token number">30</span><span class="token punctuation">;</span></span>
<span class="line"> </span>
<span class="line">     <span class="token comment"># 下面是FastCGI的优化指令</span></span>
<span class="line">     <span class="token comment"># 连接到后端FastCGI的超时时间</span></span>
<span class="line">     fastcgi_connect_timeout <span class="token number">300</span><span class="token punctuation">;</span></span>
<span class="line">     <span class="token comment"># 向FastCGI传送请求的超时时间</span></span>
<span class="line">     fastcgi_send_timeout <span class="token number">300</span><span class="token punctuation">;</span></span>
<span class="line">     <span class="token comment"># 接收FastCGI应答的超时时间</span></span>
<span class="line">     fastcgi_read_timeout <span class="token number">300</span><span class="token punctuation">;</span></span>
<span class="line">     <span class="token comment"># 指定读取FastCGI应答第一部分需要多大的缓冲区</span></span>
<span class="line">     fastcgi_buffer_size 64k<span class="token punctuation">;</span></span>
<span class="line">     fastcgi_buffers <span class="token number">4</span> 64k<span class="token punctuation">;</span></span>
<span class="line">     <span class="token comment"># 默认值是fastcgi_buffers的两倍</span></span>
<span class="line">     fastcgi_busy_buffers_size 128k<span class="token punctuation">;</span></span>
<span class="line">     <span class="token comment"># 表示在写入缓存文件时使用多大的数据块，默认为fastcgi_buffers的两倍</span></span>
<span class="line">     fastcgi_temp_file_write_size 128k<span class="token punctuation">;</span></span>
<span class="line">     <span class="token comment"># 为FastCGI缓存指定一个文件路径、目录结构等级、关键字区域存储时间和非活动删除时间</span></span>
<span class="line">     <span class="token comment">#fastcgi_cache_path /usr/local/nginx/fastcgi_cache levels=1:2 keys_zone=TEST:10m inactive=5m;</span></span>
<span class="line">     <span class="token comment"># 开启FastCGI缓存并为其设定一个名称。开启缓存可以有效降低CPU的负载，并且防止502错误的发生。</span></span>
<span class="line">     <span class="token comment"># 但是同时也会引起很多问题，要视具体情况而定</span></span>
<span class="line">     <span class="token comment">#fastcgi_cache TEST;</span></span>
<span class="line">     <span class="token comment"># 用来指定应答代码的缓存时间，下面三条指令表示将200和303应答缓存1小时，301应答缓存1天，其他应答缓存1分钟。</span></span>
<span class="line">     <span class="token comment">#fastcgi_cache_valid 200 302 1h;</span></span>
<span class="line">     <span class="token comment">#fastcgi_cache_valid 301 1d;</span></span>
<span class="line">     <span class="token comment">#fastcgi_cache_valid any 1m;</span></span>
<span class="line"> </span>
<span class="line">     <span class="token comment"># 配置Nginx的HttpGzip模块，开通的前提是安装的时候启用了该模块，使用 /usr/local/nginx/sbin/nginx -V 来查看安装的信息（大写的V）</span></span>
<span class="line">     <span class="token comment"># 是否开通gzip</span></span>
<span class="line">     <span class="token function">gzip</span>  on<span class="token punctuation">;</span></span>
<span class="line">     <span class="token comment"># 允许压缩的页面最小字节数</span></span>
<span class="line">     gzip_min_length 1k<span class="token punctuation">;</span></span>
<span class="line">     gzip_buffers <span class="token number">4</span> 16k<span class="token punctuation">;</span></span>
<span class="line">     gzip_http_version <span class="token number">1.1</span><span class="token punctuation">;</span></span>
<span class="line">     <span class="token comment"># 压缩比，从1到9，越大压缩率越高但越占资源，默认为1</span></span>
<span class="line">     gzip_comp_level <span class="token number">4</span><span class="token punctuation">;</span></span>
<span class="line">     <span class="token comment"># 指定压缩的类型，text/html总是被压缩</span></span>
<span class="line">     gzip_types text/plain application/x-javascript text/css application/xml<span class="token punctuation">;</span></span>
<span class="line">     <span class="token comment"># 是否让浏览器缓存压缩过的数据，默认为off</span></span>
<span class="line">     gzip_vary on<span class="token punctuation">;</span></span>
<span class="line"> </span>
<span class="line">	client_max_body_size 20m<span class="token punctuation">;</span></span>
<span class="line">	proxy_buffer_size  128k<span class="token punctuation">;</span></span>
<span class="line">	proxy_buffers   <span class="token number">32</span> 32k<span class="token punctuation">;</span></span>
<span class="line">	proxy_busy_buffers_size 128k<span class="token punctuation">;</span></span>
<span class="line">	</span>
<span class="line">     <span class="token comment"># server 用于对虚拟主机的设置，建议每个站点的设置放到外部配置文件中，然后使用include进行引用</span></span>
<span class="line">     <span class="token comment"># 这里设置一个默认的主机，当默认访问的时候返回403错误</span></span>
<span class="line">     server <span class="token punctuation">{</span></span>
<span class="line">         listen       <span class="token number">80</span> default<span class="token punctuation">;</span></span>
<span class="line">         server_name _<span class="token punctuation">;</span></span>
<span class="line">         <span class="token comment"># 也可以修改成404或者500，根据自身情况进行设置</span></span>
<span class="line">         <span class="token builtin class-name">return</span> <span class="token number">403</span><span class="token punctuation">;</span></span>
<span class="line">     <span class="token punctuation">}</span></span>
<span class="line">	 </span>
<span class="line">	include /data/conf/sites-available/nginx_*<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每次只需要在 /data/conf/sites-available/ 新增 nginx_web01.conf文件即可</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># vim  /data/conf/sites-available/nginx_web01.conf</span>
<span class="line">添加</span>
<span class="line">server {</span>
<span class="line">        listen       80;</span>
<span class="line">        server_name  www.nginx01.com;</span>
<span class="line">        root /data/wwwroot/web/www.nginx01.com/;</span>
<span class="line">        access_log /data/wwwroot/log/www.nginx01.com-access.log main_aliyun;</span>
<span class="line">        error_log /dev/null;</span>
<span class="line"></span>
<span class="line">		location / {</span>
<span class="line">				index  index.html index.htm index.php;</span>
<span class="line">		}</span>
<span class="line">}</span>
<span class="line"># mkdir -p /data/wwwroot/web/www.nginx01.com/</span>
<span class="line"># echo &#39;hello nginx!&#39; &gt; /data/wwwroot/web/www.nginx01.com/index.html</span>
<span class="line"># /data/nginx/sbin/nginx -s reload</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在客户端的hosts文件中添加</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">192.168.1.3 www.nginx01.com</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20220623152444421.png?aliyun" alt="image-20220623152444421"></p><p>默认站点（通过IP访问）访问为 403，如果要修改则修改以下配置。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">server {</span>
<span class="line">         listen       80 default;</span>
<span class="line">         server_name _;</span>
<span class="line">         # 也可以修改成404或者500，根据自身情况进行设置</span>
<span class="line">         return 403;</span>
<span class="line">     }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20220623152345211.png?aliyun" alt="image-20220623152345211"></p><p>访问 www.nginx01.com 站点</p><p><img src="https://imgoss.xgss.net/picgo/image-20220623152505470.png?aliyun" alt="image-20220623152505470"></p><p>服务器查看nginx日志：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">cat /data/wwwroot/log/www.nginx01.com-access.log</span>
<span class="line">192.168.1.164 - - [23/Jun/2022:15:24:55 +0800] &quot;GET / HTTP/1.1&quot; 200 13 &quot;-&quot; &quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:101.0) Gecko/20100101 Firefox/101.0&quot; &quot;0.000&quot;</span>
<span class="line">192.168.1.164 - - [23/Jun/2022:15:24:55 +0800] &quot;GET /favicon.ico HTTP/1.1&quot; 404 146 &quot;http://www.nginx01.com/&quot; &quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:101.0) Gecko/20100101 Firefox/101.0&quot; &quot;0.000&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此 配置一个WEB站点成功，下一篇文章来讲解nginx的调优和常用配置。</p>`,54)]))}const o=s(l,[["render",p]]),r=JSON.parse('{"path":"/nginx/Nginx%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E6%94%BE%E5%BC%8302-Nginx%E5%9F%BA%E6%9C%AC%E5%91%BD%E4%BB%A4%E5%92%8C%E6%93%8D%E4%BD%9C.html","title":"Nginx从入门到放弃02-Nginx基本命令和新建WEB站点","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"nginx/Nginx从入门到放弃02-Nginx基本命令和操作.md"}');export{o as comp,r as data};
