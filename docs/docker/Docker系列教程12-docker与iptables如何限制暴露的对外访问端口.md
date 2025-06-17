---
title: Docker系列教程12-docker与iptables如何限制暴露的对外访问端口
createTime: 2025/05/27 17:51:17
permalink: /article/yjtr2a98/
---
# docker与iptables如何限制暴露的对外访问端口



docker 会在iptables上加上自己的转发规则，如果直接在input链上限制端口是没有效果的。这就需要限制docker的转发链上的DOCKER表。



## 查询docker表

查询DOCKER表并显示规则编号

```
iptables -L DOCKER -n --line-number
```



## 修改iptables规则

修改对应编号的iptables 规则，这里添加了允许访问ip的限制

```
iptables -R DOCKER 5 -p tcp -m tcp -s 192.168.1.0/24 --dport 3000 -j ACCEPT
```



## 禁止某个网段访问

在Chain DOCKER 中增加配置，禁止192.168.1.0/24网段的访问可按照如下配置

```
iptables -I DOCKER -s 192.168.1.0/24 -j DROP
```



想要阻止容器172.18.0.2，它的端口是7053

```
iptables -I FORWARD -p tcp -d 172.18.0.2 --dport 7053 -j DROP
```



## 阻止9200端口访问

```
iptables -I DOCKER 1 -p tcp --dport 9200 -j DROP
```



只允许192.168.1.1访问docker的服务，其中ext_if是你机器上的实际网卡名

```
iptables -I DOCKER-USER -i ext_if ! -s 192.168.1.1 -j DROP
```

## 只允许网段192.168.1.0/24

```
iptables -I DOCKER-USER -i ext_if ! -s 192.168.1.0/24 -j DROP
```



## 只允许ip范围

```
iptables -I DOCKER-USER -m iprange -i ext_if ! --src-range 192.168.1.1-192.168.1.3 -j DROP
```



Docker加入自定义iptables规则链（新建一个链加在FORWARD中进行处理）
https://www.cnblogs.com/jiftle/p/13821394.html



PS : 这位同学整理了iptables的详细文档，非常详细，推荐阅读。
https://www.kancloud.cn/jiftle/iptables-detailed-introduction/1972252



iptables禁用docker暴露的端口（在nat表的DOCKER链中处理）
https://blog.csdn.net/u010544187/article/details/86698201



```
#我的eth1是外网网卡 eth0是内网网卡
#由于DOCKER-USER链上原本有一条RETURN规则，因此这里使用-I做插入
 
#提供访问的是外网ip，所以在eth1上做策略，不是白名单的就DROP
iptables -I DOCKER-USER -i eth1 ! -s 白名单ip -j DROP
 
#eth0对应的内网ip不开放，不允许访问
iptables -I DOCKER-USER -i eth0 -j DROP
 
#由于外网网卡提供业务，而业务回包也是从外网网卡走的，因此需要增加连接状态，如果是回包的话也允许通过
iptables -I DOCKER-USER -i eth1 -p tcp -m state --state RELATED,ESTABLISHED -j ACCEPT
 
#这样做的优点是
#1、符合官方文档，只操作DOCKER-USER链，相对优雅
#2、不用处理复杂的SNAT或DNAT规则
#缺点是：
#1、需要手动识别网卡，或者额外写一段bash识别不同机器的外网网卡。
#2、需要在iptables、docker启动之后，额外执行以上三句iptables
```

