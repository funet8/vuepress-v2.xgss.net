import{_ as e,c as a,b as n,o as i}from"./app-BEL8OELx.js";const l={};function p(t,s){return i(),a("div",null,s[0]||(s[0]=[n(`<h1 id="开源项目messagenest打造个性化消息推送平台多种通知方式" tabindex="-1"><a class="header-anchor" href="#开源项目messagenest打造个性化消息推送平台多种通知方式"><span>开源项目MessageNest打造个性化消息推送平台多种通知方式</span></a></h1><p>今天介绍一个开源项目，Message Nest - 可以打造个性化消息推送平台，整合邮件、钉钉、企业微信等多种通知方式。定制你的消息，让通知方式更灵活多样。</p><p>开源地址： https://github.com/engigu/Message-Push-Nest</p><h2 id="测试平台" tabindex="-1"><a class="header-anchor" href="#测试平台"><span>测试平台</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">系统： centos7</span>
<span class="line">IP: 192.168.1.15</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/kaiyuanxiangmugexinghuaxm.jpg?aliyun" alt="kaiyuanxiangmugexinghuaxm"></p><h2 id="安装messagenest" tabindex="-1"><a class="header-anchor" href="#安装messagenest"><span>安装MessageNest</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">[root@node15]# mkdir /data/MessageNest/</span>
<span class="line"># cd /data/MessageNest/</span>
<span class="line">[root@node15 MessageNest]# wget https://github.com/engigu/Message-Push-Nest/releases/download/v0.1.0/Message-Nest_Linux_x86_64.tar.gz</span>
<span class="line">[root@node15 MessageNest]# tar -zxvf Message-Nest_Linux_x86_64.tar.gz </span>
<span class="line"></span>
<span class="line">[root@node15 MessageNest]# ll</span>
<span class="line">total 20652</span>
<span class="line">drwxr-xr-x 2 root root         21 Jan 26 15:33 conf</span>
<span class="line">-rw-r--r-- 1 1001 docker     1116 Jan 26 15:20 LICENSE</span>
<span class="line">-rw-r--r-- 1 root root    5914641 Jan 26 15:30 Message-Nest_Linux_x86_64.tar.gz</span>
<span class="line">-rwxr-xr-x 1 1001 docker 15216640 Jan 26 15:21 Message-Push-Nest</span>
<span class="line">-rw-r--r-- 1 1001 docker     4692 Jan 26 15:20 README.md</span>
<span class="line"></span>
<span class="line"># mv conf/app.example.ini conf/app.ini</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据库配置" tabindex="-1"><a class="header-anchor" href="#数据库配置"><span>数据库配置：</span></a></h2><p>我本地已经有安装mysql，如果没有还需要安装，安装教程自行度娘。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">数据库地址： 192.168.1.8:61922</span>
<span class="line">用户： message-user</span>
<span class="line">密码： 123456</span>
<span class="line">库名： messagenest</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改配置" tabindex="-1"><a class="header-anchor" href="#修改配置"><span>修改配置</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">vim conf/app.ini</span>
<span class="line"></span>
<span class="line">[app]</span>
<span class="line">JwtSecret = message-nest</span>
<span class="line">RuntimeRootPath = runtime/</span>
<span class="line">LogLevel = INFO</span>
<span class="line"></span>
<span class="line">; init table data, first run set enable</span>
<span class="line">InitData = enable</span>
<span class="line"></span>
<span class="line">[server]</span>
<span class="line">; debug or release</span>
<span class="line">RunMode = release</span>
<span class="line">HttpPort = 8000</span>
<span class="line">ReadTimeout = 60</span>
<span class="line">WriteTimeout = 60</span>
<span class="line">; use embed html static file</span>
<span class="line">; EmbedHtml = disable</span>
<span class="line"></span>
<span class="line">[database]</span>
<span class="line">Type = mysql</span>
<span class="line">User = message-user</span>
<span class="line">Password = 123456</span>
<span class="line">Host = 192.168.1.8</span>
<span class="line">Name = messagenest</span>
<span class="line">Port = 61922</span>
<span class="line">TablePrefix = message_</span>
<span class="line">; SqlDebug = enable</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="启动message-nest" tabindex="-1"><a class="header-anchor" href="#启动message-nest"><span>启动Message-Nest</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">直接运行软件，会输出信息</span>
<span class="line"></span>
<span class="line"># ./Message-Push-Nest </span>
<span class="line">2024/01/26 15:46:00 [info] replacing callback \`gorm:update_time_stamp\` from /home/runner/work/Message-Push-Nest/Message-Push-</span>
<span class="line">.....</span>
<span class="line">[2024-01-26 15:46:00.495]  INFO [main.go:50 main] [PID:504]: start message server @ http://0.0.0.0:8000</span>
<span class="line"></span>
<span class="line">后台运行：</span>
<span class="line">nohup ./Message-Push-Nest  &gt;/dev/null 2&gt; Message-Push-Nest.log &amp;</span>
<span class="line">查看日志：</span>
<span class="line">tail -f Message-Push-Nest.log </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="进入后台" tabindex="-1"><a class="header-anchor" href="#进入后台"><span>进入后台</span></a></h1><p>浏览器输入 http://192.168.1.15:8000</p><p>默认用户名： admin</p><p>密码： 123456</p><p><img src="https://imgoss.xgss.net/picgo/image-20240126161317417.png?aliyun" alt="image-20240126161317417"></p><h1 id="钉钉群新建机器人" tabindex="-1"><a class="header-anchor" href="#钉钉群新建机器人"><span>钉钉群新建机器人</span></a></h1><p>记住： Webhook 和 加签</p><p><img src="https://imgoss.xgss.net/picgo/image-20240126161507956.png?aliyun" alt="image-20240126161507956"></p><h1 id="添加钉钉渠道" tabindex="-1"><a class="header-anchor" href="#添加钉钉渠道"><span>添加钉钉渠道</span></a></h1><p>再进入Message-Nest后台添加发信渠道</p><p><img src="https://imgoss.xgss.net/picgo/image-20240126161422005.png?aliyun" alt="image-20240126161422005"></p><p>测试成功</p><p><img src="https://imgoss.xgss.net/picgo/image-20240126161643016.png?aliyun" alt="image-20240126161643016"></p><h1 id="添加邮箱渠道" tabindex="-1"><a class="header-anchor" href="#添加邮箱渠道"><span>添加邮箱渠道</span></a></h1><p>注意邮箱密码是登录密码，不要泄露了。</p><p>而且需要开通IMAP/SMTP服务。</p><p><img src="https://imgoss.xgss.net/picgo/image-20240126162044753.png?aliyun" alt="image-20240126162044753"></p><h1 id="发信任务" tabindex="-1"><a class="header-anchor" href="#发信任务"><span>发信任务</span></a></h1><p>新增任务</p><p><img src="https://imgoss.xgss.net/picgo/image-20240126163008218.png?aliyun" alt="image-20240126163008218"></p><p>点击 暂存，确定添加</p><p><img src="https://imgoss.xgss.net/picgo/image-20240126163051602.png?aliyun" alt="image-20240126163051602"></p><h1 id="测试发送" tabindex="-1"><a class="header-anchor" href="#测试发送"><span>测试发送</span></a></h1><p>点击 接口</p><p><img src="https://imgoss.xgss.net/picgo/image-20240126163123208.png?aliyun" alt="image-20240126163123208"></p><p>一个任务可能关联多个不同渠道的实例 实例的内容类型大体上可以可以分为text、html、markdown 发送的消息会优先选择相应的类型消息进行发送，如果没有，将使用传的text消息进行发送 ** text节点必传，指定mode=sync将同步发送，默认异步发送</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># curl -X POST --location &#39;http://192.168.1.15:8000/api/v1/message/send&#39; \\</span>
<span class="line">        --header &#39;Content-Type: application/json&#39; \\</span>
<span class="line">        --data &#39;{</span>
<span class="line">    &quot;task_id&quot;: &quot;T-yejHQOGXo9&quot;,</span>
<span class="line">    &quot;title&quot;: &quot;message title&quot;,</span>
<span class="line">    &quot;text&quot;: &quot;测试内容Hello World!&quot;</span>
<span class="line">}&#39;</span>
<span class="line"></span>
<span class="line">用linux服务器执行这个命令</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20240126163255255.png?aliyun" alt="image-20240126163255255"></p><h2 id="钉钉上收到通知" tabindex="-1"><a class="header-anchor" href="#钉钉上收到通知"><span>钉钉上收到通知</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/image-20240126163312464.png?aliyun" alt="image-20240126163312464"></p><h1 id="发信日志界面" tabindex="-1"><a class="header-anchor" href="#发信日志界面"><span>发信日志界面</span></a></h1><p>有刚才的发送记录</p><p><img src="https://imgoss.xgss.net/picgo/image-20240126163408168.png?aliyun" alt="image-20240126163408168"></p><h1 id="数据统计界面" tabindex="-1"><a class="header-anchor" href="#数据统计界面"><span>数据统计界面</span></a></h1><p><img src="https://imgoss.xgss.net/picgo/image-20240131141611219.png?aliyun" alt="image-20240131141611219"></p>`,50)]))}const r=e(l,[["render",p]]),c=JSON.parse('{"path":"/kaiyuan/Open-Source-Software/%E5%BC%80%E6%BA%90%E9%A1%B9%E7%9B%AEMessageNest%E6%89%93%E9%80%A0%E4%B8%AA%E6%80%A7%E5%8C%96%E6%B6%88%E6%81%AF%E6%8E%A8%E9%80%81%E5%B9%B3%E5%8F%B0%E5%A4%9A%E7%A7%8D%E9%80%9A%E7%9F%A5%E6%96%B9%E5%BC%8F.html","title":"开源项目MessageNest打造个性化消息推送平台多种通知方式","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"kaiyuan/Open-Source-Software/开源项目MessageNest打造个性化消息推送平台多种通知方式.md"}');export{r as comp,c as data};
