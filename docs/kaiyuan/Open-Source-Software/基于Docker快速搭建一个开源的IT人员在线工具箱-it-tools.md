# 基于Docker快速搭建一个开源的IT人员在线工具箱-it-tools



在日常的开发工作中，我们经常需要使用各种工具来提高工作效率。为了方便快速搭建和使用这些工具。

今天，星哥将介绍如何使用Docker快速搭建一个开源的IT人员在线工具箱——**it-tools**，为开发人员、运维人员和技术人员提供一个集成的工具环境。

![image-20250103145821979](https://imgoss.xgss.net/picgo/image-20250103145821979.png?aliyun)

# 什么是IT-tools？

IT-tools是一个开源的在线工具集合，为开发者和IT人员提供了许多常用的工具，如：

**编码辅助工具**: 代码格式化、代码美化、正则表达式测试等

**转换工具**: 进制转换、编码转换、时间戳转换等

**加密解密工具**: MD5、SHA、Base64等

**开发辅助工具**: JSON格式化、YAML格式化、Postman等

**其他工具**: IP地址查询、域名查询、颜色选择器等

开源地址：https://github.com/CorentinTh/it-tools

# 准备工作

- 云服务器、NAS、虚拟机等  【 阿里云： http://y.xgss.net/aliyun 或 腾讯云： https://y.xgss.net/tx 】
- 本篇文章在Centos7.9系统下演示，当然其他支持Docker系统亦可
- 安装docker 【本篇文章不细讲，可以看星哥之前的教程或者官方文档】
- 域名一个，下文以 it-tools.xgss.net 代替（非必须，最好是备案过的域名，如果没有可以新注册个，**如果没有备案域名请购买香港或海外区域**）
- SSL 证书一个（非必须，本篇演示用宝塔申请免费的Let's Encrypt）

## 使用docker hub中镜像

```
docker run -itd --restart always \
--name it-tools \
-p 8082:80 \
corentinth/it-tools:latest
```

访问it-tools

在浏览器中输入http://localhost:8082，即可访问it-tools在线工具箱。

## 使用github包中的镜像

选一个即可

```
docker run -itd --restart always \
--name it-tools \
-p 8082:80 \
ghcr.io/corentinth/it-tools:latest
```



# 本地开发

如果想增加一些工具或者二开，可以在本地拉取代码并运行部署。

## 1、拉取代码

```
git clone https://github.com/CorentinTh/it-tools.git
```

## 2、安装依赖

```
pnpm install
```

## 3、启动并运行

```
pnpm dev
```

## 4、打包构建项目

```
pnpm build
```



创建新工具的话，有一个脚本可以生成新的工具模板，只需要运行：

```
pnpm run script:create:tool my-tool-name
```



它将创建一个包含src/tools正确文件的目录，并将导入到src/tools/index.ts。您只需要在适当的类别中添加导入的工具并开发该工具。

# 配置站点

## 1.添加站点

宝塔后台中添加站点

![image-20250103145211102](https://imgoss.xgss.net/picgo/image-20250103145211102.png?aliyun)

## 2.反向代理

点击站点，找到反向代理，填写本机的端口

![image-20250103145308812](https://imgoss.xgss.net/picgo/image-20250103145308812.png?aliyun)

访问： http://it-tools.xgss.net/

![image-20250103145411142](https://imgoss.xgss.net/picgo/image-20250103145411142.png?aliyun)

## 3.支持https

点击SSL，再点击“Let's Encrypt”申请证书

![image-20250103145446039](https://imgoss.xgss.net/picgo/image-20250103145446039.png?aliyun)

现在支持了免费的https。

# 结尾

通过Docker，我们可以非常方便地搭建一个IT-tools工具箱，为日常工作提供便利。无论是开发人员还是运维人员，都可以从IT-tools中受益。

