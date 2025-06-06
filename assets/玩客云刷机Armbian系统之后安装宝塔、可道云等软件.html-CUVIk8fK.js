import{_ as e,c as n,b as a,o as i}from"./app-BEL8OELx.js";const l={};function d(t,s){return i(),n("div",null,s[0]||(s[0]=[a(`<h1 id="玩客云刷机armbian系统之后安装宝塔、可道云等软件" tabindex="-1"><a class="header-anchor" href="#玩客云刷机armbian系统之后安装宝塔、可道云等软件"><span>玩客云刷机Armbian系统之后安装宝塔、可道云等软件</span></a></h1><h2 id="系统优化" tabindex="-1"><a class="header-anchor" href="#系统优化"><span>系统优化</span></a></h2><p>Armbian刷好后，我们对其进行一些优化操作。首次登录需要更改密码和创建用户。默认root用户,密码：1234</p><h3 id="_1-修改密码" tabindex="-1"><a class="header-anchor" href="#_1-修改密码"><span>1.修改密码</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">passwd root</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_2-修改时区" tabindex="-1"><a class="header-anchor" href="#_2-修改时区"><span>2.修改时区</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">rm -rf /etc/localtime</span>
<span class="line">ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime</span>
<span class="line">echo Etc/UTC &gt; /etc/timezone</span>
<span class="line">date 查看时间</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-换软件源" tabindex="-1"><a class="header-anchor" href="#_3-换软件源"><span>3.换软件源</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 备份原文件</span>
<span class="line">cp /etc/apt/sources.list.d/armbian.list /etc/apt/sources.list.d/armbian.list.bak</span>
<span class="line"></span>
<span class="line"># 清华源(以下是一条命令复制完整)</span>
<span class="line">sudo tee /etc/apt/sources.list.d/armbian.list &lt;&lt;-&#39;EOF&#39;</span>
<span class="line">deb https://mirrors.tuna.tsinghua.edu.cn/armbian/ stretch main stretch-utils stretch-desktop</span>
<span class="line">EOF</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"># 备份原文件</span>
<span class="line">cp /etc/apt/sources.list /etc/apt/sources.list.bak</span>
<span class="line"></span>
<span class="line"># 中科大源(以下是一条命令复制完整)</span>
<span class="line">sudo tee /etc/apt/sources.list &lt;&lt;-&#39;EOF&#39;</span>
<span class="line">deb http://mirrors.ustc.edu.cn/debian stretch main contrib non-free</span>
<span class="line">deb http://mirrors.ustc.edu.cn/debian stretch-updates main contrib non-free</span>
<span class="line">deb http://mirrors.ustc.edu.cn/debian stretch-backports main contrib non-free</span>
<span class="line">deb http://mirrors.ustc.edu.cn/debian-security/ stretch/updates main contrib non-free</span>
<span class="line">EOF</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-更新软件" tabindex="-1"><a class="header-anchor" href="#_4-更新软件"><span>4.更新软件</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">apt-get update &amp;&amp; apt-get upgrade</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20221020233903873.png?aliyun" alt="image-20221020233903873"></p><h2 id="固定ip" tabindex="-1"><a class="header-anchor" href="#固定ip"><span>固定IP</span></a></h2><p>由于安装完成之后玩客云的IP（192.168.124.7）是路由器自动获取的，这里在把玩客云的ip改成固定的，方便管理。</p><p><img src="https://imgoss.xgss.net/picgo/image-20221020112103701.png?aliyun" alt="image-20221020112103701"></p><p>参考： https://zhuanlan.zhihu.com/p/556064376</p><p>1.输入 ifconfig 命令并回车，主要看看系统这次开机之后生成的mac地址是什么：</p><p>记下这个mac地址： 00:22:82:4f:7c:e9</p><p>2.输入这个命令并回车，就是打开并修改网络配置文件interfaces：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">nano /etc/network/interfaces</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>修改如下</p><p>修改成我这个样子，静态IP、网关、默认dns需要你自己根据情况修改，然后mac地址要改成前面查到的。</p><p>有一行必须需要加上：pre-up /sbin/ifconfig eth0 mtu 3838</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">allow-hotplug eth0</span>
<span class="line">no-auto-down eth0</span>
<span class="line">iface eth0 inet static</span>
<span class="line">hwaddress ether 00:22:82:4f:7c:e9</span>
<span class="line">pre-up ifconfig eth0 hw ether 00:22:82:4f:7c:e9</span>
<span class="line">address 192.168.124.7</span>
<span class="line">netmask 255.255.255.0</span>
<span class="line">gateway 192.168.124.1</span>
<span class="line">dns-nameservers 192.168.124.1 114.114.114.114</span>
<span class="line">pre-up /sbin/ifconfig eth0 mtu 3838</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20221020135619450.png?aliyun" alt="image-20221020135619450"></p><p>四、还有个默认的配置文件interfaces.default也需要修改成上面那个一样 输入命令并回车：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">nano</span> /etc/network/interfaces.default</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>把内容修改成和上面那个文件一样：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">allow-hotplug eth0 </span>
<span class="line">no-auto-down eth0 </span>
<span class="line">iface eth0 inet static</span>
<span class="line">hwaddress ether 00:22:82:4f:7c:e9</span>
<span class="line">pre-up ifconfig eth0 hw ether 00:22:82:4f:7c:e9</span>
<span class="line">address 192.168.124.7</span>
<span class="line">netmask 255.255.255.0</span>
<span class="line">gateway 192.168.124.1</span>
<span class="line">dns-nameservers 192.168.124.1 114.114.114.114</span>
<span class="line">pre-up /sbin/ifconfig eth0 mtu 3838</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改完后按Ctrl+O保存，再按Ctrl+X退出</p><p>再重启玩客云</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">reboot</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>待玩客云开机后，输入命令并回车查看mac地址和ip地址是否变化，没变化就成功了</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">ifconfig</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="查看系统版本" tabindex="-1"><a class="header-anchor" href="#查看系统版本"><span>查看系统版本</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># cat /etc/debian_version </span>
<span class="line">9.9</span>
<span class="line"># cat /etc/issue</span>
<span class="line">Debian GNU/Linux 9 \\n \\l</span>
<span class="line"></span>
<span class="line"># cat /etc/os-release </span>
<span class="line"></span>
<span class="line">安装工具软件也行，# apt-get install -y lsb-release 此处略过</span>
<span class="line"># lsb_release -a</span>
<span class="line"></span>
<span class="line"># uname -a</span>
<span class="line"></span>
<span class="line"># arch</span>
<span class="line"></span>
<span class="line"># dpkg</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="挂载硬盘" tabindex="-1"><a class="header-anchor" href="#挂载硬盘"><span>挂载硬盘</span></a></h2><p>为什么要挂载硬盘，因为玩客云自带存储只有8G,系统已经用掉30%，所剩空间不多。安装可道云就是为了下载和存文件，不通过外置硬盘扩大存储空间的话还能叫云盘吗？这里我准备了一张64GB的TF卡，让玩客云开机自动挂载硬盘。 SSH连上玩客云，输入fdisk -l命令查看</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 显示如下内容，其中/dev/mmcblk0是我64G的TF卡</span>
<span class="line"></span>
<span class="line">root@OneCloud:/etc/apt# fdisk -l</span>
<span class="line">Disk /dev/mmcblk0: 58.6 GiB, 62914560000 bytes, 122880000 sectors</span>
<span class="line">Device              Boot Start     End Sectors  Size Id Type</span>
<span class="line">/dev/mmcblk1p1      16065 14964479 14948415  7.1G 83 Linux</span>
<span class="line">/dev/mmcblk1boot1p1      16065 7727264 7711200  3.7G  b W95 FAT32</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我需要将TF卡存储空间给可道云用，先将它格式化成ext4格式</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">mkfs.ext4 /dev/mmcblk0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>格式化执行完成后，然后得到它的UUID准备做自动挂载工作，输入命令</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">blkid /dev/mmcblk0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>得到的内容如下：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/dev/mmcblk0: UUID=&quot;9495d4d6-c0a1-457a-8345-af6242502a82&quot; TYPE=&quot;ext4&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>其中的UUID就是我们需要用的，将硬盘挂载到/www/wwwroot下，用VI命令编辑/etc/fstab文件，在最后行追加下面内容,保存，下次重启就自动挂载了硬盘。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">vi /etc/fstab</span>
<span class="line">填写：</span>
<span class="line">UUID=9495d4d6-c0a1-457a-8345-af6242502a82   /www/wwwroot   ext4    defaults    0 0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="挂载ntfs格式硬盘" tabindex="-1"><a class="header-anchor" href="#挂载ntfs格式硬盘"><span>挂载NTFS格式硬盘</span></a></h2><p>我这里有一块闲置的ntfs格式的移动硬盘，不想格式化数据。直接挂载到 /www目录下，挂载方法跟上面类似，最主要是不格式化硬盘直接挂载，后续可能会出现什么问题。</p><p>查看系统所检测到的外置磁盘名称(这里用sda1):</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># lsblk</span>
<span class="line">NAME         MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT</span>
<span class="line">sda            8:0    0 298.1G  0 disk </span>
<span class="line">\`-sda1         8:1    0 298.1G  0 part </span>
<span class="line">sdb            8:16   1    15G  0 disk </span>
<span class="line">mmcblk0      179:0    0   7.3G  0 disk </span>
<span class="line">|-mmcblk0p1  179:1    0   122M  0 part /boot</span>
<span class="line">\`-mmcblk0p2  179:2    0   6.5G  0 part /</span>
<span class="line">mmcblk0boot0 179:16   0     4M  1 disk </span>
<span class="line">mmcblk0boot1 179:32   0     4M  1 disk </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中sda1为我的移动硬盘</p><p>在根目录新建一个目录用于挂载硬盘:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">mkdir /www</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>将新增的外置硬盘挂载映射到新建的目录中：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># mount /dev/sda1 /www</span>
<span class="line">The disk contains an unclean file system (0, 0).</span>
<span class="line">The file system wasn&#39;t safely closed on Windows. Fixing.</span>
<span class="line"></span>
<span class="line"># df -h|grep www</span>
<span class="line">/dev/sda1       299G   79G  220G  27% /www</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>挂载成功。</p><p>设置开机自动启动挂载：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">vi  /etc/fstab</span>
<span class="line">提现写</span>
<span class="line">/dev/sda1 /www  ntfs defaults 0 0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改填好好后，按: 键，输入 wq! 强制保存退出，然后输入命令强制刷新即可</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># mount  -a</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h1 id="docker相关" tabindex="-1"><a class="header-anchor" href="#docker相关"><span>docker相关</span></a></h1><h2 id="使用docker安装脚本" tabindex="-1"><a class="header-anchor" href="#使用docker安装脚本"><span>使用docker安装脚本</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">curl -fsSL https://get.docker.com -o get-docker.sh</span>
<span class="line">sh get-docker.sh --mirror Aliyun</span>
<span class="line">或者</span>
<span class="line">apt-get install docker.io</span>
<span class="line">apt install docker.io</span>
<span class="line"></span>
<span class="line">或者</span>
<span class="line">wget -qO- https://get.docker.com/ | sh</span>
<span class="line">启动：</span>
<span class="line">service docker start</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装可视面板" tabindex="-1"><a class="header-anchor" href="#安装可视面板"><span>安装可视面板</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker run --restart always --name fast -p 8081:8081 -d -v /var/run/docker.sock:/var/run/docker.sock wangbinxingkong/fast</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>安装完成后在浏览器访问 http://服务器IP地址或域名:8081</p><p>首次登录需要注册，注册成功后即可正常使用。</p><h3 id="装宝塔" tabindex="-1"><a class="header-anchor" href="#装宝塔"><span>装宝塔</span></a></h3><p>拉取镜像,ssh里面执行</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker pull centos:centos7</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>创建容器</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker run -tid --name baota -p 88:80 -p 8888:8888 --restart always centos:centos7</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>需要开放的端口自行拉回 -p 80:80 --name=baota其中baota是容器名称，可以更改成你想要的，容器名称注意不要和其他容器一样，会冲突</p><p>进入容器</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker exec -it baota /bin/bash</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>装宝塔</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">yum install -y wget &amp;&amp; wget -O install.sh http://download.bt.cn/install/install.sh&amp;&amp; sh install.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="青龙面板" tabindex="-1"><a class="header-anchor" href="#青龙面板"><span>青龙面板</span></a></h3><p>ssh里面执行</p><p>1.拉取镜像</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker pull whyour/qinglong:latest</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>2.创建容器</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker run -tid --name qinglong -p 5700:5700 --restart always whyour/qinglong:latest</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>然后就可以通过http://ip:5700访问面板了</p><p>默认账号：admin 密码：admin</p><h3 id="装-openwrt" tabindex="-1"><a class="header-anchor" href="#装-openwrt"><span>装 openwrt</span></a></h3><p>ssh里面执行</p><p>1.拉取镜像</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker pull xuanaimai/onecloud:21-05-29</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>2.创建容器</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker run -tid --name openwrt -p 80:80 --restart always xuanaimai/onecloud:21-05-29</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>启动成功后使用IP访问即可 密码是 password</p><p>需要开放的端口自行拉回 -p 80:80 --name=openwrt其中openwrt是容器名称，可以更改成你想要的，容器名称注意不要和其他容器一样，会冲突</p><h3 id="docker装openwrt" tabindex="-1"><a class="header-anchor" href="#docker装openwrt"><span>docker装openwrt</span></a></h3><p>下面是我找的别人docker装openwrt的教程 更新软件（非必要）</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">apt-get update &amp;&amp; apt-get upgrade</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>安装 Docker</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">apt install docker.io</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>打开网卡混杂模式</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">ip link set eth0 promisc on</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>创建网络</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker network create -d macvlan --subnet=192.168.0.0/24 --gateway=192.168.0.1 -o parent=eth0 macnet</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>[↑自己根据 玩客云 所在网段修改，如：玩客云IP:192.168.2.175，则192.168.1.0/24 改成 192.168.2.0/24，192.168.1.1改成主路由地址] 拉取 OpenWRT 镜像</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker pull xuanaimai/onecloud:21-05-29</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>创建容器</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker run -itd --name=OneCloud --restart=always --network=macnet --privileged=true xuanaimai/onecloud:21-05-29 /sbin/init</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>–name=OneCloud 其中OneCloud是容器名称，可以更改成你想要的，容器名称注意不要和其他容器一样，会冲突根据主路由 DHCP 分配里找到一个主机名叫 OpenWRT 的，复制它的IPv4 地址粘贴到浏览器就能进入 OpenWRT 了密码是 password</p><h1 id="宝塔面板" tabindex="-1"><a class="header-anchor" href="#宝塔面板"><span>宝塔面板</span></a></h1><p>为了省点内存这里我安装了5.9版本的宝塔面板，当然也可以安装7.0以上的版本。面板安装完大概要1个小时，进入面板安装LNMP服务更有长达4小时的等待时间。中途可能面板还无法访问，安装完就可以打开了，建议这个时候睡一觉醒来就好了。哈哈</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 宝塔面板5.9版本</span>
<span class="line">wget -O install.sh http://download.bt.cn/install/install-ubuntu.sh &amp;&amp; bash install.sh</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"># 宝塔面板7.0版本</span>
<span class="line">wget -O install.sh http://yangwenqing.com/files/Source/install_bt_ubuntu_7.0.sh &amp;&amp; bash install.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者安装最新版的</p><p>官网：https://bt.cn/new/download.html</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">wget -O install.sh http://download.bt.cn/install/install-ubuntu_6.0.sh &amp;&amp; bash install.sh ed8484bec</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20221020212618447.png?aliyun" alt="image-20221020212618447"></p><p>安装：</p><p><img src="https://imgoss.xgss.net/picgo/image-20221020212911224.png?aliyun" alt="image-20221020212911224"></p><p>启动失败！</p><p><img src="https://imgoss.xgss.net/picgo/image-20221020221124897.png?aliyun" alt="image-20221020221124897"></p><p>玩客云IP:8888 即可访问宝塔面板 安装宝塔面板中SSH可能会卡掉线，看不到宝塔面板的账号和密码，可以对面板进行重置密码</p><p>一步：<a href="https://www.bt.cn/btcode.html" target="_blank" rel="noopener noreferrer">宝塔Linux面板命令大全</a></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 修改面板密码，如要改成123456</span>
<span class="line">cd /www/server/panel &amp;&amp; python tools.py panel 123456</span>
<span class="line"></span>
<span class="line"># 执行重置密码后会显示用户名，复制登录即可</span>
<span class="line">a4zpobgr</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/fd78cf95b2132ad7bec71403cf29693e.png?aliyun" alt="img"></p><p>进入面板后将 Nginx PHP MySQL 三大服务安装上去,Nginx我安装了2次才安装成功，安装完就可以进行下一步的可道云安装</p><p><img src="https://imgoss.xgss.net/picgo/b4c9382d1c047089da4f1a1b204f3fe1.png?aliyun" alt="img"></p><h2 id="安装可道云" tabindex="-1"><a class="header-anchor" href="#安装可道云"><span>安装可道云</span></a></h2><p>宝塔面板一键部署源码内置有可道云，可以从这里进去安装。</p><p><img src="https://imgoss.xgss.net/picgo/12c71aaecd97e91631b1ed82a89f8360.png?aliyun" alt="img"></p><p>效果如下，嗯！还是挺流畅的。</p><h2 id="安装aria2" tabindex="-1"><a class="header-anchor" href="#安装aria2"><span>安装Aria2</span></a></h2><p>Aria2是一款自由、跨平台命令行界面的下载管理器，该软件根据GPLv2许可证进行分发。支持的下载协议有：HTTP、HTTPS、FTP、Bittorrent和Metalink。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">#逗比的Aria2脚本</span>
<span class="line">wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubiBackup/doubi/master/aria2.sh &amp;&amp; chmod +x aria2.sh &amp;&amp; bash aria2.sh</span>
<span class="line"></span>
<span class="line">#备用脚本</span>
<span class="line">wget -N --no-check-certificate https://yangwenqing.com/files/Source/aria2.sh &amp;&amp; chmod +x aria2.sh &amp;&amp; bash aria2.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装完成后，如果我们想修改密码、下载文件位置、端口的话，可以使用命令bash aria2.sh，再选择修改配置即可，这里建议使用该脚本配置自动更新BT-Tracker服务器，对下载BT有加成。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">root@OneCloud:~# bash aria2.sh</span>
<span class="line"></span>
<span class="line"> Aria2 一键安装管理脚本 [v1.1.9]</span>
<span class="line">  -- Toyo | doub.io/shell-jc4 --</span>
<span class="line"></span>
<span class="line">    0. 升级脚本</span>
<span class="line">       ————————————</span>
<span class="line">    1. 安装 Aria2</span>
<span class="line">    2. 更新 Aria2</span>
<span class="line">    3. 卸载 Aria2</span>
<span class="line">       ————————————</span>
<span class="line">    4. 启动 Aria2</span>
<span class="line">    5. 停止 Aria2</span>
<span class="line">    6. 重启 Aria2</span>
<span class="line">       ————————————</span>
<span class="line">    7. 修改 配置文件</span>
<span class="line">    8. 查看 配置信息</span>
<span class="line">    9. 查看 日志信息</span>
<span class="line">   10. 配置 自动更新 BT-Tracker服务器</span>
<span class="line">       ————————————</span>
<span class="line"></span>
<span class="line"> 当前状态: 已安装 并 已启动</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置aria2" tabindex="-1"><a class="header-anchor" href="#配置aria2"><span>配置Aria2</span></a></h3><p>去配置玩客云Aria2 将IP,端口跟密码填入</p><p><img src="https://imgoss.xgss.net/picgo/f66ab69d0aa494dcd259e04997089ab1.png?aliyun" alt="img"></p><p>测试下载 下载OneDrive上面的资源</p><p><img src="https://imgoss.xgss.net/picgo/aaebf39652010ef100fbad6d6ccda00b.png?aliyun" alt="img"></p><p><img src="https://imgoss.xgss.net/picgo/cee2a4055a01d2f452bda80f12ed955a.png?aliyun" alt="img"></p>`,140)]))}const p=e(l,[["render",d]]),c=JSON.parse('{"path":"/NAS/%E7%8E%A9%E5%AE%A2%E4%BA%91%E5%88%B7%E6%9C%BAArmbian%E7%B3%BB%E7%BB%9F%E4%B9%8B%E5%90%8E%E5%AE%89%E8%A3%85%E5%AE%9D%E5%A1%94%E3%80%81%E5%8F%AF%E9%81%93%E4%BA%91%E7%AD%89%E8%BD%AF%E4%BB%B6.html","title":"玩客云刷机Armbian系统之后安装宝塔、可道云等软件","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"NAS/玩客云刷机Armbian系统之后安装宝塔、可道云等软件.md"}');export{p as comp,c as data};
