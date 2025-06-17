---
title: gitbook使用gitalk插件制作留言板
createTime: 2025/05/27 17:51:18
permalink: /article/vzrgdsrr/
---
# gitbook使用gitalk插件制作留言板



## gitalk评论插件

`disqus` 评论插件虽然比较好用,但是注册是在 `disqus.com` 官网,需要特殊手段才能访问,即便成功配置了国内一般也是访问不到的,因此功能相当鸡肋.

`gitalk` 评论插件解决了这一痛点,利用 `github` 的开发者接口授权,将讨论区的 `issue` 变成评论区,和 `github` 结合的如此紧密,适合用源码托管到 `github` 这类情况.

看一下gitalk [https://gitalk.github.io/](https://gitalk.github.io/) 是如何介绍自己的呢

![image-20220517101004780](https://imgoss.xgss.net/picgo/image-20220517101004780.png?aliyun)



看着效果确实不错,并且评论区的内容直接作为 `github` 仓库的 `issue`,这么好的想法我咋没想到呢!

好了,现在让我们开始集成到我们自己的项目中,遇到新鲜事物,当然先要参考官网介绍了.

## 申请 GitHub Application 授权

登录 `github` 账号,点击 [在线申请](https://github.com/settings/applications/new) 授权应用.

看到这一步,想必读者已经有个大概印象了,`gitalk` 插件是利用 `github` 的开发者服务,进行授权进而调用 `issue` 相关接口从而显示评论功能.

这种由官网提供的开发者服务还是比较好的,至少感觉比手动模拟提交要靠谱些,更何况走的是 `OAuth` 授权模式.

比如第三方应用提供微信登录,走的也是 `OAuth` 协议,这里的第三方应用当然就是现在说的 `Gitalk`
 插件,微信就是我们的 `github` .

新建应用,首页 url 和授权回调 url 填写相同的首页链接即可,其他情况自定义填写.

![image-20220429152149366](https://imgoss.xgss.net/picgo/image-20220429152149366.png?aliyun)



应用登记成功后会生成 `token` 令牌,`clientId` 和 `clientSecret` 需要重点保存下来,待会需要用到.

![image-20220429152312092](https://imgoss.xgss.net/picgo/image-20220429152312092.png?aliyun)



### 安装并集成到网站

在需要添加评论的页面,添加下述内容引入 `gitalk` 插件,其中参数来自我们上一步获取的 `clientId` 和 `clientSecret` .

> 默认应该添加到 `.html` 页面,当然也可以添加到 `.md` 页面,毕竟 `markdown` 语法也支持 `html` 标签.



```jsx
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css">
<script src="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js"></script>
<div id="gitalk-container"></div>
var gitalk = new Gitalk({
  "clientID": "clientId",
  "clientSecret": "clientSecret",
  "repo": "GitHub repo",
  "owner": "GitHub repo owner",
  "admin": ["GitHub repo admin"],
  "id": location.pathname,      
  "distractionFreeMode": false  
});
gitalk.render("gitalk-container");
```

稍微解释下参数的含义:

- `"clientID"` : [必选] `GitHub Application Client ID`
- `"clientSecret"` : [必选] `GitHub Application Client Secret`
- `"repo"` : [必选] `GitHub repository`
- `"owner"` : [必选] `GitHub repository` 所有者，可以是个人或者组织
- `"admin"` : [必选] `GitHub repository` 的所有者和合作者 (对这个 `repository`有写权限的用户)
- `"id"` : [可选] 页面的唯一标识,默认值: `location.href`, 长度**必须小于50**,否则会报错!
- `"distractionFreeMode"`: [可选] 类似 `Facebook` 评论框的全屏遮罩效果,默认值: `false`

> 上述配置只是最简配置,如果想要了解更多高级配置,请参考 [官方文档](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fgitalk%2Fgitalk%23install)

### 测试集成效果

按照上述安装步骤,将代码复制到首页(`README.md`)文件中,然后推送到 `github` ,体验下集成效果.

> 注意: 这里必须推送到服务器,因为申请应用时填写的域名是线上地址,因而本地测试是不会成功的,会报错,这一点和微信支付的回调地址类似.

示例:



```jsx
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css">
<script src="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js"></script>
<div id="gitalk-container"></div>
var gitalk = new Gitalk({
  "clientID": "3f62415a283d19cbd696",
  "clientSecret": "aed0e1db0620bf5d0e3a3f0225f801997ad74e58",
  "repo": "snowdreams1006.github.io",
  "owner": "snowdreams1006",
  "admin": ["snowdreams1006"],
  "id": location.pathname,      
  "distractionFreeMode": false  
});
gitalk.render("gitalk-container");
```

> 上述参数仅供参考,实际使用中请替换成自己的配置,不然你也没有我仓库的权限,肯定会报错的啊!



心心相念的 `gitalk` 评论区呢?是不是哪里配置错了,为啥没有出来?

别急,要淡定,看一下提示说"未找到的 `Issue` 进行评论,请联系 @snowdreams1006 初始化创建",既然如此,那我们就操作一下吧!

点击下方的按钮 `使用 Github登录` ,会跳转到相应的仓库,然后按照提示确定.

再次返回首页,刷新一下看看发生什么神奇的事情了?

![img](https:////upload-images.jianshu.io/upload_images/16648241-c6840e17705960dd.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)



终于集成了评论功能,而且还支持 `markdown` 格式的评论呢!

### 进一步思考

确实不错,心中自然是欣喜万分,但别高兴太早了,因为你会发现其他页面并没有评论区,也很好理解,我们目前仅仅在首页(`README.md`) 集成了 `gitalk` 插件,也就是说使用 `gitbook build` 输出的 `index.html` 首页才支持评论区,其他页面没有插入上述代码,自然是没有评论区功能的啊!

那如果想要实现全网站的所有页面都集成评论区功能,应该怎么办呢?

百度搜索了一下,并没有找到优雅的解决方案,如果有人能够提供更好的解决方案,还望不吝赐教,在此谢过.

既然网上找不到优雅的解决方案,那寻求专业人士的帮助也是一种好办法,我去哪找 `gitalk` 的使用者呢?

聪明的你或许已经想到了,解铃还须系铃人,当然是向推荐给我插件的大牛提问了!

他确实提供了一种思路,以下是网友[@八一菜刀](https://my.oschina.net/u/254762)原话:

> 文档里面我用的是tbfed-pagefooter插件，不过我是在本地使用gitbook install后重写了该插件的js，无非就是在js里面加一段Gitalk的调用代码，这样使用gitbook build命令的时候，所有的页面都会有Gitalk的评论调用

人家既然已经提供了思路,不太好意思继续麻烦人家要源码,既然如此,那就自己动手吧!

`tbfed-pagefooter` 插件很熟悉,一般是用于注明版权以及文章的修订时间的,而且作用于每个页面,这一点就满足了集成 `gitalk` 相关代码的基本要求.

大体方向确定后,目前就是解决如何在 `tbfed-pagefooter` 插件构建的相关生命周期内顺便执行我们的代码?

正常当前项目安装 `tbfed-pagefooter` 插件后应该存放于 `/node_modules/gitbook-plugin-tbfed-pagefooter` 目录,大致看一下插件的项目结构.



```go
gitbook-plugin-tbfed-pagefooter
├── LICENSE
├── README.md
├── assets
│   └── footer.css
├── index.js
└── package.json

1 directory, 5 files
```

为了基本看懂项目文件作用,特意去看了下 [gitbook 插件开发文档](https://links.jianshu.com/go?to=https%3A%2F%2Ftoolchain.gitbook.com%2Fplugins%2F),目标锁定在 `index.js` .

截取重要片段,原来是电子书构建前动态增加了 `html` 片段啊,这就好办了!



```kotlin
hooks: {
    'page:before': function(page) {
      var _label = '最后更新时间: ',
          _format = 'YYYY-MM-DD',
          _copy = 'powered by snowdreams1006'
      if(this.options.pluginsConfig['tbfed-pagefooter']) {
        _label = this.options.pluginsConfig['tbfed-pagefooter']['modify_label'] || _label;
        _format = this.options.pluginsConfig['tbfed-pagefooter']['modify_format'] || _format;

        var _c = this.options.pluginsConfig['tbfed-pagefooter']['copyright'];
        _copy = _c ? _c + ' all right reserved，' + _copy : _copy;
      }
      var _copy = '<span class="copyright">'+_copy+'</span>'
      var str = ' \n\n<footer class="page-footer">' + _copy +
        '<span class="footer-modification">' +
        _label +
        '\n{{file.mtime | date("' + _format +
        '")}}\n</span></footer>'

      str += '\n\n<link rel="stylesheet" href="https://unpkg.com/gitalk/dist/gitalk.css">'+
      '\n\n<script src="https://unpkg.com/gitalk@latest/dist/gitalk.min.js"></script>'+
      '\n\n<div id="gitalk-container"></div>'+
      '\n\n<script src="https://g.xgss.net/gitalk-config.js"></script>';

      page.content = page.content + str;
      return page;
    }
  },
```

看懂基本原理后顺便修改了版权说明以及修订时间格式,然后追加了集成 `gitalk` 的相关代码.

> 这里为了方便修改 `gitalk` 配置,特意将相关配置项单独托管到 `github` 专门的 `gitalk-config.js` 文件.

至于配置文件的内容,并没什么特殊之处,还是顺便贴一下吧!



```dart
<div id="gitalk-container"></div>
var gitalk = new Gitalk({
  "clientID": "05fb7151030cefa1a084",
  "clientSecret": "d5013b1052b33b3b69101563018692f8338b38fb",
  "repo": "g.xgss.net",
  "owner": "funet8",
  "admin": ["funet8],
  "id": location.pathname,      
  "distractionFreeMode": false  
});
gitalk.render("gitalk-container");
```

至此,之后再本地构建电子书时(`gitbook build`),`gitbook-plugin-tbfed-pagefooter` 自然会顺便帮我们运行集成 `gitalk` 的相关代码,这才是相对来说比较优雅的做法.

> 当然也不一定非要借助 `gitbook-plugin-tbfed-pagefooter` 插件帮忙,也可以借助别的插件进行集成,甚至自己写个更好的插件.

