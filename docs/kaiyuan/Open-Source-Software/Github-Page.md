# 免费开源Github Page实现短链接方案

以前公司有一个需求，将推广用的长链接转化为短链接，再通过营销短信发送给客户。虽然有很多的第三方短链的生成工具，但为了安全还是自建一个。以前用过开源的YOURLS，是基于PHP的开源方案。 https://github.com/YOURLS/YOURLS 。

今天在网上发现一个更加简单的方案就是，[gh-pages-url-shortener](https://github.com/nelsontky/gh-pages-url-shortener)，一款完全使用 GitHub Pages 就可搭建的最小型的短链接生成服务。

开源地址： https://github.com/nelsontky/gh-pages-url-shortener

Github开源的短链接：https://nlsn.cf/1

不需要自己有[服务器](http://d.xgss.net/2)，通过自有域名解析到Github Page，在指定的issue上添加目标地址即可实现，链接跳转。

![github-gp-dlj](https://imgoss.xgss.net/picgo/github-gp-dlj-16511312944362.jpg?aliyun)



# 搭建准备

有个自有域名，例如星哥的 d.xggs.net。

github账号：笔者的funet8

# 安装步骤

## Fork仓库

打开https://nlsn.cf/1页面，点击fork，将原来的仓库拷贝到自己的账号下。

![image-20220307160441365](https://imgoss.xgss.net/picgo/image-20220307160441365.png?aliyun)



![image-20220307160538052](https://imgoss.xgss.net/picgo/image-20220307160538052.png?aliyun)



获取到仓库：https://github.com/{你的用户名}/gh-pages-url-shortener， 我的仓库是 https://github.com/funet8/gh-pages-url-shortener

## 配置GitHub Pages

github pages 可以做什么?
github pages 可以放一些纯静态的网站,比如你的项目介绍等.当然,也可以使用一些静态博客工具在本地通过markdown写博客,生成静态页面后发布到github pages

![image-20220307163103417](https://imgoss.xgss.net/picgo/image-20220307163103417.png?aliyun)



![image-20220307163121048](https://imgoss.xgss.net/picgo/image-20220307163121048.png?aliyun)





## 新建仓库存放当做数据库

GitHub 上新建一个仓库，当做数据库用来存储链接，笔者这里命名为 gh-pages-url-shortener-db，得到 https://github.com/funet8/gh-pages-url-shortener-db

![image-20220307161348791](https://imgoss.xgss.net/picgo/image-20220307161348791.png?aliyun)





# 修改仓库配置

## 修改CNAME

把fork的仓库https://github.com/funet8/gh-pages-url-shortener克隆到本地，修改文件之后提交到github。

如果你有自己的私有域名，可以设置对应的 CNAME（这跟其他 GitHub Pages 设置一样）

```
CNAME文件里的改成私有域名
d.xgss.net
```



## 修改404.html的接口地址

修改仓库中的404.html，将GITHUB_ISSUES_LINK改成自己的地址， 地址根据实际情况填写。

```
var GITHUB_ISSUES_LINK =
        "https://api.github.com/repos/funet8/gh-pages-url-shortener-db/issues/";

```



## 域名解析

我的域名是在阿里云上购买的，将域名CNAME解析到

```
d.xgss.net 解析到 funet8.github.io
```

![image-20220307162851318](https://imgoss.xgss.net/picgo/image-20220307162851318.png?aliyun)



访问： http://d.xgss.net/

再在 https://github.com/funet8/gh-pages-url-shortener-db/issues 提交一个issue，在里面就会有一个id号

![image-20220307164145678](https://imgoss.xgss.net/picgo/image-20220307164145678.png?aliyun)



![image-20220307164406837](https://imgoss.xgss.net/picgo/image-20220307164406837-165113136913213.png?aliyun)



访问 http://d.xgss.net/1 即可跳转到你提交的地址上，以后就可以在github仓库中的issues的标题添加目标地址，就可以实现短链接跳转了。

## 安全性

由于目标地址是存储在issues上，避免有好事者乱提交issuse用，github issues 怎么禁止其他人提交，则将我的 gh-pages-url-shortener-db的issues设置为私有。

设置为私有，就所有的url的地址都是404了，只能手动定时清理，避免出现麻烦。

![image-20220307165642994](https://imgoss.xgss.net/picgo/image-20220307165642994.png?aliyun)





## 没有自有域名

如果没有自有域名，可以用github的域名实验，但这个就是长了： {github账号名}.github.io/{仓库名}

笔者的地址： http://funet8.github.io/gh-pages-url-shortener/1

总结

```
nlsn.cf/1应该链接到这个 repo。

要添加新的短链接，请将标题作为您要缩短的链接（包括http(s)://）的问题添加到 https://github.com/nelsontky/gh-pages-url-shortener-db/issues。

新创建的短网址可以通过以下方式访问nlsn.cf/{issue_number}
```







