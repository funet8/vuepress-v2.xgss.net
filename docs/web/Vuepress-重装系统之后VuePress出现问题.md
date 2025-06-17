---
title: Vuepress-重装系统之后VuePress出现问题
createTime: 2025/05/27 17:51:18
permalink: /article/wuiiiplm/
---
# Vuepress-重装系统之后VuePress出现问题

# node版本不同

重装系统之后报错

```
Administrator@chuanqu-star MINGW64 /g/STAR学习/g.xgss.net (vuepress)
$ yarn init
yarn init v1.22.22
error Error: Can't answer a question unless a user TTY
    at ConsoleReporter.question (C:\Users\Administrator\AppData\Roaming\npm\node_modules\yarn\lib\cli.js:93384:59)
    at Object.<anonymous> (C:\Users\Administrator\AppData\Roaming\npm\node_modules\yarn\lib\cli.js:85589:38)
    at Generator.next (<anonymous>)
    at step (C:\Users\Administrator\AppData\Roaming\npm\node_modules\yarn\lib\cli.js:310:30)
    at C:\Users\Administrator\AppData\Roaming\npm\node_modules\yarn\lib\cli.js:321:13
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
info Visit https://yarnpkg.com/en/docs/cli/init for documentation about this command.

```



## 旧电脑yarn docs:dev

```
$ yarn docs:dev
yarn run v1.22.17
$ vuepress dev docs
.......
success [17:16:20] Build 1f0d71 finished in 12792 ms!
> VuePress dev server listening at http://localhost:8099/

```



## 新电脑yarn docs:dev

```
$ yarn docs:dev
yarn run v1.22.22
$ vuepress dev docs
'vuepress' is not recognized as an internal or external command,
operable program or batch file.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

```

## 版本区别

```
新的系统
node -v
v20.15.1

服务器
node -v
v16.14.0

旧的电脑
node -v
v16.14.0


```

要重装吗？

