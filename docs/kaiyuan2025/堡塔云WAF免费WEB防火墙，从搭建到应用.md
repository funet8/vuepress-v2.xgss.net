# 堡塔云WAF免费WEB防火墙，从搭建到应用



hello大家好我是星哥，之前介绍过[开源免费WEB防火墙](https://mp.weixin.qq.com/s/9TOXth3128N6PtXhaWI5aw) 雷池，https://mp.weixin.qq.com/s/9TOXth3128N6PtXhaWI5aw

今天再介绍一款宝塔出品的一个免费开源的WEB防火墙。

# 堡塔云WAF介绍

堡塔云WAF，宝塔免费(free)的私有云网站应用防火墙(firewall)，基于docker/nginx/lua开发

开源地址： https://github.com/aaPanel/aaWAF

官方文档：

```
https://www.kancloud.cn/kern123/cloudwaf/3217243
```



## 系统

宝塔系统兼容表，我这里使用Centos7的系统来做演示。

![image-20250508182017514](https://imgoss.xgss.net/picgo/image-20250508182017514.png?aliyun)

## 安装命令

```
URL=https://download.bt.cn/cloudwaf/scripts/install_cloudwaf.sh && if [ -f /usr/bin/curl ];then curl -sSO "$URL" ;else wget -O install_cloudwaf.sh "$URL";fi;bash install_cloudwaf.sh
```

提示

```
+--------------------------------------------------------------------------------------
| Bt-WAF FOR CentOS/Ubuntu/Debian
|
| Copyright © 2015-2099 BT-SOFT(https://www.bt.cn) All rights reserved.
|
| The Bt-WAF URL will be https://SERVER_IP:8379 when installed.
|--------------------------------------------------------------------------------------
| 为了您的正常使用,建议使用全新或纯净的系统安装,不支持已使用80 443 33060端口的系统安装
|
| 堡塔云WAF使用 Docker 服务并创建 cloudwaf_nginx cloudwaf_mysql 容器
|
| 容器不存储数据,存储于宿主机:/www/cloud_waf,为了您的数据安全请勿在容器内存储数据
+--------------------------------------------------------------------------------------

取消安装请输入 n, 确认安装请输入 Y 或 y, 最后按回车键执行.
Do you want to install Bt-WAF to the /www/cloud_waf directory now? (Y/y/n): Y
```

安装成功

```
==================================================================
堡塔云WAF安装完成! Installed successfully!
==================================================================
外网访问地址: https://XXXXXXXXXXXX:8379/5af73a11
内网访问地址: https://192.168.1.2:8379/5af73a11
username: 37929f87
password: e263df05
If you cannot access the Bt-WAF 
release the following Bt-WAF port [8379,80,443] in the security group
若无法访问堡塔云WAF，请检查防火墙/安全组是否有放行[8379,80,443]端口

=========================打开堡塔云WAF前请看=======================

 因默认启用自签证书https加密访问，浏览器将提示不安全
 点击【高级】-【继续访问】或【接受风险并继续】访问
```

使用浏览器访问IP+端口

如果你是宝塔的用户，对这个界面一定不陌生，就跟宝塔一模一样。

![image-20250508165853472](https://imgoss.xgss.net/picgo/image-20250508165853472.png?aliyun)

# 添加防护网站

使用测试域名 test-waf.xgss.net 解析到 192.168.1.2 ，并且在内网 192.168.1.10 里面配置了一个站点。

![image-20250508170213914](https://imgoss.xgss.net/picgo/image-20250508170213914.png?aliyun)

## 首页

![image-20250508174844878](https://imgoss.xgss.net/picgo2025/image-20250508174844878.png?aliyun)

可以打开网站

![image-20250508170357731](https://imgoss.xgss.net/picgo/image-20250508170357731.png?aliyun)



### 测试攻击链接

```
http://test-waf.xgss.net/?id=ls%20/etc/passwd
```

防护界面：

![image-20250508171548898](https://imgoss.xgss.net/picgo/image-20250508171548898.png?aliyun)

## 1.设置CC防御

这里设置，某IP在60秒内请求同一访问路径(标准（推荐）)超过30次临时拉黑此IP300秒

![image-20250508175117650](https://imgoss.xgss.net/picgo/image-20250508175117650.png?aliyun)

## 2.网站漏洞防护

这里有几个功能： SQL注入防御、XSS注入防御、SSRF防御、Cookie防御、命令执行拦截，默认的使用严格模式，当然你也可以修改标准模式和观察模式。

![image-20250508175704064](https://imgoss.xgss.net/picgo/image-20250508175704064.png?aliyun)

## 3.文件路径保护

文件路径保护有：网站后台保护、拦截恶意文件上传、畸形文件上传防御、恶意下载防御、文件包含防御、PHP代码执行防御，也使用标准防护模式

![image-20250508175913984](https://imgoss.xgss.net/picgo/image-20250508175913984.png?aliyun)

## 4.机器访问保护

扫描器防御，检测恶意扫描器，防止各类扫描器、木马连接工具、访问网站

![image-20250508175951736](https://imgoss.xgss.net/picgo/image-20250508175951736.png?aliyun)

## 5.IP黑名单

添加一个黑名单试一下

![image-20250508180126616](https://imgoss.xgss.net/picgo/image-20250508180126616.png?aliyun)



## 6.添加人机验证

![image-20250508174451113](https://imgoss.xgss.net/picgo/image-20250508174451113.png?aliyun)

验证：

![image-20250508174517528](https://imgoss.xgss.net/picgo/image-20250508174517528.png?aliyun)

## 攻击大屏

![image-20250508174729479](https://imgoss.xgss.net/picgo/image-20250508174729479.png?aliyun)



# 结尾

堡塔云WAF作为一款免费的Web应用防火墙，为中小网站提供了简单易用的安全防护方案。通过本文的搭建和应用指南，即使是运维新手也能快速部署基础Web安全防护。随着使用深入，建议根据实际业务需求逐步调整防护策略，在安全性和可用性之间找到最佳平衡点。

写文不易，如果你都看到了这里，请点个赞和在看，分享给更多的朋友；也别忘了关注星哥玩云！这里有满满的干货分享，还有轻松有趣的技术交流～点个赞、分享给身边的小伙伴，一起成长，一起玩转技术世界吧！ 😊

