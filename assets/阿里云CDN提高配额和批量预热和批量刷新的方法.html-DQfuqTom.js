import{_ as n,c as e,b as a,o as i}from"./app-BEL8OELx.js";const l={};function c(p,s){return i(),e("div",null,s[0]||(s[0]=[a(`<h1 id="阿里云cdn提高配额和批量预热和批量刷新的方法" tabindex="-1"><a class="header-anchor" href="#阿里云cdn提高配额和批量预热和批量刷新的方法"><span>阿里云CDN提高配额和批量预热和批量刷新的方法</span></a></h1><h2 id="提高url刷新和预热的配额" tabindex="-1"><a class="header-anchor" href="#提高url刷新和预热的配额"><span>提高URL刷新和预热的配额</span></a></h2><p>今天遇到两个问题阿里云刷新预热的配额问题：</p><p>每日配额上限：URL刷新10000条，URL预热2500条，目录刷新100条。</p><p><img src="https://imgoss.xgss.net/picgo/image-20230809144348447.png?aliyun" alt="image-20230809144348447"></p><p>https://help.aliyun.com/zh/cdn/user-guide/quota-management</p><ol><li><p>登录<a href="https://quotas.console.aliyun.com/products" target="_blank" rel="noopener noreferrer">配额中心</a>。</p></li><li><p>在左侧导航栏，选择****产品列表** &gt; *<em>通用配额*</em>**。</p></li><li><p>在<strong>通用配额产品列表</strong>页面，<strong>产品类目</strong>下拉框里选择<strong>视频与CDN</strong>。</p></li><li><p>单击</p><p>CDN</p><p>进入产品配额申请页面，您可以根据需要完成如下操作：</p><ul><li><strong>配额申请</strong>：详细配额申请方法，请参考<a href="https://help.aliyun.com/document_detail/200127.html#task-2035549" target="_blank" rel="noopener noreferrer">创建配额提升申请</a>。</li><li><strong>申请历史</strong>：如何查看申请历史，请参考<a href="https://help.aliyun.com/document_detail/200127.html#task-2035549" target="_blank" rel="noopener noreferrer">查看配额申请历史</a>。</li><li><strong>创建告警</strong>：详细创建告警方法，请参考<a href="https://help.aliyun.com/document_detail/185164.html#task-1957284" target="_blank" rel="noopener noreferrer">创建配额告警</a>。</li><li><strong>告警项</strong>：如何查询已经创建的告警项，请参考<a href="https://help.aliyun.com/document_detail/188444.html#task-1989365" target="_blank" rel="noopener noreferrer">查询配额告警列表及其详情</a>。</li></ul></li></ol><p>提交申请</p><p><img src="https://imgoss.xgss.net/picgo/image-20230809144656663.png?aliyun" alt="image-20230809144656663"></p><p>申请之后的</p><p><img src="https://imgoss.xgss.net/picgo/image-20230809144604727.png?aliyun" alt="image-20230809144604727"></p><h2 id="批量预热和批量刷新的方法" tabindex="-1"><a class="header-anchor" href="#批量预热和批量刷新的方法"><span>批量预热和批量刷新的方法</span></a></h2><p>大概15000 的链接需要预热,如何批量预热。</p><p>https://help.aliyun.com/zh/cdn/developer-reference/run-scripts-to-refresh-and-prefetch-content</p><h3 id="安装python" tabindex="-1"><a class="header-anchor" href="#安装python"><span>安装Python</span></a></h3><p>本机已经安装了</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">Administrator@star-win11 MINGW64 /e/360data/重要数据/桌面</span>
<span class="line">$ python.exe --version</span>
<span class="line">Python 3.10.2</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装阿里云核心包" tabindex="-1"><a class="header-anchor" href="#安装阿里云核心包"><span>安装阿里云核心包</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">pip install aliyun-python-sdk-cdn</span>
<span class="line">pip install aliyun-python-sdk-core</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>将如下代码保存为Refresh.py脚本。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">#!/usr/bin/env python3</span>
<span class="line"># coding=utf-8</span>
<span class="line"># __author__ = &#39;hanli.zyb&#39;</span>
<span class="line"># __date__ = &#39;2021-04-23&#39;</span>
<span class="line"></span>
<span class="line">&#39;&#39;&#39;Check Package&#39;&#39;&#39;</span>
<span class="line"></span>
<span class="line">try:</span>
<span class="line">    import os, re, sys, getopt, time, json, logging</span>
<span class="line">    from aliyunsdkcore.client import AcsClient</span>
<span class="line">    from aliyunsdkcore.acs_exception.exceptions import ClientException</span>
<span class="line">    from aliyunsdkcore.acs_exception.exceptions import ServerException</span>
<span class="line">    from aliyunsdkcdn.request.v20180510.RefreshObjectCachesRequest import RefreshObjectCachesRequest</span>
<span class="line">    from aliyunsdkcdn.request.v20180510.PushObjectCacheRequest import PushObjectCacheRequest</span>
<span class="line">    from aliyunsdkcdn.request.v20180510.DescribeRefreshTasksRequest import DescribeRefreshTasksRequest</span>
<span class="line">    from aliyunsdkcdn.request.v20180510.DescribeRefreshQuotaRequest import DescribeRefreshQuotaRequest</span>
<span class="line">except:</span>
<span class="line">    sys.exit(&quot;[error] Please pip install aliyun-python-sdk-cdn and aliyun-python-sdk-core and logging，please install now......&quot;)</span>
<span class="line">logging.basicConfig(level=logging.DEBUG, filename=&#39;./RefreshAndPredload.log&#39;)</span>
<span class="line"></span>
<span class="line">class Envariable(object):</span>
<span class="line">    LISTS = []</span>
<span class="line">    REGION = &#39;cn-zhangzhou&#39;</span>
<span class="line">    AK = None</span>
<span class="line">    SK = None</span>
<span class="line">    FD = None</span>
<span class="line">    CLI = None</span>
<span class="line">    TASK_TYPE = None</span>
<span class="line">    TASK_AREA = None</span>
<span class="line">    TASK_OTYPE = None</span>
<span class="line"></span>
<span class="line">    def set_ak(ak):</span>
<span class="line">        Envariable.AK = ak</span>
<span class="line"></span>
<span class="line">    def get_ak():</span>
<span class="line">        return Envariable.AK</span>
<span class="line"></span>
<span class="line">    def set_sk(sk):</span>
<span class="line">        Envariable.SK = sk</span>
<span class="line"></span>
<span class="line">    def get_sk():</span>
<span class="line">        return Envariable.SK</span>
<span class="line"></span>
<span class="line">    def set_fd(fd):</span>
<span class="line">        Envariable.FD = fd</span>
<span class="line"></span>
<span class="line">    def get_fd():</span>
<span class="line">        return Envariable.FD</span>
<span class="line"></span>
<span class="line">    def set_task_type(task_type):</span>
<span class="line">        Envariable.TASK_TYPE = task_type</span>
<span class="line"></span>
<span class="line">    def get_task_type():</span>
<span class="line">        return Envariable.TASK_TYPE</span>
<span class="line"></span>
<span class="line">    def set_task_area(task_area):</span>
<span class="line">        Envariable.TASK_AREA = task_area</span>
<span class="line"></span>
<span class="line">    def get_task_area():</span>
<span class="line">        return Envariable.TASK_AREA</span>
<span class="line"></span>
<span class="line">    def set_task_otype(task_otype):</span>
<span class="line">        Envariable.TASK_OTYPE = task_otype</span>
<span class="line"></span>
<span class="line">    def get_task_otype():</span>
<span class="line">        return Envariable.TASK_OTYPE</span>
<span class="line"></span>
<span class="line">    def set_acs_client():</span>
<span class="line">        Envariable.CLI = AcsClient(Envariable.get_ak(), Envariable.get_sk(), Envariable.REGION)</span>
<span class="line"></span>
<span class="line">    def get_acs_client():</span>
<span class="line">        return Envariable.CLI</span>
<span class="line"></span>
<span class="line">class InitHandler(object):</span>
<span class="line">    def __init__(self,ak,sk,region):</span>
<span class="line">        try:</span>
<span class="line">            self.client = AcsClient(self,Envariable.get_ak(),Envariable.get_sk(),Envariable.REGION)</span>
<span class="line">        except Exception:</span>
<span class="line">            logging.info(&quot;[error]: initial AcsClient failed&quot;) and exit(1)</span>
<span class="line"></span>
<span class="line">class BaseCheck(object):</span>
<span class="line"></span>
<span class="line">    def __init__(self):</span>
<span class="line">        self.invalidurl = &#39;&#39;</span>
<span class="line">        self.lines = 0</span>
<span class="line">        self.urllist = Envariable.get_fd()</span>
<span class="line"></span>
<span class="line">    def printQuota(self):</span>
<span class="line"></span>
<span class="line">        try:</span>
<span class="line">            if Envariable.get_acs_client():</span>
<span class="line">                client = Envariable.get_acs_client()</span>
<span class="line">            else:</span>
<span class="line">                Envariable.set_acs_client()</span>
<span class="line">                client = Envariable.get_acs_client()</span>
<span class="line">            quotas = DescribeRefreshQuotaRequest()</span>
<span class="line">            quotaResp = json.loads(Envariable.get_acs_client().do_action_with_exception(quotas))</span>
<span class="line">        except Exception as e:</span>
<span class="line">            logging.info(&quot;\\n[error]: initial AcsClient failed\\n&quot;) and sys.exit(1)</span>
<span class="line"></span>
<span class="line">        if Envariable.TASK_TYPE:</span>
<span class="line">            if Envariable.TASK_TYPE == &#39;push&#39;:</span>
<span class="line">                if self.lines &gt; int(quotaResp[&#39;PreloadRemain&#39;]):</span>
<span class="line">                    sys.exit(&quot;\\n[error]：PreloadRemain is not enough {0}&quot;.format(quotaResp[&#39;PreloadRemain&#39;]))</span>
<span class="line">                return True</span>
<span class="line">            if Envariable.TASK_TYPE == &#39;clear&#39;:</span>
<span class="line">                if Envariable.get_task_otype() == &#39;File&#39; and self.lines &gt; int(quotaResp[&#39;UrlRemain&#39;]):</span>
<span class="line">                    sys.exit(&quot;\\n[error]：UrlRemain is not enough {0}&quot;.format(quotaResp[&#39;UrlRemain&#39;]))</span>
<span class="line">                elif Envariable.get_task_otype() == &#39;Directory&#39; and self.lines &gt; int(quotaResp[&#39;DirRemain&#39;]):</span>
<span class="line">                    sys.exit(&quot;\\n[error]：DirRemain is not enough {0}&quot;.format(quotaResp[&#39;DirRemain&#39;]))</span>
<span class="line">                else:</span>
<span class="line">                    return True</span>
<span class="line"></span>
<span class="line">    def urlFormat(self):</span>
<span class="line">        with open(self.urllist, &quot;r&quot;) as f:</span>
<span class="line">            for line in f.readlines():</span>
<span class="line">                self.lines += 1</span>
<span class="line">                if not re.match(r&#39;^((https)|(http))&#39;,line):</span>
<span class="line">                    self.invalidurl = line + &#39;\\n&#39; + self.invalidurl</span>
<span class="line">            if self.invalidurl != &#39;&#39;:</span>
<span class="line">                sys.exit(&quot;\\n[error]: URL format is illegal \\n{0}&quot;.format(self.invalidurl))</span>
<span class="line">            return True</span>
<span class="line"></span>
<span class="line">class doTask(object):</span>
<span class="line"></span>
<span class="line">    def urlencode_pl(inputs_str):</span>
<span class="line">        len_str = len(inputs_str)</span>
<span class="line">        if str == &quot;&quot; or len_str &lt;= 0:</span>
<span class="line">            return &quot;&quot;</span>
<span class="line">        index_j = 0</span>
<span class="line">        index_i = 0</span>
<span class="line">        result_end = &quot;&quot;</span>
<span class="line">        for index_i in range(0, len_str):</span>
<span class="line">            index_sb = index_i + 1</span>
<span class="line">            chs = inputs_str[index_i:index_sb]</span>
<span class="line">            if (chs &gt;= &#39;A&#39; and chs &lt;= &#39;Z&#39;) or (chs &gt;= &#39;a&#39; and chs &lt;= &#39;z&#39;) or (chs &gt;= &#39;0&#39; and chs &lt;= &#39;9&#39;) or (</span>
<span class="line">                    chs == &quot;:&quot;) or (chs == &quot;/&quot;):</span>
<span class="line">                if result_end == &quot;&quot;:</span>
<span class="line">                    result_end = chs</span>
<span class="line">                else:</span>
<span class="line">                    result_end += chs</span>
<span class="line">            elif chs == &#39; &#39;:</span>
<span class="line">                result_end += &#39;+&#39;</span>
<span class="line">            elif chs == &#39;.&#39; or chs == &#39;-&#39; or chs == &#39;_&#39; or chs == &#39;*&#39;:</span>
<span class="line">                result_end += chs</span>
<span class="line">            else:</span>
<span class="line">                result_end = &#39;%s%%%02X&#39; % (result_end, ord(chs))</span>
<span class="line"></span>
<span class="line">        return result_end</span>
<span class="line"></span>
<span class="line">    def doProd(self):</span>
<span class="line">        gop = 100</span>
<span class="line">        mins = 1</span>
<span class="line">        maxs = gop</span>
<span class="line">        with open(Envariable.get_fd(), &quot;r&quot;) as f:</span>
<span class="line">            for line in f.readlines():</span>
<span class="line">                if mins != maxs:</span>
<span class="line">                    line = line.strip(&quot;\\n&quot;) + &quot;\\n&quot;</span>
<span class="line">                else:</span>
<span class="line">                    line = line.strip(&quot;\\n&quot;)</span>
<span class="line">                line = line.strip()</span>
<span class="line">                line = doTask.urlencode_pl(line) + &quot;\\n&quot;</span>
<span class="line">                Envariable.LISTS.append(line)</span>
<span class="line">                if mins &gt;= maxs:</span>
<span class="line">                    yield Envariable.LISTS</span>
<span class="line">                    mins = maxs</span>
<span class="line">                    maxs = gop + maxs - 1</span>
<span class="line">                else:</span>
<span class="line">                    mins += 1</span>
<span class="line">            if len(Envariable.LISTS) &gt; 0: yield Envariable.LISTS</span>
<span class="line"></span>
<span class="line">    def doRefresh(lists):</span>
<span class="line">        try:</span>
<span class="line">            if Envariable.get_acs_client():</span>
<span class="line">                client = Envariable.get_acs_client()</span>
<span class="line">            else:</span>
<span class="line">                Envariable.set_acs_client()</span>
<span class="line">                client = Envariable.get_acs_client()</span>
<span class="line">            if Envariable.get_task_type() == &#39;clear&#39;:</span>
<span class="line">                taskID = &#39;RefreshTaskId&#39;</span>
<span class="line">                request = RefreshObjectCachesRequest()</span>
<span class="line">                if Envariable.get_task_otype():</span>
<span class="line">                    request.set_ObjectType(Envariable.get_task_otype())</span>
<span class="line">            elif Envariable.get_task_type() == &#39;push&#39;:</span>
<span class="line">                taskID = &#39;PushTaskId&#39;</span>
<span class="line">                request = PushObjectCacheRequest()</span>
<span class="line">                if Envariable.get_task_area():</span>
<span class="line">                    request.set_Area(Envariable.get_task_area())</span>
<span class="line">            taskreq = DescribeRefreshTasksRequest()</span>
<span class="line">            request.set_accept_format(&#39;json&#39;)</span>
<span class="line">            request.set_ObjectPath(lists)</span>
<span class="line">            response = json.loads(client.do_action_with_exception(request))</span>
<span class="line">            print(response)</span>
<span class="line">            timeout = 0</span>
<span class="line">            while True:</span>
<span class="line">                count = 0</span>
<span class="line">                taskreq.set_accept_format(&#39;json&#39;)</span>
<span class="line">                taskreq.set_TaskId(int(response[taskID]))</span>
<span class="line">                taskresp = json.loads(client.do_action_with_exception(taskreq))</span>
<span class="line">                print(&quot;[&quot; + response[taskID] + &quot;]&quot; + &quot;is doing... ...&quot;)</span>
<span class="line">                for t in taskresp[&#39;Tasks&#39;][&#39;CDNTask&#39;]:</span>
<span class="line">                    if t[&#39;Status&#39;] != &#39;Complete&#39;:</span>
<span class="line">                        count += 1</span>
<span class="line">                if count == 0:</span>
<span class="line">                    logging.info(&quot;[&quot; + response[taskID] + &quot;]&quot; + &quot;is finish&quot;)</span>
<span class="line">                    break</span>
<span class="line">                elif timeout &gt; 5:</span>
<span class="line">                    logging.info(&quot;[&quot; + response[taskID] + &quot;]&quot; + &quot;timeout&quot;)</span>
<span class="line">                    break</span>
<span class="line">                else:</span>
<span class="line">                    timeout += 1</span>
<span class="line">                    time.sleep(5)</span>
<span class="line">                    continue</span>
<span class="line">        except Exception as e:</span>
<span class="line">            logging.info(&quot;\\n[error]：%s&quot;,e) and sys.exit(1)</span>
<span class="line"></span>
<span class="line">class Refresh(object):</span>
<span class="line"></span>
<span class="line">    def main(self,argv):</span>
<span class="line">        if len(argv) &lt; 1:</span>
<span class="line">            sys.exit(&quot;\\n[usage]: &quot; + sys.argv[0] + &quot; -h &quot;)</span>
<span class="line">        try:</span>
<span class="line">            opts, args = getopt.getopt(argv, &quot;hi:k:n:r:t:a:o:&quot;)</span>
<span class="line">        except Exception as e:</span>
<span class="line">                sys.exit(&quot;\\n[usage]: &quot; + sys.argv[0] + &quot; -h &quot;)</span>
<span class="line"></span>
<span class="line">        for opt, arg in opts:</span>
<span class="line">            if opt == &#39;-h&#39;:</span>
<span class="line">                self.helps()</span>
<span class="line">                sys.exit()</span>
<span class="line">            elif opt == &#39;-i&#39;:</span>
<span class="line">                Envariable.set_ak(arg)</span>
<span class="line">            elif opt == &#39;-k&#39;:</span>
<span class="line">                Envariable.set_sk(arg)</span>
<span class="line">            elif opt == &#39;-r&#39;:</span>
<span class="line">                Envariable.set_fd(arg)</span>
<span class="line">            elif opt == &#39;-t&#39;:</span>
<span class="line">                Envariable.set_task_type(arg)</span>
<span class="line">            elif opt == &#39;-a&#39;:</span>
<span class="line">                Envariable.set_task_area(arg)</span>
<span class="line">            elif opt == &#39;-o&#39;:</span>
<span class="line">                Envariable.set_task_otype(arg)</span>
<span class="line">            elif opt == &#39;-q&#39;:</span>
<span class="line">                Envariable.set_task_id(arg)</span>
<span class="line">            else:</span>
<span class="line">                sys.exit(&quot;\\n[usage]: &quot; + sys.argv[0] + &quot; -h \\n&quot;)</span>
<span class="line"></span>
<span class="line">        try:</span>
<span class="line">            if not (Envariable.get_ak() and Envariable.get_sk() and Envariable.get_fd() and Envariable.get_task_type()):</span>
<span class="line">                sys.exit(&quot;\\n[error]: Must be by parameter &#39;-i&#39;, &#39;-k&#39;, &#39;-r&#39;, &#39;-t&#39;\\n&quot;)</span>
<span class="line"></span>
<span class="line">            if not (Envariable.get_task_type() in (&quot;push&quot;, &quot;clear&quot;)):</span>
<span class="line">                sys.exit(&quot;\\n[error]: taskType Error, &#39;-t&#39; option in &#39;push&#39; or &#39;clear&#39;\\n&quot;)</span>
<span class="line"></span>
<span class="line">            if Envariable.get_task_area() and Envariable.get_task_otype():</span>
<span class="line">                sys.exit(&quot;\\n[error]: -a and -o cannot exist at same time\\n&quot;)</span>
<span class="line"></span>
<span class="line">            if Envariable.get_task_area():</span>
<span class="line">                if not Envariable.get_task_area() in (&quot;domestic&quot;,&quot;overseas&quot;):</span>
<span class="line">                    sys.exit(&quot;\\n[error]: Area value Error, &#39;-a&#39; option in &#39;domestic&#39; or &#39;overseas&#39;\\n&quot;)</span>
<span class="line"></span>
<span class="line">            if Envariable.get_task_otype():</span>
<span class="line">                if not Envariable.get_task_otype() in (&quot;File&quot;, &quot;Directory&quot;):</span>
<span class="line">                    sys.exit(&quot;\\n[error]: ObjectType value Error, &#39;-a&#39; options in &#39;File&#39; or &#39;Directory&#39;\\n&quot;)</span>
<span class="line">                if Envariable.get_task_type() == &#39;push&#39;:</span>
<span class="line">                    sys.exit(&quot;\\n[error]: -t must be clear and &#39;push&#39; -a use together\\n&quot;)</span>
<span class="line">        except Exception as e:</span>
<span class="line">            logging.info(&quot;\\n[error]: Parameter {0} error\\n&quot;.format(str(e))) and sys.exit(1)</span>
<span class="line"></span>
<span class="line">        handler = BaseCheck()</span>
<span class="line">        if  handler.urlFormat() and handler.printQuota():</span>
<span class="line">            for g in doTask.doProd(Envariable.get_fd()):</span>
<span class="line">                Envariable.LISTS = []</span>
<span class="line">                doTask.doRefresh(&#39;&#39;.join(g))</span>
<span class="line">                time.sleep(1)</span>
<span class="line"></span>
<span class="line">    def helps(self):</span>
<span class="line">        print(&quot;\\nscript options explain: \\</span>
<span class="line">                    \\n\\t -i &lt;AccessKey&gt;                  访问阿里云凭证，访问控制台上可以获得； \\</span>
<span class="line">                    \\n\\t -k &lt;AccessKeySecret&gt;            访问阿里云密钥，访问控制台上可以获得； \\</span>
<span class="line">                    \\n\\t -r &lt;filename&gt;                   filename指“文件所在的路径+文件名称”，自动化脚本运行后将会读取文件内记录的URL；文件内的URL记录方式为每行一条URL，有特殊字符先做URLencode，以http或https开头； \\</span>
<span class="line">                    \\n\\t -t &lt;taskType&gt;                   任务类型，clear：刷新，push：预热； \\</span>
<span class="line">                    \\n\\t -a [String,&lt;domestic|overseas&gt;  可选项，预热范围，不传默认是全球；\\</span>
<span class="line">                    \\n\\t    domestic                     仅中国内地； \\</span>
<span class="line">                    \\n\\t    overseas                     全球（不包含中国内地）； \\</span>
<span class="line">                    \\n\\t -o [String,&lt;File|Directory&gt;]    可选项，刷新的类型； \\</span>
<span class="line">                    \\n\\t    File                         文件刷新（默认值）； \\</span>
<span class="line">                    \\n\\t    Directory                    目录刷新&quot;)</span>
<span class="line"></span>
<span class="line">#TODO</span>
<span class="line">if __name__ == &#39;__main__&#39;:</span>
<span class="line">    fun = Refresh()</span>
<span class="line">    fun.main(sys.argv[1:])</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="执行命令" tabindex="-1"><a class="header-anchor" href="#执行命令"><span>执行命令</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">刷新</span>
<span class="line">python Refresh.py -i yourAccessKey -k yourAccessKeySecret -r filename -t clear</span>
<span class="line"></span>
<span class="line">预热：</span>
<span class="line">python Refresh.py -i yourAccessKey -k yourAccessKeySecret -r filename -t push</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,23)]))}const d=n(l,[["render",c]]),t=JSON.parse('{"path":"/cloud/aliyun/%E9%98%BF%E9%87%8C%E4%BA%91CDN%E6%8F%90%E9%AB%98%E9%85%8D%E9%A2%9D%E5%92%8C%E6%89%B9%E9%87%8F%E9%A2%84%E7%83%AD%E5%92%8C%E6%89%B9%E9%87%8F%E5%88%B7%E6%96%B0%E7%9A%84%E6%96%B9%E6%B3%95.html","title":"阿里云CDN提高配额和批量预热和批量刷新的方法","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"cloud/aliyun/阿里云CDN提高配额和批量预热和批量刷新的方法.md"}');export{d as comp,t as data};
