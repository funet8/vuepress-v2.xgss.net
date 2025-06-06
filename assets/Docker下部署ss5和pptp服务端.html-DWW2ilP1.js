import{_ as n,c as e,b as a,o as i}from"./app-BEL8OELx.js";const l={};function p(d,s){return i(),e("div",null,s[0]||(s[0]=[a(`<h1 id="docker下部署socks5和pptp服务端-实现代理上网" tabindex="-1"><a class="header-anchor" href="#docker下部署socks5和pptp服务端-实现代理上网"><span>Docker下部署socks5和pptp服务端，实现代理上网</span></a></h1><p>在日常工作中星哥经常要搭建socks5（以下称为ss5）和pptp，来实现代理上网，之前一直使用脚本安装，有些不方便想想能不能用docker一键部署。</p><p>socks5和PPTP（Point-to-Point Tunneling Protocol）作为常见的和代理工具，已经成为了用户获取隐私保护和突破网络限制的关键工具。</p><p>本文将介绍如何在Docker容器中部署SS5和PPTP服务端，为您的网络带来更强的安全性和隐私保护。</p><p><img src="https://imgoss.xgss.net/picgo/image-20250115185452294.png?aliyun" alt="image-20250115185452294"></p><h1 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作"><span>准备工作</span></a></h1><ul><li>云服务器、NAS、虚拟机等 【 阿里云优惠： <a href="https://y.xgss.net/aliyun" target="_blank" rel="noopener noreferrer">https://y.xgss.net/aliyun</a> 或 腾讯云优惠： <a href="https://y.xgss.net/tx" target="_blank" rel="noopener noreferrer">https://y.xgss.net/tx</a> 】</li><li>本篇文章在Centos7.9系统下演示，当然其他支持Docker系统亦可</li><li>安装docker和docker-compose 【本篇文章不细讲，可以看星哥之前的教程或者官方文档】</li></ul><h1 id="docker部署ss5服务器" tabindex="-1"><a class="header-anchor" href="#docker部署ss5服务器"><span>Docker部署ss5服务器</span></a></h1><p>我们使用以下命令启动一个 Docker 容器：</p><h3 id="启动命令" tabindex="-1"><a class="header-anchor" href="#启动命令"><span>启动命令</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker run -itd --restart always \\</span>
<span class="line">--name socks5 \\</span>
<span class="line">-p 1080:1080 \\</span>
<span class="line">-e PROXY_USER=myuser \\</span>
<span class="line">-e PROXY_PASSWORD=mypassword \\</span>
<span class="line">-e PROXY_SERVER=0.0.0.0:1080 xkuma/socks5</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="命令解释" tabindex="-1"><a class="header-anchor" href="#命令解释"><span>命令解释</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">1. docker run:</span>
<span class="line">这是启动一个新的容器的基础命令，表示运行一个新的容器实例。</span>
<span class="line"></span>
<span class="line">2. -itd:</span>
<span class="line">这个参数包含了三个选项：</span>
<span class="line"></span>
<span class="line">-i：表示“交互式”，即保持容器的标准输入流打开，允许在容器内部进行交互。</span>
<span class="line">-t：分配一个伪终端，用于控制台输出。</span>
<span class="line">-d：表示“后台运行”（detached），即容器在后台运行，而不是占用当前的终端。</span>
<span class="line">3. --restart always:</span>
<span class="line">表示容器在退出时会自动重启。如果容器因任何原因停止，它会自动尝试重新启动。此设置适合需要长期运行的服务，例如代理服务。</span>
<span class="line"></span>
<span class="line">4. --name socks5:</span>
<span class="line">指定容器的名字为socks5。容器可以通过名字来访问，而不需要使用容器ID。</span>
<span class="line"></span>
<span class="line">5. -p 1080:1080:</span>
<span class="line">映射容器内的端口到主机系统的端口。在这种情况下，容器内的1080端口会映射到主机的1080端口。由于Socks5代理通常使用1080端口，所以这是暴露代理端口的设置。</span>
<span class="line"></span>
<span class="line">6. -e PROXY_USER=myuser:</span>
<span class="line">通过环境变量传递代理的用户名。容器启动时，PROXY_USER环境变量会设置为myuser，用于Socks5代理认证的用户名。</span>
<span class="line"></span>
<span class="line">7. -e PROXY_PASSWORD=mypassword:</span>
<span class="line">通过环境变量传递代理的密码。容器启动时，PROXY_PASSWORD环境变量会设置为mypassword，用于Socks5代理认证的密码。</span>
<span class="line"></span>
<span class="line">8. -e PROXY_SERVER=0.0.0.0:1080:</span>
<span class="line">通过环境变量配置代理服务的监听地址和端口。PROXY_SERVER设置为0.0.0.0:1080，表示代理服务会监听所有网络接口上的1080端口。</span>
<span class="line"></span>
<span class="line">9. xkuma/socks5:</span>
<span class="line">这是Docker镜像的名字。在这里，xkuma/socks5是一个公开的Socks5代理镜像。它包含了Socks5代理服务的所有必要代码和配置，能够在容器中运行一个Socks5代理服务。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看状态" tabindex="-1"><a class="header-anchor" href="#查看状态"><span>查看状态</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># docker ps</span>
<span class="line">CONTAINER ID   IMAGE                COMMAND                  CREATED          STATUS          PORTS                    NAMES</span>
<span class="line">df197d1987a5   xkuma/socks5         &quot;/bin/scoks5&quot;            4 seconds ago    Up 3 seconds    0.0.0.0:1080-&gt;1080/tcp   socks5</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="开放端口" tabindex="-1"><a class="header-anchor" href="#开放端口"><span>开放端口</span></a></h2><p>服务器的防火墙或者云服务器的安全组策略都需要打开 1080 端口。</p><p>这里我只演示centos7的命令</p><h3 id="iptables" tabindex="-1"><a class="header-anchor" href="#iptables"><span>iptables</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">iptables -A INPUT -p tcp --dport 1080  -j ACCEPT</span>
<span class="line">service iptables save</span>
<span class="line">systemctl restart iptables</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="firewalld" tabindex="-1"><a class="header-anchor" href="#firewalld"><span>firewalld</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># firewall-cmd --zone=public --add-port=1080/tcp --permanent</span>
<span class="line"># firewall-cmd --reload</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="客户端验证" tabindex="-1"><a class="header-anchor" href="#客户端验证"><span>客户端验证</span></a></h2><p>这里我使用火狐浏览器的FoxyProxy插件，当然你也可以使用其他支持ss5的工具</p><p><img src="https://imgoss.xgss.net/picgo/image-20250115185016500.png?aliyun" alt="image-20250115185016500"></p><p>使用ip查询</p><p><img src="https://imgoss.xgss.net/picgo/image-20250115185254644.png?aliyun" alt="image-20250115185254644"></p><p>至此使用Docker部署ss5服务器完成。</p><h1 id="docker部署pptp服务器" tabindex="-1"><a class="header-anchor" href="#docker部署pptp服务器"><span>Docker部署PPTP服务器</span></a></h1><p>PPTP（点对点隧道协议）是一种常见的VPN协议，虽然它的安全性已经被一些新型的VPN协议所取代，但由于其配置简单、广泛支持，仍然在某些场景下得到使用。</p><h2 id="_1-创建dockerfile" tabindex="-1"><a class="header-anchor" href="#_1-创建dockerfile"><span>1.创建Dockerfile</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">FROM ubuntu:20.04</span>
<span class="line"></span>
<span class="line"># 安装PPTP和其它依赖</span>
<span class="line">RUN apt-get update &amp;&amp; \\</span>
<span class="line">    apt-get install -y pptpd &amp;&amp; \\</span>
<span class="line">    apt-get clean</span>
<span class="line"></span>
<span class="line"># 配置PPTP</span>
<span class="line">RUN echo &quot;option /usr/sbin/pptpd&quot; &gt;&gt; /etc/pptpd.conf &amp;&amp; \\</span>
<span class="line">    echo &quot;localip 10.0.0.1&quot; &gt;&gt; /etc/pptpd.conf &amp;&amp; \\</span>
<span class="line">    echo &quot;remoteip 10.0.0.100-200&quot; &gt;&gt; /etc/pptpd.conf</span>
<span class="line"></span>
<span class="line"># 设置VPN账户</span>
<span class="line">RUN echo &quot;vpnuser pptpd password *&quot; &gt;&gt; /etc/ppp/chap-secrets</span>
<span class="line"></span>
<span class="line"># 打开PPTP服务</span>
<span class="line">CMD [&quot;pptpd&quot;, &quot;--debug&quot;, &quot;--fg&quot;]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-构建docker镜像" tabindex="-1"><a class="header-anchor" href="#_2-构建docker镜像"><span>2.构建Docker镜像</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker build -t my-pptp-server .</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="_3-运行docker容器" tabindex="-1"><a class="header-anchor" href="#_3-运行docker容器"><span>3.运行Docker容器</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker run -d \\</span>
<span class="line">    --name pptp-server \\</span>
<span class="line">    --privileged \\</span>
<span class="line">    -p 1723:1723 \\</span>
<span class="line">    -p 47:47 \\</span>
<span class="line">    my-pptp-server</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-客户端连接" tabindex="-1"><a class="header-anchor" href="#_4-客户端连接"><span>4.客户端连接</span></a></h2><p>服务器地址：你的服务器IP 用户名：vpnuser 密码：password</p><h1 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h1><p>通过Docker部署SS5和PPTP服务端可以为您的网络提供更高效的管理和维护方式。Docker容器化的优势使得配置和部署更加灵活，尤其在跨平台和高可用性场景下非常适用。</p>`,40)]))}const r=n(l,[["render",p]]),t=JSON.parse('{"path":"/kaiyuan2025/Docker%E4%B8%8B%E9%83%A8%E7%BD%B2ss5%E5%92%8Cpptp%E6%9C%8D%E5%8A%A1%E7%AB%AF.html","title":"Docker下部署socks5和pptp服务端，实现代理上网","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"kaiyuan2025/Docker下部署ss5和pptp服务端.md"}');export{r as comp,t as data};
