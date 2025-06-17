---
title: Github-Page-my-domain
createTime: 2025/05/27 17:51:18
permalink: /article/oroap40n/
---
# Github Page怎么绑定自己的域名

## 前提

已经有域名，没有域名的话先去申请一个域名。

如果想简单省心，不计较时间和金钱的话，那就阿里云或腾讯云买全套服务器+域名+解析。

gitbook.xgss.net 二级域名解析到github上，轻松拥有免费站点。

## 最终效果

```
github的域名： https://funet8.github.io/book/

自己的域名： gitbook.xgss.net CNAME解析到  funet8.github.io

通过浏览器访问自己的域名 gitbook.xgss.net 得到免费站点

```



## 1.在仓库里添加CNAME

在github项目中添加一个文件 CNAME

文件里填写内容 

```
gitbook.xgss.net
要绑定的域名（不要包含Http://和www）
```

## 2.在github仓库中添加Custom domain

如图找到 Custom domain添加域名后保存即可。

![image-20210909154429105](http://imgoss.xgss.net/picgo/image-20210909154429105.png?aliyunoss)

## 3.添加域名解析

在阿里云域名后台添加解析

![image-20210909154551067](http://imgoss.xgss.net/picgo/image-20210909154551067.png?aliyunoss)

ping域名

```
# ping gitbook.xgss.net
PING funet8.github.io (185.199.109.153) 56(84) bytes of data.
64 bytes from cdn-185-199-109-153.github.com (185.199.109.153): icmp_seq=1 ttl=49 time=281 ms
64 bytes from cdn-185-199-109-153.github.com (185.199.109.153): icmp_seq=2 ttl=49 time=291 ms
^C
--- funet8.github.io ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2000ms
rtt min/avg/max/mdev = 281.192/289.782/296.935/6.536 ms
```

浏览器访问 http://gitbook.xgss.net/ 即可得到免费的Github站点