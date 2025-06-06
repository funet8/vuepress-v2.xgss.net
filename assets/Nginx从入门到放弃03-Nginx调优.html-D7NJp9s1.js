import{_ as s,c as e,b as a,o as i}from"./app-BEL8OELx.js";const l={};function p(d,n){return i(),e("div",null,n[0]||(n[0]=[a(`<h1 id="nginx从入门到放弃03-nginx调优" tabindex="-1"><a class="header-anchor" href="#nginx从入门到放弃03-nginx调优"><span>Nginx从入门到放弃03-Nginx调优</span></a></h1><h2 id="一、调优的必要性" tabindex="-1"><a class="header-anchor" href="#一、调优的必要性"><span>一、调优的必要性</span></a></h2><p>在聊调优之前，我们先要知道为何调优，业务运行和调优的关系。</p><p>笔者把自己总结的文档分为几遍，合集在 https://g.xgss.net/nginx/</p><p><img src="https://imgoss.xgss.net/picgo/1607251234038.png?aliyun" alt="42967083431970b0eb40b3949278a0d1.png"></p><p>业务运行：线上业务正常运行，承载了公司业务。 监控业务：通过监控业务对线上业务进行监控，及时发现问题。 优化业务：通过监控分析，发现业务问题或者瓶颈，及时对业务或者软件就行调整、优化。 测试优化：优化完成后，需要对现有的优化进行测试，保证业务在当前优化模式中稳定、高效，能够解决当前问题。 这就是业务运行的一个流程，也是我们保证业务稳定、高效、高可用的运维之道。</p><h2 id="二、调优" tabindex="-1"><a class="header-anchor" href="#二、调优"><span>二、调优</span></a></h2><p>调优类的文章是最难写的，因为我只能告诉你调优的选项，无法告诉你具体的阈值，因为不同的业务运行在不同的机器，所消耗的资源是不同的；又因为场景不同，对应的调优项及阈值是千变万化的。不能为了调优而调优，要根据实际情况、测试环境还是生产环境、实际业务等需求来实际配置，所以nginx的基本配置需要了解是什么意思，才能调优</p><h3 id="cpu优化" tabindex="-1"><a class="header-anchor" href="#cpu优化"><span>CPU优化</span></a></h3><p>1）为什么要绑定nginx进程到不同的CPU上：CPU调度的时候两个进程有可能被分配达到一个CPU上，从而会导致一个非常的空闲，一个非常的忙，无法充分发挥CPU的运算能力</p><p>（2）如何分配不同的nginx进程给不同的CPU处理</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">4核CPU</span>
<span class="line"># 启动工作进程数量</span>
<span class="line">worker_processes  4;</span>
<span class="line">#指定运行的核的编号，采用掩码的方式设置编号</span>
<span class="line">worker_cpu_affinity   0001 0010 0100 1000;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="最大打开文件数优化" tabindex="-1"><a class="header-anchor" href="#最大打开文件数优化"><span>最大打开文件数优化</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">events {</span>
<span class="line">单个工作进程维护的请求队列长度</span>
<span class="line">    worker_connections  65535;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果65535改为1024，则会报错打开文件数过多，那为什么刚好1024也会报错呢，nginx内部的工作线程数也会占用，如果线程4个工作进程，则最大支持1020，如果现在是8个工作进程，则最大支持1016</p><h3 id="开启高效传输模式" tabindex="-1"><a class="header-anchor" href="#开启高效传输模式"><span>开启高效传输模式</span></a></h3><p>nclude mime.types ：媒体类型,include 只是一个在当前文件中包含另一个文件内容的指令。</p><p>default_type application/octet-stream ：默认媒体类型足够。</p><p>sendfile on：开启高效文件传输模式，sendfile指令指定nginx是否调用sendfile函数来输出文件，对于普通应用设为 on，如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统的负载。注意：如果图片显示不正常把这个改成off。</p><p>tcp_nopush on：必须在sendfile开启模式才有效，防止网路阻塞，积极的减少网络报文段的数量（将响应头和正文的开始部分一起发送，而不一个接一个的发送。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">http {</span>
<span class="line">    include mime.types; </span>
<span class="line">    default_type application/octet-stream; </span>
<span class="line">    …… </span>
<span class="line">    sendfile on; </span>
<span class="line">    tcp_nopush on;</span>
<span class="line">    ……</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调整服务器内核</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># ulimit -a #查看所有的属性值</span>
<span class="line"># ulimit -Hn 65535 #临时设置硬限制</span>
<span class="line"># ulimit -Sn 65535 #设置软限制</span>
<span class="line"># vim /etc/security/limits.conf</span>
<span class="line">...</span>
<span class="line">* soft nofile 65535</span>
<span class="line">* hard nofile 65535</span>
<span class="line"></span>
<span class="line">用户/组 软/硬限制 需要限制的项目 限制的值</span>
<span class="line">*号表示任何用户</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>检查操作系统支持的最大文件数</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># ulimit -a|grep files</span>
<span class="line">open files                      (-n) 65535</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>安装ab 压测工具：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">yum <span class="token parameter variable">-y</span> <span class="token function">install</span> httpd-tools </span>
<span class="line"></span>
<span class="line">安装后测每个worker 进程的并发数</span>
<span class="line"></span>
<span class="line"><span class="token comment"># ab -n 1024 -c 1024 http://127.0.0.1/index.html</span></span>
<span class="line"></span>
<span class="line">修改配置：worker_connections  <span class="token number">1028</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ab -n 1028 -c 1028 http://127.0.0.1/index.html</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="事件处理模型" tabindex="-1"><a class="header-anchor" href="#事件处理模型"><span>事件处理模型</span></a></h3><p>nginx采用epoll事件模型，处理效率高。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">events {</span>
<span class="line">    use epoll; </span>
<span class="line">    worker_connections 65535;  # 单个worker进程允许客户端最大连接数</span>
<span class="line">    multi_accept on; # 告诉nginx收到一个新连接通知后接受尽可能多的连接</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="长连接" tabindex="-1"><a class="header-anchor" href="#长连接"><span>长连接</span></a></h3><p>减少服务器维护因为与客户端建立http连接产生的大量tcp三次握手四次断开的开销</p><p>设置连接超时</p><p>keepalive_timeout:该参数用于设置客户端连接保持会话的超时时间，超过这个时间服务器会关闭该连接</p><p>client_header_timeout:该参数用于设置客户端请求头数据的超时时间，如果超时客户端还没有发送完整的header数据，服务器将返回“Request time out(408)错误”</p><p>client_body_timeout:该参数用于设置客户端请求主题数据的超时时间，如果超时客户端还没有发送完整的主体数据，服务器将返回“Request time out(408)错误”</p><p>send_timeout:用于制定响应客户端的超时时间，如果超时这个时间，客户端没有任何活动,nginx将会关闭连接</p><p>tcp_nodelay:默认情况下当数据发生时，内核并不会马上发送，可能会等待更多的字节组成一个数据包，这样可以提高I/O的性能，但是，在每次发生很少字节的业务场景中，使用tcp_nodelay等待的时间会比较长。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">keepalive_timeout  0;  0代表关闭</span>
<span class="line">#keepalive_timeout  100;</span>
<span class="line">#keepalive_requests 8192;</span>
<span class="line"></span>
<span class="line"># 长连接超时配置</span>
<span class="line">keepalive_timeout 65;</span>
<span class="line">client_header_timeout 15s;</span>
<span class="line">client_body_timeout 15s;</span>
<span class="line">send_timeout 60s;</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fastcgi优化" tabindex="-1"><a class="header-anchor" href="#fastcgi优化"><span>fastcgi优化</span></a></h3><p>FastCGI各大配置项详解</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">fastcgi_connect_timeout 240; #Nginx服务器和后端FastCGI服务器连接的超时时间</span>
<span class="line">fastcgi_send_timeout 240; #Nginx服务器允许FastCGI服务器返回数据的超时时间，即在规定的时间内后端服务器必须传完所有的数据,否则Nginx将断开这个连接</span>
<span class="line">fastcgi_read_timeout 240; #Nginx服务器允许FastCGI服务器读取响应信息的超时时间，表示连接建立成功后,Nginx等待后端服务器的响应时间</span>
<span class="line">fastcgi_buffer_size 64k; #Nginx FastCGI的缓冲区大小，用来读取从FastCGI服务器收到的第一部分响应信息的缓冲区大小</span>
<span class="line">fastcgi_buffer 4 64k; #设定用来读取从FastCGI服务器端收到的响应信息的缓冲区大小和缓冲区数量</span>
<span class="line">fastcgi_busy_buffers_size 128k; #用于设置系统很忙时可以使用的proxy_buffers大小</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="gzip压缩" tabindex="-1"><a class="header-anchor" href="#gzip压缩"><span>gzip压缩</span></a></h3><p>降低传输时间，增加用户体验度；降低公司带宽费用，Gzip压缩可以配置http,server和location模块下</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">gzip  on;</span>
<span class="line">gzip_proxied any;</span>
<span class="line">gzip_min_length 1k;</span>
<span class="line">gzip_buffers 4 8k;</span>
<span class="line">gzip_comp_level 6;</span>
<span class="line">gzip_types text/plain text/css application/x-javascript application/javascript application/xml;</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    # 开启gzip</span>
<span class="line">    gzip off;</span>
<span class="line"></span>
<span class="line">    #Nginx做为反向代理的时候启用：</span>
<span class="line">	off – 关闭所有的代理结果数据压缩</span>
<span class="line">	expired – 如果header中包含”Expires”头信息，启用压缩</span>
<span class="line">	no-cache – 如果header中包含”Cache-Control:no-cache”头信息，启用压缩</span>
<span class="line">	no-store – 如果header中包含”Cache-Control:no-store”头信息，启用压缩</span>
<span class="line">	private – 如果header中包含”Cache-Control:private”头信息，启用压缩</span>
<span class="line">	no_last_modified – 启用压缩，如果header中包含”Last_Modified”头信息，启用压缩</span>
<span class="line">	no_etag – 启用压缩，如果header中包含“ETag”头信息，启用压缩</span>
<span class="line">	auth – 启用压缩，如果header中包含“Authorization”头信息，启用压缩</span>
<span class="line">	any – 无条件压缩所有结果数据</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    gzip_proxied any;</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    # 启用gzip压缩的最小文件，小于设置值的文件将不会压缩</span>
<span class="line">    gzip_min_length 1k;</span>
<span class="line"></span>
<span class="line">    # gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间，后面会有详细说明</span>
<span class="line">    gzip_comp_level 1;</span>
<span class="line"></span>
<span class="line">    # 进行压缩的文件类型。javascript有多种形式。其中的值可以在 mime.types 文件中找到。</span>
<span class="line">    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;</span>
<span class="line"></span>
<span class="line">    # 增加响应头”Vary: Accept-Encoding”</span>
<span class="line">    # 是否在http header中添加Vary: Accept-Encoding，建议开启</span>
<span class="line">    gzip_vary on;</span>
<span class="line"></span>
<span class="line">    # 禁用IE 6 gzip</span>
<span class="line">    gzip_disable &quot;MSIE [1-6]\\.&quot;;</span>
<span class="line"></span>
<span class="line">    # 设置压缩所需要的缓冲区大小     </span>
<span class="line">    gzip_buffers 32 4k;</span>
<span class="line"></span>
<span class="line">    # 设置gzip压缩针对的HTTP协议版本</span>
<span class="line">    gzip_http_version 1.0;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Nginx的gzip压缩功能虽然好用，但是下面两类文件资源不太建议启用此压缩功能</p><p>a.图片类型资源（包括视频文件）</p><p>b.大文件资源</p><h3 id="expires缓存优化" tabindex="-1"><a class="header-anchor" href="#expires缓存优化"><span>expires缓存优化</span></a></h3><p>将部分数据缓存在用户本地磁盘，用户加载时，如果本地和服务器的数据一致，则从本地加载。提升用户访问速度，提升体验度。节省公司带宽成本。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">expires指令：开启缓存并指定静态缓存时间</span>
<span class="line"></span>
<span class="line">location ~*  \\.(png|gif)$ {</span>
<span class="line">              expires 1h;  # 缓存1小时</span>
<span class="line">              expires 30d; # 缓存30天</span>
<span class="line">              expires max; # 最大缓存，10年</span>
<span class="line">              expires -1; # 禁止缓存，永不过期</span>
<span class="line">         }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="隐藏版本号" tabindex="-1"><a class="header-anchor" href="#隐藏版本号"><span>隐藏版本号</span></a></h3><p>隐藏nginx的版本显示，响应头信息可以看到nginx的版本号，版本号暴露是不安全的，所以需要隐藏下nginx的版本号，配置server_tokens off;下面就看不到了。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">server_tokens off;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,54)]))}const t=s(l,[["render",p]]),r=JSON.parse('{"path":"/nginx/Nginx%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E6%94%BE%E5%BC%8303-Nginx%E8%B0%83%E4%BC%98.html","title":"Nginx从入门到放弃03-Nginx调优","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"nginx/Nginx从入门到放弃03-Nginx调优.md"}');export{t as comp,r as data};
