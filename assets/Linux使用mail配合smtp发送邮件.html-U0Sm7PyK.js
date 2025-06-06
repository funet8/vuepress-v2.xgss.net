import{_ as e,c as n,b as a,o as i}from"./app-BEL8OELx.js";const l={};function t(c,s){return i(),n("div",null,s[0]||(s[0]=[a(`<h1 id="linux使用mail配合smtp发送邮件" tabindex="-1"><a class="header-anchor" href="#linux使用mail配合smtp发送邮件"><span>Linux使用mail配合smtp发送邮件</span></a></h1><p>由于工作需要结合shell脚本需要发送邮件通知，linux自带的mail可以实现外部smtp发邮件。不需要本地配置postfix，sendmail邮件服务器。</p><p>本文教程包含25端口发送邮件和mail使用465端口加密发邮件，mail基本命令发送邮件三个知识点，测试系统是centos7</p><p><img src="https://imgoss.xgss.net/picgo/Linux-mail-smtp.jpg?aliyun" alt="Linux-mail-smtp"></p><h2 id="安装工具" tabindex="-1"><a class="header-anchor" href="#安装工具"><span>安装工具</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">#  yum -y install mailx</span>
<span class="line">#  yum -y install sendmail</span>
<span class="line"></span>
<span class="line">centos6</span>
<span class="line"># /etc/init.d/sendmail start</span>
<span class="line"># chkconfig sendmail on</span>
<span class="line"></span>
<span class="line">centos7</span>
<span class="line">systemctl enable sendmail</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关闭其他的邮件工具</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># systemctl stop sendmail</span>
<span class="line"># systemctl stop postfix</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="开启邮箱imap-smtp服务" tabindex="-1"><a class="header-anchor" href="#开启邮箱imap-smtp服务"><span>开启邮箱imap/smtp服务</span></a></h2><p>我这里使用的是163的邮箱，步骤如下：</p><p>1.登录邮箱后，点击页面顶部的“设置”菜单，在下拉框中点击“POP3/SMTP/IMAP”项</p><p><img src="https://imgoss.xgss.net/picgo/bVGfyW.png?aliyun" alt="clipboard.png"></p><p>2.进入到如下页面，勾选<code>IMAP/SMTP服务</code>项，根据步骤完成即可（由于我这里已经开启过，就不再演示了。初始勾选后会让你填写手机号码，发送验证码，成功填写后，会让你输入授权码，这个是作为smtp登录的密码使用的，详情请看163的smtp说明）</p><p><img src="https://imgoss.xgss.net/picgo/bVGfzo.png?aliyun" alt="clipboard.png"></p><p>配置发送的邮箱和密码，注意不是你的邮箱登录密码！</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># vi /etc/mail.rc</span>
<span class="line"></span>
<span class="line">在底部添加：</span>
<span class="line">set from=&quot;xxx@163.com&quot;</span>
<span class="line">set smtp=smtp.163.com</span>
<span class="line">set smtp-auth-user=xxx@163.com</span>
<span class="line">set smtp-auth-password=自己填写的授权码</span>
<span class="line">set smtp-auth=login</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="测试发送" tabindex="-1"><a class="header-anchor" href="#测试发送"><span>测试发送</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">echo -e &quot;你好！n我来看看你n哈哈&quot; | mail -s &quot;测试邮件&quot; shoujianren@163.com</span>
<span class="line"></span>
<span class="line">mail  -s &quot;\`date +%F-%T\`&quot; shoujianren@163.com &lt;/tmp/messages.txt</span>
<span class="line"></span>
<span class="line">echo -e &quot;你好！\\n我来看看你\\n哈哈&quot; | mail -s &quot;测试邮件&quot; xxx@163.com</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有的云服务器商封了25端口。</p><p>1.开工单，让客服把25号端口开通，例如阿里云TCP 25端口解封申请 https://help.aliyun.com/knowledge_detail/56130.html</p><p>2.使用加密端口发送邮件。</p><h1 id="mail使用465端口加密发邮件" tabindex="-1"><a class="header-anchor" href="#mail使用465端口加密发邮件"><span>mail使用465端口加密发邮件</span></a></h1><p>今天由于服务需求，需要服务器需要发送邮件；但是不论用什么办法，发送邮件总是失败；最终发现原因：阿里云实例服务器默认禁止了25端口；</p><h2 id="关闭其它的邮件工具" tabindex="-1"><a class="header-anchor" href="#关闭其它的邮件工具"><span>关闭其它的邮件工具</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># systemctl stop sendmail</span>
<span class="line"># systemctl stop postfix</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装mailx" tabindex="-1"><a class="header-anchor" href="#安装mailx"><span>安装mailx</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">yum install mailx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="开启smtp" tabindex="-1"><a class="header-anchor" href="#开启smtp"><span>开启smtp</span></a></h2><p>参考上一步</p><h2 id="请求数字证书" tabindex="-1"><a class="header-anchor" href="#请求数字证书"><span>请求数字证书</span></a></h2><p>这里用的163邮箱，所以向163请求证书</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># mkdir /root/.certs</span>
<span class="line"></span>
<span class="line"># echo -n | openssl s_client -connect smtp.163.com:465 | sed -ne &#39;/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p&#39; &gt; /root/.certs/163.crt</span>
<span class="line"></span>
<span class="line"># certutil -A -n &quot;GeoTrust SSL CA&quot; -t &quot;C,,&quot; -d /root/.certs -i /root/.certs/163.crt</span>
<span class="line"></span>
<span class="line"># certutil -A -n &quot;GeoTrust Global CA&quot; -t &quot;C,,&quot; -d /root/.certs -i /root/.certs/163.crt</span>
<span class="line"></span>
<span class="line"># certutil -A -n &quot;GeoTrust SSL CA - G3&quot; -t &quot;Pu,Pu,Pu&quot; -d /root/.certs/./ -i /root/.certs/163.crt</span>
<span class="line"></span>
<span class="line"># ls /root/.certs/</span>
<span class="line">163.crt  cert8.db  key3.db  secmod.db</span>
<span class="line"></span>
<span class="line"># certutil -L -d /root/.certs</span>
<span class="line"></span>
<span class="line">Certificate Nickname                                         Trust Attributes</span>
<span class="line">                                                             SSL,S/MIME,JAR/XPI</span>
<span class="line"></span>
<span class="line">GeoTrust SSL CA                                              P,P,P</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置-etc-mail-rc" tabindex="-1"><a class="header-anchor" href="#配置-etc-mail-rc"><span>配置/etc/mail.rc</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># vim /etc/mail.rc</span>
<span class="line"></span>
<span class="line">set from=xxx@163.com #之前设置好的邮箱地址</span>
<span class="line">set smtp=&quot;smtps://smtp.163.com:465&quot; #邮件服务器</span>
<span class="line">set smtp-auth-user=xxx@163.com #之前设置好的邮箱地址</span>
<span class="line">set smtp-auth-password=xxxx #授权码</span>
<span class="line">set smtp-auth=login #默认login即可</span>
<span class="line">set ssl-verify=ignore #ssl认证方式</span>
<span class="line">set nss-config-dir=/root/.certs #证书所在目录</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="发送邮件测试" tabindex="-1"><a class="header-anchor" href="#发送邮件测试"><span>发送邮件测试</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># echo &quot;邮件正文&quot; | mail -s &quot;邮件主题&quot; xxx@163.com</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>邮件发送成功</p><p><img src="https://imgoss.xgss.net/picgo/image-20220218134340670.png?aliyun" alt="image-20220218134340670"></p><h1 id="mail基本命令发送邮件" tabindex="-1"><a class="header-anchor" href="#mail基本命令发送邮件"><span>mail基本命令发送邮件</span></a></h1><p>1.标题为&quot;test&quot;内容为空的邮件，容易被邮箱服务判为垃圾邮件。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">mail -s &quot;test&quot; username2@163.com</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>2.以文件为内容作为邮件正文：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">echo &quot;222222222&quot; &gt; /root/mail1</span>
<span class="line">mail -s test username2@163.com &lt; /root/mail1 </span>
<span class="line">mail -s test2 username1@163.com,username3@163.com &lt; /root/mail1 </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.使用管道进行邮件发送</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">echo &quot;hello,username3....&quot; | mail -s &quot;hello&quot; username3@163.com</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>4.发送附件 在linux下使用mail命令发送附件也很简单，不过首先需要安装uuencode软件包，这个程序是对二进制文件进行编码使其适合通过邮件进行发送，直接使用centos的yum源可能找不到uuencode命令的包sharutils，我这里使用了网易Yum源。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># yum -y install sharutils</span>
<span class="line"></span>
<span class="line"># uuencode /root/mail1 | mail -s &quot;fujian&quot; xxxx@163.com &lt; /root/file1</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5、使用外部smtp来发送邮件</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># vi /etc/mail.rc          #文末添加以下</span>
<span class="line">set from=username1@163.com </span>
<span class="line">smtp=smtp.163.com</span>
<span class="line">set smtp-auth-user=username1@163.com </span>
<span class="line">smtp-auth-password=password </span>
<span class="line">smtp-auth=login</span>
<span class="line"></span>
<span class="line"># source /etc/mail.rc	【本人测试，不需要这步即可】</span>
<span class="line"># mail -s &quot;testmail&quot; username@163.com &lt; /etc/passwd</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,49)]))}const r=e(l,[["render",t]]),p=JSON.parse('{"path":"/linux-basis/Linux%E4%BD%BF%E7%94%A8mail%E9%85%8D%E5%90%88smtp%E5%8F%91%E9%80%81%E9%82%AE%E4%BB%B6.html","title":"Linux使用mail配合smtp发送邮件","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"linux-basis/Linux使用mail配合smtp发送邮件.md"}');export{r as comp,p as data};
