# 搭建开源免费的全平台私有密码工具BitWarden



## Bitwarden是什么

Bitwarden 是一个安全且免费的跨平台密码管理器，一款开源密码管理软件，和Keepass、LastPass相似，支持全平台客户端。

开源也就给了我们更多的可定制性，既可以使用官方的服务（跳过服务端的部署环节，直接到客户端的使用），也可以使用自建的服务，本篇文章就介绍在CenOS7系统下搭建搭建私有的bitwarden_rs。

![bitwarden.webp](https://imgoss.xgss.net/picgo/bitwarden.webp.jpg?aliyun)

## 全平台

BitWarden 支持 Windows系统、macOS系统 和 Linux系统 和 Android，iOS 两大手机端平台，并且支持各大Chrome，Firefox，Opera，Edge的浏览器插件，用户也可直接访问网站进行登录，还有命令行管理模式，可以说是覆盖平台及其全面的软件了。

## 收费吗

所有服务器端和客户端软件都是免费的

## Bitwarden和bitwarden_rs的区别

bitwarden_rs项目延伸自Bitwarden，bitwarden_rs使用Rust实现了Bitwarden相似的功能，两者均开源。不过Bitwarden需要较多的依赖（如MSSQL），占用内存也比较大，如果是个人或家庭使用，推荐更加轻量的bitwarden_rs，并且bitwarden_rs还可以免费使用Bitwarden的一些高级功能，如附件上传、TOTP等功能。



## 前期准备

1. 拥有自己的服务器（系统Linux，本次教程cenots7，已安装docker）
2. 使用自己的域名(本篇文章 b.xgss.net)
3. 申请免费SSL证书

# 部署服务端

## 安装docker

```
#安装Docker
yum -y install docker
#启动docker
systemctl start docker
#开机自启
systemctl enable docker
```



## 运行docker容器

我们只要在服务器的 docker 里部署一个 bitwarden 的容器，就可以通过 IOS、安卓、Windows、浏览器，互相同步我们的所有密码。安全吗？数据都保存在自己的服务器上。

```
docker run -itd \
-p 86:80 \
-p 3012:3012 \
--restart always \
--name bitwarden  \
-v /data/docker/bitwarden/:/data/ \
bitwardenrs/server:latest
```

## 配置Nginx（ssl证书）

申请阿里云或者腾讯云免费一年SSL证书，通过acme.sh开源工具申请泛解析SSL证书：[请移步](https://g.xgss.net/safe/%E9%80%9A%E8%BF%87acme.sh%E5%BC%80%E6%BA%90%E5%B7%A5%E5%85%B7%E7%94%B3%E8%AF%B7%E6%B3%9B%E8%A7%A3%E6%9E%90SSL%E8%AF%81%E4%B9%A6.html)

域名解析到服务器

nginx的配置

```
server
    {
    listen 443 ssl http2;
	server_name     b.xgss.net;
	access_log /data/wwwroot/log/b.xgss.net-access.log;
	error_log /dev/null;
	
	# certs sent to the client in SERVER HELLO are concatenated in ssl_certificate
    ssl_certificate /data/wwwroot/web/ssl/b.xgss.net.key.pem;
    ssl_certificate_key /data/wwwroot/web/ssl/b.xgss.net.key;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;
 
    # intermediate configuration. tweak to your needs.
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers 'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS';
    ssl_prefer_server_ciphers on;
 
    # HSTS (ngx_http_headers_module is required) (15768000 seconds = 6 months)
    add_header Strict-Transport-Security max-age=15768000;
 
    # OCSP Stapling ---
    # fetch OCSP records from URL in ssl_certificate and cache them
    ssl_stapling on;
    ssl_stapling_verify on;
 
    
   client_max_body_size 128M;
    location / {
        proxy_set_header  Host  'b.xgss.net';
        proxy_pass http://127.0.0.1:86;
        proxy_redirect off;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
location /notifications/hub {
    proxy_pass http://127.0.0.1:3012;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
 
  location /notifications/hub/negotiate {
    proxy_pass http://127.0.0.1:86;
  }
 
}
```

浏览器访问，如果显示如下页面则服务端部署成功。

![image-20220713100354512](https://imgoss.xgss.net/picgo/image-20220713100354512.png?aliyun)

![image-20220713101201894](https://imgoss.xgss.net/picgo/image-20220713101201894.png?aliyun)



# 客户端使用

## 浏览器插件使用Bitwarden

去各大浏览器应用商店搜索‘Bitwarden’安装，点击左上角的设置，添加自己的密码系统的域名

![image-20220713100910706](https://imgoss.xgss.net/picgo/image-20220713100910706.png?aliyun)

添加项目zerossl.com的账号密码信息。

![image-20220713102910053](https://imgoss.xgss.net/picgo/image-20220713102910053.png?aliyun)

在后台可以看到刚才添加的zerossl.com的账号密码信息

![image-20220713103024701](https://imgoss.xgss.net/picgo/image-20220713103024701.png?aliyun)

其他系统使用大同小异，但是移动端可能需要设置自动填充。

## IOS 端使用 bitwarden

移动端参考：@朗风晴月的文章 [超好用的密码管理工具bitwarden](https://app.myzaker.com/news/article.php?pk=625edc8e8e9f097c496f7bf2)

appStore 商店就可以下载，和浏览器端一样，再 bitwarden点击管理输入服务器域名，然后登录

![img](https://imgoss.xgss.net/picgo/625edc8e8e9f097c496f7c08_1024.jpg?aliyun)

这里注意下设置密码库超时为永不，上面的浏览器和之后的安卓 app 同理

![img](https://imgoss.xgss.net/picgo/625edc8e8e9f097c496f7c09_1024.jpg?aliyun)

接下是 IOS 端的自动填充设置，在设置里点击密码

![img](https://imgoss.xgss.net/picgo/625edc8e8e9f097c496f7c0a_1024.jpg?aliyun)

自动填充密码

![img](https://imgoss.xgss.net/picgo/625edc8e8e9f097c496f7c0b_1024.jpg?aliyun)

打开自动填充密码，并选择 bitwarden 即可

![img](https://imgoss.xgss.net/picgo/625edc8e8e9f097c496f7c0c_1024.jpg?aliyun)

还是以手机上的张大妈 app 为例，选择账号密码登录，点一下账号框，点击小钥匙左边的账号密码即可自动填充

![img](https://imgoss.xgss.net/picgo/625edc8e8e9f097c496f7c0d_1024.jpg?aliyun)

## 安卓端使用 bitwarden

以小米手机为例，需要去谷歌商店，或者去 gayhub 下载 bitwarden 的 app，安卓端的自动填充设置，在设置里点击更多设置

![img](https://imgoss.xgss.net/picgo/625edc8e8e9f097c496f7c0e_1024.jpg?aliyun)

点击语言与输入法

![img](https://imgoss.xgss.net/picgo/625edc8e8e9f097c496f7c0f_1024.jpg?aliyun)

自动填充服务

![img](https://imgoss.xgss.net/picgo/625edc8e8e9f097c496f7c10_1024.jpg?aliyun)

选bitwarden

![img](https://imgoss.xgss.net/picgo/625edc8e8e9f097c496f7c11_1024.jpg?aliyun)

这是安卓很坑的一个地方，如果不设置，有可能有时候自动填充会失灵，点击应用设置

![img](https://imgoss.xgss.net/picgo/625edc8e8e9f097c496f7c12_1024.jpg?aliyun)

点击应用管理

![img](https://imgoss.xgss.net/picgo/625edc8e8e9f097c496f7c13_1024.jpg?aliyun)

找到 bitwarden

![img](https://imgoss.xgss.net/picgo/625edc8e8e9f097c496f7c14_1024.jpg?aliyun)

开启自启动

![img](https://imgoss.xgss.net/picgo/625edc8e8e9f097c496f7c15_1024.jpg?aliyun)

同样以安卓的张大妈 app 为例，大家可以看到下图中，我其实是有多个账号的，这样也方便切换，其他 app 同理，这也是一个方便的地方

![img](https://imgoss.xgss.net/picgo/625edc8e8e9f097c496f7c16_1024.jpg?aliyun)

至此，本教程到此结束了