import{_ as e,c as n,b as a,o as i}from"./app-BEL8OELx.js";const l={};function r(c,s){return i(),n("div",null,s[0]||(s[0]=[a(`<h1 id="开源sql审核查询平台archery-基于docker安装" tabindex="-1"><a class="header-anchor" href="#开源sql审核查询平台archery-基于docker安装"><span>开源SQL审核查询平台Archery-基于docker安装</span></a></h1><h1 id="一、archery产品介绍" tabindex="-1"><a class="header-anchor" href="#一、archery产品介绍"><span>一、Archery产品介绍</span></a></h1><p>在技术团队内部进行有效的 SQL 管理并不容易，如何进行数据库的统一管理，和线上 SQL 操作的统一审核，变得尤为重要。Archery，这个开源的 SQL 审核查询平台，或许能为 SQL 审核工作带来不小的效率提升。</p><p>一条高质量的 SQL 语句能使整个服务加速好几倍，而一条有问题的 SQL 则可能会引发灾难，造成严重后果，因此，数据库管理人员的工作就十分重要了，他们掌握着千百万数据的命运。</p><p>简介</p><p>Archery，是 hhyo 在 Github 上开源的 SQL 审核查询平台，项目位于 https://github.com/hhyo/Archery，同时也在 Gitee 上开源，位于 https://gitee.com/rtttte/Archery</p><h1 id="二、基于docker搭建archery" tabindex="-1"><a class="header-anchor" href="#二、基于docker搭建archery"><span>二、基于docker搭建Archery</span></a></h1><h2 id="_1-服务器环境介绍" tabindex="-1"><a class="header-anchor" href="#_1-服务器环境介绍"><span>1.服务器环境介绍</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">服务器：centos7 </span>
<span class="line">IP: 192.168.1.12</span>
<span class="line">4C-8G-4T</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本文主要参考：https://archerydms.com/installation/docker/</p><h2 id="_2-安装docker" tabindex="-1"><a class="header-anchor" href="#_2-安装docker"><span>2.安装docker</span></a></h2><p>如果安装了可以跳过</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">wget https://gitee.com/funet8/centos6_LANP_dockerfile/raw/master/shell/CentOS6_7_intall_docker.sh</span>
<span class="line">sh CentOS6_7_intall_docker.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-安装docker-compose" tabindex="-1"><a class="header-anchor" href="#_3-安装docker-compose"><span>3.安装docker-compose</span></a></h2><p>如果安装了可以跳过</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">sudo curl -L &quot;https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)&quot; -o /usr/local/bin/docker-compose</span>
<span class="line">sudo chmod +x /usr/local/bin/docker-compose</span>
<span class="line"></span>
<span class="line">/usr/local/bin/docker-compose -v</span>
<span class="line">docker-compose version 1.24.1, build 4667896b</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://archerydms.com/installation/docker/" target="_blank" rel="noopener noreferrer">docker部署</a> https://archerydms.com/installation/docker/ 下载了 Archery-1.7.13 解压.</p><p>下载并且解压</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">wget https://github.com/hhyo/Archery/archive/v1.7.13.tar.gz</span>
<span class="line">tar -zxvf v1.7.13.tar.gz</span>
<span class="line">cd Archery-1.7.13/src/docker-compose/</span>
<span class="line">ls</span>
<span class="line">archery  docker-compose.yml  inception  mysql</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-安装并且docker启动" tabindex="-1"><a class="header-anchor" href="#_4-安装并且docker启动"><span>4.安装并且docker启动</span></a></h2><p>如果有端口占用，需要修改 docker-compose.yml 里的文件端口，但是需要修改配置，宿主机最好不要占用这些端口</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 启动</span>
<span class="line">docker-compose -f docker-compose.yml up -d</span>
<span class="line"></span>
<span class="line">生成了五个docker实例：redis inception archery goinception mysql</span>
<span class="line"> </span>
<span class="line"># 表结构初始化</span>
<span class="line">docker exec -ti archery /bin/bash</span>
<span class="line">cd /opt/archery</span>
<span class="line">source /opt/venv4archery/bin/activate</span>
<span class="line">python3 manage.py makemigrations sql  </span>
<span class="line">python3 manage.py migrate </span>
<span class="line"></span>
<span class="line"># 数据初始化</span>
<span class="line">python3 manage.py dbshell&lt;sql/fixtures/auth_group.sql</span>
<span class="line">python3 manage.py dbshell&lt;src/init_sql/mysql_slow_query_review.sql</span>
<span class="line"></span>
<span class="line"># 创建管理用户</span>
<span class="line">python3 manage.py createsuperuser</span>
<span class="line"></span>
<span class="line"># python3 manage.py createsuperuser</span>
<span class="line">用户名: admin</span>
<span class="line">电子邮件地址: star@xxxxxx.com</span>
<span class="line">Password: </span>
<span class="line">Password (again): </span>
<span class="line">Superuser created successfully.</span>
<span class="line"># exit</span>
<span class="line"></span>
<span class="line"># 重启</span>
<span class="line">docker restart archery</span>
<span class="line"></span>
<span class="line"># 日志查看和问题排查</span>
<span class="line">docker logs archery -f --tail=50</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>redis 端口：6379</p><p>mysql端口：3306</p><p>inception端口：6669</p><p>goinception端口：4000</p><p>archery端口：9123</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># docker ps</span>
<span class="line">CONTAINER ID        IMAGE                                          COMMAND                  CREATED             STATUS              PORTS                                                                              NAMES</span>
<span class="line">e961c33a0726        redis:5                                        &quot;docker-entrypoint...&quot;   4 minutes ago       Up 3 minutes        6379/tcp                                                                           redis</span>
<span class="line">dec2f8e330b7        hhyo/archery:1.7.13                            &quot;dockerize -wait t...&quot;   4 minutes ago       Up 3 minutes        0.0.0.0:9123-&gt;9123/tcp                                                             archery</span>
<span class="line">ccaca4c8d420        mysql:5.7                                      &quot;docker-entrypoint...&quot;   4 minutes ago       Up 3 minutes        0.0.0.0:3306-&gt;3306/tcp, 33060/tcp                                                  mysql</span>
<span class="line">5a7fc2e52484        hanchuanchuan/goinception                      &quot;/usr/local/bin/du...&quot;   4 minutes ago       Up 3 minutes        4000/tcp                                                                           goinception</span>
<span class="line">16ef27ac1cee        hhyo/inception                                 &quot;/bin/sh -c &#39;nohup...&quot;   4 minutes ago       Up 3 minutes        6669/tcp                                                                           inception</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="三、基本操作" tabindex="-1"><a class="header-anchor" href="#三、基本操作"><span>三、基本操作</span></a></h1><h2 id="关闭docker服务" tabindex="-1"><a class="header-anchor" href="#关闭docker服务"><span>关闭docker服务</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker stop redis</span>
<span class="line">docker stop inception</span>
<span class="line">docker stop archery</span>
<span class="line">docker stop goinception</span>
<span class="line">docker stop mysql</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除docker容器-谨慎操作" tabindex="-1"><a class="header-anchor" href="#删除docker容器-谨慎操作"><span>删除docker容器（谨慎操作）</span></a></h2><p>删除之后数据没有了</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker rm -f redis</span>
<span class="line">docker rm -f inception</span>
<span class="line">docker rm -f archery</span>
<span class="line">docker rm -f goinception</span>
<span class="line">docker rm -f mysql</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="访问" tabindex="-1"><a class="header-anchor" href="#访问"><span>访问</span></a></h2><p>访问，http://192.168.1.12:9123/ 下一篇文章讲解如何配置Archery后台配置基本操作</p><h1 id="四、角色权限" tabindex="-1"><a class="header-anchor" href="#四、角色权限"><span>四、角色权限</span></a></h1><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">default</span>
<span class="line">DBA		数据库管理员（Database Administrator，简称DBA）</span>
<span class="line">RD  研发（Research and Development）</span>
<span class="line">PM 项目经理( Project Manager )</span>
<span class="line">QA 测试（QUALITY ASSURANCE，中文意思是“质量保证”）</span>
<span class="line"></span>
<span class="line">工作流：</span>
<span class="line">RD--&gt;DBA--&gt;CTO（审批）</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="工作流" tabindex="-1"><a class="header-anchor" href="#工作流"><span>工作流</span></a></h2><h3 id="功能说明" tabindex="-1"><a class="header-anchor" href="#功能说明"><span>功能说明</span></a></h3><p>项目提供简单的多级审批流配置，审批流程和资源组以及审批类型相关，不同资源组和审批类型可以配置不同的审批流程，审批流程配置的是权限组，可避免审批人单点的问题</p><h3 id="相关配置" tabindex="-1"><a class="header-anchor" href="#相关配置"><span>相关配置</span></a></h3><p>在系统管理-配置项管理页面，可进行组工单审批流程的配置 对于SQL上线和SQL查询权限工单，如果用户拥有(&#39;sql_review&#39;, &#39;审核SQL上线工单&#39;)、(&#39;sql_execute_for_resource_group&#39;, &#39;执行SQL上线工单&#39;)、(&#39;query_review&#39;, &#39;审核查询权限&#39;)权限，就可以查看到当前用户所在资源组的所有工单 工单待审核时，关联当前审批权限组、并且关联工单所在资源组的用户，均可查看审核工单（资源组隔离） 待办列表包含当前用户可审核的所有工单</p><p><img src="https://imgoss.xgss.net/picgo/image-20200908161641296.png?aliyun" alt="image-20200908161641296"></p>`,44)]))}const p=e(l,[["render",r]]),t=JSON.parse('{"path":"/kaiyuan/Open-databases/1_Archery_Install_Docker.html","title":"开源SQL审核查询平台Archery-基于docker安装","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"kaiyuan/Open-databases/1_Archery_Install_Docker.md"}');export{p as comp,t as data};
