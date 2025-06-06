import{_ as n,c as a,b as e,o as i}from"./app-BEL8OELx.js";const l={};function d(r,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="在centos-7下构建安卓android编译环境" tabindex="-1"><a class="header-anchor" href="#在centos-7下构建安卓android编译环境"><span>在CentOS 7下构建安卓Android编译环境</span></a></h1><p>根据安卓开发的需求实现流程</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">1.安卓开发工程师本机开发</span>
<span class="line">2.提交Git仓库-master分支</span>
<span class="line">3.jenkins手动打包(可实现自动)，进入后台 http://192.168.1.8:9091/</span>
<span class="line">执行任务:</span>
<span class="line">打包服务器拉取最新git仓库代码</span>
<span class="line">进入项目目录执行</span>
<span class="line">./gradlew :launcher:assembleRelease</span>
<span class="line">4.将生成的apk包cp到 http://android.XXXX.ltd WEB目录，安卓研发下载apk包</span>
<span class="line">5.测试</span>
<span class="line">6.上线投放</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分三篇文章讲解</p><p>1.<a href="https://g.xgss.net/kaiyuan/android/1.Centos7-Android-software.html" target="_blank" rel="noopener noreferrer">CentOS7下构建安卓Android编译环境</a></p><p>2.<a href="http://g.xgss.net/devops/CentOS-7-Install-Jenkins.html" target="_blank" rel="noopener noreferrer">CentOS7下安装Jenkins</a></p><p>3.<a href="http://g.xgss.net/kaiyuan/android/3.Centos7-Android-jenkins.html" target="_blank" rel="noopener noreferrer">基于centos7的jenkins安卓自动打包</a></p><p><img src="http://imgoss.xgss.net/picgo/android.png?aliyunoss" alt="在 CentOS7 下构建 Android 编译环境"></p><p>在 Android Studio 之外，还可以通过 Gradle Script 来编译 Android 项目并构建和测试应用。 本文是一个备忘录，以记录我在 x86_64 GNU/Linux 系统 CentOS Linux release 7.8.2003 下折腾 Android 编译环境的一个过程。</p><p>本文将会安装以下组件：</p><div class="language-bsh line-numbers-mode" data-highlighter="prismjs" data-ext="bsh"><pre><code class="language-bsh"><span class="line">Git</span>
<span class="line">JDK 1.8</span>
<span class="line">Go 1.14.7</span>
<span class="line">Android SDK</span>
<span class="line">  Android NDK</span>
<span class="line">Rust 1.45.0</span>
<span class="line">  Android Targets:</span>
<span class="line">    armv7-linux-androideabi</span>
<span class="line">    aarch64-linux-android</span>
<span class="line">    i686-linux-android</span>
<span class="line">    x86_64-linux-android</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下的所有过程均是在 root 用户下操作。</p><h3 id="_1-安装-git-和-jdk-1-8" tabindex="-1"><a class="header-anchor" href="#_1-安装-git-和-jdk-1-8"><span>1. 安装 Git 和 JDK 1.8</span></a></h3><p>这两个组件发行版自带，通过以下命令即可安装。与此同时，再安装一些其他必要的组件 wget 和 unzip。</p><div class="language-bsh line-numbers-mode" data-highlighter="prismjs" data-ext="bsh"><pre><code class="language-bsh"><span class="line">$ yum install -y java-1.8.0-openjdk java-1.8.0-openjdk-devel wget unzip git</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>完成后通过以下命令验证 JDK 版本号。</p><div class="language-bsh line-numbers-mode" data-highlighter="prismjs" data-ext="bsh"><pre><code class="language-bsh"><span class="line">$ java -version</span>
<span class="line">openjdk version &quot;1.8.0_252&quot;</span>
<span class="line">OpenJDK Runtime Environment (build 1.8.0_252-b09)</span>
<span class="line">OpenJDK 64-Bit Server VM (build 25.252-b09, mixed mode)</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bsh line-numbers-mode" data-highlighter="prismjs" data-ext="bsh"><pre><code class="language-bsh"><span class="line">$ javac -version</span>
<span class="line">javac 1.8.0_252</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-安装-go" tabindex="-1"><a class="header-anchor" href="#_2-安装-go"><span>2. 安装 Go</span></a></h3><p>目前 Go 的最新版是 1.14.7。安装过程如下。</p><div class="language-bsh line-numbers-mode" data-highlighter="prismjs" data-ext="bsh"><pre><code class="language-bsh"><span class="line">$ GO_VERSION=1.14.7</span>
<span class="line">$ wget -O /tmp/go\${GO_VERSION}.tar.gz http://js.funet8.com/centos_software/go\${GO_VERSION}.linux-amd64.tar.gz</span>
<span class="line">$ tar -C /usr/local -xzf /tmp/go\${GO_VERSION}.tar.gz</span>
<span class="line">$ rm -fv /tmp/go\${GO_VERSION}.tar.gz</span>
<span class="line">$ export PATH=/usr/local/go/bin:$PATH</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成后通过以下命令验证 Go 版本号。</p><div class="language-bsh line-numbers-mode" data-highlighter="prismjs" data-ext="bsh"><pre><code class="language-bsh"><span class="line">$ go version</span>
<span class="line">go version go1.14.7 linux/amd64</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-安装-android-sdk-及-android-ndk" tabindex="-1"><a class="header-anchor" href="#_3-安装-android-sdk-及-android-ndk"><span>3. 安装 Android SDK 及 Android NDK</span></a></h3><p>假设 <code>ANDROID_HOME</code> 路径是 <code>/data/sdk</code>。安装过程如下。</p><div class="language-bsh line-numbers-mode" data-highlighter="prismjs" data-ext="bsh"><pre><code class="language-bsh"><span class="line">$ mkdir -p /data/sdk &amp;&amp; cd /data/sdk</span>
<span class="line">$ wget http://js.funet8.com/centos_software/commandlinetools-linux-6609375_latest.zip</span>
<span class="line">$ unzip -q commandlinetools-linux-6609375_latest.zip</span>
<span class="line">$ rm -fv commandlinetools-linux-6609375_latest.zip</span>
<span class="line">$ export PATH=/data/sdk/tools/bin:$PATH</span>
<span class="line">$ [ -z &quot;\${ANDROID_HOME}&quot; ] &amp;&amp; export ANDROID_HOME=/data/sdk</span>
<span class="line">$ yes | sdkmanager --sdk_root=\${ANDROID_HOME} --licenses</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 <code>sdkmanager</code> 来安装一些组件。一条命令一步到位。如下。</p><div class="language-bsh line-numbers-mode" data-highlighter="prismjs" data-ext="bsh"><pre><code class="language-bsh"><span class="line">$ sdkmanager --sdk_root=\${ANDROID_HOME} &quot;platform-tools&quot; &quot;platforms;android-30&quot; &quot;platforms;android-29&quot; &quot;ndk-bundle&quot; &quot;ndk;21.0.6113669&quot; &quot;build-tools;29.0.2&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>完成后，确认已安装的列表。</p><div class="language-bsh line-numbers-mode" data-highlighter="prismjs" data-ext="bsh"><pre><code class="language-bsh"><span class="line">$ sdkmanager --sdk_root=\${ANDROID_HOME} --list</span>
<span class="line">Installed packages:</span>
<span class="line">  Path                 | Version      | Description                     | Location             </span>
<span class="line">  -------              | -------      | -------                         | -------              </span>
<span class="line">  build-tools;29.0.2   | 29.0.2       | Android SDK Build-Tools 29.0.2  | build-tools/29.0.2/  </span>
<span class="line">  ndk-bundle           | 21.3.6528147 | NDK                             | ndk-bundle/          </span>
<span class="line">  ndk;21.0.6113669     | 21.0.6113669 | NDK (Side by side) 21.0.6113669 | ndk/21.0.6113669/    </span>
<span class="line">  patcher;v4           | 1            | SDK Patch Applier v4            | patcher/v4/          </span>
<span class="line">  platform-tools       | 30.0.3       | Android SDK Platform-Tools      | platform-tools/      </span>
<span class="line">  platforms;android-29 | 4            | Android SDK Platform 29         | platforms/android-29/</span>
<span class="line">  platforms;android-30 | 1            | Android SDK Platform 30         | platforms/android-30/</span>
<span class="line">  tools                | 2.1.0        | Android SDK Tools 2.1           | tools/               </span>
<span class="line">Available Packages:</span>
<span class="line">  以下省略</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-安装-rust-及其它" tabindex="-1"><a class="header-anchor" href="#_4-安装-rust-及其它"><span>4. 安装 Rust 及其它</span></a></h3><p>目前 Rust 的最新版是 1.45.0。安装过程如下。</p><div class="language-bsh line-numbers-mode" data-highlighter="prismjs" data-ext="bsh"><pre><code class="language-bsh"><span class="line">$ export RUSTUP_HOME=/usr/local/rustup CARGO_HOME=/usr/local/cargo</span>
<span class="line">$ RUST_VERSION=1.45.0</span>
<span class="line">$ RUSTARCH=&#39;x86_64-unknown-linux-gnu&#39;</span>
<span class="line">$ wget -O /tmp/rustup-init &quot;https://static.rust-lang.org/rustup/archive/1.21.1/\${RUSTARCH}/rustup-init&quot;</span>
<span class="line">$ chmod 755 /tmp/rustup-init</span>
<span class="line">$ /tmp/rustup-init -y --no-modify-path --profile minimal --default-toolchain $RUST_VERSION</span>
<span class="line">$ rm -fv /tmp/rustup-init</span>
<span class="line">$ chmod -R a+w \${RUSTUP_HOME} \${CARGO_HOME}</span>
<span class="line">$ export PATH=/usr/local/cargo/bin:$PATH</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成后通过以下命令验证 Rust 及组件的版本号。</p><div class="language-bsh line-numbers-mode" data-highlighter="prismjs" data-ext="bsh"><pre><code class="language-bsh"><span class="line">$ rustup --version</span>
<span class="line">rustup 1.21.1 (7832b2ebe 2019-12-20)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bsh line-numbers-mode" data-highlighter="prismjs" data-ext="bsh"><pre><code class="language-bsh"><span class="line">$ cargo --version</span>
<span class="line">cargo 1.45.0 (744bd1fbb 2020-06-15)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bsh line-numbers-mode" data-highlighter="prismjs" data-ext="bsh"><pre><code class="language-bsh"><span class="line">$ rustc --version</span>
<span class="line">rustc 1.45.0 (5c1f21c3b 2020-07-13)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>Rust 安装以下 Android Targets:</p><div class="language-bsh line-numbers-mode" data-highlighter="prismjs" data-ext="bsh"><pre><code class="language-bsh"><span class="line">armv7-linux-androideabi</span>
<span class="line">aarch64-linux-android</span>
<span class="line">i686-linux-android</span>
<span class="line">x86_64-linux-android</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装过程如下。</p><div class="language-bsh line-numbers-mode" data-highlighter="prismjs" data-ext="bsh"><pre><code class="language-bsh"><span class="line">$ rustup install stable</span>
<span class="line">$ rustup default stable</span>
<span class="line">$ rustup target add armv7-linux-androideabi</span>
<span class="line">$ rustup target add i686-linux-android</span>
<span class="line">$ rustup target add aarch64-linux-android</span>
<span class="line">$ rustup target add x86_64-linux-android</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-持久化环境变量" tabindex="-1"><a class="header-anchor" href="#_5-持久化环境变量"><span>5. 持久化环境变量</span></a></h3><p>上面的安装步骤是通过 export 来定义系统 PATH 的，在退出当前登录后就会丢失设置。 因此需要持久化一些环境变量。 编辑 <code>~/.bash_profile</code> 文件。添加 <code>ANDROID_HOME</code>，<code>RUSTUP_HOME</code>，<code>CARGO_HOME</code> 的定义以及增加 <code>PATH</code> 定义。 最后呈现内容如下。</p><div class="language-bsh line-numbers-mode" data-highlighter="prismjs" data-ext="bsh"><pre><code class="language-bsh"><span class="line"># .bash_profile</span>
<span class="line"></span>
<span class="line"># Get the aliases and functions</span>
<span class="line">if [ -f ~/.bashrc ]; then</span>
<span class="line">. ~/.bashrc</span>
<span class="line">fi</span>
<span class="line"></span>
<span class="line"># User specific environment and startup programs</span>
<span class="line"></span>
<span class="line">export ANDROID_HOME=/data/sdk RUSTUP_HOME=/usr/local/rustup CARGO_HOME=/usr/local/cargo</span>
<span class="line"></span>
<span class="line">PATH=$PATH:$HOME/bin:$ANDROID_HOME/tools/bin:/usr/local/go/bin:/usr/local/cargo/bin</span>
<span class="line"></span>
<span class="line">export PATH</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-编译-android-项目" tabindex="-1"><a class="header-anchor" href="#_6-编译-android-项目"><span>6. 编译 Android 项目</span></a></h3><p>这里选一个比较简单的项目来练手：<a href="https://github.com/shadowsocks/v2ray-plugin-android" target="_blank" rel="noopener noreferrer">v2ray-plugin-android</a>。 编译过程如下。</p><div class="language-bsh line-numbers-mode" data-highlighter="prismjs" data-ext="bsh"><pre><code class="language-bsh"><span class="line">$ git clone https://github.com/shadowsocks/v2ray-plugin-android.git</span>
<span class="line">$ cd v2ray-plugin-android</span>
<span class="line">$ git submodule update --init --recursive</span>
<span class="line">$ ./gradlew assembleRelease</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成后，编译好的 apk 文件位于 <code>app/build/outputs/apk/release</code> 路径下。 Android 系统要求所有 apk 必须先使用证书进行数字签名，然后才能安装到设备上或进行更新。 因此这些 apk 文件还不能被直接拿来安装。 至于如何签名，请参考以下链接，过程省略。 https://developer.android.com/studio/publish/app-signing</p><h3 id="_7-总结" tabindex="-1"><a class="header-anchor" href="#_7-总结"><span>7. 总结</span></a></h3><p>当你习惯于用命令行做事的时候，你会发现效率往往会有很大的提升。编译代码亦是如此。</p>`,50)]))}const c=n(l,[["render",d]]),t=JSON.parse('{"path":"/kaiyuan/android/1.Centos7-Android-software.html","title":"在CentOS 7下构建安卓Android编译环境","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"kaiyuan/android/1.Centos7-Android-software.md"}');export{c as comp,t as data};
