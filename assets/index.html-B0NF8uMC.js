import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as e}from"./app-BiQR_lPj.js";const l={};function p(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h1 id="使用gitbook制作发布个人的电子书籍" tabindex="-1"><a class="header-anchor" href="#使用gitbook制作发布个人的电子书籍"><span>使用Gitbook制作发布个人的电子书籍</span></a></h1><p><img src="http://imgoss.xgss.net/picgo/gitbooklogo.jpg?aliyunoss" alt="gitbooklogo"></p><h2 id="需求说明" tabindex="-1"><a class="header-anchor" href="#需求说明"><span>需求说明</span></a></h2><p>Gitbook可以人每个人制作发布个人的电子书籍，并能最大程度上利用“群智”提高阅读品质和享受创作过程。</p><p>gitbook.com网站是一个简单的个人在线书籍网站，在这里可以把自己的文档整理成一本书发布出来，便于阅读，gitbook提供了两套方案，</p><p>1.可以直接在gitbook官网上申请账号进行创建。</p><p>2.通过他们提供的命令行开发工具自己构建一个。</p><p>咱们下面介绍的是第二套方案，gitbook命令行工具首先需要服务器上有node.js，https://nodejs.org/zh-cn/download/</p><h2 id="系统说明" tabindex="-1"><a class="header-anchor" href="#系统说明"><span>系统说明</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>系统： Centos7</span></span>
<span class="line"><span></span></span>
<span class="line"><span>IP： 192.168.1.5(云服务器)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>地址： https://g.xgss.net/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Github Page地址： gitbook.xgss.net</span></span>
<span class="line"><span></span></span>
<span class="line"><span>github仓库:https://github.com/funet8/book.git</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="一、-安装nodejs" tabindex="-1"><a class="header-anchor" href="#一、-安装nodejs"><span>一、 安装nodejs</span></a></h1><h2 id="yum方式安装nodejs和npm" tabindex="-1"><a class="header-anchor" href="#yum方式安装nodejs和npm"><span>yum方式安装nodejs和npm</span></a></h2><p>nodejs版本不要安卓过高，笔者安装的是nodejs v8版本的，否则会报错：安装的v14.17.6有报错：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>      if (cb) cb.apply(this, arguments)</span></span>
<span class="line"><span>TypeError: cb.apply is not a function</span></span>
<span class="line"><span>    at /usr/local/node-v14.17.6/lib/node_modules/gitbook-cli/node_modules/npm/node_modules/graceful-fs/polyfills.js:287:18</span></span>
<span class="line"><span>    at FSReqCallback.oncomplete (fs.js:193:5)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>1 更新node.js各版本yum源</p><pre><code>Node.js v8.x安装命令
curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -

Node.js v7.x安装命令
curl --silent --location https://rpm.nodesource.com/setup_7.x | bash -

Node.js v6.x安装命令
curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -

Node.js v5.x安装命令
yum安装node.js
# yum install -y nodejs

# node -v
v8.17.0
</code></pre><h3 id="安装cnpm-对自己网络有信心的大佬可以无视" tabindex="-1"><a class="header-anchor" href="#安装cnpm-对自己网络有信心的大佬可以无视"><span>安装cnpm(对自己网络有信心的大佬可以无视)</span></a></h3><p>因为国内比较慢,我们可以额外安装淘宝的cnpm,慢的时候用cnpm.</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># npm install -g cnpm --registry=https://registry.npm.taobao.org</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h1 id="二、安装gitbook-cli工具" tabindex="-1"><a class="header-anchor" href="#二、安装gitbook-cli工具"><span>二、安装gitbook-cli工具</span></a></h1><p>gitbook-cli是一个在同一系统上安装和使用多个版本的GitBook的实用程序。并自动安装所需版本的GitBook来生成一本书。 执\`npm install gitbook-cli -g终端命令进行的安装。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># npm install gitbook-cli -g</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>可通过gitbook --version验证，如果提示没有此命令需要输入绝对路径，或者创建软链接</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># gitbook --version</span></span>
<span class="line"><span>CLI version: 2.3.2</span></span>
<span class="line"><span>Installing GitBook 3.2.3</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：终端第一次运行gitbook命令，可能会自动安装gitbook，因为刚才安装的是CLI，然后CLI会自动安装gitbook。</p><p>如果想卸载CLI，可使用 npm uninstall gitbook-cli -g来删除。</p><p>当然，GitBook 的远比我们想象的强大，我们还可以通过 gitbook help 来查看：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># gitbook help</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="初始化一本书" tabindex="-1"><a class="header-anchor" href="#初始化一本书"><span>初始化一本书</span></a></h2><p>初始化一本书的命令是gitbook init,</p><p>首先在终端创建一个项目目录，并进入这个目录：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>~ mkdir git_book</span></span>
<span class="line"><span>~ cd git_book</span></span>
<span class="line"><span>~ gitbook init</span></span>
<span class="line"><span>gitbook init会在空项目中创建README.md和SUMMARY.md两个文件：</span></span>
<span class="line"><span>README.md文件是项目的介绍文件。</span></span>
<span class="line"><span>SUMMARY.md是gitbook书籍的目录。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果<code>SUMMARY.md</code>文件里面有如下内容：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vim SUMMARY.md</span></span>
<span class="line"><span>* [项目介绍](README.md)</span></span>
<span class="line"><span>* http</span></span>
<span class="line"><span>    * [http说明](doc/http/http解析.md)</span></span>
<span class="line"><span>        * [tcp说明](doc/http/tcp/tcp说明.md)</span></span>
<span class="line"><span>            * [udp说明](doc/http/tcp/udp/udp说明.md)</span></span>
<span class="line"><span>* HTML</span></span>
<span class="line"><span>    * [HTML5-特性说明](doc/html/HTML5-特性说明.md)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本地启动服务编写书籍</p><p>终端打开项目目录，使用<code>gitbook serve</code>启动服务：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>gitbook serve</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>然后根据终端的提示，在浏览器中打开<code>http://localhost:4000</code>查看书籍</p><h1 id="三、gitbook使用教程" tabindex="-1"><a class="header-anchor" href="#三、gitbook使用教程"><span>三、Gitbook使用教程</span></a></h1><p>gitbook网站是一个简单的个人在线书籍网站，在这里可以把自己的文档整理成书籍发布出来，便于阅读。</p><h2 id="_1-准备" tabindex="-1"><a class="header-anchor" href="#_1-准备"><span>1.准备</span></a></h2><p>在此之前你需要会如下准备：</p><p>1.账号： github有账号，gitbook使用github账号注册 （gitbook网站有时需要使用代理才能打开） 2.git：代码管理工具 3.Markdown：gitbook主要使用MD语法来编写书籍的 4.gitbook工具：如果你在本地开发需要安装此插件，下面有介绍 5.nodejs环境：gitbook插件需要的运行环境 6.一款Markdown编辑器：方便本地开发，推荐Typora或gitbook自己的编辑器gitbook editor</p><h2 id="_2-在gitbook网站上创建一本文档书籍" tabindex="-1"><a class="header-anchor" href="#_2-在gitbook网站上创建一本文档书籍"><span>2. 在gitbook网站上创建一本文档书籍</span></a></h2><p>此种方式是使用github网站加gitbook网站的方式来创建书籍的。 首先你要有一个github账号，然后在github网站中创建了一个repo仓库，用于存放书籍内容的仓库。</p><h2 id="_3-登陆gitbook网站" tabindex="-1"><a class="header-anchor" href="#_3-登陆gitbook网站"><span>3.登陆gitbook网站</span></a></h2><p>gitbook网站支持直接使用github账号登陆的，推荐直接使用github账号登陆。 点击右上角的Sign In登陆，然后选择Sign in with GitHub选择使用github账号进行登陆。 第一次登陆www.gitbook.com网站时，需要github网站的认证，还需要到注册github网站的邮箱中点击确认。</p><p><img src="http://imgoss.xgss.net/picgo/image-20210907171435149.png?aliyunoss" alt="image-20210907171435149"></p><h2 id="_4-创建一本书" tabindex="-1"><a class="header-anchor" href="#_4-创建一本书"><span>4.创建一本书</span></a></h2><p>登陆网站后，点击右上角的用户图标，然后选择create a new space</p><p><img src="http://imgoss.xgss.net/picgo/image-20210907171756227.png?aliyunoss" alt="image-20210907171756227"></p><p><img src="http://imgoss.xgss.net/picgo/image-20210907171922073.png?aliyunoss" alt="image-20210907171922073"></p><p>在创建书籍中选择github,点击左侧的 “integations”集成，选择github，再点击 list all repositories</p><p><img src="http://imgoss.xgss.net/picgo/image-20210907172334717.png?aliyunoss" alt="image-20210907172334717"></p><p><img src="http://imgoss.xgss.net/picgo/image-20210907172530366.png?aliyunoss" alt="image-20210907172530366"></p><p><img src="http://imgoss.xgss.net/picgo/image-20210907172639465.png?aliyunoss" alt="image-20210907172639465"></p><p><img src="http://imgoss.xgss.net/picgo/image-20210907172757178.png?aliyunoss" alt="image-20210907172757178"></p><p>必须要有分支</p><p><img src="http://imgoss.xgss.net/picgo/image-20210907173017073.png?aliyunoss" alt="image-20210907173017073"></p><h2 id="_5-克隆并且新建一个分支" tabindex="-1"><a class="header-anchor" href="#_5-克隆并且新建一个分支"><span>5.克隆并且新建一个分支</span></a></h2><p>新建一个 gitbook.xgss.net的分支，将这个分支</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>$ git clone git@github.com:funet8/book.git</span></span>
<span class="line"><span>$ cd book</span></span>
<span class="line"><span>$ git branch gitbook.xgss.net</span></span>
<span class="line"><span>$ git branch</span></span>
<span class="line"><span>推送本地分支到远程</span></span>
<span class="line"><span>git push origin gitbook.xgss.net</span></span>
<span class="line"><span></span></span>
<span class="line"><span>合并某分支到当前分支：</span></span>
<span class="line"><span>git checkout master</span></span>
<span class="line"><span>git merge develop</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://imgoss.xgss.net/picgo/image-20210907175923160.png?aliyunoss" alt="image-20210907175923160"></p><p>最终效果</p><p>https://app.gitbook.com/@star-2/s/linux/v/gitbook.xgss.net/</p><h2 id="_6-初始化一本书" tabindex="-1"><a class="header-anchor" href="#_6-初始化一本书"><span>6.初始化一本书</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>git clone git@github.com:funet8/book.git</span></span>
<span class="line"><span>cd book</span></span>
<span class="line"><span>gitbook init</span></span>
<span class="line"><span></span></span>
<span class="line"><span>warn: no summary file in this book </span></span>
<span class="line"><span>info: create README.md </span></span>
<span class="line"><span>info: create SUMMARY.md </span></span>
<span class="line"><span>info: initialization is finished</span></span>
<span class="line"><span></span></span>
<span class="line"><span>gitbook init会在空项目中创建README.md和SUMMARY.md两个文件：</span></span>
<span class="line"><span>README.md文件是项目的介绍文件。</span></span>
<span class="line"><span>SUMMARY.md是gitbook书籍的目录。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果<code>SUMMARY.md</code>文件里面有如下内容：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># vim SUMMARY.md</span></span>
<span class="line"><span>* [项目介绍](README.md)</span></span>
<span class="line"><span>* http</span></span>
<span class="line"><span>    * [http说明](doc/http/http解析.md)</span></span>
<span class="line"><span>        * [tcp说明](doc/http/tcp/tcp说明.md)</span></span>
<span class="line"><span>            * [udp说明](doc/http/tcp/udp/udp说明.md)</span></span>
<span class="line"><span>* HTML</span></span>
<span class="line"><span>    * [HTML5-特性说明](doc/html/HTML5-特性说明.md)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本地启动服务编写书籍</p><p>终端打开项目目录，使用gitbook serve启动服务：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># gitbook serve</span></span>
<span class="line"><span>Live reload server started on port: 35729</span></span>
<span class="line"><span>Press CTRL+C to quit ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>info: 7 plugins are installed </span></span>
<span class="line"><span></span></span>
<span class="line"><span>Error: Couldn&#39;t locate plugins &quot;search-pro, back-to-top-button&quot;, Run &#39;gitbook install&#39; to install plugins from registry.</span></span>
<span class="line"><span># gitbook install</span></span>
<span class="line"><span># gitbook serve</span></span>
<span class="line"><span>Starting server ...</span></span>
<span class="line"><span>Serving book on http://localhost:4000</span></span>
<span class="line"><span></span></span>
<span class="line"><span>开启端口：</span></span>
<span class="line"><span>iptables -A INPUT -p tcp --dport 4000 -j ACCEPT</span></span>
<span class="line"><span>service iptables save</span></span>
<span class="line"><span>systemctl restart iptables.service</span></span>
<span class="line"><span>systemctl enable iptables.service</span></span>
<span class="line"><span></span></span>
<span class="line"><span>注意：gitbook serve命令会在项目中生成一个_book的文件夹,此文件夹就是最终生成的项目。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器中输入：http://192.168.1.5:4000 打开</p><p><img src="http://imgoss.xgss.net/picgo/image-20210907184026023.png?aliyunoss" alt="image-20210907184026023"></p><h2 id="_7-文档打包" tabindex="-1"><a class="header-anchor" href="#_7-文档打包"><span>7.文档打包</span></a></h2><p>可使用 gitbook build命令来生成最终的项目：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># gitbook build</span></span>
<span class="line"><span>info: 9 plugins are installed </span></span>
<span class="line"><span>info: 6 explicitly listed </span></span>
<span class="line"><span>info: loading plugin &quot;search-pro&quot;... OK </span></span>
<span class="line"><span>info: loading plugin &quot;back-to-top-button&quot;... OK </span></span>
<span class="line"><span>info: loading plugin &quot;highlight&quot;... OK </span></span>
<span class="line"><span>info: loading plugin &quot;sharing&quot;... OK </span></span>
<span class="line"><span>info: loading plugin &quot;fontsettings&quot;... OK </span></span>
<span class="line"><span>info: loading plugin &quot;theme-default&quot;... OK </span></span>
<span class="line"><span>info: found 2 pages </span></span>
<span class="line"><span>info: found 2 asset files </span></span>
<span class="line"><span>info: &gt;&gt; generation finished with success in 0.4s !</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令执行结束后，会在项目下生成_book的文件夹,此文件夹就是最终生成的项目。 在_book文件夹里有一个index.html文件，这个文件就是文档网站的HTM入口，把_book文件夹复制到服务器，然后把web服务的入口引向index.html即可完成文档网站的部署。</p><p>如果你想查看输出目录详细的记录，可使用gitbook build ./ --log=debug --debug来构建查看。</p><h2 id="_8-生成电子书-报错暂时不操作" tabindex="-1"><a class="header-anchor" href="#_8-生成电子书-报错暂时不操作"><span>8. 生成电子书(报错暂时不操作)</span></a></h2><p>GitBook 可以生成一个网站，但也可以输出内容作为电子书（ePub，Mobi，PDF）。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># Generate a PDF file</span></span>
<span class="line"><span>$ gitbook pdf ./ ./mybook.pdf</span></span>
<span class="line"><span>提示报错：  InstallRequiredError: &quot;ebook-convert&quot; is not installed.</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># Generate an ePub file</span></span>
<span class="line"><span>$ gitbook epub ./ ./mybook.epub</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Generate a Mobi file</span></span>
<span class="line"><span>$ gitbook mobi ./ ./mybook.mobi</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-项目部署到github-pages" tabindex="-1"><a class="header-anchor" href="#_9-项目部署到github-pages"><span>9.项目部署到GitHub Pages</span></a></h2><p>这部分需要使用git和github网站，如果你不会，请自行在网上搜索文档查看。</p><p>由于gitbook生成的项目跟文档的源码是两个部分，所以可以把文档放到master分支上，部署的网站放到gh-pages 分支。</p><h2 id="_10-在github上创建一个仓库" tabindex="-1"><a class="header-anchor" href="#_10-在github上创建一个仓库"><span>10.在github上创建一个仓库</span></a></h2><p>这个仓库用于存放你编写的项目，和部署项目，如何创建请自行查找。</p><p>笔者使用的是 https://github.com/funet8/book.git</p><h2 id="_11-本地项目提交到github仓库" tabindex="-1"><a class="header-anchor" href="#_11-本地项目提交到github仓库"><span>11.本地项目提交到github仓库</span></a></h2><p>在项目中创建一个.gitignore文件，内容如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vim .gitignore</span></span>
<span class="line"><span># 忽略gitbook生成的项目目录</span></span>
<span class="line"><span>_book</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后终端打开项目，输入如下命令,来提交文档项目到github上：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>~ git commit -m &#39;初始化gitbook本地项目&#39;</span></span>
<span class="line"><span>~ git remote add origin git@github.com:funet8/book.git</span></span>
<span class="line"><span>~ git push -u origin master</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面命令执行结束后，就会把代码提交到github上的仓库。 <em><strong>注意仓库地址要替换成你自己的链接。</strong></em></p><h2 id="_12-生成项目并上传到github仓库的gh-pages分支" tabindex="-1"><a class="header-anchor" href="#_12-生成项目并上传到github仓库的gh-pages分支"><span>12.生成项目并上传到github仓库的gh-pages分支</span></a></h2><p>由于打包命令太多，为了简单化，现在写一个脚本命令来自动执行。当然你也可以终端自己执行这些命令。</p><p>为了部署方便，可以创建一个脚本文件gitbook_xgss_com_gh_pages.sh ,功能将_book目录推送到git仓库中的 gh-pages分支</p><p>内容如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vim gitbook_xgss_com_gh_pages.sh</span></span>
<span class="line"><span>#!/usr/bin/env sh</span></span>
<span class="line"><span>## 将 _book目录推送到git仓库中的 gh-pages分支</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 定义仓库地址</span></span>
<span class="line"><span>Git_Url=&#39;git@github.com:funet8/book.git&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;开始执行命令&#39;</span></span>
<span class="line"><span># 生成静态文件</span></span>
<span class="line"><span>echo &#39;执行命令：gitbook build .&#39;</span></span>
<span class="line"><span>gitbook build .</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 进入生成的文件夹</span></span>
<span class="line"><span>echo &quot;执行命令：cd ./_book\\n&quot;</span></span>
<span class="line"><span>cd ./_book</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 初始化一个仓库，仅仅是做了一个初始化的操作，项目里的文件还没有被跟踪</span></span>
<span class="line"><span>echo &quot;执行命令：git init\\n&quot;</span></span>
<span class="line"><span>git init</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 保存所有的修改</span></span>
<span class="line"><span>echo &quot;执行命令：git add -A&quot;</span></span>
<span class="line"><span>git add -A</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 把修改的文件提交</span></span>
<span class="line"><span>echo &quot;执行命令：commit -m &#39;deploy&#39;&quot;</span></span>
<span class="line"><span>git commit -m &#39;deploy.sh&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 如果发布到 https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;</span></span>
<span class="line"><span>echo &quot;执行命令：git push -f $Git_Url master:gh-pages&quot;</span></span>
<span class="line"><span>git push -f $Git_Url master:gh-pages</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 返回到上一次的工作目录</span></span>
<span class="line"><span>echo &quot;回到刚才工作目录&quot;</span></span>
<span class="line"><span>cd -</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行成功后，打开你的github仓库，然后选择branch分支，会发现多了一个gh-pages分支，打开这个分之后，里面会有一个index.html文件。说明部署的代码上传成功了。 注意：如果没有gh-pages分支说明没有部署成功请查看刚才执行的终端看哪里报错了，解决报错直到成功部署。</p><p>编写shell脚本 gitbook_xgss_com_main.sh ,功能将推送到git仓库中的 main主分支，再合并到 gitbook.xgss.net分支上</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vim gitbook_xgss_com_main.sh</span></span>
<span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span>## 功能将推送到git仓库中的 main主分支，再合并到 gitbook.xgss.net分支上</span></span>
<span class="line"><span></span></span>
<span class="line"><span>NowTime=\`date +%Y%m%d-%H:%M:%S\` </span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;切换到主分支&#39;</span></span>
<span class="line"><span>git checkout main</span></span>
<span class="line"><span>echo &#39;提交当前目录下的所有文件&#39;</span></span>
<span class="line"><span>git add .</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;注释添加到当前分支&#39;</span></span>
<span class="line"><span>git commit -m &quot;脚本自动提交，时间：$NowTime&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;提交到远程仓库&#39;</span></span>
<span class="line"><span>git push</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 合并某分支到当前分支</span></span>
<span class="line"><span>git checkout gitbook.xgss.net</span></span>
<span class="line"><span>git merge main</span></span>
<span class="line"><span>git push</span></span>
<span class="line"><span>echo &#39;切回主分支&#39;</span></span>
<span class="line"><span>git checkout main</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_13-配置github-pages显示网站" tabindex="-1"><a class="header-anchor" href="#_13-配置github-pages显示网站"><span>13.配置GitHub Pages显示网站</span></a></h2><p><img src="http://imgoss.xgss.net/picgo/image-20210908113042943.png?aliyunoss" alt="image-20210908113042943"></p><p>通过浏览器可以访问：https://funet8.github.io/book/</p><h2 id="_14-gitbook的配置文件讲解" tabindex="-1"><a class="header-anchor" href="#_14-gitbook的配置文件讲解"><span>14.gitbook的配置文件讲解</span></a></h2><p>如果你想对你的网站有更详细的个性化配置或使用插件，那么需要使用配置文件。 配置文件写完后，需要重启服务或者重新打包才能应用配置。 gitbook的配置文件名是book.json，首先在项目的根目录中创建book.json文件。 book.json主要内容：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;title&quot;: &quot;我的一本书&quot;,</span></span>
<span class="line"><span>    &quot;author&quot; : &quot;yu&quot;,</span></span>
<span class="line"><span>    &quot;description&quot; : &quot;我第一本书的描述，很好&quot;,</span></span>
<span class="line"><span>    &quot;language&quot; : &quot;zh-hans&quot;,</span></span>
<span class="line"><span>    &quot;structure&quot;: {</span></span>
<span class="line"><span>        &quot;readme&quot;: &quot;introduction.md&quot;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    &quot;plugins&quot;: [</span></span>
<span class="line"><span>        &quot;-lunr&quot;,</span></span>
<span class="line"><span>        &quot;-search&quot;,</span></span>
<span class="line"><span>        &quot;search-pro&quot;,</span></span>
<span class="line"><span>        &quot;back-to-top-button&quot;</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    &quot;pluginsConfig&quot;: {</span></span>
<span class="line"><span>        &quot;anchor-navigation-ex&quot;: {</span></span>
<span class="line"><span>            &quot;isShowTocTitleIcon&quot;: true</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    &quot;links&quot; : {</span></span>
<span class="line"><span>        &quot;sidebar&quot; : {</span></span>
<span class="line"><span>            &quot;个性链接1&quot; : &quot;https://www.baidu.com&quot;,</span></span>
<span class="line"><span>            &quot;个性链接2&quot; : &quot;https://www.baidu.com&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    &quot;styles&quot;: {</span></span>
<span class="line"><span>        &quot;website&quot;: &quot;styles/website.css&quot;,</span></span>
<span class="line"><span>        &quot;ebook&quot;: &quot;styles/ebook.css&quot;,</span></span>
<span class="line"><span>        &quot;pdf&quot;: &quot;styles/pdf.css&quot;,</span></span>
<span class="line"><span>        &quot;mobi&quot;: &quot;styles/mobi.css&quot;,</span></span>
<span class="line"><span>        &quot;epub&quot;: &quot;styles/epub.css&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="book-json中一些主要参数" tabindex="-1"><a class="header-anchor" href="#book-json中一些主要参数"><span>book.json中一些主要参数</span></a></h1><ul><li><p>title 标题</p></li><li><p>author 作者</p></li><li><p>description 描述，对应gitbook网站的description</p></li><li><p>language 使用的语言，<code>zh-hans</code>是简体中文，会对应到页面的<code>&lt;html lang=&quot;zh-hans&quot; &gt;</code></p></li><li><p>structure 指定 Readme、Summary、Glossary 和 Languages 对应的文件名，下面是这几个文件对应变量以及默认值：</p><table><thead><tr><th>Variable</th><th>Description</th></tr></thead><tbody><tr><td><code>structure.readme</code></td><td>Readme file name (defaults to <code>README.md</code>)</td></tr><tr><td><code>structure.summary</code></td><td>Summary file name (defaults to <code>SUMMARY.md</code>)</td></tr><tr><td><code>structure.glossary</code></td><td>Glossary file name (defaults to <code>GLOSSARY.md</code>)</td></tr><tr><td><code>structure.languages</code></td><td>Languages file name (defaults to <code>LANGS.md</code>)</td></tr></tbody></table><p>比如想把readme文件个名字，则可以使用如下配置</p></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>&quot;structure&quot;: {</span></span>
<span class="line"><span>    &quot;readme&quot;: &quot;introduction.md&quot;</span></span>
<span class="line"><span>},</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用这个配置后，gitbook服务就不会找readme文件，而去找introduction文件当项目说明，这样就可以把readme文件完全当成代码仓库说明文档了。</p><ul><li>plugins 使用的插件列表，所有的插件都在这里写出来，然后使用<code>gitbook install</code>来安装。</li><li>pluginsConfig 插件的配置信息，如果插件需要配置参数，那么在这里填写。</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>&quot;links&quot; : {</span></span>
<span class="line"><span>    &quot;sidebar&quot; : {</span></span>
<span class="line"><span>        &quot;个性链接1&quot; : &quot;https://www.baidu.com&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>styles 自定义页面样式，各种格式对应各自的css文件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>&quot;styles&quot;: {</span></span>
<span class="line"><span>    &quot;website&quot;: &quot;styles/website.css&quot;,</span></span>
<span class="line"><span>    &quot;ebook&quot;: &quot;styles/ebook.css&quot;,</span></span>
<span class="line"><span>    &quot;pdf&quot;: &quot;styles/pdf.css&quot;,</span></span>
<span class="line"><span>    &quot;mobi&quot;: &quot;styles/mobi.css&quot;,</span></span>
<span class="line"><span>    &quot;epub&quot;: &quot;styles/epub.css&quot;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="配置默认主题" tabindex="-1"><a class="header-anchor" href="#配置默认主题"><span>配置默认主题</span></a></h2><p>默认的主题可以通过配置来做一下效果。 比如侧边栏菜单显示标题数字，可以在配置文件的<code>pluginsConfig</code>参数中写入如下字段：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;pluginsConfig&quot;: {</span></span>
<span class="line"><span>        &quot;theme-default&quot;: {</span></span>
<span class="line"><span>            &quot;showLevel&quot;: true</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="gitbook插件" tabindex="-1"><a class="header-anchor" href="#gitbook插件"><span>gitbook插件</span></a></h1><p>GitBook 插件: http://gitbook.zhangjikai.com/plugins.html</p><p>Gitbook 使用教程: https://einverne.github.io/gitbook-tutorial/</p><p>推荐12个实用的gitbook插件： https://blog.csdn.net/weixin_37865166/article/details/91899788</p>`,122)]))}const c=n(l,[["render",p]]),r=JSON.parse('{"path":"/article/hkgug6nj/","title":"Gitbook","lang":"en-US","frontmatter":{"title":"Gitbook","createTime":"2025/05/27 17:51:18","permalink":"/article/hkgug6nj/"},"git":{"createdTime":1749111496000,"updatedTime":1750129445000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":2,"url":"https://github.com/star"}]},"readingTime":{"minutes":10.69,"words":3208},"filePathRelative":"web/Gitbook.md"}');export{c as comp,r as data};
