# 玩客云刷ARMBIAN当服务器过程记录



## 玩客云的可玩性

1、可以刷成电视+游戏盒子的双系统。也可以刷成单独的电视盒子和游戏盒子。不过因为内存有限放不了多少游戏。还是建议用外置SD卡存储游戏比较合适。

2、刷成Armbian linux系统（可以实现docker、可道云、甜糖等多种功能）

3、最后它还可以刷软路由OpenWrt系统

## 关于刷机的方法

网上有教程说只需要公头USB刷机，而我不知道什么原因，一直操作不成功，可能是板子不一样或者是操作方法不对，或者是我的设备是在有赞的上买的赚钱宝3代（可能是加了锁了），安装网上的无一直无法刷机成功。

耗费了好长时间终于用TTL 转USB的方法将设备刷机成功。

以下内容均为本人折腾记录，刷机需要 TTL 转USB，过程有些麻烦，需要有一定的动手能力。

![img](https://imgoss.xgss.net/picgo/20211116111801_619322e953bb6.jpg?aliyun)



## 玩客云的配置

玩客云配置：CPU采用的是晶晨的s805，单核主频1.5GHz，这个CPU的最大优点就是功耗低，发热量小。内存采用的是海力士，512*2共1GDDR3内存。闪存是三星的8g。网口芯片采用的是螃蟹的rtl6211f千兆网口。

1、CPU是晶晨S805 这是一款32位处理器的CPU，性能放在现在来看是比较弱鸡的，很多玩法都被这颗CPU的性能局限了。

2、双USB2.0 这个同样是被吐槽的地方，严重影响文件的传输速度。

3、千兆网口 这点比很多同期的设备强。但刷部分固件后会变成百兆。

4、1GB内存+8GB存储组合 这种配置放到现在看也是比较低的。

5、另外盒子没有蓝牙、WiFi和红外等功能。虽然主板留有红外扩展接口 ，可以自行焊接。

## 准备工具

1.一台玩客云（海鲜市场大概50元左右）

2.一台Window电脑以及刷机软件

3.双公头 USB 线一根，淘宝买一根3块钱（别问，自制的费了三条线）

4.USB串口模块一个（usb转ttl的工具），淘宝上搜索

5.闲置 U 盘一个，或者读卡器配合存储卡也行

6.一把金属镊子，用来短接用（用金属线也是可以的，有洛铁或者铁丝

7.显示器和HDMI线（可有可无）

![image-20221020013647592](https://imgoss.xgss.net/picgo/image-20221020013647592.png?aliyun)

## 用到的文件

链接：https://pan.baidu.com/s/1Dd-iLakEry0EsLb4Zh8hzQ
提取码：6666


## 用到的工具

链接：https://pan.baidu.com/s/1otnPopUs6Csau5m4hYjdZQ
提取码：6666



## 什么是 Armbian 

Armbian是其他项目可以信赖的单板计算机（SBC）的基本操作系统平台，它拥有以下几个特点：

1、轻量级基于Debian或Ubuntu的Linux发行版，专门用于ARM开发板；

2、每个系统均由Armbian Build Tools进行编译，组装和优化；

3、它具有强大的构建和软件开发工具，可以进行自定义构建；

4、充满活力的社区。

说到底 Armbian 就是 Linux 的一个发行版本，专门用于ARM开发板的小型系统。

## 准备刷机软件

### U盘写入 Armbian

准备8G及以上优盘,在电脑上格式化(选择FAT32，选择FAT32，选择FAT32),
运行USBWriter,将解压后的wanke-emmc.img,写入优盘.写入完成后,不要着急拔下来.

![网心云硬件盒子刷安卓教程](https://imgoss.xgss.net/picgo/zhzz2020ikqse-1.png?aliyun)

### 复制uboot及meson8b_m201_1G.dtb至优盘覆盖原文件

打开写入好的优盘,将u-boot.bin复制到优盘目录下, meson8b_m201_1G.dtb复制覆盖到dtb目录下,弹出优盘,放到一边备用。

![网心云硬件盒子刷安卓教程](https://imgoss.xgss.net/picgo/zhzz2020napsg-1.png?aliyun)

### 准备USB Burning Tool 

USB Burning Tool 装好后打开，左上角点击 “文件”，然后选择导入烧录包，选择下载的 update.img 文件导入，然后确认右边配置里的擦除 flash 和擦除 bootloader 都是勾选上的，并且选择擦除所有。

![img](https://imgoss.xgss.net/picgo/20210516173238861.png?aliyun)

确认配置没问题后就点击开始，让软件进入等待状态。



## 玩客云拆机

因为此次刷机我们需要短接主板，所以首先我们需要进行拆机操作。

![image-20220907102614686](https://imgoss.xgss.net/picgo/image-20220907102614686.png?aliyun)

拆机其实非常的简单，直接用吹风机加热后面板，让面板里的胶软化。大约几分钟后用刀片或者撬棍就可以顺利将面板取下。

如果没有吹风机，也可以用细小的刀片直接刮，多少会伤害面板，如果不在意的话完全可以。

![image-20220907102752435](https://imgoss.xgss.net/picgo/image-20220907102752435.png?aliyun)



再拧下6颗螺丝保存好，拆完如图。

![image-20220907102844564](https://imgoss.xgss.net/picgo/image-20220907102844564.png?aliyun)

拆下主板，如图做工还可以，作为矿渣完全可以自用。硬件性能一般般，但是构建个人的宝塔系统还是勉强够用的。

### 新版（v1.3）VS老版

两个版本不同点很好分辨，在存储卡插槽上有写“1.3”就是新版，没有就是老版。

**二者刷机时候需要短接的触点也是不一样的!**

用双公头 USB 线，插上靠近HDMI的USB插口，把玩客云主板连上电脑。

然后短接 emmc 芯片边上，如下图所示的两个点，用啥都行，镊子或者找根导线剥掉两头外皮都可以：

![img](https://imgoss.xgss.net/picgo/20210516173311644.png?aliyun)



新版的短接方法按照网上的说法比较多，我这边实际操作短接的是第三排的两个点

![image-20220907105058619](https://imgoss.xgss.net/picgo/image-20220907105058619.png?aliyun)

![image-20220907105302979](https://imgoss.xgss.net/picgo/image-20220907105302979.png?aliyun)



## 刷机update.img镜像

基本流程：先刷入安卓盒子固件（update.img）再刷ArmbianOS。

短接两个触点的同时插上电源，然后如果顺利的话，刷机软件会发现设备，自动开始刷入流程。短接成功还有个显著的提示，就是主板指示灯不会亮。

短接失败了也不会怎么样，软件没反应而已，可以放心大胆的多次尝试。

刷机软件有反应后就可以松开短接，等自动刷完提示成功即可，刷机成功后就拔掉刷机的双公头线，电源也断开。

![image-20220907111828126](https://imgoss.xgss.net/picgo/image-20220907111828126.png?aliyun)

如图，笔者重复了三次才刷机成功。1.3的板子一次性刷机成功。

再断电，将hdmi的线连接显示器启动，等待一会进入一个电视盒子的系统

![image-20220907112046351](https://imgoss.xgss.net/picgo/image-20220907112046351.png?aliyun)



至此刷机成功，当然如果当个电视盒子也是可以的，但是没有网络插上网线没反应。



## 安装 armbian 系统

## 连接TTL线及相关设置

### 1.准备好usb转TTL模块

电脑安装好模块驱动,将COM口(不一定和我一样是COM3)

位/秒修改为115200,流控制改为无,(我用的是CP2102六合一模块)如图:
![网心云硬件盒子刷安卓教程](https://imgoss.xgss.net/picgo2025/zhzz2020t87u4-1.png?aliyun)

### 2.TTL线与玩客云

玩客云不要通电,将TTL线与玩客云连接好,(图上是自已焊的排针,可以用网线剥出铜丝插到杜邦线及玩客云小孔里也可以)

这里我用手机取卡针插到板子的孔里，按照以下的连接

```
模块————————-玩客云

RX—————————-TX
TX—————————-RX
GND————————GND
```





![网心云硬件盒子刷安卓教程](https://imgoss.xgss.net/picgo/zhzz2020fjq0b-1.png?aliyun)

### 3.运行putty_x64_0.70.exe,设置如下:

![网心云硬件盒子刷安卓教程](https://imgoss.xgss.net/picgo/zhzz2020uxkh4-1.png?aliyun)

![网心云硬件盒子刷安卓教程](https://imgoss.xgss.net/picgo/zhzz2020jombf-1.png?aliyun)

### 4.玩客云通电

查看屏幕是否有输出,有输出表示TTL连接正常,如不正常请检查模块及TTL线是否连接正常.拔下玩客云电源.

## TTL中断刷入uboot

上面的工作都做好后,保持putty为当前窗口,将玩客云通电后,迅速狂按回车键,至中断成功.

中断成功,屏幕显示将停留在m8b_m201_1G#状态.此时玩客云网络是不通的.

![网心云硬件盒子刷安卓教程](https://imgoss.xgss.net/picgo/zhzz2020pt5ih-1.png?aliyun)

将准备的优盘插到1号USB口(离网口近的),在puttyk中输入以下命令:

一条一条粘贴到窗口,回车执行。

```
usb start;fatload usb 0 12000000 u-boot.bin
store rom_write 12000000 0 60000
saveenv
```


完成后,拔下优盘,然后将玩客云断电.

## TTL中断修改启动项

将玩客云通电,中断,(此时玩客云已可以连网,如连接网线,可用dhcp、pri、ping等命令查看测试网络等，这里不赘述了)
还是一条一条粘贴到窗口,回车执行.

以下代码符号要是英文的标点符号！之前的帖子复制错了导致返工。

```
setenv bootfromrecovery 0

setenv bootfromnand 0

setenv start_mmc_autoscript 'if fatload mmc 0 11000000 s805_autoscript; then autoscr 11000000; fi;'

setenv start_usb_autoscript "if fatload usb 0 11000000 s805_autoscript; then autoscr 11000000; fi; if fatload usb 1 11000000 s805_autoscript; then autoscr 11000000; fi;"

setenv start_autoscript 'if usb start; then run start_usb_autoscript; fi; if mmcinfo; then run start_mmc_autoscript; fi;'

setenv bootcmd 'run start_autoscript; run storeboot'

setenv firstboot 1

saveenv
```





完成后，玩客云断电，此时可以把TTL线都拔掉了。此处论友多有反馈，请详细检查命令是否已正常执行，确保优盘启动设置成功。

![网心云硬件盒子刷安卓教程](https://imgoss.xgss.net/picgo/zhzz2020xo78a-1.png?aliyun)



## 优盘插上开始刷机

将准备的优盘插到1号USB口(离网口近的)，玩客云通电，观查前面板蓝灯或优盘灯，等一会，约5~10分钟，期间玩客云会转成蓝紫2色灯交替闪烁，直至蓝灯长亮，拔下优盘，玩客云断电。
注意：如果没有灯闪，可在5分钟后将玩客云断开再重新通电，有交替闪烁就说明离成功不远了。
注意：此处论友多有反馈，建议把TTL线去除，设备上仅连接网线，优盘(别插错口)，电源线，盲刷就好。可能中途需要设备重启，等十分钟左右，设备断电再通电，不用怕，不会出问题，可能需要断电二三次才能看到灯光交替闪烁。

## 刷完收工

玩客云联网，通电，蓝灯长亮。

在路由器里可以看到玩客云的IP出现，可以用PUTTY，SSH连接到设备。

用户名 root 密码1234

使用passwd 修改密码后，尽情的玩耍吧。

关于如何配置samba共享，安装宝塔工具nginx,php,可道云等等，后续再写教程吧。

![网心云硬件盒子刷安卓教程](https://imgoss.xgss.net/picgo/zhzz2020om8r8-1.png?aliyun)

![网心云硬件盒子刷安卓教程](https://imgoss.xgss.net/picgo/zhzz2020i7hxb-1.png?aliyun)

Armbian刷机完成！
