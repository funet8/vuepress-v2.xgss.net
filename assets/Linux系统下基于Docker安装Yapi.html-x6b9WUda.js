import{_ as n,c as a,b as e,o as i}from"./app-BEL8OELx.js";const l={};function d(r,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="两种方法教你如何在linux系统中安装yapi" tabindex="-1"><a class="header-anchor" href="#两种方法教你如何在linux系统中安装yapi"><span>两种方法教你如何在Linux系统中安装Yapi</span></a></h1><p>大家好，我是星哥，这篇文章讲介绍两种方法教你如何在Linux系统中安装Yapi，并且使用nginx反向代理。</p><h1 id="什么是yapi" tabindex="-1"><a class="header-anchor" href="#什么是yapi"><span>什么是Yapi</span></a></h1><p>YApi 是高效、易用、功能强大的 api 管理平台，旨在为开发、产品、测试人员提供更优雅的接口管理服务。可以帮助开发者轻松创建、发布、维护，YApi 还为用户提供了优秀的交互体验，开发人员只需利用平台提供的接口数据写入工具以及简单的点击操作就可以实现接口的管理。</p><h1 id="yapi-的特性" tabindex="-1"><a class="header-anchor" href="#yapi-的特性"><span>YApi 的特性</span></a></h1><ul><li><strong>权限管理：</strong> YApi 拥有比较成熟的团队管理扁平化项目权限配置，它可以满足各类企业的需求</li><li><strong>可视化接口管理：</strong> 使用 websocket 技术开发的多人协作接口编辑功能，让多人协作 成倍提升开发效率</li><li><strong>Mock Server：</strong> 简单快捷的 Mock Server 应用， mock 数据的生成非常方便</li><li><strong>自动化测试：</strong> 比较完善的接口自动化测试,保证数据的正确性</li><li><strong>数据导入：</strong> 支持导入 Swagger, Postman, Har 数据格式，方便迁移旧项目</li><li><strong>插件机制：</strong> 比较强大的插件机制，它可以满足各类业务需求</li></ul><p><img src="https://imgoss.xgss.net/picgo/image-20230208145718401.png?aliyun" alt="image-20230208145718401"></p><h2 id="官方文档" tabindex="-1"><a class="header-anchor" href="#官方文档"><span>官方文档</span></a></h2><p>开源地址： https://github.com/YMFE/yapi</p><h1 id="centos7-下基于docker安装yapi" tabindex="-1"><a class="header-anchor" href="#centos7-下基于docker安装yapi"><span>Centos7 下基于docker安装Yapi</span></a></h1><h2 id="一、安装docker" tabindex="-1"><a class="header-anchor" href="#一、安装docker"><span>一、安装Docker</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">yum install  docker</span>
<span class="line">systemctl start docker</span>
<span class="line">systemctl enable docker</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、安装并配置mongo" tabindex="-1"><a class="header-anchor" href="#二、安装并配置mongo"><span>二、安装并配置Mongo</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># mkdir -p /data/docker/mongo</span>
<span class="line"># cd  /data/docker/mongo</span>
<span class="line"># mkdir db</span>
<span class="line"># vim mongo.conf</span>
<span class="line">填写一下内容，保存：</span>
<span class="line">systemLog:</span>
<span class="line">  destination: file</span>
<span class="line">  path: /var/log/mongodb/mongod.log</span>
<span class="line">  logAppend: true</span>
<span class="line">storage:</span>
<span class="line">  dbPath: /data/db</span>
<span class="line">net:</span>
<span class="line">  port: 27017</span>
<span class="line">  bindIp: 0.0.0.0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>docker启动mongo</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># docker run -itd \\</span>
<span class="line">-p 27017:27017 \\</span>
<span class="line">--name yapi-mongodb \\</span>
<span class="line">--restart always \\</span>
<span class="line">-v /data/docker/mongo/db:/data/db \\</span>
<span class="line">-v /data/docker/mongo/mongo.conf:/data/mongo.conf \\</span>
<span class="line">-e TZ=Asia/Shanghai mongo:4.0.4</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、初始化-yapi-数据库索引及管理员账号" tabindex="-1"><a class="header-anchor" href="#三、初始化-yapi-数据库索引及管理员账号"><span>三、初始化 Yapi 数据库索引及管理员账号</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># docker run -it --rm  \\</span>
<span class="line">--link yapi-mongodb:mongo  \\</span>
<span class="line">--entrypoint npm  \\</span>
<span class="line">--workdir /api/vendors  registry.cn-hangzhou.aliyuncs.com/anoy/yapi  run install-server</span>
<span class="line"></span>
<span class="line">&gt; yapi-vendor@1.8.5 install-server /api/vendors</span>
<span class="line">&gt;  node server/install.js</span>
<span class="line">log: mongodb load success...</span>
<span class="line">初始化管理员账号成功,账号名：&quot;admin@admin.com&quot;，密码：&quot;ymfe.org&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、启动-yapi-服务" tabindex="-1"><a class="header-anchor" href="#四、启动-yapi-服务"><span>四、启动 Yapi 服务</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># docker run -d  --name yapi  \\</span>
<span class="line"> --restart always \\</span>
<span class="line">--link yapi-mongodb:mongo  \\</span>
<span class="line">--workdir /api/vendors  \\</span>
<span class="line">-p 3000:3000  registry.cn-hangzhou.aliyuncs.com/anoy/yapi  server/app.js</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问 http://localhost:3000</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">登录账号: admin@admin.com</span>
<span class="line">密码: ymfe.org</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20230208152434166.png?aliyun" alt="image-20230208152434166"></p><p>至此，Yapi基于Docker环境安装完成，就可以使用了</p><h1 id="使用npm安装" tabindex="-1"><a class="header-anchor" href="#使用npm安装"><span>使用npm安装</span></a></h1><h2 id="环境准备" tabindex="-1"><a class="header-anchor" href="#环境准备"><span>环境准备</span></a></h2><p>在开始安装之前，请确保您的Linux系统已经安装了以下软件：</p><ul><li><strong>Node.js:</strong> Yapi是基于Node.js开发的，所以需要先安装Node.js。</li><li><strong>MongoDB:</strong> Yapi使用MongoDB作为数据库。</li></ul><h2 id="_1-安装npm" tabindex="-1"><a class="header-anchor" href="#_1-安装npm"><span>1.安装npm</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">npm install -g yarn</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="_2-克隆yapi项目" tabindex="-1"><a class="header-anchor" href="#_2-克隆yapi项目"><span>2.克隆Yapi项目</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">git clone https://github.com/YMFE/yapi.git</span>
<span class="line">cd yapi</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-安装依赖" tabindex="-1"><a class="header-anchor" href="#_3-安装依赖"><span>3.安装依赖:</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">yarn</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="_4-启动yapi" tabindex="-1"><a class="header-anchor" href="#_4-启动yapi"><span>4.启动Yapi:</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">yarn start</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h1 id="nginx反向代理" tabindex="-1"><a class="header-anchor" href="#nginx反向代理"><span>Nginx反向代理</span></a></h1><p>这步操作主要是用域名便于记忆，不用记 192.168.1.3:3000 的IP来访问。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">server {</span>
<span class="line">        listen       80;</span>
<span class="line">        server_name  yapi.XXX.com;</span>
<span class="line">        #root /path/;</span>
<span class="line">        access_log /data/wwwroot/log/yapi.XXX.com-access.log;</span>
<span class="line">        error_log off;</span>
<span class="line"></span>
<span class="line">        location / {</span>
<span class="line">                index index.php index.html;</span>
<span class="line">                proxy_pass      http://192.168.1.3:3000;</span>
<span class="line">                proxy_redirect off;</span>
<span class="line">                proxy_set_header Host $host;</span>
<span class="line">                proxy_set_header X-Real-IP $remote_addr;</span>
<span class="line">                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span>
<span class="line"></span>
<span class="line">        }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="结尾" tabindex="-1"><a class="header-anchor" href="#结尾"><span>结尾</span></a></h1><p>综上所述，Yapi作为一款功能强大的接口管理平台，在提高开发效率、保证接口质量方面具有显著优势。</p>`,41)]))}const c=n(l,[["render",d]]),t=JSON.parse('{"path":"/devops/Linux%E7%B3%BB%E7%BB%9F%E4%B8%8B%E5%9F%BA%E4%BA%8EDocker%E5%AE%89%E8%A3%85Yapi.html","title":"两种方法教你如何在Linux系统中安装Yapi","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"devops/Linux系统下基于Docker安装Yapi.md"}');export{c as comp,t as data};
