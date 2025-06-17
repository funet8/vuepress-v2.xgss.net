---
title: 对大于2T的硬盘分区工具-parted
createTime: 2025/05/27 17:51:17
permalink: /article/5gvrs2ut/
---
# Linux对大于2T的硬盘分区工具-parted



## fdisk

工具他对分区是有大小限制的，它只能划分小于2T的磁盘。
超过2T的磁盘：
其一是通过卷管理来实现；
其二就是通过我们今天谈到的Parted工具来实现对GPT磁盘进行分区操作。

![linux-file-system.webp](https://imgoss.xgss.net/picgo/linux-file-system.webp.jpg?aliyun)

## parted

```
yum install -y parted # 安装
parted --help   #获取帮助
```



本地服务器有一块4T的硬盘 /dev/sda

```
parted /dev/sda

# parted
GNU Parted 3.1
Using /dev/sda
Welcome to GNU Parted! Type 'help' to view a list of commands.
(parted)    
```



```
parted -a optimal /dev/sda	#对硬盘sdb进行分区  
mklabel gpt					#使用GPT格式			
mkpart primary 1 -1			#建立一个主分区	
print						#显示分区信息
quit						#退出
mkfs.xfs /dev/sdb1			#格式化为xfs格式

echo "/dev/sdb1	/opt	xfs	defaults	0 0" >> /etc/fstab #加入自动挂载
mount -a					#挂载分区
df -h						#查看磁盘信息

umount /dev/sda
```










