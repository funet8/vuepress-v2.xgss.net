import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as e}from"./app-BiQR_lPj.js";const l={};function p(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h1 id="中国人自己的cursor-腾讯codebuddy从零打造家庭相册" tabindex="-1"><a class="header-anchor" href="#中国人自己的cursor-腾讯codebuddy从零打造家庭相册"><span>中国人自己的Cursor？腾讯CodeBuddy从零打造家庭相册</span></a></h1><p>大家好，我是星哥，作为一个二手的高级程序猿，五一出去游玩跟家人的照片想要做个一个web页面分享给家人，今天就用出品的腾讯云代码助手（CodeBuddy）一行代码都不用自己写，看能不能实现的我小愿望。</p><blockquote><p>PS:我正在参加CodeBuddy「首席试玩官」内容创作大赛，本文所使用的 CodeBuddy 免费下载链接：<a href="https://copilot.tencent.com/?fromSource=gwzcw.9661261.9661261.9661261&amp;utm_medium=cpc&amp;utm_id=gwzcw.9661261.9661261.9661261&amp;from_column=20421&amp;from=20421" target="_blank" rel="noopener noreferrer">腾讯云代码助手 CodeBuddy - AI 时代的智能编程伙伴</a></p></blockquote><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513194617724.png?aliyun" alt="image-20250513194617724"></p><h2 id="初识腾讯云代码助手-codebuddy" tabindex="-1"><a class="header-anchor" href="#初识腾讯云代码助手-codebuddy"><span>初识腾讯云代码助手（CodeBuddy）</span></a></h2><p>腾讯自研的AI编程提效工具，凭借腾讯混元与 DeepSeek 混合模型，专为开发者打造。CodeBuddy不仅支持200+编程语言、兼容多种主流IDE，是国内首个支持 MCP 的代码助手，还为开发者提供开发智能体 Craft、智能代码补全、单元测试、代码诊断等多项高效功能，帮助开发者在编码过程中节省时间、提升效率。目前腾讯内部 85% 以上的开发者已使用 CodeBuddy，编码时间平均缩短 40% 以上，AI生成代码占比超四成，研发效率提升超 16%。</p><h2 id="codebuddy兼容ide" tabindex="-1"><a class="header-anchor" href="#codebuddy兼容ide"><span>CodeBuddy兼容IDE</span></a></h2><p>兼容 Visual Studio Code、Pycharm、Android Studio、鸿蒙DevEco Studio、Visual studio、cloudstudio 、微信开发者小程序工具、XCode等主流的集成开发环境。</p><h2 id="codebuddy编程语言及框架" tabindex="-1"><a class="header-anchor" href="#codebuddy编程语言及框架"><span>CodeBuddy编程语言及框架</span></a></h2><p>支持Java、Python、Go、C/C++、JavaScript、TypeScript、HTML、PHPRuby、Rust、Swift、Scala、Lua、 Dart、Node.JS、csS3 等200+种编程语言。</p><h1 id="安装vs-code" tabindex="-1"><a class="header-anchor" href="#安装vs-code"><span>安装VS Code</span></a></h1><p>下载地址：https://code.visualstudio.com/ ，点击“Download for Windows”下载，安装。</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513173913986.png?aliyun" alt="image-20250513173913986"></p><h2 id="vscode设置中文" tabindex="-1"><a class="header-anchor" href="#vscode设置中文"><span>VSCode设置中文</span></a></h2><p>点击扩展搜索“chinese”安装扩展，Chinese (Simplified) (简体中文) 的扩展。</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513174055682.png?aliyun" alt="image-20250513174055682"></p><p>1、打开 VSCode 软件，然后按住键盘上的“Ctrl+Shift+P”组合键，打开命令面板。</p><p>2、在命令面板中输入“Configure Display Language”，然后点击“Configure Display Language”选项。</p><p>3、在弹出的语言选择列表中，选择“zh-cn”，表示简体中文。</p><p>4、点击列表中的“Restart”按钮，重启 VSCode，就可以变成了中文。</p><h1 id="安装腾讯云codebuddy" tabindex="-1"><a class="header-anchor" href="#安装腾讯云codebuddy"><span>安装腾讯云CodeBuddy</span></a></h1><p>点击扩展，再搜索“CodeBuddy”，点击安装，既可安装。</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513174147224.png?aliyun" alt="image-20250513174147224"></p><p>另外的一种安装方式，直接访问官网 https://copilot.tencent.com/</p><p>点击“免费使用”，再点击再vscode中使用。</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513174501848.png?aliyun" alt="image-20250513174501848"></p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513174431460.png?aliyun" alt="image-20250513174431460"></p><p>点击左侧的扩展按钮</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513174605351.png?aliyun" alt="image-20250513174605351"></p><p>登录成功之后就可以使用Codebuddy了，这里我们可以看到</p><h2 id="codebuddy界面" tabindex="-1"><a class="header-anchor" href="#codebuddy界面"><span>Codebuddy界面</span></a></h2><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513194004448.png?aliyun" alt="image-20250513194004448"></p><p>craft 助手模式，直接操作代码和命令行，适合修改和生成。 chat 聊天模式，不修改代码，适合修复、解决问题和分析思路 Code Review 代码审查 Unit Test 单元测试</p><h2 id="新建目录photos" tabindex="-1"><a class="header-anchor" href="#新建目录photos"><span>新建目录Photos</span></a></h2><p>下面就可以开始规划做自己的家庭相册。</p><p>先在桌面新建一个空的文件夹“Photos”，以后的代码都放到这里目录里，再用vscode打开这个目录。</p><h2 id="做一个产品经理" tabindex="-1"><a class="header-anchor" href="#做一个产品经理"><span>做一个产品经理</span></a></h2><p>把这个需求直接丢给Craft，看看有什么神奇的事情发生。</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513190825479.png?aliyun" alt="image-20250513190825479"></p><p>给我回答了</p><p>这个任务需要创建一个简单的WEB家庭相册页面，主要功能包括：</p><ol><li><p>展示照片缩略图</p></li><li><p>点击缩略图后以弹窗形式展示原图</p></li><li><p>支持键盘左右键切换图片和ESC键关闭弹窗</p></li></ol><p>首先需要明确几个要点：</p><ol><li><p>照片文件是否已经存在？需要先查看当前目录下是否有照片文件</p></li><li><p>需要创建HTML、CSS和JavaScript文件来实现功能</p></li><li><p>需要处理图片的缩略图生成问题</p></li></ol><p>接下来步骤：</p><ol><li><p>先查看当前目录下有哪些图片文件</p></li><li><p>根据图片文件创建相册页面</p></li><li><p>实现缩略图展示和弹窗功能</p></li><li><p>添加键盘事件处理</p></li></ol><p>首先使用list_files工具查看当前目录下的图片文件，</p><p>当前目录为空，需要先获取照片文件才能创建相册。我需要向用户确认：</p><ol><li><p>照片文件是否已经准备好？如果已准备好，需要知道照片存放在哪个目录</p></li><li><p>如果照片还未准备好，需要用户先上传照片到当前目录</p></li></ol><p>由于当前目录为空，无法继续创建相册页面，需要用户提供照片文件</p><p>当前目录为空，无法创建相册。请问您的照片文件是否已经准备好？如果已准备好，请告知照片存放的目录路径；如果还未准备好，请先将照片上传到当前目录(e:\\360data\\重要数据\\桌面\\Photos)。</p><h2 id="什么是craft" tabindex="-1"><a class="header-anchor" href="#什么是craft"><span>什么是Craft</span></a></h2><p>CodeBuddy 的“王炸”功能：Craft (智能创建)，就是个超级智能的 Agent (智能体)。你把 Prompt 往里一扔，它就跟打了鸡血似的，开始“噼里啪啦”一顿操作：创建项目结构、生成核心代码、配置依赖……全程自动化，你就嗑着瓜子等着就行。</p><p>图片没有上传到目录中，我把图片再上传。</p><h2 id="使用chat功能" tabindex="-1"><a class="header-anchor" href="#使用chat功能"><span>使用chat功能</span></a></h2><p>把刚才的需求丢到chat里</p><p>我需要做一个WEB家庭相册页面 存放五一假期出游的照片 功能 1.照片原始尺寸较大，首先展示缩略图，点击打开原图 2.在弹窗中打开原图，按键盘左右键实现查看上一张下一张图，按esc键可退出。</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513194129517.png?aliyun" alt="image-20250513194129517"></p><p>经过一段时间的思考出了一个需求文档</p><p>一、核心功能要求</p><ol><li>智能图片处理系统</li></ol><p>采用thumbnail.js自动生成缩略图（建议尺寸：320x240） 图片预加载机制（相邻3张提前加载） 支持WebP格式自动转换（兼容性处理） 2. 响应式相册布局</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>&lt;div class=&quot;gallery-grid&quot;&gt;</span></span>
<span class="line"><span>  &lt;!-- 动态生成缩略图 --&gt;</span></span>
<span class="line"><span>  &lt;div class=&quot;thumb-card&quot; v-for=&quot;(img, index) in images&quot;&gt;</span></span>
<span class="line"><span>    &lt;img :src=&quot;img.thumb&quot; @click=&quot;openLightbox(index)&quot;&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;exif-info&quot;&gt;{{ img.date | formatDate }}&lt;/div&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>智能灯箱组件</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>class Lightbox {</span></span>
<span class="line"><span>  constructor(images) {</span></span>
<span class="line"><span>    this.currentIndex = 0</span></span>
<span class="line"><span>    this.initKeyboardControls()</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  navigate(direction) {</span></span>
<span class="line"><span>    // 带缓动的图片切换动画</span></span>
<span class="line"><span>    // 实现LRU缓存策略提升性能</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>二、交互增强方案</p><ol><li><p>键盘控制体系</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>document.addEventListener(&#39;keydown&#39;, (e) =&gt; {</span></span>
<span class="line"><span>  if (e.key === &#39;ArrowLeft&#39;) this.prevImage()</span></span>
<span class="line"><span>  if (e.key === &#39;ArrowRight&#39;) this.nextImage()</span></span>
<span class="line"><span>  if (e.key === &#39;Escape&#39;) this.close()</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>手势支持（移动端优化）</p></li></ol><p>集成hammer.js实现滑动手势 双击缩放（1x/2x/适应屏幕）</p><p>三、性能优化建议</p><ol><li>图片加载策略</li></ol><p>实现Intersection Observer API懒加载 渐进式JPEG加载 加载状态骨架屏 2. 缓存机制</p><p>Service Worker预缓存策略 IndexedDB本地存储原始图片 四、扩展功能建议</p><ol><li>可视化过滤器</li></ol><p>按地点/人物/场景类型分类 时间轴模式（地图轨迹集成） 2. 社交功能</p><p>图片批注系统 分享组件（生成旅游故事）</p><p>五、技术栈推荐</p><p>视图层：Vue3 + Vuetify 状态管理：Pinia 构建工具：Vite</p><h2 id="生成代码" tabindex="-1"><a class="header-anchor" href="#生成代码"><span>生成代码</span></a></h2><p>index.html</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513191215580.png?aliyun" alt="image-20250513191215580"></p><p>点击修改，或者改成自动修改文件</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513191312439.png?aliyun" alt="image-20250513191312439"></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;zh-CN&quot;&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;</span></span>
<span class="line"><span>    &lt;title&gt;五一假期家庭相册&lt;/title&gt;</span></span>
<span class="line"><span>    &lt;link rel=&quot;stylesheet&quot; href=&quot;style.css&quot;&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>    &lt;h1&gt;家庭相册&lt;/h1&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;gallery&quot;&gt;</span></span>
<span class="line"><span>        &lt;div class=&quot;thumbnail&quot; data-src=&quot;mamanainai-SS.png&quot;&gt;</span></span>
<span class="line"><span>            &lt;img src=&quot;mamanainai-SS.png&quot; alt=&quot;家庭照片&quot;&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div class=&quot;thumbnail&quot; data-src=&quot;QQ图片20250328112327.png&quot;&gt;</span></span>
<span class="line"><span>            &lt;img src=&quot;QQ图片20250328112327.png&quot; alt=&quot;家庭照片&quot;&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div class=&quot;thumbnail&quot; data-src=&quot;QQ图片20250328153035-Q版.png&quot;&gt;</span></span>
<span class="line"><span>            &lt;img src=&quot;QQ图片20250328153035-Q版.png&quot; alt=&quot;家庭照片&quot;&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div class=&quot;thumbnail&quot; data-src=&quot;全家福2024年-Q版.png&quot;&gt;</span></span>
<span class="line"><span>            &lt;img src=&quot;全家福2024年-Q版.png&quot; alt=&quot;家庭照片&quot;&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div class=&quot;thumbnail&quot; data-src=&quot;奔跑-Q版.png&quot;&gt;</span></span>
<span class="line"><span>            &lt;img src=&quot;奔跑-Q版.png&quot; alt=&quot;家庭照片&quot;&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div class=&quot;thumbnail&quot; data-src=&quot;奔跑_看图王-Q版.png&quot;&gt;</span></span>
<span class="line"><span>            &lt;img src=&quot;奔跑_看图王-Q版.png&quot; alt=&quot;家庭照片&quot;&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 图片弹窗 --&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;modal&quot;&gt;</span></span>
<span class="line"><span>        &lt;span class=&quot;close&quot;&gt;&amp;times;&lt;/span&gt;</span></span>
<span class="line"><span>        &lt;img class=&quot;modal-content&quot; id=&quot;modal-img&quot;&gt;</span></span>
<span class="line"><span>        &lt;a class=&quot;prev&quot;&gt;&amp;#10094;&lt;/a&gt;</span></span>
<span class="line"><span>        &lt;a class=&quot;next&quot;&gt;&amp;#10095;&lt;/a&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;script src=&quot;script.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="生成style-css" tabindex="-1"><a class="header-anchor" href="#生成style-css"><span>生成style.css</span></a></h2><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513191430421.png?aliyun" alt="image-20250513191430421"></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>body {</span></span>
<span class="line"><span>    font-family: &#39;Arial&#39;, sans-serif;</span></span>
<span class="line"><span>    margin: 0;</span></span>
<span class="line"><span>    padding: 20px;</span></span>
<span class="line"><span>    background-color: #fff5f5;</span></span>
<span class="line"><span>    background-image: linear-gradient(to bottom, #ffebee, #fff5f5);</span></span>
<span class="line"><span>    min-height: 100vh;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>h1 {</span></span>
<span class="line"><span>    text-align: center;</span></span>
<span class="line"><span>    color: #333;</span></span>
<span class="line"><span>    margin-bottom: 30px;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.gallery {</span></span>
<span class="line"><span>    display: grid;</span></span>
<span class="line"><span>    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));</span></span>
<span class="line"><span>    gap: 20px;</span></span>
<span class="line"><span>    max-width: 1200px;</span></span>
<span class="line"><span>    margin: 0 auto;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.thumbnail {</span></span>
<span class="line"><span>    cursor: pointer;</span></span>
<span class="line"><span>    overflow: hidden;</span></span>
<span class="line"><span>    border-radius: 8px;</span></span>
<span class="line"><span>    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);</span></span>
<span class="line"><span>    transition: transform 0.3s;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.thumbnail:hover {</span></span>
<span class="line"><span>    transform: scale(1.03);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.thumbnail img {</span></span>
<span class="line"><span>    width: 100%;</span></span>
<span class="line"><span>    height: 200px;</span></span>
<span class="line"><span>    object-fit: cover;</span></span>
<span class="line"><span>    display: block;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* 弹窗样式 */</span></span>
<span class="line"><span>.modal {</span></span>
<span class="line"><span>    display: none;</span></span>
<span class="line"><span>    position: fixed;</span></span>
<span class="line"><span>    z-index: 100;</span></span>
<span class="line"><span>    left: 0;</span></span>
<span class="line"><span>    top: 0;</span></span>
<span class="line"><span>    width: 100%;</span></span>
<span class="line"><span>    height: 100%;</span></span>
<span class="line"><span>    background-color: rgba(0, 0, 0, 0.9);</span></span>
<span class="line"><span>    overflow: auto;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.modal-content {</span></span>
<span class="line"><span>    margin: auto;</span></span>
<span class="line"><span>    display: block;</span></span>
<span class="line"><span>    max-width: 90%;</span></span>
<span class="line"><span>    max-height: 90%;</span></span>
<span class="line"><span>    position: absolute;</span></span>
<span class="line"><span>    top: 50%;</span></span>
<span class="line"><span>    left: 50%;</span></span>
<span class="line"><span>    transform: translate(-50%, -50%);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.close {</span></span>
<span class="line"><span>    position: absolute;</span></span>
<span class="line"><span>    top: 20px;</span></span>
<span class="line"><span>    right: 35px;</span></span>
<span class="line"><span>    color: #f1f1f1;</span></span>
<span class="line"><span>    font-size: 40px;</span></span>
<span class="line"><span>    font-weight: bold;</span></span>
<span class="line"><span>    cursor: pointer;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.close:hover {</span></span>
<span class="line"><span>    color: #bbb;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.prev, .next {</span></span>
<span class="line"><span>    position: absolute;</span></span>
<span class="line"><span>    top: 50%;</span></span>
<span class="line"><span>    width: auto;</span></span>
<span class="line"><span>    padding: 16px;</span></span>
<span class="line"><span>    margin-top: -50px;</span></span>
<span class="line"><span>    color: white;</span></span>
<span class="line"><span>    font-weight: bold;</span></span>
<span class="line"><span>    font-size: 30px;</span></span>
<span class="line"><span>    cursor: pointer;</span></span>
<span class="line"><span>    user-select: none;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.next {</span></span>
<span class="line"><span>    right: 0;</span></span>
<span class="line"><span>    border-radius: 3px 0 0 3px;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.prev {</span></span>
<span class="line"><span>    left: 0;</span></span>
<span class="line"><span>    border-radius: 0 3px 3px 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.prev:hover, .next:hover {</span></span>
<span class="line"><span>    background-color: rgba(0, 0, 0, 0.8);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@media screen and (max-width: 600px) {</span></span>
<span class="line"><span>    .gallery {</span></span>
<span class="line"><span>        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    .thumbnail img {</span></span>
<span class="line"><span>        height: 150px;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="生成script-js" tabindex="-1"><a class="header-anchor" href="#生成script-js"><span>生成script.js</span></a></h2><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513191533075.png?aliyun" alt="image-20250513191533075"></p><p>生成的代码。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>document.addEventListener(&#39;DOMContentLoaded&#39;, function() {</span></span>
<span class="line"><span>    // 获取所有元素</span></span>
<span class="line"><span>    const thumbnails = document.querySelectorAll(&#39;.thumbnail&#39;);</span></span>
<span class="line"><span>    const modal = document.querySelector(&#39;.modal&#39;);</span></span>
<span class="line"><span>    const modalImg = document.getElementById(&#39;modal-img&#39;);</span></span>
<span class="line"><span>    const closeBtn = document.querySelector(&#39;.close&#39;);</span></span>
<span class="line"><span>    const prevBtn = document.querySelector(&#39;.prev&#39;);</span></span>
<span class="line"><span>    const nextBtn = document.querySelector(&#39;.next&#39;);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    let currentIndex = 0;</span></span>
<span class="line"><span>    const images = Array.from(thumbnails).map(thumb =&gt; thumb.getAttribute(&#39;data-src&#39;));</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 为每个缩略图添加点击事件</span></span>
<span class="line"><span>    thumbnails.forEach((thumb, index) =&gt; {</span></span>
<span class="line"><span>        thumb.addEventListener(&#39;click&#39;, function() {</span></span>
<span class="line"><span>            currentIndex = index;</span></span>
<span class="line"><span>            showImage(currentIndex);</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 显示图片函数</span></span>
<span class="line"><span>    function showImage(index) {</span></span>
<span class="line"><span>        modalImg.src = images[index];</span></span>
<span class="line"><span>        modal.style.display = &#39;block&#39;;</span></span>
<span class="line"><span>        document.body.style.overflow = &#39;hidden&#39;; // 防止背景滚动</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 关闭弹窗</span></span>
<span class="line"><span>    function closeModal() {</span></span>
<span class="line"><span>        modal.style.display = &#39;none&#39;;</span></span>
<span class="line"><span>        document.body.style.overflow = &#39;auto&#39;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 上一张图片</span></span>
<span class="line"><span>    function prevImage() {</span></span>
<span class="line"><span>        currentIndex = (currentIndex - 1 + images.length) % images.length;</span></span>
<span class="line"><span>        showImage(currentIndex);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 下一张图片</span></span>
<span class="line"><span>    function nextImage() {</span></span>
<span class="line"><span>        currentIndex = (currentIndex + 1) % images.length;</span></span>
<span class="line"><span>        showImage(currentIndex);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 事件监听</span></span>
<span class="line"><span>    closeBtn.addEventListener(&#39;click&#39;, closeModal);</span></span>
<span class="line"><span>    prevBtn.addEventListener(&#39;click&#39;, prevImage);</span></span>
<span class="line"><span>    nextBtn.addEventListener(&#39;click&#39;, nextImage);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 键盘事件</span></span>
<span class="line"><span>    document.addEventListener(&#39;keydown&#39;, function(e) {</span></span>
<span class="line"><span>        if (modal.style.display === &#39;block&#39;) {</span></span>
<span class="line"><span>            switch(e.key) {</span></span>
<span class="line"><span>                case &#39;Escape&#39;:</span></span>
<span class="line"><span>                    closeModal();</span></span>
<span class="line"><span>                    break;</span></span>
<span class="line"><span>                case &#39;ArrowLeft&#39;:</span></span>
<span class="line"><span>                    prevImage();</span></span>
<span class="line"><span>                    break;</span></span>
<span class="line"><span>                case &#39;ArrowRight&#39;:</span></span>
<span class="line"><span>                    nextImage();</span></span>
<span class="line"><span>                    break;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 点击弹窗背景关闭</span></span>
<span class="line"><span>    modal.addEventListener(&#39;click&#39;, function(e) {</span></span>
<span class="line"><span>        if (e.target === modal) {</span></span>
<span class="line"><span>            closeModal();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="打开页面验证" tabindex="-1"><a class="header-anchor" href="#打开页面验证"><span>打开页面验证</span></a></h2><p>直接用浏览器打开</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513191703950.png?aliyun" alt="image-20250513191703950"></p><h2 id="再微调一下" tabindex="-1"><a class="header-anchor" href="#再微调一下"><span>再微调一下</span></a></h2><p>把页面背景改成温馨一点的，把第二张图片去掉</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513191842075.png?aliyun" alt="image-20250513191842075"></p><p>会显示变更前和变更后的代码</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513192502374.png?aliyun" alt="image-20250513192502374"></p><p>一顿自动操作之后，再次打开</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513191926704.png?aliyun" alt="image-20250513191926704"></p><h1 id="改变需求" tabindex="-1"><a class="header-anchor" href="#改变需求"><span>改变需求</span></a></h1><p>创建一个基于 Web 的家庭相册项目，使用 React 框架</p><p>分析需求：</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513194952475.png?aliyun" alt="image-20250513194952475"></p><p>创建一个基于React的家庭相册项目需要以下步骤：</p><ol><li><p>初始化React项目</p></li><li><p>创建相册组件结构</p></li><li><p>实现图片展示功能</p></li><li><p>添加图片查看模态框</p></li><li><p>实现键盘导航功能</p></li></ol><p>首先需要初始化React项目，然后逐步实现功能。由于当前工作目录已有普通HTML相册，建议新建一个目录来存放React项目。</p><p>我将先创建一个新的React项目。</p><p>会自动执行</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>npx create-react-app family-album-react --template typescript</span></span>
<span class="line"><span>Need to install the following packages:</span></span>
<span class="line"><span>  create-react-app</span></span>
<span class="line"><span>Ok to proceed? (y) y</span></span>
<span class="line"><span>npm WARN deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.</span></span>
<span class="line"><span>npm WARN deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513195050674.png?aliyun" alt="image-20250513195050674"></p><p>完成</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513195235912.png?aliyun" alt="image-20250513195235912"></p><p>打开localhost+端口。</p><p><img src="https://imgoss.xgss.net/picgo2025/image-20250513195301914.png?aliyun" alt="image-20250513195301914"></p><h1 id="结束" tabindex="-1"><a class="header-anchor" href="#结束"><span>结束</span></a></h1><p>通过使用腾讯 CodeBuddy 从零打造家庭相册项目，深刻感受到了它作为一款智能编程助手的强大能力。在整个开发过程中，CodeBuddy 就像一位贴心的技术伙伴，从项目的基础框架搭建到各个功能的实现，再到问题的解决和优化，都给予了开发者全方位的支持，极大地提升了开发效率和项目质量。与 Cursor 等国外同类工具相比，CodeBuddy 凭借其本土化优势、对国内云服务的深度整合以及对国内开发场景的针对性优化，展现出了独特的竞争力，有望成为国内开发者心目中 “中国人自己的 Cursor”。</p><p>就目前的表现而言，腾讯云代码助手CodeBuddy工具已经有了国产Cursor的媲美的功能。从代码质量来看，其生成的代码质量尚可，预设功能也基本能够实现，对于新手开发者而言，若想借助AI工具完成工程项目，从零开始直接使用AI的最佳选择。</p><p>展望未来，随着人工智能技术的不断发展和 CodeBuddy 的持续迭代升级，相信它将在更多的开发场景中发挥重要作用，程序员小伙伴你们颤抖了吗？</p>`,119)]))}const r=n(l,[["render",p]]),v=JSON.parse('{"path":"/article/8kl568qn/","title":"8.中国人自己的Cursor？腾讯CodeBuddy让人人都能成为程序员","lang":"en-US","frontmatter":{"title":"8.中国人自己的Cursor？腾讯CodeBuddy让人人都能成为程序员","createTime":"2025/05/27 17:51:17","permalink":"/article/8kl568qn/"},"git":{"createdTime":1749111496000,"updatedTime":1750129445000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":2,"url":"https://github.com/star"}]},"readingTime":{"minutes":10.73,"words":3220},"filePathRelative":"cloud/tengxun2025/8.中国人自己的Cursor？腾讯CodeBuddy让人人都能成为程序员.md"}');export{r as comp,v as data};
