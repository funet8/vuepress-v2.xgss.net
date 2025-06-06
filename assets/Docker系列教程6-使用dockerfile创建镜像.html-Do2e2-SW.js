import{_ as s,c as n,b as a,o as i}from"./app-BEL8OELx.js";const l={};function d(r,e){return i(),n("div",null,e[0]||(e[0]=[a(`<h1 id="使用dockerfile创建镜像" tabindex="-1"><a class="header-anchor" href="#使用dockerfile创建镜像"><span>使用dockerfile创建镜像</span></a></h1><h2 id="_1-克隆-dockerfile" tabindex="-1"><a class="header-anchor" href="#_1-克隆-dockerfile"><span>1.克隆 dockerfile</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">yum install git</span>
<span class="line">git clone https://gitee.com/funet8/docker-training.git</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-进入相应目录构建进行" tabindex="-1"><a class="header-anchor" href="#_2-进入相应目录构建进行"><span>2.进入相应目录构建进行</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">cd docker-training/centos7</span>
<span class="line"># ls</span>
<span class="line">aliyun-epel.repo  aliyun-mirror.repo  Dockerfile  supervisord.conf</span>
<span class="line">构建镜像:</span>
<span class="line">docker build -t  funet8/centos:7.2 .</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-运行容器" tabindex="-1"><a class="header-anchor" href="#_3-运行容器"><span>3.运行容器</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># docker run -itd -p 60921:22 --name FCentos  funet8/centos:7.2</span>
<span class="line"></span>
<span class="line"># docker run -itd  --name FCentos3 funet8/centos:7.2</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"># docker ps</span>
<span class="line">CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                   NAMES</span>
<span class="line">5da308c6f987        funet8/centos:7.2   &quot;/usr/bin/supervisord&quot;   11 minutes ago      Up 11 minutes       0.0.0.0:60921-&gt;22/tcp   FCentos</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-进入容器" tabindex="-1"><a class="header-anchor" href="#_4-进入容器"><span>4.进入容器</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># docker exec -it FCentos /bin/bash</span>
<span class="line">[root@5da308c6f987 /]# </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="构建mysql镜像和容器" tabindex="-1"><a class="header-anchor" href="#构建mysql镜像和容器"><span>构建mysql镜像和容器</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">cd docker-training/mysql/</span>
<span class="line"></span>
<span class="line">构建mariadb镜像:</span>
<span class="line">docker build -t  funet8/centos_mariadb .</span>
<span class="line">启动镜像：</span>
<span class="line">docker run -itd -p 60920:3306 --name Mariadb1 funet8/centos_mariadb</span>
<span class="line">docker run -itd -p 60922:3306 --name Mariadb2 -v /data/mysql:/var/lib/mysql  funet8/centos_mariadb</span>
<span class="line">进入容器：</span>
<span class="line">docker exec -it Mariadb1 /bin/bash</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11)]))}const t=s(l,[["render",d]]),p=JSON.parse('{"path":"/docker/Docker%E7%B3%BB%E5%88%97%E6%95%99%E7%A8%8B6-%E4%BD%BF%E7%94%A8dockerfile%E5%88%9B%E5%BB%BA%E9%95%9C%E5%83%8F.html","title":"使用dockerfile创建镜像","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"docker/Docker系列教程6-使用dockerfile创建镜像.md"}');export{t as comp,p as data};
