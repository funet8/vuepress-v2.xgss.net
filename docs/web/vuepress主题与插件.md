# vuepress主题与插件



官方文档： https://vuepress-theme-reco.recoluan.com/views/plugins/



# vuepress-reco博客主题

## vuepress博客主题—vuepress-theme-reco

https://vuepress-theme-reco.recoluan.com/views/1.x/installUse.html

```
安装主题：
yarn add vuepress-theme-reco

引用
module.exports = {
  theme: 'reco'
} 
```



# 添加评论

https://vuepress-theme-reco.recoluan.com/views/1.x/valine.html

主题内置评论插件 @vuepress-reco/vuepress-plugin-comments，可以根据自己的喜好选择 Valine 或者 Vssue；



在VuePress中使用：https://valine.js.org/vuepress.html

https://valine.js.org/quickstart.html 

## 1.注册LeanCloud

https://console.leancloud.cn/register

![image-20220517143252645](https://imgoss.xgss.net/picgo/image-20220517143252645.png?aliyun)

## 身份认证

![image-20220517143315432](https://imgoss.xgss.net/picgo/image-20220517143315432.png?aliyun)

## 创建应用

 https://console.leancloud.cn/apps

![image-20220517143907106](https://imgoss.xgss.net/picgo/image-20220517143907106.png?aliyun)

![image-20220517144010799](https://imgoss.xgss.net/picgo/image-20220517144010799.png?aliyun)

## 查看APPID和APPKEY

![image-20220517144126905](https://imgoss.xgss.net/picgo/image-20220517144126905.png?aliyun)

## 在vuepress配置文件中添加

```javascript
module.exports = {
  theme: 'reco',
  themeConfig: {
    valineConfig: {
      appId: '...',// your appId
      appKey: '...', // your appKey
    }
  }  
}
```

## 最终效果

![image-20220517145006930](https://imgoss.xgss.net/picgo/image-20220517145006930.png?aliyun)