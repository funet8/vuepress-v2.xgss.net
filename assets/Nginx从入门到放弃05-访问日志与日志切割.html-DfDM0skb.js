import{_ as n,c as a,b as e,o as l}from"./app-BEL8OELx.js";const i={};function p(t,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="nginx从入门到放弃05-访问日志与日志切割" tabindex="-1"><a class="header-anchor" href="#nginx从入门到放弃05-访问日志与日志切割"><span>Nginx从入门到放弃05-访问日志与日志切割</span></a></h1><h2 id="设置访问日志" tabindex="-1"><a class="header-anchor" href="#设置访问日志"><span>设置访问日志</span></a></h2><p>当我们访问nginx服务时，nginx会记录日志，nginx日志分两种，一种是访问日志，一种是错误日志，访问日志记录在”access.log”文件中，错误日志记录在”error.log”文件中。</p><p>笔者把自己总结的文档分为几遍，合集在 https://g.xgss.net/nginx/</p><p>自定义nginx日志的路径</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">access_log /data/wwwroot/log/www.nginx01.com-access.log main_zdy;</span>
<span class="line">error_log /data/wwwroot/log/www.nginx01.com-error.log;</span>
<span class="line">error_log /dev/null;  # 不记录日志，不能用 &quot;off&quot;,如果用off还是会记录到 logs/off文件中！</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/nginx05.jpg?aliyun" alt="nginx05"></p><p>通过”log_format”指令可以指定访问日志都记录哪些内容，以怎样的格式记录这些内容，这样说可能不太容易理解，不如我们先来看一个简单的小示例，示例配置如下：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">#如果CDN或者代理，可以获取客户端真实IP为‘$clientRealIp’</span>
<span class="line">map $http_x_forwarded_for  $clientRealIp {</span>
<span class="line">                &quot;&quot;      $remote_addr;</span>
<span class="line">                ~^(?P&lt;firstAddr&gt;[0-9\\.]+),?.*$  $firstAddr;</span>
<span class="line">   } </span>
<span class="line">log_format  main_zdy  &#39;$clientRealIp - $remote_user [$time_local] &quot;$request&quot; $status $body_bytes_sent &quot;$http_referer&quot; &quot;$http_user_agent&quot; &quot;$request_time&quot;&#39;;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>log_format配置指令的默认值就是这个名为”main_zdy”的日志格式，而在站点日志中 ‘access_log /data/wwwroot/log/www.nginx01.com-access.log main_zdy;’ 则日志格式与之匹配</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$remote_addr 变量：记录了客户端的IP地址（普通情况下）。</span>
<span class="line">$remote_user 变量：当nginx开启了用户认证功能后，此变量记录了客户端使用了哪个用户进行了认证。</span>
<span class="line">$time_local 变量：记录了当前日志条目的时间。</span>
<span class="line">$request变量：记录了当前http请求的方法、url和http协议版本。</span>
<span class="line">$status变量：记录了当前http请求的响应状态，即响应的状态码，比如200、404等响应码，都记录在此变量中。</span>
<span class="line">$body_bytes_sent变量：记录了nginx响应客户端请求时，发送到客户端的字节数，不包含响应头的大小。</span>
<span class="line">$http_referer变量：记录了当前请求是从哪个页面过来的，比如你点了A页面中的超链接才产生了这个请求，那么此变量中就记录了A页面的url。</span>
<span class="line">$http_user_agent变量：记录了客户端的软件信息，比如，浏览器的名称和版本号。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些变量并非一定会有对应的值，如果变量没有对应的值，那么日志中会使用 “-” 作为默认值进行占位。</p><h2 id="nginx常用变量" tabindex="-1"><a class="header-anchor" href="#nginx常用变量"><span>Nginx常用变量</span></a></h2><p>nginx中都有哪些变量能够使用呢？这些变量又都是什么含义呢？你可以从如下官网链接中找到答案：</p><p>http://nginx.org/en/docs/varindex.html</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token variable">$args</span>                    <span class="token comment">#请求中的参数值</span></span>
<span class="line"><span class="token variable">$query_string</span>            <span class="token comment">#同 $args</span></span>
<span class="line"><span class="token variable">$arg_NAME</span>                <span class="token comment">#GET请求中NAME的值</span></span>
<span class="line"><span class="token variable">$is_args</span>                 <span class="token comment">#如果请求中有参数，值为&quot;?&quot;，否则为空字符串</span></span>
<span class="line"><span class="token variable">$uri</span>                     <span class="token comment">#请求中的当前URI(不带请求参数，参数位于$args)，可以不同于浏览器传递的$request_uri的值，它可以通过内部重定向，或者使用index指令进行修改，$uri不包含主机名，如&quot;/foo/bar.html&quot;。</span></span>
<span class="line"><span class="token variable">$document_uri</span>            <span class="token comment">#同 $uri</span></span>
<span class="line"><span class="token variable">$document_root</span>           <span class="token comment">#当前请求的文档根目录或别名</span></span>
<span class="line"><span class="token variable">$host</span>                    <span class="token comment">#优先级：HTTP请求行的主机名&gt;&quot;HOST&quot;请求头字段&gt;符合请求的服务器名.请求中的主机头字段，如果请求中的主机头不可用，则为服务器处理请求的服务器名称</span></span>
<span class="line"><span class="token variable">$hostname</span>                <span class="token comment">#主机名</span></span>
<span class="line"><span class="token variable">$https</span>                   <span class="token comment">#如果开启了SSL安全模式，值为&quot;on&quot;，否则为空字符串。</span></span>
<span class="line"><span class="token variable">$binary_remote_addr</span>      <span class="token comment">#客户端地址的二进制形式，固定长度为4个字节</span></span>
<span class="line"><span class="token variable">$body_bytes_sent</span>         <span class="token comment">#传输给客户端的字节数，响应头不计算在内；这个变量和Apache的mod_log_config模块中的&quot;%B&quot;参数保持兼容</span></span>
<span class="line"><span class="token variable">$bytes_sent</span>              <span class="token comment">#传输给客户端的字节数</span></span>
<span class="line"><span class="token variable">$connection</span>              <span class="token comment">#TCP连接的序列号</span></span>
<span class="line"><span class="token variable">$connection_requests</span>     <span class="token comment">#TCP连接当前的请求数量</span></span>
<span class="line"><span class="token variable">$content_length</span>          <span class="token comment">#&quot;Content-Length&quot; 请求头字段</span></span>
<span class="line"><span class="token variable">$content_type</span>            <span class="token comment">#&quot;Content-Type&quot; 请求头字段</span></span>
<span class="line"><span class="token variable">$cookie_name</span>             <span class="token comment">#cookie名称</span></span>
<span class="line"><span class="token variable">$limit_rate</span>              <span class="token comment">#用于设置响应的速度限制</span></span>
<span class="line"><span class="token variable">$msec</span>                    <span class="token comment">#当前的Unix时间戳</span></span>
<span class="line"><span class="token variable">$nginx_version</span>           <span class="token comment">#nginx版本</span></span>
<span class="line"><span class="token variable">$pid</span>                     <span class="token comment">#工作进程的PID</span></span>
<span class="line"><span class="token variable">$pipe</span>                    <span class="token comment">#如果请求来自管道通信，值为&quot;p&quot;，否则为&quot;.&quot;</span></span>
<span class="line"><span class="token variable">$proxy_protocol_addr</span>     <span class="token comment">#获取代理访问服务器的客户端地址，如果是直接访问，该值为空字符串</span></span>
<span class="line"><span class="token variable">$realpath_root</span>           <span class="token comment">#当前请求的文档根目录或别名的真实路径，会将所有符号连接转换为真实路径</span></span>
<span class="line"><span class="token variable">$remote_addr</span>             <span class="token comment">#客户端地址</span></span>
<span class="line"><span class="token variable">$remote_port</span>             <span class="token comment">#客户端端口</span></span>
<span class="line"><span class="token variable">$remote_user</span>             <span class="token comment">#用于HTTP基础认证服务的用户名</span></span>
<span class="line"><span class="token variable">$request</span>                 <span class="token comment">#代表客户端的请求地址</span></span>
<span class="line"><span class="token variable">$request_body</span>            <span class="token comment">#客户端的请求主体：此变量可在location中使用，将请求主体通过proxy_pass，fastcgi_pass，uwsgi_pass和scgi_pass传递给下一级的代理服务器</span></span>
<span class="line"><span class="token variable">$request_body_file</span>       <span class="token comment">#将客户端请求主体保存在临时文件中。文件处理结束后，此文件需删除。如果需要之一开启此功能，需要设置client_body_in_file_only。如果将次文件传 递给后端的代理服务器，需要禁用request body，即设置proxy_pass_request_body off，fastcgi_pass_request_body off，uwsgi_pass_request_body off，or scgi_pass_request_body off</span></span>
<span class="line"><span class="token variable">$request_completion</span>      <span class="token comment">#如果请求成功，值为&quot;OK&quot;，如果请求未完成或者请求不是一个范围请求的最后一部分，则为空</span></span>
<span class="line"><span class="token variable">$request_filename</span>        <span class="token comment">#当前连接请求的文件路径，由root或alias指令与URI请求生成</span></span>
<span class="line"><span class="token variable">$request_length</span>          <span class="token comment">#请求的长度 (包括请求的地址，http请求头和请求主体)</span></span>
<span class="line"><span class="token variable">$request_method</span>          <span class="token comment">#HTTP请求方法，通常为&quot;GET&quot;或&quot;POST&quot;</span></span>
<span class="line"><span class="token variable">$request_time</span>            <span class="token comment">#处理客户端请求使用的时间,单位为秒，精度毫秒； 从读入客户端的第一个字节开始，直到把最后一个字符发送给客户端后进行日志写入为止。</span></span>
<span class="line"><span class="token variable">$request_uri</span>             <span class="token comment">#这个变量等于包含一些客户端请求参数的原始URI，它无法修改，请查看$uri更改或重写URI，不包含主机名，例如：&quot;/cnphp/test.php?arg=freemouse&quot;</span></span>
<span class="line"><span class="token variable">$scheme</span>                  <span class="token comment">#请求使用的Web协议，&quot;http&quot; 或 &quot;https&quot;</span></span>
<span class="line"><span class="token variable">$server_addr</span>             <span class="token comment">#服务器端地址，需要注意的是：为了避免访问linux系统内核，应将ip地址提前设置在配置文件中</span></span>
<span class="line"><span class="token variable">$server_name</span>             <span class="token comment">#服务器名</span></span>
<span class="line"><span class="token variable">$server_port</span>             <span class="token comment">#服务器端口</span></span>
<span class="line"><span class="token variable">$server_protocol</span>         <span class="token comment">#服务器的HTTP版本，通常为 &quot;HTTP/1.0&quot; 或 &quot;HTTP/1.1&quot;</span></span>
<span class="line"><span class="token variable">$status</span>                  <span class="token comment">#HTTP响应代码</span></span>
<span class="line"><span class="token variable">$time_iso8601</span>            <span class="token comment">#服务器时间的ISO 8610格式</span></span>
<span class="line"><span class="token variable">$time_local</span>              <span class="token comment">#服务器时间（LOG Format 格式）</span></span>
<span class="line"><span class="token variable">$cookie_NAME</span>             <span class="token comment">#客户端请求Header头中的cookie变量，前缀&quot;$cookie_&quot;加上cookie名称的变量，该变量的值即为cookie名称的值</span></span>
<span class="line"><span class="token variable">$http_NAME</span>               <span class="token comment">#匹配任意请求头字段；变量名中的后半部分NAME可以替换成任意请求头字段，如在配置文件中需要获取http请求头：&quot;Accept-Language&quot;，$http_accept_language即可</span></span>
<span class="line"></span>
<span class="line"><span class="token variable">$http_cookie</span></span>
<span class="line"><span class="token variable">$http_host</span>               <span class="token comment">#请求地址，即浏览器中你输入的地址（IP或域名）</span></span>
<span class="line"><span class="token variable">$http_referer</span>            <span class="token comment">#url跳转来源,用来记录从那个页面链接访问过来的</span></span>
<span class="line"><span class="token variable">$http_user_agent</span>         <span class="token comment">#用户终端浏览器等信息</span></span>
<span class="line"><span class="token variable">$http_x_forwarded_for</span></span>
<span class="line"><span class="token variable">$sent_http_NAME</span>          <span class="token comment">#可以设置任意http响应头字段；变量名中的后半部分NAME可以替换成任意响应头字段，如需要设置响应头Content-length，$sent_http_content_length即可</span></span>
<span class="line"><span class="token variable">$sent_http_cache_control</span></span>
<span class="line"><span class="token variable">$sent_http_connection</span></span>
<span class="line"><span class="token variable">$sent_http_content_type</span></span>
<span class="line"><span class="token variable">$sent_http_keep_alive</span></span>
<span class="line"><span class="token variable">$sent_http_last_modified</span></span>
<span class="line"><span class="token variable">$sent_http_location</span></span>
<span class="line"><span class="token variable">$sent_http_transfer_encoding</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx日志切割" tabindex="-1"><a class="header-anchor" href="#nginx日志切割"><span>Nginx日志切割</span></a></h2><p>随着WEB站点访问增多，天长日久access.log文件就会越来越大，对于我们的管理工作来说，这是不利的，首先，当我们打开一个非常大的日志文件时，就会比较慢，而且，从一个非常大的日志中找到某个时间段的日志也会比较慢，所以，我们最好将日志按天分割开。</p><p>比如，每天晚上0点将昨天的日志mv到新的目录，同时生成一个新的日志文件，这样每天就会生成一个日志文件，而不是将所有日志都写入到同一个日志文件中。</p><h3 id="切割日志shell脚本-参考" tabindex="-1"><a class="header-anchor" href="#切割日志shell脚本-参考"><span>切割日志shell脚本（参考）</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">vim</span> /data/conf/shell/cut_log_nginx.sh</span>
<span class="line">填写以下：</span>
<span class="line"></span>
<span class="line"><span class="token comment">#!/bin/bash</span></span>
<span class="line"><span class="token comment">#添加自动执行，安装方法</span></span>
<span class="line"><span class="token comment">#vi /etc/crontab</span></span>
<span class="line"><span class="token comment">#输入：</span></span>
<span class="line"><span class="token comment">#00 00 * * * root /data/conf/shell/cut_log_nginx.sh</span></span>
<span class="line"><span class="token comment">###docker的名字</span></span>
<span class="line"><span class="token assign-left variable">Nginx_Name</span><span class="token operator">=</span><span class="token string">&quot;nginx&quot;</span></span>
<span class="line"><span class="token comment">#设置日志保存的时间，天</span></span>
<span class="line"><span class="token assign-left variable">save_days</span><span class="token operator">=</span><span class="token number">60</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#set the path to nginx log files</span></span>
<span class="line"><span class="token assign-left variable">log_files_path</span><span class="token operator">=</span><span class="token string">&quot;/data/wwwroot/log/&quot;</span></span>
<span class="line"><span class="token assign-left variable">nginx_old_log_path</span><span class="token operator">=</span><span class="token string">&quot;/data/wwwroot/nginx_old_log/&quot;</span></span>
<span class="line"><span class="token assign-left variable">log_files_dir</span><span class="token operator">=</span><span class="token variable">\${nginx_old_log_path}</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;yesterday&quot;</span> +<span class="token string">&quot;%Y&quot;</span><span class="token variable">)</span></span>/<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;yesterday&quot;</span> +<span class="token string">&quot;%m&quot;</span><span class="token variable">)</span></span></span>
<span class="line"><span class="token assign-left variable">log_files_name</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span>/bin/ls $log_files_path<span class="token variable">\`</span></span></span>
<span class="line"></span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token variable">$log_files_dir</span></span>
<span class="line"><span class="token comment">#移动日志</span></span>
<span class="line"><span class="token keyword">for</span> <span class="token for-or-select variable">log_name</span> <span class="token keyword">in</span> <span class="token variable">$log_files_name</span><span class="token punctuation">;</span><span class="token keyword">do</span></span>
<span class="line">        <span class="token function">mv</span> <span class="token variable">\${log_files_path}</span><span class="token variable">\${log_name}</span> <span class="token variable">\${log_files_dir}</span>/<span class="token variable">\${log_name}</span>_<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;yesterday&quot;</span> +<span class="token string">&quot;%Y%m%d&quot;</span><span class="token variable">)</span></span>.log</span>
<span class="line"><span class="token keyword">done</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#删除过期日志</span></span>
<span class="line"><span class="token function">find</span> <span class="token variable">$nginx_old_log_path</span> <span class="token parameter variable">-mtime</span> +<span class="token variable">$save_days</span> <span class="token parameter variable">-exec</span> <span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">\\</span><span class="token punctuation">;</span> </span>
<span class="line"></span>
<span class="line"><span class="token comment">#重启nginx服务</span></span>
<span class="line"><span class="token comment"># systemctl reload $Nginx_Name</span></span>
<span class="line"><span class="token comment">#或者</span></span>
<span class="line"><span class="token comment"># nginx -s reload</span></span>
<span class="line">/data/nginx/sbin/nginx <span class="token parameter variable">-s</span> reload</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可执行，并且加入定时任务</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># chmod +x /data/conf/shell/cut_log_nginx.sh</span>
<span class="line"></span>
<span class="line">#vi /etc/crontab</span>
<span class="line">#输入：</span>
<span class="line">00 00 * * * root /data/conf/shell/cut_log_nginx.sh</span>
<span class="line"># systemctl restart crond</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样每天的地址都会切割到 /data/wwwroot/nginx_old_log/ 目录中，并且只保留60天的日志。</p>`,24)]))}const o=n(i,[["render",p]]),r=JSON.parse('{"path":"/nginx/Nginx%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E6%94%BE%E5%BC%8305-%E8%AE%BF%E9%97%AE%E6%97%A5%E5%BF%97%E4%B8%8E%E6%97%A5%E5%BF%97%E5%88%87%E5%89%B2.html","title":"Nginx从入门到放弃05-访问日志与日志切割","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"nginx/Nginx从入门到放弃05-访问日志与日志切割.md"}');export{o as comp,r as data};
