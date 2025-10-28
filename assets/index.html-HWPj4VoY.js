import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,o as i}from"./app-BiQR_lPj.js";const l={};function p(c,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="centos7安装openresty实现waf防火墙功能" tabindex="-1"><a class="header-anchor" href="#centos7安装openresty实现waf防火墙功能"><span>Centos7安装openresty实现WAF防火墙功能</span></a></h1><h1 id="openresty是什么" tabindex="-1"><a class="header-anchor" href="#openresty是什么"><span>OpenResty是什么</span></a></h1><p>OpenResty® 是一个结合了 Nginx 与 Lua 的高性能 Web 平台，其内部集成了大量精良的 Lua 库、第三方模块以及大多数的依赖项。用于方便地搭建能够处理超高并发、扩展性极高的动态 Web 应用、Web 服务和动态网关。 OpenResty® 通过汇聚各种设计精良的 Nginx 模块（主要由 OpenResty 团队自主开发），从而将 Nginx 有效地变成一个强大的通用 Web 应用平台。这样，Web 开发人员和系统工程师可以使用 Lua 脚本语言调动 Nginx 支持的各种 C 以及 Lua 模块，快速构造出足以胜任 10K 乃至 1000K 以上单机并发连接的高性能 Web 应用系统。</p><p>OpenResty® 的目标是让你的Web服务直接跑在 Nginx 服务内部，充分利用 Nginx 的非阻塞 I/O 模型，不仅仅对 HTTP 客户端请求,甚至于对远程后端诸如 MySQL、PostgreSQL、Memcached 以及 Redis 等都进行一致的高性能响应。</p><p><img src="https://imgoss.xgss.net/picgo/Centos7-openresty-16415487083161.jpg?aliyun" alt="Centos7-openresty"></p><h2 id="系统说明" tabindex="-1"><a class="header-anchor" href="#系统说明"><span>系统说明</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>系统： centos7</span></span>
<span class="line"><span>ip: 192.168.1.4</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实现waf" tabindex="-1"><a class="header-anchor" href="#实现waf"><span>实现WAF</span></a></h2><p>两种方式</p><p>1.使用nginx+lua来实现WAF,须在编译nginx的时候配置上lua。</p><p>2.部署OpenResty,不需要在编译nginx的时候指定lua，本文采取此方案</p><h2 id="waf功能列表" tabindex="-1"><a class="header-anchor" href="#waf功能列表"><span>WAF功能列表</span></a></h2><ol><li><p>支持IP白名单和黑名单功能，直接将黑名单的IP访问拒绝。</p></li><li><p>支持URL白名单，将不需要过滤的URL进行定义。</p></li><li><p>支持User-Agent的过滤，匹配自定义规则中的条目，然后进行处理（返回403）。</p></li><li><p>支持CC攻击防护，单个URL指定时间的访问次数，超过设定值，直接返回403。</p></li><li><p>支持Cookie过滤，匹配自定义规则中的条目，然后进行处理（返回403）。</p></li><li><p>支持URL过滤，匹配自定义规则中的条目，如果用户请求的URL包含这些，返回403。</p></li><li><p>支持URL参数过滤，原理同上。</p></li><li><p>支持日志记录，将所有拒绝的操作，记录到日志中去。</p></li><li><p>日志记录为JSON格式，便于日志分析，例如使用ELKStack进行攻击日志收集、存储、搜索和展示</p></li></ol><h1 id="源码安装openresty" tabindex="-1"><a class="header-anchor" href="#源码安装openresty"><span>源码安装openresty</span></a></h1><h2 id="yum安装依赖库" tabindex="-1"><a class="header-anchor" href="#yum安装依赖库"><span>yum安装依赖库</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>yum install -y pcre-devel openssl-devel gcc postgresql-devel</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="下载源码包并且安装" tabindex="-1"><a class="header-anchor" href="#下载源码包并且安装"><span>下载源码包并且安装</span></a></h2><p>从下载页 <a href="http://openresty.org/cn/download.html" target="_blank" rel="noopener noreferrer">Download</a> http://openresty.org/cn/download.html 下载最新的 OpenResty® 源码包，并且像下面的示例一样将其解压:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>mkdir /data/software</span></span>
<span class="line"><span>cd  /data/software</span></span>
<span class="line"><span>wget https://openresty.org/download/openresty-1.19.9.1.tar.gz</span></span>
<span class="line"><span># 备用下载地址： http://js.funet8.com/centos_software/openresty-1.19.9.1.tar.gz</span></span>
<span class="line"><span>tar -zxvf openresty-1.19.9.1.tar.gz</span></span>
<span class="line"><span>cd openresty-1.19.9.1/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>./configure --prefix=/usr/local/openresty \\</span></span>
<span class="line"><span>            --with-luajit \\</span></span>
<span class="line"><span>            --without-http_redis2_module \\</span></span>
<span class="line"><span>            --with-http_iconv_module \\</span></span>
<span class="line"><span>            --with-http_postgres_module</span></span>
<span class="line"><span></span></span>
<span class="line"><span>gmake &amp;&amp; gmake install</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参考地址： http://openresty.org/cn/installation.html</p><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 启动</span></span>
<span class="line"><span>/usr/local/openresty/nginx/sbin/nginx</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 或者指定配置文件启动</span></span>
<span class="line"><span>/usr/local/openresty/nginx/sbin/nginx -c /usr/local/openresty/nginx/conf/nginx.conf -p /usr/local/openresty/nginx/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>浏览器访问验证是否出现： http://IP</span></span>
<span class="line"><span></span></span>
<span class="line"><span>停止</span></span>
<span class="line"><span>/usr/local/openresty/nginx/sbin/nginx -s stop</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 启动</span></span>
<span class="line"><span>/usr/local/openresty/nginx/sbin/nginx</span></span>
<span class="line"><span></span></span>
<span class="line"><span>重置</span></span>
<span class="line"><span>/usr/local/openresty/nginx/sbin/nginx -s reload</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="验证" tabindex="-1"><a class="header-anchor" href="#验证"><span>验证</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vim /usr/local/openresty/nginx/conf/nginx.conf</span></span>
<span class="line"><span>添加：</span></span>
<span class="line"><span>location /hello {</span></span>
<span class="line"><span>                default_type &#39;text/plain&#39;;</span></span>
<span class="line"><span>                content_by_lua &#39;ngx.say(&quot;hello,lua&quot;)&#39;;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>/usr/local/openresty/nginx/sbin/nginx -s reload</span></span>
<span class="line"><span></span></span>
<span class="line"><span>http://IP:80/hello</span></span>
<span class="line"><span></span></span>
<span class="line"><span>是否输出：hello,lua</span></span>
<span class="line"><span># curl http://127.0.0.1/hello</span></span>
<span class="line"><span>hello,lua</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置环境变量" tabindex="-1"><a class="header-anchor" href="#配置环境变量"><span>配置环境变量</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>echo &#39;# 配置OpenResty环境变量&#39; &gt;&gt; /etc/profile</span></span>
<span class="line"><span>echo &#39;export OPENRESTY_HOME=/usr/local/openresty/&#39; &gt;&gt; /etc/profile</span></span>
<span class="line"><span>echo &#39;export PATH=\${OPENRESTY_HOME}/bin:$PATH&#39; &gt;&gt; /etc/profile</span></span>
<span class="line"><span>echo &#39;PATH=/usr/local/openresty/nginx/sbin:$PATH&#39; &gt;&gt; /etc/profile</span></span>
<span class="line"><span>echo &#39;export PATH&#39; &gt;&gt; /etc/profile</span></span>
<span class="line"><span></span></span>
<span class="line"><span>生效：</span></span>
<span class="line"><span>source  /etc/profile</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo $OPENRESTY_HOME</span></span>
<span class="line"><span></span></span>
<span class="line"><span>openresty -s reload</span></span>
<span class="line"><span>nginx -V</span></span>
<span class="line"><span>nginx -t</span></span>
<span class="line"><span></span></span>
<span class="line"><span># openresty -help</span></span>
<span class="line"><span>nginx version: openresty/1.19.9.1</span></span>
<span class="line"><span>Usage: nginx [-?hvVtTq] [-s signal] [-p prefix]</span></span>
<span class="line"><span>             [-e filename] [-c filename] [-g directives]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Options:</span></span>
<span class="line"><span>  -?,-h         : this help</span></span>
<span class="line"><span>  -v            : show version and exit</span></span>
<span class="line"><span>  -V            : show version and configure options then exit</span></span>
<span class="line"><span>  -t            : test configuration and exit</span></span>
<span class="line"><span>  -T            : test configuration, dump it and exit</span></span>
<span class="line"><span>  -q            : suppress non-error messages during configuration testing</span></span>
<span class="line"><span>  -s signal     : send signal to a master process: stop, quit, reopen, reload</span></span>
<span class="line"><span>  -p prefix     : set prefix path (default: /usr/local/openresty/nginx/)</span></span>
<span class="line"><span>  -e filename   : set error log file (default: logs/error.log)</span></span>
<span class="line"><span>  -c filename   : set configuration file (default: conf/nginx.conf)</span></span>
<span class="line"><span>  -g directives : set global directives out of configuration file</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="安装并且配置waf" tabindex="-1"><a class="header-anchor" href="#安装并且配置waf"><span>安装并且配置WAF</span></a></h1><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># git clone https://github.com/unixhot/waf.git</span></span>
<span class="line"><span></span></span>
<span class="line"><span>克隆到自己的仓库：</span></span>
<span class="line"><span># git clone https://gitee.com/funet8/waf.git</span></span>
<span class="line"><span></span></span>
<span class="line"><span># cd /usr/local/openresty/nginx/conf/</span></span>
<span class="line"><span># git clone https://gitee.com/funet8/waf.git waf-git</span></span>
<span class="line"><span># cp -a ./waf-git/waf /usr/local/openresty/nginx/conf/</span></span>
<span class="line"><span></span></span>
<span class="line"><span># vim /usr/local/openresty/nginx/conf/nginx.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#在http{}中增加，注意路径，同时WAF日志默认存放在/tmp/日期_waf.log</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#WAF</span></span>
<span class="line"><span>lua_shared_dict limit 50m;</span></span>
<span class="line"><span>lua_package_path &quot;/usr/local/openresty/nginx/conf/waf/?.lua&quot;;</span></span>
<span class="line"><span>init_by_lua_file &quot;/usr/local/openresty/nginx/conf/waf/init.lua&quot;;</span></span>
<span class="line"><span>access_by_lua_file &quot;/usr/local/openresty/nginx/conf/waf/access.lua&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>waf目录：/usr/local/openresty/nginx/conf/waf/</span></span>
<span class="line"><span>lua配置文件：/usr/local/openresty/nginx/conf/waf/config.lua</span></span>
<span class="line"><span>Waf的ip黑名单：/usr/local/openresty/nginx/conf/waf/rule-config/blackip.rule</span></span>
<span class="line"><span>Waf的ip白名单：/usr/local/openresty/nginx/conf/waf/rule-config/whiteip.rule</span></span>
<span class="line"><span>Waf的规则存放目录：/usr/local/openresty/nginx/conf/waf/rule-config</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    </span></span>
<span class="line"><span># ln -s /usr/local/openresty/lualib/resty/ /usr/local/openresty/nginx/conf/waf/resty</span></span>
<span class="line"><span># /usr/local/openresty/nginx/sbin/nginx -t</span></span>
<span class="line"><span># /usr/local/openresty/nginx/sbin/nginx -s reload</span></span>
<span class="line"><span></span></span>
<span class="line"><span>然后保存退出重启看日志</span></span>
<span class="line"><span>openresty -t &amp;&amp; openresty -s reload</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="waf模块配置文件详解" tabindex="-1"><a class="header-anchor" href="#waf模块配置文件详解"><span>WAF模块配置文件详解</span></a></h1><p>来学习一下waf/config.lua配置文件中的内容</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cat /usr/local/openresty/nginx/conf/waf/config.lua</span></span>
<span class="line"><span>--lua文件中，--为行注释，</span></span>
<span class="line"><span>--[[</span></span>
<span class="line"><span>这是块注释</span></span>
<span class="line"><span>--]]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cat /usr/local/openresty/nginx/conf/waf/config.lua</span></span>
<span class="line"><span></span></span>
<span class="line"><span>config_waf_enable = &quot;on&quot; --是否启用waf模块，值为 on 或 off</span></span>
<span class="line"><span>config_log_dir = &quot;/tmp&quot; --waf的日志位置，日志格式默认为json</span></span>
<span class="line"><span>config_rule_dir = &quot;/usr/local/openresty/nginx/conf/waf/rule-config&quot; --策略规则目录位置，可根据情况变动</span></span>
<span class="line"><span>config_white_url_check = &quot;on&quot; --是否开启URL检测</span></span>
<span class="line"><span>config_white_ip_check = &quot;on&quot; --是否开启IP白名单检测</span></span>
<span class="line"><span>config_black_ip_check = &quot;on&quot; --是否开启IP黑名单检测</span></span>
<span class="line"><span>config_url_check = &quot;on&quot; --是否开启URL过滤</span></span>
<span class="line"><span>config_url_args_check = &quot;on&quot; --是否开启Get参数过滤</span></span>
<span class="line"><span>config_user_agent_check = &quot;on&quot; --是否开启UserAgent客户端过滤</span></span>
<span class="line"><span>config_cookie_check = &quot;on&quot; --是否开启cookie过滤</span></span>
<span class="line"><span>config_cc_check = &quot;on&quot; --是否开启cc攻击过滤</span></span>
<span class="line"><span>config_cc_rate = &quot;10/60&quot; --cc攻击的速率/时间，单位为秒；默认示例中为单个IP地址在60秒内访问同一个页面次数超过10次则认为是cc攻击，则自动禁止此IP地址访问此页面60秒，60秒后解封(封禁过程中此IP地址依然可以访问其它页面，如果同一个页面访问次数超过10次依然会被禁止)</span></span>
<span class="line"><span>config_post_check = &quot;on&quot; --是否开启POST检测</span></span>
<span class="line"><span>config_waf_output = &quot;html&quot; --对于违反规则的请求则跳转到一个自定义html页面还是指定页面，值为 html 和 redirect</span></span>
<span class="line"><span>config_waf_redirect_url = &quot;https://www.unixhot.com&quot; --指定违反请求后跳转的指定html页面</span></span>
<span class="line"><span>--指定违反规则后跳转的自定义html页面</span></span>
<span class="line"><span>config_output_html=[[</span></span>
<span class="line"><span>&lt;html&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>&lt;meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=utf-8&quot; /&gt;</span></span>
<span class="line"><span>&lt;meta http-equiv=&quot;Content-Language&quot; content=&quot;zh-cn&quot; /&gt;</span></span>
<span class="line"><span>&lt;title&gt;网站防火墙&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>&lt;h1 align=&quot;center&quot;&gt; 欢迎白帽子进行授权安全测试，安全漏洞请联系QQ：1111111。</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span>
<span class="line"><span>]]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ip黑名单配置" tabindex="-1"><a class="header-anchor" href="#ip黑名单配置"><span>IP黑名单配置</span></a></h2><p>需要在config.lua中开启config_black_ip_check = &quot;on&quot;参数 IP黑名单配置非常简单，这个与Nginx的ngx_http_access_module模块原理是一致的，只需要把拒绝的地址加入到 waf/rule-config/blackip.rule文件中即可</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cat /usr/local/openresty/nginx/conf/waf/rule-config/blackip.rule</span></span>
<span class="line"><span>192.168.1.4</span></span>
<span class="line"><span>然后访问Openresty地址，如下已返回403被禁止</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ip白名单配置" tabindex="-1"><a class="header-anchor" href="#ip白名单配置"><span>IP白名单配置</span></a></h2><p>需要在config.lua中开启config_white_ip_check = &quot;on&quot;参数 IP白名单与黑名单相冲突，添加到IP白名单中的IP不受WAF限制,具体请自行测试</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cat /usr/local/openresty/nginx/conf/waf/rule-config/whiteip.rule</span></span>
<span class="line"><span>192.168.1.4</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="cc攻击过滤" tabindex="-1"><a class="header-anchor" href="#cc攻击过滤"><span>CC攻击过滤</span></a></h2><p>需要在config.lua中开启config_cc_check = &quot;on&quot;参数，然后指定config_cc_rate = &quot;10/60&quot;速率和时间 CC攻击只需要在config.lua配置文件中指定上面的两个参数即可</p><p>如下指定在60秒内对于单个IP地址访问单个页面的次数最大10次，超过10次则自动拉入黑名单，60秒后自动解除</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vim /usr/local/openresty/nginx/conf/waf/config.lua</span></span>
<span class="line"><span>config_cc_check = &quot;on&quot;</span></span>
<span class="line"><span>config_cc_rate = &quot;10/60&quot;</span></span>
<span class="line"><span>然后进行测试,如下刷新10次以后就变为来403</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们换个页面再次刷新，如下换个页面可以正常访问，不过连续对一个页面60秒内刷新10次以后将也被拉入黑名单</p><h2 id="异常url策略配置" tabindex="-1"><a class="header-anchor" href="#异常url策略配置"><span>异常URL策略配置</span></a></h2><p>需要在config.lua中开启config_url_check = &quot;on&quot;参数 然后定义rule-config/url.rule文件，url.rule文件默认为如下，如果匹配到规则的将跳转到由config.lua中config_waf_output = &quot;html&quot;参数指定的页面</p><p>禁止URL访问 .htaccess|.bash_history 的文件 禁止URL访问包含带有phpmyadmin|jmx-console|admin-console|jmxinvokerservlet地址 禁止URL访问包含 java.lang 的地址 禁止URL访问包含 .svn/ 的地址</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cat url.rule</span></span>
<span class="line"><span>\\.(htaccess|bash_history)</span></span>
<span class="line"><span>\\.(bak|inc|old|mdb|sql|backup|java|class|tgz|gz|tar|zip)$</span></span>
<span class="line"><span>(phpmyadmin|jmx-console|admin-console|jmxinvokerservlet)</span></span>
<span class="line"><span>java\\.lang</span></span>
<span class="line"><span>\\.svn\\/</span></span>
<span class="line"><span>/(attachments|upimg|images|css|uploadfiles|html|uploads|templets|static|template|data|inc|forumdata|upload|includes|cache|avatar)/(\\\\w+).(php|jsp)</span></span>
<span class="line"><span>假如你不想让别人访问根下的/login，那么就可以写入到配置中</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cat url.rule</span></span>
<span class="line"><span>\\.(htaccess|bash_history)</span></span>
<span class="line"><span>\\.(bak|inc|old|mdb|sql|backup|java|class|tgz|gz|tar|zip)$</span></span>
<span class="line"><span>(phpmyadmin|jmx-console|admin-console|jmxinvokerservlet)</span></span>
<span class="line"><span>java\\.lang</span></span>
<span class="line"><span>\\.svn\\/</span></span>
<span class="line"><span>/(attachments|upimg|images|css|uploadfiles|html|uploads|templets|static|template|data|inc|forumdata|upload|includes|cache|avatar)/(\\\\w+).(php|jsp)</span></span>
<span class="line"><span>/login</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后进行重启后访问,如下就跳转到了我们在config.lua中指定的页面，此页面可根据需求进行修改。如果上面默认的url规则匹配到了你的地址，那么你就可以把相应配置去掉</p><h2 id="异常useragent策略配置" tabindex="-1"><a class="header-anchor" href="#异常useragent策略配置"><span>异常UserAgent策略配置</span></a></h2><p>需要在config.lua中开启config_user_agent_check = &quot;on&quot;参数</p><p>WAF模块中默认封锁了以下UserAgent，如 HTTrack网站下载 namp网络扫描 audit网络审计 dirbuster网站目录扫描 pangolin SQL注入工具 scan网络扫描 hydra密码暴力破解 libwww漏洞工具 sqlmap自动SQL注入工具 w3af网络扫描 Nikto Web漏洞扫描 … 等等</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cat useragent.rule</span></span>
<span class="line"><span>(HTTrack|harvest|audit|dirbuster|pangolin|nmap|sqln|-scan|hydra|Parser|libwww|BBBike|sqlmap|w3af|owasp|Nikto|fimap|havij|PycURL|zmeu|BabyKrokodil|netsparker|httperf|bench)</span></span>
<span class="line"><span>我们正常访问URL是没问题的，下面来模拟一个非法的UserAgent进行访问</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#模拟网站下载</span></span>
<span class="line"><span>curl http://192.168.31.219/ --user-agent &#39;HTTrack&#39;</span></span>
<span class="line"><span>&lt;html&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>&lt;meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=utf-8&quot; /&gt;</span></span>
<span class="line"><span>&lt;meta http-equiv=&quot;Content-Language&quot; content=&quot;zh-cn&quot; /&gt;</span></span>
<span class="line"><span>&lt;title&gt;网站防火墙&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;h1 align=&quot;center&quot;&gt; 欢迎白帽子进行授权安全测试，安全漏洞请联系QQ：1111111。</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span>
<span class="line"><span>#模拟nmap网络扫描</span></span>
<span class="line"><span>curl http://192.168.31.219/ --user-agent &#39;nmap&#39;</span></span>
<span class="line"><span>&lt;html&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>&lt;meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=utf-8&quot; /&gt;</span></span>
<span class="line"><span>&lt;meta http-equiv=&quot;Content-Language&quot; content=&quot;zh-cn&quot; /&gt;</span></span>
<span class="line"><span>&lt;title&gt;网站防火墙&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>&lt;h1 align=&quot;center&quot;&gt; 欢迎白帽子进行授权安全测试，安全漏洞请联系QQ：1111111。</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span>
<span class="line"><span>添加禁止Chrome浏览器访问的UserAgent</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#跟随配置添加到最后</span></span>
<span class="line"><span>cat useragent.rule</span></span>
<span class="line"><span>(HTTrack|harvest|audit|dirbuster|pangolin|nmap|sqln|-scan|hydra|Parser|libwww|BBBike|sqlmap|w3af|owasp|Nikto|fimap|havij|PycURL|zmeu|BabyKrokodil|netsparker|httperf|bench|Chrome)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后重启Openrestry，通过Chrome浏览器进行访问，命中了WAF的规则</p><h2 id="异常get参数策略配置" tabindex="-1"><a class="header-anchor" href="#异常get参数策略配置"><span>异常Get参数策略配置</span></a></h2><p>需要在config.lua配置中开启config_url_args_check = &quot;on&quot;参数</p><p>默认封锁了如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cat args.rule</span></span>
<span class="line"><span>\\.\\./</span></span>
<span class="line"><span>\\:\\$</span></span>
<span class="line"><span>\\$\\{</span></span>
<span class="line"><span>select.+(from|limit)</span></span>
<span class="line"><span>(?:(union(.*?)select))</span></span>
<span class="line"><span>having|rongjitest</span></span>
<span class="line"><span>sleep\\((\\s*)(\\d*)(\\s*)\\)</span></span>
<span class="line"><span>benchmark\\((.*)\\,(.*)\\)</span></span>
<span class="line"><span>base64_decode\\(</span></span>
<span class="line"><span>(?:from\\W+information_schema\\W)</span></span>
<span class="line"><span>(?:(?:current_)user|database|schema|connection_id)\\s*\\(</span></span>
<span class="line"><span>(?:etc\\/\\W*passwd)</span></span>
<span class="line"><span>into(\\s+)+(?:dump|out)file\\s*</span></span>
<span class="line"><span>group\\s+by.+\\(</span></span>
<span class="line"><span>xwork.MethodAccessor</span></span>
<span class="line"><span>(?:define|eval|file_get_contents|include|require|require_once|shell_exec|phpinfo|system|passthru|preg_\\w+|execute|echo|print|print_r|var_dump|(fp)open|alert|showmodaldialog)\\(</span></span>
<span class="line"><span>xwork\\.MethodAccessor</span></span>
<span class="line"><span>(gopher|doc|php|glob|file|phar|zlib|ftp|ldap|dict|ogg|data)\\:\\/</span></span>
<span class="line"><span>java\\.lang</span></span>
<span class="line"><span>\\$_(GET|post|cookie|files|session|env|phplib|GLOBALS|SERVER)\\[</span></span>
<span class="line"><span>\\&lt;(iframe|script|body|img|layer|div|meta|style|base|object|input)</span></span>
<span class="line"><span>(onmouseover|onerror|onload)\\=</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>验证</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>我们进行访问 http://192.168.31.219/hello?aa=select id from mysql,得到如下，进行匹配</span></span>
<span class="line"><span></span></span>
<span class="line"><span>curl &#39;http://192.168.31.219/hello?aa=select id from mysql&#39;</span></span>
<span class="line"><span>&lt;html&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>&lt;meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=utf-8&quot; /&gt;</span></span>
<span class="line"><span>&lt;meta http-equiv=&quot;Content-Language&quot; content=&quot;zh-cn&quot; /&gt;</span></span>
<span class="line"><span>&lt;title&gt;网站防火墙&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;h1 align=&quot;center&quot;&gt; 欢迎白帽子进行授权安全测试，安全漏洞请联系QQ：1111111。</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span>
<span class="line"><span>我们也可以根据自己需求去配置，如下最后添加abcops</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cat args.rule</span></span>
<span class="line"><span>\\.\\./</span></span>
<span class="line"><span>\\:\\$</span></span>
<span class="line"><span>\\$\\{</span></span>
<span class="line"><span>select.+(from|limit)</span></span>
<span class="line"><span>(?:(union(.*?)select))</span></span>
<span class="line"><span>having|rongjitest</span></span>
<span class="line"><span>sleep\\((\\s*)(\\d*)(\\s*)\\)</span></span>
<span class="line"><span>benchmark\\((.*)\\,(.*)\\)</span></span>
<span class="line"><span>base64_decode\\(</span></span>
<span class="line"><span>(?:from\\W+information_schema\\W)</span></span>
<span class="line"><span>(?:(?:current_)user|database|schema|connection_id)\\s*\\(</span></span>
<span class="line"><span>(?:etc\\/\\W*passwd)</span></span>
<span class="line"><span>into(\\s+)+(?:dump|out)file\\s*</span></span>
<span class="line"><span>group\\s+by.+\\(</span></span>
<span class="line"><span>xwork.MethodAccessor</span></span>
<span class="line"><span>(?:define|eval|file_get_contents|include|require|require_once|shell_exec|phpinfo|system|passthru|preg_\\w+|execute|echo|print|print_r|var_dump|(fp)open|alert|showmodaldialog)\\(</span></span>
<span class="line"><span>xwork\\.MethodAccessor</span></span>
<span class="line"><span>(gopher|doc|php|glob|file|phar|zlib|ftp|ldap|dict|ogg|data)\\:\\/</span></span>
<span class="line"><span>java\\.lang</span></span>
<span class="line"><span>\\$_(GET|post|cookie|files|session|env|phplib|GLOBALS|SERVER)\\[</span></span>
<span class="line"><span>\\&lt;(iframe|script|body|img|layer|div|meta|style|base|object|input)</span></span>
<span class="line"><span>(onmouseover|onerror|onload)\\=</span></span>
<span class="line"><span>abcops</span></span>
<span class="line"><span>然后我们进行访问http://192.168.31.219/hello?aa=abcops也会匹配到规则</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="异常post参数策略配置" tabindex="-1"><a class="header-anchor" href="#异常post参数策略配置"><span>异常POST参数策略配置</span></a></h2><p>需要在config.lua中开启config_post_check = &quot;on&quot;选项，默认POST请求封禁如下，POST封禁内容与GET相似</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cat post.rule</span></span>
<span class="line"><span>\\.\\./</span></span>
<span class="line"><span>select.+(from|limit)</span></span>
<span class="line"><span>(?:(union(.*?)select))</span></span>
<span class="line"><span>having|rongjitest</span></span>
<span class="line"><span>sleep\\((\\s*)(\\d*)(\\s*)\\)</span></span>
<span class="line"><span>benchmark\\((.*)\\,(.*)\\)</span></span>
<span class="line"><span>base64_decode\\(</span></span>
<span class="line"><span>(?:from\\W+information_schema\\W)</span></span>
<span class="line"><span>(?:(?:current_)user|database|schema|connection_id)\\s*\\(</span></span>
<span class="line"><span>(?:etc\\/\\W*passwd)</span></span>
<span class="line"><span>into(\\s+)+(?:dump|out)file\\s*</span></span>
<span class="line"><span>group\\s+by.+\\(</span></span>
<span class="line"><span>xwork.MethodAccessor</span></span>
<span class="line"><span>(?:define|eval|file_get_contents|include|require|require_once|shell_exec|phpinfo|system|passthru|preg_\\w+|execute|echo|print|print_r|var_dump|(fp)open|alert|showmodaldialog)\\(</span></span>
<span class="line"><span>xwork\\.MethodAccessor</span></span>
<span class="line"><span>(gopher|doc|php|glob|file|phar|zlib|ftp|ldap|dict|ogg|data)\\:\\/</span></span>
<span class="line"><span>java\\.lang</span></span>
<span class="line"><span>\\$_(GET|post|cookie|files|session|env|phplib|GLOBALS|SERVER)\\[</span></span>
<span class="line"><span>\\&lt;(iframe|script|body|img|layer|div|meta|style|base|object|input)</span></span>
<span class="line"><span>(onmouseover|onerror|onload)\\=</span></span>
<span class="line"><span>直接对POST策略进行提交请求，通过curl -XPOST来进行提交POST请求</span></span>
<span class="line"><span></span></span>
<span class="line"><span>curl -XPOST &#39;http://192.168.31.219/hello?aa=select id from mysql&#39;</span></span>
<span class="line"><span>&lt;html&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>&lt;meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=utf-8&quot; /&gt;</span></span>
<span class="line"><span>&lt;meta http-equiv=&quot;Content-Language&quot; content=&quot;zh-cn&quot; /&gt;</span></span>
<span class="line"><span>&lt;title&gt;网站防火墙&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;h1 align=&quot;center&quot;&gt; 欢迎白帽子进行授权安全测试，安全漏洞请联系QQ：1111111。</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span>
<span class="line"><span>如上命中规则，我们查看Openrestry日志，查看是否为POST请求</span></span>
<span class="line"><span></span></span>
<span class="line"><span>tail -1 /usr/local/openresty/nginx/logs/access.log</span></span>
<span class="line"><span>192.168.31.217 - - [27/Jul/2020:18:21:32 +0800] &quot;POST /hello?aa=select id from mysql HTTP/1.1&quot; 403 313 &quot;-&quot; &quot;curl/7.29.0&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,62)]))}const r=n(l,[["render",p]]),o=JSON.parse('{"path":"/article/x1xyuy8s/","title":"Centos7-install-openresty-waf","lang":"en-US","frontmatter":{"title":"Centos7-install-openresty-waf","createTime":"2025/05/27 17:51:18","permalink":"/article/x1xyuy8s/"},"git":{"createdTime":1749111496000,"updatedTime":1750129445000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":2,"url":"https://github.com/star"}]},"readingTime":{"minutes":10.31,"words":3092},"filePathRelative":"web/Centos7-install-openresty-waf.md"}');export{r as comp,o as data};
