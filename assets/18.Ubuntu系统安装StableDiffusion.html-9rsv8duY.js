import{_ as n,c as a,b as e,o as i}from"./app-BEL8OELx.js";const l={};function d(p,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="ubuntu系统安装开源绘图工具stable-diffusion" tabindex="-1"><a class="header-anchor" href="#ubuntu系统安装开源绘图工具stable-diffusion"><span>Ubuntu系统安装开源绘图工具Stable Diffusion</span></a></h1><h1 id="系统环境" tabindex="-1"><a class="header-anchor" href="#系统环境"><span>系统环境</span></a></h1><p>操作系统：Ubuntu 22.04.2 LTS</p><p>Ubuntu 22.04.4 LTS</p><p>CPU: i5-10400F</p><p>内存：32G</p><p>硬盘： 512G SSD</p><p>显卡： NVIDIA GeForce GTX 1060 6GB</p><p>内网IP: 192.168.1.21</p><h1 id="docker安装" tabindex="-1"><a class="header-anchor" href="#docker安装"><span>Docker安装</span></a></h1><h2 id="安装docker" tabindex="-1"><a class="header-anchor" href="#安装docker"><span>安装docker</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">curl -sSL https://get.docker.com/ | sh</span>
<span class="line"></span>
<span class="line">systemctl start docker</span>
<span class="line"></span>
<span class="line">systemctl enable docker.service</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="基于docker安装diffusion-webui-安装失败" tabindex="-1"><a class="header-anchor" href="#基于docker安装diffusion-webui-安装失败"><span>基于Docker安装Diffusion Webui（安装失败）</span></a></h1><p>参考： https://hub.docker.com/r/siutin/stable-diffusion-webui-docker</p><h2 id="run-with-cuda" tabindex="-1"><a class="header-anchor" href="#run-with-cuda"><span>Run with CUDA</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">拉取镜像：</span>
<span class="line"></span>
<span class="line"># docker pull siutin/stable-diffusion-webui-docker</span>
<span class="line"></span>
<span class="line">创建目录：</span>
<span class="line"># mkdir /root/stable-diffusion</span>
<span class="line"></span>
<span class="line"># docker run -itd --name sdw --gpus all --network host   -v /root/stable-diffusion/models:/app/stable-diffusion-webui/models   -v /root/stable-diffusion/outputs:/app/stable-diffusion-webui/outputs   --rm siutin/stable-diffusion-webui-docker:latest-cuda   bash webui.sh --share</span>
<span class="line"> </span>
<span class="line"> </span>
<span class="line">输出消息： </span>
<span class="line">Stable diffusion model failed to load</span>
<span class="line">Applying attention optimization: Doggettx... done.</span>
<span class="line">Running on local URL:  http://127.0.0.1:7860</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模型下载失败报错" tabindex="-1"><a class="header-anchor" href="#模型下载失败报错"><span>模型下载失败报错：</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">Stable diffusion model failed to load</span>
<span class="line">Applying attention optimization: Doggettx... done.</span>
<span class="line">Running on local URL:  http://127.0.0.1:7860</span>
<span class="line"></span>
<span class="line">Could not create share link. Missing file: /app/stable-diffusion-webui/venv/lib/python3.10/site-packages/gradio/frpc_linux_amd64_v0.2. </span>
<span class="line"></span>
<span class="line">Please check your internet connection. This can happen if your antivirus software blocks the download of this file. You can install manually by following these steps: </span>
<span class="line"></span>
<span class="line">1. Download this file: https://cdn-media.huggingface.co/frpc-gradio-0.2/frpc_linux_amd64</span>
<span class="line">2. Rename the downloaded file to: frpc_linux_amd64_v0.2</span>
<span class="line">3. Move the file to this location: /app/stable-diffusion-webui/venv/lib/python3.10/site-packages/gradio</span>
<span class="line">Startup time: 279.3s (prepare environment: 1.7s, import torch: 3.1s, import gradio: 0.7s, setup paths: 0.8s, initialize shared: 0.1s, other imports: 0.5s, list SD models: 135.2s, load scripts: 0.4s, create ui: 0.5s, gradio launch: 136.3s).</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于网络问题，模型下载失败。</p><p>查看镜像</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># docker ps</span>
<span class="line">CONTAINER ID   IMAGE                                                      COMMAND                   CREATED         STATUS         PORTS                                       NAMES</span>
<span class="line">12f384716f6d   siutin/stable-diffusion-webui-docker:latest-cuda           &quot;/opt/nvidia/nvidia_…&quot;   4 minutes ago   Up 4 minutes                                               sdw</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用浏览器访问：IP+端口，http://127.0.0.1:7860</p><p><img src="https://imgoss.xgss.net/picgo/image-20240522160449325.png?aliyun" alt="image-20240522160449325"></p><h1 id="普通安装-stable-diffusion-安装失败" tabindex="-1"><a class="header-anchor" href="#普通安装-stable-diffusion-安装失败"><span>普通安装 Stable Diffusion（安装失败）</span></a></h1><p>如果通过docker安装成功之后，这步可以不用操作。</p><h2 id="一、建立安装空间和python虚拟环境" tabindex="-1"><a class="header-anchor" href="#一、建立安装空间和python虚拟环境"><span>一、建立安装空间和python虚拟环境</span></a></h2><p>在硬盘上建立一个AiSpace的文件夹，未来所有的安装和配置都在这个文件夹下进行。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ sudo -i</span>
<span class="line">在root用户下操作</span>
<span class="line"># mkdir StableDiffusion</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在StableDiffusion文件里建立虚拟环境。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">cd   StableDiffusion</span>
<span class="line">apt install python3.10-venv</span>
<span class="line">python3.10 -m venv .</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进入到Python虚拟环境</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">source bin/activate</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="二、在python虚拟环境下-进行stable-diffusion的基础安装" tabindex="-1"><a class="header-anchor" href="#二、在python虚拟环境下-进行stable-diffusion的基础安装"><span>二、在Python虚拟环境下，进行Stable Diffusion的基础安装</span></a></h2><p>在StableDiffusion目录下，clone到Stable Diffusion文件。直接stable-diffusion-webui，省点事儿。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>进入到stable-diffusion-webui，安装运行需要的包。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">cd stable-diffusion-webui</span>
<span class="line"></span>
<span class="line">修改pip源为阿里:</span>
<span class="line">step1 设置pip的全局安装源为阿里云镜像</span>
<span class="line">pip config set global.index-url https://mirrors.aliyun.com/pypi/simple</span>
<span class="line">step2 设置pip安装时信任的主机地址</span>
<span class="line">pip config set install.trusted-host mirrors.aliyun.com</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">升级pip：</span>
<span class="line">python3 -m pip install --upgrade pip </span>
<span class="line"></span>
<span class="line">pip3 install -r requirements_versions.txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>小提示：</p><p>1、pip一开始用的清华的源，不知道为什么有一些包找不到或者不兼容，很费解。换成阿里的就好用了。</p><p>2、basicsr安装的及其费尽，耗时特别长，没找到什么好的解决办法。</p><p>3、如果cache里面有了以前的包，如果没什么其他项目的关联，可以考虑先删除干净。目录是～/.cacha/pip</p><h2 id="三、启动stable-diffusion" tabindex="-1"><a class="header-anchor" href="#三、启动stable-diffusion"><span>三、启动Stable Diffusion</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">python launch.py</span>
<span class="line"></span>
<span class="line">运行的时候，还会安装很多的包。一定要保证github的访问畅通。如果连接断开了，就再次执行命令，直到运行成功</span>
<span class="line"></span>
<span class="line">Running on local URL:  http://127.0.0.1:7860</span>
<span class="line"></span>
<span class="line">To create a public link, set \`share=True\` in \`launch()\`.</span>
<span class="line">Startup time: 227.0s (prepare environment: 85.5s, import torch: 3.6s, import gradio: 0.6s, setup paths: 0.7s, initialize shared: 0.1s, other imports: 0.6s, list SD models: 135.0s, load scripts: 0.3s, create ui: 0.4s, add APIs: 0.1s).</span>
<span class="line"></span>
<span class="line">有报错：no module &#39;xformers&#39;. Processing without</span>
<span class="line"></span>
<span class="line">pip3 install transformers</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">后台运行，并且把错误日志输出到文件中：</span>
<span class="line">source /home/star/StableDiffusion/bin/activate</span>
<span class="line">nohup python launch.py &gt;/dev/null 2&gt; stable-diffusion-webui.log &amp;</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在浏览器中输入IP+7860 端口访问 Stable Diffusion</p><p><img src="https://imgoss.xgss.net/picgo/image-20240521182607668.png?aliyun" alt="image-20240521182607668"></p><h1 id="利用anaconda进行安装-安装失败" tabindex="-1"><a class="header-anchor" href="#利用anaconda进行安装-安装失败"><span>利用Anaconda进行安装（安装失败）</span></a></h1><h2 id="_1-下载安装包" tabindex="-1"><a class="header-anchor" href="#_1-下载安装包"><span>1.下载安装包</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">mkdir sd</span>
<span class="line">cd sd</span>
<span class="line">wget http://repo.continuum.io/archive/Anaconda3-5.3.1-Linux-x86_64.sh</span>
<span class="line"></span>
<span class="line">wget https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/Anaconda3-5.3.1-Linux-x86_64.sh</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了上面的下载方式，也可到<a href="https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/" target="_blank" rel="noopener noreferrer">清华软件镜像站</a>直接下载安装包，并上传到主机上</p><h2 id="_2-安装anaconda" tabindex="-1"><a class="header-anchor" href="#_2-安装anaconda"><span>2.安装Anaconda</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">bash Anaconda3-5.3.1-Linux-x86_64.sh </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20240529170446192.png?aliyun" alt="image-20240529170446192"></p><h2 id="_3-安装完成" tabindex="-1"><a class="header-anchor" href="#_3-安装完成"><span>3.安装完成</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ conda info</span>
<span class="line">     active environment : base</span>
<span class="line">    active env location : /home/star/anaconda3</span>
<span class="line">            shell level : 1</span>
<span class="line">       user config file : /home/star/.condarc</span>
<span class="line"> populated config files : </span>
<span class="line">          conda version : 4.5.11</span>
<span class="line">    conda-build version : 3.15.1</span>
<span class="line">         python version : 3.7.0.final.0</span>
<span class="line">       base environment : /home/star/anaconda3  (writable)</span>
<span class="line">           channel URLs : https://repo.anaconda.com/pkgs/main/linux-64</span>
<span class="line">                          https://repo.anaconda.com/pkgs/main/noarch</span>
<span class="line">                          https://repo.anaconda.com/pkgs/free/linux-64</span>
<span class="line">                          https://repo.anaconda.com/pkgs/free/noarch</span>
<span class="line">                          https://repo.anaconda.com/pkgs/r/linux-64</span>
<span class="line">                          https://repo.anaconda.com/pkgs/r/noarch</span>
<span class="line">                          https://repo.anaconda.com/pkgs/pro/linux-64</span>
<span class="line">                          https://repo.anaconda.com/pkgs/pro/noarch</span>
<span class="line">          package cache : /home/star/anaconda3/pkgs</span>
<span class="line">                          /home/star/.conda/pkgs</span>
<span class="line">       envs directories : /home/star/anaconda3/envs</span>
<span class="line">                          /home/star/.conda/envs</span>
<span class="line">               platform : linux-64</span>
<span class="line">             user-agent : conda/4.5.11 requests/2.19.1 CPython/3.7.0 Linux/6.5.0-35-generic ubuntu/22.04 glibc/2.35</span>
<span class="line">                UID:GID : 1000:1000</span>
<span class="line">             netrc file : None</span>
<span class="line">           offline mode : False</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-anaconda简单使用" tabindex="-1"><a class="header-anchor" href="#_4-anaconda简单使用"><span>4.Anaconda简单使用</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line">1、创建环境：conda create -n &lt;env_name&gt; &lt;packages&gt;</span>
<span class="line">例如：conda create -n python3.10.9 python==3.10.9</span>
<span class="line"></span>
<span class="line">2、激活环境：conda activate &lt;env_name&gt;</span>
<span class="line"></span>
<span class="line">3、退出环境：conda deactivate &lt;env_name&gt;</span>
<span class="line"></span>
<span class="line">4、查看已安装的环境信息：conda env list</span>
<span class="line"></span>
<span class="line">5、复制环境：conda create -n &lt;new_env_name&gt; --clone &lt;origin_env_name&gt;</span>
<span class="line"></span>
<span class="line">6、删除环境：conda env remove -n &lt;env_name&gt;</span>
<span class="line"></span>
<span class="line">7、保存环境信息到environment.yaml文件中：conda env export &gt; environment.yaml</span>
<span class="line"></span>
<span class="line">8、通过environment.yaml环境文件创建文件： conda env create -f environment.yaml</span>
<span class="line"></span>
<span class="line">9、查看已安装的包：conda list</span>
<span class="line"></span>
<span class="line">10、搜索包：conda search &lt;package_name1&gt;</span>
<span class="line"></span>
<span class="line">11、安装包：conda install &lt;package_name1&gt; &lt;package_name2&gt;</span>
<span class="line"></span>
<span class="line">12、卸载包：conda remove &lt;package_name&gt;</span>
<span class="line"></span>
<span class="line">5).虚拟环境创建好之后建议：升级 pip 到最新的版本 (&gt;=10.0.0) 后进行配置：</span>
<span class="line"></span>
<span class="line">python -m pip install --upgrade pip</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-克隆-stable-diffusion-webui-项目" tabindex="-1"><a class="header-anchor" href="#_5-克隆-stable-diffusion-webui-项目"><span>5.克隆 stable-diffusion-webui 项目</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="激活你的python3-10的虚拟环境" tabindex="-1"><a class="header-anchor" href="#激活你的python3-10的虚拟环境"><span>激活你的python3.10的虚拟环境</span></a></h1><h2 id="_1-安装pytorch" tabindex="-1"><a class="header-anchor" href="#_1-安装pytorch"><span>1.安装pytorch</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ nvcc --version</span>
<span class="line">nvcc: NVIDIA (R) Cuda compiler driver</span>
<span class="line">Copyright (c) 2005-2021 NVIDIA Corporation</span>
<span class="line">Built on Thu_Nov_18_09:45:30_PST_2021</span>
<span class="line">Cuda compilation tools, release 11.5, V11.5.119</span>
<span class="line">Build cuda_11.5.r11.5/compiler.30672275_0</span>
<span class="line"></span>
<span class="line">具体需要根据你们自己的cuda version版本去对应下载</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">阿里云的命令，因为cuda version是10.2</span>
<span class="line">pip install torch==1.11.0+cu102 torchvision==0.12.0+cu102 --extra-index-url https://download.pytorch.org/whl/cu116</span>
<span class="line"></span>
<span class="line">华为云上的命令，cuda version是11.2</span>
<span class="line">pip install torch==1.12.1+cu116 torchvision==0.13.1+cu116 --extra-index-url https://download.pytorch.org/whl/cu116</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-安装webui依赖" tabindex="-1"><a class="header-anchor" href="#_2-安装webui依赖"><span>2.安装webui依赖</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line">cd stable-diffusion-webui</span>
<span class="line"></span>
<span class="line">先执行：</span>
<span class="line">pip install -r requirements_versions.txt</span>
<span class="line">再执行：</span>
<span class="line">pip install -r requirements.txt</span>
<span class="line"></span>
<span class="line">这边有可能有一些小坑需要注意:如果有一些包安装不上，你可以自己pip install 对应包，还有就是我在华为云上安装的时候，一开始一直有问题，发现是因为华为云pip直接调用的是https://repo.huaweicloud.com/repository/pypi/simple，导致很多包装不上，这边你可以切换到清华源上https://pypi.tuna.tsinghua.edu.cn/simple/。</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="更换中文" tabindex="-1"><a class="header-anchor" href="#更换中文"><span>更换中文</span></a></h1><p>选择Extensions菜单 ---&gt; 选择Available ---&gt;Extension index URL使用默认的地址就可以</p><p>将ads，localization，installed勾选掉</p><p>点击 Load from</p><p><img src="https://imgoss.xgss.net/picgo/image-20240521183027534.png?aliyun" alt="image-20240521183027534"></p><p>在列表里面找到“Zh_CN Localization”，点击Install</p><p><img src="https://imgoss.xgss.net/picgo/image-20240521183152776.png?aliyun" alt="image-20240521183152776"></p><p>选择Settings→User interface，下拉找到Localization栏，选择zh_CN</p><p>点击保存设置，并重启</p><p><img src="https://imgoss.xgss.net/picgo/d18b6c7d0b2946b3abb7eec96e63d7a6.png?aliyun" alt="img"></p><p>更换中文成功</p><p><img src="https://imgoss.xgss.net/picgo/image-20240522110859139.png?aliyun" alt="image-20240522110859139"></p><h1 id="下载模型" tabindex="-1"><a class="header-anchor" href="#下载模型"><span>下载模型</span></a></h1><p>由于我的系统是国内网络，下载模型会很慢，报错。在其他电脑（有科学上网）上浏览器输入 https://huggingface.co/runwayml/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.safetensors 这个地址下载，在上传到 stable-diffusion-webui 目录中。</p><p>或者用国内的网站下载</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">启动Stable Diffusion时会</span>
<span class="line"></span>
<span class="line">Downloading: &quot;https://huggingface.co/runwayml/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.safetensors&quot; to /home/star/StableDiffusion/stable-diffusion-webui/models/Stable-diffusion/v1-5-pruned-emaonly.safetensors</span>
<span class="line">Stable diffusion model failed to load</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20240522094645052.png?aliyun" alt="image-20240522094645052"></p><p>这时：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># ll /home/star/StableDiffusion/stable-diffusion-webui/models/Stable-diffusion/v1-5-pruned-emaonly.safetensors</span>
<span class="line">-rw-r--r-- 1 root root 4265146304  5月 22 10:04 /home/star/StableDiffusion/stable-diffusion-webui/models/Stable-diffusion/v1-5-pruned-emaonly.safetensors</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="国内下载模型" tabindex="-1"><a class="header-anchor" href="#国内下载模型"><span>国内下载模型</span></a></h2><p>由于huggingface连不上，所以需要使用huggingface的镜像地址来下载。考虑到下载过程比较慢，所以考虑先下载到本地再使用。</p><p>模型文件：v1-5-pruned-emaonly.ckpt，v1-5-pruned-emaonly.safetensors</p><p>模型下载地址：<a href="https://aliendao.cn/models/runwayml/stable-diffusion-v1-5#/" target="_blank" rel="noopener noreferrer">互链高科</a> https://aliendao.cn/models/runwayml/stable-diffusion-v1-5#/</p><p>把模型下载到\\models\\Stable-diffusion目录中</p><p>在项目的目录下，创建.cache/huggingface/openai/clip-vit-large-patch14文件夹，然后下载参数文件放在里面</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">cd /home/star/StableDiffusion/stable-diffusion-webui</span>
<span class="line">mkdir -p .cache/huggingface/openai/clip-vit-large-patch14</span>
<span class="line">cd .cache/huggingface/openai/clip-vit-large-patch14</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数文件：vocab.json，tokenizer_config.json，special_tokens_map.json，merges.txt，config.json</p><p>参数文件下载地址：<a href="https://aliendao.cn/models/openai/clip-vit-large-patch14#/" target="_blank" rel="noopener noreferrer">互链高科</a> https://aliendao.cn/models/openai/clip-vit-large-patch14#/</p><p><img src="https://imgoss.xgss.net/picgo/image-20240522112805799.png?aliyun" alt="image-20240522112805799"></p><h2 id="修改项目代码" tabindex="-1"><a class="header-anchor" href="#修改项目代码"><span>修改项目代码</span></a></h2><p>文件：repositories/stable-diffusion-stability-ai/ldm/modules/encoders/modules.py</p><p>第100行的__init__方法中，version是openai/clip-vit-large-patch14，把这个值改为自己的保存参数文件的目录</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">vim repositories/stable-diffusion-stability-ai/ldm/modules/encoders/modules.py</span>
<span class="line"></span>
<span class="line">把 def __init__(self, version=&quot;openai/clip-vit-large-patch14&quot;, device=&quot;cuda&quot;, max_length=77,</span>
<span class="line"></span>
<span class="line">改成你自己的地址：</span>
<span class="line"></span>
<span class="line">def __init__(self, version=&quot;/home/star/StableDiffusion/stable-diffusion-webui/.cache/huggingface/openai/clip-vit-large-patch14&quot;, device=&quot;cuda&quot;, max_length=77,</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20240522133648589.png?aliyun" alt="image-20240522133648589"></p>`,97)]))}const t=n(l,[["render",d]]),r=JSON.parse('{"path":"/chatgpt/18.Ubuntu%E7%B3%BB%E7%BB%9F%E5%AE%89%E8%A3%85StableDiffusion.html","title":"Ubuntu系统安装开源绘图工具Stable Diffusion","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"chatgpt/18.Ubuntu系统安装StableDiffusion.md"}');export{t as comp,r as data};
