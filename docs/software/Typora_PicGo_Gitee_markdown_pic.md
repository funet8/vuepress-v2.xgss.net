# Typora+PicGo+Gitee或github实现markdown自带图床效果

这里可以选择gitee或者码云，gitee由于众所周知的原因有时候会很慢，无奈选择gitee

# 一、下载安装 PicGo软件

下载并且安装[PicGo](https://github.com/Molunerfinn/PicGo) PicGo官网.

github下载应用：https://github.com/Molunerfinn/PicGo/releases 建议下载PicGo-Setup-2.2.2稳定版的PicGo，我这边下载3.0版本，出现一些bug。

安装完成之后，进入软件安装gitee插件（注：若没有安装 node.js ，则会安装不了插件。因为插件下载需要使用到 node.js 的npm！）

![image-20200903190323139](https://imgoss.xgss.net/picgo/image-20200903190323139.png?aliyun)

### **安装 node.js**

**如果你已经有阿里云、腾讯云、七牛云等图床，可以直接跳过后面步骤，在PicGo 软件上配置**

node.js 官网链接：https://nodejs.org/zh-cn/

选个自己喜欢的版本下载，node.js 的配置可自行百度，这里就不详写了

### 支持以下图床

腾讯云COS 

~~微博图床~~ 停止支持

GitHub图床

七牛图床

~~imgur图床~~ 国外图床被墙，不建议使用

阿里云OSS

有拍云图床

# 二、安装Typora软件（markdown编辑软件）

官方网站：https://typora.io/

配置Typora上传设定:文件--->偏好设置--> 图像 --> 上传服务设定

![image-20200904103414304](https://imgoss.xgss.net/picgo/image-20200904103414304.png?aliyun)



# 三、使用Gitee码云创建图床



### 1.1 在Gitee中创建一个仓库

注意仓库要是public的，不然上传的图片还是无法使用的。

![image-20200904101141370](https://imgoss.xgss.net/picgo/image-20200904101141370.png?aliyun)

https://gitee.com/funet8/blogimage.git

### 1.2 在Gitee生成一个token

这个token是给 [PicGo](https://github.com/Molunerfinn/PicGo) 使用的

![image-20200904093500784](https://imgoss.xgss.net/picgo/image-20200904093500784.png?aliyun)

如果安装没有反应请安装node.js，否则插件可能一直在安装中，那就非常蛋疼了。

![image-20200904144057735](https://imgoss.xgss.net/picgo/image-20200904144057735.png?aliyun)





# 四、创建github图床

优点：免费、方便

缺点：国内访问慢

## 新建github仓库并且新建token

![image-20200904101516069](https://imgoss.xgss.net/picgo/image-20200904101516069.png?aliyun)

设置--> settings--->developer settings--->

![image-20200904101648373](https://imgoss.xgss.net/picgo/image-20200904101648373.png?aliyun)

![image-20200904101816676](https://imgoss.xgss.net/picgo/image-20200904101816676.png?aliyun)

勾选repo

![image-20200904101924546](https://imgoss.xgss.net/picgo/image-20200904101924546.png?aliyun)

页面拉到最下有一个绿色的`Generate token`按钮，按一下就会生成token。

![image-20200904102033508](https://imgoss.xgss.net/picgo/image-20200904102033508.png?aliyun)

将生成的token复制下来，给PicGo使用。

注意：生成的token最好保存到本地，因为下次再进GitHub的时候，这个token就不再显示了。

## 配置PicGo的github图床

仓库名的格式是GitHub用户名\仓库名，前面不用加什么http，后面也不用加.git。分支名就用默认的主分支master。token上一步在github里生成的token。指定存储路径指的是在GitHub仓库里面的路径，我写了picgo/，所以我的仓库下面会生成一个picgo目录，所有图片都会上传到这个img目录下。指定存储路径不是必填项，可以不写。

https://github.com/funet8/blogimage.git

设定仓库名：funet8/blogimage

分支名：master

设定token：xxxxx

指定存储路径：随意  我这里填写 picgo/

![image-20200904144924798](https://imgoss.xgss.net/picgo/image-20200904144924798.png?aliyun)



![image-20200904103104345](https://imgoss.xgss.net/picgo/image-20200904103104345.png?aliyun)

提示上传成功







