# Linux服务器配置SSH免密码登陆



## 实现功能

node179，node181，node182上实现www用户免密码访问，密钥登录。

在三台服务器上设置www的密码

```
#passwd www 
密码设置123456
```



服务器名称，修改hosts，ssh默认端口由22改改为60920：

```
node179 192.168.4.179
node181 192.168.4.181
node182 192.168.4.182
```



## 在node179上操作

```
# su -l www
$ ssh-keygen 【一路回车】

生成公钥和私钥
$ ll /home/www/.ssh/*   
-rw------- 1 www www 1679 Feb 18 11:13 /home/www/.ssh/id_rsa
-rw-r--r-- 1 www www  391 Feb 18 11:13 /home/www/.ssh/id_rsa.pub

$ ssh-copy-id -p 60920 "www@192.168.4.181" 
输入node181的密码
$ ssh-copy-id -p 60920 "www@192.168.4.182" 
输入node182的密码


测试：
$ ssh -p 60920 www@192.168.4.181
$ ssh -p 60920 www@192.168.4.182
是否需要密码
在node181查看 cat /home/www/.ssh/authorized_keys 是否有 node179的公钥。

```



## 在181上操作

```
# su -l www

$ ssh-keygen
$ ssh-copy-id -p 60920 "www@192.168.4.179"
测试登录：
ssh -p 60920 www@192.168.4.179


```



## 在182上操作

```
# su -l www

$ ssh-keygen
$ ssh-copy-id "-p 60920 www@192.168.4.179"
测试登录：
ssh -p 60920 www@192.168.4.179
```



## 第二种方法

直接将公钥写入到 authorized_keys文件中。

A服务器要免密钥登录到B服务器，则将A的公钥，写入到B的authorized_keys文件中。

```
# su -l www

$ mkdir /home/www/.ssh
$ chmod 700 /home/www/.ssh
$ vi /home/www/.ssh/authorized_keys 将179中的/home/www/.ssh/id_rsa.pub 写入
$ chmod 600 /home/www/.ssh/authorized_keys

在179上测试：
ssh -p 60920 www@192.168.4.182

```















