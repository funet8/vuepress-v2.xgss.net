#  【免费开源软件】高颜值多平台的第三方网易云音乐播放器-YesPlayMusic



# 前言

你是否厌倦了千篇一律的音乐播放器界面？是否想拥有一个更符合自己审美、功能更强大的音乐播放工具？YesPlayMusic，这款高颜值的开源网易云音乐第三方播放器，或许能满足你的所有期待。

## 如何获取YesPlayMusic

GitHub下载： 在YesPlayMusic的GitHub仓库（https://github.com/qier222/YesPlayMusic）中下载最新版本的安装包。

安装包支持 Windows / macOS / Linux

https://github.com/qier222/YesPlayMusic/releases



![wangyiyunyinyue](https://imgoss.xgss.net/picgo/wangyiyunyinyue.jpg?aliyun)

## 特性

- ✅ 使用 Vue.js 全家桶开发
- 🔴 网易云账号登录（扫码/手机/邮箱登录）
- 📺 支持 MV 播放
- 📃 支持歌词显示
- 📻 支持私人 FM / 每日推荐歌曲
- 🚫🤝 无任何社交功能
- 🌎️ 海外用户可直接播放（需要登录网易云账号）
- 🔐 支持UnblockNeteaseMusic，自动使用各类音源替换变灰歌曲链接 （网页版不支持）
  - 「各类音源」指默认启用的音源。
  - YouTube 音源需自行安装 `yt-dlp`。
- ✔️ 每日自动签到（手机端和电脑端同时签到）
- 🌚 Light/Dark Mode 自动切换
- 👆 支持 Touch Bar
- 🖥️ 支持 PWA，可在 Chrome/Edge 里点击地址栏右边的 ➕ 安装到电脑
- 🟥 支持 Last.fm Scrobble
- ☁️ 支持音乐云盘
- ⌨️ 自定义快捷键和全局快捷键
- 🎧 支持 Mpris

## NAS的部署-docker



```
# docker run -itd --name yesplaymusic  --restart always -p 7950:80 fogforest/yesplaymusic

# 342978d664ce   fogforest/yesplaymusic                       "/docker-entrypoint.…"   5 days ago     Up 5 days             0.0.0.0:7950->80/tcp, :::7950->80/tcp                                                                                                                                                    yesplaymusic
```

使用浏览器访问： 
你的IP+端口
http://192.168.1.22:7950

### 登录页面

![image-20241016233121790](https://imgoss.xgss.net/picgo/image-20241016233121790.png?aliyun)

### 登录之后

同步了自己的网易云的歌单。

![image-20241016233051289](https://imgoss.xgss.net/picgo/image-20241016233051289.png?aliyun)



# 总结

YesPlayMusic是一款功能强大、界面美观、使用便捷的网易云音乐第三方播放器。如果你正在寻找一款个性化的音乐播放工具，YesPlayMusic绝对值得一试。赶快加入我们，一起打造更美好的音乐世界吧！

