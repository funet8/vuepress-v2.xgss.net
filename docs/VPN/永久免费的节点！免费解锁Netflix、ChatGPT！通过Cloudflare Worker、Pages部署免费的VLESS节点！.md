# 【转载】永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！

永久免费的节点！通过Cloudflare Worker、Pages部署免费的VLESS！
https://www.toutiao.com/article/7480889039822832139/

图文、视频教程（需要翻墙）
https://v2rayssr.com/worker-vless.html
https://www.youtube.com/watch?v=sNOlsiwgCSA&list=PLNT3WYkSUEgVOgny8NvsNDX2Rw6k6GpV1



## 前言

zizifn 大佬的一个开源项目 edgetunnel ，使得我们可以免费的在 Cloudflare 上面通过部署 Worker ，来创建一个免费 VLESS 节点！

源项目地址：[点击访问](https://github.com/zizifn/edgetunnel)

> 何为 Cloudflare Worker ?
>
> Cloudflare Worker 是 Cloudflare 提供的一种服务，它允许开发者在全球分布的边缘服务器上运行自定义的 JavaScript 代码。
>
> Cloudflare Worker 可以用来处理 HTTP 请求，从而允许开发者通过编写 JavaScript 代码来实现各种功能，例如路由请求、修改请求和响应、执行身份验证、实现缓存策略等。

## 视频演示

[![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/play.png)](https://youtu.be/sNOlsiwgCSA)

## 准备工作

1、注册 Cloudflare 账号，注册地址：[点击注册](https://dash.cloudflare.com/sign-up) （推荐使用新注册的账号来部署服务！）

2、购买注册域名一个（虽说可以不使用域名，但是推荐大家还是购买自己的域名，毕竟不贵，一年才 10 元 RMB）

> 推荐在 Namesilo 进行购买，因为他的 WHOIS 隐私 是免费的，可以适当的进行一下隐私保护，而且域名还都挺便宜的
>
> 购买地址：[点击访问](https://www.namesilo.com/?rid=6254266mw) （1.49刀/年 起 选择 `.buzz` `.sbs` 会更便宜）新用户1美元优惠券：`v2rayssr.com`
>
> 关于优惠券的使用：请看下面的图片，来自官方解释（必须是“技术层面”的新用户）
>
> ![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/youhui.png)
>
> 美国地址生成器：[点击生成](https://www.meiguodizhi.com/)

3、托管域名到 Cloudflare

## CloudFlare 部署免费节点（初级）

### 原作者 GitHub

源项目地址：[点击访问](https://github.com/zizifn/edgetunnel)

### Worker 部署 VLESS

来到 Cloudflare 首页，点击 `Workers 和 Pages` ，创建 Work ，自定义名称，然后部署！

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/vless-work2.png)

而后，编辑代码，清除原先代码，填入如下代码：

> 因为原项目里面的代码，`proxyIP` 为空，所以，在访问套了 CF 等站点会无法打开。这是 CF 的机制。所以，我们需要通过其他一些 IP 进行转发！所以就有了以下的代码。

**[点击这里](https://1024tools.com/uuid)**，在线生成一个 UUID，用于替换下面代码中第七行的 `UUID`。（或是用 V2rayN 生成一个）

关于 `proxyIPs` ，是用于转发CF的一些流量，所以，若是存在套了CF的一些网站无法打开，请更换其中的其他网址，也就是第九行中的部分网址！

代码地址：[点击访问](https://github.com/V2RaySSR/Free-VLESS/)

更多 `proxyIP` 列表：

```
CM 维护proxyip.us.fxxk.dedyn.io IP落地区域: 美国 维护频率: 12小时/次proxyip.sg.fxxk.dedyn.io IP落地区域: 新加坡 维护频率: 12小时/次proxyip.jp.fxxk.dedyn.io IP落地区域: 日本 维护频率: 12小时/次proxyip.hk.fxxk.dedyn.ioIP落地区域: 香港 维护频率: 12小时/次proxyip.aliyun.fxxk.dedyn.io IP落地区域: 阿里云 维护频率: 4小时/次proxyip.oracle.fxxk.dedyn.io IP落地区域: 甲骨文 维护频率: 4小时/次proxyip.digitalocean.fxxk.dedyn.io IP落地区域: 数码海 维护频率: 4小时/次 白嫖哥维护workers.cloudflare.cyou Mingyu维护my-telegram-is-herocore.onecf.eu.orgsg.ipdb.rr.nunl.ipdb.rr.nuhk.ipdb.rr.nujp.ipdb.rr.nuus.ipdb.rr.nu 小一维护hk.cf.zhetengsha.eu.orgsg.cf.zhetengsha.eu.orgus.cf.zhetengsha.eu.orgjp.cf.zhetengsha.eu.org
```

代码修改完毕以后，点击右边的部署 – 保存并部署，然后点击左边的箭头，返回！

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/vless-work3.png)

### 设置自定义域

找到**设置** – **触发器**，**添加自定义域**，输入 没使用过 的 已经托管在 CF 上面 的，二级域名（xxx.xxx.xxx），如图：

> 博主托管在 CF 上面的域名是 v2rayssr.com ，随便指定一个二级域名的前缀：vless（名字随意），所以就有了二级域名 vless.v2rayssr.com

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/vlessCF%E9%83%A8%E7%BD%B2.png)

输入完成，若是输入框变为绿色，证明格式正确！点击添加自定义域！

域证书会显示：正在初始化，等待证书生效，或是直接访问 该域名，网页显示有内容，证明部署完毕！

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/vless%E9%83%A8%E7%BD%B2.png)

访问 `https://二级域名/UUID` ，即可看到节点信息，当然，里面包含了 订阅链接！

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/%E8%8A%82%E7%82%B9%E4%BF%A1%E6%81%AF.png)

至此，节点部署完毕，复制 VLESS 的订阅链接，粘贴到 V2rayN 里面，解锁了 ChatGPT、Netflix ，是不是很 Happy ？速度居然达到了 14W ，愉快的玩耍吧！

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/YouTube%E6%B5%8B%E9%80%9F.png)

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/Netflix%E8%A7%A3%E9%94%81.png)

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/ChatGPT%E8%A7%A3%E9%94%81.png)

以上就是 VLESS Work 原作者的部署策略

### IP 优选工具使用

若是速度不理想，可以自行优选 CF IP ，来进行提速！CF 优选 IP Windows 工具：[点击下载](https://github.com/badafans/better-cloudflare-ip/releases/download/20221201/batch.zip)

运行 IP 优选的时候，请关闭代理，这样会更准确！记得不要使用 TLS 优选！

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/IP%E4%BC%98%E9%80%89.png)

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/%E4%BC%98%E9%80%89IP%E7%BB%93%E6%9E%9C.png)

把优选的 IP 直接填入到 地址就可以使用了。

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/%E4%BC%98%E9%80%89IP%E4%BD%BF%E7%94%A8.png)

## CloudFlare 部署免费节点（高级）

### 项目地址

高级版的部署，其实和初级的部署，大同小异，道理是一样的，只是多了很多功能，比如自动生成 SUB CLASH，SURGE订阅地址、自动优选 IP 等。

[CM](https://github.com/cmliu) 基于 [zizifn](https://github.com/zizifn/edgetunnel) 的项目进行了二次创作，GitHub 地址：[点击访问](https://github.com/cmliu/edgetunnel) （功能还是很多的）

### 下载源文件

下载作者的 Worker 文件：点击下载 [main.zip](https://github.com/cmliu/edgetunnel/archive/refs/heads/main.zip) （项目文件名已经更新为 `main.zip` 原则上，方法是一样的）

### Pages 部署 VLESS

和刚才的方式一样，登录 CloudFlare ，来到 Workers 和 Pages ，和刚才不一样，我们需要点击 Pages ，点击 使用直接上传创建 – 上传资产。

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/worker%E5%88%9B%E5%BB%BA.png)

为我们的项目创建一个名字，点击创建项目。

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/name.png)

上传刚才下载下来的 [main.zip](https://github.com/cmliu/edgetunnel/archive/refs/heads/main.zip) （从计算机中选择 – 上传压缩文件），然后点击 部署站点，继续处理项目！

### 设置 UUID

**[点击这里](https://1024tools.com/uuid)**，生成一个 UUID ，或是在 V2rayN 中生成一个！

回到刚才的项目，找到设置 – 环境变量 – 添加变量，变量名称：`UUID` ，变量值为刚才生成的 UUID ，点击保存！

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/UUID.png)

### 重新部署 Pages

回到项目，找到 部署，点击下面的 创建新部署，再次上传刚才的 [main.zip](https://github.com/cmliu/edgetunnel/archive/refs/heads/main.zip) 文件，保存并部署！

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/pagesok.png)

这样，我们点击上图中的 访问站点，若是有内容出现，证明部署成功

我们可以访问 `https://域/UUID` ，来查看我们的节点。例：刚才生成的 UUID 为 `7a1a374f-286f-4807-9756-ee3f90227bb0` ，

按照上图，我们访问 `https://vlesstest-2n4.pages.dev/7a1a374f-286f-4807-9756-ee3f90227bb0` ，可以看到详细的节点情况！

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/%E5%85%8D%E8%B4%B9%E8%8A%82%E7%82%B9.png)

到这里，节点已经可以正常访问了，但是我们若是有域名，也是可以加入一个自定义域，让其更牛批！

### 设置自定义域

若你是按照刚才注册域名的操作，并已经把域名托管到了 CF，那么，直接按照操作即可！若是有其他免费的域名，或是域名没有托管到 CF，需要自行解析域名！

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9F%9F.png)

和刚才设置一样，设置一个合适的二级域名，名字随意，我这边选择和项目的名字一样！

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/jihuoyu.png)

若你的域名不在 CF，或是有其他免费的域名，请会域名解析平台解析如上的 CNAME 记录，若是域名已经托管到了 CF，那么请直接点击 激活域！一般情况下，几十秒就激活完成了！（后续或是需要删掉该项目，请先删除这个 自定义域）

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/ok.png)

尝试访问我们刚才设置的自定义域，也就是二级域名加上UUID，也就是 `https://vlesstest.v2rayssr.com/7a1a374f-286f-4807-9756-ee3f90227bb0`

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/%E8%87%AA%E5%BB%BA%E5%85%8D%E8%B4%B9%E8%8A%82%E7%82%B9.png)

至此，节点部署完毕，我们导入上图中的 快速自适应订阅地址到相对于的 客户端软件，进行节点的订阅

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/%E5%85%8D%E8%B4%B9%E8%8A%82%E7%82%B9%E9%83%A8%E7%BD%B2.png)

订阅完成，会多了很多节点，其实都是一个节点，只是用了不同的 IP。原理和刚才初级部署是一样的，只是自动进行了 IP 的优选！还是很方便的。

## 后记

到这里，部署就结束了。大概率上，高级部署里面的自动 IP 优选，已经会满足绝大数人的需求了，当然有自建 VPS 节点，或是 飞机 节点的，也是可以使用这个节点进行调配使用。感谢 [zizifn](https://github.com/zizifn) ，感谢 [cmliu](https://github.com/cmliu) !

有什么问题，请在评论留言，方式随意！