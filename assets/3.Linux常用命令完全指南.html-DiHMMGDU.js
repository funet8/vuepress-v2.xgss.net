import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as e}from"./app-BiQR_lPj.js";const l={};function p(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h1 id="linux常用命令完全指南-从入门到精通-一篇文章搞定所有场景" tabindex="-1"><a class="header-anchor" href="#linux常用命令完全指南-从入门到精通-一篇文章搞定所有场景"><span>Linux常用命令完全指南：从入门到精通，一篇文章搞定所有场景</span></a></h1><h2 id="引言-为什么你需要掌握这些linux命令" tabindex="-1"><a class="header-anchor" href="#引言-为什么你需要掌握这些linux命令"><span>引言：为什么你需要掌握这些Linux命令？</span></a></h2><p>作为一名运维工程师，我在过去10年里处理过无数生产环境事故，其中80%的问题都是通过几个核心Linux命令快速定位和解决的。今天，我将把这些年积累的Linux命令精华全部分享给你，让你少走5年弯路。</p><p>无论你是刚入行的运维新手，还是想提升效率的老鸟，这篇文章都会给你带来实实在在的价值。我会用最实战的角度，配合真实的生产场景，让你不仅会用命令，更懂得什么时候用、怎么用最高效。</p><h2 id="一、文件和目录操作-运维日常的基石" tabindex="-1"><a class="header-anchor" href="#一、文件和目录操作-运维日常的基石"><span>一、文件和目录操作：运维日常的基石</span></a></h2><h3 id="_1-1-基础导航命令" tabindex="-1"><a class="header-anchor" href="#_1-1-基础导航命令"><span>1.1 基础导航命令</span></a></h3><p>在Linux世界里，一切皆文件。掌握文件系统的导航是你的第一步。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># pwd - 显示当前工作目录</span></span>
<span class="line"><span>$ pwd</span></span>
<span class="line"><span>/home/admin/logs</span></span>
<span class="line"><span></span></span>
<span class="line"><span># cd - 切换目录（这些技巧90%的人不知道）</span></span>
<span class="line"><span>$ cd -           # 快速返回上一个工作目录</span></span>
<span class="line"><span>$ cd ~username   # 进入指定用户的home目录</span></span>
<span class="line"><span>$ cd !$          # 进入上一条命令的最后一个参数（超实用）</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ls - 列出目录内容（高级用法）</span></span>
<span class="line"><span>$ ls -lhtr       # 按时间倒序显示，人类可读格式</span></span>
<span class="line"><span>$ ls -ld */      # 只显示目录</span></span>
<span class="line"><span>$ ls -la | grep &quot;^d&quot;  # 只显示目录（另一种方法）</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>实战技巧</strong>：当你在排查生产问题时，经常需要在多个日志目录间切换。使用 <code>pushd</code> 和 <code>popd</code> 可以维护一个目录栈：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>$ pushd /var/log/nginx    # 保存当前目录并跳转</span></span>
<span class="line"><span>$ pushd /var/log/mysql    </span></span>
<span class="line"><span>$ dirs -v                  # 查看目录栈</span></span>
<span class="line"><span>$ popd                     # 返回上一个目录</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-文件操作进阶" tabindex="-1"><a class="header-anchor" href="#_1-2-文件操作进阶"><span>1.2 文件操作进阶</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># find - 查找文件（运维必备神器）</span></span>
<span class="line"><span>$ find /var/log -name &quot;*.log&quot; -mtime +7 -size +100M -execrm {} \\;</span></span>
<span class="line"><span># 删除7天前大于100M的日志文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ find . -type f -name &quot;*.conf&quot; -exec grep -l &quot;error&quot; {} \\;</span></span>
<span class="line"><span># 查找包含&quot;error&quot;的配置文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ find /data -type f -mmin -5</span></span>
<span class="line"><span># 查找5分钟内修改过的文件（排查问题神器）</span></span>
<span class="line"><span></span></span>
<span class="line"><span># cp/mv/rm 的安全用法</span></span>
<span class="line"><span>$ cp -av source/ dest/     # 保留所有属性，显示详细信息</span></span>
<span class="line"><span>$ mv -i file1 file2        # 交互式移动，避免误操作</span></span>
<span class="line"><span>$ rm -I *.log              # 删除多个文件时提示确认</span></span>
<span class="line"><span></span></span>
<span class="line"><span># rsync - 高效同步（比cp/scp强大100倍）</span></span>
<span class="line"><span>$ rsync -avzP --delete source/ dest/</span></span>
<span class="line"><span># -a: 归档模式  -v: 详细输出  -z: 压缩传输  -P: 显示进度</span></span>
<span class="line"><span># --delete: 删除目标多余文件（慎用）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ rsync -avz --exclude=&#39;*.log&#39; --exclude=&#39;cache/&#39;source/ dest/</span></span>
<span class="line"><span># 排除特定文件或目录</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-文件内容查看技巧" tabindex="-1"><a class="header-anchor" href="#_1-3-文件内容查看技巧"><span>1.3 文件内容查看技巧</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># less/more 的高级用法</span></span>
<span class="line"><span>$ less +F /var/log/messages   # 类似tail -f，但可以随时切换</span></span>
<span class="line"><span># 按 Ctrl+C 停止跟踪，按 F 继续跟踪</span></span>
<span class="line"><span></span></span>
<span class="line"><span># head/tail 组合技</span></span>
<span class="line"><span>$ tail -n +100 file.txt | head -n 50</span></span>
<span class="line"><span># 显示文件第100-150行</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ tail -f /var/log/nginx/access.log | grep --line-buffered &quot;ERROR&quot;</span></span>
<span class="line"><span># 实时过滤错误日志</span></span>
<span class="line"><span></span></span>
<span class="line"><span># cat 的特殊用法</span></span>
<span class="line"><span>$ cat -A file.txt    # 显示所有特殊字符（调试格式问题）</span></span>
<span class="line"><span>$ cat &gt; file.txt &lt;&lt; EOF</span></span>
<span class="line"><span>多行内容</span></span>
<span class="line"><span>直接写入</span></span>
<span class="line"><span>EOF</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、文本处理三剑客-grep、sed、awk" tabindex="-1"><a class="header-anchor" href="#二、文本处理三剑客-grep、sed、awk"><span>二、文本处理三剑客：grep、sed、awk</span></a></h2><p>这三个命令是Linux文本处理的核心，掌握它们等于掌握了数据处理的瑞士军刀。</p><h3 id="_2-1-grep-文本搜索利器" tabindex="-1"><a class="header-anchor" href="#_2-1-grep-文本搜索利器"><span>2.1 grep - 文本搜索利器</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># grep 高级技巧</span></span>
<span class="line"><span>$ grep -B 3 -A 3 &quot;ERROR&quot; app.log   # 显示匹配行的前后3行</span></span>
<span class="line"><span>$ grep -v &quot;^#\\|^$&quot; config.conf     # 过滤注释和空行</span></span>
<span class="line"><span>$ grep -r --include=&quot;*.java&quot; &quot;TODO&quot; .  # 递归搜索特定文件类型</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 实用正则表达式</span></span>
<span class="line"><span>$ grep -E &quot;^[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}&quot; access.log</span></span>
<span class="line"><span># 匹配IP地址</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ grep -oP &#39;(?&lt;=user_id=)[0-9]+&#39; access.log | sort -u</span></span>
<span class="line"><span># 提取所有唯一的user_id</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 性能优化技巧</span></span>
<span class="line"><span>$ LC_ALL=C grep pattern file    # 使用C语言环境，提速30%</span></span>
<span class="line"><span>$ grep -F &quot;fixed_string&quot; file   # 固定字符串搜索，更快</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-sed-流编辑器" tabindex="-1"><a class="header-anchor" href="#_2-2-sed-流编辑器"><span>2.2 sed - 流编辑器</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># sed 实战案例</span></span>
<span class="line"><span>$ sed -i.bak &#39;s/old/new/g&#39; file.txt   # 替换并备份原文件</span></span>
<span class="line"><span>$ sed -n &#39;100,200p&#39; huge_file.txt     # 只显示100-200行</span></span>
<span class="line"><span>$ sed &#39;/^$/d&#39; file.txt                # 删除空行</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 批量修改配置文件</span></span>
<span class="line"><span>$ sed -i &#39;s/^#\\(.*nginx.*\\)/\\1/g&#39; config.conf</span></span>
<span class="line"><span># 取消包含nginx的注释行</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 高级应用</span></span>
<span class="line"><span>$ sed -n &#39;/START/,/END/p&#39; file.txt    # 打印两个模式之间的内容</span></span>
<span class="line"><span>$ sed &#39;1~2d&#39; file.txt                  # 删除奇数行</span></span>
<span class="line"><span>$ sed -e &#39;s/^/PREFIX_/&#39; -e &#39;s/$/_SUFFIX/&#39; file.txt</span></span>
<span class="line"><span># 同时添加前缀和后缀</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-awk-数据处理专家" tabindex="-1"><a class="header-anchor" href="#_2-3-awk-数据处理专家"><span>2.3 awk - 数据处理专家</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># awk 核心用法</span></span>
<span class="line"><span>$ awk &#39;{sum+=$5} END {print sum/NR}&#39; data.txt</span></span>
<span class="line"><span># 计算第5列的平均值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ awk &#39;$3 &gt; 1000 {print $1, $3}&#39; access.log</span></span>
<span class="line"><span># 打印第3列大于1000的行</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 日志分析实例</span></span>
<span class="line"><span>$ awk &#39;{print $1}&#39; access.log | sort | uniq -c | sort -rn | head -10</span></span>
<span class="line"><span># 统计访问最多的10个IP</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ awk -F: &#39;$3 &gt;= 1000 {print $1}&#39; /etc/passwd</span></span>
<span class="line"><span># 查找UID大于等于1000的用户</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 高级技巧</span></span>
<span class="line"><span>$ awk &#39;BEGIN{OFS=&quot;,&quot;} {$1=$1; print}&#39; file.txt</span></span>
<span class="line"><span># 将空格分隔转换为逗号分隔</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ awk &#39;NR==FNR{a[$1]=$2;next} {print $0, a[$1]}&#39; file1 file2</span></span>
<span class="line"><span># 类似SQL的JOIN操作</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、系统监控与性能分析" tabindex="-1"><a class="header-anchor" href="#三、系统监控与性能分析"><span>三、系统监控与性能分析</span></a></h2><h3 id="_3-1-进程管理命令" tabindex="-1"><a class="header-anchor" href="#_3-1-进程管理命令"><span>3.1 进程管理命令</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># ps 的实用技巧</span></span>
<span class="line"><span>$ ps aux --sort=-%cpu | head -10      # CPU占用最高的10个进程</span></span>
<span class="line"><span>$ ps aux --sort=-%mem | head -10      # 内存占用最高的10个进程</span></span>
<span class="line"><span>$ ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | head</span></span>
<span class="line"><span># 自定义输出格式</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 查找特定进程</span></span>
<span class="line"><span>$ ps -ef | grep &quot;[n]ginx&quot;    # 方括号技巧，避免grep自己</span></span>
<span class="line"><span>$ pgrep -f &quot;java.*tomcat&quot;    # 更优雅的方式</span></span>
<span class="line"><span>$ pidof nginx                # 获取进程PID</span></span>
<span class="line"><span></span></span>
<span class="line"><span># kill 的正确姿势</span></span>
<span class="line"><span>$ kill -TERM $pid    # 优雅终止（默认）</span></span>
<span class="line"><span>$ kill -HUP $pid     # 重新加载配置</span></span>
<span class="line"><span>$ kill -USR1 $pid    # 用户自定义信号（如nginx日志切割）</span></span>
<span class="line"><span>$ timeout 5 some_command    # 限时执行命令</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-系统资源监控" tabindex="-1"><a class="header-anchor" href="#_3-2-系统资源监控"><span>3.2 系统资源监控</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># top/htop 高级用法</span></span>
<span class="line"><span>$ top -b -n 1 | head -20    # 批处理模式，适合脚本</span></span>
<span class="line"><span>$ top -p $(pgrep -d&#39;,&#39; java)  # 监控所有java进程</span></span>
<span class="line"><span></span></span>
<span class="line"><span># vmstat - 虚拟内存统计</span></span>
<span class="line"><span>$ vmstat 1 10    # 每秒输出一次，共10次</span></span>
<span class="line"><span># r: 运行队列  b: 阻塞进程  swpd: 使用的交换空间</span></span>
<span class="line"><span># si/so: 交换进出  bi/bo: 块设备IO</span></span>
<span class="line"><span></span></span>
<span class="line"><span># iostat - IO统计</span></span>
<span class="line"><span>$ iostat -x 1    # 详细IO统计</span></span>
<span class="line"><span># %util: 设备利用率，接近100%说明IO瓶颈</span></span>
<span class="line"><span></span></span>
<span class="line"><span># sar - 系统活动报告</span></span>
<span class="line"><span>$ sar -u 1 10         # CPU使用率</span></span>
<span class="line"><span>$ sar -r 1 10         # 内存使用</span></span>
<span class="line"><span>$ sar -n DEV 1 10     # 网络流量</span></span>
<span class="line"><span>$ sar -d 1 10         # 磁盘IO</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-网络诊断命令" tabindex="-1"><a class="header-anchor" href="#_3-3-网络诊断命令"><span>3.3 网络诊断命令</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># netstat/ss 网络连接分析</span></span>
<span class="line"><span>$ ss -tulpn | grep :80    # 查看80端口监听情况（比netstat快）</span></span>
<span class="line"><span>$ ss -ant | awk &#39;{print $1}&#39; | sort | uniq -c</span></span>
<span class="line"><span># 统计TCP连接状态</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ netstat -an | grep ESTABLISHED | wc -l</span></span>
<span class="line"><span># 统计已建立的连接数</span></span>
<span class="line"><span></span></span>
<span class="line"><span># tcpdump 抓包分析</span></span>
<span class="line"><span>$ tcpdump -i eth0 -nn host 192.168.1.100 and port 80</span></span>
<span class="line"><span># 抓取特定主机和端口的包</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ tcpdump -i any -w capture.pcap -C 100 -W 10</span></span>
<span class="line"><span># 循环保存10个100MB的文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 网络性能测试</span></span>
<span class="line"><span>$ curl -w &quot;@curl-format.txt&quot; -o /dev/null -s https://example.com</span></span>
<span class="line"><span># 详细的HTTP性能指标</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ nc -zv hostname 22-80    # 扫描端口范围</span></span>
<span class="line"><span>$ nmap -sV -p- hostname     # 全端口扫描</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、日志分析与故障排查" tabindex="-1"><a class="header-anchor" href="#四、日志分析与故障排查"><span>四、日志分析与故障排查</span></a></h2><h3 id="_4-1-日志分析技巧" tabindex="-1"><a class="header-anchor" href="#_4-1-日志分析技巧"><span>4.1 日志分析技巧</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 统计错误出现次数</span></span>
<span class="line"><span>$ grep &quot;ERROR&quot; app.log | awk &#39;{print $5}&#39; | sort | uniq -c | sort -rn</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 按时间段分析日志</span></span>
<span class="line"><span>$ awk &#39;$1 &gt;= &quot;2024-01-01&quot; &amp;&amp; $1 &lt;= &quot;2024-01-31&quot;&#39; access.log</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 实时监控多个日志</span></span>
<span class="line"><span>$ tail -f /var/log/{nginx/*.log,mysql/*.log}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 日志轮转处理</span></span>
<span class="line"><span>$ zcat access.log.*.gz | grep &quot;pattern&quot;    # 搜索压缩日志</span></span>
<span class="line"><span>$ zless access.log.gz                       # 查看压缩日志</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 高级日志分析</span></span>
<span class="line"><span>$ awk &#39;/ERROR/{print $0; for(i=1; i&lt;=3; i++) {getline; print}}&#39; app.log</span></span>
<span class="line"><span># 打印ERROR及后续3行</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-故障排查实战" tabindex="-1"><a class="header-anchor" href="#_4-2-故障排查实战"><span>4.2 故障排查实战</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 磁盘空间问题</span></span>
<span class="line"><span>$ df -h | awk &#39;$5+0 &gt; 80&#39;    # 使用率超过80%的分区</span></span>
<span class="line"><span>$ du -sh /* 2&gt;/dev/null | sort -rh | head -10    # 根目录下最大的10个目录</span></span>
<span class="line"><span>$ find / -size +1G -type f 2&gt;/dev/null    # 查找大于1G的文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 内存问题排查</span></span>
<span class="line"><span>$ free -h | awk &#39;/^Mem:/ {print &quot;Used: &quot; $3 &quot;/&quot; $2 &quot; (&quot; $3/$2*100 &quot;%)&quot;}&#39;</span></span>
<span class="line"><span>$ ps aux | awk &#39;{sum+=$6} END {print &quot;Total RSS: &quot; sum/1024 &quot; MB&quot;}&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># CPU问题定位</span></span>
<span class="line"><span>$ mpstat -P ALL 1    # 查看每个CPU核心使用情况</span></span>
<span class="line"><span>$ pidstat -u 1 10    # 查看进程CPU使用情况</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 网络连接问题</span></span>
<span class="line"><span>$ ss -s    # 连接统计摘要</span></span>
<span class="line"><span>$ conntrack -L | wc -l    # 查看连接跟踪表大小</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、shell脚本最佳实践" tabindex="-1"><a class="header-anchor" href="#五、shell脚本最佳实践"><span>五、Shell脚本最佳实践</span></a></h2><h3 id="_5-1-脚本编写技巧" tabindex="-1"><a class="header-anchor" href="#_5-1-脚本编写技巧"><span>5.1 脚本编写技巧</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span># 脚本模板</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set -euo pipefail    # 严格模式</span></span>
<span class="line"><span>IFS=$&#39;\\n\\t&#39;         # 设置内部字段分隔符</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 错误处理</span></span>
<span class="line"><span>trap&#39;echo &quot;Error on line $LINENO&quot;&#39; ERR</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 日志函数</span></span>
<span class="line"><span>log() {</span></span>
<span class="line"><span>    echo&quot;[$(date &#39;+%Y-%m-%d %H:%M:%S&#39;)] $*&quot; | tee -a /var/log/script.log</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 参数检查</span></span>
<span class="line"><span>if [ $# -lt 1 ]; then</span></span>
<span class="line"><span>    echo&quot;Usage: $0 &lt;argument&gt;&quot;</span></span>
<span class="line"><span>    exit 1</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 并发控制</span></span>
<span class="line"><span>MAX_JOBS=5</span></span>
<span class="line"><span>for item in&quot;\${items[@]}&quot;; do</span></span>
<span class="line"><span>    while [ $(jobs -r | wc -l) -ge $MAX_JOBS ]; do</span></span>
<span class="line"><span>        sleep 1</span></span>
<span class="line"><span>    done</span></span>
<span class="line"><span>    process_item &quot;$item&quot; &amp;</span></span>
<span class="line"><span>done</span></span>
<span class="line"><span>wait</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-实用shell函数库" tabindex="-1"><a class="header-anchor" href="#_5-2-实用shell函数库"><span>5.2 实用Shell函数库</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 重试机制</span></span>
<span class="line"><span>retry() {</span></span>
<span class="line"><span>    local max_attempts=&quot;$1&quot;</span></span>
<span class="line"><span>    local delay=&quot;$2&quot;</span></span>
<span class="line"><span>    local count=0</span></span>
<span class="line"><span>    shift 2</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    until&quot;$@&quot;; do</span></span>
<span class="line"><span>        count=$((count + 1))</span></span>
<span class="line"><span>        if [ $count -ge $max_attempts ]; then</span></span>
<span class="line"><span>            echo&quot;Command failed after $count attempts&quot;</span></span>
<span class="line"><span>            return 1</span></span>
<span class="line"><span>        fi</span></span>
<span class="line"><span>        echo&quot;Attempt $count failed, retrying in \${delay}s...&quot;</span></span>
<span class="line"><span>        sleep&quot;$delay&quot;</span></span>
<span class="line"><span>    done</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 使用示例</span></span>
<span class="line"><span>retry 3 5 curl -f http://example.com</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 彩色输出</span></span>
<span class="line"><span>red() { echo -e &quot;\\033[31m$*\\033[0m&quot;; }</span></span>
<span class="line"><span>green() { echo -e &quot;\\033[32m$*\\033[0m&quot;; }</span></span>
<span class="line"><span>yellow() { echo -e &quot;\\033[33m$*\\033[0m&quot;; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 进度条</span></span>
<span class="line"><span>progress_bar() {</span></span>
<span class="line"><span>    local duration=$1</span></span>
<span class="line"><span>    local steps=50</span></span>
<span class="line"><span>    local sleep_time=$(echo&quot;scale=3; $duration / $steps&quot; | bc)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    for i in $(seq 1 $steps); do</span></span>
<span class="line"><span>        printf&quot;\\r[&quot;</span></span>
<span class="line"><span>        printf&quot;%0.s=&quot; $(seq 1 $i)</span></span>
<span class="line"><span>        printf&quot;%0.s &quot; $(seq$i $((steps-1)))</span></span>
<span class="line"><span>        printf&quot;] %d%%&quot; $((i*100/steps))</span></span>
<span class="line"><span>        sleep$sleep_time</span></span>
<span class="line"><span>    done</span></span>
<span class="line"><span>    echo</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、容器与云原生运维" tabindex="-1"><a class="header-anchor" href="#六、容器与云原生运维"><span>六、容器与云原生运维</span></a></h2><h3 id="_6-1-docker常用命令" tabindex="-1"><a class="header-anchor" href="#_6-1-docker常用命令"><span>6.1 Docker常用命令</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># Docker容器管理</span></span>
<span class="line"><span>$ docker ps -a --format &quot;table {{.Names}}\\t{{.Status}}\\t{{.Ports}}&quot;</span></span>
<span class="line"><span># 自定义输出格式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ docker stats --no-stream --format &quot;table {{.Container}}\\t{{.CPUPerc}}\\t{{.MemUsage}}&quot;</span></span>
<span class="line"><span># 查看资源使用情况</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ docker system prune -a --volumes    # 清理所有未使用资源</span></span>
<span class="line"><span>$ docker logs -f --tail 100 container_name    # 实时查看日志</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 批量操作</span></span>
<span class="line"><span>$ docker stop $(docker ps -aq)    # 停止所有容器</span></span>
<span class="line"><span>$ docker rm $(docker ps -aq -f status=exited)    # 删除已停止容器</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 调试技巧</span></span>
<span class="line"><span>$ docker exec -it container_name /bin/bash    # 进入容器</span></span>
<span class="line"><span>$ docker cp container:/path/to/file ./    # 从容器复制文件</span></span>
<span class="line"><span>$ docker diff container_name    # 查看容器文件系统变化</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-kubernetes运维命令" tabindex="-1"><a class="header-anchor" href="#_6-2-kubernetes运维命令"><span>6.2 Kubernetes运维命令</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># Pod管理</span></span>
<span class="line"><span>$ kubectl get pods -A --sort-by=&#39;.status.startTime&#39;</span></span>
<span class="line"><span>$ kubectl top pods --all-namespaces | sort -k3 -rn | head</span></span>
<span class="line"><span>$ kubectl describe pod pod_name -n namespace</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 日志查看</span></span>
<span class="line"><span>$ kubectl logs -f deployment/app --all-containers=true</span></span>
<span class="line"><span>$ kubectl logs pod_name --previous    # 查看崩溃前的日志</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 资源管理</span></span>
<span class="line"><span>$ kubectl get events --sort-by=&#39;.lastTimestamp&#39; -A</span></span>
<span class="line"><span>$ kubectl rollout history deployment/app</span></span>
<span class="line"><span>$ kubectl set image deployment/app app=image:tag --record</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 调试命令</span></span>
<span class="line"><span>$ kubectl exec -it pod_name -- /bin/bash</span></span>
<span class="line"><span>$ kubectl port-forward pod/pod_name 8080:80</span></span>
<span class="line"><span>$ kubectl debug pod_name -it --image=busybox</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="七、安全加固与审计" tabindex="-1"><a class="header-anchor" href="#七、安全加固与审计"><span>七、安全加固与审计</span></a></h2><h3 id="_7-1-系统安全检查" tabindex="-1"><a class="header-anchor" href="#_7-1-系统安全检查"><span>7.1 系统安全检查</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 用户和权限审计</span></span>
<span class="line"><span>$ find / -perm -4000 -type f 2&gt;/dev/null    # 查找SUID文件</span></span>
<span class="line"><span>$ find / -perm -2000 -type f 2&gt;/dev/null    # 查找SGID文件</span></span>
<span class="line"><span>$ find / -nouser -o -nogroup 2&gt;/dev/null    # 无主文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 登录审计</span></span>
<span class="line"><span>$ last -10    # 最近10次登录</span></span>
<span class="line"><span>$ lastb       # 失败的登录尝试</span></span>
<span class="line"><span>$ who -H      # 当前登录用户</span></span>
<span class="line"><span>$ w           # 详细的用户活动</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 文件完整性检查</span></span>
<span class="line"><span>$ find /etc -type f -mtime -1    # 24小时内修改的配置文件</span></span>
<span class="line"><span>$ rpm -Va    # RPM包文件完整性检查（RedHat系）</span></span>
<span class="line"><span>$ debsums    # DEB包文件完整性检查（Debian系）</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-2-网络安全监控" tabindex="-1"><a class="header-anchor" href="#_7-2-网络安全监控"><span>7.2 网络安全监控</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 防火墙规则管理</span></span>
<span class="line"><span>$ iptables -L -n -v --line-numbers    # 查看详细规则</span></span>
<span class="line"><span>$ iptables -I INPUT 1 -s IP -j DROP   # 封禁IP</span></span>
<span class="line"><span>$ iptables -D INPUT 1                 # 删除规则</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 连接监控</span></span>
<span class="line"><span>$ ss -tupn | grep LISTEN    # 监听端口</span></span>
<span class="line"><span>$ lsof -i :80              # 查看80端口的进程</span></span>
<span class="line"><span>$ netstat -tulpn | grep -v 127.0.0.1    # 外部监听端口</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 入侵检测</span></span>
<span class="line"><span>$ grep &quot;Failed password&quot; /var/log/secure | awk &#39;{print $11}&#39; | sort | uniq -c | sort -rn</span></span>
<span class="line"><span># SSH暴力破解统计</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ tcpdump -nn -c 100 &#39;tcp[tcpflags] == tcp-syn&#39;</span></span>
<span class="line"><span># 监控SYN包（可能的SYN flood）</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="八、性能优化实战" tabindex="-1"><a class="header-anchor" href="#八、性能优化实战"><span>八、性能优化实战</span></a></h2><h3 id="_8-1-系统调优命令" tabindex="-1"><a class="header-anchor" href="#_8-1-系统调优命令"><span>8.1 系统调优命令</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 内核参数优化</span></span>
<span class="line"><span>$ sysctl -a | grep net.ipv4    # 查看网络参数</span></span>
<span class="line"><span>$ echo&quot;net.ipv4.tcp_fin_timeout = 30&quot; &gt;&gt; /etc/sysctl.conf</span></span>
<span class="line"><span>$ sysctl -p    # 立即生效</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 文件句柄限制</span></span>
<span class="line"><span>$ ulimit -a                      # 查看当前限制</span></span>
<span class="line"><span>$ ulimit -n 65535                # 临时修改</span></span>
<span class="line"><span>$ echo&quot;* soft nofile 65535&quot; &gt;&gt; /etc/security/limits.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span># IO调度器优化</span></span>
<span class="line"><span>$ cat /sys/block/sda/queue/scheduler</span></span>
<span class="line"><span>$ echo deadline &gt; /sys/block/sda/queue/scheduler</span></span>
<span class="line"><span></span></span>
<span class="line"><span># CPU亲和性设置</span></span>
<span class="line"><span>$ taskset -c 0-3 command    # 绑定到CPU 0-3</span></span>
<span class="line"><span>$ taskset -p -c 0,1 PID     # 绑定进程到特定CPU</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-2-服务优化示例" tabindex="-1"><a class="header-anchor" href="#_8-2-服务优化示例"><span>8.2 服务优化示例</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># Nginx优化检查</span></span>
<span class="line"><span>$ nginx -t    # 配置语法检查</span></span>
<span class="line"><span>$ nginx -T    # 显示完整配置</span></span>
<span class="line"><span>$ ab -n 10000 -c 100 http://localhost/    # 压力测试</span></span>
<span class="line"><span></span></span>
<span class="line"><span># MySQL优化</span></span>
<span class="line"><span>$ mysql -e &quot;SHOW VARIABLES LIKE &#39;%buffer%&#39;&quot;</span></span>
<span class="line"><span>$ mysql -e &quot;SHOW STATUS LIKE &#39;Threads%&#39;&quot;</span></span>
<span class="line"><span>$ mysqladmin processlist</span></span>
<span class="line"><span>$ mysqltuner    # MySQL调优建议工具</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Redis性能监控</span></span>
<span class="line"><span>$ redis-cli --latency    # 延迟监控</span></span>
<span class="line"><span>$ redis-cli --bigkeys    # 查找大key</span></span>
<span class="line"><span>$ redis-cli monitor      # 实时命令监控</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="九、自动化运维工具" tabindex="-1"><a class="header-anchor" href="#九、自动化运维工具"><span>九、自动化运维工具</span></a></h2><h3 id="_9-1-定时任务管理" tabindex="-1"><a class="header-anchor" href="#_9-1-定时任务管理"><span>9.1 定时任务管理</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># crontab高级用法</span></span>
<span class="line"><span>$ crontab -l | grep -v &#39;^#&#39; | grep -v &#39;^$&#39;    # 查看活动任务</span></span>
<span class="line"><span>$ crontab -l &gt; backup.cron &amp;&amp; crontab -r       # 备份并清除</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 特殊时间表达式</span></span>
<span class="line"><span>@reboot    # 系统启动时执行</span></span>
<span class="line"><span>@yearly    # 每年执行一次</span></span>
<span class="line"><span>@monthly   # 每月执行一次</span></span>
<span class="line"><span>@weekly    # 每周执行一次</span></span>
<span class="line"><span>@daily     # 每天执行一次</span></span>
<span class="line"><span>@hourly    # 每小时执行一次</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 任务输出重定向</span></span>
<span class="line"><span>*/5 * * * * /path/to/script.sh &gt;&gt; /var/log/cron.log 2&gt;&amp;1</span></span>
<span class="line"><span># 或者完全静默</span></span>
<span class="line"><span>*/5 * * * * /path/to/script.sh &gt; /dev/null 2&gt;&amp;1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-2-批量操作技巧" tabindex="-1"><a class="header-anchor" href="#_9-2-批量操作技巧"><span>9.2 批量操作技巧</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 并行执行</span></span>
<span class="line"><span>$ cat hosts.txt | xargs -P 10 -I {} ssh {} &quot;uptime&quot;</span></span>
<span class="line"><span># 对多台主机并行执行命令</span></span>
<span class="line"><span></span></span>
<span class="line"><span># GNU Parallel更强大</span></span>
<span class="line"><span>$ parallel -j 10 ssh {} uptime :::: hosts.txt</span></span>
<span class="line"><span>$ find . -name &quot;*.jpg&quot; | parallel -j 8 convert {} {.}.png</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 批量文件处理</span></span>
<span class="line"><span>$ for f in *.txt; domv&quot;$f&quot;&quot;\${f%.txt}.bak&quot;; done</span></span>
<span class="line"><span>$ rename &#39;s/\\.txt$/\\.md/&#39; *.txt    # 批量重命名</span></span>
<span class="line"><span></span></span>
<span class="line"><span># SSH批量执行</span></span>
<span class="line"><span>$ pssh -h hosts.txt -l root -i &quot;hostname; uptime&quot;</span></span>
<span class="line"><span>$ pdsh -w node[01-10] &quot;systemctl restart nginx&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="十、故障恢复与数据备份" tabindex="-1"><a class="header-anchor" href="#十、故障恢复与数据备份"><span>十、故障恢复与数据备份</span></a></h2><h3 id="_10-1-数据备份策略" tabindex="-1"><a class="header-anchor" href="#_10-1-数据备份策略"><span>10.1 数据备份策略</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># tar备份</span></span>
<span class="line"><span>$ tar -czf backup-$(date +%F).tar.gz --exclude=&#39;*.log&#39; /data/</span></span>
<span class="line"><span>$ tar --listed-incremental=snapshot.snar -czf incremental.tar.gz /data/</span></span>
<span class="line"><span></span></span>
<span class="line"><span># rsync增量备份</span></span>
<span class="line"><span>$ rsync -avz --backup --backup-dir=/backup/$(date +%F) source/ dest/</span></span>
<span class="line"><span>$ rsync -avz --link-dest=/backup/yesterday/ source/ /backup/today/</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 数据库备份</span></span>
<span class="line"><span>$ mysqldump -u root -p --all-databases --single-transaction &gt; backup.sql</span></span>
<span class="line"><span>$ pg_dumpall -U postgres &gt; postgres_backup.sql</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 备份验证</span></span>
<span class="line"><span>$ tar -tzf backup.tar.gz | head    # 查看备份内容</span></span>
<span class="line"><span>$ mysql test &lt; backup.sql           # 恢复测试</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-2-灾难恢复" tabindex="-1"><a class="header-anchor" href="#_10-2-灾难恢复"><span>10.2 灾难恢复</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 文件恢复</span></span>
<span class="line"><span>$ extundelete /dev/sda1 --restore-file /path/to/file</span></span>
<span class="line"><span>$ testdisk /dev/sda    # 分区恢复工具</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 进程恢复</span></span>
<span class="line"><span>$ gcore -o dump PID    # 生成进程core dump</span></span>
<span class="line"><span>$ gdb /path/to/program dump.PID    # 分析dump</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 系统恢复</span></span>
<span class="line"><span>$ systemctl rescue     # 进入救援模式</span></span>
<span class="line"><span>$ systemctl emergency  # 进入紧急模式</span></span>
<span class="line"><span>$ init 1              # 单用户模式</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 网络恢复</span></span>
<span class="line"><span>$ ip linkset eth0 up</span></span>
<span class="line"><span>$ dhclient eth0</span></span>
<span class="line"><span>$ ip addr add 192.168.1.100/24 dev eth0</span></span>
<span class="line"><span>$ ip route add default via 192.168.1.1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实战案例-一次生产环境故障处理" tabindex="-1"><a class="header-anchor" href="#实战案例-一次生产环境故障处理"><span>实战案例：一次生产环境故障处理</span></a></h2><p>让我分享一个真实的案例，展示这些命令如何在实战中组合使用：</p><p><strong>场景</strong>：凌晨3点，收到告警，网站响应极慢。</p><p><strong>排查过程</strong>：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 1. 快速检查系统负载</span></span>
<span class="line"><span>$ uptime</span></span>
<span class="line"><span>load average: 28.43, 22.17, 15.89    # 负载异常高</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 查看CPU占用</span></span>
<span class="line"><span>$ top -b -n 1 | head -20</span></span>
<span class="line"><span># 发现mysql进程CPU占用300%</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 检查MySQL慢查询</span></span>
<span class="line"><span>$ tail -100 /var/log/mysql/slow.log</span></span>
<span class="line"><span># 发现大量全表扫描</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 4. 查看当前MySQL进程</span></span>
<span class="line"><span>$ mysql -e &quot;show processlist&quot; | grep -v Sleep</span></span>
<span class="line"><span># 发现某个查询运行了1800秒</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 5. 紧急处理</span></span>
<span class="line"><span>$ mysql -e &quot;kill query_id&quot;    # 杀掉慢查询</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 6. 分析访问日志</span></span>
<span class="line"><span>$ awk &#39;{print $1}&#39; /var/log/nginx/access.log | sort | uniq -c | sort -rn | head</span></span>
<span class="line"><span># 发现某IP异常访问</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 7. 临时封禁</span></span>
<span class="line"><span>$ iptables -I INPUT -s suspicious_ip -j DROP</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 8. 监控恢复情况</span></span>
<span class="line"><span>$ watch -n 1 &#39;uptime; ss -s; mysql -e &quot;show status like \\&quot;Threads%\\&quot;&quot;&#39;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整个过程15分钟内完成定位和处理，这就是熟练掌握Linux命令的威力。</p><h2 id="进阶学习资源" tabindex="-1"><a class="header-anchor" href="#进阶学习资源"><span>进阶学习资源</span></a></h2><h3 id="必读书籍推荐" tabindex="-1"><a class="header-anchor" href="#必读书籍推荐"><span>必读书籍推荐</span></a></h3><ul><li>• 《Linux Command Line and Shell Scripting Bible》</li><li>• 《UNIX and Linux System Administration Handbook》</li><li>• 《Site Reliability Engineering》(Google SRE)</li></ul><h3 id="在线练习平台" tabindex="-1"><a class="header-anchor" href="#在线练习平台"><span>在线练习平台</span></a></h3><ul><li>• Linux Survival：交互式Linux命令学习</li><li>• OverTheWire：通过游戏学习Linux安全</li><li>• HackerRank Shell：Shell脚本编程挑战</li></ul><h3 id="持续学习建议" tabindex="-1"><a class="header-anchor" href="#持续学习建议"><span>持续学习建议</span></a></h3><ol><li>\\1. <strong>建立自己的命令库</strong>：把常用的命令组合记录下来，形成自己的工具箱</li><li>\\2. <strong>阅读man页面</strong>：养成查看man page的习惯，很多隐藏功能都在里面</li><li>\\3. <strong>关注性能</strong>：不仅要会用，还要知道哪个命令更高效</li><li>\\4. <strong>自动化思维</strong>：能脚本化的绝不手动，提高效率</li><li>\\5. <strong>安全意识</strong>：每个命令都要考虑安全影响</li></ol>`,77)]))}const v=n(l,[["render",p]]),t=JSON.parse('{"path":"/%E6%99%BA%E7%BB%B4%E6%94%BB%E5%9F%8E%E7%8B%AE/S15/3.Linux%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4%E5%AE%8C%E5%85%A8%E6%8C%87%E5%8D%97.html","title":"Linux常用命令完全指南：从入门到精通，一篇文章搞定所有场景","lang":"en-US","frontmatter":{},"git":{"createdTime":1756914694000,"updatedTime":1756914694000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}]},"readingTime":{"minutes":12.32,"words":3697},"filePathRelative":"智维攻城狮/S15/3.Linux常用命令完全指南.md"}');export{v as comp,t as data};
