import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as e}from"./app-BiQR_lPj.js";const l={};function p(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h1 id="linux服务器配置ssh免密码登陆" tabindex="-1"><a class="header-anchor" href="#linux服务器配置ssh免密码登陆"><span>Linux服务器配置SSH免密码登陆</span></a></h1><h2 id="实现功能" tabindex="-1"><a class="header-anchor" href="#实现功能"><span>实现功能</span></a></h2><p>node179，node181，node182上实现www用户免密码访问，密钥登录。</p><p>在三台服务器上设置www的密码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>#passwd www </span></span>
<span class="line"><span>密码设置123456</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>服务器名称，修改hosts，ssh默认端口由22改改为60920：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>node179 192.168.4.179</span></span>
<span class="line"><span>node181 192.168.4.181</span></span>
<span class="line"><span>node182 192.168.4.182</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在node179上操作" tabindex="-1"><a class="header-anchor" href="#在node179上操作"><span>在node179上操作</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># su -l www</span></span>
<span class="line"><span>$ ssh-keygen 【一路回车】</span></span>
<span class="line"><span></span></span>
<span class="line"><span>生成公钥和私钥</span></span>
<span class="line"><span>$ ll /home/www/.ssh/*   </span></span>
<span class="line"><span>-rw------- 1 www www 1679 Feb 18 11:13 /home/www/.ssh/id_rsa</span></span>
<span class="line"><span>-rw-r--r-- 1 www www  391 Feb 18 11:13 /home/www/.ssh/id_rsa.pub</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ ssh-copy-id -p 60920 &quot;www@192.168.4.181&quot; </span></span>
<span class="line"><span>输入node181的密码</span></span>
<span class="line"><span>$ ssh-copy-id -p 60920 &quot;www@192.168.4.182&quot; </span></span>
<span class="line"><span>输入node182的密码</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>测试：</span></span>
<span class="line"><span>$ ssh -p 60920 www@192.168.4.181</span></span>
<span class="line"><span>$ ssh -p 60920 www@192.168.4.182</span></span>
<span class="line"><span>是否需要密码</span></span>
<span class="line"><span>在node181查看 cat /home/www/.ssh/authorized_keys 是否有 node179的公钥。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在181上操作" tabindex="-1"><a class="header-anchor" href="#在181上操作"><span>在181上操作</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># su -l www</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ ssh-keygen</span></span>
<span class="line"><span>$ ssh-copy-id -p 60920 &quot;www@192.168.4.179&quot;</span></span>
<span class="line"><span>测试登录：</span></span>
<span class="line"><span>ssh -p 60920 www@192.168.4.179</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在182上操作" tabindex="-1"><a class="header-anchor" href="#在182上操作"><span>在182上操作</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># su -l www</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ ssh-keygen</span></span>
<span class="line"><span>$ ssh-copy-id &quot;-p 60920 www@192.168.4.179&quot;</span></span>
<span class="line"><span>测试登录：</span></span>
<span class="line"><span>ssh -p 60920 www@192.168.4.179</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="第二种方法" tabindex="-1"><a class="header-anchor" href="#第二种方法"><span>第二种方法</span></a></h2><p>直接将公钥写入到 authorized_keys文件中。</p><p>A服务器要免密钥登录到B服务器，则将A的公钥，写入到B的authorized_keys文件中。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># su -l www</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ mkdir /home/www/.ssh</span></span>
<span class="line"><span>$ chmod 700 /home/www/.ssh</span></span>
<span class="line"><span>$ vi /home/www/.ssh/authorized_keys 将179中的/home/www/.ssh/id_rsa.pub 写入</span></span>
<span class="line"><span>$ chmod 600 /home/www/.ssh/authorized_keys</span></span>
<span class="line"><span></span></span>
<span class="line"><span>在179上测试：</span></span>
<span class="line"><span>ssh -p 60920 www@192.168.4.182</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17)]))}const h=n(l,[["render",p]]),t=JSON.parse('{"path":"/article/qct5upjg/","title":"Linux服务器配置SSH免密码登陆","lang":"en-US","frontmatter":{"title":"Linux服务器配置SSH免密码登陆","createTime":"2025/05/27 17:51:17","permalink":"/article/qct5upjg/"},"git":{"createdTime":1749111496000,"updatedTime":1750129445000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":2,"url":"https://github.com/star"}]},"readingTime":{"minutes":1.07,"words":321},"filePathRelative":"linux-basis/Linux服务器配置SSH免密码登陆.md"}');export{h as comp,t as data};
