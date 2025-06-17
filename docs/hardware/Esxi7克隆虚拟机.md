---
title: Esxi7克隆虚拟机
createTime: 2025/05/27 17:51:17
permalink: /article/zyc2wbtw/
---
# Esxi7克隆虚拟机



## 启用SSH

在ESXI7.0中，SSH默认是关闭的，需要手动开启。

![image-20230926142955750](https://imgoss.xgss.net/picgo/image-20230926142955750.png?aliyun)



## 搜索被克隆虚拟机所在目录

SSH连入ESXI系统
我需要克隆的虚拟机叫 centos7_ip5

```
find / -name centos7_ip5
/vmfs/volumes/6511daff-b2d1a74e-6e49-e051d810d817/centos7_ip5
```



## 创建虚拟机目录与复制vmx文件

需要创建新的虚拟机目录，我的新虚拟机名为 centos7_ip15
创建目录后复制被克隆虚拟机的vmx文件到新的虚拟机目录下

```
cd /vmfs/volumes/6511daff-b2d1a74e-6e49-e051d810d817/


mkdir centos7_ip16
cp centos7_ip5/centos7_ip5.vmx centos7_ip16/centos7_ip16.vmx
```



## 克隆vmdk文件

```
vmkfstools -i centos7_ip5/centos7_ip5.vmdk centos7_ip16/centos7_ip16.vmdk
```



## 编辑vmx文件

进入新的虚拟机目录，编辑vmx文件，将旧虚拟机的名称全部替换为新的虚拟机名称
这里是将centos7_ip5 替换为 centos7_ip16
建议使用vim或者vi编辑，使用命令进行批量替换文本，保存并退出



```
cd centos7_ip16

vi centos7_ip16.vmx

:%s/centos7_ip5/centos7_ip16/g

:wq
```



## 在ESXI中导入虚拟机

创建虚拟机，选择”注册现有虚拟机”

![img](https://imgoss.xgss.net/picgo/0068693791f79a6dcdc0463dd5d640dc.png?aliyun)

点击按钮选择虚拟机文件

![image-20230926144006102](https://imgoss.xgss.net/picgo/image-20230926144006102.png?aliyun)

选择刚刚新建的虚拟机目录与编辑好的vmx文件

![image-20230926144109208](https://imgoss.xgss.net/picgo/image-20230926144109208.png?aliyun)

## 启动虚拟机

启动导入好的虚拟机，成功进入系统

![image-20230926144847202](https://imgoss.xgss.net/picgo/image-20230926144847202.png?aliyun)

拷贝一个文件

```
cp centos7_ip16.vmdk centos7_ip16-000001.vmdk
```

## 再次启动电源

![image-20230926145145792](https://imgoss.xgss.net/picgo/image-20230926145145792.png?aliyun)

可以进入系统