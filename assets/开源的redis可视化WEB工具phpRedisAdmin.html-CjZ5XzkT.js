import{_ as e,c as n,b as i,o as a}from"./app-BEL8OELx.js";const d={};function l(p,s){return a(),n("div",null,s[0]||(s[0]=[i(`<h1 id="开源的redis可视化web工具phpredisadmin" tabindex="-1"><a class="header-anchor" href="#开源的redis可视化web工具phpredisadmin"><span>开源的redis可视化WEB工具phpRedisAdmin</span></a></h1><p>最近由于工作需要需要在服务器里安装一个redis可视化工具，在本文中，我们将向您介绍如何使用phpRedisAdmin以及如何配置它。</p><h2 id="什么是phpredisadmin" tabindex="-1"><a class="header-anchor" href="#什么是phpredisadmin"><span>什么是phpRedisAdmin？</span></a></h2><p>phpRedisAdmin是一个基于Web的Redis管理工具。它允许您轻松地管理Redis数据库，包括创建、编辑和删除数据库、查看记录和执行命令等操作。它也支持从备份文件中还原数据库。</p><p>github地址：https://github.com/ErikDubbelboer/phpRedisAdmin</p><p>有两种方式安装phpRedisAdmin，一种是docker，一种是需要php环境</p><p><img src="https://imgoss.xgss.net/picgo/image-20231103141905745.png?aliyun" alt="image-20231103141905745"></p><h1 id="基于docker安装phpredisadmin-推荐" tabindex="-1"><a class="header-anchor" href="#基于docker安装phpredisadmin-推荐"><span>基于Docker安装phpRedisAdmin（推荐）</span></a></h1><h2 id="_1-安装docker环境" tabindex="-1"><a class="header-anchor" href="#_1-安装docker环境"><span>1.安装Docker环境</span></a></h2><p>省略</p><h2 id="_2-基于docker安装phpredisadmin" tabindex="-1"><a class="header-anchor" href="#_2-基于docker安装phpredisadmin"><span>2.基于Docker安装phpRedisAdmin</span></a></h2><p>在 Docker Hub 上提供了一个公共的 phpRedisAdmin Docker 镜像，它是从最新标签构建的。文件 includes/config.environment.inc.php 被用作配置文件，以允许使用环境变量作为配置值。</p><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例：</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker run --rm -it -e REDIS_1_HOST=myredis.host -e REDIS_1_NAME=MyRedis -p 80:80 erikdubbelboer/phpredisadmin</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>此外，还提供了一个用于测试和开发的 Docker Compose 清单。只需执行 docker-compose up --build 来启动它，然后浏览至 http://localhost。有关配置详细信息，请查看 docker-compose.yml 文件。</p><h3 id="环境变量摘要" tabindex="-1"><a class="header-anchor" href="#环境变量摘要"><span>环境变量摘要</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">REDIS_1_HOST - 定义 Redis 服务器的主机</span>
<span class="line"></span>
<span class="line">REDIS_1_NAME - 定义 Redis 服务器的名称</span>
<span class="line"></span>
<span class="line">REDIS_1_PORT - 定义 Redis 服务器的端口</span>
<span class="line"></span>
<span class="line">REDIS_1_AUTH - 定义 Redis 服务器的密码</span>
<span class="line"></span>
<span class="line">REDIS_1_AUTH_FILE - 定义包含 Redis 服务器密码的文件</span>
<span class="line"></span>
<span class="line">REDIS_1_DATABASES - 您可以修改配置以阻止 phpRedisAdmin 使用 CONFIG 命令</span>
<span class="line"></span>
<span class="line">ADMIN_USER - 定义用户界面基本认证的用户名</span>
<span class="line"></span>
<span class="line">ADMIN_PASS - 定义用户界面基本认证的密码</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="一个docker多个redis实例" tabindex="-1"><a class="header-anchor" href="#一个docker多个redis实例"><span>一个docker多个redis实例</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker run \\</span>
<span class="line">-itd --name redis-web \\</span>
<span class="line">--restart always \\</span>
<span class="line">-e REDIS_1_HOST=192.168.0.251 -e REDIS_1_NAME=Redis-jiankong -e  REDIS_1_PORT=123 -e  REDIS_1_AUTH=123456 \\</span>
<span class="line">-e REDIS_2_HOST=192.168.0.2 -e REDIS_2_NAME=Redis01 \\</span>
<span class="line">-e REDIS_3_HOST=192.168.0.3 -e REDIS_3_NAME=Redis02 \\</span>
<span class="line">-p 82:80 erikdubbelboer/phpredisadmin:latest</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器中访问</p><p><img src="https://imgoss.xgss.net/picgo/image-20231103140507175.png?aliyun" alt="image-20231103140507175"></p><h1 id="基于php环境安装phpredisadmin" tabindex="-1"><a class="header-anchor" href="#基于php环境安装phpredisadmin"><span>基于PHP环境安装phpRedisAdmin</span></a></h1><h2 id="通过git克隆php代码" tabindex="-1"><a class="header-anchor" href="#通过git克隆php代码"><span>通过GIT克隆PHP代码</span></a></h2><p>前提是需要有PHP环境</p><p>您也可以进行手动安装：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">git clone https://github.com/ErikDubbelboer/phpRedisAdmin.git</span>
<span class="line">cd phpRedisAdmin</span>
<span class="line">git clone https://github.com/nrk/predis.git vendor</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="通过composer" tabindex="-1"><a class="header-anchor" href="#通过composer"><span>通过Composer</span></a></h2><p>要通过 Composer 安装 phpRedisAdmin，您需要执行以下命令：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">curl -s http://getcomposer.org/installer | php</span>
<span class="line">php composer.phar create-project -s dev erik-dubbelboer/php-redis-admin path/to/install</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>您也可以复制 includes/config.sample.inc.php 到 includes/config.inc.php 并根据您特定的 Redis 配置进行编辑。</p><h2 id="编辑配置" tabindex="-1"><a class="header-anchor" href="#编辑配置"><span>编辑配置</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">cp includes/config.sample.inc.php includes/config.inc.php</span>
<span class="line"></span>
<span class="line">vi includes/config.inc.php</span>
<span class="line"></span>
<span class="line">更加具体的配置编辑</span>
<span class="line"></span>
<span class="line">    array(</span>
<span class="line">      &#39;name&#39;   =&gt; &#39;local server&#39;, // Optional name.</span>
<span class="line">      &#39;host&#39;   =&gt; &#39;127.0.0.1&#39;,</span>
<span class="line">      &#39;port&#39;   =&gt; 6379,</span>
<span class="line">      &#39;filter&#39; =&gt; &#39;*&#39;,</span>
<span class="line">      &#39;scheme&#39; =&gt; &#39;tcp&#39;, // Optional. Connection scheme. &#39;tcp&#39; - for TCP connection, &#39;unix&#39; - for connection by unix domain socket</span>
<span class="line">      &#39;path&#39;   =&gt; &#39;&#39;, // Optional. Path to unix domain socket. Uses only if &#39;scheme&#39; =&gt; &#39;unix&#39;. Example: &#39;/var/run/redis/redis.sock&#39;</span>
<span class="line">      &#39;hide&#39;   =&gt; false, // Optional. Override global setting. Hide empty databases in the database list.</span>
<span class="line"></span>
<span class="line">      // Optional Redis authentication.</span>
<span class="line">      &#39;auth&#39; =&gt; &#39;123456&#39; // Warning: The password is sent in plain-text to the Redis server.</span>
<span class="line">    ),</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果有需要还可以利用nginx做反向代理访问域名。</p><p>phpRedisAdmin是一个功能强大的Redis管理工具，可以帮助您轻松地管理Redis数据库。在本文中，我们介绍了如何使用phpRedisAdmin以及如何配置它。希望这篇文章对您有所帮助！</p>`,34)]))}const c=e(d,[["render",l]]),t=JSON.parse('{"path":"/kaiyuan/Open-Source-Software/%E5%BC%80%E6%BA%90%E7%9A%84redis%E5%8F%AF%E8%A7%86%E5%8C%96WEB%E5%B7%A5%E5%85%B7phpRedisAdmin.html","title":"开源的redis可视化WEB工具phpRedisAdmin","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"kaiyuan/Open-Source-Software/开源的redis可视化WEB工具phpRedisAdmin.md"}');export{c as comp,t as data};
