# httpd无法启动，报错No space left on device

今天有一个项目nginx报504，查到有一台云服务器重启报错，怎么也提不起来。

systemctl status httpd.service报错：

```
[root@xiaoyouxi_fabu sites-available]# systemctl status httpd.service
● httpd.service - The Apache HTTP Server
   Loaded: loaded (/usr/lib/systemd/system/httpd.service; enabled; vendor preset: disabled)
   Active: failed (Result: exit-code) since Tue 2022-05-24 09:43:36 CST; 6s ago
     Docs: man:httpd(8)
           man:apachectl(8)
  Process: 19414 ExecStop=/bin/kill -WINCH ${MAINPID} (code=exited, status=1/FAILURE)
  Process: 27564 ExecReload=/usr/sbin/httpd $OPTIONS -k graceful (code=exited, status=0/SUCCESS)
  Process: 19412 ExecStart=/usr/sbin/httpd $OPTIONS -DFOREGROUND (code=exited, status=1/FAILURE)
 Main PID: 19412 (code=exited, status=1/FAILURE)

May 24 09:43:36 xiaoyouxi_fabu systemd[1]: Starting The Apache HTTP Server...
May 24 09:43:36 xiaoyouxi_fabu systemd[1]: httpd.service: main process exited, code=exited, status=1/FAILURE
May 24 09:43:36 xiaoyouxi_fabu kill[19414]: kill: cannot find process ""
May 24 09:43:36 xiaoyouxi_fabu systemd[1]: httpd.service: control process exited, code=exited status=1
May 24 09:43:36 xiaoyouxi_fabu systemd[1]: Failed to start The Apache HTTP Server.
May 24 09:43:36 xiaoyouxi_fabu systemd[1]: Unit httpd.service entered failed state.
May 24 09:43:36 xiaoyouxi_fabu systemd[1]: httpd.service failed.
```



## 查看httpd日志完整报错

No space left on device: AH00023: Couldn't create the proxy mutex

```
# cat /var/log/httpd/error_log
[Tue May 24 09:55:24.147244 2022] [suexec:notice] [pid 20795] AH01232: suEXEC mechanism enabled (wrapper: /usr/sbin/suexec)
[Tue May 24 09:55:24.147323 2022] [core:emerg] [pid 20795] (28)No space left on device: AH00023: Couldn't create the proxy mutex 
[Tue May 24 09:55:24.147337 2022] [proxy:crit] [pid 20795] (28)No space left on device: AH02478: failed to create proxy mutex
AH00016: Configuration Failed
```



# 解决办法



```
查看是空间不足
解决办法：
输入查看 ipcs -s
清理 ipcs -s | perl -ane '/^0x00000000/ && `ipcrm -s $F[1]`'
再次启动

硬盘空间是足够的
# df -h
Filesystem                                                                     Size  Used Avail Use% Mounted on
devtmpfs                                                                       909M     0  909M   0% /dev
tmpfs                                                                          919M     0  919M   0% /dev/shm
tmpfs                                                                          919M  1.1M  918M   1% /run
tmpfs                                                                          919M     0  919M   0% /sys/fs/cgroup
/dev/vda1                                                                       40G  7.2G   31G  20% /
/dev/vdb1                                                                       99G   19G   75G  21% /home

# ipcs -s
------ Semaphore Arrays --------
key        semid      owner      perms      nsems     
0x00000000 176619520  www        600        1         
0x00000000 176652289  www        600        1         
0x00000000 176685058  www        600        1         
0x00000000 176717827  www        600        1         
0x00000000 176750596  www        600        1         
0x00000000 5210117    zabbix     600        14        
0x00000000 457375750  www        600        1         
0x00000000 457408519  www        600        1         
0x00000000 457441288  www        600        1         
0x00000000 457474057  www        600        1         
0x00000000 457506826  www        600        1         
0x00000000 465043467  www        600        1         
0x00000000 465076236  www        600        1         
0x00000000 465109005  www        600        1         
0x00000000 465141774  www        600        1         
0x00000000 465174543  www        600        1         
0x00000000 474054672  www        600        1         
0x00000000 474087441  www        600        1         
0x00000000 474120210  www        600        1         
0x00000000 474152979  www        600        1         
0x00000000 474185748  www        600        1         
0x00000000 476774421  www        600        1         
0x00000000 476807190  www        600        1         
0x00000000 476839959  www        600        1         
0x00000000 476872728  www        600        1         
0x00000000 476905497  www        600        1         
0x00000000 480411674  www        600        1         
0x00000000 480444443  www        600        1         
0x00000000 480477212  www        600        1         
0x00000000 480509981  www        600        1         
0x00000000 480542750  www        600        1         
0x00000000 478773279  zabbix     600        14        
0x00000000 495157280  www        600        1         
0x00000000 495190049  www        600        1         
0x00000000 495222818  www        600        1         
0x00000000 495255587  www        600        1         
0x00000000 495288356  www        600        1         
0x00000000 498335781  www        600        1         
0x00000000 498368550  www        600        1         
0x00000000 498401319  www        600        1         
0x00000000 498434088  www        600        1         
0x00000000 498466857  www        600        1         
0x00000000 502497322  www        600        1         
0x00000000 502530091  www        600        1         
0x00000000 502562860  www        600        1         
0x00000000 502595629  www        600        1         
0x00000000 502628398  www        600        1         
0x00000000 504234031  www        600        1         
0x00000000 504266800  www        600        1         
0x00000000 504299569  www        600        1         
0x00000000 504332338  www        600        1         
0x00000000 504365107  www        600        1         
0x00000000 513310772  www        600        1         
0x00000000 513343541  www        600        1         
0x00000000 513376310  www        600        1         
0x00000000 513409079  www        600        1         
0x00000000 513441848  www        600        1         
0x00000000 516718649  www        600        1         
0x00000000 516751418  www        600        1         
0x00000000 516784187  www        600        1         
0x00000000 516816956  www        600        1         
0x00000000 516849725  www        600        1         
0x00000000 523206718  www        600        1         
0x00000000 523239487  www        600        1         
0x00000000 523272256  www        600        1         
0x00000000 523305025  www        600        1         
0x00000000 523337794  www        600        1         
0x00000000 523927619  www        600        1         
0x00000000 523960388  www        600        1         
0x00000000 523993157  www        600        1         
0x00000000 524025926  www        600        1         
0x00000000 524058695  www        600        1         
0x00000000 524484680  www        600        1         
0x00000000 524517449  www        600        1         
0x00000000 524550218  www        600        1         
0x00000000 524582987  www        600        1         
0x00000000 524615756  www        600        1         
0x00000000 525041741  www        600        1         
0x00000000 525074510  www        600        1         
0x00000000 525107279  www        600        1         
0x00000000 525140048  www        600        1         
0x00000000 525172817  www        600        1         
0x00000000 525434962  www        600        1         
0x00000000 525467731  www        600        1         
0x00000000 525500500  www        600        1         
0x00000000 525533269  www        600        1         
0x00000000 525566038  www        600        1         
0x00000000 525992023  www        600        1         
0x00000000 526024792  www        600        1         
0x00000000 526057561  www        600        1         
0x00000000 526090330  www        600        1         
0x00000000 526123099  www        600        1         
0x00000000 526614620  www        600        1         
0x00000000 526647389  www        600        1         
0x00000000 526680158  www        600        1         
0x00000000 526712927  www        600        1         
0x00000000 526745696  www        600        1         
0x00000000 528023649  www        600        1         
0x00000000 528056418  www        600        1         
0x00000000 528089187  www        600        1         
0x00000000 528121956  www        600        1         
0x00000000 528154725  www        600        1         
0x00000000 528416870  www        600        1         
0x00000000 528449639  www        600        1         
0x00000000 528482408  www        600        1         
0x00000000 528515177  www        600        1         
0x00000000 528547946  www        600        1         
0x00000000 528810091  www        600        1         
0x00000000 528842860  www        600        1         
0x00000000 528875629  www        600        1         
0x00000000 528908398  www        600        1         
0x00000000 528941167  www        600        1         
0x00000000 529924208  www        600        1         
0x00000000 529956977  www        600        1         
0x00000000 529989746  www        600        1         
0x00000000 530022515  www        600        1         
0x00000000 530055284  www        600        1         
0x00000000 530874485  www        600        1         
0x00000000 530907254  www        600        1         
0x00000000 530940023  www        600        1         
0x00000000 530972792  www        600        1         
0x00000000 531005561  www        600        1         
0x00000000 531988602  www        600        1         
0x00000000 532021371  www        600        1         
0x00000000 532054140  www        600        1         
0x00000000 532086909  www        600        1         
0x00000000 532119678  www        600        1  


# ipcs -s | perl -ane '/^0x00000000/ && `ipcrm -s $F[1]`'
# ipcs -s
------ Semaphore Arrays --------
key        semid      owner      perms      nsems   

```



再次重启nginx和httpd恢复正常：

```
# ipcs -s

------ Semaphore Arrays --------
key        semid      owner      perms      nsems     
0x00000000 532840448  www        600        1         
0x00000000 532873217  www        600        1         
0x00000000 532905986  www        600        1         
0x00000000 532938755  www        600        1         
0x00000000 532971524  www        600        1   
```

