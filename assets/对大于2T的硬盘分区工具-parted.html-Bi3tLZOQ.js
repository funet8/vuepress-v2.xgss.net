import{_ as e,c as a,b as n,o as t}from"./app-BEL8OELx.js";const i={};function l(d,s){return t(),a("div",null,s[0]||(s[0]=[n(`<h1 id="linux对大于2t的硬盘分区工具-parted" tabindex="-1"><a class="header-anchor" href="#linux对大于2t的硬盘分区工具-parted"><span>Linux对大于2T的硬盘分区工具-parted</span></a></h1><h2 id="fdisk" tabindex="-1"><a class="header-anchor" href="#fdisk"><span>fdisk</span></a></h2><p>工具他对分区是有大小限制的，它只能划分小于2T的磁盘。 超过2T的磁盘： 其一是通过卷管理来实现； 其二就是通过我们今天谈到的Parted工具来实现对GPT磁盘进行分区操作。</p><p><img src="https://imgoss.xgss.net/picgo/linux-file-system.webp.jpg?aliyun" alt="linux-file-system.webp"></p><h2 id="parted" tabindex="-1"><a class="header-anchor" href="#parted"><span>parted</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">yum install -y parted # 安装</span>
<span class="line">parted --help   #获取帮助</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>本地服务器有一块4T的硬盘 /dev/sda</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">parted /dev/sda</span>
<span class="line"></span>
<span class="line"># parted</span>
<span class="line">GNU Parted 3.1</span>
<span class="line">Using /dev/sda</span>
<span class="line">Welcome to GNU Parted! Type &#39;help&#39; to view a list of commands.</span>
<span class="line">(parted)    </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">parted -a optimal /dev/sda	#对硬盘sdb进行分区  </span>
<span class="line">mklabel gpt					#使用GPT格式			</span>
<span class="line">mkpart primary 1 -1			#建立一个主分区	</span>
<span class="line">print						#显示分区信息</span>
<span class="line">quit						#退出</span>
<span class="line">mkfs.xfs /dev/sdb1			#格式化为xfs格式</span>
<span class="line"></span>
<span class="line">echo &quot;/dev/sdb1	/opt	xfs	defaults	0 0&quot; &gt;&gt; /etc/fstab #加入自动挂载</span>
<span class="line">mount -a					#挂载分区</span>
<span class="line">df -h						#查看磁盘信息</span>
<span class="line"></span>
<span class="line">umount /dev/sda</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9)]))}const p=e(i,[["render",l]]),c=JSON.parse('{"path":"/file-system/%E5%AF%B9%E5%A4%A7%E4%BA%8E2T%E7%9A%84%E7%A1%AC%E7%9B%98%E5%88%86%E5%8C%BA%E5%B7%A5%E5%85%B7-parted.html","title":"Linux对大于2T的硬盘分区工具-parted","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"file-system/对大于2T的硬盘分区工具-parted.md"}');export{p as comp,c as data};
