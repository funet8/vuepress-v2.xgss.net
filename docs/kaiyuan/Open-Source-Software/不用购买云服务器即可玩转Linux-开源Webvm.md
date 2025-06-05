# 免费获取Linux，无需购买服务器既可使用Linux系统的开源工具



# 前言

你还在为搭建Linux环境而烦恼吗？无论是学习Linux系统、开发测试应用，还是搭建个人服务器，都需要一台Linux主机。传统的方式是购买云服务器，但这种方式往往需要一定的费用，而且配置起来也比较麻烦。

本篇文章介绍一个无需购买服务器既可使用Linux的开源工具。

只需要你有一个github账号，域名（可有可无），即可获取linux

# WebVM



WebVM是一个基于Web技术的开源项目，它允许你在浏览器中直接运行一个完整的Linux系统。这意味着，你无需下载和安装任何软件，只需打开一个网页，就可以开始你的Linux之旅了。

WebVM基于CheerpX虚拟化引擎，提供了一个安全、沙盒的x86虚拟环境，可运行二进制文件、命令行工具、文本编辑器、编译C/C++程序等等。



开源地址： https://github.com/leaningtech/webvm

官网、演示网站： https://webvm.io/

![linux-webvm](https://imgoss.xgss.net/picgo/linux-webvm.jpg?aliyun)

# 应用场景

## 场景一：学习 Linux 命令

初学者学习 Linux，最重要的就是熟悉各种命令。WebVM 提供的 Linux 环境完全支持 Bash 命令行操作，你可以在这个环境中学习并执行各种命令，例如 ls、cat、grep 等常见操作。

## 场景二：开发与测试

对于开发者来说，有时需要在不同的平台上进行快速测试，而本地没有配置合适的环境。WebVM 提供的虚拟 Linux 环境可以帮助你进行简单的开发和测试。你可以编写和运行脚本、使用文本编辑器处理文件，甚至配置轻量级的开发环境。



# 部署方法



## 1.将Webvm 仓库fork到自己的仓库

进入： https://github.com/leaningtech/webvm 点击 fork叉过来。

![image-20241015174819012](https://imgoss.xgss.net/picgo/image-20241015174819012.png?aliyun)



![image-20241015174640520](https://imgoss.xgss.net/picgo/image-20241015174640520.png?aliyun)

## 2.设置setting

叉过来之后，在自己的仓库中，点击“setting”点击pages，选择Github Actions



![image-20241015175022067](https://imgoss.xgss.net/picgo/image-20241015175022067.png?aliyun)

![image-20241015174923501](https://imgoss.xgss.net/picgo/image-20241015174923501.png?aliyun)

### 设置域名（可选）

如果有自己的域名，可以设置，如果没有则为空

我这里设置自己的域名：  webwm.xgss.net

解析：  webwm.xgss.net解析 CNAME到 funet8.github.io（你的是其他的名字）

![image-20241015175207005](https://imgoss.xgss.net/picgo/image-20241015175207005.png?aliyun)

## 3.设置actions

点击actions，选择deploy，点击Run workflow。

稍等片刻，执行成功

![image-20241015175421387](https://imgoss.xgss.net/picgo/image-20241015175421387.png?aliyun)

![image-20241015175537894](https://imgoss.xgss.net/picgo/image-20241015175537894.png?aliyun)

## 4.访问webvm

我这里 访问：http://webvm.xgss.net/ 

![image-20241015175459138](https://imgoss.xgss.net/picgo/image-20241015175459138.png?aliyun)

刚开始https证书没有生效，导致会报错"This page is not in a secure context. Serve over HTTPS or WSS"

只需要等待https证书生效，大概1个小时内。

![image-20241015175628380](https://imgoss.xgss.net/picgo/image-20241015175628380.png?aliyun)

示例：

```
  Welcome to WebVM. If unsure, try these examples:

     python3 examples/python3/fibonacci.py 
     gcc -o helloworld examples/c/helloworld.c && ./helloworld
     objdump -d ./helloworld | less -M
     vim examples/c/helloworld.c
     curl --max-time 15 parrot.live  # requires networking

user@:~/$ 
user@:~/$ 
user@:~/$ 
user@:~/$ python3 examples/python3/fibonacci.py 
  0:   0
  1:   1
  2:   1
  3:   2
  4:   3
  5:   5
  6:   8
  7:  13
  8:  21
  9:  34
 10:  55
 ......
```



# 结束

开源 WebVM 为我们提供了一个免费的、高效率的 Linux 学习与实践平台。

缺点也有的，就是配置较低，由于大家都懂的原因，网络响应有时候比较慢，聊胜于无吧。

