import{_ as n,c as a,b as e,o as i}from"./app-BEL8OELx.js";const l={};function p(d,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="用香橙派aipro部署大模型、安装宝塔搭建私有随身web开发环境" tabindex="-1"><a class="header-anchor" href="#用香橙派aipro部署大模型、安装宝塔搭建私有随身web开发环境"><span>用香橙派AIpro部署大模型、安装宝塔搭建私有随身WEB开发环境</span></a></h1><h1 id="什么是香橙派" tabindex="-1"><a class="header-anchor" href="#什么是香橙派"><span>什么是香橙派</span></a></h1><p>Orange Pi AI Pro 开发板是香橙派联合华为精心打造的高性能 AI 开发板，其搭载了昇腾 AI 处理器，可提供 8TOPS INT8 的计算能力，内存提供了 8GB 和 16GB两种版本。可以实现图像、视频等多种数据分析与推理计算，可广泛用于教育、机器人、无人机等场景。</p><p>如果你有一块香橙派AIpro你会拿来做什么？</p><p>今天就跟大家介绍一下我会用这个香橙派AIpro做什么。</p><p><strong>1.香橙派AIpro部署大语言模型</strong></p><p><strong>2.利用香橙派AIpro安装LNMP（宝塔面板）搭建私有的Wordpress博客WEB系统</strong></p><p><img src="https://imgoss.xgss.net/picgo/xiangchengpai-aipor.png?aliyun" alt="xiangchengpai-aipor"></p><h2 id="基础配置" tabindex="-1"><a class="header-anchor" href="#基础配置"><span>基础配置</span></a></h2><p>香橙派 AIpro</p><p>CPU：昇腾AI技术路线 （听群友说是 A55）</p><p>内存：8GB/16GB LPDDR4X （我拿到的是8G的版本）</p><p>HDMI 2.0输出 2个</p><p>千兆网口： 1个</p><p>USB3.0 ，有2个</p><p>USB Type-C 3.0 ，1个</p><p>Wi-Fi5+蓝牙4.2</p><p>支持SATA/NVMe SSD 2280的M.2插槽</p><p>可外接32GB/64GB/128GB/256GB eMMC模块</p><p>Type-C供电</p><p><img src="https://imgoss.xgss.net/picgo/image-20240522172207326.png?aliyun" alt="image-20240522172207326"></p><p>详细信息请查看： http://www.orangepi.cn/html/hardWare/computerAndMicrocontrollers/details/Orange-Pi-AIpro.html</p><h2 id="外壳" tabindex="-1"><a class="header-anchor" href="#外壳"><span>外壳</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/image-20240529154147128.png?aliyun" alt="image-20240529154147128"></p><h2 id="主板和电源" tabindex="-1"><a class="header-anchor" href="#主板和电源"><span>主板和电源</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/image-20240529154208894.png?aliyun" alt="image-20240529154208894"></p><h2 id="正面图片" tabindex="-1"><a class="header-anchor" href="#正面图片"><span>正面图片</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/image-20240522173608688.png?aliyun" alt="image-20240522173608688"></p><h2 id="背面图" tabindex="-1"><a class="header-anchor" href="#背面图"><span>背面图</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/image-20240522173642488.png?aliyun" alt="image-20240522173642488"></p><h1 id="ubuntu系统固定ip" tabindex="-1"><a class="header-anchor" href="#ubuntu系统固定ip"><span>ubuntu系统固定IP</span></a></h1><p>把香橙派AIpro的电源插上，连接显示器键盘鼠标和网线，开机风扇声音还挺大，不过进入系统后风扇声音变小。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ ifconfig 查看IP</span>
<span class="line">eth0: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST&gt;  mtu 1500</span>
<span class="line">        inet 192.168.1.245  netmask 255.255.255.0  broadcast 192.168.1.255</span>
<span class="line">        inet6 fe80::9f02:c0dd:c615:4468  prefixlen 64  scopeid 0x20&lt;link&gt;</span>
<span class="line">        ether c0:74:2b:fe:29:42  txqueuelen 1000  (Ethernet)</span>
<span class="line">        RX packets 453623  bytes 66206481 (66.2 MB)</span>
<span class="line">        RX errors 0  dropped 1595  overruns 0  frame 0</span>
<span class="line">        TX packets 4999  bytes 957506 (957.5 KB)</span>
<span class="line">        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0</span>
<span class="line">wlan0: flags=4099&lt;UP,BROADCAST,MULTICAST&gt;  mtu 1500</span>
<span class="line">        ether 7c:88:99:ff:79:ec  txqueuelen 1000  (Ethernet)</span>
<span class="line">        RX packets 0  bytes 0 (0.0 B)</span>
<span class="line">        RX errors 0  dropped 0  overruns 0  frame 0</span>
<span class="line">        TX packets 0  bytes 0 (0.0 B)</span>
<span class="line">        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看到有两个网卡，一个是有线，一个无线。</p><p>ubuntu系统固定IP:</p><p>我这里把香橙派的IP固定为 192.168.1.22，免得重启或者IP被局域网的占用的情况。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ sudo -i</span>
<span class="line"># cd /etc/netplan</span>
<span class="line">#ls -l</span>
<span class="line">total 20</span>
<span class="line">-rw-r--r--   1 root root   164 Jan 30 12:19 01-netcfg.yaml</span>
<span class="line"></span>
<span class="line">备份文件：</span>
<span class="line"># cp 01-netcfg.yaml 01-netcfg.yaml-bak</span>
<span class="line"># vim 01-netcfg.yaml</span>
<span class="line"></span>
<span class="line">填入网络配置模版</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ubuntu22.04 参考以下配置模板如下</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">network:</span>
<span class="line">  ethernets:</span>
<span class="line">    eth0: # 网卡名称</span>
<span class="line">      dhcp4: no #关闭ipv4动态分配ip地址</span>
<span class="line">      dhcp6: no #关闭ipv6动态分配ip地址</span>
<span class="line">      addresses: </span>
<span class="line">          - 192.168.1.22/24  # 设置的子网IP和子网掩码，192.168.1.22代表IP /24代表掩码255.255.255.0</span>
<span class="line">      routes:</span>
<span class="line">          - to : default </span>
<span class="line">            via: 192.168.1.1   # 网关</span>
<span class="line">      nameservers:</span>
<span class="line">          addresses:  # DNS服务器</span>
<span class="line">             - 114.114.114.114</span>
<span class="line">             - 8.8.8.8</span>
<span class="line">  version: 2</span>
<span class="line">  renderer: networkd</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加载配置和重启网络</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">修改好网卡配置文件后通过下面命令生效</span>
<span class="line"># netplan apply</span>
<span class="line"></span>
<span class="line">重新网络</span>
<span class="line"># systemctl restart systemd-networkd</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="ssh远程连接" tabindex="-1"><a class="header-anchor" href="#ssh远程连接"><span>SSH远程连接</span></a></h1><p>Ubuntu 22.04.3 LTS</p><p>下载SSH软件例如： MobaXterm 或者 Putty</p><p>我习惯用 SecureCRT</p><p>如图填写IP,端口，用户和密码，这个IP是没改之前的请忽略。</p><p><img src="https://imgoss.xgss.net/picgo/image-20240522180029942.png?aliyun" alt="image-20240522180029942"></p><p>进入远程</p><p><img src="https://imgoss.xgss.net/picgo/image-20240522183401338.png?aliyun" alt="image-20240522183401338"></p><h1 id="远程连接vnc" tabindex="-1"><a class="header-anchor" href="#远程连接vnc"><span>远程连接VNC</span></a></h1><p>官方镜像默认安装了VNC，我这里用 vncviewer 软件</p><p><img src="https://imgoss.xgss.net/picgo/image-20240524192426294.png?aliyun" alt="image-20240524192426294"></p><p>就可以用vnc远程控制香橙派了</p><p><img src="https://imgoss.xgss.net/picgo/image-20240524192504613.png?aliyun" alt="image-20240524192504613"></p><h1 id="挂载硬盘" tabindex="-1"><a class="header-anchor" href="#挂载硬盘"><span>挂载硬盘</span></a></h1><p>我在板子后面添加了一块1T的SSD，并且挂载到/www目录下</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">(base) HwHiAiUser@orangepiaipro:~$ sudo -i</span>
<span class="line">[sudo] password for HwHiAiUser: </span>
<span class="line">输入密码，切换到root用户</span>
<span class="line"></span>
<span class="line">查看硬盘：</span>
<span class="line"># df -h</span>
<span class="line">Filesystem      Size  Used Avail Use% Mounted on</span>
<span class="line">/dev/root        29G   17G   12G  60% /</span>
<span class="line">tmpfs           3.7G  4.0K  3.7G   1% /dev/shm</span>
<span class="line">tmpfs           1.5G   15M  1.5G   1% /run</span>
<span class="line">tmpfs           5.0M     0  5.0M   0% /run/lock</span>
<span class="line">tmpfs           4.0M     0  4.0M   0% /sys/fs/cgroup</span>
<span class="line">tmpfs           128M  772K  128M   1% /var/log</span>
<span class="line">/dev/mmcblk1p3   50M  2.0K   50M   1% /exchange</span>
<span class="line">tmpfs           755M   76K  755M   1% /run/user/0</span>
<span class="line">tmpfs           755M   80K  755M   1% /run/user/1000</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">查看硬盘：</span>
<span class="line">fdisk -l</span>
<span class="line">Disk /dev/nvme0n1: 953.87 GiB, 1024209543168 bytes, 2000409264 sectors</span>
<span class="line">Disk model: Predator SSD GM7000 1TB                 </span>
<span class="line">.....</span>
<span class="line">Device          Start        End    Sectors  Size Type</span>
<span class="line">/dev/nvme0n1p1   4096     618495     614400  300M EFI System</span>
<span class="line">/dev/nvme0n1p2 618496 1999204351 1998585856  953G Microsoft basic data</span>
<span class="line">.....</span>
<span class="line"></span>
<span class="line">可以看到有一块1T的SSD，再挂载硬盘</span>
<span class="line"></span>
<span class="line">mkdir /www</span>
<span class="line">mount /dev/nvme0n1p2 /www  # 可以直接挂载</span>
<span class="line"></span>
<span class="line">也可以先格式化再挂载：</span>
<span class="line">mkfs.ext4 /dev/nvme0n1p2</span>
<span class="line">mount /dev/nvme0n1p2 /www</span>
<span class="line"></span>
<span class="line">df -h|grep www</span>
<span class="line">/dev/nvme0n1p2  953G  528M  953G   1% /www</span>
<span class="line"></span>
<span class="line">vim /etc/fstab</span>
<span class="line">增加：</span>
<span class="line">/dev/nvme0n1p2  /www ext4 defaults 0 0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此准备工作完毕，下面就介绍用香橙派AIpro搭建本地的模型。</p><h1 id="香橙派aipro部署大语言模型" tabindex="-1"><a class="header-anchor" href="#香橙派aipro部署大语言模型"><span>香橙派AIpro部署大语言模型</span></a></h1><p>Ollama运行llama3、qwen等大模型，虽然有些小马拉大车，我还是想试试它的极限在哪里</p><h1 id="安装ollama" tabindex="-1"><a class="header-anchor" href="#安装ollama"><span>安装Ollama</span></a></h1><h2 id="方法1、命令行下载安装-耗时长" tabindex="-1"><a class="header-anchor" href="#方法1、命令行下载安装-耗时长"><span>方法1、命令行下载安装(耗时长)</span></a></h2><p>安装命令：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ sudo apt  install curl</span>
<span class="line"></span>
<span class="line">$ curl -fsSL https://ollama.com/install.sh | sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20240517160657340.png?aliyun" alt="image-20240517160657340"></p><p>缺点： 国内网络环境要等很久</p><h2 id="方法2-、手动下载安装-推荐使用" tabindex="-1"><a class="header-anchor" href="#方法2-、手动下载安装-推荐使用"><span>方法2 、手动下载安装（推荐使用）</span></a></h2><p>1.手动下载 https://ollama.com/install.sh 这个文件</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># mkdir /www/ollama</span>
<span class="line">cd /www/ollama</span>
<span class="line"># wget https://ollama.com/install.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.注释掉下载部分 curl xxxx 手动下载ollama-linux-{ARCH}</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># vim install.sh</span>
<span class="line"></span>
<span class="line">修改文件：</span>
<span class="line">status &quot;Downloading ollama...&quot;</span>
<span class="line">#curl --fail --show-error --location --progress-bar -o $TEMP_DIR/ollama &quot;https://ollama.com/download/ollama-linux-\${ARCH}\${VER_PARAM}&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>香橙派 AIpro的CPU是ARM架构的，所以 {ARCH} = arm64</p><p>浏览器下载： https://ollama.com/download/ollama-linux-arm64</p><p>如果CPU是intel或者AMD则：{ARCH} = amd64，https://ollama.com/download/ollama-linux-amd64</p><p>当然科学上网速度更快哟。 放在 install.sh 同目录下</p><p>3.注释掉 #$SUDO install -o0 -g0 -m755 $TEMP_DIR/ollama $BINDIR/ollama</p><p>改为下面一行：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># vim install.sh</span>
<span class="line"></span>
<span class="line">修改文件：</span>
<span class="line">status &quot;Installing ollama to $BINDIR...&quot;</span>
<span class="line">$SUDO install -o0 -g0 -m755 -d $BINDIR</span>
<span class="line">#$SUDO install -o0 -g0 -m755 $TEMP_DIR/ollama $BINDIR/ollama</span>
<span class="line">$SUDO install -o0 -g0 -m755 ./ollama-linux-arm64  $BINDIR/ollama</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4.运行 install.sh ,安装</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">(base) root@orangepiaipro:/www/ollama# ll</span>
<span class="line">total 285868</span>
<span class="line">drwxr-xr-x 2 root root      4096 May 23 10:20 ./</span>
<span class="line">drwxr-xr-x 4 root root      4096 May 23 10:04 ../</span>
<span class="line">-rw-r--r-- 1 root root     10158 May 23 10:20 install.sh</span>
<span class="line">-rw-r--r-- 1 root root 292706744 May 23 10:17 ollama-linux-arm64</span>
<span class="line"></span>
<span class="line"># sh  ./install.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20240523102150518.png?aliyun" alt="image-20240523102150518"></p><p>重启电脑</p><h2 id="更改模型存放的路径" tabindex="-1"><a class="header-anchor" href="#更改模型存放的路径"><span>更改模型存放的路径</span></a></h2><p>由于系统盘空间有限，如果不修改模型存放位置默认会在 /usr/share/ollama/.ollama/models 或者 /root/.ollama/models/ 目录。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># mkdir /www/ollama/ollama_models</span>
<span class="line"></span>
<span class="line"># cd /etc/systemd/system/</span>
<span class="line"># vim /etc/systemd/system/ollama.service</span>
<span class="line">在 environment里面分号隔开添加OLLAMA_MODELS环境变量</span>
<span class="line"></span>
<span class="line">OLLAMA_MODELS=/www/ollama/ollama_models;</span>
<span class="line">如下图</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20240523103347948.png?aliyun" alt="image-20240523103347948"></p><p>加载配置并且重启ollama生效</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">source ollama.service</span>
<span class="line">systemctl daemon-reload</span>
<span class="line">systemctl restart ollama</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="启动ollama服务" tabindex="-1"><a class="header-anchor" href="#启动ollama服务"><span>启动ollama服务</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># ollama --help</span>
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
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明已经运行</p><p>重新加载配置，重启ollama</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">systemctl daemon-reload</span>
<span class="line"></span>
<span class="line">systemctl restart ollama</span>
<span class="line"></span>
<span class="line">ollama serve</span>
<span class="line"></span>
<span class="line">关闭服务</span>
<span class="line">systemctl stop ollama</span>
<span class="line">启动服务</span>
<span class="line">systemctl start ollama</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="运行qwen大模型" tabindex="-1"><a class="header-anchor" href="#运行qwen大模型"><span>运行qwen大模型</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">ollama run  qwen</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20240523115017945.png?aliyun" alt="image-20240523115017945"></p><p>使用ollama 运行 qwen CPU占用率为 300%，内存 40%，回答一个问题基本上要等很久。</p><p><img src="https://imgoss.xgss.net/picgo/image-20240523110842704.png?aliyun" alt="image-20240523110842704"></p><p>ollama官方的模型仓库参见这里：https://ollama.com/library</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">阿里巴巴的大模型：</span>
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
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除模型" tabindex="-1"><a class="header-anchor" href="#删除模型"><span>删除模型</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">显示所有模型</span>
<span class="line"># ollama list</span>
<span class="line"></span>
<span class="line">删除模型</span>
<span class="line"># ollama rm llama3:latest</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结论：可以安装ollama和使用大模型，但是无法流畅的运行。</p><h1 id="安装tiny-llama-manualreset模型" tabindex="-1"><a class="header-anchor" href="#安装tiny-llama-manualreset模型"><span>安装Tiny_Llama ManualReset模型</span></a></h1><p>Tiny_Llama ManualReset 的 gitee地址： https://gitee.com/wan-zutao/tiny-llama-manual-reset</p><h2 id="_1-克隆仓库" tabindex="-1"><a class="header-anchor" href="#_1-克隆仓库"><span>1.克隆仓库</span></a></h2><p>1.使用root用户登录环境，clone当前仓到空闲目录</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ sudo -i</span>
<span class="line"># git clone https://gitee.com/wan-zutao/tiny-llama-manual-reset.git tiny_llama</span>
<span class="line"># cd tiny_llama/inference</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-运行download-sh" tabindex="-1"><a class="header-anchor" href="#_2-运行download-sh"><span>2.运行download.sh</span></a></h2><p>下载model,tokenizer文件。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># bash download.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20240523140020787.png?aliyun" alt="image-20240523140020787"></p><h2 id="_3-启动程序" tabindex="-1"><a class="header-anchor" href="#_3-启动程序"><span>3.启动程序</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">python3 main.py</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20240523140220661.png?aliyun" alt="image-20240523140220661"></p><p>用浏览器访问： IP+端口 http://127.0.0.1:5000</p><p>提一个问题：</p><p><img src="https://imgoss.xgss.net/picgo/image-20240523142743646.png?aliyun" alt="image-20240523142743646"></p><p>log会有响应的日志：</p><p><img src="https://imgoss.xgss.net/picgo/image-20240523142824732.png?aliyun" alt="image-20240523142824732"></p><p>再用top看看负载，CPU占用10%内存，占用9.5%，基本还能运行。</p><p><img src="https://imgoss.xgss.net/picgo/image-20240523140501864.png?aliyun" alt="image-20240523140501864"></p><h1 id="安装宝塔面板" tabindex="-1"><a class="header-anchor" href="#安装宝塔面板"><span>安装宝塔面板</span></a></h1><p>宝塔面板（BT Panel）是一款服务器管理软件，支持Linux系统，可以通过Web端轻松管理服务器，提升运维效率。它集成了建站、运维、安全等功能，可以帮助用户轻松管理服务器，降低运维难度。</p><p>搭建宝塔面板</p><p>进入宝塔官网 https://www.bt.cn/new/download.html</p><p>选择适合的系统脚本</p><p><img src="https://imgoss.xgss.net/picgo/image-20240523152412114.png?aliyun" alt="image-20240523152412114"></p><h2 id="运行安装脚本" tabindex="-1"><a class="header-anchor" href="#运行安装脚本"><span>运行安装脚本</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># wget -O install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh &amp;&amp; sudo bash install.sh ed8484bec</span>
<span class="line">经过安装</span>
<span class="line">Command may disrupt existing ssh connections. Proceed with operation (y|n)? Firewall is active and enabled on system startup</span>
<span class="line">Default incoming policy changed to &#39;deny&#39;</span>
<span class="line">(be sure to update your rules accordingly)</span>
<span class="line">Firewall reloaded</span>
<span class="line">==================================================================</span>
<span class="line">Congratulations! Installed successfully!</span>
<span class="line">========================面板账户登录信息==========================</span>
<span class="line"></span>
<span class="line"> 外网面板地址: https://14.155.32.234:33161/f91c950f</span>
<span class="line"> 内网面板地址: https://192.168.1.22:33161/f91c950f</span>
<span class="line"> username: XXX</span>
<span class="line"> password: XXX</span>
<span class="line"> </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用浏览器打开</p><p><img src="https://imgoss.xgss.net/picgo/image-20240523154448933.png?aliyun" alt="image-20240523154448933"></p><p>同意协议之后，安装宝塔套件</p><p><img src="https://imgoss.xgss.net/picgo/image-20240523154630259.png?aliyun" alt="image-20240523154630259"></p><p>安装完成</p><p><img src="https://imgoss.xgss.net/picgo/image-20240523160730765.png?aliyun" alt="image-20240523160730765"></p><p>宝塔的命令行</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">(base) root@orangepiaipro:~# bt</span>
<span class="line">==================================宝塔面板命令行====================================</span>
<span class="line">(1) 重启面板服务                  (8) 改面板端口                                   |</span>
<span class="line">(2) 停止面板服务                  (9) 清除面板缓存                                 |</span>
<span class="line">(3) 启动面板服务                  (10) 清除登录限制                                |</span>
<span class="line">(4) 重载面板服务                  (11) 设置是否开启IP + User-Agent验证             |</span>
<span class="line">(5) 修改面板密码                  (12) 取消域名绑定限制                            |</span>
<span class="line">(6) 修改面板用户名                (13) 取消IP访问限制                              |</span>
<span class="line">(7) 强制修改MySQL密码             (14) 查看面板默认信息                            |</span>
<span class="line">(22) 显示面板错误日志             (15) 清理系统垃圾                                |</span>
<span class="line">(23) 关闭BasicAuth认证            (16) 修复面板(检查错误并更新面板文件到最新版)    |</span>
<span class="line">(24) 关闭动态口令认证             (17) 设置日志切割是否压缩                        |</span>
<span class="line">(25) 设置是否保存文件历史副本     (18) 设置是否自动备份面板                        |</span>
<span class="line">(26) 关闭面板ssl                  (19) 关闭面板登录地区限制                        |</span>
<span class="line">(28) 修改面板安全入口             (29) 取消访问设备验证                            |</span>
<span class="line">(0) 取消                                                                           |</span>
<span class="line">====================================================================================</span>
<span class="line">请输入命令编号：</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装wordpress站点" tabindex="-1"><a class="header-anchor" href="#安装wordpress站点"><span>安装wordpress站点</span></a></h2><p>进入宝塔，点击软件商店---&gt;一键部署</p><p>我这里选择wordpress</p><p><img src="https://imgoss.xgss.net/picgo/image-20240523172942530.png?aliyun" alt="image-20240523172942530"></p><p>使用 www.wp.com 搭建，这个域名在测试环境可以绑定hosts</p><p><img src="https://imgoss.xgss.net/picgo/image-20240523173156438.png?aliyun" alt="image-20240523173156438"></p><p>点击“提交”会报错，</p><h2 id="解决报错undefined-symbol-lua-getexdata" tabindex="-1"><a class="header-anchor" href="#解决报错undefined-symbol-lua-getexdata"><span>解决报错undefined symbol: lua_getexdata</span></a></h2><p>应该是nginx编译 Lua 版本不arm的</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/www/server/nginx/sbin/nginx: symbol lookup error: /www/server/nginx/sbin/nginx: undefined symbol: lua_getexdata</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>切换nginx版本</p><p>点击网站---&gt;nginx ---&gt;切换版本</p><p>把安装的1.24的nginx改成 1.23</p><p><img src="https://imgoss.xgss.net/picgo/image-20240523182921362.png?aliyun" alt="image-20240523182921362"></p><p><img src="https://imgoss.xgss.net/picgo/image-20240523182751048.png?aliyun" alt="image-20240523182751048"></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">nginx -t</span>
<span class="line">nginx: [emerg] unknown directive &quot;lua_package_path&quot; in /www/server/nginx/conf/nginx.conf:28</span>
<span class="line">nginx: configuration file /www/server/nginx/conf/nginx.conf test failed</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改配置</p><p><img src="https://imgoss.xgss.net/picgo/image-20240523183101513.png?aliyun" alt="image-20240523183101513"></p><h2 id="再次安装wordpress站点" tabindex="-1"><a class="header-anchor" href="#再次安装wordpress站点"><span>再次安装wordpress站点</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/image-20240523183659031.png?aliyun" alt="image-20240523183659031"></p><p><img src="https://imgoss.xgss.net/picgo/image-20240523183709966.png?aliyun" alt="image-20240523183709966"></p><p>绑定hosts访问</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">192.168.1.22 www.testwp.com</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>使用浏览器访问安装wordpress系统</p><p><img src="https://imgoss.xgss.net/picgo/image-20240523183818003.png?aliyun" alt="image-20240523183818003"></p><p>输入数据库和数据库用户名密码等</p><p><img src="https://imgoss.xgss.net/picgo/image-20240523183915418.png?aliyun" alt="image-20240523183915418"></p><p>填写站点信息：</p><p><img src="https://imgoss.xgss.net/picgo/image-20240523184017922.png?aliyun" alt="image-20240523184017922"></p><p>安装完成，这样就可以用宝塔工具搭建各种的WEB站点了。</p><p>当然还可以用宝塔的图形界面使用Docker搭建各种的服务，对于哪些没有代码能力的人也是一种很友好的。</p><h1 id="结语" tabindex="-1"><a class="header-anchor" href="#结语"><span>结语</span></a></h1><p>本文只是介绍了用香橙派AIpro部署大语言模型和安装宝塔搭建web环境。</p><p>香橙派AIpro 支持Ubuntu、openEuler等操作系统，也可以作为一个学习Linux的有力工具。也能够满足大多数AI算法原型验证、推理应用开发的需求。</p><p>也可以用于智能家居设备的控制和管理，等等香橙派AIpro还有很多的玩法。</p><p>如果你有这样的小玩意你会做什么呢？</p>`,177)]))}const c=n(l,[["render",p]]),t=JSON.parse('{"path":"/NAS/%E9%A6%99%E6%A9%99%E6%B4%BE%E6%95%99%E7%A8%8B1.html","title":"用香橙派AIpro部署大模型、安装宝塔搭建私有随身WEB开发环境","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"NAS/香橙派教程1.md"}');export{c as comp,t as data};
