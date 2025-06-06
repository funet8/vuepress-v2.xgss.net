import{_ as e,c as n,b as a,o as i}from"./app-BEL8OELx.js";const l={};function c(d,s){return i(),n("div",null,s[0]||(s[0]=[a(`<h1 id="docker系列教程2-docker的安装" tabindex="-1"><a class="header-anchor" href="#docker系列教程2-docker的安装"><span>Docker系列教程2:Docker的安装</span></a></h1><p>上次分享了Docker的一些入门知识点，这次讲在Linux、MacOs、Windows系统下如何安装docker。</p><h2 id="linux-一键脚本安装" tabindex="-1"><a class="header-anchor" href="#linux-一键脚本安装"><span>Linux 一键脚本安装</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">#CentOS 7、Debian、Ubuntu</span>
<span class="line"></span>
<span class="line">curl -sSL https://get.docker.com/ | sh</span>
<span class="line">systemctl start docker</span>
<span class="line">systemctl enable docker.service</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/dockerinstall.jpg?aliyun" alt="dockerinstall"></p><h1 id="centos7安装docker" tabindex="-1"><a class="header-anchor" href="#centos7安装docker"><span>CentOS7安装Docker</span></a></h1><p>Docker 对CentOS的版本： CentOS 7 （64-bit） 前提条件： Docker 运行在CentOS 7 上，要求系统为64位、系统内核为3.10以上</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># cat /etc/redhat-release     # 查看系统版本号</span>
<span class="line">CentOS Linux release 7.3.1611 (Core)</span>
<span class="line"> </span>
<span class="line"># uname -r        # 查看内核</span>
<span class="line">3.10.0-514.el7.x86_64</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="yum安装docker" tabindex="-1"><a class="header-anchor" href="#yum安装docker"><span>yum安装docker</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># yum -y install docker        # 安装Docker(CentOS7系统CentOS-Extras库中已带Docker)</span>
<span class="line"># systemctl start docker        # 启动Docker</span>
<span class="line"># systemctl enable docker    # 加入开机自启动</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-更换配置国内镜像" tabindex="-1"><a class="header-anchor" href="#docker-更换配置国内镜像"><span>Docker 更换配置国内镜像</span></a></h2><p>docker设置国内镜像源： https://www.cnblogs.com/eddyz/p/17168828.html</p><p>使用 Docker 构建和部署应用程序时，几乎都需要下载一些基础镜像和依赖库。但由于国内网络比较特殊，想要从官方的 Docker Hub 仓库下载会极其缓慢，甚至会出现连接超时、无法下载等情况。为了解决网络问题，我们需要配置使用国内的镜像仓库，来加快镜像的下载速度。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">vim /etc/docker/daemon.json</span>
<span class="line"></span>
<span class="line">{</span>
<span class="line">    &quot;registry-mirrors&quot;: [</span>
<span class="line">        &quot;https://hub-mirror.c.163.com&quot;,</span>
<span class="line">        &quot;https://mirror.baidubce.com&quot;,</span>
<span class="line">        &quot;https://dockerproxy.com&quot;,</span>
<span class="line">        &quot;https://docker.nju.edu.cn&quot;</span>
<span class="line">    ]</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改之后重启 Docker 服务：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">sudo systemctl daemon-reload</span>
<span class="line">sudo systemctl restart docker</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="yum安装高版本" tabindex="-1"><a class="header-anchor" href="#yum安装高版本"><span>yum安装高版本</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 安装</span>
<span class="line">yum -y install yum-utils device-mapper-persistent-data lvm2</span>
<span class="line">yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo</span>
<span class="line">yum -y install docker-ce docker-ce-cli containerd.io</span>
<span class="line"># 配置</span>
<span class="line">mkdir /etc/docker</span>
<span class="line">vim /etc/docker/daemon.json</span>
<span class="line">{</span>
<span class="line">    &quot;exec-opts&quot;: [&quot;native.cgroupdriver=systemd&quot;],</span>
<span class="line">    &quot;graph&quot;: &quot;/data/docker&quot;</span>
<span class="line">}</span>
<span class="line"># 启动</span>
<span class="line">systemctl enable docker --now</span>
<span class="line">docker info</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改docker默认的镜像存储位置" tabindex="-1"><a class="header-anchor" href="#修改docker默认的镜像存储位置"><span>修改docker默认的镜像存储位置</span></a></h2><p>由于docker镜像文件很大，会占用系统磁盘，把</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">######修改docker默认存储位置</span>
<span class="line">mkdir /home/data</span>
<span class="line">ln -s /home/data /data</span>
<span class="line">mkdir -p /data/docker/images</span>
<span class="line">systemctl stop docker.service</span>
<span class="line">cd /var/lib</span>
<span class="line">cp -rf docker docker.bak</span>
<span class="line">mv /var/lib/docker /data/docker/images</span>
<span class="line"></span>
<span class="line">ln -s /data/docker/images/docker /var/lib/docker</span>
<span class="line"></span>
<span class="line">######Docker 中国官方镜像加速</span>
<span class="line">cat &gt; /etc/docker/daemon.json &lt;&lt; EOFI</span>
<span class="line">{&quot;registry-mirrors&quot;: [&quot;https://registry.docker-cn.com&quot;]}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装docker-compose" tabindex="-1"><a class="header-anchor" href="#安装docker-compose"><span>安装docker-compose</span></a></h2><p>非必须。</p><p>Docker-Compose 是用来管理容器的，类似用户容器管家，我们有N多台容器或者应用需要启动的时候，如果手动去操作，是非常耗费时间的，如果有了 Docker-Compose 只需要一个配置文件就可以帮我们搞定，但是 Docker-Compose 只能管理当前主机上的 Docker，不能去管理其他服务器上的服务。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">方法一</span>
<span class="line"># yum -y install docker-compose</span>
<span class="line">查看安装的版本</span>
<span class="line">docker-compose -v</span>
<span class="line"></span>
<span class="line">方法二：</span>
<span class="line"># curl -L &quot;https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)&quot; -o /usr/local/bin/docker-compose</span>
<span class="line">chmod +x /usr/local/bin/docker-compose</span>
<span class="line">ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="centos8安装docker" tabindex="-1"><a class="header-anchor" href="#centos8安装docker"><span>CentOS8安装Docker</span></a></h1><h3 id="_1-安装docker" tabindex="-1"><a class="header-anchor" href="#_1-安装docker"><span>1.安装docker</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># yum install -y docker</span>
<span class="line"></span>
<span class="line"># docker -v</span>
<span class="line">Emulate Docker CLI using podman. Create /etc/containers/nodocker to quiet msg.</span>
<span class="line">podman version 3.3.1</span>
<span class="line">[root@localhost yum.repos.d]# podman -v</span>
<span class="line">podman version 3.3.1</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-启动docker" tabindex="-1"><a class="header-anchor" href="#_2-启动docker"><span>2.启动docker</span></a></h3><p>报错 docker和podman冲突。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">启动报错，错误如下：</span>
<span class="line">Failed to start docker.service: Unit docker.service not found.</span>
<span class="line">错误分析：CentOS 8 中安装 docker 和 Podman 冲突</span>
<span class="line"></span>
<span class="line">解决方式：</span>
<span class="line">1.查看是否安装 Podman </span>
<span class="line">rpm -q podman</span>
<span class="line"></span>
<span class="line">2.删除podman(输入yes，然后等待...)</span>
<span class="line">dnf remove podman</span>
<span class="line"></span>
<span class="line">3.重装docker</span>
<span class="line"># yum install -y yum-utils  device-mapper-persistent-data  lvm2</span>
<span class="line"># yum-config-manager  --add-repo   https://download.docker.com/linux/centos/docker-ce.repo</span>
<span class="line"># yum install -y docker-ce docker-ce-cli containerd.io</span>
<span class="line"># yum install -y  docker-ce docker-ce-cli</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-启动docker" tabindex="-1"><a class="header-anchor" href="#_3-启动docker"><span>3.启动docker</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">systemctl start docker</span>
<span class="line"></span>
<span class="line">查看版本</span>
<span class="line"># docker -v</span>
<span class="line">Docker version 20.10.21, build baeda1f</span>
<span class="line"></span>
<span class="line">查看状态</span>
<span class="line">systemctl status docker</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-配置" tabindex="-1"><a class="header-anchor" href="#_4-配置"><span>4.配置</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">mkdir -p /etc/docker</span>
<span class="line"></span>
<span class="line">将阿里云配置写入daemon.json</span>
<span class="line">tee /etc/docker/daemon.json &lt;&lt;-&#39;EOF&#39;</span>
<span class="line">{</span>
<span class="line">  &quot;registry-mirrors&quot;: [&quot;https://xirgurp7.mirror.aliyuncs.com&quot;]</span>
<span class="line">}</span>
<span class="line">EOF</span>
<span class="line"></span>
<span class="line">加载配置</span>
<span class="line">systemctl daemon-reload</span>
<span class="line"></span>
<span class="line">重启docker</span>
<span class="line">systemctl restart docker</span>
<span class="line">systemctl enable docker</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="macos安装docker" tabindex="-1"><a class="header-anchor" href="#macos安装docker"><span>macOS安装Docker</span></a></h1><h2 id="系统要求" tabindex="-1"><a class="header-anchor" href="#系统要求"><span>系统要求</span></a></h2><p>要求系统最低为 macOS 必须是 10.15 或更高版本， Catalina、Big Sur 或者 Monterey，建议升级到最新版本的 macOS。</p><h2 id="使用-homebrew-安装" tabindex="-1"><a class="header-anchor" href="#使用-homebrew-安装"><span>使用 Homebrew 安装</span></a></h2><p>已经支持 Docker Desktop for Mac，因此可以很方便的使用 Homebrew Cask 来进行安装：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ brew install --cask docker</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="手动下载安装" tabindex="-1"><a class="header-anchor" href="#手动下载安装"><span>手动下载安装</span></a></h2><p>如果需要手动下载，请<a href="https://desktop.docker.com/mac/main/amd64/Docker.dmg" target="_blank" rel="noopener noreferrer">点击下载</a> Docker Desktop for Mac。https://desktop.docker.com/mac/main/amd64/Docker.dmg</p><p>如果你的电脑搭载的是 M1 芯片（arm64 架构），请<a href="https://desktop.docker.com/mac/main/arm64/Docker.dmg" target="_blank" rel="noopener noreferrer">点击下载</a> Docker Desktop for Mac https://desktop.docker.com/mac/main/arm64/Docker.dmg</p><p>如同 macOS 其它软件一样，安装也非常简单，双击下载的 .dmg 文件，然后将那只叫 的鲸鱼图标拖拽到 Application 文件夹即可。</p><p><img src="https://imgoss.xgss.net/picgo/install-mac-dmg.png?aliyun" alt="img"></p><h2 id="运行" tabindex="-1"><a class="header-anchor" href="#运行"><span>运行</span></a></h2><p>从应用中找到 Docker 图标并点击运行。</p><p><img src="https://imgoss.xgss.net/picgo/install-mac-apps.png?aliyun" alt="img"></p><p>运行之后，会在右上角菜单栏看到多了一个鲸鱼图标，这个图标表明了 Docker 的运行状态。</p><p><img src="https://imgoss.xgss.net/picgo/install-mac-menubar.png?aliyun" alt="img"></p><p>每次点击鲸鱼图标会弹出操作菜单。 之后，你可以在终端通过命令检查安装后的 Docker 版本。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ docker --version</span>
<span class="line">$ docker info</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果都正常的话，可以尝试运行一个 ：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ docker run -d -p 80:80 --name webserver nginx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>服务运行后，可以访问 ，如果看到了 &quot;Welcome to nginx!&quot;，就说明 Docker Desktop for Mac 安装成功了。</p><p>要停止 Nginx 服务器并删除执行下面的命令：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ docker stop webserver</span>
<span class="line">$ docker rm webserver</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="windows11中安装docker" tabindex="-1"><a class="header-anchor" href="#windows11中安装docker"><span>windows11中安装docker</span></a></h1><h2 id="一、检查电脑是否开启虚拟化功能" tabindex="-1"><a class="header-anchor" href="#一、检查电脑是否开启虚拟化功能"><span>一、检查电脑是否开启虚拟化功能</span></a></h2><p>打开任务管理器，查看性能选项卡中的CPU信息，在右下角可以看到虚拟化是否开启。如未开启需要重启到BIOS中进行修改。</p><h2 id="二、在启用或关闭windows功能中打开windows相关功能" tabindex="-1"><a class="header-anchor" href="#二、在启用或关闭windows功能中打开windows相关功能"><span>二、在启用或关闭windows功能中打开windows相关功能</span></a></h2><p>在控制面板中搜索“启用或关闭”---&gt; 点击“启用或关闭 windows功能”，在其中，我们需要选择“适用于linux的windows子系统”选项。</p><p>如图：</p><p><img src="https://imgoss.xgss.net/picgo/image-20221201170901109.png?aliyun" alt="image-20221201170901109"></p><p>重启后生效，然后进行下一步。</p><h2 id="三、下载wsl软件-并安装" tabindex="-1"><a class="header-anchor" href="#三、下载wsl软件-并安装"><span>三、下载WSL软件，并安装</span></a></h2><p>运行windows11的终端，输入wsl --list --online选择要安装的版本。</p><p>这里选择比较常用的ubuntu20.04进行安装，在终端中输入</p><p>wsl --install -d Ubuntu-20.04</p><p>等待安装结束。如果安装失败，可以手动下载离线包安装：https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi</p><p>安装完毕后，可以在终端输入wsl进行检查。</p><h2 id="四、下载docker" tabindex="-1"><a class="header-anchor" href="#四、下载docker"><span>四、下载Docker</span></a></h2><p>来到Docker官网：https://www.docker.com/get-started/ 选择对应的版本</p><p><img src="https://imgoss.xgss.net/picgo/image-20221201171259903.png?aliyun" alt="image-20221201171259903"></p><p>软件安装完毕后出现绿色则安装成功：</p><p><img src="https://imgoss.xgss.net/picgo/image-20221201171159865.png?aliyun" alt="image-20221201171159865"></p><p>至此各个系统的安装docker教程完成。</p>`,78)]))}const p=e(l,[["render",c]]),t=JSON.parse('{"path":"/docker/Docker%E7%B3%BB%E5%88%97%E6%95%99%E7%A8%8B2Docker%E7%9A%84%E5%AE%89%E8%A3%85.html","title":"Docker系列教程2:Docker的安装","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"docker/Docker系列教程2Docker的安装.md"}');export{p as comp,t as data};
