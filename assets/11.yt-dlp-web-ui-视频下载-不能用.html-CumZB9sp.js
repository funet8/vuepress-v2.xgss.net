import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as e}from"./app-CkVikb64.js";const l={};function p(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h1 id="【不能用】docker部署一个自托管视频下载器yt-dlp-web-ui" tabindex="-1"><a class="header-anchor" href="#【不能用】docker部署一个自托管视频下载器yt-dlp-web-ui"><span>【不能用】Docker部署一个自托管视频下载器yt-dlp-web-ui</span></a></h1><p>亲测不能用</p><p>https://mp.weixin.qq.com/s/CZgBHukikqleBWm_vqDPfQ</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>Unexpected Application Error!</span></span>
<span class="line"><span>Failed to fetch dynamically imported module: http://43.153.81.97:3033/assets/Login-Bt0YPe_A.js</span></span>
<span class="line"><span>TypeError: Failed to fetch dynamically imported module: http://43.153.81.97:3033/assets/Login-Bt0YPe_A.js</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="yt-dlp" tabindex="-1"><a class="header-anchor" href="#yt-dlp"><span>yt-dlp</span></a></h2><p>https://github.com/yt-dlp/yt-dlp</p><h2 id="yt-dlp-web-ui" tabindex="-1"><a class="header-anchor" href="#yt-dlp-web-ui"><span>yt-dlp-web-ui</span></a></h2><p>https://github.com/marcopiovanello/yt-dlp-web-ui</p><p>创建一个目录，并进入此目录</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>mkdir -p /data/docker/yt-dlp-webui</span></span>
<span class="line"><span>cd /data/docker/yt-dlp-webui</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span></span></span>
<span class="line"><span>vim docker-compose.yml</span></span>
<span class="line"><span>报错</span></span>
<span class="line"><span>services:</span></span>
<span class="line"><span>  ytdlp-webui:</span></span>
<span class="line"><span>    image: marcobaobao/yt-dlp-webui  # 使用的镜像</span></span>
<span class="line"><span>    container_name: ytdlp-webui  # 容器名称</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &quot;3033:3033&quot;  # 映射端口 3033</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      - JWT_SECRET=randomsecret  # 设置 JWT 密钥，用于生成和验证 token</span></span>
<span class="line"><span>      - TZ=Asia/Shanghai  # 设置容器的时区为上海时区</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - /data/docker/yt-dlp-webui/downloads:/downloads  # 映射本地的下载目录</span></span>
<span class="line"><span>    command: --auth --user admin --pass admin123 --qs 5  # 启用身份验证，设置用户名和密码，并限制并发为 5</span></span>
<span class="line"><span>    healthcheck:</span></span>
<span class="line"><span>      test: [&quot;CMD&quot;, &quot;curl&quot;, &quot;-f&quot;, &quot;http://localhost:3033&quot;]  # 健康检查，访问 localhost:3033 判断容器是否正常运行</span></span>
<span class="line"><span>      interval: 30s  # 健康检查的间隔时间</span></span>
<span class="line"><span>      retries: 3  # 健康检查失败后重试次数</span></span>
<span class="line"><span>      start_period: 10s  # 启动后等待 10 秒后开始健康检查</span></span>
<span class="line"><span>      timeout: 10s  # 每次健康检查的超时时间</span></span>
<span class="line"><span>    restart: always  # 容器停止后总是重启</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>报错</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>version: &quot;3.8&quot;</span></span>
<span class="line"><span>services:</span></span>
<span class="line"><span>  yt-dlp-webui:</span></span>
<span class="line"><span>    image: marcobaobao/yt-dlp-webui:latest</span></span>
<span class="line"><span>    container_name: yt-dlp-webui</span></span>
<span class="line"><span>    restart: unless-stopped</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &quot;3033:3033&quot;   # WebUI 访问端口</span></span>
<span class="line"><span>      - &quot;3918:3000&quot;   # RPC 或备用端口</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - ./downloads:/downloads</span></span>
<span class="line"><span>      - ./config:/config</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      - AUTH_SECRET=c7f9a1d4e2b6f0a8c3d9e7b1f4a2c8d6e0b5f7c1a9d3e8f2b4c6d0a7 #随机生成的40位字符串</span></span>
<span class="line"><span>      - CREDENTIAL_USERNAME=admin</span></span>
<span class="line"><span>      - CREDENTIAL_PASSWORD=yourpassword</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>docker-compose up -d #运行容器</span></span>
<span class="line"><span>docker-compose ps  #查看是否开启成功</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker-compose stop</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>无法下载</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>docker run -d \\</span></span>
<span class="line"><span>--restart always \\</span></span>
<span class="line"><span>--name yt-dlp-web \\</span></span>
<span class="line"><span>--user 1000:1000 \\</span></span>
<span class="line"><span>--restart unless-stopped \\</span></span>
<span class="line"><span>-p 3918:3000 \\</span></span>
<span class="line"><span>-p 3033:3033 \\</span></span>
<span class="line"><span>-v /data/docker/yt-dlp-webui/downloads:/downloads \\</span></span>
<span class="line"><span>-v /data/docker/yt-dlp-webui/config:/config \\</span></span>
<span class="line"><span>marcobaobao/yt-dlp-webui</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16)]))}const t=n(l,[["render",p]]),o=JSON.parse('{"path":"/kaiyuan2/11.yt-dlp-web-ui-%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD-%E4%B8%8D%E8%83%BD%E7%94%A8.html","title":"【不能用】Docker部署一个自托管视频下载器yt-dlp-web-ui","lang":"en-US","frontmatter":{},"git":{"createdTime":1761637265000,"updatedTime":1767924197000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":2,"url":"https://github.com/star"}]},"readingTime":{"minutes":1.33,"words":400},"filePathRelative":"kaiyuan2/11.yt-dlp-web-ui-视频下载-不能用.md"}');export{t as comp,o as data};
