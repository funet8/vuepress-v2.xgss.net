# Linux基于Docker安装开源项目管理禅道

## 什么是禅道

禅道由 青岛易软天创网络科技有限公司开发，国产开源项目管理软件。它集**产品管理、项目管理、质量管理、文档管理、组织管理和事务管理于一体**，是一款专业的研发项目管理软件，完整覆盖了研发项目管理的核心流程。禅道管理思想注重实效，功能完备丰富，操作简洁高效，界面美观大方，搜索功能强大，统计报表丰富多样，软件架构合理，扩展灵活，有完善的API可以调用。禅道，专注研发项目管理！

维护部门的项目管理、人员工作合理分配、工作协同等。

有开源版，在本地机房部署或者部署专属云，避免TAPD、teambition等可能的数据泄露问题。

官网：https://www.zentao.net/

![image-20220608182751405](https://imgoss.xgss.net/picgo/image-20220608182751405.png?aliyun)

## 环境介绍

```
系统： Centos7
IP： 192.168.1.4
安装软件： docker
```



## 安装docker

省略

运行环境需成功部署Docker服务，推荐使用Docker 18版本以上，对主机环境没有要求。

可通过命令查看Docker版本。

```
docker -v
```

禅道镜像已放于Docker Hub上，地址为：https://hub.docker.com/r/easysoft/zentao/tags

可根据所需版本拉取对应版本的镜像，默认latest为禅道开源最新版本。

## 拉取禅道镜像：

```
# docker pull easysoft/zentao:latest
或者
# docker pull easysoft/zentao:12.3.3
```



## Docker下安装禅道

只要三步

### 一、创建网络

```
docker network create --subnet=172.172.172.0/24 zentaonet
```

### 二、创建目录

```
mkdir /data/docker/zentao2
```



### 三、启动禅道镜像

启动格式：

```
docker run --name [容器名] \
-p [主机端口]:80 \
-v [主机禅道目录]:/www/zentaopms \
-v [主机mysql目录]:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=[数据库密码] \
-d easysoft/zentao:[镜像标签]
```

实际操作

```

docker run --name zentao2 \
--restart always \
-p 8180:80 \
-p 3306:3306 \
--network=zentaonet --ip 172.172.172.173 \
-v /data/docker/zentao2/zentaopms:/www/zentaopms \
-v /data/docker/zentao2/mysqldata2:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123456 -d easysoft/zentao:latest
```



浏览器访问： http://IP:8180/ 安装禅道

![image-20220608181414648](https://imgoss.xgss.net/picgo/image-20220608181414648.png?aliyun)

生成配置文件：

![image-20220608181627766](https://imgoss.xgss.net/picgo/image-20220608181627766.png?aliyun)

安装成功

![image-20220608181647127](https://imgoss.xgss.net/picgo/image-20220608181647127.png?aliyun)

设置账号

![image-20220608181713293](https://imgoss.xgss.net/picgo/image-20220608181713293.png?aliyun)



登录

![image-20220608181732363](https://imgoss.xgss.net/picgo/image-20220608181732363.png?aliyun)

至此，Linux基于Docker安装开源项目管理禅道已经安装完成。



# 其他功能

## NGINX反向代理

不使用IP访问，而使用域名来访问禅道

```
server {
        listen       80;
        server_name  job.xgss.net;
        access_log off;
        error_log off;

        location / {
                proxy_pass      http://127.0.0.1:8180;
                proxy_redirect off;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
}
```

将域名解析，或者绑定hosts

```
192.168.1.4 job.xgss.net
```

即可用域名访问



## 将镜像推送到阿里云docker中

这步是非必须的。

可以这个禅道docker镜像推送到自己的阿里云账号下，下次就可以直接使用，不受官方影响。

下载速度也可以提升。

```
docker tag zentao:latest registry.cn-shenzhen.aliyuncs.com/funet8/zentao:11.4.1

# docker images|grep zentao
registry.cn-shenzhen.aliyuncs.com/funet8/zentao                11.4.1              866f4b8173e5        2 years ago         585 MB
zentao                                                         latest              866f4b8173e5        2 years ago         585 MB
docker push registry.cn-shenzhen.aliyuncs.com/funet8/zentao:11.4.1

```



将docker镜像由私有改为公开

https://cr.console.aliyun.com/#/imageList

![image-20211209170525561](https://imgoss.xgss.net/picgo/image-20211209170525561.png?aliyun)

## 启动禅道

使用自己的阿里云docker镜像。

```
docker run --name zentao1 -p 8080:80 \
--restart always \
-v /data/wwwroot/web/job.chuanqu.ltd:/app/zentaopms \
-v /data/mysql/docker_zentao1:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
-d registry.cn-shenzhen.aliyuncs.com/funet8/zentao:11.4.1
```



![image-20211209171719293](https://imgoss.xgss.net/picgo/image-20211209171719293.png?aliyun)

![image-20211209171757939](https://imgoss.xgss.net/picgo/image-20211209171757939.png?aliyun)

配置信息已经成功保存到" /app/zentaopms/config/my.php "中。您后面还可继续修改此文件，即可使用禅道。

## 远程登录禅道数据库

有时候需要远程修改数据库。

进入docker镜像，再登录mysql数据库，**如果开启了注意安全性！**

```

# docker exec -it zentao2 /bin/bash
修改数据库配置：
vim /etc/mysql/mariadb.conf.d/50-server.cnf
将：bind-address           = 127.0.0.1 注释掉：
# bind-address           = 127.0.0.1

在登录mysql数据库
# mysql -u root -h 127.0.0.1 -P 3306 -p'123456'
Welcome to the MariaDB monitor.  Commands end with ; or \g.

使用命令行，新建root权限用户
mysql> use mysql;
mysql> update user set password=PASSWORD('123456') where User='star';
mysql> GRANT ALL PRIVILEGES ON *.* TO 'star'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;
mysql> FLUSH PRIVILEGES ;

重启docker
docker restart zentao2
```

验证数据库是否可以远程连接。

```
# mysql -u'star' -h'192.168.1.3' -P'3306' -p'123456'
```



## 禅道配置钉钉通知

钉钉群-->智能群助手--->添加机器人--->自定义

![image-20211209180408831](https://imgoss.xgss.net/picgo/image-20211209180408831.png?aliyun)



生成hook地址，复制

进入禅道，后台--->通知--->webhook

![image-20211209180624395](https://imgoss.xgss.net/picgo/image-20211209180624395.png?aliyun)



测试

![image-20211209182804297](https://imgoss.xgss.net/picgo/image-20211209182804297.png?aliyun)