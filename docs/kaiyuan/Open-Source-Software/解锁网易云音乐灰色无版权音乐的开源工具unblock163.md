# 解锁网易云音乐灰色无版权音乐的开源工具unblock163

## 什么是unblock163.sh

该脚本基于 UnblockNeteaseMusic 项目 https://github.com/nondanee/UnblockNeteaseMusic。

UnblockNeteaseMusic 是一个可以解锁网易云音乐灰色无版权音乐的代理工具。
原理是通过替换无版权音乐的链接为其他音源（QQ、酷我、酷狗、百度、咪咕、JOOX等）来实现解锁无版权音乐。相当于在网易云音乐客户端中听全网版权音乐！

建议有条件的部署在国内服务器，国外服务器只能用 QQ 音源，况且部署在国外相比国内或本地会慢上不少。

![wangyi-music.webp](https://imgoss.xgss.net/picgo/wangyi-music.webp.jpg?aliyun)

# 系统要求

CentOS 6+ / Debian 6+ / Ubuntu 14.04 +

需要购买云服务器

# 服务器安装方法

注意：因为涉及防火墙端口开关、服务脚本安装，所以脚本需要以 ROOT 用户执行。

如果你要更新脚本，除了使用脚本中的 [0. 更新脚本] 功能以外，还可以再次输入下面这一行代码。

执行下面一行代码下载并运行脚本：

```
wget -N --no-check-certificate https://shell.xiu2.xyz/unblock163.sh && chmod +x unblock163.sh && bash unblock163.sh
```

下载运行后会提示你输入数字来选择要做什么。 输入 1 ，就会开始安装了，根据提示依次输入配置信息(或直接回车使用默认配置)即可。

```bash
请输入数字 [0-10]:1
[信息] 开始设置 用户配置...
请输入要使用的代理端口。 [1-65535]
[注意] 如果你在本地通过 Hosts 方式使用该代理，那么只能选择 80 端口，格式示例：80
[注意] 如果需要搭配自签证书，那么还需要配置 HTTPS 端口，格式：HTTP:HTTPS，两个端口不能相同，格式示例：80:443"
(默认: 80):

------------------------
    代理端口 :  80 
------------------------

请输入要使用的音源排序。 [qq kuwo kugou baidu xiami migu joox]
[注意] 音源排序指的是，无版权音乐会根据此处顺序优先匹配首位音源，如果匹配到就返回，反之就继续往后匹配。
[注意] 不同音源之间请用空格隔开。
(默认: qq migu kuwo kugou baidu):

------------------------
    音源排序 :  qq migu kuwo kugou baidu 
------------------------

是否启用严格模式？[Y/n]
[注意] 启用严格模式后，本代理仅允许网易云音乐域名访问，即本地设备只能通过 Host 或 PAC 使用，强烈建议开启，否则所有设备流量都会经过本代理。
(默认：Y [启用]):

------------------------
    严格模式 :  YES 
------------------------

指定网易服务器 IP，不懂请跳过。[格式：IPv4]
(默认为空):

------------------------
    指定 IP :   
------------------------

[信息] 开始安装/配置 依赖...
[信息] 开始下载/安装...
```

如果安装过程没有出错，那么最后就会提示：

![image-20220207163359469](https://imgoss.xgss.net/picgo/image-20220207163359469.png?aliyun)

```bash
    UnblockNeteaseMusic 配置信息：
    ------------------------
    本机地址: X.X.X.X
    代理端口: 80
    音源排序: qq migu kuwo kugou baidu
    严格模式: YES
    指定 IP: 
    PAC 地址: http://X.X.X.X:80/proxy.pac
```

# 使用方法

## 客户端使用

安装并启动成功后，就可以在本地设备上使用了。
以下两种模式任选其一，不要同时使用。

## Hosts模式

在 Hosts 末尾中添加下面两行：

**X.X.X.X 更换成你的服务器IP**

```
X.X.X.X music.163.com
X.X.X.X interface.music.163.com
```




## PAC模式

如果无法配置 Hosts（例如手机），那么可以使用 PAC。 修改设备的代理自动配置为下面一行内容：

```
http://X.X.X.X:端口/proxy.pac
```

**X.X.X.X 指的是你的服务器IP，端口是你的代理端口，记得修改，不要傻傻的跟着写。**



## 各平台PAC设置步骤

# 脚本说明

```
bash unblock163.sh
```


输入对应的数字来执行相应的命令。

```
 UnblockNeteaseMusic 一键脚本 [vX.X.X]

    0. 更新脚本

----------

    1. 安装
    2. 更新
    3. 卸载

----------

    4. 启动
    5. 停止
    6. 重启

----------

    7. 设置 配置信息
    8. 查看 账号信息
    9. 查看 日志信息
   10. 查看 链接信息

 当前状态: 已安装 并 已启动

 请输入数字 [0-10]:
```



# 文件位置

```
安装目录：/usr/local/UnblockNeteaseMusic
日志文件：/usr/local/UnblockNeteaseMusic/UnblockNeteaseMusic.log
```

# 其他命令

除了用脚本启动、停止、重启以外，还能通过其他命令操作。

```
启动：/etc/init.d/unblock163 start
停止：/etc/init.d/unblock163 stop
重启：/etc/init.d/unblock163 restart
查看状态：/etc/init.d/unblock163 status

http://X.X.X.X:端口/proxy.pac
		

日志：
tail -f /usr/local/UnblockNeteaseMusic/UnblockNeteaseMusic.log
```

# 注意事项

启动失败的可能原因

端口被占用如果日志中显示以下内容，即说明端口被占用了。

```
HTTP Server running @ http://0.0.0.0:80
events.js:174
      throw er; // Unhandled 'error' event
      ^
Error: listen EADDRINUSE: address already in use 0.0.0.0:80
    at Server.setupListenHandle [as _listen2] (net.js:1279:14)
    at listenInCluster (net.js:1327:12)
    at doListen (net.js:1460:7)
    at process._tickCallback (internal/process/next_tick.js:63:19)
Emitted 'error' event at:
    at emitErrorNT (net.js:1306:8)
    at process._tickCallback (internal/process/next_tick.js:63:19)

```

实际报错

```
cat  /usr/local/UnblockNeteaseMusic/UnblockNeteaseMusic.log
/usr/local/UnblockNeteaseMusic/node/bin/node: /lib64/libm.so.6: version `GLIBC_2.27' not found (required by /usr/local/UnblockNeteaseMusic/node/bin/node)
/usr/local/UnblockNeteaseMusic/node/bin/node: /lib64/libc.so.6: version `GLIBC_2.25' not found (required by /usr/local/UnblockNeteaseMusic/node/bin/node)
/usr/local/UnblockNeteaseMusic/node/bin/node: /lib64/libc.so.6: version `GLIBC_2.28' not found (required by /usr/local/UnblockNeteaseMusic/node/bin/node)
/usr/local/UnblockNeteaseMusic/node/bin/node: /lib64/libstdc++.so.6: version `CXXABI_1.3.9' not found (required by /usr/local/UnblockNeteaseMusic/node/bin/node)
/usr/local/UnblockNeteaseMusic/node/bin/node: /lib64/libstdc++.so.6: version `GLIBCXX_3.4.20' not found (required by /usr/local/UnblockNeteaseMusic/node/bin/node)
/usr/local/UnblockNeteaseMusic/node/bin/node: /lib64/libstdc++.so.6: version `GLIBCXX_3.4.21' not found (required by /usr/local/UnblockNeteaseMusic/node/bin/node)

出现 /lib64/libm.so.6: versionGLIBC_2.23’ not found` 需要升级Glibc

yum -y install bison

```

# 其他

阿里云/腾讯云/微软云/谷歌云等无法连接的可能原因
阿里云/腾讯云/微软云/谷歌云等服务商的云服务器，服务器与网络实际上是分开的，所以分为内网防火墙和外网防火墙，脚本只能修改到内网防火墙，外网防火墙需要你自行去后台寻找 [防火墙/安全规则/端口规则] 等字样相关选项开放代理端口。



原文地址： https://shell.xiu2.xyz/#/md/unblock163

