import{_ as n,c as a,b as e,o as l}from"./app-BEL8OELx.js";const i={};function d(p,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="ubuntu系统下部署大语言模型-ollama和openwebui实现各大模型的人工智能自由" tabindex="-1"><a class="header-anchor" href="#ubuntu系统下部署大语言模型-ollama和openwebui实现各大模型的人工智能自由"><span>Ubuntu系统下部署大语言模型：Ollama和OpenWebUI实现各大模型的人工智能自由</span></a></h1><p>之前在window下安装过 Ollama和OpenWebUI搭建本地的人工智能web项目（可以看我之前写的文章），无奈电脑硬件配置太低，用qwen32b就很卡，卡出PPT了，于是又找了一台机器安装linux系统，在linux系统下测试一下速度能否可以快一些。</p><h1 id="系统硬件介绍" tabindex="-1"><a class="header-anchor" href="#系统硬件介绍"><span>系统硬件介绍</span></a></h1><p>Ubuntu 22.04.4 LTS</p><p>CPU: i5-10400F</p><p>内存：32G</p><p>硬盘： 512G SSD</p><p>显卡： NVIDIA GeForce GTX 1060 6GB</p><p>内网IP: 192.168.1.21</p><p><img src="https://imgoss.xgss.net/picgo/ubuntu-Ollama-OpenWebUI.png?aliyun" alt="ubuntu-Ollama-OpenWebUI"></p><h1 id="下载-ollama" tabindex="-1"><a class="header-anchor" href="#下载-ollama"><span>下载 Ollama</span></a></h1><p>访问下载： https://ollama.com/</p><p><img src="https://imgoss.xgss.net/picgo/image-20240517160214023.png?aliyun" alt="image-20240517160214023"></p><h2 id="安装ollama" tabindex="-1"><a class="header-anchor" href="#安装ollama"><span>安装Ollama</span></a></h2><h2 id="方法1、命令行下载安装-耗时长" tabindex="-1"><a class="header-anchor" href="#方法1、命令行下载安装-耗时长"><span>方法1、命令行下载安装(耗时长)</span></a></h2><p>安装命令：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ sudo apt  install curl</span>
<span class="line"></span>
<span class="line">$ curl -fsSL https://ollama.com/install.sh | sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20240517160657340.png?aliyun" alt="image-20240517160657340"></p><p>缺点： 国内网络环境要等很久</p><h2 id="方法2-手动下载安装" tabindex="-1"><a class="header-anchor" href="#方法2-手动下载安装"><span>方法2 , 手动下载安装</span></a></h2><p>1、手动下载 https://ollama.com/install.sh 这个文件</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ sudo mkdir ollama</span>
<span class="line">cd ollama</span>
<span class="line">$ sudo wget https://ollama.com/install.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、注释掉下载部分 curl xxxx 手动下载ollama-linux-{ARCH}</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ sudo vim install.sh</span>
<span class="line"></span>
<span class="line">修改文件：</span>
<span class="line">status &quot;Downloading ollama...&quot;</span>
<span class="line">#curl --fail --show-error --location --progress-bar -o $TEMP_DIR/ollama &quot;https://ollama.com/download/ollama-linux-\${ARCH}\${VER_PARAM}&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我电脑intel/amd cpu 所以 {ARCH} = amd64 浏览器下载 https://ollama.com/download/ollama-linux-amd64 当然科学上网速度更快哟。 放在 install.sh 同目录下</p><p>3、注释掉 #$SUDO install -o0 -g0 -m755 $TEMP_DIR/ollama $BINDIR/ollama</p><p>改为下面一行：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ sudo vim install.sh</span>
<span class="line"></span>
<span class="line">修改文件：</span>
<span class="line">status &quot;Installing ollama to $BINDIR...&quot;</span>
<span class="line">$SUDO install -o0 -g0 -m755 -d $BINDIR</span>
<span class="line">#$SUDO install -o0 -g0 -m755 $TEMP_DIR/ollama $BINDIR/ollama</span>
<span class="line">$SUDO install -o0 -g0 -m755 ./ollama-linux-amd64  $BINDIR/ollama</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4 运行 install.sh ,安装</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">sh  ./install.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20240517171750382.png?aliyun" alt="image-20240517171750382"></p><p><img src="https://imgoss.xgss.net/picgo/image-20240517171944028.png?aliyun" alt="image-20240517171944028"></p><p>重启电脑</p><p>配置模型下载路径</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">cd </span>
<span class="line">sudo vim .bashrc</span>
<span class="line"></span>
<span class="line">sudo mkdir -p /home/star/ollama/ollama_cache</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后添加一行 配置 OLLAMA_MODELS 环境变量自定义路径</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">### ollama model dir 改为自己的路径</span>
<span class="line"># export OLLAMA_MODELS=/path/ollama_cache</span>
<span class="line">export OLLAMA_MODELS=/home/star/ollama/ollama_cache</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果开始没配置OLLAMA_MODELS ，默认路径是/usr/share/ollama/.ollama/models</p><h2 id="启动ollama服务" tabindex="-1"><a class="header-anchor" href="#启动ollama服务"><span>启动ollama服务</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># ollama --help</span>
<span class="line">Large language model runner</span>
<span class="line"></span>
<span class="line">Usage:</span>
<span class="line">  ollama [flags]</span>
<span class="line">  ollama [command]</span>
<span class="line"></span>
<span class="line">Available Commands:</span>
<span class="line">  serve       Start ollama</span>
<span class="line">  create      Create a model from a Modelfile</span>
<span class="line">  show        Show information for a model</span>
<span class="line">  run         Run a model</span>
<span class="line">  pull        Pull a model from a registry</span>
<span class="line">  push        Push a model to a registry</span>
<span class="line">  list        List models</span>
<span class="line">  ps          List running models</span>
<span class="line">  cp          Copy a model</span>
<span class="line">  rm          Remove a model</span>
<span class="line">  help        Help about any command</span>
<span class="line"></span>
<span class="line">Flags:</span>
<span class="line">  -h, --help      help for ollama</span>
<span class="line">  -v, --version   Show version information</span>
<span class="line"></span>
<span class="line">Use &quot;ollama [command] --help&quot; for more information about a command.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提示</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">star@star-ai:~$ ollama serve</span>
<span class="line">Couldn&#39;t find &#39;/home/star/.ollama/id_ed25519&#39;. Generating new private key.</span>
<span class="line">Your new public key is: </span>
<span class="line"></span>
<span class="line">ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPmYsSi6aIsyhC4EHEsCdBtSOqnfKmNVSf0Ofz9sVzyB</span>
<span class="line"></span>
<span class="line">Error: listen tcp 127.0.0.1:11434: bind: address already in use</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明已经运行</p><h2 id="修改ollama端口" tabindex="-1"><a class="header-anchor" href="#修改ollama端口"><span>修改ollama端口</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">vim /etc/systemd/system/ollama.service</span>
<span class="line">在 [Service] 下添加  Environment=&quot;OLLAMA_HOST=0.0.0.0&quot;</span>
<span class="line"></span>
<span class="line">cat /etc/systemd/system/ollama.service</span>
<span class="line">[Unit]</span>
<span class="line">Description=Ollama Service</span>
<span class="line">After=network-online.target</span>
<span class="line"></span>
<span class="line">[Service]</span>
<span class="line">ExecStart=/usr/local/bin/ollama serve</span>
<span class="line">User=ollama</span>
<span class="line">Group=ollama</span>
<span class="line">Restart=always</span>
<span class="line">RestartSec=3</span>
<span class="line">Environment=&quot;PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin&quot;</span>
<span class="line">Environment=&quot;OLLAMA_HOST=0.0.0.0&quot;</span>
<span class="line"></span>
<span class="line">[Install]</span>
<span class="line">WantedBy=default.target</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新加载配置，重启ollama</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">systemctl daemon-reload</span>
<span class="line"></span>
<span class="line">systemctl restart ollama</span>
<span class="line"></span>
<span class="line">关闭服务</span>
<span class="line">systemctl stop ollama</span>
<span class="line">启动服务</span>
<span class="line">systemctl start ollama</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="运行qwen大模型" tabindex="-1"><a class="header-anchor" href="#运行qwen大模型"><span>运行qwen大模型</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">ollama run  qwen</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20240517173411382.png?aliyun" alt="image-20240517173411382"></p><h1 id="安装docker" tabindex="-1"><a class="header-anchor" href="#安装docker"><span>安装docker</span></a></h1><p>一键安装脚本</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">sudo curl -sSL https://get.docker.com/ | sh</span>
<span class="line"></span>
<span class="line">安装完成之后</span>
<span class="line">star@star-ai:~$ sudo docker --version</span>
<span class="line">Docker version 26.1.3, build b72abbb</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="安装open-webui" tabindex="-1"><a class="header-anchor" href="#安装open-webui"><span>安装Open WebUI</span></a></h1><p>Open WebUI是一个用于在本地运行大型语言模型（LLM）的开源Web界面。</p><p>参考： https://docs.openwebui.com/getting-started/#quick-start-with-docker-</p><h3 id="docker安装open-webui" tabindex="-1"><a class="header-anchor" href="#docker安装open-webui"><span>docker安装open-webui</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ sudo docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>要运行支持 Nvidia GPU 的 Open WebUI，请使用以下命令：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ sudo docker run -d \\</span>
<span class="line">--name open-webui \\</span>
<span class="line">--restart always \\</span>
<span class="line"> -p 3000:8080 \\</span>
<span class="line">--gpus all --add-host=host.docker.internal:host-gateway \\</span>
<span class="line">-v open-webui:/app/backend/data \\</span>
<span class="line">ghcr.io/open-webui/open-webui:cuda</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>改国内的地址</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ sudo docker run -d -p 3000:8080 --gpus all --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always  registry.cn-shenzhen.aliyuncs.com/funet8/open-webui:cuda</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>报错：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">sudo docker run -d -p 3000:8080 --gpus all --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always  registry.cn-shenzhen.aliyuncs.com/funet8/open-webui:cuda</span>
<span class="line">254b47e7994b2f0087ce0058918621523b39cf9b0e89018777c0cf98943ba2d1</span>
<span class="line">docker: Error response from daemon: could not select device driver &quot;&quot; with capabilities: [[gpu]].</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ubuntu识别不了我的显卡</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ sudo nvidia-smi</span>
<span class="line">Fri May 17 18:37:15 2024       </span>
<span class="line">+-----------------------------------------------------------------------------------------+</span>
<span class="line">| NVIDIA-SMI 550.54.15              Driver Version: 550.54.15      CUDA Version: 12.4     |</span>
<span class="line">|-----------------------------------------+------------------------+----------------------+</span>
<span class="line">| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |</span>
<span class="line">| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |</span>
<span class="line">|                                         |                        |               MIG M. |</span>
<span class="line">|=========================================+========================+======================|</span>
<span class="line">|   0  NVIDIA GeForce GTX 1060 6GB    Off |   00000000:01:00.0 Off |                  N/A |</span>
<span class="line">| 40%   33C    P8              6W /  120W |      65MiB /   6144MiB |      0%      Default |</span>
<span class="line">|                                         |                        |                  N/A |</span>
<span class="line">+-----------------------------------------+------------------------+----------------------+</span>
<span class="line">                                                                                         </span>
<span class="line">+-----------------------------------------------------------------------------------------+</span>
<span class="line">| Processes:                                                                              |</span>
<span class="line">|  GPU   GI   CI        PID   Type   Process name                              GPU Memory |</span>
<span class="line">|        ID   ID                                                               Usage      |</span>
<span class="line">|=========================================================================================|</span>
<span class="line">|    0   N/A  N/A      1030      G   /usr/lib/xorg/Xorg                             56MiB |</span>
<span class="line">|    0   N/A  N/A      1109      G   /usr/bin/gnome-shell                            4MiB |</span>
<span class="line">+-----------------------------------------------------------------------------------------+</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装nvidia-container-toolkit： 确保你已经安装了nvidia-container-toolkit，并配置Docker以使用该工具包：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">sudo apt-get update</span>
<span class="line">sudo apt-get install -y nvidia-container-toolkit</span>
<span class="line">sudo systemctl restart docker</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>检查Docker默认运行时配置： 确保Docker的默认运行时设置为nvidia。编辑Docker的配置文件（通常位于/etc/docker/daemon.json），并添加或修改如下内容：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">sudo vim /etc/docker/daemon.json</span>
<span class="line">添加：</span>
<span class="line"></span>
<span class="line">{</span>
<span class="line">  &quot;default-runtime&quot;: &quot;nvidia&quot;,</span>
<span class="line">  &quot;runtimes&quot;: {</span>
<span class="line">    &quot;nvidia&quot;: {</span>
<span class="line">      &quot;path&quot;: &quot;nvidia-container-runtime&quot;,</span>
<span class="line">      &quot;runtimeArgs&quot;: []</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line">编辑完文件后，重启Docker服务：</span>
<span class="line">sudo systemctl restart docker</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>检查NVIDIA Container Runtime兼容性： 确保你的NVIDIA Container Runtime版本与Docker版本兼容。可以通过以下命令查看版本：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">sudo docker version</span>
<span class="line"></span>
<span class="line">nvidia-container-runtime --version</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成上述步骤后，再次尝试运行你的Docker命令。如果问题仍然存在，请提供更多的系统信息和日志，以便进一步诊断问题。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">sudo docker start open-webui</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20240517184705558.png?aliyun" alt="image-20240517184705558"></p><h1 id="登录open-webui" tabindex="-1"><a class="header-anchor" href="#登录open-webui"><span>登录open-webui</span></a></h1><p>用IP+端口访问</p><p><img src="https://imgoss.xgss.net/picgo/image-20240517184836945.png?aliyun" alt="image-20240517184836945"></p><h2 id="修改语言为中文" tabindex="-1"><a class="header-anchor" href="#修改语言为中文"><span>修改语言为中文</span></a></h2><p>OpenWebUI默认是英文的，所以修改语言为简体中文。</p><p><img src="https://imgoss.xgss.net/picgo/image-20240518130431610.png?aliyun" alt="image-20240518130431610"></p><h2 id="openwebui不能连接ollama" tabindex="-1"><a class="header-anchor" href="#openwebui不能连接ollama"><span>OpenWebUI不能连接Ollama</span></a></h2><p>报错：WebUI could not connect to ollama</p><p><img src="https://imgoss.xgss.net/picgo/image-20240518130617215.png?aliyun" alt="image-20240518130617215"></p><p>修改地址：http://192.168.1.21:11434</p><p><img src="https://imgoss.xgss.net/picgo/image-20240518163725720.png?aliyun" alt="image-20240518163725720"></p><p>再下载千问的模型 qwen</p><p><img src="https://imgoss.xgss.net/picgo/image-20240518164005249.png?aliyun" alt="image-20240518164005249"></p><h1 id="下载大模型" tabindex="-1"><a class="header-anchor" href="#下载大模型"><span>下载大模型</span></a></h1><p>ollama官方的模型仓库参见这里：https://ollama.com/library</p><p><img src="https://imgoss.xgss.net/picgo/image-20240518165100596.png?aliyun" alt="image-20240518165100596"></p><p>根据自己的CPU和GPU选择合适的大模型，否则会很卡。</p><p>比如测试用的1060使用qwen:72b就很卡，问一个问题要等很久，几乎是不能用的状态。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">阿里巴巴的大模型：</span>
<span class="line">ollama run  qwen</span>
<span class="line">ollama run qwen:14b</span>
<span class="line">ollama run qwen:32b</span>
<span class="line">ollama run qwen:72b</span>
<span class="line">ollama run qwen:110b   # 110b 表示该模型包含了 1100 亿（110 billion）个参数</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">脸书大模型：</span>
<span class="line">ollama run llama2</span>
<span class="line">ollama run llama3</span>
<span class="line">ollama run llama3:8b</span>
<span class="line"></span>
<span class="line">谷歌的大模型：</span>
<span class="line">ollama run gemma</span>
<span class="line"></span>
<span class="line">微软的大模型</span>
<span class="line">ollama run phi3</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="删除模型" tabindex="-1"><a class="header-anchor" href="#删除模型"><span>删除模型</span></a></h1><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">显示所有模型</span>
<span class="line"># ollama list</span>
<span class="line"></span>
<span class="line">删除模型</span>
<span class="line"># ollama rm llama3:latest</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20240518162719946.png?aliyun" alt="image-20240518162719946"></p><h1 id="ubuntu查看gpu负载" tabindex="-1"><a class="header-anchor" href="#ubuntu查看gpu负载"><span>ubuntu查看GPU负载</span></a></h1><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">nvidia-smi</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>确实在ubuntu20.04系统下确实比window10系统使用Ollama更加流畅。</p>`,100)]))}const c=n(i,[["render",d]]),t=JSON.parse('{"path":"/chatgpt/16.Ubuntu%E7%B3%BB%E7%BB%9F%E4%B8%8B%E9%83%A8%E7%BD%B2%E5%A4%A7%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B-Ollama%E5%92%8COpenWebUI%E5%AE%9E%E7%8E%B0%E5%90%84%E5%A4%A7%E6%A8%A1%E5%9E%8B%E7%9A%84%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD%E8%87%AA%E7%94%B1.html","title":"Ubuntu系统下部署大语言模型：Ollama和OpenWebUI实现各大模型的人工智能自由","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"chatgpt/16.Ubuntu系统下部署大语言模型-Ollama和OpenWebUI实现各大模型的人工智能自由.md"}');export{c as comp,t as data};
