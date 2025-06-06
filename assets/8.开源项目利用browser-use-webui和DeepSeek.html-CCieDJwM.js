import{_ as e,c as n,b as a,o as i}from"./app-BEL8OELx.js";const l={};function p(r,s){return i(),n("div",null,s[0]||(s[0]=[a(`<h1 id="开源项目利用browser-use-webui和deepseek把浏览器打造成一个ai-agent智能体" tabindex="-1"><a class="header-anchor" href="#开源项目利用browser-use-webui和deepseek把浏览器打造成一个ai-agent智能体"><span>开源项目利用browser-use-webui和DeepSeek把浏览器打造成一个AI Agent智能体!</span></a></h1><p>大家好，我是星哥，之前介绍了几款开源的AI Agent的项目，比如 OpenManus、autoMate 今天继续给大家带来一个开源AI Agent的项目。</p><h1 id="browser-use和browser-use-webui" tabindex="-1"><a class="header-anchor" href="#browser-use和browser-use-webui"><span>browser-use和browser-use-webui</span></a></h1><p><img src="https://imgoss.xgss.net/picgo/image-20250327180743081.png?aliyun" alt="image-20250327180743081"></p><h2 id="browser-use" tabindex="-1"><a class="header-anchor" href="#browser-use"><span>browser-use</span></a></h2><p>简介：Make websites accessible for AI agents 开源地址： https://github.com/browser-use/browser-use</p><p>Browser-Use 是一个开源的网页自动化库，它通过提供一个简单的接口，让 LLM 能够与网站进行互动。这个库支持多标签管理、XPath 提取和视觉模型处理，使得自动化网页操作变得更加简单和高效。支持所有 LangChain 聊天模型，包括但不限于 GPT-4o、GPT-4o Mini、Claude 3.5 Sonnet 和 LLama 3.1 405B。这些模型都是当前领先的大型语言模型，能够处理各种复杂的语言相关任务。</p><h2 id="browser-use-webui" tabindex="-1"><a class="header-anchor" href="#browser-use-webui"><span>browser-use-webui</span></a></h2><p>browser-use开源地址： 简介：Run AI Agent in your browser. 开源地址：https://github.com/browser-use/web-ui</p><h2 id="browser-use-webui-主要功能" tabindex="-1"><a class="header-anchor" href="#browser-use-webui-主要功能"><span>browser-use-webui 主要功能</span></a></h2><p>提供了全新的网页界面，简单好用，方便操作。 支持更多大语言模型，比如 Gemini、OpenAI、Azure 等，哦，还有最近爆火的国产大模型 DeepSeek，未来还会加更多。 支持用自己的浏览器，不用再反复登录，还能录屏。 定制了更智能的 Agent，通过优化后的提示让浏览器使用更高效。</p><h1 id="安装browser-use-webui" tabindex="-1"><a class="header-anchor" href="#安装browser-use-webui"><span>安装browser-use-webui</span></a></h1><p>这个项目已在 Github 开源，想玩的都可以试试，用 Python 写的，版本必须在 3.11 以上。</p><h2 id="系统环境" tabindex="-1"><a class="header-anchor" href="#系统环境"><span>系统环境</span></a></h2><p>系统：Windows11专业版</p><p>CPU: 英特尔I7-13700KF</p><p>内存： 32G</p><p>硬盘：1T nvme SSD +4T 机械</p><p>显卡：RTX 4070 Ti</p><p>python版本：Python 3.13.2</p><h2 id="第1步-克隆项目" tabindex="-1"><a class="header-anchor" href="#第1步-克隆项目"><span>第1步：克隆项目</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">git clone https://github.com/browser-use/web-ui.git</span>
<span class="line">cd web-ui</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="第2步-设置python环境" tabindex="-1"><a class="header-anchor" href="#第2步-设置python环境"><span>第2步：设置Python环境</span></a></h2><p>我们建议使用 uv 管理Python环境。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">uv venv --python 3.11</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>我这边不使用他的建议</p><p>用Anaconda Prompt</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">(base) C:\\Users\\Administrator&gt;cd C:\\Users\\Administrator\\Desktop\\AI\\web-ui</span>
<span class="line">(base) C:\\Users\\Administrator\\Desktop\\AI\\web-ui&gt;</span>
<span class="line"></span>
<span class="line">conda create -n browser_use_webui python=3.11</span>
<span class="line">conda activate browser_use_webui</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="第3步-安装依赖" tabindex="-1"><a class="header-anchor" href="#第3步-安装依赖"><span>第3步：安装依赖</span></a></h2><p>安装 Python包</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">pip install -r requirements.txt </span>
<span class="line"></span>
<span class="line">或者：pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装浏览器插件</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">playwright install --with-deps chromium</span>
<span class="line"></span>
<span class="line">playwright install</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20250327165405905.png?aliyun" alt="image-20250327165405905"></p><h2 id="第4步-修改配置" tabindex="-1"><a class="header-anchor" href="#第4步-修改配置"><span>第4步：修改配置</span></a></h2><p>把 .env.example 文件复制一份重命名为.env，用编辑器打开.env并添加API键和其他设置</p><p>默认的配置文件：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">OPENAI_ENDPOINT=https://api.openai.com/v1</span>
<span class="line">OPENAI_API_KEY=</span>
<span class="line"></span>
<span class="line">ANTHROPIC_API_KEY=</span>
<span class="line">ANTHROPIC_ENDPOINT=https://api.anthropic.com</span>
<span class="line"></span>
<span class="line">GOOGLE_API_KEY=</span>
<span class="line"></span>
<span class="line">AZURE_OPENAI_ENDPOINT=</span>
<span class="line">AZURE_OPENAI_API_KEY=</span>
<span class="line">AZURE_OPENAI_API_VERSION=2025-01-01-preview</span>
<span class="line"></span>
<span class="line">DEEPSEEK_ENDPOINT=https://api.deepseek.com</span>
<span class="line">DEEPSEEK_API_KEY=</span>
<span class="line"></span>
<span class="line">MISTRAL_API_KEY=</span>
<span class="line">MISTRAL_ENDPOINT=https://api.mistral.ai/v1</span>
<span class="line"></span>
<span class="line">OLLAMA_ENDPOINT=http://localhost:11434</span>
<span class="line"></span>
<span class="line">ALIBABA_ENDPOINT=https://dashscope.aliyuncs.com/compatible-mode/v1</span>
<span class="line">ALIBABA_API_KEY=</span>
<span class="line"></span>
<span class="line">MOONSHOT_ENDPOINT=https://api.moonshot.cn/v1</span>
<span class="line">MOONSHOT_API_KEY=</span>
<span class="line"></span>
<span class="line"># Set to false to disable anonymized telemetry</span>
<span class="line">ANONYMIZED_TELEMETRY=false</span>
<span class="line"></span>
<span class="line"># LogLevel: Set to debug to enable verbose logging, set to result to get results only. Available: result | debug | info</span>
<span class="line">BROWSER_USE_LOGGING_LEVEL=info</span>
<span class="line"></span>
<span class="line"># Chrome settings</span>
<span class="line">CHROME_PATH=</span>
<span class="line">CHROME_USER_DATA=</span>
<span class="line">CHROME_DEBUGGING_PORT=9222</span>
<span class="line">CHROME_DEBUGGING_HOST=localhost</span>
<span class="line"># Set to true to keep browser open between AI tasks</span>
<span class="line">CHROME_PERSISTENT_SESSION=false</span>
<span class="line">CHROME_CDP=</span>
<span class="line"># Display settings</span>
<span class="line"># Format: WIDTHxHEIGHTxDEPTH</span>
<span class="line">RESOLUTION=1920x1080x24</span>
<span class="line"># Width in pixels</span>
<span class="line">RESOLUTION_WIDTH=1920</span>
<span class="line"># Height in pixels</span>
<span class="line">RESOLUTION_HEIGHT=1080</span>
<span class="line"></span>
<span class="line"># VNC settings</span>
<span class="line">VNC_PASSWORD=youvncpassword</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改的配置</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 路径 Chrome 浏览器路径（检查下自己的路径），例如</span>
<span class="line"># Mac OS &quot;/Applications/Google Chrome.app/Contents/MacOS/Google Chrome&quot;</span>
<span class="line"># Windows &quot;C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe&quot;</span>
<span class="line">CHROME_PATH=&quot;/Applications/Google Chrome.app/Contents/MacOS/Google Chrome&quot;</span>
<span class="line"></span>
<span class="line"># 浏览器的用户数据路径，例如</span>
<span class="line"># Mac OS &quot;/Users/&lt;YourUsername&gt;/Library/Application Support/Google/Chrome&quot;</span>
<span class="line"># Windows &quot;C:\\Users\\&lt;YourUsername&gt;\\AppData\\Local\\Google\\Chrome\\User Data&quot;</span>
<span class="line">CHROME_USER_DATA=&quot;/Users/&lt;YourUsername&gt;/Library/Application Support/Google/Chrome&quot;</span>
<span class="line"></span>
<span class="line"># 还有一些大模型的 API Key 也要改</span>
<span class="line">...</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我这边修改的chrome的地址，根据你电脑的环境填写。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">CHROME_PATH=&quot;C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe&quot;</span>
<span class="line">CHROME_USER_DATA=&quot;C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\User Data&quot;</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="第5步-启动运行" tabindex="-1"><a class="header-anchor" href="#第5步-启动运行"><span>第5步：启动运行</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">python webui.py --ip 127.0.0.1 --port 7788</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>浏览器访问 <code>http://127.0.0.1:7788/</code>，看到如下界面就成功了</p><p><img src="https://imgoss.xgss.net/picgo/image-20250327165725759.png?aliyun" alt="image-20250327165725759"></p><p>完成安装browser-use-webui</p><h1 id="使用docker安装browser-use-webui" tabindex="-1"><a class="header-anchor" href="#使用docker安装browser-use-webui"><span>使用docker安装browser-use-webui</span></a></h1><h1 id="使用browser-use-webui" tabindex="-1"><a class="header-anchor" href="#使用browser-use-webui"><span>使用browser-use-webui</span></a></h1><h2 id="_1、配置-agent" tabindex="-1"><a class="header-anchor" href="#_1、配置-agent"><span>1、配置 Agent</span></a></h2><p>注意，这里的 “Use Vision”，默认是选中状态，<strong>如果使用的 DeepSeek 不能勾选，因为 DeepSeek 不支持视觉输入</strong>，注意这里很多人踩坑，一定要注意。</p><p><img src="https://imgoss.xgss.net/picgo/image-20250327165910582.png?aliyun" alt="image-20250327165910582"></p><h2 id="_2、配置大模型" tabindex="-1"><a class="header-anchor" href="#_2、配置大模型"><span>2、配置大模型</span></a></h2><p>单击“LLM Settings”，我这边设置的硅基流动的 deepseek，你也可以用其他的</p><p>Base URL填写：https://api.siliconflow.cn/v1/chat/completions</p><p>API Key：填写自己申请到的key</p><p>model Name填写：deepseek-ai/DeepSeek-R1-Distill-Qwen-7B</p><p><img src="https://imgoss.xgss.net/picgo/image-20250327171535436.png?aliyun" alt="image-20250327171535436"></p><h2 id="_3、浏览器设置" tabindex="-1"><a class="header-anchor" href="#_3、浏览器设置"><span>3、浏览器设置</span></a></h2><p>设置一下分辨率</p><p><img src="https://imgoss.xgss.net/picgo/image-20250327171720830.png?aliyun" alt="image-20250327171720830"></p><h2 id="_4、运行" tabindex="-1"><a class="header-anchor" href="#_4、运行"><span>4、运行</span></a></h2><p>点击，<strong>run agent</strong></p><p><img src="https://imgoss.xgss.net/picgo/image-20250327171821021.png?aliyun" alt="image-20250327171821021"></p><h2 id="结果" tabindex="-1"><a class="header-anchor" href="#结果"><span>结果</span></a></h2><p>结果是[&#39;404 page not found&#39;, &#39;404 page not found&#39;, &#39;404 page not found&#39;]</p><p><img src="https://imgoss.xgss.net/picgo/image-20250327175007903.png?aliyun" alt="image-20250327175007903"></p><p><img src="https://imgoss.xgss.net/picgo/image-20250327175029033.png?aliyun" alt="image-20250327175029033"></p><h2 id="修改成openai的接口" tabindex="-1"><a class="header-anchor" href="#修改成openai的接口"><span>修改成openai的接口</span></a></h2><p>用deepseek一直没有跑通，改成ChatGPT的接口再试试</p><p><img src="https://imgoss.xgss.net/picgo/image-20250327175426926.png?aliyun" alt="image-20250327175426926"></p><p>git动画</p><p><img src="https://imgoss.xgss.net/picgo/browser-use-webui-google.agent_history.gif?aliyun" alt="browser-use-webui-google.agent_history"></p><p>用命令执行中文：</p><p>打开新浪，检索最近的10条新闻</p><p><img src="https://imgoss.xgss.net/picgo/browser-use-webui-sina.agent_history.gif?aliyun" alt="browser-use-webui-sina.agent_history"></p><h1 id="最后" tabindex="-1"><a class="header-anchor" href="#最后"><span>最后</span></a></h1><p>感兴趣的大家可以试试哦，安装browser-use-webui打造成一个AI Agent智能体。</p><p>写文不易，如果你都看到了这里，请点个赞和在看，分享给更多的朋友；也别忘了关注星哥玩云！这里有满满的干货分享，还有轻松有趣的技术交流～点个赞、分享给身边的小伙伴，一起成长，一起玩转技术世界吧！ 😊</p>`,79)]))}const d=e(l,[["render",p]]),c=JSON.parse('{"path":"/chatgpt2025/8.%E5%BC%80%E6%BA%90%E9%A1%B9%E7%9B%AE%E5%88%A9%E7%94%A8browser-use-webui%E5%92%8CDeepSeek.html","title":"开源项目利用browser-use-webui和DeepSeek把浏览器打造成一个AI Agent智能体!","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"chatgpt2025/8.开源项目利用browser-use-webui和DeepSeek.md"}');export{d as comp,c as data};
