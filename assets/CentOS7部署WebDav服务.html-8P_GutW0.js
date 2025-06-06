import{_ as a,c as n,b as e,o as l}from"./app-BEL8OELx.js";const i={};function p(t,s){return l(),n("div",null,s[0]||(s[0]=[e(`<h1 id="centos7部署开源webdav服务-实现全端文件共享" tabindex="-1"><a class="header-anchor" href="#centos7部署开源webdav服务-实现全端文件共享"><span>CentOS7部署开源WebDav服务，实现全端文件共享</span></a></h1><p>服务器操作系统：Centos7.8</p><p>Linux下可以用Nginx或Apache来部署WebDav服务，也可以用单独的组件。</p><p>这里用的是一个Go语言写的WebDAV Server，Github 项目地址：https://github.com/hacdias/webdav</p><p>部署流程如下。</p><h2 id="_1-下载配置webdav" tabindex="-1"><a class="header-anchor" href="#_1-下载配置webdav"><span>1. 下载配置WebDav</span></a></h2><p>在 /data/webdav-app下新建<code>webdav</code>目录。</p><p>下载并解压到指定目录，当前最新版本为 4.2.0</p><p>https://github.com/hacdias/webdav/releases</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">mkdir</span> /data/webdav-app</span>
<span class="line"><span class="token builtin class-name">cd</span> /data/webdav-app</span>
<span class="line">下载： <span class="token function">wget</span> https://github.com/hacdias/webdav/releases/download/<span class="token punctuation">{</span>最新的版本号<span class="token punctuation">}</span>/linux-amd64-webdav.tar.gz</span>
<span class="line"><span class="token function">wget</span> https://github.com/hacdias/webdav/releases/download/v4.2.0/linux-amd64-webdav.tar.gz</span>
<span class="line"><span class="token function">tar</span> <span class="token parameter variable">-xvzf</span> linux-amd64-webdav.tar.gz</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>/data/webdav-app/</code>目录下新建一个配置文件<code>config.yaml</code>，内容如下</p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line">vim /data/webdav<span class="token punctuation">-</span>app/config.yaml</span>
<span class="line">填写以下：</span>
<span class="line"><span class="token comment"># Server related settings</span></span>
<span class="line"><span class="token key atrule">address</span><span class="token punctuation">:</span> 0.0.0.0</span>
<span class="line"><span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">15108</span></span>
<span class="line"><span class="token key atrule">auth</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line"><span class="token key atrule">tls</span><span class="token punctuation">:</span> <span class="token boolean important">false</span></span>
<span class="line"><span class="token key atrule">cert</span><span class="token punctuation">:</span> cert.pem</span>
<span class="line"><span class="token key atrule">key</span><span class="token punctuation">:</span> key.pem</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Default user settings (will be merged)</span></span>
<span class="line"><span class="token key atrule">scope</span><span class="token punctuation">:</span> .</span>
<span class="line"><span class="token key atrule">modify</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line"><span class="token key atrule">rules</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">users</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">username</span><span class="token punctuation">:</span> user1</span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> password1</span>
<span class="line">    <span class="token key atrule">scope</span><span class="token punctuation">:</span> /data</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对外服务的端口号为<code>15108</code>，需要在安全组或防火墙里放开。</p><p><img src="https://imgoss.xgss.net/picgo/image-20221013141821514.png?aliyun" alt="image-20221013141821514"></p><p>目录<code>/data</code>用于存储<code>user1</code>的文件，需要手动创建。</p><p>如果有多个用户，则遵循<code>yaml</code>的文件规范，按<code>user1</code>的格式添加到下面即可。</p><h2 id="_2-添加服务" tabindex="-1"><a class="header-anchor" href="#_2-添加服务"><span>2. 添加服务</span></a></h2><p>在<code>/usr/lib/systemd/system/</code>下新建文件<code>webdav.service</code>，内容如下</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">vim</span> /usr/lib/systemd/system/webdav.service</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">[</span>Unit<span class="token punctuation">]</span></span>
<span class="line"><span class="token assign-left variable">Description</span><span class="token operator">=</span>WebDAV server</span>
<span class="line"><span class="token assign-left variable">After</span><span class="token operator">=</span>network.target</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">[</span>Service<span class="token punctuation">]</span></span>
<span class="line"><span class="token assign-left variable">Type</span><span class="token operator">=</span>simple</span>
<span class="line"><span class="token assign-left variable">User</span><span class="token operator">=</span>root</span>
<span class="line"><span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/data/webdav-app/webdav <span class="token parameter variable">--config</span> /data/webdav-app/config.yaml</span>
<span class="line"><span class="token assign-left variable">Restart</span><span class="token operator">=</span>on-failure</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">[</span>Install<span class="token punctuation">]</span></span>
<span class="line"><span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-启动webdav服务" tabindex="-1"><a class="header-anchor" href="#_3-启动webdav服务"><span>3. 启动WebDav服务</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">systemctl daemon-reload</span>
<span class="line">systemctl <span class="token builtin class-name">enable</span> webdav</span>
<span class="line">systemctl start webdav</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看服务状态</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">systemctl status webdav</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>输出类似如下</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">● webdav.service - WebDAV server</span>
<span class="line">   Loaded: loaded <span class="token punctuation">(</span>/usr/lib/systemd/system/webdav.service<span class="token punctuation">;</span> enabled<span class="token punctuation">;</span> vendor preset: disabled<span class="token punctuation">)</span></span>
<span class="line">   Active: active <span class="token punctuation">(</span>running<span class="token punctuation">)</span> since Thu <span class="token number">2021</span>-08-31 <span class="token number">17</span>:34:08 CST<span class="token punctuation">;</span> 20h ago</span>
<span class="line"> Main PID: <span class="token number">10032</span> <span class="token punctuation">(</span>webdav<span class="token punctuation">)</span></span>
<span class="line">   CGroup: /system.slice/webdav.service</span>
<span class="line">           └─10032 /usr/local/webdav/webdav <span class="token parameter variable">--config</span> /usr/local/webdav/config.yaml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="开放防火墙端口" tabindex="-1"><a class="header-anchor" href="#开放防火墙端口"><span>开放防火墙端口</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># iptables</span>
<span class="line">iptables -A INPUT -p tcp --dport 15108 -j ACCEPT</span>
<span class="line">service iptables save</span>
<span class="line">systemctl restart iptables</span>
<span class="line"></span>
<span class="line"># firewall-cmd</span>
<span class="line">firewall-cmd --zone=public --add-port=15108/tcp --permanent</span>
<span class="line">firewall-cmd --reload</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用客户端连接" tabindex="-1"><a class="header-anchor" href="#使用客户端连接"><span>使用客户端连接</span></a></h2><p>这里我使用raiDrive客户端连接</p><p><img src="https://imgoss.xgss.net/picgo/image-20221013093434409.png?aliyun" alt="image-20221013093434409"></p><p>连接成功，至此可以使用客户端上传文件到webdav目录了。</p><h2 id="使用nginx反向代理" tabindex="-1"><a class="header-anchor" href="#使用nginx反向代理"><span>使用nginx反向代理</span></a></h2><p>还有一个问题能不能使用nginx的443的代理，是不是更加安全呢</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">server {</span>
<span class="line">        listen 80;</span>
<span class="line">        server_name  s.test1.net;</span>
<span class="line">        access_log /data/wwwroot/log/s.test1.net-access.log main_aliyun;</span>
<span class="line">        error_log /dev/null;</span>
<span class="line">        client_max_body_size    0;</span>
<span class="line">		location / {</span>
<span class="line">                proxy_pass      http://127.0.0.1:15108;</span>
<span class="line">                proxy_redirect off;</span>
<span class="line">                proxy_set_header Host $host;</span>
<span class="line">                proxy_set_header X-Real-IP $remote_addr;</span>
<span class="line">                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span>
<span class="line">        }	</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看日志</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># tail -n 5 /data/wwwroot/log/s.test1.net-access.log</span>
<span class="line">192.168.1.164 - user1 [13/Oct/2022:10:20:15 +0800] &quot;PROPFIND /wwwroot/ HTTP/1.1&quot; 207 2383 &quot;-&quot; &quot;RaiDrive/2022.6.56.0&quot; &quot;0.002&quot;</span>
<span class="line">192.168.1.164 - user1 [13/Oct/2022:10:20:15 +0800] &quot;PROPFIND /code-server/ HTTP/1.1&quot; 207 1690 &quot;-&quot; &quot;RaiDrive/2022.6.56.0&quot; &quot;0.005&quot;</span>
<span class="line">192.168.1.164 - user1 [13/Oct/2022:10:20:34 +0800] &quot;PROPFIND / HTTP/1.1&quot; 207 3822 &quot;-&quot; &quot;RaiDrive/2022.6.56.0&quot; &quot;0.004&quot;</span>
<span class="line">192.168.1.164 - user1 [13/Oct/2022:10:20:34 +0800] &quot;PROPFIND /wwwroot/ HTTP/1.1&quot; 207 2383 &quot;-&quot; &quot;RaiDrive/2022.6.56.0&quot; &quot;0.002&quot;</span>
<span class="line">192.168.1.164 - user1 [13/Oct/2022:10:20:34 +0800] &quot;PROPFIND /code-server/ HTTP/1.1&quot; 207 1690 &quot;-&quot; &quot;RaiDrive/2022.6.56.0&quot; &quot;0.002&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>苹果IOS系统和ios的客户端连接webdav就可以实现文件同步了。</p>`,37)]))}const d=a(i,[["render",p]]),r=JSON.parse('{"path":"/kaiyuan/Open-Source-Software/CentOS7%E9%83%A8%E7%BD%B2WebDav%E6%9C%8D%E5%8A%A1.html","title":"CentOS7部署开源WebDav服务，实现全端文件共享","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"kaiyuan/Open-Source-Software/CentOS7部署WebDav服务.md"}');export{d as comp,r as data};
