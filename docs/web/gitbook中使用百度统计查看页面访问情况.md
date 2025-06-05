# gitbook中使用百度统计查看页面访问情况



## 安装baidu-tongji

在配置文件book.json中添加

```
{
    "plugin": ["baidu-tongji"]
}
```

安装

```
gitbook install
```



登录百度统计官网，注册或者登录

![image-20220429111443738](https://imgoss.xgss.net/picgo/image-20220429111443738.png?aliyun)

[新增网站]后，点击[获取代码]，获取以下类似代码：

```
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?559562c6410b9fd49a0afe52650d40bd";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>

```



将步骤一获取代码自动生成的token(即"559562c6410b9fd49a0afe52650d40bd")添加到配置文件

```
{
    "plugin": ["baidu-tongji"],
    "pluginsConfig": {
        "baidu-tongji": {
            "token": "559562c6410b9fd49a0afe52650d40bd"
        }
    }
}
```











https://github.com/huisman6/gitbook-plugin-baidu-tongji