# 简单部署开源短链工具-YOURLS

YOURLS是一款使用PHP+Mysql开发的短链接程序，相比公共短网址好处是数据掌握在自己手中，可控性更高。开源地址：https://github.com/YOURLS/YOURLS

# 前期准备

window系统推荐phpStudy等集成PHP环境

linux系统：LNMP（Linux+Nginx+Mysql+PHP）环境

域名，如果服务器在国内，则需要备案，笔者使用二级域名，http://y.xgss.net

![简单部署开源短链工具-YOURLS](https://imgoss.xgss.net/picgo/简单部署开源短链工具-YOURLS.jpg?aliyun)

## 示例

[http://y.xgss.net/aliyun](http://y.xgss.net/aliyun) | [http://y.xgss.net/tx](http://y.xgss.net/tx)

# 部署

YOURLS 的安装流程类似于PHP站点。

将安装包解压并上传至服务器；
将 user/config-sample.php 重命名为 user/config.php；
编辑 user/config.php 文件，填入数据库信息和配置站点选项；
访问 http://yoursite.com/admin/ 开始使用吧！



## 下载YOURLS

YOURLS免费开源，可以在Github下载最新版本（https://github.com/YOURLS/YOURLS/releases），解压后放到站点根目录，并将config-sample.php更名为config.php。

```
wget https://github.com/YOURLS/YOURLS/archive/refs/tags/1.8.2.tar.gz
```





## 配置MySQL数据库

需要先新建一个MySQL数据库，并设置好账号、密码，然后修改user/config.php配置文件，填写正确的MySQL信息，配置信息如下。



修改数据库配置

```
修改 user/config.php

//配置数据库
define( 'YOURLS_DB_USER', 'your db user name' );
define( 'YOURLS_DB_PASS', 'your db password' );
define( 'YOURLS_DB_NAME', 'yourls' );
define( 'YOURLS_DB_HOST', 'localhost' );
define( 'YOURLS_DB_PREFIX', 'yourls_' );

//设置你的域名
define( 'YOURLS_SITE', 'http://y.xgss.net' );

//设置用户名和密码
$yourls_user_passwords = [
	'admin' => '123456', // 设置好密码
];
```

输入管理员账号密码登录后如果出现“Could not auto-encrypt passwords. Error was: “cannot write file”.”报错，请将user/config.php文件的权限改为666，然后刷新网页，再把权限改回644，因为你刚才填写密码时用的是明文，这样很危险，所以程序需要对其加密。






## 配置nginx反向代理

```
server {
        listen       80;
        server_name  y.xgss.net;
        root /data/wwwroot/web/y.xgss.net/;
        access_log /data/wwwroot/log/y.xgss.net-access.log main_aliyun;
        error_log /dev/null;


        location / {
        		index index.php
                try_files  $uri $uri/ /yourls-loader.php
        }
        location ~ ^/.+\.php {
        fastcgi_index            index.php;
        fastcgi_split_path_info  ^(.+\.php)(.*)$;
        fastcgi_param            SCRIPT_FILENAME $request_filename;
        fastcgi_param            PATH_INFO $fastcgi_path_info;
        fastcgi_param            PATH_TRANSLATED $document_root$fastcgi_path_info;
        include                  fastcgi_params;
        fastcgi_pass             127.0.0.1:9000;
        }
}
```

重启nginx

安装：http://y.xgss.net/admin/install.php

![image-20220309173850010](https://imgoss.xgss.net/picgo/image-20220309173850010.png?aliyun)



登录：http://y.xgss.net/admin/

![image-20220309174002660](https://imgoss.xgss.net/picgo/image-20220309174002660.png?aliyun)

添加短链接

![image-20220309174301121](https://imgoss.xgss.net/picgo/image-20220309174301121.png?aliyun)

## yourls汉化

汉化包的git地址为https://github.com/guox/yourls-zh_CN，下载中文包然后解压后放在放在user/languages/目录下

YOURLS默认是中文界面，不方便操作，看到有网友提供了汉化，访问[yourls-zh_CN](https://github.com/guox/yourls-zh_CN/archive/master.zip)下载汉化包，并解压至`user/languages`目录，然后修改`user/config.php`

```
#语言包放到languages
[root@aliyun-hz languages]# ll
total 68
-rw-r--r-- 1 www www   210 Apr 23  2017 index.html
-rw-r--r-- 1 www www    51 Mar 24  2013 README.md
-rw-r--r-- 1 www www 22123 Mar 24  2013 zh_CN.mo
-rw-r--r-- 1 www www 32783 Mar 24  2013 zh_CN.po
#修改配置文件启用中文
vi user/config.php
#启用中文
define( 'YOURLS_LANG', 'zh_CN' );
```



## YOURLS- API

请求地址：http://域名//yourls-api.php
参数：username(用户名)、password（密码）、format（格式 json）、url（长地址）、action（功能，shorturl）

1、GET请求，构建下get请求，可以直接访问也可以用python构建请求

```powershell
http://y.xgss.net/yourls-api.php?username=user&password=password&url=http://www.baidu.com&format=json&action=shorturl
```

![image-20220314010326000](https://imgoss.xgss.net/picgo/image-20220314010326000.png?aliyun)

python构建get请求

```powershell
import requests, json

url = "http://10.0.0.101/yourls-api.php?"
data = {"username":"wangxiaoyu","password":"123456","url":"http://www.baidu.com","format":"json","action":"shorturl"}
response = requests.get(url, data)
print(json.loads(response.text))
```

访问返回的http://10.0.0.101/q94n1k这个短链接可以跳转到百度
返回信息为

```python
{
    'url': {
        'keyword': 'q94o0a',
        'url': 'http://www.baidu.com',
        'title': '百度一下，你就知道',
        'date': '2020-04-21 07:40:58',
        'ip': '10.0.0.1'
    },
    'status': 'success',
    'message': 'http://www.baidu.com 已保存为',
    'title': '百度一下，你就知道',
    'shorturl': 'http://10.0.0.101/q94o0a',
    'statusCode': 200
}
```

如果不指定format为json的话，默认是XML格式
![在这里插入图片描述](https://imgoss.xgss.net/picgo/3b75393125636a4d837138e075bfd303.png?aliyun)

2、POST请求
用python来发送POST请求测试
这里以form表单形式提交数据，所以不需要将POST的data转为json格式
POST请求的几种编码方式可以参考：https://www.cnblogs.com/android-it/p/9558751.html

```python
import requests, json

url = "http://10.0.0.101/yourls-api.php?"
data = {"username":"wangxiaoyu","password":"123456","url":"http://www.baidu.com","format":"json","action":"shorturl"}
response = requests.post(url, data)
print(json.loads(response.text))
```

返回的信息为

```python
{
    'url': {
        'keyword': 'q94nkx',
        'url': 'http://www.baidu.com',
        'title': '百度一下，你就知道',
        'date': '2020-04-21 07:31:45',
        'ip': '10.0.0.1'
    },
    'status': 'success',
    'message': 'http://www.baidu.com 已保存为',
    'title': '百度一下，你就知道',
    'shorturl': 'http://10.0.0.101/q94nkx',
    'statusCode': 200
}
```

3、使用token而不使用账号密码

YOURLS允许使用username和password参数（如果您的设置是私有的话）以老式的方式调用API 。如果您担心将自己的凭证发送出去，还可以使用秘密签名令牌进行API调用。
signature在API请求中使用参数。例：

```powershell
http://yoursite/yourls-api.php?signature=1002a612b4&action=...
```

python示例

```python
import requests, json

url = "http://10.0.0.101/yourls-api.php?"
data = {"signature":"6962355501","url":"http://www.baidu.com","format":"json","action":"shorturl"}
response = requests.post(url, data)
print(json.loads(response.text))
```

# 安装Sleeky主题，美化YOURLS

YOURLS界面显得非常古老，风格挺老的，前几天在Github上看到一款YOURLS主题Sleeky，这篇文章分享下Sleeky主题的安装，希望对你有所帮助。

安装Sleeky主题

最新版Sleeky主题可前往Github下载：https://github.com/Flynntes/Sleeky/releases

Sleeky主题主题包括两部分，一部分是YOURLS前端，另一部分是YOURLS后台管理。下载Sleeky主题主题后可看到有2个文件夹：

    sleeky-frontend: 前端主题
    sleeky-backend：后端主题

将sleeky-frontend文件夹下的内容放到YOURLS站点根目录下即可，不需要额外的设置，直接访问YOURLS主界面即可看到效果。

![image-20220324135010266](https://imgoss.xgss.net/picgo/image-20220324135010266.png?aliyun)

将后端文件夹sleeky-backend放到YOURLS下的/user/plugins目录，并在YOURLS后台启用Sleeky主题插件，如下图。

![image-20220324135929039](https://imgoss.xgss.net/picgo/image-20220324135929039.png?aliyun)

旧的后台地址：

![image-20220324140031738](https://imgoss.xgss.net/picgo/image-20220324140031738.png?aliyun)

新的后台界面：

![image-20220324135959700](https://imgoss.xgss.net/picgo/image-20220324135959700.png?aliyun)



# 升级服务

 1.8.2 升级到 1.9.2

```
1.备份
# cd  /www/wwwroot
# cp -a y.xgss.net y.xgss.net20230803

2.下载最新版
https://github.com/YOURLS/YOURLS/releases

# wget https://github.com/YOURLS/YOURLS/archive/refs/tags/1.9.2.tar.gz

下载： YOURLS-1.9.2.tar.gz
解压
tar -zxvf YOURLS-1.9.2.tar.gz 

cp复制直接覆盖不提示

# \cp -rf YOURLS-1.9.2/* y.xgss.net/

确定无误之后再删除备份文件
# rm -rf YOURLS-1.9.2* y.xgss.net20230803/
```



升级之前后台截图

![image-20230803160921215](https://imgoss.xgss.net/picgo/image-20230803160921215.png?aliyun)



升级之后

![image-20230803161550212](https://imgoss.xgss.net/picgo/image-20230803161550212.png?aliyun)



# YOURLS 目录权限配置

```

chown -R www:www /www/wwwroot/y.xgss.net/


find /www/wwwroot/y.xgss.net/ -type d -exec chmod 755 {} \;
find /www/wwwroot/y.xgss.net/ -type f -exec chmod 644 {} \;

su -l www
touch /www/wwwroot/y.xgss.net/user/config/index.html
touch /www/wwwroot/y.xgss.net/user/logs/index.html
chmod 777 /www/wwwroot/y.xgss.net/user/config/index.html
chmod 777 /www/wwwroot/y.xgss.net/user/logs/index.html


```



# YOURLS-宝塔伪静态配置

```
location / {
    try_files $uri $uri/ /yourls-loader.php$is_args$args;
    # if YOURLS is installed in a subdirectory, change the path
    # to yourls-loader.php accordingly, eg
    # try_files $uri $uri/ /subdir/yourls-loader.php$is_args$args;
}
```

![image-20230803162535424](https://imgoss.xgss.net/picgo/image-20230803162535424.png?aliyun)

