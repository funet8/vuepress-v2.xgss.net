# 开源免费WEB防火墙，不让黑客越雷池一步！

大家好，我是星哥，随着Web应用攻击手段的日益复杂化，开源免费WAF（Web Application Firewall）凭借其灵活性和成本优势，成为中小企业及开发者构建安全防线的核心工具。

## 项目介绍

SafeLine，中文名 "雷池"，是一款简单好用, 效果突出的 Web 应用防火墙(WAF)，可以保护 Web 服务不受黑客攻击。

雷池通过过滤和监控 Web 应用与互联网之间的 HTTP 流量来保护 Web 服务。可以保护 Web 服务免受 SQL 注入、XSS、 代码注入、命令注入、CRLF 注入、ldap 注入、xpath 注入、RCE、XXE、SSRF、路径遍历、后门、暴力破解、CC、爬虫 等攻击。

开源地址：https://github.com/chaitin/SafeLine

![image-20250423180423740](https://imgoss.xgss.net/picgo/image-20250423180423740.png?aliyun)

## 同类型的堡塔云WAF

堡塔云 WAF 是一款基于宝塔面板安装量的网站业务安全实战经验打造的免费私有云 WAF 防火墙，只是这star数有点寒酸了。

开源地址：https://github.com/aaPanel/aaWAF

还是回到介绍今天的雷池项目



# 安装雷池WAF

## 环境准备

安装雷池前请确保你的系统环境符合以下要求

- 操作系统：Linux
- CPU 指令架构：x86_64, arm64
- CPU 指令架构：x86_64 架构需要支持 ssse3 指令集
- 软件依赖：Docker 20.10.14 版本以上
- 软件依赖：Docker Compose 2.0.0 版本以上
- 最低资源需求：1 核 CPU / 1 GB 内存 / 5 GB 磁盘

可以根据以下命令来查看相关信息

```bash
uname -m                                    # 查看指令架构
cat /proc/cpuinfo| grep "processor"         # 查看 CPU 信息
lscpu | grep ssse3                          # 确认 CPU 是否支持 ssse3 指令集
docker version                              # 查看 Docker 版本
docker compose version                      # 查看 Docker Compose 版本
docker-compose version                      # 查看老版本 docker-compose 版本
free -h                                     # 查看内存信息
df -h                                       # 查看磁盘信息
```

# 基于docker安装

## 1.创建雷池目录

```bash
mkdir -p "/data/docker/safeline"
```

该命令会创建 `/data/docker/safeline` 目录作为雷池的安装目录（你可以根据你的实际情况选择安装目录）

请确保该目录至少有 5GB 的存储空间（如果日常流量较大，请保证充足的磁盘容量）

## 2.下载 compose 编排脚本

使用下方的命令进入雷池安装目录，并下载 docker compose 编排脚本

```bash
cd "/data/docker/safeline"
wget "https://waf-ce.chaitin.cn/release/latest/compose.yaml"
```



## 3.配置 compose 环境变量

使用下方的命令进入雷池安装目录，并创建 `.env` 配置文件

```bash
cd "/data/docker/safeline"
touch ".env"
```



使用文本编辑器打开 `.env` 文件，写入下方的内容，POSTGRES的密码需自定义

```bash
使用 vim .env
填写一下内容：

SAFELINE_DIR=/data/docker/safeline
IMAGE_TAG=latest
MGT_PORT=9443
POSTGRES_PASSWORD=yourpassword #-------（自定义密码使用数字+英文大小写组合，勿使用特殊字符）
SUBNET_PREFIX=172.22.222
IMAGE_PREFIX=swr.cn-east-3.myhuaweicloud.com/chaitin-safeline
ARCH_SUFFIX=
RELEASE=
REGION=

按键ESC，再按“:wq”保存
```

![image-20250423181922725](https://imgoss.xgss.net/picgo/image-20250423181922725.png?aliyun)

如果是 ARM 服务器需要把 `ARCH_SUFFIX`改成 `-arm`

```none
ARCH_SUFFIX=-arm
```

如果是安装 LTS 版本需要把 `RELEASE` 改成 `-lts`

```none
RELEASE=-lts
```

> 根据你的实际情况修改配置文件中的 SAFELINE_DIR 和 POSTGRES_PASSWORD 字段

> 如果使用的是海外服务器建议设置 `IMAGE_PREFIX=chaitin` 直接通过 [docker.io](http://docker.io/) 拉取镜像

配置文件的格式说明如下：

- **SAFELINE_DIR**: 雷池安装目录，如 `/data/safeline`
- **IMAGE_TAG**: 要安装的雷池版本，保持默认的 `latest` 即可
- **MGT_PORT**: 雷池控制台的端口，保持默认的 `9443` 即可
- **POSTGRES_PASSWORD**: 雷池所需数据库的初始化密码，请随机生成一个
- **SUBNET_PREFIX**: 雷池内部网络的网段，保持默认的 `172.22.222` 即可
- **IMAGE_PREFIX**: 雷池镜像源的前缀，建议根据服务器地理位置选择合适的源
- **ARCH_SUFFIX**: 雷池架构的后缀，ARM 服务器需要配置为 `-arm`
- **RELEASE**: 更新通道，LTS 版本需要配置为 `-lts`

## 4.启动雷池

现在万事具备，使用以下命令启动雷池服务

```bash
cd "/data/docker/safeline"
docker compose up -d
```

![image-20250423182248010](https://imgoss.xgss.net/picgo/image-20250423182248010.png?aliyun)

命令执行成功则代表雷池安装成功，现在你可以 [访问雷池控制台](https://docs.waf-ce.chaitin.cn/zh/上手指南/安装雷池#访问雷池控制台) 了

## 查看

```
docker ps|grep safeline
dc20aa099857   swr.cn-east-3.myhuaweicloud.com/chaitin-safeline/safeline-luigi:latest      "/bin/sh -c /app/lui…"   18 seconds ago   Up 13 seconds                      80/tcp                                                safeline-luigi
f3ea17940f08   swr.cn-east-3.myhuaweicloud.com/chaitin-safeline/safeline-mgt:latest        "/docker-entrypoint.…"   18 seconds ago   Up 13 seconds (health: starting)   80/tcp, 0.0.0.0:9443->1443/tcp, :::9443->1443/tcp     safeline-mgt
c08794c24f9a   swr.cn-east-3.myhuaweicloud.com/chaitin-safeline/safeline-tengine:latest    "entrypoint.sh nginx…"   19 seconds ago   Up 17 seconds                                                                            safeline-tengine
26da86ec5703   swr.cn-east-3.myhuaweicloud.com/chaitin-safeline/safeline-postgres:15.2     "docker-entrypoint.s…"   19 seconds ago   Up 17 seconds (health: starting)   5432/tcp                                              safeline-pg
b332e5deeab2   swr.cn-east-3.myhuaweicloud.com/chaitin-safeline/safeline-fvm:latest        "/app/fvm /app/confi…"   19 seconds ago   Up 17 seconds                                                                            safeline-fvm
76bf1c89530b   swr.cn-east-3.myhuaweicloud.com/chaitin-safeline/safeline-chaos:latest      "./entrypoint.sh /us…"   19 seconds ago   Up 17 seconds                      8080/tcp, 9000/tcp                                    safeline-chaos
df4210e22e06   swr.cn-east-3.myhuaweicloud.com/chaitin-safeline/safeline-detector:latest   "/detector/entrypoin…"   19 seconds ago   Up 17 seconds (healthy)            8000-8001/tcp                                         safeline-detector
```



# 访问雷池控制台

雷池安装成功以后，你可以打开浏览器访问 IP+9443 来使用雷池控制台。如果是云服务器记得打开安全组的端口。

## 1.同意协议

![image-20250423182717958](https://imgoss.xgss.net/picgo/image-20250423182717958.png?aliyun)

## 2.登录

第一次登录雷池需要初始化你的管理员账户（默认会执行），如果没有找到账户密码，手动执行以下命令即可

```
docker exec safeline-mgt resetadmin

会显示用户名和密码

2025/04/23 18:38:20 [INFO] model/user.go:168 admin password has been reset
[INFO] Initial username：admin
[INFO] Initial password：******
[INFO] Done
```



![image-20250423182756483](https://imgoss.xgss.net/picgo/image-20250423182756483.png?aliyun)

## 3.进入WAF后台

![image-20250423183945592](https://imgoss.xgss.net/picgo/image-20250423183945592.png?aliyun)

至此雷池WAF安装完成，下次再介绍如何防护你的WEB网站。

写文不易，如果你都看到了这里，请点个赞和在看，分享给更多的朋友；也别忘了关注星哥玩云！这里有满满的干货分享，还有轻松有趣的技术交流～点个赞、分享给身边的小伙伴，一起成长，一起玩转技术世界吧！ 😊



