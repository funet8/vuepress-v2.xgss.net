---
title: 免费全自动申请和自动部署更新SSL证书的开源系统
createTime: 2025/05/27 17:51:17
permalink: /article/5yznn831/
---
# 免费全自动申请和自动部署更新SSL证书的开源系统

# 前言

大家好，我是星哥，由于工作的需要经常需要申请SSL证书，之前介绍过如何获取免费的SSL证书（宝塔、acme.sh脚本等）：https://mp.weixin.qq.com/s/ONLDkQLWEVc2KSVQad37OA

只是如果域名使用了CDN那就需要手动更新，属实比较麻烦，今天介绍一款能自动申请免费的SSL证书并且能部署到阿里云CDN、腾讯云CDN、对象存储等中的开源工具，免去手动更新的繁琐。

![image-20250312142941791](https://imgoss.xgss.net/picgo/image-20250312142941791.png?aliyun)

# SSL的成本

我司重要的项目需要SSL证书的大概10个通配符的域名。

在某云上通配符最便宜的价格是3年，平均每年1118.6元/个，如果搭建本项目每年可以介绍1万+的费用，也免去人工操作的麻烦。

如果是单域名的也要68元1年。

![image-20250312142703471](https://imgoss.xgss.net/picgo/image-20250312142703471.png?aliyun)

# CertD是什么

Certd 是一个免费全自动申请和自动部署更新SSL证书的管理系统。

开源SSL证书管理工具；

全自动证书申请、更新、续期；

通配符证书，泛域名证书申请；

证书自动化部署到阿里云、腾讯云、主机、群晖、宝塔；

https证书，pfx证书，der证书，TLS证书，nginx证书自动续签自动部署

CertD开源地址：https://github.com/certd/certd

文档：https://certd.docmirror.cn/

# CertD特性

本项目不仅支持证书申请过程自动化，还可以自动化部署更新证书，让你的证书永不过期。

- 全自动申请证书（支持所有注册商注册的域名）
- 全自动部署更新证书（目前支持部署到主机、阿里云、腾讯云等，目前已支持60+部署插件）
- 支持DNS-01、HTTP-01、CNAME代理等多种域名验证方式
- 支持通配符域名/泛域名，支持多个域名打到一个证书上，支持pem、pfx、der、jks等多种证书格式
- 邮件通知、webhook通知
- 私有化部署，数据保存本地，授权信息加密存储，镜像由Github Actions构建，过程公开透明
- 支持SQLite，PostgreSQL、MySQL数据库

# CertD在线体验

官方Demo地址，自助注册后体验

https://certd.handfree.work/

# CertD部署方法

## 1.部署环境

系统：Linux （只要安装了docker和docker compose的系统都可以）

软件：安装docker和docker compose

权限申请：在运营商（ali或者腾讯云等），创建子账号，并且授权，获取到AccessKey ID和AccessKey Secret，备用。

## 2.部署CertD

```
# 随便创建一个目录
mkdir certd
# 进入目录
cd certd
# 下载docker-compose.yaml文件，或者手动下载放到certd目录下
wget https://gitee.com/certd/certd/raw/v2/docker/run/docker-compose.yaml

# 可以根据需要修改里面的配置
# 1.修改镜像版本号【可选】
# 2.配置数据保存路径【可选】
# 3.修改端口号【可选】
vi docker-compose.yaml # 【可选】


# 启动certd
本人这边修改的
将： - /data/certd:/app/data 改成了 - /data/docker/certd/data:/app/data
将  - "7002:7002" 注释 - "7002:7002"


docker compose up -d

```



## 3.nginx反向代理

现在直接使用IP+端口访问web系统了

默认账号和密码是admin 、 123456

这步可以不用操作，我这里只是方便后期操作。

nginx配置

```
server  {
        listen 80;
        server_name   你的域名;
        error_log           /dev/null;
        access_log         /data/你的域名.log;

        location / {
                proxy_pass         http://192.168.0.251:7001;
                proxy_http_version 1.1;
                proxy_set_header   Upgrade $http_upgrade;
                proxy_set_header   Connection "upgrade";
                proxy_set_header   Host $host;
        }
}
```

![image-20250312104726169](https://imgoss.xgss.net/picgo/image-20250312104726169.png?aliyun)

## 配置通知

可以配置邮件通知和自定义的webhook

我这里配置的是webhook，再点测试

![image-20250312111212579](https://imgoss.xgss.net/picgo/image-20250312111212579.png?aliyun)

点击测试钉钉会收到消息：

![image-20250312111248511](https://imgoss.xgss.net/picgo/image-20250312111248511.png?aliyun)



## 4.创建流水线

1.需要有域名

2.需要运营商下申请AccessKey ID和AccessKey Secret

3.添加

![image-20250312112452580](https://imgoss.xgss.net/picgo/image-20250312112452580.png?aliyun)

配置完成之后

## 验证是否成功申请ssl证书

### 点击运行流水线，或者手动运行流水线。

![image-20250312113239626](https://imgoss.xgss.net/picgo/image-20250312113239626.png?aliyun)

收到钉钉通知

![image-20250312113521230](https://imgoss.xgss.net/picgo/image-20250312113521230.png?aliyun)

收到通知，也可以下载证书，说明证书申请成功

# 将ssl证书配置到腾讯云CDN

流程： 1申请SSL证书，2.上传证书腾讯云，3.部署证书到CDN或者EO

编辑流水线，点击“添加任务”，搜索腾讯云

![image-20250312132600625](https://imgoss.xgss.net/picgo/image-20250312132600625.png?aliyun)

## 将证书部署到腾讯云

编辑，填写腾讯云的Access授权

![image-20250312132719144](https://imgoss.xgss.net/picgo/image-20250312132719144.png?aliyun)

## 将证书部署到腾讯云EO（或CDN）

![image-20250312140454874](https://imgoss.xgss.net/picgo/image-20250312140454874.png?aliyun)

## 验证

### 更新证书之前

![image-20250312140432566](https://imgoss.xgss.net/picgo/image-20250312140432566.png?aliyun)

### 更新证书之后

成功

![image-20250312140637520](https://imgoss.xgss.net/picgo/image-20250312140637520.png?aliyun)

# 结束

好了，CertD的安装和部署已完成，使用CertD可以申请到Let's Encrypt、Google和，ZeroSSL的免费证书，您可以免费且全自动地申请和更新SSL证书，为您的网站提供强有力的安全保障。

通过这种开源系统，用户可以轻松实现HTTPS加密，并减少手动管理的复杂性。

写文不易，如果你都看到了这里，请点个赞和在看，分享给更多的朋友；也别忘了关注星哥玩云！这里有满满的干货分享，还有轻松有趣的技术交流～点个赞、分享给身边的小伙伴，一起成长，一起玩转技术世界吧！ 😊