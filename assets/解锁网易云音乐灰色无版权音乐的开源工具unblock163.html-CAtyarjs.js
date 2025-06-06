import{_ as n,c as a,b as e,o as i}from"./app-BEL8OELx.js";const l={};function c(p,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="解锁网易云音乐灰色无版权音乐的开源工具unblock163" tabindex="-1"><a class="header-anchor" href="#解锁网易云音乐灰色无版权音乐的开源工具unblock163"><span>解锁网易云音乐灰色无版权音乐的开源工具unblock163</span></a></h1><h2 id="什么是unblock163-sh" tabindex="-1"><a class="header-anchor" href="#什么是unblock163-sh"><span>什么是unblock163.sh</span></a></h2><p>该脚本基于 UnblockNeteaseMusic 项目 https://github.com/nondanee/UnblockNeteaseMusic。</p><p>UnblockNeteaseMusic 是一个可以解锁网易云音乐灰色无版权音乐的代理工具。 原理是通过替换无版权音乐的链接为其他音源（QQ、酷我、酷狗、百度、咪咕、JOOX等）来实现解锁无版权音乐。相当于在网易云音乐客户端中听全网版权音乐！</p><p>建议有条件的部署在国内服务器，国外服务器只能用 QQ 音源，况且部署在国外相比国内或本地会慢上不少。</p><p><img src="https://imgoss.xgss.net/picgo/wangyi-music.webp.jpg?aliyun" alt="wangyi-music.webp"></p><h1 id="系统要求" tabindex="-1"><a class="header-anchor" href="#系统要求"><span>系统要求</span></a></h1><p>CentOS 6+ / Debian 6+ / Ubuntu 14.04 +</p><p>需要购买云服务器</p><h1 id="服务器安装方法" tabindex="-1"><a class="header-anchor" href="#服务器安装方法"><span>服务器安装方法</span></a></h1><p>注意：因为涉及防火墙端口开关、服务脚本安装，所以脚本需要以 ROOT 用户执行。</p><p>如果你要更新脚本，除了使用脚本中的 [0. 更新脚本] 功能以外，还可以再次输入下面这一行代码。</p><p>执行下面一行代码下载并运行脚本：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">wget -N --no-check-certificate https://shell.xiu2.xyz/unblock163.sh &amp;&amp; chmod +x unblock163.sh &amp;&amp; bash unblock163.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>下载运行后会提示你输入数字来选择要做什么。 输入 1 ，就会开始安装了，根据提示依次输入配置信息(或直接回车使用默认配置)即可。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">请输入数字 <span class="token punctuation">[</span><span class="token number">0</span>-10<span class="token punctuation">]</span>:1</span>
<span class="line"><span class="token punctuation">[</span>信息<span class="token punctuation">]</span> 开始设置 用户配置<span class="token punctuation">..</span>.</span>
<span class="line">请输入要使用的代理端口。 <span class="token punctuation">[</span><span class="token number">1</span>-65535<span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">[</span>注意<span class="token punctuation">]</span> 如果你在本地通过 Hosts 方式使用该代理，那么只能选择 <span class="token number">80</span> 端口，格式示例：80</span>
<span class="line"><span class="token punctuation">[</span>注意<span class="token punctuation">]</span> 如果需要搭配自签证书，那么还需要配置 HTTPS 端口，格式：HTTP:HTTPS，两个端口不能相同，格式示例：80:443&quot;</span>
<span class="line"><span class="token punctuation">(</span>默认: <span class="token number">80</span><span class="token punctuation">)</span>:</span>
<span class="line"></span>
<span class="line">------------------------</span>
<span class="line">    代理端口 <span class="token builtin class-name">:</span>  <span class="token number">80</span> </span>
<span class="line">------------------------</span>
<span class="line"></span>
<span class="line">请输入要使用的音源排序。 <span class="token punctuation">[</span>qq kuwo kugou baidu xiami migu joox<span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">[</span>注意<span class="token punctuation">]</span> 音源排序指的是，无版权音乐会根据此处顺序优先匹配首位音源，如果匹配到就返回，反之就继续往后匹配。</span>
<span class="line"><span class="token punctuation">[</span>注意<span class="token punctuation">]</span> 不同音源之间请用空格隔开。</span>
<span class="line"><span class="token punctuation">(</span>默认: qq migu kuwo kugou baidu<span class="token punctuation">)</span>:</span>
<span class="line"></span>
<span class="line">------------------------</span>
<span class="line">    音源排序 <span class="token builtin class-name">:</span>  qq migu kuwo kugou baidu </span>
<span class="line">------------------------</span>
<span class="line"></span>
<span class="line">是否启用严格模式？<span class="token punctuation">[</span>Y/n<span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">[</span>注意<span class="token punctuation">]</span> 启用严格模式后，本代理仅允许网易云音乐域名访问，即本地设备只能通过 Host 或 PAC 使用，强烈建议开启，否则所有设备流量都会经过本代理。</span>
<span class="line"><span class="token punctuation">(</span>默认：Y <span class="token punctuation">[</span>启用<span class="token punctuation">]</span><span class="token punctuation">)</span>:</span>
<span class="line"></span>
<span class="line">------------------------</span>
<span class="line">    严格模式 <span class="token builtin class-name">:</span>  YES </span>
<span class="line">------------------------</span>
<span class="line"></span>
<span class="line">指定网易服务器 IP，不懂请跳过。<span class="token punctuation">[</span>格式：IPv4<span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">(</span>默认为空<span class="token punctuation">)</span>:</span>
<span class="line"></span>
<span class="line">------------------------</span>
<span class="line">    指定 IP <span class="token builtin class-name">:</span>   </span>
<span class="line">------------------------</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">[</span>信息<span class="token punctuation">]</span> 开始安装/配置 依赖<span class="token punctuation">..</span>.</span>
<span class="line"><span class="token punctuation">[</span>信息<span class="token punctuation">]</span> 开始下载/安装<span class="token punctuation">..</span>.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果安装过程没有出错，那么最后就会提示：</p><p><img src="https://imgoss.xgss.net/picgo/image-20220207163359469.png?aliyun" alt="image-20220207163359469"></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">    UnblockNeteaseMusic 配置信息：</span>
<span class="line">    ------------------------</span>
<span class="line">    本机地址: X.X.X.X</span>
<span class="line">    代理端口: <span class="token number">80</span></span>
<span class="line">    音源排序: qq migu kuwo kugou baidu</span>
<span class="line">    严格模式: YES</span>
<span class="line">    指定 IP: </span>
<span class="line">    PAC 地址: http://X.X.X.X:80/proxy.pac</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法"><span>使用方法</span></a></h1><h2 id="客户端使用" tabindex="-1"><a class="header-anchor" href="#客户端使用"><span>客户端使用</span></a></h2><p>安装并启动成功后，就可以在本地设备上使用了。 以下两种模式任选其一，不要同时使用。</p><h2 id="hosts模式" tabindex="-1"><a class="header-anchor" href="#hosts模式"><span>Hosts模式</span></a></h2><p>在 Hosts 末尾中添加下面两行：</p><p><strong>X.X.X.X 更换成你的服务器IP</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">X.X.X.X music.163.com</span>
<span class="line">X.X.X.X interface.music.163.com</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pac模式" tabindex="-1"><a class="header-anchor" href="#pac模式"><span>PAC模式</span></a></h2><p>如果无法配置 Hosts（例如手机），那么可以使用 PAC。 修改设备的代理自动配置为下面一行内容：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">http://X.X.X.X:端口/proxy.pac</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>X.X.X.X 指的是你的服务器IP，端口是你的代理端口，记得修改，不要傻傻的跟着写。</strong></p><h2 id="各平台pac设置步骤" tabindex="-1"><a class="header-anchor" href="#各平台pac设置步骤"><span>各平台PAC设置步骤</span></a></h2><h1 id="脚本说明" tabindex="-1"><a class="header-anchor" href="#脚本说明"><span>脚本说明</span></a></h1><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">bash unblock163.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>输入对应的数字来执行相应的命令。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"> UnblockNeteaseMusic 一键脚本 [vX.X.X]</span>
<span class="line"></span>
<span class="line">    0. 更新脚本</span>
<span class="line"></span>
<span class="line">----------</span>
<span class="line"></span>
<span class="line">    1. 安装</span>
<span class="line">    2. 更新</span>
<span class="line">    3. 卸载</span>
<span class="line"></span>
<span class="line">----------</span>
<span class="line"></span>
<span class="line">    4. 启动</span>
<span class="line">    5. 停止</span>
<span class="line">    6. 重启</span>
<span class="line"></span>
<span class="line">----------</span>
<span class="line"></span>
<span class="line">    7. 设置 配置信息</span>
<span class="line">    8. 查看 账号信息</span>
<span class="line">    9. 查看 日志信息</span>
<span class="line">   10. 查看 链接信息</span>
<span class="line"></span>
<span class="line"> 当前状态: 已安装 并 已启动</span>
<span class="line"></span>
<span class="line"> 请输入数字 [0-10]:</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="文件位置" tabindex="-1"><a class="header-anchor" href="#文件位置"><span>文件位置</span></a></h1><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">安装目录：/usr/local/UnblockNeteaseMusic</span>
<span class="line">日志文件：/usr/local/UnblockNeteaseMusic/UnblockNeteaseMusic.log</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="其他命令" tabindex="-1"><a class="header-anchor" href="#其他命令"><span>其他命令</span></a></h1><p>除了用脚本启动、停止、重启以外，还能通过其他命令操作。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">启动：/etc/init.d/unblock163 start</span>
<span class="line">停止：/etc/init.d/unblock163 stop</span>
<span class="line">重启：/etc/init.d/unblock163 restart</span>
<span class="line">查看状态：/etc/init.d/unblock163 status</span>
<span class="line"></span>
<span class="line">http://X.X.X.X:端口/proxy.pac</span>
<span class="line">		</span>
<span class="line"></span>
<span class="line">日志：</span>
<span class="line">tail -f /usr/local/UnblockNeteaseMusic/UnblockNeteaseMusic.log</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项"><span>注意事项</span></a></h1><p>启动失败的可能原因</p><p>端口被占用如果日志中显示以下内容，即说明端口被占用了。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">HTTP Server running @ http://0.0.0.0:80</span>
<span class="line">events.js:174</span>
<span class="line">      throw er; // Unhandled &#39;error&#39; event</span>
<span class="line">      ^</span>
<span class="line">Error: listen EADDRINUSE: address already in use 0.0.0.0:80</span>
<span class="line">    at Server.setupListenHandle [as _listen2] (net.js:1279:14)</span>
<span class="line">    at listenInCluster (net.js:1327:12)</span>
<span class="line">    at doListen (net.js:1460:7)</span>
<span class="line">    at process._tickCallback (internal/process/next_tick.js:63:19)</span>
<span class="line">Emitted &#39;error&#39; event at:</span>
<span class="line">    at emitErrorNT (net.js:1306:8)</span>
<span class="line">    at process._tickCallback (internal/process/next_tick.js:63:19)</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际报错</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">cat  /usr/local/UnblockNeteaseMusic/UnblockNeteaseMusic.log</span>
<span class="line">/usr/local/UnblockNeteaseMusic/node/bin/node: /lib64/libm.so.6: version \`GLIBC_2.27&#39; not found (required by /usr/local/UnblockNeteaseMusic/node/bin/node)</span>
<span class="line">/usr/local/UnblockNeteaseMusic/node/bin/node: /lib64/libc.so.6: version \`GLIBC_2.25&#39; not found (required by /usr/local/UnblockNeteaseMusic/node/bin/node)</span>
<span class="line">/usr/local/UnblockNeteaseMusic/node/bin/node: /lib64/libc.so.6: version \`GLIBC_2.28&#39; not found (required by /usr/local/UnblockNeteaseMusic/node/bin/node)</span>
<span class="line">/usr/local/UnblockNeteaseMusic/node/bin/node: /lib64/libstdc++.so.6: version \`CXXABI_1.3.9&#39; not found (required by /usr/local/UnblockNeteaseMusic/node/bin/node)</span>
<span class="line">/usr/local/UnblockNeteaseMusic/node/bin/node: /lib64/libstdc++.so.6: version \`GLIBCXX_3.4.20&#39; not found (required by /usr/local/UnblockNeteaseMusic/node/bin/node)</span>
<span class="line">/usr/local/UnblockNeteaseMusic/node/bin/node: /lib64/libstdc++.so.6: version \`GLIBCXX_3.4.21&#39; not found (required by /usr/local/UnblockNeteaseMusic/node/bin/node)</span>
<span class="line"></span>
<span class="line">出现 /lib64/libm.so.6: versionGLIBC_2.23’ not found\` 需要升级Glibc</span>
<span class="line"></span>
<span class="line">yum -y install bison</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h1><p>阿里云/腾讯云/微软云/谷歌云等无法连接的可能原因 阿里云/腾讯云/微软云/谷歌云等服务商的云服务器，服务器与网络实际上是分开的，所以分为内网防火墙和外网防火墙，脚本只能修改到内网防火墙，外网防火墙需要你自行去后台寻找 [防火墙/安全规则/端口规则] 等字样相关选项开放代理端口。</p><p>原文地址： https://shell.xiu2.xyz/#/md/unblock163</p>`,49)]))}const t=n(l,[["render",c]]),u=JSON.parse('{"path":"/kaiyuan/Open-Source-Software/%E8%A7%A3%E9%94%81%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90%E7%81%B0%E8%89%B2%E6%97%A0%E7%89%88%E6%9D%83%E9%9F%B3%E4%B9%90%E7%9A%84%E5%BC%80%E6%BA%90%E5%B7%A5%E5%85%B7unblock163.html","title":"解锁网易云音乐灰色无版权音乐的开源工具unblock163","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"kaiyuan/Open-Source-Software/解锁网易云音乐灰色无版权音乐的开源工具unblock163.md"}');export{t as comp,u as data};
