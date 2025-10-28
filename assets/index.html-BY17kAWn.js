import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,o as i}from"./app-BiQR_lPj.js";const l={};function d(p,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="centos7下lvm给腾讯云云硬盘扩容操作" tabindex="-1"><a class="header-anchor" href="#centos7下lvm给腾讯云云硬盘扩容操作"><span>CentOS7下LVM给腾讯云云硬盘扩容操作</span></a></h1><p>腾讯云安装ELK后，100G的硬盘不够用了，再购买了500G的硬盘想组成600G，客服居然说不可以，难道腾讯云做了限制了？试试用lvm来给100G的硬盘扩容到600G</p><p><img src="https://imgoss.xgss.net/picgo/image-20211202093956343.png?aliyun" alt=""></p><p>实测扩容是可以的</p><p><img src="https://imgoss.xgss.net/picgo/image-20211202160901943.png?aliyun" alt="image-20211202160901943"></p><h2 id="查看硬盘是否购买" tabindex="-1"><a class="header-anchor" href="#查看硬盘是否购买"><span>查看硬盘是否购买</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># fdisk -l</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Disk /dev/vda: 53.7 GB, 53687091200 bytes, 104857600 sectors</span></span>
<span class="line"><span>..</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   Device Boot      Start         End      Blocks   Id  System</span></span>
<span class="line"><span>/dev/vda1   *        2048   104857566    52427759+  83  Linux</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Disk /dev/vdb: 107.4 GB, 107374182400 bytes, 209715200 sectors</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   Device Boot      Start         End      Blocks   Id  System</span></span>
<span class="line"><span>/dev/vdb1            2048   209715199   104856576   83  Linux</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Disk /dev/vdc: 536.9 GB, 536870912000 bytes, 1048576000 sectors</span></span>
<span class="line"><span>...</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建物理卷" tabindex="-1"><a class="header-anchor" href="#创建物理卷"><span>创建物理卷</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># pvcreate /dev/vdb /dev/vdc</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Device /dev/vdb excluded by a filter.</span></span>
<span class="line"><span>  Physical volume &quot;/dev/vdc&quot; successfully created.</span></span>
<span class="line"><span>  报错，由于 /dev/vdb 以前用过。 使用 parted 修复</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>导致问题的原因是添加的磁盘是在另一个虚拟机中新建的，已经有了分区表，现在的虚拟机并不能识别磁盘的分区表，运行parted命令重做分区表，中途需要输入三次命令。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># parted /dev/vdb</span></span>
<span class="line"><span></span></span>
<span class="line"><span>GNU Parted 3.1</span></span>
<span class="line"><span>Using /dev/vdb</span></span>
<span class="line"><span>Welcome to GNU Parted! Type &#39;help&#39; to view a list of commands.</span></span>
<span class="line"><span>(parted)                                                                  </span></span>
<span class="line"><span>(parted) mklabel msdos</span></span>
<span class="line"><span>Warning: The existing disk label on /dev/vdb will be destroyed and all data on this disk will be lost. Do</span></span>
<span class="line"><span>you want to continue?</span></span>
<span class="line"><span>Yes/No? yes                                                               </span></span>
<span class="line"><span>(parted) quit                                                             </span></span>
<span class="line"><span>Information: You may need to update /etc/fstab.</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次运行pvcreate，问是否擦除dos签名，输入y，就可以将磁盘创建为PV了。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># pvcreate /dev/vdb /dev/vdc                     </span></span>
<span class="line"><span>WARNING: dos signature detected on /dev/vdb at offset 510. Wipe it? [y/n]: y</span></span>
<span class="line"><span>  Wiping dos signature on /dev/vdb.</span></span>
<span class="line"><span>  Physical volume &quot;/dev/vdb&quot; successfully created.</span></span>
<span class="line"><span>  Physical volume &quot;/dev/vdc&quot; successfully created.</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建卷组" tabindex="-1"><a class="header-anchor" href="#创建卷组"><span>创建卷组</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># vgcreate vg /dev/vdb /dev/vdc</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Volume group &quot;vg&quot; successfully created</span></span>
<span class="line"><span></span></span>
<span class="line"><span># vgs</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  VG #PV #LV #SN Attr   VSize   VFree  </span></span>
<span class="line"><span>  vg   2   0   0 wz--n- 599.99g 599.99g</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="创建逻辑卷" tabindex="-1"><a class="header-anchor" href="#创建逻辑卷"><span>创建逻辑卷</span></a></h1><p>基于vg创建逻辑卷lv,名字为app</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># lvcreate -n app -L 599.99G vg</span></span>
<span class="line"><span>  Rounding up size to full physical extent 599.99 GiB</span></span>
<span class="line"><span>  Logical volume &quot;app&quot; created.</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="格式化和挂载" tabindex="-1"><a class="header-anchor" href="#格式化和挂载"><span>格式化和挂载</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>用ext4的格式格式化/dev/vg/app</span></span>
<span class="line"><span>mkfs -t ext4 /dev/vg/app</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mount /dev/vg/app /home</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;/dev/vg/app /data ext4 defaults 0 0&quot; &gt;&gt;/etc/fstab</span></span>
<span class="line"><span>mount -a</span></span>
<span class="line"><span></span></span>
<span class="line"><span>df -h |grep vg</span></span>
<span class="line"><span>/dev/mapper/vg-app  591G  6.1G  555G   2% /home/data</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20)]))}const r=n(l,[["render",d]]),v=JSON.parse('{"path":"/article/di7do5ml/","title":"CentOS7下LVM给腾讯云云硬盘扩容操作","lang":"en-US","frontmatter":{"title":"CentOS7下LVM给腾讯云云硬盘扩容操作","createTime":"2025/05/27 17:51:17","permalink":"/article/di7do5ml/"},"git":{"createdTime":1749111496000,"updatedTime":1750129445000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":2,"url":"https://github.com/star"}]},"readingTime":{"minutes":1.68,"words":503},"filePathRelative":"file-system/CentOS7下LVM给腾讯云云硬盘扩容操作.md"}');export{r as comp,v as data};
