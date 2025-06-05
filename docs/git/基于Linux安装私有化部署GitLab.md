# 再见Github和码云！基于Linux安装私有化部署GitLab代码仓库



最近访问自己的Gitee开源仓库时候，需要手动提交审核，并且同意gitee.com的条款，好在审核1-2小时就审核通过了，但还是有些膈应。Github也是经常性抽风，不如就自己搭建gitlab的仓库，没有条条框框的限制。

![image-20220520161426092](https://imgoss.xgss.net/picgo/image-20220520161426092.png?aliyun)

同意条款：

![image-20220520161822355](https://imgoss.xgss.net/picgo/image-20220520161822355.png?aliyun)



## 什么是Gitlab

GitLab 是一个用于仓库管理系统的开源项目，使用Git作为代码管理工具，并在此基础上搭建起来的Web服务，可通过Web界面进行访问公开的或者私人项目。它拥有与Github类似的功能，能够浏览源代码，管理缺陷和注释。

![gitlabcangku](https://imgoss.xgss.net/picgo/gitlabcangku.jpg?aliyun)

## 前期准备

一台Linux服务器，vm虚拟机或者云服务器均可，**内存要大于1G**（别问，问就是：Whoops, GitLab is taking too much time to respond.），硬盘大于20G。

本次使用centos7

可选： 域名一个，SSL证书。

# 安装Gitlab的三种方法

1.官方Linux安装包

2.docker安装

3.下载想要的rpm包安装

相对于三种方法，个人更加推荐使用docker。

## 一、官方Linux安装包

## 1. 安装和配置必须的依赖项

在 CentOS 7上，下面的命令也会在系统防火墙中打开 HTTP、HTTPS 和 SSH 访问。这是一个可选步骤，如果您打算仅从本地网络访问GitLab，则可以跳过它。

```
sudo yum install -y curl policycoreutils-python openssh-server perl
sudo systemctl enable sshd
sudo systemctl start sshd
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo systemctl reload firewalld
```



## 2. 下载/安装极狐GitLab

配置GitLab 软件源镜像。

```
curl -fsSL https://packages.gitlab.cn/repository/raw/scripts/setup.sh | /bin/bash
```



执行如下命令开始安装：

```
EXTERNAL_URL="https://gitlab.example.com" yum install -y gitlab-jh
```



## 3. 访问极狐GitLab 实例并登录

除非您在安装过程中指定了自定义密码，否则将随机生成一个密码并存储在 /etc/gitlab/initial_root_password 文件中(出于安全原因，24 小时后，此文件会被第一次 `gitlab-ctl reconfigure` 自动删除，因此若使用随机密码登录，建议安装成功初始登录成功之后，立即修改初始密码）。使用此密码和用户名 `root` 登录。

```
 cat /etc/gitlab/initial_root_password
 Password: qZiiPJmRgReOLaBbB9FQ8ZJULnu2nqxwBjHnzozvCwI=
```

登录gitlab页面即可

# 二、基于docker安装Gitlab

## 1.安装docker

略

## 2.运行docker

官方文档：

```
export GITLAB_HOME=/srv/gitlab
sudo docker run --detach \
  --hostname gitlab.example.com \
  --publish 443:443 --publish 80:80 --publish 22:22 \
  --name gitlab \
  --restart always \
  --volume $GITLAB_HOME/config:/etc/gitlab \
  --volume $GITLAB_HOME/logs:/var/log/gitlab \
  --volume $GITLAB_HOME/data:/var/opt/gitlab \
  --shm-size 256m \
  registry.gitlab.cn/omnibus/gitlab-jh:latest
  
```



由于服务器的443、80端口被占用，所有这里改成

文件目录： /data/docker/gitlab/

```
docker run -itd \
--hostname gitlab.xgss.net \
-p 444:443 -p 81:80 --name gitlab \
--restart always \
-v /data/docker/gitlab/config:/etc/gitlab \
-v /data/docker/gitlab/logs:/var/log/gitlab \
-v /data/docker/gitlab/data:/var/opt/gitlab \
-v /etc/localtime:/etc/localtime \
gitlab/gitlab-ce:latest
```



解释

```

# gitlab.xgss.net  解析到服务器ip
访问： http://gitlab.xgss.net:81/
或者通过服务器的nginx再代理转发过去，就不用加端口了。

server {
        listen       80;
        server_name  gitlab.xgss.net;
        access_log /data/wwwroot/log/gitlab.xgss.net-access.log main_aliyun;
        error_log /dev/null;
        location / {
                proxy_pass      http://127.0.0.1:81;
                proxy_redirect off;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
}
```

![image-20220520164950184](https://imgoss.xgss.net/picgo/image-20220520164950184.png?aliyun)

查看密码

```
cat /data/docker/gitlab/config/initial_root_password 
Password: fSXXjErvK*****

```

重置密码：

![image-20220520165701988](https://imgoss.xgss.net/picgo/image-20220520165701988.png?aliyun)

由于我安装的是gitlab的英文版，可以汉化。也可以直接安装docker gitlab中文版的镜像

## 汉化版的gitlab

```
docker pull twang2218/gitlab-ce-zh:latest
启动

docker run -itd \
--hostname gitlab.xgss.net \
-p 444:443 -p 81:80 --name gitlab \
--restart always \
-v /data/docker/gitlab/config:/etc/gitlab \
-v /data/docker/gitlab/logs:/var/log/gitlab \
-v /data/docker/gitlab/data:/var/opt/gitlab \
-v /etc/localtime:/etc/localtime \
twang2218/gitlab-ce-zh:latest
```



![image-20220520171358994](https://imgoss.xgss.net/picgo/image-20220520171358994.png?aliyun)

# 三、下载rpm包安装

## 1.下载rpm包

gitlab包RPM官方下载：https://packages.gitlab.com/gitlab/gitlab-ce ，你可以选择任意想要的版本下载。

我选择gitlab-ce-8.2.2-ce.0.el6.x86_64.rpm，这个版本比较老，建议下载最新的，

把下载的文件放到百度网盘：

链接：https://pan.baidu.com/s/1-N_BAKRzz4lm8blu25Oz7w  提取码：0pwc

## 2.通过rpm安装

```
#  yum install -y curl openssh-server postftix cronie wget
#  yum install -y postfix
# systemctl enable postfix
# systemctl start postfix
#  lokkit -s http -s ssh
#  wget https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh
#  sh script.rpm.sh 

# rz 【上传gitlab-ce-8.2.2-ce.0.el6.x86_64.rpm】
# yum install -y gitlab-ce-8.2.2-ce.0.el6.x86_64.rpm 
# gitlab-ctl reconfigure
```



## 3.访问gitlab

访问：
http://192.168.1.243/

初始密码：
Username: root 
Password: 5iveL!fe

修改初始密码。

就可以使用gitlab的后台创建项目和用户。

运行多年之后的截图：

![image-20220520162449484](https://imgoss.xgss.net/picgo/image-20220520162449484.png?aliyun)

### 修改配置IP或者域名

 ```
vi /opt/gitlab/embedded/service/gitlab-rails/config/gitlab.yml

  gitlab:
    ## Web server settings
	host: 192.168.1.243   # 这里也可以改成域名
    port: 80
    https: false
重启服务,就可以了    
 ```

更改配置后，执行如下命令（加载配置生效）：

```
sudo gitlab-ctl reconfigure
```

服务打开、关闭、重启：

```
gitlab-ctl start
gitlab-ctl stop
gitlab-ctl restart
```



# 四、Gitlab的备份与恢复

如果使用docker安装则直接备份gitlab目录即可。

```
gitlab-ctl start

gitlab所有的工程目录：
/var/opt/gitlab/
仓库文件
/var/opt/gitlab/git-data/repositories
默认备份目录，修改此目录：
/var/opt/gitlab/backups	
```

新建gitlab的备份目录

```
# mkdir /home/git_bak	
# chown git:root -R /home/git_bak/
```

修改配置文件

```
vi /opt/gitlab/embedded/service/gitlab-rails/config/gitlab.yml

  backup:
    path: "/var/opt/gitlab/backups" 
改为：
  backup:
    path: "/home/git_bak"

有的版本/etc/gitlab/gitlab.rb
```

重启服务

```
# gitlab-ctl restart		【重启】
# /opt/gitlab/bin/gitlab-rake gitlab:backup:create	【备份git】
```



## 恢复Gitlab备份方法

```
# gitlab-ctl stop unicorn
# gitlab-ctl stop sidekiq

# gitlab-rake gitlab:backup:restore BACKUP=1459415571	【恢复备份】
Unpacking backup ... 
[root@localhost backups]# gitlab-ctl start
```



## gitlab定时自动备份

添加定时脚本：

```
# vi /etc/crontab
添加以下：
#周六凌晨2点备份gitlab文件
0 2 * * 1 root /home/git_bak/gitbak.sh  >> /home/git_bak/gitbak.log

cat /home/git_bak/gitbak.sh
#备份GIT################################################################
/opt/gitlab/bin/gitlab-rake gitlab:backup:create
sleep 30

################自动删除7天前gitlab备份文件#########################
ndays="7"
wheredir="/home/git_bak/*"
find $wheredir -mtime +$ndays -name "*_gitlab_backup.tar" -exec rm -rf {} \;
sleep 30

#备份文件推送到内网其他服务器中。
#/usr/bin/rsync -ahqzt -e "ssh -p 22"  --delete /home/git_bak/    root@192.168.1.10:/data/backup/192.168.1.9/gitlab_bak/

#  systemctl restart crond
```

查看备份目录：

双保险：

```
ll -h /home/git_bak/
total 49G
-rw------- 1 git  git   24G May  9 03:31 1652036724_gitlab_backup.tar
-rw------- 1 git  git   25G May 16 03:38 1652641989_gitlab_backup.tar
-rw-r--r-- 1 root root 1.9M May 16 03:38 gitbak.log
-rwxr-xr-x 1 root root 2.1K Sep  5  2020 gitbak.sh

备份服务器中的文件：
# ll -h /data/backup/192.168.1.9/gitlab_bak/
total 49G
-rw------- 1 nginx dockerroot  24G May  9 03:31 1652036724_gitlab_backup.tar
-rw------- 1 nginx dockerroot  25G May 16 03:38 1652641989_gitlab_backup.tar
-rw-r--r-- 1 root  root       1.9M May 16 03:38 gitbak.log
-rwxr-xr-x 1 root  root       2.1K Sep  5  2020 gitbak.sh
```





参考文件

官方Linux安装包： https://about.gitlab.cn/install/

官方GitLab Docker 镜像： https://docs.gitlab.cn/jh/install/docker.html









  