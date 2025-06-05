# 让你的Linux客户端secureCRT充满颜色

一般secureCRT是黑白色的背景和字体。这样不是彩色的，看起来非常不清楚。需要设置成彩色。方法步骤如下：

1.打开会话选项--终端--仿真--终端设置为VT100，并且勾选上ASCII颜色和使用颜色方案。

2.打开会话选项--外观--当前颜色方案选择Windows。

3.设置系统配置并且写入环境变量。

在Linux系统里面执行：

export TERM=xterm-color

修改环境变量：

vim /etc/profile，在最后一行添加：

export TERM=xterm-color

source /etc/profile

这样，secureCRT就会显示颜色啦。

对比

![image-20220524114254230](https://imgoss.xgss.net/picgo/image-20220524114254230.png?aliyun)

![image-20220524114246882](https://imgoss.xgss.net/picgo/image-20220524114246882.png?aliyun)