---
title: 100.Dify教程01-Dify是什么、应用场景、如何安装
createTime: 2025/05/27 17:51:17
permalink: /article/wqxb4so7/
---
# Dify教程01-Dify是什么、应用场景、如何安装



大家好，我是星哥，上篇文章讲了Coze、Dify、FastGPT、MaxKB 对比，今天就来学习如何搭建Dify。

# Dify是什么

**Dify 是一款开源的大语言模型(LLM) 应用开发平台。**它融合了后端即服务（Backend as Service）和 LLMOps 的理念，使开发者可以快速搭建生产级的生成式 AI 应用。即使你是非技术人员，也能参与到 AI 应用的定义和数据运营过程中。

由于 Dify 内置了构建 LLM 应用所需的关键技术栈，包括对数百个模型的支持、直观的 Prompt 编排界面、高质量的 RAG 引擎、稳健的 Agent 框架、灵活的流程编排，并同时提供了一套易用的界面和 API。这为开发者节省了许多重复造轮子的时间，使其可以专注在创新和业务需求上。

![image-20250409181202316](https://imgoss.xgss.net/picgo/image-20250409181202316.png?aliyun)

# Dify 的应用场景

Dify 适用于多种生成式 AI 应用开发场景：

## 内容创作与生成

自动化生成文章、报告、营销文案等。

结合知识库实现专业领域内容生成（如法律、医疗文档）。

## 智能对话系统

构建多轮对话客服机器人、虚拟助手。

通过 Agent 框架实现任务分解与工具调用（如搜索、图像生成）。

## 数据分析与自动化

解读复杂数据并生成可视化报告。

自动化业务流程（如工单处理、邮件回复）。

## 个性化推荐与营销

基于用户画像生成个性化推荐内容。

结合 RAG 实现精准信息检索与推送。

# 安装Dify（推荐）

## 1、系统环境

这里我们使用的操作系统为 Centos，大家也可以使用其他的操作系统，Windows或者Linux都可以，下面以Centos 7.9为例。

2核4G

软件需要安装docker和docker-compose，这里就不赘述。

## 2、克隆代码

克隆代码至本地

```
cd /data/docker

git clone https://github.com/langgenius/dify.git

cd dify/docker/ 进入docker目录

```

复制配置文件

```
cp .env.example .env
```

启动项目

```
docker-compose up -d
```

![image-20250409161040908](https://imgoss.xgss.net/picgo/image-20250409161040908.png?aliyun)

稍等一会等项目进行完成，提示完成

查看docker

```

docker ps
CONTAINER ID   IMAGE                                       COMMAND                  CREATED         STATUS                          PORTS                                                                      NAMES
83add667dfb1   nginx:latest                                "sh -c 'cp /docker-e…"   2 minutes ago   Up 2 minutes                    0.0.0.0:80->80/tcp, :::80->80/tcp, 0.0.0.0:443->443/tcp, :::443->443/tcp   docker-nginx-1
a251666ed181   langgenius/dify-api:1.2.0                   "/bin/bash /entrypoi…"   2 minutes ago   Up 2 minutes                    5001/tcp                                                                   docker-api-1
53bab964d7ac   langgenius/dify-api:1.2.0                   "/bin/bash /entrypoi…"   2 minutes ago   Up 2 minutes                    5001/tcp                                                                   docker-worker-1
ca87fe6c8770   langgenius/dify-plugin-daemon:0.0.7-local   "/bin/bash -c /app/e…"   2 minutes ago   Restarting (2) 44 seconds ago                                                                              docker-plugin_daemon-1
20b9ee792e3d   semitechnologies/weaviate:1.19.0            "/bin/weaviate --hos…"   2 minutes ago   Up 2 minutes                                                                                               docker-weaviate-1
89a4ed9628bf   langgenius/dify-sandbox:0.2.11              "/main"                  2 minutes ago   Up 2 minutes (healthy)                                                                                     docker-sandbox-1
aeb3c0192b66   postgres:15-alpine                          "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes (healthy)          5432/tcp                                                                   docker-db-1
3d32734ede9e   redis:6-alpine                              "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes (healthy)          6379/tcp                                                                   docker-redis-1
2ff8b7289efe   ubuntu/squid:latest                         "sh -c 'cp /docker-e…"   2 minutes ago   Up 2 minutes                    3128/tcp                                                                   docker-ssrf_proxy-1
62df434f8bbf   langgenius/dify-web:1.2.0                   "/bin/sh ./entrypoin…"   2 minutes ago   Up 2 minutes                    3000/tcp                                                                   docker-web-1
```

### 报错

```
docker logs docker-plugin_daemon-1
如下的报错
goroutine 1 [running]:
github.com/langgenius/dify-plugin-daemon/internal/utils/log.writeLog({0x1857285, 0x5}, {0x1896127?, 0xc00016d408?}, 0x1, {0xc0004cdf28, 0x1, 0x1})
        /app/internal/utils/log/log.go:40 +0x305
github.com/langgenius/dify-plugin-daemon/internal/utils/log.Panic(...)
        /app/internal/utils/log/log.go:66
main.main()
        /app/cmd/server/main.go:19 +0x9f
2025/04/09 09:48:27 main.go:19: [PANIC]Error processing environment variables: envconfig.Process: assigning S3_USE_AWS_MANAGED_IAM to S3UseAwsManagedIam: converting '' to type bool. details: strconv.ParseBool: parsing "": invalid syntax
panic: [PANIC]Error processing environment variables: envconfig.Process: assigning S3_USE_AWS_MANAGED_IAM to S3UseAwsManagedIam: converting '' to type bool. details: strconv.ParseBool: parsing "": invalid syntax

goroutine 1 [running]:
github.com/langgenius/dify-plugin-daemon/internal/utils/log.writeLog({0x1857285, 0x5}, {0x1896127?, 0xc0001f8008?}, 0x1, {0xc00019df28, 0x1, 0x1})
        /app/internal/utils/log/log.go:40 +0x305
github.com/langgenius/dify-plugin-daemon/internal/utils/log.Panic(...)
        /app/internal/utils/log/log.go:66
main.main()
        /app/cmd/server/main.go:19 +0x9f
```

### 更新 Dify方法

进入 dify 源代码的 docker 目录，按顺序执行以下命令：

```
cd dify/docker
docker compose down
git pull origin main
docker compose pull
docker compose up -d
```

## 3、访问

在浏览器输入IP+端口（我测试的ip是 192.168.1.121，端口是80，可以忽略），如果能访问到下面的页面，则安装成功

你可以先前往管理员初始化页面设置设置管理员账户：

![image-20250409164048622](https://imgoss.xgss.net/picgo/image-20250409164048622.png?aliyun)

# 结束

安装还是非常简单的，通过以上步骤，你就可以成功安装并开始使用Dify平台，发挥其强大的AI应用开发能力。下篇文章来学习如何配置Dify


写文不易，如果你都看到了这里，请点个赞和在看，分享给更多的朋友；也别忘了关注星哥玩云！这里有满满的干货分享，还有轻松有趣的技术交流～点个赞、分享给身边的小伙伴，一起成长，一起玩转技术世界吧！ 😊