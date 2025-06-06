import{_ as s,c as n,b as a,o as i}from"./app-BEL8OELx.js";const l={};function d(p,e){return i(),n("div",null,e[0]||(e[0]=[a(`<h1 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose"><span>Docker Compose</span></a></h1><h2 id="compose-简介" tabindex="-1"><a class="header-anchor" href="#compose-简介"><span>Compose 简介</span></a></h2><p>Docker Compose 是 Docker 官方编排（Orchestration）项目之一，负责快速在集群中部署分布式应用。</p><p>Docker Compose 项目是 Docker 官方的开源项目，负责实现对 Docker 容器集群的快速编排。从功能上看，跟 OpenStack 中的 Heat 十分类似。其代码目前在 https://github.com/docker/compose 上开源。</p><p>在日常工作中，经常会碰到需要多个容器相互配合来完成某项任务的情况。例如要实现一个 Web 项目，除了 Web 服务容器本身，往往还需要再加上后端的数据库服务容器，甚至还包括负载均衡容器等。</p><p>Compose允许用户通过一个单独的 docker-compose.yml 模板文件（YAML 格式）来定义一组相关联的应用容器为一个项目（project）。</p><p>Compose 中有两个重要的概念： 服务 ( service )：一个应用的容器，实际上可以包括若干运行相同镜像的容器实例。 项目 ( project )：由一组关联的应用容器组成的一个完整业务单元，在 docker-compose.yml 文件中定义。</p><p>Docker for Mac 、 Docker for Windows 自带 docker-compose 二进制文件，安装 Docker 之 后可以直接使用。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">[www@node2 ~]$ docker-compose --version</span>
<span class="line">docker-compose version 1.19.0, build 9e633ef</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="compose-使用" tabindex="-1"><a class="header-anchor" href="#compose-使用"><span>Compose 使用</span></a></h2><h3 id="术语" tabindex="-1"><a class="header-anchor" href="#术语"><span>术语</span></a></h3><p>首先介绍几个术语。 服务 ( service )：一个应用容器，实际上可以运行多个相同镜像的实例。 项目 ( project )：由一组关联的应用容器组成的一个完整业务单元。 可见，一个项目可以由多个服务（容器）关联而成， Compose 面向项目进行管理。</p><h3 id="场景" tabindex="-1"><a class="header-anchor" href="#场景"><span>场景</span></a></h3><p>最常见的项目是 web 网站，该项目应该包含 web 应用和缓存。 下面我们用 Python 来建立一个能够记录页面访问次数的 web 网站。</p><p>1.web 应用 新建文件夹，在该目录中编写 app.py 文件</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">mkdir ~/python_web</span>
<span class="line">vi ~/python_web/app.py</span>
<span class="line">填写一下内容：</span>
<span class="line"></span>
<span class="line">from flask import Flask</span>
<span class="line">from redis import Redis</span>
<span class="line">app = Flask(__name__)</span>
<span class="line">redis = Redis(host=&#39;redis&#39;, port=6379)</span>
<span class="line">@app.route(&#39;/&#39;)</span>
<span class="line">def hello():</span>
<span class="line">count = redis.incr(&#39;hits&#39;)</span>
<span class="line">return &#39;Hello World! 该页面已被访问 {} 次。\\n&#39;.format(count)</span>
<span class="line">if __name__ == &quot;__main__&quot;:</span>
<span class="line">app.run(host=&quot;0.0.0.0&quot;, debug=True)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.编写 Dockerfile 文件，内容为</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">vi ~/python_web/Dockerfile</span>
<span class="line"></span>
<span class="line">FROM python:3.6-alpine</span>
<span class="line">ADD . /code</span>
<span class="line">WORKDIR /code</span>
<span class="line">RUN pip install redis flask</span>
<span class="line">CMD [&quot;python&quot;, &quot;app.py&quot;]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.编写 docker-compose.yml 文件 这个是 Compose 使用的主模板文件。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">vi ~/python_web/docker-compose.yml</span>
<span class="line"></span>
<span class="line">version: &#39;3&#39;</span>
<span class="line">services:</span>
<span class="line">web:</span>
<span class="line">build: .</span>
<span class="line">ports:</span>
<span class="line">	- &quot;5000:5000&quot;</span>
<span class="line">redis:</span>
<span class="line">image: &quot;redis:alpine&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4.运行 compose 项目</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ docker-compose up</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>报错：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">[www@node2 ~]$ cd python_web/</span>
<span class="line">[www@node2 python_web]$ docker-compose up</span>
<span class="line">ERROR: In file &#39;./docker-compose.yml&#39;, service must be a mapping, not a NoneType.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="一般步骤" tabindex="-1"><a class="header-anchor" href="#一般步骤"><span>一般步骤</span></a></h3><p>1、定义Dockerfile，方便迁移到任何地方； 2、编写docker-compose.yml文件； 3、运行<code>docker-compose up</code> 启动服务</p><p>1.准备工作：提前下载好镜像：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker pull mysql </span>
<span class="line">docker pull wordpress</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>2.需要新建一个空白目录，例如wptest。新建一个docker-compose.yml</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">version: &#39;2&#39;</span>
<span class="line">services:</span>
<span class="line">    web: </span>
<span class="line">      image: wordpress:latest </span>
<span class="line">      links: </span>
<span class="line">        - db</span>
<span class="line">      ports: </span>
<span class="line">        - &quot;8002:80&quot;</span>
<span class="line">      environment:</span>
<span class="line">        WORDPRESS_DB_HOST: db:3306</span>
<span class="line">        WORDPRESS_DB_PASSWORD: 123456</span>
<span class="line">    db: </span>
<span class="line">      image: mysql </span>
<span class="line">      environment: </span>
<span class="line">        - MYSQL_ROOT_PASSWORD=123456</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.以上命令的意思是新建db和wordpress容器。等同于：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ docker run --name db -e MYSQL_ROOT_PASSWORD=123456 -d mysql</span>
<span class="line">$ docker run --name some-wordpress --link db:mysql -p 8002:80 -d wordpress</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>4.好，我们启动应用：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ docker-compose up -d  #后台运行，</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker-compose  ps #命令查看状态</span>
<span class="line">docker-compose  logs #查看日志</span>
<span class="line">docker-compose stop #停止</span>
<span class="line">docker-compose restart # 重启</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,36)]))}const c=s(l,[["render",d]]),o=JSON.parse('{"path":"/docker/Docker%E7%B3%BB%E5%88%97%E6%95%99%E7%A8%8B9-DockerCompose%E7%BC%96%E6%8E%92.html","title":"Docker Compose","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"docker/Docker系列教程9-DockerCompose编排.md"}');export{c as comp,o as data};
