import{_ as n,c as e,b as a,o as i}from"./app-BEL8OELx.js";const l={};function c(d,s){return i(),e("div",null,s[0]||(s[0]=[a(`<h1 id="centos7搭建开源高颜值的it资产管理平台chemex" tabindex="-1"><a class="header-anchor" href="#centos7搭建开源高颜值的it资产管理平台chemex"><span>Centos7搭建开源高颜值的IT资产管理平台chemex</span></a></h1><p>咖啡壶是开源、高颜值的IT资产管理平台。资产管理、归属、追溯、盘点以及轻量的服务器状态面板。支持导出导入、LDAP、自定义字段等。基于优雅的Laravel框架和DcatAdmin开发。</p><p>开源地址：https://gitee.com/celaraze/chemex</p><p><img src="https://imgoss.xgss.net/picgo/image-20220607180626167.png?aliyun" alt="image-20220607180626167"></p><h2 id="环境要求" tabindex="-1"><a class="header-anchor" href="#环境要求"><span>环境要求</span></a></h2><p>git，用于管理版本，部署和升级必要工具。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">PHP 8+ ，仅支持 PHP8。</span>
<span class="line">MySQL 5.7+，数据库引擎，理论上 MariaDB 10.2 + 兼容支持。</span>
<span class="line">ext-zip 扩展。</span>
<span class="line">ext-json 扩展。</span>
<span class="line">ext-fileinfo 扩展。</span>
<span class="line">ext-ldap 扩展。</span>
<span class="line">ext-bcmath 扩展。</span>
<span class="line">ext-mysqli 扩展。</span>
<span class="line">ext-xml 扩展。</span>
<span class="line">ext-xmlrpc 扩展。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上扩展安装过程注意版本必须与 PHP 版本一致。</p><h2 id="系统简介" tabindex="-1"><a class="header-anchor" href="#系统简介"><span>系统简介</span></a></h2><p>centos7</p><p>已安装PHP8和mysql数据库，nignx转发</p><p>域名：http://zc.nideyuming.com</p><h2 id="部署-经典-nginx-php-fpm" tabindex="-1"><a class="header-anchor" href="#部署-经典-nginx-php-fpm"><span>部署（经典 Nginx &amp; PHP-fpm）</span></a></h2><p>生产环境下为遵守安全策略，非常建议在服务器本地进行部署，暂时不提供相关线上初始化安装的功能。因此，虽然前期部署的步骤较多，但已经为大家自动化处理了很大部分的流程，只需要跟着下面的命令一步步执行，一般是不会有部署问题的。</p><p>1.为你的计算机安装 PHP8 环境，参考：PHP官方 （安装省略）。</p><p>2.为你的计算机安装 MySQL 或者 mariadb（安装省略）</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">http://zc.nideyuming.com</span>
<span class="line">数据库信息：</span>
<span class="line">数据库：zc_chuanqu_cn</span>
<span class="line">地址：172.16.32.11:3306</span>
<span class="line">用户：zc_chuanqu_cn</span>
<span class="line">密码：****</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3：在你想要的目录中，执行 git clone https://gitee.com/celaraze/chemex.git 完成下载。</p><p>4：在项目根目录中，复制 .env.example 文件为一份新的，并重命名为 .env。</p><p>5：根据 .env 文件中注释的指引进行配置。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># cd /data/wwwroot/web/</span>
<span class="line"># git clone https://gitee.com/celaraze/chemex.git </span>
<span class="line"># mv chemex zc.nideyuming.com</span>
<span class="line"># chown www.www -R zc.nideyuming.com/</span>
<span class="line"># cd zc.nideyuming.com/</span>
<span class="line"># mv .env.example .env</span>
<span class="line">修改 .env 配置文件</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装导入数据" tabindex="-1"><a class="header-anchor" href="#安装导入数据"><span>安装导入数据</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># su -l www</span>
<span class="line">$ cd /data/wwwroot/web/zc.nideyuming.com/</span>
<span class="line">$ php artisan chemex:install</span>
<span class="line">正在优化配置！</span>
<span class="line">Compiled views cleared!</span>
<span class="line">Application cache cleared!</span>
<span class="line">Route cache cleared!</span>
<span class="line">Configuration cache cleared!</span>
<span class="line">Compiled services and packages files removed!</span>
<span class="line">Caches cleared successfully!</span>
<span class="line">正在设置存储系统！</span>
<span class="line">The [/home/data/wwwroot/web/zc.nideyuming.com/public/storage] link has been connected to [/home/data/wwwroot/web/zc.nideyuming.com/storage/app/public].</span>
<span class="line">The links have been created.</span>
<span class="line">正在配置APP密钥！</span>
<span class="line">Application key set successfully.</span>
<span class="line">正在配置JWT密钥！</span>
<span class="line"></span>
<span class="line"> This will invalidate all existing tokens. Are you sure you want to override the secret key? (yes/no) [no]:</span>
<span class="line"> &gt; yes</span>
<span class="line"></span>
<span class="line">jwt-auth secret [opRJk8IlSJeJiOOVEKf5KEhk2Xz0rmYl8W4uZVVr06futCH77NlDPgCNt9ytymy2] set successfully.</span>
<span class="line">正在处理数据库迁移！</span>
<span class="line">Migration table created successfully.</span>
<span class="line">...</span>
<span class="line">Migrated:  2021_05_19_085513_version_3_0_10 (9.27ms)</span>
<span class="line">正在初始化基础数据！</span>
<span class="line">Database seeding completed successfully.</span>
<span class="line">Admin账户已成功重置为 admin/admin</span>
<span class="line">安装完成！</span>
<span class="line">用户名密码都为：admin</span>
<span class="line"></span>
<span class="line">$ chmod 777 -R storage</span>
<span class="line">$ ll storage/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置nginx" tabindex="-1"><a class="header-anchor" href="#配置nginx"><span>配置nginx</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">server {  </span>
<span class="line">        listen       80;</span>
<span class="line">        server_name  zc.nideyuming.com;</span>
<span class="line">        root /data/wwwroot/web/zc.nideyuming.com/public;</span>
<span class="line">        access_log /data/wwwroot/log/zc.nideyuming.com-access.log main_aliyun;</span>
<span class="line">        error_log off;</span>
<span class="line"></span>
<span class="line">        location / {</span>
<span class="line">                index  index.php index.htm index.html;</span>
<span class="line">                try_files $uri $uri/ /index.php?$args;</span>
<span class="line">        }</span>
<span class="line">        location ~ .*\\.(php|php5)?$     {</span>
<span class="line">                        fastcgi_pass http://127.0.0.1:8100;</span>
<span class="line">                        fastcgi_index index.php;</span>
<span class="line">                        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;</span>
<span class="line">                        include fastcgi_params;</span>
<span class="line">                }</span>
<span class="line">        location ~ .*\\.(htm|html|css|js|jpg|jpeg|gif|png|ico|bmp|gz|xml|zip|rar|swf|txt|xls|xlsx|flv|mid|doc|ppt|pdf|mp3|wma|exe)?$ {  </span>
<span class="line">                expires 30d;  </span>
<span class="line">                access_log /dev/null;</span>
<span class="line">        }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时可以通过访问 http://zc.nideyuming.com 来使用咖啡壶。管理员账号密码为：admin / admin。</p><p>访问</p><p><img src="https://imgoss.xgss.net/picgo/image-20210708154621618.png?aliyun" alt="image-20210708154621618"></p><h1 id="版本更新" tabindex="-1"><a class="header-anchor" href="#版本更新"><span>版本更新</span></a></h1><p>随时随地保持更新可以在项目根目录中执行以下命令，将会同步分支的最新修改内容。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">sudo git fetch --all &amp;&amp; git reset --hard origin/main &amp;&amp; git pull </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>接着，执行以下来进行升级。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">php artisan chemex:update </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>注意，如果提示 permission denied 错误，需要通过 sudo 身份执行。</p>`,34)]))}const r=n(l,[["render",c]]),t=JSON.parse('{"path":"/kaiyuan/Open-Source-Software/Centos7%E6%90%AD%E5%BB%BA%E5%BC%80%E6%BA%90%E9%AB%98%E9%A2%9C%E5%80%BC%E7%9A%84IT%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0chemex.html","title":"Centos7搭建开源高颜值的IT资产管理平台chemex","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"kaiyuan/Open-Source-Software/Centos7搭建开源高颜值的IT资产管理平台chemex.md"}');export{r as comp,t as data};
