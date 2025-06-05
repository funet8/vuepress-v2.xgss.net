# Nginx从入门到放弃03-Nginx调优

## 一、调优的必要性

在聊调优之前，我们先要知道为何调优，业务运行和调优的关系。

笔者把自己总结的文档分为几遍，合集在 https://g.xgss.net/nginx/

![42967083431970b0eb40b3949278a0d1.png](https://imgoss.xgss.net/picgo/1607251234038.png?aliyun)

业务运行：线上业务正常运行，承载了公司业务。
 监控业务：通过监控业务对线上业务进行监控，及时发现问题。
 优化业务：通过监控分析，发现业务问题或者瓶颈，及时对业务或者软件就行调整、优化。
 测试优化：优化完成后，需要对现有的优化进行测试，保证业务在当前优化模式中稳定、高效，能够解决当前问题。
 这就是业务运行的一个流程，也是我们保证业务稳定、高效、高可用的运维之道。

## 二、调优

调优类的文章是最难写的，因为我只能告诉你调优的选项，无法告诉你具体的阈值，因为不同的业务运行在不同的机器，所消耗的资源是不同的；又因为场景不同，对应的调优项及阈值是千变万化的。不能为了调优而调优，要根据实际情况、测试环境还是生产环境、实际业务等需求来实际配置，所以nginx的基本配置需要了解是什么意思，才能调优



### CPU优化

1）为什么要绑定nginx进程到不同的CPU上：CPU调度的时候两个进程有可能被分配达到一个CPU上，从而会导致一个非常的空闲，一个非常的忙，无法充分发挥CPU的运算能力

（2）如何分配不同的nginx进程给不同的CPU处理

```
4核CPU
# 启动工作进程数量
worker_processes  4;
#指定运行的核的编号，采用掩码的方式设置编号
worker_cpu_affinity   0001 0010 0100 1000;
```



### 最大打开文件数优化

```
events {
单个工作进程维护的请求队列长度
    worker_connections  65535;
}
```

如果65535改为1024，则会报错打开文件数过多，那为什么刚好1024也会报错呢，nginx内部的工作线程数也会占用，如果线程4个工作进程，则最大支持1020，如果现在是8个工作进程，则最大支持1016

### 开启高效传输模式

nclude mime.types ：媒体类型,include 只是一个在当前文件中包含另一个文件内容的指令。

default_type application/octet-stream ：默认媒体类型足够。

sendfile on：开启高效文件传输模式，sendfile指令指定nginx是否调用sendfile函数来输出文件，对于普通应用设为 on，如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统的负载。注意：如果图片显示不正常把这个改成off。

tcp_nopush on：必须在sendfile开启模式才有效，防止网路阻塞，积极的减少网络报文段的数量（将响应头和正文的开始部分一起发送，而不一个接一个的发送。

```
http {
    include mime.types; 
    default_type application/octet-stream; 
    …… 
    sendfile on; 
    tcp_nopush on;
    ……
}
```



调整服务器内核

```
# ulimit -a #查看所有的属性值
# ulimit -Hn 65535 #临时设置硬限制
# ulimit -Sn 65535 #设置软限制
# vim /etc/security/limits.conf
...
* soft nofile 65535
* hard nofile 65535

用户/组 软/硬限制 需要限制的项目 限制的值
*号表示任何用户
```

检查操作系统支持的最大文件数

```
# ulimit -a|grep files
open files                      (-n) 65535
```



安装ab 压测工具：

```bash
yum -y install httpd-tools 

安装后测每个worker 进程的并发数

# ab -n 1024 -c 1024 http://127.0.0.1/index.html

修改配置：worker_connections  1028;

# ab -n 1028 -c 1028 http://127.0.0.1/index.html
```



### 事件处理模型

nginx采用epoll事件模型，处理效率高。

```
events {
    use epoll; 
    worker_connections 65535;  # 单个worker进程允许客户端最大连接数
    multi_accept on; # 告诉nginx收到一个新连接通知后接受尽可能多的连接
}
```



### 长连接

减少服务器维护因为与客户端建立http连接产生的大量tcp三次握手四次断开的开销

设置连接超时

keepalive_timeout:该参数用于设置客户端连接保持会话的超时时间，超过这个时间服务器会关闭该连接

client_header_timeout:该参数用于设置客户端请求头数据的超时时间，如果超时客户端还没有发送完整的header数据，服务器将返回“Request time out(408)错误”

client_body_timeout:该参数用于设置客户端请求主题数据的超时时间，如果超时客户端还没有发送完整的主体数据，服务器将返回“Request time out(408)错误”

send_timeout:用于制定响应客户端的超时时间，如果超时这个时间，客户端没有任何活动,nginx将会关闭连接

tcp_nodelay:默认情况下当数据发生时，内核并不会马上发送，可能会等待更多的字节组成一个数据包，这样可以提高I/O的性能，但是，在每次发生很少字节的业务场景中，使用tcp_nodelay等待的时间会比较长。

```
keepalive_timeout  0;  0代表关闭
#keepalive_timeout  100;
#keepalive_requests 8192;

# 长连接超时配置
keepalive_timeout 65;
client_header_timeout 15s;
client_body_timeout 15s;
send_timeout 60s;

```

### fastcgi优化

FastCGI各大配置项详解

```
fastcgi_connect_timeout 240; #Nginx服务器和后端FastCGI服务器连接的超时时间
fastcgi_send_timeout 240; #Nginx服务器允许FastCGI服务器返回数据的超时时间，即在规定的时间内后端服务器必须传完所有的数据,否则Nginx将断开这个连接
fastcgi_read_timeout 240; #Nginx服务器允许FastCGI服务器读取响应信息的超时时间，表示连接建立成功后,Nginx等待后端服务器的响应时间
fastcgi_buffer_size 64k; #Nginx FastCGI的缓冲区大小，用来读取从FastCGI服务器收到的第一部分响应信息的缓冲区大小
fastcgi_buffer 4 64k; #设定用来读取从FastCGI服务器端收到的响应信息的缓冲区大小和缓冲区数量
fastcgi_busy_buffers_size 128k; #用于设置系统很忙时可以使用的proxy_buffers大小
```



### gzip压缩

降低传输时间，增加用户体验度；降低公司带宽费用，Gzip压缩可以配置http,server和location模块下

```
gzip  on;
gzip_proxied any;
gzip_min_length 1k;
gzip_buffers 4 8k;
gzip_comp_level 6;
gzip_types text/plain text/css application/x-javascript application/javascript application/xml;


    # 开启gzip
    gzip off;

    #Nginx做为反向代理的时候启用：
	off – 关闭所有的代理结果数据压缩
	expired – 如果header中包含”Expires”头信息，启用压缩
	no-cache – 如果header中包含”Cache-Control:no-cache”头信息，启用压缩
	no-store – 如果header中包含”Cache-Control:no-store”头信息，启用压缩
	private – 如果header中包含”Cache-Control:private”头信息，启用压缩
	no_last_modified – 启用压缩，如果header中包含”Last_Modified”头信息，启用压缩
	no_etag – 启用压缩，如果header中包含“ETag”头信息，启用压缩
	auth – 启用压缩，如果header中包含“Authorization”头信息，启用压缩
	any – 无条件压缩所有结果数据


    gzip_proxied any;


    # 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
    gzip_min_length 1k;

    # gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间，后面会有详细说明
    gzip_comp_level 1;

    # 进行压缩的文件类型。javascript有多种形式。其中的值可以在 mime.types 文件中找到。
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;

    # 增加响应头”Vary: Accept-Encoding”
    # 是否在http header中添加Vary: Accept-Encoding，建议开启
    gzip_vary on;

    # 禁用IE 6 gzip
    gzip_disable "MSIE [1-6]\.";

    # 设置压缩所需要的缓冲区大小     
    gzip_buffers 32 4k;

    # 设置gzip压缩针对的HTTP协议版本
    gzip_http_version 1.0;
```

Nginx的gzip压缩功能虽然好用，但是下面两类文件资源不太建议启用此压缩功能

a.图片类型资源（包括视频文件）

b.大文件资源



### expires缓存优化

将部分数据缓存在用户本地磁盘，用户加载时，如果本地和服务器的数据一致，则从本地加载。提升用户访问速度，提升体验度。节省公司带宽成本。

```
expires指令：开启缓存并指定静态缓存时间

location ~*  \.(png|gif)$ {
              expires 1h;  # 缓存1小时
              expires 30d; # 缓存30天
              expires max; # 最大缓存，10年
              expires -1; # 禁止缓存，永不过期
         }
```

### 隐藏版本号

隐藏nginx的版本显示，响应头信息可以看到nginx的版本号，版本号暴露是不安全的，所以需要隐藏下nginx的版本号，配置server_tokens off;下面就看不到了。

```
server_tokens off;
```



