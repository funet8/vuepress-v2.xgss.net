import{_ as s,c as n,b as a,o as i}from"./app-BEL8OELx.js";const l={};function c(t,e){return i(),n("div",null,e[0]||(e[0]=[a(`<h1 id="linux基于docker部署开源onlyoffice" tabindex="-1"><a class="header-anchor" href="#linux基于docker部署开源onlyoffice"><span>Linux基于Docker部署开源OnlyOffice</span></a></h1><h2 id="什么是onlyoffice" tabindex="-1"><a class="header-anchor" href="#什么是onlyoffice"><span>什么是OnlyOffice</span></a></h2><p>OnlyOffice是一款强大的在线office工具，我们通过他可以让客户脱离于客户端环境，直接从web端进行文档编写。</p><p>这篇文章只是介绍一下onlyOffice的所需要的环境和基本使用方法（在线打开预览，在线编辑与保存）。官网：https://www.onlyoffice.com/zh/</p><p>也可以网盘接入onlyoffice实现word文档，excel表格, ppt演示文稿的创建，在线预览，协同编辑</p><p><img src="https://imgoss.xgss.net/picgo/image-20220609191708156.png?aliyun" alt="image-20220609191708156"></p><h2 id="系统说明" tabindex="-1"><a class="header-anchor" href="#系统说明"><span>系统说明</span></a></h2><p>官方最低配置：</p><p>CPU： 双核2GHz或更高</p><p>内存：大于2GB或更多</p><p>硬盘： 大于40GB</p><p>额外的需求至少4GB的交换</p><p>Docker版本：大于1.10</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">系统：centos7</span>
<span class="line">IP： 192.168.1.5</span>
<span class="line">已安装docker</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用docker部署onlyoffice" tabindex="-1"><a class="header-anchor" href="#使用docker部署onlyoffice"><span>使用Docker部署OnlyOffice</span></a></h2><h2 id="安装docker" tabindex="-1"><a class="header-anchor" href="#安装docker"><span>安装Docker</span></a></h2><p>省略</p><h2 id="运行镜像onlyoffice" tabindex="-1"><a class="header-anchor" href="#运行镜像onlyoffice"><span>运行镜像onlyoffice</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># mkdir /data/docker</span>
<span class="line"># docker run -itd \\</span>
<span class="line">--name onlyoffice \\</span>
<span class="line">--restart always \\</span>
<span class="line">-p 8090:80 \\</span>
<span class="line">-v /data/docker/onlyoffice/log:/var/log/onlyoffice  \\</span>
<span class="line">-v /data/docker/onlyoffice/data:/var/www/onlyoffice/Data  \\</span>
<span class="line">-v /data/docker/onlyoffice/lib:/var/lib/onlyoffice \\</span>
<span class="line">-v /data/docker/onlyoffice/db:/var/lib/postgresql  \\</span>
<span class="line">onlyoffice/documentserver</span>
<span class="line"></span>
<span class="line"># docker ps</span>
<span class="line"></span>
<span class="line">阿里云下载：</span>
<span class="line"></span>
<span class="line"># docker run -itd \\</span>
<span class="line">--name onlyoffice \\</span>
<span class="line">--restart always \\</span>
<span class="line">-p 8090:80 \\</span>
<span class="line">-v /data/docker/onlyoffice/log:/var/log/onlyoffice  \\</span>
<span class="line">-v /data/docker/onlyoffice/data:/var/www/onlyoffice/Data  \\</span>
<span class="line">-v /data/docker/onlyoffice/lib:/var/lib/onlyoffice \\</span>
<span class="line">-v /data/docker/onlyoffice/db:/var/lib/postgresql  \\</span>
<span class="line">ung2thfc.mirror.aliyuncs.com/onlyoffice/documentserver</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候输入服务器ip:8090出现下面页面则部署成功</p><p>http://192.168.1.5:8090/</p><p>浏览器访问：http://192.168.1.5:8090/web-apps/apps/api/documents/api.js 你能看到以下页面就证明你的onlyoffice部署成功了。</p><p><img src="https://imgoss.xgss.net/picgo/image-20220322150844771.png?aliyun" alt="image-20220322150844771"></p><h2 id="使用-onlyoffice" tabindex="-1"><a class="header-anchor" href="#使用-onlyoffice"><span>使用 onlyoffice</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker exec onlyoffice sudo supervisorctl start ds:example</span>
<span class="line"></span>
<span class="line">docker exec onlyoffice sudo sed &#39;s,autostart=false,autostart=true,&#39; -i /etc/supervisor/conf.d/ds-example.conf</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>点击 GO TO TEST EXAMPLE 按钮</p><p><img src="http://imgoss.xgss.net/picgo/image-20210930133757212.png?aliyunoss" alt="image-20210930133757212"></p><p>可以上传一个文档</p><p>开始使用演示样本ONLYOFFICE文档编辑器,第一个基于html5的编辑。 　　你可以上传自己的文档进行测试使用“上传文件”按钮,选择必要的文件在你的电脑。</p><p><img src="http://imgoss.xgss.net/picgo/image-20210930133918697.png?aliyunoss" alt="image-20210930133918697"></p><p><img src="http://imgoss.xgss.net/picgo/image-20210930133941005.png?aliyunoss" alt="image-20210930133941005"></p><p>可实现多人编辑</p><p><img src="http://imgoss.xgss.net/picgo/image-20210930134224006.png?aliyunoss" alt="image-20210930134224006"></p><h2 id="onlyoffice报-download-failed错误处理" tabindex="-1"><a class="header-anchor" href="#onlyoffice报-download-failed错误处理"><span>onlyoffice报 download failed错误处理</span></a></h2><p>导入一个文档到onlyoffice里面，报错 download failed</p><p><img src="https://imgoss.xgss.net/picgo/image-20230530153819349.png?aliyun" alt="image-20230530153819349"></p><p>the document could not be saved please check connection settings or contact your administrator</p><p><img src="https://imgoss.xgss.net/picgo/image-20230530151105959.png?aliyun" alt="image-20230530151105959"></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 进入容器</span>
<span class="line"># docker exec -it onlyoffice /bin/bash</span>
<span class="line">root@a7df44eed360:/# </span>
<span class="line"></span>
<span class="line">打开</span>
<span class="line">/etc/onlyoffice/documentserver/default.json，向下找到 rejectUnauthorized 字段，将其值改为false。</span>
<span class="line"></span>
<span class="line"># cat /etc/onlyoffice/documentserver/default.json |grep rejectUnauthorized</span>
<span class="line">                                &quot;rejectUnauthorized&quot;: true</span>
<span class="line"># nano /etc/onlyoffice/documentserver/default.json</span>
<span class="line"></span>
<span class="line">按Ctrl+W，然后输入你要搜索的关键字，回车确定。这将会定位到第一个匹配的文本，接着可以用Alt+W来定位到下一个匹配的文本。</span>
<span class="line"></span>
<span class="line">使用Ctrl+O来保存所做的修改</span>
<span class="line"></span>
<span class="line">按Ctrl+X 保存</span>
<span class="line"></span>
<span class="line">如果你修改了文件，下面会询问你是否需要保存修改。输入Y确认保存，输入N不保存，按Ctrl+C取消返回。如果输入了Y，下一步会让你输入想要保存的文件名。如果不需要修改文件名直接回车就行；若想要保存成别的名字（也就是另存为）则输入新名称然后确 定。这个时候也可用Ctrl+C来取消返回。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启docker</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"> docker restart onlyoffice</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">==&gt; /var/log/onlyoffice/documentserver/docservice/out.log &lt;==</span>
<span class="line">[2023-05-30T07:30:53.367] [ERROR] nodeJS - postData error: docId = 192.168.1.251http___192.168.1.3_8090_example_files_192.168.1.251_new.pptx1685431845598;url = http://192.168.1.3:8090/example/track?filename=new.pptx&amp;useraddress=192.168.1.251;data = {&quot;key&quot;:&quot;192.168.1.251http___192.168.1.3_8090_example_files_192.168.1.251_new.pptx1685431845598&quot;,&quot;status&quot;:1,&quot;users&quot;:[&quot;uid-1&quot;],&quot;actions&quot;:[{&quot;type&quot;:1,&quot;userid&quot;:&quot;uid-1&quot;}]}</span>
<span class="line">Error: connect ETIMEDOUT 192.168.1.3:8090</span>
<span class="line">    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1107:14)</span>
<span class="line"></span>
<span class="line">==&gt; /var/log/onlyoffice/documentserver/converter/out.log &lt;==</span>
<span class="line">[2023-05-30T07:31:00.408] [ERROR] nodeJS - error downloadFile:url=http://192.168.1.3:8090/example/download?fileName=new.pptx&amp;useraddress=192.168.1.251;attempt=1;code:ETIMEDOUT;connect:null;(id=192.168.1.251http___192.168.1.3_8090_example_files_192.168.1.251_new.pptx1685431845598)</span>
<span class="line">Error: connect ETIMEDOUT 192.168.1.3:8090</span>
<span class="line">    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1107:14)</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="给onlyoffice导入字体" tabindex="-1"><a class="header-anchor" href="#给onlyoffice导入字体"><span>给onlyoffice导入字体</span></a></h2><p>win10系统提取中文字体的方法：控制面板——搜字体——查看安装的字体——再在搜索栏输入中文 2个字，这些就是需要的中文字体了。OO首次加载会比较慢，因为加载中文字体，一般达到50M以上。</p><p><img src="https://imgoss.xgss.net/picgo/image-20230529175531189.png?aliyun" alt="image-20230529175531189"></p><p>搜索中文</p><p><img src="https://imgoss.xgss.net/picgo/image-20230529175602973.png?aliyun" alt="image-20230529175602973"></p><p>清除字体</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># docker exec -it onlyoffice /bin/bash</span>
<span class="line">cd /var/www/onlyoffice/documentserver/core-fonts/</span>
<span class="line">ls</span>
<span class="line">rm -rf *</span>
<span class="line">ls</span>
<span class="line">cd /usr/share/fonts/</span>
<span class="line">rm -rf *</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>选择好自己要的字体，打包发送到onlyoffice容器里：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker cp ./fonts/ onlyoffice:/usr/share/fonts/truetype/custom</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>在docker容器里面执行：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># docker exec -it onlyoffice /bin/bash</span>
<span class="line">/usr/bin/documentserver-generate-allfonts.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>//将当前文件夹C:\\Users\\Administrator\\下的winfont文件夹内的字体全部拷贝到容器的文件夹/usr/share/fonts/truetype中</p>`,54)]))}const d=s(l,[["render",c]]),p=JSON.parse('{"path":"/kaiyuan/Open-Source-Software/Linux%E5%9F%BA%E4%BA%8EDocker%E9%83%A8%E7%BD%B2%E5%BC%80%E6%BA%90OnlyOffice.html","title":"Linux基于Docker部署开源OnlyOffice","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"kaiyuan/Open-Source-Software/Linux基于Docker部署开源OnlyOffice.md"}');export{d as comp,p as data};
