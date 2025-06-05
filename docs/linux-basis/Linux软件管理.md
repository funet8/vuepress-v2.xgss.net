# Linux软件包管理

Linux系统如果需要安装软件怎么办？如何安装，大概有以下几种方式

1.二级制软件包管理（RPM 、YUM）

2.源代码包安装

3.脚本安装（Shell或Java脚本）

4.Debian系

![linux-rpm](https://imgoss.xgss.net/picgo/linux-rpm.jpg?aliyun)

## RPM包管理

RPM名称软件包：	sudo-1.7.2pl-5.el5.i386.rpm

解释:

	软件名：sudo
	版本号：1.7.2pl
	发行号：5.el5
	硬件平台：i386


## 安装RPM包

实例：

```
# rpm -ivh sudo-1.7.2pl-5.el5.i386.rpm
```



	-i 		【安装的时候显示安装进度】
	-v		【详细信息】
	-h		【安装进度】
	-q		【查看软件包是否安装】	
	-qa 	【查看所有软包】
	
	-ivh：安装显示安装进度--install--verbose--hash
	-Uvh：升级软件包--Update；
	-qpl：列出RPM软件包内的文件信息[Query Package list]；
	-qpi：列出RPM软件包的描述信息[Query Package install package(s)]；
	-qf：查找指定文件属于哪个RPM软件包[Query File]；
	-Va：校验所有的RPM软件包，查找丢失的文件[View Lost]；
	-e：删除包
	-a	查询软件包信息
	-f	查询文件所属软件
	-p  查询软件包
	-l  显示软件包中的文件列表
	-d  显示被标注为文档的文件列表
	-c  显示被标注为配置文件的文件列表
	-V	软件校验



## 卸载RPM包

	# rpm -e sudo				【如果其他软件有依赖，可使用--nodeps强行卸载】
	# rpm -e samba 			【提示失败】
	# rpm -e --nodeps samba  	【强行卸载】



## rpm 查询安装包

### 查看文件隶属于的软件包（rpm -qf）

```
# rpm -qf /etc/services
setup-2.8.71-10.el7.noarch

# rpm -qf /bin/ls
coreutils-8.22-24.el7.x86_64
```



### 查询软件包信息（rpm -qi）

查询nginx包信息

```
# rpm -qi nginx
Name        : nginx
Epoch       : 1
Version     : 1.16.1
Release     : 1.el7
Architecture: x86_64
Install Date: Wed 23 Oct 2019 04:46:38 PM CST
Group       : Unspecified
Size        : 1689960
License     : BSD
Signature   : RSA/SHA256, Fri 04 Oct 2019 06:38:33 AM CST, Key ID 6a2faea2352c64e5
Source RPM  : nginx-1.16.1-1.el7.src.rpm
Build Date  : Thu 03 Oct 2019 01:15:40 PM CST
Build Host  : buildvm-13.phx2.fedoraproject.org
Relocations : (not relocatable)
Packager    : Fedora Project
Vendor      : Fedora Project
URL         : http://nginx.org/
Bug URL     : https://bugz.fedoraproject.org/nginx
Summary     : A high performance web server and reverse proxy server
Description :
Nginx is a web server and a reverse proxy server for HTTP, SMTP, POP3 and
IMAP protocols, with a strong focus on high concurrency, performance and low
memory usage.
```



### 查看软件安装的绝对路径（rpm -ql）

```
# rpm -ql nginx
/etc/logrotate.d/nginx
/etc/nginx/fastcgi.conf
/etc/nginx/fastcgi.conf.default
... ... 中间省略
/usr/share/vim/vimfiles/syntax/nginx.vim
/var/lib/nginx
/var/lib/nginx/tmp
/var/log/nginx
```

### 查询软件帮助文档(rpm -qd)

```
# rpm -qd nginx
/usr/share/doc/nginx-1.16.1/CHANGES
/usr/share/doc/nginx-1.16.1/README
/usr/share/doc/nginx-1.16.1/README.dynamic
/usr/share/doc/nginx-1.16.1/UPGRADE-NOTES-1.6-to-1.10
/usr/share/man/man3/nginx.3pm.gz
/usr/share/man/man8/nginx-upgrade.8.gz
/usr/share/man/man8/nginx.8.gz
```



### 查询软件包配置文件(rpm -qc)

```
# rpm -qc nginx
/etc/logrotate.d/nginx
/etc/nginx/fastcgi.conf
/etc/nginx/fastcgi.conf.default
/etc/nginx/fastcgi_params
/etc/nginx/fastcgi_params.default
/etc/nginx/koi-utf
/etc/nginx/koi-win
/etc/nginx/mime.types
/etc/nginx/mime.types.default
/etc/nginx/nginx.conf
/etc/nginx/nginx.conf.default
/etc/nginx/scgi_params
/etc/nginx/scgi_params.default
/etc/nginx/uwsgi_params
/etc/nginx/uwsgi_params.default
/etc/nginx/win-utf
```



### md5校验软件

md5校验软件，正常无任何提示，如果做过更改就会有提示。

```
rpm -V sudo
校验结果：	
		S   	【文件大小】
		L		【链接文件】
		T		【文件创建时间】
		D		【设备文件】
		U   	【文件用户】
		G    	【文件用户组】
		M		【文件的权限】
	
对文件进行校验值： 
# md5sum
# md5sum /etc/services		
```



### 查看软件包是否安装(rpm -q)

```
# rpm -q webmin
package webmin is not installed
# rpm -q nginx
nginx-1.16.1-1.el7.x86_64
```

### 跟samba相关的软件(rpm -qa)

```bash
# rpm -qa | grep samba
samba-client-libs-4.10.4-11.el7_8.x86_64
samba-common-libs-4.10.4-11.el7_8.x86_64
samba-4.10.4-11.el7_8.x86_64
samba-common-4.10.4-11.el7_8.noarch
samba-common-tools-4.10.4-11.el7_8.x86_64
samba-client-4.10.4-11.el7_8.x86_64
```



### 不安装软件包中的文档

```
--excludedocs
# rpm -ivh --excludedocs 软件名 
```



### 将软件安装到指定路径下

```
--prefix PATH
例如：rpm -ivh --prefix=/user/local/sudo 软件名 

--test					【只对软件包进行测试】 
```



### 重装软件

```
--replacepkgs
例如：
# rpm -ivh --replacepkgs 软件名
文件冲突：如果要安装的软件包中有一个文件已在安装其他软件包时安装会出现以下错误先
```



### 要RPM忽略文件错误信息

```
--replacefiles			【要RPM忽略文件错误信息】
例如：rpm -ivh --replacefiles 软件名
```



### 依赖关系

```
未解决依赖关系错误。依赖关系，一般安装之后不会解决问题。
--nodeps 			【强行安装】
```



### 升级软件

```
rpm -Uvh 软件名
```



### 软件包文件提取

```
解压所有文件到当前目录
#rpm2cpio initscipt-8.45.....i386.rpm | cpio -idv

解压指定文件到当前目录
#rpm2cpio initscipt-8.45.....i386.rpm | cpio -idv ./etc/inittab
```





## YUM包管理

Yum是由Duke University团队修改Yellow Dog Linux的Yellow Dog Updater开发而成，是一个基于RPM包管理的字符前端软件包管理器。能够从指定的服务器自动下载RPM包并且安装，可以处理依赖性关系，并且一次安装所有依赖的软件包，无须繁琐地一次次下载、安装。被Yellow Dog Linux本身，以及Fedora、Red Hat Enterprise Linux采用。



yum应用的好处

**1.自动解决软件包依赖关系**

**2.方便软件包升级**

### yum选项

```
# yum install				【安装】

# yum check-update		【检测升级】

# yum update				【升级】

# yum list				【软件包查询】

# yum info				【软件包信息】

# yum remove 				【卸载】

# yum -help  man yum		【帮助】	

列出软件:
yum list | more 
yum list | grep sudo

查询信息:
yum info sudo
```



​	




## 源代码包安装

源代码包的好处

**1.适应于大多数unix操作系统。**

**2.源代码包安装灵活，可定制。**

**3.卸载方便：先关闭进程，删除文件夹。**

### 应用举例安装proftpd

大致分为四步

1.下载所需要的软件版本。2.解压。 3.配置指定安装目录。 4.编译。 5.安装。

```
解压解包:
# tar -xzvf proftpd-1.3.3d.tar.gz
# cd proftpd-1.3.3d
配置，指定安装目录，方面管理:
# ./configure --prefix==/user/local/proftpd
编译
# make
安装
# make install
```





## APT包管理

Debian系(乌班图系统 ubuntu )

APT:是Debian及其派生的Linux软件包管理器。APT可以自动下载，配置，安装二进制或者源代码格式的软件包，因此简化了Unix系统上管理软件的过程。APT最早被设计成dpkg的前端，用来处理deb格式的软件包。现在经过APT-RPM组织修改，APT已经可以安装在支持RPM的系统管理RPM包。



dpkg：最初由Debian使用，现在由Ubuntu使用。使用.deb格式，是第一个拥有广为人知的依赖性解决工具APT。

```
搜索软件包 		apt-cache search
软件包信息 		apt-cache show
安装 			apt-get install (reinstall   、-f)
删除 			apt-get remove  (autoremove、--purge)
更新软件源 		apt-get update
更新已安装包	apt-get upgrade
```



