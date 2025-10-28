import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,a as e,o as i}from"./app-BiQR_lPj.js";const p={};function l(t,s){return i(),n("div",null,s[0]||(s[0]=[e(`<h1 id="阿里巴巴开源datax全量同步多个mysql数据库" tabindex="-1"><a class="header-anchor" href="#阿里巴巴开源datax全量同步多个mysql数据库"><span>阿里巴巴开源DataX全量同步多个MySQL数据库</span></a></h1><h1 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h1><p>上次 写了<a href="https://mp.weixin.qq.com/s/_ZXqA3H__Kwk-9O-9dKyOQ" target="_blank" rel="noopener noreferrer">阿里巴巴高效的离线数据同步工具DataX</a>： https://mp.weixin.qq.com/s/_ZXqA3H__Kwk-9O-9dKyOQ 安装DataX这个开源工具，并且同步备份了几张数据表。但是发现一个问题，就是每张表都需要单独写一个 job。如果数据表有几百张是不是要写几百个，这个不太现实了。</p><p>正当一筹莫展之际看到看到 @慌途L https://blog.csdn.net/qq_25112523/article/details/109276879 的文章，我根据文章这篇文章优化了一下，先理一下思路。</p><p><img src="https://imgoss.xgss.net/picgo/e3606d85c0629ba2dcd0e67c906dfec0edc5faba.jpg?aliyun" alt="img"></p><h1 id="思路" tabindex="-1"><a class="header-anchor" href="#思路"><span>思路</span></a></h1><p>实现的目标如图，要将源数据库的所有数据全量同步到目标数据库中。</p><p><img src="https://imgoss.xgss.net/picgo/image-20230321171446281.png?aliyun" alt="image-20230321171446281"></p><h2 id="三个步骤" tabindex="-1"><a class="header-anchor" href="#三个步骤"><span>三个步骤</span></a></h2><p>1.源库的数据库结构导入到目标库中</p><p>2.读取目标库中的所有表名</p><p>3.通过DataX执行脚本同步所有数据表。</p><h1 id="操作流程" tabindex="-1"><a class="header-anchor" href="#操作流程"><span>操作流程</span></a></h1><h2 id="_1-源库的数据库结构导入到目标库中" tabindex="-1"><a class="header-anchor" href="#_1-源库的数据库结构导入到目标库中"><span>1.源库的数据库结构导入到目标库中</span></a></h2><p>利用shell脚本读取数据库，导出表结构</p><p>https://gitee.com/funet8/MYSQL/raw/master/DataX/Mysql_Init.sh</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vim /data/datax/script/Mysql_Init.sh </span></span>
<span class="line"><span>填写以下内容，全量备份执行一次即可</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span>. /etc/profile</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 读库的变量</span></span>
<span class="line"><span>r_ip=&quot;192.168.1.6&quot;</span></span>
<span class="line"><span>r_port=&quot;3306&quot;</span></span>
<span class="line"><span>r_username=&quot;root&quot;</span></span>
<span class="line"><span>r_password=&quot;123456&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 写入库的变量</span></span>
<span class="line"><span>w_ip=&quot;192.168.1.4&quot;</span></span>
<span class="line"><span>w_port=&quot;61920&quot;</span></span>
<span class="line"><span>w_username=&quot;star&quot;</span></span>
<span class="line"><span>w_password=&quot;123456&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取库名</span></span>
<span class="line"><span>Mysql_Names=\`mysql -h$r_ip -u$r_username -p$r_password -P$r_port -e &quot;show databases\\G&quot; |grep &#39;Database&#39;|awk -F&#39;Database: &#39; &#39;{print $2}&#39; |grep -v &#39;information_schema\\|performance_schema\\|test\\|sys\\|mysql\\|test1|&#39;\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function Mysql_Init(){</span></span>
<span class="line"><span>	mysql_path=&quot;/data/datax/mysql/&quot;</span></span>
<span class="line"><span>	mkdir $mysql_path</span></span>
<span class="line"><span>	for DataBase in $Mysql_Names;</span></span>
<span class="line"><span>		do</span></span>
<span class="line"><span>		#1.导出数据库结构：</span></span>
<span class="line"><span>		mysqldump -d \${DataBase} -h$r_ip -u$r_username -p$r_password -P$r_port &gt; \${mysql_path}\${DataBase}.sql</span></span>
<span class="line"><span>		#2.创建数据库</span></span>
<span class="line"><span>		mysql -h$w_ip -u$w_username -p$r_password -P$w_port -e &quot;CREATE database \${DataBase} CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;&quot;</span></span>
<span class="line"><span>		#3.导入数据库结构：</span></span>
<span class="line"><span>		mysql -u$w_username -h$w_ip -P$w_port -p$w_password \${DataBase} &lt; \${mysql_path}\${DataBase}.sql</span></span>
<span class="line"><span>	done</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#数据库初始化导出、导入数据库</span></span>
<span class="line"><span>Mysql_Init</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-读取目标库中的所有库名、表名循环" tabindex="-1"><a class="header-anchor" href="#_2-读取目标库中的所有库名、表名循环"><span>2.读取目标库中的所有库名、表名循环</span></a></h2><p>https://gitee.com/funet8/MYSQL/raw/master/DataX/all_Sync_Task.sh</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># vi /data/datax/script/all_Sync_Task.sh </span></span>
<span class="line"><span>填写以下内容</span></span>
<span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span>. /etc/profile</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 读库的变量</span></span>
<span class="line"><span>r_ip=&quot;192.168.1.6&quot;</span></span>
<span class="line"><span>r_port=&quot;3306&quot;</span></span>
<span class="line"><span>r_username=&quot;root&quot;</span></span>
<span class="line"><span>r_password=&quot;123456&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 写入库的变量</span></span>
<span class="line"><span>w_ip=&quot;192.168.1.4&quot;</span></span>
<span class="line"><span>w_port=&quot;61920&quot;</span></span>
<span class="line"><span>w_username=&quot;star&quot;</span></span>
<span class="line"><span>w_password=&quot;123456&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Tool_Datax=&#39;/usr/bin/python2.7 /data/datax/bin/datax.py&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取库名</span></span>
<span class="line"><span>Mysql_Names=\`mysql -h$r_ip -u$r_username -p$r_password -P$r_port -e &quot;show databases\\G&quot; |grep &#39;Database&#39;|awk -F&#39;Database: &#39; &#39;{print $2}&#39; |grep -v &#39;information_schema\\|performance_schema\\|test\\|sys\\|mysql\\|test1|&#39;\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for dbname in $Mysql_Names;</span></span>
<span class="line"><span>	do</span></span>
<span class="line"><span>		# 获取表名</span></span>
<span class="line"><span>		table_tchema=\`mysql -h$r_ip -u$r_username -p$r_password -P$r_port -e &quot;use \${dbname}; show full tables;&quot;|grep &#39;TABLE&#39;|awk &#39;{print $1}&#39;\`</span></span>
<span class="line"><span>		#echo $table_tchema;</span></span>
<span class="line"><span>		</span></span>
<span class="line"><span>		#循环导入数据库</span></span>
<span class="line"><span>		for table_name in $table_tchema;</span></span>
<span class="line"><span>			do</span></span>
<span class="line"><span>				echo $table_name;</span></span>
<span class="line"><span>				$Tool_Datax  /data/datax/job/mysql2mysql_All.json -p &quot;-Dr_ip=$r_ip -Dr_port=$r_port -Dr_dbname=$dbname -Dr_username=$r_username -Dr_password=$r_password -Dw_ip=$w_ip -Dw_port=$w_port -Dw_dbname=$dbname -Dw_username=$w_username -Dw_password=$w_password -Dtable_name=$table_name&quot;</span></span>
<span class="line"><span>		done</span></span>
<span class="line"><span>done</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>#DataX全量同步(某一张表)</span></span>
<span class="line"><span>#$Tool_Python  /data/datax/job/mysql2mysql_dzzoffice.json -p &quot;-Dr_ip=$r_ip -Dr_port=$r_port -Dr_dbname=$r_dbname -Dr_username=$r_username -Dr_password=$r_password -Dw_ip=$w_ip -Dw_port=$w_port -Dw_dbname=$w_dbname -Dw_username=$w_username -Dw_password=$w_password&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># DataX全量同步(多个文件直接写多个执行命令)</span></span>
<span class="line"><span>#$Tool_Python  /data/datax/job/mysql2mysql_All.json -p &quot;-Dr_ip=$r_ip -Dr_port=$r_port -Dr_dbname=$r_dbname -Dr_username=$r_username -Dr_password=$r_password -Dw_ip=$w_ip -Dw_port=$w_port -Dw_dbname=$w_dbname -Dw_username=$w_username -Dw_password=$w_password -Dtable_name=$table_name&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>撰写job脚本</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># vim /data/datax/job/mysql2mysql_All.json</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>https://gitee.com/funet8/MYSQL/raw/master/DataX/mysql2mysql_All.json</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;job&quot;: {</span></span>
<span class="line"><span>		&quot;setting&quot;: {</span></span>
<span class="line"><span>            &quot;speed&quot;: {</span></span>
<span class="line"><span>                &quot;channel&quot;: 10</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>			&quot;errorLimit&quot;: {</span></span>
<span class="line"><span>                &quot;record&quot;: 0,</span></span>
<span class="line"><span>                &quot;percentage&quot;: 0.02</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        &quot;content&quot;: [</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                &quot;reader&quot;: {</span></span>
<span class="line"><span>                    &quot;name&quot;: &quot;mysqlreader&quot;, </span></span>
<span class="line"><span>                    &quot;parameter&quot;: {</span></span>
<span class="line"><span>						&quot;column&quot;: [&quot;*&quot;],</span></span>
<span class="line"><span>                        &quot;connection&quot;: [</span></span>
<span class="line"><span>                            {</span></span>
<span class="line"><span>                                &quot;jdbcUrl&quot;: [&quot;jdbc:mysql://\${r_ip}:\${r_port}/\${r_dbname}?serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8&amp;useSSL=false&amp;zeroDateTimeBehavior=convertToNull&quot;],</span></span>
<span class="line"><span>                                &quot;table&quot;: [&quot;\${table_name}&quot;]</span></span>
<span class="line"><span>                            }</span></span>
<span class="line"><span>                        ], </span></span>
<span class="line"><span>						&quot;username&quot;: &quot;\${r_username}&quot;,</span></span>
<span class="line"><span>                        &quot;password&quot;: &quot;\${r_password}&quot;</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                }, </span></span>
<span class="line"><span>                &quot;writer&quot;: {</span></span>
<span class="line"><span>                    &quot;name&quot;: &quot;mysqlwriter&quot;, </span></span>
<span class="line"><span>                    &quot;parameter&quot;: {</span></span>
<span class="line"><span>						&quot;writeMode&quot;: &quot;update&quot;,</span></span>
<span class="line"><span>                        &quot;column&quot;: [&quot;*&quot;],</span></span>
<span class="line"><span>                        &quot;session&quot;: [</span></span>
<span class="line"><span>                        	&quot;set session sql_mode=&#39;ANSI&#39;&quot;</span></span>
<span class="line"><span>                        ],</span></span>
<span class="line"><span>                        &quot;connection&quot;: [</span></span>
<span class="line"><span>                            {</span></span>
<span class="line"><span>                                &quot;jdbcUrl&quot;: &quot;jdbc:mysql://\${w_ip}:\${w_port}/\${w_dbname}?serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8&amp;useSSL=false&amp;zeroDateTimeBehavior=convertToNull&quot;, </span></span>
<span class="line"><span>                                &quot;table&quot;: [&quot;\${table_name}&quot;]</span></span>
<span class="line"><span>                            }</span></span>
<span class="line"><span>                        ],</span></span>
<span class="line"><span>						&quot;username&quot;: &quot;\${w_username}&quot;,</span></span>
<span class="line"><span>                        &quot;password&quot;: &quot;\${w_password}&quot;</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-通过datax执行脚本同步所有数据表。" tabindex="-1"><a class="header-anchor" href="#_3-通过datax执行脚本同步所有数据表。"><span>3.通过DataX执行脚本同步所有数据表。</span></a></h2><p>执行脚本</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># sh /data/datax/script/all_Sync_Task.sh </span></span>
<span class="line"><span>会输出信息</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo/image-20230321173659358.png?aliyun" alt="image-20230321173659358"></p><p>说明同步成功，如果有报错，根据报错解决BUG即可。</p><h1 id="结果展示" tabindex="-1"><a class="header-anchor" href="#结果展示"><span>结果展示</span></a></h1><h2 id="源数据库" tabindex="-1"><a class="header-anchor" href="#源数据库"><span>源数据库</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/image-20230320102328525.png?aliyun" alt="image-20230320102328525"></p><h2 id="同步之前" tabindex="-1"><a class="header-anchor" href="#同步之前"><span>同步之前</span></a></h2><p><img src="https://imgoss.xgss.net/picgo2025/image-20230320102231494.png?aliyun" alt="image-20230320102231494"></p><h2 id="同步之后" tabindex="-1"><a class="header-anchor" href="#同步之后"><span>同步之后</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/image-20230320103457137.png?aliyun" alt="image-20230320103457137"></p><p>至此全量同步完成。</p><p>参考： https://blog.csdn.net/qq_25112523/article/details/109276879</p>`,39)]))}const c=a(p,[["render",l]]),u=JSON.parse('{"path":"/article/yr8tzmtf/","title":"datax-tongbu-mysql","lang":"en-US","frontmatter":{"title":"datax-tongbu-mysql","createTime":"2025/05/27 17:51:17","permalink":"/article/yr8tzmtf/"},"git":{"createdTime":1749111496000,"updatedTime":1750129445000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":2,"url":"https://github.com/star"}]},"readingTime":{"minutes":2.95,"words":886},"filePathRelative":"mysql/datax-tongbu-mysql.md"}');export{c as comp,u as data};
