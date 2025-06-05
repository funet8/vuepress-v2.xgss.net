# 利用谷歌浏览器获取京东Cookie抓取

## 使用到的工具

- Chrome浏览器

## 操作过程

打开Chrome浏览器，按F12打开开发者工具，打开工具中左上角的图标(下图)

![img](http://imgoss.xgss.net/picgo/a154a6e38730498cb9a8f8244e56e890?aliyunoss)

然后随便选中一个手机设备(下图)

![img](http://imgoss.xgss.net/picgo/f9add4b1c06248e89208e4d4dab88085?aliyunoss)

地址栏输入 [https://wqs.jd.com/](https://wqs.jd.com/) 回车(下图)

![img](http://imgoss.xgss.net/picgo/95dbb8f147634f5da344b56eae772e15?aliyunoss)

打开京东网站后 点击右上角 登录 (下图)

![img](http://imgoss.xgss.net/picgo/f68f0ef516ee493fa3c91e09641a4916?aliyunoss)

输入登录账号密码 点击登录(下图)

![img](http://imgoss.xgss.net/picgo/3780492a021f49f7860810aa1d135374?aliyunoss)

部分人可能需要拖动滑动验证码(下图)

![img](http://imgoss.xgss.net/picgo/8a43b70cf0b4457cac59215d78ab5ed0?aliyunoss)

登录完后 按按钮清除记录，在地址栏输入”[https://home.m.jd.com/](https://www.ddayh.com/go.php/?url=https://home.m.jd.com/)” ,回车 (下图)

![img](http://imgoss.xgss.net/picgo/7b242d5bf5d147f58539c5e6a5f01cd2?aliyunoss)

找到第一个封包”home.m.jd.com”，点击选中(下图)

![img](http://imgoss.xgss.net/picgo/5a01d0b4249c4ea4b65209ffdd893c94?aliyunoss)

Cookie所在位置，看下图

备注 : 我们所需要的cookie字段在”cookie:”的里面

但是我们提交cookie的时候 不能全部复制上去

我们只需要提交pt_key开头的和pt_pin开头的

一般这两个是在一起出现的

例如我的cookie就是

pt_key=AAJhDPHpADD4slF11wQeWjW22zJqWYMw7lIU-CDqJHCykFdIZfNS_rGRbAsj-VfLdk9iL6RjB74;pt_pin=39874641-7;

提交的时候 一定要把最后的分号也带上  pt_key的前面不能有空格



![img](http://imgoss.xgss.net/picgo/d861069047f9419ab3f4a18218bd1598?aliyunoss)

 