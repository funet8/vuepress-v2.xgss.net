---
title: Linux基于Docker安装开源自动签到qiandao
createTime: 2025/05/27 17:51:17
permalink: /article/8sxoggiw/
---


# Linux基于Docker安装开源自动签到qiandao



本文使用docker来安装签到的服务端，首先需要一台Centos7的虚拟机或者云服务器。

本教程一共分为三步：

第1步：安装docker

第2步：创建容器

第3步：注册账号，配置站点

```
系统说明：Centos7
IP地址： 192.168.1.5
开源仓库：https://github.com/binux/qiandao
```

如果安装docker可以跳过安装Docker步骤

# 一、安装docker

## 国内主机安装Docker

```
使用国内镜像安装Docker
curl -sSL https://get.daocloud.io/docker | sh
启动Docker服务
service docker start
设置Docker服务项开机自启( 重要 )
systemctl enable docker
```



## 国外主机安装Docker

```
使用官网地址安装Docker
curl -sSL https://get.docker.com | sh
启动Docker服务
service docker start
设置Docker服务项开机自启( 重要 )
systemctl enable docker
```

# 二、创建容器

## 1.创建容器

```
创建挂载的目录
mkdir -p /data/docker/qiandao
chmod 777 -R /data/docker/qiandao
```

启动容器

```
docker run -itd \
--restart always \
--name qiandao \
-p 90:80 \
-v /data/docker/qiandao:/usr/src/app/volume \
daocloud.io/fangzhengjin/qiandao
```

容器启动命令解释：

```
-itd      （i以交互模式运行容器，通常与 -t 同时使用； 
t:为容器重新分配一个伪输入终端，通常与 -i 同时使用；
d:后台运行容器，并返回容器ID；）

--restart=always（启动docker时自动启动容器）
-p 90:80 端口映射（宿主机端口:docker的端口，由于宿主机的80端口占用了改为90）
-v /data/docker/qiandao:/usr/src/app/volume （挂载点）

什么是Volume
你可以把Volume理解为一个挂载点，意为将主机中的目录挂载到容器中，这样可以在容器中与主机挂载点的文件交互
添加Volume需要添加以下参数
-v 主机挂载点:容器挂载点
```



## 2.注册账号

使用浏览器：http://192.168.1.5:90 访问

![image-20201014102756601](https://imgoss.xgss.net/picgo/image-20201014102756601-1654738388089.png?aliyun)

## 3.配置站点管理员

```
1.进入容器管理
docker exec -it qiandao /bin/bash
2.设置站点管理员
python ./chrole.py 注册邮箱(该用户必须已经注册) admin
python ./chrole.py star@funet8.com admin
3.退出容器管理
exit
```

## 4.其他命令

```
重启容器
docker restart qiandao
关闭容器
docker stop qiandao
删除容器
docker rm -v qiandao
使用参数 -v 的作用是为了确保删除容器自动创建的Volume
```

# 三、升级备份数据

本教程配置后的站点使用的数据库默认为sqlite
更新镜像时只需要备份容器中的 database.db 文件即可
将容器中的数据库文件拷贝到当前目录

```
docker cp qiandao:/usr/src/app/database.db .
```

将备份的数据库拷贝到容器中(当前目录的database.db文件)

```
docker cp database.db qiandao:/usr/src/app/
```

建议恢复数据库后立即重启容器



# 使用浏览器插件获取Cookie

## 1.使用谷歌浏览器、360浏览器或者其他能安装.crx的浏览器。

## 2.需要HAR文件

github开源的HAR文件： https://github.com/qiandao-today/templates.git



## 3.安装获取cookie的浏览器插件“GetCookie”

由于谷歌官方已经把getcookie插件下架了，所以要单独下载 Get-Cookie-For-FPlus获取，而且下载安装也会被封，要



## 插件安装流程

普通方式，但是但是cookie类的插件被谷歌浏览器封掉了，无法安装，会显示“无法从改网站添加应用、扩展程序和用户脚本”！这时候就要用到360浏览器。

(1)将扩展迷上下载的安装包文件（.zip）解压为文件夹，其中类型为“crx”的文件就是接下来需要用到的安装文件

(2) 从设置->更多工具->扩展程序 打开扩展程序页面，或者地址栏输入 Chrome://extensions/ 按下回车打开扩展程序页面

(3) 打开扩展程序页面的“开发者模式”

(4) 将crx文件拖拽到扩展程序页面，完成安装







下载的文件直接拖入浏览器。

![image-20220609094331941](https://imgoss.xgss.net/picgo/image-20220609094331941.png?aliyun)



![image-20220609101404464](https://imgoss.xgss.net/picgo/image-20220609101404464.png?aliyun)



打开B站，登录，再用

![image-20220609101901356](https://imgoss.xgss.net/picgo/image-20220609101901356.png?aliyun)

# 使用签到工具自动签到



使用cookie获取B的站将cookie复制出来

登录自动签到后台

如图

![image-20201230113513591](https://imgoss.xgss.net/picgo/image-20201230113513591.png?aliyun)

查看B站的签到记录是否成功

# 给腾讯视频VIP签到

1.从github上下载har文件 https://github.com/qiandao-today/templates.git 或者直接把git项目拷贝到本机电脑。

2.进入签到后台

我的模板点加号

![image-20201230150952161](https://imgoss.xgss.net/picgo/image-20201230150952161.png?aliyun)

上传模板并且填写腾讯视频的qq号和密码

![image-20201230151129048](https://imgoss.xgss.net/picgo/image-20201230151129048.png?aliyun)

点击"测试"  
![image-20201230151235327](https://imgoss.xgss.net/picgo/image-20201230151235327.png?aliyun)

登录腾讯视频： https://v.qq.com/

点击chrome浏览器的插件获取cookie，将cookie值填入测试的里面，点击“测试”

![image-20201230151603566](https://imgoss.xgss.net/picgo/image-20201230151603566.png?aliyun)

签到失败：

![image-20201230151735859](https://imgoss.xgss.net/picgo/image-20201230151735859.png?aliyun)

保存

![image-20201230151815359](https://imgoss.xgss.net/picgo/image-20201230151815359.png?aliyun)

发布

![image-20201230151844238](https://imgoss.xgss.net/picgo/image-20201230151844238.png?aliyun)

![image-20201230151915867](https://imgoss.xgss.net/picgo/image-20201230151915867.png?aliyun)

![image-20201230152032018](https://imgoss.xgss.net/picgo/image-20201230152032018.png?aliyun)



## 签到失败

```
failed at 4/4 request, , http://localhost/util/unicode?content=%E7%AD%BE%E5%88%B0%E7%A7%AF%E5%88%86%EF%BC%9A%E3%80%90%2B{{zt3|urlencode}}%E3%80%91%20---------%E4%BA%8C%E6%AC%A1%E7%AD%BE%E5%88%B0%EF%BC%9A%E3%80%90{{zt1|urlencode}}{{zt2|urlencode}}V%E5%8E%89%E5%80%BC%E3%80%91-----%E6%9C%AC%E6%9C%88%E5%B7%B2%E7%BB%8F%E8%8E%B7%E5%BE%97%E3%80%90{{zt4|urlencode}}%E3%80%91----%E7%9B%AE%E5%89%8D%E7%A7%AF%E5%88%86%EF%BC%9A%E3%80%90{{zt5|urlencode}}%E3%80%91%E3%80%90{{zt6|urlencode}}%E3%80%91
```

csdn无法自动签到报错：

![image-20201230153428711](https://imgoss.xgss.net/picgo/image-20201230153428711.png?aliyun)

# 下载公开模板

https://qiandao.today/tpls/public  （访问不稳定，可能需要土墙）

选择某一个har项目，点击“查看”再点”下载“就可以下载har文件

参考：

[Docker部署签到站教程](https://github.com/binux/qiandao/wiki/Docker%E9%83%A8%E7%BD%B2%E7%AD%BE%E5%88%B0%E7%AB%99%E6%95%99%E7%A8%8B)

https://hub.docker.com/r/asdaragon/qiandao
https://github.com/AragonSnow/qiandao
https://github.com/qiandao-today/templates

利用阿里云监控实现360有钱联盟自动签到
https://mkblog.cn/233/

