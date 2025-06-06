import{_ as n,c as e,b as a,o as i}from"./app-BEL8OELx.js";const l={};function d(c,s){return i(),e("div",null,s[0]||(s[0]=[a(`<h1 id="linux服务器配置ssh免密码登陆" tabindex="-1"><a class="header-anchor" href="#linux服务器配置ssh免密码登陆"><span>Linux服务器配置SSH免密码登陆</span></a></h1><h2 id="实现功能" tabindex="-1"><a class="header-anchor" href="#实现功能"><span>实现功能</span></a></h2><p>node179，node181，node182上实现www用户免密码访问，密钥登录。</p><p>在三台服务器上设置www的密码</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">#passwd www </span>
<span class="line">密码设置123456</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>服务器名称，修改hosts，ssh默认端口由22改改为60920：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">node179 192.168.4.179</span>
<span class="line">node181 192.168.4.181</span>
<span class="line">node182 192.168.4.182</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在node179上操作" tabindex="-1"><a class="header-anchor" href="#在node179上操作"><span>在node179上操作</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># su -l www</span>
<span class="line">$ ssh-keygen 【一路回车】</span>
<span class="line"></span>
<span class="line">生成公钥和私钥</span>
<span class="line">$ ll /home/www/.ssh/*   </span>
<span class="line">-rw------- 1 www www 1679 Feb 18 11:13 /home/www/.ssh/id_rsa</span>
<span class="line">-rw-r--r-- 1 www www  391 Feb 18 11:13 /home/www/.ssh/id_rsa.pub</span>
<span class="line"></span>
<span class="line">$ ssh-copy-id -p 60920 &quot;www@192.168.4.181&quot; </span>
<span class="line">输入node181的密码</span>
<span class="line">$ ssh-copy-id -p 60920 &quot;www@192.168.4.182&quot; </span>
<span class="line">输入node182的密码</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">测试：</span>
<span class="line">$ ssh -p 60920 www@192.168.4.181</span>
<span class="line">$ ssh -p 60920 www@192.168.4.182</span>
<span class="line">是否需要密码</span>
<span class="line">在node181查看 cat /home/www/.ssh/authorized_keys 是否有 node179的公钥。</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在181上操作" tabindex="-1"><a class="header-anchor" href="#在181上操作"><span>在181上操作</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># su -l www</span>
<span class="line"></span>
<span class="line">$ ssh-keygen</span>
<span class="line">$ ssh-copy-id -p 60920 &quot;www@192.168.4.179&quot;</span>
<span class="line">测试登录：</span>
<span class="line">ssh -p 60920 www@192.168.4.179</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在182上操作" tabindex="-1"><a class="header-anchor" href="#在182上操作"><span>在182上操作</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># su -l www</span>
<span class="line"></span>
<span class="line">$ ssh-keygen</span>
<span class="line">$ ssh-copy-id &quot;-p 60920 www@192.168.4.179&quot;</span>
<span class="line">测试登录：</span>
<span class="line">ssh -p 60920 www@192.168.4.179</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="第二种方法" tabindex="-1"><a class="header-anchor" href="#第二种方法"><span>第二种方法</span></a></h2><p>直接将公钥写入到 authorized_keys文件中。</p><p>A服务器要免密钥登录到B服务器，则将A的公钥，写入到B的authorized_keys文件中。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># su -l www</span>
<span class="line"></span>
<span class="line">$ mkdir /home/www/.ssh</span>
<span class="line">$ chmod 700 /home/www/.ssh</span>
<span class="line">$ vi /home/www/.ssh/authorized_keys 将179中的/home/www/.ssh/id_rsa.pub 写入</span>
<span class="line">$ chmod 600 /home/www/.ssh/authorized_keys</span>
<span class="line"></span>
<span class="line">在179上测试：</span>
<span class="line">ssh -p 60920 www@192.168.4.182</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17)]))}const r=n(l,[["render",d]]),t=JSON.parse('{"path":"/linux-basis/Linux%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%85%8D%E7%BD%AESSH%E5%85%8D%E5%AF%86%E7%A0%81%E7%99%BB%E9%99%86.html","title":"Linux服务器配置SSH免密码登陆","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"linux-basis/Linux服务器配置SSH免密码登陆.md"}');export{r as comp,t as data};
