import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as e}from"./app-BiQR_lPj.js";const l={};function p(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h1 id="学好vim一篇就够了-vi和vim的使用教程" tabindex="-1"><a class="header-anchor" href="#学好vim一篇就够了-vi和vim的使用教程"><span>学好vim一篇就够了-vi和vim的使用教程</span></a></h1><p>它是一个老式的文字处理工具，但是功能很齐全，不仅是文本处理工具，还是一个程序编辑工具，就连官方网站也说vim是一个程序开发工具而不是文字处理软件，因为它包含了很多额外的功能，如：多文件编辑，区块复制等，这些功能让我们在进行配置文件修改的时候会更方便。今天就来一起学习一下vi和vim。</p><h2 id="什么是-vim" tabindex="-1"><a class="header-anchor" href="#什么是-vim"><span>什么是 vim？</span></a></h2><p>Vim 是从 vi 发展出来的一个文本编辑器。代码补全、编译及错误跳转等方便编程的功能特别丰富，在程序员中被广泛使用。</p><p>简单的来说， vi 是老式的字处理器，不过功能已经很齐全了，但是还是有可以进步的地方。 vim 则可以说是程序开发者的一项很好用的工具。</p><p><img src="https://imgoss.xgss.net/picgo/vi-vim.jpg?aliyun" alt="vi-vim"></p><h2 id="vi和vim的小差别" tabindex="-1"><a class="header-anchor" href="#vi和vim的小差别"><span>vi和vim的小差别</span></a></h2><p>Linux 系统会内置 vi 文本编辑器。</p><p>Vim 具有程序编辑的能力，可以看做是 vi 的增强版本，主动的以字体颜色辨别语法的正确性，方便程序设计；代码补全，编译及错误跳转等方便编程的功能丰富，在程序员中被广泛的使用。</p><p>由于个别版本的linux默认只安装vi，所以你需要额外安装vim的软件包，另外vim在字符界面下不能输入中文，而在图形界面下能否输入中文则取决于系统中是否安装了中文输入法。</p><h2 id="为什么要使用vim" tabindex="-1"><a class="header-anchor" href="#为什么要使用vim"><span><strong>为什么要使用vim？</strong></span></a></h2><p>虽然在linux下的文本编辑器众多，这些工具都有各自的优点，但是有几点是其它编辑工具所不能比拟的</p><ul><li>所有的类Unix系统都内建vi，其它的编辑工具则不一定，而vim相当于是vi的升级版</li><li>很多软件的编辑界面都会调用vi，如后面提到的crontab、edquota等</li><li>vim具有程序编辑能力，可以主动以字体颜色标识语法的正确性，方便代码编写</li><li>程序简单，编辑速度非常快</li></ul><h2 id="三种模式" tabindex="-1"><a class="header-anchor" href="#三种模式"><span>三种模式</span></a></h2><p>由于vi/vim是一个全屏幕的文本编辑器，它工作在三种模式下：分别是命令模式、输入模式和末行模式。</p><p>可以分别从命令模式切换到输入模式和末行模式，也可以从末行模式或输入模式切换到命令模式，但是输入模式与末行模式之间不能互相切换。</p><p><img src="https://imgoss.xgss.net/picgo/1602392063340.png?aliyun" alt="1571203454643.png"></p><h3 id="命令模式" tabindex="-1"><a class="header-anchor" href="#命令模式"><span>命令模式：</span></a></h3><p>用户刚刚启动 vi/vim，便进入了命令模式。</p><p>此状态下敲击键盘动作会被Vim识别为命令，而非输入字符。比如我们此时按下i，并不会输入一个字符，i被当作了一个命令。</p><p>以下是常用的几个命令：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>i 切换到输入模式，以输入字符。</span></span>
<span class="line"><span>x 删除当前光标所在处的字符。</span></span>
<span class="line"><span>: 切换到底线命令模式，以在最底一行输入命令。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若想要编辑文本：启动Vim，进入了命令模式，按下i，切换到输入模式。</p><p>命令模式只有一些最基本的命令，因此仍要依靠底线命令模式输入更多命令。</p><h3 id="输入模式" tabindex="-1"><a class="header-anchor" href="#输入模式"><span>输入模式</span></a></h3><p>在命令模式下按下i就进入了输入模式。</p><p>在输入模式中，可以使用以下按键：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>字符按键以及Shift组合，输入字符</span></span>
<span class="line"><span>ENTER，回车键，换行</span></span>
<span class="line"><span>BACK SPACE，退格键，删除光标前一个字符</span></span>
<span class="line"><span>DEL，删除键，删除光标后一个字符</span></span>
<span class="line"><span>方向键，在文本中移动光标</span></span>
<span class="line"><span>HOME/END，移动光标到行首/行尾</span></span>
<span class="line"><span>Page Up/Page Down，上/下翻页</span></span>
<span class="line"><span>Insert，切换光标为输入/替换模式，光标将变成竖线/下划线</span></span>
<span class="line"><span>ESC，退出输入模式，切换到命令模式</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="底线命令模式" tabindex="-1"><a class="header-anchor" href="#底线命令模式"><span>底线命令模式</span></a></h3><p>在命令模式下按下:（英文冒号）就进入了底线命令模式。</p><p>底线命令模式可以输入单个或多个字符的命令，可用的命令非常多。</p><p>在底线命令模式中，基本的命令有：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>1、:w? ?保存文件但不退出vi?</span></span>
<span class="line"><span>2、:w file 将修改另外保存到file中，不退出vi?</span></span>
<span class="line"><span>3、:w!? 强制保存，不推出vi</span></span>
<span class="line"><span>4.、:wq 保存退出</span></span>
<span class="line"><span>5、:wq! 强制保存文件，并退出vi </span></span>
<span class="line"><span>6、:q 不保存文件，退出vi</span></span>
<span class="line"><span>7、:q!不保存文件，强制退出vi?</span></span>
<span class="line"><span>8、:e! 放弃所有修改，从上次保存文件开始再编辑</span></span>
<span class="line"><span>9、:wq? 保存文件并退出vi?</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按ESC键可随时退出底线命令模式。</p><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h2><p>基础打开文件，修改文件，保存退出，另存为文件。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vi /root/file.txt 打开文件路径</span></span>
<span class="line"><span>a 修改</span></span>
<span class="line"><span>Esc 冒号 w 保存  或者 ZZ  保存退出。</span></span>
<span class="line"><span>:wq!强行保存退出，只有文件所有者，或者是root用户。</span></span>
<span class="line"><span>:w  【保存】</span></span>
<span class="line"><span>:w /root/service.bak   【另存为】</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三种模式下切换" tabindex="-1"><a class="header-anchor" href="#三种模式下切换"><span>三种模式下切换</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>命令模式 	:</span></span>
<span class="line"><span>插入模式 	a 或者 i  或者 o</span></span>
<span class="line"><span>编辑模式	ESC</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="搜索关键字" tabindex="-1"><a class="header-anchor" href="#搜索关键字"><span>搜索关键字</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>Esc /关键字 回车</span></span>
<span class="line"><span>n下一个 </span></span>
<span class="line"><span>shift+n 上一个</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="插入命令" tabindex="-1"><a class="header-anchor" href="#插入命令"><span>插入命令</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>a	【在光标后附加文本】</span></span>
<span class="line"><span>A	【在本行行末附加文本】</span></span>
<span class="line"><span>i 	【在光标前插入文本】</span></span>
<span class="line"><span>I	【在本行开始插入文本】</span></span>
<span class="line"><span>o	【在光标下插入新行】</span></span>
<span class="line"><span>O 	【在光标上插入新行】</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="定位命令" tabindex="-1"><a class="header-anchor" href="#定位命令"><span>定位命令</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>向左：</span></span>
<span class="line"><span>h或方向左键		【左移一个字符】</span></span>
<span class="line"><span>10h           	 向左移动10个字符，到行首会停止</span></span>
<span class="line"><span></span></span>
<span class="line"><span>向下：</span></span>
<span class="line"><span>j或方向下		【下移一行】</span></span>
<span class="line"><span>5j 				向下移动5行，或者5下箭头</span></span>
<span class="line"><span></span></span>
<span class="line"><span>向上：</span></span>
<span class="line"><span>k/方向上		【向上一行】</span></span>
<span class="line"><span>7k 				#向上移动7行</span></span>
<span class="line"><span></span></span>
<span class="line"><span>向右：</span></span>
<span class="line"><span>l/方向右键		【右边移一个字符】	</span></span>
<span class="line"><span>6l #向右移动6个字符，到行末会停止不会换行</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$				【移至行尾】</span></span>
<span class="line"><span>0（零）			【移至行首】</span></span>
<span class="line"><span>H				【移至屏幕上端】</span></span>
<span class="line"><span>M				【移至屏幕中央】</span></span>
<span class="line"><span>L				【移至屏幕中下端】</span></span>
<span class="line"><span>W或w			【定位到当前句子的开始位置】</span></span>
<span class="line"><span>E或e			【定位到当前这句话的最后位置】</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:set nu 		【设置行号】</span></span>
<span class="line"><span>:set nonu		【取消行号】</span></span>
<span class="line"><span>gg				【到第一行】</span></span>
<span class="line"><span>G				【到最后一行】</span></span>
<span class="line"><span>nG或4gg			【到第n行】到第四行</span></span>
<span class="line"><span>:n				【到第n行】</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>Ctrl+b          【在文件中向上移动一页（相当于 PageUp 键）】</span></span>
<span class="line"><span>Ctrl+f 			【在文件中向下移动一页（相当于 PageDown 键）】</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="撤销命令" tabindex="-1"><a class="header-anchor" href="#撤销命令"><span>撤销命令</span></a></h3><p>这个命令很常用，要记住：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>u   			【撤销上一步的操作】</span></span>
<span class="line"><span>Ctrl+r 			【恢复上一步被撤销的操作】</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>贴士：比如修改nginx的配置之后保存不退出 <code>:w</code> 再 ctrl+z将文档放在后台，用nignx -t ，或者重启nginx服务。如果有问题则快速回到文档编辑页面fg，再按u。保存</p><p>实例：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vi /etc/nginx/nginx.conf</span></span>
<span class="line"><span>i编辑</span></span>
<span class="line"><span>再 :w 保存</span></span>
<span class="line"><span>ctrl+z</span></span>
<span class="line"><span>[1]+  Stopped                 vi /etc/nginx/nginx.conf</span></span>
<span class="line"><span># jobs</span></span>
<span class="line"><span>[1]+  Stopped                 vi /etc/nginx/nginx.conf</span></span>
<span class="line"><span># nginx -t 测试nginx文档是否有错误。</span></span>
<span class="line"><span>nginx: the configuration file /etc/nginx/nginx.conf syntax is ok</span></span>
<span class="line"><span>nginx: configuration file /etc/nginx/nginx.conf test is successful</span></span>
<span class="line"><span># fg 将后台程序进入前台</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除命令" tabindex="-1"><a class="header-anchor" href="#删除命令"><span>删除命令</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>x				【删除光标所在字符】</span></span>
<span class="line"><span>nx				【删除光标所在处后n个字符】</span></span>
<span class="line"><span>dd				【删除光标所在行，ndd删除n行】</span></span>
<span class="line"><span>dG				【删除光标所在行到末尾的内容】</span></span>
<span class="line"><span>D				【删除从光标所在处到行尾】</span></span>
<span class="line"><span>:n1,n2d			【删除指定的行】 </span></span>
<span class="line"><span>:10,20d 		【删除第十行到第20行的内容】</span></span>
<span class="line"><span>光标移到第一行，然后dG	【删除所有内容】</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>小贴士，一般在操作在本地编辑好的文档，全部复制，然后将服务器文档 dG全部删除，在粘贴新的文档。</p><h3 id="复制剪切命令" tabindex="-1"><a class="header-anchor" href="#复制剪切命令"><span>复制剪切命令</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>yy、Y			【复制当前行】</span></span>
<span class="line"><span>nyy、nY			【复制当前行一下n行】	</span></span>
<span class="line"><span>dd				【剪切当前行】</span></span>
<span class="line"><span>ndd				【剪切当前行一下n行】</span></span>
<span class="line"><span>p、P			【粘贴在当前光标所在行下活行上】</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="替换和取消命令" tabindex="-1"><a class="header-anchor" href="#替换和取消命令"><span>替换和取消命令</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>r 				【取代光标所在处字符】</span></span>
<span class="line"><span>R				【从光标所在处开始替换字符，按Esc结束】</span></span>
<span class="line"><span>u				【取消上一步操作】	</span></span>
<span class="line"><span>Ctrl+r 			【恢复上一步被撤销的操作】</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="搜索和替换命令" tabindex="-1"><a class="header-anchor" href="#搜索和替换命令"><span>搜索和替换命令</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>/string 			【向前搜索指定字符，搜索时请忽略大小写:set ic】</span></span>
<span class="line"><span>n					【搜索指定字符串的下一个出现位置】		</span></span>
<span class="line"><span>:%s/old/new/g		【全文替换指定字符】	</span></span>
<span class="line"><span>:%s/^#//g			【去掉以#注释】</span></span>
<span class="line"><span>:%s/^/#/g			【在全文开头添加#】	</span></span>
<span class="line"><span>:n1,n2s/old/new/g 	【在指定范围内替换指定字符串】</span></span>
<span class="line"><span>:n1,n2s/^/#/g</span></span>
<span class="line"><span>:s/str1/str2/       【用字符串 str2 替换本行中首次出现的字符串 str1】</span></span>
<span class="line"><span>g是全局参数，如果加上这个，你文中有多少就替换多少，如果不加，就只能一个一个的替换！</span></span>
<span class="line"><span>fa（或fb）			【查询这行a字母的的地方（或b字母）】</span></span>
<span class="line"><span>3fa					【在这行中查找a出现的第三个位置】</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="应用实例" tabindex="-1"><a class="header-anchor" href="#应用实例"><span>应用实例</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>导入其他文件内容</span></span>
<span class="line"><span>			:r   文件名</span></span>
<span class="line"><span></span></span>
<span class="line"><span>在vi执行命令</span></span>
<span class="line"><span>			:! 命令		</span></span>
<span class="line"><span>定义快捷键：</span></span>
<span class="line"><span>			:map 快捷键 触发命令			</span></span>
<span class="line"><span>		实例：</span></span>
<span class="line"><span>			:map ^P I# &lt;ESC&gt;   【键盘按键实现^P：ctrl+v ctrl+p或者 ctrl+v+p 】</span></span>
<span class="line"><span>			</span></span>
<span class="line"><span>			:map ^B 0x</span></span>
<span class="line"><span>连续注释：</span></span>
<span class="line"><span>		:n1,n2s/^/#/g</span></span>
<span class="line"><span>		:n1,n2s/^/#//g</span></span>
<span class="line"><span>		:n1,n2s/^/\\/\\//g</span></span>
<span class="line"><span>替换：</span></span>
<span class="line"><span>	:ab sammail samlee@163.com</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="显示行号" tabindex="-1"><a class="header-anchor" href="#显示行号"><span>显示行号</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>:set nu    显示行号（注意前面输入冒号进入底行命令模式）</span></span>
<span class="line"><span>:set nonu  不显示行号</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="环境变量与记录" tabindex="-1"><a class="header-anchor" href="#环境变量与记录"><span><strong>环境变量与记录</strong></span></a></h3><p>.viminfo:记录用户的行为，之前编辑过的文件光标在什么位置，在这个文件中进行过什么操作等，自动建立</p><p>.vimrc：定义vim的默认设置，如是否显示行号等，需要手动生成</p><table><thead><tr><th>命令</th><th>说明</th></tr></thead><tbody><tr><td>:set nu /:set nonu</td><td>就是设定与取消行号！</td></tr><tr><td>:set hlsearch /:set nohlsearch</td><td>搜索时是否高亮显示。默认值是 hlsearch</td></tr><tr><td>:set autoindent :set noautoindent</td><td>是否自动缩排？autoindent 就是自动缩排。</td></tr><tr><td>:set backup/:set nobackup</td><td>是否自动备份，一般是 nobackup 的， 如果设定 backup 的话，那么当你更动任何一个档案时，则源文件会被另存成一个档名为 filename~ 的档案。</td></tr><tr><td>:set ruler/:set noruler</td><td>是否显示右下角的一些状态栏说明</td></tr><tr><td>:set showmode/:set noshowmode</td><td>是否显示左下角的状态栏。</td></tr><tr><td>:set backspace=(012)</td><td>一般来说， 如果我们按下 i 进入编辑模式后，可以利用backspace来删除任意字符的。 但是，某些版本则不许如此。这时就可以使用这个设置2 可以删除任意；0 或 1 仅可删除刚刚输入内容</td></tr><tr><td>:set all</td><td>显示目前所有的环境变量设定值。</td></tr><tr><td>:set</td><td>显示与系统默认值不同的设置， 用户修改过的</td></tr><tr><td>:syntax on :syntax off</td><td>是否显示颜色</td></tr><tr><td>:set bg=dark :set bg=light</td><td>可用以显示不同的颜色色调，预设是『 light 』。如果你常常发现批注的字体深蓝色实在很不容易看， 那么这里可以设定为 dark 喔！试看看，会有不同的样式呢！</td></tr></tbody></table><h3 id="密码设置与取消" tabindex="-1"><a class="header-anchor" href="#密码设置与取消"><span><strong>密码设置与取消</strong></span></a></h3><p>加密</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vim filename</span></span>
<span class="line"><span>:X</span></span>
<span class="line"><span>Warning: Using a weak encryption method; see :help &#39;cm&#39;                                                                                   </span></span>
<span class="line"><span>Enter encryption key: </span></span>
<span class="line"><span>输入密码</span></span>
<span class="line"><span>Enter encryption key: ******</span></span>
<span class="line"><span>Enter same key again: ******</span></span>
<span class="line"><span>保存（否则不加密）</span></span>
<span class="line"><span> </span></span>
<span class="line"><span># cat filename </span></span>
<span class="line"><span>VimCrypt~01!i</span></span>
<span class="line"><span># vim filename   （不能用vi）</span></span>
<span class="line"><span>Need encryption key for &quot;filename&quot;</span></span>
<span class="line"><span>Warning: Using a weak encryption method; see :help &#39;cm&#39;</span></span>
<span class="line"><span>Enter encryption key:</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>取消密码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vim filename---&gt;输入正确密码---&gt;:X---&gt;空密码---&gt;保存</span></span>
<span class="line"><span>vim filename---&gt;:set key= ---&gt;保存</span></span>
<span class="line"><span></span></span>
<span class="line"><span>注意：不要对系统文件进行加密的操作</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="其他命令" tabindex="-1"><a class="header-anchor" href="#其他命令"><span>其他命令</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span></span></span>
<span class="line"><span>J（大写）:将光标所在行下一行合并到该行，中间有空格间隔，光标移动到该空格处，要想达到在写字板中”[end]+[del]“的效果（即光标移动到行末，然后del使下一行提到该行），可以用Jx组合命令。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>u（小写）：撤销上一次所做的操作。多次使用 u 命令会一步一步依次撤销之前做过的操作（在一次切换到文本输入模式中输入的所有文本算一次操作）。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>U（大写）：一次性撤销自上次移动到当前行以来做过的所有操作，再使用一次 U 命令则撤销之前的 U 命令所做的操作，恢复被撤销的内容。所以U命令是不能一直撤销的，相当于只能撤销一步，再使用就是恢复了。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[ctrl]+ r：按住ctrl键和r，类似快捷键的用法，是恢复操作，与命令u（小写）对应，可以在多次使用u命令撤销多步后，用该命令多次恢复至最新。</span></span>
<span class="line"><span>.（小数点）：重复执行上一次的命令，注意和恢复不一样。例如重复粘贴，重复删除。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="字符差异" tabindex="-1"><a class="header-anchor" href="#字符差异"><span>字符差异</span></a></h2><p>由于linux和windows的系统差异，它们针对于文件的中的一些特殊符号表示方式也是不同的，比如说用来表示换行的符号等，如</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># cat -A hello-linux.txt</span></span>
<span class="line"><span>hello$</span></span>
<span class="line"><span>$</span></span>
<span class="line"><span># cat -A hello-windows.txt</span></span>
<span class="line"><span>hello^M$</span></span>
<span class="line"><span>^M$</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果这种文件是从windows拷贝到linux的一本小说的话，基本没什么问题，但是如果是一个我们需要执行指定工作的shell脚本就会出现问题，<strong>因为linux不认识这种符号的含义，就会导致shell脚本无法执行（踩坑了很多次，都是在win编辑txt文本，再后缀名sh，导致莫名的报错）</strong>。所以此时我们就要对这种文件进行处理</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># unix2dos [-kn] file [newfile]</span></span>
<span class="line"><span>选项与参数：</span></span>
<span class="line"><span>-k  ：保留文件原本的 mtime 时间格式</span></span>
<span class="line"><span>-n  ：保留旧文件，将转换后的内容输出到新文件，如： dos2unix -n old new</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有一种方式就是直接在linux下编辑文件，再下载到win系统下使用IDE编辑器编辑开发，再回到linux全部粘贴。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>以上的常用命令和操作都是基于vim的基本原理形成的，vim的命令很强大，尤其底行命令模式甚至可以类似于一个小型的脚本语言。</p><p>如果有遗漏，欢迎留言告知，谢谢！</p><p>vim官网有一个经典的全键位图，如下</p><p><img src="https://imgoss.xgss.net/picgo/vi-jianpantu.gif?aliyun" alt="vi-jianpantu"></p>`,86)]))}const r=n(l,[["render",p]]),v=JSON.parse('{"path":"/article/mvwlmgxc/","title":"vi和vim基本教程","lang":"en-US","frontmatter":{"title":"vi和vim基本教程","createTime":"2025/05/27 17:51:17","permalink":"/article/mvwlmgxc/"},"git":{"createdTime":1749111496000,"updatedTime":1750129445000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":2,"url":"https://github.com/star"}]},"readingTime":{"minutes":11.8,"words":3540},"filePathRelative":"linux-basis/vi和vim基本教程.md"}');export{r as comp,v as data};
