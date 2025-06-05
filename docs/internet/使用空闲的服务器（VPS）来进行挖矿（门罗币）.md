# 使用空闲的服务器（VPS）来进行挖矿（门罗币XMR）

最近一台阿里云的服务器闲置了下来，正好有时间来研究下数字货币。这篇文章给大家介绍如何用服务器来挖门罗币。

#### 一、门罗币介绍

首先介绍下什么是门罗币，这里大概介绍下，具体的详细可以看[这里](https://www.xmr-zh.com/what.html)。

门罗币，英文为Monero，代号为XMR（本文以下都称门罗币为XMR），和比特币一样，是一种数字货币，不同的是比特币和Ethereum，都有透明的区块链，这意味着交易是公开可验证的，每一分钱都能追踪到去处， 并且可以被世界上任何人追踪。而XMR使用加密技术来屏蔽发送和接收地址以及交易金额，所以保密性很强。

目前门罗币XMR价格为¥669.58，截止时间：2020年 2月15日 星期六 21时24分26秒 CST。

门罗币相对来说挖矿的门槛比较低，并且CPU和GPU都可以用来挖矿。一般服务器或者VPS都没有显卡，所以只能用CPUI来挖矿，因此门罗币正好适合。

#### 二、申请门罗币钱包

挖矿之前要注册自己的门罗币钱包，这样挖矿挖到的门罗币才能达到自己的钱包里。

   打开 https://wallet.mymonero.com/ 网站申请一个门罗币钱包地址，这是门罗币官方的在线钱包，相对较安全。

![img](http://imgoss.xgss.net/picgo/tech-01-2048x1058.png?aliyunoss)

打开门罗币钱包地址，我用的是在线版钱包

![img](http://imgoss.xgss.net/picgo/tech-02-2048x1058.png?aliyunoss)点击申请新的钱包地址

![img](http://imgoss.xgss.net/picgo/tech-03-2048x832.png?aliyunoss)勾选“got it”

![img](http://imgoss.xgss.net/picgo/tech-04-2048x516.png?aliyunoss)记住这些汉字，下一步要用到

这里要注意，这些汉字就相当于密码，下次登陆钱包的时候就要用到这些汉字，建议将其保存到安全的地方。

点击完成，钱包就创建好了，记住自己的钱包地址。

![img](http://imgoss.xgss.net/picgo/截屏2020-02-15下午9.44.43.png?aliyunoss)钱包地址

#### 三、搭建挖矿软件

有了钱包地址，下一步在服务器上搭建挖矿软件。门罗币挖矿选择的xmrig软件，以下是在服务器上搭建挖矿服务的过程。

这里以Centos 7系统为例，其他系统可以在[这里](https://xmrig.com/docs/miner#build)查看构建方法。

1. 安装依赖项： `sudo yum install -y epel-release git make cmake gcc gcc-c++ libstdc++-static libuv-static hwloc-devel openssl-devel`
2. 从github克隆源代码： `git clone https://github.com/xmrig/xmrig.git`
3. 创建构建目录： `mkdir xmrig/build`

接下来开始构建：

```
cd xmrig/build
cmake ..
make -j$(nproc)
```

构建完成后，会生成可执行文件xmrig.

![img](http://imgoss.xgss.net/picgo/截屏2020-02-15下午9.57.49.png?aliyunoss)挖矿软件构建完成

#### 四、开始挖矿

挖矿前要选择矿池，在[这里](http://moneropools.com/)可以随便选一个矿池，我选择的是蚂蚁矿池：stratum+tcp://xmr.antpool.com:9005。之后在服务器上执行以下命令：

```
./xmrig --donate-level 1 -o stratum+tcp://xmr.antpool.com:9005 -u 45sVN1ZoYa8intmwob7P7YMFxkJHHoJcTSX8DLM7STtwLQzaR6DpyHQMHEvyUQHzJQDPe9U2bb9wiZWEiFtycsqPGgRZHqN -k -a rx/0
```

⚠️注意：上面的命令中，-o 参数后面是矿池地址，-u参数后面是门罗币的钱包地址，在输入时要注意替换。

执行完毕即可看到服务器挖矿成功。

![img](http://imgoss.xgss.net/picgo/IMG_7187-2048x1152.jpg?aliyunoss)挖矿软件搭建成功

#### 五、查看挖矿进度

打开[矿池](https://lab.antpool.com/)网页，输入钱包地址，就可以看到挖矿的进度。

![img](http://imgoss.xgss.net/picgo/截屏2020-02-15下午10.14.04-2048x1085.png?aliyunoss)挖矿进度

------

update:看下1核1G的云服务器挖一天一夜能挖多少。

先上图，正好挖矿24小时：

![img](http://imgoss.xgss.net/picgo/截屏2020-02-16下午7.07.44-2048x1198.png?aliyunoss)24小时服务器挖矿成果

答案：是1核的云服务器，挖门罗币（XMR），一天24小时可以挖0.00004989XMR。

**原创文章，转载请注明：** 转载自[科技爱好者博客](https://www.lxx1.com/)

**本文链接地址:** [使用空闲的服务器（VPS）来进行挖矿（门罗币XMR） (https://www.lxx1.com/3809)](https://www.lxx1.com/3809)