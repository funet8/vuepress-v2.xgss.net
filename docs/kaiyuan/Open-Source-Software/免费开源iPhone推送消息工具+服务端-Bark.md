# 免费开源iPhone推送消息工具+服务端-Bark

# 什么是Bark

Bark 是一款纯推送提醒服务，主要用来给自己的 iPhone 发送自定义内容的推送，可以是文字、链接，不提供历史记录功能，阅后即焚。服务端和客户端均开源，实时性和稳定性都非常可靠，支持自定义请求，自行部署服务器，push 走 iOS 官方渠道，适合注重隐私的用户。

Bark客户端： https://github.com/Finb/Bark

Bark服务端：https://github.com/Finb/bark-server

Bark苹果App Store：  https://apps.apple.com/cn/app/bark-customed-notifications/id1403753865

谷歌浏览器插件： https://chrome.google.com/webstore/detail/bark/pmlkbdbpglkgbgopghdcmohdcmladeii

![Bark-s2](https://imgoss.xgss.net/picgo/Bark-s2.jpg?aliyun)

# 功能简介

1.可以将消息推送到iPhone上。

2.可以使用谷歌浏览器发送消息到iPhone上。

3.可以自建服务器，通过https，把消息发送到iPhone上。

4.配合你的应用程序，python、java，shell等 ，只需要一个地址https://api.day.app/{你的密钥}/{推送的内容} 就可以收到指定消息。

## 基本演示

## 1.在谷歌Chrome浏览器发送消息

首先要安装谷歌浏览器插件，选择要复制的文字，右键发送“send to device myiphone”

![image-20220225192642125](https://imgoss.xgss.net/picgo/image-20220225192642125.png?aliyun)

## 2.手机收到消息

![Bark-s1](https://imgoss.xgss.net/picgo/Bark-s1.png?aliyun)

![image-20210928103405199](http://imgoss.xgss.net/picgo/image-20210928103405199.png?aliyunoss)

还有人根据客户端开发了 Chrome 插件，能帮你方便地把网页上的文本、网址、剪贴板内容推送到 Bark 手机端，使用起来也比较方便。



安装 Bark 应用之后，会得到一个示例页面，可以直接拿来就用，只需要在浏览器中打开链接，修改后面的推送内容就行了。



# Bark服务端部署文档

如果你有自己的云服务器和域名，可以部署web站点，再配合ssl证书搭建https服务，数据传输更加安全。

隐私保护:
如果你的数据特别敏感，请将Bark部署到私人服务器。
所有的数据将只在 你的手机、你的服务器、Apple推送服务器之间传输。

历史消息通过 NotificationServiceExtension 扩展，在收到推送时将推送信息保存在本地，不会经过其他任何设备。
历史记录仅由个人iCloud私有库进行同步。
可以确保你产生的任何通知，将只留在你的设备与你的iCloud中



## Docker部署

```
docker run -itd --name bark \
--restart always \
-p 8080:8080 \
-v /data/docker/bark-data:/data \
finab/bark-server
```



官方部署文档。https://day.app/2018/06/bark-server-document/





