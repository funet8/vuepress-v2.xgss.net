# Mini小主机All-in-one搭建教程1-安装Esxi7.0虚拟机系统



最近小主机似乎很火，知名不知名的品牌，都出了各自的小主机。今天主要介绍小主机下搭建教程安装Esxi、Openwrt、群晖NAS、Win11、centos7、黑苹果、Android-x86系统，这戏系统

搞得好是all in one，搞得不好就是all in boom了炸鸡了。

# 硬件介绍

在狗东买的 [极摩客M2](https://u.jd.com/Pq3ObYl)  https://u.jd.com/Pq3ObYl到手价是2799元

具体配置如下： 酷睿英特尔11代标压i7 11390H  64G+1TB固态。

以下是安装Esxi7.0虚拟机系统的教程。

![image-20231010172521256](https://imgoss.xgss.net/picgo/image-20231010172521256.png?aliyun)

## 包装盒正面

![image-20231014173704915](https://imgoss.xgss.net/picgo/image-20231014173704915.png?aliyun)

## 包装盒背面

![image-20231014173748336](https://imgoss.xgss.net/picgo/image-20231014173748336.png?aliyun)

## 主体

![image-20231014173828185](https://imgoss.xgss.net/picgo/image-20231014173828185.png?aliyun)

## 侧面

两个usb3.0

![image-20231014173846321](https://imgoss.xgss.net/picgo/image-20231014173846321.png?aliyun)

## 侧面

HDMIx2

usb3.0*2

typeC*1

网口

![image-20231014173915780](https://imgoss.xgss.net/picgo/image-20231014173915780.png?aliyun)

![image-20231014174320009](https://imgoss.xgss.net/picgo/image-20231014174320009.png?aliyun)



# 安装Esxi7.0虚拟机系统

## 准备工作

需要1个U盘，1G以上的就可以，用来安装Esxi系统

![allinone01](https://imgoss.xgss.net/picgo/allinone01.jpg?aliyun)

## 下载镜像文件

我使用的是ESXi-7.0U3G ，用写盘工具rufus直接写入到U盘内进行启动安装。

链接：https://pan.baidu.com/s/1_zHnAoUSn3-rfD9Tw5qflg?pwd=baji 

提取码：baji



## 开机启动

写入完成后，开机按F7选择U盘进行启动。

![img](https://imgoss.xgss.net/picgo/c2cb9237947f4664a528428ec2444188.png?aliyun)

![img](https://imgoss.xgss.net/picgo/6f48362c4007472ab21628e2bf39305d.png?aliyun)

![img](https://imgoss.xgss.net/picgo/b842614312bc4a6cb828df09f8d97450.png?aliyun)

## 接下来耐心等待安装程序启动

![img](https://imgoss.xgss.net/picgo/c6099e7bbc804a9997734699a7837888.png?aliyun)



## 按下回车继续下一步

![image-20230914164539565](https://imgoss.xgss.net/picgo/image-20230914164539565.png?aliyun)



## 按下F11继续下一步

![image-20230914164605530](https://imgoss.xgss.net/picgo/image-20230914164605530.png?aliyun)



## 选择硬盘安装

这里我选择安装到NVME的硬盘上所以就选择第一块硬盘，回车

![image-20230914164630188](https://imgoss.xgss.net/picgo/image-20230914164630188.png?aliyun)

## 键盘布局

选择默认即可，直接回车下一步

![image-20230914164653041](https://imgoss.xgss.net/picgo/image-20230914164653041.png?aliyun)

## 设置账户密码

密码需要包含大小写和特殊符号，不然不能下一步，设置完成后回车

![image-20230914164714706](https://imgoss.xgss.net/picgo/image-20230914164714706.png?aliyun)

## 重启

接下来按下F11后进行安装，安装完成后会自动重启。

![image-20230914164733480](https://imgoss.xgss.net/picgo/image-20230914164733480.png?aliyun)

![image-20230914164746328](https://imgoss.xgss.net/picgo/image-20230914164746328.png?aliyun)

## Esxi安装完成

到这里，我们的Esxi就已经安装完成了 

![img](https://imgoss.xgss.net/picgo/00db6b626d0b42a6a82f09369866171c.png?aliyun)



![image-20230914164841331](https://imgoss.xgss.net/picgo/image-20230914164841331.png?aliyun)

输入屏幕上的IP到浏览器中，输入账户root和刚才设置的密码，即可登陆成功

![image-20230914164913664](https://imgoss.xgss.net/picgo/image-20230914164913664.png?aliyun)

![image-20230914164946997](https://imgoss.xgss.net/picgo/image-20230914164946997.png?aliyun)



## 修改Exsi的IP地址

登录到VMware ESXi Direct控制台用户界面（DCUI）。完成ESXi服务器的安装后，将显示DCUI界面，如下所示。

![image-20230916164018453](https://imgoss.xgss.net/picgo/image-20230916164018453.png?aliyun)

请按F2键进入自定义系统设置

这将显示一个登录屏幕，如下图所示。输入root用户密码，然后按Enter键。

![image-20230916164053399](https://imgoss.xgss.net/picgo/image-20230916164053399.png?aliyun)

成功登录后，将显示系统自定义设置，如下面的屏幕快照所示。使用键盘上的箭头键选择Configure Management Network选项，然后单击Enter。

![image-20230916164109344](https://imgoss.xgss.net/picgo/image-20230916164109344.png?aliyun)

![image-20230916164122241](https://imgoss.xgss.net/picgo/image-20230916164122241.png?aliyun)



默认情况下，第二个选项“使用动态IPv4地址和网络配置”处于选中状态，这意味着ESXi主机将从网络中的DHCP服务器获取及接收IP。使用箭头键选择第三个选项“设置静态IPv4地址和网络配置”，然后按空格键以选中该选项。之后，您可以键入静态IP地址、子网掩码和默认网关，如下图所示。配置完成后，按Enter键继续。

![image-20230916164149999](https://imgoss.xgss.net/picgo/image-20230916164149999.png?aliyun)





Esxi系统的安装教程到这里就结束了，基本上没有什么难度，接下来就是软路由、群晖NAS、还有Windows系统安装的教程了，我们继续。

## Esxi激活

VMware ESXi7.0许可证密钥附使用教程：https://www.downkuai.com/soft/129134.html



## 开启远程SSH

进入web管理界面，依次点操作，服务，启用Secure shell

![image-20230918091241899](https://imgoss.xgss.net/picgo/image-20230918091241899.png?aliyun)

再使用ssh远程链接工具连接。

![image-20230918091429706](https://imgoss.xgss.net/picgo/image-20230918091429706.png?aliyun)



# https服务挂掉处理方法

重启报错： 503 Service Unavailable (Failed to connect to endpoint: [N7Vmacore4Http16LocalServiceSpecE:0x000000bcbba766b0] _serverNamespace = / action = Allow _port = 8309)

ssh连接esxi输入

```
[root@localhost:~] /etc/init.d/hostd status
hostd is not running.
[root@localhost:~] 
[root@localhost:~] /etc/init.d/hostd start
hostd started.
[root@localhost:~] 
[root@localhost:~] 
[root@localhost:~] /etc/init.d/ntpd restart
ntpd is not running
Starting ntpd
[root@localhost:~] /etc/init.d/vpxa restart
watchdog-vpxa[1053350]: Terminating watchdog process with PID 1051330
vpxa stopped.
vpxa started.
[root@localhost:~] /etc/init.d/ntpd restart
Stopping ntpd
watchdog-ntpd[1053433]: Terminating watchdog process with PID 1053306
Starting ntpd
```

解决问题了。

