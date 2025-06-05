# 使用 vuepress-theme-vdoing 搭建知识管理博客主题



之前使用vuepress搭建过博客，后期觉得界面太丑，出现了审美疲劳，想换个主题在网上找一个vuepress-theme-vdoing既可以做博客系统也可以做知识库。

## 主要目标 

1.什么是vuepress和 vuepress-theme-vdoing 

2.使用 vuepress-theme-vdoing+githubpages+自有域名实现，无服务器的个人博客站点。

## 什么是 vuepress-theme-vdoing

一款简洁高效的VuePress知识管理&博客(blog)主题。

1. 这个主题的初衷是打造一个好用的、面向程序员的`知识管理工具`
2. 轻松构建一个`结构化`的知识库，让你的知识海洋像一本本书一样清晰易读。
3. 博客功能提供一种知识的`碎片化`形态，并支持个性化博客配置。
4. `简洁高效`，以 Markdown 为中心的项目结构。内置自动化工具，以更少的配置完成更多的事。配合多维索引快速定位每个知识点。

因为vuepress-theme-vdoing功能强大。

可以通过Gittalk实现静态博客无后台评论、通过GItHub Actions实现在线编辑；

作者还实现了高效免费图床和百度收录；

界面也有博客效果、技术文档效果、单页效果；

还可以修改主题颜色和样式；

Vuepress相当于房子骨架，而装修的模板则是使用vuepress-theme-vdoing。

![image-20230427094208759](https://imgoss.xgss.net/picgo/image-20230427094208759.png?aliyun)

## vuepress-theme-vdoing官网

[vuepress-theme-vdoing](https://github.com/xugaoyi/vuepress-theme-vdoing) 的github地址： https://github.com/xugaoyi/vuepress-theme-vdoing

官方文档： https://doc.xugaoyi.com/

文档Github地址： https://github.com/xugaoyi/vuepress-theme-vdoing-doc

- 案例1：[知识库兼博客站](https://xugaoyi.com/)
- 案例2：[仅博客站](https://xugaoyi.github.io/vdoing-demo-blog/)
- 案例3：[仅知识库](https://xugaoyi.github.io/vdoing-demo-repository/)
- 案例4：[文档站](https://doc.xugaoyi.com/)



## 一.安装nodejs

如果安装了就可以忽略。本机已经安装nodejs

VuePress 需要 [Node.js](https://nodejs.org/en/download)>= 8.6,没有安装的去官网下载nodejs：https://nodejs.org/en/download

演示是用window系统，安装 nodejs

**注意官方提醒Node请使用>=14.17.0且<=16.20.0的版本。**

```
$ node -v
v16.14.0
```



## 二.安装 VuePress

```
1.创建并进入一个新目录
$ mkdir vuepress-starter && cd vuepress-starter

2.使用你喜欢的包管理器进行初始化
$ yarn init

3.将 VuePress 安装为本地依赖
$ yarn add -D vuepress

4.创建你的第一篇文档
$ mkdir docs && echo '# Hello VuePress' > docs/README.md

5.配置package.json 文件
$ vi package.json
填写内容：
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
6.在本地启动服务器
$ yarn docs:dev

```

VuePress 会在 http://localhost:8080 启动一个热重载的开发服务器。

访问IP+端口既可访问vuepress.

更多的教程可查看官方的文档 [https://vuepress.vuejs.org/zh/](https://vuepress.vuejs.org/zh/) 。本篇文章的重点不在 vuepress上，而是基于vuepress搭建vuepress-theme-vdoing的主题。



## 三、Github上fork项目

进入Github，选择适合自己的vuepress-theme-vdoing仓库，再fork到自己账号下。

知识库兼博客风格仓库 [https://github.com/xugaoyi/vuepress-theme-vdoing](https://github.com/xugaoyi/vuepress-theme-vdoing)

文档风格： [https://github.com/xugaoyi/vuepress-theme-vdoing-doc.git](https://github.com/xugaoyi/vuepress-theme-vdoing-doc.git)

简洁模板预设配置(社区提供)  [https://github.com/u2sb/vuepress-theme-vdoing-template.git](https://github.com/u2sb/vuepress-theme-vdoing-template.git)



![image-20230427093855419](https://imgoss.xgss.net/picgo/image-20230427093855419.png?aliyun)



![image-20230427093922690](https://imgoss.xgss.net/picgo/image-20230427093922690.png?aliyun)

生成了自己的仓库  `https://github.com/{username}/vuepress-theme-vdoing`

## 四、安装和启动vuepress-theme-vdoing

进入git bash

```
# clone the project
$ git clone git@github.com:funet8/vuepress-theme-vdoing.git 

# 进入项目目录
$ cd vuepress-theme-vdoing

# install dependency 注意：如安装不成功请关闭淘宝源。
npm install # or yarn install

# develop
npm run dev # or yarn dev

```

![image-20230427095316992](https://imgoss.xgss.net/picgo/image-20230427095316992.png?aliyun)

当出现

```
success [10:04:05] Build a916e1 finished in 163492 ms!
> VuePress dev server listening at http://localhost:8080/
```

说明部署成功，访问 http://localhost:8080/

![image-20230427100837236](https://imgoss.xgss.net/picgo/image-20230427100837236.png?aliyun)



参考地址： https://doc.xugaoyi.com/pages/793dcb/#%E5%AE%89%E8%A3%85%E5%92%8C%E5%90%AF%E5%8A%A8

编辑项目目录的文档，构建自己博客和知识体系



## 五、项目上线到github pages

更新仓库 gh-pages

```
执行项目中的
$ sh deploy.sh

```

![image-20230427104201265](https://imgoss.xgss.net/picgo/image-20230427104201265.png?aliyun)

提交到gh-pages分支

![image-20230427104652522](https://imgoss.xgss.net/picgo/image-20230427104652522.png?aliyun)



### 配置github pages域名

![image-20230427105048426](https://imgoss.xgss.net/picgo/image-20230427105048426.png?aliyun)



### 域名解析

```
vdoing.xgss.net 域名CNAME解析到 funet8.github.io
```

![image-20230427105300531](https://imgoss.xgss.net/picgo/image-20230427105300531.png?aliyun)



访问： http://vdoing.xgss.net 发布到公网上了。

![image-20230427105509774](https://imgoss.xgss.net/picgo/image-20230427105509774.png?aliyun)