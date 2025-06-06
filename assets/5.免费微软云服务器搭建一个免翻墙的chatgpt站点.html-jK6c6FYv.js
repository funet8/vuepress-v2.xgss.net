import{_ as n,c as a,b as e,o as i}from"./app-BEL8OELx.js";const l={};function p(d,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="免费微软云服务器搭建一个免翻墙的chatgpt站点-不能用了" tabindex="-1"><a class="header-anchor" href="#免费微软云服务器搭建一个免翻墙的chatgpt站点-不能用了"><span>免费微软云服务器搭建一个免翻墙的chatgpt站点(不能用了)</span></a></h1><h2 id="前提条件" tabindex="-1"><a class="header-anchor" href="#前提条件"><span>前提条件</span></a></h2><ol><li>注册微软帐号（直接在官网注册）</li><li>微软云服务器的美国节点云服务器</li><li>域名，最好是 com后缀的</li><li>chatgpt账号</li><li>chatgpt的API</li></ol><p>上两篇文章我们已经有了，微软云的美国服务器和域名，本篇文章教大家免费微软云服务器搭建一个免翻墙的chatgpt站点。</p><h2 id="获取openai-api-密钥" tabindex="-1"><a class="header-anchor" href="#获取openai-api-密钥"><span>获取OpenAI API 密钥</span></a></h2><p>OpenAi Keys 申请：https://beta.openai.com/account/api-keys</p><p><img src="https://imgoss.xgss.net/picgo/image-20230525152738913.png?aliyun" alt="image-20230525152738913"></p><p>在这里，单击“创建新密钥”并复制 API 密钥。请注意，您以后无法复制或查看整个 API 密钥。因此强烈建议立即将 API 密钥复制并粘贴到记事本文件中。</p><p>另外，不要公开分享或展示 API 密钥。这是一个私钥，仅用于访问您的帐户。您还可以删除 API 密钥并创建多个私钥（最多五个）。</p><p>5美元 ，有效期：3个月</p><h2 id="远程连接云服务器" tabindex="-1"><a class="header-anchor" href="#远程连接云服务器"><span>远程连接云服务器</span></a></h2><h2 id="安装docker" tabindex="-1"><a class="header-anchor" href="#安装docker"><span>安装docker</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">#CentOS 7、Debian、Ubuntu</span>
<span class="line"></span>
<span class="line">$ sudo su root</span>
<span class="line"># curl -sSL https://get.docker.com/ | sh</span>
<span class="line"></span>
<span class="line"># systemctl start docker</span>
<span class="line"># systemctl enable docker.service</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="启动docker" tabindex="-1"><a class="header-anchor" href="#启动docker"><span>启动docker</span></a></h2><p>开源项目：https://github.com/Chanzhaoyu/chatgpt-web</p><p>开源代理：https://github.com/geekr-dev/openai-proxy</p><h1 id="chatgpt-web" tabindex="-1"><a class="header-anchor" href="#chatgpt-web"><span>chatgpt-web</span></a></h1><h2 id="使用openai-api-key" tabindex="-1"><a class="header-anchor" href="#使用openai-api-key"><span>使用OpenAI API KEY</span></a></h2><p>已经无法使用</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">ChatGPT error 429: {&quot;detail&quot;:&quot;It is recommended to upgrade to the latest PandoraNext: https://github.com/pandora-next/deploy&quot;}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>这里要将OPENAI_API_KEY换成你的。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># docker run -itd --name chatgpt-web \\</span>
<span class="line">--restart always \\</span>
<span class="line">-p 3002:3002 \\</span>
<span class="line">--env OPENAI_API_KEY=&lt;chatgpt-api-key&gt; \\</span>
<span class="line">chenzhaoyu94/chatgpt-web</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用-openai的-openai-access-token-免费" tabindex="-1"><a class="header-anchor" href="#使用-openai的-openai-access-token-免费"><span>使用 OpenAI的 OPENAI_ACCESS_TOKEN（免费）</span></a></h2><p>浏览器访问： https://chat.openai.com/api/auth/session</p><p>如图复制 &quot;accessToken&quot;:&quot;这里是你的accessToken&quot; ，后面的引号内的所有字符。</p><p>会有过期时间，通常是1个月，一个月之后要更换accessToken。</p><p><img src="https://imgoss.xgss.net/picgo/image-20230725142907015.png?aliyun" alt="image-20230725142907015"></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker run -itd --name chatgpt-web \\</span>
<span class="line">--restart always \\</span>
<span class="line">-p 3002:3002 \\</span>
<span class="line">--env OPENAI_ACCESS_TOKEN=&#39;替换成你的accessToken&#39;  chenzhaoyu94/chatgpt-web</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置nginx" tabindex="-1"><a class="header-anchor" href="#配置nginx"><span>配置nginx</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">配置nginx</span>
<span class="line"># vim /etc/nginx/conf.d/chat.chuanqu.ltd.conf</span>
<span class="line">按键盘的 &#39;a&#39; 将下面的配置填写</span>
<span class="line">server {</span>
<span class="line">        listen       80;</span>
<span class="line">        server_name  chat.chuanqu.ltd;</span>
<span class="line">        #root /path/;</span>
<span class="line">        access_log /dev/null;</span>
<span class="line">        error_log /dev/null;</span>
<span class="line"></span>
<span class="line">        location / {</span>
<span class="line">                #配置nginx密码</span>
<span class="line">				#auth_basic &quot;Please input password&quot;; #这里是验证时的提示信息</span>
<span class="line">                #auth_basic_user_file /etc/nginx/conf.d/htpasswd; # 密码的路径</span>
<span class="line"></span>
<span class="line">                index index.php index.html;</span>
<span class="line">                proxy_pass      http://127.0.0.1:3002;</span>
<span class="line">                proxy_redirect off;</span>
<span class="line">                proxy_set_header Host $host;</span>
<span class="line">                proxy_set_header X-Real-IP $remote_addr;</span>
<span class="line">                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span>
<span class="line"></span>
<span class="line">        }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">按键盘的 &#39;:wq&#39; 保存退出</span>
<span class="line"></span>
<span class="line">查看配置是否正确：</span>
<span class="line"># nginx -t </span>
<span class="line"></span>
<span class="line">重启nginx服务：</span>
<span class="line"># systemctl restart nginx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="域名解析" tabindex="-1"><a class="header-anchor" href="#域名解析"><span>域名解析</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/image-20230525153649693.png?aliyun" alt="image-20230525153649693"></p><h2 id="访问" tabindex="-1"><a class="header-anchor" href="#访问"><span>访问</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/image-20230525153730548.png?aliyun" alt="image-20230525153730548"></p><h2 id="ubuntu-配置nginx验证密码-非必须" tabindex="-1"><a class="header-anchor" href="#ubuntu-配置nginx验证密码-非必须"><span>ubuntu 配置nginx验证密码（非必须）</span></a></h2><p>如果没有验证，任何人只要知道你的地址就可以使用</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># apt-get install apache2-utils</span>
<span class="line"></span>
<span class="line"># htpasswd -c /etc/nginx/conf.d/htpasswd admin</span>
<span class="line">New password:   (输入你的密码)</span>
<span class="line">Re-type new password: (重复输入你的密码)</span>
<span class="line">Adding password for user admin</span>
<span class="line"># cat /etc/nginx/conf.d/htpasswd</span>
<span class="line"></span>
<span class="line">#在nginx配置下新增下面两行</span>
<span class="line">auth_basic &quot;Please input password&quot;; #这里是验证时的提示信息</span>
<span class="line">auth_basic_user_file /etc/nginx/conf.d/htpasswd; # 密码的路径</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"># nginx -t</span>
<span class="line"># systemctl restart nginx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次访问则需要输入密码</p><h1 id="更新密钥" tabindex="-1"><a class="header-anchor" href="#更新密钥"><span>更新密钥</span></a></h1><h2 id="更新-openai-access-token" tabindex="-1"><a class="header-anchor" href="#更新-openai-access-token"><span>更新 OPENAI_ACCESS_TOKEN</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># docker rm -f chatgpt-web</span>
<span class="line"></span>
<span class="line"># OPENAI_ACCESS_TOKEN=&#39;网页获取获取到的KEY&#39; # https://chat.openai.com/api/auth/session</span>
<span class="line"></span>
<span class="line"># docker run -itd --name chatgpt-web --restart always -p 3002:3002 --env OPENAI_ACCESS_TOKEN=&quot;\${OPENAI_ACCESS_TOKEN}&quot;  chenzhaoyu94/chatgpt-web</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>chatgpt的accessToken有效期是多久？ 30天</p><h2 id="更新openai-api-key" tabindex="-1"><a class="header-anchor" href="#更新openai-api-key"><span>更新OPENAI_API_KEY</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span>
<span class="line"># docker rm -f chatgpt-web</span>
<span class="line"></span>
<span class="line">https://platform.openai.com/account/api-keys ，上面页面获得的 OPENAI_API_KEY</span>
<span class="line"></span>
<span class="line"># OPENAI_API_KEY=&quot;获得的密钥&quot;</span>
<span class="line"></span>
<span class="line"># docker run -itd --name chatgpt-web --restart always -p 3002:3002 --env OPENAI_API_KEY=&quot;\${OPENAI_API_KEY}&quot; chenzhaoyu94/chatgpt-web</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_2023-11-22更新" tabindex="-1"><a class="header-anchor" href="#_2023-11-22更新"><span>2023-11-22更新</span></a></h1><p><img src="https://imgoss.xgss.net/picgo/image-20231122155658720.png?aliyun" alt="image-20231122155658720"></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">ChatGPT error 429: {&quot;detail&quot;:&quot;It is recommended to upgrade to the latest PandoraNext: https://github.com/pandora-next/deploy&quot;}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="获取-jwt-token" tabindex="-1"><a class="header-anchor" href="#获取-jwt-token"><span>获取 JWT Token</span></a></h2><p>将获取到的<code>JWT Token</code>内容写进同目录的<a href="https://github.com/pandora-next/deploy#%E5%85%B3%E4%BA%8E-licensejwt%E6%96%87%E4%BB%B6" target="_blank" rel="noopener noreferrer">license.jwt</a>文件中。</p><p>https://github.com/pandora-next/deploy#%E5%85%B3%E4%BA%8E-licensejwt%E6%96%87%E4%BB%B6</p><p><img src="https://imgoss.xgss.net/picgo/image-20231122160140192.png?aliyun" alt="image-20231122160140192"></p><p><img src="https://imgoss.xgss.net/picgo/image-20231122160221477.png?aliyun" alt="image-20231122160221477"></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">在需要授权的服务器上，执行以下命令获取授权：</span>
<span class="line"># curl -fLO &quot;https://dash.pandoranext.com/data/XXXXX/license.jwt&quot;</span>
<span class="line"># cat license.jwt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20231122160417171.png?aliyun" alt="image-20231122160417171"></p><h2 id="执行docker" tabindex="-1"><a class="header-anchor" href="#执行docker"><span>执行docker</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ docker pull pengzhile/pandora-next</span>
<span class="line">$ PANDORA_NEXT_LICENSE=\`cat license.jwt\`</span>
<span class="line">$ echo $PANDORA_NEXT_LICENSE</span>
<span class="line">$ docker run -d --restart always --name PandoraNext --net=bridge -p 8181:8181 \\</span>
<span class="line">             -e PANDORA_NEXT_LICENSE=&quot;$PANDORA_NEXT_LICENSE&quot; pengzhile/pandora-next</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">容器内默认监听8181端口，映射宿主机的8181端口，可自行修改。</span>
<span class="line">你可以映射目录到容器内的/data目录，config.json、tokens.json和license.jwt放在其中。</span>
<span class="line">自行使用真实的JWT Token替换命令中的&lt;JWT Token&gt;，没有&lt;和&gt;，不要搞错。</span>
<span class="line"></span>
<span class="line">$ docker ps</span>
<span class="line">CONTAINER ID   IMAGE                      COMMAND                  CREATED         STATUS         PORTS                                       NAMES</span>
<span class="line">d72ef7e4986d   pengzhile/pandora-next     &quot;/opt/app/entrypoint…&quot;   5 seconds ago   Up 2 seconds   0.0.0.0:8181-&gt;8181/tcp, :::8181-&gt;8181/tcp   PandoraNext</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="配置nginx-1" tabindex="-1"><a class="header-anchor" href="#配置nginx-1"><span>配置nginx</span></a></h1><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">server {</span>
<span class="line">        listen       80;</span>
<span class="line">        server_name  chat.xgss.net;</span>
<span class="line">        #root /path/;</span>
<span class="line">        access_log /dev/null;</span>
<span class="line">        error_log /dev/null;</span>
<span class="line"></span>
<span class="line">        location / {</span>
<span class="line">                #配置nginx密码</span>
<span class="line">                auth_basic &quot;Please input password&quot;; #这里是验证时的提示信息</span>
<span class="line">                auth_basic_user_file /etc/nginx/conf.d/htpasswd; # 密码的路径</span>
<span class="line"></span>
<span class="line">                index index.php index.html;</span>
<span class="line">                proxy_pass      http://127.0.0.1:8181;</span>
<span class="line">                proxy_redirect off;</span>
<span class="line">                proxy_set_header Host $host;</span>
<span class="line">                proxy_set_header X-Real-IP $remote_addr;</span>
<span class="line">                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span>
<span class="line"></span>
<span class="line">        }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="显示页面" tabindex="-1"><a class="header-anchor" href="#显示页面"><span>显示页面</span></a></h1><p><img src="https://imgoss.xgss.net/picgo/image-20231122161116937.png?aliyun" alt="image-20231122161116937"></p><h1 id="_2024年-5月30日更新" tabindex="-1"><a class="header-anchor" href="#_2024年-5月30日更新"><span>2024年 5月30日更新</span></a></h1>`,61)]))}const c=n(l,[["render",p]]),r=JSON.parse('{"path":"/chatgpt/5.%E5%85%8D%E8%B4%B9%E5%BE%AE%E8%BD%AF%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%90%AD%E5%BB%BA%E4%B8%80%E4%B8%AA%E5%85%8D%E7%BF%BB%E5%A2%99%E7%9A%84chatgpt%E7%AB%99%E7%82%B9.html","title":"免费微软云服务器搭建一个免翻墙的chatgpt站点(不能用了)","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"chatgpt/5.免费微软云服务器搭建一个免翻墙的chatgpt站点.md"}');export{c as comp,r as data};
