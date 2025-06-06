import{_ as e,c as n,b as a,o as i}from"./app-BEL8OELx.js";const l={};function t(d,s){return i(),n("div",null,s[0]||(s[0]=[a(`<h1 id="青龙面板批量部署依赖库以便适应各种脚本" tabindex="-1"><a class="header-anchor" href="#青龙面板批量部署依赖库以便适应各种脚本"><span>青龙面板批量部署依赖库以便适应各种脚本</span></a></h1><p><img src="https://imgoss.xgss.net/picgo/image-20230215154648046.png?aliyun" alt="image-20230215154648046"></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">Error：Cannot find module ‘axios’</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20230209175057296.png?aliyun" alt="image-20230209175057296"></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker exec -it qinglong bash</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>如果你的青龙容器不叫<code>qinglong</code>，那自己替换为相应的容器名字。</p><p>安装依赖命令：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">curl -fsSL https://ghproxy.com/https://raw.githubusercontent.com/shufflewzc/QLDependency/main/Shell/QLOneKeyDependency.sh | sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>如果你使用的是国内服务器，并且上述命令超时，可尝试缙哥哥加速版：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">curl -fsSL https://api.dujin.org/js/qinglong/qinglong-yilaiku-dujin.org.sh | sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20230209180352093.png?aliyun" alt="image-20230209180352093"></p><p>海外服务器可以使用这个：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">curl -fsSL https://raw.githubusercontent.com/FlechazoPh/QLDependency/main/Shell/QLOneKeyDependency.sh | sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>慢慢等就 OK 了。</p><h2 id="青龙面板添加依赖库" tabindex="-1"><a class="header-anchor" href="#青龙面板添加依赖库"><span>青龙面板添加依赖库</span></a></h2><p>点击左侧菜单 &#39;依赖管理&#39;（IP/dependence），再在右上角点击<code>添加依赖</code>。</p><p><img src="https://imgoss.xgss.net/picgo/20220413101255.png?aliyun" alt="img"></p><p>依赖类型分三种，分别是：NodeJs、Python3、Linux，我们分别进行添加。添加的方式非常简单，按上图所示，选择好对应的依赖类型，然后输入名称即可。名称缙哥哥会根据三种依赖类型进行归类，小伙伴们一个个复制即可。</p><h2 id="nodejs-依赖库" tabindex="-1"><a class="header-anchor" href="#nodejs-依赖库"><span>NodeJs 依赖库</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">crypto-js</span>
<span class="line">prettytable</span>
<span class="line">dotenv</span>
<span class="line">jsdom</span>
<span class="line">date-fns</span>
<span class="line">tough-cookie</span>
<span class="line">tslib</span>
<span class="line">ws@7.4.3</span>
<span class="line">ts-md5</span>
<span class="line">jsdom -g</span>
<span class="line">jieba</span>
<span class="line">fs</span>
<span class="line">form-data</span>
<span class="line">json5</span>
<span class="line">global-agent</span>
<span class="line">png-js</span>
<span class="line">@types/node</span>
<span class="line">require</span>
<span class="line">typescript</span>
<span class="line">js-base64</span>
<span class="line">axios</span>
<span class="line">moment</span>
<span class="line">ds</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当添加所有的依赖库均出现安装失败，且提示源问题，可尝试使用 ssh 工具进入青龙面板容器，执行下方代码。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">npm config set registry https://registry.npmmirror.com/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="python3-依赖库" tabindex="-1"><a class="header-anchor" href="#python3-依赖库"><span>Python3 依赖库</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">requests</span>
<span class="line">canvas  </span>
<span class="line">ping3</span>
<span class="line">jieba</span>
<span class="line">aiohttp</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="linux-依赖库" tabindex="-1"><a class="header-anchor" href="#linux-依赖库"><span>Linux 依赖库</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">bizCode</span>
<span class="line">bizMsg  </span>
<span class="line">lxml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在青龙面板依赖库中添加后会自动执行安装，点击日志或者刷新页面可以查看是否安装成功，若安装失败可以点击重新安装。</p>`,27)]))}const c=e(l,[["render",t]]),p=JSON.parse('{"path":"/internet/%E9%9D%92%E9%BE%99%E9%9D%A2%E6%9D%BF%E6%89%B9%E9%87%8F%E9%83%A8%E7%BD%B2%E4%BE%9D%E8%B5%96%E5%BA%93%E4%BB%A5%E4%BE%BF%E9%80%82%E5%BA%94%E5%90%84%E7%A7%8D%E8%84%9A%E6%9C%AC.html","title":"青龙面板批量部署依赖库以便适应各种脚本","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"internet/青龙面板批量部署依赖库以便适应各种脚本.md"}');export{c as comp,p as data};
