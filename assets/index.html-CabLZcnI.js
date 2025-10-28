import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as e}from"./app-BiQR_lPj.js";const l={};function p(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h1 id="快速搭建专属的私人网盘系统-ifilespace" tabindex="-1"><a class="header-anchor" href="#快速搭建专属的私人网盘系统-ifilespace"><span>快速搭建专属的私人网盘系统-iFileSpace</span></a></h1><h2 id="ifilespace介绍" tabindex="-1"><a class="header-anchor" href="#ifilespace介绍"><span>iFileSpace介绍</span></a></h2><p>iFileSpace 是一个在线个人文件管理工具，在线网盘程序，可快速一键搭建私人云盘，支持本地存储和对象存储（阿里云oss,腾讯云cos,华为云obs,又拍云,七牛云,OneDrive及其他支持S3协议对象存储）, 如部署在公网服务器，可替代百度网盘等在线网盘，自主搭建，数据完全自主管理！也可部署在家庭软路由、nas等个人存储设备中，作为局域网文件管理工具使用。支持多用户、多存储空间、资料库、webdav、离线下载及精细的后台权限管理。</p><p>iFileSpace 是一款 Go 语言开发的免费在线个人文件管理工具 (免费网盘架设程序)，你可以用它在 VPS 服务器或局域网电脑上快速一键搭建私人云盘。软件支持将用户的文件数据保存在本地存储，或者保存到后端对象存储服务去 (如阿里云 OSS、华为云 OBS、OneDrive 等）</p><p><img src="https://imgoss.xgss.net/picgo/iFileSpace.jpg?aliyun" alt="iFileSpace"></p><h2 id="安装流程" tabindex="-1"><a class="header-anchor" href="#安装流程"><span>安装流程</span></a></h2><p>官方网站： https://ifile.space/</p><p>安装文档： https://ifile.space/docs/home</p><p>本地安装系统说明</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>系统：centos7</span></span>
<span class="line"><span>IP： 192.168.1.5</span></span>
<span class="line"><span>端口：3030</span></span>
<span class="line"><span>用户名密码： admin 密码随机</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="服务端安装" tabindex="-1"><a class="header-anchor" href="#服务端安装"><span>服务端安装</span></a></h2><p>进入官网选择需要下载的服务端。</p><p>下载并且解压</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>$ mkdir -p /data/wwwroot/web/iFileSpace</span></span>
<span class="line"><span>$ cd /data/wwwroot/web/iFileSpace</span></span>
<span class="line"><span>可以去官方现在linux版本：  https://ifile.space/download</span></span>
<span class="line"><span>$ wget http://js.funet8.com/centos_software/ifile_linux_amd64_1.8.9.zip</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ unzip ifile_linux_amd64_1.8.9.zip </span></span>
<span class="line"><span>$ ls -l</span></span>
<span class="line"><span>total 43272</span></span>
<span class="line"><span>-rwxr-xr-x 1 www www 35857236 Sep 28 16:44 ifile</span></span>
<span class="line"><span>-rw-rw-r-- 1 www www 15574285 Sep 30 11:29 ifile_linux_amd64_1.8.9.zip</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>运行：</span></span>
<span class="line"><span>./ifile &amp;</span></span>
<span class="line"><span>初始管理员账号: admin</span></span>
<span class="line"><span>初始管理员密码: EbVIEgRa</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ____ ____ _  __         _____                         </span></span>
<span class="line"><span>   /  _// __/(_)/ /___     / ___/ ____   ____ _ _____ ___ </span></span>
<span class="line"><span>   / / / /_ / // // _ \\    \\__ \\ / __ \\ / __ \\// ___// _ \\</span></span>
<span class="line"><span> _/ / / __// // //  __/_  ___/ // /_/ // /_/ // /__ /  __/</span></span>
<span class="line"><span>/___//_/  /_//_/ \\___/(_)/____// .___/ \\__,_/ \\___/ \\___/ </span></span>
<span class="line"><span>                              /_/                         </span></span>
<span class="line"><span>==========================================================</span></span>
<span class="line"><span>Version:1.8.9</span></span>
<span class="line"><span>文件扫描计划任务启动成功，默认每小时0分启动，后台修改周期后需手动重启应用</span></span>
<span class="line"><span>系统启动成功,监听端口: 3030</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问： http://192.168.1.5:3030/ 进入后台</p><p><img src="https://imgoss.xgss.net/picgo/image-20210914111050324.png?aliyun" alt="image-20210914111050324"></p><h1 id="docker-使用" tabindex="-1"><a class="header-anchor" href="#docker-使用"><span>Docker 使用</span></a></h1><p>提供了docker镜像方式启动</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>docker run -itd --name ifile \\</span></span>
<span class="line"><span>--restart always \\</span></span>
<span class="line"><span>-p 3030:3030 \\</span></span>
<span class="line"><span>-v /data4T/docker_file/ifile/conf:/ifile/conf \\</span></span>
<span class="line"><span>-v /data4T/docker_file/ifile/files:/ifile/files  \\</span></span>
<span class="line"><span>-v /data4T/docker_file/ifile/data:/ifile/data \\</span></span>
<span class="line"><span>-v /data4T/docker_file/ifile/assets:/ifile/assets \\</span></span>
<span class="line"><span>-v /data4T/docker_file/ifile/tmp:/ifile/tmp \\</span></span>
<span class="line"><span>-v /data4T/docker_file/ifile/thumb:/ifile/thumb \\</span></span>
<span class="line"><span>-v /data4T/docker_file/ifile/logs:/ifile/logs \\</span></span>
<span class="line"><span>-d lgs821/ifile</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#替换 ‘~/ifile’ 为您的路径</span></span>
<span class="line"><span># -v ~/ifile/conf:/root/conf 映射配置文件目录</span></span>
<span class="line"><span># -v ~/ifile/files:/root/files 映射宿主机文件夹为默认存储空间</span></span>
<span class="line"><span># -v ~/ifile/data:/root/data 映射数据库文件夹</span></span>
<span class="line"><span># -v ~/ifile/assets:/root/assets 映射自定义相关文件夹</span></span>
<span class="line"><span># -v ~/ifile/tmp:/root/tmp 分片上传临时文件夹</span></span>
<span class="line"><span># -v ~/ifile/thumb:/root/thumb 图片缩略图缓存目录</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动后查看系统初始账号密码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>docker logs ifile</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>重设管理员账号密码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>docker exec -it ifile /bin/sh</span></span>
<span class="line"><span>./ifile -resetpass</span></span>
<span class="line"><span>exit</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>IP+端口访问：</p><p><img src="https://imgoss.xgss.net/picgo/image-20220531194115911.png?aliyun" alt="image-20220531194115911"></p><h2 id="设置页面" tabindex="-1"><a class="header-anchor" href="#设置页面"><span>设置页面</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/image-20220531194740497.png?aliyun" alt="image-20220531194740497"></p><h2 id="守护进程" tabindex="-1"><a class="header-anchor" href="#守护进程"><span>守护进程</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vi /usr/lib/systemd/system/ifile.service</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>或者新建ifile.service 文件复制下方内容粘贴，上传到服务器 /usr/lib/systemd/system/ 目录。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>[Unit]</span></span>
<span class="line"><span>Description=ifile</span></span>
<span class="line"><span>Documentation=https://ifile.space/docs</span></span>
<span class="line"><span>After=network.target</span></span>
<span class="line"><span>Wants=network.target</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Service]</span></span>
<span class="line"><span>WorkingDirectory=/ifile文件所在目录</span></span>
<span class="line"><span>ExecStart=/ifile文件所在目录/ifile</span></span>
<span class="line"><span>Restart=on-failure</span></span>
<span class="line"><span>RestartSec=10s</span></span>
<span class="line"><span>KillMode=mixed</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Install]</span></span>
<span class="line"><span>WantedBy=multi-user.target</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 更新systemd配置</span></span>
<span class="line"><span>systemctl daemon-reload</span></span>
<span class="line"><span># 设置开机启动</span></span>
<span class="line"><span>systemctl enable ifile</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 启动服务</span></span>
<span class="line"><span>systemctl start ifile</span></span>
<span class="line"><span># 停止服务</span></span>
<span class="line"><span>systemctl stop ifile</span></span>
<span class="line"><span># 重启服务</span></span>
<span class="line"><span>systemctl restart ifile</span></span>
<span class="line"><span># 查看状态</span></span>
<span class="line"><span>systemctl status ifile</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx-反向代理示例" tabindex="-1"><a class="header-anchor" href="#nginx-反向代理示例"><span>Nginx 反向代理示例</span></a></h2><blockquote><p>Nginx 反向代理需添加：proxy_set_header X-Forwarded-Proto $scheme;</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>server {</span></span>
<span class="line"><span>    listen       80;</span></span>
<span class="line"><span>    server_name  demo.ifile.space;</span></span>
<span class="line"><span>    client_max_body_size    1000m;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>      proxy_set_header Host $host;</span></span>
<span class="line"><span>      proxy_set_header X-Real-IP       $remote_addr;</span></span>
<span class="line"><span>      proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span>      proxy_set_header X-Forwarded-Proto $scheme; </span></span>
<span class="line"><span>      proxy_pass http://127.0.0.1:3030;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,38)]))}const t=n(l,[["render",p]]),v=JSON.parse('{"path":"/article/px5dbr0o/","title":"快速搭建专属的私人网盘系统-iFileSpace","lang":"en-US","frontmatter":{"title":"快速搭建专属的私人网盘系统-iFileSpace","createTime":"2025/05/27 17:51:17","permalink":"/article/px5dbr0o/"},"git":{"createdTime":1749111496000,"updatedTime":1750129445000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":2,"url":"https://github.com/star"}]},"readingTime":{"minutes":3.08,"words":924},"filePathRelative":"kaiyuan/Open-Source-Software/快速搭建专属的私人网盘系统-iFileSpace.md"}');export{t as comp,v as data};
