---
title: 如何查看Centos用户登陆记录
createTime: 2025/05/27 17:51:17
permalink: /article/adukop1z/
---
# 如何查看Centos用户登陆记录

首先简单介绍一下Centos中记录登陆信息的日志

 有关当前登录用户的信息记录在文件utmp中；登录进入和退出纪录在文件wtmp中；最后一次登录文件可以用lastlog命令察看。
 数据交换、关机和重起也记录在wtmp文件中。所有的纪录都包含时间戳。

 每次有一个用户登录时，login程序在文件lastlog中察看用户的UID。如果找到了，则把用户上次登录、退出时间和主机名写到标准输出中，然后login程序在lastlog中纪录新的登录时间。
 在新的lastlog纪录写入后，utmp文件打开并插入用户的utmp纪录。该纪录一直用到用户登录退出时删除。utmp文件被各种命令文件使用，包括who、w、users和finger。
 下一步，login程序打开文件wtmp附加用户的utmp纪录。当用户登录退出时，具有更新时间戳的同一utmp纪录附加到文件中。wtmp文件被程序last和ac使用。
 wtmp和utmp文件都是二进制文件，用户需要使用who、w、users、last和ac来使用这两个文件包含的信息。

下面来说如何查看Centos用户登陆日志

## who

who命令查询utmp文件并报告当前登录的每个用户。Who的缺省输出包括用户名、终端类型、登录日期及远程主机。例如：who（回车）显示

```
# who
root     pts/0        2022-05-24 11:43 (192.168.1.164)
root     pts/1        2022-05-24 11:43 (192.168.1.164)
```



## wtmp

如果指明了wtmp文件名，则who命令查询以前所有的登陆纪录。使用命令who /var/log/wtmp查看所有登陆记录，结果如下：

```
who /var/log/wtmp
```



## last

last命令往回搜索wtmp来显示自从文件第一次创建以来登录过的用户。例如：

```
last
root     pts/1        192.168.1.164    Tue May 24 11:43   still logged in   
root     pts/0        192.168.1.164    Tue May 24 11:43   still logged in   
root     pts/1        192.168.1.164    Tue May 24 11:37 - 11:43  (00:05)    
root     pts/1        192.168.1.164    Tue May 24 11:36 - 11:37  (00:00)    
root     pts/0        192.168.1.164    Tue May 24 11:35 - 11:43  (00:07)    
root     pts/0        192.168.1.164    Mon May 23 13:37 - 18:32  (04:54)    
root     pts/0        192.168.1.251    Wed May 13 14:59 - 12:54 (739+21:54) 
reboot   system boot  3.10.0-1127.el7. Wed May 13 14:56 - 13:33 (740+22:37) 
root     pts/1        192.168.1.251    Wed May 13 14:38 - down   (00:17)    
root     pts/0        192.168.1.251    Wed May 13 14:08 - down   (00:47)    
root     tty1                          Wed May 13 14:06 - 14:55  (00:49)    
reboot   system boot  3.10.0-957.1.3.e Wed May 13 13:57 - 14:55  (00:58)    
reboot   system boot  3.10.0-957.1.3.e Fri Dec 28 13:41 - 14:15  (00:33)    
root     pts/1        192.168.1.251    Fri Dec 28 11:32 - 13:39  (02:06)    
root     pts/0        192.168.1.251    Fri Dec 28 11:28 - crash  (02:13)    
reboot   system boot  3.10.0-957.1.3.e Fri Dec 28 11:28 - 14:15  (02:46)    
root     pts/1        192.168.1.251    Fri Dec 28 11:15 - crash  (00:12)    
root     pts/0        192.168.1.251    Fri Dec 28 11:01 - crash  (00:27)    
root     tty1                          Fri Dec 28 10:57 - 11:27  (00:30)    
reboot   system boot  3.10.0-514.el7.x Fri Dec 28 10:57 - 14:15  (03:17)    
```

 http://lxy.me/how-to-view-the-centos-user-login-records.html
