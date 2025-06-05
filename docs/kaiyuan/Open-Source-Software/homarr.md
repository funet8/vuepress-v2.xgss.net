# 超简单的个人精美导航网站搭建-Homarr



Homarr 是一个简单轻量级的服务器主页，通过可定制的浏览器主页与您的家庭服务器的 Docker 容器（即 Sonarr/Radarr ）进行交互，可帮助您在一个地方轻松访问所有服务。

Homarr是一个 顺滑、 现代化 的面板，它把你所有的应用和服务汇于指尖。有了Homarr，你可以在一个页面访问和控制一切。Homarr与你添加的应用无缝交互，为你提供有价值的信息并由你完全把控。安装Homarr轻松简单，并且支持多种部署方式。

官网： https://homarr.dev/

开源地址： https://github.com/ajnart/homarr

![image-20230423095038710](https://imgoss.xgss.net/picgo/image-20230423095038710.png?aliyun)



## [官方安装教程](https://homarr.dev/docs/introduction/installation#installation)

https://homarr.dev/docs/introduction/installation#installation

```
docker run  \
  --name homarr \
  --restart unless-stopped \
  -p 7575:7575 \
  -v <your-path>/homarr/configs:/app/data/configs \
  -v <your-path>/homarr/icons:/app/public/icons \
  -d ghcr.io/ajnart/homarr:latest
```



实际操作

```
# mkdir -p  /data/docker/homarr/configs /data/docker/homarr/icons
# docker run  \
  --name homarr \
  --restart unless-stopped \
  -p 7575:7575 \
  -v /data/docker/homarr/configs:/app/data/configs \
  -v /data/docker/homarr/icons:/app/public/icons \
  -d ghcr.io/ajnart/homarr:latest
```



浏览器访问：浏览器访问IP+端口，笔者是http://192.168.1.8:7575



## Nginx配置站点（可不操作）

```
server {
        listen       80;
        server_name  nav.XXX.ltd; #改成你的域名
        #root /data/wwwroot/web/;
        access_log /data/wwwroot/log/nav.XXX.ltd-access.log main_aliyun;
        error_log /dev/null;

        location / {
                index index.php index.html;
                proxy_pass      http://192.168.1.8:7575;
                proxy_redirect off;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        }
}
```

使用nav.XXX.ltd域名即可访问

# 使用方法

## 1.修改导航标题等

设置--->个性化--->页面元数据

如图修改站点标题等信息

![image-20230423105623963](https://imgoss.xgss.net/picgo/image-20230423105623963.png?aliyun)



## 2.搜索改为百度

设置--->常规--->Custom

![image-20230423105856042](https://imgoss.xgss.net/picgo/image-20230423105856042.png?aliyun)

https://google.com/search?q= 改为  https://www.baidu.com/s?wd= 右上角的搜索框就会用百度搜索。

![image-20230423105920976](https://imgoss.xgss.net/picgo/image-20230423105920976.png?aliyun)



## 3.备份还原配置

设置--->常规

1.下载配置

2.删除配置

3.保存一份配置

![image-20230423112840673](https://imgoss.xgss.net/picgo/image-20230423112840673.png?aliyun)

## 4.Docker整合

后台设置有个“启用docker集成”，打开之后会

![image-20230423112132284](https://imgoss.xgss.net/picgo/image-20230423112132284.png?aliyun)

打开之后会报错“你是不是忘了挂载docker socket”

![image-20230423112050551](https://imgoss.xgss.net/picgo/image-20230423112050551.png?aliyun)

### 重新构建docker

操作前一定要备份你的配置

```
# docker cp homarr:/app/public/imgs /data/docker/homarr/imgs 将
# docker rm -f homarr  # 删除homarr 

docker run  \
  --name homarr \
  --restart unless-stopped \
  -p 7575:7575 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /data/docker/homarr/configs:/app/data/configs \
  -v /data/docker/homarr/icons:/app/public/icons \
  -v /data/docker/homarr/imgs:/app/public/imgs \
  -d ghcr.io/ajnart/homarr:latest
 
```



启动之后，就可以看到本机运行的所有docker容器了。

![image-20230423132831204](https://imgoss.xgss.net/picgo/image-20230423132831204.png?aliyun)



## 外链ico图片

https://raw.githubusercontent.com/walkxcode/dashboard-icons/master/png/

点击链接选择外链图片。

![image-20230423150646624](https://imgoss.xgss.net/picgo/image-20230423150646624.png?aliyun)





