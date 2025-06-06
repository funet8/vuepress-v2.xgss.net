import{_ as a,c as n,b as e,o as i}from"./app-BEL8OELx.js";const r={};function l(p,s){return i(),n("div",null,s[0]||(s[0]=[e(`<h1 id="超简单的个人精美导航网站搭建-homarr" tabindex="-1"><a class="header-anchor" href="#超简单的个人精美导航网站搭建-homarr"><span>超简单的个人精美导航网站搭建-Homarr</span></a></h1><p>Homarr 是一个简单轻量级的服务器主页，通过可定制的浏览器主页与您的家庭服务器的 Docker 容器（即 Sonarr/Radarr ）进行交互，可帮助您在一个地方轻松访问所有服务。</p><p>Homarr是一个 顺滑、 现代化 的面板，它把你所有的应用和服务汇于指尖。有了Homarr，你可以在一个页面访问和控制一切。Homarr与你添加的应用无缝交互，为你提供有价值的信息并由你完全把控。安装Homarr轻松简单，并且支持多种部署方式。</p><p>官网： https://homarr.dev/</p><p>开源地址： https://github.com/ajnart/homarr</p><p><img src="https://imgoss.xgss.net/picgo/image-20230423095038710.png?aliyun" alt="image-20230423095038710"></p><h2 id="官方安装教程" tabindex="-1"><a class="header-anchor" href="#官方安装教程"><span><a href="https://homarr.dev/docs/introduction/installation#installation" target="_blank" rel="noopener noreferrer">官方安装教程</a></span></a></h2><p>https://homarr.dev/docs/introduction/installation#installation</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker run  \\</span>
<span class="line">  --name homarr \\</span>
<span class="line">  --restart unless-stopped \\</span>
<span class="line">  -p 7575:7575 \\</span>
<span class="line">  -v &lt;your-path&gt;/homarr/configs:/app/data/configs \\</span>
<span class="line">  -v &lt;your-path&gt;/homarr/icons:/app/public/icons \\</span>
<span class="line">  -d ghcr.io/ajnart/homarr:latest</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际操作</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># mkdir -p  /data/docker/homarr/configs /data/docker/homarr/icons</span>
<span class="line"># docker run  \\</span>
<span class="line">  --name homarr \\</span>
<span class="line">  --restart unless-stopped \\</span>
<span class="line">  -p 7575:7575 \\</span>
<span class="line">  -v /data/docker/homarr/configs:/app/data/configs \\</span>
<span class="line">  -v /data/docker/homarr/icons:/app/public/icons \\</span>
<span class="line">  -d ghcr.io/ajnart/homarr:latest</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器访问：浏览器访问IP+端口，笔者是http://192.168.1.8:7575</p><h2 id="nginx配置站点-可不操作" tabindex="-1"><a class="header-anchor" href="#nginx配置站点-可不操作"><span>Nginx配置站点（可不操作）</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">server {</span>
<span class="line">        listen       80;</span>
<span class="line">        server_name  nav.XXX.ltd; #改成你的域名</span>
<span class="line">        #root /data/wwwroot/web/;</span>
<span class="line">        access_log /data/wwwroot/log/nav.XXX.ltd-access.log main_aliyun;</span>
<span class="line">        error_log /dev/null;</span>
<span class="line"></span>
<span class="line">        location / {</span>
<span class="line">                index index.php index.html;</span>
<span class="line">                proxy_pass      http://192.168.1.8:7575;</span>
<span class="line">                proxy_redirect off;</span>
<span class="line">                proxy_set_header Host $host;</span>
<span class="line">                proxy_set_header X-Real-IP $remote_addr;</span>
<span class="line">                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span>
<span class="line"></span>
<span class="line">        }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用nav.XXX.ltd域名即可访问</p><h1 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法"><span>使用方法</span></a></h1><h2 id="_1-修改导航标题等" tabindex="-1"><a class="header-anchor" href="#_1-修改导航标题等"><span>1.修改导航标题等</span></a></h2><p>设置---&gt;个性化---&gt;页面元数据</p><p>如图修改站点标题等信息</p><p><img src="https://imgoss.xgss.net/picgo/image-20230423105623963.png?aliyun" alt="image-20230423105623963"></p><h2 id="_2-搜索改为百度" tabindex="-1"><a class="header-anchor" href="#_2-搜索改为百度"><span>2.搜索改为百度</span></a></h2><p>设置---&gt;常规---&gt;Custom</p><p><img src="https://imgoss.xgss.net/picgo/image-20230423105856042.png?aliyun" alt="image-20230423105856042"></p><p>https://google.com/search?q= 改为 https://www.baidu.com/s?wd= 右上角的搜索框就会用百度搜索。</p><p><img src="https://imgoss.xgss.net/picgo/image-20230423105920976.png?aliyun" alt="image-20230423105920976"></p><h2 id="_3-备份还原配置" tabindex="-1"><a class="header-anchor" href="#_3-备份还原配置"><span>3.备份还原配置</span></a></h2><p>设置---&gt;常规</p><p>1.下载配置</p><p>2.删除配置</p><p>3.保存一份配置</p><p><img src="https://imgoss.xgss.net/picgo/image-20230423112840673.png?aliyun" alt="image-20230423112840673"></p><h2 id="_4-docker整合" tabindex="-1"><a class="header-anchor" href="#_4-docker整合"><span>4.Docker整合</span></a></h2><p>后台设置有个“启用docker集成”，打开之后会</p><p><img src="https://imgoss.xgss.net/picgo/image-20230423112132284.png?aliyun" alt="image-20230423112132284"></p><p>打开之后会报错“你是不是忘了挂载docker socket”</p><p><img src="https://imgoss.xgss.net/picgo/image-20230423112050551.png?aliyun" alt="image-20230423112050551"></p><h3 id="重新构建docker" tabindex="-1"><a class="header-anchor" href="#重新构建docker"><span>重新构建docker</span></a></h3><p>操作前一定要备份你的配置</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># docker cp homarr:/app/public/imgs /data/docker/homarr/imgs 将</span>
<span class="line"># docker rm -f homarr  # 删除homarr </span>
<span class="line"></span>
<span class="line">docker run  \\</span>
<span class="line">  --name homarr \\</span>
<span class="line">  --restart unless-stopped \\</span>
<span class="line">  -p 7575:7575 \\</span>
<span class="line">  -v /var/run/docker.sock:/var/run/docker.sock \\</span>
<span class="line">  -v /data/docker/homarr/configs:/app/data/configs \\</span>
<span class="line">  -v /data/docker/homarr/icons:/app/public/icons \\</span>
<span class="line">  -v /data/docker/homarr/imgs:/app/public/imgs \\</span>
<span class="line">  -d ghcr.io/ajnart/homarr:latest</span>
<span class="line"> </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动之后，就可以看到本机运行的所有docker容器了。</p><p><img src="https://imgoss.xgss.net/picgo/image-20230423132831204.png?aliyun" alt="image-20230423132831204"></p><h2 id="外链ico图片" tabindex="-1"><a class="header-anchor" href="#外链ico图片"><span>外链ico图片</span></a></h2><p>https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/</p><p>点击链接选择外链图片。</p><p><img src="https://imgoss.xgss.net/picgo/image-20230423150646624.png?aliyun" alt="image-20230423150646624"></p>`,45)]))}const d=a(r,[["render",l]]),t=JSON.parse('{"path":"/kaiyuan/Open-Source-Software/homarr.html","title":"超简单的个人精美导航网站搭建-Homarr","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"kaiyuan/Open-Source-Software/homarr.md"}');export{d as comp,t as data};
