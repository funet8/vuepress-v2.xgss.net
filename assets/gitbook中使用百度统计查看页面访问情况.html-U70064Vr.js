import{_ as n,c as e,b as a,o as i}from"./app-BEL8OELx.js";const t={};function l(d,s){return i(),e("div",null,s[0]||(s[0]=[a(`<h1 id="gitbook中使用百度统计查看页面访问情况" tabindex="-1"><a class="header-anchor" href="#gitbook中使用百度统计查看页面访问情况"><span>gitbook中使用百度统计查看页面访问情况</span></a></h1><h2 id="安装baidu-tongji" tabindex="-1"><a class="header-anchor" href="#安装baidu-tongji"><span>安装baidu-tongji</span></a></h2><p>在配置文件book.json中添加</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">{</span>
<span class="line">    &quot;plugin&quot;: [&quot;baidu-tongji&quot;]</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">gitbook install</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>登录百度统计官网，注册或者登录</p><p><img src="https://imgoss.xgss.net/picgo/image-20220429111443738.png?aliyun" alt="image-20220429111443738"></p><p>[新增网站]后，点击[获取代码]，获取以下类似代码：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;script&gt;</span>
<span class="line">var _hmt = _hmt || [];</span>
<span class="line">(function() {</span>
<span class="line">  var hm = document.createElement(&quot;script&quot;);</span>
<span class="line">  hm.src = &quot;https://hm.baidu.com/hm.js?559562c6410b9fd49a0afe52650d40bd&quot;;</span>
<span class="line">  var s = document.getElementsByTagName(&quot;script&quot;)[0]; </span>
<span class="line">  s.parentNode.insertBefore(hm, s);</span>
<span class="line">})();</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将步骤一获取代码自动生成的token(即&quot;559562c6410b9fd49a0afe52650d40bd&quot;)添加到配置文件</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">{</span>
<span class="line">    &quot;plugin&quot;: [&quot;baidu-tongji&quot;],</span>
<span class="line">    &quot;pluginsConfig&quot;: {</span>
<span class="line">        &quot;baidu-tongji&quot;: {</span>
<span class="line">            &quot;token&quot;: &quot;559562c6410b9fd49a0afe52650d40bd&quot;</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>https://github.com/huisman6/gitbook-plugin-baidu-tongji</p>`,13)]))}const r=n(t,[["render",l]]),p=JSON.parse('{"path":"/web/gitbook%E4%B8%AD%E4%BD%BF%E7%94%A8%E7%99%BE%E5%BA%A6%E7%BB%9F%E8%AE%A1%E6%9F%A5%E7%9C%8B%E9%A1%B5%E9%9D%A2%E8%AE%BF%E9%97%AE%E6%83%85%E5%86%B5.html","title":"gitbook中使用百度统计查看页面访问情况","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"web/gitbook中使用百度统计查看页面访问情况.md"}');export{r as comp,p as data};
