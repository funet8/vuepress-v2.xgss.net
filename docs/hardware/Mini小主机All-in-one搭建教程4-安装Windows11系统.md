---
title: Mini小主机All-in-one搭建教程4-安装Windows11系统
createTime: 2025/05/27 17:51:17
permalink: /article/t93h2yuc/
---
# Mini小主机All-in-one搭建教程4-安装Windows11系统



# 硬件介绍

在狗东买的 [极摩客M2](https://u.jd.com/Pq3ObYl) 到手价是2799元

具体配置如下： 酷睿英特尔11代标压i7 11390H  64G+1TB固态。

以下是 安装Windows11系统的教程。

![allinone04](https://imgoss.xgss.net/picgo/allinone04.jpg?aliyun)

# 安装Windows11系统

## 下载镜像包

首先下Windows系统的懒人镜像包，解压后直接导入即可，使用非常方便，无需进行复杂的参数配置。链接：https://pan.baidu.com/s/15Z00suxmWmjrwzUKuOzkGQ?pwd=pjoa 提取码：pjoa

![img](https://imgoss.xgss.net/picgo/e698895c617748d18381ee2fe6b10f07.png?aliyun)



## 创建虚拟机

打开Esxi虚拟机的管理界面，点击“创建/注册虚拟机”，选择“从VOF或OVA文件部署虚拟机”，点击“下一页”

![img](https://imgoss.xgss.net/picgo/d200e9ec7ca4485f8a68770d6182a76c.png?aliyun)



名称可以随意输入，然后导入解压的懒人包文件，点击下一页

![img](https://imgoss.xgss.net/picgo/d2ca9be8cdee44cb9ec51b4dd927915e.png?aliyun)



选择存储的分区，点击下一页 

![img](https://imgoss.xgss.net/picgo/862dfe728fff4c1a9e15b25dc712ef6e.png?aliyun)



继续点击下一页

![img](https://imgoss.xgss.net/picgo/3c4fe8beb455425397dbc5018962a7f1.png?aliyun)

提示缺少磁盘映像，不用管他，继续点击完成

![img](https://imgoss.xgss.net/picgo/6c1b638443b0414282a0d433bc7d4262.png?aliyun)



## 导入完成

导入完成后，系统会自己启动，首次开机比较慢耐心等待部署完成即可使用

![img](https://imgoss.xgss.net/picgo/116c61928c8c41058717a8153a140ebb.png?aliyun)

![img](https://imgoss.xgss.net/picgo/72153e9ed1aa4d7a975332eec9941fb2.png?aliyun)

 

到这里，ESXi All in one的三个系统都已经全部安装完成了，软路由+群晖NAS+win11系统，日常待机CPU占用极低，整机的功率在15-20w左右，非常低根本不用考虑电费问题，

我感觉可以在装个Linux和网心云系统跑跑赚赚电费也是完全可以的，后面在慢慢折腾吧。

后面再来安装Linux和苹果MacOS系统，安卓系统。