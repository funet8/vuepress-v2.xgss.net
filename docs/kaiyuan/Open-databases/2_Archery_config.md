---
title: 2_Archery_config
createTime: 2025/05/27 17:51:17
permalink: /article/czuf39cw/
---
# SQL审核查询平台Archery-后台配置基本操作

## 一.系统配置

### 1.Inception配置

```
GO_INCEPTION_HOST:goInception的连接地址,用于MySQL审核执行，docker-compose启动的请配置为容器名,比如goinception，参考文档：https://github.com/hanchuanchuan/goInception
```

```
goInception的连接端口，默认 4000
```

```
INCEPTION_HOST
Inception连接HOST，用于SQL查询语法解析，docker-compose启动的请配置为容器名，比如 inception，参考文档 ：https://github.com/hhyo/inception
```

```
INCEPTION_PORT
Inception连接端口，即Inception配置文件inc.cnf内的port
```

如图

![image-20200908201233438](https://imgoss.xgss.net/picgo/image-20200908201233438.png?aliyun)

具体配置可参考官方的文档：https://archerydms.com/configuration/

### 2.邮件配置

![image-20201029154609645](https://imgoss.xgss.net/picgo/image-20201029154609645.png?aliyun)

点击测试：

![image-20201029154949817](https://imgoss.xgss.net/picgo/image-20201029154949817.png?aliyun)

# 二.新建资源组

登录后台 系统资源--->资源组管理--->添加组

建议将开发数据库、测试数据库、正式数据库划分到一个组里，后期方便管理。

![image-20200908193729674](https://imgoss.xgss.net/picgo/image-20200908193729674.png?aliyun)

## 添加实例

如图： 实例管理--->实例列表--->添加实例

![image-20200908193949367](https://imgoss.xgss.net/picgo/image-20200908193949367.png?aliyun)

如图填写实例信息

![填写实例信息](https://imgoss.xgss.net/picgo/image-20200908194135183.png?aliyun)

![image-20200908194214508](https://imgoss.xgss.net/picgo/image-20200908194214508.png?aliyun)

## 配置审批流程

配置项管理--->选择操作，下拉选择“工单审核流配置”--->变更审批流程（选择变更审批流顺序）

![image-20200909090804049](https://imgoss.xgss.net/picgo/image-20200909090804049.png?aliyun)

这样在提交的工作流 先由RD开发提交SQL上线工作流--->DBA审核--->PM最后审核上线

完成一个完整的SQL审批工作流。

# 三、用户管理

如图，系统管理--->其他配置管理--->用户管理

![image-20200909092114423](https://imgoss.xgss.net/picgo/image-20200909092114423.png?aliyun)

增加用户

![image-20200909092229154](https://imgoss.xgss.net/picgo/image-20200909092229154.png?aliyun)
