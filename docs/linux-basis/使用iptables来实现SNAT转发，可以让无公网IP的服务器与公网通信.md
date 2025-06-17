---
title: 使用iptables来实现SNAT转发，可以让无公网IP的服务器与公网通信
createTime: 2025/05/27 17:51:17
permalink: /article/twlgwye5/
---
# linux服务器局域网通过一台iptables计算机桥接上网



## 需求实现

最近上了两天mysql服务器，没有分配公网ip，所以无法访问公网的一些资源。但是里面有些服务需要公网才能实现。

这是需求：其实功能使用iptables来实现SNAT转发，可以让无公网IP的服务器与公网通信

服务器A，双网卡

```
系统： centos
IP:192.168.20.178
IP2:XX.XX.XX.XXX
```

服务器B，单网卡

```
IP:192.168.20.200

要实现B通过A上公网
```



## 在A上操作
### 1.开启其转发功能

```
# vi /etc/sysctl.conf
开启转发
net.ipv4.ip_forward=1
# echo 1 > /proc/sys/net/ipv4/ip_forward
#sysctl -p（使之立即生效）
```
### 2.对iptables进行规制的设置

```
iptables -F     #清除掉之前所有的iptables规则（生产环境谨慎使用）
iptables -P INPUT ACCEPT        #允许接收数据包
iptables -P FORWARD ACCEPT      #允许发送数据包
```
```
iptables -t nat -A POSTROUTING -s 192.168.20.0/24 -o em1 -j MASQUERADE      #在有外部IP的网口上做NAT
service iptables save
service iptables restart
service iptables status
```
### 3.重启网络

```
/etc/init.d/network restart
```


## 在服务器B上操作

```
# vi /etc/sysconfig/network-scripts/ifcfg-em2
修改：
GATEWAY=192.168.20.178
DNS1=114.114.114.114
重启网络：
# service network restart
```
再ping www.baidu.com 看能否ping通

## 走过的坑

1.在执行第二步“对iptables进行规制的设置”设置的时候，由于原服务器有iptables的规则，不能直接iptables -F
就在/etc/sysconfig/iptables 跟本地对照记录。
删除了“-A FORWARD -j REJECT --reject-with icmp-host-prohibited ”这条记录，而找到原因的时候是在本地搭建好了，
先在本地的虚拟机实现了该功能，同样的iptables记录可以

2.B服务器还要配置一个DNS



参考：
https://blog.csdn.net/hbhswxy2007/article/details/48462959
https://blog.csdn.net/hiccupzhu/article/details/51073557