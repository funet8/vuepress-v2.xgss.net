import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,a,o as l}from"./app-CkVikb64.js";const e={};function p(d,s){return l(),i("div",null,s[0]||(s[0]=[a(`<h1 id="linux性能优化" tabindex="-1"><a class="header-anchor" href="#linux性能优化"><span>Linux性能优化</span></a></h1><h2 id="一、优化内核相关参数-⚙️" tabindex="-1"><a class="header-anchor" href="#一、优化内核相关参数-⚙️"><span>一、优化内核相关参数 ⚙️</span></a></h2><ul><li>内存管理参数 <ul><li><code>vm.swappiness</code>：控制系统使用swap的倾向，默认60。若内存充足可调低至10，减少swap依赖。</li><li><code>vm.dirty_ratio</code> / <code>vm.dirty_background_ratio</code>：控制写缓存刷新策略，避免高峰期大量I/O。推荐设置为20/10。</li></ul></li><li>文件系统与句柄 <ul><li><code>fs.file-max</code>：系统允许的最大文件句柄数，适合高并发应用，常调至10万以上。</li></ul></li><li>网络参数 <ul><li><code>net.core.somaxconn</code>：最大连接队列长度，默认128，建议调高至1024或更高以支持高并发服务。</li></ul></li><li>持久化方法 <ul><li>将参数写入<code>/etc/sysctl.conf</code>并执行<code>sysctl -p</code>加载</li></ul></li></ul><h2 id="二、提高资源限制上限-📈" tabindex="-1"><a class="header-anchor" href="#二、提高资源限制上限-📈"><span>二、提高资源限制上限 📈</span></a></h2><ul><li><p>文件句柄限制</p><ul><li><p>使用<code>ulimit -n</code>查看当前限制，默认可能只有1024。</p></li><li><p>在</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>/etc/security/limits.conf</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>中配置：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">* soft nofile 65535</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">* hard nofile 65535</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>进程数限制</p><ul><li><code>ulimit -u</code>控制单用户最大进程数，可根据应用需求调高。</li></ul></li><li><p>栈大小与内存限制</p><ul><li><code>ulimit -s</code>调整栈大小，避免递归程序栈溢出。</li><li><code>ulimit -m</code>可限制最大内存使用，通常不建议过低。</li></ul></li><li><p>应用场景</p><ul><li>高并发Web服务、数据库、消息队列等场景需显著提高这些限制</li></ul></li></ul><h2 id="三、磁盘调度策略-💽" tabindex="-1"><a class="header-anchor" href="#三、磁盘调度策略-💽"><span>三、磁盘调度策略 💽</span></a></h2><p>Linux支持多种I/O调度器，不同场景选择不同策略：</p><ul><li><p>noop</p><ul><li>简单FIFO队列，不做排序，适合SSD等无需优化寻道的设备。</li></ul></li><li><p>deadline</p><ul><li>保证请求在一定时间内完成，适合低延迟应用。</li></ul></li><li><p>cfq（已逐步淘汰）</p><ul><li>针对多进程公平调度，适合桌面环境。</li></ul></li><li><p>mq-deadline / kyber（现代内核）</p><ul><li>针对多队列设备优化，适合NVMe SSD和高并发场景。</li></ul></li><li><p>切换方法</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">cat</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /sys/block/sda/queue/scheduler</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">   # 查看当前调度器</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> deadline</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &gt; </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">/sys/block/sda/queue/scheduler</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>最佳实践</p><ul><li>SSD：<code>noop</code>或<code>mq-deadline</code></li><li>HDD：<code>deadline</code></li><li>高并发数据库：<code>deadline</code>或<code>kyber</code></li></ul></li></ul><h2 id="一键优化脚本" tabindex="-1"><a class="header-anchor" href="#一键优化脚本"><span>一键优化脚本</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span># Linux性能优化一键脚本</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set -e</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;&gt;&gt;&gt; 开始Linux性能优化...&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 一、优化内核参数 ###</span></span>
<span class="line"><span>echo &quot;&gt;&gt;&gt; 优化内核参数...&quot;</span></span>
<span class="line"><span>cat &lt;&lt;EOF &gt;&gt; /etc/sysctl.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 内存管理</span></span>
<span class="line"><span>vm.swappiness = 10</span></span>
<span class="line"><span>vm.dirty_ratio = 20</span></span>
<span class="line"><span>vm.dirty_background_ratio = 10</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 文件系统</span></span>
<span class="line"><span>fs.file-max = 2097152</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 网络优化</span></span>
<span class="line"><span>net.core.somaxconn = 1024</span></span>
<span class="line"><span>net.ipv4.tcp_tw_reuse = 1</span></span>
<span class="line"><span>net.ipv4.tcp_fin_timeout = 15</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sysctl -p</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 二、提高资源限制 ###</span></span>
<span class="line"><span>echo &quot;&gt;&gt;&gt; 提高资源限制...&quot;</span></span>
<span class="line"><span>cat &lt;&lt;EOF &gt;&gt; /etc/security/limits.conf</span></span>
<span class="line"><span>* soft nofile 65535</span></span>
<span class="line"><span>* hard nofile 65535</span></span>
<span class="line"><span>* soft nproc 65535</span></span>
<span class="line"><span>* hard nproc 65535</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ulimit -n 65535</span></span>
<span class="line"><span>ulimit -u 65535</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 三、磁盘调度策略 ###</span></span>
<span class="line"><span>echo &quot;&gt;&gt;&gt; 设置磁盘调度策略...&quot;</span></span>
<span class="line"><span>for disk in $(lsblk -nd --output NAME); do</span></span>
<span class="line"><span>    if [[ -e /sys/block/$disk/queue/scheduler ]]; then</span></span>
<span class="line"><span>        echo &quot;deadline&quot; &gt; /sys/block/$disk/queue/scheduler</span></span>
<span class="line"><span>        echo &quot;&gt;&gt;&gt; $disk 调度器已设置为 deadline&quot;</span></span>
<span class="line"><span>    fi</span></span>
<span class="line"><span>done</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;&gt;&gt;&gt; 优化完成！请重启服务或系统以确保生效。&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><ul><li>内核参数优化 → 控制内存/网络行为，减少瓶颈。</li><li>资源限制提升 → 保证高并发应用不因系统默认限制崩溃。</li><li>磁盘调度策略 → 根据硬件特性选择最优算法，提升I/O性能。</li></ul>`,12)]))}const r=n(e,[["render",p]]),u=JSON.parse('{"path":"/%E6%99%BA%E7%BB%B4%E6%94%BB%E5%9F%8E%E7%8B%AE/S16/8.Linux%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96.html","title":"Linux性能优化","lang":"en-US","frontmatter":{},"git":{"createdTime":1767924197000,"updatedTime":1767924197000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}]},"readingTime":{"minutes":2.33,"words":699},"filePathRelative":"智维攻城狮/S16/8.Linux性能优化.md"}');export{r as comp,u as data};
