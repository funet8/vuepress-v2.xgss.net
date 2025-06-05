# 开源SQL审核查询平台Archery-基于docker安装

# 一、Archery产品介绍

在技术团队内部进行有效的 SQL 管理并不容易，如何进行数据库的统一管理，和线上 SQL 操作的统一审核，变得尤为重要。Archery，这个开源的 SQL 审核查询平台，或许能为 SQL 审核工作带来不小的效率提升。

一条高质量的 SQL 语句能使整个服务加速好几倍，而一条有问题的 SQL 则可能会引发灾难，造成严重后果，因此，数据库管理人员的工作就十分重要了，他们掌握着千百万数据的命运。

简介

Archery，是 hhyo 在 Github 上开源的 SQL 审核查询平台，项目位于 https://github.com/hhyo/Archery，同时也在 Gitee 上开源，位于 https://gitee.com/rtttte/Archery

# 二、基于docker搭建Archery

## 1.服务器环境介绍

```
服务器：centos7 
IP: 192.168.1.12
4C-8G-4T
```

本文主要参考：https://archerydms.com/installation/docker/

## 2.安装docker

如果安装了可以跳过

```
wget https://gitee.com/funet8/centos6_LANP_dockerfile/raw/master/shell/CentOS6_7_intall_docker.sh
sh CentOS6_7_intall_docker.sh
```

## 3.安装docker-compose

如果安装了可以跳过

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

/usr/local/bin/docker-compose -v
docker-compose version 1.24.1, build 4667896b
```

[docker部署](https://archerydms.com/installation/docker/)  https://archerydms.com/installation/docker/ 下载了 Archery-1.7.13 解压.

下载并且解压

```
wget https://github.com/hhyo/Archery/archive/v1.7.13.tar.gz
tar -zxvf v1.7.13.tar.gz
cd Archery-1.7.13/src/docker-compose/
ls
archery  docker-compose.yml  inception  mysql
```



## 4.安装并且docker启动

如果有端口占用，需要修改 docker-compose.yml 里的文件端口，但是需要修改配置，宿主机最好不要占用这些端口

```
# 启动
docker-compose -f docker-compose.yml up -d

生成了五个docker实例：redis inception archery goinception mysql
 
# 表结构初始化
docker exec -ti archery /bin/bash
cd /opt/archery
source /opt/venv4archery/bin/activate
python3 manage.py makemigrations sql  
python3 manage.py migrate 

# 数据初始化
python3 manage.py dbshell<sql/fixtures/auth_group.sql
python3 manage.py dbshell<src/init_sql/mysql_slow_query_review.sql

# 创建管理用户
python3 manage.py createsuperuser

# python3 manage.py createsuperuser
用户名: admin
电子邮件地址: star@xxxxxx.com
Password: 
Password (again): 
Superuser created successfully.
# exit

# 重启
docker restart archery

# 日志查看和问题排查
docker logs archery -f --tail=50
```

redis 端口：6379

mysql端口：3306

inception端口：6669

goinception端口：4000

archery端口：9123

```
# docker ps
CONTAINER ID        IMAGE                                          COMMAND                  CREATED             STATUS              PORTS                                                                              NAMES
e961c33a0726        redis:5                                        "docker-entrypoint..."   4 minutes ago       Up 3 minutes        6379/tcp                                                                           redis
dec2f8e330b7        hhyo/archery:1.7.13                            "dockerize -wait t..."   4 minutes ago       Up 3 minutes        0.0.0.0:9123->9123/tcp                                                             archery
ccaca4c8d420        mysql:5.7                                      "docker-entrypoint..."   4 minutes ago       Up 3 minutes        0.0.0.0:3306->3306/tcp, 33060/tcp                                                  mysql
5a7fc2e52484        hanchuanchuan/goinception                      "/usr/local/bin/du..."   4 minutes ago       Up 3 minutes        4000/tcp                                                                           goinception
16ef27ac1cee        hhyo/inception                                 "/bin/sh -c 'nohup..."   4 minutes ago       Up 3 minutes        6669/tcp                                                                           inception
```



# 三、基本操作

## 关闭docker服务

```
docker stop redis
docker stop inception
docker stop archery
docker stop goinception
docker stop mysql
```

## 删除docker容器（谨慎操作）

删除之后数据没有了

```
docker rm -f redis
docker rm -f inception
docker rm -f archery
docker rm -f goinception
docker rm -f mysql
```



## 访问

访问，http://192.168.1.12:9123/  下一篇文章讲解如何配置Archery后台配置基本操作

# 四、角色权限

```
default
DBA		数据库管理员（Database Administrator，简称DBA）
RD  研发（Research and Development）
PM 项目经理( Project Manager )
QA 测试（QUALITY ASSURANCE，中文意思是“质量保证”）

工作流：
RD-->DBA-->CTO（审批）
```



## 工作流

### 功能说明

项目提供简单的多级审批流配置，审批流程和资源组以及审批类型相关，不同资源组和审批类型可以配置不同的审批流程，审批流程配置的是权限组，可避免审批人单点的问题

### 相关配置

在系统管理-配置项管理页面，可进行组工单审批流程的配置
对于SQL上线和SQL查询权限工单，如果用户拥有('sql_review', '审核SQL上线工单')、('sql_execute_for_resource_group', '执行SQL上线工单')、('query_review', '审核查询权限')权限，就可以查看到当前用户所在资源组的所有工单
工单待审核时，关联当前审批权限组、并且关联工单所在资源组的用户，均可查看审核工单（资源组隔离）
待办列表包含当前用户可审核的所有工单

![image-20200908161641296](https://imgoss.xgss.net/picgo/image-20200908161641296.png?aliyun)







