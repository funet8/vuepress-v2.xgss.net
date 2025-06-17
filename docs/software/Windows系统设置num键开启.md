---
title: Windows系统设置num键开启
createTime: 2025/06/16 16:11:19
permalink: /article/kmjaj6qd/
---


## Windows系统设置 num 键开启

开机后，准备输入密码之前，默认 num 键是关闭的，因此小键盘不能用，需要按下 num 键才能使用小键盘：

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1750061609367.png?tx)

我们可以设置为，开机后直接能使用小键盘。

## 设置注册表

打开注册表编辑器（win + R 运行 regedit），找到 Computer\HKEY_USERS.DEFAULT\Control Panel\Keyboard，选择 InitialKeyboardIndicators，修改其值为 2

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1750061635507.png?tx)



