---
title: 开源免费软件一键瘦身你的Windows系统-Win11Debloat
createTime: 2025/05/27 17:51:17
permalink: /article/e6eu63ba/
---
# 开源免费软件一键瘦身你的Windows系统-Win11Debloat



# 前言

随着 Windows 11 的发布，许多用户发现系统中预装了大量的应用和功能，这些应用和功能可能会影响系统的性能和用户体验。为了帮助用户优化他们的 Windows 11 系统，可以使用一个名为 Win11Debloat 的工具。本文将详细介绍如何使用 Win11Debloat 来优化你的 Windows 11 系统。

![win11-win10-Win11Debloat](https://imgoss.xgss.net/picgo/win11-win10-Win11Debloat.jpg?aliyun)

## 什么是Win11Debloat

开源地址： https://github.com/Raphire/Win11Debloat

开源的介绍： A simple, easy to use PowerShell script to remove pre-installed apps from Windows, disable telemetry, remove Bing from Windows search as well as perform various other changes to declutter and improve your Windows experience. This script works for both Windows 10 and Windows 11.

翻译：

一个简单易用的 PowerShell 脚本，用于从 Windows 中删除预安装的应用程序、禁用遥测、从 Windows 搜索中删除 Bing 以及执行各种其他更改以整理和改善您的 Windows 体验。此脚本适用于 Windows 10 和 Windows 11。

您可以精确选择脚本要进行的修改，也可以使用默认设置。如果您对任何更改不满意，可以使用“Regfiles”文件夹中的注册表文件轻松恢复它们。所有被删除的应用程序都可以从 Microsoft 商店重新安装。



# 使用方法

## 快速方法

通过 PowerShell 自动下载并运行脚本。

1. 以管理员身份打开 PowerShell。
2. 将以下代码复制并粘贴到 PowerShell 中，按 Enter 运行脚本：

```
& ([scriptblock]::Create((irm "https://win11debloat.raphi.re/")))
```



1. 等待脚本自动下载 Win11Debloat。
2. 将打开一个新的 PowerShell 窗口，其中显示 Win11Debloat 菜单。选择默认或自定义模式以继续。
3. 仔细阅读并按照屏幕上的说明进行操作。

此方法支持[参数](https://github.com/Raphire/Win11Debloat#parameters)。要使用参数，只需按照上述说明运行脚本，但在末尾添加参数，中间用空格隔开。示例：

```
& ([scriptblock]::Create((irm "https://win11debloat.raphi.re/"))) -RunDefaults -Silent
```

## 传统方法

手动下载并运行脚本。

1. [下载最新版本的脚本](https://github.com/Raphire/Win11Debloat/archive/master.zip)，并将.ZIP 文件解压到所需位置。
2. 导航到 Win11Debloat 文件夹
3. 双击`Run.bat`文件启动脚本。注意：如果控制台窗口立即关闭且没有任何反应，请尝试下面的高级方法。
4. 接受 Windows UAC 提示以管理员身份运行脚本，这是脚本运行所必需的。
5. 现在将打开一个新的 PowerShell 窗口，显示 Win11Debloat 菜单。选择默认或自定义模式继续。
6. 仔细阅读并按照屏幕上的说明进行操作。

## 高级方法

手动下载脚本并通过 PowerShell 运行脚本。仅推荐高级用户使用。

1. [下载最新版本的脚本](https://github.com/Raphire/Win11Debloat/archive/master.zip)，并将.ZIP 文件解压到所需位置。
2. 以管理员身份打开 PowerShell。
3. 通过输入以下命令启用 PowerShell 执行：

```
Set-ExecutionPolicy Unrestricted -Scope Process
```

1. 在 PowerShell 中，导航到文件解压的目录。例如：`cd c:\Win11Debloat`
2. 现在通过输入以下命令来运行脚本：

```
.\Win11Debloat.ps1
```



1. Win11Debloat 菜单现在将打开。选择默认或自定义设置以继续。
2. 仔细阅读并按照屏幕上的说明进行操作。

此方法支持[参数](https://github.com/Raphire/Win11Debloat#parameters)。要使用参数，只需按照上述说明运行脚本，但在末尾添加参数，中间用空格隔开。示例：

```
.\Win11Debloat.ps1 -RemoveApps -DisableBing -Silent
```



# 实际演示

现在就用PowerShell演示

## 1.打开PowerShell

开始--->搜索PowerShell--->已管理员身份运行

![image-20240731172746765](https://imgoss.xgss.net/picgo/image-20240731172746765.png?aliyun)



## 2.执行命令

复制

```
& ([scriptblock]::Create((irm "https://win11debloat.raphi.re/")))
```

鼠标右键粘贴

![image-20240731173317278](https://imgoss.xgss.net/picgo/image-20240731173317278.png?aliyun)

开始下载

![image-20240731173500026](https://imgoss.xgss.net/picgo/image-20240731173500026.png?aliyun)



## 3.根据需要选择

![image-20240731173525273](https://imgoss.xgss.net/picgo/image-20240731173525273.png?aliyun)

会有三个选项

```
(1) Default Mode: Apply the default settings
(2) Custom Mode: Modify the script to your needs
(3) App removal mode: Select & remove apps, without making other changes

(0) Show more information
```

（1）默认模式：应用默认设置 
（2）自定义模式：根据需要修改脚本 
（3）应用程序删除模式：选择并删除应用程序，不做其他更改

建议第二种模式，自定义模式

### 选择2-自定义模式

出现以下界面

![image-20240731174111953](https://imgoss.xgss.net/picgo/image-20240731174111953.png?aliyun)

```
Options:
 (n) Don't remove any apps
 (1) Only remove the default selection of bloatware apps from 'Appslist.txt'
 (2) Remove default selection of bloatware apps, aswell as mail & calendar apps, developer apps and gaming apps
 (3) Select which apps to remove and which to keep
Remove any pre-installed apps? (n/1/2/3):
```

### 选择3-选择那些软件需要卸载或保留

进入下面的界面

![image-20240731174436973](https://imgoss.xgss.net/picgo/image-20240731174436973.png?aliyun)

点击“Only show installed”仅显示本机已安装的软件

再根据需要选择那些需要保留，那些需要卸载。

![image-20240731174651245](https://imgoss.xgss.net/picgo/image-20240731174651245.png?aliyun)

保留微软计算器等软件

![image-20240731174918260](https://imgoss.xgss.net/picgo/image-20240731174918260.png?aliyun)

点击confirm

输入y

![image-20240731175022822](https://imgoss.xgss.net/picgo/image-20240731175022822.png?aliyun)

根据实际需要选择

![image-20240731175513894](https://imgoss.xgss.net/picgo/image-20240731175513894.png?aliyun)



![image-20240731175324100](https://imgoss.xgss.net/picgo/image-20240731175324100.png?aliyun)



# 卸载完成

![image-20240731175920230](https://imgoss.xgss.net/picgo/image-20240731175920230.png?aliyun)



# 结尾

Win11Debloat 是一个强大的 Windows 11 优化工具，它可以帮助你快速清理系统中的冗余应用和不必要的元素，提升系统的纯净度和运行效率。通过简单的几步操作，你就可以让你的 Windows 11 系统变得更加清爽和高效。希望本文能帮助你更好地使用 Win11Debloat 来优化你的系统。

