import{_ as n,c as e,b as a,o as i}from"./app-BEL8OELx.js";const l={};function p(t,s){return i(),e("div",null,s[0]||(s[0]=[a(`<h1 id="基于vuepress和github用搭建无服务器的博客、文档系统" tabindex="-1"><a class="header-anchor" href="#基于vuepress和github用搭建无服务器的博客、文档系统"><span>基于VuePress和github用搭建无服务器的博客、文档系统</span></a></h1><p>最近想做一个项目介绍自己的一些项目和日常的文档，让文档有个属于自己的家，https://g.xgss.net 使用gitbook之后，又看到了vuepress，感觉还是挺好用的。</p><p>既可以当做博客系统、文档系统，项目介绍的系统，还有丰富的插件使用。</p><p>要用到的域名： http://vuepress.xgss.net (github pages)的域名。</p><p>github地址： https://github.com/funet8/vuepress.xgss.net.git</p><h1 id="什么是vuepress" tabindex="-1"><a class="header-anchor" href="#什么是vuepress"><span>什么是VuePress</span></a></h1><p>VuePress 由两部分组成：第一部分是一个极简静态网站生成器，它包含由 Vue 驱动的主题系统和插件 API，另一个部分是为书写技术文档而优化的默认主题，它的诞生初衷是为了支持 Vue 及其子项目的文档需求。</p><p>简单的说它就是一个快速建设文档站点的工具，在简单配置好功能后，需要做的事情就剩下写好一个个 Markdown 文档，并且可以将其发布到github pages中</p><p>vuepress官网：https://vuepress.vuejs.org/zh/</p><p><img src="https://imgoss.xgss.net/picgo/基于VuePress用无服务器博客、文档系统.jpg?aliyun" alt="基于VuePress用无服务器博客、文档系统"></p><h2 id="一、安装nodejs和yarn" tabindex="-1"><a class="header-anchor" href="#一、安装nodejs和yarn"><span>一、安装nodejs和yarn</span></a></h2><p>笔者是windows11系统,打开官网:http://nodejs.cn/download/ 我这里下载的是 node-v16.14.0-x64.msi，跟安装普通的软件一样。</p><p>安装之后。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">Administrator@star-win11 MINGW64 /e/360data/重要数据/桌面</span>
<span class="line">$ node -v</span>
<span class="line">v16.14.0</span>
<span class="line">安装yarn</span>
<span class="line">$ npm i yarn -g</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、新建github仓库" tabindex="-1"><a class="header-anchor" href="#二、新建github仓库"><span>二、新建github仓库</span></a></h2><p>进入github创建仓库，你也可以fork我的仓库。</p><p><img src="https://imgoss.xgss.net/picgo/image-20220514141458810.png?aliyun" alt="image-20220514141458810"></p><h2 id="三、克隆项目" tabindex="-1"><a class="header-anchor" href="#三、克隆项目"><span>三、克隆项目</span></a></h2><p>地址改成自己的</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># git clone git@github.com:funet8/vuepress.xgss.net.git</span>
<span class="line">或者</span>
<span class="line"># git clone https://github.com/funet8/vuepress.xgss.net.git</span>
<span class="line"># 进入项目</span>
<span class="line">cd vuepress.xgss.net</span>
<span class="line"></span>
<span class="line"># yarn init # npm init</span>
<span class="line"></span>
<span class="line"># yarn add -D vuepress # npm install -D vuepress</span>
<span class="line">弹出如下信息：</span>
<span class="line">yarn add v1.22.17</span>
<span class="line">info No lockfile found.</span>
<span class="line">[1/4] Resolving packages...</span>
<span class="line">warning @vuepress/theme-blog &gt; @vuepress/plugin-pwa &gt; workbox-build &gt; @hapi/joi@15.1.1: Switch to &#39;npm install joi&#39;</span>
<span class="line">...</span>
<span class="line">└─ zepto@1.2.0</span>
<span class="line">Done in 113.09s.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、在本地启动服务器" tabindex="-1"><a class="header-anchor" href="#四、在本地启动服务器"><span>四、在本地启动服务器</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># yarn docs:dev # npm run docs:dev</span>
<span class="line">当出现以下可以在浏览器中访问本机IP+端口访问</span>
<span class="line">&gt; VuePress dev server listening at http://localhost:8099/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、浏览器访问" tabindex="-1"><a class="header-anchor" href="#五、浏览器访问"><span>五、浏览器访问</span></a></h2><p>访问： http://localhost:8080/</p><p>根据IP（替换本机IP）：http://192.168.1.XXX:8080/</p><p><img src="https://imgoss.xgss.net/picgo/image-20220514153324030.png?aliyun" alt="image-20220514153324030"></p><h3 id="关于图片" tabindex="-1"><a class="header-anchor" href="#关于图片"><span>关于图片</span></a></h3><p>VuePress 遵循 “约定优于配置” 的原则，按照官网设置目录结构</p><p>在md中加入静态图片的问题，在md文件中可以使用下面的方式应用静态图片，下面imgs文件夹在public文件件下 目录如下</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">文件地址： docs/.vuepress/public/images/logo.png</span>
<span class="line"></span>
<span class="line">md文档中：</span>
<span class="line">![image](/images/logo.png)</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、项目上线到github-pages" tabindex="-1"><a class="header-anchor" href="#六、项目上线到github-pages"><span>六、项目上线到github pages</span></a></h2><p>参考文章： https://g.xgss.net/doc/gitbook/Github-Page-my-domain.html</p><p>在项目中新建文件 CNAME</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">echo &#39;vuepress.xgss.net&#39;&gt; CNAME</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>github中，setting---&gt;pages</p><p><img src="https://imgoss.xgss.net/picgo/image-20220514161351877.png?aliyun" alt="image-20220514161351877"></p><h3 id="域名解析" tabindex="-1"><a class="header-anchor" href="#域名解析"><span>域名解析</span></a></h3><p>vuepress.xgss.net域名CNAME解析到 funet8.github.io</p><p><img src="https://imgoss.xgss.net/picgo/image-20220514161550026.png?aliyun" alt="image-20220514161550026"></p><p>访问： http://vuepress.xgss.net</p><h1 id="关于自动打包更新" tabindex="-1"><a class="header-anchor" href="#关于自动打包更新"><span>关于自动打包更新</span></a></h1><p>打包脚本，每次项目文档更新之后运行脚本即可</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">cat deploy.sh</span>
<span class="line">#!/usr/bin/env sh</span>
<span class="line"></span>
<span class="line"># 确保脚本抛出遇到的错误</span>
<span class="line">set -e</span>
<span class="line"></span>
<span class="line">#提交到github参考</span>
<span class="line">git init</span>
<span class="line">git add -A</span>
<span class="line">git commit -m &#39;deploy&#39;</span>
<span class="line"></span>
<span class="line">git push -f git@github.com:funet8/vuepress.xgss.net.git master</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"># 生成静态文件</span>
<span class="line">yarn docs:build</span>
<span class="line"></span>
<span class="line"># 进入生成的文件夹</span>
<span class="line">cd docs/.vuepress/dist</span>
<span class="line"></span>
<span class="line">git init</span>
<span class="line">git remote add origin git@github.com:funet8/vuepress.xgss.net.git</span>
<span class="line">git add .</span>
<span class="line">git commit -m &quot;脚本自动提交&quot;</span>
<span class="line">git branch -M master</span>
<span class="line">git push --force --quiet &quot;git@github.com:funet8/vuepress.xgss.net.git&quot; master:gh-pages</span>
<span class="line">cd -</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="关于主题和插件" tabindex="-1"><a class="header-anchor" href="#关于主题和插件"><span>关于主题和插件</span></a></h1><p>修改配置文件：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"> docs\\.vuepress\\config.js</span>
<span class="line"> 添加主题：</span>
<span class="line"> theme: &#39;vuepress-theme-note&#39;,</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,46)]))}const r=n(l,[["render",p]]),c=JSON.parse('{"path":"/kaiyuan/Open-Source-Software/%E5%9F%BA%E4%BA%8EVuePress%E5%92%8Cgithub%E6%90%AD%E5%BB%BA%E6%97%A0%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%8D%9A%E5%AE%A2%E3%80%81%E6%96%87%E6%A1%A3%E7%B3%BB%E7%BB%9F.html","title":"基于VuePress和github用搭建无服务器的博客、文档系统","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"kaiyuan/Open-Source-Software/基于VuePress和github搭建无服务器博客、文档系统.md"}');export{r as comp,c as data};
