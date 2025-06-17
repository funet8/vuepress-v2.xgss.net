---
title: Mini小主机All-in-one搭建教程5-安装centos7系统
createTime: 2025/05/27 17:51:17
permalink: /article/mey1umru/
---
# Mini小主机All-in-one搭建教程5-安装centos7系统

# 下载centos7

去官网下载centos7系统，下载有点慢

清华大学下载站： https://mirrors.tuna.tsinghua.edu.cn/centos/7.9.2009/isos/x86_64/



![allinone05](https://imgoss.xgss.net/picgo/allinone05.jpg?aliyun)

# 上传镜像

数据存储浏览器--上载

![image-20230921171138735](https://imgoss.xgss.net/picgo/image-20230921171138735.png?aliyun)

上传刚才下载的centos7系统

# 安装centos7

## 1.创建/注册虚拟机

![image-20230921161850660](https://imgoss.xgss.net/picgo/image-20230921161850660.png?aliyun)



## 2.选择存储

![image-20230921161928316](https://imgoss.xgss.net/picgo/image-20230921161928316.png?aliyun)

下一页

## 3.自定义设置

![image-20230921162023278](https://imgoss.xgss.net/picgo/image-20230921162023278.png?aliyun)

不要忘记在CD的位置选择刚才上传的centos7镜像文件。

![image-20230921171917680](https://imgoss.xgss.net/picgo/image-20230921171917680.png?aliyun)



## 4.打开电源安装系统

![image-20230921172120314](https://imgoss.xgss.net/picgo/image-20230921172120314.png?aliyun)

## 修改IP地址

```
vi  /etc/sysconfig/network-scripts/ifcfg-eth0
或者
vi /etc/sysconfig/network-scripts/ifcfg-ens192

TYPE="Ethernet"
#BOOTPROTO="dhcp" # 把DHCP改成 static
BOOTPROTO="static"

IPADDR=192.168.1.15  # 固定的内网IP
NETMASK=255.255.255.0
GATEWAY=192.168.1.1   #网关
DNS1=114.114.114.114
DNS2=223.5.5.5
```





