import{_ as e,c as n,b as a,o as i}from"./app-BEL8OELx.js";const l={};function p(d,s){return i(),n("div",null,s[0]||(s[0]=[a(`<h1 id="使用vuepress2-x构建个人知识博客-并且用个人域名部署到github-pages中。" tabindex="-1"><a class="header-anchor" href="#使用vuepress2-x构建个人知识博客-并且用个人域名部署到github-pages中。"><span>使用VuePress2.X构建个人知识博客，并且用个人域名部署到GitHub Pages中。</span></a></h1><h2 id="什么是vuepress" tabindex="-1"><a class="header-anchor" href="#什么是vuepress"><span>什么是VuePress</span></a></h2><p>VuePress 是一个以 Markdown 为中心的静态网站生成器。你可以使用 Markdown 来书写内容（如文档、博客等），然后 VuePress 会帮助你生成一个静态网站来展示它们。VuePress 诞生的初衷是为了支持 Vue.js 及其子项目的文档需求，但是现在它已经在帮助大量用户构建他们的文档、博客和其他静态网站。官网：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">https://vuepress.vuejs.org/zh/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="vuepress1-x和vuepress2-x区别" tabindex="-1"><a class="header-anchor" href="#vuepress1-x和vuepress2-x区别"><span>VuePress1.X和VuePress2.X区别</span></a></h2><p>最开始星哥使用的是VuePress1.X（https://vuepress.xgss.net/），后期由于nodejs升级了导致VuePress1.X使用不了，一直报错。</p><p>无奈升级到VuePress2.X，2.x和1.x有很多不兼容的地方，也踩了很多坑，记录一下。</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250606145334981.png?aliyun" alt="image-20250606145334981"></p><h1 id="安装vuepress" tabindex="-1"><a class="header-anchor" href="#安装vuepress"><span>安装VuePress</span></a></h1><p>环境： window10</p><p>最好有自己的域名，星哥这里使用的事vuepress-v2.xgss.net</p><p>软件安装：nodejs和git</p><p>由于官方的教程docs.yml文件是pnpm作为包管理器，本人最开始使用的是yarn导致GitHub Actions失败，所以使用pnpm重新安装VuePress</p><p>星哥最开始使用的yarn，后来改成了pnpm，所以这个笔记遇到yarn一律改成pnpm既可。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">https://vuepress.vuejs.org/zh/guide/deployment.html#github-pages</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="重新安装vuepress" tabindex="-1"><a class="header-anchor" href="#重新安装vuepress"><span>重新安装VuePress</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">安装</span>
<span class="line">$ npm install -g pnpm</span>
<span class="line">added 1 package in 3s</span>
<span class="line">$ pnpm -v</span>
<span class="line">10.11.1</span>
<span class="line"></span>
<span class="line">pnpm create vuepress vuepress-starter</span>
<span class="line">mkdir vuepress-starter</span>
<span class="line">cd vuepress-starter</span>
<span class="line"></span>
<span class="line">安装vuepress</span>
<span class="line">pnpm init</span>
<span class="line">pnpm add -D vuepress@next vue</span>
<span class="line">pnpm add -D @vuepress/bundler-vite@next @vuepress/theme-default@next</span>
<span class="line"></span>
<span class="line">安装调试插件</span>
<span class="line">pnpm add -D sass-embedded</span>
<span class="line">安装搜索插件</span>
<span class="line">pnpm add -D @vuepress/plugin-search@next</span>
<span class="line"></span>
<span class="line">启动开发服务器</span>
<span class="line">pnpm docs:dev</span>
<span class="line"></span>
<span class="line">构建网站：</span>
<span class="line">pnpm docs:build</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下是使用yarn安装，这里推荐使用pnpm安装</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">你可以通过 create-vuepress 直接创建项目模板。</span>
<span class="line">yarn create vuepress vuepress-starter</span>
<span class="line"></span>
<span class="line">创建并进入一个新目录</span>
<span class="line">mkdir vuepress-starter</span>
<span class="line">cd vuepress-starter</span>
<span class="line"></span>
<span class="line">初始化项目</span>
<span class="line">git init</span>
<span class="line">yarn init</span>
<span class="line"></span>
<span class="line"># 安装 vuepress</span>
<span class="line">yarn add -D vuepress@next</span>
<span class="line"># 安装打包工具和主题</span>
<span class="line">yarn add -D @vuepress/bundler-vite@next @vuepress/theme-default@next</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建-vuepress-配置文件" tabindex="-1"><a class="header-anchor" href="#创建-vuepress-配置文件"><span>创建 VuePress 配置文件</span></a></h2><p>docs/.vuepress/config.js</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">mkdir -p docs/.vuepress/</span>
<span class="line">vi docs/.vuepress/config.js</span>
<span class="line">填入一下配置：</span>
<span class="line">import { viteBundler } from &#39;@vuepress/bundler-vite&#39;</span>
<span class="line">import { defaultTheme } from &#39;@vuepress/theme-default&#39;</span>
<span class="line">import { defineUserConfig } from &#39;vuepress&#39;</span>
<span class="line"></span>
<span class="line">export default defineUserConfig({</span>
<span class="line">  bundler: viteBundler(),</span>
<span class="line">  theme: defaultTheme(),</span>
<span class="line">})</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建你的第一篇文档</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">echo &#39;# Hello VuePress&#39; &gt; docs/README.md</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="启动开发服务器" tabindex="-1"><a class="header-anchor" href="#启动开发服务器"><span>启动开发服务器</span></a></h2><p>你可以在 package.json 中添加一些 scripts ：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">{</span>
<span class="line">  &quot;scripts&quot;: {</span>
<span class="line">    &quot;docs:dev&quot;: &quot;vuepress dev docs&quot;,</span>
<span class="line">    &quot;docs:build&quot;: &quot;vuepress build docs&quot;</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo2025/image-20250605102058056.png?aliyun" alt="image-20250605102058056"></p><p>运行 docs:dev 脚本可以启动开发服务器:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">yarn docs:dev</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>VuePress 会在 http://localhost:8080 启动一个热重载的开发服务器。当你修改你的 Markdown 文件时，浏览器中的内容也会自动更新。</p><p>报错：</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250605102257832.png?aliyun" alt="image-20250605102257832"></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">yarn add -D sass-embedded</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="再启动开发服务器" tabindex="-1"><a class="header-anchor" href="#再启动开发服务器"><span>再启动开发服务器</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ yarn docs:dev</span>
<span class="line">yarn run v1.22.22</span>
<span class="line">$ vuepress dev docs</span>
<span class="line">√ Initializing and preparing data - done in 58ms</span>
<span class="line">10:22:16 [vite] (client) Re-optimizing dependencies because lockfile has changed</span>
<span class="line"></span>
<span class="line">  vite v6.3.5 dev server running at:</span>
<span class="line"></span>
<span class="line">  ➜  Local:   http://localhost:8080/</span>
<span class="line">  ➜  Network: http://192.168.1.251:8080/</span>
<span class="line">  ➜  Network: http://192.168.52.1:8080/</span>
<span class="line">  ➜  Network: http://192.168.152.1:8080/</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用浏览器访问http://localhost:8080/</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250605102401921.png?aliyun" alt="image-20250605102401921"></p><h2 id="构建你的网站" tabindex="-1"><a class="header-anchor" href="#构建你的网站"><span>构建你的网站</span></a></h2><p>运行 docs:build 脚本可以构建你的网站：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">yarn docs:build</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="查看vuepress版本" tabindex="-1"><a class="header-anchor" href="#查看vuepress版本"><span>查看vuepress版本</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">yarn list vuepress</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h1 id="vuepress主题-报错" tabindex="-1"><a class="header-anchor" href="#vuepress主题-报错"><span>vuepress主题（报错）</span></a></h1><p>更换主题，一直报错就决定不换主题了，使用默认主题了！</p><p>官网： https://marketplace.vuejs.press/zh/themes/</p><h2 id="vuepress-theme-mix" tabindex="-1"><a class="header-anchor" href="#vuepress-theme-mix"><span>VuePress Theme Mix</span></a></h2><p>https://vuepress-theme-mix.netlify.app/zh/guide/getting-started.html</p><h3 id="安装vuepress-theme-mix" tabindex="-1"><a class="header-anchor" href="#安装vuepress-theme-mix"><span>安装VuePress Theme Mix</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">yarn add -D vuepress-theme-mix@next</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="使用与配置" tabindex="-1"><a class="header-anchor" href="#使用与配置"><span>使用与配置</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">import { defineUserConfig } from &#39;vuepress&#39;</span>
<span class="line">import mixTheme from &#39;vuepress-theme-mix&#39;</span>
<span class="line"></span>
<span class="line">export default defineUserConfig({</span>
<span class="line">  // ...</span>
<span class="line"></span>
<span class="line">  theme: mixTheme({</span>
<span class="line">    // 在这里配置主题</span>
<span class="line">  }),</span>
<span class="line"></span>
<span class="line">  // ...</span>
<span class="line">})</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="vuepress配置搜索" tabindex="-1"><a class="header-anchor" href="#vuepress配置搜索"><span>VuePress配置搜索</span></a></h1><h2 id="安装插件" tabindex="-1"><a class="header-anchor" href="#安装插件"><span>安装插件</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">首先，在你的 VuePress 项目中安装该插件：</span>
<span class="line">pnpm add -D @vuepress/plugin-search@next</span>
<span class="line"># 或者</span>
<span class="line">yarn add -D @vuepress/plugin-search@next</span>
<span class="line"># 或者</span>
<span class="line">npm i -D @vuepress/plugin-search@next</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置config-js" tabindex="-1"><a class="header-anchor" href="#配置config-js"><span>配置config.js</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">.vuepress/config.js 示例:</span>
<span class="line">import { searchPlugin } from &#39;@vuepress/plugin-search&#39;</span>
<span class="line"></span>
<span class="line">module.exports = {</span>
<span class="line">  plugins: [</span>
<span class="line">    searchPlugin({</span>
<span class="line">      // 插件选项</span>
<span class="line">      // 可以配置的选项包括：</span>
<span class="line">      // maxSuggestions: 5, // 最多显示多少条搜索结果</span>
<span class="line">      // isSearchable: (page) =&gt; page.path !== &#39;/&#39;, // 排除特定页面</span>
<span class="line">      // hotKeys: [&#39;s&#39;, &#39;/&#39;], // 激活搜索框的快捷键</span>
<span class="line">      // locales: { // 多语言支持</span>
<span class="line">      //   &#39;/&#39;: {</span>
<span class="line">      //     placeholder: &#39;搜索&#39;,</span>
<span class="line">      //   },</span>
<span class="line">      //   &#39;/en/&#39;: {</span>
<span class="line">      //     placeholder: &#39;Search&#39;,</span>
<span class="line">      //   },</span>
<span class="line">      // },</span>
<span class="line">      // get.Display.Text: (page) =&gt; { /* 自定义搜索结果显示文本 */ },</span>
<span class="line">      // search: (query, pages) =&gt; { /* 自定义搜索逻辑 */ },</span>
<span class="line">    }),</span>
<span class="line">  ],</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="报错1" tabindex="-1"><a class="header-anchor" href="#报错1"><span>报错1</span></a></h2><p>使用</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">yarn docs:build</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>报错，由于图片没有上传到oss中导致报错。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">error [vite:asset] Could not load G:/STAR学习/vuepress-starter/docs/./chatgpt/H:/typora_images/image-20240415180831846.png (imported by docs/.vuepress/.temp/pages/chatgpt/15.免费使用GPT-4的3种方法，白嫖大模型.html.vue): ENOENT: no such file or directory, open &#39;G:\\STAR学习\\vuepress</span>
<span class="line">-starter\\docs\\chatgpt\\H:\\typora_images\\image-20240415180831846.png&#39;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>解决：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">grep -R &#39;typora_images&#39; ./*| grep -v &#39;.vuepress/&#39;</span>
<span class="line">查看所有未上传的图片</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>把所有的图片上传到oss中，再生成yarn docs:build</p><h1 id="配置到github-pages" tabindex="-1"><a class="header-anchor" href="#配置到github-pages"><span>配置到GitHub Pages</span></a></h1><p>前置条件，需要你有自己的域名，如果没有自有的域名，也可以使用github的域名，但是国内可能访问不畅。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">自己的域名CNAME到 https://&lt;USERNAME&gt;.github.io</span>
<span class="line"></span>
<span class="line">或者使用官方域名： https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里星哥使用vuepress-v2.xgss.net 解析到 funet8.github.io</p><h2 id="_1-github新建仓库" tabindex="-1"><a class="header-anchor" href="#_1-github新建仓库"><span>1.github新建仓库</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">新建git 仓库</span>
<span class="line">vuepress-v2.xgss.net</span>
<span class="line"></span>
<span class="line">克隆到本地</span>
<span class="line">git clone git@github.com:funet8/vuepress-v2.xgss.net.git</span>
<span class="line">把docs的文档拷贝进去</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-执行" tabindex="-1"><a class="header-anchor" href="#_2-执行"><span>2.执行</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">#提交到github仓库-vuepress-v2分支</span>
<span class="line">#git init</span>
<span class="line">git add -A</span>
<span class="line">git commit -m &#39;deploy.sh-vuepressV2脚本自动提交&#39;</span>
<span class="line">git push -f git@github.com:funet8/vuepress-v2.xgss.net.git main</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有两个分支</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250605161934191.png?aliyun" alt="image-20250605161934191"></p><h2 id="_3-设置域名访问" tabindex="-1"><a class="header-anchor" href="#_3-设置域名访问"><span>3.设置域名访问</span></a></h2><p>自有域名 vuepress-v2.xgss.net 解析到github中</p><p>Settings --&gt; Pages</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250605162124719.png?aliyun" alt="image-20250605162124719"></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">把 vuepress-v2.xgss.net CNAME解析到 funet8.github.io</span>
<span class="line">把 你的域名  解析到 &lt;你的github账号名&gt;.github.io</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo2025/image-20250605162742075.png?aliyun" alt="image-20250605162742075"></p><p>等待解析生效，github会提示DNS check successful</p><p>勾选 Enforce HTTPS，强制</p><p>直接根据官方文档先初始化项目就行了，注意文档的版本，v1和v2还是有很多地方不同的。</p><h2 id="_4-用-github-actions-部署到-github-pages" tabindex="-1"><a class="header-anchor" href="#_4-用-github-actions-部署到-github-pages"><span>4.用 GitHub Actions 部署到 GitHub Pages</span></a></h2><p>参考：https://vuepress.vuejs.org/zh/guide/deployment.html#github-pages</p><p>创建 .github/workflows/docs.yml 文件来配置工作流。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">name: docs</span>
<span class="line"></span>
<span class="line">on:</span>
<span class="line">  # 每当 push 到 main 分支时触发部署</span>
<span class="line">  push:</span>
<span class="line">    branches: [main]</span>
<span class="line">  # 手动触发部署</span>
<span class="line">  workflow_dispatch:</span>
<span class="line"></span>
<span class="line">jobs:</span>
<span class="line">  docs:</span>
<span class="line">    runs-on: ubuntu-latest</span>
<span class="line"></span>
<span class="line">    steps:</span>
<span class="line">      - uses: actions/checkout@v4</span>
<span class="line">        with:</span>
<span class="line">          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录</span>
<span class="line">          fetch-depth: 0</span>
<span class="line"></span>
<span class="line">      - name: 设置 pnpm</span>
<span class="line">        uses: pnpm/action-setup@v4</span>
<span class="line"></span>
<span class="line">      - name: 设置 Node.js</span>
<span class="line">        uses: actions/setup-node@v4</span>
<span class="line">        with:</span>
<span class="line">          # 选择要使用的 node 版本</span>
<span class="line">          node-version: 22</span>
<span class="line">          # 缓存 pnpm 依赖</span>
<span class="line">          cache: pnpm</span>
<span class="line"></span>
<span class="line">      - name: 安装依赖</span>
<span class="line">        run: pnpm install --frozen-lockfile</span>
<span class="line"></span>
<span class="line">      # 运行构建脚本</span>
<span class="line">      - name: 构建 VuePress 站点</span>
<span class="line">        run: pnpm docs:build</span>
<span class="line"></span>
<span class="line">      # 查看 workflow 的文档来获取更多信息</span>
<span class="line">      # @see https://github.com/crazy-max/ghaction-github-pages</span>
<span class="line">      - name: 部署到 GitHub Pages</span>
<span class="line">        uses: crazy-max/ghaction-github-pages@v4</span>
<span class="line">        with:</span>
<span class="line">          # 部署到 gh-pages 分支</span>
<span class="line">          target_branch: gh-pages</span>
<span class="line">          # 部署目录为 VuePress 的默认输出目录</span>
<span class="line">          build_dir: docs/.vuepress/dist</span>
<span class="line">        env:</span>
<span class="line">          # @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret</span>
<span class="line">          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提交代码，触发Actions</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250605165314078.png?aliyun" alt="image-20250605165314078"></p><h2 id="报错没有配置packagemanager" tabindex="-1"><a class="header-anchor" href="#报错没有配置packagemanager"><span>报错没有配置packageManager</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">Error: No pnpm version is specified. Please specify it by one of the following ways: - in the GitHub Action config with the key &quot;version&quot; - in the package.json with the key &quot;packageManager&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo2025/image-20250605165722852.png?aliyun" alt="image-20250605165722852"></p><h2 id="解决" tabindex="-1"><a class="header-anchor" href="#解决"><span>解决</span></a></h2><p>在 package.json添加</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&quot;packageManager&quot;: &quot;pnpm@10.11.1&quot;</span>
<span class="line"></span>
<span class="line">或者在 .github/workflows/docs.yml 文档中添加</span>
<span class="line">      - name: 设置 pnpm</span>
<span class="line">        uses: pnpm/action-setup@v4</span>
<span class="line">        with:</span>
<span class="line">          version: &#39;8.x&#39;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="报错无pnpm-lock-yaml" tabindex="-1"><a class="header-anchor" href="#报错无pnpm-lock-yaml"><span>报错无pnpm-lock.yaml</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">Dependencies lock file is not found in /home/runner/work/vuepress-v2.xgss.net/vuepress-v2.xgss.net. Supported file patterns: pnpm-lock.yaml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo2025/image-20250605171442396.png?aliyun" alt="image-20250605171442396"></p><h2 id="解决-1" tabindex="-1"><a class="header-anchor" href="#解决-1"><span>解决</span></a></h2><p>安装pnpm</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ npm install -g pnpm</span>
<span class="line">added 1 package in 3s</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">$ pnpm -v</span>
<span class="line">10.11.1</span>
<span class="line"></span>
<span class="line">$rm -rf node_modules/</span>
<span class="line"></span>
<span class="line">$ pnpm install</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="pnpm包管理的问题" tabindex="-1"><a class="header-anchor" href="#pnpm包管理的问题"><span>pnpm包管理的问题</span></a></h1><p>由于官方的教程docs.yml文件是pnpm作为包管理器，本人最开始使用的是yarn导致GitHub Actions失败，所以重新安装VuePress</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">https://vuepress.vuejs.org/zh/guide/deployment.html#github-pages</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="重新安装vuepress-1" tabindex="-1"><a class="header-anchor" href="#重新安装vuepress-1"><span>重新安装VuePress</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">mv package.json package-yarn.json</span>
<span class="line">rm -rf node_modules</span>
<span class="line"></span>
<span class="line">安装vuepress</span>
<span class="line">pnpm init</span>
<span class="line">pnpm add -D vuepress@next vue</span>
<span class="line">pnpm add -D @vuepress/bundler-vite@next @vuepress/theme-default@next</span>
<span class="line"></span>
<span class="line">调试插件</span>
<span class="line">pnpm add -D sass-embedded</span>
<span class="line">搜索插件</span>
<span class="line">pnpm add -D @vuepress/plugin-search@next</span>
<span class="line"></span>
<span class="line">启动开发服务器</span>
<span class="line">pnpm docs:dev</span>
<span class="line"></span>
<span class="line">构建网站：</span>
<span class="line">pnpm docs:build</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-工作流权限" tabindex="-1"><a class="header-anchor" href="#_5-工作流权限"><span>5.工作流权限</span></a></h2><p>在仓库的 Settings &gt; Actions &gt; General，确保 GITHUB_TOKEN 的权限被设置为 write 权限（即推送权限）。</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250605183211238.png?aliyun" alt="image-20250605183211238"></p><p>如图，勾选：Read and write permissions</p><p>保存。</p><h2 id="_6-提交成功" tabindex="-1"><a class="header-anchor" href="#_6-提交成功"><span>6.提交成功</span></a></h2><p><img src="https://imgoss.xgss.net/picgo2025/image-20250606094256875.png?aliyun" alt="image-20250606094256875"></p><p>但是当我访问页面的时候</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">https://funet8.github.io/vuepress-v2.xgss.net/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>无尽的404让人头疼</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250606094350107.png?aliyun" alt="image-20250606094350107"></p><p>再次修改</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docs\\.vuepress\\config.js</span>
<span class="line">里面的配置</span>
<span class="line">base: &#39;/vuepress-v2.xgss.net/&#39;, // 部署到github相关的配置 </span>
<span class="line">则是使用https://funet8.github.io/vuepress-v2.xgss.net/ 访问</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>改成使用域名，发现缺少CNAME 文件</p><p>于是在docs.yml文件中添加一步</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">      - name: Add CNAME file # 添加 CNAME 文件</span>
<span class="line">        run: echo &#39;vuepress-v2.xgss.net&#39; &gt; docs/.vuepress/dist/CNAME</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>最终使用域名 vuepress-v2.xgss.net 可以访问博客页面了。</p><h1 id="最后" tabindex="-1"><a class="header-anchor" href="#最后"><span>最后</span></a></h1><p>写文不易，如果你都看到了这里，请点个赞和在看，分享给更多的朋友；也别忘了关注星哥玩云！这里有满满的干货分享，还有轻松有趣的技术交流～点个赞、分享给身边的小伙伴，一起成长，一起玩转技术世界吧！ 😊</p><p>通过以上步骤，你成功地使用VuePress 2.X搭建了一个个人知识博客，并将其部署到GitHub Pages，同时还配置了自己的个人域名。这不仅为你提供了一个高效的知识管理平台，还能让你更好地记录学习过程并分享给他人。希望这篇教程对你有所帮助，祝你搭建博客愉快！</p>`,127)]))}const t=e(l,[["render",p]]),c=JSON.parse('{"path":"/web/%E4%BD%BF%E7%94%A8VuePress2.X%E6%9E%84%E5%BB%BA%E4%B8%AA%E4%BA%BA%E7%9F%A5%E8%AF%86%E5%8D%9A%E5%AE%A2-%E5%B9%B6%E4%B8%94%E7%94%A8%E4%B8%AA%E4%BA%BA%E5%9F%9F%E5%90%8D%E9%83%A8%E7%BD%B2%E5%88%B0GitHub-Pages%E4%B8%AD.html","title":"使用VuePress2.X构建个人知识博客，并且用个人域名部署到GitHub Pages中。","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749201009000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":11,"url":"https://github.com/star"}],"changelog":[{"hash":"783e3826c09a92ed7204eb6e0402fe1ef3708a27","time":1749201009000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"},{"hash":"fb31be337204ea3a6ad8f049d8d7f4c318be271f","time":1749181959000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"},{"hash":"a91d6e4f0da3dc77202e090ddc01fca09d8eac0b","time":1749181358000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"},{"hash":"520309b751fd5f6c2de98a23df40d36386e1cc33","time":1749177566000,"email":"star@xgss.net","author":"star","message":"包管理器,从yarn换成pnpm"},{"hash":"153692269b121e55c56e78c6f90a61edb90e92fe","time":1749119571000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"},{"hash":"fea5f20dc34f282037bb76ec6247b2c246351e90","time":1749118874000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"},{"hash":"81072b61a7dae203e0abcf2fa39e20e6d6f7ba75","time":1749115945000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"},{"hash":"1021c9d7e5681ff123d039859341883b757237e8","time":1749115334000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"},{"hash":"6f6ba9277d910406a97f333144d90d99cab47d23","time":1749114477000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"},{"hash":"dd9f144cf378c4a97377781f3b38f2f434d36d2c","time":1749113555000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"},{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"web/使用VuePress2.X构建个人知识博客-并且用个人域名部署到GitHub-Pages中.md"}');export{t as comp,c as data};
