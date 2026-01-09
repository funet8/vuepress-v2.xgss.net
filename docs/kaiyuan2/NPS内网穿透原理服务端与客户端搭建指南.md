---
title: NPS内网穿透原理服务端与客户端搭建指南
createTime: 2025/05/27 17:51:17
permalink: /article/oaohmwnv/
---
# NPS 内网穿透：原理、服务端与客户端搭建指南



# 前言

大家好，我是星哥，之前介绍过ngrok、frp的内网穿透工具，今天来介绍一个NPS的开源内网穿透工具。

nps是一款轻量级、高性能、功能强大的**内网穿透**代理服务器。目前支持**tcp、udp流量转发**，可支持任何**tcp、udp**上层协议（访问内网网站、本地支付接口调试、ssh访问、远程桌面，内网dns解析等等……），此外还**支持内网http代理、内网socks5代理**、**p2p等**，并带有功能强大的web管理端。

本文将详细介绍 NPS 的工作原理，并提供服务端 (nps) 和客户端 (npc) 的详细搭建步骤，帮助您快速上手并使用 NPS 进行内网穿透。

![image-20250514173955642](https://imgoss.xgss.net/picgo2025/image-20250514173955642.png?aliyun)

## NPS 内网穿透原理

NPS 是一款轻量级、高性能且功能强大的内网穿透代理服务器。它主要用于将内网服务暴露到公网上，使得外部用户可以访问原本只能在局域网内部访问的应用或服务。其核心工作原理可以概括如下：

1.  **服务端 (NPS) 与客户端 (NPC) 架构**：NPS 由两部分组成：服务端 (nps) 和客户端 (npc)。服务端通常部署在一台具有公网 IP 地址的服务器上（例如云服务器 VPS），而客户端则部署在内网中需要将其服务暴露出去的机器上。

2.  **建立连接与隧道**：客户端 (npc) 主动向部署在公网的服务端 (nps) 发起连接请求，并在两者之间建立一个稳定、加密的通信隧道。这个隧道可以是基于 TCP 或 UDP 协议的。

3.  **端口映射与流量转发**：一旦隧道建立成功，用户可以在服务端配置端口映射规则。这些规则定义了公网服务器上的某个端口（外部访问端口）如何映射到内网客户端机器上的特定端口（内部服务端口）。当外部用户访问公网服务器的指定外部端口时，服务端 (nps) 会通过已建立的隧道，将接收到的网络请求流量转发给内网的客户端 (npc)。

4.  **数据传输与响应**：客户端 (npc) 接收到从服务端转发过来的请求后，会将请求交给内网中实际提供服务的应用程序。应用程序处理完请求后，将响应数据原路返回给客户端 (npc)，客户端再通过隧道将响应数据回传给服务端 (nps)，最终由服务端将响应数据发送给外部访问用户。

5.  **支持多种协议**：NPS 支持多种类型的流量转发，包括但不限于 TCP、UDP、HTTP(S) 代理、SOCKS5 代理等。这使得 NPS 可以支持多种应用场景，如远程访问内网网站、进行本地支付接口调试、SSH 远程连接内网服务器、远程桌面控制等。

6.  **核心优势**：NPS 以其轻量、高性能、配置简单和功能丰富等特点受到欢迎。它通常使用 Go 语言编写，保证了其跨平台能力和执行效率。其原理与另一款流行的内网穿透工具 FRP (Fast Reverse Proxy) 类似，都是通过一个公网服务器作为中转节点，实现内网服务的对外暴露。

简而言之，NPS 通过在公网服务器和内网客户端之间建立一条反向连接隧道，巧妙地绕过了 NAT 设备的限制，实现了从外网安全、便捷地访问内网资源的目的。

## NPS的使用场景

![image-20250514150146539](https://imgoss.xgss.net/picgo2025/image-20250514150146539.png?aliyun)

1. 做微信公众号开发、小程序开发等----> 域名代理模式
2. 想在外网通过ssh连接内网的机器，做云服务器到内网服务器端口的映射，----> tcp代理模式
3. 在非内网环境下使用内网dns，或者需要通过udp访问内网机器等----> udp代理模式
4. 在外网使用HTTP代理访问内网站点----> http代理模式
5. 搭建一个内网穿透ss，在外网如同使用内网vpn一样访问内网资源或者设备----> socks5代理模式

## NPS 服务端搭建步骤

NPS 服务端通常部署在一台具有公网 IP 的服务器上。以下是一般的搭建步骤，以 Linux 系统为例：

### 准备工作

*   一台具有公网 IP 的服务器（例如云服务器 VPS）。
*   确保服务器防火墙已放行 NPS 需要使用的端口（例如 Web 管理端口、隧道通信端口等，默认为 8080、8024）。
*   有一个域名（可选）

### 下载 NPS 服务端程序

*   访问 NPS 的 GitHub Releases 页面 (https://github.com/ehang-io/nps/releases)。
*   根据你的服务器操作系统和 CPU 架构，下载对应的服务端压缩包。例如，对于 64 位 Linux 系统，通常下载 `linux_amd64_server.tar.gz` 或类似名称的文件。
*   可以使用 `wget` 命令直接在服务器上下载：
    ```bash
    # 替换为最新的版本链接
    wget https://github.com/ehang-io/nps/releases/download/vX.Y.Z/linux_amd64_server.tar.gz
    这里选择的v0.26.10
    
    mkdir -p  /data/nps
    cd /data/nps
    wget https://github.com/ehang-io/nps/releases/download/v0.26.10/linux_amd64_server.tar.gz
    
    ```

### 解压安装包

*   使用 `tar` 命令解压下载的压缩包：
    ```bash
    tar -zxvf linux_amd64_server.tar.gz
    ```
*   解压后通常会得到一个包含 `nps` 可执行文件和 `conf` 配置目录的文件夹。

### 配置 NPS 服务端

*   进入解压后的目录，找到 `conf/nps.conf` 配置文件。
*   根据需要修改配置文件。主要的配置项包括：

| 名称                | 含义                                                         |
| ------------------- | ------------------------------------------------------------ |
| web_port            | web管理端口                                                  |
| web_password        | web界面管理密码                                              |
| web_username        | web界面管理账号                                              |
| web_base_url        | web管理主路径,用于将web管理置于代理子路径后面                |
| bridge_port         | 服务端客户端通信端口                                         |
| https_proxy_port    | 域名代理https代理监听端口                                    |
| http_proxy_port     | 域名代理http代理监听端口                                     |
| auth_key            | web api密钥                                                  |
| bridge_type         | 客户端与服务端连接方式kcp或tcp                               |
| public_vkey         | 客户端以配置文件模式启动时的密钥，设置为空表示关闭客户端配置文件连接模式 |
| ip_limit            | 是否限制ip访问，true或false或忽略                            |
| flow_store_interval | 服务端流量数据持久化间隔，单位分钟，忽略表示不持久化         |
| log_level           | 日志输出级别                                                 |
| auth_crypt_key      | 获取服务端authKey时的aes加密密钥，16位                       |
| p2p_ip              | 服务端Ip，使用p2p模式必填                                    |
| p2p_port            | p2p模式开启的udp端口                                         |
| pprof_ip            | debug pprof 服务端ip                                         |
| pprof_port          | debug pprof 端口                                             |
| disconnect_timeout  | 客户端连接超时，单位 5s，默认值 60，即 300s = 5mins          |

### 安装和启动 NPS 服务

*   NPS 提供了安装脚本，可以将其安装为系统服务，方便管理。
    ```bash
    sudo ./nps install
    ```
*   启动 NPS 服务：
    ```bash
    sudo nps start
    ```
*   常用命令：
    *   `sudo nps stop`：停止服务
    *   `sudo nps restart`：重启服务
    *   `sudo nps status`：查看服务状态
    *   `sudo nps uninstall`：卸载服务

![image-20250514152523716](https://imgoss.xgss.net/picgo2025/image-20250514152523716.png?aliyun)

### 访问 Web 管理界面

*   在浏览器中输入 `http://你的公网IP:Web管理端口` (例如 `http://your_server_ip:8080`)。
*   使用配置的用户名和密码登录 Web 管理界面。
*   在 Web 界面中，你可以进行客户端管理、隧道管理、域名解析配置等操作。

7.  **防火墙配置**：
    
    *   确保服务器的防火墙（如 `iptables`、`firewalld` 或云服务商的安全组）已允许外部访问 NPS 的 Web 管理端口 (默认为 8080) 和桥接端口 (默认为 8024)，以及你计划用于穿透服务的其他端口。

![image-20250514152921935](https://imgoss.xgss.net/picgo2025/image-20250514152921935.png?aliyun)

**注意事项**：
*   务必从官方 GitHub Releases 页面下载 NPS 程序，以确保安全性。
*   首次配置完成后，请立即修改 Web 管理界面的默认登录密码。
*   定期关注 NPS 的更新，及时升级到最新版本以获取新功能和安全修复。
*   如果遇到问题，可以查看 NPS 的日志文件（通常在 `/var/log/nps.log` 或 NPS 安装目录下的 `nps.log`）进行排查。

# NPS 客户端 (NPC) 搭建步骤

NPS 客户端 (NPC) 部署在需要将其服务暴露到公网的内网机器上。以下是一般的搭建步骤，以 Linux 和 Windows 为例：

**通用准备工作**：

### 获取服务端信息

*   你需要从 NPS 服务端管理员处获取以下信息：
    *   服务端公网 IP 地址或域名。
    *   服务端桥接端口 (默认为 `8024`)。
    *   在服务端为该客户端生成的唯一验证密钥 (VKey)。这个 VKey 是在服务端 Web 管理界面添加客户端时生成的。

### 在 Linux 上搭建 NPC

### 下载 NPC 程序

*   访问 NPS 的 GitHub Releases 页面 (https://github.com/ehang-io/nps/releases)。
*   根据你的内网机器操作系统和 CPU 架构，下载对应的客户端压缩包。例如，对于 64 位 Linux 系统，通常下载 `linux_amd64_client.tar.gz` 或类似名称的文件。
*   可以使用 `wget` 命令直接在内网机器上下载：
    ```bash
    # 替换为最新的版本链接和对应架构的文件
    wget https://github.com/ehang-io/nps/releases/download/vX.Y.Z/linux_amd64_client.tar.gz
    ```

### 解压安装包

*   使用 `tar` 命令解压下载的压缩包：
    ```bash
    tar -zxvf linux_amd64_client.tar.gz
    ```
*   解压后通常会得到一个名为 `npc` 的可执行文件和一个 `npc.conf` 的示例配置文件（较新版本可能直接通过命令行参数启动，无需配置文件）。

## 启动 NPC (无配置文件方式 - 推荐)

*   直接通过命令行参数启动 `npc`，连接到服务端。这是较新版本推荐的方式，更简洁。
    ```bash
    ./npc -server=你的服务端IP:桥接端口 -vkey=你的VKey -type=tcp
    ```
    *   `-server`: 替换为你的 NPS 服务端的实际 IP 地址和桥接端口，例如 `123.45.67.89:8024`。
    *   `-vkey`: 替换为服务端为你生成的唯一验证密钥。
    *   `-type`: 指定连接类型，通常为 `tcp`。根据服务端配置可能有所不同。
*   为了让 NPC 在后台持续运行，可以使用 `nohup` 或者将其注册为系统服务 (systemd service)。
    ```bash
    nohup ./npc -server=你的服务端IP:桥接端口 -vkey=你的VKey -type=tcp &
    ```

## 启动 NPC (有配置文件方式 - 旧版或特定场景)

*   如果使用配置文件方式 (较老版本或特定需求)，编辑 `npc.conf` 文件（如果解压后没有，可以手动创建一个或从官方文档获取模板）。
    ```ini
    # 服务端IP:端口
    server_addr=你的服务端IP:桥接端口
    # 服务端生成的VKey
    vkey=你的VKey
    # 连接类型，tcp或kcp，根据服务端配置
    conn_type=tcp
    ```
*   保存配置文件后，启动 NPC：
    ```bash
    ./npc -config=./npc.conf
    ```

## 注册为系统服务 (可选，推荐用于生产环境)

*   你可以创建一个 systemd 服务单元文件，使 NPC 开机自启并由 systemd 管理。
*   示例 `npc.service` 文件内容 (`/etc/systemd/system/npc.service`)：
    ```ini
    [Unit]
    Description=NPC Client Service
    After=network.target

    [Service]
    Type=simple
    User=your_user # 替换为运行npc的用户名
    WorkingDirectory=/path/to/npc # 替换为npc所在的目录
    ExecStart=/path/to/npc/npc -server=你的服务端IP:桥接端口 -vkey=你的VKey -type=tcp # 确保路径正确
    Restart=on-failure

    [Install]
    WantedBy=multi-user.target
    ```
*   然后执行：
    ```bash
    sudo systemctl daemon-reload
    sudo systemctl enable npc
    sudo systemctl start npc
    sudo systemctl status npc
    ```

# 在 Windows 上搭建 NPC

## 下载 NPC 程序

*   访问 NPS 的 GitHub Releases 页面。
*   下载对应 Windows 版本的客户端压缩包，例如 `windows_amd64_client.tar.gz` (解压后是 `.exe` 文件) 或直接是 `windows_amd64_client.zip`。

## 解压安装包

*   将压缩包解压到一个合适的目录，例如 `C:\nps_client\`。你会得到 `npc.exe` 文件。
    
## 启动 NPC

*   打开命令提示符 (CMD) 或 PowerShell，进入 `npc.exe` 所在的目录。
*   执行以下命令启动 NPC：
    ```cmd
    npc.exe -server=你的服务端IP:桥接端口 -vkey=你的VKey -type=tcp
    ```
    *   参数含义同 Linux 版本。

## 后台运行与开机自启 (Windows)

* **后台运行**：为了让 `npc.exe` 在关闭命令提示符窗口后仍然运行，可以使用一些第三方工具（如 `NSSM - Non-Sucking Service Manager`）将其注册为 Windows 服务。

*   **使用 NSSM (示例)**：
    
    1.  下载 NSSM (nssm.cc)。
    2.  打开命令提示符 (管理员权限)。
    3.  `nssm install NpcService`
    4.  在弹出的 NSSM 图形界面中：
        *   `Path`: 指向你的 `npc.exe` 文件路径。
        *   `Startup directory`: 指向 `npc.exe` 所在的目录。
        *   `Arguments`: 填写 `-server=你的服务端IP:桥接端口 -vkey=你的VKey -type=tcp`。
        *   点击 "Install service"。
    5.  启动服务：`nssm start NpcService` 或在服务管理器 (services.msc) 中启动。
    
    ## 开机自启 (简单方式)
    
*   可以将启动命令保存为一个 `.bat` 批处理文件，然后将该批处理文件的快捷方式放入系统的“启动”文件夹中 (在运行中输入 `shell:startup`)。
    示例 `start_npc.bat` 内容：
    
    ```batch
    @echo off
    C:\path\to\npc.exe -server=你的服务端IP:桥接端口 -vkey=你的VKey -type=tcp
    ```

## 验证连接

*   客户端成功连接到服务端后，在服务端的 Web 管理界面的“客户端列表”中，对应的客户端状态会显示为“在线”。
*   之后，你就可以在服务端配置隧道，将公网端口映射到该客户端内网的服务端口了。

## 注意事项

*   确保客户端机器可以访问互联网，并且防火墙没有阻止 NPC 程序连接服务端。
*   VKey 是客户端连接到服务端的凭证，请妥善保管。
*   如果连接失败，检查服务端地址、端口、VKey 是否正确，以及网络连通性。

## 服务端配置

### 1.新增客户端

![image-20250514155551836](https://imgoss.xgss.net/picgo2025/image-20250514155551836.png?aliyun)

获得客户端ID是2

![image-20250514155651933](https://imgoss.xgss.net/picgo2025/image-20250514155651933.png?aliyun)



### 2.配置Window-RDP内网穿透

下载windows_amd64_client.tar.gz解压，有文件 npc.exe和conf

修改 conf/npc.conf

```
[common]
server_addr=XX.XX.XX.XX:8024
conn_type=tcp
vkey=123
auto_reconnection=true
max_conn=1000
flow_limit=1000
rate_limit=1000
basic_username=11
basic_password=3
web_username=admin
web_password=123456
crypt=true
compress=true
#pprof_addr=0.0.0.0:9999
disconnect_timeout=60


[tcp]
mode=tcp
target_addr=127.0.0.1:3389
server_port=8002

```

把"server_addr=XX.XX.XX.XX:8024 改成你的服务器IP"

把

```
[tcp]
mode=tcp
target_addr=127.0.0.1:3389  客户端的RDP端口
server_port=8002		   远程服务器的端口
```

运行npc.exe 如下图。

![image-20250514172717282](https://imgoss.xgss.net/picgo2025/image-20250514172717282.png?aliyun)

再到web管理后台可以看到客户端成功连接

![image-20250514172801436](https://imgoss.xgss.net/picgo2025/image-20250514172801436.png?aliyun)

使用远程连接工具 IP+8002 既可远程穿透。



## 总结

NPS 作为一款优秀的内网穿透工具，凭借其易用性、高性能和丰富的功能，为开发者和个人用户提供了极大的便利。通过本文的介绍，相信您已经对 NPS 的原理和搭建过程有了清晰的认识。在实际使用中，请务必注意安全配置，例如修改默认密码、使用强 VKey、及时更新版本等，以保障您的服务安全。希望本指南能帮助您成功搭建和使用 NPS，畅享内网穿透带来的便捷体验。

写文不易，如果你都看到了这里，请点个赞和在看，分享给更多的朋友；也别忘了关注星哥玩云！这里有满满的干货分享，还有轻松有趣的技术交流～点个赞、分享给身边的小伙伴，一起成长，一起玩转技术世界吧！ 😊





**参考链接**：
*   NPS GitHub 项目地址: https://github.com/ehang-io/nps
*   NPS 官方文档: https://ehang-io.github.io/nps/

