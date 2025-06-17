---
title: OSI七层模型中的常用网络协议简介
createTime: 2025/05/27 17:51:17
permalink: /article/ga6zs2wo/
---
# OSI七层模型中的常用网络协议简介

## 前言

写本文的本意是上周 友达《OSI七层模型浅谈》里的一些网络知识，里面有些网络协议似曾相识，想把平时工作中遇到的的网络协议做一个分享，能力有限不能把所有的协议都分享，也算是把之前知识点做一个总结。

## 什么是网络协议？

网络协议为计算机网络中进行数据交换而建立的规则、标准或约定的集合。

![hulianwangxieyi.webp](https://imgoss.xgss.net/picgo/hulianwangxieyi.webp.jpg?aliyun)

## 网络的七层模型

### 1.物理层

通过物理连接组网，传送比特流0和1， 两个不同局域网（移动，联通）通信，需要ISP互联网服务供应商提供的物理连接。

### 2.数据链路

作用：根据以太网协议将一组电信号组装成数据包，称为“帧”，并控制传输。

### 3.网络层

建立主机-主机的连接。

### 4.传输层

建立端口-端口的连接。

### 5.会话层

### 6.表示层

### 7.应用层

规定应用程序的数据格式，如ftp、网页（http）、smtp（邮件）的数据格式，直接面向用户。

以下是友达分享的图片。

![osi网络协议](https://imgoss.xgss.net/picgo/osi网络协议.jpg?aliyun)



![osi网络协议](https://imgoss.xgss.net/picgo/%E4%B8%83%E5%B1%82%E7%BD%91%E7%BB%9C%E6%A8%A1%E5%9E%8B.png?aliyun)





## 一、物理层

### [IEEE 802.2](https://baike.baidu.com/item/IEEE%20802.2)

对数据链路层上层逻辑链路控制连接的建立和管理的规范

### [Ethernet](https://baike.baidu.com/item/%E4%BB%A5%E5%A4%AA%E7%BD%91?fromtitle=Ethernet&fromid=4794275)

一般指以太网

以太网是一种计算机局域网技术。IEEE组织的IEEE 802.3标准制定了以太网的技术标准，它规定了包括物理层的连线、电子信号和介质访问层协议的内容。以太网是应用最普遍的局域网技术，取代了其他局域网技术如令牌环、FDDI和ARCNET。



### RG45网络接口

RJ45接口就是常见的网线接口，属于布线系统中信息插座连接器的一种，连接器由插头（接头、水晶头）和插座（模块）组成，插头有8个凹槽和8个触点。计算机网络的RJ45是标准8位模块化接口的俗称。



我们最常用的网线是**五类网线、超五类网线、六类网线、七类网线**。

![img](https://imgoss.xgss.net/picgo/aacc63ed4c1b44aa94d140353285c481.png?aliyun)

![img](https://imgoss.xgss.net/picgo/6a9836a5f1404cb883dc70a41f74043f.png?aliyun)

https://www.sohu.com/a/556889873_121124778

### [PPPOE](https://baike.baidu.com/item/PPPOE)

PPPoE（英语：Point-to-Point Protocol Over Ethernet），以太网上的点对点协议，是将点对点协议（PPP）封装在以太网（Ethernet）框架中的一种网络隧道协议。由于协议中集成PPP协议，所以实现出传统以太网不能提供的身份验证、加密以及压缩等功能，也可用于缆线调制解调器（cable modem）和数字用户线路（DSL）等以以太网协议向用户提供接入服务的协议体系。

![image-20220816171214840](https://imgoss.xgss.net/picgo/image-20220816171214840.png?aliyun)



### [BLE蓝牙低能耗](https://baike.baidu.com/item/%E8%93%9D%E7%89%99%E4%BD%8E%E8%83%BD%E8%80%97/12806839)

蓝牙低能耗（Bluetooth Low Energy，或称Bluetooth LE、BLE，旧商标Bluetooth Smart）也称低功耗蓝牙，是蓝牙技术联盟设计和销售的一种个人局域网技术，旨在用于医疗保健、运动健身、信标、安防、家庭娱乐等领域的新兴应用。相较经典蓝牙，低功耗蓝牙旨在保持同等通信范围的同时显著降低功耗和成本。



### [NFC近场通信](https://baike.baidu.com/item/%E8%BF%91%E5%9C%BA%E9%80%9A%E4%BF%A1/9741433?fr=aladdin)

近场通信（Near Field Communication，简称NFC），是一种新兴的技术，使用了NFC技术的设备（例如移动电话）可以在彼此靠近的情况下进行数据交换，是由非接触式射频识别（RFID）及互连互通技术整合演变而来的，通过在单一芯片上集成感应式读卡器、感应式卡片和点对点通信的功能，利用移动终端实现移动支付、电子票务、门禁、移动身份识别、防伪等应用。

### [光纤](https://baike.baidu.com/item/%E5%85%89%E7%BA%A4)

光纤是光导纤维的简写，是一种由玻璃或塑料制成的纤维，可作为光传导工具。传输原理是“光的全反射”。

光速： 30万千米/秒



## 二、数据链路层

### [PPP](https://baike.baidu.com/item/PPP/6660214#viewPageContent)

点对点协议（Point to Point Protocol，PPP）为在点对点连接上传输多协议数据包提供了一个标准方法。PPP 最初设计是为两个对等节点之间的 IP 流量传输提供一种封装协议。在 TCP-IP 协议集中它是一种用来同步调制连接的数据链路层协议（OSI模式中的第二层），替代了原来非标准的第二层协议，即 SLIP。除了 IP 以外 PPP 还可以携带其它协议，包括 DECnet 和 Novell 的 Internet 网包交换（IPX）。



### [PPTP点对点隧道协议](https://baike.baidu.com/item/%E7%82%B9%E5%AF%B9%E7%82%B9%E9%9A%A7%E9%81%93%E5%8D%8F%E8%AE%AE/8090794?fr=aladdin)

点对点隧道协议（PPTP，Point-to-Point Tunneling Protocol）是一种协议（一套通信规则），它允许企业通过私人“隧道”在公共网络上扩展自己的企业网络。



### [L2TP第二层隧道协议](https://baike.baidu.com/item/L2TP)

L2TP是一种工业标准的Internet隧道协议，功能大致和PPTP协议类似，比如同样可以对网络数据流进行加密。不过也有不同之处，比如PPTP要求网络为IP网络，L2TP要求面向数据包的点对点连接；PPTP使用单一隧道，L2TP使用多隧道；L2TP提供包头压缩、隧道验证，而PPTP不支持。

协议的应用：科学上网 V-屁-N

![image-20220816174315787](https://imgoss.xgss.net/picgo/image-20220816174315787.png?aliyun)



### [VLAN 801.1Q虚拟局域网协议](https://baike.baidu.com/item/%E8%99%9A%E6%8B%9F%E5%B1%80%E5%9F%9F%E7%BD%91?fromtitle=VLAN&fromid=320429)

VLAN（Virtual Local Area Network）的中文名为"虚拟局域网"。

把不同的学生分成不同班级

![image-20220816185140189](https://imgoss.xgss.net/picgo/image-20220816185140189.png?aliyun)



[什么是 Vlan、三层交换机、网关、DNS、子网掩码、MAC地址，这是我看过最易懂的~](https://mp.weixin.qq.com/s?__biz=MzA4Nzg5Nzc5OA==&mid=2651721759&idx=1&sn=5dcb0341e202dc202c1c8144d1cdabf6&chksm=8bc8d3b6bcbf5aa02fee455b4007eb1d5f945e73bbee9bd1793edb7bd1e78f7ad4077d3a1a6e&mpshare=1&scene=23&srcid=0815r4wxM5MOrh1q3nuNDodF&sharer_sharetime=1660565839078&sharer_shareid=df6a43dd2e371bda99b687c4a5c85e74#rd)



## 三、网络层

### IP/IPv6 重要！

#### [IP](https://baike.baidu.com/item/IP/224599)

IP指网际互连协议，Internet Protocol的缩写，是[TCP/IP](https://baike.baidu.com/item/TCP%2FIP/214077)体系中的网络层协议。设计IP的目的是提高网络的可扩展性：一是解决[互联网](https://baike.baidu.com/item/互联网/199186)问题，实现大规模、[异构网络](https://baike.baidu.com/item/异构网络/1306810)的互联互通；二是分割顶层网络应用和底层网络技术之间的耦合关系，以利于两者的独立发展。根据[端到端](https://baike.baidu.com/item/端到端/8851783)的设计原则，IP只为主机提供一种无连接、不可靠的、尽力而为的数据包传输服务。



#### [IPv6](https://baike.baidu.com/item/IPv6/172297)

IPv6是英文“Internet Protocol Version 6”（互联网协议第6版）的缩写，是互联网工程任务组（IETF）设计的用于替代IPv4的下一代IP协议，其地址数量号称可以为全世界的每一粒沙子编上一个地址。



### IP与MAC

虽然现在已经ipv6了，但我们基本用的大多数还是ipv4协议，所谓ip就是你电脑整个网络的编号。其他电脑想访问电脑就得需要这个编号。但是这个编号很多情况下是一直在变化的。唯一不变的是你的MAC地址：物理地址。

MAC是网络中用来标识网卡设备的唯一网络地址。由相关硬件制造商统一分配，每台电脑的MAC地址都是唯一的。

做个比喻，你经常搬家，你没搬一次家都有一个地址，XX小区XX单元XX号，这个就是IP。但是你的名字不变，这个就是MAC，不同的是我们的MAC不允许重名。

![image-20220817161111652](https://imgoss.xgss.net/picgo/image-20220817161111652.png?aliyun)



### [ICMP](https://baike.baidu.com/item/ICMP)

ICMP协议是一种面向无连接的协议，用于传输出错报告控制信息。它是一个非常重要的协议，它对于网络安全具有极其重要的意义。 [3]  它属于网络层协议，主要用于在主机与路由器之间传递控制信息，包括报告错误、交换受限控制和状态信息等。当遇到IP数据无法访问目标、IP路由器无法按当前的传输速率转发数据包等情况时，会自动发送ICMP消息。

```
ping和 tracert 都利用 ICMP 协议来实现网络功能，它们是把网络协议应用到日常网络管理的典型实例。
```

![image-20220816190153069](https://imgoss.xgss.net/picgo/image-20220816190153069.png?aliyun)

traceroute (Windows 系统下是tracert) 命令利用ICMP 协议定位您的计算机和目标计算机之间的所有路由器。TTL 值可以反映数据包经过的路由器或网关的数量，通过操纵独立ICMP 呼叫报文的TTL 值和观察该报文被抛弃的返回信息，traceroute命令能够遍历到数据包传输路径上的所有路由器。

![image-20220816190954833](https://imgoss.xgss.net/picgo/image-20220816190954833.png?aliyun)

![image-20220816191253402](https://imgoss.xgss.net/picgo/image-20220816191253402.png?aliyun)

```
C:\Users\Administrator>tracert 192.168.1.1
通过最多 30 个跃点跟踪到 192.168.1.1 的路由
  1    <1 毫秒   <1 毫秒   <1 毫秒 192.168.1.1
跟踪完成。

```

![image-20220816191601963](https://imgoss.xgss.net/picgo/image-20220816191601963.png?aliyun)





### [ARP地址解析协议](https://baike.baidu.com/item/ARP/609343?fromtitle=ARP%E5%9C%B0%E5%9D%80%E8%A7%A3%E6%9E%90%E5%8D%8F%E8%AE%AE&fromid=7305715)

地址解析协议，即ARP（Address Resolution Protocol），是根据IP地址获取物理地址的一个TCP/IP协议。

主机A的IP地址为192.168.1.1，MAC地址为0A-11-22-33-44-01；

主机B的IP地址为192.168.1.2，MAC地址为0A-11-22-33-44-02；

当主机A要与主机B通信时，地址解析协议可以将主机B的IP地址（192.168.1.2）解析成主机B的MAC地址，以下为工作流程：
第1步：根据主机A上的路由表内容，IP确定用于访问主机B的转发IP地址是192.168.1.2。然后A主机在自己的本地ARP缓存中检查主机B的匹配MAC地址。

第2步：如果主机A在ARP缓存中没有找到映射，它将询问192.168.1.2的硬件地址，从而将ARP请求帧广播到本地网络上的所有主机。源主机A的IP地址和MAC地址都包括在ARP请求中。本地网络上的每台主机都接收到ARP请求并且检查是否与自己的IP地址匹配。如果主机发现请求的IP地址与自己的IP地址不匹配，它将丢弃ARP请求。

第3步：主机B确定ARP请求中的IP地址与自己的IP地址匹配，则将主机A的IP地址和MAC地址映射添加到本地ARP缓存中。

第4步：主机B将包含其MAC地址的ARP回复消息直接发送回主机A。

第5步：当主机A收到从主机B发来的ARP回复消息时，会用主机B的IP和MAC地址映射更新ARP缓存。本机缓存是有生存期的，生存期结束后，将再次重复上面的过程。主机B的MAC地址一旦确定，主机A就能向主机B发送IP通信了。

### [ARP攻击](https://baike.baidu.com/item/ARP%E6%94%BB%E5%87%BB/11056224?fr=aladdin)

ARP（Address Resolution Protocol，地址解析协议）是一个位于TCP/IP协议栈中的网络层，负责将某个IP地址解析成对应的MAC地址。

ARP 病毒攻击是局域网最常见的一种攻击方式。由于TCP/IP协议存在的一些漏洞给ARP病毒有进行欺骗攻击的机会，ARP利用TCP/IP协议的漏洞进行欺骗攻击，现已严重影响到人们正常上网和通信安全。当局域网内的计算机遭到ARP的攻击时，它就会持续地向局域网内所有的计算机及网络通信设备发送大量的ARP欺骗数据包，如果不及时处理，便会造成网络通道阻塞、网络设备的承载过重、网络的通讯质量不佳等情况。

表现：**使用局域网时会突然掉线，过一段时间后又会恢复正常**

#### ARP攻击原理

ARP攻击就是通过伪造IP地址和MAC地址实现ARP欺骗，能够在网络中产生大量的ARP通信量使网络阻塞，攻击者只要持续不断的发出伪造的ARP响应包就能更改目标主机ARP缓存中的IP-MAC条目，造成网络中断或中间人攻击。

ARP攻击主要是存在于局域网网络中，局域网中若有一个人感染ARP木马，则感染该ARP木马的系统将会试图通过“ARP欺骗”手段截获所在网络内其它计算机的通信信息，并因此造成网内其它计算机的通信故障。



#### [arp攻击只能在局域网吗？](https://www.bbaqw.com/cs/110157.htm)

![image-20220817162730431](https://imgoss.xgss.net/picgo/image-20220817162730431.png?aliyun)

![image-20220817162749946](https://imgoss.xgss.net/picgo/image-20220817162749946.png?aliyun)

### [RARP逆向地址解析协议](https://baike.baidu.com/item/%E5%8F%8D%E5%90%91%E5%9C%B0%E5%9D%80%E8%BD%AC%E6%8D%A2%E5%8D%8F%E8%AE%AE/2991811?fromtitle=RARP&fromid=610685&fr=aladdin)

反向地址转换协议（RARP：Reverse Address Resolution Protocol） 允许局域网的物理机器从网关服务器的 ARP 表或者缓存上请求其 IP 地址。网络管理员在局域网网关路由器里创建一个表以映射物理地址（MAC）和与其对应的 IP 地址。



## 四、传输层

### [TCP](https://baike.baidu.com/item/TCP/33012) 重要!

传输控制协议（TCP，Transmission Control Protocol）是一种面向连接的、可靠的、基于字节流的传输层通信协议，由IETF的RFC 793

**比如 HTTP 运用 TCP 进行数据的传输。**

### [UDP](https://baike.baidu.com/item/UDP) 重要！

Internet 协议集支持一个无连接的传输协议，该协议称为用户数据报协议（UDP，User Datagram Protocol）。UDP 为应用程序提供了一种无需建立连接就可以发送封装的 IP 数据包的方法。RFC 768  描述了 UDP。

**比如我们聊天用的QQ就是使用的UDP协议。**

### TCP对比UDP

TCP 是面向连接的传输控制协议，而UDP 提供了无连接的数据报服务；

TCP 具有高可靠性，确保传输数据的正确性，不出现丢失或乱序；

UDP 在传输数据前不建立连接，不对数据报进行检查与修改，无须等待对方的应答，所以会出现分组丢失、重复、乱序，应用程序需要负责传输可靠性方面的所有工作；

UDP 具有较好的实时性，工作效率较 TCP 协议高；

UDP 段结构比 TCP 的段结构简单，因此网络开销也小。

TCP 协议可以保证接收端毫无差错地接收到发送端发出的字节流，为应用程序提供可靠的通信服务。对可靠性要求高的通信系统往往使用 TCP 传输数据。

```
UDP的使用场景
基于 UDP 这些特点，我们可以考虑在以下的场景中使用。

1.需要资源少，在网络情况比较好的内网，或者对于丢包不敏感的应用。例如DHCP 就是基于 UDP 协议的。一般的获取 IP 地址都是内网请求，而且一次获取不到 IP 又没事，过一会儿还有机会。

2.不需要一对一沟通，建立连接，而是可以广播的应用。UDP 的不面向连接的功能，可以使得可以承载广播或者多播的协议。DHCP 就是一种广播的形式，就是基于 UDP 协议的。

3.需要处理速度快，时延低，可以容忍少数丢包，但是要求即便网络拥塞，也不会降低发送速率的时候。UDP 简单、处理速度快，不像 TCP有众多的传输控制机制，也导致了TCP时延相对较高，并且TCP在网络不好出现丢包的时候，拥塞控制策略会主动的退缩，降低发送速度。多用于实时游戏中，游戏对实时要求较为严格的情况下，采用自定义的可靠 UDP 协议，自定义重传策略，能够把丢包产生的延迟降到最低，尽量减少网络问题对游戏性造成的影响。除此之外很多直播应用，都基于 UDP 实现了自己的视频传输协议。


音视频通话    实时考虑

游戏 比如王者荣耀  实时性考虑

工业物联网  传感器，5秒钟获取传感器数据，然后上传到服务器，但平常时间是休眠状态   实际有效包只有一个   使用udp发送一个包即可，减少了三次握手，四次挥手的耗能
```



### [SSL](https://baike.baidu.com/item/%E5%AE%89%E5%85%A8%E5%A5%97%E6%8E%A5%E5%B1%82?fromtitle=SSL&fromid=320778)

SSL（Secure Socket Layer）安全套接层是Netscape公司率先采用的网络安全协议。它是在传输通信协议（TCP/IP）上实现的一种安全协议，采用公开密钥技术。SSL广泛支持各种类型的网络，同时提供三种基本的安全服务，它们都使用公开密钥技术。



为什么需要SSL证书
网站需要SSL证书来保证用户数据的安全、验证网站的所有权、防止攻击者创建网站的虚假版本并向用户传达信任。

如果网站要求用户登录、输入个人详细信息（如信用卡号）或查看机密信息（如健康福利或财务信息），则必须对数据保密。SSL 证书有助于保持在线交互的私密性，并确保用户可以与网站共享隐私信息的真实性和安全性。

与企业更相关的是，HTTPS 网址需要 SSL 证书。HTTPS 是 HTTP 的安全形式，这意味着 HTTPS 网站的流量由 SSL 加密。大多数浏览器将 HTTP 站点（那些没有 SSL 证书的站点）标记为“不安全”。这向用户发出了一个明确的信号，即该站点可能不值得信赖——激励尚未这样做的企业迁移到 HTTPS。



## 五、会话层

### [DNS域名系统-重要！](https://baike.baidu.com/item/%E5%9F%9F%E5%90%8D%E7%B3%BB%E7%BB%9F/2251573?fromtitle=DNS&fromid=427444&fr=aladdin)

域名系统（英文：Domain Name System，缩写：DNS）是互联网的一项服务。它作为将域名和IP地址相互映射的一个分布式数据库，能够使人更方便地访问互联网。DNS使用UDP端口53。当前，对于每一级域名长度的限制是63个字符，域名总长度则不能超过253个字符。

DNS说白了是把域名翻译成IP地址用的，这里面举个例子，大家就很容易清楚了。

例如我们在浏览器里面输入www.baidu.com的时候，机器要跟百度这个网站进行通信，机器要往外面发送数据包，数据包里面要写百度这台服务器的IP地址，我们不知道IP地址是多少，那么就需要主机问DNS服务器，DNS服务器就自动帮我们把www.baidu.com这个域名翻译成了IP地址61.135.169.105。然后写到了数据包的目的IP地址里面就可以进行通信。



### [LDAP轻量级目录访问协议](https://baike.baidu.com/item/%E8%BD%BB%E5%9E%8B%E7%9B%AE%E5%BD%95%E8%AE%BF%E9%97%AE%E5%8D%8F%E8%AE%AE?fromtitle=LDAP&fromid=2875565)

轻型目录访问协议（英文：Lightweight Directory Access Protocol，缩写：LDAP，/ˈɛldæp/）是一个开放的，中立的，工业标准的应用协议，通过IP协议提供访问控制和维护分布式信息的目录信息。



**LDAP的一个常用用途是单点登录，用户可以在多个服务中使用同一个密码，通常用于公司内部网站的登录中（这样他们可以在公司计算机上登录一次，便可以自动在公司内部网上登录）。**

#### [LDAP的应用场景](https://blog.csdn.net/shengqe/article/details/39209049)



堡垒机后台集成LDAP。

Jenkins 接入 LDAP 进行权限控制、各种WEB后台等等。

![image-20220817104206553](https://imgoss.xgss.net/picgo/image-20220817104206553.png?aliyun)

### [TLS传输层安全协议](https://baike.baidu.com/item/TLS)

安全传输层协议（TLS）用于在两个通信应用程序之间提供保密性和数据完整性。



### [SSL安全套接层协议-重要！](https://baike.baidu.com/item/%E5%AE%89%E5%85%A8%E5%A5%97%E6%8E%A5%E5%B1%82/9442234?fromtitle=SSL&fromid=320778)

SSL（Secure Socket Layer）安全套接层是Netscape公司率先采用的网络安全协议。它是在传输通信协议（TCP/IP）上实现的一种安全协议，采用公开密钥技术。SSL广泛支持各种类型的网络，同时提供三种基本的安全服务，它们都使用公开密钥技术。



### [RPC远程过程调用协议](https://baike.baidu.com/item/%E8%BF%9C%E7%A8%8B%E8%BF%87%E7%A8%8B%E8%B0%83%E7%94%A8?fromtitle=RPC&fromid=609861)

RPC（Remote Procedure Call Protocol）——远程过程调用协议，它是一种通过网络从远程计算机程序上请求服务，而不需要了解底层网络技术的协议。RPC协议假定某些传输协议的存在，如TCP或UDP，为通信程序之间携带信息数据。在OSI网络通信模型中，RPC跨越了传输层和应用层。RPC使得开发包括网络分布式多程序在内的应用程序更加容易。



#### [rpc和http的区别](http://www.ccutu.com/244407.html)

RPC主要用于公司内部的服务调用，性能消耗低，传输效率高，服务治理方便。HTTP主要用于对外的异构环境，浏览器接口调用，APP接口调用，第三方接口调用等。



## 六、表示层

### [NFS网络文件系统](https://baike.baidu.com/item/%E7%BD%91%E7%BB%9C%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F/9719420?fromtitle=NFS&fromid=812203)

网络文件系统，英文Network File System(NFS)，是由SUN公司研制的UNIX表示层协议(presentation layer protocol)，能使使用者访问网络上别处的文件就像在使用自己的计算机一样。 

应用： 局域网文件共享 NFS

```
内网服务器192.168.1.10搭建了samba：
\\192.168.1.10
```

![image-20220817161613177](https://imgoss.xgss.net/picgo/image-20220817161613177.png?aliyun)



#### NFS和samba

samba主要用于在windows和unix之间共享资源。资源包括文件、打印机等等。

NFS主要用于在UNIX/LINUX上而不是windows上。



### [SQL结构化查询语言](https://baike.baidu.com/item/%E7%BB%93%E6%9E%84%E5%8C%96%E6%9F%A5%E8%AF%A2%E8%AF%AD%E8%A8%80?fromtitle=sql&fromid=86007)

结构化查询语言（Structured Query Language）简称SQL，是一种特殊目的的编程语言，是一种数据库查询和程序设计语言，用于存取数据以及查询、更新和管理关系数据库系统。

```
select * from talbe;
```



## 七、应用层

### [HTTP协议](https://baike.baidu.com/item/HTTP?fromtitle=HTTP%E5%8D%8F%E8%AE%AE&fromid=1276942)

超文本传输协议（Hyper Text Transfer Protocol，HTTP）是一个简单的请求-响应协议，它通常运行在TCP之上。它指定了客户端可能发送给服务器什么样的消息以及得到什么样的响应。请求和响应消息的头以ASCII形式给出；而 [9]  消息内容则具有一个类似MIME的格式。这个简单模型是早期Web成功的有功之臣，因为它使开发和部署非常地直截了当。

### [HTTPS协议](https://baike.baidu.com/item/HTTPS)

HTTPS （全称：Hyper Text Transfer Protocol over Secure Socket Layer），是以安全为目标的 HTTP 通道，在HTTP的基础上通过传输加密和身份认证保证了传输过程的安全性   。HTTPS 在HTTP 的基础下加入SSL，HTTPS 的安全基础是 SSL，因此加密的详细内容就需要 SSL。 HTTPS 存在不同于 HTTP 的默认端口及一个加密/身份验证层（在 HTTP与 TCP 之间）。这个系统提供了身份验证与加密通讯方法。它被广泛用于万维网上安全敏感的通讯，例如交易支付等方面

### [[一分钟了解HTTP和HTTPS](https://g.xgss.net/linux-basis/一分钟了解HTTP和HTTPS.html)]



### [FTP文件传输协议](https://baike.baidu.com/item/ftp/13839)

文件传输协议（File Transfer Protocol，FTP）是用于在网络上进行文件传输的一套标准协议，它工作在 OSI 模型的第七层， TCP 模型的第四层， 即应用层， 使用 TCP 传输而不是 UDP， 客户在和服务器建立连接前要经过一个“三次握手”的过程， 保证客户与服务器之间的连接是可靠的， 而且是面向连接， 为数据传输提供可靠保证。 

NFS

### [SMTP](https://baike.baidu.com/item/SMTP)

SMTP是一种提供可靠且有效的电子邮件传输的协议。SMTP是建立在FTP文件传输服务上的一种邮件服务，主要用于系统之间的邮件信息传递，并提供有关来信的通知。SMTP独立于特定的传输子系统，且只需要可靠有序的数据流信道支持，SMTP的重要特性之一是其能跨越网络传输邮件，即“SMTP邮件中继”。使用SMTP，可实现相同网络处理进程之间的邮件传输，也可通过中继器或网关实现某处理进程与其他网络之间的邮件传输。 

163邮箱、QQ邮箱



### [POP3邮局协议第三版](https://baike.baidu.com/item/POP3)

POP3，全名为“Post Office Protocol - Version 3”，即“邮局协议版本3”。是TCP/IP协议族中的一员，由RFC1939 定义。本协议主要用于支持使用客户端远程管理在服务器上的电子邮件。提供了SSL加密的POP3协议被称为POP3S。



### [DHCP动态主机配置协议](https://baike.baidu.com/item/DHCP)

DHCP（动态主机配置协议）是一个局域网的网络协议。指的是由服务器控制一段IP地址范围，客户机登录服务器时就可以自动获得服务器分配的IP地址和子网掩码。默认情况下，DHCP作为Windows Server的一个服务组件不会被系统自动安装，还需要管理员手动安装并进行必要的配置。 



![image-20220817153829366](https://imgoss.xgss.net/picgo/image-20220817153829366.png?aliyun)



### [NTP网络时间协议](https://baike.baidu.com/item/%E7%BD%91%E7%BB%9C%E6%97%B6%E9%97%B4%E5%8D%8F%E8%AE%AE?fromtitle=NTP&fromid=1100433)

网络时间协议，英文名称：Network Time Protocol（NTP）是用来使计算机时间同步化的一种协议，它可以使计算机对其服务器或时钟源（如石英钟，GPS等等)做同步化，它可以提供高精准度的时间校正（LAN上与标准间差小于1毫秒，WAN上几十毫秒），且可介由加密确认的方式来防止恶毒的协议攻击。NTP的目的是在无序的Internet环境中提供精确和健壮的时间服务。

![image-20220817153917826](https://imgoss.xgss.net/picgo/image-20220817153917826.png?aliyun)



### [SNMP简单网络管理协议](https://baike.baidu.com/item/%E7%AE%80%E5%8D%95%E7%BD%91%E7%BB%9C%E7%AE%A1%E7%90%86%E5%8D%8F%E8%AE%AE?fromtitle=SNMP&fromid=133378)

简单网络管理协议(Simple Network Management Protocol--SNMP）的原来名字叫做简单网关监控协议（Simple Gateway Monitoring Protocol-SGMP）。最早是IETF的研究小组提出来的，在SGMP协议的基础之上，加上新的管理信息结构和管理信息库，让SGMP更加全面。简单性和扩展性是SNMP所体现出来的，其中包含数据库类型（Database Schema），一个应用层协议（Application Layer Protocol）和一些资料文件。SNMP管理协议不光能够加强网络管理系统的效能，而且还可以用来对网络中的资源进行管理和实时监控。

zabbix监控



### [SSH安全外壳协议](https://baike.baidu.com/item/%E7%AE%80%E5%8D%95%E7%BD%91%E7%BB%9C%E7%AE%A1%E7%90%86%E5%8D%8F%E8%AE%AE?fromtitle=SNMP&fromid=133378)

SSH 为 Secure Shell 的缩写，由 IETF 的网络小组（Network Working Group）所制定；SSH 为建立在应用层基础上的安全协议。SSH 是较可靠，专为远程登录会话和其他网络服务提供安全性的协议。利用 SSH 协议可以有效防止远程管理过程中的信息泄露问题。SSH最初是UNIX系统上的一个程序，后来又迅速扩展到其他操作平台。SSH在正确使用时可弥补网络中的漏洞。SSH客户端适用于多种平台。几乎所有UNIX平台—包括HP-UX、Linux、AIX、Solaris、Digital UNIX、Irix，以及其他平台，都可运行SSH。



远程登录linux服务器：

![image-20220817154425630](https://imgoss.xgss.net/picgo/image-20220817154425630.png?aliyun)



### [MQTT消息队列遥测传输协议](https://baike.baidu.com/item/MQTT)

MQTT(消息队列遥测传输)是ISO 标准(ISO/IEC PRF 20922)下基于发布/订阅范式的消息协议。它工作在 TCP/IP协议族上，是为硬件性能低下的远程设备以及网络状况糟糕的情况下而设计的发布/订阅型消息协议，为此，它需要一个消息中间件 。

#### [MQTT网关有哪些应用场景](https://www.elecfans.com/news/1728964.html)

　　MQTT网关是一款工业级的智能网关，设计满足工业级标准和工业用户的需求，该产品可帮助用户快速接入物联网云平台，实现安全可靠的数据传输，广泛应用于交通、电力、金融、水利、气象、环保、工业自动化，能源矿产、医疗、农业、林业、石油、建筑、智能交通、等物联网应用。

消息队列RabbitMQ、kafka



### [WebSocket网络套接字协议](https://baike.baidu.com/item/WebSocket)

WebSocket是一种在单个TCP连接上进行全双工通信的协议。WebSocket通信协议于2011年被IETF定为标准RFC 6455，并由RFC7936补充规范。WebSocket API也被W3C定为标准。

基于websocket的事实通信的特点，其存在的应用场景大概有：

```
弹幕
媒体聊天
协同编辑
基于位置的应用
体育实况更新
股票基金报价实时更新
```

https://blog.csdn.net/qq_30071415/article/details/117409312



### [RDP微软远程桌面协议](https://baike.baidu.com/item/%E8%BF%9C%E7%A8%8B%E6%A1%8C%E9%9D%A2%E5%8D%8F%E8%AE%AE/9978980?fromtitle=RDP&fromid=2986499&fr=aladdin)

远程桌面协议(RDP)是一个多通道(multi-channel)的协议，让使用者(所在计算机称为用户端或'本地计算机')连上提供微软终端机服务的计算机(称为服务端或'远程计算机')。

![image-20220817155355973](https://imgoss.xgss.net/picgo/image-20220817155355973.png?aliyun)

### [VNC虚拟网络计算协议](https://baike.baidu.com/item/VNC)

VNC [1]  (Virtual Network Console)是虚拟网络控制台的缩写。它 是一款优秀的远程控制工具软件，由著名的 AT&T 的欧洲研究实验室开发的。VNC 是在基于 UNIX 和 Linux 操作系统的免费的开源软件，远程控制能力强大，高效实用，其性能可以和 Windows 和 MAC 中的任何远程控制软件媲美。 在 Linux 中，VNC 包括以下四个命令：vncserver，vncviewer，vncpasswd，和 vncconnect。大多数情况下用户只需要其中的两个命令：vncserver 和 vncviewer。



### [Rsync远程数据同步](https://baike.baidu.com/item/rsync/8086338?fr=aladdin)

rsync是linux系统下的数据镜像备份工具。使用快速增量备份工具Remote Sync可以远程同步，支持本地复制，或者与其他SSH、rsync主机同步。



应用： 同步文件、上传文件、备份文件。



![image-20220817152852122](https://imgoss.xgss.net/picgo/image-20220817152852122.png?aliyun)



网络协议当然不仅仅以上讲述的，只是个人能力有限接触到的觉得比较重要的，大部分的语义解释来自百度百科，给大家分享。





