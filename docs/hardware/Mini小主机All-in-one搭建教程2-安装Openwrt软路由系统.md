# Mini小主机All-in-one搭建教程2-安装Openwrt软路由系统



# 硬件介绍

在狗东买的 [极摩客M2](https://u.jd.com/Pq3ObYl) 到手价是2799元

具体配置如下： 酷睿英特尔11代标压ai7 11390H  64G+1TB固态。

以下是安装Openwrt软路由系统的教程。

# 安装Openwrt软路由系统

![allinone02](https://imgoss.xgss.net/picgo/allinone02.jpg?aliyun)



## 下载镜像包

首先下载软路由的懒人镜像包，解压后直接导入即可，使用非常方便，无需进行复杂的参数配置。

链接：https://pan.baidu.com/s/1ke3GHDvO5OmqGXJliNjtUQ?pwd=scqu

提取码：scqu

![img](https://imgoss.xgss.net/picgo/b600236e9b384f9983194d3546e23592.png?aliyun)

## 导入虚拟机

打开Esxi虚拟机的管理界面，点击“创建/注册虚拟机”，选择“从VOF或OVA文件部署虚拟机”，点击“下一页”

![image-20230914165158012](https://imgoss.xgss.net/picgo/image-20230914165158012.png?aliyun)



## 输入名称下一页

名称可以随意输入，然后导入解压的懒人包文件，点击下一页

![image-20230914165214454](https://imgoss.xgss.net/picgo/image-20230914165214454.png?aliyun)

选择默认的存储位置，继续下一页 

![image-20230914165247821](https://imgoss.xgss.net/picgo/image-20230914165247821.png?aliyun)



然后继续下一页

![image-20230914165304738](https://imgoss.xgss.net/picgo/image-20230914165304738.png?aliyun)

这里提示缺少磁盘映像，无需理会，点击完成

![img](https://imgoss.xgss.net/picgo/db3d0b26646a4551a7e8fbefa9788c66.png?aliyun)



导入完成后，它会自己启动，到这里说明已经导入成功了，正在启动

![img](https://imgoss.xgss.net/picgo/db3d0b26646a4551a7e8fbefa9788c66.png?aliyun)

## 修改Openwrt的ip地址

接下来我们设置一下Openwrt旁路由的ip地址，按下回车键，输入命令，

vi etc/config/network

![img](https://imgoss.xgss.net/picgo/847ebe32de1e4bf2a6335f69c7190790.png?aliyun)



找到option ipaddr一栏，按下i进行编辑，改成和主路由下同一网段的任意ip即可，这里我的网段是192.168.1.xx,所以给我改成192.168.1.3

![img](https://imgoss.xgss.net/picgo/6a0aef724e6e441dbd35e40662edc63d.png?aliyun)

![image-20230918093338043](https://imgoss.xgss.net/picgo/image-20230918093338043.png?aliyun)



修改好后，按下Esc键退出编辑模式，Shift+：唤醒末行模式，然后wq命令保存退出文件编辑，继续输入命令reboot进行重启:

![img](https://imgoss.xgss.net/picgo/86e6c7cd7d294473bda3934b850817d2.png?aliyun)



设置好ip后，通过刚才设置的ip地址就可以访问旁路由了，默认密码：password

![img](https://imgoss.xgss.net/picgo/92816cbb41c44806a2ab9462b8f4bd38.png?aliyun)





![img](https://imgoss.xgss.net/picgo/e685cdc068ba495883d7d6bc0100730e.png?aliyun)



接下来进行简单设置下，就可以正常链接网络了，首先进入网络-接口，进入lan口配置

![img](https://imgoss.xgss.net/picgo/c609c470d49146d29870451a009a11a9.png?aliyun)



设置ipv4网关为主路由的网关，DNS服务器114.114.114.114即可，DHCP接口忽略打钩，设置完成后点击保存应用即可

![img](https://imgoss.xgss.net/picgo/bcfb320e66c946339e2d675a614b50cf.png?aliyun)

![img](https://imgoss.xgss.net/picgo/05bf398ebfd94e4b8f04840d14ea63d6.png?aliyun)


接下来测试下网络状态，有数据进行返回说明网络正常，到这里就已经全部配置好了，需要走旁路由的设备，设置下网关就可以愉快的玩耍啦！

![img](https://imgoss.xgss.net/picgo/077451e1ac1148c3838115d366349b35.png?aliyun)
