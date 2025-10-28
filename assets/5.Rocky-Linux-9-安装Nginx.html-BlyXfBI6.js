import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as e}from"./app-BiQR_lPj.js";const l={};function p(d,n){return e(),a("div",null,n[0]||(n[0]=[i(`<h1 id="rocky-linux-9-系统下安装nginx" tabindex="-1"><a class="header-anchor" href="#rocky-linux-9-系统下安装nginx"><span>Rocky Linux 9 系统下安装Nginx</span></a></h1><p>大家好，我是星哥，Nginx 凭借其高性能、低资源消耗以及优秀的反向代理能力，已成为 Web 服务部署的主流选择之一。</p><p>本文将带你在 <strong>Rocky Linux 9</strong> 系统下从零开始安装并配置 Nginx 服务，适合初学者和运维爱好者快速上手。</p><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1751521443261.png?tx" alt="img"></p><h2 id="快速安装" tabindex="-1"><a class="header-anchor" href="#快速安装"><span>快速安装</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>gitee（国内）:</span></span>
<span class="line"><span>wget https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/Rocky_Linux_9_Dnf_Install_Nginx.sh</span></span>
<span class="line"><span>sh Rocky_Linux_9_Dnf_Install_Nginx.sh</span></span>
<span class="line"><span></span></span>
<span class="line"><span>github:</span></span>
<span class="line"><span>wget https://raw.githubusercontent.com/funet8/Rocky-Linux-Shell/refs/heads/main/shell/Rocky_Linux_9_Dnf_Install_Nginx.sh</span></span>
<span class="line"><span>sh Rocky_Linux_9_Dnf_Install_Nginx.sh</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 主要功能介绍</span></span>
<span class="line"><span># 1.dnf安装nginx</span></span>
<span class="line"><span># 2.firewall-cmd放开 80和443端口</span></span>
<span class="line"><span># 3.nginx配置文件：</span></span>
<span class="line"><span># 主配置文件：/data/conf/nginx.conf</span></span>
<span class="line"><span># 站点配置文件：/data/conf/sites-available/nginx_*</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="一、更新系统和安装epel" tabindex="-1"><a class="header-anchor" href="#一、更新系统和安装epel"><span>一、更新系统和安装EPEL</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 更新系统</span></span>
<span class="line"><span>dnf update -y</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 安装 EPEL 仓库（以防依赖）</span></span>
<span class="line"><span>dnf install epel-release -y</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、安装-nginx" tabindex="-1"><a class="header-anchor" href="#二、安装-nginx"><span>二、安装 Nginx</span></a></h2><p>启动并设置开机自启</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>dnf install nginx -y</span></span>
<span class="line"><span># 启动并设置开机自启</span></span>
<span class="line"><span>systemctl start nginx</span></span>
<span class="line"><span>systemctl enable nginx</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、配置防火墙允许-http-和-https" tabindex="-1"><a class="header-anchor" href="#三、配置防火墙允许-http-和-https"><span>三、配置防火墙允许 HTTP 和 HTTPS</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 配置防火墙允许 HTTP 和 HTTPS</span></span>
<span class="line"><span>firewall-cmd --permanent --add-service=http</span></span>
<span class="line"><span>firewall-cmd --permanent --add-service=https</span></span>
<span class="line"><span>firewall-cmd --zone=public --add-port=80/tcp --permanent</span></span>
<span class="line"><span>firewall-cmd --zone=public --add-port=443/tcp --permanent</span></span>
<span class="line"><span>firewall-cmd --reload</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、配置nginx目录和配置文件" tabindex="-1"><a class="header-anchor" href="#四、配置nginx目录和配置文件"><span>四、配置Nginx目录和配置文件</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>#配置文件目录设置</span></span>
<span class="line"><span>wget -q -O - https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/create_dirs.sh | bash -sh</span></span>
<span class="line"><span>#移动nginx配置文件</span></span>
<span class="line"><span>cp -p /etc/nginx/nginx.conf  /etc/nginx/nginx.conf.bak</span></span>
<span class="line"><span>rm -rf /etc/nginx/nginx.conf</span></span>
<span class="line"><span>cd /data/conf/</span></span>
<span class="line"><span>wget https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/nginx.conf</span></span>
<span class="line"><span>ln -s /data/conf/nginx.conf /etc/nginx/</span></span>
<span class="line"><span>echo &quot;nginx.conf move success&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#站点配置</span></span>
<span class="line"><span>cd /data/conf/sites-available/</span></span>
<span class="line"><span>wget https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/nginx_main.conf</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、创建用户和用户组" tabindex="-1"><a class="header-anchor" href="#五、创建用户和用户组"><span>五、创建用户和用户组</span></a></h2><p>创建www用户</p><p>并且设置目录权限</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>#添加www组和www用户</span></span>
<span class="line"><span>groupadd www</span></span>
<span class="line"><span>useradd -g www www</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#设置目录权限##########################################################################</span></span>
<span class="line"><span>chown -R www:www /data/wwwroot/web</span></span>
<span class="line"><span>chown -R www:www /data/conf/sites-available/</span></span>
<span class="line"><span># 权限问题会报错 403</span></span>
<span class="line"><span>chmod 755 -R /data/</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 删除默认站点文件</span></span>
<span class="line"><span>rm -rf /usr/share/nginx/html/*</span></span>
<span class="line"><span>echo &#39;index page&#39; &gt; /usr/share/nginx/html/index.html</span></span>
<span class="line"><span>chown www.www -R /usr/share/nginx/html/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、检查nginx是否启动成功" tabindex="-1"><a class="header-anchor" href="#六、检查nginx是否启动成功"><span>六、检查Nginx是否启动成功</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 检查是否启动成功</span></span>
<span class="line"><span>systemctl restart nginx</span></span>
<span class="line"><span>systemctl status nginx | grep Active</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;Nginx 安装并启动完成。&quot;</span></span>
<span class="line"><span>echo &quot;请访问 http://&lt;你的服务器IP&gt; 验证 Nginx 是否运行。&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="七、定时任务切割日志" tabindex="-1"><a class="header-anchor" href="#七、定时任务切割日志"><span>七、定时任务切割日志</span></a></h2><p>crontab定时每日切割日志</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>###切割日志</span></span>
<span class="line"><span>cd /data/conf/shell/</span></span>
<span class="line"><span>wget https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/nginx_cut_web_log.sh</span></span>
<span class="line"><span>chmod +x /data/conf/shell/nginx_cut_web_log.sh</span></span>
<span class="line"><span>echo &quot;00 00 * * * root /data/conf/shell/nginx_cut_web_log.sh&quot; &gt;&gt; /etc/crontab</span></span>
<span class="line"><span>systemctl restart crond</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基本配置文件路径说明" tabindex="-1"><a class="header-anchor" href="#基本配置文件路径说明"><span>基本配置文件路径说明</span></a></h2><table><thead><tr><th>项目</th><th>路径</th></tr></thead><tbody><tr><td>配置主文件</td><td><code>/data/conf/nginx.conf</code></td></tr><tr><td>站点配置目录</td><td><code>/data/conf/sites-available/nginx_*</code></td></tr><tr><td>默认站点文件</td><td><code>/usr/share/nginx/html/index.html</code></td></tr><tr><td>日志文件</td><td><code>/data/wwwroot/log/nginx_access.log</code> <code>/data/wwwroot/log/nginx_error.log</code></td></tr></tbody></table><h2 id="nginx常用命令" tabindex="-1"><a class="header-anchor" href="#nginx常用命令"><span>Nginx常用命令</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 重新加载配置</span></span>
<span class="line"><span>sudo nginx -s reload</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查配置是否有误</span></span>
<span class="line"><span>sudo nginx -t</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 停止服务</span></span>
<span class="line"><span>sudo systemctl stop nginx</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 重启服务</span></span>
<span class="line"><span>sudo systemctl restart nginx</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此，您已成功在 Rocky Linux 9 系统中部署了 Nginx，并完成了基本的服务启动与防火墙配置。后续可以继续扩展 HTTPS、反向代理、负载均衡、静态资源优化等进阶配置。</p>`,29)]))}const r=s(l,[["render",p]]),h=JSON.parse('{"path":"/Rocky-Linux/5.Rocky-Linux-9-%E5%AE%89%E8%A3%85Nginx.html","title":"Rocky Linux 9 系统下安装Nginx","lang":"en-US","frontmatter":{},"git":{"createdTime":1752136049000,"updatedTime":1752136049000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}]},"readingTime":{"minutes":2.22,"words":665},"filePathRelative":"Rocky-Linux/5.Rocky-Linux-9-安装Nginx.md"}');export{r as comp,h as data};
