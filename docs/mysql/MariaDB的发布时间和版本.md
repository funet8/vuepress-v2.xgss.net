---
title: MariaDB的发布时间和版本
createTime: 2025/05/27 17:51:17
permalink: /article/3aja8yoo/
---
# MariaDB的发布时间和版本



## MariaDB的诞生

MariaDB数据库管理系统是MySQL的一个分支，主要由开源社区在维护，采用GPL授权许可。开发这个分支的原因之一是：甲骨文公司收购了MySQL后，有将MySQL闭源的潜在风险，因此社区采用分支的方式来避开这个风险。

2009 年 10 月 29 日：MariaDB 发布第一个版本，MariaDB 是 MySQL 关系数据库管理系统的一个复刻，由社区开发，有商业支持，旨在继续保持在 GNU GPL 下开源。MariaDB 的开发是由 MySQL 的一些原始开发者领导的，他们担心甲骨文公司收购 MySQL 后会有一些隐患。MariaDB 打算保持与 MySQL 的高度兼容性，确保具有库二进制奇偶校验的直接替换功能，以及与 MySQL API 和命令的精确匹配。MariaDB 自带了一个新的存储引擎 Aria，它可以替代 MyISAM，成为默认的事务和非事务引擎。

MariaDB 最初使用 XtraDB 作为默认存储引擎，并从 10.2 版本切换回 InnoDB；它的首席开发人员是米卡埃尔·维德纽斯，他是 MySQL AB 的创始人之一，也是 Monty Program AB 的创始人。2008 年 1 月 16 日，MySQL AB 宣布它已经同意被 Sun 微系统集团以大约 10 亿美元的价格收购。该项收购已于 2008 年 2 月 26 日完成。MariaDB 是以 Monty 的小女儿 Maria 命名的，就像 MySQL 是以他另一个女儿 My 命名的一样。

## MariaDB版本与MySQL的兼容性

就InnoDB而言，MariaDB 10.2、MariaDB 10.3和MariaDB 10.4是MySQL 5.7的有限替代。然而，在每一个新的MariaDB版本中，实现差异都在不断增加。
就InnoDB而言，MariaDB 10.0和MariaDB 10.1可以作为MySQL 5.6的有限替代，但是，在某些特性中存在一些实现差异。MariaDB 5.5是MySQL 5.5的替代版本。
MariaDB 5.1、MariaDB 5.2和MariaDB 5.3可以作为MySQL 5.1的完全替代。

![image-20221025112127566](https://imgoss.xgss.net/picgo/image-20221025112127566.png?aliyun)

MariaDB 直到 5.5 版本，均依照 MySQL 的版本；因此，使用 MariaDB5.5 的人会从 MySQL 5.5 中了解到 MariaDB 的所有功能。从 2012 年 11 月 12 日起发布的 10.0.0 版开始，MariaDB 不再依照 MySQL 的版号；





MariaDB 的 API 和协议兼容 MySQL，另外又添加了一些功能，以支持本地的非阻塞操作和进度报告。这意味着，所有使用 MySQL 的连接器、程序库和应用程序也将可以在 MariaDB 下工作，因此，从 2012 年起，许多厂商选择转向拥抱 MariaDB 的阵营。