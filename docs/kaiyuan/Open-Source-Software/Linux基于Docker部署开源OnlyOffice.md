---
title: Linux基于Docker部署开源OnlyOffice
createTime: 2025/05/27 17:51:17
permalink: /article/ugp6tfza/
---
# Linux基于Docker部署开源OnlyOffice

## 什么是OnlyOffice

OnlyOffice是一款强大的在线office工具，我们通过他可以让客户脱离于客户端环境，直接从web端进行文档编写。

这篇文章只是介绍一下onlyOffice的所需要的环境和基本使用方法（在线打开预览，在线编辑与保存）。官网：https://www.onlyoffice.com/zh/

也可以网盘接入onlyoffice实现word文档，excel表格, ppt演示文稿的创建，在线预览，协同编辑

![image-20220609191708156](https://imgoss.xgss.net/picgo/image-20220609191708156.png?aliyun)

## 系统说明

官方最低配置：

　　CPU： 双核2GHz或更高

　　内存：大于2GB或更多

　　硬盘： 大于40GB

　　额外的需求至少4GB的交换

　　Docker版本：大于1.10

```
系统：centos7
IP： 192.168.1.5
已安装docker
```



## 使用Docker部署OnlyOffice

## 安装Docker

省略

## 运行镜像onlyoffice

```
# mkdir /data/docker
# docker run -itd \
--name onlyoffice \
--restart always \
-p 8090:80 \
-v /data/docker/onlyoffice/log:/var/log/onlyoffice  \
-v /data/docker/onlyoffice/data:/var/www/onlyoffice/Data  \
-v /data/docker/onlyoffice/lib:/var/lib/onlyoffice \
-v /data/docker/onlyoffice/db:/var/lib/postgresql  \
onlyoffice/documentserver

# docker ps

阿里云下载：

# docker run -itd \
--name onlyoffice \
--restart always \
-p 8090:80 \
-v /data/docker/onlyoffice/log:/var/log/onlyoffice  \
-v /data/docker/onlyoffice/data:/var/www/onlyoffice/Data  \
-v /data/docker/onlyoffice/lib:/var/lib/onlyoffice \
-v /data/docker/onlyoffice/db:/var/lib/postgresql  \
ung2thfc.mirror.aliyuncs.com/onlyoffice/documentserver
```



这时候输入服务器ip:8090出现下面页面则部署成功

http://192.168.1.5:8090/

浏览器访问：http://192.168.1.5:8090/web-apps/apps/api/documents/api.js 你能看到以下页面就证明你的onlyoffice部署成功了。

![image-20220322150844771](https://imgoss.xgss.net/picgo/image-20220322150844771.png?aliyun)

## 使用 onlyoffice

```
docker exec onlyoffice sudo supervisorctl start ds:example

docker exec onlyoffice sudo sed 's,autostart=false,autostart=true,' -i /etc/supervisor/conf.d/ds-example.conf
```

  

点击 GO TO TEST EXAMPLE 按钮

![image-20210930133757212](http://imgoss.xgss.net/picgo/image-20210930133757212.png?aliyunoss)

可以上传一个文档

　　开始使用演示样本ONLYOFFICE文档编辑器,第一个基于html5的编辑。
　　你可以上传自己的文档进行测试使用“上传文件”按钮,选择必要的文件在你的电脑。

![image-20210930133918697](http://imgoss.xgss.net/picgo/image-20210930133918697.png?aliyunoss)

![image-20210930133941005](http://imgoss.xgss.net/picgo/image-20210930133941005.png?aliyunoss)

可实现多人编辑

![image-20210930134224006](http://imgoss.xgss.net/picgo/image-20210930134224006.png?aliyunoss)



##  onlyoffice报 download failed错误处理

导入一个文档到onlyoffice里面，报错 download failed

![image-20230530153819349](https://imgoss.xgss.net/picgo/image-20230530153819349.png?aliyun)

the document could not be saved please check connection settings or contact your administrator

![image-20230530151105959](https://imgoss.xgss.net/picgo/image-20230530151105959.png?aliyun)



```
# 进入容器
# docker exec -it onlyoffice /bin/bash
root@a7df44eed360:/# 

打开
/etc/onlyoffice/documentserver/default.json，向下找到 rejectUnauthorized 字段，将其值改为false。

# cat /etc/onlyoffice/documentserver/default.json |grep rejectUnauthorized
                                "rejectUnauthorized": true
# nano /etc/onlyoffice/documentserver/default.json

按Ctrl+W，然后输入你要搜索的关键字，回车确定。这将会定位到第一个匹配的文本，接着可以用Alt+W来定位到下一个匹配的文本。

使用Ctrl+O来保存所做的修改

按Ctrl+X 保存

如果你修改了文件，下面会询问你是否需要保存修改。输入Y确认保存，输入N不保存，按Ctrl+C取消返回。如果输入了Y，下一步会让你输入想要保存的文件名。如果不需要修改文件名直接回车就行；若想要保存成别的名字（也就是另存为）则输入新名称然后确 定。这个时候也可用Ctrl+C来取消返回。
```



重启docker

```
 docker restart onlyoffice
```



```
==> /var/log/onlyoffice/documentserver/docservice/out.log <==
[2023-05-30T07:30:53.367] [ERROR] nodeJS - postData error: docId = 192.168.1.251http___192.168.1.3_8090_example_files_192.168.1.251_new.pptx1685431845598;url = http://192.168.1.3:8090/example/track?filename=new.pptx&useraddress=192.168.1.251;data = {"key":"192.168.1.251http___192.168.1.3_8090_example_files_192.168.1.251_new.pptx1685431845598","status":1,"users":["uid-1"],"actions":[{"type":1,"userid":"uid-1"}]}
Error: connect ETIMEDOUT 192.168.1.3:8090
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1107:14)

==> /var/log/onlyoffice/documentserver/converter/out.log <==
[2023-05-30T07:31:00.408] [ERROR] nodeJS - error downloadFile:url=http://192.168.1.3:8090/example/download?fileName=new.pptx&useraddress=192.168.1.251;attempt=1;code:ETIMEDOUT;connect:null;(id=192.168.1.251http___192.168.1.3_8090_example_files_192.168.1.251_new.pptx1685431845598)
Error: connect ETIMEDOUT 192.168.1.3:8090
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1107:14)

```









## 给onlyoffice导入字体

win10系统提取中文字体的方法：控制面板——搜字体——查看安装的字体——再在搜索栏输入中文 2个字，这些就是需要的中文字体了。OO首次加载会比较慢，因为加载中文字体，一般达到50M以上。

![image-20230529175531189](https://imgoss.xgss.net/picgo/image-20230529175531189.png?aliyun)

搜索中文

![image-20230529175602973](https://imgoss.xgss.net/picgo/image-20230529175602973.png?aliyun)



清除字体

```
# docker exec -it onlyoffice /bin/bash
cd /var/www/onlyoffice/documentserver/core-fonts/
ls
rm -rf *
ls
cd /usr/share/fonts/
rm -rf *


```

选择好自己要的字体，打包发送到onlyoffice容器里：

```
docker cp ./fonts/ onlyoffice:/usr/share/fonts/truetype/custom
```



在docker容器里面执行：

```
# docker exec -it onlyoffice /bin/bash
/usr/bin/documentserver-generate-allfonts.sh
```





//将当前文件夹C:\Users\Administrator\下的winfont文件夹内的字体全部拷贝到容器的文件夹/usr/share/fonts/truetype中





