# 使用SecureCRT上传、下载文件命令sz与rz用法实例



其中，对于sz和rz的理解与记忆我用了如下的方法（因为很多时候容易搞混）：

sz中的s意为send（发送），告诉客户端，我（服务器）要发送文件 send to cilent，就等同于客户端在下载。

rz中的r意为received（接收），告诉客户端，我（服务器）要接收文件 received by cilent，就等同于客户端在上传。



 注意：sz和rz命令需要服务器支持,如果提示没有个命令：




 可以用yum安装（Centos为例）： 

```
 yum install lrzsz -y
```

**下面用具体的示例说明 sz 以及 rz 的用法：**

sz用法（运行命令 sz 比ftp命令方便多了，而且服务器不需要另开FTP服务）：

```
\#下载一个文件
 sz filename
 \#下载多个文件
 sz filename1 filename2
 \#下载dir目录下的所有文件，不包含dir下的文件夹
 sz dir/*
```

 下载文件存放位置需要在securtCRT中设置，设置如下图：




##  rz用法

在命令终端输入rz回车后，就会出现文件选择对话框，选择需要上传文件，一次可以指定多个文件，上传到服务器的路径为当前执行rz命令的目录。



 注意：单独用rz会有两个问题：上传中断、上传文件变化（md5不同），解决办法是上传是用rz -be，并且去掉弹出的对话框中“Upload files as ASCII”前的勾选。
 -b binary 用binary的方式上传下载，不解释字符为ascii
 -e 强制escape 所有控制字符，比如Ctrl+x，DEL等。

 