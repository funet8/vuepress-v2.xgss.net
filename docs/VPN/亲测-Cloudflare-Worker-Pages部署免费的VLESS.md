# 亲测-Cloudflare-Worker-Pages部署免费的VLESS

## 前言

zizifn 大佬的一个开源项目 edgetunnel ，使得我们可以免费的在 Cloudflare 上面通过部署 Worker ，来创建一个免费 VLESS 节点！

源项目地址：[点击访问](https://github.com/zizifn/edgetunnel)

> 何为 Cloudflare Worker ?
>
> Cloudflare Worker 是 Cloudflare 提供的一种服务，它允许开发者在全球分布的边缘服务器上运行自定义的 JavaScript 代码。
>
> Cloudflare Worker 可以用来处理 HTTP 请求，从而允许开发者通过编写 JavaScript 代码来实现各种功能，例如路由请求、修改请求和响应、执行身份验证、实现缓存策略等。



## 准备工作

1. 注册 Cloudflare 账号，注册地址：[点击注册](https://dash.cloudflare.com/sign-up) （推荐使用新注册的账号来部署服务！）
2. 购买注册域名一个
3. 托管域名到 Cloudflare（非必须）



## CloudFlare 部署免费节点

### 1.项目地址

高级版的部署，其实和初级的部署，大同小异，道理是一样的，只是多了很多功能，比如自动生成 SUB CLASH，SURGE订阅地址、自动优选 IP 等。

[CM](https://github.com/cmliu) 基于 [zizifn](https://github.com/zizifn/edgetunnel) 的项目进行了二次创作，GitHub 地址：[点击访问](https://github.com/cmliu/edgetunnel) （功能还是很多的）

核心代码：

```
https://github.com/cmliu/edgetunnel/blob/main/_worker.js
```



### 下载源文件（不需要操作）

下载作者的 Worker 文件：点击下载 [main.zip](https://github.com/cmliu/edgetunnel/archive/refs/heads/main.zip) （项目文件名已经更新为 `main.zip` 原则上，方法是一样的）

**这个方法会报错！**

```
此项目可能需要一个构建过程。找到一个 Wrangler 配置文件。“直接上传”尚不支持与“Wrangler 部署”相同的功能。
```



![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1763105038847.png?tx)



## 正式部署

### 1.Pages 部署 VLESS

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1763105080211.png?tx)

### 2.输入worker名称

点击部署

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1763105214250.png?tx)

访问会有hello world！

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1763105495001.png?tx)

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1763105299317.png?tx)

### 3.编辑代码

把核心代码复制到worker.js中，点击部署

```
核心代码： https://github.com/cmliu/edgetunnel/blob/main/_worker.js
```



![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1763105567824.png?tx)

再次访问

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1763105684161.png?tx)



### 4.设置 UUID

**[点击这里](https://1024tools.com/uuid)**，生成一个 UUID ，或是在 V2rayN 中生成一个！

回到刚才的项目，找到设置 – 环境变量 – 添加变量，变量名称：`UUID` ，变量值为刚才生成的 UUID ，点击保存！



![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1763105883170.png?tx)

点击部署



### 5.设置变量

部署完成后点击 `继续处理站点` 后，选择 `设置` > `环境变量` > **制作**为生产环境定义变量 > `添加变量`。

这里需要设置三个变量

```
1.变量名： UUID    网站自动生成
2.变量名： ADMIN   自定义设置，复杂的密码
3.变量名： KV      worker的名称
```



![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1763105927931.png?tx)

变量名称填写**ADMIN**，值则为你的管理员密码，后点击 `保存`即可。

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1763106171130.png?tx)

如图设置的变量：

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1763106323331.png?tx)

再次访问

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1763106411715.png?tx)

### 6.访问后台

网址+admin到登录页面

输入你设置的**ADMIN**的变量，登录后台

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1763106339626.png?tx)

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1763106643581.png?tx)



### 设置自定义域

我这里设置一个域名

需要把域名托管到cloudflare

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1763691307090.png?tx)





![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1763691532195.png?tx)

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1763691555992.png?tx)





修改域名的dns

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1763691627806.png?tx)

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1763692873269.png?tx)



![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1763692928540.png?tx)



![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1763693654000.png?tx)



## 后记

到这里，部署就结束了。大概率上，高级部署里面的自动 IP 优选，已经会满足绝大数人的需求了，当然有自建 VPS 节点，或是 飞机 节点的，也是可以使用这个节点进行调配使用。感谢 [zizifn](https://github.com/zizifn) ，感谢 [cmliu](https://github.com/cmliu) !

