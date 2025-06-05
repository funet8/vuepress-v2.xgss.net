# Linux开机出现welcome to emergency mode! 解决方法after logging in ，type “journalctl -xb” to view system logs



## 前言

五一假期公司机房断电，回来之后出现报错 “welcome to emergency mode”

如图所示

![image-20230504170548992](https://imgoss.xgss.net/picgo/image-20230504170548992.png?aliyun)

输入root密码，进入系统

```
查看报错
# journalctl -xb

```

查看日志

![image-20230504170733916](https://imgoss.xgss.net/picgo/image-20230504170733916.png?aliyun)

如图报错

```
mount: mount /dev/mapper/cl-home failed: structure needs cleaning
```



## 解决方案

```

lsblk -f 查看文件系统格式
ext4文件系统，使用命令fsck.ext4 /dev/xxx修复
xfs文件系统，使用命令xfs_repair -L /dev/xxx 修复
```



# 实际操作

```
# lsblk -f
查看到硬盘是xfs格式
# xfs_repair -L /dev/mapper/cl-home
```

修复完成之后重启系统，即可进入Linux









