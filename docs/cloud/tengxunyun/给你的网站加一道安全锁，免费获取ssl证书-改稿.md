---
title: 给你的网站加一道安全锁，免费获取ssl证书-改稿
createTime: 2025/05/27 17:51:17
permalink: /article/mnoqmlel/
---


# 双十一购腾讯云轻量云免费申请ssl证书，给你的网站加一道安全锁

# 前言

之前介绍了《[腾讯云轻量应用服务器部署私有笔记](https://cloud.tencent.com/developer/article/2466047)》，https://cloud.tencent.com/developer/article/2466047 搭建了自己的私有笔记系统，但是没有申请ssl证书，没有SSL证书的网站数据传输不被加密，这使得登录凭证、个人信息、支付详情等敏感信息容易被第三方拦截和窃取，增加了数据泄露的风险。

SSL证书不仅能提升网站的安全性，还能增强用户对网站的信任度，提高网站的转化率。赶快行动起来，为你的网站添加这把安全锁吧！

今天来讲一下如何利用腾讯轻量云来申请免费的SSL证书。

# 前期准备

1.需要一个域名（国内服务器需要备案）

2.需要一个腾讯云服务器或者腾讯云轻量云

当然腾讯云的双十一活动还在继续，可以访问链接： [https://mc.tencent.com/Ijay4BNd](https://mc.tencent.com/Ijay4BNd) 选择合适的产品。

每日两场秒杀（上午10:00、下午15:00），爆款折扣享不停 。

![image-20241115112916561](https://imgoss.xgss.net/picgo/image-20241115112916561.png?aliyun)



这里推荐99元/年的2核2G4M轻量云。 

![image-20241115114121700](https://imgoss.xgss.net/picgo/image-20241115114121700.png?aliyun)

# 什么是SSL证书



![image-20241118202323805](https://imgoss.xgss.net/picgo/image-20241118202323805.png?aliyun)



SSL（Secure Sockets Layer）证书是一种安全技术，用于加密互联网通信，确保数据在客户端（如浏览器）和服务器之间传输时的安全性和隐私性。它通过加密技术保护网站用户的敏感信息（如密码、信用卡信息等），防止数据在传输过程中被窃取或篡改。

加密的原理图，当然今天的目标不是

![image-20241118200334586](https://imgoss.xgss.net/picgo/image-20241118200334586.png?aliyun)

# 什么是https

**HTTPS**（Hypertext Transfer Protocol Secure）是**超文本传输安全协议**，是HTTP协议的安全版本。它通过使用SSL/TLS协议对数据进行加密，确保了客户端和服务器之间的数据传输的机密性和完整性。

浏览器与服务器之间的https加密通信会包括以下一些概念：**非对称加密、对称加密、RSA、证书申请、根证书。**https证书加密，就是在传输层tcp和应用层http之间加了一层ssl层来对传输内容进行加密。



# 如何获取免费的SSL证书

今天主要讲两种方式获取，第一种是在宝塔后台可以申请免费的三个月证书，第二种是acme.sh开源工具来获取

# 方法一、宝塔获取免费的SSL证书

## 1.在宝塔后台

点击“网站”，点击“站点”，点击 "SSL"

![image-20241118201046045](https://imgoss.xgss.net/picgo/image-20241118201046045.png?aliyun)

## 2.再点击申请证书，即可

![image-20241118201235256](https://imgoss.xgss.net/picgo/image-20241118201235256.png?aliyun)

## 3.定时需求任务

定时任务--->添加任务--->续签

![image-20241119092612216](https://imgoss.xgss.net/picgo/image-20241119092612216.png?aliyun)

# 方法二、通过acme.sh开源工具申请泛解析SSL证书

acme.sh 是一个开源的、基于Shell脚本的工具，用于自动申请、安装和更新SSL/TLS证书。它通过实现ACME协议来与Let's Encrypt等证书颁发机构（CA）进行交互，从而实现自动化管理SSL证书，最主要是可以获取

# 前期准备

1.域名

2.Linux云服务器（本文系统某讯云的Centos7），测试公网IP为：12.34.56.78

3.域名服务商的API Token，或者域名解析到申请SSL云服务器IP（实验项目： siyuan.xgss.net）

# 安装acme.sh

普通用户和 root 用户都可以安装使用. 安装过程进行了以下几步:

```
# yum install socat -y

# curl https://get.acme.sh | sh
或者
# curl https://get.acme.sh | sh -s email=my@example.com(zerossl.com注册的邮箱账号，在浏览器登录ZeroSSL之后可以看到证书)
```

国内的服务器下载github可能会比较慢，如果下载失败，可以多执行几次。

也可以根据提示使用国内的源。

![image-20220627113047199](https://imgoss.xgss.net/picgo/image-20220627113047199.png?aliyun)

1、把 acme.sh 安装到你的 home 目录下：~/.acme.sh/
装过程不会污染已有的系统任何功能和文件, 所有的修改都限制在安装目录中: ~/.acme.sh/

2、并创建 一个 bash 的 alias, 方便你的使用: alias acme.sh=~/.acme.sh/acme.sh

3、自动为你创建 cronjob, 每天 0:00 点自动检测所有的证书, 如果快过期了, 需要更新, 则会自动更新证书.



把 acme.sh 安装到你的 home 目录下:~/.acme.sh/并创建 一个 bash 的 alias, 方便你的使用:

```
alias acme.sh=~/.acme.sh/acme.sh
echo 'alias acme.sh=~/.acme.sh/acme.sh' >>/etc/profile
```



## 常用命令

```
acme.sh --help     #获取帮助
acme.sh --version  # 查看版本
```

## 关联 ZeroSSL

目前 acme.sh 支持四个正式环境 CA，分别是 Let’s Encrypt、Buypass、ZeroSSL 和 SSL.com，默认使用 ZeroSSL，所以我们不用切换。如果不放心，可以设置一下：

```
acme.sh --set-default-ca --server zerossl
```

## 生成证书

acme.sh 实现了 acme 协议支持的所有验证协议. 一般有两种方式验证: HTTP 和 DNS 验证。

如果有条件建议使用DNS验证

# HTTP认证

此方法**好像不支持域名的泛解析**，笔者想泛解析做泛域名的认证，但一直不成功，不知道什么原因。

## 域名解析

```
siyuan.xgss.net A记录解析到 12.34.56.78
只解析上面一条即可，因为只是为 siyuan.xgss.net 申请证书，后面的解析是为了实验能否申请到多*.xgss.net的证书
xgss.net A记录解析到 12.34.56.78
*.xgss.net A记录解析到 12.34.56.78
```

![image-20220627164634187](https://imgoss.xgss.net/picgo/image-20220627164634187.png?aliyun)

配置http站点

```
# mkdir -p /data/wwwroot/web/siyuan.xgss.net/
# echo 'hello SSL'> /data/wwwroot/web/siyuan.xgss.net/index.html
配置nginx站点
server {
  listen       80;
  access_log /dev/null;
  error_log /dev/null;
  server_name  siyuan.xgss.net xgss.net;
  root /data/wwwroot/web/siyuan.xgss.net/;
  location / {
                index  index.html index.htm index.php;
        }
}
```

验证是否配置正常

```
# curl http://siyuan.xgss.net/
hello SSL
```



http 方式需要在你的网站根目录下放置一个文件, 来验证你的域名所有权,完成验证. 然后就可以生成证书了.

```
acme.sh  --issue  -d mydomain.com -d www.mydomain.com  --webroot  /home/wwwroot/mydomain.com/
```

只需要指定域名, 并指定域名所在的网站根目录. acme.sh 会全自动的生成验证文件, 并放到网站的根目录, 然后自动完成验证. 最后会聪明的删除验证文件. 整个过程没有任何副作用.

如果你用的 nginx服务器, 或者反代, acme.sh 还可以智能的从 nginx的配置中自动完成验证, 你不需要指定网站根目录:

```
acme.sh --issue  -d mydomain.com   --nginx
```

**注意, 无论是 apache 还是 nginx 模式, acme.sh在完成验证之后, 会恢复到之前的状态, 都不会私自更改你本身的配置. 好处是你不用担心配置被搞坏, 也有一个缺点, 你需要自己配置 ssl 的配置, 否则只能成功生成证书, 你的网站还是无法访问https. 但是为了安全, 你还是自己手动改配置吧.**

如果你还没有运行任何 web 服务, **80** 端口是空闲的, 那么 **acme.sh** 还能假装自己是一个webserver, 临时听在**80** 端口, 完成验证:

```
acme.sh  --issue -d mydomain.com   --standalone
```



https://app.zerossl.com/signup 使用邮箱注册一个账号，假设账号的邮箱为："XXXX@163.com"

```
# /root/.acme.sh/acme.sh --register-account -m XXXX@163.com
[Mon Jun 27 13:37:27 CST 2022] No EAB credentials found for ZeroSSL, let's get one
[Mon Jun 27 13:37:30 CST 2022] Registering account: https://acme.zerossl.com/v2/DV90
[Mon Jun 27 13:37:38 CST 2022] Registered
[Mon Jun 27 13:37:38 CST 2022] ACCOUNT_THUMBPRINT='*********************'
```



## 申请证书

将证书放到一个指定的目录，scrm用nginx配置，本例是指定在/data/wwwroot/web/ssl目录下

### 1.创建ssl存放目录

```
mkdir -p /data/wwwroot/web/ssl
```



### 2.申请SSL证书

申请单域名证书，并且指定证书存放的目录

```
# /root/.acme.sh/acme.sh  --issue -d siyuan.xgss.net  --webroot  /data/wwwroot/web/siyuan.xgss.net/ \
--keypath       /data/wwwroot/web/ssl/siyuan.xgss.net.key  \
--fullchainpath /data/wwwroot/web/ssl/siyuan.xgss.net.key.pem \
--reloadcmd "/usr/local/openresty/nginx/sbin/nginx -s reload"
```

--reloadcmd 表示复制完成后重启服务器的命令，根据自己服务器状况填写。

/data/wwwroot/web/ssl/ 需要自己建立好，如果文件夹不存在，会报错。



### 3.生成dhparam文件

```
openssl dhparam -out /data/wwwroot/web/ssl/dhparam.pem     2048         
```



### 4.配置siyuan.xgss.net的nginx配置。

```
  server {
        listen 443 ssl;
		access_log /dev/null;
	    error_log /dev/null;
		server_name  siyuan.xgss.net;
		root /data/wwwroot/web/siyuan.xgss.net/ ;
		
	    ssl_certificate     /data/wwwroot/web/ssl/siyuan.xgss.net.key.pem;
        ssl_certificate_key /data/wwwroot/web/ssl/siyuan.xgss.net.key;

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;
        ssl_dhparam /data/wwwroot/web/ssl/dhparam.pem;
		
		location / {
			index  index.html index.htm index.php;
		}
     }
```

浏览器访问： https://siyuan.xgss.net

证书信息

![image-20241202154546918](https://imgoss.xgss.net/picgo/image-20241202154546918.png?aliyun)



## ZeroSSL官网证书截图

![image-20220627172051184](https://imgoss.xgss.net/picgo/image-20220627172051184.png?aliyun)

# DNS认证

## 手动DNS方式

手动在域名上添加一条 txt 解析记录, 验证域名所有权。

这种方式的好处是, 你不需要任何服务器, 不需要任何公网 ip, 只需要 dns 的解析记录即可完成验证. 坏处是，如果不同时配置 Automatic DNS API，使用这种方式 acme.sh 将无法自动更新证书，每次都需要手动再次重新解析验证域名所有权。

```
acme.sh  --issue  --dns   -d mydomain.com \
 --yes-I-know-dns-manual-mode-enough-go-ahead-please
```

然后, acme.sh 会生成相应的解析记录显示出来, 你只需要在你的域名管理面板中添加这条 txt 记录即可.

等待解析完成之后, 重新生成证书:

```
acme.sh  --renew   -d mydomain.com \
  --yes-I-know-dns-manual-mode-enough-go-ahead-please
```

注意第二次这里用的是 **--renew**



## 自动DNS方式

dns 方式的真正强大之处在于可以使用域名解析商提供的 api 自动添加 txt 记录完成验证.

由于`acme.sh`对域名解析/提供商的支持十分广泛,所以请针对自己所在的域名提供商获取对应的API Token，目前支持 cloudflare, dnspod, cloudxns, godaddy 以及 ovh 等数十种解析商的自动集成.

支持列表:[点我跳转](https://github.com/acmesh-official/acme.sh/wiki/dnsapi) | https://github.com/acmesh-official/acme.sh/wiki/dnsapi

国内目前使用较多的是某讯云和某里云，获取API Token的方法分别是：

- 某讯云的`DNSPod`

  登录DNSPod,进入顶部导航栏里的用户中心,在左侧的导航栏里,找到`安全设置`,看到页面的最下面,有个`API Token`.点击`查看`->`创建API Token`->填写`Tokens名称`,复制好ID与Token即可.保存待用。


## 申请泛解析域名证书

获取到对应的API Token之后我们需要将id和key设置为环境变量，供acme.sh调用：

```
# DNSPod
export DP_Id="你的 API ID"
export DP_Key="你的 Token"

# aliyun
export Ali_Key="你的 AccessKey ID"
export Ali_Secret="你的 AccessKey Secret"
```

临时环境变量只需配置这一次即可，当成功申请证书后，API 信息会被自动保存在~/.acme.sh/account.conf里，下次你使用acme.sh的时候系统会自动读取并使用。

腾讯云DNSpod：

```
acme.sh --issue -d example.com -d *.example.com --dns dns_dp
```

阿里云：

```
acme.sh --issue  -d example.com -d *.example.com --dns dns_ali
```



```
acme.sh --issue  -d xgss.net -d *.xgss.net --dns dns_ali \
--keypath       /data/wwwroot/web/ssl/all.xgss.net.key  \
--fullchainpath /data/wwwroot/web/ssl/all.xgss.net.key.pem \
--reloadcmd "/usr/local/openresty/nginx/sbin/nginx -s reload"

openssl dhparam -out /data/wwwroot/web/ssl/dhparam.pem     2048      

# ll /data/wwwroot/web/ssl
total 16
-rw------- 1 root root 1679 Jun 27 19:02 all.xgss.net.key
-rw-r--r-- 1 root root 6684 Jun 27 19:02 all.xgss.net.key.pem
-rw-r--r-- 1 root root  424 Jun 27 19:03 dhparam.pem
```

![image-20220627190216829](https://imgoss.xgss.net/picgo/image-20220627190216829.png?aliyun)

(一个小提醒, 这里用的是 service nginx force-reload, 不是 service nginx reload, 据测试, reload 并不会重新加载证书, 所以用的 force-reload)

**你的KEY和Secret都将明文保存‘~/.acme.sh/account.conf’文件中，注意保护隐私。**

![image-20220628095240206](https://imgoss.xgss.net/picgo/image-20220628095240206.png?aliyun)



域名后台新增了两条记录

![image-20220627190154936](https://imgoss.xgss.net/picgo/image-20220627190154936.png?aliyun)

## 验证SSL

浏览器打开网址，点击地址的小锁图标，可以查看更多信息。

![image-20220627190701821](https://imgoss.xgss.net/picgo/image-20220627190701821.png?aliyun)

```
# curl https://ssl2.xgss.net/
hello SSL
[root@shanghai-node02 ssl]# curl https://ssl3.xgss.net/
hello SSL
[root@shanghai-node02 ssl]# curl https://ssl4.xgss.net/
hello SSL
```



# 定时更新证书

安装过程中会自动为你创建 cronjob, 每天 0:00 点自动检测所有的证书, 如果快过期了, 需要更新, 则会自动更新证书。

```
00 00 * * * root /root/.acme.sh/acme.sh --cron --home /root/.acme.sh &>/var/log/acme.sh.logs
```

# 查看已安装证书的信息

```
acme.sh --info -d xgss.net
```



# 更新证书

目前证书在 60 天以后会自动更新, 你无需任何操作. 今后有可能会缩短这个时间, 不过都是自动的, 你不用关心.

请确保 cronjob 正确安装, 看起来是类似这样的:

```
crontab  -l

56 * * * * "/root/.acme.sh"/acme.sh --cron --home "/root/.acme.sh" > /dev/null
```



# 更新acme.sh

目前由于 acme 协议和 letsencrypt CA 都在频繁的更新, 因此 acme.sh 也经常更新以保持同步.

升级 acme.sh 到最新版

```
acme.sh --upgrade
```

如果你不想手动升级, 可以开启自动升级:

```
acme.sh  --upgrade  --auto-upgrade
```

之后, acme.sh 就会自动保持更新了.

你也可以随时关闭自动更新:

```
acme.sh --upgrade  --auto-upgrade  0
```



# 结尾

SSL证书是保障网站安全的重要工具，它不仅可以保护网站和用户的数据，还可以提升网站的信任度和搜索引擎排名。如果你还没有为你的网站配置SSL证书，建议尽快办理。

双十一购物狂欢节还在继续，腾讯云推出了诱人的优惠活动。对于网站运营者、个人开发者来说，这无疑是一个提升网站性能和安全的绝佳时机。 可以点击：[https://mc.tencent.com/Ijay4BNd](https://mc.tencent.com/Ijay4BNd) 选择合适的产品。



