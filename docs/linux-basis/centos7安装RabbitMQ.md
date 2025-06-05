# Centos7安装RabbitMQ



# 1、安装前准备

由于RabbitMQ使用的是Erlang语言开发的，因此在安装RabbitMQ之前需要安装Erlang环境，Erlang与RabbitMQ的下载地址分别为：

Erlang：https://github.com/rabbitmq/erlang-rpm/releases

RabbitMQ：https://github.com/rabbitmq/rabbitmq-server/releases



注意：RabbitMQ与Erlang安装时是有版本对于关系，可以查看：https://www.rabbitmq.com/which-erlang.html

## 版本选择（匹配Centos7）

![image-20230331105520563](https://imgoss.xgss.net/picgo/image-20230331105520563.png?aliyun)

由于高版本不支持Centos7后面这个el8,代表是Centos8才能安装的,高版本的RabbitMQ有些不支持Centos7,但是本篇博客用来演示的是Centos7的系统环境,所以小编在这只能带大家安装3.9.13的RabbitMQ了

### RabbitMQ： 3.9.13

https://github.com/rabbitmq/rabbitmq-server/releases/tag/v3.9.13

### Erlang：25.3

https://github.com/rabbitmq/erlang-rpm/releases/tag/v23.3.4



安装的系统为Centos7，因此在下载RabbitMQ与Erlang版本的时候需要下载xxx.el7的版本，我这里下载版本如下

```
rabbitmq-server-3.9.13-1.el7.noarch.rpm
下载：
# wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.9.13/rabbitmq-server-3.9.13-1.el7.noarch.rpm

erlang-23.3.4.11-1.el7.x86_64.rpm
下载： 
# wget https://github.com/rabbitmq/erlang-rpm/releases/download/v23.3.4/erlang-23.3.4-1.el7.x86_64.rpm

备用下载：
# wget  http://js.funet8.com/centos_software/rabbitmq/rabbitmq-server-3.9.13-1.el7.noarch.rpm
# wget  http://js.funet8.com/centos_software/rabbitmq/erlang-23.3.4-1.el7.x86_64.rpm
```

将下载好的文件上传到服务器。

# 2、安装Erlang

使用如下命令安装`Erlang`

```none
# rpm -ivh erlang-23.3.4-1.el7.x86_64.rpm 
warning: erlang-23.3.4-1.el7.x86_64.rpm: Header V4 RSA/SHA256 Signature, key ID cc4bbe5b: NOKEY
Preparing...                          ################################# [100%]
Updating / installing...
   1:erlang-23.3.4-1.el7              ################################# [100%]
```

# 3、安装RabbitMQ

上一步我们已经把Erlang安装成功，现在安装RabbitMQ，如下：

```
# rpm -ivh rabbitmq-server-3.9.13-1.el7.noarch.rpm 
warning: rabbitmq-server-3.9.13-1.el7.noarch.rpm: Header V4 RSA/SHA512 Signature, key ID 6026dfca: NOKEY
Preparing...                          ################################# [100%]
Updating / installing...
   1:rabbitmq-server-3.9.13-1.el7     ################################# [100%]
```



检查是否安装成功 rabitmqctl version

```
# rabitmqctl version
-bash: rabitmqctl: command not found
重装了一次就显示正常
# rabbitmqctl version
3.9.13
```

# 4、运行RabbitMQ服务器

## 4.1、启动服务器

添加开机启动RabbitMQ服务

```
chkconfig rabbitmq-server on
```

启动RabbitMQ服务

```
systemctl start rabbitmq-server
```

查看服务状态

```
systemctl status rabbitmq-server
```

停止服务

```
systemctl stop rabbitmq-server
```



## 4.2、安装WEB插件

RabbitMQ默认提供了WEB插件，方便通过页面进行RabbitMQ管理，需要执行如下命令启用WEB插件，启用之前如果RabbitMQ服务已经启动，则先停止服务。

```
systemctl stop rabbitmq-server
rabbitmq-plugins enable rabbitmq_management
```

查看端口

```
# netstat -tunpl|grep 15672
tcp        0      0 0.0.0.0:15672           0.0.0.0:*               LISTEN      2510/beam.smp   
```



重新启动RabbitMQ服务

```

通过地址：http://192.168.1.20:15672 然后访问RabbitMQ

开放防火墙端口： 15672

iptables -A INPUT -p tcp --dport 15672 -j ACCEPT
service iptables save
systemctl restart iptables
```

![image-20230331111350141](https://imgoss.xgss.net/picgo/image-20230331111350141.png?aliyun)

RabbitMQ默认提供了一个guest账户，默认的账户没有权限登录不了，因此接下来我们需要创建用户。

## 4.3、创建用户

### 创建账号

```
# rabbitmqctl add_user admin 123456
Adding user "admin" ...
Done. Don't forget to grant the user permissions to some virtual hosts! See 'rabbitmqctl help set_permissions' to learn more.
```

### 设置用户角色

```
rabbitmqctl set_user_tags admin administrator
```

### 设置用户权限

```
命令格式：rabbitmqctl set_permissions [-p <vhostpath>] <user> <conf> <write> <read>


rabbitmqctl set_permissions -p "/" admin ".*" ".*" ".*"
```



上面命令表示用户具有/vhost1这个virtual host中的所有资源配置、读、写权限

### 查看用户和角色

```
rabbitmqctl list_users
```

### 删除用户

```
rabbitmqctl delete_user guest
```



可以看到用户已经添加成功并设置了角色，现在就可以使用用户登录RabbitMQ了。

![image-20230331111757327](https://imgoss.xgss.net/picgo/image-20230331111757327.png?aliyun)



# 参考

https://www.cnblogs.com/tenghu/p/15887218.html