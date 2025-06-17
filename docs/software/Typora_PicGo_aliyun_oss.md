---
title: Typora_PicGo_aliyun_oss
createTime: 2025/05/27 17:51:17
permalink: /article/jidsjch4/
---
# 程序员必备-Typora+PicGo+阿里云oss实现图床

按照上篇文章《程序员必备-Typora+PicGo+码云或github实现免费markdown自带图床》部署了，之后有时候会担心gitee或者github不提供服务，

必备：阿里云账号，会有一些费用，具体看官方。

域名是非必须，但是我这边有个域名，可以设置一个自定义的域名： imgoss.xgss.net



## 一.阿里云OSS配置

### 1.创建Bucket（桶）

进入OSS控制台，右上角选择创建Bucket

![image-20210115165106604](https://imgoss.xgss.net/picgo/image-20210115165106604.png?aliyun)

Bucket名称 （配置PicGo需要用到）
Endpoint的地址（配置PicGo需要用到）
选择公共读
存储类型和空间啥的，按需求购买设置

### 2.获取密钥

右上角，访问控制 左边操作栏，选择 人员管理——用户 去新建用户。找个记事本，记下来，AccessKey ID 和 AccessKeySecret，之后配置PicGo需要用到

![image-20210115165336905](https://imgoss.xgss.net/picgo/image-20210115165336905.png?aliyun)

![image-20210115165422156](https://imgoss.xgss.net/picgo/image-20210115165422156.png?aliyun)

![image-20210115165512934](https://imgoss.xgss.net/picgo/image-20210115165512934.png?aliyun)

### 3.分配权限

对这个用户进行权限管理，选择 AliyunOSSFullAccess——管理对象存储服务（OSS）权限

![image-20210115165849219](https://imgoss.xgss.net/picgo/image-20210115165849219.png?aliyun)

## 2.配置域名绑定到阿里云OSS中

回到阿里云OSS配置中，“传输管理”--->域名管理

![image-20210115170155705](https://imgoss.xgss.net/picgo/image-20210115170155705.png?aliyun)

imgoss.xgss.net cname解析到

![image-20210115170052179](https://imgoss.xgss.net/picgo/image-20210115170052179.png?aliyun)



imgoss.xgss.net 域名CNAME解析到外网访问 imgoss-xgss-net.oss-cn-shenzhen.aliyuncs.com

![image-20210115171648865](https://imgoss.xgss.net/picgo/image-20210115171648865.png?aliyun)



测试，上传1个文件到oss

```
http://imgoss.xgss.net/test.html 
http://imgoss.xgss.net/picgo/1.png
```



## 二、PicGo设置阿里云OSS

![image-20210115173001239](https://imgoss.xgss.net/picgo/image-20210115173001239.png?aliyun)

KeyId 就是上面记在小本本上的，AccessKey ID
Secret 就是 AccessKeySecret
存储空间名字 就是 Bucket的名字
确认存储区域，就是上面的 Endpoint的地址 ，比如你的是，oss-cn-beijing.aliyuncs.com 那么这里就是 `oss-cn-beijing，去掉阿里云的后缀
指定存储路径，随意咯，最好是有个路径区分。比如，picgo/，这样子可以去阿里云OSS上面看到对应的文件夹，比较好整理

![image-20210115173023024](http://imgoss.xgss.net/picgo/header.jpg)



