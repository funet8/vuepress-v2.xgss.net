# 网站受到攻击了？别担心！如何使用EdgeOne来保护我们的网站

# 前言

上篇文章介绍了《腾讯云的下一代CDN-EdgeOne》，最近遇到自己的博客网站经常遇到一些攻击，手动操作维护就比较麻烦了，刚好腾讯云EdgeOne双十一有活动，就想到如何把使用EdgeOne来保护我们的网站。

![image-20241120175326818](https://imgoss.xgss.net/picgo/image-20241120175326818.png?aliyun)

# 博客被攻击的日常

## 1.收到告警

收到告警邮件和短信。

![image-20241120164456792](https://imgoss.xgss.net/picgo/image-20241120164456792.png?aliyun)

## 2.使用ssh登录服务器

top查看系统资源

![image-20241120164548483](https://imgoss.xgss.net/picgo/image-20241120164548483.png?aliyun)

再查看日志

```
cd /www/wwwlogs # 进入到宝塔nginx日志目录
ll -Srh # 按照日志大小排列

# 最多的访问IP,前10名
cat /www/wwwlogs/www.xgss.net.log  |awk '{print $1}' | sort | uniq -c | sort -nr | head -n 10

tail -n5000 /www/wwwlogs/www.xgss.net.log  |awk '{print $1}' | sort | uniq -c | sort -nr | head -n 10 查看最后5000日志。


```

## 3.防护

ban掉最多的IP

再分析日志，有很多UA蜘蛛为Timpibot的日志

在nignx里添加配置：

```
#nginx 禁止ua是Timpibot的访问网站
if ($http_user_agent ~* "Timpibot") {
	return 403;
}    
```

# 购买套餐包

虽然双十一过了，但是腾讯云的双十一活动，一直到月底才结束，所以要抓紧咯。

选择 36元/年，个人版 50G+300万次/月的套餐，平均下来一个月才3元。

![image-20241119181335625](https://imgoss.xgss.net/picgo/image-20241119181335625.png?aliyun)



# 使用EdgeOne

进入EdgeOne控制台

## 1.点击“添加站点”

![image-20241120170133279](https://imgoss.xgss.net/picgo/image-20241120170133279.png?aliyun)

## 2.请输入您的站点

这里填写不带www的域名。

![image-20241120170250616](https://imgoss.xgss.net/picgo/image-20241120170250616.png?aliyun)

## 3.选择套餐

试用版的套餐和购买的个人版的区别。

![image-20241120170418346](https://imgoss.xgss.net/picgo/image-20241120170418346.png?aliyun)

## 4.选择加速区域和接入模式

加速区域，根据自己的业务和域名的备案情况来选择。

![image-20241120170538050](https://imgoss.xgss.net/picgo/image-20241120170538050.png?aliyun)

## 5.归属权验证

DNS 解析验证和文件验证都可以，我这里在域名的dns添加一条记录，点击验证。

![image-20241120171052250](https://imgoss.xgss.net/picgo/image-20241120171052250.png?aliyun)

## 6.完成

![image-20241120171502095](https://imgoss.xgss.net/picgo/image-20241120171502095.png?aliyun)

## 7.域名配置

如图填写 需要加速域名， 源站的IP等。

![image-20241120171614495](https://imgoss.xgss.net/picgo/image-20241120171614495.png?aliyun)

## 8.推荐配置



![image-20241120171641846](https://imgoss.xgss.net/picgo/image-20241120171641846.png?aliyun)

## 9.配置CNAME

```
把需要解析的域名 www.xgss.net CNAME解析到 www.xgss.net.eo.dnse1.com
```



![image-20241120171754918](https://imgoss.xgss.net/picgo/image-20241120171754918.png?aliyun)

添加一条记录，把旧的记录暂停掉，如果是新站可以忽略。

![image-20241120172125631](https://imgoss.xgss.net/picgo2025/image-20241120172125631.png?aliyun)



## 10.配置https

再配置https。

如何获取ssl证书可以查看星哥之前的文章。

![image-20241120172432936](https://imgoss.xgss.net/picgo/image-20241120172432936.png?aliyun)



## 11.查看数据

查看数据，安全防护可以自由配置一些规则。

![image-20241120173626802](https://imgoss.xgss.net/picgo/image-20241120173626802.png?aliyun)



# 总结

配置EdgeOne加速与防护一体化、全面、简单方便。

通常，网站要实现CDN加速和DDoS防护等功能，往往需要购买多个独立的产品，而EdgeOne却能够同时提供这两种功能，且效果优异。它的安全防护策略非常全面，从DDoS防护到Web应用防火墙（WAF），无论是防御流量攻击还是漏洞攻击，都能得到有效保障。

EdgeOne在提供高效保护的同时，价格也非常具竞争力，性价比极高，成为网站安全防护的理想选择。

