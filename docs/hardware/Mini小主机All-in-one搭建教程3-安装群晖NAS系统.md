---
title: Mini小主机All-in-one搭建教程3-安装群晖NAS系统
createTime: 2025/05/27 17:51:17
permalink: /article/avj3tktv/
---
# Mini小主机All-in-one搭建教程3-安装群晖NAS系统



# 硬件介绍

在狗东买的 [极摩客M2](https://u.jd.com/Pq3ObYl) 到手价是2799元

具体配置如下： 酷睿英特尔11代标压i7 11390H  64G+1TB固态。

以下是 安装群晖NAS系统的教程。

![allinone03](https://imgoss.xgss.net/picgo/allinone03.jpg?aliyun)

# 群晖nas到底可以做什么？

群晖nas可以做的有数据共享、数据备份、外网访问、用户权限、数据安全、视频监控、照片归档、影音娱乐。

1、数据共享：公司多部门数据共享使用。

2、数据备份：备份数据，多一分安心。

3、外网访问：手机电脑都可以在外网随时随地使用。

4、用户权限：数据可共享，数据可私密。可设置每个账户对不同资料的访问权限。

5、数据安全：专业而且严谨的存储技术，数据更安全。

6、视频监控：随时随地查看你的监控视频。

7、照片归档：通过Moments可以将您照片分门别类归档。

8、影音娱乐：随时下载听音乐看电影。

## chatgpt回答

![image-20231012162205426](https://imgoss.xgss.net/picgo/image-20231012162205426.png?aliyun)

# 安装群晖NAS系统

## 下载镜像包

首先下载群晖的懒人镜像包，解压后直接导入，添加一块系统盘即可，使用非常方便，无需进行复杂的参数配置。链接：https://pan.baidu.com/s/1VCBo5atfVO5mlcEcDkMlLA?pwd=oxtf 提取码：oxtf 

![img](https://imgoss.xgss.net/picgo/92615673e6b4458fb1b4f6e9c452fbe7.png?aliyun)



## 创建虚拟机

打开Esxi虚拟机的管理界面，点击“创建/注册虚拟机”，选择“从VOF或OVA文件部署虚拟机”，点击“下一页”

![img](https://imgoss.xgss.net/picgo/afbd2db3829d47bebc85871ca6322cb1.png?aliyun)



名称可以随意输入，然后导入解压的懒人包文件，点击下一页

![image-20230914170442590](https://imgoss.xgss.net/picgo/image-20230914170442590.png?aliyun)



选择默认的存储空间，继续下一步

![img](https://imgoss.xgss.net/picgo/f8845084f785401b9d42a7ac4f7f4598.png?aliyun)



因为一会需要添加一块硬盘所以，取消勾选自动打开电源选项，然后点击下一页

![img](https://imgoss.xgss.net/picgo/5d00168b04de46f58b7b8f3eb07cce99.png?aliyun)



提示缺少磁盘映像，不用管他，继续点击完成

![img](https://imgoss.xgss.net/picgo/dced7f55ec814f0c80f88ede19354e03.png?aliyun)



## 编辑虚拟机

右键刚才导入的虚拟机，点击编辑设置

![img](https://imgoss.xgss.net/picgo/ae414d45eeaf4114be77a2331c0a6e76.png?aliyun)



点击左上角，添加硬盘，增加一块数据盘，用来存放系统使用

![img](https://imgoss.xgss.net/picgo/093b7610b5684f95a23c3d1031d6b76b.png?aliyun)



可以根据自己的需求自行设置硬盘的大小

![img](https://imgoss.xgss.net/picgo/fd0072d0b63b4959bd0752b89fc95742.png?aliyun)



## 配置网络

网络适配器的适配器类型这里修改成E1000e，设置完成后点击保存。

![img](https://imgoss.xgss.net/picgo/81c22e565f8f47e79116957e3c82650e.png?aliyun)



接下来还有一个重要的地方需要设置，点击网络-编辑设置

![img](https://imgoss.xgss.net/picgo/cfb13890ddb14343a514d3821e7567cf.png?aliyun)

安全这里都设置成接受，不然无法搜索到设备，设置完成后保存

![img](https://imgoss.xgss.net/picgo/1ac8aeadf23b405284f991ba37cd3f82.png?aliyun)



点击虚拟机交换机-编辑设置，安全也都全部设置为接受状态

![img](https://imgoss.xgss.net/picgo/3ba193e0bd584f6aa47b47015b3c3a74.png?aliyun)

![img](https://imgoss.xgss.net/picgo/eecf868ec6ef47ffaa2fda437aa7c29e.png?aliyun)



上面的步骤都设置好后，点击打开电源，出现如下的Dos界面，就说明已经启动完成了。

![img](https://imgoss.xgss.net/picgo2025/29d20c4970004cc79d3749e1ca91ce2a.png?aliyun)





打开Synology Assistant群晖助手软件，搜索设备，右键联机进行安装系统

http://soft.onlinedown.net/soft/10008842.htm

 ![img](https://imgoss.xgss.net/picgo/0a7b9051b0db4981ad847c57acd811b8.png?aliyun)

![img](https://imgoss.xgss.net/picgo/b8c11fadb03f4a29ba75c776a3d41b79.png?aliyun)

选择群晖的系统文件，点击下一步

![img](https://imgoss.xgss.net/picgo/c8b1eef06806418a9d9e0e728012fad2.png?aliyun)



勾选了解删除，然后点击继续

![img](https://imgoss.xgss.net/picgo/a4bcfede2297443bbd2c4dcbd2eca011.png?aliyun)

耐心等待安装完成，安装完成后，会自动进行重启

![img](https://imgoss.xgss.net/picgo/00098a79263b421f808f2669cdd5b58c.png?aliyun)

![img](https://imgoss.xgss.net/picgo/084362d1b4684b6fb835d8c6bcd946a7.png?aliyun)



安装完成后，简单设置下用户名和密码即可使用

 ![img](https://imgoss.xgss.net/picgo/ac45ab019bb64144aa0e2a1bb79a4fc4.png?aliyun)

![img](https://imgoss.xgss.net/picgo/78ab8570825e49bebe8a1ff7eedbf181.png?aliyun)

![img](https://imgoss.xgss.net/picgo/f7b5f88756614b98a2e9bce015e17636.png?aliyun)

到这里，ESxi安装群晖的步骤已经全部完成了，是不是非常简单呢。

下一篇文章我们继续安装Windows11