# GoAccess轻量nginx日志分析工具



## 什么是GoAccess

GoAccess 是一款开源、实时，运行在命令行终端下的 Web 日志分析工具。

该工具提供快速、多样的 HTTP 状态统计。

分析结果，可以通过 XShell 等客户端工具查看，并且可以生成 Html 报告。

GitHub 地址：https://github.com/allinurl/goaccess

官网地址：http://goaccess.io/



## 安装GoAccess

测试环境， centos7

```
#  yum -y install glib2 glib2-devel ncurses ncurses-devel GeoIP GeoIP-devel
#  wget http://tar.goaccess.io/goaccess-1.2.tar.gz
#  tar -xzvf goaccess-1.2.tar.gz
#  cd goaccess-1.2/
#  ./configure --enable-geoip --enable-utf8
#  make && make install
```



默认配置文件在

```
vi /usr/local/etc/goaccess.conf

time-format %H:%M:%S
date-format %d/%b/%Y
log-format
```

![GoAccess-install2](https://imgoss.xgss.net/picgo/GoAccess-install2.jpg?aliyun)

接下来我们测试一下。现在就需要根据nginx的日志格式来写goaccess的规则

```
goaccess  -f /usr/local/nginx/logs/access.log -a > /root/test/report.html
```



![GoAccess](https://imgoss.xgss.net/picgo/GoAccess.png?aliyun)



网络上大部分的文章和介绍都只适合没任何修改的nginx日志格式，对自定义的log format都不怎么涉及。如果你采用的自定义的nginx日志格式，那么此处就需要特别注意，一旦log-format配置不对，goaccess分析的结果会差很大。 

以我nginx日志格式为例：

```
log_format main      '$server_name $remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent" "$http_x_forwarded_for" $upstream_addr $request_time $upstream_response_time;
```



按照goaccess预设的log format，这样的日志是没法分析的，所以我们需要自定义log format。 
我的log format为： 

```
log-format %^ %h %^ %^ [%d:%t %^] “%r” %s %b “%R” “%u” “%^” %^ %T %^
```



```
$server_name  			---> 	%h  		--->	主机(客户端IP地址,IPv4和IPv6)
[$time_local] 			---> 	[%d:%t %^] 	--->	时间	
$request				--->	"%r"			--->    客户机的请求,这需要具体分隔符在请求(单引号、双引号或其他)解析。如果没有,我们必须使用特殊的格式说明符的组合%m %U %H。
$status					--->	%s			--->	发送客户端的状态码
$body_bytes_sent		--->	%b			--->	给客户端返回大小
$http_referer			--->	%R			--->	“Referrer”HTTP请求头
$http_user_agent		--->	"%u"		--->	UA
$http_x_forwarded_for	--->	
$request_time			--->	%T			--->	服务请求的时间,以秒或毫秒。注意:%D将优先于%T如果都使用。
```



为了设置正确的log format，踩了不少坑，先列出来避免大家重复碰到。 
（1） log format默认是按照空格分隔日志信息的，所以，对于包含了特殊字符如空格等信息的字段，必须包含在“”里面。如字段request http_user_agent等 
（2） nginx日志格式里面，采用空格分隔，但是此处一定注意，只能用一个空格。当时我有个地方用了两个空格，直接导致goaccess结果出错。 
（3） nginx日志中的每一个字段都要和log format中的一一对应，如果log format中不需要nginx中的某一个信息，则用%^跳过该信息。 
（4） 对于nginx日志中的每一个 - log format都需要一个%^来跳过， 如果是“-”， 则用“%^” 
（5） 如果nginx日志信息中有：， 则需要在log format中也显示出来。例如nginx日志中$time_local就包含了：，所以在log format的相应位置也是 [%d:%t %^]

希望这些能帮助使用goaccess的朋友。

```
goaccess -f log [-c][-r][-m][-h][-q][-d][-g][-a][-o csv|json][-e IP_ADDRESS][...] 
```



## 自定义参数及其对应nginx的accesslog中的fromat  

%x 匹配替代time_format和date_format的设定，可以同时调用两个的全局设置（时间戳）
%t 匹配替代 time-format 的设置  
%d 匹配替代 date-forma 的设置 
%h 客户端ip  $remote_addr 
%r 请求方法  $request  
%m 请求算法  相当于$request中的 post或get的匹配  
%U 请求的URL路径(包括任何查询字符串)  相当于$request中的 URL匹配 
%H 请求的协议  相当于$request中的 HTTP/1.1 
%s 服务端返回客户端的状态code   $status 
%b 返回客户端的body size  $body_bytes_sent 
%R refer  $http_referer   
%u user-agent $http_user_agent  
%D 服务请求的时间，以微秒为单位  $request_time 
%T 服务请求的时间，以秒为单位  $request_time 
%L 服务请求的时间，以毫秒为单位   $request_time 
%^ 忽略官方没有对应参数的区域



以上是官方给出的所有匹配参数，原版见 

http://www.goaccess.io/man

以下是我自定义的nginx日志格式：

```
log_format  main_zdy  '$request_time - IP:$remote_addr - RealIP:$http_x_forwarded_for - [$time_local] $request - $status - $http_user_agent - $host - from:$http_referer';
记录日志：
0.000 - IP:3.3.3.3 - RealIP:1.1.1.1, 2.2.2.2 - [28/Jul/2017:16:04:15 +0800] POST /site/index.html HTTP/1.1 - 200 - Apache-HttpClient/UNAVAILABLE (java 1.4) - www.111111111.com - from:http://www.111111111.com
0.216 - IP:4.4.4.4 - RealIP:5.5.5.5, 6.6.6.6 - [28/Jul/2017:15:53:04 +0800] GET /client/serverlist?jsonpCallback=jQuery18206177038959697163_1501228347875&gid=163&wid=196&_=1501228353156 HTTP/1.1 - 200 - Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727) - www.111111111.com - from:http://www.1111111111111.com/

goaccess的格式：
log-format %T %^ IP:%^ %^ RealIP:~h{," } %^ [%d:%t %^] %m %U %H %^ %s %^ %u %^ %^ %^ from:%R
```




%x 一个匹配时间格式的日期和时间字段和日期格式变量。这是时使用时间戳是给定的日期和时间而不是在两个独立的变量。
%t time字段匹配时间格式的变量。
%d date字段匹配日期格式的变量。
%v The服务器名称根据规范名称设置块(服务器或虚拟主机)。
%e 用户标识的人请求文档由HTTP身份验证。
%h host(客户端IP地址,IPv4和IPv6)
%r 请求从客户端。这需要在请求特定的分隔符(单引号、双引号等)解析。否则,结合使用等特殊格式说明符%m  %U %q 和 %H解析单个字段。注意:使用 %r 得到完整的请求或 %m %U %q 和 %H形成你的请求,不同时使用。请求方法让

%m 请求的方法。
%U 请求URL路径。注意:如果查询字符串在%U,没有必要使用%q。然而,如果URL路径,不包括任何查询字符串,可以使用%q和查询字符串将被附加到请求。

%q 查询字符串。

%H 请求协议。
%s 服务器发送给客户机的状态代码。
%b 服务器发送发送给客户端的大小。
%R 来源
%u 用户代理HTTP请求头。
%D 服务请求的时间，以微秒为单位  $request_time 
%T 服务请求的时间，以秒为单位  $request_time 
%L 服务请求的时间，以毫秒为单位作为一个十进制数。
%^ 忽略这个领域。
%~ 前进通过日志字符串直到找到(!isspace)字符进行技术改造。
~h 主机(客户端IP地址,IPv4和IPv6)在X-Forwarded-For(XFF)领域。

For XFF, GoAccess uses a special specifier which consists of a tilde before the host specifier, followed by the character(s) that delimit the XFF field, which are enclosed by curly braces (i.e., ~h{,"}).
For example, ~h{," } is used in order to parse "11.25.11.53, 17.68.33.17" field which is delimited by a double quote, a comma, and a space.

XFF,GoAccess使用特殊说明符由波浪号主机之前,紧随其后的是字符(s)划入XFF字段,由花括号封闭(即~ h { })。
例如,h ~ { }的使用是为了解析”11.25.11.53,17.68.33.17”字段由一个双引号分隔,逗号,和空间。



```
goaccess  -f /www/logs/nginx.log  -a > /data/wwwroot/web/test/report1.html


-f 指定nginx日志文件
-p 指定日志格式文件
-o 输出到指定html文件
--real-time-html 实时刷新
--ws-url 绑定一个域名
```



## 生成HTML展示

将生成的文件用web服务器展示在浏览器上





































goaccess  -f /root/www.7477.com-access1000.log -a > /data/wwwroot/web/zabbix/1111/reporta1.html

goaccess  -f /root/test.log -a > /data/wwwroot/web/zabbix/1111/reporta6.html

goaccess  -f /root/www.7477.com-access181.log -a > /data/wwwroot/web/zabbix/1111/report.html
goaccess  -f /root/www.7477.com-access1000.log -a > /data/wwwroot/web/zabbix/1111/report1.html


goaccess  -f /root/www.funet8.com-access.log -a > /data/wwwroot/web/zabbix/1111/funet1.html


goaccess  -f /root/1000.log -a > /data/wwwroot/web/test/report1.html



















