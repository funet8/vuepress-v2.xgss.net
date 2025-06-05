# 一文学会curl和curl详解

# 什么是curl

cURL是一个利用URL语法在命令行下工作的文件传输工具，1997年首次发行。它支持文件上传和下载，所以是综合传输工具，但按传统，习惯称cURL为下载工具。

你可以把 CURL 想象成一个精简的命令行网页浏览器。它支持几乎你能想到的所有协议，可以交互访问几乎所有在线内容。唯一和浏览器不同的是，cURL 不会渲染接收到的相应信息。curl和wget类似也支持上传下载等感觉比wget更强大，但我觉得用途方面更偏重于模拟网络请求，而下载方面我更喜欢用wget，curl的用法也和wget类似！

cURL支持的通信协议有FTP、FTPS、HTTP、HTTPS、TFTP、SFTP、Gopher、SCP、Telnet、DICT、FILE、LDAP、LDAPS、IMAP、POP3、SMTP和RTSP。

![curl](https://imgoss.xgss.net/picgo/curl.jpg?aliyun)

# 常用参数

```
获取帮助：
curl --help
```



| 参数                    | 描述                                              |
| ----------------------- | ------------------------------------------------- |
| -I/--head               | 只显示传输文档，经常用于测试连接本身              |
| -o/--output             | 把输出写到该文件中，必须输入保存文件名            |
| -O/--remote-name        | 把输出写到该文件中，保留远程文件的文件名          |
| -F/--form               | 模拟表单提交                                      |
| -s/--silent             | 静默模式，不输出任何东西                          |
| -S/--show-error         | 显示错误，在选项 -s 中，当 curl 出现错误时将显示  |
| -L/--location           | 跟踪重定向                                        |
| -f/--fail               | 不输出错误                                        |
| -n/--netrc              | 从netrc文件中读取用户名和密码                     |
| --netrc-optional        | 使用 .netrc 或者 URL来覆盖-n                      |
| --ntlm                  | 使用 HTTP NTLM 身份验证                           |
| -N/--no-buffer          | 禁用缓冲输出                                      |
| -p/--proxytunnel        | 使用HTTP代理                                      |
| --proxy-anyauth         | 选择任一代理身份验证方法                          |
| --proxy-basic           | 在代理上使用基本身份验证                          |
| --proxy-digest          | 在代理上使用数字身份验证                          |
| --proxy-ntlm            | 在代理上使用ntlm身份验证                          |
| -P/--ftp-port           | 使用端口地址，而不是使用PASV                      |
| -M/--manual             | 显示全手动                                        |
| -Q/--quote              | 文件传输前，发送命令到服务器                      |
| -r/--range              | 检索来自HTTP/1.1或FTP服务器字节范围               |
| --range-file            | 读取（SSL）的随机文件                             |
| -R/--remote-time        | 在本地生成文件时，保留远程文件时间                |
| --retry                 | 传输出现问题时，重试的次数                        |
| --retry-delay           | 传输出现问题时，设置重试间隔时间                  |
| --retry-max-time        | 传输出现问题时，设置最大重试时间                  |
| --socks4                | 用socks4代理给定主机和端口                        |
| --socks5                | 用socks5代理给定主机和端口                        |
| -t/--telnet-option      | Telnet选项设置                                    |
| --trace                 | 对指定文件进行debug                               |
| --trace-ascii Like      | 跟踪但没有hex输出                                 |
| --trace-time    跟踪/   | 详细输出时，添加时间戳                            |
| -T/--upload-file        | 上传文件                                          |
| -u/--user               | 设置服务器的用户和密码                            |
| -U/--proxy-user         | 设置代理用户名和密码                              |
| -V/--version            | 显示版本信息                                      |
| -w/--write-out [format] | 什么输出完成后                                    |
| -x/--proxy              | 在给定的端口上使用HTTP代理                        |
| -X/--request            | 指定什么命令                                      |
| -y/--speed-time         | 放弃限速所要的时间。默认为30                      |
| -Y/--speed-limit        | 停止传输速度的限制，速度时间'秒                   |
| -z/--time-cond          | 传送时间设置                                      |
| -0/--http1.0            | 使用HTTP 1.0                                      |
| -1/--tlsv1              | 使用TLSv1（SSL）                                  |
| -2/--sslv2              | 使用SSLv2的（SSL）                                |
| -3/--sslv3              | 使用的SSLv3（SSL）                                |
| --3p-quote              | like -Q for the source URL for 3rd party transfer |
| --3p-url                | 使用url，进行第三方传送                           |
| --3p-user               | 使用用户名和密码，进行第三方传送                  |
| -4/--ipv4               | 使用IP4                                           |
| -6/--ipv6               | 使用IP6                                           |
| -#/--progress-bar       | 用进度条显示当前的传送状态                        |



## 常用参数分类

```bash
# 调试类
-v, --verbose                          输出信息
-q, --disable                          在第一个参数位置设置后 .curlrc 的设置直接失效，这个参数会影响到 -K, --config -A, --user-agent -e, --referer
-K, --config FILE                      指定配置文件
-L, --location                         跟踪重定向 (H)

# CLI显示设置
-s, --silent                           Silent模式。不输出任务内容
-S, --show-error                       显示错误. 在选项 -s 中，当 curl 出现错误时将显示
-f, --fail                             不显示 连接失败时HTTP错误信息
-i, --include                          显示 response的header (H/F)
-I, --head                             仅显示 响应文档头
-l, --list-only                        只列出FTP目录的名称 (F)
-#, --progress-bar                     以进度条 显示传输进度

# 数据传输类
-X, --request [GET|POST|PUT|DELETE|…]  使用指定的 http method 例如 -X POST
-H, --header <header>                  设定 request里的header 例如 -H "Content-Type: application/json"
-e, --referer                          设定 referer (H)
-d, --data <data>                      设定 http body 默认使用 content-type application/x-www-form-urlencoded (H)
    --data-raw <data>                  ASCII 编码 HTTP POST 数据 (H)
    --data-binary <data>               binary 编码 HTTP POST 数据 (H)
    --data-urlencode <data>            url 编码 HTTP POST 数据 (H)
-G, --get                              使用 HTTP GET 方法发送 -d 数据 (H)
-F, --form <name=string>               模拟 HTTP 表单数据提交 multipart POST (H)
    --form-string <name=string>        模拟 HTTP 表单数据提交 (H)
-u, --user <user:password>             使用帐户，密码 例如 admin:password
-b, --cookie <data>                    cookie 文件 (H)
-j, --junk-session-cookies             读取文件中但忽略会话cookie (H)
-A, --user-agent                       user-agent设置 (H)

# 传输设置
-C, --continue-at OFFSET               断点续转
-x, --proxy [PROTOCOL://]HOST[:PORT]   在指定的端口上使用代理
-U, --proxy-user USER[:PASSWORD]       代理用户名及密码

# 文件操作
-T, --upload-file <file>               上传文件
-a, --append                           添加要上传的文件 (F/SFTP)

# 输出设置
-o, --output <file>                    将输出写入文件，而非 stdout
-O, --remote-name                      将输出写入远程文件
-D, --dump-header <file>               将头信息写入指定的文件
-c, --cookie-jar <file>                操作结束后，要写入 Cookies 的文件位置
```

# 常用curl实例

通用语法：

```
curl [option] [URL...]在处理URL时其支持类型于SHELL的名称扩展功能
```



## 1.查看源码

直接curl 网址，源码就会打印在命令行上

```
curl www.baidu.com
```



## 2.保存成文件(-O)

-O参数将服务器回应保存成文件，并将 URL 的最后部分当作文件名。

```sh
curl -o home.html  http://www.sina.com.cn
```

-o参数将服务器的回应保存成文件，等同于wget命令。

```
curl -o example.html https://www.example.com
```



## 3.显示网页头部信息(-i)

 用-i,也会把网页信息显示出来

```
# curl -i www.baidu.com

使用-I 发起head请求
curl -I https://www.xgss.net/demo

```



## 4. 显示通信的过程(-v)

详细显示请求响应相关信息

```
curl -v www.baidu.com
```



## 5.详细的通信信息(--trance) 

文件名 url,具体信息保存到单独的文件中

```
curl --trace info.txt www.baidu.com
```



## 6.指定请求方法（-X）

-X参数指定 HTTP 请求的方法。

http的动作，例如GET POST，PUT，DELETE等,需要参数

```
curl -X POST www.baidu.com
curl -X POST --data "data=xxx" example.com/form.cgi
```



POST-json格式

```
$ curl -H "Content-Type: application/json" -X POST -d '{"id": "001", "name":"张三", "phone":"13099999999"}'  http://localhost:2000/api/json
```



POST发送请求的数据体可以用-d

```
curl -X POST -d'login=emma&password=123' https://baidu.com/login

curl -X POST -d 'login=emma' -d 'password=123' https://baidu.com/login
```



使用-d参数以后，HTTP 请求会自动加上标头Content-Type :
application/x-www-form-urlencoded。并且会自动将请求转为 POST 方法，因此可以省略-X POST。-d参数可以读取本地文本文件的数据，向服务器发送。

```
curl -d 'data.txt' https://baidu.com/login
```



## 7.页面来源(--referer)

使用参数表示的是你从哪个页面来的

```
curl --referer www.baidu.com www.xgss.net
curl访问 www.xgss.net，referer是www.baidu.com
```

`-e`参数用来设置 HTTP 的标头`Referer`，表示请求的来源。

```
curl -e 'https://google.com?q=example' https://www.xgss.net/?st7
nginx日志：
GET /?st7 HTTP/1.1 - 200 - curl/7.29.0 - www.xgss.net - from:https://google.com?q=example - POST:- - COOKIE:-
```



## 8.伪造User Agent( -A )

User Agent字段，这个字段表示的是客户端设备的信息，服务器可能会根据这个User Agent字段来判断是手机还是电脑

--user-agent 可以用-A或者-H来替代

```
curl --user-agent "$UA" url

比如IPhone 
Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5

命令：
# UA='Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5'
# curl --user-agent "$UA" www.xgss.net?s8
nginx日志：
GET /?s8 HTTP/1.1 - 200 - Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5 - www.xgss.net - from:- - POST:- - COOKIE:-
```



## 9.携带cookie信息(--cookie)

```
curl --cookie "name=xxx" www.xgss.net?s9

`-c cookie-file`可以保存服务器返回的cookie到文件，
`-b cookie-file`可以使用这个文件作为cookie信息，进行后续的请求。

 nginx日志：
 GET /?s9 HTTP/1.1 - 200 - curl/7.29.0 - www.xgss.net - from:- - POST:- - COOKIE:name=xxx
```



## 10.增加头部信息(-H)

使用 --header或者-H参数添加 HTTP 请求的标头。

```
curl --header "Content-Type:application/json" http://www.xgss.net/?s10

curl -H 'Accept-Language: en-US' -H 'Secret-Message: xyzzy' https://google.com
```



## 11.发起get请求并发送数据( -G -d )

```
curl -G -d "hello" -v http://www.xgss.net/?s11

nginx日志：
GET /?s11&hello HTTP/1.1 - 200 - curl/7.29.0 - www.xgss.net - from:- - POST:- - COOKIE:-
```



## 12.模拟用户登录(-u)

使用-u 提供用户名密码，或者 --user

```sh
# 此参数相当于设置http头 Authorization:
curl --user user:password http://www.xgss.net/login.php
# 使用用户名、密码认证，此参数会覆盖“-n”、“--netrc”和“--netrc-optional”选项

curl http://admin:admin@localhost:9002/actuator

```



## 13.保存cookie信息(-c)

使用-c 保存服务端响应的cookie

```sh
curl -u 'admin:admin' -c cookie.txt http://localhost:9002/actuator
```



## 14.使用cookie文件(-b)

```sh
curl -b ./cookie_c.txt  http://blog.mydomain.com/wp-admin
```



## 15.模拟模拟登录(-D)

-c(小写)`产生的cookie和`-D里面的cookie是不一样的

```sh
curl -D ./cookie_D.txt -F log=aaaa -F pwd=****** http://blog.mydomain.com/login.php
```



## 16.断点续传(-C)

```sh
curl -C -O http://www.xgss.net/?s16
```



## 17.传送数据( -d)

-d参数用于发送 POST 请求的数据体

最好用登录页面测试，因为你传值过去后，回抓数据，你可以看到你传值有没有成功

```sh
curl -d log=aaaa  http://www.xgss.net/wp-login.php?s17

登录服务器查看日志：
POST /wp-login.php?s1 HTTP/1.1 - 302 - curl/7.29.0 - www.xgss.net - from:- - POST:log=aaaa - COOKIE:-

模拟登录：
curl  -d "username=admin&password=123456" https://baidu.com/login/
```



## 18.显示抓取错误 (-f)

```sh
curl -f https://www.xgss.net/asdf
curl: (22) The requested URL returned error: 404 Not Found
```



## 19.代理访问(-x)

当我们经常用curl去搞人家东西的时候，人家会把你的IP给屏蔽掉的,这个时候,我们可以用代理

```sh
curl -x 10.10.90.83:80 -o home.html https://www.xgss.net/?s19

curl -x socks5://james:cats@myproxy.com:8080 https://www.example.com
```

如果没有指定代理协议，默认为 HTTP

```
curl -x james:cats@myproxy.com:8080 https://www.example.com
```



## 20.分段下载

比较大的东西，我们可以分段下载

```sh
curl -r 0-100 -o img.part1 http://mydomian.cn/thumb/xxx.jpg
  % Total    % Received % Xferd  Average Speed  Time    Time    Time  Current
                                Dload  Upload  Total  Spent    Left  Speed
100  101  100  101    0    0  1926      0 --:--:-- --:--:-- --:--:--    0
curl -r 100-200 -o img.part2 http://mydomian.cn/thumb/xxx.jpg
  % Total    % Received % Xferd  Average Speed  Time    Time    Time  Current
                                Dload  Upload  Total  Spent    Left  Speed
100  101  100  101    0    0  3498      0 --:--:-- --:--:-- --:--:--  98k
curl -r 200- -o img.part3 http://mydomian.cn/thumb/xxx.jpg
  % Total    % Received % Xferd  Average Speed  Time    Time    Time  Current
                                Dload  Upload  Total  Spent    Left  Speed
100 13515  100 13515    0    0  154k      0 --:--:-- --:--:-- --:--:--  280k
ll |grep img.part
```

用的时候，把他们cat一下就OK了,`cat img.part* >img.jpg`



## 21.不错误和进度(-s)

-s参数将不输出错误和进度信息。

```sh
curl -s https://www.example.com
```

-S参数指定只输出错误信息，通常与-s一起使用。

```
$ curl -s -o /dev/null https://google.com
```



## 22.显示下载进度条(-#)

```sh
curl -# -O  http://www.mydomain.com/linux/25002_3.html
######################################################################## 100.0%
```



## 23.通过ftp下载文件

```sh
curl -u 用户名:密码 -O http://blog.mydomain.com/demo/curtain/bbstudy_files/style.css
% Total    % Received % Xferd  Average Speed  Time    Time    Time  Current
Dload  Upload  Total  Spent    Left  Speed
101  1934  101  1934    0    0  3184      0 --:--:-- --:--:-- --:--:--  7136
或者用下面的方式
curl -O ftp://xukai:test@192.168.242.144:21/www/focus/enhouse/index.php
  % Total    % Received % Xferd  Average Speed  Time    Time    Time  Current
                                Dload  Upload  Total  Spent    Left  Speed
100 87518  100 87518    0    0  2312k      0 --:--:-- --:--:-- --:--:-- 11.5M
```



## 24.通过ftp上传(-T)

-T localfile  向服务器PUT文件

```sh
curl -T xukai.php ftp://xukai:test@192.168.242.144:21/www/focus/enhouse/
  % Total    % Received % Xferd  Average Speed  Time    Time    Time  Current
                                Dload  Upload  Total  Spent    Left  Speed
100 87518    0    0  100 87518      0  2040k --:--:-- --:--:-- --:--:-- 8901k
```

## 25.跳过 SSL 检测(-k)

-k参数指定跳过 SSL 检测。

```
curl -k https://www.xgss.net
```



## 26.跟随服务器的重定向(-L)

-L参数会让 HTTP 请求跟随服务器的重定向。curl 默认不跟随重定向。

```
curl -L -d 'tweet=hi' https://api.twitter.com/tweet
```

## 27.限速下载

`--limit-rate`用来限制 HTTP 请求和回应的带宽，模拟慢网速的环境。

```
$ curl --limit-rate 200k https://google.com
```



# 高级下载功能

## 1.循环下载(-O)

```sh
$curl -O http://mydomain.net/~zzh/screen[1-10].JPG
```

## 2.循环（匹配）下载

```sh
$curl -O http://mydomain.net/~{zzh,nick}/[001-201].JPG  # >like zzh/001.JPG
```

## 3.循环（引用）下载

```sh
$ curl -o #2_#1.jpg http://mydomain.net/~{zzh,nick}/[001-201].JPG # like >001_zzh.jpg

$ curl http://www.jbxue.com/archive[1996-1999]/vol[1-4]/part{a,b,c}.html 可以生成多个期望的URL
```

## 4.断点续传(-c -O)

```sh
$curl -c -O http://mydomain.net/~zzh/screen1.JPG
```

## 5.分块下载(-r)

```sh
$curl -r  0 -10240  -o "zhao.part1"  http://mydomain.net/~zzh/zhao1.mp3 &\
$curl -r 10241 -20480  -o "zhao.part1"  http://mydomain.net/~zzh/zhao1.mp3 &\
$curl -r 20481 -40960  -o "zhao.part1"  http://mydomain.net/~zzh/zhao1.mp3 &\
$curl -r 40961 - -o  "zhao.part1"  http://mydomain.net/~zzh/zhao1.mp3
...
$cat zhao.part* > zhao.mp3
```



## 6.模拟http basic auth登录配置密码

curl 命令模拟http basic auth登录基本格式：

```
curl --basic -u users:passwd  https://www.xgss.net
```



## 7.绕过CDN指定源站访问

实现绑定hosts访问

```
curl -voa https://www.xgss.net -x 1.2.3.4:80
```







