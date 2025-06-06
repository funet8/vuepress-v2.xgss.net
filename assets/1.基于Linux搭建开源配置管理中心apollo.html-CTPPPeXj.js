import{_ as s,c as n,b as e,o as l}from"./app-BEL8OELx.js";const i={};function p(r,a){return l(),n("div",null,a[0]||(a[0]=[e(`<h1 id="基于linux搭建开源配置管理中心apollo" tabindex="-1"><a class="header-anchor" href="#基于linux搭建开源配置管理中心apollo"><span>基于Linux搭建开源配置管理中心apollo</span></a></h1><h2 id="什么是apollo" tabindex="-1"><a class="header-anchor" href="#什么是apollo"><span>什么是apollo</span></a></h2><p>Apollo（阿波罗）是一款可靠的分布式配置管理中心，诞生于携程框架研发部，能够集中化管理应用不同环境、不同集群的配置，配置修改后能够实时推送到应用端，并且具备规范的权限、流程治理等特性，适用于微服务配置管理场景。</p><h2 id="应用什么场景" tabindex="-1"><a class="header-anchor" href="#应用什么场景"><span>应用什么场景</span></a></h2><p>项目在不同环境对应的配置不同</p><h2 id="apollo优点" tabindex="-1"><a class="header-anchor" href="#apollo优点"><span>Apollo优点</span></a></h2><h3 id="_1-统一管理不同环境、不同集群的配置" tabindex="-1"><a class="header-anchor" href="#_1-统一管理不同环境、不同集群的配置"><span>1.统一管理不同环境、不同集群的配置</span></a></h3><p>Apollo提供了一个统一界面集中式管理不同环境（environment）、不同集群（cluster）、不同命名空间（namespace）的配置。</p><p>同一份代码部署在不同的集群，可以有不同的配置，比如zk的地址等</p><p>通过命名空间（namespace）可以很方便的支持多个不同应用共享同一份配置，同时还允许应用对共享的配置进行覆盖</p><h3 id="_2-配置修改实时生效-热发布" tabindex="-1"><a class="header-anchor" href="#_2-配置修改实时生效-热发布"><span>2.配置修改实时生效（热发布）</span></a></h3><p>用户在 Apollo 修改完配置并发布后，客户端能实时（1 秒）接收到最新的配置，并通知到应用程序。</p><h3 id="_3-版本发布管理" tabindex="-1"><a class="header-anchor" href="#_3-版本发布管理"><span>3.版本发布管理</span></a></h3><p>所有的配置发布都有版本概念，从而可以方便地支持配置的回滚。</p><h3 id="_4-灰度发布" tabindex="-1"><a class="header-anchor" href="#_4-灰度发布"><span>4.灰度发布</span></a></h3><p>支持配置的灰度发布，比如点了发布后，只对部分应用实例生效，等观察一段时间没问题后再推给所有应用实例。</p><h3 id="_5-权限管理、发布审核、操作审计" tabindex="-1"><a class="header-anchor" href="#_5-权限管理、发布审核、操作审计"><span>5.权限管理、发布审核、操作审计</span></a></h3><p>应用和配置的管理都有完善的权限管理机制，对配置的管理还分为了编辑和发布两个环节，从而减少人为的错误。所有的操作都有审计日志，可以方便地追踪问题。</p><h3 id="_6-客户端配置信息监控" tabindex="-1"><a class="header-anchor" href="#_6-客户端配置信息监控"><span>6.客户端配置信息监控</span></a></h3><p>可以在界面上方便地看到配置在被哪些实例使用。</p><h3 id="_7-提供-java-和-net-原生客户端-同时提供http接口" tabindex="-1"><a class="header-anchor" href="#_7-提供-java-和-net-原生客户端-同时提供http接口"><span>7.提供 Java 和.Net 原生客户端，同时提供HTTP接口</span></a></h3><p>提供了 Java 和.Net 的原生客户端，方便应用集成，同时提供了 Http 接口，非 Java 和.Net 应用也可以方便地使用。</p><p>go、python、nodejs、PHP等开发语言也提供客户端使用的案例，<a href="https://www.apolloconfig.com/#/zh/usage/third-party-sdks-user-guide" target="_blank" rel="noopener noreferrer">参考地址</a></p><h3 id="_8-提供开放平台-api" tabindex="-1"><a class="header-anchor" href="#_8-提供开放平台-api"><span>8. 提供开放平台 API</span></a></h3><p>Apollo 自身提供了比较完善的统一配置管理界面，支持多环境、多数据中心配置管理、权限、流程治理等特性。不过 Apollo 出于通用性考虑，不会对配置的修改做过多限制，只要符合基本的格式就能保存，不会针对不同的配置值进行针对性的校验，如数据库用户名、密码，Redis 服务地址等。对于这类应用配置，Apollo 支持应用方通过开放平台 API 在 Apollo 进行配置的修改和发布，并且具备完善的授权和权限控制。</p><h3 id="_9-部署简单" tabindex="-1"><a class="header-anchor" href="#_9-部署简单"><span>9.部署简单</span></a></h3><p>配置中心作为基础服务，可用性要求非常高，这就要求 Apollo 对外部依赖尽可能地少，目前唯一的外部依赖是 MySQL，所以部署非常简单，只要安装好 Java 和 MySQL 就可以让 Apollo 跑起来。Apollo 还提供了打包脚本，一键就可以生成所有需要的安装包，并且支持自定义运行时参数。</p><p><img src="https://imgoss.xgss.net/picgo/基于Linux搭建开源配置管理中心apollo.jpg?aliyun" alt="基于Linux搭建开源配置管理中心apollo"></p><h2 id="测试系统介绍" tabindex="-1"><a class="header-anchor" href="#测试系统介绍"><span>测试系统介绍</span></a></h2><table><thead><tr><th>系统</th><th>Centos7</th></tr></thead><tbody><tr><td>java环境</td><td>java1.8</td></tr><tr><td>数据库</td><td>MariaDB-10.2.9</td></tr><tr><td>IP</td><td>192.168.1.5</td></tr></tbody></table><p>Quick Start脚本会在本地启动3个服务，分别使用8070, 8080, 8090端口，请确保这3个端口当前没有被使用。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># java -version</span>
<span class="line">openjdk version &quot;1.8.0_302&quot;</span>
<span class="line">OpenJDK Runtime Environment (build 1.8.0_302-b08)</span>
<span class="line">OpenJDK 64-Bit Server VM (build 25.302-b08, mixed mode)</span>
<span class="line"># mysql -V</span>
<span class="line">mysql  Ver 15.1 Distrib 10.2.9-MariaDB, for Linux (x86_64) using readline 5.1</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装apollo" tabindex="-1"><a class="header-anchor" href="#安装apollo"><span>安装apollo</span></a></h2><h3 id="下载quick-start安装包" tabindex="-1"><a class="header-anchor" href="#下载quick-start安装包"><span>下载Quick Start安装包</span></a></h3><p>安装包共50M，如果访问github网速不给力的话，可以从百度网盘下载。</p><ol><li><p>从GitHub下载</p><ul><li>checkout或下载<a href="https://github.com/nobodyiam/apollo-build-scripts" target="_blank" rel="noopener noreferrer">apollo-build-scripts项目</a></li><li>由于Quick Start项目比较大，所以放在了另外的repository，请注意项目地址 <ul><li>https://github.com/nobodyiam/apollo-build-scripts</li></ul></li></ul></li><li><p>从百度网盘下载</p><ul><li>通过<a href="https://pan.baidu.com/s/1Ieelw6y3adECgktO0ea0Gg" target="_blank" rel="noopener noreferrer">网盘链接</a>下载，提取码: 9wwe</li><li>下载到本地后，在本地解压apollo-quick-start.zip</li></ul></li><li><p>为啥安装包要58M这么大？</p><ul><li>因为这是一个可以自启动的jar包，里面包含了所有依赖jar包以及一个内置的tomcat容器</li></ul></li></ol><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">cd /data/wwwroot/web/</span>
<span class="line">git clone https://github.com/apolloconfig/apollo-build-scripts.git</span>
<span class="line">由于网络原因下载比较慢</span>
<span class="line"></span>
<span class="line">wget http://js.funet8.com/centos_software/apollo-build-scripts-master.zip</span>
<span class="line">unzip apollo-build-scripts-master.zip</span>
<span class="line">mv apollo-build-scripts-master apollo.chuanqu.ltd</span>
<span class="line">cd apollo.chuanqu.ltd</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建数据库" tabindex="-1"><a class="header-anchor" href="#创建数据库"><span>创建数据库</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># mysql -u root -h192.168.1.5 -P 3306 -p123456</span>
<span class="line"># 导入数据 ApolloPortalDB</span>
<span class="line">&gt; source /data/wwwroot/web/apollo.chuanqu.ltd/sql/apolloportaldb.sql</span>
<span class="line"># 验证</span>
<span class="line">&gt; select \`Id\`, \`AppId\`, \`Name\` from ApolloPortalDB.App;</span>
<span class="line"></span>
<span class="line"># 导入 ApolloConfigDB</span>
<span class="line">&gt; source /data/wwwroot/web/apollo.chuanqu.ltd/sql/apolloconfigdb.sql</span>
<span class="line"></span>
<span class="line">&gt; select \`NamespaceId\`, \`Key\`, \`Value\`, \`Comment\` from ApolloConfigDB.Item;</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置数据库连接信息" tabindex="-1"><a class="header-anchor" href="#配置数据库连接信息"><span>配置数据库连接信息</span></a></h3><p>Apollo服务端需要知道如何连接到你前面创建的数据库，所以需要编辑demo.sh，修改ApolloPortalDB和ApolloConfigDB相关的数据库连接串信息。</p><p>注意：填入的用户需要具备对ApolloPortalDB和ApolloConfigDB数据的读写权限。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># vi demo.sh</span>
<span class="line"></span>
<span class="line">#apollo config db info</span>
<span class="line">apollo_config_db_url=&quot;jdbc:mysql://192.168.1.5:3306/ApolloConfigDB?characterEncoding=utf8&amp;serverTimezone=Asia/Shanghai&quot;</span>
<span class="line">apollo_config_db_username=root</span>
<span class="line">apollo_config_db_password=123456</span>
<span class="line"></span>
<span class="line"># apollo portal db info</span>
<span class="line">apollo_portal_db_url=&quot;jdbc:mysql://192.168.1.5:3306/ApolloPortalDB?characterEncoding=utf8&amp;serverTimezone=Asia/Shanghai&quot;</span>
<span class="line">apollo_portal_db_username=root</span>
<span class="line">apollo_portal_db_password=123456</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="执行启动脚本" tabindex="-1"><a class="header-anchor" href="#执行启动脚本"><span>执行启动脚本</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">./demo.sh start</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>显示</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># ./demo.sh start</span>
<span class="line">==== starting service ====</span>
<span class="line">Service logging file is ./service/apollo-service.log</span>
<span class="line">Application is running as root (UID 0). This is considered insecure.</span>
<span class="line">Started [32028]</span>
<span class="line">Waiting for config service startup.....</span>
<span class="line">Config service started. You may visit http://localhost:8080 for service status now!</span>
<span class="line">Waiting for admin service startup.</span>
<span class="line">Admin service started</span>
<span class="line">==== starting portal ====</span>
<span class="line">Portal logging file is ./portal/apollo-portal.log</span>
<span class="line">Application is running as root (UID 0). This is considered insecure.</span>
<span class="line">Started [32251]</span>
<span class="line">Waiting for portal startup....</span>
<span class="line">Portal started. You can visit http://localhost:8070 now!</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问8080端口</p><p><img src="https://imgoss.xgss.net/picgo/image-20220329181451424.png?aliyun" alt="image-20220329181451424"></p><p>访问 http://IP+8070</p><p>输入用户名apollo，密码admin后登录</p><p><img src="https://imgoss.xgss.net/picgo/image-20220329181552814.png?aliyun" alt="image-20220329181552814"></p><p><img src="https://imgoss.xgss.net/picgo/image-20220329181603822.png?aliyun" alt="image-20220329181603822"></p><h3 id="运行客户端程序" tabindex="-1"><a class="header-anchor" href="#运行客户端程序"><span>运行客户端程序</span></a></h3><p>运行<code>./demo.sh client</code>启动Demo客户端，忽略前面的调试信息，可以看到如下提示：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">Apollo Config Demo. Please input key to get the value. Input quit to exit.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>输入<code>timeout</code>，会看到如下信息：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token operator">&gt;</span> <span class="token function">timeout</span></span>
<span class="line"><span class="token operator">&gt;</span> <span class="token punctuation">[</span>SimpleApolloConfigDemo<span class="token punctuation">]</span> Loading key <span class="token builtin class-name">:</span> <span class="token function">timeout</span> with value: <span class="token number">100</span></span>
<span class="line">修改配置之后</span>
<span class="line"><span class="token operator">&gt;</span> Changes <span class="token keyword">for</span> namespace application</span>
<span class="line">Change - key: timeout, oldValue: <span class="token number">100</span>, newValue: <span class="token number">250</span>, changeType: MODIFIED</span>
<span class="line"><span class="token operator">&gt;</span> <span class="token function">timeout</span></span>
<span class="line">Loading key <span class="token builtin class-name">:</span> <span class="token function">timeout</span> with value: <span class="token number">250</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="配置nginx反向代理" tabindex="-1"><a class="header-anchor" href="#配置nginx反向代理"><span>配置nginx反向代理</span></a></h1><p>域名:</p><p>apollo.chuanqu.ltd (接口)</p><p>apollo-houtai.chuanqu.ltd (后台)</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">server {</span>
<span class="line">        listen       80;</span>
<span class="line">        server_name  apollo-houtai.chuanqu.ltd;</span>
<span class="line">        #root /data/wwwroot/web/;</span>
<span class="line">        access_log /data/wwwroot/log/apollo.chuanqu.ltd-access.log main_aliyun;</span>
<span class="line">        error_log off;</span>
<span class="line"></span>
<span class="line">        location / {</span>
<span class="line">                index index.php index.html;</span>
<span class="line">                proxy_pass      http://192.168.1.5:8070;</span>
<span class="line">                proxy_redirect off;</span>
<span class="line">                proxy_set_header Host $host;</span>
<span class="line">                proxy_set_header X-Real-IP $remote_addr;</span>
<span class="line">                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span>
<span class="line"></span>
<span class="line">        }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">server {</span>
<span class="line">        listen       80;</span>
<span class="line">        server_name  apollo.chuanqu.ltd;</span>
<span class="line">        #root /data/wwwroot/web/;</span>
<span class="line">        access_log /data/wwwroot/log/apollo.chuanqu.ltd-access.log main_aliyun;</span>
<span class="line">        error_log off;</span>
<span class="line"></span>
<span class="line">        location / {</span>
<span class="line">                index index.php index.html;</span>
<span class="line">                proxy_pass      http://192.168.1.5:8080;</span>
<span class="line">                proxy_redirect off;</span>
<span class="line">                proxy_set_header Host $host;</span>
<span class="line">                proxy_set_header X-Real-IP $remote_addr;</span>
<span class="line">                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span>
<span class="line"></span>
<span class="line">        }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="使用新的项目" tabindex="-1"><a class="header-anchor" href="#使用新的项目"><span>使用新的项目</span></a></h1><h2 id="应用接入apollo" tabindex="-1"><a class="header-anchor" href="#应用接入apollo"><span>应用接入Apollo</span></a></h2><p>这部分可以参考Java应用接入指南 <a href="https://www.apolloconfig.com/#/zh/usage/java-sdk-user-guide" target="_blank" rel="noopener noreferrer">https://www.apolloconfig.com/#/zh/usage/java-sdk-user-guide</a></p><h2 id="运行客户端程序-1" tabindex="-1"><a class="header-anchor" href="#运行客户端程序-1"><span>运行客户端程序</span></a></h2><p>由于使用了新的项目，所以客户端需要修改appId信息。</p><p>编辑<code>client/META-INF/app.properties</code>，修改app.id为你新创建的app id。</p><div class="language-properties line-numbers-mode" data-highlighter="prismjs" data-ext="properties"><pre><code class="language-properties"><span class="line"><span class="token key attr-name">app.id</span><span class="token punctuation">=</span><span class="token value attr-value">你的appId</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>运行<code>./demo.sh client</code>启动Demo客户端即可。</p><h3 id="创建应用" tabindex="-1"><a class="header-anchor" href="#创建应用"><span>创建应用</span></a></h3><p>设置appid为 1001，</p><p><img src="https://imgoss.xgss.net/picgo/image-20220330095536959.png?aliyun" alt="image-20220330095536959"></p><p>新增配置</p><p>设置，redis_ip和 value为192.168.1.12</p><p><img src="https://imgoss.xgss.net/picgo/image-20220330095647881.png?aliyun" alt="image-20220330095647881"></p><p>点击发布</p><p><img src="https://imgoss.xgss.net/picgo/image-20220330095756015.png?aliyun" alt="image-20220330095756015"></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">vim client/META-INF/app.properties</span>
<span class="line">把app.id改成刚才新增的应用的ID</span>
<span class="line">app.id=1001</span>
<span class="line"></span>
<span class="line">运行客户端，输入对应key值，看是否能获取到value值。</span>
<span class="line">./demo.sh client</span>
<span class="line">Apollo Config Demo. Please input key to get the value. Input quit to exit.</span>
<span class="line">&gt; redis_ip</span>
<span class="line">Loading key : redis_ip with value: 192.168.1.12</span>
<span class="line">&gt; redis_passwd</span>
<span class="line">Loading key : redis_passwd with value: 123456</span>
<span class="line"></span>
<span class="line">新增一个redis_port的KEY</span>
<span class="line">&gt; Changes for namespace application</span>
<span class="line">Change - key: redis_port, oldValue: null, newValue: 6379, changeType: ADDED</span>
<span class="line">&gt; redis_port</span>
<span class="line">Loading key : redis_port with value: 6379</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基于Centos7搭建开源配置管理中心apollo，完成。</p><h1 id="参考地址" tabindex="-1"><a class="header-anchor" href="#参考地址"><span>参考地址</span></a></h1><p><a href="https://www.apolloconfig.com/#/zh/" target="_blank" rel="noopener noreferrer">官网文档</a></p><p><a href="https://github.com/apolloconfig/apollo/wiki/%E5%88%86%E5%B8%83%E5%BC%8F%E9%83%A8%E7%BD%B2%E6%8C%87%E5%8D%97#11-%E8%BF%90%E8%A1%8C%E6%97%B6%E7%8E%AF%E5%A2%83" target="_blank" rel="noopener noreferrer">分布式部署指南</a></p><p><a href="https://github.com/ctripcorp/apollo" target="_blank" rel="noopener noreferrer">GitHub仓库</a></p><p><a href="https://gitee.com/apolloconfig" target="_blank" rel="noopener noreferrer">Gitee仓库</a></p><p>知乎：<a href="https://zhuanlan.zhihu.com/p/28723169" target="_blank" rel="noopener noreferrer">携程开源配置中心Apollo的设计与实现</a></p><p><a href="https://github.com/ljx211520/apollo-php-client" target="_blank" rel="noopener noreferrer">携程Apollo的PHP客户端</a></p>`,88)]))}const d=s(i,[["render",p]]),o=JSON.parse('{"path":"/kaiyuan/Open-Source-Software/1.%E5%9F%BA%E4%BA%8ELinux%E6%90%AD%E5%BB%BA%E5%BC%80%E6%BA%90%E9%85%8D%E7%BD%AE%E7%AE%A1%E7%90%86%E4%B8%AD%E5%BF%83apollo.html","title":"基于Linux搭建开源配置管理中心apollo","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"kaiyuan/Open-Source-Software/1.基于Linux搭建开源配置管理中心apollo.md"}');export{d as comp,o as data};
