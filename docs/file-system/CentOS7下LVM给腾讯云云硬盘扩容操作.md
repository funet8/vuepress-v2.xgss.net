

# CentOS7下LVM给腾讯云云硬盘扩容操作



腾讯云安装ELK后，100G的硬盘不够用了，再购买了500G的硬盘想组成600G，客服居然说不可以，难道腾讯云做了限制了？试试用lvm来给100G的硬盘扩容到600G

![](https://imgoss.xgss.net/picgo/image-20211202093956343.png?aliyun)

实测扩容是可以的

![image-20211202160901943](https://imgoss.xgss.net/picgo/image-20211202160901943.png?aliyun)

## 查看硬盘是否购买

```
# fdisk -l

Disk /dev/vda: 53.7 GB, 53687091200 bytes, 104857600 sectors
..

   Device Boot      Start         End      Blocks   Id  System
/dev/vda1   *        2048   104857566    52427759+  83  Linux

Disk /dev/vdb: 107.4 GB, 107374182400 bytes, 209715200 sectors
...

   Device Boot      Start         End      Blocks   Id  System
/dev/vdb1            2048   209715199   104856576   83  Linux

Disk /dev/vdc: 536.9 GB, 536870912000 bytes, 1048576000 sectors
...
```



## 创建物理卷

```
# pvcreate /dev/vdb /dev/vdc

  Device /dev/vdb excluded by a filter.
  Physical volume "/dev/vdc" successfully created.
  报错，由于 /dev/vdb 以前用过。 使用 parted 修复
```

导致问题的原因是添加的磁盘是在另一个虚拟机中新建的，已经有了分区表，现在的虚拟机并不能识别磁盘的分区表，运行parted命令重做分区表，中途需要输入三次命令。  

```
# parted /dev/vdb

GNU Parted 3.1
Using /dev/vdb
Welcome to GNU Parted! Type 'help' to view a list of commands.
(parted)                                                                  
(parted) mklabel msdos
Warning: The existing disk label on /dev/vdb will be destroyed and all data on this disk will be lost. Do
you want to continue?
Yes/No? yes                                                               
(parted) quit                                                             
Information: You may need to update /etc/fstab.
```



再次运行pvcreate，问是否擦除dos签名，输入y，就可以将磁盘创建为PV了。

```
# pvcreate /dev/vdb /dev/vdc                     
WARNING: dos signature detected on /dev/vdb at offset 510. Wipe it? [y/n]: y
  Wiping dos signature on /dev/vdb.
  Physical volume "/dev/vdb" successfully created.
  Physical volume "/dev/vdc" successfully created.
```



## 创建卷组

```
# vgcreate vg /dev/vdb /dev/vdc

  Volume group "vg" successfully created

# vgs

  VG #PV #LV #SN Attr   VSize   VFree  
  vg   2   0   0 wz--n- 599.99g 599.99g
```



# 创建逻辑卷

基于vg创建逻辑卷lv,名字为app

```
# lvcreate -n app -L 599.99G vg
  Rounding up size to full physical extent 599.99 GiB
  Logical volume "app" created.
```



## 格式化和挂载

```
用ext4的格式格式化/dev/vg/app
mkfs -t ext4 /dev/vg/app

mount /dev/vg/app /home

echo "/dev/vg/app /data ext4 defaults 0 0" >>/etc/fstab
mount -a

df -h |grep vg
/dev/mapper/vg-app  591G  6.1G  555G   2% /home/data

```

