# Windows系统激活命令



## 系统激活（推荐）

开源地址： https://github.com/massgravel/Microsoft-Activation-Scripts



PowerShell（推荐）

打开你的 Windows，右键单击 Windows 开始菜单并选择 PowerShell 或终端（不是 CMD）。复制并粘贴如下代码，然后按回车键。

```
irm https://get.activated.win | iex
```


按照屏幕上的说明轻松完成激活过程。



## KMS激活

通过 KMS (Key Management Service) 服务器进行 Windows 激活

```
slmgr /ipk W269N-WFGWX-YVC9B-4J6C9-T83GX
slmgr /skms kms.03k.org
slmgr /ato
```

