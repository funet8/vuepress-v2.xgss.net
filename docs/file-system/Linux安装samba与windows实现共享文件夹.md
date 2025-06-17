---
title: Linux安装samba与windows实现共享文件夹
createTime: 2025/05/27 17:51:17
permalink: /article/fc75rwde/
---
# Linux安装samba与windows实现共享文件夹

Linux与Linux间通过什么共享文件呢——NFS，Windows与Windows之间呢——共享文件功能，那Windows与Linux之间通过samba。

```
samba：只能在内网使用，类似于windows的网络邻居（文件共享服务）
```

samba两个守护进程：
smbd	【监听139端口，TCP端口】  负责用户验证和文件共享
nmbd	【监听137和138端口 UDP端口】	负责处理浏览共享和计算机名称解析

## 检查是否安装samba

```
rpm -qa|grep samba
```
否则，使用yum安装
```
# yum install samba
```

![linux-install-saba](https://imgoss.xgss.net/picgo/linux-install-saba.jpg?aliyun)

## 配置samba

```
# chkconfig smb on   
# chkconfig nmb on
/etc/init.d/smb start
```
Centos7
```
systemctl enable smb.service
systemctl enable nmb.service
systemctl start smb
```


## 新建smb用户用于访问Linux共享文件

```
# useradd smb       # 新建用户
# smbpasswd -a smb  # 修改密码

#smbpasswd -x smb  # 删除smb用户
```
此时/home目录会增加一个smb的用户。该Linux用户目录将可直接共享到Windows下。若要共享其它文件，按步骤3配置文件。如果不用了，删除smb用户也是可以的，

samba配置文件【/etc/samba/smb.conf】。

```
[tmp]
comment = Tmp Directories
path = /tmp                         # 共享的Linux目录
public = no                         # 目录不公开
writeable = yes                     # 可写
browseable = yes                    # 可读
valid users = smb                   # 访问用户，上面新建的，也可以使用原来已有的

复制去掉注释

分配权限
chown smb.smb -R /data2T/smb
或者：
chmod 777 -R /data2T/smb
```



## 让smaba通过防火墙

```
编辑 /etc/sysconfig/iptables 文件

-A INPUT -m state --state NEW -m tcp -p tcp --dport 139 -j ACCEPT
-A INPUT -m state --state NEW -m tcp -p tcp --dport 445 -j ACCEPT
-A INPUT -m state --state NEW -m udp -p udp --dport 137 -j ACCEPT
-A INPUT -m state --state NEW -m udp -p udp --dport 138 -j ACCEPT

```
重启防火墙
```
# /etc/rc.d/init.d/iptables restart

```

在Windows下使用Win+R开启运行窗口，输入

```
\\192.168.1.6
```
此时使用
```
# smbstatus
```

centos7

```
yum -y install samba samba-client
```

启动samba
```
systemctl start smb
systemctl status smb
```
设置开机自启动
```
# systemctl enable smb
Created symlink from /etc/systemd/system/multi-user.target.wants/smb.service to /usr/lib/systemd/system/smb.service.
```
## 新建smb用户用于访问Linux共享文件

```
# useradd smb       # 新建用户
# smbpasswd -a smb  # 修改密码

#smbpasswd -x smb  # 删除smb用户

```
创建需要共享的目录
```
mkdir -p /data/smb
chown smb.smb -R /data/smb
```
samba配置文件【/etc/samba/smb.conf】。

```
# cp /etc/samba/smb.conf /etc/samba/smb.conf_bak
[tmp]
comment = Tmp Directories
path = /tmp                         # 共享的Linux目录
public = no                         # 目录不公开
writeable = yes                     # 可写
browseable = yes                    # 可读
valid users = smb                   # 访问用户，上面新建的，也可以使用原来已有的

复制去掉注释

vi /etc/samba/smb.conf
复制以下内容：
[global]
	workgroup = MYGROUP
	server string = Samba Server Version %v
	log file = /var/log/samba/log.%m
	# max 50KB per log file, then rotate
	max log size = 50
	security = user
	passdb backend = tdbsam

#============================ Share Definitions ==============================
[beijing]
comment = Tmp Directories
path = /data/smb
public = no
writeable = yes
browseable = yes
valid users = smb

```
重启服务
```
systemctl restart smb
```


## 让smaba通过防火墙

```
vi /etc/sysconfig/iptables 

-A INPUT -m state --state NEW -m tcp -p tcp --dport 139 -j ACCEPT
-A INPUT -m state --state NEW -m tcp -p tcp --dport 445 -j ACCEPT
-A INPUT -m state --state NEW -m udp -p udp --dport 137 -j ACCEPT
-A INPUT -m state --state NEW -m udp -p udp --dport 138 -j ACCEPT

```
重启防火墙服务
```
systemctl restart iptables
```



### 阿里云服务器ECS的samba配置方法

https://blog.csdn.net/XHG1993/article/details/78872724
