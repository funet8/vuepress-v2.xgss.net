# Docker安装青龙面板每天自动获取某东豆

首先说一下获取jing东豆（以下简称豆子）的几种方式，也是基本打卡等软件的方式

## 一、手动获取豆子

最简单、原始的方法

## 二、路由器签到领豆子

此方法适用于路由器刷机openwrt系统之后，安装jing东签到插件，每天定时签到。

插件能运行一个脚本，一般都是这个多合一签到的脚本，签到内容及目录众多，比手动签到省时省力。



## 三、更高级的面板管理脚本

可以安装青龙面板、elecV2P、面板签到等软件。

青龙GitHub地址： https://github.com/whyour/qinglong

优点：活动众多，获取jing豆较多。可以按照自己的方式设定，完全满足私人定制。

缺点：安装面板前需要有服务器安装docker，或者能安装docker都可以。再安装面板，之后还需要拉取jing东签到的各种脚本，对脚本做稍微修改。过程较为繁琐，没有一键搞定的功能。

![docker-qinglong](http://imgoss.xgss.net/picgo/docker-qinglong.jpg?aliyunoss)

# 系统说明

青龙面板可以做什么？
1.自动做活动，比如东东工厂、农场、京喜工厂、京喜农场，jing东到家农场等等，可以免费领一些东西，挺实惠的
2.会自动领jing东，现在的话一般是一天一二百，不算开卡，要是新号没有开过卡，可以一次领好几千。
3.自动做各种限时任务，领红包，免得自己做

搭建需要Linux系统的服务器，我用的是**CentOS 7.9，内网IP： 192.168.1.9**

当然可以使用Windows系统或者 虚拟机或者nas，只要能安装docker

先上手机截图

<img src="http://imgoss.xgss.net/picgo/b6d1f2f000f7bcf56281fbb9e1d599a.jpg?aliyunoss" alt="b6d1f2f000f7bcf56281fbb9e1d599a" style="zoom:50%;" />

# 安装青龙面板

## 大致步骤

1.电脑安装VMware虚拟机ceonts7系统或者购买云服务器 ceontos7

2.安装docker软件

3.启动镜像青龙实例

4.登录青龙后台，查看实际密码

5.利用chrome获取jing东的cookie，填写cookie到环境变量中

6.新建任务

7.验证是否成功。

![image-20210930164103528](http://imgoss.xgss.net/picgo/image-20210930164103528.png?aliyunoss)

## 1.使用ssh工具连接服务器

略

## 2.安装docker

略

## 3.拉取并且运行青龙面板镜像

```
# docker run -dit \
  --name QingLong \
  --hostname QingLong \
  --restart always \
  -p 5700:5700 \
  -v /data/docker/QingLong/config:/ql/config \
  -v /data/docker/QingLong/log:/ql/log \
  -v /data/docker/QingLong/db:/ql/db \
  -v /data/docker/QingLong/scripts:/ql/scripts \
  -v /data/docker/QingLong/jbot:/ql/jbot \
  whyour/qinglong:latest
```
http://192.168.1.5:5700/login

用户名为 admin 

密码是 adminadmin

重置密码
登录成功后，在/data/docker/QingLong/config 中找到auth.json
```
# cat /data/docker/QingLong/config/auth.json
{"username":"admin","password":"9zpGGqsUqmRI-XXXXXX","retries":1,"lastlogon":1632708794695,"lastip":" 113.90.39.224","lastaddr":" 广东省深圳市 | 电信","platform":"desktop"}
```
登录

# 使用青龙面板

一、添加库：进入面板-右上角“定时任务”-分别填入相关信息。提供个人设置，给大家参考。其中人物名、任务定时可自定义。

二、运行库任务添加脚本：分别点击每个库的运行按钮，稍等一下。然后刷新页面，就能看到库的脚本了。

说明

更新一个整库脚本 ql repo

更新单个脚本文件 ql raw

示例

```
【Faker集合仓库】
ql repo https://ghproxy.com/https://github.com/shufflewzc/faker2.git "jd_|jx_|jddj_|getJDCookie" "activity|backUp" "^jd[^_]|USER|ZooFaker_Necklace|JDJRValidator_Pure"   9 1-23/4 * * *

柠檬（胖虎）代维护lxk0301仓库  ql repo https://github.com/panghu999/jd_scripts.git "jd_|jx_|getJDCookie" "activity|backUp|Coupon|jd_try|format_" "^jd[^_]|USER"  12 1-23/4 * * *

柠檬（胖虎）仓库  ql repo https://github.com/panghu999/panghu.git "jd_"  4 1-23/4 * * *

青蛙蛤蟆 ql repo https://github.com/smiek2221/scripts.git "jd_" "" "JDJRValidator_Pure.js|sign_graphics_validate.js"

龙珠仓库  ql repo https://github.com/longzhuzhu/nianyu.git "qx" “main”  1 1-23/4 * * *

moposmall仓库  ql repo https://github.com/moposmall/Script.git "jx_mc|cfd.js"  2 1-23/4 * * *

混沌仓库  ql repo https://github.com/whyour/hundun.git "quanx" "tokens|caiyun|didi|donate|fold|Env|.py"  3 1-23/4 * * *

Ariszy（Zhiyi-N）仓库  ql repo https://github.com/Ariszy/Private-Script.git "JD"  5 1-23/4 * * *

jiulan仓库  ql repo https://github.com/jiulan/platypus.git  6 1-23/4 * * *

JDHelloWorld仓库  ql repo https://github.com/JDHelloWorld/jd_scripts.git "jd_|jx_|getJDCookie" "activity|backUp|Coupon|enen|update" "^jd[^_]|USER"  7 1-23/4 * * *

passerby-b 仓库  ql repo https://github.com/passerby-b/JDDJ.git "jddj_" "scf_test_event|jddj_fruit_code.js|jddj_getck.js|jd_|jddj_cookie"  8 1-23/4 * * *

zcy01仓库  ql repo https://github.com/ZCY01/daily_scripts.git "jd_"  9 1-23/4 * * *

shufflewzc 仓库 ql repo https://github.com/shufflewzc/faker2.git "jd_|jx_|getJDCookie" "activity|backUp|Coupon|update" "^jd[^_]|USER" 10 1-23/4 * * *

he1pu互助仓库  ql repo https://github.com/he1pu/JDHelp.git "jd_|jx_|getJDCookie" "activity|backUp|Coupon|update" "^jd[^_]|USER" 11 1-23/4 * * *

curtinlv仓库  ql repo https://github.com/curtinlv/JD-Script.git  13 1-23/4 * * *

cdle仓库  ql repo https://github.com/cdle/jd_study.git "jd_"  14 1-23/4 * * *
```



青龙相关仓库集锦： https://github.com/Oreomeow/VIP/tree/main/Tasks/qlrepo

本人就测试第一个地址

![image-20210930165126965](http://imgoss.xgss.net/picgo/image-20210930165126965.png?aliyunoss)

运行就会执行，就会在任务栏中有很多任务，刷新页面。

# 仓库失效

咱们为了防止漏掉某些羊毛，**下方所有的库**新建定时任务拉取，里面有重复脚本禁用脚本，重复的内容会被禁用的。

### 京东定时任务库

GitHub 上的一些任务库，通过添加任务，并设置定时规则，使其自动拉取、更新羊毛任务。

这个库是不是会更新，如果你有所需要，可以**评论留言**，将会接收到**邮件提醒**。

**2022.10.24**：对所有库进行检查排序，前3个建议拉库使用。

### **KingRan/KR（集合库）**

```
ql repo https://github.com/KingRan/KR.git "jd_|jx_|jdCookie" "activity|backUp" "^jd[^_]|USER|utils|function|sign|sendNotify|ql|JDJR"
```

### **6dylan6/jdpro（集合库）**

任务定时建议`50 7-23/2 * * *`

```
ql repo https://github.com/6dylan6/jdpro.git "jd_|jx_|jddj_" "backUp" "^jd[^_]|USER|JD|function|sendNotify"
```



**国内服务器请使用以下命令：**

```
ql repo https://js.dayplus.xyz/https://github.com/6dylan6/jdpro.git "jd_|jx_|jddj_" "backUp" "^jd[^_]|USER|JD|function|sendNotify"
```



上述方式还不行的话，可以考虑使用 gitee 版本，更新相比 GitHub 可能会稍慢点。

```
ql repo https://gitee.com/dylanote/jdpro.git "jd_|jx_|jddj_" "backUp" "^jd[^_]|USER|JD|function|sendNotify"

50 7-23/2 * * *
```

### **gys619/Absinthe（集合库）**

```
ql repo https://github.com/gys619/Absinthe.git "jd_|jx_|jddj_|gua_|getJDCookie|wskey" "activity|backUp" "^jd[^_]|USER|utils|ZooFaker_Necklace|JDJRValidator_|sign_graphics_validate|jddj_cookie|function|ql|magic|JDJR|JD" "main"
```

### **smiek2121（开卡库）**

```
ql repo ql repo https://github.com/smiek2121/scripts.git "jd_|gua_" "" "ZooFaker_Necklace.js|JDJRValidator_Pure.js|sign_graphics_validate.js|cleancart_activity.js|jdCookie.js|sendNotify.js"
```

**Yun-City/City（集合库）**

```
ql repo https://github.com/Yun-City/City.git "jd_|jx_|gua_|jddj_|getJDCookie" "activity|backUp" "^jd[^_]|USER|function|utils|sendnotify|ZooFaker_Necklace|jd_Cookie|JDJRValidator_|sign_graphics_validate|ql|magic|cleancart_activity"
```

### **zero205/JD_tencent_scf**

```
ql repo https://github.com/zero205/JD_tencent_scf.git "jd_|jx_|jdCookie" "backUp|icon" "^jd[^_]|USER|sendNotify|sign_graphics_validate|JDJR|JDSign|ql" "main"
```



# 获取京东cookie



[利用谷歌浏览器获取京东Cookie抓取教程](https://g.xgss.net/internet/jd_cookie.html)，https://g.xgss.net/internet/jd_cookie.html，cookie值千万不能泄露，如图，环境变量--->添加变量

![image-20210930170920577](http://imgoss.xgss.net/picgo/image-20210930170920577.png?aliyunoss)

再看任务的日志是否执行成功。

![image-20210930171033123](http://imgoss.xgss.net/picgo/image-20210930171033123.png?aliyunoss)

某个任务成功，看手机app上的一些豆子获取的记录。

# 其他功能

## 钉钉登录通知

钉钉群里获取token值。

配置： 系统设置---> 通知设置，配置token，保存。

![image-20210930164513132](http://imgoss.xgss.net/picgo/image-20210930164513132.png?aliyunoss)

钉钉通知：

![image-20210930164643294](http://imgoss.xgss.net/picgo/image-20210930164643294.png?aliyunoss)