import{_ as n,c as e,b as a,o as i}from"./app-BEL8OELx.js";const l={};function r(d,s){return i(),e("div",null,s[0]||(s[0]=[a(`<h1 id="vuepress-重装系统之后vuepress出现问题" tabindex="-1"><a class="header-anchor" href="#vuepress-重装系统之后vuepress出现问题"><span>Vuepress-重装系统之后VuePress出现问题</span></a></h1><h1 id="node版本不同" tabindex="-1"><a class="header-anchor" href="#node版本不同"><span>node版本不同</span></a></h1><p>重装系统之后报错</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">Administrator@chuanqu-star MINGW64 /g/STAR学习/g.xgss.net (vuepress)</span>
<span class="line">$ yarn init</span>
<span class="line">yarn init v1.22.22</span>
<span class="line">error Error: Can&#39;t answer a question unless a user TTY</span>
<span class="line">    at ConsoleReporter.question (C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\yarn\\lib\\cli.js:93384:59)</span>
<span class="line">    at Object.&lt;anonymous&gt; (C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\yarn\\lib\\cli.js:85589:38)</span>
<span class="line">    at Generator.next (&lt;anonymous&gt;)</span>
<span class="line">    at step (C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\yarn\\lib\\cli.js:310:30)</span>
<span class="line">    at C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\yarn\\lib\\cli.js:321:13</span>
<span class="line">    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)</span>
<span class="line">info Visit https://yarnpkg.com/en/docs/cli/init for documentation about this command.</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="旧电脑yarn-docs-dev" tabindex="-1"><a class="header-anchor" href="#旧电脑yarn-docs-dev"><span>旧电脑yarn docs:dev</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ yarn docs:dev</span>
<span class="line">yarn run v1.22.17</span>
<span class="line">$ vuepress dev docs</span>
<span class="line">.......</span>
<span class="line">success [17:16:20] Build 1f0d71 finished in 12792 ms!</span>
<span class="line">&gt; VuePress dev server listening at http://localhost:8099/</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="新电脑yarn-docs-dev" tabindex="-1"><a class="header-anchor" href="#新电脑yarn-docs-dev"><span>新电脑yarn docs:dev</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ yarn docs:dev</span>
<span class="line">yarn run v1.22.22</span>
<span class="line">$ vuepress dev docs</span>
<span class="line">&#39;vuepress&#39; is not recognized as an internal or external command,</span>
<span class="line">operable program or batch file.</span>
<span class="line">error Command failed with exit code 1.</span>
<span class="line">info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="版本区别" tabindex="-1"><a class="header-anchor" href="#版本区别"><span>版本区别</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">新的系统</span>
<span class="line">node -v</span>
<span class="line">v20.15.1</span>
<span class="line"></span>
<span class="line">服务器</span>
<span class="line">node -v</span>
<span class="line">v16.14.0</span>
<span class="line"></span>
<span class="line">旧的电脑</span>
<span class="line">node -v</span>
<span class="line">v16.14.0</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要重装吗？</p>`,11)]))}const t=n(l,[["render",r]]),p=JSON.parse('{"path":"/web/Vuepress-%E9%87%8D%E8%A3%85%E7%B3%BB%E7%BB%9F%E4%B9%8B%E5%90%8EVuePress%E5%87%BA%E7%8E%B0%E9%97%AE%E9%A2%98.html","title":"Vuepress-重装系统之后VuePress出现问题","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"web/Vuepress-重装系统之后VuePress出现问题.md"}');export{t as comp,p as data};
