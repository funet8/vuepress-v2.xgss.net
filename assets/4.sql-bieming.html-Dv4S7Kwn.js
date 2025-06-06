import{_ as a,c as n,b as e,o as i}from"./app-BEL8OELx.js";const l={};function p(t,s){return i(),n("div",null,s[0]||(s[0]=[e(`<h1 id="sql上线提示库名过长-建议使用别名解析" tabindex="-1"><a class="header-anchor" href="#sql上线提示库名过长-建议使用别名解析"><span>SQL上线提示库名过长，建议使用别名解析</span></a></h1><p>SQL上线，报错阿里云RDS，备份库名 &#39;rm-wz99XXXXXXXXX.mysql.rds.aliyuncs.com-3306-XXXXXX&#39; 过长，建议使用别名解析。</p><p>报错如图</p><p><img src="https://imgoss.xgss.net/picgo/image-20201110151221843.png?aliyun" alt="image-20201110151221843"></p><p>https://github.com/hhyo/Archery/issues/309</p><p>改变思路将<strong>RDS的域名连接改为IP连接</strong>。ping域名得到地址。</p><p><img src="https://imgoss.xgss.net/picgo/image-20201110151508499.png?aliyun" alt="image-20201110151508499"></p><p>提交工单询问阿里云客服</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">问题描述 ： RDS如何使用IP地址连接？</span>
<span class="line">获取IP地址，由于业务的需要不能使用域名连接rds，需要使用ip地址。</span>
<span class="line">ping RDS的外网地址</span>
<span class="line"></span>
<span class="line"># ping rm-aaaaaaa.mysql.rds.aliyuncs.com</span>
<span class="line"></span>
<span class="line">64 bytes from 47.112.69.163 (1.2.3.4): icmp_seq=1 ttl=92 time=7.86 ms</span>
<span class="line">实际操作： mysql -uuser -h 1.2.3.4 -P3306 -p&quot;密码&quot; 可以连接。</span>
<span class="line"></span>
<span class="line">问题</span>
<span class="line">1.RDS如何使用IP地址连接？</span>
<span class="line">2.使用RDS的外网地址ping获取IP地址：1.2.3.4， 这个地址是固定的还是会变动？如果变化的规则是如何的？</span>
<span class="line">3.如果有只读实例如何使用IP连接？</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>阿里云客服回答</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">您好，您这边如果使用地址连接的话，就是您反馈的1.2.3.4</span>
<span class="line">不过这个IP是不固定的，具体变化是根据您实例状态，如果实例有变配升级或者迁移可用区，包括ha切换这个ip都会变动。</span>
<span class="line">只读实例也有连接地址，您同样的方法ping一下就可以看到ip</span>
<span class="line">如果您实例不变配或者升级之类的操作，包括不出现故障切换备节点的情况目前不会变化</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>考虑如果阿里云rds域名数据库改为IP连接，要考虑如果发生变化后台则要修改相关的配置。</p><h1 id="解决办法" tabindex="-1"><a class="header-anchor" href="#解决办法"><span>解决办法</span></a></h1><p>通过域名的cname来将阿里云的域名改短</p><p>比如</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">自有域名</span>
<span class="line">rds1.xgss.net CNAME解析到 rm-aaaaaaa.mysql.rds.aliyuncs.com</span>
<span class="line">在</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16)]))}const c=a(l,[["render",p]]),d=JSON.parse('{"path":"/kaiyuan/Open-databases/4.sql-bieming.html","title":"SQL上线提示库名过长，建议使用别名解析","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"kaiyuan/Open-databases/4.sql-bieming.md"}');export{c as comp,d as data};
