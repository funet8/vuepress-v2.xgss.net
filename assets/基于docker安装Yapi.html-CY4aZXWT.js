import{_ as n,c as a,b as e,o as i}from"./app-BEL8OELx.js";const l={};function d(p,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="linux系统下基于docker安装yapi-并且迁移yapi数据" tabindex="-1"><a class="header-anchor" href="#linux系统下基于docker安装yapi-并且迁移yapi数据"><span>Linux系统下基于Docker安装Yapi，并且迁移Yapi数据</span></a></h1><p>本文主要讲四个部分：</p><p>1.什么是Yapi</p><p>2.Centos7 下基于docker安装Yapi</p><p>3.Yapi数据迁移</p><p>4.利用Nginx反向代理</p><h2 id="什么是yapi" tabindex="-1"><a class="header-anchor" href="#什么是yapi"><span>什么是Yapi</span></a></h2><p>YApi 是高效、易用、功能强大的 api 管理平台，旨在为开发、产品、测试人员提供更优雅的接口管理服务。可以帮助开发者轻松创建、发布、维护 API，YApi 还为用户提供了优秀的交互体验，开发人员只需利用平台提供的接口数据写入工具以及简单的点击操作就可以实现接口的管理。</p><p><img src="https://imgoss.xgss.net/picgo/image-20230208145718401.png?aliyun" alt="image-20230208145718401"></p><h3 id="_1-权限管理" tabindex="-1"><a class="header-anchor" href="#_1-权限管理"><span>1.权限管理</span></a></h3><p>YApi 成熟的团队管理扁平化项目权限配置满足各类企业的需求</p><h3 id="_2-可视化接口管理" tabindex="-1"><a class="header-anchor" href="#_2-可视化接口管理"><span>2.可视化接口管理</span></a></h3><p>基于 websocket 的多人协作接口编辑功能和类 postman 测试工具，让多人协作成倍提升开发效率</p><h3 id="_3-mock-server" tabindex="-1"><a class="header-anchor" href="#_3-mock-server"><span>3.Mock Server</span></a></h3><p>易用的 Mock Server，再也不用担心 mock 数据的生成了</p><h3 id="_4-自动化测试" tabindex="-1"><a class="header-anchor" href="#_4-自动化测试"><span>4.自动化测试</span></a></h3><p>完善的接口自动化测试,保证数据的正确性</p><h3 id="_5-数据导入" tabindex="-1"><a class="header-anchor" href="#_5-数据导入"><span>5.数据导入</span></a></h3><p>支持导入 swagger, postman, har 数据格式，方便迁移旧项目</p><h3 id="_6-插件机制" tabindex="-1"><a class="header-anchor" href="#_6-插件机制"><span>6.插件机制</span></a></h3><p>强大的插件机制，满足各类业务需求</p><h2 id="官方文档" tabindex="-1"><a class="header-anchor" href="#官方文档"><span>官方文档</span></a></h2><p>http://yapi.smart-xwork.cn/</p><p>Git仓库： https://github.com/YMFE/yapi</p><h1 id="centos7-下基于docker安装yapi" tabindex="-1"><a class="header-anchor" href="#centos7-下基于docker安装yapi"><span>Centos7 下基于docker安装Yapi</span></a></h1><h2 id="一、安装docker" tabindex="-1"><a class="header-anchor" href="#一、安装docker"><span>一、安装Docker</span></a></h2><p>已安装的可忽略</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">yum install  docker</span>
<span class="line">systemctl start docker</span>
<span class="line">systemctl enable docker</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、docker启动配置mongo" tabindex="-1"><a class="header-anchor" href="#二、docker启动配置mongo"><span>二、docker启动配置Mongo</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># mkdir -p /data/docker/mongo</span>
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
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20230208152434166.png?aliyun" alt="image-20230208152434166"></p><p>至此，Yapi基于docker环境安装完成，就可以使用了</p><p>还需要把旧的服务器数据迁移到这个yapi中。</p><h1 id="将旧的yapi项目导入到新的yapi中" tabindex="-1"><a class="header-anchor" href="#将旧的yapi项目导入到新的yapi中"><span>将旧的Yapi项目导入到新的Yapi中</span></a></h1><p>由于旧的服务器快到期了，需要将旧的Yapi的数据导入到新的Yapi中。</p><p>登录旧的服务器</p><h2 id="_1-查看mongodb数据库" tabindex="-1"><a class="header-anchor" href="#_1-查看mongodb数据库"><span>1.查看mongodb数据库</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># mongo</span>
<span class="line">&gt; show dbs</span>
<span class="line">admin   0.000GB</span>
<span class="line">config  0.000GB</span>
<span class="line">local   0.000GB</span>
<span class="line">yapi    0.015GB</span>
<span class="line">&gt; exit</span>
<span class="line">bye</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-导出mongodb数据库" tabindex="-1"><a class="header-anchor" href="#_2-导出mongodb数据库"><span>2.导出mongodb数据库</span></a></h2><h3 id="导出语法" tabindex="-1"><a class="header-anchor" href="#导出语法"><span>导出语法</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># mongodump -h dbhost -d dbname -o dbdirectory</span>
<span class="line">-h MongoDB所在服务器地址，例如本机就是127.0.0.1，还可以指定端口号，如：127.0.0.1:27017</span>
<span class="line">-d 需要备份导出的数据库实例名称</span>
<span class="line">-o 备份导出数据存放的地址。</span>
<span class="line"></span>
<span class="line">例如：</span>
<span class="line">mongodump -h 127.0.0.1:27017 -d yapi -o /root/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际操作，进入到docker中，导出导入数据库。</p><p>新的和旧的服务器要可以联通。否则还是打包文件来操作。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">进入docker环境中：</span>
<span class="line"># docker exec -it yapi-mongodb /bin/bash</span>
<span class="line"></span>
<span class="line">将远程的mongodb导入到新的yapi中。</span>
<span class="line">mongodump -h 192.168.1.21:27017 -d yapi -o yapi192.168.1.21/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-导入mongodb数据库" tabindex="-1"><a class="header-anchor" href="#_3-导入mongodb数据库"><span>3.导入mongodb数据库</span></a></h2><h3 id="导入语法" tabindex="-1"><a class="header-anchor" href="#导入语法"><span>导入语法：</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"># mongorestore -h &lt;hostname&gt;&lt;:port&gt; -d dbname &lt;path&gt;</span>
<span class="line">path    需要导入的数据所在的位置</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际操作</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">如下所示：</span>
<span class="line"></span>
<span class="line"># mongorestore -h 127.0.0.1:27017 -d yapi yapi192.168.1.21/yapi</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-验证" tabindex="-1"><a class="header-anchor" href="#_4-验证"><span>4.验证</span></a></h2><p>数据是否都导入正确。</p><p>从原来的接口数为0现在有3000多，至此迁移成功。</p><p><img src="https://imgoss.xgss.net/picgo/image-20230214193557949.png?aliyun" alt="image-20230214193557949"></p><h1 id="nginx反向代理" tabindex="-1"><a class="header-anchor" href="#nginx反向代理"><span>Nginx反向代理</span></a></h1><p>这步操作主要是用域名便于记忆，不用记 192.168.1.3:3000 的IP来访问。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">server {</span>
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
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,64)]))}const c=n(l,[["render",d]]),t=JSON.parse('{"path":"/devops/%E5%9F%BA%E4%BA%8Edocker%E5%AE%89%E8%A3%85Yapi.html","title":"Linux系统下基于Docker安装Yapi，并且迁移Yapi数据","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"devops/基于docker安装Yapi.md"}');export{c as comp,t as data};
