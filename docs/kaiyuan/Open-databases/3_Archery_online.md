# 开源SQL审核查询平台Archery-SQL上线流程

# SQL上线流程

在后台设置审批流为 DBA->PM

RD（研发提交SQL语句审核）--->DBA(审核SQL语句)---->PM（项目经理）上线

![image-20201029112234647](https://imgoss.xgss.net/picgo/image-20201029112234647.png?aliyun)

# 1.RD角色提交SQL

使用RD用户登录后台，SQL审核--->SQL上线--->提交SQL

![image-20200909092406236](https://imgoss.xgss.net/picgo/image-20200909092406236.png?aliyun)

提交SQL语句

![image-20200909092931360](https://imgoss.xgss.net/picgo/image-20200909092931360.png?aliyun)

![image-20200909093041582](https://imgoss.xgss.net/picgo/image-20200909093041582.png?aliyun)

# 2.DBA角色审核语句

![image-20200909093142060](https://imgoss.xgss.net/picgo/image-20200909093142060.png?aliyun)

审核通过或者终止流程

![image-20200909093242541](https://imgoss.xgss.net/picgo/image-20200909093242541.png?aliyun)

# 3.PM角色审核上线

![image-20200909093419075](https://imgoss.xgss.net/picgo/image-20200909093419075.png?aliyun)

![image-20200909093645498](https://imgoss.xgss.net/picgo/image-20200909093645498.png?aliyun)

立即执行或者手动执行。



# SQL查询

![image-20201029114023770](https://imgoss.xgss.net/picgo/image-20201029114023770.png?aliyun)

# 系统自动驳回-解决方案

![image-20201027185947130](https://imgoss.xgss.net/picgo/image-20201027185947130.png?aliyun)

使用admin账号： “系统管理”--->“配置项管理”---->“系统设置”

### CRITICAL_DDL_REGEX

高危SQL语句正则判断条件，用于控制禁止提交的语句，匹配的语句会禁止提交，例如^truncate|^rename|^delete则会禁止提交清空表、修改表名、删除操作的SQL语句，前端展现如下 

![-w1089](https://imgoss.xgss.net/picgo/15528789299184.jpg?aliyun)

### AUTO_REVIEW_WRONG

用于控制自动驳回的等级，驳回的工单不会通知审核人，会系统直接审核不通过。

1表示SQL上线审核出现警告信息就驳回，

2和空表示出现错误才驳回，其他设置表示不驳回，

审核规则请参考Inception所支持的参数变量（https://inception-document.readthedocs.io/zh_CN/latest/variables/），前端展现如下 

![-w1129](https://imgoss.xgss.net/picgo/15528791148226.jpg?aliyun)

在后台设置中，将“AUTO_REVIEW_WRONG的值改为0”保存

![image-20201027190333719](https://imgoss.xgss.net/picgo/image-20201027190333719.png?aliyun)



![image-20201027191705760](https://imgoss.xgss.net/picgo/image-20201027191705760.png?aliyun)

SQL语句审核不通过也不会被驳回。