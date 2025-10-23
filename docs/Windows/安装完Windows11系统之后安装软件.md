---
title: 安装完Windows11系统之后安装软件
createTime: 2025/05/27 17:51:17
permalink: /article/uryepgb0/
---
# 我安装完Windows11系统之后的操作



# 前言

最近公司的办公电脑越来越卡，系统也越来越慢，把原来的WIN11的系统重装了一下，现在就是一个完全干干净净的系统，借着这个机会来记录一下我的 Window11 系统的 相关的一些配置。

# 系统激活

开源地址： https://github.com/massgravel/Microsoft-Activation-Scripts

PowerShell（推荐）

打开你的 Windows，右键单击 Windows 开始菜单并选择 PowerShell 或终端（不是 CMD）。复制并粘贴如下代码，然后按回车键。

```
irm https://get.activated.win | iex
```


按照屏幕上的说明轻松完成激活过程。

![image-20240706151840211](https://imgoss.xgss.net/picgo/image-20240706151840211.png?aliyun)



# 启动administrator账号

由于安装的时候没有启动administrator账号，需要启用管理员账号

使用命令提示符

  1. 打开开始菜单，搜索“命令提示符”并右键点击“以管理员身份运行”。

  2. 在命令提示符窗口中，输入以下命令并按下回车键：

     ```
     net user administrator /active:yes
     系统会显示“命令成功完成”的提示，表示管理员账户已经成功激活。
     ```

  3. 重新启动电脑，登录界面将会出现管理员账户选项。


# 磁盘管理

DiskGenius 进行磁盘分区的操作。

基础配置：

1.把桌面、下载等常用文件夹移动到非C盘系统盘



# 安装常用软件

# 聊天软件 or 办公

- [x] 微信

微信的文件管理路径，把旧电脑中的文件拷贝过来，聊天记录依然还在。

![image-20240711140237497](https://imgoss.xgss.net/picgo/image-20240711140237497.png?aliyun)

- [x] QQ（或者腾讯TIM）

- [x] 钉钉

- [x] 搜狗输入法，删除默认输入法

- [x] 网易邮箱大师

- [x] 好压

- [x] 百度网盘 、 阿里云盘

- [x] RaiDrive  https://www.raidrive.com/

- [x] Xmind

- [x] 迅雷   https://www.xunlei.com/

# mysoft 目录的软件，免安装

之前收集的免安装、或者开源的软件都会放到这个目录

- [x] Photoshop

- [x] BCompare

- [x] FlashFXP.exe

- [x] MobaXterm

- [x] OfficeBox官方绿色版

- [x] scrcpy

- [x] v2（敏感）rayN

- [x] 格式工厂

- [x] Tiny RDM （导出旧数据，导入数据）

  软件自带导出导入功能。

- [x] PotPlayer

# 浏览器

- [x] Chrome浏览器，登录账号同步信息
- [x] 火狐浏览器，登录账号同步信息
- [x] 360浏览器，登录账号同步信息
- [x] 其他浏览器



备注：

由于阿里云换了浏览器登录账号，需要使用手机号或者刷脸验证，这时候就要从旧的电脑导出cookie导入到新的电脑浏览器中

使用火狐浏览器的cookie-editor在阿里云的登录页导出cookie，再在新电脑的浏览器中导入cookie。



# 编程软件

- [x] git   https://git-scm.com/  配置ssh秘钥

```
  git命令行界面：
  git config --global user.name "your_github_username"
  git config --global user.email "your_github_email"
  生成密钥：
  ssh-keygen -t rsa

在旧电脑上把秘钥复制到新电脑上。
  cd 
  cd .ssh
  cat id_rsa.pub   # 把本机的公钥填到gitee和github中，实现免密码登录。
  cat id_rsa

```

- [x] Sourcetree  。  https://www.sourcetreeapp.com/  

- [x] VS Code  https://code.visualstudio.com/

  vscode设置中文：

  ```
   安装之后打开软件 ，CTRL+SHIFT+P 搜索 “configure language”
  
  在弹出的搜索框中输入【configure language】，然后选择搜索出来的【Configure Display Language】
  
  ```

- [x] BCompare

- [x] SwitchHosts

- [x] Navicat   Navicat Premium Lite 是官方推出的免费版本 https://www.navicat.com.cn/download/navicat-premium-lite

  连接可以导出，再导入

- [x] vnc viewer  导出导入连接

- [x] SecureCRT

- [x] python3.10  https://www.python.org/downloads/

  ```
  或者直接在命令行中输入 python
  调出 Microsoft Store 
  再安装
  ```

- [x] 加密软件 -V3.8S_Client

  ```
  地址： 192.168.1.254
  端口： 8020
  用户名： ****
  密码： *****
  ```

  


# 文件同步

- [x] FreeFileSync  https://freefilesync.org/ 定时将重要文件夹备份到移动硬盘，添加定时任务

  

- [x] ngrok 内网穿透，并且设置开机启动。

  

- [x] 连接 共享

  ```
  \\192.168.1.10\落地页资源共享
  输入用户名和密码
  用户名： www
  密码: ****
  
  \\192.168.1.50\技术部
  
  账号：*****
  密码：******

  ```
  
  

# 文档编辑

- [x] Typora+PicGo  配置图床并且可以上传图片到云端。  https://g.xgss.net/software/Typora_PicGo_Gitee_markdown_pic.html

  主题设置： 打开Typora，文件->偏好设置，路径为：C:\Users\用户名\AppData\Roaming\Typora\themes

- [x] nodepad++

- [x] WPS

- [x] 有道云笔记

# 其他软件

- [x] Nox 或 MuMu

- [x] vmware  VMware 虚拟机正式对个人免费  https://www.iplaysoft.com/vwmare-free.html

  将之前旧的虚拟机移动到新的

- [x] Billfish 和 Eagle（收费）  https://www.billfish.cn/

- [x] PotPlayer   http://potplayer.tv/?lang=zh_CN

- [x] Adobe Reader

# 删除自带输入法

点击开始菜单，打开设置。
在设置中找到并点击“时间和语言”。
在“时间和语言”菜单中，点击“语言&区域”。
在语言选项中，找到你想要删除的输入法，点击其右侧的三个点，然后选择“删除”。
如果你电脑只有一个输入法，需要先添加一个其他的输入法，然后再删除不需要的输入法。

# 添加一个网络

由于需要管理一个网关（IP: 192.168.10.100），内网的IP段是192.168.1.1/24， 所以需要添加一个ip 192.168.10.251

网络连接

![image-20240711181045705](https://imgoss.xgss.net/picgo/image-20240711181045705.png?aliyun)



![image-20240711181120390](https://imgoss.xgss.net/picgo/image-20240711181120390.png?aliyun)

