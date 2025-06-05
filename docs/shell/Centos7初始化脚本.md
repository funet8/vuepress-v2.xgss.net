# Centos7初始化脚本



## 初始化脚本

进入centos7系统，使用脚本

```
# wget https://gitee.com/funet8/centos6_LANP_dockerfile/raw/master/shell/CentOS7.x_system_init_shell_mini.sh

修改hostname和端口
HOSTNAME="node2"
SSH_PROT="60920"

执行脚本：
# sh CentOS7.x_system_init_shell_mini.sh

功能介绍：
# 1、先ping百度域名，看能否解析域名、修改主机名和ssh端口
# 主要功能:
#	1.修改主机名
#   2.安装wget、tar、lrzsz等常用工具
#   3.将默认源换为阿里云
#   4.安装常用类库
#   5.rc.local添加执行权限
#   6.安装 net-tools
#   7.增加第三方资源库
#   8.关闭SELINUX
#   9.设置UTF-8
#   10.系统时间设置和定时任务
#   11.修改主机SSH端口
#   12.删除MySQL、shell历史记录
#   13.隐藏服务器系统信息
#   14.优化Linux内核参数
#   15. CentOS系统优化【/etc/profile】
#   16.关闭系统自带firewalld防火墙，安装iptables
#   17.安装yum-fastestmirror
#   18.重建缓存、系统升级
#   19.重启系统
```



![centos7-chushihua](https://imgoss.xgss.net/picgo/centos7-chushihua.jpg?aliyun)

## 最简单的系统初始化命令

如果不运行上面的脚本。

### 1.安装上传下载软件

```
yum install -y lrzsz
```

### 2.修改主机名

```
hostnamectl set-hostname web-name
```



### 3.允许ssh端口60920-iptables

```
iptables -A INPUT -p tcp --dport 60920 -j ACCEPT
service iptables save
systemctl restart iptables.service
```

### 4.允许ssh端口60920-firewall

```
firewall-cmd --zone=public --add-port=60920/tcp --permanent
firewall-cmd --reload
```



### 5.修改SSH端口

```
sed -i "s/#Port 22/ListenAddress 0.0.0.0:60920/" /etc/ssh/sshd_config
systemctl restart sshd
```

### 6.允许ip转发功能

视具体服务器功能而定。

```
echo 'net.ipv4.ip_forward=1' >> /etc/sysctl.conf
sysctl -p
```



## 挂载硬盘

```
# fdisk -l
# fdisk /dev/vdb
...
Command (m for help): n
Select (default p): p
Command (m for help): wq
格式化：
# mkfs.ext4 /dev/vdb1

echo '/dev/vdb1 /home ext4 defaults 0 0' >> /etc/fstab
# mount -a
```



## 新建常用目录

```
wget https://gitee.com/funet8/centos6_LANP_dockerfile/raw/master/shell/create_dir.sh
sh create_dir.sh
```

新建目录作用介绍

````
# /data/wwwroot/web  作用：存放WEB应用程序
# /data/wwwroot/log  作用：存放WEB日志
# /data/wwwroot/mysql_log 作用：存放MYSQL日志
# /home/data/wwwroot/log/other/ 作用：存放VSFTP日志
# /data/conf 作用：存放应用程序配置文件
# /data/conf/sites-available 作用：存放nginx站点配置文件
# /data/conf/shell 作用：存放shell脚本
# /home/data/backup 作用：存放备份文件
# /home/data/software 作用：存放安装软件目录
# /home/data/wwwroot/nginx_old_log/ 作用：存放Nginx切割日志
````



