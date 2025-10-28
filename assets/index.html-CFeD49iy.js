import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as e}from"./app-BiQR_lPj.js";const l={};function p(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h1 id="_3-基于centos7的jenkins安卓自动打包" tabindex="-1"><a class="header-anchor" href="#_3-基于centos7的jenkins安卓自动打包"><span>3.基于centos7的jenkins安卓自动打包</span></a></h1><p>安装完成需要准备以下</p><p>在CentOS 7下构建安卓Android编译环境</p><p>安装jenkins</p><p>最后一步来自动or手动打包</p><p>需要在资料</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>1.jenkins项目名：安卓自动打包-小游戏-GameDev-Android-SDK</span></span>
<span class="line"><span>2.钉钉群助手</span></span>
<span class="line"><span>钉钉群-群设置-智能群助手，添加机器人：https://help.aliyun.com/document_detail/153691.html</span></span>
<span class="line"><span>获取：</span></span>
<span class="line"><span>https://oapi.dingtalk.com/robot/send?access_token=XXXXXXXX</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3.Git仓库：  git@192.168.1.9:wxgame/GameDev-Android-SDK.git</span></span>
<span class="line"><span></span></span>
<span class="line"><span>目录： /data/android/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>手动操作：</p><h2 id="_1-拉取git仓库" tabindex="-1"><a class="header-anchor" href="#_1-拉取git仓库"><span>1.拉取git仓库</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># cd /data/android/</span></span>
<span class="line"><span># git clone git@192.168.1.9:wxgame/GameDev-Android-SDK.git</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-打包" tabindex="-1"><a class="header-anchor" href="#_2-打包"><span>2.打包</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># cd GameDev-Android-SDK/Android   #研发的安卓项目放在Android目录中</span></span>
<span class="line"><span># ls</span></span>
<span class="line"><span>build.gradle  gradle  gradle.properties  gradlew  gradlew.bat  launcher  local.properties  settings.gradle  unityLibrary</span></span>
<span class="line"><span># chmod +x gradlew</span></span>
<span class="line"><span>打包命令：</span></span>
<span class="line"><span>./gradlew :launcher:assembleRelease</span></span>
<span class="line"><span>如果没有报错</span></span>
<span class="line"><span>完成后，编译好的 apk 文件位于 launcher/build/outputs/apk/release  路径下。</span></span>
<span class="line"><span>如果有报错，则调试错误。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-写shell脚本" tabindex="-1"><a class="header-anchor" href="#_3-写shell脚本"><span>3.写shell脚本</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vim /data/android/GameDev-Android-SDK.sh</span></span>
<span class="line"><span>chmod +x /data/android/GameDev-Android-SDK.sh</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span>############################################################</span></span>
<span class="line"><span>#名字：	GameDev-Android-SDK.sh</span></span>
<span class="line"><span># vim /data/android/GameDev-Android-SDK.sh</span></span>
<span class="line"><span># chmod +x /data/android/GameDev-Android-SDK.sh</span></span>
<span class="line"><span>#功能：	安卓自动打包</span></span>
<span class="line"><span>#作者：	star</span></span>
<span class="line"><span>#邮件：	star@funet8.com</span></span>
<span class="line"><span>#时间：      2021/08/18</span></span>
<span class="line"><span>#Version 1.0</span></span>
<span class="line"><span>###########################################################</span></span>
<span class="line"><span># 克隆项目</span></span>
<span class="line"><span># cd /data/android/</span></span>
<span class="line"><span># git clone git@192.168.1.9:wxgame/GameDev-Android-SDK.git</span></span>
<span class="line"><span></span></span>
<span class="line"><span>NowTime=\`date +%Y%m%d-%H:%M:%S\`</span></span>
<span class="line"><span>Git_Name=&#39;GameDev-Android-SDK&#39;</span></span>
<span class="line"><span>Git_Path=&#39;/data/android/GameDev-Android-SDK&#39;</span></span>
<span class="line"><span>WebSite_Path=&#39;/data/wwwroot/web/android.7477.ltd&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#进入项目拉取最新代码并且打包</span></span>
<span class="line"><span>cd $Git_Path</span></span>
<span class="line"><span>git checkout master</span></span>
<span class="line"><span>git pull</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cd $Git_Path/Android</span></span>
<span class="line"><span>chmod +x gradlew</span></span>
<span class="line"><span>./gradlew clean</span></span>
<span class="line"><span>./gradlew :launcher:assembleRelease</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#拷贝apk包到站点下</span></span>
<span class="line"><span>cp $Git_Path/Android/launcher/build/outputs/apk/release/launcher-release.apk $WebSite_Path/$Git_Name-$NowTime.apk</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#删除15天前的文件</span></span>
<span class="line"><span>find $WebSite_Path -type f -mtime +15 -exec rm -f {} \\;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="jenkins后台配置" tabindex="-1"><a class="header-anchor" href="#jenkins后台配置"><span>jenkins后台配置</span></a></h1><h2 id="_1-新建任务" tabindex="-1"><a class="header-anchor" href="#_1-新建任务"><span>1.新建任务</span></a></h2><p><img src="http://imgoss.xgss.net/picgo/image-20210818175813206.png?aliyunoss" alt="image-20210818175813206"></p><h2 id="_2-输入名称" tabindex="-1"><a class="header-anchor" href="#_2-输入名称"><span>2.输入名称</span></a></h2><p>构建一个自由风格的软件项目</p><p><img src="http://imgoss.xgss.net/picgo/image-20210818175929242.png?aliyunoss" alt="image-20210818175929242"></p><p><img src="http://imgoss.xgss.net/picgo/image-20210818180659057.png?aliyunoss" alt="image-20210818180659057"></p><p><img src="http://imgoss.xgss.net/picgo/image-20210818180724086.png?aliyunoss" alt="image-20210818180724086"></p><h2 id="执行成功后钉钉通知" tabindex="-1"><a class="header-anchor" href="#执行成功后钉钉通知"><span>执行成功后钉钉通知</span></a></h2><p><img src="http://imgoss.xgss.net/picgo/image-20210818180803508.png?aliyunoss" alt="image-20210818180803508"></p>`,24)]))}const t=n(l,[["render",p]]),m=JSON.parse('{"path":"/article/08lg2xns/","title":"3.Centos7-Android-jenkins","lang":"en-US","frontmatter":{"title":"3.Centos7-Android-jenkins","createTime":"2025/05/27 17:51:17","permalink":"/article/08lg2xns/"},"git":{"createdTime":1749111496000,"updatedTime":1750129445000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":2,"url":"https://github.com/star"}]},"readingTime":{"minutes":1.4,"words":419},"filePathRelative":"kaiyuan/android/3.Centos7-Android-jenkins.md"}');export{t as comp,m as data};
