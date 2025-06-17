---
title: CentOS-7-Install-Jenkins
createTime: 2025/05/27 17:51:17
permalink: /article/hyj625gx/
---
# 2.安卓项目APK自动打包流程-安装jenkins

## Jenkins 简介

Jenkins是一个开源的、可扩展的持续集成、交付、部署（软件/代码的编译、打包、部署）的基于web界面的平台。允许持续集成和持续交付项目，无论用的是什么平台，可以处理任何类型的构建或持续集成。

软件开发的流程

```rust
编码 --> 构建 --> 集成 --> 测试 --> 交付 --> 部署
```

系统介绍

```
系统： centos7
IP地址： 192.168.1.8
```



## 安装java

```
# cd /data/software/
# wget http://js.funet8.com/centos_software/jdk-8u211-linux-x64.tar.gz

# mkdir /usr/local/java/
# tar -zxvf jdk-8u211-linux-x64.tar.gz -C /usr/local/java/

配置环境变量
# vim /etc/profile
添加：
export JAVA_HOME=/usr/local/java/jdk1.8.0_211
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH

# source /etc/profile

检查java是否安装成功
ln -s /usr/local/java/jdk1.8.0_171/bin/java /usr/bin/java
java -version
```



## 安装 Jenkins

### 下载安装

在这个地址下载 https://jenkins.io/zh/download/ , 如果下载的是 war 包, 直接运行以下命令

下载 Jenkins 的jenkins.war包

```
java -jar /data/software/jenkins.war
指定端口：
nohup java -jar /data/software/jenkins.war --ajp13Port=-1 --httpPort=9090 >/dev/null 2>&1 &
开启防火墙
iptables -I INPUT -p tcp --dport 9090 -j ACCEPT
service iptables save
systemctl restart iptables.service
```

在启动Web容器之前设置JENKINS_HOME环境变量

```
用root用户登录，编辑profile文件
vi /etc/profile
在最后加入
export JENKINS_HOME=/data/jenkins_data
保存，退出后执行
source /etc/profile
```



然后打开浏览器, 进入 localhost:9090 即可开始安装, Jenkins 的安装步骤也没啥难点.

http://192.168.1.8:9090/

![image-20210818102226185](http://imgoss.xgss.net/picgo/image-20210818102226185.png?aliyunoss)

下面就是 Jeknins 的界面了,

![image-20210818110842688](http://imgoss.xgss.net/picgo/image-20210818110842688.png?aliyunoss)

# 安装插件

进入菜单 **Manage Jenkins => Manage Plugins**, 这个地方就是管理插件的地方, 由于自带的源无法访问, 这里使用下面这个地址, 如果你在浏览器可以打开这个链接, 说明没问题, 否则请自行百度其他源地址

```ruby
http://mirror.esuni.jp/jenkins/updates/update-center.json
```



![image-20210818111853482](http://imgoss.xgss.net/picgo/image-20210818111853482.png?aliyunoss)

好了, 插件已经可以正常下载了, 以下是需要安装的插件

- Git plugin
- Localization: Chinese (Simplified)



# 设定Jenkins中文方法

1.进入Manage Jenkins中，点击Manage Plugins（插件设定）

![image-20210818111112037](http://imgoss.xgss.net/picgo/image-20210818111112037.png?aliyunoss)

2. 安装插件“Locale plugin”，虽然这个插件问题比较多，但是这个是Jenkins中唯一可以汉化的插件。

   ![image-20210818111259503](http://imgoss.xgss.net/picgo/image-20210818111259503.png?aliyunoss)



3. 安装中文汉化语言包插件（Localization: Chinese (Simplified)）。

   ![image-20210818111519806](http://imgoss.xgss.net/picgo/image-20210818111519806.png?aliyunoss)



# 配置 钉钉 构建通知

在钉钉群中, 进入 **群设置 >> 群机器人 >> 添加机器人 >> 添加自定义机器人 >> 配置** , 添加好后, 在机器人管理中选择添加的机器人, 保存在 webhook 中链接中的 access_token= 后的参数

进入 Jeknins, 在 **插件管理** 中搜索到 [Dingding JSON Pusher](https://links.jianshu.com/go?to=https%3A%2F%2Fplugins.jenkins.io%2Fdingding-json-pusher) 并安装, 安装完后打开项目配置, 在 **构建后操作** 一栏中, 增加构建后的步骤,

进入项目管理, 选择 **钉钉通知器配置** , 参考下图配置, 钉钉access token就填入我们申请的

![img](http://imgoss.xgss.net/picgo/825009-03a4f227d1d14322.png?aliyunoss)

好了, 每次构建时都将在 钉钉中收到通知了

![img](http://imgoss.xgss.net/picgo/825009-9fee83511195e437.png?aliyunoss)

## 新版钉钉通知

我的Jenkins版本是V2.204.1，需要安装的插件：

DingTalk Plugin

 在 系统管理 > 系统设置 > 钉钉配置 中添加机器人 

![image-20210818132241196](http://imgoss.xgss.net/picgo/image-20210818132241196.png?aliyunoss)

在项目中配置：

![image-20210818132339518](http://imgoss.xgss.net/picgo/image-20210818132339518.png?aliyunoss)

在钉钉群中有相关通知

![image-20210818132438299](http://imgoss.xgss.net/picgo/image-20210818132438299.png?aliyunoss)



## Jenkins整合dingding json pusher，发送自定义消息到钉钉群

1、下载钉钉，建群，添加机器人，获得access_token；
2、下载插件
主页面-系统管理-管理插件-可选插件 搜Dingding JSON Pusher Plugin
3、其他项目配置完成后，添加构建后操作，选择Dingding JSON Pusher
4、钉钉access token填入access_token，不是整个路径只是路径后的access_token的值,比如
https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxx,要填入的是xxxxxxxx；
5、Json文件路径，全路径，比如 /data/jenkins_data/workspace/android-test1/dingding.json
6、Json文件内容格式如下：
{ “msgtype”: “text”, “text”: {“content”: “在这填写自定义内容”}}





参考

https://blog.csdn.net/Ever69/article/details/84453896

使用Jenkins构建Android项目：https://www.jianshu.com/p/c9703b83ff4b