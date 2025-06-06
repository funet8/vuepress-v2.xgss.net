import{_ as s,c as a,b as e,o as i}from"./app-BEL8OELx.js";const l={};function d(r,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h1 id="linux软件包管理" tabindex="-1"><a class="header-anchor" href="#linux软件包管理"><span>Linux软件包管理</span></a></h1><p>Linux系统如果需要安装软件怎么办？如何安装，大概有以下几种方式</p><p>1.二级制软件包管理（RPM 、YUM）</p><p>2.源代码包安装</p><p>3.脚本安装（Shell或Java脚本）</p><p>4.Debian系</p><p><img src="https://imgoss.xgss.net/picgo/linux-rpm.jpg?aliyun" alt="linux-rpm"></p><h2 id="rpm包管理" tabindex="-1"><a class="header-anchor" href="#rpm包管理"><span>RPM包管理</span></a></h2><p>RPM名称软件包： sudo-1.7.2pl-5.el5.i386.rpm</p><p>解释:</p><pre><code>软件名：sudo
版本号：1.7.2pl
发行号：5.el5
硬件平台：i386
</code></pre><h2 id="安装rpm包" tabindex="-1"><a class="header-anchor" href="#安装rpm包"><span>安装RPM包</span></a></h2><p>实例：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># rpm -ivh sudo-1.7.2pl-5.el5.i386.rpm</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><pre><code>-i 		【安装的时候显示安装进度】
-v		【详细信息】
-h		【安装进度】
-q		【查看软件包是否安装】	
-qa 	【查看所有软包】

-ivh：安装显示安装进度--install--verbose--hash
-Uvh：升级软件包--Update；
-qpl：列出RPM软件包内的文件信息[Query Package list]；
-qpi：列出RPM软件包的描述信息[Query Package install package(s)]；
-qf：查找指定文件属于哪个RPM软件包[Query File]；
-Va：校验所有的RPM软件包，查找丢失的文件[View Lost]；
-e：删除包
-a	查询软件包信息
-f	查询文件所属软件
-p  查询软件包
-l  显示软件包中的文件列表
-d  显示被标注为文档的文件列表
-c  显示被标注为配置文件的文件列表
-V	软件校验
</code></pre><h2 id="卸载rpm包" tabindex="-1"><a class="header-anchor" href="#卸载rpm包"><span>卸载RPM包</span></a></h2><pre><code># rpm -e sudo				【如果其他软件有依赖，可使用--nodeps强行卸载】
# rpm -e samba 			【提示失败】
# rpm -e --nodeps samba  	【强行卸载】
</code></pre><h2 id="rpm-查询安装包" tabindex="-1"><a class="header-anchor" href="#rpm-查询安装包"><span>rpm 查询安装包</span></a></h2><h3 id="查看文件隶属于的软件包-rpm-qf" tabindex="-1"><a class="header-anchor" href="#查看文件隶属于的软件包-rpm-qf"><span>查看文件隶属于的软件包（rpm -qf）</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># rpm -qf /etc/services</span>
<span class="line">setup-2.8.71-10.el7.noarch</span>
<span class="line"></span>
<span class="line"># rpm -qf /bin/ls</span>
<span class="line">coreutils-8.22-24.el7.x86_64</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查询软件包信息-rpm-qi" tabindex="-1"><a class="header-anchor" href="#查询软件包信息-rpm-qi"><span>查询软件包信息（rpm -qi）</span></a></h3><p>查询nginx包信息</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># rpm -qi nginx</span>
<span class="line">Name        : nginx</span>
<span class="line">Epoch       : 1</span>
<span class="line">Version     : 1.16.1</span>
<span class="line">Release     : 1.el7</span>
<span class="line">Architecture: x86_64</span>
<span class="line">Install Date: Wed 23 Oct 2019 04:46:38 PM CST</span>
<span class="line">Group       : Unspecified</span>
<span class="line">Size        : 1689960</span>
<span class="line">License     : BSD</span>
<span class="line">Signature   : RSA/SHA256, Fri 04 Oct 2019 06:38:33 AM CST, Key ID 6a2faea2352c64e5</span>
<span class="line">Source RPM  : nginx-1.16.1-1.el7.src.rpm</span>
<span class="line">Build Date  : Thu 03 Oct 2019 01:15:40 PM CST</span>
<span class="line">Build Host  : buildvm-13.phx2.fedoraproject.org</span>
<span class="line">Relocations : (not relocatable)</span>
<span class="line">Packager    : Fedora Project</span>
<span class="line">Vendor      : Fedora Project</span>
<span class="line">URL         : http://nginx.org/</span>
<span class="line">Bug URL     : https://bugz.fedoraproject.org/nginx</span>
<span class="line">Summary     : A high performance web server and reverse proxy server</span>
<span class="line">Description :</span>
<span class="line">Nginx is a web server and a reverse proxy server for HTTP, SMTP, POP3 and</span>
<span class="line">IMAP protocols, with a strong focus on high concurrency, performance and low</span>
<span class="line">memory usage.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看软件安装的绝对路径-rpm-ql" tabindex="-1"><a class="header-anchor" href="#查看软件安装的绝对路径-rpm-ql"><span>查看软件安装的绝对路径（rpm -ql）</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># rpm -ql nginx</span>
<span class="line">/etc/logrotate.d/nginx</span>
<span class="line">/etc/nginx/fastcgi.conf</span>
<span class="line">/etc/nginx/fastcgi.conf.default</span>
<span class="line">... ... 中间省略</span>
<span class="line">/usr/share/vim/vimfiles/syntax/nginx.vim</span>
<span class="line">/var/lib/nginx</span>
<span class="line">/var/lib/nginx/tmp</span>
<span class="line">/var/log/nginx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查询软件帮助文档-rpm-qd" tabindex="-1"><a class="header-anchor" href="#查询软件帮助文档-rpm-qd"><span>查询软件帮助文档(rpm -qd)</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># rpm -qd nginx</span>
<span class="line">/usr/share/doc/nginx-1.16.1/CHANGES</span>
<span class="line">/usr/share/doc/nginx-1.16.1/README</span>
<span class="line">/usr/share/doc/nginx-1.16.1/README.dynamic</span>
<span class="line">/usr/share/doc/nginx-1.16.1/UPGRADE-NOTES-1.6-to-1.10</span>
<span class="line">/usr/share/man/man3/nginx.3pm.gz</span>
<span class="line">/usr/share/man/man8/nginx-upgrade.8.gz</span>
<span class="line">/usr/share/man/man8/nginx.8.gz</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查询软件包配置文件-rpm-qc" tabindex="-1"><a class="header-anchor" href="#查询软件包配置文件-rpm-qc"><span>查询软件包配置文件(rpm -qc)</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># rpm -qc nginx</span>
<span class="line">/etc/logrotate.d/nginx</span>
<span class="line">/etc/nginx/fastcgi.conf</span>
<span class="line">/etc/nginx/fastcgi.conf.default</span>
<span class="line">/etc/nginx/fastcgi_params</span>
<span class="line">/etc/nginx/fastcgi_params.default</span>
<span class="line">/etc/nginx/koi-utf</span>
<span class="line">/etc/nginx/koi-win</span>
<span class="line">/etc/nginx/mime.types</span>
<span class="line">/etc/nginx/mime.types.default</span>
<span class="line">/etc/nginx/nginx.conf</span>
<span class="line">/etc/nginx/nginx.conf.default</span>
<span class="line">/etc/nginx/scgi_params</span>
<span class="line">/etc/nginx/scgi_params.default</span>
<span class="line">/etc/nginx/uwsgi_params</span>
<span class="line">/etc/nginx/uwsgi_params.default</span>
<span class="line">/etc/nginx/win-utf</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="md5校验软件" tabindex="-1"><a class="header-anchor" href="#md5校验软件"><span>md5校验软件</span></a></h3><p>md5校验软件，正常无任何提示，如果做过更改就会有提示。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">rpm -V sudo</span>
<span class="line">校验结果：	</span>
<span class="line">		S   	【文件大小】</span>
<span class="line">		L		【链接文件】</span>
<span class="line">		T		【文件创建时间】</span>
<span class="line">		D		【设备文件】</span>
<span class="line">		U   	【文件用户】</span>
<span class="line">		G    	【文件用户组】</span>
<span class="line">		M		【文件的权限】</span>
<span class="line">	</span>
<span class="line">对文件进行校验值： </span>
<span class="line"># md5sum</span>
<span class="line"># md5sum /etc/services		</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看软件包是否安装-rpm-q" tabindex="-1"><a class="header-anchor" href="#查看软件包是否安装-rpm-q"><span>查看软件包是否安装(rpm -q)</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># rpm -q webmin</span>
<span class="line">package webmin is not installed</span>
<span class="line"># rpm -q nginx</span>
<span class="line">nginx-1.16.1-1.el7.x86_64</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="跟samba相关的软件-rpm-qa" tabindex="-1"><a class="header-anchor" href="#跟samba相关的软件-rpm-qa"><span>跟samba相关的软件(rpm -qa)</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># rpm -qa | grep samba</span></span>
<span class="line">samba-client-libs-4.10.4-11.el7_8.x86_64</span>
<span class="line">samba-common-libs-4.10.4-11.el7_8.x86_64</span>
<span class="line">samba-4.10.4-11.el7_8.x86_64</span>
<span class="line">samba-common-4.10.4-11.el7_8.noarch</span>
<span class="line">samba-common-tools-4.10.4-11.el7_8.x86_64</span>
<span class="line">samba-client-4.10.4-11.el7_8.x86_64</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="不安装软件包中的文档" tabindex="-1"><a class="header-anchor" href="#不安装软件包中的文档"><span>不安装软件包中的文档</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">--excludedocs</span>
<span class="line"># rpm -ivh --excludedocs 软件名 </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="将软件安装到指定路径下" tabindex="-1"><a class="header-anchor" href="#将软件安装到指定路径下"><span>将软件安装到指定路径下</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">--prefix PATH</span>
<span class="line">例如：rpm -ivh --prefix=/user/local/sudo 软件名 </span>
<span class="line"></span>
<span class="line">--test					【只对软件包进行测试】 </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="重装软件" tabindex="-1"><a class="header-anchor" href="#重装软件"><span>重装软件</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">--replacepkgs</span>
<span class="line">例如：</span>
<span class="line"># rpm -ivh --replacepkgs 软件名</span>
<span class="line">文件冲突：如果要安装的软件包中有一个文件已在安装其他软件包时安装会出现以下错误先</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="要rpm忽略文件错误信息" tabindex="-1"><a class="header-anchor" href="#要rpm忽略文件错误信息"><span>要RPM忽略文件错误信息</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">--replacefiles			【要RPM忽略文件错误信息】</span>
<span class="line">例如：rpm -ivh --replacefiles 软件名</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="依赖关系" tabindex="-1"><a class="header-anchor" href="#依赖关系"><span>依赖关系</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">未解决依赖关系错误。依赖关系，一般安装之后不会解决问题。</span>
<span class="line">--nodeps 			【强行安装】</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="升级软件" tabindex="-1"><a class="header-anchor" href="#升级软件"><span>升级软件</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">rpm -Uvh 软件名</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="软件包文件提取" tabindex="-1"><a class="header-anchor" href="#软件包文件提取"><span>软件包文件提取</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">解压所有文件到当前目录</span>
<span class="line">#rpm2cpio initscipt-8.45.....i386.rpm | cpio -idv</span>
<span class="line"></span>
<span class="line">解压指定文件到当前目录</span>
<span class="line">#rpm2cpio initscipt-8.45.....i386.rpm | cpio -idv ./etc/inittab</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="yum包管理" tabindex="-1"><a class="header-anchor" href="#yum包管理"><span>YUM包管理</span></a></h2><p>Yum是由Duke University团队修改Yellow Dog Linux的Yellow Dog Updater开发而成，是一个基于RPM包管理的字符前端软件包管理器。能够从指定的服务器自动下载RPM包并且安装，可以处理依赖性关系，并且一次安装所有依赖的软件包，无须繁琐地一次次下载、安装。被Yellow Dog Linux本身，以及Fedora、Red Hat Enterprise Linux采用。</p><p>yum应用的好处</p><p><strong>1.自动解决软件包依赖关系</strong></p><p><strong>2.方便软件包升级</strong></p><h3 id="yum选项" tabindex="-1"><a class="header-anchor" href="#yum选项"><span>yum选项</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># yum install				【安装】</span>
<span class="line"></span>
<span class="line"># yum check-update		【检测升级】</span>
<span class="line"></span>
<span class="line"># yum update				【升级】</span>
<span class="line"></span>
<span class="line"># yum list				【软件包查询】</span>
<span class="line"></span>
<span class="line"># yum info				【软件包信息】</span>
<span class="line"></span>
<span class="line"># yum remove 				【卸载】</span>
<span class="line"></span>
<span class="line"># yum -help  man yum		【帮助】	</span>
<span class="line"></span>
<span class="line">列出软件:</span>
<span class="line">yum list | more </span>
<span class="line">yum list | grep sudo</span>
<span class="line"></span>
<span class="line">查询信息:</span>
<span class="line">yum info sudo</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><h2 id="源代码包安装" tabindex="-1"><a class="header-anchor" href="#源代码包安装"><span>源代码包安装</span></a></h2><p>源代码包的好处</p><p><strong>1.适应于大多数unix操作系统。</strong></p><p><strong>2.源代码包安装灵活，可定制。</strong></p><p><strong>3.卸载方便：先关闭进程，删除文件夹。</strong></p><h3 id="应用举例安装proftpd" tabindex="-1"><a class="header-anchor" href="#应用举例安装proftpd"><span>应用举例安装proftpd</span></a></h3><p>大致分为四步</p><p>1.下载所需要的软件版本。2.解压。 3.配置指定安装目录。 4.编译。 5.安装。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">解压解包:</span>
<span class="line"># tar -xzvf proftpd-1.3.3d.tar.gz</span>
<span class="line"># cd proftpd-1.3.3d</span>
<span class="line">配置，指定安装目录，方面管理:</span>
<span class="line"># ./configure --prefix==/user/local/proftpd</span>
<span class="line">编译</span>
<span class="line"># make</span>
<span class="line">安装</span>
<span class="line"># make install</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="apt包管理" tabindex="-1"><a class="header-anchor" href="#apt包管理"><span>APT包管理</span></a></h2><p>Debian系(乌班图系统 ubuntu )</p><p>APT:是Debian及其派生的Linux软件包管理器。APT可以自动下载，配置，安装二进制或者源代码格式的软件包，因此简化了Unix系统上管理软件的过程。APT最早被设计成dpkg的前端，用来处理deb格式的软件包。现在经过APT-RPM组织修改，APT已经可以安装在支持RPM的系统管理RPM包。</p><p>dpkg：最初由Debian使用，现在由Ubuntu使用。使用.deb格式，是第一个拥有广为人知的依赖性解决工具APT。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">搜索软件包 		apt-cache search</span>
<span class="line">软件包信息 		apt-cache show</span>
<span class="line">安装 			apt-get install (reinstall   、-f)</span>
<span class="line">删除 			apt-get remove  (autoremove、--purge)</span>
<span class="line">更新软件源 		apt-get update</span>
<span class="line">更新已安装包	apt-get upgrade</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,72)]))}const c=s(l,[["render",d]]),t=JSON.parse('{"path":"/linux-basis/Linux%E8%BD%AF%E4%BB%B6%E7%AE%A1%E7%90%86.html","title":"Linux软件包管理","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"linux-basis/Linux软件管理.md"}');export{c as comp,t as data};
