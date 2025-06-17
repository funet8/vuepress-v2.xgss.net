---
title: 群晖NAS基础设置
createTime: 2025/05/27 17:51:17
permalink: /article/h32607h8/
---
# 群晖NAS基础设置

最近一直在玩群晖NAS系统，有一些基础的配置跟大家分享一下

# 开启ssh登录

## 1.开启方法

控制面板--->终端和SNMP--->终端机

![image-20231120175821575](https://imgoss.xgss.net/picgo/image-20231120175821575.png?aliyun)

## 2.使用ssh软件登录

这里我用SecureCRT登录

![image-20231120175952049](https://imgoss.xgss.net/picgo/image-20231120175952049.png?aliyun)

进入ssh

![image-20231120180053953](https://imgoss.xgss.net/picgo/image-20231120180053953.png?aliyun)

## 3.进入root用户

```
star@star-nas:~$ sudo su -l root
Password: 
root@star-nas:~# whoami
root
```



## 4.配置免密码sudo

用star用户每次使用sudo都需要输入密码，比较麻烦，可以做以下操作

在root用户下操作

```
chmod u+w /etc/sudoers
vim /etc/sudoers
"root ALL=(ALL) ALL"在起下面添加"xxx ALL=(ALL) NOPASSWD:ALL"(这里的xxx是你的用户名)，然后保存退出
例如添加： 
star ALL=(ALL) NOPASSWD:ALL
chmod u-w /etc/sudoers
```



### 测试

```
star@star-nas:~$ sudo -i
root@star-nas:~# 
```

不用输入密码即可sudo进入root用户。

# 启用通知

## 设置qq邮箱

开启接收系统通知，在发生特定事件时可以通过邮件、短信、移动设备或Web浏览器接收通知。例如：存储空间不足或备份任务失败，可以及时收到通知，并快速采取相应措施。

![image-20231123153536002](https://imgoss.xgss.net/picgo/image-20231123153536002.png?aliyun)

使用qq邮箱报错：

测试邮件无法发送。请检查设置并再试一次。

```
535 Login Fail. Please enter your authorization code to login. More information in http://service.mail.qq.com/cgi-bin/help?subtype=1&&id=28&&no=1001256
```

解决办法： 密码不要输入qq密码，而要输入POP3/SMTP服务密码。

## 设置通知规则

![image-20231123154037369](https://imgoss.xgss.net/picgo/image-20231123154037369.png?aliyun)

## 收到测试邮箱

![image-20231123153905931](https://imgoss.xgss.net/picgo/image-20231123153905931.png?aliyun)

# 群晖docker加速

![image-20231123194338575](https://imgoss.xgss.net/picgo/image-20231123194338575.png?aliyun)

群晖docker——注册表——设置——选中Docker Hub——编辑——启用注册表镜像——在里面填写国内加速镜像地址：https://hub-mirror.c.163.com/，然后重启docker

使用国内镜像加速，似乎问题并没有解决

通过SSH docker pull拉取镜像

```
# docker pull mysql
```

![image-20231124093524883](https://imgoss.xgss.net/picgo/image-20231124093524883.png?aliyun)

# 使用RaiDrive挂载到本地硬盘

1.在套件中心，搜索 webDAV开启 http和https

![image-20231129173218132](https://imgoss.xgss.net/picgo/image-20231129173218132.png?aliyun)

2.在RaiDrive配置中如图配置

![image-20231129173252672](https://imgoss.xgss.net/picgo/image-20231129173252672.png?aliyun)

成功连接

![image-20231129173442044](https://imgoss.xgss.net/picgo/image-20231129173442044.png?aliyun)

# 运行安全顾问

通过【安全顾问】，可以扫描NAS系统、帐户、网络等安全情况，并且通过扫描结果，安全顾问还会提供建议的操作。例如，是否不小心打开SSH服务，是否发生任何异常登录活动等。
无论是企业还是个人，都建议设置定期扫描计划。而针对企业环境，还可以根据需求来勾选更多的检查项目。

![img](https://imgoss.xgss.net/picgo/微信图片_20230809234438-800x460.png?aliyun)

# 系统设置备份

定时手动导出或者自动导出 dss备份文件，防止系统备份或者还原导致数据丢失。

![image-20231123155507241](https://imgoss.xgss.net/picgo2025/image-20231123155507241.png?aliyun)



# IP自动封锁

网络攻击最基本的就是恶意登录，在密码强度低的情况下，很有可能会被恶意攻破密码。所以通过设定登录次数和时间限制，来封锁恶意尝试登录的IP。同时还可以导入IP黑白名单，来规范访问。



![img](https://imgoss.xgss.net/picgo/微信图片_20230809234438_1-800x425.png?aliyun)



# 启用帐户保护

除了设置IP黑白名单，还可以选择依据客户端来设置帐户保护，添加信任或是屏蔽不受信任的客户端。



![img](https://imgoss.xgss.net/picgo/微信图片_20230809234438_2-800x425.png?aliyun)

# 自定义防火墙规则

通过启用防火墙，根据自定义规则在被保护的内网和外网间构建保护屏障。

![img](https://imgoss.xgss.net/picgo/微信图片_20230809234439_1-800x427.png?aliyun)

防火墙是一个虚拟屏障，通过自定义规则可以防止未授权的登录和控制服务访问。用户可以决定是否允许或拒绝通过特定IP地址访问特定的网络端口。例如：允许从特定的办公室进行远程访问，或是只允许访问特定的服务或协议。

# 将http连接重定向到https

如果开启，则会 `http://IP:5000/` 会自动跳转到 `https://IP:5001/` ，谨慎选择。

![image-20240702193200012](https://imgoss.xgss.net/picgo/image-20240702193200012.png?aliyun)



部分参考：https://www.suncan.com.cn/archives/9779

