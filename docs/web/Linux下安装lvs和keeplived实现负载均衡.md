# Linux下安装lvs和keeplived实现负载均衡



## 前言

在生产工作中，后端服务器并不可能永远都处于正常运行状态，若服务器发生宕机，为了不影响正在进行的业务以及给用户更好的体验，我们可以通过keepalived监控后台服务器运行情况，当有服务器发生故障时，会从把该服务器剔除出LVS转发策略；等到服务器恢复正常后，keepalived也会重新把该服务器加入LVS转发策略中。

![lvskeepalived](https://imgoss.xgss.net/picgo/lvskeepalived.png?aliyun)

## 系统介绍

```
虚拟VIP：192.168.1.231

ip地址：192.168.1.244	【mac地址：00:16:3E:98:07:E8 ，以下简称D1】

ip地址：192.168.1.233  【mac地址：00:16:3E:3B:60:AA，以下简称D1】

系统： centos6
```

![keepalived](https://imgoss.xgss.net/picgo/keepalived.png?aliyun)



## 安装部署

### 安装keepalived

```
D1,D2服务器都要安装keepalived
cd /data/software/
rz 上传文件keepalived-1.2.13.tar.gz
# tar -zvxf keepalived-1.2.13.tar.gz 
# cd keepalived-1.2.13
# ./configure --sysconf=/data/conf/ --prefix=/data/apps/keepalived/ 

\# 如果报错!!! 

OpenSSL is not properly installed on your system. !!! 

则执行： 

# yum -y install openssl-devel
```



```
make
make install

安装完成
ln -s /data/apps/keepalived/sbin/keepalived /sbin/keepalived
cp /home/data/conf/rc.d/init.d/keepalived  /etc/rc.d/init.d/
cp /home/data/conf/sysconfig/keepalived /etc/sysconfig/
mkdir /etc/keepalived
cp /home/data/conf/keepalived/keepalived.conf /data/conf/
ln -s /data/conf/keepalived.conf  /etc/keepalived/keepalived.conf
rm -rf  /data/conf/keepalived /data/conf/rc.d /data/conf/sysconfig			
echo "1" >/proc/sys/net/ipv4/ip_forward				# 开启路由功能
```

 

### 安装ipvs

D1,D2服务器都要安装

检查kernel是否已经支持LVS的IPVS模块

```
modprobe -l | grep ipvs
```



![img](https://imgoss.xgss.net/picgo/wps344F.tmp.jpg?aliyun) 



如果有类似上面的输出则说明内核已经支持

安装ipvs

```
yum -y install ipvsadm

ipvsadm --help  (看到参数信息则说明安装成功)
```



![img](https://imgoss.xgss.net/picgo/wps3450.tmp.jpg?aliyun) 

 

### 防火墙规则

```
iptables -F -t mangle		# 清空mangle中的规则

iptables -t mangle -I PREROUTING -d 192.168.1.231 -p tcp -m tcp --dport 80 -m mac ! --mac-source 00:16:3E:3B:60:AA -j MARK --set-mark 1	【192.168.1.244服务器配置】

iptables -t mangle -I PREROUTING -d 192.168.1.231 -p tcp -m tcp --dport 80 -m mac ! --mac-source 00:16:3E:98:07:E8 -j MARK --set-mark 1	【192.168.1.233服务器配置】

 

\# 目标ip地址是192.168.1.231并且目标端口为80的数据标记为1（排除另外一台lvs调度器 所以是排除另外一台调度器的mac地址 两台lvs的set-mark 值不同 并且规则中都排除对端的mac地址）

service iptables save
```





![img](https://imgoss.xgss.net/picgo/wps3451.tmp.jpg?aliyun) 

 

### 配置keepalived

```
vi /etc/keepalived/keepalived.conf 

修改配置信息参考：

192.168.1.244的配置：

! Configuration File for keepalived

global_defs {
	notification_email {
		linmaogan@gmail.com # 故障通知邮件地址，可以多个地址
		liuxing007xing@163.com
	}
	notification_email_from linmaogan@163.com # 故障发送人
	smtp_server smtp.163.com # 由163.com发送邮件
	smtp_connect_timeout 30

	#运行Keepalived服务器的一个标识
	#发邮件时显示在邮件标题中的信息
	router_id LVS_BACKUP  #BACKUP上修改为LVS_BACKUP，网上资料说这个值也需要修改，具体不详，之前我们线上的主备就一直是一样的 ^ ^还是修改一下吧！
}

# 监测ipvsadm进程状态，每3秒执行一次
vrrp_script chk_ipvsadm{
    script "/data/conf/shell/chk_ipvsadm.sh"
    interval 3
    weight 3
}

vrrp_instance VI_1 {
    state MASTER
    interface em1		【修改对应的网卡或eth0】
    virtual_router_id 51
    priority 100
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass PZFKD2wSUJ3swnPN
    }
    virtual_ipaddress {
        192.168.1.231
    }
}

virtual_server fwmark 80 {
    delay_loop 6
    lb_algo wlc
    lb_kind DR
    persistence_timeout 1
    nat_mask 255.255.255.0   #网络掩码
	persistence_timeout 50 
	protocol TCP
    real_server 192.168.1.244 80 {
        weight 5
        TCP_CHECK {
            connect_timeout 3
            nb_get_retry 3
            delay_before_retry 3
			connect_port 80                #健康检查端口连接端口
        }
    }
	real_server 192.168.1.233 80 {
        weight 5
        TCP_CHECK {
            connect_timeout 3
            nb_get_retry 3
            delay_before_retry 3
			connect_port 80                #健康检查端口连接端口
        }
    }
}
```



192.168.1.233的配置：

```
! Configuration File for keepalived

global_defs {
	notification_email {
		linmaogan@gmail.com # 故障通知邮件地址，可以多个地址
		liuxing007xing@163.com
	}
	notification_email_from linmaogan@163.com # 故障发送人
	smtp_server smtp.163.com # 由163.com发送邮件
	smtp_connect_timeout 30

	#运行Keepalived服务器的一个标识
	#发邮件时显示在邮件标题中的信息
	router_id LVS_BACKUP  #BACKUP上修改为LVS_BACKUP，网上资料说这个值也需要修改，具体不详，之前我们线上的主备就一直是一样的 ^ ^还是修改一下吧！
}

# 监测ipvsadm进程状态，每3秒执行一次
vrrp_script chk_ipvsadm{
    script "/data/conf/shell/chk_ipvsadm.sh"
    interval 3
    weight 3
}

vrrp_instance VI_1 {
    state BACKUP
    interface em1			【修改对应的网卡或eth0】
    virtual_router_id 51
    priority 80
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass PZFKD2wSUJ3swnPN
    }
    virtual_ipaddress {
        192.168.1.231
    }
}

virtual_server fwmark 80 {
    delay_loop 6
    lb_algo wlc
    lb_kind DR
    persistence_timeout 1
    nat_mask 255.255.255.0   #网络掩码
	persistence_timeout 50 
	protocol TCP
    real_server 192.168.1.244 80 {
        weight 5
        TCP_CHECK {
            connect_timeout 3
            nb_get_retry 3
            delay_before_retry 3
			connect_port 80                #健康检查端口连接端口
        }
    }
	real_server 192.168.1.233 80 {
        weight 5
        TCP_CHECK {
            connect_timeout 3
            nb_get_retry 3
            delay_before_retry 3
			connect_port 80                #健康检查端口连接端口
        }
    }
}
```



D2上配值和D1基本相同只是state MASTER改成state BACKUP,priority 100 改成 priority 80

### 配置ipvs

```
vi /data/conf/shell/chk_ipvsadm.sh

插入配置信息
#!/bin/bash
# 定时查看ipvsadm是否存在，如果不存在则启动ipvsadm，
# 如果启动失败，则停止keepalived
status=$(ps aux|grep ipvsadm | grep -v grep | grep -v bash | wc -l)
if [ "${status}" = "0" ]; then
	service ipvsadm start
	status2=$(ps aux|grep ipvsadm | grep -v grep | grep -v bash |wc -l)
	if [ "${status2}" = "0"  ]; then
	/etc/init.d/keepalived stop
	 fi
fi
```

 

 

### Real_Server上的配置

在LVS的DR模式下，用户的访问请求到达Real Server 后，是直接返回给用户的，不再经过前端的Director Server,因此，需要在每个Real server节点上增加虚拟的VIP地址，这样数据才能直接返回给用户

```
chmod 777 /etc/rc.d/init.d/functions 

vi /etc/init.d/lvsrs
#!/bin/bash
#把以下内容保存成:lvsrs
#并放置在/etc/init.d目录下
#如果想启动LVS Server执行:/etc/init.d/lvsrs start
#如果想停止LVS Server执行:/etc/init.d/lvsrs stop
VIP=192.168.1.231  #虚拟IP，视具体情况而变
. /etc/rc.d/init.d/functions   # 如果提示权限不够，那么先在命令行执行: chmod 777 /etc/rc.d/init.d/functions

case "$1" in
start)
	ifconfig lo:0 $VIP netmask 255.255.255.255 broadcast $VIP
	/sbin/route add -host $VIP dev lo:0
	echo "1" >/proc/sys/net/ipv4/conf/lo/arp_ignore
	echo "2" >/proc/sys/net/ipv4/conf/lo/arp_announce
	echo "1" >/proc/sys/net/ipv4/conf/all/arp_ignore
	echo "2" >/proc/sys/net/ipv4/conf/all/arp_announce
	sysctl -p >/dev/null 2>&1
	echo "RealServer Start OK"
	;;
stop)
	ifconfig lo:0 down
	route del $VIP >/dev/null 2>&1
	echo "0" >/proc/sys/net/ipv4/conf/lo/arp_ignore
	echo "0" >/proc/sys/net/ipv4/conf/lo/arp_announce
	echo "0" >/proc/sys/net/ipv4/conf/all/arp_ignore
	echo "0" >/proc/sys/net/ipv4/conf/all/arp_announce
	echo "RealServer Stoped"
	;;
	*)
	echo "Usage: $0 {start|stop}"
	exit 1
esac
exit 0
```



```
chmod 755 /etc/init.d/lvsrs

service lvsrs start
```



### 管理lvs

以下D1,D2上都执行

1）启动lvs调度器

```
service keepalived start							# 开启路由功能
echo "1" >/proc/sys/net/ipv4/ip_forward
```





 

2） 关闭lvs调度器

```
service keepalived stop
echo "0" >/proc/sys/net/ipv4/ip_forward
```



### 添加开机启动

```
chkconfig --add keepalived
chkconfig keepalived on

vi /etc/rc.d/rc.local
/etc/init.d/lvsrs start  # 添加这一行到末尾
```



ip a 查询

![img](https://imgoss.xgss.net/picgo/wps3467.tmp.jpg?aliyun) 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 