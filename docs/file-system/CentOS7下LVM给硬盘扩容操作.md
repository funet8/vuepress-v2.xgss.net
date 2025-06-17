---
title: CentOS7下LVM给硬盘扩容操作
createTime: 2025/05/27 17:51:17
permalink: /article/7r7j8v2b/
---


# CentOS7下LVM给硬盘扩容操作

需求：原本在某讯云上100G硬盘不够用，另外购买了500G的硬盘，如果只是将500G挂载到程序文件目录，只能用得上500G，100G用不上，有点浪费空间

lvm可以将两块硬盘相加达到扩容的方案。

先在虚拟机上操作，再在实际环境中操作。

## LVM简介

LVM是逻辑盘卷管理（LogicalVolumeManager）的简称，它是Linux环境下对磁盘分区进行管理的一种机制，LVM是建立在硬盘和 分区之上的一个逻辑层，来提高磁盘分区管理的灵活性。通过LVM系统管理员可以轻松管理磁盘分区，如：将若干个磁盘分区连接为一个整块的卷组 （volumegroup），形成一个存储池。管理员可以在卷组上随意创建逻辑卷组（logicalvolumes），并进一步在逻辑卷组上创建文件系 统。
LVM是 Logical Volume Manager(逻辑卷管理)的简写

**PV:是物理的磁盘分区**

**VG:LVM中的物理的磁盘分区，也就是PV，必须加入VG，可以将VG理解为一个仓库统一管理了几个大的硬盘，形成了一个统一虚拟的存储资源池。**

**LV：也就是从VG中划分的逻辑分区**

抽象模型如下：

![img](https://imgoss.xgss.net/picgo/1396124-20190601165928294-1553266916.png?aliyun)



## **操作实战**

通过在虚拟机的CentOS7上创建LVM ，使用LV，扩容LV，缩减LV实战来了解LVM及熟悉对LVM的操作。
准备工作准备虚拟机，操作系统为CentOS7，初始20G的硬盘

![img](https://imgoss.xgss.net/picgo/1396124-20190601170451147-405766727.png?aliyun)

初始状态共20G的系统盘

![img](https://imgoss.xgss.net/picgo/1396124-20190601170504353-431672372.png?aliyun)

在虚拟机中添加两块硬盘

![img](https://imgoss.xgss.net/picgo/1396124-20190601170518405-2089720913.png?aliyun)

启动虚拟机通过pvs命令查看物理卷的情况，目前只看到有虚拟机初始安装时有个pv为/dv/sda2 vg为centso的物理卷 大小为20G

![img](https://imgoss.xgss.net/picgo/1396124-20190601170606357-839522261.png?aliyun)

通过fdisk -l 可以看到新加的两个盘大小分别都是5G。我们将用这两个盘组成一个vg，进行lvm的管理。

![img](https://imgoss.xgss.net/picgo/1396124-20190601170623419-1297755460.png?aliyun)

 

## **一、创建LVM逻辑卷**

### 1.创建物理卷

将物理硬盘格式化成PV（物理卷） 使用的是pvcreate命令

```
(将/dev/sdc /dev/sdb两块硬盘创建为物理卷
# pvcreate /dev/sdb /dev/sdc
  Physical volume "/dev/sdb" successfully created.
  Physical volume "/dev/sdc" successfully created.

```

![img](https://imgoss.xgss.net/picgo/1396124-20190601170637319-1181243094.png?aliyun)

通过pvdisplay或pvs查看当前的pv信息，可以看到两块5G的物理卷已经成功创建

![img](https://imgoss.xgss.net/picgo/1396124-20190601170652392-1257168766.png?aliyun)

### 2.创建卷组

创建卷组（VG），并将PV加入到卷组中 通过vgcreate命令

```
# vgcreate vg /dev/sdb /dev/sdc
  Volume group "vg" successfully created
```

![img](https://imgoss.xgss.net/picgo/1396124-20190601170712133-834425915.png?aliyun)

 

通过vgdisplay或vgs命令查看vg的信息。看到vg已经创建好了，大小是两个pv的大大小也就是5G+5G，大概是10G的样子，这里显示9.99G

![img](https://imgoss.xgss.net/picgo/1396124-20190601170726223-981700782.png?aliyun)

### 3.创建逻辑卷

基于卷组（VG）创建逻辑卷(LV) 通过lvcreate命令

```
基于vg创建逻辑卷lv,名字为app,大小为2G

lvcreate -n app -L 2G vg

实际操作
# lvcreate -n app -L 5.99G vg
  Rounding up size to full physical extent 5.99 GiB
  Logical volume "app" created.
```



![img](https://imgoss.xgss.net/picgo/1396124-20190601170746953-126139460.png?aliyun)



用lvdisplay或lvs命令查看创建好的逻辑卷。可以看到名字为app的逻辑卷lv已经创建好了，它是基于vg创建的，大小为2G

![img](https://imgoss.xgss.net/picgo/1396124-20190601170806181-1063593962.png?aliyun)

到这里，lv就创建好了，但是要用起来，还得格式化并挂载到我们的文件系统。

 

## **二、格式化并使用逻辑卷**

### 1、格式化

```
用ext4的格式格式化/dev/vg/app
mkfs -t ext4 /dev/vg/app
```



![img](https://imgoss.xgss.net/picgo/1396124-20190601170820187-1248306054.png?aliyun)

### 2、挂载

创建挂载点 

```
mkdir /app
将/dev/vg/app 挂载到/app
mount /dev/vg/app /app
然后df -h 可以看到已经挂载到/app下了 ，大小为lv 的大小2G

```



![img](https://imgoss.xgss.net/picgo/1396124-20190601170836430-1740669584.png?aliyun)

cd /app 
touch test.txt 在/app下创建一个测试文件test.txt，可以看到该挂载点是可以用了。

![img](https://imgoss.xgss.net/picgo/1396124-20190601170850492-1132204194.png?aliyun)

### 设置开机加载

```
echo "/dev/vg/app /app ext4 defaults 0 0" >>/etc/fstab
```

 

## **三、扩容逻辑卷**

这里扩容分两种情况，一种情况是vg还有足够的空间，那么就可以直接扩lv就可以了。另外一种情况是要扩的空间已经超过了vg的大小，那么就可以通过加物理磁盘扩充到vg里，然后再扩lv。

## 第一种情况，扩的空间大小在vg的容量范围之内

![img](https://imgoss.xgss.net/picgo/1396124-20190601170939580-473653975.png?aliyun)

现在vg的大小为10G，现在/app是2G，计划扩到8G，没有超过vg的大小那么可以直接扩lv就可以了。

### 第一步：首先卸载设备和挂载点的关联

```
umount /app
```



### 第二步：将逻辑卷/dev/vg/app 扩展到8G

```
lvextend -L 8G /dev/vg/app 可以清楚的看到vg/app从2G扩容到了8G
```



![img](https://imgoss.xgss.net/picgo/1396124-20190601171021944-1443534424.png?aliyun)

### 第三步：检查硬盘（lv）完整性，并重置硬盘(lv)容量



```
e2fsck -f /dev/vg/app 检查硬盘完整性
```

![img](https://imgoss.xgss.net/picgo/1396124-20190601171035805-584336635.png?aliyun)

### 重置硬盘(lv)容量

```
resize2fs /dev/vg/app
```

重置硬盘(lv)容量，这一步必需要做，否则即使扩了容量，但看到的还是扩容之前的容量。

![img](https://imgoss.xgss.net/picgo/1396124-20190601171046968-1317198665.png?aliyun)

### 第四步：重新挂载硬盘并查看

mount -a
df -h 可以看到/app已经成功扩容到8G了

![img](https://imgoss.xgss.net/picgo/1396124-20190601171109220-1035471638.png?aliyun)

ls 查看/app里面的文件还在，说明扩容对文件数据没有啥影响。

![img](https://imgoss.xgss.net/picgo/1396124-20190601171125948-1608087508.png?aliyun)

如果扩容的大小超过了vg的大小怎么办呢？可以通过扩硬件的方式，加块硬盘到vg然后再扩lv。

## 第二种情况，扩容的大小超过了vg的大小

现在vg的大小为10G，现在/app是8G，计划扩到11G，已经没有超过vg的10G大小那么就需要先加硬盘，然后扩vg，再扩lv。

### 第一步：添加硬盘

![img](https://imgoss.xgss.net/picgo/1396124-20190601171141001-1267761058.png?aliyun)

通过fdisk -l命令查看添加

![img](https://imgoss.xgss.net/picgo/1396124-20190601171157022-402728269.png?aliyun)

### 第二步：扩容vg 将新的硬盘扩到vg卷组里

```
卸载/app
umount /app
vgextend vg /dev/sdd 将新添加的硬盘/dev/sdd添加到vg卷组里
```

![img](https://imgoss.xgss.net/picgo/1396124-20190601171213348-1139255019.png?aliyun)

### 第三步：扩容lv 将逻辑卷/dev/vg/app 扩展到11G

```
lvextend -L 11G /dev/vg/app 
可以看到vg/app从原来的8G扩到了11G
```

![img](https://imgoss.xgss.net/picgo/1396124-20190601171228048-408850075.png?aliyun)

### 第四步：同样检查硬盘（lv）完整性，并重置硬盘(lv)容量

```
e2fsck -f /dev/vg/app 检查硬盘完整性
resize2fs /dev/vg/app 重置硬盘(lv)容量
```

![img](https://imgoss.xgss.net/picgo/1396124-20190601171244868-2035379631.png?aliyun)

### 第五步：重新挂载硬盘并查看

```
mount -a
df -h 可以看到/app已经成功扩容到11G了
```

![img](https://imgoss.xgss.net/picgo/1396124-20190601171312411-685967299.png?aliyun)

## **四、缩小逻辑卷**

相对于逻辑卷扩容，缩小逻辑卷，数据丢失的风险更大。所以在生产环境中操作一定要注意提前备份好数据。在对LVM逻辑卷进行缩小操作之前，先把要缩小的文件系统卸载并检查文件系统的完整性。
现在我们将/app由现在的11G缩到10G

### 第一步：卸载/app并检查文件系统完整性

![img](https://imgoss.xgss.net/picgo/1396124-20190601171326406-2106056956.png?aliyun)

### 第二步：把逻辑卷缩容到10G

```
resize2fs /dev/vg/app 10G
lvreduce -L 10G /dev/vg/app
```

![img](https://imgoss.xgss.net/picgo/1396124-20190601171351131-338691468.png?aliyun)

### 第三步：重新挂载并查看状态

![img](https://imgoss.xgss.net/picgo/1396124-20190601171409861-1455302126.png?aliyun)

通过LVM的管理，创建、扩容、缩容，可以看到通过LVM技术可以实现系统存储空间的动态的调整。

基本原理是将多个物理硬盘创建成pv(物理卷)，这些物理卷是动态调整的物理基础，通过vg将pv管理起来形成一个整体的资源池。在vg中划分lv来动态调整逻辑卷的大小。



https://www.cnblogs.com/xiejava/p/10960284.html