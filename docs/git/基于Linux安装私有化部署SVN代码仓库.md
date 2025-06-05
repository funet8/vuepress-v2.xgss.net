# 基于Linux安装私有化部署SVN代码仓库



SVN作为新一代代码版本管理工具，有很多优点，管理方便，逻辑明确，安全性高，代码一致性高。SVN数据存储有两种方式，BDB（事务安全表类型）和FSFS（一种不需要数据库的存储系统），为了避免在服务器连接中断时锁住数据，FSFS是一种更安全也更多人使用的方式。SVN的运行方式也有两种，一种是独立服务器，另一种是借助apache服务，各有利弊，下面就介绍一下这两种方式各自的部署步骤。

![svn.webp](https://imgoss.xgss.net/picgo/svn.webp.jpg?aliyun)

## 1.安装subversion

```
[root@localhost ~]# yum -y  install  subversion
[root@localhost home]# mkdir -p /home/svn  				#创建svn目录
[root@localhost home]# chmod -R 777 /home/svn  			#修改目录权限为777
[root@localhost home]# svnadmin create /home/svn/repos    #创建一个svn版本仓库repos （repos 名字自己起）
[root@localhost home]# cd /home/svn/repos/conf   		    #进入repos版本仓库下的配置文件目录
```





## 2.设置开机启动文件

```
1.编辑/etc/rc.local：

[root@localhost ~]# vi /etc/rc.local
文件内容如下（在touch /var/lock/subsys/local下面添加一行）

#添加：
svnserve    -d  -r  /home/svn
```



## 3.启动SVN服务

1.启动svn服务，svn服务默认端口为3690，可以使用“netstat -netpl”命令查看服务启动是否成功：

```
[root@localhost ~]# #svnserve  -d  -r  /home/svn
```

2.添加防火墙规则，或者关闭防火墙

```
[root@localhost ~]# vi /etc/sysconfig/iptables
添加以下内容：
-A INPUT -m state --state NEW -m tcp -p tcp --dport 3690 -j ACCEPT
保存后重启防火墙
[root@localhost ~]# service iptables restart
```


svnadmin create /home/svn/gamebox 
svnadmin create /home/svn/sdk

将打包过来的文件覆盖。

如果已经有svn在运行，可以换一个端口运行

```
# svnserve -d -r /home/svn/repos –listen-port 3391
```




这样同一台服务器可以运行多个svnserve

停止svn

```
# killall svnserve    //停止
# svnserve -d -r /home/svn/repos // 启动
```



2.启动成功后就可以使用了
a.建议采用TortoiseSVN， 连接地址为: svn://your server address （如果指定端口需要添加端口  :端口号



## 备份

备份svn项目：

```
svnadmin dump /home/svn/gamebox/ > /home/svnbak/gamebox20160525


```



恢复：

```
svnadmin load /home/svn/gamebox/ < /home/svnbak/gamebox20160525
```



将原先服务器的配置文件备份后复制到新服务器中

```
#/opt/svn/iitshare/conf目录下
authz、passwd、svnserve.conf文件

新建项目：
svnadmin create /home/svn/webgame


修改配置：

[root@zck password]# killall svnserve    //停止
[root@zck password]# svnserve -d -r /home/svn // 启动

svn地址：
svn://192.168.1.9/sdk
```

参考：
http://www.linuxidc.com/Linux/2014-01/95640.htm
http://www.jb51.net/os/RedHat/73031.html

