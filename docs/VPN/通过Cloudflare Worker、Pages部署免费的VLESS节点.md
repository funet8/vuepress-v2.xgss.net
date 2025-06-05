# 通过Cloudflare Worker、Pages部署免费的VLESS节点

# 注册Cloudflare

[点击注册](https://dash.cloudflare.com/sign-up)    https://dash.cloudflare.com/sign-up

注册成功之后

## 调整语言

![image-20250315154248622](https://imgoss.xgss.net/picgo/image-20250315154248622.png?aliyun)



![image-20250315154419395](https://imgoss.xgss.net/picgo/image-20250315154419395.png?aliyun)

### 下载源文件

下载作者的 Worker 文件：点击下载 [main.zip](https://github.com/cmliu/edgetunnel/archive/refs/heads/main.zip) （项目文件名已经更新为 `main.zip` 原则上，方法是一样的）

### Pages 部署 VLESS

和刚才的方式一样，登录 CloudFlare ，来到 Workers 和 Pages ，和刚才不一样，我们需要点击 Pages ，点击 使用直接上传创建 – 上传资产。

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/worker%E5%88%9B%E5%BB%BA.png)

为我们的项目创建一个名字，点击创建项目。

![image-20250315154907724](https://imgoss.xgss.net/picgo/image-20250315154907724.png?aliyun)

上传刚才下载下来的 [main.zip](https://github.com/cmliu/edgetunnel/archive/refs/heads/main.zip) （从计算机中选择 – 上传压缩文件），然后点击 部署站点，继续处理项目！

![image-20250315154950331](https://imgoss.xgss.net/picgo/image-20250315154950331.png?aliyun)

### 设置 UUID

**[点击这里](https://1024tools.com/uuid)**，生成一个 UUID ，或是在 V2rayN 中生成一个！

回到刚才的项目，找到设置 – 环境变量 – 添加变量，变量名称：`UUID` ，变量值为刚才生成的 UUID ，点击保存！



![image-20250315155130603](https://imgoss.xgss.net/picgo/image-20250315155130603.png?aliyun)

### 重新部署 Pages

回到项目，找到 部署，点击下面的 创建新部署，再次上传刚才的 [main.zip](https://github.com/cmliu/edgetunnel/archive/refs/heads/main.zip) 文件，保存并部署！

![image-20250315155318975](https://imgoss.xgss.net/picgo/image-20250315155318975.png?aliyun)

这样，我们点击上图中的 访问站点，若是有内容出现，证明部署成功

我们可以访问 `https://域/UUID` ，来查看我们的节点。例：刚才生成的 UUID 为 `0ee31707-2bcc-4d26-99a6-8bb18a8a361d` ，

按照上图，我们访问 `https://v2raystar.pages.dev/0ee31707-2bcc-4d26-99a6-8bb18a8a361d` ，可以看到详细的节点情况！

可能要等待5-10分钟生效时间

![image-20250315160036018](https://imgoss.xgss.net/picgo/image-20250315160036018.png?aliyun)



到这里，节点已经可以正常访问了，但是我们若是有域名，也是可以加入一个自定义域，让其更牛批！



### 设置自定义域

若你是按照刚才注册域名的操作，并已经把域名托管到了 CF，那么，直接按照操作即可！若是有其他免费的域名，或是域名没有托管到 CF，需要自行解析域名！

vnp-v2raystar-cf.kaacd.com

![image-20250315155838647](https://imgoss.xgss.net/picgo/image-20250315155838647.png?aliyun)

vnp-v2raystar-cf.kaacd.com 域名CNAME解析到 v2raystar.pages.dev

和刚才设置一样，设置一个合适的二级域名，名字随意，我这边选择和项目的名字一样！

添加记录

![image-20250315155955474](https://imgoss.xgss.net/picgo/image-20250315155955474.png?aliyun)



若你的域名不在 CF，或是有其他免费的域名，请会域名解析平台解析如上的 CNAME 记录，若是域名已经托管到了 CF，那么请直接点击 激活域！一般情况下，几十秒就激活完成了！（后续或是需要删掉该项目，请先删除这个 自定义域）

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/ok.png)

尝试访问我们刚才设置的自定义域，也就是二级域名加上UUID，也就是 `https://vnp-v2raystar-cf.kaacd.com/0ee31707-2bcc-4d26-99a6-8bb18a8a361d`

至此，节点部署完毕，我们导入上图中的 快速自适应订阅地址到相对于的 客户端软件，进行节点的订阅

![永久免费的节点！免费解锁Netflix、ChatGPT！通过Cloudflare Worker、Pages部署免费的VLESS节点！](https://v2rayssr.com/wp-content/uploads/2024/05/%E5%85%8D%E8%B4%B9%E8%8A%82%E7%82%B9%E9%83%A8%E7%BD%B2.png)

订阅完成，会多了很多节点，其实都是一个节点，只是用了不同的 IP。原理和刚才初级部署是一样的，只是自动进行了 IP 的优选！还是很方便的。