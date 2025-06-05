# 基于VuePress和github用搭建无服务器的博客、文档系统



最近想做一个项目介绍自己的一些项目和日常的文档，让文档有个属于自己的家，https://g.xgss.net 使用gitbook之后，又看到了vuepress，感觉还是挺好用的。

既可以当做博客系统、文档系统，项目介绍的系统，还有丰富的插件使用。

要用到的域名： http://vuepress.xgss.net  (github pages)的域名。

github地址： https://github.com/funet8/vuepress.xgss.net.git

# 什么是VuePress
VuePress 由两部分组成：第一部分是一个极简静态网站生成器，它包含由 Vue 驱动的主题系统和插件 API，另一个部分是为书写技术文档而优化的默认主题，它的诞生初衷是为了支持 Vue 及其子项目的文档需求。

简单的说它就是一个快速建设文档站点的工具，在简单配置好功能后，需要做的事情就剩下写好一个个 Markdown 文档，并且可以将其发布到github pages中

vuepress官网：https://vuepress.vuejs.org/zh/

![基于VuePress用无服务器博客、文档系统](https://imgoss.xgss.net/picgo/基于VuePress用无服务器博客、文档系统.jpg?aliyun)

## 一、安装nodejs和yarn

笔者是windows11系统,打开官网:http://nodejs.cn/download/  我这里下载的是 node-v16.14.0-x64.msi，跟安装普通的软件一样。

安装之后。

```
Administrator@star-win11 MINGW64 /e/360data/重要数据/桌面
$ node -v
v16.14.0
安装yarn
$ npm i yarn -g
```





## 二、新建github仓库

进入github创建仓库，你也可以fork我的仓库。



![image-20220514141458810](https://imgoss.xgss.net/picgo/image-20220514141458810.png?aliyun)

## 三、克隆项目

地址改成自己的

```
# git clone git@github.com:funet8/vuepress.xgss.net.git
或者
# git clone https://github.com/funet8/vuepress.xgss.net.git
# 进入项目
cd vuepress.xgss.net

# yarn init # npm init

# yarn add -D vuepress # npm install -D vuepress
弹出如下信息：
yarn add v1.22.17
info No lockfile found.
[1/4] Resolving packages...
warning @vuepress/theme-blog > @vuepress/plugin-pwa > workbox-build > @hapi/joi@15.1.1: Switch to 'npm install joi'
...
└─ zepto@1.2.0
Done in 113.09s.
```



## 四、在本地启动服务器

```
# yarn docs:dev # npm run docs:dev
当出现以下可以在浏览器中访问本机IP+端口访问
> VuePress dev server listening at http://localhost:8099/
```



## 五、浏览器访问

访问： http://localhost:8080/

根据IP（替换本机IP）：http://192.168.1.XXX:8080/

![image-20220514153324030](https://imgoss.xgss.net/picgo/image-20220514153324030.png?aliyun)



### 关于图片

VuePress 遵循 “约定优于配置” 的原则，按照官网设置目录结构 

在md中加入静态图片的问题，在md文件中可以使用下面的方式应用静态图片，下面imgs文件夹在public文件件下  目录如下

```
文件地址： docs/.vuepress/public/images/logo.png

md文档中：
![image](/images/logo.png)

```



## 六、项目上线到github pages

参考文章： https://g.xgss.net/doc/gitbook/Github-Page-my-domain.html

在项目中新建文件 CNAME

```
echo 'vuepress.xgss.net'> CNAME
```



github中，setting--->pages

![image-20220514161351877](https://imgoss.xgss.net/picgo/image-20220514161351877.png?aliyun)



### 域名解析

vuepress.xgss.net域名CNAME解析到 funet8.github.io

![image-20220514161550026](https://imgoss.xgss.net/picgo/image-20220514161550026.png?aliyun)

访问： http://vuepress.xgss.net

# 关于自动打包更新

打包脚本，每次项目文档更新之后运行脚本即可

```
cat deploy.sh
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

#提交到github参考
git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:funet8/vuepress.xgss.net.git master


# 生成静态文件
yarn docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git remote add origin git@github.com:funet8/vuepress.xgss.net.git
git add .
git commit -m "脚本自动提交"
git branch -M master
git push --force --quiet "git@github.com:funet8/vuepress.xgss.net.git" master:gh-pages
cd -
```



# 关于主题和插件

修改配置文件：

```
 docs\.vuepress\config.js
 添加主题：
 theme: 'vuepress-theme-note',
```



