---
title: Mini小主机All-in-one搭建教程6-安装苹果MacOS系统
createTime: 2025/05/27 17:51:17
permalink: /article/vv2fuap2/
---
# Mini小主机All-in-one搭建教程6-安装苹果MacOS系统



笔者使用的ESXI7.0 Update 3 抱着试试的态度想安装一下苹果的MacOS系统

主要步骤有2个

1.解锁unlocker虚拟机系统

2.安装苹果MacOS系统

![allinone06](https://imgoss.xgss.net/picgo/allinone06.jpg?aliyun)

# 需要下载的文件

## unlocker

这一步是最耗时间的，要找到匹配自己系统的unlocker文件。

https://github.com/THDCOM/ESXiUnlocker/releases/

下载[esxi-unlocker-3.0.3.tgz](https://github.com/THDCOM/ESXiUnlocker/releases/download/3.0.3/esxi-unlocker-3.0.3.tgz)文件 ， 笔者使用 3.0.3安装失败，于是又试了3.0.1 https://download.csdn.net/download/RGBBB/72129961 最终unlocker成功。

![image-20231011104228216](https://imgoss.xgss.net/picgo/image-20231011104228216.png?aliyun)



3.0.1链接（笔者使用成功）：https://pan.baidu.com/s/1wKyqlBA34gXufybJir36Rw?pwd=kidi 
提取码：kidi

3.0.3备用下载链接：https://pan.baidu.com/s/1DtbtalyqlqIwKAyJ7W2r2Q?pwd=6gw3 
提取码：6gw3



## 下载苹果系统

苹果macOS Monterey 12.7 (21G816) MH 下载
链接: https://pan.baidu.com/s/19Gsger55r9wVt79lO9qRnA?pwd=kebq 
提取码: kebq

下载完成之后上传到ESXI的目录中

# 解锁虚拟机

## 1.上传文件 unlocker的压缩文件



## 2.启动SSH

![image-20231011094015937](https://imgoss.xgss.net/picgo/image-20231011094015937.png?aliyun)



## 3.进入文件夹，安装unlocker

```
$ df -h
Filesystem Size   Used Available Use% Mounted on
VMFS-6     1.9T   1.0T    869.2G  54% /vmfs/volumes/datastore1
VMFS-6     1.9T 483.6G      1.4T  25% /vmfs/volumes/Data2T

$ cd /vmfs/volumes/Data2T/OS

解压：
$ tar -zxvf esxi-unlocker-3.0.3.tgz 

安装unlocker并重启：
$ ./esxi-install.sh 
VMware Unlocker 3.0
===============================
Copyright: Dave Parsons 2011-18
Powered by sysin.org
Installing unlocker.tgz
Acquiring lock /tmp/bootbank.lck
Copying unlocker.tgz to /bootbank/unlocker.tgz
Editing /bootbank/boot.cfg to add module unlocker.tgz
Success - please now restart the server!

#重启
reboot
```



## 4.检查补丁是否成功

重启成功之后

```
cd /vmfs/volumes/Data2T/OS/
./esxi-smctest.sh
```



# 苹果macOS Monterey

## 1.创建虚拟机

![image-20231011105247345](https://imgoss.xgss.net/picgo/image-20231011105247345.png?aliyun)





## 2.选择名称和客户机操作系统

![image-20231011105406049](https://imgoss.xgss.net/picgo/image-20231011105406049.png?aliyun)



## 3.选择存储

![image-20231011105431890](https://imgoss.xgss.net/picgo/image-20231011105431890.png?aliyun)



## 4.自定义设置

cpu和内存硬盘根据实际需要设置

![image-20231011105632890](https://imgoss.xgss.net/picgo/image-20231011105632890.png?aliyun)

最主要设置CD/DVD选择 MAC系统的文件

![image-20231011105646189](https://imgoss.xgss.net/picgo/image-20231011105646189.png?aliyun)

## 5.即将完成

![image-20231011105709536](https://imgoss.xgss.net/picgo/image-20231011105709536.png?aliyun)



## 6.启动macos电源

![image-20231011111401786](https://imgoss.xgss.net/picgo/image-20231011111401786.png?aliyun)

## 7.选择语言

![image-20231011111424123](https://imgoss.xgss.net/picgo/image-20231011111424123.png?aliyun)



## 8.磁盘工具

![image-20231011111454391](https://imgoss.xgss.net/picgo/image-20231011111454391.png?aliyun)



## 9.格式化磁盘

选择抹掉

![img](https://imgoss.xgss.net/picgo/1562290-20211208203009518-376747968.png?aliyun)



### 磁盘名称

![img](https://imgoss.xgss.net/picgo/1562290-20211208203009499-1361872116.png?aliyun)

## 10.安装macOS

![image-20231011111758410](https://imgoss.xgss.net/picgo/image-20231011111758410.png?aliyun)



## 11.点击继续

![image-20231011111820570](https://imgoss.xgss.net/picgo/image-20231011111820570.png?aliyun)



## 12.同意软件政策

![image-20231011111837977](https://imgoss.xgss.net/picgo/image-20231011111837977.png?aliyun)



## 13.安装系统到磁盘

![image-20231011111851234](https://imgoss.xgss.net/picgo/image-20231011111851234.png?aliyun)



## 14.安装系统中

等待

![image-20231011111859987](https://imgoss.xgss.net/picgo/image-20231011111859987.png?aliyun)

## 15.选择国家和地区

![image-20231011114632976](https://imgoss.xgss.net/picgo/image-20231011114632976.png?aliyun)



## 16.语言与输入法

![image-20231011114705980](https://imgoss.xgss.net/picgo/image-20231011114705980.png?aliyun)

## 17.辅助功能

![image-20231011114717307](https://imgoss.xgss.net/picgo/image-20231011114717307.png?aliyun)

## 18.数据与隐私

![image-20231011114727666](https://imgoss.xgss.net/picgo/image-20231011114727666.png?aliyun)

## 19.迁移助理

![image-20231011114817066](https://imgoss.xgss.net/picgo/image-20231011114817066.png?aliyun)



## 20.创建账户

![image-20231011121845899](https://imgoss.xgss.net/picgo/image-20231011121845899.png?aliyun)



## 21.安装成功

![image-20231011122050811](https://imgoss.xgss.net/picgo/image-20231011122050811.png?aliyun)



# macOS开启屏幕共享

![image-20231011133151012](https://imgoss.xgss.net/picgo/image-20231011133151012.png?aliyun)

![image-20231011133029315](https://imgoss.xgss.net/picgo/image-20231011133029315.png?aliyun)

![image-20231011132939372](https://imgoss.xgss.net/picgo/image-20231011132939372.png?aliyun)

## 下载VNC viewer 软件

![image-20231011133652529](https://imgoss.xgss.net/picgo/image-20231011133652529.png?aliyun)

![image-20231011133043396](https://imgoss.xgss.net/picgo/image-20231011133043396.png?aliyun)



![image-20231011133110402](https://imgoss.xgss.net/picgo/image-20231011133110402.png?aliyun)



![image-20231011133720281](https://imgoss.xgss.net/picgo/image-20231011133720281.png?aliyun)

至此，这是就是用esxi7.0安装苹果MacOS系统的教程了。



# 在Win11上用vmware连接Esxi

文件--->连接服务器

输入Esxi的ip地址，用户名和密码。

![image-20231012160828313](https://imgoss.xgss.net/picgo/image-20231012160828313.png?aliyun)

就可以不用浏览器管理Esxi。

![image-20231012160754282](https://imgoss.xgss.net/picgo/image-20231012160754282.png?aliyun)

# 安装VMware Tools

无法修改分辨率的问题，需要安装VMware Tools



下载darwin.iso：http://www.downza.cn/soft/341609.html

备用下载链接：https://pan.baidu.com/s/1Ef3RnlmQbZ5TJlFltQ-ajA?pwd=daab 
提取码：daab



## 1.将darwin.iso文件上传EXSI中

![image-20231012155429871](https://imgoss.xgss.net/picgo/image-20231012155429871.png?aliyun)



## 2.修改苹果系统的配置

在CD/DVD介质中设置路径

![image-20231012155513300](https://imgoss.xgss.net/picgo/image-20231012155513300.png?aliyun)

## 3.苹果系统开机

桌面就出现了VMware Tools

![image-20231012155724434](https://imgoss.xgss.net/picgo2025/image-20231012155724434.png?aliyun)



## 4.打开安装

![image-20231012155756186](https://imgoss.xgss.net/picgo/image-20231012155756186.png?aliyun)



## 5.安装重启之后就可以缩放

![image-20231012155852890](https://imgoss.xgss.net/picgo/image-20231012155852890.png?aliyun)



再设置一下快照，就可以随便造了。



## 手残升级 sonoma14.0

![image-20231012160051560](https://imgoss.xgss.net/picgo/image-20231012160051560.png?aliyun)

![image-20231012160116122](https://imgoss.xgss.net/picgo/image-20231012160116122.png?aliyun)

升级完成之后重启，所以千万不要手贱升级系统。

![image-20231012165026068](https://imgoss.xgss.net/picgo/image-20231012165026068.png?aliyun)

用快照恢复

![image-20231012165251653](https://imgoss.xgss.net/picgo/image-20231012165251653.png?aliyun)

系统马上恢复！