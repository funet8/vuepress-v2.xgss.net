# Docker部署开源免费的闲鱼"自动赚钱机器"，闲鱼自动回复系统 

# 前言

随着闲鱼等二手交易平台的流行，越来越多的人希望能够通过这些平台赚取一些额外收入。然而，手动回复每一条信息和跟踪每个买家/卖家的需求，无疑是一个耗时且繁琐的过程。如果能够利用自动化工具，解放双手，实现全天候的自动化回复和交易管理，无疑是提升效率的最佳方式。

本文将介绍如何通过Docker部署一个开源的闲鱼自动回复系统，帮助你实现自动化的赚钱机器。我们将详细讲解如何使用Docker环境快速搭建一个免费的闲鱼自动回复系统，助力你轻松管理闲鱼上的交易和互动。

## 准备工作

在开始部署之前，确保你已经准备好了以下资源：

一台可以运行Docker的机器（建议使用Linux或者Windows Subsystem for Linux (WSL)）。

闲鱼账号，并已完成基本的账户认证和设置。

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755102391791.png?tx)

# xianyu-auto-reply

开源地址： https://github.com/zhinianboke/xianyu-auto-reply

一个功能完整的闲鱼自动回复和管理系统，支持多用户、多账号管理，具备智能回复、自动发货、自动确认发货、商品管理等企业级功能。

## 核心特性

这套系统集成了自动回复、自动发货、多账号管理、数据统计、商品搜索、多渠道通知等核心功能，并通过AI智能、关键词匹配与批量处理等技术，实现闲鱼交易全流程的自动化与高效化。
 同时，它具备多用户权限管理、加密与异常监控等安全机制，以及现代化自适应界面，为用户提供安全、稳定、便捷的运营体验。

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755087801578.png?tx)

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755087857179.png?tx)

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755087873703.png?tx)

# 部署xianyu-auto-reply

## Docker 一键部署（最简单）

前置条件，有一台安装了docker的机器，可以是服务器，也可以是nas

```
# 1. 创建数据目录
mkdir -p /data/docker/xianyu-auto-reply
cd /data/docker/xianyu-auto-reply

# 2. 一键启动容器
docker run -d \
  --restart always \
  -p 8080:8080 \
  -v /data/docker/xianyu-auto-reply/:/app/data/ \
  --name xianyu-auto-reply \
  registry.cn-shanghai.aliyuncs.com/zhinian-software/xianyu-auto-reply:1.0

# 3.查看状态
docker ps
CONTAINER ID   IMAGE                                                                      COMMAND                CREATED       STATUS                 PORTS                    NAMES
d7e2db640239   registry.cn-shanghai.aliyuncs.com/zhinian-software/xianyu-auto-reply:1.0   "/app/entrypoint.sh"   3 hours ago   Up 3 hours (healthy)   0.0.0.0:8080->8080/tcp   xianyu-auto-reply

# 4. 访问系统
# http://localhost:8080
```

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755087327760.png?tx)

## 进入系统

浏览器中输入的IP+8080 就能看到界面

使用默认账号进行登录 ， 用户名 admin 和密码是admin

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755099513249.png?tx)

## 修改默认密码

系统设置，密码设置



![image-20250813234124055](https://imgoss.xgss.net/picgo-tx2025/image-20250813234124055.png?tx)

## 账号管理

如图点击后台的账号管理，有两种方式添加新账号，分别是扫码登录、手动输入

![image-20250813234404003](https://imgoss.xgss.net/picgo-tx2025/image-20250813234404003.png?tx)

扫码登录之后，再账号列表里会有信息

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755100494418.png?tx)

## 手动获取cookie

打开闲鱼网页版，按 F12 进入开发者工具 goofish点com

登录账号，点击“网络”，筛选类型为“Fetch/XHR”

如下图：

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755101091746.png?tx)

把

```
cookie2=XXXXXXX; XXXXXXXX=1; XXXXXXXXXXXXXXXX
```

复制出来，填入cookie值

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755101213515.png?tx)

## 商品管理

如图，点击“商品管理”再筛选账号，如果你有多个账号的话

可以管理商品

下面列表就会出现你出售的商品。

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755101320085.png?tx)

## 订单管理

如图，可以查看账号下所有的订单

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755101427297.png?tx)

## 自动回复

如图，点击自动回复、选择账号、选择商品， 关键字、自动回复的内容。

不仅可以添加文本关键字，也可以添加图片关键字

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755101549655.png?tx)

图片关键字

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755101620518.png?tx)

## 指定商品回复

商品列表(自动发货根据商品标题和商品详情匹配关键字)![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755101675635.png?tx)

## 卡券管理

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755101743900.png?tx)

##  自动发货

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755101819958.png?tx)

## 通知渠道

有消息可以发送到自己的聊天APP中

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755101864226.png?tx)

## 咸鱼商品搜索

随便输入一个关键字，搜索。

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1755101961928.png?tx)

## 其他安装方法

**Windows用户**：

```
# 创建数据目录
mkdir xianyu-auto-reply

# 启动容器
docker run -d -p 8080:8080 -v %cd%/xianyu-auto-reply/:/app/data/ --name xianyu-auto-reply registry.cn-shanghai.aliyuncs.com/zhinian-software/xianyu-auto-reply:1.0
```



### 从源码构建部署

```
# 1. 克隆项目
git clone https://github.com/zhinianboke/xianyu-auto-reply.git
cd xianyu-auto-reply

# 2. 设置脚本执行权限（Linux/macOS）
chmod +x docker-deploy.sh

# 3. 一键部署（自动构建镜像）
./docker-deploy.sh

# 4. 访问系统
# http://localhost:8080
```



**Windows用户**：

```
# 使用Windows批处理脚本（推荐）
docker-deploy.bat

# 或者使用Git Bash/WSL
bash docker-deploy.sh

# 或者直接使用Docker Compose
docker-compose up -d --build
```



### 本地开发部署

```
# 1. 克隆项目
git clone https://github.com/zhinianboke/xianyu-auto-reply.git
cd xianyu-auto-reply

# 2. 创建虚拟环境（推荐）
python -m venv venv
source venv/bin/activate  # Linux/macOS
# 或 venv\Scripts\activate  # Windows

# 3. 安装Python依赖
pip install --upgrade pip
pip install -r requirements.txt

# 4. 安装Playwright浏览器
playwright install chromium
playwright install-deps chromium  # Linux需要

# 5. 启动系统
python Start.py

# 6. 访问系统
# http://localhost:8080
```

# 最后

通过Docker部署开源的闲鱼自动回复系统，不仅可以节省大量的人工时间，还能提升平台互动效率，让你专注于其他更重要的事务。无论是小商家还是个人卖家，利用自动化工具都能更好地管理自己的闲鱼店铺。

希望本文能够为你搭建自动化回复系统提供帮助，让你轻松赚取更多收入。如果你在部署过程中遇到问题，欢迎在评论区留言，我们下次再见！