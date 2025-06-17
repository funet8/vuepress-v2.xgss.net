---
title: 开源炫酷相册系统，网页展示你的照片PicHome
createTime: 2025/05/27 17:51:17
permalink: /article/udmixl7r/
---
# 开源炫酷相册系统，网页展示你的照片PicHome

## 欧奥PicHome介绍

这是一款基于 PHP + MySQL 的开源项目，选定本地电脑的图库目录之后，就能变成一个很漂亮的相册网页，并且可以通过分类、标签、颜色、链接、注释、时长、尺寸等参数检索内容，支持预览图片、视频、音频，甚至 txt 文档 。

官方提供了一个演示站点：http://pichome.oaooa.com/

可以轻松的放大缩小、翻转镜像查看，并且可以查看和下载原图，全凭之后可以通过左右键来浏览内容，可播放视频、音频，最有用的就是搜索功能了，找图快才用的爽。

基于 PHP + MySQL 环境则可以部署在各种设备中，比如服务器、NAS、个人电脑、云服务器等，部署后可以在任何浏览器打开，所以手机电脑都可以方便的访问，最重要的是免费、开源，还是相当不错的。

![image-20220607194557032](https://imgoss.xgss.net/picgo/image-20220607194557032.png?aliyun)

## 安装

官方安装部署文档： https://www.yuque.com/pichome/install

本次采用nginx+php7搭建



Gitee下载
https://gitee.com/zyx0814/Pichome/releases

下载安装包：笔者这边下载Pichome-beta3.3.tar.gz。

github下载
https://github.com/zyx0814/Pichome/releases

```
国内使用gitee地址
https://gitee.com/zyx0814/Pichome/releases
备用下载： http://js.funet8.com/centos_software/Pichome-beta3.3.tar.gz
```



## 解压安装

```
cd /data/wwwroot/web
wget http://js.funet8.com/centos_software/Pichome-beta3.3.tar.gz
tar -zxvf Pichome-beta3.3.tar.gz
mv Pichome-beta3.3 p.xgss.net
```



## 配置nginx

nginx的配置

```
server {
        listen 80;
	server_name p.xgss.net;
	root /data/wwwroot/web/p.xgss.net;
	access_log /data/wwwroot/log/p.xgss.net-access.log main_aliyun;
	error_log /dev/null;

	location / {
			index  index.php index.htm index.html;
			if (!-e $request_filename){
						rewrite ^(.*)$ /index.php?s=$1 last;
			}
			
        }
        location ~ .*\.(php|php5)?$     {
			fastcgi_pass 127.0.0.1:7300;
			fastcgi_index index.php;
			fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
			include fastcgi_params;
		}

        location ~ .*\.(css|js|jpg|jpeg|gif|png|ico|bmp|gz|xml|zip|rar|swf|txt|xls|xlsx|flv|mid|doc|ppt|pdf|mp3|wma|exe)?$ {
                expires max;
                access_log off;
        }
}

```



域名解析到服务器

## 配置站点

访问： http://p.xgss.net/

![image-20220426155931338](https://imgoss.xgss.net/picgo/image-20220426155931338.png?aliyun)



### 环境检查

![image-20220426155958583](https://imgoss.xgss.net/picgo/image-20220426155958583.png?aliyun)

![image-20220426160012237](https://imgoss.xgss.net/picgo/image-20220426160012237.png?aliyun)



### 配置数据库

新建数据库用户

![image-20220426160511843](https://imgoss.xgss.net/picgo/image-20220426160511843.png?aliyun)

分配权限

![image-20220426160609373](https://imgoss.xgss.net/picgo/image-20220426160609373.png?aliyun)

![image-20211214163041640](https://imgoss.xgss.net/picgo/image-20211214163041640.png?aliyun)

![image-20211214163059710](https://imgoss.xgss.net/picgo/image-20211214163059710.png?aliyun)

### 填写管理员信息

![image-20211214163216903](https://imgoss.xgss.net/picgo/image-20211214163216903.png?aliyun)

![image-20211214163257572](https://imgoss.xgss.net/picgo/image-20211214163257572.png?aliyun)



## 新建库

![image-20220426162441190](https://imgoss.xgss.net/picgo/image-20220426162441190.png?aliyun)



## 在线升级

![image-20220607192437807](https://imgoss.xgss.net/picgo/image-20220607192437807.png?aliyun)



参考文档

官网：https://oaooa.com/pichome.html

开发者提供了 Windows、Linux 以及 Docker 安装方式。

# 使用Billfish将图片导入站点

使用Eagle或者Billfish，在本地windows系统下安装Billfish素材管理工具，billfish为免费的。

![image-20220607193330033](https://imgoss.xgss.net/picgo/image-20220607193330033.png?aliyun)

再billfish软件中将照片分类

![image-20220607193907609](https://imgoss.xgss.net/picgo/image-20220607193907609.png?aliyun)

将目录上传到服务器中，库设置中添加目录，就可以在web页面中显示你的图片了。

![image-20220607193949916](https://imgoss.xgss.net/picgo/image-20220607193949916.png?aliyun)