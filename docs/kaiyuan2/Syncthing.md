# 数据自由掌握在自己手里：开源同步神器 Syncthing 深度体验



作为一个常年和数据打交道的人，我对文件同步工具的要求向来苛刻。试过市面上主流的商业云同步服务，要么容量受限，要么速度卡顿，更让人纠结的是隐私安全问题 —— 谁也不想自己的重要文件躺在别人的服务器里。

直到遇见**Syncthing**，这款开源免费的文件同步工具，才算真正实现了 “我的数据我做主”。



## 什么是 Syncthing？它凭什么打动技术党？

简单说，Syncthing 是一款基于 P2P（点对点）技术的跨平台文件同步工具。和传统云同步不同，它**不依赖第三方服务器**，所有文件直接在你的设备之间传输。这种架构带来两个核心优势：一是隐私安全有保障，数据传输全程加密，连开发者都无法窥探；二是同步速度完全取决于你的网络环境，家里的局域网同步几乎能跑满带宽。

作为开源软件，Syncthing 的代码完全公开可查，这意味着全球开发者都在帮你 “安检”，后门和恶意程序的风险几乎为零。它支持 Windows、macOS、Linux 三大桌面系统，安卓手机也能完美适配，甚至树莓派这类嵌入式设备都能轻松部署，跨平台能力堪称 “全能”。



## 从零开始：10 分钟搞定 Syncthing 安装与配置

上手 Syncthing 比想象中简单，哪怕你不是技术大神也能轻松搞定。

### **第一步：下载安装包**

直接访问 Syncthing 官网 syncthing.net 进入下载页面，根据自己的设备选择对应版本。Windows 用户下载 exe 文件双击安装，Mac 用户拖进应用程序文件夹，Linux 用户可以通过包管理器一键安装，命令行输入sudo apt install syncthing即可（Ubuntu/Debian 系统）。

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1751977127383.png?tx)

或者是github的releases页面 https://github.com/syncthing/syncthing/releases

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1751977111697.png?tx)

### Docker环境安装

https://github.com/syncthing/syncthing/blob/main/README-Docker.md

#### Docker cli

```
$ docker pull syncthing/syncthing
$ docker images|grep syncthing
syncthing/syncthing             latest        2071c59bec50   7 days ago     41.1MB

$ docker run -itd --restart always -p 8384:8384 -p 22000:22000/tcp -p 22000:22000/udp -p 21027:21027/udp \
    -v /data/docker/syncthing:/var/syncthing \
    --hostname=my-syncthing \
    syncthing/syncthing:latest
```

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1751978141824.png?tx)

#### Docker compose

```
---
version: "3"
services:
  syncthing:
    image: syncthing/syncthing
    container_name: syncthing
    hostname: my-syncthing
    environment:
      - PUID=1000
      - PGID=1000
    volumes:
      - /wherever/st-sync:/var/syncthing
    ports:
      - 8384:8384 # Web UI
      - 22000:22000/tcp # TCP file transfers
      - 22000:22000/udp # QUIC file transfers
      - 21027:21027/udp # Receive local discovery broadcasts
    restart: unless-stopped
    healthcheck:
      test: curl -fkLsS -m 2 127.0.0.1:8384/rest/noauth/health | grep -o --color=never OK || exit 1
      interval: 1m
      timeout: 10s
      retries: 3
```



### **第二步：初始化与设备配对**

启动 Syncthing 后，它会自动在后台运行，并默认打开本地管理界面（http://localhost:8384）。第一次使用会看到一个简洁的控制面板，左侧是 “我的设备”，右侧是 “共享文件夹”。

要实现多设备同步，先得让设备互相 “认识”。在 A 设备的控制面板点击 “操作”→“显示 ID”，复制这串类似 UUID 的设备标识符。然后在 B 设备的 “远程设备” 栏点击 “添加远程设备”，粘贴 ID 并自定义一个设备名称（比如 “家里的台式机”），点击保存。此时 A 设备会收到配对请求，确认后两台设备就成功建立连接了，整个过程就像添加好友一样直观。

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1751978445304.png?tx)



### **第三步：共享文件夹设置**

点击 “添加文件夹”，选择需要同步的本地目录，自定义一个文件夹 ID（建议用有辨识度的名称）。在 “共享” 选项卡勾选需要同步的设备，还能设置是否允许对方修改文件、是否忽略隐藏文件等细节。确认后，目标设备会收到文件夹共享请求，选择保存路径即可开始同步。

实测在千兆局域网环境下，10GB 的视频文件同步耗时不到 3 分钟，速度远超某知名云盘的 “非会员限速” 模式。



## 进阶玩法：让 Syncthing 更懂你的使用习惯

用熟了基础功能，这些进阶技巧能让 Syncthing 更顺手：

- **选择性同步**：不是所有文件都需要同步到每台设备，在远程设备的文件夹设置里勾选 “仅同步选定的子目录”，可以精准控制需要同步的内容，节省存储空间。

- **版本控制**：开启 “文件版本控制” 功能后，Syncthing 会自动备份被修改或删除的文件，默认保留最近 5 个版本，你也可以自定义保留时长和数量，再也不怕误删重要文件。

- **开机自启动与后台运行**：Windows 用户在管理界面的 “设置”→“GUI” 里勾选 “开机时启动”；Mac 用户可以通过 “启动台” 设置；Linux 用户用sudo systemctl enable syncthing@用户名命令设置系统服务，实现无人值守同步。

- **端口映射实现外网同步**：如果需要在不同局域网的设备间同步（比如公司电脑和家里的服务器），需要在路由器里映射端口（默认 8384 用于管理界面，22000 用于设备通信），具体步骤可以参考 Syncthing 官方文档的 “防火墙设置” 章节。



## 为什么说 Syncthing 是 “数据主权” 的最佳解？

在隐私泄露事件频发的当下，Syncthing 的价值不仅在于技术优势，更在于它重新定义了 “数据所有权”。商业云服务本质是 “你租用我的服务器存数据”，而 Syncthing 则是 “你的设备就是服务器”。

对于有大量敏感数据的用户（比如设计师的源文件、程序员的代码库、企业的财务报表），用 Syncthing 搭建私有同步网络，既能避免商业服务的容量限制，又能规避合规风险。我身边甚至有团队用它替代 FTP 服务器，实现多人实时协作，配合 Git 进行版本管理，效率提升明显。

当然，Syncthing 也不是完美的 —— 它需要至少一台设备保持在线才能同步（可以用树莓派做常驻节点），移动端的功能比桌面端简单一些。但瑕不掩瑜，对于追求自由与安全的用户来说，这些小缺点完全可以接受。



## 最后说句心里话

用 Syncthing 半年多，最大的感受是 “踏实”。不用再为会员费纠结，不用盯着进度条焦虑，更不用担心中途断网导致同步失败。它就像一个沉默可靠的管家，默默打理着你的文件，却从不多问一句。

如果你受够了云服务的套路，想真正掌控自己的数据，不妨花半小时试试 Syncthing。开源世界的魅力正在于此 —— 一群人为了共同的理想造出好用的工具，然后免费分享给所有人。这种纯粹，在商业化的软件市场里，太珍贵了。

