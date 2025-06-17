---
title: Ubuntu修改IP地址
createTime: 2025/05/27 17:51:17
permalink: /article/5y1399t4/
---
# Ubuntu修改IP地址



## 方法一：通过命令行

对于静态IP地址的配置，一般会直接修改对应网络接口的配置文件，例如/etc/network/interfaces（对于非NetworkManager管理的网络接口）或/etc/netplan/*.yaml（对于使用Netplan管理的较新版本Ubuntu）

```
vi /etc/netplan/01-netcfg.yaml  

或者：
sudo ifconfig eth0 <新IP地址> netmask <子网掩码>
例如：
sudo ifconfig eth0 192.168.150.129 netmask 255.255.255.0
```

设置一个静态IP

```
network:
  version: 2
  renderer: networkd
  ethernets:
    ens33: # 替换为实际的网络接口名称，如eno1, enp0s3等
      dhcp4: no
      addresses:
        - 192.168.150.129/24 # 设置静态IP地址和子网掩码
      gateway4: 192.168.1.1   # 设置默认网关
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4] # 设置DNS服务器（可选）
```

保存退出,应用新的配置

```
netplan apply
```



## 方法二：通过图形界面



1.打开“设置”应用程序。

2.点击“网络”图标，找到对应的网络接口（通常是Wired或Wi-Fi）。

3.选择“有线/Wi-Fi”设置，并点击“选项”或“编辑”按钮进入详细设置页面。

4.在IP配置部分，选择“手动”并填写IP地址、子网掩码、网关和DNS服务器等信息。

5.点击“保存”或“应用”以更新设置。
