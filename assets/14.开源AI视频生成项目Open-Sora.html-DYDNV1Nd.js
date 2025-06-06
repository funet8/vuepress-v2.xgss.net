import{_ as n,c as e,b as a,o as i}from"./app-BEL8OELx.js";const l={};function p(t,s){return i(),e("div",null,s[0]||(s[0]=[a(`<h1 id="开源ai视频生成项目open-sora-安装失败" tabindex="-1"><a class="header-anchor" href="#开源ai视频生成项目open-sora-安装失败"><span>开源AI视频生成项目Open-Sora(安装失败)</span></a></h1><h2 id="什么是open-sora" tabindex="-1"><a class="header-anchor" href="#什么是open-sora"><span>什么是Open-Sora</span></a></h2><p>首先， 此 Open-Sora 并非 Open AI 发布的 Sora 开源版。</p><p>Open-Sora项目是一项致力于高效制作高质量视频，并使所有人都能使用其模型、工具和内容的计划。 通过采用开源原则，Open-Sora 不仅实现了先进视频生成技术的低成本普及，还提供了一个精简且用户友好的方案，简化了视频制作的复杂性。 通过 Open-Sora，我们希望更多开发者一起探索内容创作领域的创新、创造和包容。</p><p>开源地址： https://github.com/hpcaitech/Open-Sora</p><p>更多：https://hpcaitech.github.io/Open-Sora/</p><h1 id="docker安装open-sora" tabindex="-1"><a class="header-anchor" href="#docker安装open-sora"><span>docker安装Open-Sora</span></a></h1><p>https://github.com/hpcaitech/Open-Sora/blob/main/docs/zh_CN/README.md#%E4%BD%BF%E7%94%A8docker%E9%95%9C%E5%83%8F</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">git clone https://github.com/hpcaitech/Open-Sora.git</span>
<span class="line"></span>
<span class="line">cd Open-Sora</span>
<span class="line"></span>
<span class="line">docker build -t opensora ./docker</span>
<span class="line"></span>
<span class="line">docker run -ti --gpus all -v {MOUNT_DIR}:/data opensora</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="windows系统下部署" tabindex="-1"><a class="header-anchor" href="#windows系统下部署"><span>windows系统下部署</span></a></h2><p>虽然Open-Sora目前的效果和Sora还有一些差距，生成视频的效果和长度都还有很大改善空间，但是优点在于完全开源，灵活性更高，而且是目前唯一能用上的模型。所以这篇文章就来介绍如何在单机上部署Open-Sora并进行文生视频推理。之后的文章会介绍如何将Open-Sora部署为可支持多人在线调用的API服务。</p><p>（Open-Sora一共需要下载20多个G的模型）、数据盘可以单独保存使得我们不用每次部署都重新下载模型。 虽然Open-Sora目前的效果和Sora还有一些差距，生成视频的效果和长度都还有很大改善空间，但是优点在于完全开源，灵活性更高，而且是目前唯一能用上的模型。所以这篇文章就来介绍如何在单机上部署Open-Sora并进行文生视频推理。之后的文章会介绍如何将Open-Sora部署为可支持多人在线调用的API服务。</p><p>（Open-Sora一共需要下载20多个G的模型）、数据盘可以单独保存使得我们不用每次部署都重新下载模型。</p><h2 id="系统介绍" tabindex="-1"><a class="header-anchor" href="#系统介绍"><span>系统介绍</span></a></h2><p>https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/ 选择： https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/Miniconda3-py310_24.1.2-0-Windows-x86_64.exe</p><h2 id="安装-conda" tabindex="-1"><a class="header-anchor" href="#安装-conda"><span>安装 conda</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/image-20240325182500554.png?aliyun" alt="image-20240325182500554"></p><p><img src="https://imgoss.xgss.net/picgo/image-20240325182542331.png?aliyun" alt="image-20240325182542331"></p><p>安装完成</p><p><img src="https://imgoss.xgss.net/picgo/image-20240325182739624.png?aliyun" alt="image-20240325182739624"></p><p>在github中下载open-sora，并且解压到D盘</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">cd D:\\Open-Sora</span>
<span class="line"># create a virtual env</span>
<span class="line">conda create -n opensora python=3.10</span>
<span class="line"># activate virtual environment</span>
<span class="line">conda activate opensora</span>
<span class="line"></span>
<span class="line"># install torch</span>
<span class="line"># the command below is for CUDA 12.1, choose install commands from </span>
<span class="line"># https://pytorch.org/get-started/locally/ based on your own CUDA version</span>
<span class="line">pip install torch torchvision</span>
<span class="line"></span>
<span class="line"># install flash attention (optional)</span>
<span class="line">pip install packaging ninja</span>
<span class="line">pip install flash-attn --no-build-isolation</span>
<span class="line"></span>
<span class="line"># install apex (optional)</span>
<span class="line">pip install -v --disable-pip-version-check --no-cache-dir --no-build-isolation --config-settings &quot;--build-option=--cpp_ext&quot; --config-settings &quot;--build-option=--cuda_ext&quot; git+https://github.com/NVIDIA/apex.git</span>
<span class="line"></span>
<span class="line"># install xformers</span>
<span class="line">pip install -U xformers --index-url https://download.pytorch.org/whl/cu121</span>
<span class="line"></span>
<span class="line"># install this project</span>
<span class="line">git clone https://github.com/hpcaitech/Open-Sora</span>
<span class="line">cd Open-Sora</span>
<span class="line">pip install -v .</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20240325183424398.png?aliyun" alt="image-20240325183424398"></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">pip3 install torch torchvision</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20240325183957110.png?aliyun" alt="image-20240325183957110"></p><p><img src="https://imgoss.xgss.net/picgo/image-20240325234546751.png?aliyun" alt="image-20240325234546751"></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">pip install packaging ninja</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20240325234718324.png?aliyun" alt="image-20240325234718324"></p><h2 id="报错" tabindex="-1"><a class="header-anchor" href="#报错"><span>报错</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">(base) PS D:\\Open-Sora&gt; pip install flash-attn --no-build-isolation</span>
<span class="line">Defaulting to user installation because normal site-packages is not writeable</span>
<span class="line">Collecting flash-attn</span>
<span class="line">  Using cached flash_attn-2.5.6.tar.gz (2.5 MB)</span>
<span class="line">  Preparing metadata (setup.py) ... error</span>
<span class="line">  error: subprocess-exited-with-error</span>
<span class="line"></span>
<span class="line">  × python setup.py egg_info did not run successfully.</span>
<span class="line">  │ exit code: 1</span>
<span class="line">  ╰─&gt; [12 lines of output]</span>
<span class="line">      Traceback (most recent call last):</span>
<span class="line">        File &quot;&lt;string&gt;&quot;, line 2, in &lt;module&gt;</span>
<span class="line">        File &quot;&lt;pip-setuptools-caller&gt;&quot;, line 34, in &lt;module&gt;</span>
<span class="line">        File &quot;C:\\Users\\CQ-0458\\AppData\\Local\\Temp\\pip-install-i8w0sfb9\\flash-attn_d29c3c58d07e46e78480f660ddbd0204\\setup.py&quot;, line 94, in &lt;module&gt;</span>
<span class="line">          subprocess.run([&quot;git&quot;, &quot;submodule&quot;, &quot;update&quot;, &quot;--init&quot;, &quot;csrc/cutlass&quot;])</span>
<span class="line">        File &quot;d:\\miniconda3\\lib\\subprocess.py&quot;, line 503, in run</span>
<span class="line">          with Popen(*popenargs, **kwargs) as process:</span>
<span class="line">        File &quot;d:\\miniconda3\\lib\\subprocess.py&quot;, line 971, in __init__</span>
<span class="line">          self._execute_child(args, executable, preexec_fn, close_fds,</span>
<span class="line">        File &quot;d:\\miniconda3\\lib\\subprocess.py&quot;, line 1456, in _execute_child</span>
<span class="line">          hp, ht, pid, tid = _winapi.CreateProcess(executable, args,</span>
<span class="line">      FileNotFoundError: [WinError 2] 系统找不到指定的文件。</span>
<span class="line">      [end of output]</span>
<span class="line"></span>
<span class="line">  note: This error originates from a subprocess, and is likely not a problem with pip.</span>
<span class="line">error: metadata-generation-failed</span>
<span class="line"></span>
<span class="line">× Encountered error while generating package metadata.</span>
<span class="line">╰─&gt; See above for output.</span>
<span class="line"></span>
<span class="line">note: This is an issue with the package mentioned above, not pip.</span>
<span class="line">hint: See above for details.</span>
<span class="line">(base) PS D:\\Open-Sora&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用管理员身份运行报错：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">(base) PS D:\\Open-Sora&gt; pip install flash-attn --no-build-isolation</span>
<span class="line">Collecting flash-attn</span>
<span class="line">  Using cached flash_attn-2.5.6.tar.gz (2.5 MB)</span>
<span class="line">  Preparing metadata (setup.py) ... error</span>
<span class="line">  error: subprocess-exited-with-error</span>
<span class="line"></span>
<span class="line">  × python setup.py egg_info did not run successfully.</span>
<span class="line">  │ exit code: 1</span>
<span class="line">  ╰─&gt; [12 lines of output]</span>
<span class="line">      Traceback (most recent call last):</span>
<span class="line">        File &quot;&lt;string&gt;&quot;, line 2, in &lt;module&gt;</span>
<span class="line">        File &quot;&lt;pip-setuptools-caller&gt;&quot;, line 34, in &lt;module&gt;</span>
<span class="line">        File &quot;C:\\Users\\CQ-0458\\AppData\\Local\\Temp\\pip-install-rfvh6i9s\\flash-attn_a898fba1b1cc4d2f848548537f6cf939\\setup.py&quot;, line 94, in &lt;module&gt;</span>
<span class="line">          subprocess.run([&quot;git&quot;, &quot;submodule&quot;, &quot;update&quot;, &quot;--init&quot;, &quot;csrc/cutlass&quot;])</span>
<span class="line">        File &quot;d:\\miniconda3\\lib\\subprocess.py&quot;, line 503, in run</span>
<span class="line">          with Popen(*popenargs, **kwargs) as process:</span>
<span class="line">        File &quot;d:\\miniconda3\\lib\\subprocess.py&quot;, line 971, in __init__</span>
<span class="line">          self._execute_child(args, executable, preexec_fn, close_fds,</span>
<span class="line">        File &quot;d:\\miniconda3\\lib\\subprocess.py&quot;, line 1456, in _execute_child</span>
<span class="line">          hp, ht, pid, tid = _winapi.CreateProcess(executable, args,</span>
<span class="line">      FileNotFoundError: [WinError 2] 系统找不到指定的文件。</span>
<span class="line">      [end of output]</span>
<span class="line"></span>
<span class="line">  note: This error originates from a subprocess, and is likely not a problem with pip.</span>
<span class="line">error: metadata-generation-faile</span>
<span class="line">× Encountered error while generating package metadata.</span>
<span class="line">╰─&gt; See above for output.</span>
<span class="line"></span>
<span class="line">note: This is an issue with the package mentioned above, not pip.</span>
<span class="line">hint: See above for details.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">python.exe -m pip install --upgrade pip</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20240329105754893.png?aliyun" alt="image-20240329105754893"></p><p>继续报错：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">(base) PS D:\\Open-Sora&gt; pip install flash-attn --no-build-isolation</span>
<span class="line">Collecting flash-attn</span>
<span class="line">  Downloading flash_attn-2.5.6.tar.gz (2.5 MB)</span>
<span class="line">     ---------------------------------------- 2.5/2.5 MB 21.9 kB/s eta 0:00:00</span>
<span class="line">  Preparing metadata (setup.py) ... error</span>
<span class="line">  error: subprocess-exited-with-error</span>
<span class="line"></span>
<span class="line">  × python setup.py egg_info did not run successfully.</span>
<span class="line">  │ exit code: 1</span>
<span class="line">  ╰─&gt; [12 lines of output]</span>
<span class="line">      Traceback (most recent call last):</span>
<span class="line">        File &quot;&lt;string&gt;&quot;, line 2, in &lt;module&gt;</span>
<span class="line">        File &quot;&lt;pip-setuptools-caller&gt;&quot;, line 34, in &lt;module&gt;</span>
<span class="line">        File &quot;C:\\Users\\CQ-0458\\AppData\\Local\\Temp\\pip-install-451jzjm3\\flash-attn_ee57d2253106408dbfafd10a79667fe4\\setup.py&quot;, line 94, in &lt;module&gt;</span>
<span class="line">          subprocess.run([&quot;git&quot;, &quot;submodule&quot;, &quot;update&quot;, &quot;--init&quot;, &quot;csrc/cutlass&quot;])</span>
<span class="line">        File &quot;d:\\miniconda3\\lib\\subprocess.py&quot;, line 503, in run</span>
<span class="line">          with Popen(*popenargs, **kwargs) as process:</span>
<span class="line">        File &quot;d:\\miniconda3\\lib\\subprocess.py&quot;, line 971, in __init__</span>
<span class="line">          self._execute_child(args, executable, preexec_fn, close_fds,</span>
<span class="line">        File &quot;d:\\miniconda3\\lib\\subprocess.py&quot;, line 1456, in _execute_child</span>
<span class="line">          hp, ht, pid, tid = _winapi.CreateProcess(executable, args,</span>
<span class="line">      FileNotFoundError: [WinError 2] 系统找不到指定的文件。</span>
<span class="line">      [end of output]</span>
<span class="line"></span>
<span class="line">  note: This error originates from a subprocess, and is likely not a problem with pip.</span>
<span class="line">error: metadata-generation-failed</span>
<span class="line"></span>
<span class="line">× Encountered error while generating package metadata.</span>
<span class="line">╰─&gt; See above for output.</span>
<span class="line"></span>
<span class="line">note: This is an issue with the package mentioned above, not pip.</span>
<span class="line">hint: See above for details.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有报错无法解决，搭建失败</p>`,38)]))}const r=n(l,[["render",p]]),d=JSON.parse('{"path":"/chatgpt/14.%E5%BC%80%E6%BA%90AI%E8%A7%86%E9%A2%91%E7%94%9F%E6%88%90%E9%A1%B9%E7%9B%AEOpen-Sora.html","title":"开源AI视频生成项目Open-Sora(安装失败)","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"chatgpt/14.开源AI视频生成项目Open-Sora.md"}');export{r as comp,d as data};
