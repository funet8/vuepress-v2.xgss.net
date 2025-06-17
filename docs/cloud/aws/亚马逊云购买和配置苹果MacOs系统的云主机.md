---
title: 亚马逊云购买和配置苹果MacOs系统的云主机
createTime: 2025/05/27 17:51:17
permalink: /article/7dg12sgl/
---
# 亚马逊云购买和配置苹果MacOs系统的云主机



## 前言

由于产品部门需要在苹果 App Store提交应用，以往都是租用第三方的苹果设备。就购买MacOs系统的云主机给到市场部提交ios应用审批。

![mac-aws](https://imgoss.xgss.net/picgo/mac-aws.jpg?aliyun)

## 地域和价格

地域，目前香港地域没有mac资源，亚洲的新加坡有节点有mac系统，以下就用新加坡节点来购买。

### mac1的成本 1000刀/月

新加坡 12核+32g+100G 如图

![image-20220829184326771](https://imgoss.xgss.net/picgo/image-20220829184326771.png?aliyun)

### mac2的成本（ 580.67刀/月）

8核+16g+100G 如图：

![image-20220829184131580](https://imgoss.xgss.net/picgo/image-20220829184131580.png?aliyun)

其中还不包含网络费用。

**注意：只有销毁才不收费，关机要收费。最低消费24小时。**

官方价格计算器： https://calculator.aws/#/addService/EC2DedicatedHosts

# 购买mac系统实例

### 1.登录亚马逊云EC2，选择新加坡节点，点击'专属主机'

![image-20220829184920503](https://imgoss.xgss.net/picgo/image-20220829184920503.png?aliyun)

### 2.点击“分配专属主机”

![image-20220829185105108](https://imgoss.xgss.net/picgo/image-20220829185105108.png?aliyun)

### 3.编辑“分配专属主机”页面

实例类型选择mac2，实例自动置放、主机恢复默认就行

![image-20220829185136364](https://imgoss.xgss.net/picgo/image-20220829185136364.png?aliyun)

### 4.启动完毕，显示专有主机。

![image-20220829185405821](https://imgoss.xgss.net/picgo/image-20220829185405821.png?aliyun)

### 5.启动实例

进如EC2--->实例--->启动新实例。

![image-20220829185620175](https://imgoss.xgss.net/picgo/image-20220829185620175.png?aliyun)

### 6.搜索mac

选择64位，mac-arm

![image-20220829185704988](https://imgoss.xgss.net/picgo/image-20220829185704988.png?aliyun)

### 7.配置密钥

配置密钥对，要下载保存.pem

![image-20220829185808262](https://imgoss.xgss.net/picgo/image-20220829185808262.png?aliyun)

### 8.购买成功

![image-20220829185738198](https://imgoss.xgss.net/picgo/image-20220829185738198.png?aliyun)

记录ipv4的地址，或者是DNS的地址



## 使用 SSH 连接到您的实例



```
ssh -i /path/key-pair-name.pem ec2-user@instance-public-dns-name
```

我将刚才的pem文件上传到一台linux服务器中，远程连接mac系统。

假设mac服务器的ip是 12.34.56.78

```
# chmod 400 /root/mac2-0824.pem
# ssh -i  /root/mac2-0824.pem ec2-user@12.34.56.78
```

远程连接成功



## 使用软件连接到您的实例

使用 **passwd** 命令为 ec2-user 账户设置密码，如下所示。

```
$ sudo passwd ec2-user
```

启动 Apple Remote Desktop 代理，然后按照以下所述启用远程桌面访问。

```
$ sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart \
-activate -configure -access -on \
-restart -agent -privs -all
```

Apple Remote Desktop 在苹果商店里面要518元人民币，抢钱啊！

![image-20220829190435881](https://imgoss.xgss.net/picgo/image-20220829190435881.png?aliyun)

## windows系统下用vnc链接mac系统

### 1.安装vnc软件。

自己度娘，安装。

### 2.新建连接

如图，**注意！你的云主机是需要开放5900的端口**！

![image-20220829190617483](https://imgoss.xgss.net/picgo/image-20220829190617483.png?aliyun)

双击刚才新建的连接。

![image-20220829190810456](https://imgoss.xgss.net/picgo/image-20220829190810456.png?aliyun)

### 3.进入系统

输入刚才重置的ec2-user的密码。



进入系统：

![image-20220829190859381](https://imgoss.xgss.net/picgo/image-20220829190859381.png?aliyun)

需要注意点：

1.要建立专属主机再创建mac系统

2.防火墙的规则要开放 5900，别问，问就是连了n



最后，不得不说aws对于我们这种智商不高的人的确不太友好！

## 参考地址

[使用控制台启动 Mac 实例](https://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/ec2-mac-instances.html#mac-instance-launch) https://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/ec2-mac-instances.html#mac-instance-launch





