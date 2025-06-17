---
title: Centos7-install-openresty-waf
createTime: 2025/05/27 17:51:18
permalink: /article/x1xyuy8s/
---
# Centos7安装openresty实现WAF防火墙功能

# OpenResty是什么

OpenResty® 是一个结合了 Nginx 与 Lua 的高性能 Web 平台，其内部集成了大量精良的 Lua 库、第三方模块以及大多数的依赖项。用于方便地搭建能够处理超高并发、扩展性极高的动态 Web 应用、Web 服务和动态网关。
OpenResty® 通过汇聚各种设计精良的 Nginx 模块（主要由 OpenResty 团队自主开发），从而将 Nginx 有效地变成一个强大的通用 Web 应用平台。这样，Web 开发人员和系统工程师可以使用 Lua 脚本语言调动 Nginx 支持的各种 C 以及 Lua 模块，快速构造出足以胜任 10K 乃至 1000K 以上单机并发连接的高性能 Web 应用系统。

OpenResty® 的目标是让你的Web服务直接跑在 Nginx 服务内部，充分利用 Nginx 的非阻塞 I/O 模型，不仅仅对 HTTP 客户端请求,甚至于对远程后端诸如 MySQL、PostgreSQL、Memcached 以及 Redis 等都进行一致的高性能响应。

![Centos7-openresty](https://imgoss.xgss.net/picgo/Centos7-openresty-16415487083161.jpg?aliyun)

## 系统说明

```
系统： centos7
ip: 192.168.1.4
```



## 实现WAF

两种方式

1.使用nginx+lua来实现WAF,须在编译nginx的时候配置上lua。

2.部署OpenResty,不需要在编译nginx的时候指定lua，本文采取此方案

## WAF功能列表

1. 支持IP白名单和黑名单功能，直接将黑名单的IP访问拒绝。

2. 支持URL白名单，将不需要过滤的URL进行定义。

3. 支持User-Agent的过滤，匹配自定义规则中的条目，然后进行处理（返回403）。

4. 支持CC攻击防护，单个URL指定时间的访问次数，超过设定值，直接返回403。

5. 支持Cookie过滤，匹配自定义规则中的条目，然后进行处理（返回403）。

6. 支持URL过滤，匹配自定义规则中的条目，如果用户请求的URL包含这些，返回403。

7. 支持URL参数过滤，原理同上。

8. 支持日志记录，将所有拒绝的操作，记录到日志中去。

9. 日志记录为JSON格式，便于日志分析，例如使用ELKStack进行攻击日志收集、存储、搜索和展示

# 源码安装openresty

## yum安装依赖库

```
yum install -y pcre-devel openssl-devel gcc postgresql-devel
```



## 下载源码包并且安装

从下载页 [Download](http://openresty.org/cn/download.html) http://openresty.org/cn/download.html 下载最新的 OpenResty® 源码包，并且像下面的示例一样将其解压:

```
mkdir /data/software
cd  /data/software
wget https://openresty.org/download/openresty-1.19.9.1.tar.gz
# 备用下载地址： http://js.funet8.com/centos_software/openresty-1.19.9.1.tar.gz
tar -zxvf openresty-1.19.9.1.tar.gz
cd openresty-1.19.9.1/

./configure --prefix=/usr/local/openresty \
            --with-luajit \
            --without-http_redis2_module \
            --with-http_iconv_module \
            --with-http_postgres_module

gmake && gmake install

```



参考地址： http://openresty.org/cn/installation.html



## 常用命令

```
# 启动
/usr/local/openresty/nginx/sbin/nginx

# 或者指定配置文件启动
/usr/local/openresty/nginx/sbin/nginx -c /usr/local/openresty/nginx/conf/nginx.conf -p /usr/local/openresty/nginx/

浏览器访问验证是否出现： http://IP

停止
/usr/local/openresty/nginx/sbin/nginx -s stop

# 启动
/usr/local/openresty/nginx/sbin/nginx

重置
/usr/local/openresty/nginx/sbin/nginx -s reload
```





## 验证

```
vim /usr/local/openresty/nginx/conf/nginx.conf
添加：
location /hello {
                default_type 'text/plain';
                content_by_lua 'ngx.say("hello,lua")';
        }
 
/usr/local/openresty/nginx/sbin/nginx -s reload

http://IP:80/hello

是否输出：hello,lua
# curl http://127.0.0.1/hello
hello,lua

```





## 配置环境变量



```
echo '# 配置OpenResty环境变量' >> /etc/profile
echo 'export OPENRESTY_HOME=/usr/local/openresty/' >> /etc/profile
echo 'export PATH=${OPENRESTY_HOME}/bin:$PATH' >> /etc/profile
echo 'PATH=/usr/local/openresty/nginx/sbin:$PATH' >> /etc/profile
echo 'export PATH' >> /etc/profile

生效：
source  /etc/profile

echo $OPENRESTY_HOME

openresty -s reload
nginx -V
nginx -t

# openresty -help
nginx version: openresty/1.19.9.1
Usage: nginx [-?hvVtTq] [-s signal] [-p prefix]
             [-e filename] [-c filename] [-g directives]

Options:
  -?,-h         : this help
  -v            : show version and exit
  -V            : show version and configure options then exit
  -t            : test configuration and exit
  -T            : test configuration, dump it and exit
  -q            : suppress non-error messages during configuration testing
  -s signal     : send signal to a master process: stop, quit, reopen, reload
  -p prefix     : set prefix path (default: /usr/local/openresty/nginx/)
  -e filename   : set error log file (default: logs/error.log)
  -c filename   : set configuration file (default: conf/nginx.conf)
  -g directives : set global directives out of configuration file
```





# 安装并且配置WAF



```
# git clone https://github.com/unixhot/waf.git

克隆到自己的仓库：
# git clone https://gitee.com/funet8/waf.git

# cd /usr/local/openresty/nginx/conf/
# git clone https://gitee.com/funet8/waf.git waf-git
# cp -a ./waf-git/waf /usr/local/openresty/nginx/conf/

# vim /usr/local/openresty/nginx/conf/nginx.conf

#在http{}中增加，注意路径，同时WAF日志默认存放在/tmp/日期_waf.log

#WAF
lua_shared_dict limit 50m;
lua_package_path "/usr/local/openresty/nginx/conf/waf/?.lua";
init_by_lua_file "/usr/local/openresty/nginx/conf/waf/init.lua";
access_by_lua_file "/usr/local/openresty/nginx/conf/waf/access.lua";

waf目录：/usr/local/openresty/nginx/conf/waf/
lua配置文件：/usr/local/openresty/nginx/conf/waf/config.lua
Waf的ip黑名单：/usr/local/openresty/nginx/conf/waf/rule-config/blackip.rule
Waf的ip白名单：/usr/local/openresty/nginx/conf/waf/rule-config/whiteip.rule
Waf的规则存放目录：/usr/local/openresty/nginx/conf/waf/rule-config

    
# ln -s /usr/local/openresty/lualib/resty/ /usr/local/openresty/nginx/conf/waf/resty
# /usr/local/openresty/nginx/sbin/nginx -t
# /usr/local/openresty/nginx/sbin/nginx -s reload

然后保存退出重启看日志
openresty -t && openresty -s reload
```

# WAF模块配置文件详解



来学习一下waf/config.lua配置文件中的内容

```
cat /usr/local/openresty/nginx/conf/waf/config.lua
--lua文件中，--为行注释，
--[[
这是块注释
--]]

```



```
cat /usr/local/openresty/nginx/conf/waf/config.lua

config_waf_enable = "on" --是否启用waf模块，值为 on 或 off
config_log_dir = "/tmp" --waf的日志位置，日志格式默认为json
config_rule_dir = "/usr/local/openresty/nginx/conf/waf/rule-config" --策略规则目录位置，可根据情况变动
config_white_url_check = "on" --是否开启URL检测
config_white_ip_check = "on" --是否开启IP白名单检测
config_black_ip_check = "on" --是否开启IP黑名单检测
config_url_check = "on" --是否开启URL过滤
config_url_args_check = "on" --是否开启Get参数过滤
config_user_agent_check = "on" --是否开启UserAgent客户端过滤
config_cookie_check = "on" --是否开启cookie过滤
config_cc_check = "on" --是否开启cc攻击过滤
config_cc_rate = "10/60" --cc攻击的速率/时间，单位为秒；默认示例中为单个IP地址在60秒内访问同一个页面次数超过10次则认为是cc攻击，则自动禁止此IP地址访问此页面60秒，60秒后解封(封禁过程中此IP地址依然可以访问其它页面，如果同一个页面访问次数超过10次依然会被禁止)
config_post_check = "on" --是否开启POST检测
config_waf_output = "html" --对于违反规则的请求则跳转到一个自定义html页面还是指定页面，值为 html 和 redirect
config_waf_redirect_url = "https://www.unixhot.com" --指定违反请求后跳转的指定html页面
--指定违反规则后跳转的自定义html页面
config_output_html=[[
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Language" content="zh-cn" />
<title>网站防火墙</title>
</head>
<body>
<h1 align="center"> 欢迎白帽子进行授权安全测试，安全漏洞请联系QQ：1111111。
</body>
</html>
]]
```



## IP黑名单配置

需要在config.lua中开启config_black_ip_check = "on"参数
IP黑名单配置非常简单，这个与Nginx的ngx_http_access_module模块原理是一致的，只需要把拒绝的地址加入到 waf/rule-config/blackip.rule文件中即可

```
cat /usr/local/openresty/nginx/conf/waf/rule-config/blackip.rule
192.168.1.4
然后访问Openresty地址，如下已返回403被禁止
```



## IP白名单配置

需要在config.lua中开启config_white_ip_check = "on"参数
IP白名单与黑名单相冲突，添加到IP白名单中的IP不受WAF限制,具体请自行测试

```
cat /usr/local/openresty/nginx/conf/waf/rule-config/whiteip.rule
192.168.1.4
```



## CC攻击过滤

需要在config.lua中开启config_cc_check = "on"参数，然后指定config_cc_rate = "10/60"速率和时间
CC攻击只需要在config.lua配置文件中指定上面的两个参数即可

如下指定在60秒内对于单个IP地址访问单个页面的次数最大10次，超过10次则自动拉入黑名单，60秒后自动解除

```
vim /usr/local/openresty/nginx/conf/waf/config.lua
config_cc_check = "on"
config_cc_rate = "10/60"
然后进行测试,如下刷新10次以后就变为来403
```

我们换个页面再次刷新，如下换个页面可以正常访问，不过连续对一个页面60秒内刷新10次以后将也被拉入黑名单



## 异常URL策略配置

需要在config.lua中开启config_url_check = "on"参数
然后定义rule-config/url.rule文件，url.rule文件默认为如下，如果匹配到规则的将跳转到由config.lua中config_waf_output = "html"参数指定的页面

禁止URL访问 .htaccess|.bash_history 的文件
禁止URL访问包含带有phpmyadmin|jmx-console|admin-console|jmxinvokerservlet地址
禁止URL访问包含 java.lang 的地址
禁止URL访问包含 .svn/ 的地址

```
cat url.rule
\.(htaccess|bash_history)
\.(bak|inc|old|mdb|sql|backup|java|class|tgz|gz|tar|zip)$
(phpmyadmin|jmx-console|admin-console|jmxinvokerservlet)
java\.lang
\.svn\/
/(attachments|upimg|images|css|uploadfiles|html|uploads|templets|static|template|data|inc|forumdata|upload|includes|cache|avatar)/(\\w+).(php|jsp)
假如你不想让别人访问根下的/login，那么就可以写入到配置中

cat url.rule
\.(htaccess|bash_history)
\.(bak|inc|old|mdb|sql|backup|java|class|tgz|gz|tar|zip)$
(phpmyadmin|jmx-console|admin-console|jmxinvokerservlet)
java\.lang
\.svn\/
/(attachments|upimg|images|css|uploadfiles|html|uploads|templets|static|template|data|inc|forumdata|upload|includes|cache|avatar)/(\\w+).(php|jsp)
/login
```


然后进行重启后访问,如下就跳转到了我们在config.lua中指定的页面，此页面可根据需求进行修改。如果上面默认的url规则匹配到了你的地址，那么你就可以把相应配置去掉



## 异常UserAgent策略配置

需要在config.lua中开启config_user_agent_check = "on"参数

WAF模块中默认封锁了以下UserAgent，如
HTTrack网站下载
namp网络扫描
audit网络审计
dirbuster网站目录扫描
pangolin SQL注入工具
scan网络扫描
hydra密码暴力破解
libwww漏洞工具
sqlmap自动SQL注入工具
w3af网络扫描
Nikto Web漏洞扫描
…
等等

```
cat useragent.rule
(HTTrack|harvest|audit|dirbuster|pangolin|nmap|sqln|-scan|hydra|Parser|libwww|BBBike|sqlmap|w3af|owasp|Nikto|fimap|havij|PycURL|zmeu|BabyKrokodil|netsparker|httperf|bench)
我们正常访问URL是没问题的，下面来模拟一个非法的UserAgent进行访问

#模拟网站下载
curl http://192.168.31.219/ --user-agent 'HTTrack'
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Language" content="zh-cn" />
<title>网站防火墙</title>
</head>

<body>

<h1 align="center"> 欢迎白帽子进行授权安全测试，安全漏洞请联系QQ：1111111。
</body>
</html>
#模拟nmap网络扫描
curl http://192.168.31.219/ --user-agent 'nmap'
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Language" content="zh-cn" />
<title>网站防火墙</title>
</head>
<body>
<h1 align="center"> 欢迎白帽子进行授权安全测试，安全漏洞请联系QQ：1111111。
</body>
</html>
添加禁止Chrome浏览器访问的UserAgent

#跟随配置添加到最后
cat useragent.rule
(HTTrack|harvest|audit|dirbuster|pangolin|nmap|sqln|-scan|hydra|Parser|libwww|BBBike|sqlmap|w3af|owasp|Nikto|fimap|havij|PycURL|zmeu|BabyKrokodil|netsparker|httperf|bench|Chrome)
```


然后重启Openrestry，通过Chrome浏览器进行访问，命中了WAF的规则



## 异常Get参数策略配置

需要在config.lua配置中开启config_url_args_check = "on"参数

默认封锁了如下：

```
cat args.rule
\.\./
\:\$
\$\{
select.+(from|limit)
(?:(union(.*?)select))
having|rongjitest
sleep\((\s*)(\d*)(\s*)\)
benchmark\((.*)\,(.*)\)
base64_decode\(
(?:from\W+information_schema\W)
(?:(?:current_)user|database|schema|connection_id)\s*\(
(?:etc\/\W*passwd)
into(\s+)+(?:dump|out)file\s*
group\s+by.+\(
xwork.MethodAccessor
(?:define|eval|file_get_contents|include|require|require_once|shell_exec|phpinfo|system|passthru|preg_\w+|execute|echo|print|print_r|var_dump|(fp)open|alert|showmodaldialog)\(
xwork\.MethodAccessor
(gopher|doc|php|glob|file|phar|zlib|ftp|ldap|dict|ogg|data)\:\/
java\.lang
\$_(GET|post|cookie|files|session|env|phplib|GLOBALS|SERVER)\[
\<(iframe|script|body|img|layer|div|meta|style|base|object|input)
(onmouseover|onerror|onload)\=
```

验证

```
我们进行访问 http://192.168.31.219/hello?aa=select id from mysql,得到如下，进行匹配

curl 'http://192.168.31.219/hello?aa=select id from mysql'
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Language" content="zh-cn" />
<title>网站防火墙</title>
</head>

<body>

<h1 align="center"> 欢迎白帽子进行授权安全测试，安全漏洞请联系QQ：1111111。
</body>
</html>
我们也可以根据自己需求去配置，如下最后添加abcops

cat args.rule
\.\./
\:\$
\$\{
select.+(from|limit)
(?:(union(.*?)select))
having|rongjitest
sleep\((\s*)(\d*)(\s*)\)
benchmark\((.*)\,(.*)\)
base64_decode\(
(?:from\W+information_schema\W)
(?:(?:current_)user|database|schema|connection_id)\s*\(
(?:etc\/\W*passwd)
into(\s+)+(?:dump|out)file\s*
group\s+by.+\(
xwork.MethodAccessor
(?:define|eval|file_get_contents|include|require|require_once|shell_exec|phpinfo|system|passthru|preg_\w+|execute|echo|print|print_r|var_dump|(fp)open|alert|showmodaldialog)\(
xwork\.MethodAccessor
(gopher|doc|php|glob|file|phar|zlib|ftp|ldap|dict|ogg|data)\:\/
java\.lang
\$_(GET|post|cookie|files|session|env|phplib|GLOBALS|SERVER)\[
\<(iframe|script|body|img|layer|div|meta|style|base|object|input)
(onmouseover|onerror|onload)\=
abcops
然后我们进行访问http://192.168.31.219/hello?aa=abcops也会匹配到规则
```



## 异常POST参数策略配置

需要在config.lua中开启config_post_check = "on"选项，默认POST请求封禁如下，POST封禁内容与GET相似

```
cat post.rule
\.\./
select.+(from|limit)
(?:(union(.*?)select))
having|rongjitest
sleep\((\s*)(\d*)(\s*)\)
benchmark\((.*)\,(.*)\)
base64_decode\(
(?:from\W+information_schema\W)
(?:(?:current_)user|database|schema|connection_id)\s*\(
(?:etc\/\W*passwd)
into(\s+)+(?:dump|out)file\s*
group\s+by.+\(
xwork.MethodAccessor
(?:define|eval|file_get_contents|include|require|require_once|shell_exec|phpinfo|system|passthru|preg_\w+|execute|echo|print|print_r|var_dump|(fp)open|alert|showmodaldialog)\(
xwork\.MethodAccessor
(gopher|doc|php|glob|file|phar|zlib|ftp|ldap|dict|ogg|data)\:\/
java\.lang
\$_(GET|post|cookie|files|session|env|phplib|GLOBALS|SERVER)\[
\<(iframe|script|body|img|layer|div|meta|style|base|object|input)
(onmouseover|onerror|onload)\=
直接对POST策略进行提交请求，通过curl -XPOST来进行提交POST请求

curl -XPOST 'http://192.168.31.219/hello?aa=select id from mysql'
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Language" content="zh-cn" />
<title>网站防火墙</title>
</head>

<body>

<h1 align="center"> 欢迎白帽子进行授权安全测试，安全漏洞请联系QQ：1111111。
</body>
</html>
如上命中规则，我们查看Openrestry日志，查看是否为POST请求

tail -1 /usr/local/openresty/nginx/logs/access.log
192.168.31.217 - - [27/Jul/2020:18:21:32 +0800] "POST /hello?aa=select id from mysql HTTP/1.1" 403 313 "-" "curl/7.29.0"
```





