

# Windows任务计划程序，实现自动备份功能FreeFileSync

本篇教程主要分两步，本文主要讲第二步。

1.利用FreeFileSync将本地电脑文件同步到移动硬盘或者私有网盘

**2.通过windows计划任务，每日定时备份文件。**

我们在前面的文章中 FreeFileSync 免费文件同步软件 实时自动备份重要资料推荐了一款备份软件：FreeFileSync，今天我们来说说如何windows计划任务自动备份文件。

文件要备份，大家都有这个概念，但真没几个人能手工认认真真、按时按量的完成的。这时，有一个自动化作业的程序，就能让我们省去这个麻烦。

## 一、生成自动备份命令

点击左上角配置栏，选择另存为的第二个黑色图标：创建一个用于无人值守同步的批处理文件。

![FreeFileSync + Windows任务计划程序 实现自动备份功能](https://imgoss.xgss.net/picgo/201810271626_340.png?aliyun)

点击另存为，命名，存储成了一个.ffs_batch文件。

![FreeFileSync + Windows任务计划程序 实现自动备份功能](https://imgoss.xgss.net/picgo/201810271628_374.png?aliyun)

此时，桌面上会出现一个以**.ffs_batch**结尾的文件，如刚刚我们另存的 **未命名.ffs_batch** 。

双击打开此命令，这时我们就会在右下角托盘中找到已经在运行的正在备份的FreeFileSync软件，（因为刚才另存时进度对话框设置为最小化运行）。

![FreeFileSync + Windows任务计划程序 实现自动备份功能](https://imgoss.xgss.net/picgo/201810271633_546.png?aliyun)

## 2、设置Windows任务计划程序

我们在系统程序控制面板中搜索“计划任务“，如下图

![image-20220609143120103](https://imgoss.xgss.net/picgo/image-20220609143120103.png?aliyun)

点击“创建基本任务”，新建一个名称（此处命名为“FreeFileSync-自动备份”)，点击下一页。

![image-20220609143308262](https://imgoss.xgss.net/picgo/image-20220609143308262.png?aliyun)

设置任务触发器，选择自动运行的时间，按每天、每周、每月等周期。

![image-20220609143402516](https://imgoss.xgss.net/picgo/image-20220609143402516.png?aliyun)

此处我们选择按“每天”运行，下一步，设置从哪天开始，每天几点开始运行，每隔几天运行一次。

![image-20220609143441765](https://imgoss.xgss.net/picgo/image-20220609143441765.png?aliyun)



下一步，选择“启动程序”，点击“浏览”选择刚开始创建的 .ffs_batch 文件。

![image-20220609143459380](https://imgoss.xgss.net/picgo/image-20220609143459380.png?aliyun)



![image-20220609143527420](https://imgoss.xgss.net/picgo/image-20220609143527420.png?aliyun)

继续确认，完成。

![image-20220609143646053](https://imgoss.xgss.net/picgo/image-20220609143646053.png?aliyun)

测试运行，双击任务，再点击“运行”，看任务是否可以正常运行。

![image-20220609143856101](https://imgoss.xgss.net/picgo/image-20220609143856101.png?aliyun)



自此以后，每天8点就会自动将我的办公文件同步到电脑的移动硬盘和私有网盘上，再也不用担心文件丢失了。

