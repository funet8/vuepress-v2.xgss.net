# 基于Docker搭建开源导航站OneNav



开源：https://github.com/helloxz/onenav



分享一个简洁而不简单的导航程序--OneNav 魔改版（收费）

魔改版源码：https://gitee.com/tznb/OneNav



## docker版本安装

```
# docker run -itd --name="onenav" -p 85:80 \
--restart always \
-v /data/onenav:/data/wwwroot/default/data \
helloz/onenav:0.9.23
```



- 第一个`80`是自定义访问端口，可以自行修改，第二个`80`是容器端口，请勿修改

- `/data/onenav`：本机挂载目录，用于持久存储Onenav数据

- `0.9.23`：改成OneNav最新版本号，可以通过[releases](https://github.com/helloxz/onenav/releases)查看最新版本号

  

访问IP+端口

![image-20220712161114780](https://imgoss.xgss.net/picgo/image-20220712161114780.png?aliyun)

登录

![image-20220712161153113](https://imgoss.xgss.net/picgo/image-20220712161153113.png?aliyun)

书签导入

## 使用Chrome浏览器扩展（插件）

https://doc.xiaoz.me/books/onenav/page/chrome

