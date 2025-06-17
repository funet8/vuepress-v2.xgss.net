---
title: datax-web-use
createTime: 2025/05/27 17:51:17
permalink: /article/rdjktarf/
---
# 开源DataX集成可视化项目Datax-Web的使用

上一篇文章我们已经搭建好了 Datax-Web 后台，这篇文章我们具体讲一下如何通过Datax-Web来配置，同步MySQL数据库。

# 目标

![image-20230321171446281](https://imgoss.xgss.net/picgo/image-20230321171446281.png?aliyun)



# MySql数据库全量同步

![datax-web-shuju](https://imgoss.xgss.net/picgo/datax-web-shuju.jpg?aliyun)

## 1.执行器配置

![datax-webx12](https://imgoss.xgss.net/picgo/datax-webx12.jpg?aliyun)

1、"调度中心OnLine:"右侧显示在线的"调度中心"列表, 任务执行结束后, 将会以failover的模式进行回调调度中心通知执行结果, 避免回调的单点风险;

2、"执行器列表" 中显示在线的执行器列表, 可通过"OnLine 机器"查看对应执行器的集群机器;

![image-20230327164734793](https://imgoss.xgss.net/picgo/image-20230327164734793.png?aliyun)

1、AppName: （与datax-executor中application.yml的datax.job.executor.appname保持一致）
   每个执行器集群的唯一标示AppName, 执行器会周期性以AppName为对象进行自动注册。可通过该配置自动发现注册成功的执行器, 供任务调度时使用;

2、名称: 执行器的名称, 因为AppName限制字母数字等组成,可读性不强, 名称为了提高执行器的可读性;

3、排序: 执行器的排序, 系统中需要执行器的地方,如任务新增, 将会按照该排序读取可用的执行器列表;

4、注册方式：调度中心获取执行器地址的方式；    

自动注册：执行器自动进行执行器注册，调度中心通过底层注册表可以动态发现执行器机器地址；    

手动录入：人工手动录入执行器的地址信息，多地址逗号分隔，供调度中心使用；

5、机器地址："注册方式"为"手动录入"时有效，支持人工维护执行器的地址信息；



## 2.创建数据源

数据源管理--->添加

![image-20230327165806036](https://imgoss.xgss.net/picgo/image-20230327165806036.png?aliyun)

如图填写MySQL的账号信息，点击测试连接，无误之后确认。

第四步使用

## 3.创建任务模版

![image-20230328150138528](https://imgoss.xgss.net/picgo/image-20230328150138528.png?aliyun)

第四步使用

## 4. 构建JSON脚本

### 1.任务批量构建

步骤一，步骤二，选择第二步中创建的数据源，JSON构建目前支持的数据源有hive,mysql,oracle,postgresql,sqlserver,hbase,mongodb,clickhouse 其它数据源的JSON构建正在开发中,暂时需要手动编写。

任务管理--->任务批量构建--->选择数据库源

![image-20230328163521242](https://imgoss.xgss.net/picgo/image-20230328163521242.png?aliyun)



### 2.字段映射



![image-20230328163800009](https://imgoss.xgss.net/picgo/image-20230328163800009.png?aliyun)



### 3.批量创建任务

![image-20230328163835852](https://imgoss.xgss.net/picgo/image-20230328163835852.png?aliyun)

手动执行一次

### 4.启动任务

![image-20230328164122275](https://imgoss.xgss.net/picgo/image-20230328164122275.png?aliyun)



### 查看日志

![image-20230328164221949](https://imgoss.xgss.net/picgo/image-20230328164221949.png?aliyun)



报错

```
2023-03-28 16:41:14 [JobThread.run-130] <br>----------- datax-web job execute start -----------<br>----------- Param:
2023-03-28 16:41:14 [BuildCommand.buildDataXParam-100] ------------------Command parameters:
2023-03-28 16:41:14 [ExecutorJobHandler.execute-57] ------------------DataX process id: 29802
2023-03-28 16:41:14 [AnalysisStatistics.analysisStatisticsLog-53]   File "/data/datax/bin/datax.py", line 114
2023-03-28 16:41:14 [AnalysisStatistics.analysisStatisticsLog-53]     print readerRef
2023-03-28 16:41:14 [AnalysisStatistics.analysisStatisticsLog-53]           ^
2023-03-28 16:41:14 [AnalysisStatistics.analysisStatisticsLog-53] SyntaxError: Missing parentheses in call to 'print'. Did you mean print(readerRef)?
2023-03-28 16:41:14 [JobThread.run-165] <br>----------- datax-web job execute end(finish) -----------<br>----------- ReturnT:ReturnT [code=500, msg=command exit value(1) is failed, content=null]
2023-03-28 16:41:14 [ProcessCallbackThread.callbackLog-186] <br>----------- datax-web job callback finish.
2023-03-28 16:41:14 [TriggerCallbackThread.callbackLog-186] <br>----------- datax-web job callback finish.
```

经过查询是本机装了多版本的python

```
[root@node3 bin]#  whereis python
python: /usr/bin/python /usr/bin/python2.7 /usr/bin/python3.6 /usr/bin/python3.6m /usr/lib/python2.7 /usr/lib/python3.6 /usr/lib64/python2.7 /usr/lib64/python3.6 /etc/python /usr/include/python2.7 /usr/include/python3.6m /root/anaconda3/bin/python /root/anaconda3/bin/python3.9 /root/anaconda3/bin/python3.9-config /usr/share/man/man1/python.1.gz

[root@node3 bin]# python -V
Python 3.9.13
[root@node3 bin]# /usr/bin/python -V
Python 2.7.5
```

经过修复使Python改为2.7再执行任务

```
[root@node3 ~]# python -V
Python 2.7.5
```

还有一种修复方式是

Python (2.x) (支持Python3需要修改替换datax/bin下面的三个python文件，替换文件在doc/datax-web/datax-python3下) 必选，主要用于调度执行底层DataX的启动脚本，默认的方式是以Java子进程方式执行DataX，用户可以选择以Python方式来做自定义的改造



## 5.查看任务

![image-20230329112816134](https://imgoss.xgss.net/picgo/image-20230329112816134.png?aliyun)

查看日志：

![image-20230329112858101](https://imgoss.xgss.net/picgo/image-20230329112858101.png?aliyun)

再用Navicat 查看目标库中数据是否一致。

![image-20230329113024046](https://imgoss.xgss.net/picgo/image-20230329113024046.png?aliyun)

# DataX-Web增量配置说明

## 一、根据日期进行增量数据抽取

### 1.页面任务配置

打开菜单任务管理页面，选择添加任务

按下图中5个步骤进行配置

![datax-webx13](https://imgoss.xgss.net/picgo/datax-webx13.jpg?aliyun)

- 1.任务类型选DataX任务
- 2.辅助参数选择时间自增
- 3.增量开始时间选择，即sql中查询时间的开始时间，用户使用此选项方便第一次的全量同步。第一次同步完成后，该时间被更新为上一次的任务触发时间，任务失败不更新。
- 4.增量时间字段,-DlastTime='%s' -DcurrentTime='%s' 先来解析下这段字符串

```
1.-D是DataX参数的标识符，必配
2.-D后面的lastTime和currentTime是DataX json中where条件的时间字段标识符，必须和json中的变量名称保持一致
3.='%s'是项目用来去替换时间的占位符，比配并且格式要完全一致
4.注意-DlastTime='%s'和-DcurrentTime='%s'中间有一个空格，空格必须保留并且是一个空格
```

- 5.时间格式，可以选择自己数据库中时间的格式，也可以通过json中配置sql时间转换函数来处理

注意，注意，注意: 配置一定要仔细看文档（后面我们也会对这块配置进行优化，避免大家犯错）

### 2.JSON配置

datax.json

```
{
  "job": {
    "setting": {
      "speed": {
        "channel": 16
      }
    },
    "content": [
      {
        "reader": {
          "name": "mysqlreader",
          "parameter": {
            "splitPk": "id",
            "username": "root",
            "password": "root",
            "column": [
              "*"

            ],
            "connection": [
              {
                
                "jdbcUrl": [
                  "jdbc:mysql://localhost:3306/test?characterEncoding=utf8"
                ],
				"querySql": [
        "select * from test_list where operationDate >= FROM_UNIXTIME(${lastTime}) and operationDate < FROM_UNIXTIME(${currentTime})"
                                ]
              }
            ]
          }
        },
        "writer": {
          "name": "mysqlwriter",
          "parameter": {
           
            "username": "root",
            "password": "123456",
            "column": [
              "*"
            ],
            "batchSize": "4096",
            "connection": [
              {
                "jdbcUrl": "jdbc:mysql://localhost:3307/test?characterEncoding=utf8",
                "table": [
                  "test_list"
                ]
              }
            ]
          }
        }
      }
    ]
  }
}
```

#### querySql解析

```
select * from test_list where operationDate >= ${lastTime} and operationDate < ${currentTime}
```

- 1.此处的关键点在${lastTime}，${currentTime}，${}是DataX动态参数的固定格式，lastTime，currentTime就是我们页面配置中 -DlastTime='%s' -DcurrentTime='%s'中的lastTime，currentTime，注意字段一定要一致。
- 2.如果任务配置页面，时间类型选择为时间戳但是数据库时间格式不是时间戳，例如是：2019-11-26 11:40:57 此时可以用FROM_UNIXTIME(${lastTime})进行转换。

```
select * from test_list where operationDate >= FROM_UNIXTIME(${lastTime}) and operationDate < FROM_UNIXTIME(${currentTime})
```



## 二、根据自增Id进行增量数据抽取

### 1.页面任务配置

打开菜单任务管理页面，选择添加任务

按下图中4个步骤进行配置

[![img](https://imgoss.xgss.net/picgo/68747470733a2f2f64617461782d7765622e6f73732d636e2d68616e677a686f752e616c6979756e63732e636f6d2f646f632f69642d696e6372656d656e742e6a7067.jpg?aliyun)](https://camo.githubusercontent.com/5d9383b190aca3c57630a1c48f59a6b64de12c9df1a4a8e1df07776f44787908/68747470733a2f2f64617461782d7765622e6f73732d636e2d68616e677a686f752e616c6979756e63732e636f6d2f646f632f69642d696e6372656d656e742e6a7067.jpg)



- 1.任务类型选DataX任务
- 2.辅助参数选择主键自增
- 3.增量主键开始ID选择，即sql中查询ID的开始ID，用户使用此选项方便第一次的全量同步。第一次同步完成后，该ID被更新为上一次的任务触发时最大的ID，任务失败不更新。
- 4.增量时间字段,-DstartId='%s' -DendId='%s' 先来解析下这段字符串

```
1.-D是DataX参数的标识符，必配
2.-D后面的startId和endId是DataX json中where条件的id字段标识符，必须和json中的变量名称保持一致，endId是任务在每次执行时获取当前表maxId，也是下一次任务的startId
3.='%s'是项目用来去替换时间的占位符，比配并且格式要完全一致
4.注意-DstartId='%s'和-DendId='%s' 中间有一个空格，空格必须保留并且是一个空格
5.reader数据源，选择任务同步的读数据源
6.配置reader数据源中需要同步数据的表名及该表的主键
```

注意，注意，注意: 一定要仔细看文档（后续会对这块配置进行优化，避免大家犯错）

### 2.JSON配置

datax.json

```
{
   "job": {
     "setting": {
       "speed": {
         "channel": 3,
         "byte": 1048576
       },
       "errorLimit": {
         "record": 0,
         "percentage": 0.02
       }
     },
     "content": [
       {
         "reader": {
           "name": "mysqlreader",
           "parameter": {
             "username": "yRjwDFuoPKlqya9h9H2Amg==",
             "password": "yRjwDFuoPKlqya9h9H2Amg==",
             "splitPk": "",
             "connection": [
               {
                 "querySql": [
                   "select * from job_log where id>= ${startId} and id< ${endId}"
                 ],
                 "jdbcUrl": [
                   "jdbc:mysql://localhost:3306/datax_web"
                 ]
               }
             ]
           }
         },
         "writer": {
           "name": "mysqlwriter",
           "parameter": {
             "username": "mCFD+p1IMsa0rHicbQohcA==",
             "password": "PhYxJmA/nuBJD1OxKTRzZH8sxuRddOv83hdqDOVR+i0=",
             "column": [
               "`id`",
               "`job_group`",
               "`job_id`",
               "`job_desc`",
               "`executor_address`",
               "`executor_handler`",
               "`executor_param`",
               "`executor_sharding_param`",
               "`executor_fail_retry_count`",
               "`trigger_time`",
               "`trigger_code`",
               "`trigger_msg`",
               "`handle_time`",
               "`handle_code`",
               "`handle_msg`",
               "`alarm_status`",
               "`process_id`",
               "`max_id`"
             ],
             "connection": [
               {
                 "table": [
                   "job_log"
                 ],
                 "jdbcUrl": "jdbc:mysql://47.98.125.243:3306/datax_web"
               }
             ]
           }
         }
       }
     ]
   }
 }
```

#### querySql解析

```
select * from job_log where id>= ${startId} and id< ${endId}
```

- 1.此处的关键点在${startId}，${endId}，${}是DataX动态参数的固定格式，startId，endId就是我们页面配置中 -DstartId='%s' -DendId='%s'中的startId，endId，注意字段一定要一致。

## 三、JVM启动参数配置

此选择为非必选，可以配置DataX启动时JVM的参数，具体配置不做详解。

```
JVM启动参数拼接结果为： -j "-Xms2G -Xmx2G"
```





# 参考

https://github.com/WeiYe-Jing/datax-web

https://github.com/WeiYe-Jing/datax-web/blob/master/doc/datax-web/increment-desc.md

