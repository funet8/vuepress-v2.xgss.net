---
title: 一分钟了解HTTP和HTTPS
createTime: 2025/05/27 17:51:17
permalink: /article/e5sasswt/
---
# 一分钟了解HTTP和HTTPS协议

很多人存在这样的疑惑就是**http与https的区别**，这篇文章就跟大家介绍一下。一句话总结**HTTPS是身披SSL外壳的HTTP**，HTTPS更安全，实际使用中绝大多数的网站现在都采用的是HTTPS协议，这也是未来互联网发展的趋势。

![httpandhttps555555](https://imgoss.xgss.net/picgo/httpandhttps555555.jpg?aliyun)

## 什么是协议？

网络协议是计算机之间为了实现网络通信而达成的一种“约定”或者”规则“，有了这种”约定“，不同厂商的生产设备，以及不同操作系统组成的计算机之间，就可以实现通信。

## 什么是HTTP?

​	超文本传输协议，是一个基于请求与响应，无状态的，应用层的协议，常基于TCP/IP协议传输数据，互联网上应用最为广泛的一种网络协议,所有的WWW文件都必须遵守这个标准。设计HTTP的初衷是为了提供一种发布和接收HTML页面的方法。

## 什么是HTTPS？

​	HTTPS是一种通过计算机网络进行安全通信的传输协议，经由HTTP进行通信，利用SSL/TLS建立全信道，加密数据包。HTTPS使用的主要目的是提供对网站服务器的身份认证，同时保护交换数据的隐私与完整性。

## HTTP特点

​	无状态：协议对客户端没有状态存储，对事物处理没有“记忆”能力，比如访问一个网站需要反复进行登录操作
​	无连接：HTTP/1.1之前，由于无状态特点，每次请求需要通过TCP三次握手四次挥手，和服务器重新建立连接。比如某个客户机在短时间多次请求同一个资源，服务器并不能区别是否已经响应过用户的请求，所以每次需要重新响应请求，需要耗费不必要的时间和流量。
​	基于请求和响应：基本的特性，由客户端发起请求，服务端响应
​	简单快速、灵活
​	通信使用明文、请求和响应不会对通信方进行确认、无法保护数据的完整性

## HTTPS特点

​	内容加密：采用混合加密技术，中间者无法直接查看明文内容
​	验证身份：通过证书认证客户端访问的是自己的服务器
​	保护数据完整性：防止传输的内容被中间人冒充或者篡改
​	收方能够证实发送方的真实身份；

## HTTP 与 HTTPS  的区别

### 1、端口不同

https的端口是443，而http的端口是80，当然两者的连接方式也是不太一样的。

### 2、安全性

HTTP 是超文本传输协议，信息是明文传输，HTTPS 则是具有安全性的 SSL 加密传输协议。HTTP 的连接很简单，是无状态的。HTTPS 协议是由 SSL+HTTP 协议构建的可进行加密传输、身份认证的网络协议，比 HTTP 协议安全

### 3、申请证书

HTTPS  协议需要到 CA （Certificate Authority，证书颁发机构）申请证书，一般免费证书较少，因而需要一定费用。HTTP不需要。

### 4、资源消耗

HTTPS 其实就是建构在 SSL/TLS 之上的 HTTP 协议，所以，要比较 HTTPS 比 HTTP 要更耗费服务器资源。





## 为什么要用HTTPS

HTTPS是HTTP协议的安全版本，HTTP协议的数据传输是明文的，是不安全的，HTTPS使用了SSL/TLS协议进行了加密处理。http端口是80，https端口是443。

**一般http中存在如下问题：**	

- 请求信息明文传输，容易被窃听截取。
- 数据的完整性未校验，容易被篡改
- 没有验证对方身份，存在冒充危险
  	

**安全更高**
		请求信息明文传输，容易被窃听截取。
		数据的完整性未校验，容易被篡改
		没有验证对方身份，存在冒充危险
	**SEO搜索引擎**
		谷歌搜索引擎指南中就提出来如果网站是HTTPS网址（安装SSL安全证书）在一定条件因素中会对网站的权重和排名有一定的正面作用。
	**第三方强制要求**
		苹果应用商店
		腾讯小程序

## HTTPS 的工作原理

我们都知道 HTTPS 能够加密信息，以免敏感信息被第三方获取，所以很多银行网站或电子邮箱等等安全级别较高的服务都会采用 HTTPS 协议。


![img](https://imgoss.xgss.net/picgo/https-intro.png?aliyun)



**1、客户端发起 HTTPS 请求**

这个没什么好说的，就是用户在浏览器里输入一个 https 网址，然后连接到 server 的 443 端口。

**2、服务端的配置**

采用 HTTPS 协议的服务器必须要有一套数字证书，可以自己制作，也可以向组织申请，区别就是自己颁发的证书需要客户端验证通过，才可以继续访问，而使用受信任的公司申请的证书则不会弹出提示页面。

这套证书其实就是一对公钥和私钥，如果对公钥和私钥不太理解，可以想象成一把钥匙和一个锁头，只是全世界只有你一个人有这把钥匙，你可以把锁头给别人，别人可以用这个锁把重要的东西锁起来，然后发给你，因为只有你一个人有这把钥匙，所以只有你才能看到被这把锁锁起来的东西。

**3、传送证书**

这个证书其实就是公钥，只是包含了很多信息，如证书的颁发机构，过期时间等等。

**4、客户端解析证书**

这部分工作是有客户端的TLS来完成的，首先会验证公钥是否有效，比如颁发机构，过期时间等等，如果发现异常，则会弹出一个警告框，提示证书存在问题。

如果证书没有问题，那么就生成一个随机值，然后用证书对该随机值进行加密，就好像上面说的，把随机值用锁头锁起来，这样除非有钥匙，不然看不到被锁住的内容。

**5、传送加密信息**

这部分传送的是用证书加密后的随机值，目的就是让服务端得到这个随机值，以后客户端和服务端的通信就可以通过这个随机值来进行加密解密了。

**6、服务端解密信息**

服务端用私钥解密后，得到了客户端传过来的随机值(私钥)，然后把内容通过该值进行对称加密，所谓对称加密就是，将信息和私钥通过某种算法混合在一起，这样除非知道私钥，不然无法获取内容，而正好客户端和服务端都知道这个私钥，所以只要加密算法够彪悍，私钥够复杂，数据就够安全。

**7、传输加密后的信息**

这部分信息是服务段用私钥加密后的信息，可以在客户端被还原。

**8、客户端解密信息**

客户端用之前生成的私钥解密服务段传过来的信息，于是获取了解密后的内容，整个过程第三方即使监听到了数据，也束手无策。



### 	公钥和私钥

公钥和私钥就是俗称的不对称加密方式。公钥（Public Key）与私钥（Private 
Key）是通过一种算法得到的一个密钥对（即一个公钥和一个私钥），公钥是密钥对外公开的部分，私钥则是非公开的部分。公钥通常用于加密会话密钥、验证数字签名，或加密可以用相应的私钥解密的数据。

### 非对称加密

对称加密的特点：对称密码体制中只有一种密钥，并且是非公开的。如果要解密就得让对方知道密钥，所以想要保证其安全性就要保证密钥的安全。

非对称加密的特点：算法强度复杂、安全性依赖于算法与密钥但是由于其算法复杂，而使得加密解密速度没有对称加密解密的速度快。非对称密钥体制有两种密钥，其中一个是公开的，这样就可以不需要像对称密码那样传输对方的密钥了，这样安全性就大了很多。

非对称加密公钥和私钥的使用方法：(1) 公钥加密私钥解密。(2) 私钥做数字签名，公钥验证。


### 	原理

通过这种算法得到的密钥对能保证在世界范围内是唯一的。使用这个密钥对的时候，如果用其中一个密钥加密一段数据，则必须用另一个密钥才能解密。比如用公钥加密的数据就必须用私钥才能解密，如果用私钥进行加密也必须用公钥才能解密，否则将无法成功解密。

### 数字证书的原理

数字证书采用公钥体制，即利用一对互相匹配的密钥对进行加密、解密。每个用户自己设定一把特定的仅为本人所知的私有密钥（私钥），用它进行解密和签名；
同时设定一把公共密钥（公钥）并由本人公开，为一组用户所共享，用于加密和验证签名。由于密钥仅为本人所有，这样就产生了别人无法生成的文件，也就形成了数字签名。
数字证书是一个经证书授权中心（CA）数字签名的包含公开密钥拥有者信息以及公开密钥的文件。
最简单的证书包含一个公开密钥、名称以及证书授权中心的数字签名。数字证书还有一个重要的特征就是只在特定的时间段内有效。

## SSL证书

SSL（Secure Socket Layer，安全套接字层）：1994年为 Netscape 所研发，SSL 协议位于 TCP/IP 协议与各种应用层协议之间，为数据通讯提供安全支持。
获取ssl证书

## 获取免费SSL证书途径

### 阿里云等

阿里云、腾讯云、华为云等国内运营商提供的免费1年证书，例如阿里云1个账号，最多申请20个免费证书，单域名，不支持泛域名

### Let’s Encrypt

certbot 是官方推荐的签发工具
acme.sh 实现了 acme 协议, 可以从 letsencrypt 生成免费的证书.
一般有效期3个月，利用脚本可自动续期（如果使用了阿里云的CDN，在部署证书时候，需要手动上传证书或者利用脚本自动配置证书，所以很不便捷）

### sslforfree

官网：https://www.sslforfree.com/
参考：https://www.wn789.com/15667.html
			不可以自动续约，如果90天到期那就直接无效，我们需要手动设置续约才可以继续使用。

### 宝塔面板等

Let’s Encrypt

## 付费证书

价格从几千到几万每年不等



## HTTPS的缺点

​	1.SSL证书需要购买申请，功能越强大的证书费用越高
​	2.使用HTTPS协议会使页面的加载时间延长近50%，增加10%到20%的耗电
​	3.HTTPS连接缓存不如HTTP高效，流量成本高。
​	4.HTTPS连接服务器端资源占用高很多，支持访客多的网站需要投入更大的成本。