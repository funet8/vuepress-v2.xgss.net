---
title: AdGuard搭建去广告公共DNS
createTime: 2025/05/27 17:51:17
permalink: /article/835kyvrg/
---
# AdGuard搭建去广告公共DNS



## 什么AdGuard

AdGuard 是摆脱恼人广告、在线跟踪，保护您远离恶意软件的最佳选择。AdGuard 使您网络冲浪更快速，更安全，更便捷！

![AdGuard.webp](https://imgoss.xgss.net/picgo/AdGuard.webp.jpg?aliyun)



> AdGuard Home官方下载：https://github.com/AdguardTeam/AdGuardHome/releases

## 可根据自己的平台下载最新版本。CentOS 7 安装方法如下：

```
#下载AdGuard Home
wget https://github.com/AdguardTeam/AdGuardHome/releases/download/v0.108.0-b.4/AdGuardHome_linux_amd64.tar.gz
备用下载
wget http://js.funet8.com/centos_software/AdGuardHome_linux_amd64.tar.gz
#解压
tar -zxvf AdGuardHome_linux_amd64.tar.gz
#进入AdGuardHome目录
cd AdGuardHome
#放行3000端口（AdGuardHome初始化需要使用）
#firewalld放行3000端口
firewall-cmd --zone=public --add-port=3000/tcp --permanent
firewall-cmd --reload
#iptables放行3000端口
iptables -A INPUT -p tcp --dport 3000 -j ACCEPT
service iptables save

#启动AdGuard Home
./AdGuardHome
```

浏览器打开http://IP+3000,根据提示完成安装，首次初始化会要求设置账号、密码，下次登录需要使用。

![image-20220322133805305](https://imgoss.xgss.net/picgo/image-20220322133805305.png?aliyun)

![image-20220322133957199](https://imgoss.xgss.net/picgo/image-20220322133957199.png?aliyun)

![image-20220322134052172](https://imgoss.xgss.net/picgo/image-20220322134052172.png?aliyun)

## 配置方案

```
Router

此设置将自动覆盖连接到您的家庭路由器的所有设备，您不需要手动配置它们。

    打开您的路由器配置界面。通常情况下，您可以通过浏览器访问地址（如 http://192.168.0.1/ 或 http://192.168.1.1 ）。打开后您可能需要输入密码以进入配置界面。如果您不记得密码，通常可以通过路由器上的重置按钮来重设密码。但是，请注意，如您进行此操作，您最可能会失去所有路由器的配置。如果您的路由器需要通过特定的应用进行这一操作，请将相关应用程序安装到您的手机或计算机上并使用它设置您的路由器。
    找到路由器的 DHCP/DNS 设置页面。您会在 DNS 这一单词旁边找到两到三行允许输入的输入框，每一行输入框分为四组，每组允许输入一到三个数字。
    请在此处输入您的 AdGuard Home 服务器地址。
    在某些类型的路由器上无法设置自定义 DNS 服务器。在此情况下将 AdGuard Home 设置为 DHCP 服务器，可能会有所帮助。否则您应该查找如何根据特定路由器型号设置 DNS 服务器的使用手册。

Windows

    通过开始菜单或 Windows 搜索功能打开控制面板。
    点击进入 ”网络和 Internet“ 后，再次点击进入 “网络和共享中心”
    在窗口的左侧点击「更改适配器设置」。
    选择您正在连接的网络设备，右击它并选择「属性”」。
    在列表中找到 ”Internet 协议版本 4 (TCP/IPv4)“ ，选择并再次点击 ”属性“ 。
    选择“使用下面的 DNS 服务器地址”，并输入您的 AdGuard Home 服务器地址。
    
Android

    在安卓主屏幕菜单中点击设置。
    点击菜单上的 ”无线局域网“ 选项。在屏幕上将列出所有可用的网络（蜂窝移动网络不支持修改 DNS ）。
    长按当前已连接的网络，然后点击 ”修改网络设置“ 。
    在某些设备上，您可能需要选中 ”高级“ 复选框以查看进一步的设置。您可能需要调整您安卓设备的 DNS 设置，或是需要将 IP 设置从 DHCP 切换到静态。
    将 DNS 1 和 DNS 2 的值改为您的 AdGuard Home 服务器地址。    
```



## 额外设置

为了方便管理，可以继续输入命令 ./AdGuardHome -s install 安装为服务，然后就可以使用下面的命令来进行管理了。

```
#启动
systemctl start AdGuardHome
#开机自启
systemctl enable AdGuardHome
#重启
systemctl restart AdGuardHome
#停止
systemctl stop AdGuardHome
```

DNS默认使用53(TCP/UDP)端口进行通信，因此别忘记放行53端口，否则DNS无法正常使用。如果安装了宝塔面板，可在面板内操作。

```
#firewalld放行53端口
firewall-cmd --zone=public --add-port=53/tcp --permanent
firewall-cmd --zone=public --add-port=53/udp --permanent
firewall-cmd --reload
#iptables放行53端口
iptables -A INPUT -p tcp --dport 53 -j ACCEPT
iptables -A INPUT -p udp --dport 53 -j ACCEPT
service iptables save
```



# docker安装AdGuardHome



```
docker run -itd \
    --name adguardhome \
    --restart=always \
    -v /data/docker/adguardhome/work:/opt/adguardhome/work \
    -v /data/docker/adguardhome/conf:/opt/adguardhome/conf \
    -p 53:53/tcp -p 53:53/udp \
    -p 67:67/udp -p 68:68/udp \
    -p 80:80/tcp -p 443:443/tcp -p 443:443/udp -p 3000:3000/tcp \
    -p 853:853/tcp -p 853:853/udp \
    -p 784:784/udp  \
    -p 8853:8853/udp \
    -p 5443:5443/tcp -p 5443:5443/udp \
-d adguard/adguardhome
```

关于**端口映射**这里，详情页页做出了具体说明，虽说端口很多，但是我们真正用到的其实就前面三个：53，67，3000。不过67和68端口因为是UDP协议，很多地方都用不了，可以设置也可以不设置。至于后面的我用翻译软件看了下，貌似是服务器用的，咱们一般人用不上，可以不管它~

DHCP用的端号是UDP67和UDP68

PS：这里给大家说明一下，“53”是它的拦截协议端口，“3000”是它的默认后台的访问端口。



实际操作由于80和443端口被占用

```
docker run -itd \
    --name adguardhome \
    --restart=always \
    -v /data/docker/adguardhome/work:/opt/adguardhome/work \
    -v /data/docker/adguardhome/conf:/opt/adguardhome/conf \
    -p 53:53/tcp -p 53:53/udp \
    -p 67:67/udp -p 68:68/udp \
    -p 3000:3000/tcp \
    -p 853:853/tcp -p 853:853/udp \
    -p 784:784/udp  \
    -p 8853:8853/udp \
    -p 5443:5443/tcp -p 5443:5443/udp \
-d adguard/adguardhome
```



![image-20221012162543033](https://imgoss.xgss.net/picgo/image-20221012162543033.png?aliyun)



![image-20221012162614150](https://imgoss.xgss.net/picgo/image-20221012162614150.png?aliyun)

![image-20221012165855925](https://imgoss.xgss.net/picgo/image-20221012165855925.png?aliyun)

# AdGuard Home基本设置

![image-20221027134727526](https://imgoss.xgss.net/picgo/image-20221027134727526.png?aliyun)

## 常规设置

打开AdGuard Home的后台之后，接着我们便需要对它进行一些基本设置了。点击状态栏的【设置】，我们可以看到常规设置，DNS设置，加密设置等。这里我们需要改动的其实也就常规设置和DNS设置。

常规设置”这里我们根据自己的实际使用情况来设置：

- 过滤器更新间隔：DNS 过滤清单默认更新间隔，默认的每天就可以

- 使用 AdGuard 「浏览安全」网页服务：开启后，当用户访问存在潜在威胁的网站时，AdGuard 会主动拦截并弹出提示，建议勾选

- 使用 AdGuard 「家长控制」 服务：字面意思，如果家中有小孩子，建议开启，避免访问不良网站

- 强制安全搜索：隐藏 Bing、Google、Yandex、YouTube 网站上 NSFW 等不适宜的内容，不过鉴于我们国内网络环境，可以不管

  ![image-20221027135011539](https://imgoss.xgss.net/picgo/image-20221027135011539.png?aliyun)

- 查询记录保留时间：AdGuard Home 服务端采用 Sqlite 文件数据库存储日志，长时间保留可能会降低运行速度，同时占用大量的储存空间，个人用户建议不要超过7天。

  ![image-20221027135027873](https://imgoss.xgss.net/picgo/image-20221027135027873.png?aliyun)

- 统计数据保留时间：用于仪表盘的数据展示，24小时即可

![image-20221027135037608](https://imgoss.xgss.net/picgo/image-20221027135037608.png?aliyun)

## DNS设置

“DNS设置“这里，一般只设置“上游 DNS 服务器”即可。这里的上游 DNS 服务器指的是上游 DNS 服务器，个人建议直接填写国内几个公共DNS即可（腾讯，阿里），不知道的可以直接百度，设置好之后可以有效的避免运营商的 DNS 劫持。下面可以选择”负载均衡“也可以选择”并行请求“，其它的一般保持默认即可。

### 查找公共的dns

[如何选择适合的公共 DNS](https://blog.skk.moe/post/which-public-dns-to-use/)

### 腾讯云

```
119.29.29.29 119.28.28.28
```

### 阿里云公共 DNS

```
223.5.5.5 223.6.6.6
```

### 南京信风公共 DNS

```
114.114.114.114 114.114.115.115
```

### Google Public DNS

```
8.8.8.8       8.8.4.4
```

填如下

```
119.29.29.29
223.5.5.5
114.114.114.114
8.8.8.8
```



![image-20221027135732509](https://imgoss.xgss.net/picgo/image-20221027135732509.png?aliyun)

完成之后可以点击后面的“测试上游DNS”，如果显示正常运行就没有问题。

![image-20221027135858484](https://imgoss.xgss.net/picgo/image-20221027135858484.png?aliyun)

# DNS 拦截列表

![image-20221027140030457](https://imgoss.xgss.net/picgo/image-20221027140030457.png?aliyun)

 因为默认的只是AdGuard自己的过滤规则，想要体验更好的去广告的功能，肯定是不够的，所以我们还需要添加第三方的拦截列表。

![image-20221027140126437](https://imgoss.xgss.net/picgo/image-20221027140126437.png?aliyun)

![image-20221027140150419](https://imgoss.xgss.net/picgo/image-20221027140150419.png?aliyun)

 添加拦截列表很简单，它有内置的列表，还分好类了，我们直接勾选便能自动添加。



 也可以添加自己知道的第三方拦截列表清单。

这里顺便给大家推荐几个还不错国内可用的第三方拦截列表：

- Xinggsf 乘风过滤（国内网站广告过滤规则）：[https://gitee.com/xinggsf/Adblock-Rule/raw/master/rule.txt](https://gitee.com/xinggsf/Adblock-Rule/raw/master/rule.txt)
- Xinggsf 乘风视频过滤（国内视频网站广告过滤规则）：[https://gitee.com/xinggsf/Adblock-Rule/raw/master/mv.txt](https://gitee.com/xinggsf/Adblock-Rule/raw/master/mv.txt)
- MalwareDomainList（恶意软件过滤规则）：[https://www.malwaredomainlist.com/hostslist/hosts.txt](https://www.malwaredomainlist.com/hostslist/hosts.txt)
- Fanboy’s Annoyances List（去除页面弹窗广告规则）：[https://easylist-downloads.adblockplus.org/fanboy-annoyance.txt](https://easylist-downloads.adblockplus.org/fanboy-annoyance.txt)
- Halflife（全面的广告过滤规则）：[https://gitee.com/halflife/list/raw/master/ad.txt](https://gitee.com/halflife/list/raw/master/ad.txt)

**PS：关于DNS拦截列表这里，个人建议不要求多而求精。过多的过滤规则会影响你的上网速度，并且会发生冲突，导致不该过滤的也过滤了，导致网页或者视频打不开！并且这个过滤规则是一个长期调试的过程，这个需要大家根据自己的网络使用情况自己摸索！**

![image-20221027140736280](https://imgoss.xgss.net/picgo/image-20221027140736280.png?aliyun)

再实验一下用浏览器打开腾讯视频，看是否有广告。，好像还是有广告！



谷歌的广告被屏蔽

![image-20221027143838883](https://imgoss.xgss.net/picgo/image-20221027143838883.png?aliyun)



## AdguardHome屏蔽YouTube广告

```
https://gist.githubusercontent.com/Ewpratten/a25ae63a7200c02c850fede2f32453cf/raw/b9318009399b99e822515d388b8458557d828c37/hosts-yt-ads
没有效果。
```



自定义规则

```
在自定义规则添加以下规则就可以了。
/googleads.$~script,domain=~googleads.github.io
/pagead/lvz?
||google.com/pagead/
||static.doubleclick.net^$domain=youtube.com
||youtube.com/get_midroll_
```

![image-20221027145011715](https://imgoss.xgss.net/picgo/image-20221027145011715.png?aliyun)





使用 anti-AD 能够屏蔽广告域名，能屏蔽电视盒子广告，屏蔽 APP 内置广告，同时屏蔽了一些日志收集、大数据统计等涉及个人隐私信息的站点，能够保护个人隐私不被偷偷上传。

### [banbendalao](https://github.com/banbendalao)/**[ADgk](https://github.com/banbendalao/ADgk)**

- https://raw.githubusercontent.com/banbendalao/ADgk/master/ADgk.txt
- https://raw.iqiq.io/banbendalao/ADgk/master/ADgk.txt

百度搜索结果内屏蔽百家号

- https://raw.githubusercontent.com/banbendalao/ADgk/master/kill-baidu-ad.txt
- https://raw.iqiq.io/banbendalao/ADgk/master/kill-baidu-ad.txt

### 广告终结者

广告终结者使用的拦截规则，基于 ChinaList + EasyList 修正维护

- https://sub.adtchrome.com/adt-chinalist-easylist.txt

### I don’t care about cookies

屏蔽网站的 cookies 相关的警告

- https://www.i-dont-care-about-cookies.eu/abp/

## [Hosts 过滤器](https://www.dujin.org/tag/hosts-过滤器)

1. 大圣净化 – 针对国内视频网站
   `https://raw.githubusercontent.com/jdlingyu/ad-wars/master/hosts`
2. 1024_hosts – 1024网站和澳门皇家赌场
   `https://raw.githubusercontent.com/Goooler/1024_hosts/master/hosts`
3. Google hosts – 提高网站访问速度
   `https://raw.githubusercontent.com/googlehosts/hosts/master/hosts-files/hosts`
4. Hblock – 综合多种源集合体屏蔽广告跟踪和恶意软件
   `https://hblock.molinero.xyz/hosts`
5. Mvps – 屏蔽美欧地区英文网站相关的广告
   `https://winhelp2002.mvps.org/hosts.txt`
6. neoHosts – 国内屏蔽挖矿统计JS&360&百度&法轮功等
   `https://hosts.nfz.moe/full/hosts`
7. StevenBlack – 屏蔽国外网站广告-国外维护
   `https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts`
8. yhosts – 屏蔽国内网站广告-国内维护
   `https://raw.githubusercontent.com/vokins/yhosts/master/hosts`
9. YousList – 屏蔽韩国网站广告
   `https://raw.githubusercontent.com/yous/YousList/master/hosts.txt`