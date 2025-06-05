# 群晖NAS系统下安装Windows、Linux等虚拟机

# 需求

需要安装一个Windows虚拟机进入此虚拟机，在虚拟机中做一些操作，比如修改局域网中的路由器路由器，如果7x24小时开一台台式机，一直开机不仅耗电量大，而且也不稳定，刚好局域网里有一个群晖NAS，那么记录一下在群晖NAS中如何安装Windows、Linux等虚拟机。



# 安装

在套件中心搜索【Virtual Machine Manager】，点击安装，安装完成之后



![image-20240701182545515](https://imgoss.xgss.net/picgo/image-20240701182545515.png?aliyun)



![image-20240701182628535](https://imgoss.xgss.net/picgo/image-20240701182628535.png?aliyun)



# 新建虚拟机

## 1.新增虚拟机

打开Virtual Machine Manager，点击“新增”

![image-20240701182828624](https://imgoss.xgss.net/picgo/image-20240701182828624.png?aliyun)



## 2.创建虚拟机

填写名称，CPU，内存等信息。

![image-20240701183103814](https://imgoss.xgss.net/picgo/image-20240701183103814.png?aliyun)

## 3.存储空间

根据自己的需要填写存储空间

![image-20240701183203398](https://imgoss.xgss.net/picgo/image-20240701183203398.png?aliyun)

## 4.配置网络

![image-20240701183321070](https://imgoss.xgss.net/picgo/image-20240701183321070.png?aliyun)

## 5.其他设置

下载 Synology Guest Tool

![image-20240701183344799](https://imgoss.xgss.net/picgo/image-20240701183344799.png?aliyun)

## 6.设置镜像

设置镜像，把镜像上传到nas中，浏览选择

![image-20240701190121991](https://imgoss.xgss.net/picgo/image-20240701190121991.png?aliyun)



## 7.分配电源管理权限

![image-20240701190232926](https://imgoss.xgss.net/picgo/image-20240701190232926.png?aliyun)



## 8.摘要

![image-20240701190302766](https://imgoss.xgss.net/picgo/image-20240701190302766.png?aliyun)



# 创建失败

![image-20240701191806458](https://imgoss.xgss.net/picgo/image-20240701191806458.png?aliyun)

CPU虚拟化要打开

```
群晖命令行， 查看CPU虚拟化是否开启
cat /proc/cpuinfo | grep -E "vmx|svm"
```

如果什么内容都没有显示，说明虚拟化没有开，开机进入BIOS开启虚拟化。



## 连接虚拟机

![image-20240701193000487](https://imgoss.xgss.net/picgo2025/image-20240701193000487.png?aliyun)

在浏览器中打开虚拟机

![image-20240701194308872](https://imgoss.xgss.net/picgo/image-20240701194308872.png?aliyun)



安装Windows系统

![image-20240701202232253](https://imgoss.xgss.net/picgo/image-20240701202232253.png?aliyun)



# 系统安装完成

## 1.Windows开启远程

Win10开启远程桌面可以通过运行“sysdm.cpl”命令以打开系统属性，然后再开启远程桌面，操作步骤如下：

步骤1. 按“Win + R”键，然后输入“sysdm.cpl”并按下回车键打开系统属性。

![img](https://imgoss.xgss.net/picgo/turn-off-remote-assistance01.png?aliyun)

步骤2. 单击“远程”选项卡，在远程桌面中勾选“允许远程连接到此计算机”就可以开启远程桌面。

![img](https://imgoss.xgss.net/picgo/remote-desktop02.png?aliyun)



## 2.快照

拍快照，这步建议必须做，免得把系统搞崩溃要重装系统，拍摄快照之后如果系统搞坏了，直接恢复快照，简单省事！

![image-20240702091122385](https://imgoss.xgss.net/picgo/image-20240702091122385.png?aliyun)

![image-20240702090842691](https://imgoss.xgss.net/picgo/image-20240702090842691.png?aliyun)

在群晖NAS系统下安装Windows虚拟机就介绍完了，同理也可以安装linux系统，例如创建 Debian、Ubuntu、Fedora 等 Linux 虚拟机。

