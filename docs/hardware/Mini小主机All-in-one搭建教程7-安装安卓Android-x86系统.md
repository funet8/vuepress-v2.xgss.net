# Mini小主机All-in-one搭建教程7-安装安卓Android-x86系统



![allinone07](https://imgoss.xgss.net/picgo/allinone07.jpg?aliyun)

# 下载安卓Android-x86系统

https://www.fosshub.com/Android-x86.html

![image-20231011192206674](https://imgoss.xgss.net/picgo/image-20231011192206674.png?aliyun)

备用下载

链接：https://pan.baidu.com/s/1WcpQfwTQDlNDzcvdSZY8aA?pwd=1g8t 
提取码：1g8t

## 上传到esxi中

![image-20231011192644879](https://imgoss.xgss.net/picgo/image-20231011192644879.png?aliyun)



# 创建安卓Android-x86系统

这些操作方法跟以往的安装系统差不多

## 1.创建类型

![image-20231011192524191](https://imgoss.xgss.net/picgo/image-20231011192524191.png?aliyun)

## 2.选择名称和客户机操作系统

![image-20231011192728905](https://imgoss.xgss.net/picgo/image-20231011192728905.png?aliyun)



## 3.选择存储

![image-20231011192739039](https://imgoss.xgss.net/picgo/image-20231011192739039.png?aliyun)



## 4.自定义安装

这里根据实际需要选择cpu内存和硬盘

CD/DVD要打开

![image-20231011192826840](https://imgoss.xgss.net/picgo/image-20231011192826840.png?aliyun)



## 5.即将完成

![image-20231011192839392](https://imgoss.xgss.net/picgo/image-20231011192839392.png?aliyun)



# 开机进入系统

## 选择第三个，安装x86的安卓系统

![image-20231011193118183](https://imgoss.xgss.net/picgo/image-20231011193118183.png?aliyun)



选择第一个，点击OK

![image-20231011193204806](https://imgoss.xgss.net/picgo/image-20231011193204806.png?aliyun)

选择NO

![image-20231011193229157](https://imgoss.xgss.net/picgo/image-20231011193229157.png?aliyun)

## 创建分区

选择new，新建一个分区

![image-20231011193451658](https://imgoss.xgss.net/picgo/image-20231011193451658.png?aliyun)



选择 Primary

![image-20231011193511405](https://imgoss.xgss.net/picgo/image-20231011193511405.png?aliyun)

回车

![image-20231011193532541](https://imgoss.xgss.net/picgo/image-20231011193532541.png?aliyun)

选择第一项 Bootable

![image-20231011193620934](https://imgoss.xgss.net/picgo/image-20231011193620934.png?aliyun)

保存写入

![image-20231011193722119](https://imgoss.xgss.net/picgo/image-20231011193722119.png?aliyun)



![image-20231011193757784](https://imgoss.xgss.net/picgo/image-20231011193757784.png?aliyun)

做好分区之后退出

![image-20231011193854614](https://imgoss.xgss.net/picgo/image-20231011193854614.png?aliyun)





![image-20231011193938686](https://imgoss.xgss.net/picgo/image-20231011193938686.png?aliyun)



选择EXT4

![image-20231011193950077](https://imgoss.xgss.net/picgo/image-20231011193950077.png?aliyun)

选择yes

![image-20231011194040022](https://imgoss.xgss.net/picgo/image-20231011194040022.png?aliyun)



选择yes

![image-20231011194120614](https://imgoss.xgss.net/picgo/image-20231011194120614.png?aliyun)

选择yes

![image-20231011194134342](https://imgoss.xgss.net/picgo/image-20231011194134342.png?aliyun)

选择reboot重启

![image-20231011194231101](https://imgoss.xgss.net/picgo/image-20231011194231101.png?aliyun)

## 编辑系统引导

这个界面，按键盘的 “e”键

![image-20231011194246543](https://imgoss.xgss.net/picgo/image-20231011194246543.png?aliyun)



选择第一个按“e” 

## 进入编辑模式

![image-20231011194643710](https://imgoss.xgss.net/picgo/image-20231011194643710.png?aliyun)



```
把 kernel /android-9.0-r2/kernel quiet root=/dev/ram0 SRC=android-9.0-r2
中的 quiet 改为 nomodeset xforcevesa
既： kernel /android-9.0-r2/kernel nomodeset xforcevesa root=/dev/ram0 SRC=android-9.0-r2
回车
```



![image-20231011195223821](https://imgoss.xgss.net/picgo/image-20231011195223821.png?aliyun)



## 按 “b”按键引导进入系统

![image-20231011195312776](https://imgoss.xgss.net/picgo/image-20231011195312776.png?aliyun)



## 选择语言，点击开始

![image-20231011195326183](https://imgoss.xgss.net/picgo/image-20231011195326183.png?aliyun)



下面的安装就跟新手机一样

![image-20231011195437232](https://imgoss.xgss.net/picgo/image-20231011195437232.png?aliyun)



选择跳过

![image-20231011195452654](https://imgoss.xgss.net/picgo/image-20231011195452654.png?aliyun)



谷歌的服务全部不勾选

![image-20231011231905061](https://imgoss.xgss.net/picgo/image-20231011231905061.png?aliyun)



点击接受

![image-20231011231956651](https://imgoss.xgss.net/picgo/image-20231011231956651.png?aliyun)



选择以后再说

![image-20231011232044655](https://imgoss.xgss.net/picgo/image-20231011232044655.png?aliyun)



选择quickstep

![image-20231011232131267](https://imgoss.xgss.net/picgo/image-20231011232131267.png?aliyun)

![image-20231011232218828](https://imgoss.xgss.net/picgo/image-20231011232218828.png?aliyun)

进入安卓系统

![image-20231011232235344](https://imgoss.xgss.net/picgo/image-20231011232235344.png?aliyun)



## 再次配置引导目录

进入android安卓系统后 按 （alt+👉右键）进入终端模式

```
cd /
mkdir /mnt/sda1
mount /dev/block/sda1 /mnt/sda1
vi /mnt/sda1/grub/menu.lst

还是
把 kernel /android-9.0-r2/kernel quiet root=/dev/ram0 SRC=android-9.0-r2
中的 quiet 改为 nomodeset xforcevesa
既： kernel /android-9.0-r2/kernel nomodeset xforcevesa root=/dev/ram0 SRC=android-9.0-r2

umount /mnt/sda1
reboot
```



# 设置网络

安卓系统没有网络的

![image-20231011232545965](https://imgoss.xgss.net/picgo/image-20231011232545965.png?aliyun)

设置

![image-20231011233502598](https://imgoss.xgss.net/picgo/image-20231011233502598.png?aliyun)

即可访问互联网

![image-20231011233538593](https://imgoss.xgss.net/picgo/image-20231011233538593.png?aliyun)

# 打开开发者模式

1.设置--->系统-->关于平板电脑

![image-20231012091624276](https://imgoss.xgss.net/picgo/image-20231012091624276.png?aliyun)

多点几次版本号，即可显示开发模式

![image-20231012091732556](https://imgoss.xgss.net/picgo/image-20231012091732556.png?aliyun)



# 屏幕不熄灭

设置-->系统-->开发者选项

屏幕不锁定打开即可

![image-20231012092033130](https://imgoss.xgss.net/picgo/image-20231012092033130.png?aliyun)