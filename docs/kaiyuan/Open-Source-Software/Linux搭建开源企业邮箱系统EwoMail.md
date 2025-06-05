# Linux搭建开源企业邮箱系统EwoMail



## EwoMail是什么

EwoMail是基于Linux的开源邮件服务器软件，集成了众多优秀稳定的组件，是一个快速部署、简单高效、多语言、安全稳定的邮件解决方案，帮助你提升运维效率，降低 IT 成本，兼容主流的邮件客户端，同时支持电脑和手机邮件客户端。



## 项目文档

开源项目：https://gitee.com/laowu5/EwoMail

官方文档：http://doc.ewomail.com/docs/ewomail/jianjie



## 服务器环境（腾讯云）

前期准备，需要域名，国内需要备案

```
需求centos7/8 64位系统
172.21.0.15（内）
49.232.171.74（公网）
centos7+1核+1G+40G
```

![email-EwoMail](https://imgoss.xgss.net/picgo/email-EwoMail.jpg?aliyun)

# 系统初始化

适当运行脚本

```
新建常用文件路径
wget https://raw.githubusercontent.com/funet8/centos6_LANP_dockerfile/master/shell/create_dir.sh

初始化系统脚本
wget https://raw.githubusercontent.com/funet8/centos6_LANP_dockerfile/master/shell/CentOS7.x_system_init_shell_mini.sh
重新登陆服务器要改端口 60920
```



# 腾讯云解封25端口

https://cloud.tencent.com/document/product/213/40436

# 新建SWAP分区

```
#内存为32G以上则不考虑 
#内存在16G至32G之间，交换分区配置为8G
#内存在4G至16G之间，交换分区配置为4G 
#内存小于4G的则配置交换分区为2G 

安装前
# free -m
              total        used        free      shared  buff/cache   available
Mem:            991         164          73           0         752         683
Swap:             0           0           0


# wget https://gitee.com/funet8/centos6_LANP_dockerfile/raw/master/shell/aliyun_swap.sh
修改 size_block 变量
# sh aliyun_swap.sh

安装后
# free -m
              total        used        free      shared  buff/cache   available
Mem:            991         162          61           0         767         686
Swap:          2047           0        2047
```



# 安装ewomail开源版

## git安装 （centos7/8）

```
yum -y install git
cd /root
git clone https://gitee.com/laowu5/EwoMail.git
cd /root/EwoMail/install
#需要输入一个邮箱域名，不需要前缀，列如下面的 your-domain.com
sh ./start.sh your-domain.com

# firewall-cmd --zone=public --add-port=60920/tcp --permanent
```



## 遇到的登陆不了ssh的问题

由于初始脚本中使用的是iptables的策略，而ewomail开源策略使用的是firewall-cmd导致无法登陆。

```
开放ssh端口：
# firewall-cmd --zone=public --add-port=60920/tcp --permanent
重启防火墙：
# firewall-cmd --reload
# iptables -nL
```





## 访问地址（将IP更换成你服务器IP即可）

邮箱管理后台：[http://49.232.171.74:8010](http://49.232.171.74:8010/) （默认账号admin，密码ewomail123）

web邮件系统：[http://49.232.171.74:8000](http://49.232.171.74:8000/)

phpmyadmin：[http://49.232.171.74:8020/](http://49.232.171.74:8020/)

# 常规配置（视情况操作）

http://doc.ewomail.com/docs/ewomail/changguipeizhi

## 修改密码

登陆：http://IP:8010 ， 点击”个人资料”进行修改。

## 修改资料

修改后台标题，备案资料，语言种类等等。。

## webmail修改端口

nginx 配置文件 /ewomail/nginx/conf/vhost/rainloop.conf

```
vi /ewomail/nginx/conf/vhost/rainloop.conf
将8000改为80
```



## SSL证书

不需要

```
操作的时候请备份要替换的配置文件

webmail的https
复制/ewomail/nginx/conf/vhost/rainloop.conf.ssl 替换rainloop.conf

1、系统自带了本地SSL证书，imap,smtp,nginx都会使用它，你可以默认也使用，安装的时候根据你的域名生成。
2、使用互联网经过认证的证书，将你申请生成的nginx证书替换以下2个文件

公匙 /etc/ssl/certs/dovecot.pem
私匙 /etc/ssl/private/dovecot.pem

如果你使用默认本地证书，就不用进行替换，复制文件替换后就可以了。

最后执行命令重启
service nginx restart
systemctl restart postfix dovecot
```



## mysql优化配置

1.06版本默认mysql是针对1G内存以下进行优化的，如果你服务器内存大于1G，请以下操作

将 /ewomail/mysql/etc/my-huge.cnf 替换 /ewomail/mysql/etc/my.cnf

重启mysql

```
service mysqld restart
```



## mysql数据库

```
忘记管理员

如果忘记管理员密码，需要进入数据库修改。

查看数据库密码

进入服务器执行命令：cat /ewomail/config.ini

# cat /ewomail/config.ini
domain：your-domain.com
mysql-root-password：ybXkgm7T944sO***** （星号处理）
mysql-ewomail-password：wIm9Hb9Yi******

打开http://IP:8020 （ewomail默认安装了phpmyadmin，为了安全，可以关闭或更换端口）
打开ewomail数据库，找到i_admin表，将password改为3bb3733de472b226208307ec1e689347
这样就可以把密码改回ewomail123，重新使用默认账号和密码登录即可。

```

# 域名解析-重要

http://doc.ewomail.com/docs/ewomail/domain_dns

![img](https://imgoss.xgss.net/picgo/m_a8f7fce25341e4034b536b9554aab6d1_r.png?aliyun)

遇到问题 @的txt记录跟cname记录冲突，所以删除cname记录

根据DNS解析协议标准，当TXT与CNAME同时存在会触发CNAME的排他性标准，导致DNS会解析错乱。因为TXT一般为验证性解析，如果您是需要利用TXT进行相关验证的话可以先做TXT解析记录，等到TXT解析记录验证成功了再进行CNAME添加。

# DKIM设置（防垃圾邮件）

DKIM是电子邮件验证标准，域名密钥识别邮件标准，主要是用来防止被判定为垃圾邮件。

http://doc.ewomail.com/docs/ewomail/dkim

每个域名都需要添加一个dkim的key，EwoMail默认安装后已自动添加主域名dkim，只需要设置好dkim的dns即可。

## 获取dkim key

```
centos7/8
# amavisd -c /etc/amavisd/amavisd.conf showkeys
; key#1 1024 bits, i=dkim, d=your-domain.com, /ewomail/dkim/mail.pem
dkim._domainkey.your-domain.com.     3600 TXT (
  "v=DKIM1; p="
  "XXXXXXX")
```



复制输出的信息，打开http://www.ewomail.com/list-20.html 整理dkim信息

整理完成后会在“整理显示区域”显示解析记录，接下来设置域名解析即可完成。

```
域名：your-domain.com	
记录类型： TXT
主机记录：dkim._domainkey
记录值：
v=DKIM1;p=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

# 自定义访问路径

如果在apache修改了后台管理或webmail的访问路径，需要修改PHP配置文件才能正常使用webmail。

```
vi /ewomail/www/ewomail-admin/core/config.php

<?php
//配置文件
return [
    'dbhost' => 'localhost',//数据库连接地址
    'dbuser' => 'ewomail',//数据库账号
    'dbpw' => 'wIm9Hb9YiP3lMxVF',
    'dbname' => 'ewomail',//数据库名称
    'dbcharset' => 'utf8',//数据库编码
    'dbprefix'=> 'i_',//数据库表的前缀
    'code_key' => '22jCVkIiArtSEpYe',
    'url' => 'http://mail.your-domain.com:8010',
    'webmail_url' => 'http://mail.your-domain.com:8000',
    'maildir'=>'/ewomail/mail',//邮件存放目录，邮件安装后请不要修改
    'home_default' =>'Center',//默认项目
    'home_allow' => ['Center','Api'],//允许项目
    'module_default' =>'Index',//默认模块
    'action_default' =>'index',//默认控制器
    'prefix'=>'ewomail_',//网站通用前缀，包括session,cookie

];
```



# 降低内存占用

正式环境不用操作。

```
vim /etc/amavisd/amavisd.conf

#在文件尾部加上该行参数
@bypass_virus_checks_maps = (1);

#最后按下esc键，输入:wq保存

#修改文件（参考上面的例子操作命令修改）
vim /usr/lib/systemd/system/amavisd.service
在 Wants=clamd@amavisd.service 前面加上#符号
#保存文件

systemctl daemon-reload
systemctl stop clamd@amavisd
systemctl disable clamd@amavisd
systemctl restart amavisd
```





# 网易邮箱大师客户端配置

![image-20210409160203025](http://imgoss.xgss.net/picgo/image-20210409160203025.png?aliyunoss)



# 挂载NFS

正式环境操作，考虑到附件可能会很大，如果单独购买云硬盘是不够的，购买NFS或者使用共享存储。这里生成环境购买nfs，挂载到 /ewomail。

## 关闭服务

```
service php-fpm stop
service nginx stop
service mysqld stop
systemctl stop postfix dovecot amavisd

mv /ewomail /ewomail_bak
mkdir /ewomail

yum -y install nfs-utils

执行以下命令，提高同时发起的NFS请求数量：
echo "options sunrpc tcp_slot_table_entries=128" >>  /etc/modprobe.d/sunrpc.conf
echo "options sunrpc tcp_max_slot_table_entries=128" >>  /etc/modprobe.d/sunrpc.conf

# mkdir /aliyun_nfs
# chown 777 -R /aliyun_nfs
# mount -t nfs -o vers=3,nolock,proto=tcp,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport xxxxxxxxxxxxxxx:/ /aliyun_nfs

# mkdir -p /aliyun_nfs/ewomail/

# mount -t nfs -o vers=3,nolock,proto=tcp,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport xxxxxxxxxxxxxxx:/ewomail /ewomail

# df -h |grep aliyun


service php-fpm start
service nginx start
service mysqld start
systemctl start postfix dovecot amavisd


```



# 数据库备份

http://doc.ewomail.com/docs/ewomail/data_backup

EwoMail 主要目录在/ewomail，相关的数据与文件都存放在该目录。

## MYSQL备份

```
cat /ewomail/config.ini

查看root密码，是否能登陆
# mysql -u root -p'ybXkgm7T944sOlaD'
# 导出数据库sql
# mkdir /data/backup
# mysqldump -u root  -P 3306 -p'ybXkgm7T944sOlaD' ewomail > /data/backup/ewomail.sql

```

## 文件打包备份

```
# tar -zcf /data/backup/ewomail.tar.gz /ewomail/
```



# 重装

```
无法重装

卸载：
systemctl stop nginx php-fpm mysqld postfix dovecot amavisd
rm -rf /ewomail
mv /usr/lib/systemd/system/mysqld.service  /usr/lib/systemd/system/mysqld.service_bak
mv /etc/rc.d/init.d/mysqld /etc/rc.d/init.d/mysqld_bak


```

