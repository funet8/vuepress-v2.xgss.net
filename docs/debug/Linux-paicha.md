---
title: Linux-paicha
createTime: 2025/05/27 17:51:17
permalink: /article/16kqhbmj/
---
# Linux服务器故障排查基本方案

# 服务器架构

服务器系统为Centos7

首先需要知晓系统的对外的架构

一般架构： 

1.域名--->云服务器（ECS）

2.域名--->CDN--->云服务器（OSS）

3.域名--->CDN--->云服务器ECS+数据库RDS+缓存Redis

4.域名--->CDN--->负载均衡--->云服务器ECS+数据库RDS(主从)+缓存Redis

5.域名--->CDN-->WAF防火墙--->负载均衡--->云服务器ECS+数据库RDS(主从)+缓存Redis

再根据实际情况出现的问题，一步步排查。

![Linux-fwuqi-chakanliuchangsss](https://imgoss.xgss.net/picgo/Linux-fwuqi-chakanliuchangsss.jpg?aliyun)

# 发现问题

# 一、发现问题

首先发现问题，及时确定哪个服务出现问题，以便方便快速定位问题。查找对应的域名和设备



## Zabbix监控发钉钉告警

![img](https://imgoss.xgss.net/picgo/1614243525084-f79b25e3-c800-40c4-bb82-6945b2340386.png?aliyun) 

 

### 阿里云监控告警短信

```
【阿里云】尊敬的***,云监控-云数据库RDS版<华南1(深圳)-*****-只读>于<09:54>发生报警，CPU使用率（91.88>=80），持续时间4分钟
```

 

### 3.shell脚本邮件告警

![img](https://imgoss.xgss.net/picgo/1614243666883-c830f798-fbbd-413f-bdd4-d26a9333c56f.png?aliyun)



### 4.其他同事

客服、市场同事等钉钉、电话报告出现的问题

## 二、快速定位问题

 

### 网络带宽（CDN是否异常）

域名是否解析到源站

登录阿里云CDN后台查看相应流量

### 负载均衡

检查负载均衡是否正常运行，是否流量异常



### 应用层服务器

ECS服务器负载是否正常、cpu、内存负载是否过高，硬盘使用率是否达到100%等



### 缓存服务器

redis服务器负载是否正常、内存使用率如何



### 数据库服务器

数据库连接数是否正常

列出当前用户的所有连接信息； 

```
show full processlist; 
```

杀进程，时长消耗太长的sql进程

```
select concat('kill ', id, ';') from information_schema.processlist where command != 'Sleep' and time > 2*60 order by time desc; 
```

让将sql语句发给后端研发分析



## 远程连接服务器

# 问题：CPU高，负载高，访问慢（数据库正常）

## 系统层面

### 查看负载

查看负载、CPU、内存、上线时间、高资源进程

```
# top
安装： yum -y install htop
# htop 
```



查看top服务器负载，内存消耗，df -h查看硬盘

```plain
top
df 
```

![img](https://imgoss.xgss.net/picgo/1614243765194-e9717edb-39a8-410c-88e2-d8f1b3b2906f.png?aliyun)



### 查看nginx日志

如果有nginx日志，进入nginx日志目录

按照日志大小排列

判断日志访问、相应时长，url等

```
cd /data/wwwroot/log
ll -Srh
tail -f XXX.XXX.COM-access.log
分析日志，找出最多的IP日志、最多的URL等
GoAccess 、ELK后台查看日志
```

### 查看磁盘使用情况

```
df -h
```



### 查看磁盘当前情况

```
iostat -x -k 3 3
avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.70    0.00    2.25    0.41    0.00   93.64

Device:         rrqm/s   wrqm/s     r/s     w/s    rkB/s    wkB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
vda               0.01     0.83    0.30    1.48    11.34    12.13    26.30     0.01    6.15    7.41    5.89   0.24   0.04
vdb               0.00     0.17    0.02    0.28     0.08     2.75    19.15     0.00    3.22    2.01    3.29   0.26   0.01
vdc               0.10     0.84    3.09    0.56   105.22    20.57    68.94     0.02    7.96    3.29   33.74   1.33   0.49

如果发现当前磁盘忙碌，则查看是哪个 PID 在忙碌：
安装 yum install -y iotop
# iotop -o -P -k -d 5

```



### 查看对外服务和端口

```
# netstat -tunpl
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 0.0.0.0:62920           0.0.0.0:*               LISTEN      29177/vsftpd        
tcp        0      0 0.0.0.0:8080            0.0.0.0:*               LISTEN      4393/httpd      
tcp        0      0 0.0.0.0:7300            0.0.0.0:*               LISTEN      4697/php-fpm: maste 
```



### 查看 PID 具体在

```
安装  yum install lsof

lsof -p PID
lsof -p 29177
lsof -p 4697 
```



### 查看系统日志

```
tail -400f /var/log/messages
tail -f /var/log/messages
tail -n100 /var/log/messages
head -n100 /var/log/messages
```



### 查看简化线程树

```
pstree -a >> /root/pstree.log
```



## 网络问题

### ping域名

```
ping www.XXX.com
```



### 查看网络节点情况

```
安装： yum install -y  traceroute

traceroute www.baidu.com
```

# 问题：CPU 低，负载高，访问慢（数据库）

## 判断的数据库

### 1.慢查询

检查慢查询日志，可能是慢查询引起负载高，根据配置文件查看存放位置：log_slow_queries

### 2.是否有系统瓶颈

升级系统cpu、内存、硬盘，

优化架构增加主从，一主多从等。

### 3.sleep连接是否过多

```
show full processlist;
```

### 4.查看最大连接数

```
查看设置的最大连接数
show variables like 'max_connections';
重新设置最大连接数
set GLOBAL max_connections=300
```



# Nginx防护基本命令

如果有一些异常访问，可以加入配合阿里云的WAF。

### 访问最多真实用户的IP

```plain
cat www.XXXX.com-access.log |awk '{print $5}'| awk -F":" '{print $NF}' |sort|uniq -c|sort -nr|head -10
```



### 查看访问排行前10的url

```plain
cat  www.XXX.com-access.log | awk '{print $10}' | sort | uniq -c | sort -nr | head -n 10
```



### 执行时间最长10条

```plain
cat  www.XXX.com-access.log | sort -nr | head -n 10
```



### 查看http_referer来路：

```plain
cat www.XXX.com-access.log | awk -F"from:" '{print $NF}' |sort|uniq -c|sort -nr|head -10
```

封IP，查看特定的referer来源地址

### 服务器防火墙封ip

封IP段

```plain
/sbin/iptables -I INPUT -s 61.37.80.0/24 -j DROP
#屏蔽单个IP的命令是
 deny 123.45.6.7
 #封整个段即从123.0.0.1到123.255.255.254的命令
 deny 123.0.0.0/8
```



### 禁止特定用户代理（User Agents）访问  

```plain
if ($http_user_agent ~* (wget|curl|Firefox) ) {
return 404;
}
```

### 特定的地址攻击做跳转

```plain
rewrite ^/accounts/\+\$str\+ http://127.0.0.1/ redirect;
```

### 根据 user_agent 控制客户端访问

```plain
location / {
       if ($http_user_agent ~ 'bingbot/2.0|MJ12bot/v1.4.2|Spider/3.0|YoudaoBot|Tomato|Gecko/20100315'){
                return 403;
                }
       }
```



###  图片防盗链

```plain
valid_referers none blocked *.XXX.com server_names ~\.google\. ~\.baidu\.;
                if ($invalid_referer) {
                        # return 403;
                        rewrite ^/ http://www.XXX.com/daoling.png;
                }
```

 

### 不允许host为localhost访问

```plain
if ($host = 'localhost') {
                return 403;
       }
```



### 不允许agent为空

```plain
if ($http_user_agent ~ ^$){
                return 403;
       }
```



### 不允许绑定host主机访问

```plain
if ($http_x_forwarded_for ~ ^$){
                return 402;
       }
```







