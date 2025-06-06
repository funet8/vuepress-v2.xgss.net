import{_ as a,c as n,b as e,o as l}from"./app-BEL8OELx.js";const i={};function p(t,s){return l(),n("div",null,s[0]||(s[0]=[e(`<h1 id="apollo的部署和动态配置基础使用" tabindex="-1"><a class="header-anchor" href="#apollo的部署和动态配置基础使用"><span>Apollo的部署和动态配置基础使用</span></a></h1><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介"><span>简介</span></a></h2><p>Apollo（阿波罗）是携程框架部门研发的分布式配置中心，能够集中化管理应用不同环境、不同集群的配置，以及能实现灰度发布等实现，配置修改后能够动态推送到应用端，并且具备规范的权限、流程治理等特性，适用于微服务配置管理场景。</p><h2 id="服务器环境" tabindex="-1"><a class="header-anchor" href="#服务器环境"><span>服务器环境</span></a></h2><h3 id="测试系统介绍" tabindex="-1"><a class="header-anchor" href="#测试系统介绍"><span>测试系统介绍</span></a></h3><table><thead><tr><th>系统</th><th>Centos7</th></tr></thead><tbody><tr><td>java环境</td><td>java1.8</td></tr><tr><td>数据库</td><td>MariaDB-10.2.9</td></tr><tr><td>IP</td><td>192.168.1.3</td></tr></tbody></table><h3 id="安装java" tabindex="-1"><a class="header-anchor" href="#安装java"><span>安装java</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line">mkdir /data/software/</span>
<span class="line">cd /data/software/</span>
<span class="line">wget http://js.funet8.com/centos_software/jdk-8u211-linux-x64.tar.gz</span>
<span class="line">mkdir /usr/local/java/</span>
<span class="line">tar -zxvf jdk-8u211-linux-x64.tar.gz -C /usr/local/java/</span>
<span class="line"></span>
<span class="line">echo &#39;</span>
<span class="line">export JAVA_HOME=/usr/local/java/jdk1.8.0_211</span>
<span class="line">export JRE_HOME=\${JAVA_HOME}/jre</span>
<span class="line">export CLASSPATH=.:\${JAVA_HOME}/lib:\${JRE_HOME}/lib</span>
<span class="line">export PATH=\${JAVA_HOME}/bin:$PATH</span>
<span class="line">&#39;&gt;&gt; /etc/profile</span>
<span class="line">source /etc/profile</span>
<span class="line"></span>
<span class="line">ln -s /usr/local/java/jdk1.8.0_211/bin/java /usr/bin/java</span>
<span class="line"></span>
<span class="line">java -version</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="下载apollo程序文件" tabindex="-1"><a class="header-anchor" href="#下载apollo程序文件"><span>下载apollo程序文件</span></a></h2><p>从github上下载相关配置文件，下载的是<a href="https://github.com/apolloconfig/apollo/releases/tag/v1.9.2" target="_blank" rel="noopener noreferrer">apollo1.9.2</a>的，大家可以根据下载地址自行选择：<a href="https://github.com/apolloconfig/apollo/releases" target="_blank" rel="noopener noreferrer">apollo版本下载地址</a></p><h2 id="下载apollo数据库" tabindex="-1"><a class="header-anchor" href="#下载apollo数据库"><span>下载apollo数据库</span></a></h2><p>在apollo上下载相关sql文件，并在数据库中执行。 <a href="https://github.com/apolloconfig/apollo/tree/master/scripts/sql" target="_blank" rel="noopener noreferrer">sql下载地址</a>（建议数据库版本mysql 5.7以上，如果以下会有一些语法和规范需要修改）</p><p>从github汇总下载：</p><p><img src="https://imgoss.xgss.net/picgo/image-20220413113929012.png?aliyun" alt="image-20220413113929012"></p><h2 id="安装配置并启动" tabindex="-1"><a class="header-anchor" href="#安装配置并启动"><span>安装配置并启动</span></a></h2><p>本地的虚拟机中安装配置的，大家也可以购买远程服务器安装。</p><p>上传服务器：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">drwxr-xr-x 4 root root 149 Apr 13 11:50 apollo-adminservice-1.9.2-github</span>
<span class="line">drwxr-xr-x 4 root root 152 Apr 13 11:51 apollo-configservice-1.9.2-github</span>
<span class="line">drwxr-xr-x 4 root root 131 Apr 13 11:51 apollo-portal-1.9.2-github</span>
<span class="line">drwxr-xr-x 2 root root  58 Apr 13 11:49 mysql</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="导入数据库" tabindex="-1"><a class="header-anchor" href="#导入数据库"><span>导入数据库</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># mysql -u root -h192.168.1.10 -P 61920 -p123456</span>
<span class="line"># 导入数据 ApolloPortalDB</span>
<span class="line">&gt; source /root/apolloportaldb.sql</span>
<span class="line"></span>
<span class="line"># 导入 ApolloConfigDB</span>
<span class="line">&gt; source /root/apolloconfigdb.sql</span>
<span class="line"></span>
<span class="line">ERROR 1231 (42000) at line 424 in file: &#39;/root/apolloconfigdb.sql&#39;: Variable &#39;character_set_client&#39; can&#39;t be set to the value of &#39;NULL&#39;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改配置文件" tabindex="-1"><a class="header-anchor" href="#修改配置文件"><span>修改配置文件</span></a></h2><p>修改这三个服务中的application-github.properties文件。 在adminService和configService服务中将数据库配置连接到，执行apolloconfigdb.sql的数据库中。 在portal服务中将数据库配置连接到，执行apolloportaldb.sql的数据库中。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">编辑文件并且修改数据库配置</span>
<span class="line"># vi apollo-adminservice-1.9.2-github/config/application-github.properties </span>
<span class="line">spring.datasource.url = jdbc:mysql://192.168.1.10:61920/ApolloConfigDB?characterEncoding=utf8</span>
<span class="line">spring.datasource.username = root</span>
<span class="line">spring.datasource.password = 123456</span>
<span class="line"></span>
<span class="line"># vi apollo-configservice-1.9.2-github/config/application-github.properties </span>
<span class="line">spring.datasource.url = jdbc:mysql://192.168.1.10:61920/ApolloConfigDB?characterEncoding=utf8</span>
<span class="line">spring.datasource.username = root</span>
<span class="line">spring.datasource.password = 123456</span>
<span class="line"></span>
<span class="line"># vi apollo-portal-1.9.2-github/config/application-github.properties </span>
<span class="line">spring.datasource.url = jdbc:mysql://192.168.1.10:61920/ApolloPortalDB?characterEncoding=utf8</span>
<span class="line">spring.datasource.username = root</span>
<span class="line">spring.datasource.password = 123456</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="启动相关配置" tabindex="-1"><a class="header-anchor" href="#启动相关配置"><span>启动相关配置</span></a></h2><p>先启动 <strong>configService</strong></p><p>启动示例图：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># chown www.www -R /data/wwwroot/web/apollo-1.9.2-github/</span>
<span class="line"># su -l www</span>
<span class="line"># cd /data/wwwroot/web/apollo-1.9.2-github/apollo-configservice-1.9.2-github/scripts/</span>
<span class="line"># sh startup.sh</span>
<span class="line">Started [11613]</span>
<span class="line">Waiting for server startup..</span>
<span class="line">Wed Apr 13 14:40:05 CST 2022 Server started in 20 seconds!</span>
<span class="line"></span>
<span class="line">日志地址 LOG_DIR=/opt/logs/100003171</span>
<span class="line"># chown www.www -R /opt/logs/</span>
<span class="line"># netstat -tunpl|grep java</span>
<span class="line">tcp6       0      0 :::8080                 :::*                    LISTEN      11846/java  </span>
<span class="line">服务启动了</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器访问： http://192.168.1.3:8080/</p><p><img src="https://imgoss.xgss.net/picgo/image-20220413144343246.png?aliyun" alt="image-20220413144343246"></p><p>接着在<strong>adminService</strong>和<strong>protal</strong>服务中如法炮制一样，启动对应<strong>startup.sh</strong>脚本</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">启动 adminService</span>
<span class="line"># cd  /data/wwwroot/web/apollo-1.9.2-github/apollo-adminservice-1.9.2-github/scripts/</span>
<span class="line"># sh ./startup.sh</span>
<span class="line"></span>
<span class="line">查看端口</span>
<span class="line"># netstat -tunpl|grep java</span>
<span class="line">tcp6       0      0 :::8090                 :::*                    LISTEN      12071/java          </span>
<span class="line">tcp6       0      0 :::8080                 :::*                    LISTEN      11846/java      </span>
<span class="line"></span>
<span class="line">启动 protal</span>
<span class="line"># cd /data/wwwroot/web/apollo-1.9.2-github/apollo-portal-1.9.2-github/scripts/</span>
<span class="line"># sh ./startup.sh </span>
<span class="line"></span>
<span class="line">开放端口（非必要）：</span>
<span class="line">iptables -A INPUT -p tcp --dport 8070 -j ACCEPT</span>
<span class="line">iptables -A INPUT -p tcp --dport 8090 -j ACCEPT</span>
<span class="line">service iptables save</span>
<span class="line">systemctl restart iptables.service</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># vi apollo-portal-1.9.2-github/config/apollo-env.properties</span>
<span class="line">local.meta=http://localhost:8080</span>
<span class="line">dev.meta=http://fill-in-fat-meta-server:8080</span>
<span class="line">fat.meta=http://fill-in-fat-meta-server:8080</span>
<span class="line">uat.meta=http://fill-in-uat-meta-server:8080</span>
<span class="line">lpt.meta=\${lpt_meta}</span>
<span class="line">pro.meta=http://fill-in-pro-meta-server:8080</span>
<span class="line">修改</span>
<span class="line">local.meta=http://localhost:8080</span>
<span class="line">dev.meta=http://192.168.1.3:8080</span>
<span class="line">#fat.meta=http://fill-in-fat-meta-server:8080</span>
<span class="line">#uat.meta=http://fill-in-uat-meta-server:8080</span>
<span class="line">lpt.meta=\${lpt_meta}</span>
<span class="line">pro.meta=http://192.168.1.3:8080</span>
<span class="line">重启服务</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器访问： http://192.168.1.3:8070/</p><p><img src="https://imgoss.xgss.net/picgo/image-20220413145243538.png?aliyun" alt="image-20220413145243538"></p><p><img src="https://imgoss.xgss.net/picgo/image-20220413152305896.png?aliyun" alt="image-20220413152305896"></p><p>创建应用</p><p><img src="https://imgoss.xgss.net/picgo/image-20220413152821538.png?aliyun" alt="image-20220413152821538"></p><p>新增配置</p><p><img src="https://imgoss.xgss.net/picgo/image-20220413152838128.png?aliyun" alt="image-20220413152838128"></p><p>验证：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">{config_server_url}/configfiles/json/{appId}/{clusterName}/{namespaceName}?ip={clientIp}</span>
<span class="line"></span>
<span class="line"># curl http://192.168.1.3:8080/configfiles/json/test001/default/application</span>
<span class="line">{&quot;ip&quot;:&quot;192.168.1.10&quot;,&quot;domain&quot;:&quot;www.baidu.com&quot;}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Apollo搭建完成，后期再搭建Apollo多环境</p>`,42)]))}const c=a(i,[["render",p]]),d=JSON.parse('{"path":"/kaiyuan/Open-Source-Software/1.Apollo%E7%9A%84%E9%83%A8%E7%BD%B2%E5%92%8C%E5%8A%A8%E6%80%81%E9%85%8D%E7%BD%AE%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8-%E6%9C%AC%E5%9C%B0%E6%B5%8B%E8%AF%95.html","title":"Apollo的部署和动态配置基础使用","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"kaiyuan/Open-Source-Software/1.Apollo的部署和动态配置基础使用-本地测试.md"}');export{c as comp,d as data};
