---
title: redis-Redis中的数据结构
createTime: 2025/05/27 17:51:17
permalink: /article/oxdiiwg0/
---
# 【Redis必备的基础知识】-Redis中的数据结构

# 前言

Redis作为一款高性能的键值对数据库，其丰富的数据结构是其灵活性的关键。本文将介绍Redis中的五种基本数据结构，并结合实际应用场景，帮助您更好地掌握Redis。

![](https://imgoss.xgss.net/picgo/image-20241225163049638.png?aliyun)



Redis提供了五种主要的数据类型，它提供了强大且实用的功能，然而实际开发中，有大多数的开发者仅仅只会使用简单的 Redis String的 Get和Set

- String - 字符串
- Hash - 哈希
- List - 列表
- Set -  集合
- Sort Set - 有序集合
- 其它数据结构

# 字符串-String

**最简单的类型**：存储各种格式的数据，如数字、字符串等。

字符串类型是Redis最基础的数据结构，其他几种数据结构都是在字符串类型基础上构建的。字符串类型的值是字符串（简单的字符串、复杂的字符串（例如JSON、XML））、数字（整数、浮点数），甚至是二进制（图片、音频、视频）等。

![image-20200626095844113](https://imgoss.xgss.net/picgo/image-20200626095844113.png?aliyun)

字符串对象的内部编码有3种 ：**int**、**raw** 和 **embstr**，Redis会根据当前值的类型和长度来决定使用哪种编码来实现

- int：如果一个字符串对象保存的是整数值,并且这个整数值可以用`long`类型来表示
- raw：如果字符串对象保存的是一个字符串值,并且这个字符串值的长度大于32字节
- embstr：如果字符串对象保存的是一个字符串值,并且这个字符申值的长度小于等于32字节

## 字符串-应用场景

Reids字符串的使用场景是最为广泛的，甚至有些对redis其它几种对象不太熟悉的人，基本所有场景都会使用字符串(序列化一下直接扔进去),这让本身很单纯的字符串承受了它这个年纪本不该承受的重量。其实Redis的主要使用场景主要有以下几种:

- 作为缓存层,缓存热点数据
- 计数器：实现网站访问量统计、点赞数、限速器、自增ID生成等。
- 分布式系统的Session共享
- 二进制数据的存储
- 简单队列：使用LPUSH和RPOP命令实现简单的消息队列。

- 缓存：缓存用户信息、商品信息等。

# 哈希-Hash

哈希对象用来存储一组数据对。每个数据对又包含键值两部分

![image-20200626101327742](https://imgoss.xgss.net/picgo/image-20200626101327742.png?aliyun)

Hash对象也有两种实现方式：ziplist（压缩列表）和 hashtable（哈希表）

同样，只有当存储的数据量比较小的情况下，Redis才使用压缩列表来实现哈希对象，具体需要满足两个条件

- 字典中保存的键和值的大小都要小于64字节
- 字典中键值对的个数要小于512个

当不能同时满足上面的两个条件时，Redis就使用哈希表来实现Hash对象

当存储的内容是对象的时候，Redis字符串对象很多功能使用Redis 哈希对象也可以实现，如缓存用户信息的时候，使用Redis哈希对象存储，简单直观，如果使用合理可以减少内存空间的使用。

但是也有其缺点，就是要控制哈希在ziplist和hashtable两种内部编码的转换，hashtable将会消耗更多的内存。

## 哈希-应用场景

- 存储用户信息：将一个用户的所有信息存储在一个哈希中。
- 缓存对象：将一个复杂对象序列化为哈希存储。

# 列表-List

列表这种对象支持存储一组有序的，不重复的数据。因为其有序性，它可以获取指定范围的元素列表，可以在O(1)的时间复杂度获取指定索引的下标的元素等。

![image-20200626105857594](https://imgoss.xgss.net/picgo/image-20200626105857594.png?aliyun)

在Redis3.2版本以前列表类型的内部编码有两种。当满足下面两个条件的时候，Redis 列表对象使用ziplist（压缩列表）来实现。

- 当列表的元素个数小于list-max-ziplist-entries配置（默认512个）
- 当列表中每个元素的值都小于list-max-ziplist-value配置时（默认64字节）

当列表类型无法满足ziplist条件时，Redis会使用linkedList作为列表的内部实现。

而在Redis3.2版本开始怼列表数据结构进行改造，使用quickList代替了zipList和linkedList。

由于列表对象的有序且不可重复的特性，它比较适合用来做文章、商品等列表的存储。

列表类型可以lpush（左侧push），同时又可以使用rpop（右侧弹出）第一个元素，所以列表类型具有先进先出的特性，可以用来实现消息队列，也可以lpush（左侧push）和lpop（左侧弹出），具有后进先出的特性，因此开发中需要使用栈的时候，我们可以使用列表对象来实现。

## 列表-应用场景

- 消息队列：实现生产者消费者模型。
- 微博评论列表：按照时间顺序存储评论。

# 集合-Set

集合对象是一个无序且唯一的键值集合。它的存储顺序不会按照插入的先后顺序进行存储，与列表不同的是它存储的数据是无序且不重复的。

![image-20200626122033221](https://imgoss.xgss.net/picgo/image-20200626122033221.png?aliyun)

集合对象的内部编码也有两种，intest（整数集合）与hashtable（哈希表），当满足下面两个条件的时候，集合对象使用intset来实现

- 集合中的元素都是整数
- 集合中元素的个数小于 set-maxintset-entries配置（默认512个）

不满足上面两个条件时，集合对象使用hashtable来实现

集合对象的主要两个特性就是：**无序**，**不可重复**，**支持并交差**，因此可以用来做标签系统

而集合中的 SPOP(随机移除并返回集合中一个或多个元素) 和 SRANDMEMBER(随机返回集合中一个或多个元素) 命令可以帮助我们实现一个抽奖系统

## 集合-应用场景

- 标签系统：存储用户标签。
- 共同好友：存储两个用户共同的好友。

# 有序集合-Sort Set

有序集合类型 (Sorted Set或ZSet) 相比于集合类型多了一个排序属性 score（分值），对于有序集合 ZSet 来说，每个存储元素相当于有两个值组成的，一个是有序结合的元素值，一个是排序值。有序集合保留了集合不能有重复成员的特性(分值可以重复)，但不同的是，有序集合中的元素可以排序。

![image-20200626123309037](https://imgoss.xgss.net/picgo/image-20200626123309037.png?aliyun)

有序集合是由 ziplist (压缩列表) 或 skiplist (跳跃表) 组成的。

当数据比较少时，有序集合使用的是 ziplist 存储的，有序集合使用 ziplist 格式存储必须满足以下两个条件：

- 有序集合保存的元素个数要小于 128 个；
- 有序集合保存的所有元素成员的长度都必须小于 64 字节。

如果不能满足以上两个条件中的任意一个，有序集合将会使用 skiplist 结构进行存储。

有序集合比较典型的使用场景就是排行榜系统例如学生成绩的排名。某视频(博客等)网站的用户点赞、播放排名、电商系统中商品的销量排名等。



# 其它数据结构

Bitmaps：以bit为单位存储数据，高效地操作位数组。

位图是一种通过操作二进制位来进行数据存储和操作的数据结构。位图可以高效地存储大量的布尔值，并支持对这些布尔值进行快速的设置、获取和统计等操作。常见的应用场景包括用户签到状态、在线状态等。



HyperLogLog：用于估算基数，即集合中不重复元素的数量。

HyperLogLog是一种用于基数估计的算法，它可以在不知道数据集完整大小的情况下，对数据集的基数进行高效的估算。HyperLogLog通过牺牲一定的精度来换取存储空间的节省和计算效率的提高。常见的应用场景包括用户访问量统计、网站UV统计等。



Geo：存储地理位置信息，支持范围查询、距离计算等。

地理位置是用于存储和操作地理位置信息的一种数据结构。Redis的地理位置类型支持对地理位置进行添加、查询、计算距离等操作。常见的应用场景包括附近的人、地点推荐等。



Stream：用于构建消息流，支持持久化、消费者组等特性。



# 小结

Redis的数据结构非常丰富，每种数据结构都有其独特的应用场景。合理选择数据结构可以大大提高应用程序的性能和开发效率。