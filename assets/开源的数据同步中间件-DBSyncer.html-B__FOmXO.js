import{_ as n,c as a,b as e,o as i}from"./app-BEL8OELx.js";const l={};function p(c,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="开源的数据同步中间件-dbsyncer" tabindex="-1"><a class="header-anchor" href="#开源的数据同步中间件-dbsyncer"><span>开源的数据同步中间件-DBSyncer</span></a></h1><h1 id="项目介绍" tabindex="-1"><a class="header-anchor" href="#项目介绍"><span>项目介绍</span></a></h1><p>DBSyncer是一款开源的数据同步中间件，提供Mysql、Oracle、SqlServer、Elasticsearch(ES)、Kafka、SQL(Mysql/Oracle/SqlServer)等同步场景。支持上传插件自定义同步转换业务，提供监控全量和增量数据统计图、应用性能预警等。</p><p>开源地址：https://gitee.com/ghi/dbsyncer</p><ul><li><p>组合驱动，自定义库同步到库组合，关系型数据库与非关系型之间组合，任意搭配表同步映射关系</p></li><li><p>实时监控，驱动全量或增量实时同步运行状态、结果、同步日志和系统日志</p></li><li><p>开发插件，自定义转化同步逻辑</p><p><img src="https://imgoss.xgss.net/picgo/开源的数据同步中间件-DBSyncer.jpg?aliyun" alt="开源的数据同步中间件-DBSyncer"></p></li></ul><h1 id="安装部署" tabindex="-1"><a class="header-anchor" href="#安装部署"><span>安装部署</span></a></h1><h2 id="系统介绍" tabindex="-1"><a class="header-anchor" href="#系统介绍"><span>系统介绍</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">centos7</span>
<span class="line"></span>
<span class="line">ip:192.168.1.8</span>
<span class="line"></span>
<span class="line">需要部署安装JDK和Maven</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装jdk-1-8" tabindex="-1"><a class="header-anchor" href="#安装jdk-1-8"><span>安装JDK 1.8</span></a></h2><p>如果安装了可以忽略</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># mkdir /data/software/</span>
<span class="line"># cd /data/software/</span>
<span class="line"># wget http://js.funet8.com/centos_software/jdk-8u211-linux-x64.tar.gz</span>
<span class="line"># mkdir /usr/local/java/</span>
<span class="line"># tar -zxvf jdk-8u211-linux-x64.tar.gz -C /usr/local/java/</span>
<span class="line"></span>
<span class="line"># echo &#39;</span>
<span class="line">export JAVA_HOME=/usr/local/java/jdk1.8.0_211</span>
<span class="line">export JRE_HOME=\${JAVA_HOME}/jre</span>
<span class="line">export CLASSPATH=.:\${JAVA_HOME}/lib:\${JRE_HOME}/lib</span>
<span class="line">export PATH=\${JAVA_HOME}/bin:$PATH</span>
<span class="line">&#39;&gt;&gt; /etc/profile</span>
<span class="line"></span>
<span class="line"># source /etc/profile</span>
<span class="line"></span>
<span class="line"># ln -s /usr/local/java/jdk1.8.0_211/bin/java /usr/bin/java</span>
<span class="line"></span>
<span class="line"># java -version</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装maven" tabindex="-1"><a class="header-anchor" href="#安装maven"><span>安装maven</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># mkdir /data/maven</span>
<span class="line"># cd /data/maven</span>
<span class="line"># wget http://mirrors.cnnic.cn/apache/maven/maven-3/3.5.4/binaries/apache-maven-3.5.4-bin.tar.gz</span>
<span class="line">备用下载地址：</span>
<span class="line"># wget http://js.funet8.com/centos_software/apache-maven-3.5.4-bin.tar.gz</span>
<span class="line"># tar -zxvf apache-maven-3.5.4-bin.tar.gz</span>
<span class="line"></span>
<span class="line">配置maven：  </span>
<span class="line"># vim /etc/profile</span>
<span class="line">在配置文件配置中加上：</span>
<span class="line"></span>
<span class="line">export MAVEN_HOME=/data/maven/apache-maven-3.5.4</span>
<span class="line">export PATH=$MAVEN_HOME/bin:$PATH</span>
<span class="line"></span>
<span class="line">使配置立即生效</span>
<span class="line"># source  /etc/profile</span>
<span class="line"></span>
<span class="line"># mvn --version</span>
<span class="line">Apache Maven 3.5.4</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="下载安装包" tabindex="-1"><a class="header-anchor" href="#下载安装包"><span>下载安装包</span></a></h2><p>https://gitee.com/ghi/dbsyncer/releases ，这里我下载v1.1.7-Beta版本</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># cd /data/wwwroot/web/</span>
<span class="line"># wget http://js.funet8.com/centos_software/dbsyncer-v1.1.7-Beta.tar.gz</span>
<span class="line">解压</span>
<span class="line"># tar -zxvf dbsyncer-v1.1.7-Beta.tar.gz </span>
<span class="line"># cd dbsyncer-v1.1.7-Beta</span>
<span class="line">编译包</span>
<span class="line"># sh build.sh </span>
<span class="line">...</span>
<span class="line">[INFO] BUILD SUCCESS</span>
<span class="line">[INFO] ------------------------------------------------------------------------</span>
<span class="line">[INFO] Total time: 03:17 min</span>
<span class="line">[INFO] Finished at: 2022-04-28T16:40:21+08:00</span>
<span class="line">[INFO] ------------------------------------------------------------------------</span>
<span class="line">‘/data/wwwroot/web/dbsyncer-v1.1.7-Beta/dbsyncer-web/target/dbsyncer-1.1.7-Beta.zip’ -&gt; ‘/data/wwwroot/web/dbsyncer-v1.1.7-Beta/dbsyncer-1.1.7-Beta.zip’</span>
<span class="line"></span>
<span class="line"># unzip dbsyncer-1.1.7-Beta.zip </span>
<span class="line"># cd dbsyncer-1.1.7-Beta </span>
<span class="line"># ./bin/startup.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看端口</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># netstat -tunpl|grep 18686</span>
<span class="line">tcp6       0      0 :::18686                :::*                    LISTEN      5754/java     </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>开放端口(非必要)</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">iptables -A INPUT -p tcp --dport 18686 -j ACCEPT</span>
<span class="line">service iptables save</span>
<span class="line">systemctl restart iptables.service</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="打开浏览器访问" tabindex="-1"><a class="header-anchor" href="#打开浏览器访问"><span>打开浏览器访问</span></a></h3><p>http://IP:18686</p><p>http://192.168.1.8:18686/</p><h3 id="账号和密码" tabindex="-1"><a class="header-anchor" href="#账号和密码"><span>账号和密码</span></a></h3><p>admin/admin</p><p><img src="https://imgoss.xgss.net/picgo/image-20220428165146386.png?aliyun" alt="image-20220428165146386"></p><h1 id="同步mysql数据库" tabindex="-1"><a class="header-anchor" href="#同步mysql数据库"><span>同步MySQL数据库</span></a></h1><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">192.168.1.6:3306 同步到---&gt; 192.168.1.8:61921</span>
<span class="line"></span>
<span class="line">192.168.1.6:61922</span>
<span class="line">root</span>
<span class="line">123456</span>
<span class="line"></span>
<span class="line">192.168.1.8:61921</span>
<span class="line">root</span>
<span class="line">123456</span>
<span class="line">同步数据库 dzzoffice</span>
<span class="line"></span>
<span class="line">mysql -u root -h 192.168.1.6 -P61922 -p&#39;123456&#39;</span>
<span class="line">mysql -u root -h 192.168.1.8 -P61921 -p&#39;123456&#39;</span>
<span class="line">查看binlog日志</span>
<span class="line">&gt; show binary logs;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>目标库的server_id不能为1</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">mysqladmin -u root -h 192.168.1.8 -p123456 -P61921 shutdown</span>
<span class="line">修改mysql的配置文件</span>
<span class="line">server_id=1 改为 server_id=100</span>
<span class="line">再次启动</span>
<span class="line">/usr/bin/mysqld_safe --defaults-file=/data/mysql/etc/61921.cnf &amp;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="添加连接" tabindex="-1"><a class="header-anchor" href="#添加连接"><span>添加连接</span></a></h2><p>进入后台点击 “添加连接”</p><p><img src="https://imgoss.xgss.net/picgo/image-20220428181006187.png?aliyun" alt="image-20220428181006187"></p><p><img src="https://imgoss.xgss.net/picgo/image-20220428181020667.png?aliyun" alt="image-20220428181020667"></p><p>添加驱动</p><p><img src="https://imgoss.xgss.net/picgo/image-20220428181251742.png?aliyun" alt="image-20220428181251742"></p><p>启动</p><p><img src="https://imgoss.xgss.net/picgo/image-20220428181231313.png?aliyun" alt="image-20220428181231313"></p><p><img src="https://imgoss.xgss.net/picgo/image-20220428181337970.png?aliyun" alt="image-20220428181337970"></p><p>优点： 开源系统，使用上类似于阿里云的DTS，如果作为数据同步使用还可以，作为生产环境就需要多测试了</p><p>主要用于A库的某数据库同步到B库</p><h2 id="增量同步配置-源库" tabindex="-1"><a class="header-anchor" href="#增量同步配置-源库"><span>增量同步配置（源库）</span></a></h2><p>Mysql</p><ul><li>Dump Binlog二进制日志。Master同步Slave, 创建IO线程读取数据，写入relaylog，基于消息订阅捕获增量数据。</li><li>配置</li></ul><p>修改my.ini文件</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">#服务唯一ID</span>
<span class="line">server_id=1</span>
<span class="line">log-bin=mysql_bin</span>
<span class="line">binlog-format=ROW</span>
<span class="line">max_binlog_cache_size = 256M</span>
<span class="line">max_binlog_size = 512M</span>
<span class="line">expire_logs_days = 7</span>
<span class="line">#监听同步的库, 多个库使用英文逗号“,”拼接</span>
<span class="line">replicate-do-db=test</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="oracle" tabindex="-1"><a class="header-anchor" href="#oracle"><span><strong>Oracle</strong></span></a></h2><ul><li>CDN注册订阅。监听增删改事件，得到rowid，根据rowid执行SQL查询，得到变化数据。</li><li>授予账号监听权限, 同时要求目标源表必须定义一个长度为18的varchar字段，通过接收rowid值实现增删改操作。</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">grant change notification to 你的账号</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h1 id="定时" tabindex="-1"><a class="header-anchor" href="#定时"><span>定时</span></a></h1><p><img src="https://imgoss.xgss.net/picgo/5eb194cd687f4b669d44cba753f4c30d.png?aliyun" alt="DBSyncer 一款开源的数据同步中间件"></p><p>假设源表数据格式</p><p><img src="https://imgoss.xgss.net/picgo/a957bb7f7fcb4fb8847e635bf20ea31d.png?aliyun" alt="DBSyncer 一款开源的数据同步中间件"></p><h1 id="预览" tabindex="-1"><a class="header-anchor" href="#预览"><span>预览</span></a></h1><p><img src="https://imgoss.xgss.net/picgo/aab4da41d1154f3e96bb406c04454693.png?aliyun" alt="DBSyncer 一款开源的数据同步中间件"></p><p>驱动管理</p><p><img src="https://imgoss.xgss.net/picgo/6422d911c563406495b6c64ceb1b4072.png?aliyun" alt="DBSyncer 一款开源的数据同步中间件"></p><h2 id="驱动详情" tabindex="-1"><a class="header-anchor" href="#驱动详情"><span>驱动详情</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/29520029fb8b46c080f2926cd86ffe1c.png?aliyun" alt="DBSyncer 一款开源的数据同步中间件"></p><h2 id="驱动表字段关系配置" tabindex="-1"><a class="header-anchor" href="#驱动表字段关系配置"><span>驱动表字段关系配置</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/3180974b153f4727bd0bbda41f64086f.png?aliyun" alt="DBSyncer 一款开源的数据同步中间件"></p><h2 id="监控" tabindex="-1"><a class="header-anchor" href="#监控"><span>监控</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/000645_35a544b3_376718.png?aliyun" alt="img"></p><h2 id="上传插件" tabindex="-1"><a class="header-anchor" href="#上传插件"><span>上传插件</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/232643_9b1f3f64_376718.png?aliyun" alt="img"></p>`,65)]))}const r=n(l,[["render",p]]),t=JSON.parse('{"path":"/kaiyuan/Open-databases/%E5%BC%80%E6%BA%90%E7%9A%84%E6%95%B0%E6%8D%AE%E5%90%8C%E6%AD%A5%E4%B8%AD%E9%97%B4%E4%BB%B6-DBSyncer.html","title":"开源的数据同步中间件-DBSyncer","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"kaiyuan/Open-databases/开源的数据同步中间件-DBSyncer.md"}');export{r as comp,t as data};
