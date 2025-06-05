# docker的四种网络方式

当你安装好Docker之后， 它会自动的创建三个网络，你可以使用`docker network ls`命令列举这些3个网络：
```
# docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
da8562d4b4d7        bridge              bridge              local
03eca5036e34        host                host                local
47209d68990e        none                null                local
```

##  1.bridge方式(默认)
```
创建容器：（由于是默认设置，这里没指定网络--net="bridge"。另外可以看到容器内创建了eth0)
```
## 2.none方式
指定方法： --net="none"
可以看到，这样创建出来的容器完全没有网络：
```
docker run -i -t --net="none" mysql:latest /bin/bash
```
那这种方式，有什么用途呢？
实际上nova-docker用的就是这种方式，这种方式将网络创建的责任完全交给用户。
可以实现更加灵活复杂的网络。
另外这种容器可以可以通过link容器实现通信。

##  3.host方式
指定方法：--net="host"
这种创建出来的容器，可以看到host上所有的网络设备。
容器中，对这些设备（比如DUBS）有全部的访问权限。因此docker提示我们，这种方式是不安全的。
如果在隔离良好的环境中（比如租户的虚拟机中）使用这种方式，问题不大。


##  4.container复用方式

指定方法： --net="container:name or id"
如下例子可以看出来，两者的网络完全相同。
```
docker run -i -t mysql:latest /bin/bash

docker run -i -t --net="container:02aac28b9234" mysql:latest /bin/bash
```
### 举例（openstack nova-docker中的网络实现方式）
openstack的nova-docker插件可以向管理虚拟机一样管理容器。
容器网络的创建方式：首先创建--net="none"的容器，然后使用如下过程配置容器网络。（以OVS为例，也可以使用linux bridge）



参考：
http://blog.csdn.net/halcyonbaby/article/details/42112141
https://yq.aliyun.com/articles/30345?spm=a2c4e.11154837.613419.9.14394258Qv2sNy


















