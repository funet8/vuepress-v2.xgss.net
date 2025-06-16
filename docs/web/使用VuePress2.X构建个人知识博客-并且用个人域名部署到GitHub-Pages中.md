# 使用VuePress2.X构建个人知识博客，并且用个人域名部署到GitHub Pages中

## 什么是VuePress

VuePress 是一个以 Markdown 为中心的静态网站生成器。你可以使用 Markdown 来书写内容（如文档、博客等），然后 VuePress 会帮助你生成一个静态网站来展示它们。VuePress 诞生的初衷是为了支持 Vue.js 及其子项目的文档需求，但是现在它已经在帮助大量用户构建他们的文档、博客和其他静态网站。官网：

```
https://vuepress.vuejs.org/zh/
```

## VuePress1.X和VuePress2.X区别

最开始星哥使用的是VuePress1.X（https://vuepress.xgss.net/），后期由于nodejs升级了导致VuePress1.X使用不了，一直报错。

无奈升级到VuePress2.X，2.x和1.x有很多不兼容的地方，也踩了很多坑，记录一下。

![image-20250606145334981](https://imgoss.xgss.net/picgo2025/image-20250606145334981.png?aliyun)

# 安装VuePress

环境： window10

最好有自己的域名，星哥这里使用的是vuepress-v2.xgss.net

软件安装：nodejs和git

由于官方的教程docs.yml文件是pnpm作为包管理器，本人最开始使用的是yarn导致GitHub Actions失败，所以使用pnpm重新安装VuePress

星哥最开始使用的yarn，后来改成了pnpm，所以这个笔记遇到yarn一律改成pnpm既可。

```
https://vuepress.vuejs.org/zh/guide/deployment.html#github-pages
```



## 重新安装VuePress

```
安装
$ npm install -g pnpm
added 1 package in 3s
$ pnpm -v
10.11.1

pnpm create vuepress vuepress-starter
mkdir vuepress-starter
cd vuepress-starter

安装vuepress
pnpm init
pnpm add -D vuepress@next vue
pnpm add -D @vuepress/bundler-vite@next @vuepress/theme-default@next

安装调试插件
pnpm add -D sass-embedded
安装搜索插件
pnpm add -D @vuepress/plugin-search@next

启动开发服务器
pnpm docs:dev

构建网站：
pnpm docs:build
```



以下是使用yarn安装，这里推荐使用pnpm安装

```
你可以通过 create-vuepress 直接创建项目模板。
yarn create vuepress vuepress-starter

创建并进入一个新目录
mkdir vuepress-starter
cd vuepress-starter

初始化项目
git init
yarn init

# 安装 vuepress
yarn add -D vuepress@next
# 安装打包工具和主题
yarn add -D @vuepress/bundler-vite@next @vuepress/theme-default@next

```

## 创建 VuePress 配置文件

docs/.vuepress/config.js

```
mkdir -p docs/.vuepress/
vi docs/.vuepress/config.js
填入一下配置：
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme(),
})
```

创建你的第一篇文档

```
echo '# Hello VuePress' > docs/README.md
```



## 启动开发服务器

你可以在 package.json 中添加一些 scripts ：

```
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

![image-20250605102058056](https://imgoss.xgss.net/picgo2025/image-20250605102058056.png?aliyun)

运行 docs:dev 脚本可以启动开发服务器:

```
yarn docs:dev
```

VuePress 会在 http://localhost:8080 启动一个热重载的开发服务器。当你修改你的 Markdown 文件时，浏览器中的内容也会自动更新。

报错：

![image-20250605102257832](https://imgoss.xgss.net/picgo2025/image-20250605102257832.png?aliyun)

```
yarn add -D sass-embedded
```

## 再启动开发服务器

```
$ yarn docs:dev
yarn run v1.22.22
$ vuepress dev docs
√ Initializing and preparing data - done in 58ms
10:22:16 [vite] (client) Re-optimizing dependencies because lockfile has changed

  vite v6.3.5 dev server running at:

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://192.168.1.251:8080/
  ➜  Network: http://192.168.52.1:8080/
  ➜  Network: http://192.168.152.1:8080/

```

使用浏览器访问http://localhost:8080/

![image-20250605102401921](https://imgoss.xgss.net/picgo2025/image-20250605102401921.png?aliyun)



## 构建你的网站

运行 docs:build 脚本可以构建你的网站：

```
yarn docs:build
```

## 查看vuepress版本

```
yarn list vuepress
```



# vuepress主题（报错）

更换主题，一直报错就决定不换主题了，使用默认主题了！

官网： https://marketplace.vuejs.press/zh/themes/

## VuePress Theme Mix

https://vuepress-theme-mix.netlify.app/zh/guide/getting-started.html

### 安装VuePress Theme Mix

```
yarn add -D vuepress-theme-mix@next
```

### 使用与配置

```
import { defineUserConfig } from 'vuepress'
import mixTheme from 'vuepress-theme-mix'

export default defineUserConfig({
  // ...

  theme: mixTheme({
    // 在这里配置主题
  }),

  // ...
})
```

# VuePress配置搜索

## 安装插件

```
首先，在你的 VuePress 项目中安装该插件：
pnpm add -D @vuepress/plugin-search@next
# 或者
yarn add -D @vuepress/plugin-search@next
# 或者
npm i -D @vuepress/plugin-search@next

```

## 配置config.js

```
.vuepress/config.js 示例:
import { searchPlugin } from '@vuepress/plugin-search'

module.exports = {
  plugins: [
    searchPlugin({
      // 插件选项
      // 可以配置的选项包括：
      // maxSuggestions: 5, // 最多显示多少条搜索结果
      // isSearchable: (page) => page.path !== '/', // 排除特定页面
      // hotKeys: ['s', '/'], // 激活搜索框的快捷键
      // locales: { // 多语言支持
      //   '/': {
      //     placeholder: '搜索',
      //   },
      //   '/en/': {
      //     placeholder: 'Search',
      //   },
      // },
      // get.Display.Text: (page) => { /* 自定义搜索结果显示文本 */ },
      // search: (query, pages) => { /* 自定义搜索逻辑 */ },
    }),
  ],
}


```



## 报错1

使用

```
yarn docs:build
```



报错，由于图片没有上传到oss中导致报错。

```
error [vite:asset] Could not load G:/STAR学习/vuepress-starter/docs/./chatgpt/H:/typora_images/image-20240415180831846.png (imported by docs/.vuepress/.temp/pages/chatgpt/15.免费使用GPT-4的3种方法，白嫖大模型.html.vue): ENOENT: no such file or directory, open 'G:\STAR学习\vuepress
-starter\docs\chatgpt\H:\typora_images\image-20240415180831846.png'
```

解决：

```
grep -R 'typora_images' ./*| grep -v '.vuepress/'
查看所有未上传的图片
```

把所有的图片上传到oss中，再生成yarn docs:build

# 配置到GitHub Pages

前置条件，需要你有自己的域名，如果没有自有的域名，也可以使用github的域名，但是国内可能访问不畅。

```
自己的域名CNAME到 https://<USERNAME>.github.io

或者使用官方域名： https://<USERNAME>.github.io/<REPO>/
```

这里星哥使用vuepress-v2.xgss.net 解析到 funet8.github.io

## 1.github新建仓库

```
新建git 仓库
vuepress-v2.xgss.net

克隆到本地
git clone git@github.com:funet8/vuepress-v2.xgss.net.git
把docs的文档拷贝进去
```

## 2.执行

```
#提交到github仓库-vuepress-v2分支
#git init
git add -A
git commit -m 'deploy.sh-vuepressV2脚本自动提交'
git push -f git@github.com:funet8/vuepress-v2.xgss.net.git main
```

有两个分支

![image-20250605161934191](https://imgoss.xgss.net/picgo2025/image-20250605161934191.png?aliyun)

## 3.设置域名访问

自有域名 vuepress-v2.xgss.net 解析到github中

Settings --> Pages 

![image-20250605162124719](https://imgoss.xgss.net/picgo2025/image-20250605162124719.png?aliyun)

```
把 vuepress-v2.xgss.net CNAME解析到 funet8.github.io
把 你的域名  解析到 <你的github账号名>.github.io
```

![image-20250605162742075](https://imgoss.xgss.net/picgo2025/image-20250605162742075.png?aliyun)

等待解析生效，github会提示DNS check successful

勾选 Enforce HTTPS，强制

直接根据官方文档先初始化项目就行了，注意文档的版本，v1和v2还是有很多地方不同的。

## 4.用 GitHub Actions 部署到 GitHub Pages

参考：https://vuepress.vuejs.org/zh/guide/deployment.html#github-pages

创建 .github/workflows/docs.yml 文件来配置工作流。

```
name: docs

on:
  # 每当 push 到 main 分支时触发部署
  push:
    branches: [main]
  # 手动触发部署
  workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: 设置 pnpm
        uses: pnpm/action-setup@v4

      - name: 设置 Node.js
        uses: actions/setup-node@v4
        with:
          # 选择要使用的 node 版本
          node-version: 22
          # 缓存 pnpm 依赖
          cache: pnpm

      - name: 安装依赖
        run: pnpm install --frozen-lockfile

      # 运行构建脚本
      - name: 构建 VuePress 站点
        run: pnpm docs:build

      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: 部署到 GitHub Pages
        uses: crazy-max/ghaction-github-pages@v4
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: docs/.vuepress/dist
        env:
          # @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

提交代码，触发Actions

![image-20250605165314078](https://imgoss.xgss.net/picgo2025/image-20250605165314078.png?aliyun)

## 报错没有配置packageManager

```
Error: No pnpm version is specified. Please specify it by one of the following ways: - in the GitHub Action config with the key "version" - in the package.json with the key "packageManager"
```



![image-20250605165722852](https://imgoss.xgss.net/picgo2025/image-20250605165722852.png?aliyun)

## 解决

在 package.json添加

```
"packageManager": "pnpm@10.11.1"

或者在 .github/workflows/docs.yml 文档中添加
      - name: 设置 pnpm
        uses: pnpm/action-setup@v4
        with:
          version: '8.x'
```

## 报错无pnpm-lock.yaml

```
Dependencies lock file is not found in /home/runner/work/vuepress-v2.xgss.net/vuepress-v2.xgss.net. Supported file patterns: pnpm-lock.yaml
```

![image-20250605171442396](https://imgoss.xgss.net/picgo2025/image-20250605171442396.png?aliyun)

## 解决

安装pnpm

```
$ npm install -g pnpm
added 1 package in 3s


$ pnpm -v
10.11.1

$rm -rf node_modules/

$ pnpm install
```

# pnpm包管理的问题

由于官方的教程docs.yml文件是pnpm作为包管理器，本人最开始使用的是yarn导致GitHub Actions失败，所以重新安装VuePress

```
https://vuepress.vuejs.org/zh/guide/deployment.html#github-pages
```

## 重新安装VuePress

```
mv package.json package-yarn.json
rm -rf node_modules

安装vuepress
pnpm init
pnpm add -D vuepress@next vue
pnpm add -D @vuepress/bundler-vite@next @vuepress/theme-default@next

调试插件
pnpm add -D sass-embedded
搜索插件
pnpm add -D @vuepress/plugin-search@next

启动开发服务器
pnpm docs:dev

构建网站：
pnpm docs:build
```





## 5.工作流权限

在仓库的 Settings > Actions > General，确保 GITHUB_TOKEN 的权限被设置为 write 权限（即推送权限）。

![image-20250605183211238](https://imgoss.xgss.net/picgo2025/image-20250605183211238.png?aliyun)

如图，勾选：Read and write permissions

保存。

## 6.提交成功

![image-20250606094256875](https://imgoss.xgss.net/picgo2025/image-20250606094256875.png?aliyun)

但是当我访问页面的时候

```
https://funet8.github.io/vuepress-v2.xgss.net/
```

无尽的404让人头疼

![image-20250606094350107](https://imgoss.xgss.net/picgo2025/image-20250606094350107.png?aliyun)

再次修改

```
docs\.vuepress\config.js
里面的配置
base: '/vuepress-v2.xgss.net/', // 部署到github相关的配置 
则是使用https://funet8.github.io/vuepress-v2.xgss.net/ 访问
```

改成使用域名，发现缺少CNAME 文件

于是在docs.yml文件中添加一步

```
      - name: Add CNAME file # 添加 CNAME 文件
        run: echo 'vuepress-v2.xgss.net' > docs/.vuepress/dist/CNAME
```

最终使用域名 vuepress-v2.xgss.net 可以访问博客页面了。

# 最后

写文不易，如果你都看到了这里，请点个赞和在看，分享给更多的朋友；也别忘了关注星哥玩云！这里有满满的干货分享，还有轻松有趣的技术交流～点个赞、分享给身边的小伙伴，一起成长，一起玩转技术世界吧！ 😊



通过以上步骤，你成功地使用VuePress 2.X搭建了一个个人知识博客，并将其部署到GitHub Pages，同时还配置了自己的个人域名。这不仅为你提供了一个高效的知识管理平台，还能让你更好地记录学习过程并分享给他人。希望这篇教程对你有所帮助，祝你搭建博客愉快！

