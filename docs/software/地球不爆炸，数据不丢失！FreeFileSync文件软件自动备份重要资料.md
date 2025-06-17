---
title: 地球不爆炸，数据不丢失！FreeFileSync文件软件自动备份重要资料
createTime: 2025/05/27 17:51:17
permalink: /article/awhq7oa4/
---
# 地球不爆炸，数据不丢失！FreeFileSync文件软件自动备份重要资料

由于工作的关系文件安全性和备份是很重要的，如果每天手动备份，显然就是不可行的。需要差异备份，我们也不可能时不时的删除之前的备份，重新复制一份吧，毕竟是动辄需要几个小时。

这时，一个时时同步的备份工具，就是非常重要的了。

本篇教程主要分两步，本文主要讲第一步。

**1.利用FreeFileSync将本地电脑文件同步到移动硬盘或者私有网盘。**

2.通过windows计划任务，每日定时备份文件。

## 一、免费、开源的FreeFileSync

这里介绍的是FreeFileSync，一款免费、开源的备份软件。

当然还有其他更多强大的类似软件，如付费的GoodSync和微软的SyncToy等等。

官网：https://freefilesync.org

![FreeFileSync.webp](https://imgoss.xgss.net/picgo/FreeFileSync.webp.jpg?aliyun)

## 二、下载安装

我们可以在官网 https://freefilesync.org/download.php 下载安装文件，如WINDOWS版本：Download FreeFileSync 10.5 Windows，正常安装即可。

中文界面、可选择免安装便捷版（更新：新版安装便捷版需要捐助，并不影响使用）

![FreeFileSync](https://imgoss.xgss.net/picgo/201810251642_65.png?aliyun)

## 三、快速入门

### 1、选择文件夹

在下图左侧窗口选择要备份的文件夹；在右侧窗口选择备份的目标文件夹；

![FreeFileSync](https://imgoss.xgss.net/picgo/201810251646_588.png?aliyun)

### 2、比较

点击“比较”按钮，我们可以看到原始文件夹中有一个01.txt文件；

![FreeFileSync](https://imgoss.xgss.net/picgo/201810251650_190.png?aliyun)

您也可以设置两个文件夹的比较方式设置（点击“比较”按钮右侧的设置图标）：

![FreeFileSync](https://imgoss.xgss.net/picgo/201810251651_550.png?aliyun)

### 3、同步

点击“同步”按钮，选择开始，就会将其中一个文件夹中的资料同步至另一个文件夹；

![FreeFileSync](https://imgoss.xgss.net/picgo/201810251653_9.png?aliyun)

还有一个非常重要的功能，可以**设置文件同步的方式**（“同步”按钮左侧的设置按钮）：

选择一个变化：**双向、镜像、更新、自定义**

至于其作用，就是看个人需要：比如是想增删原文件夹，目标文件夹相应更改，并且反过来同样适用；还是只需要单向同步，目标文件夹更改了，原文件夹不变？

![FreeFileSync](https://imgoss.xgss.net/picgo/201810251655_939.png?aliyun)

## 四、其他

所以，设置其实很简单，1、选择原文件和目标文件，2、点击同步，即可。

想要添加更多同步选项，再做相应的详细设置。



