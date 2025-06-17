---
title: Nginx从入门到放弃05-访问日志与日志切割
createTime: 2025/05/27 17:51:17
permalink: /article/ianxlt5y/
---
# Nginx从入门到放弃05-访问日志与日志切割



## 设置访问日志

当我们访问nginx服务时，nginx会记录日志，nginx日志分两种，一种是访问日志，一种是错误日志，访问日志记录在”access.log”文件中，错误日志记录在”error.log”文件中。

笔者把自己总结的文档分为几遍，合集在 https://g.xgss.net/nginx/

自定义nginx日志的路径

```
access_log /data/wwwroot/log/www.nginx01.com-access.log main_zdy;
error_log /data/wwwroot/log/www.nginx01.com-error.log;
error_log /dev/null;  # 不记录日志，不能用 "off",如果用off还是会记录到 logs/off文件中！
```



![nginx05](https://imgoss.xgss.net/picgo/nginx05.jpg?aliyun)

通过”log_format”指令可以指定访问日志都记录哪些内容，以怎样的格式记录这些内容，这样说可能不太容易理解，不如我们先来看一个简单的小示例，示例配置如下：

```
#如果CDN或者代理，可以获取客户端真实IP为‘$clientRealIp’
map $http_x_forwarded_for  $clientRealIp {
                ""      $remote_addr;
                ~^(?P<firstAddr>[0-9\.]+),?.*$  $firstAddr;
   } 
log_format  main_zdy  '$clientRealIp - $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent" "$request_time"';
```

log_format配置指令的默认值就是这个名为”main_zdy”的日志格式，而在站点日志中 ‘access_log /data/wwwroot/log/www.nginx01.com-access.log main_zdy;’ 则日志格式与之匹配

```
$remote_addr 变量：记录了客户端的IP地址（普通情况下）。
$remote_user 变量：当nginx开启了用户认证功能后，此变量记录了客户端使用了哪个用户进行了认证。
$time_local 变量：记录了当前日志条目的时间。
$request变量：记录了当前http请求的方法、url和http协议版本。
$status变量：记录了当前http请求的响应状态，即响应的状态码，比如200、404等响应码，都记录在此变量中。
$body_bytes_sent变量：记录了nginx响应客户端请求时，发送到客户端的字节数，不包含响应头的大小。
$http_referer变量：记录了当前请求是从哪个页面过来的，比如你点了A页面中的超链接才产生了这个请求，那么此变量中就记录了A页面的url。
$http_user_agent变量：记录了客户端的软件信息，比如，浏览器的名称和版本号。
```

这些变量并非一定会有对应的值，如果变量没有对应的值，那么日志中会使用 “-” 作为默认值进行占位。

## Nginx常用变量

nginx中都有哪些变量能够使用呢？这些变量又都是什么含义呢？你可以从如下官网链接中找到答案：

http://nginx.org/en/docs/varindex.html

```bash
$args                    #请求中的参数值
$query_string            #同 $args
$arg_NAME                #GET请求中NAME的值
$is_args                 #如果请求中有参数，值为"?"，否则为空字符串
$uri                     #请求中的当前URI(不带请求参数，参数位于$args)，可以不同于浏览器传递的$request_uri的值，它可以通过内部重定向，或者使用index指令进行修改，$uri不包含主机名，如"/foo/bar.html"。
$document_uri            #同 $uri
$document_root           #当前请求的文档根目录或别名
$host                    #优先级：HTTP请求行的主机名>"HOST"请求头字段>符合请求的服务器名.请求中的主机头字段，如果请求中的主机头不可用，则为服务器处理请求的服务器名称
$hostname                #主机名
$https                   #如果开启了SSL安全模式，值为"on"，否则为空字符串。
$binary_remote_addr      #客户端地址的二进制形式，固定长度为4个字节
$body_bytes_sent         #传输给客户端的字节数，响应头不计算在内；这个变量和Apache的mod_log_config模块中的"%B"参数保持兼容
$bytes_sent              #传输给客户端的字节数
$connection              #TCP连接的序列号
$connection_requests     #TCP连接当前的请求数量
$content_length          #"Content-Length" 请求头字段
$content_type            #"Content-Type" 请求头字段
$cookie_name             #cookie名称
$limit_rate              #用于设置响应的速度限制
$msec                    #当前的Unix时间戳
$nginx_version           #nginx版本
$pid                     #工作进程的PID
$pipe                    #如果请求来自管道通信，值为"p"，否则为"."
$proxy_protocol_addr     #获取代理访问服务器的客户端地址，如果是直接访问，该值为空字符串
$realpath_root           #当前请求的文档根目录或别名的真实路径，会将所有符号连接转换为真实路径
$remote_addr             #客户端地址
$remote_port             #客户端端口
$remote_user             #用于HTTP基础认证服务的用户名
$request                 #代表客户端的请求地址
$request_body            #客户端的请求主体：此变量可在location中使用，将请求主体通过proxy_pass，fastcgi_pass，uwsgi_pass和scgi_pass传递给下一级的代理服务器
$request_body_file       #将客户端请求主体保存在临时文件中。文件处理结束后，此文件需删除。如果需要之一开启此功能，需要设置client_body_in_file_only。如果将次文件传 递给后端的代理服务器，需要禁用request body，即设置proxy_pass_request_body off，fastcgi_pass_request_body off，uwsgi_pass_request_body off，or scgi_pass_request_body off
$request_completion      #如果请求成功，值为"OK"，如果请求未完成或者请求不是一个范围请求的最后一部分，则为空
$request_filename        #当前连接请求的文件路径，由root或alias指令与URI请求生成
$request_length          #请求的长度 (包括请求的地址，http请求头和请求主体)
$request_method          #HTTP请求方法，通常为"GET"或"POST"
$request_time            #处理客户端请求使用的时间,单位为秒，精度毫秒； 从读入客户端的第一个字节开始，直到把最后一个字符发送给客户端后进行日志写入为止。
$request_uri             #这个变量等于包含一些客户端请求参数的原始URI，它无法修改，请查看$uri更改或重写URI，不包含主机名，例如："/cnphp/test.php?arg=freemouse"
$scheme                  #请求使用的Web协议，"http" 或 "https"
$server_addr             #服务器端地址，需要注意的是：为了避免访问linux系统内核，应将ip地址提前设置在配置文件中
$server_name             #服务器名
$server_port             #服务器端口
$server_protocol         #服务器的HTTP版本，通常为 "HTTP/1.0" 或 "HTTP/1.1"
$status                  #HTTP响应代码
$time_iso8601            #服务器时间的ISO 8610格式
$time_local              #服务器时间（LOG Format 格式）
$cookie_NAME             #客户端请求Header头中的cookie变量，前缀"$cookie_"加上cookie名称的变量，该变量的值即为cookie名称的值
$http_NAME               #匹配任意请求头字段；变量名中的后半部分NAME可以替换成任意请求头字段，如在配置文件中需要获取http请求头："Accept-Language"，$http_accept_language即可

$http_cookie
$http_host               #请求地址，即浏览器中你输入的地址（IP或域名）
$http_referer            #url跳转来源,用来记录从那个页面链接访问过来的
$http_user_agent         #用户终端浏览器等信息
$http_x_forwarded_for
$sent_http_NAME          #可以设置任意http响应头字段；变量名中的后半部分NAME可以替换成任意响应头字段，如需要设置响应头Content-length，$sent_http_content_length即可
$sent_http_cache_control
$sent_http_connection
$sent_http_content_type
$sent_http_keep_alive
$sent_http_last_modified
$sent_http_location
$sent_http_transfer_encoding
```



## Nginx日志切割

随着WEB站点访问增多，天长日久access.log文件就会越来越大，对于我们的管理工作来说，这是不利的，首先，当我们打开一个非常大的日志文件时，就会比较慢，而且，从一个非常大的日志中找到某个时间段的日志也会比较慢，所以，我们最好将日志按天分割开。

比如，每天晚上0点将昨天的日志mv到新的目录，同时生成一个新的日志文件，这样每天就会生成一个日志文件，而不是将所有日志都写入到同一个日志文件中。

### 切割日志shell脚本（参考）

```bash
vim /data/conf/shell/cut_log_nginx.sh
填写以下：

#!/bin/bash
#添加自动执行，安装方法
#vi /etc/crontab
#输入：
#00 00 * * * root /data/conf/shell/cut_log_nginx.sh
###docker的名字
Nginx_Name="nginx"
#设置日志保存的时间，天
save_days=60

#set the path to nginx log files
log_files_path="/data/wwwroot/log/"
nginx_old_log_path="/data/wwwroot/nginx_old_log/"
log_files_dir=${nginx_old_log_path}$(date -d "yesterday" +"%Y")/$(date -d "yesterday" +"%m")
log_files_name=`/bin/ls $log_files_path`

mkdir -p $log_files_dir
#移动日志
for log_name in $log_files_name;do
        mv ${log_files_path}${log_name} ${log_files_dir}/${log_name}_$(date -d "yesterday" +"%Y%m%d").log
done

#删除过期日志
find $nginx_old_log_path -mtime +$save_days -exec rm -rf {} \; 

#重启nginx服务
# systemctl reload $Nginx_Name
#或者
# nginx -s reload
/data/nginx/sbin/nginx -s reload
```



可执行，并且加入定时任务

```
# chmod +x /data/conf/shell/cut_log_nginx.sh

#vi /etc/crontab
#输入：
00 00 * * * root /data/conf/shell/cut_log_nginx.sh
# systemctl restart crond
```

这样每天的地址都会切割到 /data/wwwroot/nginx_old_log/ 目录中，并且只保留60天的日志。