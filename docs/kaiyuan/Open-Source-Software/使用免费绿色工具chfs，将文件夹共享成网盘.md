---
title: 使用免费绿色工具chfs，将文件夹共享成网盘
createTime: 2025/05/27 17:51:17
permalink: /article/8g8z6pl0/
---
# 使用免费绿色工具chfs，将文件夹共享成网盘

需求：

业务需求方有个需要将apk包上传到服务器中，通过chfs可以将服务器目录共享出来，可以可以登录后台自行上传apk文件包。

本文就教大家三个知识点

1.centos7下使用chfs，共享目录。

2.使用shell脚本，后台运行chfs

3.脚本使用脚本监控chfs是否运行，如果没有运行则重启脚本。

4.使用nginx反向代理（不使用IP地址）。

![chfs-wangpang](https://imgoss.xgss.net/picgo/chfs-wangpang.jpg?aliyun)

## 什么是chfs

官网： http://iscute.cn/chfs


CuteHttpFileServer/chfs是一个免费的、HTTP协议的文件共享服务器，使用浏览器可以快速访问。它具有以下特点：

*   单个文件，核心功能无需其他文件
*   跨平台运行，支持主流平台：Windows，Linux和Mac
*   界面简洁，简单易用
*   支持扫码下载和手机端访问，手机与电脑之间共享文件非常方便
*   支持账户权限控制和地址过滤
*   支持快速分享文字片段
*   支持webdav协议

与其他常用文件共享方式（如FTP，飞秋，网盘，自己建站）相比，具有使用简单，适用场景更多的优点，在个人使用以及共享给他人的场景中非常方便快捷。



## 一、linux下安装部署

### 系统说明

系统：centos7
配置：2C2G+100G
IP：192.168.1.4
软件： nginx1.16+php5.6

### 下载并解压

下载对应的chfs工具：http://iscute.cn/tar/chfs/2.0/

```
cd /data/wwwroot/web/
mkdir chfs && cd chfs
wget http://iscute.cn/tar/chfs/2.0/chfs-linux-amd64-2.0.zip
备用下载：http:// js.funet8.com/centos_software/chfs-linux-amd64-2.0.zip
unzip chfs-linux-amd64-2.0.zip
chmod +x chfs
```



### 防火墙开启端口

根据实际端口开启9000端口，修改你自己的端口防火墙

```
iptables：
iptables -A INPUT -p tcp --dport 9000 -j ACCEPT
service iptables save 
systemctl restart iptables

firewall：
firewall-cmd --zone=public --add-port=9000/tcp --permanent # 开放 9000 端口
firewall-cmd --reload                                      # 重启firewall

```



### 启动命令

```
只允许本机访问：
# ./chfs --port=9000 \
--path="/data/wwwroot/web/" \
--allow="127.0.0.1,192.168.1.164" \
--rule="::|admin:123456:rwd|user01:123456:rwd|user02:123456:r"

```



### 浏览器访问： ip+端口

http://192.168.1.4:9000

![image-20220531173109212](https://imgoss.xgss.net/picgo/image-20220531173109212.png?aliyun)



非192.168.1.164或者 127.0.0.1 客户端访问则是Forbidden



## 二、使用shell脚本，后台运行chfs

```
# vi /data/wwwroot/web/chfs/chfs_start.sh
填写以下：
#!/bin/bash

### 启动chfs
cd /data/wwwroot/web/chfs/
./chfs  --port=9000 \
--path="/data/wwwroot/web/apk_download/" \
--allow="127.0.0.1,192.168.1.164" \
--rule="::|admin:123456:rwd|user01:123456:rwd|user02:123456:r"

### 使用：
# chmod +x /data/wwwroot/web/chfs/chfs_start.sh
# nohup /data/wwwroot/web/chfs/chfs_start.sh &
```



## 三、监控脚本

脚本使用脚本监控chfs是否运行，如果没有运行则重启脚本

将脚本定时任务中，每隔5分钟检测一次进程，chfs_start，如果没有检测到，则启动。

```
vi /data/wwwroot/web/chfs/jiankong_app.sh
填写以下：

#!/bin/bash

#sh的文件名不要有grep的关键字
###########################################################
# vi /data/wwwroot/web/chfs/jiankong_app.sh
# chmod +x /data/wwwroot/web/chfs/jiankong_app.sh
# crontab 定时 
# echo '*/5 * * * * www /data/wwwroot/web/chfs/jiankong_app.sh' >> /etc/crontab 
# systemctl restart crond

LogFile="/data/wwwroot/web/chfs/jiankong_app.log"

process_pid=`ps -aux|grep -v 'grep'|grep -c 'chfs_start'`

#echo "$process_pid"
#关键字的个数，可以使用 grep -c
if [ $process_pid -eq 0 ]
then
	cd /data/wwwroot/web/chfs/
	nohup  /data/wwwroot/web/chfs/chfs_start.sh &
	now=`date  +%Y-%m-%d[%H:%M:%S]`
	echo "at $now restart chfs" >> $LogFile
	
fi
```





## 四、nginx反向代理

nginx的配置如下：

```
upstream chfs_web {
                keepalive      4000;
                server  127.0.0.1:9000 max_fails=3  fail_timeout=30s;
        }
server  {
		listen          80;
		server_name     tool-chfs.XXX.com;
		access_log          /data/wwwroot/log/tool-chfs.XXX.com-access.log main_aliyun;
		error_log           /dev/null;
		location / {		
			client_max_body_size 1000m;
			proxy_pass              http://chfs_web;
			proxy_http_version 1.1;
			proxy_set_header Connection "";
			proxy_set_header        X-Real-IP  $remote_addr;
			proxy_set_header        Host             $host;
			proxy_set_header        X-Forwarded-For  $proxy_add_x_forwarded_for;                
	}
}

#nginx报错：client intended to send too large body: 29826117 bytes
#解决方法：  client_max_body_size 1000m;
```

client_max_body_size，如果上传文件很大则，则需要修改client_max_body_size的值。






### 官方常用命令

```
//都使用默认参数，共享目录为程序运行目录，监听端口号为80
chfs

//共享目录为D盘，监听端口号为8080
chfs --path="d:/" --port=8080

//共享目录为"d:\\projects"和"e:\\nsis"，监听端口号为80
chfs --path="d:\\projects|e:\\nsis"

//白名单模式，允许192.168.1.2-192.168.1.100以及192.168.1.200进行访问
chfs --allow="192.168.1.2-192.168.1.100,192.168.1.200"

//黑名单模式，禁止192.168.1.2-192.168.1.100以及192.168.1.200进行访问
chfs --allow="not(192.168.1.2-192.168.1.100,192.168.1.200)"

//匿名用户具有只读权限（默认情况下匿名用户具有读写权限）
//账户ceshizu，密码为ceshizu123，对根目录的权限为只读，但对test目录具有读写权限
//账户yanfazu，密码为yanfazu123，对根目录的权限为只读，但对yanfa目录具有读写权限
chfs --rule="::r|ceshizu:ceshizu123:r:test:rw|yanfazu:yanfazu123:r:yanfa:rw"

//匿名用户什么权限都没有（默认情况下匿名用户具有读写权限）
//账户admin，密码为admin123，具有读写权限
//账户zhangsan，密码为zhangsan123，对根目录的权限为不可读写，但对zhangsanfiles目录具有读写权限
chfs --rule="::|admin:admin123:rw|zhangsan:zhangsan123::zhangsanfiles:rw"

//通过配置文件进行配置，该文件可以不存在，待以后需要更改配置时使用
chfs --file="d:\chfs\chfs.ini"

```



