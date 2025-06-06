import{_ as n,c as a,b as e,o as i}from"./app-BEL8OELx.js";const l={};function d(c,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="_3-基于centos7的jenkins安卓自动打包" tabindex="-1"><a class="header-anchor" href="#_3-基于centos7的jenkins安卓自动打包"><span>3.基于centos7的jenkins安卓自动打包</span></a></h1><p>安装完成需要准备以下</p><p>在CentOS 7下构建安卓Android编译环境</p><p>安装jenkins</p><p>最后一步来自动or手动打包</p><p>需要在资料</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">1.jenkins项目名：安卓自动打包-小游戏-GameDev-Android-SDK</span>
<span class="line">2.钉钉群助手</span>
<span class="line">钉钉群-群设置-智能群助手，添加机器人：https://help.aliyun.com/document_detail/153691.html</span>
<span class="line">获取：</span>
<span class="line">https://oapi.dingtalk.com/robot/send?access_token=XXXXXXXX</span>
<span class="line"></span>
<span class="line">3.Git仓库：  git@192.168.1.9:wxgame/GameDev-Android-SDK.git</span>
<span class="line"></span>
<span class="line">目录： /data/android/</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>手动操作：</p><h2 id="_1-拉取git仓库" tabindex="-1"><a class="header-anchor" href="#_1-拉取git仓库"><span>1.拉取git仓库</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># cd /data/android/</span>
<span class="line"># git clone git@192.168.1.9:wxgame/GameDev-Android-SDK.git</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-打包" tabindex="-1"><a class="header-anchor" href="#_2-打包"><span>2.打包</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># cd GameDev-Android-SDK/Android   #研发的安卓项目放在Android目录中</span>
<span class="line"># ls</span>
<span class="line">build.gradle  gradle  gradle.properties  gradlew  gradlew.bat  launcher  local.properties  settings.gradle  unityLibrary</span>
<span class="line"># chmod +x gradlew</span>
<span class="line">打包命令：</span>
<span class="line">./gradlew :launcher:assembleRelease</span>
<span class="line">如果没有报错</span>
<span class="line">完成后，编译好的 apk 文件位于 launcher/build/outputs/apk/release  路径下。</span>
<span class="line">如果有报错，则调试错误。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-写shell脚本" tabindex="-1"><a class="header-anchor" href="#_3-写shell脚本"><span>3.写shell脚本</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">vim /data/android/GameDev-Android-SDK.sh</span>
<span class="line">chmod +x /data/android/GameDev-Android-SDK.sh</span>
<span class="line"></span>
<span class="line">#!/bin/bash</span>
<span class="line">############################################################</span>
<span class="line">#名字：	GameDev-Android-SDK.sh</span>
<span class="line"># vim /data/android/GameDev-Android-SDK.sh</span>
<span class="line"># chmod +x /data/android/GameDev-Android-SDK.sh</span>
<span class="line">#功能：	安卓自动打包</span>
<span class="line">#作者：	star</span>
<span class="line">#邮件：	star@funet8.com</span>
<span class="line">#时间：      2021/08/18</span>
<span class="line">#Version 1.0</span>
<span class="line">###########################################################</span>
<span class="line"># 克隆项目</span>
<span class="line"># cd /data/android/</span>
<span class="line"># git clone git@192.168.1.9:wxgame/GameDev-Android-SDK.git</span>
<span class="line"></span>
<span class="line">NowTime=\`date +%Y%m%d-%H:%M:%S\`</span>
<span class="line">Git_Name=&#39;GameDev-Android-SDK&#39;</span>
<span class="line">Git_Path=&#39;/data/android/GameDev-Android-SDK&#39;</span>
<span class="line">WebSite_Path=&#39;/data/wwwroot/web/android.7477.ltd&#39;</span>
<span class="line"></span>
<span class="line">#进入项目拉取最新代码并且打包</span>
<span class="line">cd $Git_Path</span>
<span class="line">git checkout master</span>
<span class="line">git pull</span>
<span class="line"></span>
<span class="line">cd $Git_Path/Android</span>
<span class="line">chmod +x gradlew</span>
<span class="line">./gradlew clean</span>
<span class="line">./gradlew :launcher:assembleRelease</span>
<span class="line"></span>
<span class="line">#拷贝apk包到站点下</span>
<span class="line">cp $Git_Path/Android/launcher/build/outputs/apk/release/launcher-release.apk $WebSite_Path/$Git_Name-$NowTime.apk</span>
<span class="line"></span>
<span class="line">#删除15天前的文件</span>
<span class="line">find $WebSite_Path -type f -mtime +15 -exec rm -f {} \\;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="jenkins后台配置" tabindex="-1"><a class="header-anchor" href="#jenkins后台配置"><span>jenkins后台配置</span></a></h1><h2 id="_1-新建任务" tabindex="-1"><a class="header-anchor" href="#_1-新建任务"><span>1.新建任务</span></a></h2><p><img src="http://imgoss.xgss.net/picgo/image-20210818175813206.png?aliyunoss" alt="image-20210818175813206"></p><h2 id="_2-输入名称" tabindex="-1"><a class="header-anchor" href="#_2-输入名称"><span>2.输入名称</span></a></h2><p>构建一个自由风格的软件项目</p><p><img src="http://imgoss.xgss.net/picgo/image-20210818175929242.png?aliyunoss" alt="image-20210818175929242"></p><p><img src="http://imgoss.xgss.net/picgo/image-20210818180659057.png?aliyunoss" alt="image-20210818180659057"></p><p><img src="http://imgoss.xgss.net/picgo/image-20210818180724086.png?aliyunoss" alt="image-20210818180724086"></p><h2 id="执行成功后钉钉通知" tabindex="-1"><a class="header-anchor" href="#执行成功后钉钉通知"><span>执行成功后钉钉通知</span></a></h2><p><img src="http://imgoss.xgss.net/picgo/image-20210818180803508.png?aliyunoss" alt="image-20210818180803508"></p>`,24)]))}const p=n(l,[["render",d]]),t=JSON.parse('{"path":"/kaiyuan/android/3.Centos7-Android-jenkins.html","title":"3.基于centos7的jenkins安卓自动打包","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"kaiyuan/android/3.Centos7-Android-jenkins.md"}');export{p as comp,t as data};
