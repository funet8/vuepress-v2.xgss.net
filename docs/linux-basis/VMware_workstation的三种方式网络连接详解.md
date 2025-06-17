---
title: VMware_workstation的三种方式网络连接详解
createTime: 2025/05/27 17:51:17
permalink: /article/6oivv558/
---
# VMware workstation的三种方式网络连接详解



安装完VMware workstation之后，网络连接里会多出两个虚拟网卡: VMware Network Adapter VMnet1和VMware Network Adapter VMnet8. 虚拟机里安装的系统就是靠这两个虚拟网卡来联网的. VMnet1是host-only联网需要的虚拟网卡，VMnet8是NAT联网需要的虚拟网卡。

![img](https://imgoss.xgss.net/picgo/wps1543.tmp.png?aliyun) 



## 一.桥接方式（Bridged）：

在桥接方式下，VMware模拟一个虚拟的网卡给客户系统，主系统对于客户系统来说相当于是一个桥接器。客户系统好像是有自己的网卡一样，自己直接连上网络，也就是说客户系统对于外部直接可见。

![img](https://imgoss.xgss.net/picgo/wps1544.tmp.png?aliyun) 



简单地说，虚拟主机和物理主机在同一个网段，就相当于局域网里多出来了一台电脑在上网，而这台电脑就是虚拟机里的系统。物理主机和虚拟主机的IP处于同一网段，DNS和网关是一样的，这样就实现了物理主机和虚拟主机，虚拟主机和外网的相互通信。

配置如下：

### 1.先查看物理主机的ip信息

开始—>运行（cmd）

```
ipconfig/all
```



 ![img](https://imgoss.xgss.net/picgo/wps1555.tmp.jpg?aliyun)

### 2.进入虚拟机配置：

在虚拟机的菜单栏VM—>settings，选择Network Adapter,选中Bridged(桥接)

![img](https://imgoss.xgss.net/picgo/wps1556.tmp.png?aliyun) 

 

### 3.进入虚拟机操作系统进行网络配置，

IP地址与物理主机不同但在同一网段，DNS,子网掩码和默认网关与物理主机相同,这样就可以联网了。

注意：这种方式中，要确保物理主机的网卡配置中，选中了VMware Bridge Protocol协议，否则会有警告信息。

![img](https://imgoss.xgss.net/picgo/wps1557.tmp.jpg?aliyun) 



## 二.网络地址转换方式（NAT）：

在这种方式下，客户系统不能自己连接网络，而必须通过主系统对所有进出网络的客户系统收发的数据包做地址转换。在这种方式下，客户系统对于外部不可见。

![img](https://imgoss.xgss.net/picgo/wps1558.tmp.png?aliyun) 

物理主机中的虚拟的网卡VMware Network Adapter VMnet8，相当于连接到内网的网卡，而虚拟机本身则相当于运行在内网上的机器，物理网卡相当于连接到外网的网卡。在这种方式下，vmware自带的dhcp会默认地加载到vmnet8上，这样虚拟主机就可以使用dhcp服务。更为重要的是，vmware自带了nat服务，提供了从vmnet8到外网（物理网卡）的地址转换，所以这种情况是一个实实在在的nat服务器在运行，只不过NAT是供虚拟机用的。因此，物理主机中的VMware workstation的NAT服务必须打开。



### 1.打开虚拟机的菜单 -->VM -->settings,设置如下图：

![img](https://imgoss.xgss.net/picgo/wps1559.tmp.png?aliyun) 

按下OK，联网方式从Bridged改为NAT了。

## 2.配置过程

### 2.1自动配置

**物理主机两块虚拟网卡VMnet1和VMnet8的IP地址一般也是在虚拟机安装好之后自动分配的，不同的物理主机可能不一样。**

默认情况下，只要物理主机中的VMware workstation的NAT和DHCP服务正常开启，VMnet8会自动获取IP地址。192.168.X.1。

虚拟主机内的网卡也设置为自动获取IP地址，可以获取与VMnet8在同一网段的IP地址192.168.X.128-254，网关一般为192.168.X.2，VMnet8和虚拟主机的网卡DNS都不用设置，即可实现NAT方式下虚拟机上网。

### 2.2手动配置

由于NAT是通过VMnet8进行联网的，在配置之前要查看VMnet8的IP信息：

![img](https://imgoss.xgss.net/picgo/wps155A.tmp.jpg?aliyun) 

点击菜单上的Editàvirtual Network Editorà点击NAT，如图

![img](https://imgoss.xgss.net/picgo/wps156A.tmp.jpg?aliyun) 

点击NAT Settings

![img](https://imgoss.xgss.net/picgo/wps156B.tmp.jpg?aliyun) 



注意其中的Gateway IP，它是虚拟主机的默认网关，一般是在虚拟机安装好之后自动分配的，在这里默认网关是192.168.149.2。

既然知道了默认网关之后就可以配置虚拟主机的IP了：

![img](https://imgoss.xgss.net/picgo/wps156C.tmp.jpg?aliyun) 

DNS设置为实际的DNS服务器地址。

注意：这种方式下，只要主机能上网，虚拟机就可以访问Internet，但是主机和Internet都不能访问虚拟机。



## 三.Host-Only联网方式

与NAT唯一的不同的是，此种方式下，没有地址转换服务，因此，默认情况下，虚拟机只能到主机访问而不能访问Internet，这也是hostonly的名字的意义。

默认情况下，DHCP服务加载到vmnet1上。这样连接到vmnet1上的虚拟机仍然可以设置成dhcp，方便系统的配置。

 

在这种方式下，如果要让虚拟主机连接到外网，这种方式更为灵活，可以使用自己的方式，从而达到最理想的配置，例如：

1.使用自己dhcp的服务：首先停掉vmware自带的dhcp服务，使dhcp服务更为统一。

2.使用自己的nat,方便加入防火墙。windows host可以做nat的方法很多，简单的如windows xp的internet共享，复杂的如windows server里的nat服务。

 

下面介绍使用Windows的Internet连接共享，使虚拟主机可以上网的方法。

默认使用VMnet1，如果是通过交换机或路由器拨号上网的可以通过共享本地连接上网；如果你是通过物理主机直接拨号上网的（通过宽带连接上网），你就可以通过共享宽带连接来共享上网。

下面给出的是本地连接共享连接上网的方式，宽带连接共享上网与其操作差不多.

![img](https://imgoss.xgss.net/picgo/wps156D.tmp.png?aliyun) 



打开物理主机的网络连接：

 ![img](https://imgoss.xgss.net/picgo/wps156E.tmp.png?aliyun)

右击本地连接à属性—>高级—>选择Internet连接共享àVMware Network Adapter VMnet1：

![img](https://imgoss.xgss.net/picgo/wps156F.tmp.jpg?aliyun) 

点击“确定“

 

在本地连接的图标上面出现了共享连接的标志，如图：

![img](https://imgoss.xgss.net/picgo/wps1570.tmp.jpg?aliyun) 

​	接下来，查看VMware Network Adapter VMnet1的IP信息：

![img](https://imgoss.xgss.net/picgo/wps1581.tmp.jpg?aliyun) 

进入虚拟主机操作系统，把虚拟主机内的网卡的IP设成与VMware Network Adapter VMnet1在同一个网段，网关为VMware Network Adapter VMnet1的IP，如下图：

![img](https://imgoss.xgss.net/picgo/wps1582.tmp.jpg?aliyun) 

配置完成，测试网络的连通性，虚拟主机就可以通过共享物理网卡的Internet连接上网了。