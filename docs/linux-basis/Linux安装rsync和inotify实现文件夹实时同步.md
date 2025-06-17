---
title: Linux安装rsync和inotify实现文件夹实时同步
createTime: 2025/05/27 17:51:17
permalink: /article/ht0jpafl/
---
# Linux安装rsync和inotify实现文件夹实时同步



## 需求说明

在web服务器中，作为代码发布机A，文件同步到服务器B,C,D等集群中，可以忽略某个文件和目录。

A服务器：内网IP: 192.168.1.2

B服务器：内网IP： 192.168.1.3

A和B的www用户，或者root用户免密登录。

![rsyncheinotify](https://imgoss.xgss.net/picgo/rsyncheinotify.jpg?aliyun)

## rsync介绍

rsync是linux系统下的数据镜像备份工具。使用快速增量备份工具Remote Sync可以远程同步，支持本地复制，或者与其他SSH、rsync主机同步。

## inotify介绍

inotify是一种强大的、细粒度的、异步的文件系统事件监控机制，linux内核从2.6.13起，加入了inotify支持，通过inotify可以监控文件系统中添加、删除，修改、移动等各种细微事件，利用这个内核接口，第三方软件就可以监控文件系统下文件的各种变化情况，而inotify-tools就是这样的一个第三方软件。

## 1.安装rsync

A和B都做

```
yum -y install xinetd
yum -y install rsync

chkconfig  rsync  on

service xinetd restart
systemctl restart xinetd
```



A上操作：

```
rsync -av root@192.168.1.3:/rsynctest/1.txt /root
```



B上操作

```
rsync -av /rsynctest/2.txt root@192.168.1.2:/root
rsync -av -e "ssh -p 22" /rsynctest/2.txt root@192.168.1.2:/root 		【如果ssh的开启的端口不是22 则用-e指定ssh端口】
```



## 2.安装 inotify

只在A上操作即可。

```
安装inotify-tools
yum install inotify-tools -y

也可以安装包
wget http://js.地址funet8地址.com/centos_software/inotify-tools-3.14.tar.gz
tar -zxvf inotify-tools-3.14.tar.gz 
cd inotify-tools-3.14
./configure
make 
make install

inotifywait -m /root	【查看inotify-tools是否运行正常】


新开一个终端：
[root@localhost ~]# cd /root
[root@localhost ~]# touch bb.txt

```



监控到

```
# inotifywait -m /root
Setting up watches.
Watches established.
/root/ OPEN .bash_profile
/root/ ACCESS .bash_profile
/root/ CLOSE_NOWRITE,CLOSE .bash_profile
/root/ OPEN .bashrc
/root/ ACCESS .bashrc
/root/ CLOSE_NOWRITE,CLOSE .bashrc
/root/ CREATE bb.txt
/root/ OPEN bb.txt
/root/ ATTRIB bb.txt
/root/ CLOSE_WRITE,CLOSE bb.txt
```



## 网站实时同步脚本

test.sh 为要运行网站实时同步脚本
其中定义了要同步的网站的路径，要同步到的ip地址，哪些后缀名的文件忽略监控，同步的用户名，同步的文件列表，哪些文件不需要同步。

```
cat test.sh
#!/bin/sh
SRC=/data/wwwroot/web/test/ #代码发布服务器目录
DST=/data/wwwroot/web/test/ #目标服务器目录

IP="192.168.1.3 192.168.1.4" # 这里可以用hostname，多个主机用空格
USER=www
inotifywait -mrq $SRC -e modify,delete,create,close_write,attrib  | while read D E F  
        do  
                for i in $IP
                do
                        #排除后缀名和目录
                        /usr/bin/rsync -e 'ssh -p 60920' \
                        -ahqzt --exclude "*.swp" \
                        --exclude "*.svn" \
                        --exclude "test/" \
                        --exclude "runtime/" \
                        --delete $SRC $USER@$i:$DST
                done
        done
```



运行：

```
增加权限：
chmod +x test.sh

后台运行：
nohup ./test.sh > nohup_test 2>&1 &

生成一个文件才能触发文件同步
touch /data/wwwroot/web/test/test_rsync_`date +%Y%m%d-%H:%M:%S`.html

删除测试文件
rm -rf /data/wwwroot/web/test/test_rsync*.html

测试文件是否同步
```






