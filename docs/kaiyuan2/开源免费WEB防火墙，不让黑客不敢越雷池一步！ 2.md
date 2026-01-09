---
title: 开源免费WEB防火墙，不让黑客不敢越雷池一步！ 2
createTime: 2025/05/27 17:51:17
permalink: /article/xntuqgtx/
---
# 使用开源免费雷池WAF防火墙，接入保护你的网站

大家好，我是星哥，昨天介绍了《[开源免费WEB防火墙，不让黑客越雷池一步！](https://mp.weixin.qq.com/s/9TOXth3128N6PtXhaWI5aw)》链接：https://mp.weixin.qq.com/s/9TOXth3128N6PtXhaWI5aw

今天讲一下如何把网站接入到雷池WAF。

首先需要安装雷池WAF。

## 雷池工作原理（图）

![image-20250424190054665](https://imgoss.xgss.net/picgo/image-20250424190054665.png?aliyun)



## 解析一个新的域名



加入WAF之前的解析路径：

test-waf.xgss.net--->腾讯云CVM（宝塔中新建一个站点即可）



现在要加入WAF的保护的路径

test-waf.xgss.net ---> 雷池WAF ---> 腾讯云CVM

## 1.在宝塔中添加一个站点

新建一个站点，我这里添加一个测试的域名：test-waf.xgss.net，这里只是添加一个演示的静态站，数据库和PHP都不选。

把域名解析到服务器中

![image-20250425094459269](https://imgoss.xgss.net/picgo/image-20250425094459269.png?aliyun)

打开域名看是否可以访问

如图，访问成功，说明站点已经搭建好。

![image-20250425094807642](https://imgoss.xgss.net/picgo/image-20250425094807642.png?aliyun)

## 2.添加应用(添加站点)

登录雷池控制台后, 进入 防护应用 - 应用管理 页面, 点击右上角的 添加应用 按钮进行配置.

![image-20250424190507782](https://imgoss.xgss.net/picgo/image-20250424190507782.png?aliyun)

一些关键字段的说明如下:

域名: 通过雷池访问该应用时使用的域名 (支持使用 * 做为通配符)，注意修改 DNS 解析到雷池 IP

端口: 雷池监听的端口 (如需配置 HTTPS 服务, 请勾选 SSL 选项并配置对应的 SSL 证书)

上游服务器: 被保护的 Web 服务的实际地址

## 3.编辑应用

如图填写

域名： test-waf.xgss.net

端口：这里之所以选择82端口，是因为WAF和WEB在同一台服务器上，端口冲突了

如果有条件可以选择安装在不同的服务器上，将域名解析到WAF上，再转发到上游服务器

上游服务器： IP+端口

![image-20250425095710644](https://imgoss.xgss.net/picgo/image-20250425095710644.png?aliyun)

## 4.测试

```
分别打开：
http://test-waf.xgss.net/

http://test-waf.xgss.net:82

```

没有WAF的

![image-20250425100101616](https://imgoss.xgss.net/picgo/image-20250425100101616.png?aliyun)

![image-20250425102429060](https://imgoss.xgss.net/picgo/image-20250425102429060.png?aliyun)

### 模拟一次攻击

```
http://test-waf.xgss.net/?q=<script>alert(%27XSS%27)</script>

http://test-waf.xgss.net:82/?q=<script>alert(%27XSS%27)</script>

```

如图没有被拦截

![image-20250425102522523](https://imgoss.xgss.net/picgo/image-20250425102522523.png?aliyun)

如图被拦截了

![image-20250425102451692](https://imgoss.xgss.net/picgo/image-20250425102451692.png?aliyun)

### 查看防护记录

![image-20250425102714221](https://imgoss.xgss.net/picgo/image-20250425102714221.png?aliyun)

### 查看统计报表

![image-20250425102739535](https://imgoss.xgss.net/picgo2025/image-20250425102739535.png?aliyun)

## 设置CC防护

如图打开CC防护，依次点击“防护应用”、点击“详情”，进入设置

有三种模式

1.防护模式（发现攻击后将自动拦截，并记录攻击事件）

2.观察模式（有攻击，只记录不拦截）

3.维护模式（显示：网站维护中，暂时无法访问）

![image-20250425104644129](https://imgoss.xgss.net/picgo/image-20250425104644129.png?aliyun)

![image-20250425102935758](https://imgoss.xgss.net/picgo/image-20250425102935758.png?aliyun)

多次刷新页面，实现了封禁

![image-20250425103141087](https://imgoss.xgss.net/picgo/image-20250425103141087.png?aliyun)

## 人机验证

如图开启人机验证，开启人机验证后，被自动化程序控制的浏览器将会被阻止

![image-20250425105109356](https://imgoss.xgss.net/picgo/image-20250425105109356.png?aliyun)

## 身份认证

### 打开身份认证

如图打开身份认证

![image-20250425104458000](https://imgoss.xgss.net/picgo/image-20250425104458000.png?aliyun)

### 添加用户

以此点击“身份认证”，“配置”，“添加用户”

![image-20250425104012822](https://imgoss.xgss.net/picgo/image-20250425104012822.png?aliyun)

再访问页面，需要输入账号和密码

![image-20250425104117231](https://imgoss.xgss.net/picgo/image-20250425104117231.png?aliyun)

### 授权

未获得授权，再回到WAF后台授权

![image-20250425104203590](https://imgoss.xgss.net/picgo/image-20250425104203590.png?aliyun)

以此点击“身份认证”、账号，授权，点击授权通过即可。

![image-20250425103904534](https://imgoss.xgss.net/picgo/image-20250425103904534.png?aliyun)

# 结尾

说了这么多，相信大家都看出来雷池 WAF 防火墙有多香了吧！零成本、易操作，防护效果还杠杠的。不管你是个人博主，还是小团队做的网站，赶紧安排上！把它接入网站，就等于给网站上了一道坚固的安全锁。



写文不易，如果你都看到了这里，请点个赞和在看，分享给更多的朋友；也别忘了关注星哥玩云！这里有满满的干货分享，还有轻松有趣的技术交流～点个赞、分享给身边的小伙伴，一起成长，一起玩转技术世界吧！ 😊



