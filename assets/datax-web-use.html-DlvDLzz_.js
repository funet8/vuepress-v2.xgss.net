import{_ as n,c as a,b as e,o as i}from"./app-BEL8OELx.js";const l={};function t(d,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="开源datax集成可视化项目datax-web的使用" tabindex="-1"><a class="header-anchor" href="#开源datax集成可视化项目datax-web的使用"><span>开源DataX集成可视化项目Datax-Web的使用</span></a></h1><p>上一篇文章我们已经搭建好了 Datax-Web 后台，这篇文章我们具体讲一下如何通过Datax-Web来配置，同步MySQL数据库。</p><h1 id="目标" tabindex="-1"><a class="header-anchor" href="#目标"><span>目标</span></a></h1><p><img src="https://imgoss.xgss.net/picgo/image-20230321171446281.png?aliyun" alt="image-20230321171446281"></p><h1 id="mysql数据库全量同步" tabindex="-1"><a class="header-anchor" href="#mysql数据库全量同步"><span>MySql数据库全量同步</span></a></h1><p><img src="https://imgoss.xgss.net/picgo/datax-web-shuju.jpg?aliyun" alt="datax-web-shuju"></p><h2 id="_1-执行器配置" tabindex="-1"><a class="header-anchor" href="#_1-执行器配置"><span>1.执行器配置</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/datax-webx12.jpg?aliyun" alt="datax-webx12"></p><p>1、&quot;调度中心OnLine:&quot;右侧显示在线的&quot;调度中心&quot;列表, 任务执行结束后, 将会以failover的模式进行回调调度中心通知执行结果, 避免回调的单点风险;</p><p>2、&quot;执行器列表&quot; 中显示在线的执行器列表, 可通过&quot;OnLine 机器&quot;查看对应执行器的集群机器;</p><p><img src="https://imgoss.xgss.net/picgo/image-20230327164734793.png?aliyun" alt="image-20230327164734793"></p><p>1、AppName: （与datax-executor中application.yml的datax.job.executor.appname保持一致） 每个执行器集群的唯一标示AppName, 执行器会周期性以AppName为对象进行自动注册。可通过该配置自动发现注册成功的执行器, 供任务调度时使用;</p><p>2、名称: 执行器的名称, 因为AppName限制字母数字等组成,可读性不强, 名称为了提高执行器的可读性;</p><p>3、排序: 执行器的排序, 系统中需要执行器的地方,如任务新增, 将会按照该排序读取可用的执行器列表;</p><p>4、注册方式：调度中心获取执行器地址的方式；</p><p>自动注册：执行器自动进行执行器注册，调度中心通过底层注册表可以动态发现执行器机器地址；</p><p>手动录入：人工手动录入执行器的地址信息，多地址逗号分隔，供调度中心使用；</p><p>5、机器地址：&quot;注册方式&quot;为&quot;手动录入&quot;时有效，支持人工维护执行器的地址信息；</p><h2 id="_2-创建数据源" tabindex="-1"><a class="header-anchor" href="#_2-创建数据源"><span>2.创建数据源</span></a></h2><p>数据源管理---&gt;添加</p><p><img src="https://imgoss.xgss.net/picgo/image-20230327165806036.png?aliyun" alt="image-20230327165806036"></p><p>如图填写MySQL的账号信息，点击测试连接，无误之后确认。</p><p>第四步使用</p><h2 id="_3-创建任务模版" tabindex="-1"><a class="header-anchor" href="#_3-创建任务模版"><span>3.创建任务模版</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/image-20230328150138528.png?aliyun" alt="image-20230328150138528"></p><p>第四步使用</p><h2 id="_4-构建json脚本" tabindex="-1"><a class="header-anchor" href="#_4-构建json脚本"><span>4. 构建JSON脚本</span></a></h2><h3 id="_1-任务批量构建" tabindex="-1"><a class="header-anchor" href="#_1-任务批量构建"><span>1.任务批量构建</span></a></h3><p>步骤一，步骤二，选择第二步中创建的数据源，JSON构建目前支持的数据源有hive,mysql,oracle,postgresql,sqlserver,hbase,mongodb,clickhouse 其它数据源的JSON构建正在开发中,暂时需要手动编写。</p><p>任务管理---&gt;任务批量构建---&gt;选择数据库源</p><p><img src="https://imgoss.xgss.net/picgo/image-20230328163521242.png?aliyun" alt="image-20230328163521242"></p><h3 id="_2-字段映射" tabindex="-1"><a class="header-anchor" href="#_2-字段映射"><span>2.字段映射</span></a></h3><p><img src="https://imgoss.xgss.net/picgo/image-20230328163800009.png?aliyun" alt="image-20230328163800009"></p><h3 id="_3-批量创建任务" tabindex="-1"><a class="header-anchor" href="#_3-批量创建任务"><span>3.批量创建任务</span></a></h3><p><img src="https://imgoss.xgss.net/picgo/image-20230328163835852.png?aliyun" alt="image-20230328163835852"></p><p>手动执行一次</p><h3 id="_4-启动任务" tabindex="-1"><a class="header-anchor" href="#_4-启动任务"><span>4.启动任务</span></a></h3><p><img src="https://imgoss.xgss.net/picgo/image-20230328164122275.png?aliyun" alt="image-20230328164122275"></p><h3 id="查看日志" tabindex="-1"><a class="header-anchor" href="#查看日志"><span>查看日志</span></a></h3><p><img src="https://imgoss.xgss.net/picgo/image-20230328164221949.png?aliyun" alt="image-20230328164221949"></p><p>报错</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">2023-03-28 16:41:14 [JobThread.run-130] &lt;br&gt;----------- datax-web job execute start -----------&lt;br&gt;----------- Param:</span>
<span class="line">2023-03-28 16:41:14 [BuildCommand.buildDataXParam-100] ------------------Command parameters:</span>
<span class="line">2023-03-28 16:41:14 [ExecutorJobHandler.execute-57] ------------------DataX process id: 29802</span>
<span class="line">2023-03-28 16:41:14 [AnalysisStatistics.analysisStatisticsLog-53]   File &quot;/data/datax/bin/datax.py&quot;, line 114</span>
<span class="line">2023-03-28 16:41:14 [AnalysisStatistics.analysisStatisticsLog-53]     print readerRef</span>
<span class="line">2023-03-28 16:41:14 [AnalysisStatistics.analysisStatisticsLog-53]           ^</span>
<span class="line">2023-03-28 16:41:14 [AnalysisStatistics.analysisStatisticsLog-53] SyntaxError: Missing parentheses in call to &#39;print&#39;. Did you mean print(readerRef)?</span>
<span class="line">2023-03-28 16:41:14 [JobThread.run-165] &lt;br&gt;----------- datax-web job execute end(finish) -----------&lt;br&gt;----------- ReturnT:ReturnT [code=500, msg=command exit value(1) is failed, content=null]</span>
<span class="line">2023-03-28 16:41:14 [ProcessCallbackThread.callbackLog-186] &lt;br&gt;----------- datax-web job callback finish.</span>
<span class="line">2023-03-28 16:41:14 [TriggerCallbackThread.callbackLog-186] &lt;br&gt;----------- datax-web job callback finish.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>经过查询是本机装了多版本的python</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">[root@node3 bin]#  whereis python</span>
<span class="line">python: /usr/bin/python /usr/bin/python2.7 /usr/bin/python3.6 /usr/bin/python3.6m /usr/lib/python2.7 /usr/lib/python3.6 /usr/lib64/python2.7 /usr/lib64/python3.6 /etc/python /usr/include/python2.7 /usr/include/python3.6m /root/anaconda3/bin/python /root/anaconda3/bin/python3.9 /root/anaconda3/bin/python3.9-config /usr/share/man/man1/python.1.gz</span>
<span class="line"></span>
<span class="line">[root@node3 bin]# python -V</span>
<span class="line">Python 3.9.13</span>
<span class="line">[root@node3 bin]# /usr/bin/python -V</span>
<span class="line">Python 2.7.5</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>经过修复使Python改为2.7再执行任务</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">[root@node3 ~]# python -V</span>
<span class="line">Python 2.7.5</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>还有一种修复方式是</p><p>Python (2.x) (支持Python3需要修改替换datax/bin下面的三个python文件，替换文件在doc/datax-web/datax-python3下) 必选，主要用于调度执行底层DataX的启动脚本，默认的方式是以Java子进程方式执行DataX，用户可以选择以Python方式来做自定义的改造</p><h2 id="_5-查看任务" tabindex="-1"><a class="header-anchor" href="#_5-查看任务"><span>5.查看任务</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/image-20230329112816134.png?aliyun" alt="image-20230329112816134"></p><p>查看日志：</p><p><img src="https://imgoss.xgss.net/picgo/image-20230329112858101.png?aliyun" alt="image-20230329112858101"></p><p>再用Navicat 查看目标库中数据是否一致。</p><p><img src="https://imgoss.xgss.net/picgo/image-20230329113024046.png?aliyun" alt="image-20230329113024046"></p><h1 id="datax-web增量配置说明" tabindex="-1"><a class="header-anchor" href="#datax-web增量配置说明"><span>DataX-Web增量配置说明</span></a></h1><h2 id="一、根据日期进行增量数据抽取" tabindex="-1"><a class="header-anchor" href="#一、根据日期进行增量数据抽取"><span>一、根据日期进行增量数据抽取</span></a></h2><h3 id="_1-页面任务配置" tabindex="-1"><a class="header-anchor" href="#_1-页面任务配置"><span>1.页面任务配置</span></a></h3><p>打开菜单任务管理页面，选择添加任务</p><p>按下图中5个步骤进行配置</p><p><img src="https://imgoss.xgss.net/picgo/datax-webx13.jpg?aliyun" alt="datax-webx13"></p><ul><li>1.任务类型选DataX任务</li><li>2.辅助参数选择时间自增</li><li>3.增量开始时间选择，即sql中查询时间的开始时间，用户使用此选项方便第一次的全量同步。第一次同步完成后，该时间被更新为上一次的任务触发时间，任务失败不更新。</li><li>4.增量时间字段,-DlastTime=&#39;%s&#39; -DcurrentTime=&#39;%s&#39; 先来解析下这段字符串</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">1.-D是DataX参数的标识符，必配</span>
<span class="line">2.-D后面的lastTime和currentTime是DataX json中where条件的时间字段标识符，必须和json中的变量名称保持一致</span>
<span class="line">3.=&#39;%s&#39;是项目用来去替换时间的占位符，比配并且格式要完全一致</span>
<span class="line">4.注意-DlastTime=&#39;%s&#39;和-DcurrentTime=&#39;%s&#39;中间有一个空格，空格必须保留并且是一个空格</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>5.时间格式，可以选择自己数据库中时间的格式，也可以通过json中配置sql时间转换函数来处理</li></ul><p>注意，注意，注意: 配置一定要仔细看文档（后面我们也会对这块配置进行优化，避免大家犯错）</p><h3 id="_2-json配置" tabindex="-1"><a class="header-anchor" href="#_2-json配置"><span>2.JSON配置</span></a></h3><p>datax.json</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">{</span>
<span class="line">  &quot;job&quot;: {</span>
<span class="line">    &quot;setting&quot;: {</span>
<span class="line">      &quot;speed&quot;: {</span>
<span class="line">        &quot;channel&quot;: 16</span>
<span class="line">      }</span>
<span class="line">    },</span>
<span class="line">    &quot;content&quot;: [</span>
<span class="line">      {</span>
<span class="line">        &quot;reader&quot;: {</span>
<span class="line">          &quot;name&quot;: &quot;mysqlreader&quot;,</span>
<span class="line">          &quot;parameter&quot;: {</span>
<span class="line">            &quot;splitPk&quot;: &quot;id&quot;,</span>
<span class="line">            &quot;username&quot;: &quot;root&quot;,</span>
<span class="line">            &quot;password&quot;: &quot;root&quot;,</span>
<span class="line">            &quot;column&quot;: [</span>
<span class="line">              &quot;*&quot;</span>
<span class="line"></span>
<span class="line">            ],</span>
<span class="line">            &quot;connection&quot;: [</span>
<span class="line">              {</span>
<span class="line">                </span>
<span class="line">                &quot;jdbcUrl&quot;: [</span>
<span class="line">                  &quot;jdbc:mysql://localhost:3306/test?characterEncoding=utf8&quot;</span>
<span class="line">                ],</span>
<span class="line">				&quot;querySql&quot;: [</span>
<span class="line">        &quot;select * from test_list where operationDate &gt;= FROM_UNIXTIME(\${lastTime}) and operationDate &lt; FROM_UNIXTIME(\${currentTime})&quot;</span>
<span class="line">                                ]</span>
<span class="line">              }</span>
<span class="line">            ]</span>
<span class="line">          }</span>
<span class="line">        },</span>
<span class="line">        &quot;writer&quot;: {</span>
<span class="line">          &quot;name&quot;: &quot;mysqlwriter&quot;,</span>
<span class="line">          &quot;parameter&quot;: {</span>
<span class="line">           </span>
<span class="line">            &quot;username&quot;: &quot;root&quot;,</span>
<span class="line">            &quot;password&quot;: &quot;123456&quot;,</span>
<span class="line">            &quot;column&quot;: [</span>
<span class="line">              &quot;*&quot;</span>
<span class="line">            ],</span>
<span class="line">            &quot;batchSize&quot;: &quot;4096&quot;,</span>
<span class="line">            &quot;connection&quot;: [</span>
<span class="line">              {</span>
<span class="line">                &quot;jdbcUrl&quot;: &quot;jdbc:mysql://localhost:3307/test?characterEncoding=utf8&quot;,</span>
<span class="line">                &quot;table&quot;: [</span>
<span class="line">                  &quot;test_list&quot;</span>
<span class="line">                ]</span>
<span class="line">              }</span>
<span class="line">            ]</span>
<span class="line">          }</span>
<span class="line">        }</span>
<span class="line">      }</span>
<span class="line">    ]</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="querysql解析" tabindex="-1"><a class="header-anchor" href="#querysql解析"><span>querySql解析</span></a></h4><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">select * from test_list where operationDate &gt;= \${lastTime} and operationDate &lt; \${currentTime}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li>1.此处的关键点在\${lastTime}，\${currentTime}，\${}是DataX动态参数的固定格式，lastTime，currentTime就是我们页面配置中 -DlastTime=&#39;%s&#39; -DcurrentTime=&#39;%s&#39;中的lastTime，currentTime，注意字段一定要一致。</li><li>2.如果任务配置页面，时间类型选择为时间戳但是数据库时间格式不是时间戳，例如是：2019-11-26 11:40:57 此时可以用FROM_UNIXTIME(\${lastTime})进行转换。</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">select * from test_list where operationDate &gt;= FROM_UNIXTIME(\${lastTime}) and operationDate &lt; FROM_UNIXTIME(\${currentTime})</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="二、根据自增id进行增量数据抽取" tabindex="-1"><a class="header-anchor" href="#二、根据自增id进行增量数据抽取"><span>二、根据自增Id进行增量数据抽取</span></a></h2><h3 id="_1-页面任务配置-1" tabindex="-1"><a class="header-anchor" href="#_1-页面任务配置-1"><span>1.页面任务配置</span></a></h3><p>打开菜单任务管理页面，选择添加任务</p><p>按下图中4个步骤进行配置</p><p><a href="https://camo.githubusercontent.com/5d9383b190aca3c57630a1c48f59a6b64de12c9df1a4a8e1df07776f44787908/68747470733a2f2f64617461782d7765622e6f73732d636e2d68616e677a686f752e616c6979756e63732e636f6d2f646f632f69642d696e6372656d656e742e6a7067.jpg" target="_blank" rel="noopener noreferrer"><img src="https://imgoss.xgss.net/picgo/68747470733a2f2f64617461782d7765622e6f73732d636e2d68616e677a686f752e616c6979756e63732e636f6d2f646f632f69642d696e6372656d656e742e6a7067.jpg?aliyun" alt="img"></a></p><ul><li>1.任务类型选DataX任务</li><li>2.辅助参数选择主键自增</li><li>3.增量主键开始ID选择，即sql中查询ID的开始ID，用户使用此选项方便第一次的全量同步。第一次同步完成后，该ID被更新为上一次的任务触发时最大的ID，任务失败不更新。</li><li>4.增量时间字段,-DstartId=&#39;%s&#39; -DendId=&#39;%s&#39; 先来解析下这段字符串</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">1.-D是DataX参数的标识符，必配</span>
<span class="line">2.-D后面的startId和endId是DataX json中where条件的id字段标识符，必须和json中的变量名称保持一致，endId是任务在每次执行时获取当前表maxId，也是下一次任务的startId</span>
<span class="line">3.=&#39;%s&#39;是项目用来去替换时间的占位符，比配并且格式要完全一致</span>
<span class="line">4.注意-DstartId=&#39;%s&#39;和-DendId=&#39;%s&#39; 中间有一个空格，空格必须保留并且是一个空格</span>
<span class="line">5.reader数据源，选择任务同步的读数据源</span>
<span class="line">6.配置reader数据源中需要同步数据的表名及该表的主键</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，注意，注意: 一定要仔细看文档（后续会对这块配置进行优化，避免大家犯错）</p><h3 id="_2-json配置-1" tabindex="-1"><a class="header-anchor" href="#_2-json配置-1"><span>2.JSON配置</span></a></h3><p>datax.json</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">{</span>
<span class="line">   &quot;job&quot;: {</span>
<span class="line">     &quot;setting&quot;: {</span>
<span class="line">       &quot;speed&quot;: {</span>
<span class="line">         &quot;channel&quot;: 3,</span>
<span class="line">         &quot;byte&quot;: 1048576</span>
<span class="line">       },</span>
<span class="line">       &quot;errorLimit&quot;: {</span>
<span class="line">         &quot;record&quot;: 0,</span>
<span class="line">         &quot;percentage&quot;: 0.02</span>
<span class="line">       }</span>
<span class="line">     },</span>
<span class="line">     &quot;content&quot;: [</span>
<span class="line">       {</span>
<span class="line">         &quot;reader&quot;: {</span>
<span class="line">           &quot;name&quot;: &quot;mysqlreader&quot;,</span>
<span class="line">           &quot;parameter&quot;: {</span>
<span class="line">             &quot;username&quot;: &quot;yRjwDFuoPKlqya9h9H2Amg==&quot;,</span>
<span class="line">             &quot;password&quot;: &quot;yRjwDFuoPKlqya9h9H2Amg==&quot;,</span>
<span class="line">             &quot;splitPk&quot;: &quot;&quot;,</span>
<span class="line">             &quot;connection&quot;: [</span>
<span class="line">               {</span>
<span class="line">                 &quot;querySql&quot;: [</span>
<span class="line">                   &quot;select * from job_log where id&gt;= \${startId} and id&lt; \${endId}&quot;</span>
<span class="line">                 ],</span>
<span class="line">                 &quot;jdbcUrl&quot;: [</span>
<span class="line">                   &quot;jdbc:mysql://localhost:3306/datax_web&quot;</span>
<span class="line">                 ]</span>
<span class="line">               }</span>
<span class="line">             ]</span>
<span class="line">           }</span>
<span class="line">         },</span>
<span class="line">         &quot;writer&quot;: {</span>
<span class="line">           &quot;name&quot;: &quot;mysqlwriter&quot;,</span>
<span class="line">           &quot;parameter&quot;: {</span>
<span class="line">             &quot;username&quot;: &quot;mCFD+p1IMsa0rHicbQohcA==&quot;,</span>
<span class="line">             &quot;password&quot;: &quot;PhYxJmA/nuBJD1OxKTRzZH8sxuRddOv83hdqDOVR+i0=&quot;,</span>
<span class="line">             &quot;column&quot;: [</span>
<span class="line">               &quot;\`id\`&quot;,</span>
<span class="line">               &quot;\`job_group\`&quot;,</span>
<span class="line">               &quot;\`job_id\`&quot;,</span>
<span class="line">               &quot;\`job_desc\`&quot;,</span>
<span class="line">               &quot;\`executor_address\`&quot;,</span>
<span class="line">               &quot;\`executor_handler\`&quot;,</span>
<span class="line">               &quot;\`executor_param\`&quot;,</span>
<span class="line">               &quot;\`executor_sharding_param\`&quot;,</span>
<span class="line">               &quot;\`executor_fail_retry_count\`&quot;,</span>
<span class="line">               &quot;\`trigger_time\`&quot;,</span>
<span class="line">               &quot;\`trigger_code\`&quot;,</span>
<span class="line">               &quot;\`trigger_msg\`&quot;,</span>
<span class="line">               &quot;\`handle_time\`&quot;,</span>
<span class="line">               &quot;\`handle_code\`&quot;,</span>
<span class="line">               &quot;\`handle_msg\`&quot;,</span>
<span class="line">               &quot;\`alarm_status\`&quot;,</span>
<span class="line">               &quot;\`process_id\`&quot;,</span>
<span class="line">               &quot;\`max_id\`&quot;</span>
<span class="line">             ],</span>
<span class="line">             &quot;connection&quot;: [</span>
<span class="line">               {</span>
<span class="line">                 &quot;table&quot;: [</span>
<span class="line">                   &quot;job_log&quot;</span>
<span class="line">                 ],</span>
<span class="line">                 &quot;jdbcUrl&quot;: &quot;jdbc:mysql://47.98.125.243:3306/datax_web&quot;</span>
<span class="line">               }</span>
<span class="line">             ]</span>
<span class="line">           }</span>
<span class="line">         }</span>
<span class="line">       }</span>
<span class="line">     ]</span>
<span class="line">   }</span>
<span class="line"> }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="querysql解析-1" tabindex="-1"><a class="header-anchor" href="#querysql解析-1"><span>querySql解析</span></a></h4><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">select * from job_log where id&gt;= \${startId} and id&lt; \${endId}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li>1.此处的关键点在\${startId}，\${endId}，\${}是DataX动态参数的固定格式，startId，endId就是我们页面配置中 -DstartId=&#39;%s&#39; -DendId=&#39;%s&#39;中的startId，endId，注意字段一定要一致。</li></ul><h2 id="三、jvm启动参数配置" tabindex="-1"><a class="header-anchor" href="#三、jvm启动参数配置"><span>三、JVM启动参数配置</span></a></h2><p>此选择为非必选，可以配置DataX启动时JVM的参数，具体配置不做详解。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">JVM启动参数拼接结果为： -j &quot;-Xms2G -Xmx2G&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h1 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h1><p>https://github.com/WeiYe-Jing/datax-web</p><p>https://github.com/WeiYe-Jing/datax-web/blob/master/doc/datax-web/increment-desc.md</p>`,91)]))}const c=n(l,[["render",t]]),r=JSON.parse('{"path":"/mysql/datax-web-use.html","title":"开源DataX集成可视化项目Datax-Web的使用","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"mysql/datax-web-use.md"}');export{c as comp,r as data};
