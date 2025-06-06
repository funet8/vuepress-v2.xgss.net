import{_ as n,c as a,b as e,o as i}from"./app-BEL8OELx.js";const l={};function p(t,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="nginx从入门到放弃04-反向代理、正向代理、负载均衡" tabindex="-1"><a class="header-anchor" href="#nginx从入门到放弃04-反向代理、正向代理、负载均衡"><span>Nginx从入门到放弃04-反向代理、正向代理、负载均衡</span></a></h1><p>通过前面几篇的文章，我们知道nginx最主要的功能之一可以做负载均衡器、正向代理和反向代理，今天我们就来学习如何利用nginx配置</p><p>笔者把自己总结的文档分为几遍，合集在 https://g.xgss.net/nginx/</p><p><img src="https://imgoss.xgss.net/picgo/nginx04.jpg?aliyun" alt="nginx04"></p><h1 id="反向代理" tabindex="-1"><a class="header-anchor" href="#反向代理"><span>反向代理</span></a></h1><p>局域网中的电脑用户想要直接访问网络是不可行的，只能通过代理服务器来访问，这种代理服务就被称为正向代理。</p><p><img src="https://imgoss.xgss.net/picgo/image-20220623175659268.png?aliyun" alt="image-20220623175659268"></p><p>单台服务器nginx配置如下</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">server {  </span>
<span class="line">	listen       80;</span>
<span class="line">	server_name  www.test.com test.com;  	</span>
<span class="line">	error_log /data/wwwroot/log/www.test.com-error.log;</span>
<span class="line">	access_log /data/wwwroot/log/www.test.com-access.log main_zdy;</span>
<span class="line">	root /www/wwwroot/web/test;</span>
<span class="line">	if ($host = &#39;test.com&#39;) {</span>
<span class="line">        	rewrite ^/(.*)$ http://www.test.com/$1 permanent;</span>
<span class="line">    	}</span>
<span class="line">	location / {</span>
<span class="line">                index  index.html index.htm index.php;</span>
<span class="line">        }	</span>
<span class="line">	location ~ .*\\.(php|php5)?$	{</span>
<span class="line">                proxy_pass      http://192.168.1.10:8080;</span>
<span class="line">                proxy_redirect off;</span>
<span class="line">                proxy_set_header Host $host;</span>
<span class="line">                proxy_set_header X-Real-IP $remote_addr;</span>
<span class="line">                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span>
<span class="line">        }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将php的文件代理给192.168.1.10:8080端口来处理，这就是反向代理，nginx只做分发处理。</p><p>随着业务量和计算量增加，如果192.168.1.10:8080，超出本身的最大算力，这是就要增加硬件配置，单台服务器性能总会有瓶颈，这时候就需要用到负载均衡。</p><h1 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡"><span>负载均衡</span></a></h1><p>负载均衡，一般包含两方面的含义。一方面是，将单一的重负载分担到多个网络节点上做并行处理，每个节点处理结束后将结果汇总返回给用户，这样可以大幅提高网络系统的处理能力；第二个方面的含义是，将大量的前端并发访问或数据流量分担到多个后端网络节点上分别处理，这样可以有效减少前端用户等待响应的时间。</p><p><img src="https://imgoss.xgss.net/picgo/image-20220622192522402.png?aliyun" alt="负载均衡"></p><h2 id="一、负载均衡的作用" tabindex="-1"><a class="header-anchor" href="#一、负载均衡的作用"><span>一、负载均衡的作用</span></a></h2><h3 id="_1、转发功能" tabindex="-1"><a class="header-anchor" href="#_1、转发功能"><span>1、转发功能</span></a></h3><p>按照一定的算法【权重、轮询】，将客户端请求转发到不同应用服务器上，减轻单个服务器压力，提高系统并发量。</p><h3 id="_2、故障移除" tabindex="-1"><a class="header-anchor" href="#_2、故障移除"><span>2、故障移除</span></a></h3><p>通过心跳检测的方式，判断应用服务器当前是否可以正常工作，如果服务器期宕掉，自动将请求发送到其他应用服务器。</p><h3 id="_3、恢复添加" tabindex="-1"><a class="header-anchor" href="#_3、恢复添加"><span>3、恢复添加</span></a></h3><p>如检测到发生故障的应用服务器恢复工作，自动将其添加到处理用户请求队伍中。</p><h2 id="nginx实现负载均衡" tabindex="-1"><a class="header-anchor" href="#nginx实现负载均衡"><span>Nginx实现负载均衡</span></a></h2><h3 id="_1、轮询法-默认" tabindex="-1"><a class="header-anchor" href="#_1、轮询法-默认"><span>1、轮询法（默认）</span></a></h3><p>将请求按顺序轮流地分配到后端服务器上，它均衡地对待后端的每一台服务器，而不关心服务器实际的连接数和当前的系统负载。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">upstream myservers {</span>
<span class="line">    server 192.168.20.182:8080;</span>
<span class="line">    server 192.168.20.183:8080;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">在站点配置，以下均相同配置</span>
<span class="line">location ~ .*\\.(php|php5)?$	{</span>
<span class="line">                proxy_pass      http://myservers;  #反向代理</span>
<span class="line">                proxy_redirect off;</span>
<span class="line">                proxy_set_header Host $host;</span>
<span class="line">                proxy_set_header X-Real-IP $remote_addr;</span>
<span class="line">                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span>
<span class="line">   }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">upstream myservers {</span>
<span class="line">    server 11.22.333.11:6666 weight=1;</span>
<span class="line">    server 11.22.333.44:5555 weight=2;</span>
<span class="line">    server 11.22.333.22:8888 down;</span>
<span class="line">    server 11.22.333.33:8888 backup;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>down 表示单前的server临时参与 weight 默觉得1.weight越大，负载的权重就越大 backup：其他全部的非backup机器down或者忙的时候，请求backup机器。所以这台机器压力会最轻</p><h3 id="_2、源地址哈希法" tabindex="-1"><a class="header-anchor" href="#_2、源地址哈希法"><span>2、源地址哈希法</span></a></h3><p>根据获取客户端的IP地址，通过哈希函数计算得到一个数值，用该数值对服务器列表的大小进行取模运算，得到的结果便是客服端要访问服务器的序号。采用源地址哈希法进行负载均衡，同一IP地址的客户端，当后端服务器列表不变时，它每次都会映射到同一台后端服务器进行访问。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">upstream myservers <span class="token punctuation">{</span></span>
<span class="line">    ip_hash<span class="token punctuation">;</span></span>
<span class="line">    server <span class="token number">192.168</span>.20.182:8080<span class="token punctuation">;</span></span>
<span class="line">    server <span class="token number">192.168</span>.20.183:8080<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、随机法" tabindex="-1"><a class="header-anchor" href="#_3、随机法"><span>3、随机法</span></a></h3><p>通过系统的随机算法，根据后端服务器的列表大小值来随机选取其中的一台服务器进行访问。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">upstream myservers {</span>
<span class="line">    server 192.168.20.181:8080 weight=2;</span>
<span class="line">	server 192.168.20.182:8080 weight=3;</span>
<span class="line">	server 192.168.20.183:8080 weight=4;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、加权轮询法" tabindex="-1"><a class="header-anchor" href="#_4、加权轮询法"><span>4、加权轮询法</span></a></h3><p>不同的后端服务器可能机器的配置和当前系统的负载并不相同，因此它们的抗压能力也不相同。给配置高、负载低的机器配置更高的权重，让其处理更多的请；而配置低、负载高的机器，给其分配较低的权重，降低其系统负载，加权轮询能很好地处理这一问题，并将请求顺序且按照权重分配到后端。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">upstream myservers {</span>
<span class="line">    # weight=3表示权重为3，每访问5次就有3次访问181的服务</span>
<span class="line">	server 192.168.20.181:8080 weight=3;</span>
<span class="line">	server 192.168.20.182:8080;</span>
<span class="line">	server 192.168.20.183:8080;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5、加权随机法" tabindex="-1"><a class="header-anchor" href="#_5、加权随机法"><span>5、加权随机法</span></a></h3><p>与加权轮询法一样，加权随机法也根据后端机器的配置，系统的负载分配不同的权重。不同的是，它是按照权重随机请求后端服务器，而非顺序。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">upstream myservers {</span>
<span class="line">    server 192.168.20.181:8080 weight=2;</span>
<span class="line">	server 192.168.20.182:8080 weight=3;</span>
<span class="line">	server 192.168.20.183:8080 weight=4;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6、最小连接数法" tabindex="-1"><a class="header-anchor" href="#_6、最小连接数法"><span>6、最小连接数法</span></a></h3><p>由于后端服务器的配置不尽相同，对于请求的处理有快有慢，最小连接数法根据后端服务器当前的连接情况，动态地选取其中当前积压连接数最少的一台服务器来处理当前的请求，尽可能地提高后端服务的利用效率，将负责合理地分流到每一台服务器。</p><p>按后端服务器的响应时间来分配请求，响应时间短的优先分配</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">upstream myservers {</span>
<span class="line">	server 192.168.20.182:8080;</span>
<span class="line">	server 192.168.20.183:8080;</span>
<span class="line">	fair;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="正向代理" tabindex="-1"><a class="header-anchor" href="#正向代理"><span>正向代理</span></a></h1><p>局域网中的电脑用户想要直接访问网络是不可行的，只能通过代理服务器来访问，这种代理服务就被称为正向代理。</p><p><img src="https://imgoss.xgss.net/picgo/image-20220623175937868.png?aliyun" alt="image-20220623175937868"></p><h2 id="nginx配置正向代理" tabindex="-1"><a class="header-anchor" href="#nginx配置正向代理"><span>nginx配置正向代理</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">server {</span>
<span class="line">        listen 18081;</span>
<span class="line">        server_name _;</span>
<span class="line">        location / {</span>
<span class="line">        	resolver 8.8.8.8;</span>
<span class="line">        	proxy_pass $scheme://$host$request_uri;</span>
<span class="line">        }</span>
<span class="line">}        </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的配置只能代理http协议，现在大多网站都是https协议，只配置上面是不行的，需要配置https代理。</p><p>在火狐安装代理FoxyProxy插件</p><p><img src="https://imgoss.xgss.net/picgo/image-20220623180536507.png?aliyun" alt="image-20220623180536507"></p><p>访问HTTP站点：</p><p><img src="https://imgoss.xgss.net/picgo/image-20220623180738811.png?aliyun" alt="image-20220623180738811"></p><p>访问HTTPS的站点是会报错</p><p><img src="https://imgoss.xgss.net/picgo/image-20220623180629628.png?aliyun" alt="image-20220623180629628"></p><h2 id="https的正向代理" tabindex="-1"><a class="header-anchor" href="#https的正向代理"><span>HTTPS的正向代理</span></a></h2><p>作为反向代理时, 代理服务器通常终结 (terminate) HTTPS 加密流量, 再转发给后端实例。HTTPS 流量的加解密和认证过程发生在客户端和反向代理服务器之间。</p><p>而作为正向代理在处理客户端发过来的流量时, HTTP 加密封装在了 TLS/SSL 中, 代理服务器无法看到客户端请求 URL 中想要访问的域名, 如下图。所以代理 HTTPS 流量, 相比于 HTTP, 需要做一些特殊处理。</p><p><img src="https://imgoss.xgss.net/picgo/image-20220623231100931.png?aliyun" alt="image-20220623231100931"></p><p>nginx安装ngx_http_proxy_connect_module模块，通过编译安装</p><h3 id="安装插件" tabindex="-1"><a class="header-anchor" href="#安装插件"><span>安装插件</span></a></h3><p>将插件上传到/data/software，安装可以参考Nginx从入门到放弃01。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># cd /data/software</span></span>
<span class="line"><span class="token comment"># git clone https://gitee.com/web_design_of_web_frontend/ngx_http_proxy_connect_module.git</span></span>
<span class="line"></span>
<span class="line">删除之前安装的nginx</span>
<span class="line"><span class="token comment"># nginx -s stop</span></span>
<span class="line"><span class="token comment"># rm -rf /data/nginx/*</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="设置参数-编译模块" tabindex="-1"><a class="header-anchor" href="#设置参数-编译模块"><span>设置参数，编译模块</span></a></h3><p>对于新安装的环境, 参考正常的安装步骤和安装这个模块的步骤, 把对应版本的 patch 打上之后, 在 configure 的时候加上参数 --add-module=/path/to/ngx_http_proxy_connect_module, 示例如下:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"></span>
<span class="line"><span class="token comment"># cd /data/software/nginx-1.22.0</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ./configure --prefix=/data/nginx \\</span></span>
<span class="line">--with-file-aio <span class="token punctuation">\\</span></span>
<span class="line">--with-http_auth_request_module <span class="token punctuation">\\</span></span>
<span class="line">--with-http_ssl_module <span class="token punctuation">\\</span></span>
<span class="line">--with-http_v2_module <span class="token punctuation">\\</span></span>
<span class="line">--with-http_realip_module <span class="token punctuation">\\</span></span>
<span class="line">--with-http_addition_module <span class="token punctuation">\\</span></span>
<span class="line">--with-http_xslt_module<span class="token operator">=</span>dynamic <span class="token punctuation">\\</span></span>
<span class="line">--with-http_geoip_module<span class="token operator">=</span>dynamic <span class="token punctuation">\\</span></span>
<span class="line">--with-http_sub_module <span class="token punctuation">\\</span></span>
<span class="line">--with-http_dav_module <span class="token punctuation">\\</span></span>
<span class="line">--with-http_flv_module <span class="token punctuation">\\</span></span>
<span class="line">--with-http_mp4_module <span class="token punctuation">\\</span></span>
<span class="line">--with-http_gunzip_module <span class="token punctuation">\\</span></span>
<span class="line">--with-http_gzip_static_module <span class="token punctuation">\\</span></span>
<span class="line">--with-http_random_index_module <span class="token punctuation">\\</span></span>
<span class="line">--with-http_secure_link_module <span class="token punctuation">\\</span></span>
<span class="line">--with-http_degradation_module <span class="token punctuation">\\</span></span>
<span class="line">--with-http_slice_module <span class="token punctuation">\\</span></span>
<span class="line">--with-http_stub_status_module <span class="token punctuation">\\</span></span>
<span class="line">--with-http_perl_module<span class="token operator">=</span>dynamic <span class="token punctuation">\\</span></span>
<span class="line">--with-pcre <span class="token punctuation">\\</span></span>
<span class="line">--with-pcre-jit <span class="token punctuation">\\</span></span>
<span class="line">--with-stream<span class="token operator">=</span>dynamic <span class="token punctuation">\\</span></span>
<span class="line">--with-stream_ssl_module <span class="token punctuation">\\</span></span>
<span class="line">--with-threads <span class="token punctuation">\\</span></span>
<span class="line">--add-module<span class="token operator">=</span>/data/software/ngx_http_proxy_connect_module</span>
<span class="line"> </span>
<span class="line"><span class="token comment"># make &amp;&amp; make install</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>到这一步，make &amp;&amp; make install</strong> 一直报错，找了很久的原因也没有解决，有知道的朋友留言说一下。所以HTTPS的代理也就。。。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">src/http/ngx_http_request.h:47:0: error: &quot;NGX_HTTP_CONNECT&quot; redefined [-Werror]</span>
<span class="line"> #define NGX_HTTP_CONNECT                   0x10000</span>
<span class="line"> ^</span>
<span class="line">src/http/ngx_http_request.h:44:0: note: this is the location of the previous definition</span>
<span class="line"> #define NGX_HTTP_CONNECT                   0x00010000</span>
<span class="line"> ^</span>
<span class="line">src/http/ngx_http_request.h:439:39: error: duplicate member ‘connect_host’</span>
<span class="line">     ngx_str_t                         connect_host;</span>
<span class="line">                                       ^</span>
<span class="line">src/http/ngx_http_request.h:440:39: error: duplicate member ‘connect_port’</span>
<span class="line">     ngx_str_t                         connect_port;</span>
<span class="line">                                       ^</span>
<span class="line">src/http/ngx_http_request.h:441:39: error: duplicate member ‘connect_port_n’</span>
<span class="line">     in_port_t                         connect_port_n;</span>
<span class="line">                                       ^</span>
<span class="line">src/http/ngx_http_request.h:442:39: error: duplicate member ‘connect_host_start’</span>
<span class="line">     u_char                           *connect_host_start;</span>
<span class="line">                                       ^</span>
<span class="line">src/http/ngx_http_request.h:443:39: error: duplicate member ‘connect_host_end’</span>
<span class="line">     u_char                           *connect_host_end;</span>
<span class="line">                                       ^</span>
<span class="line">src/http/ngx_http_request.h:444:39: error: duplicate member ‘connect_port_end’</span>
<span class="line">     u_char                           *connect_port_end;</span>
<span class="line">                                       ^</span>
<span class="line">src/http/ngx_http_request.h:448:39: error: duplicate member ‘connect_host’</span>
<span class="line">     ngx_str_t                         connect_host;</span>
<span class="line">                                       ^</span>
<span class="line">src/http/ngx_http_request.h:449:39: error: duplicate member ‘connect_port’</span>
<span class="line">     ngx_str_t                         connect_port;</span>
<span class="line">                                       ^</span>
<span class="line">src/http/ngx_http_request.h:450:39: error: duplicate member ‘connect_port_n’</span>
<span class="line">     in_port_t                         connect_port_n;</span>
<span class="line">                                       ^</span>
<span class="line">src/http/ngx_http_request.h:451:39: error: duplicate member ‘connect_host_start’</span>
<span class="line">     u_char                           *connect_host_start;</span>
<span class="line">                                       ^</span>
<span class="line">src/http/ngx_http_request.h:452:39: error: duplicate member ‘connect_host_end’</span>
<span class="line">     u_char                           *connect_host_end;</span>
<span class="line">                                       ^</span>
<span class="line">src/http/ngx_http_request.h:453:39: error: duplicate member ‘connect_port_end’</span>
<span class="line">     u_char                           *connect_port_end;</span>
<span class="line">                                       ^</span>
<span class="line">cc1: all warnings being treated as errors</span>
<span class="line">make[1]: *** [objs/src/http/ngx_http.o] Error 1</span>
<span class="line">make[1]: Leaving directory \`/home/data/software/nginx-1.22.0&#39;</span>
<span class="line">make: *** [build] Error 2</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于已经安装编译安装完的环境, 需要加入以上模块, 步骤如下:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 停止 NGINX 服务</span>
<span class="line"># systemctl stop nginx</span>
<span class="line"># 备份原执行文件</span>
<span class="line"># cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.bak</span>
<span class="line"># 在源代码路径重新编译</span>
<span class="line"># cd /usr/local/src/nginx-1.16.0</span>
<span class="line">./configure \\</span>
<span class="line">--user=www \\</span>
<span class="line">--group=www \\</span>
<span class="line">--prefix=/usr/local/nginx \\</span>
<span class="line">--with-http_ssl_module \\</span>
<span class="line">--with-http_stub_status_module \\</span>
<span class="line">--with-http_realip_module \\</span>
<span class="line">--with-threads \\</span>
<span class="line">--add-module=/root/src/ngx_http_proxy_connect_module</span>
<span class="line"># make</span>
<span class="line"># 不要 make install</span>
<span class="line"># 将新生成的可执行文件拷贝覆盖原来的 nginx 执行文件</span>
<span class="line"># cp objs/nginx /usr/local/nginx/sbin/nginx</span>
<span class="line"># /usr/bin/nginx -V</span>
<span class="line">nginx version: nginx/1.16.0</span>
<span class="line">built by gcc 4.8.5 20150623 (Red Hat 4.8.5-36) (GCC)</span>
<span class="line">built with OpenSSL 1.0.2k-fips  26 Jan 2017</span>
<span class="line">TLS SNI support enabled</span>
<span class="line">configure arguments: --user=www --group=www --prefix=/usr/local/nginx --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module --with-threads --add-module=/root/src/ngx_http_proxy_connect_module</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置nginx正向代理。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">#正向代理</span>
<span class="line">server{</span>
<span class="line">	resolver 114.114.114.114;</span>
<span class="line">	resolver_timeout 30s;</span>
<span class="line">    listen 8888;</span>
<span class="line">	proxy_connect;                          #启用 CONNECT HTTP方法</span>
<span class="line">	proxy_connect_allow            443 80;  #指定代理CONNECT方法可以连接的端口号或范围的列表</span>
<span class="line">	proxy_connect_connect_timeout  20s;     #定义客户端与代理服务器建立连接的超时时间</span>
<span class="line">	proxy_connect_read_timeout     20s;     #定义客户端从代理服务器读取响应的超时时间</span>
<span class="line">	proxy_connect_send_timeout     20s;     #设置客户端将请求传输到代理服务器的超时时间</span>
<span class="line"></span>
<span class="line">	location / {</span>
<span class="line">		proxy_pass $scheme://$http_host$request_uri;</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,72)]))}const r=n(l,[["render",p]]),d=JSON.parse('{"path":"/nginx/Nginx%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E6%94%BE%E5%BC%8304-%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E3%80%81%E6%AD%A3%E5%90%91%E4%BB%A3%E7%90%86%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86.html","title":"Nginx从入门到放弃04-反向代理、正向代理、负载均衡","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"nginx/Nginx从入门到放弃04-负载均衡、正向代理反向代理.md"}');export{r as comp,d as data};
