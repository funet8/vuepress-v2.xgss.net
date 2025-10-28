import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,o as i}from"./app-BiQR_lPj.js";const l={};function p(d,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="rocky-linux-9-挂载硬盘的方法" tabindex="-1"><a class="header-anchor" href="#rocky-linux-9-挂载硬盘的方法"><span>Rocky Linux 9 挂载硬盘的方法</span></a></h1><p>在 <strong>Rocky Linux 9</strong> 上挂载硬盘，通常可以通过以下步骤进行操作：</p><h2 id="_1-检查硬盘" tabindex="-1"><a class="header-anchor" href="#_1-检查硬盘"><span>1. 检查硬盘</span></a></h2><p>首先，使用以下命令查看系统中的硬盘和分区情况：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>lsblk</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>或者</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>fdisk -l</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>这将列出所有连接到系统的硬盘和分区。记下你要挂载的硬盘设备名称（例如 <code>/dev/sdb</code>）。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>[root@node2 ~]# fdisk -l</span></span>
<span class="line"><span>Disk /dev/nvme0n1: 100 GiB, 107374182400 bytes, 209715200 sectors</span></span>
<span class="line"><span>Disk model: VMware Virtual NVMe Disk</span></span>
<span class="line"><span>Units: sectors of 1 * 512 = 512 bytes</span></span>
<span class="line"><span>Sector size (logical/physical): 512 bytes / 512 bytes</span></span>
<span class="line"><span>I/O size (minimum/optimal): 512 bytes / 512 bytes</span></span>
<span class="line"><span>Disklabel type: dos</span></span>
<span class="line"><span>Disk identifier: 0xd4f887b9</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Device         Boot   Start       End   Sectors Size Id Type</span></span>
<span class="line"><span>/dev/nvme0n1p1 *       2048   2099199   2097152   1G 83 Linux</span></span>
<span class="line"><span>/dev/nvme0n1p2      2099200 209715199 207616000  99G 8e Linux LVM</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>Disk /dev/mapper/rl-root: 65.17 GiB, 69973573632 bytes, 136667136 sectors</span></span>
<span class="line"><span>Units: sectors of 1 * 512 = 512 bytes</span></span>
<span class="line"><span>Sector size (logical/physical): 512 bytes / 512 bytes</span></span>
<span class="line"><span>I/O size (minimum/optimal): 512 bytes / 512 bytes</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>Disk /dev/mapper/rl-swap: 2.01 GiB, 2160066560 bytes, 4218880 sectors</span></span>
<span class="line"><span>Units: sectors of 1 * 512 = 512 bytes</span></span>
<span class="line"><span>Sector size (logical/physical): 512 bytes / 512 bytes</span></span>
<span class="line"><span>I/O size (minimum/optimal): 512 bytes / 512 bytes</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>Disk /dev/mapper/rl-home: 31.82 GiB, 34162606080 bytes, 66723840 sectors</span></span>
<span class="line"><span>Units: sectors of 1 * 512 = 512 bytes</span></span>
<span class="line"><span>Sector size (logical/physical): 512 bytes / 512 bytes</span></span>
<span class="line"><span>I/O size (minimum/optimal): 512 bytes / 512 bytes</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-创建分区-如果需要" tabindex="-1"><a class="header-anchor" href="#_2-创建分区-如果需要"><span>2. 创建分区（如果需要）</span></a></h2><p>在虚拟机中添加一块10G的硬盘</p><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1750146406508.png?tx" alt="img"></p><p>一路点击下一步</p><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1750146501951.png?tx" alt="img"></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>[root@node2 ~]# lsblk</span></span>
<span class="line"><span>NAME        MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS</span></span>
<span class="line"><span>sr0          11:0    1  2.1G  0 rom  </span></span>
<span class="line"><span>nvme0n1     259:0    0  100G  0 disk </span></span>
<span class="line"><span>├─nvme0n1p1 259:1    0    1G  0 part /boot</span></span>
<span class="line"><span>└─nvme0n1p2 259:2    0   99G  0 part </span></span>
<span class="line"><span>  ├─rl-root 253:0    0 65.2G  0 lvm  /</span></span>
<span class="line"><span>  ├─rl-swap 253:1    0    2G  0 lvm  [SWAP]</span></span>
<span class="line"><span>  └─rl-home 253:2    0 31.8G  0 lvm  /home</span></span>
<span class="line"><span>nvme0n2     259:3    0   10G  0 disk </span></span>
<span class="line"><span></span></span>
<span class="line"><span>[root@node2 ~]# fdisk -l|grep dev</span></span>
<span class="line"><span>Disk /dev/nvme0n1: 100 GiB, 107374182400 bytes, 209715200 sectors</span></span>
<span class="line"><span>/dev/nvme0n1p1 *       2048   2099199   2097152   1G 83 Linux</span></span>
<span class="line"><span>/dev/nvme0n1p2      2099200 209715199 207616000  99G 8e Linux LVM</span></span>
<span class="line"><span>Disk /dev/nvme0n2: 10 GiB, 10737418240 bytes, 20971520 sectors</span></span>
<span class="line"><span>Disk /dev/mapper/rl-root: 65.17 GiB, 69973573632 bytes, 136667136 sectors</span></span>
<span class="line"><span>Disk /dev/mapper/rl-swap: 2.01 GiB, 2160066560 bytes, 4218880 sectors</span></span>
<span class="line"><span>Disk /dev/mapper/rl-home: 31.82 GiB, 34162606080 bytes, 66723840 sectors</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在虚拟机中新增了一块 <code>/dev/nvme0n2</code> 10G的硬盘。</p><p>如果硬盘没有分区，需要先创建分区。使用 <code>fdisk</code> 或 <code>parted</code> 工具进行分区。以 <code>fdisk</code> 为例：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>fdisk /dev/nvme0n2</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>在 <code>fdisk</code> 工具中，输入以下命令：</p><ul><li><code>n</code> 创建新分区</li><li><code>p</code> 打印分区表</li><li><code>w</code> 写入分区表并退出</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># fdisk /dev/nvme0n2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Welcome to fdisk (util-linux 2.37.4).</span></span>
<span class="line"><span>Changes will remain in memory only, until you decide to write them.</span></span>
<span class="line"><span>Be careful before using the write command.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Device does not contain a recognized partition table.</span></span>
<span class="line"><span>Created a new DOS disklabel with disk identifier 0xd825f272.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Command (m for help): n</span></span>
<span class="line"><span>Partition type</span></span>
<span class="line"><span>   p   primary (0 primary, 0 extended, 4 free)</span></span>
<span class="line"><span>   e   extended (container for logical partitions)</span></span>
<span class="line"><span>Select (default p): p</span></span>
<span class="line"><span>Partition number (1-4, default 1): </span></span>
<span class="line"><span>First sector (2048-20971519, default 2048): </span></span>
<span class="line"><span>Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-20971519, default 20971519): </span></span>
<span class="line"><span></span></span>
<span class="line"><span>Created a new partition 1 of type &#39;Linux&#39; and of size 10 GiB.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Command (m for help): wq</span></span>
<span class="line"><span>The partition table has been altered.</span></span>
<span class="line"><span>Calling ioctl() to re-read partition table.</span></span>
<span class="line"><span>Syncing disks.</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>ll /dev/nvme0n2*</span></span>
<span class="line"><span>brw-rw---- 1 root disk 259, 3 Jun 17 15:54 /dev/nvme0n2</span></span>
<span class="line"><span>brw-rw---- 1 root disk 259, 5 Jun 17 15:54 /dev/nvme0n2p1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-格式化硬盘" tabindex="-1"><a class="header-anchor" href="#_3-格式化硬盘"><span>3. 格式化硬盘</span></a></h2><p>格式化分区为 <strong>ext4</strong> 文件系统（你也可以选择其他文件系统，如 <code>xfs</code>）：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>mkfs.ext4 /dev/nvme0n2p1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>实际操作：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>[root@node2 ~]# mkfs.ext4 /dev/nvme0n2p1</span></span>
<span class="line"><span>mke2fs 1.46.5 (30-Dec-2021)</span></span>
<span class="line"><span>Creating filesystem with 2621184 4k blocks and 655360 inodes</span></span>
<span class="line"><span>Filesystem UUID: e549f5c6-b149-47b8-a4b0-d5606466dfd1</span></span>
<span class="line"><span>Superblock backups stored on blocks: </span></span>
<span class="line"><span>        32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Allocating group tables: done                            </span></span>
<span class="line"><span>Writing inode tables: done                            </span></span>
<span class="line"><span>Creating journal (16384 blocks): done</span></span>
<span class="line"><span>Writing superblocks and filesystem accounting information: done</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-创建挂载点" tabindex="-1"><a class="header-anchor" href="#_4-创建挂载点"><span>4. 创建挂载点</span></a></h2><p>选择一个目录作为挂载点。例如，可以在 <code>/mnt</code> 下创建一个新的目录：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>mkdir /data10G</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="_5-挂载硬盘" tabindex="-1"><a class="header-anchor" href="#_5-挂载硬盘"><span>5. 挂载硬盘</span></a></h2><p>使用 <code>mount</code> 命令挂载分区：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>mount /dev/nvme0n2p1 /data10G</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>再查看是否成功</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>[root@node2 ~]# df -h</span></span>
<span class="line"><span>Filesystem           Size  Used Avail Use% Mounted on</span></span>
<span class="line"><span>devtmpfs             4.0M     0  4.0M   0% /dev</span></span>
<span class="line"><span>tmpfs                1.8G     0  1.8G   0% /dev/shm</span></span>
<span class="line"><span>tmpfs                725M  1.1M  724M   1% /run</span></span>
<span class="line"><span>/dev/mapper/rl-root   66G  2.3G   63G   4% /</span></span>
<span class="line"><span>/dev/nvme0n1p1       960M  338M  623M  36% /boot</span></span>
<span class="line"><span>/dev/mapper/rl-home   32G  259M   32G   1% /home</span></span>
<span class="line"><span>tmpfs                363M     0  363M   0% /run/user/0</span></span>
<span class="line"><span>/dev/nvme0n2p1       9.8G   24K  9.3G   1% /data10G</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-配置自动挂载" tabindex="-1"><a class="header-anchor" href="#_6-配置自动挂载"><span>6. 配置自动挂载</span></a></h2><p>为了在系统重启后自动挂载，可以编辑 <code>/etc/fstab</code> 文件。在文件末尾添加一行：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>/dev/nvme0n2p1 /data10G ext4 defaults 0 0</span></span>
<span class="line"><span>或者</span></span>
<span class="line"><span>echo &#39;/dev/nvme0n2p1 /data10G ext4 defaults 0 0&#39; &gt;&gt; /etc/fstab</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样设置后，每次系统启动时都会自动挂载硬盘。</p><h2 id="_7-检查挂载情况" tabindex="-1"><a class="header-anchor" href="#_7-检查挂载情况"><span>7. 检查挂载情况</span></a></h2><p>你可以使用以下命令确认硬盘是否已成功挂载：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>df -h</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>这会显示所有挂载的文件系统及其使用情况。</p><h1 id="命令行" tabindex="-1"><a class="header-anchor" href="#命令行"><span>命令行</span></a></h1><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># fdisk -l</span></span>
<span class="line"><span># fdisk 硬盘</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>Command (m for help): n</span></span>
<span class="line"><span>Select (default p): p</span></span>
<span class="line"><span>Command (m for help): wq</span></span>
<span class="line"><span></span></span>
<span class="line"><span>格式化：</span></span>
<span class="line"><span># mkfs.ext4 /dev/vdb1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;/dev/vdb1 /home ext4 defaults 0 0&#39; &gt;&gt; /etc/fstab</span></span>
<span class="line"><span># mount -a</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="挂载大硬盘" tabindex="-1"><a class="header-anchor" href="#挂载大硬盘"><span>挂载大硬盘</span></a></h1><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># fdisk -l</span></span>
<span class="line"><span></span></span>
<span class="line"><span># parted -a optimal /dev/sdb    #对硬盘sdb进行分区</span></span>
<span class="line"><span>mklabel gpt                    #使用GPT格式            </span></span>
<span class="line"><span>mkpart primary 1 -1                    #建立一个主分区    </span></span>
<span class="line"><span>print                        #显示分区信息</span></span>
<span class="line"><span>quit                        #退出</span></span>
<span class="line"><span># mkfs.xfs /dev/sdb1            #格式化为xfs格式</span></span>
<span class="line"><span># echo &quot;/dev/sdb1    /data1    xfs    defaults    0 0&quot; &gt;&gt; /etc/fstab #加入自动挂载</span></span>
<span class="line"><span># mount -a                    #挂载分区</span></span>
<span class="line"><span>df -h                        #查看磁盘信息</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上就是在 <strong>Rocky Linux 9</strong> 中挂载硬盘的基本步骤。如果你有任何问题或需要更多细节，随时告诉我！</p>`,47)]))}const t=n(l,[["render",p]]),v=JSON.parse('{"path":"/Rocky-Linux/4.Rocky-Linux-9%E6%8C%82%E8%BD%BD%E7%A1%AC%E7%9B%98%E7%9A%84%E6%96%B9%E6%B3%95.html","title":"Rocky Linux 9 挂载硬盘的方法","lang":"en-US","frontmatter":{},"git":{"createdTime":1752136049000,"updatedTime":1752136049000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}]},"readingTime":{"minutes":3.88,"words":1164},"filePathRelative":"Rocky-Linux/4.Rocky-Linux-9挂载硬盘的方法.md"}');export{t as comp,v as data};
