import{_ as e,c as n,b as a,o as i}from"./app-BEL8OELx.js";const l={};function r(p,s){return i(),n("div",null,s[0]||(s[0]=[a(`<h1 id="jumpserver-是什么-安装jumpserver" tabindex="-1"><a class="header-anchor" href="#jumpserver-是什么-安装jumpserver"><span>JumpServer 是什么，安装JumpServer</span></a></h1><h2 id="jumpserver-是什么" tabindex="-1"><a class="header-anchor" href="#jumpserver-是什么"><span>JumpServer 是什么</span></a></h2><p>JumpServer 是广受欢迎的开源堡垒机，是符合 4A 规范的专业运维安全审计系统。JumpServer 帮助企业以更安全的方式管控和登录所有类型的资产，实现事前授权、事中监察、事后审计，满足等保合规要求。</p><p>https://docs.jumpserver.org/zh/v3/#1-jumpserver</p><p><img src="https://imgoss.xgss.net/picgo/index_02.png?aliyun" alt="index_02"></p><h2 id="jumpserver-堡垒机支持的资产类型包括" tabindex="-1"><a class="header-anchor" href="#jumpserver-堡垒机支持的资产类型包括"><span>JumpServer 堡垒机支持的资产类型包括</span></a></h2><ul><li>SSH (Linux / Unix / 网络设备 等)</li><li>Windows (Web 方式连接 / 原生 RDP 连接)</li><li>数据库 (MySQL / MariaDB / Oracle / SQLServer / PostgreSQL / ClickHouse 等)</li><li>NoSQL (Redis / MongoDB 等)</li><li>GPT (ChatGPT 等)</li><li>云服务 (Kubernetes / VMware vSphere 等)</li><li>Web 站点 (各类系统的 Web 管理后台)</li><li>应用 (通过 Remote App 连接各类应用)</li></ul><p>我选择单机部署安装，系统centos7，IP: 192.168.1.2</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># cd /opt</span>
<span class="line"># curl -sSL https://resource.fit2cloud.com/jumpserver/jumpserver/releases/latest/download/quick_start.sh | bash</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参考： https://docs.jumpserver.org/zh/v3/installation/setup_linux_standalone/online_install/</p><p>运行完成之后，下载了如下docker镜像</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># docker images</span>
<span class="line">REPOSITORY           TAG       IMAGE ID       CREATED        SIZE</span>
<span class="line">jumpserver/web       v3.6.2    968c5acbb280   4 days ago     1.53GB</span>
<span class="line">jumpserver/chen      v3.6.2    35f659cc7c52   4 days ago     568MB</span>
<span class="line">jumpserver/core      v3.6.2    8ca03c14c829   4 days ago     1.57GB</span>
<span class="line">jumpserver/magnus    v3.6.2    ddc825b66411   4 days ago     159MB</span>
<span class="line">jumpserver/lion      v3.6.2    53dcfd817496   4 days ago     237MB</span>
<span class="line">jumpserver/koko      v3.6.2    58fe7a4c7e94   4 days ago     1.01GB</span>
<span class="line">jumpserver/kael      v3.6.2    b3a59ea024c6   4 days ago     278MB</span>
<span class="line">jumpserver/mariadb   10.6      aac2cf878de9   9 months ago   405MB</span>
<span class="line">jumpserver/redis     6.2       48da0c367062   9 months ago   113MB</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行了10个docker实例</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">CONTAINER ID   IMAGE                      COMMAND                  CREATED          STATUS                            PORTS                                                                                                                  NAMES</span>
<span class="line">aad48a2d03bf   jumpserver/magnus:v3.6.2   &quot;./entrypoint.sh&quot;        17 minutes ago   Up 15 minutes (healthy)           0.0.0.0:33061-33062-&gt;33061-33062/tcp, :::33061-33062-&gt;33061-33062/tcp, 0.0.0.0:63790-&gt;63790/tcp, :::63790-&gt;63790/tcp   jms_magnus</span>
<span class="line">1f758dd2c837   jumpserver/core:v3.6.2     &quot;./entrypoint.sh sta…&quot;   17 minutes ago   Up 16 minutes (healthy)           8080/tcp                                                                                                               jms_celery</span>
<span class="line">fe7c9296905e   jumpserver/lion:v3.6.2     &quot;./entrypoint.sh&quot;        17 minutes ago   Up 16 minutes (healthy)           4822/tcp, 8081/tcp                                                                                                     jms_lion</span>
<span class="line">a50c14135836   jumpserver/chen:v3.6.2     &quot;./entrypoint.sh&quot;        17 minutes ago   Up 16 minutes (healthy)           8082/tcp                                                                                                               jms_chen</span>
<span class="line">cdcbb89e5238   jumpserver/kael:v3.6.2     &quot;./entrypoint.sh&quot;        17 minutes ago   Up 16 minutes (healthy)           8083/tcp                                                                                                               jms_kael</span>
<span class="line">db9d436dd96c   jumpserver/koko:v3.6.2     &quot;./entrypoint.sh&quot;        17 minutes ago   Up 16 minutes (healthy)           0.0.0.0:2222-&gt;2222/tcp, :::2222-&gt;2222/tcp, 5000/tcp                                                                    jms_koko</span>
<span class="line">fe47d20a2d99   jumpserver/web:v3.6.2      &quot;/docker-entrypoint.…&quot;   17 minutes ago   Up 3 seconds (health: starting)   0.0.0.0:80-&gt;80/tcp, :::80-&gt;80/tcp                                                                                      jms_web</span>
<span class="line">73b2defbf1ac   jumpserver/core:v3.6.2     &quot;./entrypoint.sh sta…&quot;   17 minutes ago   Up 17 minutes (healthy)           8080/tcp                                                                                                               jms_core</span>
<span class="line">4a71a6ef66ae   jumpserver/redis:6.2       &quot;docker-entrypoint.s…&quot;   44 minutes ago   Up 44 minutes (healthy)           6379/tcp                                                                                                               jms_redis</span>
<span class="line">e1fff68fae3c   jumpserver/mariadb:10.6    &quot;docker-entrypoint.s…&quot;   44 minutes ago   Up 44 minutes (healthy)           3306/tcp                                                                                                               jms_mysql# docker ps</span>
<span class="line">CONTAINER ID   IMAGE                     COMMAND                  CREATED         STATUS                   PORTS      NAMES</span>
<span class="line">4ca2d352ed4c   jumpserver/core:v3.6.2    &quot;./entrypoint.sh sle…&quot;   2 minutes ago   Up About a minute        8080/tcp   jms_core</span>
<span class="line">4a71a6ef66ae   jumpserver/redis:6.2      &quot;docker-entrypoint.s…&quot;   2 minutes ago   Up 2 minutes (healthy)   6379/tcp   jms_redis</span>
<span class="line">e1fff68fae3c   jumpserver/mariadb:10.6   &quot;docker-entrypoint.s…&quot;   2 minutes ago   Up 2 minutes (healthy)   3306/tcp   jms_mysql</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首次安装后需要修改配置文件，定义 DOMAINS 字段后即可正常使用 如果服务器是一键安装并且旧版本就已经使用 JumpServer 开启了 HTTPS，则不需要进行任何更改。 需要使用 IP 地址来访问 JumpServer 的场景，可以根据自己的 IP 类型来填写 config.txt 配置文件中 DOMAINS 字段为公网 IP 还是内网 IP。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span>
<span class="line">  # 打开config.txt 配置文件，定义 DOMAINS 字段</span>
<span class="line">  vim /opt/jumpserver/config/config.txt</span>
<span class="line"></span>
<span class="line">  # 可信任 DOMAINS 定义,</span>
<span class="line">  # 定义可信任的访问 IP, 请根据实际情况修改, 如果是公网 IP 请改成对应的公网 IP,</span>
<span class="line">  # DOMAINS=&quot;demo.jumpserver.org&quot;    # 使用域名访问</span>
<span class="line">  # DOMAINS=&quot;172.17.200.191&quot;         # 使用 IP 访问</span>
<span class="line">  # DOMAINS=&quot;demo.jumpserver.org,172.17.200.191&quot;    # 使用 IP 和 域名一起访问</span>
<span class="line">  DOMAINS=</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="登录后台" tabindex="-1"><a class="header-anchor" href="#登录后台"><span>登录后台</span></a></h2><p>安装成功后，通过浏览器访问登录 JumpServer</p><p>地址: http://&lt;JumpServer服务器IP地址&gt;:&lt;服务运行端口&gt;</p><p>http://192.168.1.2/core/auth/login/</p><p>用户名: admin</p><p>密码: admin</p><p>根据提示修改密码</p><p><img src="https://imgoss.xgss.net/picgo/image-20230828172624241.png?aliyun" alt="image-20230828172624241"></p><h2 id="修改配置文件" tabindex="-1"><a class="header-anchor" href="#修改配置文件"><span>修改配置文件</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">vim /opt/jumpserver/config/config.txt</span>
<span class="line"></span>
<span class="line">HTTP_PORT=80 改成 81  # 因为本机的nginx冲突了</span>
<span class="line">DOMAINS=jms.xgss.net</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="jumpserver常用命令" tabindex="-1"><a class="header-anchor" href="#jumpserver常用命令"><span>jumpserver常用命令</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">cd /opt/jumpserver-installer-v3.6.2</span>
<span class="line"></span>
<span class="line"># 启动</span>
<span class="line">./jmsctl.sh start</span>
<span class="line"></span>
<span class="line"># 停止</span>
<span class="line">./jmsctl.sh down</span>
<span class="line"></span>
<span class="line"># 卸载</span>
<span class="line">./jmsctl.sh uninstall</span>
<span class="line"></span>
<span class="line"># 帮助</span>
<span class="line">./jmsctl.sh -h</span>
<span class="line"></span>
<span class="line"># 开机启动</span>
<span class="line">echo &#39;/opt/jumpserver-installer-v3.6.2/jmsctl.sh start&#39; &gt;&gt; /etc/rc.local </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="反向代理" tabindex="-1"><a class="header-anchor" href="#反向代理"><span>反向代理</span></a></h2><p>域名： jms.xgss.net</p><h3 id="http配置" tabindex="-1"><a class="header-anchor" href="#http配置"><span>HTTP配置</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">server {</span>
<span class="line"></span>
<span class="line">    listen 80;</span>
<span class="line">    server_name jms.xgss.net;  # 自行修改成你的域名</span>
<span class="line">    access_log /data/wwwroot/log/jms.xgss.net-access.log main_aliyun;</span>
<span class="line">	error_log /dev/null;</span>
<span class="line">	</span>
<span class="line">    client_max_body_size 4096m;  # 上传文件大小限制</span>
<span class="line"></span>
<span class="line">    location / {</span>
<span class="line">            # 这里的 ip 是后端 JumpServer nginx 的 ip</span>
<span class="line">            proxy_pass http://127.0.0.1:81;</span>
<span class="line">            proxy_http_version 1.1;</span>
<span class="line">            proxy_buffering off;</span>
<span class="line">            proxy_request_buffering off;</span>
<span class="line">            proxy_set_header Upgrade $http_upgrade;</span>
<span class="line">            proxy_set_header Connection &quot;upgrade&quot;;</span>
<span class="line">            proxy_set_header Host $host;</span>
<span class="line">            proxy_set_header X-Forwarded-For $remote_addr;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="https配置" tabindex="-1"><a class="header-anchor" href="#https配置"><span>HTTPS配置</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">server {</span>
<span class="line">    listen 80;</span>
<span class="line">    server_name demo.jumpserver.org;  # 自行修改成你的域名</span>
<span class="line">    return 301 https://$server_name$request_uri;</span>
<span class="line">}</span>
<span class="line">server {</span>
<span class="line">    listen 443 ssl http2;</span>
<span class="line">    server_name          demo.jumpserver.org;  # 自行修改成你的域名</span>
<span class="line">    ssl_certificate      sslkey/1_jumpserver.org_bundle.crt;  # 自行设置证书</span>
<span class="line">    ssl_certificate_key  sslkey/2_jumpserver.org_bundle.key;  # 自行设置证书</span>
<span class="line">    ssl_session_timeout 1d;</span>
<span class="line">    ssl_session_cache shared:MozSSL:10m;</span>
<span class="line">    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;</span>
<span class="line">    ssl_prefer_server_ciphers off;</span>
<span class="line">    ssl_protocols TLSv1.1 TLSv1.2;</span>
<span class="line">    add_header Strict-Transport-Security &quot;max-age=63072000&quot; always;</span>
<span class="line"></span>
<span class="line">    client_max_body_size 4096m;  # 录像及文件上传大小限制</span>
<span class="line">    location / {</span>
<span class="line">        # 这里的 ip 是后端 JumpServer nginx 的 ip</span>
<span class="line">        proxy_pass http://192.168.244.144;</span>
<span class="line">        proxy_http_version 1.1;</span>
<span class="line">        proxy_buffering off;</span>
<span class="line">        proxy_request_buffering off;</span>
<span class="line">        proxy_set_header Upgrade $http_upgrade;</span>
<span class="line">        proxy_set_header Connection &quot;upgrade&quot;;</span>
<span class="line">        proxy_set_header Host $host;</span>
<span class="line">        proxy_set_header X-Forwarded-For $remote_addr;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用域名登录" tabindex="-1"><a class="header-anchor" href="#使用域名登录"><span>使用域名登录</span></a></h3><p><img src="https://imgoss.xgss.net/picgo/image-20230829095901953.png?aliyun" alt="image-20230829095901953"></p>`,36)]))}const t=e(l,[["render",r]]),c=JSON.parse('{"path":"/kaiyuan/jumpserver/1.JumpServer%E6%98%AF%E4%BB%80%E4%B9%88%E5%A6%82%E4%BD%95%E5%AE%89%E8%A3%85JumpServer.html","title":"JumpServer 是什么，安装JumpServer","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"kaiyuan/jumpserver/1.JumpServer是什么如何安装JumpServer.md"}');export{t as comp,c as data};
