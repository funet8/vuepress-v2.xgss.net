import{_ as n,c as e,b as i,o as a}from"./app-BEL8OELx.js";const l={};function p(r,s){return a(),e("div",null,s[0]||(s[0]=[i(`<h1 id="如何解密本机securecrt保存的密码" tabindex="-1"><a class="header-anchor" href="#如何解密本机securecrt保存的密码"><span>如何解密本机SecureCRT保存的密码</span></a></h1><p>今天查看一台服务器的，发现登陆不了，可能是防火墙误操作了，需要去机房操作。</p><p>之前用securecrt成功登陆过，所以本机的配置文件是保存密码了，需要用python来解密</p><h2 id="一-查找配置文件" tabindex="-1"><a class="header-anchor" href="#一-查找配置文件"><span>一.查找配置文件</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/image-20221102132755681.png?aliyun" alt="image-20221102132755681"></p><p>找到配置文件打开</p><p><img src="https://imgoss.xgss.net/picgo/image-20221102132903604.png?aliyun" alt="image-20221102132903604"></p><h2 id="二、安装python3和解密文件" tabindex="-1"><a class="header-anchor" href="#二、安装python3和解密文件"><span>二、安装python3和解密文件</span></a></h2><p>1.安装python：</p><p>官网下载 https://www.python.org/downloads/</p><p>再编辑文件</p><p>参考： https://github.com/HyperSine/how-does-SecureCRT-encrypt-password</p><p>SecureCRT 中的密码进行了加密，需要解码才能得到对应的明文，这是使用python解密</p><p>使用pip 安装Crypto模块</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">pip3 install pycryptodome</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>编写python解码文件decrypt.py</p><p>下载文件： https://raw.githubusercontent.com/HyperSine/how-does-SecureCRT-encrypt-password/master/python3/SecureCRTCipher.py</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">新建文件</span>
<span class="line"># vim SecureCRTCipher.py</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>内容文件：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">#!/usr/bin/env python3</span>
<span class="line">#https://github.com/HyperSine/how-does-SecureCRT-encrypt-password</span>
<span class="line">import os</span>
<span class="line">from Crypto.Hash import SHA256</span>
<span class="line">from Crypto.Cipher import AES, Blowfish</span>
<span class="line"></span>
<span class="line">class SecureCRTCrypto:</span>
<span class="line"></span>
<span class="line">    def __init__(self):</span>
<span class="line">        &#39;&#39;&#39;</span>
<span class="line">        Initialize SecureCRTCrypto object.</span>
<span class="line">        &#39;&#39;&#39;</span>
<span class="line">        self.IV = b&#39;\\x00&#39; * Blowfish.block_size</span>
<span class="line">        self.Key1 = b&#39;\\x24\\xA6\\x3D\\xDE\\x5B\\xD3\\xB3\\x82\\x9C\\x7E\\x06\\xF4\\x08\\x16\\xAA\\x07&#39;</span>
<span class="line">        self.Key2 = b&#39;\\x5F\\xB0\\x45\\xA2\\x94\\x17\\xD9\\x16\\xC6\\xC6\\xA2\\xFF\\x06\\x41\\x82\\xB7&#39;</span>
<span class="line"></span>
<span class="line">    def Encrypt(self, Plaintext : str):</span>
<span class="line">        &#39;&#39;&#39;</span>
<span class="line">        Encrypt plaintext and return corresponding ciphertext.</span>
<span class="line">        Args:</span>
<span class="line">            Plaintext: A string that will be encrypted.</span>
<span class="line">        Returns:</span>
<span class="line">            Hexlified ciphertext string.</span>
<span class="line">        &#39;&#39;&#39;</span>
<span class="line">        plain_bytes = Plaintext.encode(&#39;utf-16-le&#39;)</span>
<span class="line">        plain_bytes += b&#39;\\x00\\x00&#39;</span>
<span class="line">        padded_plain_bytes = plain_bytes + os.urandom(Blowfish.block_size - len(plain_bytes) % Blowfish.block_size)</span>
<span class="line"></span>
<span class="line">        cipher1 = Blowfish.new(self.Key1, Blowfish.MODE_CBC, iv = self.IV)</span>
<span class="line">        cipher2 = Blowfish.new(self.Key2, Blowfish.MODE_CBC, iv = self.IV)</span>
<span class="line">        return cipher1.encrypt(os.urandom(4) + cipher2.encrypt(padded_plain_bytes) + os.urandom(4)).hex()</span>
<span class="line"></span>
<span class="line">    def Decrypt(self, Ciphertext : str):</span>
<span class="line">        &#39;&#39;&#39;</span>
<span class="line">        Decrypt ciphertext and return corresponding plaintext.</span>
<span class="line">        Args:</span>
<span class="line">            Ciphertext: A hex string that will be decrypted.</span>
<span class="line">        Returns:</span>
<span class="line">            Plaintext string.</span>
<span class="line">        &#39;&#39;&#39;</span>
<span class="line"></span>
<span class="line">        cipher1 = Blowfish.new(self.Key1, Blowfish.MODE_CBC, iv = self.IV)</span>
<span class="line">        cipher2 = Blowfish.new(self.Key2, Blowfish.MODE_CBC, iv = self.IV)</span>
<span class="line">        ciphered_bytes = bytes.fromhex(Ciphertext)</span>
<span class="line">        if len(ciphered_bytes) &lt;= 8:</span>
<span class="line">            raise ValueError(&#39;Invalid Ciphertext.&#39;)</span>
<span class="line">        </span>
<span class="line">        padded_plain_bytes = cipher2.decrypt(cipher1.decrypt(ciphered_bytes)[4:-4])</span>
<span class="line">        </span>
<span class="line">        i = 0</span>
<span class="line">        for i in range(0, len(padded_plain_bytes), 2):</span>
<span class="line">            if padded_plain_bytes[i] == 0 and padded_plain_bytes[i + 1] == 0:</span>
<span class="line">                break</span>
<span class="line">        plain_bytes = padded_plain_bytes[0:i]</span>
<span class="line"></span>
<span class="line">        try:</span>
<span class="line">            return plain_bytes.decode(&#39;utf-16-le&#39;)</span>
<span class="line">        except UnicodeDecodeError:</span>
<span class="line">            raise(ValueError(&#39;Invalid Ciphertext.&#39;))</span>
<span class="line"></span>
<span class="line">class SecureCRTCryptoV2:</span>
<span class="line"></span>
<span class="line">    def __init__(self, ConfigPassphrase : str = &#39;&#39;):</span>
<span class="line">        &#39;&#39;&#39;</span>
<span class="line">        Initialize SecureCRTCryptoV2 object.</span>
<span class="line">        Args:</span>
<span class="line">            ConfigPassphrase: The config passphrase that SecureCRT uses. Leave it empty if config passphrase is not set.</span>
<span class="line">        &#39;&#39;&#39;</span>
<span class="line">        self.IV = b&#39;\\x00&#39; * AES.block_size</span>
<span class="line">        self.Key = SHA256.new(ConfigPassphrase.encode(&#39;utf-8&#39;)).digest()</span>
<span class="line"></span>
<span class="line">    def Encrypt(self, Plaintext : str):</span>
<span class="line">        &#39;&#39;&#39;</span>
<span class="line">        Encrypt plaintext and return corresponding ciphertext.</span>
<span class="line">        Args:</span>
<span class="line">            Plaintext: A string that will be encrypted.</span>
<span class="line">        Returns:</span>
<span class="line">            Hexlified ciphertext string.</span>
<span class="line">        &#39;&#39;&#39;</span>
<span class="line">        plain_bytes = Plaintext.encode(&#39;utf-8&#39;)</span>
<span class="line">        if len(plain_bytes) &gt; 0xffffffff:</span>
<span class="line">            raise OverflowError(&#39;Plaintext is too long.&#39;)</span>
<span class="line">        </span>
<span class="line">        plain_bytes = \\</span>
<span class="line">            len(plain_bytes).to_bytes(4, &#39;little&#39;) + \\</span>
<span class="line">            plain_bytes + \\</span>
<span class="line">            SHA256.new(plain_bytes).digest()</span>
<span class="line">        padded_plain_bytes = \\</span>
<span class="line">            plain_bytes + \\</span>
<span class="line">            os.urandom(AES.block_size - len(plain_bytes) % AES.block_size)</span>
<span class="line">        cipher = AES.new(self.Key, AES.MODE_CBC, iv = self.IV)</span>
<span class="line">        return cipher.encrypt(padded_plain_bytes).hex()</span>
<span class="line"></span>
<span class="line">    def Decrypt(self, Ciphertext : str):</span>
<span class="line">        &#39;&#39;&#39;</span>
<span class="line">        Decrypt ciphertext and return corresponding plaintext.</span>
<span class="line">        Args:</span>
<span class="line">            Ciphertext: A hex string that will be decrypted.</span>
<span class="line">        Returns:</span>
<span class="line">            Plaintext string.</span>
<span class="line">        &#39;&#39;&#39;</span>
<span class="line">        cipher = AES.new(self.Key, AES.MODE_CBC, iv = self.IV)</span>
<span class="line">        padded_plain_bytes = cipher.decrypt(bytes.fromhex(Ciphertext))</span>
<span class="line">        </span>
<span class="line">        plain_bytes_length = int.from_bytes(padded_plain_bytes[0:4], &#39;little&#39;)</span>
<span class="line">        plain_bytes = padded_plain_bytes[4:4 + plain_bytes_length]</span>
<span class="line">        if len(plain_bytes) != plain_bytes_length:</span>
<span class="line">            raise ValueError(&#39;Invalid Ciphertext.&#39;)</span>
<span class="line"></span>
<span class="line">        plain_bytes_digest = padded_plain_bytes[4 + plain_bytes_length:4 + plain_bytes_length + SHA256.digest_size]</span>
<span class="line">        if len(plain_bytes_digest) != SHA256.digest_size:</span>
<span class="line">            raise ValueError(&#39;Invalid Ciphertext.&#39;)</span>
<span class="line"></span>
<span class="line">        if SHA256.new(plain_bytes).digest() != plain_bytes_digest:</span>
<span class="line">            raise ValueError(&#39;Invalid Ciphertext.&#39;)</span>
<span class="line"></span>
<span class="line">        return plain_bytes.decode(&#39;utf-8&#39;)</span>
<span class="line"></span>
<span class="line">if __name__ == &#39;__main__&#39;:</span>
<span class="line">    import sys</span>
<span class="line"></span>
<span class="line">    def Help():</span>
<span class="line">        print(&#39;Usage:&#39;)</span>
<span class="line">        print(&#39;    SecureCRTCipher.py &lt;enc|dec&gt; [-v2] [-p ConfigPassphrase] &lt;plaintext|ciphertext&gt;&#39;)</span>
<span class="line">        print(&#39;&#39;)</span>
<span class="line">        print(&#39;    &lt;enc|dec&gt;              &quot;enc&quot; for encryption, &quot;dec&quot; for decryption.&#39;)</span>
<span class="line">        print(&#39;                           This parameter must be specified.&#39;)</span>
<span class="line">        print(&#39;&#39;)</span>
<span class="line">        print(&#39;    [-v2]                  Encrypt/Decrypt with &quot;Password V2&quot; algorithm.&#39;)</span>
<span class="line">        print(&#39;                           This parameter is optional.&#39;)</span>
<span class="line">        print(&#39;&#39;)</span>
<span class="line">        print(&#39;    [-p ConfigPassphrase]  The config passphrase that SecureCRT uses.&#39;)</span>
<span class="line">        print(&#39;                           This parameter is optional.&#39;)</span>
<span class="line">        print(&#39;&#39;)</span>
<span class="line">        print(&#39;    &lt;plaintext|ciphertext&gt; Plaintext string or ciphertext string.&#39;)</span>
<span class="line">        print(&#39;                           NOTICE: Ciphertext string must be a hex string.&#39;)</span>
<span class="line">        print(&#39;                           This parameter must be specified.&#39;)</span>
<span class="line">        print(&#39;&#39;)</span>
<span class="line">    </span>
<span class="line">    def EncryptionRoutine(UseV2 : bool, ConfigPassphrase : str, Plaintext : str):</span>
<span class="line">        try:</span>
<span class="line">            if UseV2:</span>
<span class="line">                print(SecureCRTCryptoV2(ConfigPassphrase).Encrypt(Plaintext))</span>
<span class="line">            else:</span>
<span class="line">                print(SecureCRTCrypto().Encrypt(Plaintext))</span>
<span class="line">            return True</span>
<span class="line">        except:</span>
<span class="line">            print(&#39;Error: Failed to encrypt.&#39;)</span>
<span class="line">            return False</span>
<span class="line"></span>
<span class="line">    def DecryptionRoutine(UseV2 : bool, ConfigPassphrase : str, Ciphertext : str):</span>
<span class="line">        try:</span>
<span class="line">            if UseV2:</span>
<span class="line">                print(SecureCRTCryptoV2(ConfigPassphrase).Decrypt(Ciphertext))</span>
<span class="line">            else:</span>
<span class="line">                print(SecureCRTCrypto().Decrypt(Ciphertext))</span>
<span class="line">            return True</span>
<span class="line">        except:</span>
<span class="line">            print(&#39;Error: Failed to decrypt.&#39;)</span>
<span class="line">            return False</span>
<span class="line"></span>
<span class="line">    def Main(argc : int, argv : list):</span>
<span class="line">        if 3 &lt;= argc and argc &lt;= 6:</span>
<span class="line">            bUseV2 = False</span>
<span class="line">            ConfigPassphrase = &#39;&#39;</span>
<span class="line"></span>
<span class="line">            if argv[1].lower() == &#39;enc&#39;:</span>
<span class="line">                bEncrypt = True</span>
<span class="line">            elif argv[1].lower() == &#39;dec&#39;:</span>
<span class="line">                bEncrypt = False</span>
<span class="line">            else:</span>
<span class="line">                Help()</span>
<span class="line">                return -1</span>
<span class="line">            </span>
<span class="line">            i = 2</span>
<span class="line">            while i &lt; argc - 1:</span>
<span class="line">                if argv[i].lower() == &#39;-v2&#39;:</span>
<span class="line">                    bUseV2 = True</span>
<span class="line">                    i += 1</span>
<span class="line">                elif argv[i].lower() == &#39;-p&#39; and i + 1 &lt; argc - 1:</span>
<span class="line">                    ConfigPassphrase = argv[i + 1]</span>
<span class="line">                    i += 2</span>
<span class="line">                else:</span>
<span class="line">                    Help()</span>
<span class="line">                    return -1</span>
<span class="line"></span>
<span class="line">            if bUseV2 == False and len(ConfigPassphrase) != 0:</span>
<span class="line">                print(&#39;Error: ConfigPassphrase is not supported if &quot;-v2&quot; is not specified&#39;)</span>
<span class="line">                return -1</span>
<span class="line"></span>
<span class="line">            if bEncrypt:</span>
<span class="line">                return 0 if EncryptionRoutine(bUseV2, ConfigPassphrase, argv[-1]) else -1</span>
<span class="line">            else:</span>
<span class="line">                return 0 if DecryptionRoutine(bUseV2, ConfigPassphrase, argv[-1]) else -1</span>
<span class="line">        else:</span>
<span class="line">            Help()</span>
<span class="line"></span>
<span class="line">    exit(Main(len(sys.argv), sys.argv))</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、解密" tabindex="-1"><a class="header-anchor" href="#三、解密"><span>三、解密</span></a></h2><h3 id="帮助信息" tabindex="-1"><a class="header-anchor" href="#帮助信息"><span>帮助信息</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># python SecureCRTCipher.py</span>
<span class="line">Usage:</span>
<span class="line">    SecureCRTCipher.py &lt;enc|dec&gt; [-v2] [-p ConfigPassphrase] &lt;plaintext|ciphertext&gt;</span>
<span class="line"></span>
<span class="line">    &lt;enc|dec&gt;              &quot;enc&quot; for encryption, &quot;dec&quot; for decryption.</span>
<span class="line">                           This parameter must be specified.</span>
<span class="line"></span>
<span class="line">    [-v2]                  Encrypt/Decrypt with &quot;Password V2&quot; algorithm.</span>
<span class="line">                           This parameter is optional.</span>
<span class="line"></span>
<span class="line">    [-p ConfigPassphrase]  The config passphrase that SecureCRT uses.</span>
<span class="line">                           This parameter is optional.</span>
<span class="line"></span>
<span class="line">    &lt;plaintext|ciphertext&gt; Plaintext string or ciphertext string.</span>
<span class="line">                           NOTICE: Ciphertext string must be a hex string.</span>
<span class="line">                           This parameter must be specified.</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-如果ini配置文件是v2" tabindex="-1"><a class="header-anchor" href="#_1-如果ini配置文件是v2"><span>1.如果ini配置文件是v2</span></a></h3><p>执行命令行中执行python decrypt.py dec [-v2] 编码字符串</p><p>执行</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">python SecureCRTCipher.py dec -v2 加密串</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_2-如果ini配置文件是" tabindex="-1"><a class="header-anchor" href="#_2-如果ini配置文件是"><span>2.如果ini配置文件是</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">python SecureCRTCipher.py dec  加密串</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>例如：</p><p><img src="https://imgoss.xgss.net/picgo/image-20221102133949379.png?aliyun" alt="image-20221102133949379"></p><p>解密成功。</p>`,32)]))}const d=n(l,[["render",p]]),t=JSON.parse('{"path":"/software/%E5%A6%82%E4%BD%95%E8%A7%A3%E5%AF%86%E6%9C%AC%E6%9C%BASecureCRT%E4%BF%9D%E5%AD%98%E7%9A%84%E5%AF%86%E7%A0%81.html","title":"如何解密本机SecureCRT保存的密码","lang":"en-US","frontmatter":{},"git":{"updatedTime":1749111496000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":1,"url":"https://github.com/star"}],"changelog":[{"hash":"f42710dc7c9262f92ca07eb1bfb1c7d35be48fda","time":1749111496000,"email":"star@xgss.net","author":"star","message":"deploy.sh-vuepressV2脚本自动提交"}]},"filePathRelative":"software/如何解密本机SecureCRT保存的密码.md"}');export{d as comp,t as data};
