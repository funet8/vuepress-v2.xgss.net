# 个人设备如何CPU挖矿？小白挖矿指南 

# 前言

前段时间比特币(BTC)又火了；虽然和我们关系不大，但是有人问我怎么“挖矿”、“挖币”；那么这边就来做一期教程了。
**注意：这边主要介绍CPU挖矿方法，且不推荐个人设备挖矿；个人用户可以用挖矿的方法，临时测试CPU算力**。
你可以在同等情况下，拿“挖矿”数据来测试你和你朋友电脑的CPU性能，或者发个朋友圈炫耀一下～

# XMR

因为现在比特币(BTC)基本个人设备是挖不到了，而且大型“矿厂”也基本使用专业GPU款机才有机会挖到，这边介绍难度比较小的XMR币。

## 设备推荐

首先，不推荐个人设备“挖矿”。如果是想尝鲜，发发朋友圈，可以试试。但是如果你有服务器就不一样了（反正电费和硬件使用费用已经在月租里了），你可以在运营商运行情况下，充分利用服务器资源。
推荐的服务器：

- 如果你24岁以下，推荐[学生轻量学生服务器](https://cloud.tencent.com/act/cps/redirect?redirect=10011&cps_key=825b2fa50ccba7d3668554b568acab71)
- 如果你不是24岁以下，建议买[2G内存以上版本轻量应用服务器](https://cloud.tencent.com/act/cps/redirect?redirect=1077&cps_key=825b2fa50ccba7d3668554b568acab71&from=console)

**2021.3：实测，腾讯云轻量应用服务器“挖矿”，可以“挖”回本。**

## 什么是XMR

XMR其实正规叫法是：门罗币 (Monero)。诞生比较晚（2014年）但是也是主流的加密货币。

## XMR挖矿方法

官方推荐的步骤：

1. 注册XMR钱包，获取钱包地址
2. 使用XMR项目提供的工具，进行交易和“挖矿”

# 注册XMR钱包，获取钱包地址

首先是XMR钱包的注册，方法很简单。根据自己的系统下载对应的客户端软件即可：

https://web.getmonero.org/zh-cn/downloads/#gui

![img](https://imgoss.xgss.net/picgo/downloadWallet.jpg?aliyun)

我这里下载Windows 64-bit (zip) 文件，解压

![image-20220130151731981](https://imgoss.xgss.net/picgo/image-20220130151731981.png?aliyun)

![image-20220130151824530](https://imgoss.xgss.net/picgo/image-20220130151824530.png?aliyun)

![image-20220130151848116](https://imgoss.xgss.net/picgo/image-20220130151848116.png?aliyun)

![image-20220130151908985](https://imgoss.xgss.net/picgo/image-20220130151908985.png?aliyun)

![image-20220130152133301](https://imgoss.xgss.net/picgo/image-20220130152133301.png?aliyun)

![image-20220130152241398](https://imgoss.xgss.net/picgo/image-20220130152241398.png?aliyun)

安装后，进行注册（不需要邮箱等信息）即可得到钱包地址：

![image-20220130152320541](https://imgoss.xgss.net/picgo/image-20220130152320541.png?aliyun)

复制钱包地址：

![image-20220130152948190](https://imgoss.xgss.net/picgo/image-20220130152948190.png?aliyun)

你的钱包地址应该类似于：

```
XXXXXXXrWi5vx5XsV9ts2PTYcPkc1111WakQmYJqTamoKm3YJLN5csGKyDJzQN......

```

之后，下载XMR项目提供的工具：[工具项目地址](https://github.com/xmrig/xmrig/releases)

根据型号和操作系统下载：

- CPU (x64/ARMv8)
- OpenCL for AMD GPUs.
- CUDA for NVIDIA GPUs via external CUDA plugin.

最后，选择一个”矿池“并填写自己的钱包信息开始“挖矿”；比如，“矿池”这边我推荐[猫池](https://c3pool.com/cn/)，https://c3pool.com/

# 使用猫池

第一步：点击登录--->注册

https://c3pool.com/

![image-20220130154813409](https://imgoss.xgss.net/picgo/image-20220130154813409.png?aliyun)

第二步：登录成功之后，点击箭头所至地方获取挖矿账户（子账户），复制子账户

![image-20220130154954267](https://imgoss.xgss.net/picgo/image-20220130154954267.png?aliyun)



绑定邮箱，谷歌验证码需要下载谷歌手机app软件： Google Authenticator

Google Authenticator（谷歌身份验证器Google Authenticator是谷歌推出的一款动态口令工具，解决大家各平台账户遭到恶意攻击的问题，一般在相关的服务平台登陆中除了用正常用户名和密码外，需要再输入一次谷歌认证器生成的动态口令才能验证成功，相当于输入二次密码，以达到账户的高安全性。例如交易所、金融平台、以及一些钱包等项目等等，都会使用谷歌身份验证器Google Authenticator来做二次认证。

IOS软件 https://apps.apple.com/cn/app/google-authenticator/id388497605

![image-20220130155223961](https://imgoss.xgss.net/picgo/image-20220130155223961.png?aliyun)

现在获取到了

1.xmr钱包地址： **46gus5dSa1U8rWi5vx5XsV9tsPTYcPkcWakQmYJqTamoKm3YJLN5csGKyDJzQN......**

2.获取到猫池的子账户名：

3.获取到猫池的邮箱。

# 实例:服务器挖矿

我们购买运营商的服务器（如：腾讯云服务器、阿里云服务器等）。一般都是不带显卡，但是CPU一直没有充分利用，所以拿来“挖矿”，充分跑一跑？

## 下载工具

XMR挖矿方法一样，而我的服务器都是使用x86架构，且使用的是Linux系统，“挖矿”选择x86版本Linux工具：

https://github.com/xmrig/xmrig/releases



[![选择x86 Linux版本](https://imgoss.xgss.net/picgo/Linuxx64.jpg?aliyun)](https://imagehost.mintimate.cn/post_miner/Linuxx64.jpg)

```
wget https://github.com/xmrig/xmrig/releases/download/v6.16.3/xmrig-6.16.3-linux-x64.tar.gz
```

下载并解压：

![image-20220130160308344](https://imgoss.xgss.net/picgo/image-20220130160308344.png?aliyun)

![image-20220130160452375](https://imgoss.xgss.net/picgo/image-20220130160452375.png?aliyun)

## 填写信息

```
"url": "auto.c3pool.org:19999",
"user": "你的门罗币地址",
"pass": "子账户:邮箱",
```

- url：“矿池”地址和端口，这边填写的是[猫池](https://c3pool.com/cn/)
- user：钱包地址，注意更改为自己的
- pass：“矿机”名称和邮箱，格式为：`矿机编号:邮件地址`。可以随意

![](https://imgoss.xgss.net/picgo/editConfig.png?aliyun)



## 开始挖矿

之后，我们双击主程序即可挖矿。大概1min即可看到自己电脑的算力：
![自己服务器算力](https://imgoss.xgss.net/picgo/serverSpeed.jpg?aliyun)

centos7运行脚本

```
#!/bin/bash

# 启动 xmrig
echo "start xmrig"
nohup ./xmrig >/dev/null 2>&1 &

# 关闭 xmrig
# echo "stop xmrig..."
# pkill xmrig 
```



大概3min后，你可以在猫池内输入钱包地址看到你的服务器数据：
![猫池上显示](https://imgoss.xgss.net/picgo/c3Speed.png?aliyun)



你可以按`ctril+c`退出挖矿程序：
[![停止挖矿](https://imgoss.xgss.net/picgo/serverStop.png?aliyun)](https://imagehost.mintimate.cn/post_miner/serverStop.png)



## 服务器推荐

另外，经过算力测试，腾讯云的服务器实测确实不错。尤其是轻量应用服务器，2核CPU算力可以达到1k+，**同等价位的Vultr、阿里云服务器的CPU算力均不能达到**。另外最近还有活动可以低价买服务器：

- [腾讯云服务器](https://y.xgss.net/tx)

- [学生轻量学生服务器(24岁免认证购买)](https://y.xgss.net/tx)

# 实例:Mac挖XMR

## 下载工具

和刚刚[XMR挖矿方法](https://www.mintimate.cn/2021/03/04/miner/#XMR挖矿方法)一样，Mac选择macOS版本的“挖矿”工具：

![选择macOS版本](https://imgoss.xgss.net/picgo/macOS.png?aliyun)

下载并解压：
![解压后](https://imgoss.xgss.net/picgo/unzipMacOS.png?aliyun)

## 开始挖矿

之后，在该目录下我们输入`./xmrig `即可开始“挖矿”。大概1min即可看到自己服务器的算力：
![自己电脑算力](https://imgoss.xgss.net/picgo/macSpeed.png?aliyun)

[自己电脑算力](https://imagehost.mintimate.cn/post_miner/macSpeed.png)


大概3min后，你可以在猫池内输入钱包地址看到你的电脑数据：


最后，个人电脑不适合挖矿。你可以按`ctril+c`退出挖矿程序：



##  编译工具 

和刚刚XMR挖矿方法差不多，但是目前官方并没有提供arm64或arm版本设备架构的工具。所以，我们需要用源码先编译工具。 参考：[官方ubuntu系统编译方法](https://xmrig.com/docs/miner/build/ubuntu) 登录树莓派后，先配置编译环境：

```
sudo apt-get install git build-essential cmake libuv1-dev libssl-dev libhwloc-dev
```

使用git下载源码：

```
git clone https://github.com/xmrig/xmrig.git
```

创建编译目录，并进入：

```
mkdir xmrig/build && cd xmrig/build
```

编译：

```
cmake ..
make -j$(nproc)
```

之后，编译出`xmrig`

![编译好后的文件](https://imgoss.xgss.net/picgo/buildArm64Version.png?aliyun)



## 填写信息

创建`config.json`这个文件，添加信息：

```
{
    "api": {
        "id": null,
        "worker-id": null
    },
    "http": {
        "enabled": false,
        "host": "127.0.0.1",
        "port": 0,
        "access-token": null,
        "restricted": true
    },
    "autosave": true,
    "background": false,
    "colors": true,
    "title": true,
    "randomx": {
        "init": -1,
        "init-avx2": -1,
        "mode": "auto",
        "1gb-pages": false,
        "rdmsr": true,
        "wrmsr": true,
        "cache_qos": false,
        "numa": true,
        "scratchpad_prefetch_mode": 1
    },
    "cpu": {
        "enabled": true,
        "huge-pages": true,
        "huge-pages-jit": false,
        "hw-aes": null,
        "priority": null,
        "memory-pool": false,
        "yield": true,
        "max-threads-hint": 100,
        "asm": true,
        "argon2-impl": null,
        "astrobwt-max-size": 550,
        "astrobwt-avx2": false,
        "cn/0": false,
        "cn-lite/0": false
    },
    "opencl": {
        "enabled": false,
        "cache": true,
        "loader": null,
        "platform": "AMD",
        "adl": true,
        "cn/0": false,
        "cn-lite/0": false
    },
    "cuda": {
        "enabled": false,
        "loader": null,
        "nvml": true,
        "cn/0": false,
        "cn-lite/0": false
    },
    "donate-level": 1,
    "donate-over-proxy": 1,
    "log-file": null,
    "pools": [
        {
            "algo": null,
            "coin": null,
            "url": "mine.c3pool.cn:15555",
            "user": "44c41NcLJRpYhmfDuWmPp8HXSkEFvVX1hPAX5PW2bLFNfDAtx1M1nVP6UBqvp9onGmb4FoKLuMSjyU8vYHjcSGoBA2eTr9G",
            "pass": "Mac:balabala@gmail.com",
            "rig-id": null,
            "nicehash": false,
            "keepalive": false,
            "enabled": true,
            "tls": false,
            "tls-fingerprint": null,
            "daemon": false,
            "socks5": null,
            "self-select": null,
            "submit-to-origin": false
        }
    ],
    "print-time": 60,
    "health-print-time": 60,
    "dmi": true,
    "retries": 5,
    "retry-pause": 5,
    "syslog": false,
    "tls": {
        "enabled": false,
        "protocols": null,
        "cert": null,
        "cert_key": null,
        "ciphers": null,
        "ciphersuites": null,
        "dhparam": null
    },
    "user-agent": null,
    "verbose": 0,
    "watch": true,
    "pause-on-battery": false,
    "pause-on-active": false
}
```

[![填写配置](https://imgoss.xgss.net/picgo/editConfig.png?aliyun)](https://imagehost.mintimate.cn/post_miner/editConfig.png)




其中：

- url：“矿池”地址和端口，这边填写的是[猫池](https://c3pool.com/cn/)
- user：钱包地址，注意更改为自己的
- pass：“矿机”名称和邮箱，格式为：`矿机编号:邮件地址`。可以随意

## 开始挖矿

之后，在`build`目录下，输入`./xmrig `即可开始“挖矿”。大概1min即可看到自己树莓派的算力：
[![自己树莓派算力](https://imgoss.xgss.net/picgo/raspberrySpeed.jpg?aliyun)](https://imagehost.mintimate.cn/post_miner/raspberrySpeed.jpg)



大概3min后，你可以在猫池内输入钱包地址看到你的电脑数据：

![猫池上显示](https://imgoss.xgss.net/picgo/c3Speed0.jpg?aliyun)



# Tips

个人设备，“挖矿”意义不大，拿来跑个分或者发个朋友圈就好。长时间的“挖矿”，因为CPU长时间高占用率，温度高。**不仅CPU容易坏，周围的组件也容易因为温度高而受损**。



# 猫池提现

![image-20220130163011539](https://imgoss.xgss.net/picgo/image-20220130163011539.png?aliyun)

## 添加付款账户

![image-20220130163122302](https://imgoss.xgss.net/picgo/image-20220130163122302.png?aliyun)

![image-20220130163151845](https://imgoss.xgss.net/picgo/image-20220130163151845.png?aliyun)

![image-20220130163202798](https://imgoss.xgss.net/picgo/image-20220130163202798.png?aliyun)

![image-20220130163218975](https://imgoss.xgss.net/picgo/image-20220130163218975.png?aliyun)