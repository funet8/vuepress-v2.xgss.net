import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as e}from"./app-CkVikb64.js";const p={};function l(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h1 id="我用ai做了一个1978年至2019年中国大陆企业注册的查询网站" tabindex="-1"><a class="header-anchor" href="#我用ai做了一个1978年至2019年中国大陆企业注册的查询网站"><span>我用AI做了一个1978年至2019年中国大陆企业注册的查询网站</span></a></h1><p>最近星哥在GitHub上偶然发现了一个宝藏仓库——Enterprise-Registration-Data-of-Chinese-Mainland。这个包含1978到2019年全国企业注册信息的数据集，像一座尘封的经济档案库，静静躺在代码海洋里。588万条记录、31个省份、10个核心字段，从&quot;东方华脉建筑设计&quot;到&quot;冷酸灵互娱科技&quot;，这些带着时代印记的企业名称背后，藏着中国改革开放42年的经济密码。</p><p>数据源来自 GitHub 上的开源项目 <a href="https://github.com/kinginsun/Enterprise-Registration-Data-of-Chinese-Mainland" target="_blank" rel="noopener noreferrer">Enterprise-Registration-Data-of-Chinese-Mainland</a> 。</p><p>全程不使用手写代码，仅使用AI编程工具。</p><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1762183262300.png?tx" alt="img"></p><h2 id="技术实现思路" tabindex="-1"><a class="header-anchor" href="#技术实现思路"><span>技术实现思路</span></a></h2><h3 id="获取免费服务器" tabindex="-1"><a class="header-anchor" href="#获取免费服务器"><span>获取免费服务器</span></a></h3><ul><li><p>申请免费服务器（一个月）</p></li><li><p>最好有域名</p></li><li><p>我这里申请的是腾讯云的，如果你有其他的云服务器或者虚拟机都行。</p></li></ul><h3 id="数据准备" tabindex="-1"><a class="header-anchor" href="#数据准备"><span>数据准备</span></a></h3><ul><li>原始数据来自 GitHub 仓库，格式为 CSV。</li><li>新建数据表、合理索引</li><li>将csv数据导入</li><li>数据量较大，需要进行清洗、索引和分库处理。</li></ul><h3 id="检索条件" tabindex="-1"><a class="header-anchor" href="#检索条件"><span>检索条件</span></a></h3><ul><li>检索公司名、法人、地址得出结果</li><li>支持模糊搜索，例如输入“华为”即可匹配“华为技术有限公司”。</li></ul><h3 id="前端交互" tabindex="-1"><a class="header-anchor" href="#前端交互"><span>前端交互</span></a></h3><ul><li>简洁的搜索框 + 结果列表。</li><li>支持按年份、地区分类筛选。</li></ul><h2 id="_1-下载csv文件" tabindex="-1"><a class="header-anchor" href="#_1-下载csv文件"><span>1.下载csv文件</span></a></h2><p>大家可以使用github或者夸克下载。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>数据源来自github： https://github.com/kinginsun/Enterprise-Registration-Data-of-Chinese-Mainland</span></span>
<span class="line"><span></span></span>
<span class="line"><span>夸克下载：</span></span>
<span class="line"><span>我用夸克网盘给你分享了「1978-2019新注册的企业工商信息.zip」链接：https://pan.quark.cn/s/efd621e2c4f9</span></span>
<span class="line"><span>提取码：DLFT</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>文件夹以年份命名，随便进入一个文件夹打开文件夹中的文档</p><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1762164040525.png?tx" alt="img"></p><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1762164099491.png?tx" alt="img"></p><p>如图表格</p><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1762164008794.png?tx" alt="img"></p><h2 id="_2-连接服务器" tabindex="-1"><a class="header-anchor" href="#_2-连接服务器"><span>2.连接服务器</span></a></h2><p>这步不是必须，也可以在本地电脑或者虚拟机上安装</p><p>我这里使用的是腾讯的CodeBuddy1024送的免费1个月的轻量云</p><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1762164861556.png?tx" alt="img"></p><h2 id="_3-安装宝塔" tabindex="-1"><a class="header-anchor" href="#_3-安装宝塔"><span>3.安装宝塔</span></a></h2><p>具体可以看一下星哥之前写的 <a href="https://mp.weixin.qq.com/s/DIgPUt4lN-XAQPqa3WkYIQ" target="_blank" rel="noopener noreferrer">宝塔面板从零搭建个人博客新手也能轻松上手</a></p><h3 id="安装宝塔命令" tabindex="-1"><a class="header-anchor" href="#安装宝塔命令"><span>安装宝塔命令</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>if [ -f /usr/bin/curl ];then curl -sSO https://download.bt.cn/install/install_panel.sh;else wget -O install_panel.sh https://download.bt.cn/install/install_panel.sh;fi;bash install_panel.sh ed8484bec</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1762166316691.png?tx" alt="img"></p><p>进入宝塔</p><h3 id="安装web环境" tabindex="-1"><a class="header-anchor" href="#安装web环境"><span>安装WEB环境</span></a></h3><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1762166540589.png?tx" alt="img"></p><h3 id="web环境安装成功" tabindex="-1"><a class="header-anchor" href="#web环境安装成功"><span>WEB环境安装成功</span></a></h3><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1762167269483.png?tx" alt="img"></p><p>记住mysql密码</p><p>记住mysql的密码，以后要用的</p><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1762179676669.png?tx" alt="img"></p><h2 id="_4-下载codebuddy编程工具" tabindex="-1"><a class="header-anchor" href="#_4-下载codebuddy编程工具"><span>4.下载CodeBuddy编程工具</span></a></h2><p>腾讯 CodeBuddy 是一款由腾讯云推出的智能编程助手，定位为“AI时代的编程伙伴”，通过自然语言交互帮助开发者更高效地完成从需求到上线的全流程开发。</p><p>再到本地开发电脑上安装CodeBuddy</p><p>下载：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>浏览器打开 https://copilot.tencent.com/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>点击安装IDE</p><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1762165871740.png?tx" alt="img"></p><p>安装之后</p><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1762165958741.png?tx" alt="img"></p><h3 id="新建项目文件夹" tabindex="-1"><a class="header-anchor" href="#新建项目文件夹"><span>新建项目文件夹</span></a></h3><p>新建文件夹，命名为“AI-1978-and-2019-register-company”将csv文件放到目录中</p><p>把zip解压</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>$ ll</span></span>
<span class="line"><span>total 16</span></span>
<span class="line"><span>drwxr-xr-x 1 Administrator 197121    0 Feb 22  2020 Enterprise-Registration-Data-of-Chinese-Mainland-master/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用codebuddy" tabindex="-1"><a class="header-anchor" href="#使用codebuddy"><span>使用CodeBuddy</span></a></h2><p>打开文件夹AI-1978-and-2019-register-company</p><h3 id="导入数据库提示词" tabindex="-1"><a class="header-anchor" href="#导入数据库提示词"><span>导入数据库提示词</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>写一个shell脚本，将Enterprise-Registration-Data-of-Chinese-Mainland-master目录中的csv文件批量导入到mysql数据库中</span></span>
<span class="line"><span></span></span>
<span class="line"><span>表索引要有企业名称、法人代表、所在省份</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果得到import_to_mysql.sh文件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>import_to_mysql.sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="https://imgoss.xgss.net/picgo-tx2025/image-20251103221710986.png?tx" alt="image-20251103221710986"></p><p>提示词输入之后，生成了三个文件</p><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1762179579240.png?tx" alt="img"></p><p>将文件上传到轻量云服务器中，修改root密码</p><h3 id="新建数据库" tabindex="-1"><a class="header-anchor" href="#新建数据库"><span>新建数据库</span></a></h3><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1762180427992.png?tx" alt="img"></p><p>运行</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>sh import_to_mysql.sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span># MySQL数据库配置</span></span>
<span class="line"><span>DB_HOST=&quot;localhost&quot;</span></span>
<span class="line"><span>DB_USER=&quot;改成你的用户名&quot;</span></span>
<span class="line"><span>DB_PASS=&quot;改成你的密码&quot;</span></span>
<span class="line"><span>DB_NAME=&quot;enterprise_registration&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># CSV文件目录</span></span>
<span class="line"><span>CSV_DIR=&quot;Enterprise-Registration-Data-of-Chinese-Mainland-master/1978-2019新注册的企业工商信息&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 创建数据库和表</span></span>
<span class="line"><span>create_database_and_table() {</span></span>
<span class="line"><span>    echo &quot;创建数据库和表...&quot;</span></span>
<span class="line"><span>    mysql -h $DB_HOST -u $DB_USER -p$DB_PASS &lt;&lt; EOF</span></span>
<span class="line"><span>    CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;</span></span>
<span class="line"><span>    USE $DB_NAME;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    DROP TABLE IF EXISTS enterprise_data;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    CREATE TABLE enterprise_data (</span></span>
<span class="line"><span>        id INT AUTO_INCREMENT PRIMARY KEY,</span></span>
<span class="line"><span>        企业名称 VARCHAR(500) NOT NULL,</span></span>
<span class="line"><span>        统一社会信用代码 VARCHAR(100),</span></span>
<span class="line"><span>        注册日期 DATE,</span></span>
<span class="line"><span>        企业类型 VARCHAR(100),</span></span>
<span class="line"><span>        法人代表 VARCHAR(100),</span></span>
<span class="line"><span>        注册资金 VARCHAR(100),</span></span>
<span class="line"><span>        经营范围 TEXT,</span></span>
<span class="line"><span>        所在省份 VARCHAR(50),</span></span>
<span class="line"><span>        地区 VARCHAR(100),</span></span>
<span class="line"><span>        注册地址 TEXT,</span></span>
<span class="line"><span>        年份 INT,</span></span>
<span class="line"><span>        省份 VARCHAR(50),</span></span>
<span class="line"><span>        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP</span></span>
<span class="line"><span>    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    -- 创建索引以提高查询性能</span></span>
<span class="line"><span>    CREATE INDEX idx_year ON enterprise_data(年份);</span></span>
<span class="line"><span>    CREATE INDEX idx_province ON enterprise_data(省份);</span></span>
<span class="line"><span>    CREATE INDEX idx_reg_date ON enterprise_data(注册日期);</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 导入单个CSV文件</span></span>
<span class="line"><span>import_csv_file() {</span></span>
<span class="line"><span>    local csv_file=&quot;$1&quot;</span></span>
<span class="line"><span>    local year=&quot;$2&quot;</span></span>
<span class="line"><span>    local province=&quot;$3&quot;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    echo &quot;导入文件: $csv_file (年份: $year, 省份: $province)&quot;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 提取文件名中的省份信息（去掉.csv后缀）</span></span>
<span class="line"><span>    local province_name=$(basename &quot;$csv_file&quot; .csv)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 使用LOAD DATA INFILE导入CSV文件</span></span>
<span class="line"><span>    mysql -h $DB_HOST -u $DB_USER -p$DB_PASS $DB_NAME &lt;&lt; EOF</span></span>
<span class="line"><span>    LOAD DATA LOCAL INFILE &#39;$csv_file&#39;</span></span>
<span class="line"><span>    INTO TABLE enterprise_data</span></span>
<span class="line"><span>    CHARACTER SET utf8mb4</span></span>
<span class="line"><span>    FIELDS TERMINATED BY &#39;,&#39; </span></span>
<span class="line"><span>    OPTIONALLY ENCLOSED BY &#39;&quot;&#39; </span></span>
<span class="line"><span>    LINES TERMINATED BY &#39;\\n&#39;</span></span>
<span class="line"><span>    IGNORE 1 LINES</span></span>
<span class="line"><span>    (企业名称, 统一社会信用代码, 注册日期, 企业类型, 法人代表, 注册资金, 经营范围, 所在省份, 地区, 注册地址)</span></span>
<span class="line"><span>    SET 年份 = $year, 省份 = &#39;$province_name&#39;;</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 批量导入所有CSV文件</span></span>
<span class="line"><span>batch_import() {</span></span>
<span class="line"><span>    echo &quot;开始批量导入CSV文件...&quot;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 查找所有年份目录</span></span>
<span class="line"><span>    for year_dir in &quot;$CSV_DIR&quot;/*/; do</span></span>
<span class="line"><span>        if [ -d &quot;$year_dir&quot; ]; then</span></span>
<span class="line"><span>            # 提取年份</span></span>
<span class="line"><span>            local year=$(basename &quot;$year_dir&quot;)</span></span>
<span class="line"><span>            echo &quot;处理年份: $year&quot;</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            # 查找该年份下的所有CSV文件</span></span>
<span class="line"><span>            for csv_file in &quot;$year_dir&quot;/*.csv; do</span></span>
<span class="line"><span>                if [ -f &quot;$csv_file&quot; ]; then</span></span>
<span class="line"><span>                    # 提取省份名称</span></span>
<span class="line"><span>                    local province=$(basename &quot;$csv_file&quot; .csv)</span></span>
<span class="line"><span>                    import_csv_file &quot;$csv_file&quot; &quot;$year&quot; &quot;$province&quot;</span></span>
<span class="line"><span>                fi</span></span>
<span class="line"><span>            done</span></span>
<span class="line"><span>        fi</span></span>
<span class="line"><span>    done</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 显示导入统计信息</span></span>
<span class="line"><span>show_statistics() {</span></span>
<span class="line"><span>    echo &quot;导入完成，统计信息：&quot;</span></span>
<span class="line"><span>    mysql -h $DB_HOST -u $DB_USER -p$DB_Pass $DB_NAME &lt;&lt; EOF</span></span>
<span class="line"><span>    SELECT </span></span>
<span class="line"><span>        年份,</span></span>
<span class="line"><span>        COUNT(*) as 企业数量,</span></span>
<span class="line"><span>        COUNT(DISTINCT 省份) as 省份数量</span></span>
<span class="line"><span>    FROM enterprise_data </span></span>
<span class="line"><span>    GROUP BY 年份 </span></span>
<span class="line"><span>    ORDER BY 年份;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    SELECT </span></span>
<span class="line"><span>        COUNT(*) as 总企业数量,</span></span>
<span class="line"><span>        COUNT(DISTINCT 省份) as 总省份数量,</span></span>
<span class="line"><span>        MIN(年份) as 最早年份,</span></span>
<span class="line"><span>        MAX(年份) as 最晚年份</span></span>
<span class="line"><span>    FROM enterprise_data;</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 主函数</span></span>
<span class="line"><span>main() {</span></span>
<span class="line"><span>    echo &quot;=== 企业工商信息数据导入MySQL数据库 ===&quot;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 检查MySQL连接</span></span>
<span class="line"><span>    if ! mysql -h $DB_HOST -u $DB_USER -p$DB_PASS -e &quot;SELECT 1;&quot; &gt; /dev/null 2&gt;&amp;1; then</span></span>
<span class="line"><span>        echo &quot;错误：无法连接到MySQL数据库，请检查配置&quot;</span></span>
<span class="line"><span>        exit 1</span></span>
<span class="line"><span>    fi</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 检查CSV目录是否存在</span></span>
<span class="line"><span>    if [ ! -d &quot;$CSV_DIR&quot; ]; then</span></span>
<span class="line"><span>        echo &quot;错误：CSV目录不存在: $CSV_DIR&quot;</span></span>
<span class="line"><span>        exit 1</span></span>
<span class="line"><span>    fi</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 执行导入流程</span></span>
<span class="line"><span>    create_database_and_table</span></span>
<span class="line"><span>    batch_import</span></span>
<span class="line"><span>    show_statistics</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    echo &quot;=== 导入完成 ===&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 使用说明</span></span>
<span class="line"><span>usage() {</span></span>
<span class="line"><span>    echo &quot;使用方法：&quot;</span></span>
<span class="line"><span>    echo &quot;  ./import_to_mysql.sh           # 执行完整导入流程&quot;</span></span>
<span class="line"><span>    echo &quot;&quot;</span></span>
<span class="line"><span>    echo &quot;配置说明：&quot;</span></span>
<span class="line"><span>    echo &quot;  请修改脚本开头的数据库配置：&quot;</span></span>
<span class="line"><span>    echo &quot;  - DB_HOST: MySQL服务器地址&quot;</span></span>
<span class="line"><span>    echo &quot;  - DB_USER: MySQL用户名&quot;</span></span>
<span class="line"><span>    echo &quot;  - DB_PASS: MySQL密码&quot;</span></span>
<span class="line"><span>    echo &quot;  - DB_NAME: 数据库名称&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 参数处理</span></span>
<span class="line"><span>case &quot;$1&quot; in</span></span>
<span class="line"><span>    -h|--help)</span></span>
<span class="line"><span>        usage</span></span>
<span class="line"><span>        exit 0</span></span>
<span class="line"><span>        ;;</span></span>
<span class="line"><span>    *)</span></span>
<span class="line"><span>        main</span></span>
<span class="line"><span>        ;;</span></span>
<span class="line"><span>esac</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="导入数据库" tabindex="-1"><a class="header-anchor" href="#导入数据库"><span>导入数据库</span></a></h3><p>数据库导入成功之后，用宝塔自带的phpmyadmin查看数据。</p><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1762180203646.png?tx" alt="img"></p><h2 id="创建web站点的提示语" tabindex="-1"><a class="header-anchor" href="#创建web站点的提示语"><span>创建web站点的提示语</span></a></h2><p>演示提示词，你也可以使用其他技术栈。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>请帮我创建一个web站点</span></span>
<span class="line"><span>前端使用 html ，前端界面要美观大方、自适应移动端</span></span>
<span class="line"><span>后端使用 php8.2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>数据库配置如下：</span></span>
<span class="line"><span>用户名：star</span></span>
<span class="line"><span>密码是：改成你自己密码</span></span>
<span class="line"><span>主机：127.0.0.1</span></span>
<span class="line"><span>端口是：3306</span></span>
<span class="line"><span>数据库名：enterprise_registration</span></span>
<span class="line"><span>做一个企业查询的站点</span></span>
<span class="line"><span>可以根据企业名称、法人姓名、查询公司详情</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后给我创建了如下的文件</p><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1762181372631.png?tx" alt="img"></p><h2 id="宝塔新建站点" tabindex="-1"><a class="header-anchor" href="#宝塔新建站点"><span>宝塔新建站点</span></a></h2><h3 id="新建站点" tabindex="-1"><a class="header-anchor" href="#新建站点"><span>新建站点</span></a></h3><p>使用域名：cha.xgss.net</p><p>如图新建站点</p><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1762181869671.png?tx" alt="img"></p><h3 id="上传文件" tabindex="-1"><a class="header-anchor" href="#上传文件"><span>上传文件</span></a></h3><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1762181946596.png?tx" alt="img"></p><p>域名解析到轻量云</p><p>调试结果</p><p><img src="https://imgoss.xgss.net/picgo-tx2025/QQ_1762182253343.png?tx" alt="img"></p><p>有如下bug</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>有如下BUG，请帮我解决</span></span>
<span class="line"><span>1.点击查询按钮数据查不到</span></span>
<span class="line"><span>2.输入法人代表或者企业名称需要查询到相关信息</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把提示词喂给CodeBuddy，让CodeBuddy来调试</p><h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景"><span>应用场景</span></a></h2><ul><li>学术研究：经济学、社会学研究者可用来分析企业发展趋势。</li><li>商业分析：投资人或咨询公司可快速定位目标企业。</li><li>个人兴趣：普通用户也能一窥中国企业发展的历史脉络。</li></ul><p>#CodeBuddy</p><p>#CodeBuddyIDE</p><p>#CodeBuddyCode</p><p>#无界生成力</p><h2 id="一点小感想" tabindex="-1"><a class="header-anchor" href="#一点小感想"><span>一点小感想</span></a></h2><p>做这个网站的过程，让我再次体会到：<strong>数据只有被激活，才真正有价值</strong>。AI不是替代人，而是帮助我们提高效率的工具。</p><p>如果你也对这个项目感兴趣，可以去 GitHub 上看看原始数据，或者尝试自己搭建一个查询工具。</p>`,97)]))}const t=n(p,[["render",l]]),v=JSON.parse('{"path":"/cloud/tengxun2025/22.%E6%88%91%E7%94%A8AI%E5%81%9A%E4%BA%86%E4%B8%80%E4%B8%AA1978%E5%B9%B4%E8%87%B32019%E5%B9%B4%E4%B8%AD%E5%9B%BD%E5%A4%A7%E9%99%86%E4%BC%81%E4%B8%9A%E6%B3%A8%E5%86%8C%E8%B5%84%E6%96%99%E6%9F%A5%E8%AF%A2%E7%BD%91%E7%AB%99.html","title":"我用AI做了一个1978年至2019年中国大陆企业注册的查询网站","lang":"en-US","frontmatter":{},"git":{"createdTime":1767924197000,"updatedTime":1767924197000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}]},"readingTime":{"minutes":7.09,"words":2128},"filePathRelative":"cloud/tengxun2025/22.我用AI做了一个1978年至2019年中国大陆企业注册资料查询网站.md"}');export{t as comp,v as data};
