# Centos7搭建开源高颜值的IT资产管理平台chemex



咖啡壶是开源、高颜值的IT资产管理平台。资产管理、归属、追溯、盘点以及轻量的服务器状态面板。支持导出导入、LDAP、自定义字段等。基于优雅的Laravel框架和DcatAdmin开发。

开源地址：https://gitee.com/celaraze/chemex

![image-20220607180626167](https://imgoss.xgss.net/picgo/image-20220607180626167.png?aliyun)

## 环境要求

git，用于管理版本，部署和升级必要工具。

```
PHP 8+ ，仅支持 PHP8。
MySQL 5.7+，数据库引擎，理论上 MariaDB 10.2 + 兼容支持。
ext-zip 扩展。
ext-json 扩展。
ext-fileinfo 扩展。
ext-ldap 扩展。
ext-bcmath 扩展。
ext-mysqli 扩展。
ext-xml 扩展。
ext-xmlrpc 扩展。
```

以上扩展安装过程注意版本必须与 PHP 版本一致。

## 系统简介

centos7

已安装PHP8和mysql数据库，nignx转发

域名：http://zc.nideyuming.com



## 部署（经典 Nginx & PHP-fpm）

生产环境下为遵守安全策略，非常建议在服务器本地进行部署，暂时不提供相关线上初始化安装的功能。因此，虽然前期部署的步骤较多，但已经为大家自动化处理了很大部分的流程，只需要跟着下面的命令一步步执行，一般是不会有部署问题的。

1.为你的计算机安装 PHP8 环境，参考：PHP官方 （安装省略）。

2.为你的计算机安装 MySQL 或者 mariadb（安装省略）

```
http://zc.nideyuming.com
数据库信息：
数据库：zc_chuanqu_cn
地址：172.16.32.11:3306
用户：zc_chuanqu_cn
密码：****
```

3：在你想要的目录中，执行 git clone https://gitee.com/celaraze/chemex.git 完成下载。

4：在项目根目录中，复制 .env.example 文件为一份新的，并重命名为 .env。

5：根据 .env 文件中注释的指引进行配置。

```
# cd /data/wwwroot/web/
# git clone https://gitee.com/celaraze/chemex.git 
# mv chemex zc.nideyuming.com
# chown www.www -R zc.nideyuming.com/
# cd zc.nideyuming.com/
# mv .env.example .env
修改 .env 配置文件

```

### 安装导入数据

```
# su -l www
$ cd /data/wwwroot/web/zc.nideyuming.com/
$ php artisan chemex:install
正在优化配置！
Compiled views cleared!
Application cache cleared!
Route cache cleared!
Configuration cache cleared!
Compiled services and packages files removed!
Caches cleared successfully!
正在设置存储系统！
The [/home/data/wwwroot/web/zc.nideyuming.com/public/storage] link has been connected to [/home/data/wwwroot/web/zc.nideyuming.com/storage/app/public].
The links have been created.
正在配置APP密钥！
Application key set successfully.
正在配置JWT密钥！

 This will invalidate all existing tokens. Are you sure you want to override the secret key? (yes/no) [no]:
 > yes

jwt-auth secret [opRJk8IlSJeJiOOVEKf5KEhk2Xz0rmYl8W4uZVVr06futCH77NlDPgCNt9ytymy2] set successfully.
正在处理数据库迁移！
Migration table created successfully.
...
Migrated:  2021_05_19_085513_version_3_0_10 (9.27ms)
正在初始化基础数据！
Database seeding completed successfully.
Admin账户已成功重置为 admin/admin
安装完成！
用户名密码都为：admin

$ chmod 777 -R storage
$ ll storage/
```



### 配置nginx

```
server {  
        listen       80;
        server_name  zc.nideyuming.com;
        root /data/wwwroot/web/zc.nideyuming.com/public;
        access_log /data/wwwroot/log/zc.nideyuming.com-access.log main_aliyun;
        error_log off;

        location / {
                index  index.php index.htm index.html;
                try_files $uri $uri/ /index.php?$args;
        }
        location ~ .*\.(php|php5)?$     {
                        fastcgi_pass http://127.0.0.1:8100;
                        fastcgi_index index.php;
                        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
                        include fastcgi_params;
                }
        location ~ .*\.(htm|html|css|js|jpg|jpeg|gif|png|ico|bmp|gz|xml|zip|rar|swf|txt|xls|xlsx|flv|mid|doc|ppt|pdf|mp3|wma|exe)?$ {  
                expires 30d;  
                access_log /dev/null;
        }
}
```



此时可以通过访问 http://zc.nideyuming.com 来使用咖啡壶。管理员账号密码为：admin / admin。

访问

![image-20210708154621618](https://imgoss.xgss.net/picgo/image-20210708154621618.png?aliyun)



# 版本更新

随时随地保持更新可以在项目根目录中执行以下命令，将会同步分支的最新修改内容。

```
sudo git fetch --all && git reset --hard origin/main && git pull 
```



接着，执行以下来进行升级。

```
php artisan chemex:update 
```



注意，如果提示 permission denied 错误，需要通过 sudo 身份执行。