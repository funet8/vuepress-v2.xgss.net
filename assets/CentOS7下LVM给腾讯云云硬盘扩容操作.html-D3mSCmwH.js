import{_ as e,c as n,b as a,o as i}from"./app-BEL8OELx.js";const l={};function d(c,s){return i(),n("div",null,s[0]||(s[0]=[a(`<h1 id="centos7下lvm给腾讯云云硬盘扩容操作" tabindex="-1"><a class="header-anchor" href="#centos7下lvm给腾讯云云硬盘扩容操作"><span>CentOS7下LVM给腾讯云云硬盘扩容操作</span></a></h1><p>腾讯云安装ELK后，100G的硬盘不够用了，再购买了500G的硬盘想组成600G，客服居然说不可以，难道腾讯云做了限制了？试试用lvm来给100G的硬盘扩容到600G</p><p><img src="https://imgoss.xgss.net/picgo/image-20211202093956343.png?aliyun" alt=""></p><p>实测扩容是可以的</p><p><img src="https://imgoss.xgss.net/picgo/image-20211202160901943.png?aliyun" alt="image-20211202160901943"></p><h2 id="查看硬盘是否购买" tabindex="-1"><a class="header-anchor" href="#查看硬盘是否购买"><span>查看硬盘是否购买</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># fdisk -l</span>
<span class="line"></span>
<span class="line">Disk /dev/vda: 53.7 GB, 53687091200 bytes, 104857600 sectors</span>
<span class="line">..</span>
<span class="line"></span>
<span class="line">   Device Boot      Start         End      Blocks   Id  System</span>
<span class="line">/dev/vda1   *        2048   104857566    52427759+  83  Linux</span>
<span class="line"></span>
<span class="line">Disk /dev/vdb: 107.4 GB, 107374182400 bytes, 209715200 sectors</span>
<span class="line">...</span>
<span class="line"></span>
<span class="line">   Device Boot      Start         End      Blocks   Id  System</span>
<span class="line">/dev/vdb1            2048   209715199   104856576   83  Linux</span>
<span class="line"></span>
<span class="line">Disk /dev/vdc: 536.9 GB, 536870912000 bytes, 1048576000 sectors</span>
<span class="line">...</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建物理卷" tabindex="-1"><a class="header-anchor" href="#创建物理卷"><span>创建物理卷</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># pvcreate /dev/vdb /dev/vdc</span>
<span class="line"></span>
<span class="line">  Device /dev/vdb excluded by a filter.</span>
<span class="line">  Physical volume &quot;/dev/vdc&quot; successfully created.</span>
<span class="line">  报错，由于 /dev/vdb 以前用过。 使用 parted 修复</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>导致问题的原因是添加的磁盘是在另一个虚拟机中新建的，已经有了分区表，现在的虚拟机并不能识别磁盘的分区表，运行parted命令重做分区表，中途需要输入三次命令。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># parted /dev/vdb</span>
<span class="line"></span>
<span class="line">GNU Parted 3.1</span>
<span class="line">Using /dev/vdb</span>
<span class="line">Welcome to GNU Parted! Type &#39;help&#39; to view a list of commands.</span>
<span class="line">(parted)                                                                  </span>
<span class="line">(parted) mklabel msdos</span>
<span class="line">Warning: The existing disk label on /dev/vdb will be destroyed and all data on this disk will be lost. Do</span>
<span class="line">you want to continue?</span>
<span class="line">Yes/No? yes                                                               </span>
<span class="line">(parted) quit                                                             </span>
<span class="line">Information: You may need to update /etc/fstab.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次运行pvcreate，问是否擦除dos签名，输入y，就可以将磁盘创建为PV了。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># pvcreate /dev/vdb /dev/vdc                     </span>
<span class="line">WARNING: dos signature detected on /dev/vdb at offset 510. Wipe it? [y/n]: y</span>
<span class="line">  Wiping dos signature on /dev/vdb.</span>
<span class="line">  Physical volume &quot;/dev/vdb&quot; successfully created.</span>
<span class="line">  Physical volume &quot;/dev/vdc&quot; successfully created.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建卷组" tabindex="-1"><a class="header-anchor" href="#创建卷组"><span>创建卷组</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># vgcreate vg /dev/vdb /dev/vdc</span>
<span class="line"></span>
<span class="line">  Volume group &quot;vg&quot; successfully created</span>
<span class="line"></span>
<span class="line"># vgs</span>
<span class="line"></span>
<span class="line">  VG #PV #LV #SN Attr   VSize   VFree  </span>
<span class="line">  vg   2   0   0 wz--n- 599.99g 599.99g</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="创建逻辑卷" tabindex="-1"><a class="header-anchor" href="#创建逻辑卷"><span>创建逻辑卷</span></a></h1><p>基于vg创建逻辑卷lv,名字为app</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># lvcreate -n app -L 599.99G vg</span>
<span class="line">  Rounding up size to full physical extent 599.99 GiB</span>
<span class="line">  Logical volume &quot;app&quot; created.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="格式化和挂载" tabindex="-1"><a class="header-anchor" href="#格式化和挂载"><span>格式化和挂载</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">用ext4的格式格式化/dev/vg/app</span>
<span class="line">mkfs -t ext4 /dev/vg/app</span>
<span class="line"></span>
<span class="line">mount /dev/vg/app /home</span>
<span class="line"></span>
<span class="line">echo &quot;/dev/vg/app /data ext4 defaults 0 0&quot; &gt;&gt;/etc/fstab</span>
<span class="line">mount -a</span>
<span class="line"></span>
<span class="line">df -h |grep vg</span>
<span class="line">/dev/mapper/vg-app  591G  6.1G  555G   2% /home/data</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20)]))}const p=e(l,[["render",d]]),v=JSON.parse('{"path":"/file-system/CentOS7%E4%B8%8BLVM%E7%BB%99%E8%85%BE%E8%AE%AF%E4%BA%91%E4%BA%91%E7%A1%AC%E7%9B%98%E6%89%A9%E5%AE%B9%E6%93%8D%E4%BD%9C.html","title":"CentOS7下LVM给腾讯云云硬盘扩容操作","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"file-system/CentOS7下LVM给腾讯云云硬盘扩容操作.md"}');export{p as comp,v as data};
