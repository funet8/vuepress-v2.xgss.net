# Linux中使用rsync数据备份工具和实例

对于运维不得不得做的就是备份，增量备份与全量备份，通过rsync工具可以快速做到远程备份。

rsync的应用： 1.备份文件 2.全量备份 3.增量备份。 通过rsync+inotify实时同步文件。

## 一、什么是rsync

rsync（Remote Sync，远程同步）是一个开源的快速备份工具，可以在不同主机之间镜像同步整个目录树，支持增量备份，保持链接和权限，且采用优化的同步算法，传输前执行压缩，因此非常适用于异地备份、镜像服务器等应用。

rsync是一款快速增量备份工具，支持：

```
（1）本地复制；
（2）与其他SSH同步；
（3）与rsync主机同步。
```

在远程同步任务中，负责发起rsync同步操作的客户机称为发起端，而负责相应来自客户机的rsync同步操作的服务器称为同步源。在同步过程中，同步源负责提供文档的原始位置，发起端应对该位置有读取权限。

![linux-rsync](https://imgoss.xgss.net/picgo/linux-rsync.png?aliyun)



### rsync的优点

1.它有效地将文件复制和同步到远程系统或从远程系统同步文件到本地。

2.支持复制链接、设备、所有者、组和权限。

3.它比scp (Secure Copy)更快，因为rsync使用远程更新协议，该协议只允许传输两组文件之间的差异。第一次，它将一个文件或目录的全部内容从源文件复制到目标文件，但从下一次开始，它只将更改的块和字节复制到目标文件。

4.Rsync在两端发送和接收数据时采用压缩和解压缩方式，因此占用的带宽较少。



## 二、安装rsync

查看版本或者查看本机是否安装

```
rsync --version
```

在Centos中使用下面命令安装rsync：

```
 yum -y install rsync
```

在Ubuntu 或者Debian体系的Linux系统上安装`rsync`

```bash
sudo apt install rsync
```



## 三、使用rsync备份工具

配置好rsync同步源服务器之后，客户端就可以使用rsync工具来执行远程同步了。

### 基本语法

```
Local to Local:  rsync [OPTION]... [SRC]... DEST
Local to Remote: rsync [OPTION]... [SRC]... [USER@]HOST:DEST
Remote to Local: rsync [OPTION]... [USER@]HOST:SRC... [DEST]
```

- `OPTION` – rsync参数选项.
- `SRC` – 源目录.
- `DEST` – 目标目录.
- `USER` – 远程用户名.
- `HOST` – 远程主机名或域名或IP地址.

### rsync命令的选项

| 选项                 | 说明                                                         |
| :------------------- | :----------------------------------------------------------- |
| -a, ––archive        | 归档模式，表示以递归方式传输文件，并保持所有文件属性，等价于 -rlptgoD (注意不包括 -H) |
| -r, ––recursive      | 对子目录以递归模式处理                                       |
| -l, ––links          | 保持符号链接文件                                             |
| -H, ––hard-links     | 保持硬链接文件                                               |
| -p, ––perms          | 保持文件权限                                                 |
| -t, ––times          | 保持文件时间信息                                             |
| -g, ––group          | 保持文件属组信息                                             |
| -o, ––owner          | 保持文件属主信息 (super-user only)                           |
| -D                   | 保持设备文件和特殊文件 (super-user only)                     |
| -z, ––compress       | 在传输文件时进行压缩处理                                     |
| ––exclude=PATTERN    | 指定排除一个不需要传输的文件匹配模式                         |
| ––exclude-from=FILE  | 从 FILE 中读取排除规则                                       |
| ––include=PATTERN    | 指定需要传输的文件匹配模式                                   |
| ––include-from=FILE  | 从 FILE 中读取包含规则                                       |
| ––copy-unsafe-links  | 拷贝指向SRC路径目录树以外的链接文件                          |
| ––safe-links         | 忽略指向SRC路径目录树以外的链接文件（默认）                  |
| ––existing           | 仅仅更新那些已经存在于接收端的文件，而不备份那些新创建的文件 |
| ––ignore-existing    | 忽略那些已经存在于接收端的文件，仅备份那些新创建的文件       |
| -b, ––backup         | 当有变化时，对目标目录中的旧版文件进行备份                   |
| ––backup-dir=DIR     | 与 -b 结合使用，将备份的文件存到 DIR 目录中                  |
| ––link-dest=DIR      | 当文件未改变时基于 DIR 创建硬链接文件                        |
| ––delete             | 删除那些接收端还有而发送端已经不存在的文件                   |
| ––delete-before      | 接收者在传输之前进行删除操作 (默认)                          |
| ––delete-during      | 接收者在传输过程中进行删除操作                               |
| ––delete-after       | 接收者在传输之后进行删除操作                                 |
| ––delete-excluded    | 在接收方同时删除被排除的文件                                 |
| -e, ––rsh=COMMAND    | 指定替代 rsh 的 shell 程序                                   |
| ––ignore-errors      | 即使出现 I/O 错误也进行删除                                  |
| ––partial            | 保留那些因故没有完全传输的文件，以是加快随后的再次传输       |
| ––progress           | 在传输时显示传输过程                                         |
| -P                   | 等价于 ––partial ––progress                                  |
| ––delay-updates      | 将正在更新的文件先保存到一个临时目录（默认为 “.~tmp~”），待传输完毕再更新目标文件 |
| -v, ––verbose        | 详细输出模式                                                 |
| -q, ––quiet          | 精简输出模式                                                 |
| -h, ––human-readable | 输出文件大小使用易读的单位（如，K，M等）                     |
| -n, ––dry-run        | 显示哪些文件将被传输                                         |
| ––list-only          | 仅仅列出文件而不进行复制                                     |
| ––rsyncpath=PROGRAM  | 指定远程服务器上的 rsync 命令所在路径                        |
| ––password-file=FILE | 从 FILE 中读取口令，以避免在终端上输入口令，通常在 cron 中连接 rsync 服务器时使用 |
| -4, ––ipv4           | 使用 IPv4                                                    |
| -6, ––ipv6           | 使用 IPv6                                                    |
| ––version            | 打印版本信息                                                 |
| ––help               | 显示帮助信息                                                 |



在指定复制源时，路径是否有最后的 “/” 有不同的含义，例如：

```
/home ： 表示将整个 /home 目录复制到目标目录
/home/ ： 表示将 /home 目录中的所有内容复制到目标目录
```



## 四、rsync使用实例



### 本地复制

```
# rsync /etc/passwd 123.txt
//类似于cp命令
```



### 远程同步

可以配合[ssh免密码登录](https://g.xgss.net/linux/linux-basis/Linux%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%85%8D%E7%BD%AESSH%E5%85%8D%E5%AF%86%E7%A0%81%E7%99%BB%E9%99%86.html)，则不需要输入密码。

或者使用 --password-file=/etc/pass.txt 指定接收端的密码，**明文可能不安全**。

```
# rsync -av root@192.168.1.2:/root/123.txt .
root@192.168.1.2's password:
```



### rsync指定端口号( -e )

```
/usr/bin/rsync -e 'ssh -p 60920' -ahqzt  /root/master3.sql root@192.168.1.2:/root/ 
```



### 在传输过程中查看rsync进度(--progress)

使用--progress选项显示rsync执行的详细进度，如下所示：

```
# rsync -avz --progress /root/temp/ root@192.168.1.2:/root/temp
```



### 单向备份(--delete)

如果文件不在源中而是在目标中存在，则可能希望在rsync同步期间删除目标上的文件。在这种情况下，请使用--delete选项：

```
rsync -avz --delete /root/temp root@192.168.1.2:/root/temp
```



### 文件传输过程中的include和exclude模式

rsync允许在进行同步时提供要包括和排除文件或目录的模式。

```
[root@localhost ~]# rsync -avz --include 'P*' --exclude '*' root@192.168.1.2:/var/lib/rpm/ /root/temp/
```



### 排除的文件和目录（--exclude-from）

使用--exclude-from参数，并指定要在文件中排除的文件和目录。

```bash
rsync -a --exclude-from='/exclude-file.txt' /src_directory/ /dst_directory/

加入需要排除的文件，比如文件file1.c，目录zcwyou：
cat /exclude-file.txt
file1.c
zcwyou
```



### 不传输大文件（--max-size）

可以使用rsync --max-size选项告诉rsync不要传输大于指定大小的文件。

```
# rsync -avz --max-size='1M' root@192.168.1.2:/var/lib/rpm/ /root/temp/
--max-size=1M使rsync仅传输小于或等于1M的文件。单位可以是K,M,G等。
还可以使用--min-size=参数，指定传输最小文件的大小。
```



### 传输成功后删除源文件（--remove-source-files）

假设你有一个主web服务器和一个数据备份服务器，你创建了一个每日备份并与备份服务器同步，现在你不想在你的web服务器上保留备份的本地副本。

那么，您会等待传输完成，然后手动删除本地备份文件吗?这样做肯定有点麻烦，这种自动删除可以使用–remove-source-files选项来完成。

```
rsync --remove-source-files -zvh backup.tar.gz root@192.168.0.151:/home/backup/
检查：
ls -l backup.tar.gz
```



### 限制Rsync传输时的带宽（--bwlimit）

在将数据从一台机器传输到另一台机器时，可以使用–bwlimit选项设置带宽限制。这个选项可以帮助我们限制Rsync占用的网络带宽。

```
rsync --bwlimit=100 -avzhe ssh  /var/lib/rpm/  root@192.168.0.151:/root/tmprpm/
```

另外，默认情况下rsync只同步更改的块和字节，如果你想完整同步整个文件或目录，那么你可以使用-W选项。



### 定时任务

但是在现实工作环境中，备份工作通常是按计划重复执行的，比如：

```
[root@localhost ~]# vim /root/123.pass
123456
//任意创建一个文件用于存放rsync授权用户的密码信息
[root@localhost ~]# chmod 600 /root/123.pass
//必须设定600权限，否则执行时将会报错
[root@localhost ~]# crontab -e
//创建计划任务
30 22 * * * /usr/bin/rsync -az --delete --password-file=/root/123.pass backuper@192.168.1.1::wwwroot /a
//每天晚上22：30执行脚本
[root@localhost ~]# systemctl restart crond
//重新启动crond服务
```



### 同步目录

这里是经常使用的脚本，做代码、文件同步。

```
#!/bin/bash

SRC=/data/path1/ #192.168.1.3 发送端目录
DST=/data/path1/ #192.168.1.2 接收端目录
IP="192.168.1.2"
USER=www

#同步文件
/usr/bin/rsync -e 'ssh -p 22' -ahqzt \
--exclude ".git" \
--exclude "www/Conf/config.php" \
--exclude "www/Public/ueditor/*" \
--exclude "README.md" \
--delete $SRC $USER@$IP:$DST

-ahqzt
-a：归档模式
-h：输出文件大小使用易读的单位（如，K，M等）
-q：精简输出模式
-z: 在传输文件时进行压缩
-t: 保留文件的时间标记
--exclude: 不需要同步的文件或目录
--delete: 删除那些接收端还有而发送端已经不存在的文件
```



在本教程中，您学习了如何使用Rsync在多台Linux之间传输、复制或同步文件和目录。在Rsync用户手册页面上有更多关于Rsync的内容。下次再讲如何通过rsync+inotify实时同步文件。

