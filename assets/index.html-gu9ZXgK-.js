import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as e}from"./app-BiQR_lPj.js";const l={};function p(c,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h1 id="rocky-linux-9-系统初始化与安全加固脚本" tabindex="-1"><a class="header-anchor" href="#rocky-linux-9-系统初始化与安全加固脚本"><span>Rocky Linux 9 系统初始化与安全加固脚本</span></a></h1><p>在服务器运维与系统管理的实际场景中，一个安全、稳定、标准化的系统环境至关重要。Rocky Linux 作为一款企业级稳定发行版，越来越多地被用于生产环境部署。为节省重复配置的时间、降低人为操作失误率，同时提升系统的安全性，编写一套系统初始化与安全加固脚本显得尤为必要。</p><p>本文将基于 Rocky Linux 9，介绍如何通过 Shell 脚本实现系统初始化配置（如时间同步、YUM 源更换、基础软件安装）、安全加固（如 SSH 配置、密码策略、防火墙规则等）的一体化自动部署，帮助用户快速构建一套符合安全基线的操作系统环境。</p><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1750138991746.png?tx" alt="img"></p><h1 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h1><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># wget https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/Rocky_Linux_9_system_init_shell_mini.sh</span></span>
<span class="line"><span># sh Rocky_Linux_9_system_init_shell_mini.sh</span></span>
<span class="line"><span>或者</span></span>
<span class="line"><span>wget -qO- https://gitee.com/funet8/Rocky-Linux-Shell/raw/main/shell/Rocky_Linux_9_system_init_shell_mini.sh | sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="主要功能" tabindex="-1"><a class="header-anchor" href="#主要功能"><span>主要功能</span></a></h1><h2 id="_1-修改主机名-set-hostname" tabindex="-1"><a class="header-anchor" href="#_1-修改主机名-set-hostname"><span>1.修改主机名 ： set_hostname</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>HOSTNAME=&quot;node2&quot;</span></span>
<span class="line"><span>hostnamectl set-hostname \${HOSTNAME}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-安装基础软件包-install-base-software" tabindex="-1"><a class="header-anchor" href="#_2-安装基础软件包-install-base-software"><span>2.安装基础软件包 ： install_base_software</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>dnf install -y vim wget curl lrzsz net-tools lsof bash-completion yum-utils tar zip unzip sudo cronie chrony policycoreutils-python-utils</span></span>
<span class="line"><span># 安装 EPEL 仓库</span></span>
<span class="line"><span>dnf install -y epel-release</span></span>
<span class="line"><span>dnf makecache</span></span>
<span class="line"><span></span></span>
<span class="line"><span># rc.local添加执行权限   </span></span>
<span class="line"><span>chmod +x /etc/rc.d/rc.local</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-更新系统-update-system" tabindex="-1"><a class="header-anchor" href="#_3-更新系统-update-system"><span>3.更新系统 ： update_system</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>dnf clean all</span></span>
<span class="line"><span>dnf -y update</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-修改ssh端口-config-ssh" tabindex="-1"><a class="header-anchor" href="#_4-修改ssh端口-config-ssh"><span>4.修改SSH端口 ： config_ssh</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>SSH_PROT=&quot;60920&quot;</span></span>
<span class="line"><span>SSHD_CONFIG=&quot;/etc/ssh/sshd_config&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	echo &quot;修改 sshd_config 文件...&quot;</span></span>
<span class="line"><span>	if grep -q &quot;^#Port 22&quot; &quot;$SSHD_CONFIG&quot;; then</span></span>
<span class="line"><span>		sed -i &quot;s/^#Port 22/Port \${SSH_PROT}/&quot; &quot;$SSHD_CONFIG&quot;</span></span>
<span class="line"><span>	elif grep -q &quot;^Port &quot; &quot;$SSHD_CONFIG&quot;; then</span></span>
<span class="line"><span>		sed -i &quot;s/^Port .*/Port \${SSH_PROT}/&quot; &quot;$SSHD_CONFIG&quot;</span></span>
<span class="line"><span>	else</span></span>
<span class="line"><span>		echo &quot;Port \${SSH_PROT}&quot; &gt;&gt; &quot;$SSHD_CONFIG&quot;</span></span>
<span class="line"><span>	fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	echo &quot;添加防火墙端口规则...&quot;</span></span>
<span class="line"><span>	firewall-cmd --permanent --add-port=\${SSH_PROT}/tcp</span></span>
<span class="line"><span>	firewall-cmd --reload</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	echo &quot;重启 sshd 服务...&quot;</span></span>
<span class="line"><span>	systemctl restart sshd</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-配置防火墙-configure-firewall" tabindex="-1"><a class="header-anchor" href="#_5-配置防火墙-configure-firewall"><span>5.配置防火墙 ： configure_firewall</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 确保防火墙服务已启用</span></span>
<span class="line"><span>    systemctl enable firewalld</span></span>
<span class="line"><span>    systemctl start firewalld</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 开放必要端口</span></span>
<span class="line"><span>    firewall-cmd --permanent --add-service=ssh</span></span>
<span class="line"><span>    firewall-cmd --permanent --add-service=http</span></span>
<span class="line"><span>    firewall-cmd --permanent --add-service=https</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 重新加载防火墙规则</span></span>
<span class="line"><span>    firewall-cmd --reload</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-配置ssh安全-configure-ssh" tabindex="-1"><a class="header-anchor" href="#_6-配置ssh安全-configure-ssh"><span>6.配置SSH安全 ： configure_ssh</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span> 备份原始配置</span></span>
<span class="line"><span>    cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak</span></span>
<span class="line"><span>    log &quot;INFO&quot; &quot;已备份SSH配置文件: /etc/ssh/sshd_config.bak&quot;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 配置SSH安全选项</span></span>
<span class="line"><span>    sed -i &#39;s/#PermitRootLogin yes/PermitRootLogin no/g&#39; /etc/ssh/sshd_config</span></span>
<span class="line"><span>    sed -i &#39;s/#PasswordAuthentication yes/PasswordAuthentication no/g&#39; /etc/ssh/sshd_config</span></span>
<span class="line"><span>    sed -i &#39;s/#PermitEmptyPasswords no/PermitEmptyPasswords no/g&#39; /etc/ssh/sshd_config</span></span>
<span class="line"><span>    sed -i &#39;s/#UseDNS yes/UseDNS no/g&#39; /etc/ssh/sshd_config</span></span>
<span class="line"><span>    sed -i &#39;s/#AllowTcpForwarding yes/AllowTcpForwarding no/g&#39; /etc/ssh/sshd_config</span></span>
<span class="line"><span>    sed -i &#39;s/#X11Forwarding yes/X11Forwarding no/g&#39; /etc/ssh/sshd_config</span></span>
<span class="line"><span>    sed -i &#39;s/#MaxAuthTries 6/MaxAuthTries 3/g&#39; /etc/ssh/sshd_config</span></span>
<span class="line"><span>    sed -i &#39;s/#LoginGraceTime 2m/LoginGraceTime 60/g&#39; /etc/ssh/sshd_config</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>	mkdir -p /root/.ssh</span></span>
<span class="line"><span>    # 将公钥写入 authorized_keys 文件</span></span>
<span class="line"><span>    echo &quot;$PUB_KEY&quot; &gt;&gt; /root/.ssh/authorized_keys</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>    chmod 600 /root/.ssh/authorized_keys</span></span>
<span class="line"><span>    chmod 700 /root/.ssh</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>    # 重启 SSH 服务以应用更改</span></span>
<span class="line"><span>    systemctl restart sshd</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-配置selinux-configure-selinux" tabindex="-1"><a class="header-anchor" href="#_7-配置selinux-configure-selinux"><span>7.配置SELinux ： configure_selinux</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cp /etc/selinux/config /etc/selinux/config.bak</span></span>
<span class="line"><span>    log &quot;INFO&quot; &quot;已备份SELinux配置文件: /etc/selinux/config.bak&quot;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 设置SELinux为强制模式</span></span>
<span class="line"><span>    sed -i &#39;s/SELINUX=permissive/SELINUX=enforcing/g&#39; /etc/selinux/config</span></span>
<span class="line"><span>    sed -i &#39;s/SELINUX=disabled/SELINUX=enforcing/g&#39; /etc/selinux/config</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 检查当前SELinux状态</span></span>
<span class="line"><span>    current_status=$(getenforce)</span></span>
<span class="line"><span>    if [ &quot;$current_status&quot; != &quot;Enforcing&quot; ]; then</span></span>
<span class="line"><span>        log &quot;WARNING&quot; &quot;SELinux当前状态为 $current_status，需要重启系统以应用更改&quot;</span></span>
<span class="line"><span>        log &quot;WARNING&quot; &quot;当前配置已设置为强制模式，重启后生效&quot;</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>        log &quot;INFO&quot; &quot;SELinux已处于强制模式&quot;</span></span>
<span class="line"><span>    fi</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-配置系统日志-configure-logging" tabindex="-1"><a class="header-anchor" href="#_8-配置系统日志-configure-logging"><span>8.配置系统日志 ： configure_logging</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 确保rsyslog服务已启用</span></span>
<span class="line"><span>    systemctl enable rsyslog</span></span>
<span class="line"><span>    systemctl start rsyslog</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 配置日志轮转</span></span>
<span class="line"><span>    cat &gt; /etc/logrotate.d/secure &lt;&lt; &quot;EOF&quot;</span></span>
<span class="line"><span>/var/log/secure {</span></span>
<span class="line"><span>    daily</span></span>
<span class="line"><span>    missingok</span></span>
<span class="line"><span>    rotate 7</span></span>
<span class="line"><span>    compress</span></span>
<span class="line"><span>    delaycompress</span></span>
<span class="line"><span>    notifempty</span></span>
<span class="line"><span>    create 600 root root</span></span>
<span class="line"><span>    sharedscripts</span></span>
<span class="line"><span>    postrotate</span></span>
<span class="line"><span>        /usr/bin/systemctl restart rsyslog.service &gt; /dev/null 2&gt;&amp;1 || true</span></span>
<span class="line"><span>    endscript</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 配置日志大小限制</span></span>
<span class="line"><span>    cat &gt; /etc/systemd/journald.conf &lt;&lt; &quot;EOF&quot;</span></span>
<span class="line"><span>[Journal]</span></span>
<span class="line"><span>Storage=persistent</span></span>
<span class="line"><span>Compress=yes</span></span>
<span class="line"><span>SyncIntervalSec=5m</span></span>
<span class="line"><span>RateLimitIntervalSec=30s</span></span>
<span class="line"><span>RateLimitBurst=1000</span></span>
<span class="line"><span>SystemMaxUse=100M</span></span>
<span class="line"><span>SystemMaxFileSize=20M</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 重启journald服务</span></span>
<span class="line"><span>    systemctl restart systemd-journald</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-配置账户安全-configure-accounts" tabindex="-1"><a class="header-anchor" href="#_9-配置账户安全-configure-accounts"><span>9.配置账户安全 ： configure_accounts</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 设置密码复杂度策略</span></span>
<span class="line"><span>    if [ ! -f &quot;/etc/pam.d/system-auth.bak&quot; ]; then</span></span>
<span class="line"><span>        cp /etc/pam.d/system-auth /etc/pam.d/system-auth.bak</span></span>
<span class="line"><span>        log &quot;INFO&quot; &quot;已备份系统认证配置: /etc/pam.d/system-auth.bak&quot;</span></span>
<span class="line"><span>    fi</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 添加密码复杂度要求</span></span>
<span class="line"><span>    sed -i &#39;s/password    requisite     pam_pwquality.so/password    requisite     pam_pwquality.so minlen=12 ucredit=-1 lcredit=-1 dcredit=-1 ocredit=-1/g&#39; /etc/pam.d/system-auth</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 设置密码过期策略</span></span>
<span class="line"><span>    cat &gt; /etc/login.defs &lt;&lt; &quot;EOF&quot;</span></span>
<span class="line"><span># 密码过期设置</span></span>
<span class="line"><span>PASS_MAX_DAYS   90</span></span>
<span class="line"><span>PASS_MIN_DAYS   7</span></span>
<span class="line"><span>PASS_WARN_AGE   14</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 账户设置</span></span>
<span class="line"><span>UID_MIN                  1000</span></span>
<span class="line"><span>UID_MAX                 60000</span></span>
<span class="line"><span>GID_MIN                  1000</span></span>
<span class="line"><span>GID_MAX                 60000</span></span>
<span class="line"><span>CREATE_HOME             yes</span></span>
<span class="line"><span>UMASK                    077</span></span>
<span class="line"><span>ENCRYPT_METHOD           SHA512</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 锁定不必要的账户</span></span>
<span class="line"><span>    for user in adm lp sync shutdown halt news uucp operator games gopher; do</span></span>
<span class="line"><span>        if id &quot;$user&quot; &amp;&gt;/dev/null; then</span></span>
<span class="line"><span>            usermod -L &quot;$user&quot;</span></span>
<span class="line"><span>            log &quot;INFO&quot; &quot;已锁定账户: $user&quot;</span></span>
<span class="line"><span>        fi</span></span>
<span class="line"><span>    done</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    log &quot;INFO&quot; &quot;账户安全配置完成&quot;</span></span>
<span class="line"><span>    log &quot;INFO&quot; &quot;已设置密码复杂度要求和过期策略&quot;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 配置系统资源限制</span></span>
<span class="line"><span>configure_resource_limits() {</span></span>
<span class="line"><span>    log &quot;INFO&quot; &quot;配置系统资源限制...&quot;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 设置用户资源限制</span></span>
<span class="line"><span>    cat &gt; /etc/security/limits.conf &lt;&lt; &quot;EOF&quot;</span></span>
<span class="line"><span># 资源限制配置</span></span>
<span class="line"><span>*               hard    core            0</span></span>
<span class="line"><span>*               hard    nproc           10000</span></span>
<span class="line"><span>*               hard    nofile          65535</span></span>
<span class="line"><span>root            hard    nproc           unlimited</span></span>
<span class="line"><span>root            hard    nofile          65535</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 配置PAM以应用资源限制</span></span>
<span class="line"><span>    if ! grep -q &quot;pam_limits.so&quot; /etc/pam.d/common-session; then</span></span>
<span class="line"><span>        echo &quot;session    required   pam_limits.so&quot; &gt;&gt; /etc/pam.d/common-session</span></span>
<span class="line"><span>    fi</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    log &quot;INFO&quot; &quot;系统资源限制配置完成&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_10-配置系统资源限制-configure-resource-limits" tabindex="-1"><a class="header-anchor" href="#_10-配置系统资源限制-configure-resource-limits"><span>10.配置系统资源限制 ： configure_resource_limits</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 设置用户资源限制</span></span>
<span class="line"><span>    cat &gt; /etc/security/limits.conf &lt;&lt; &quot;EOF&quot;</span></span>
<span class="line"><span># 资源限制配置</span></span>
<span class="line"><span>*               hard    core            0</span></span>
<span class="line"><span>*               hard    nproc           10000</span></span>
<span class="line"><span>*               hard    nofile          65535</span></span>
<span class="line"><span>root            hard    nproc           unlimited</span></span>
<span class="line"><span>root            hard    nofile          65535</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 配置PAM以应用资源限制</span></span>
<span class="line"><span>    if ! grep -q &quot;pam_limits.so&quot; /etc/pam.d/common-session; then</span></span>
<span class="line"><span>        echo &quot;session    required   pam_limits.so&quot; &gt;&gt; /etc/pam.d/common-session</span></span>
<span class="line"><span>    fi</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_11-配置网络安全-configure-network-security" tabindex="-1"><a class="header-anchor" href="#_11-配置网络安全-configure-network-security"><span>11.配置网络安全 ： configure_network_security</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>cp /etc/sysctl.conf /etc/sysctl.conf.bak</span></span>
<span class="line"><span>    log &quot;INFO&quot; &quot;已备份系统参数配置: /etc/sysctl.conf.bak&quot;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 配置系统网络参数</span></span>
<span class="line"><span>    cat &gt; /etc/sysctl.d/99-security-hardening.conf &lt;&lt; &quot;EOF&quot;</span></span>
<span class="line"><span># 防止IP欺骗</span></span>
<span class="line"><span>net.ipv4.conf.all.rp_filter = 1</span></span>
<span class="line"><span>net.ipv4.conf.default.rp_filter = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 禁用IP源路由</span></span>
<span class="line"><span>net.ipv4.conf.all.accept_source_route = 0</span></span>
<span class="line"><span>net.ipv4.conf.default.accept_source_route = 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 禁用ICMP重定向</span></span>
<span class="line"><span>net.ipv4.conf.all.accept_redirects = 0</span></span>
<span class="line"><span>net.ipv4.conf.default.accept_redirects = 0</span></span>
<span class="line"><span>net.ipv4.conf.all.secure_redirects = 0</span></span>
<span class="line"><span>net.ipv4.conf.default.secure_redirects = 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 不发送ICMP重定向</span></span>
<span class="line"><span>net.ipv4.conf.all.send_redirects = 0</span></span>
<span class="line"><span>net.ipv4.conf.default.send_redirects = 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 启用SYN洪水保护</span></span>
<span class="line"><span>net.ipv4.tcp_syncookies = 1</span></span>
<span class="line"><span>net.ipv4.tcp_max_syn_backlog = 2048</span></span>
<span class="line"><span>net.ipv4.tcp_synack_retries = 3</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 禁用IP转发</span></span>
<span class="line"><span>net.ipv4.ip_forward = 0</span></span>
<span class="line"><span># 启用IP转发，改为此配置，并且执行生效： sysctl -p</span></span>
<span class="line"><span># net.ipv4.ip_forward = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># 禁用IPv6</span></span>
<span class="line"><span>net.ipv6.conf.all.disable_ipv6 = 1</span></span>
<span class="line"><span>net.ipv6.conf.default.disable_ipv6 = 1</span></span>
<span class="line"><span>net.ipv6.conf.lo.disable_ipv6 = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 启用内核保护</span></span>
<span class="line"><span>kernel.exec-shield = 1</span></span>
<span class="line"><span>kernel.randomize_va_space = 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 限制core文件大小</span></span>
<span class="line"><span>fs.suid_dumpable = 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 提高网络性能</span></span>
<span class="line"><span>net.core.rmem_max = 16777216</span></span>
<span class="line"><span>net.core.wmem_max = 16777216</span></span>
<span class="line"><span>net.core.netdev_max_backlog = 250000</span></span>
<span class="line"><span>net.core.somaxconn = 4096</span></span>
<span class="line"><span>net.ipv4.tcp_rmem = 4096 87380 16777216</span></span>
<span class="line"><span>net.ipv4.tcp_wmem = 4096 65536 16777216</span></span>
<span class="line"><span>net.ipv4.tcp_max_tw_buckets = 1440000</span></span>
<span class="line"><span>net.ipv4.tcp_fin_timeout = 15</span></span>
<span class="line"><span>net.ipv4.tcp_keepalive_time = 300</span></span>
<span class="line"><span>net.ipv4.tcp_max_syn_backlog = 8192</span></span>
<span class="line"><span>net.ipv4.tcp_timestamps = 0</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 应用系统参数</span></span>
<span class="line"><span>    sysctl --system</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_12-配置cron和at服务-configure-cron" tabindex="-1"><a class="header-anchor" href="#_12-配置cron和at服务-configure-cron"><span>12.配置Cron和at服务 ： configure_cron</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 确保Cron服务已启用</span></span>
<span class="line"><span>    systemctl enable crond</span></span>
<span class="line"><span>    systemctl start crond</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 确保atd服务已禁用</span></span>
<span class="line"><span>    systemctl disable atd</span></span>
<span class="line"><span>    systemctl stop atd</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 配置Cron安全</span></span>
<span class="line"><span>    chmod 600 /etc/crontab</span></span>
<span class="line"><span>    chmod 600 /etc/cron.hourly</span></span>
<span class="line"><span>    chmod 600 /etc/cron.daily</span></span>
<span class="line"><span>    chmod 600 /etc/cron.weekly</span></span>
<span class="line"><span>    chmod 600 /etc/cron.monthly</span></span>
<span class="line"><span>    chmod 600 /etc/cron.d</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 限制访问Cron</span></span>
<span class="line"><span>    echo &quot;root&quot; &gt; /etc/cron.allow</span></span>
<span class="line"><span>    rm -f /etc/cron.deny</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_13-自动配置-chronyd-同步时间-configure-time" tabindex="-1"><a class="header-anchor" href="#_13-自动配置-chronyd-同步时间-configure-time"><span>13.自动配置 chronyd 同步时间 ： configure_time</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>dnf install -y chrony</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	sed -i &#39;s/^server/#server/g&#39; /etc/chrony.conf</span></span>
<span class="line"><span>	echo &quot;server ntp.aliyun.com iburst&quot; &gt;&gt; /etc/chrony.conf</span></span>
<span class="line"><span>	echo &quot;server 0.centos.pool.ntp.org iburst&quot; &gt;&gt; /etc/chrony.conf</span></span>
<span class="line"><span>	echo &quot;server 1.centos.pool.ntp.org iburst&quot; &gt;&gt; /etc/chrony.conf</span></span>
<span class="line"><span>	echo &quot;server 2.centos.pool.ntp.org iburst&quot; &gt;&gt; /etc/chrony.conf</span></span>
<span class="line"><span>	echo &quot;server 3.centos.pool.ntp.org iburst&quot; &gt;&gt; /etc/chrony.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	systemctl restart chronyd</span></span>
<span class="line"><span>	systemctl enable chronyd</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_14-配置系统审计-configure-audit" tabindex="-1"><a class="header-anchor" href="#_14-配置系统审计-configure-audit"><span>14.配置系统审计 ： configure_audit</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 安装auditd</span></span>
<span class="line"><span>    dnf -y install audit audit-libs</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 备份原始配置</span></span>
<span class="line"><span>    cp /etc/audit/auditd.conf /etc/audit/auditd.conf.bak</span></span>
<span class="line"><span>    log &quot;INFO&quot; &quot;已备份审计配置: /etc/audit/auditd.conf.bak&quot;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 配置auditd</span></span>
<span class="line"><span>    sed -i &#39;s/max_log_file = 8/max_log_file = 100/g&#39; /etc/audit/auditd.conf</span></span>
<span class="line"><span>    sed -i &#39;s/max_log_file_action = ROTATE/max_log_file_action = KEEP_LOGS/g&#39; /etc/audit/auditd.conf</span></span>
<span class="line"><span>    sed -i &#39;s/num_logs = 5/num_logs = 50/g&#39; /etc/audit/auditd.conf</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 配置审计规则</span></span>
<span class="line"><span>    cat &gt; /etc/audit/rules.d/audit.rules &lt;&lt; &quot;EOF&quot;</span></span>
<span class="line"><span># 基本审计规则</span></span>
<span class="line"><span>## 登录和认证</span></span>
<span class="line"><span>-w /var/log/faillog -p wa -k logins</span></span>
<span class="line"><span>-w /var/log/lastlog -p wa -k logins</span></span>
<span class="line"><span>-w /var/log/tallylog -p wa -k logins</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 账户和权限</span></span>
<span class="line"><span>-w /etc/group -p wa -k identity</span></span>
<span class="line"><span>-w /etc/passwd -p wa -k identity</span></span>
<span class="line"><span>-w /etc/gshadow -p wa -k identity</span></span>
<span class="line"><span>-w /etc/shadow -p wa -k identity</span></span>
<span class="line"><span>-w /etc/security/opasswd -p wa -k identity</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 关键文件和目录</span></span>
<span class="line"><span>-w /etc/sudoers -p wa -k sudo</span></span>
<span class="line"><span>-w /etc/ssh/sshd_config -p wa -k sshd</span></span>
<span class="line"><span>-w /etc/selinux/ -p wa -k selinux</span></span>
<span class="line"><span>-w /etc/grub2.cfg -p wa -k bootloader</span></span>
<span class="line"><span>-w /etc/localtime -p wa -k time-change</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 系统事件</span></span>
<span class="line"><span>-w /var/log/audit/ -p wa -k auditd</span></span>
<span class="line"><span>-w /etc/sysctl.conf -p wa -k sysctl</span></span>
<span class="line"><span>-w /usr/bin/newgrp -p x -k privileged</span></span>
<span class="line"><span>-w /usr/bin/sudo -p x -k privileged</span></span>
<span class="line"><span>-w /usr/bin/su -p x -k privileged</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 内核模块</span></span>
<span class="line"><span>-w /sbin/insmod -p x -k modules</span></span>
<span class="line"><span>-w /sbin/rmmod -p x -k modules</span></span>
<span class="line"><span>-w /sbin/modprobe -p x -k modules</span></span>
<span class="line"><span>-a always,exit -F arch=b64 -S init_module,finit_module -k modules</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 关键系统调用</span></span>
<span class="line"><span>-a always,exit -F arch=b64 -S adjtimex -S settimeofday -k time-change</span></span>
<span class="line"><span>-a always,exit -F arch=b32 -S adjtimex -S settimeofday -k time-change</span></span>
<span class="line"><span>-a always,exit -F arch=b64 -S clock_settime -k time-change</span></span>
<span class="line"><span>-a always,exit -F arch=b32 -S clock_settime -k time-change</span></span>
<span class="line"><span>-a always,exit -F arch=b64 -S clone -S fork -S vfork -k process</span></span>
<span class="line"><span>-a always,exit -F arch=b32 -S clone -S fork -S vfork -k process</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 网络活动</span></span>
<span class="line"><span>-a always,exit -F arch=b64 -S socket -S bind -S connect -k network</span></span>
<span class="line"><span>-a always,exit -F arch=b32 -S socket -S bind -S connect -k network</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 特权命令</span></span>
<span class="line"><span>-a always,exit -F path=/usr/bin/sudo -F perm=x -F auid&gt;=1000 -F auid!=unset -k privileged</span></span>
<span class="line"><span>-a always,exit -F path=/usr/bin/newgrp -F perm=x -F auid&gt;=1000 -F auid!=unset -k privileged</span></span>
<span class="line"><span>-a always,exit -F path=/usr/bin/passwd -F perm=x -F auid&gt;=1000 -F auid!=unset -k privileged</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 敏感文件</span></span>
<span class="line"><span>-a always,exit -F path=/etc/issue -F perm=wa -F auid&gt;=1000 -F auid!=unset -k etc-files</span></span>
<span class="line"><span>-a always,exit -F path=/etc/issue.net -F perm=wa -F auid&gt;=1000 -F auid!=unset -k etc-files</span></span>
<span class="line"><span>-a always,exit -F path=/etc/motd -F perm=wa -F auid&gt;=1000 -F auid!=unset -k etc-files</span></span>
<span class="line"><span>-a always,exit -F path=/etc/group -F perm=wa -F auid&gt;=1000 -F auid!=unset -k etc-files</span></span>
<span class="line"><span>-a always,exit -F path=/etc/passwd -F perm=wa -F auid&gt;=1000 -F auid!=unset -k etc-files</span></span>
<span class="line"><span>-a always,exit -F path=/etc/shadow -F perm=wa -F auid&gt;=1000 -F auid!=unset -k etc-files</span></span>
<span class="line"><span>-a always,exit -F path=/etc/gshadow -F perm=wa -F auid&gt;=1000 -F auid!=unset -k etc-files</span></span>
<span class="line"><span>-a always,exit -F path=/etc/sudoers -F perm=r -F auid&gt;=1000 -F auid!=unset -k sudoers</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 审计配置</span></span>
<span class="line"><span>-w /etc/audit/ -p wa -k auditd</span></span>
<span class="line"><span>-w /etc/libaudit.conf -p wa -k auditd</span></span>
<span class="line"><span>-w /etc/audisp/ -p wa -k auditd</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 性能优化</span></span>
<span class="line"><span>-f 2</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 启用并启动auditd服务</span></span>
<span class="line"><span>    systemctl enable auditd</span></span>
<span class="line"><span>    systemctl restart auditd</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_15-安装安全工具-install-security-tools" tabindex="-1"><a class="header-anchor" href="#_15-安装安全工具-install-security-tools"><span>15.安装安全工具 ： install_security_tools</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 安装基础安全工具</span></span>
<span class="line"><span>    # 如果报错：Error: Unable to find a match: lynis rkhunter fail2ban</span></span>
<span class="line"><span>    # dnf install -y epel-release</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    dnf -y install aide lynis rkhunter fail2ban nmap sysstat lsof bind-utils</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 初始化AIDE</span></span>
<span class="line"><span>    if [ -f &quot;/usr/sbin/aide&quot; ]; then</span></span>
<span class="line"><span>        /usr/sbin/aide --init</span></span>
<span class="line"><span>        if [ -f &quot;/var/lib/aide/aide.db.new.gz&quot; ]; then</span></span>
<span class="line"><span>            mv /var/lib/aide/aide.db.new.gz /var/lib/aide/aide.db.gz</span></span>
<span class="line"><span>            log &quot;INFO&quot; &quot;AIDE数据库已初始化&quot;</span></span>
<span class="line"><span>        fi</span></span>
<span class="line"><span>    fi</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 配置fail2ban</span></span>
<span class="line"><span>    if [ -f &quot;/etc/fail2ban/jail.conf&quot; ]; then</span></span>
<span class="line"><span>        cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local</span></span>
<span class="line"><span>        sed -i &#39;s/bantime  = 10m/bantime  = 1h/g&#39; /etc/fail2ban/jail.local</span></span>
<span class="line"><span>        sed -i &#39;s/maxretry = 5/maxretry = 3/g&#39; /etc/fail2ban/jail.local</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        # 确保fail2ban服务已启用</span></span>
<span class="line"><span>        systemctl enable fail2ban</span></span>
<span class="line"><span>        systemctl start fail2ban</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        log &quot;INFO&quot; &quot;fail2ban已配置&quot;</span></span>
<span class="line"><span>    fi</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    log &quot;INFO&quot; &quot;安全工具安装完成&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_16-配置定时任务-configure-scheduled-tasks-未开启" tabindex="-1"><a class="header-anchor" href="#_16-配置定时任务-configure-scheduled-tasks-未开启"><span>16.配置定时任务 ： configure_scheduled_tasks(未开启)</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 创建安全检查脚本</span></span>
<span class="line"><span>    cat &gt; /usr/local/bin/security_check.sh &lt;&lt; &quot;EOF&quot;</span></span>
<span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 安全检查脚本</span></span>
<span class="line"><span>LOG_FILE=&quot;/var/log/security_check_$(date +%Y%m%d).log&quot;</span></span>
<span class="line"><span>DATE=$(date &quot;+%Y-%m-%d %H:%M:%S&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;==========================================&quot; &gt; $LOG_FILE</span></span>
<span class="line"><span>echo &quot;安全检查报告 - $DATE&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span>echo &quot;==========================================&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span>echo &quot;&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查系统更新</span></span>
<span class="line"><span>echo &quot;系统更新状态:&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span>dnf check-update &gt;&gt; $LOG_FILE 2&gt;&amp;1</span></span>
<span class="line"><span>echo &quot;&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查登录失败</span></span>
<span class="line"><span>echo &quot;最近登录失败记录:&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span>lastb | head -n 10 &gt;&gt; $LOG_FILE 2&gt;&amp;1</span></span>
<span class="line"><span>echo &quot;&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查root登录</span></span>
<span class="line"><span>echo &quot;最近root登录记录:&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span>last root | head -n 10 &gt;&gt; $LOG_FILE 2&gt;&amp;1</span></span>
<span class="line"><span>echo &quot;&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查系统日志</span></span>
<span class="line"><span>echo &quot;系统安全日志:&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span>grep -i &quot;failed\\|error\\|denied\\|refused\\|invalid&quot; /var/log/secure | tail -n 20 &gt;&gt; $LOG_FILE 2&gt;&amp;1</span></span>
<span class="line"><span>echo &quot;&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查监听端口</span></span>
<span class="line"><span>echo &quot;当前监听端口:&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span>ss -tuln &gt;&gt; $LOG_FILE 2&gt;&amp;1</span></span>
<span class="line"><span>echo &quot;&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查可疑进程</span></span>
<span class="line"><span>echo &quot;可疑进程:&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span>ps aux | grep -v grep | egrep &quot;root|sudo|bash|sh|python|perl&quot; | awk &#39;$3 &gt; 10 || $4 &gt; 10&#39; &gt;&gt; $LOG_FILE 2&gt;&amp;1</span></span>
<span class="line"><span>echo &quot;&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查开放文件</span></span>
<span class="line"><span>echo &quot;打开的文件数量:&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span>lsof | wc -l &gt;&gt; $LOG_FILE 2&gt;&amp;1</span></span>
<span class="line"><span>echo &quot;&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查SELinux状态</span></span>
<span class="line"><span>echo &quot;SELinux状态:&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span>getenforce &gt;&gt; $LOG_FILE 2&gt;&amp;1</span></span>
<span class="line"><span>echo &quot;&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查防火墙状态</span></span>
<span class="line"><span>echo &quot;防火墙状态:&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span>firewall-cmd --list-all &gt;&gt; $LOG_FILE 2&gt;&amp;1</span></span>
<span class="line"><span>echo &quot;&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查磁盘使用情况</span></span>
<span class="line"><span>echo &quot;磁盘使用情况:&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span>df -h &gt;&gt; $LOG_FILE 2&gt;&amp;1</span></span>
<span class="line"><span>echo &quot;&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查内存使用情况</span></span>
<span class="line"><span>echo &quot;内存使用情况:&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span>free -m &gt;&gt; $LOG_FILE 2&gt;&amp;1</span></span>
<span class="line"><span>echo &quot;&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查CPU使用情况</span></span>
<span class="line"><span>echo &quot;CPU使用情况:&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span>top -bn1 | head -n 5 &gt;&gt; $LOG_FILE 2&gt;&amp;1</span></span>
<span class="line"><span>echo &quot;&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查AIDE完整性</span></span>
<span class="line"><span>echo &quot;文件完整性检查:&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span>if [ -f &quot;/usr/sbin/aide&quot; ]; then</span></span>
<span class="line"><span>    /usr/sbin/aide --check &gt;&gt; $LOG_FILE 2&gt;&amp;1</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    echo &quot;AIDE未安装&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>echo &quot;&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查rkhunter</span></span>
<span class="line"><span>echo &quot;Rootkit检查:&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span>if [ -f &quot;/usr/bin/rkhunter&quot; ]; then</span></span>
<span class="line"><span>    /usr/bin/rkhunter --check --skip-keypress &gt;&gt; $LOG_FILE 2&gt;&amp;1</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    echo &quot;rkhunter未安装&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>echo &quot;&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 发送邮件通知（如果配置了邮件）</span></span>
<span class="line"><span>if [ -x &quot;/usr/bin/mail&quot; ] &amp;&amp; [ -f &quot;/root/.forward&quot; ]; then</span></span>
<span class="line"><span>    mail -s &quot;系统安全检查报告 - $DATE&quot; root &lt; $LOG_FILE</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;安全检查完成: $DATE&quot; &gt;&gt; $LOG_FILE</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 设置脚本权限</span></span>
<span class="line"><span>    chmod +x /usr/local/bin/security_check.sh</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 添加到crontab</span></span>
<span class="line"><span>    if ! crontab -l | grep -q &quot;security_check.sh&quot;; then</span></span>
<span class="line"><span>        (crontab -l 2&gt;/dev/null; echo &quot;0 3 * * * /usr/local/bin/security_check.sh&quot;) | crontab -</span></span>
<span class="line"><span>        log &quot;INFO&quot; &quot;已添加每日安全检查任务&quot;</span></span>
<span class="line"><span>    fi</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 添加每周系统更新任务</span></span>
<span class="line"><span>    #if ! crontab -l | grep -q &quot;dnf update&quot;; then</span></span>
<span class="line"><span>    #    (crontab -l 2&gt;/dev/null; echo &quot;0 2 * * 0 dnf -y update &amp;&amp; dnf -y autoremove&quot;) | crontab -</span></span>
<span class="line"><span>    #    log &quot;INFO&quot; &quot;已添加每周系统更新任务&quot;</span></span>
<span class="line"><span>    #fi</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 添加每周AIDE数据库更新任务</span></span>
<span class="line"><span>    if [ -f &quot;/usr/sbin/aide&quot; ] &amp;&amp; ! crontab -l | grep -q &quot;aide --update&quot;; then</span></span>
<span class="line"><span>        (crontab -l 2&gt;/dev/null; echo &quot;0 4 * * 0 /usr/sbin/aide --update &amp;&amp; mv /var/lib/aide/aide.db.new.gz /var/lib/aide/aide.db.gz&quot;) | crontab -</span></span>
<span class="line"><span>        log &quot;INFO&quot; &quot;已添加每周AIDE数据库更新任务&quot;</span></span>
<span class="line"><span>    fi</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_17-显示完成信息-show-completion" tabindex="-1"><a class="header-anchor" href="#_17-显示完成信息-show-completion"><span>17.显示完成信息 ： show_completion</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>log &quot;INFO&quot; &quot;系统初始化与安全加固完成&quot;</span></span>
<span class="line"><span>    log &quot;INFO&quot; &quot;日志文件: $LOG_FILE&quot;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    echo &quot;&quot;</span></span>
<span class="line"><span>    echo &quot;==============================================&quot;</span></span>
<span class="line"><span>    echo &quot;系统初始化与安全加固已完成&quot;</span></span>
<span class="line"><span>    echo &quot;==============================================&quot;</span></span>
<span class="line"><span>    echo &quot;&quot;</span></span>
<span class="line"><span>    echo &quot;重要注意事项:&quot;</span></span>
<span class="line"><span>    echo &quot;1. 请检查日志文件: $LOG_FILE&quot;</span></span>
<span class="line"><span>    echo &quot;2. 部分安全配置可能需要重启系统才能完全生效&quot;</span></span>
<span class="line"><span>    echo &quot;3. 请确保SSH密钥已正确配置，否则可能无法登录系统&quot;</span></span>
<span class="line"><span>    echo &quot;4. 建议在生产环境使用前进行全面测试&quot;</span></span>
<span class="line"><span>    echo &quot;&quot;</span></span>
<span class="line"><span>    echo &quot;推荐后续操作:&quot;</span></span>
<span class="line"><span>    echo &quot;1. 配置邮件服务以接收安全警报&quot;</span></span>
<span class="line"><span>    echo &quot;2. 设置定期备份重要数据&quot;</span></span>
<span class="line"><span>    echo &quot;3. 考虑配置入侵检测系统(IDS)或入侵防御系统(IPS)&quot;</span></span>
<span class="line"><span>    echo &quot;4. 定期审查系统日志和安全检查报告&quot;</span></span>
<span class="line"><span>    echo &quot;&quot;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    read -p &quot;是否需要重启系统? (y/n): &quot; choice</span></span>
<span class="line"><span>    if [ &quot;$choice&quot; == &quot;y&quot; ] || [ &quot;$choice&quot; == &quot;Y&quot; ]; then</span></span>
<span class="line"><span>        log &quot;INFO&quot; &quot;系统将在30秒后重启，请保存未完成的工作&quot;</span></span>
<span class="line"><span>        sleep 30</span></span>
<span class="line"><span>        reboot</span></span>
<span class="line"><span>    fi</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="结尾" tabindex="-1"><a class="header-anchor" href="#结尾"><span>结尾</span></a></h1><p>通过本文的系统初始化与安全加固脚本，我们能够在部署 Rocky Linux 9 系统后，第一时间完成标准化配置与安全防护，大幅提升系统上线的效率与安全性。当然，实际环境中可能还需要根据业务需求进一步调整配置策略。</p><p>写文不易，如果你都看到了这里，请点个赞和在看，分享给更多的朋友；也别忘了关注星哥玩云！这里有满满的干货分享，还有轻松有趣的技术交流～点个赞、分享给身边的小伙伴，一起成长，一起玩转技术世界吧！ 😊</p>`,44)]))}const r=n(l,[["render",p]]),u=JSON.parse('{"path":"/article/k5sevquu/","title":"3.Rocky-Linux-9系统初始化与安全加固脚本","lang":"en-US","frontmatter":{"title":"3.Rocky-Linux-9系统初始化与安全加固脚本","createTime":"2025/06/16 17:49:22","permalink":"/article/k5sevquu/"},"git":{"createdTime":1750129445000,"updatedTime":1752136049000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":2,"url":"https://github.com/star"}]},"readingTime":{"minutes":10.65,"words":3195},"filePathRelative":"Rocky-Linux/3.Rocky-Linux-9系统初始化与安全加固脚本.md"}');export{r as comp,u as data};
