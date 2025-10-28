import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,o as i}from"./app-BiQR_lPj.js";const p={};function l(r,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="如何解密本机securecrt保存的密码" tabindex="-1"><a class="header-anchor" href="#如何解密本机securecrt保存的密码"><span>如何解密本机SecureCRT保存的密码</span></a></h1><p>今天查看一台服务器的，发现登陆不了，可能是防火墙误操作了，需要去机房操作。</p><p>之前用securecrt成功登陆过，所以本机的配置文件是保存密码了，需要用python来解密</p><h2 id="一-查找配置文件" tabindex="-1"><a class="header-anchor" href="#一-查找配置文件"><span>一.查找配置文件</span></a></h2><p><img src="https://imgoss.xgss.net/picgo/image-20221102132755681.png?aliyun" alt="image-20221102132755681"></p><p>找到配置文件打开</p><p><img src="https://imgoss.xgss.net/picgo/image-20221102132903604.png?aliyun" alt="image-20221102132903604"></p><h2 id="二、安装python3和解密文件" tabindex="-1"><a class="header-anchor" href="#二、安装python3和解密文件"><span>二、安装python3和解密文件</span></a></h2><p>1.安装python：</p><p>官网下载 https://www.python.org/downloads/</p><p>再编辑文件</p><p>参考： https://github.com/HyperSine/how-does-SecureCRT-encrypt-password</p><p>SecureCRT 中的密码进行了加密，需要解码才能得到对应的明文，这是使用python解密</p><p>使用pip 安装Crypto模块</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>pip3 install pycryptodome</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>编写python解码文件decrypt.py</p><p>下载文件： https://raw.githubusercontent.com/HyperSine/how-does-SecureCRT-encrypt-password/master/python3/SecureCRTCipher.py</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>新建文件</span></span>
<span class="line"><span># vim SecureCRTCipher.py</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>内容文件：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>#!/usr/bin/env python3</span></span>
<span class="line"><span>#https://github.com/HyperSine/how-does-SecureCRT-encrypt-password</span></span>
<span class="line"><span>import os</span></span>
<span class="line"><span>from Crypto.Hash import SHA256</span></span>
<span class="line"><span>from Crypto.Cipher import AES, Blowfish</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class SecureCRTCrypto:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __init__(self):</span></span>
<span class="line"><span>        &#39;&#39;&#39;</span></span>
<span class="line"><span>        Initialize SecureCRTCrypto object.</span></span>
<span class="line"><span>        &#39;&#39;&#39;</span></span>
<span class="line"><span>        self.IV = b&#39;\\x00&#39; * Blowfish.block_size</span></span>
<span class="line"><span>        self.Key1 = b&#39;\\x24\\xA6\\x3D\\xDE\\x5B\\xD3\\xB3\\x82\\x9C\\x7E\\x06\\xF4\\x08\\x16\\xAA\\x07&#39;</span></span>
<span class="line"><span>        self.Key2 = b&#39;\\x5F\\xB0\\x45\\xA2\\x94\\x17\\xD9\\x16\\xC6\\xC6\\xA2\\xFF\\x06\\x41\\x82\\xB7&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def Encrypt(self, Plaintext : str):</span></span>
<span class="line"><span>        &#39;&#39;&#39;</span></span>
<span class="line"><span>        Encrypt plaintext and return corresponding ciphertext.</span></span>
<span class="line"><span>        Args:</span></span>
<span class="line"><span>            Plaintext: A string that will be encrypted.</span></span>
<span class="line"><span>        Returns:</span></span>
<span class="line"><span>            Hexlified ciphertext string.</span></span>
<span class="line"><span>        &#39;&#39;&#39;</span></span>
<span class="line"><span>        plain_bytes = Plaintext.encode(&#39;utf-16-le&#39;)</span></span>
<span class="line"><span>        plain_bytes += b&#39;\\x00\\x00&#39;</span></span>
<span class="line"><span>        padded_plain_bytes = plain_bytes + os.urandom(Blowfish.block_size - len(plain_bytes) % Blowfish.block_size)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        cipher1 = Blowfish.new(self.Key1, Blowfish.MODE_CBC, iv = self.IV)</span></span>
<span class="line"><span>        cipher2 = Blowfish.new(self.Key2, Blowfish.MODE_CBC, iv = self.IV)</span></span>
<span class="line"><span>        return cipher1.encrypt(os.urandom(4) + cipher2.encrypt(padded_plain_bytes) + os.urandom(4)).hex()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def Decrypt(self, Ciphertext : str):</span></span>
<span class="line"><span>        &#39;&#39;&#39;</span></span>
<span class="line"><span>        Decrypt ciphertext and return corresponding plaintext.</span></span>
<span class="line"><span>        Args:</span></span>
<span class="line"><span>            Ciphertext: A hex string that will be decrypted.</span></span>
<span class="line"><span>        Returns:</span></span>
<span class="line"><span>            Plaintext string.</span></span>
<span class="line"><span>        &#39;&#39;&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        cipher1 = Blowfish.new(self.Key1, Blowfish.MODE_CBC, iv = self.IV)</span></span>
<span class="line"><span>        cipher2 = Blowfish.new(self.Key2, Blowfish.MODE_CBC, iv = self.IV)</span></span>
<span class="line"><span>        ciphered_bytes = bytes.fromhex(Ciphertext)</span></span>
<span class="line"><span>        if len(ciphered_bytes) &lt;= 8:</span></span>
<span class="line"><span>            raise ValueError(&#39;Invalid Ciphertext.&#39;)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        padded_plain_bytes = cipher2.decrypt(cipher1.decrypt(ciphered_bytes)[4:-4])</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        i = 0</span></span>
<span class="line"><span>        for i in range(0, len(padded_plain_bytes), 2):</span></span>
<span class="line"><span>            if padded_plain_bytes[i] == 0 and padded_plain_bytes[i + 1] == 0:</span></span>
<span class="line"><span>                break</span></span>
<span class="line"><span>        plain_bytes = padded_plain_bytes[0:i]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        try:</span></span>
<span class="line"><span>            return plain_bytes.decode(&#39;utf-16-le&#39;)</span></span>
<span class="line"><span>        except UnicodeDecodeError:</span></span>
<span class="line"><span>            raise(ValueError(&#39;Invalid Ciphertext.&#39;))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class SecureCRTCryptoV2:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __init__(self, ConfigPassphrase : str = &#39;&#39;):</span></span>
<span class="line"><span>        &#39;&#39;&#39;</span></span>
<span class="line"><span>        Initialize SecureCRTCryptoV2 object.</span></span>
<span class="line"><span>        Args:</span></span>
<span class="line"><span>            ConfigPassphrase: The config passphrase that SecureCRT uses. Leave it empty if config passphrase is not set.</span></span>
<span class="line"><span>        &#39;&#39;&#39;</span></span>
<span class="line"><span>        self.IV = b&#39;\\x00&#39; * AES.block_size</span></span>
<span class="line"><span>        self.Key = SHA256.new(ConfigPassphrase.encode(&#39;utf-8&#39;)).digest()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def Encrypt(self, Plaintext : str):</span></span>
<span class="line"><span>        &#39;&#39;&#39;</span></span>
<span class="line"><span>        Encrypt plaintext and return corresponding ciphertext.</span></span>
<span class="line"><span>        Args:</span></span>
<span class="line"><span>            Plaintext: A string that will be encrypted.</span></span>
<span class="line"><span>        Returns:</span></span>
<span class="line"><span>            Hexlified ciphertext string.</span></span>
<span class="line"><span>        &#39;&#39;&#39;</span></span>
<span class="line"><span>        plain_bytes = Plaintext.encode(&#39;utf-8&#39;)</span></span>
<span class="line"><span>        if len(plain_bytes) &gt; 0xffffffff:</span></span>
<span class="line"><span>            raise OverflowError(&#39;Plaintext is too long.&#39;)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        plain_bytes = \\</span></span>
<span class="line"><span>            len(plain_bytes).to_bytes(4, &#39;little&#39;) + \\</span></span>
<span class="line"><span>            plain_bytes + \\</span></span>
<span class="line"><span>            SHA256.new(plain_bytes).digest()</span></span>
<span class="line"><span>        padded_plain_bytes = \\</span></span>
<span class="line"><span>            plain_bytes + \\</span></span>
<span class="line"><span>            os.urandom(AES.block_size - len(plain_bytes) % AES.block_size)</span></span>
<span class="line"><span>        cipher = AES.new(self.Key, AES.MODE_CBC, iv = self.IV)</span></span>
<span class="line"><span>        return cipher.encrypt(padded_plain_bytes).hex()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def Decrypt(self, Ciphertext : str):</span></span>
<span class="line"><span>        &#39;&#39;&#39;</span></span>
<span class="line"><span>        Decrypt ciphertext and return corresponding plaintext.</span></span>
<span class="line"><span>        Args:</span></span>
<span class="line"><span>            Ciphertext: A hex string that will be decrypted.</span></span>
<span class="line"><span>        Returns:</span></span>
<span class="line"><span>            Plaintext string.</span></span>
<span class="line"><span>        &#39;&#39;&#39;</span></span>
<span class="line"><span>        cipher = AES.new(self.Key, AES.MODE_CBC, iv = self.IV)</span></span>
<span class="line"><span>        padded_plain_bytes = cipher.decrypt(bytes.fromhex(Ciphertext))</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        plain_bytes_length = int.from_bytes(padded_plain_bytes[0:4], &#39;little&#39;)</span></span>
<span class="line"><span>        plain_bytes = padded_plain_bytes[4:4 + plain_bytes_length]</span></span>
<span class="line"><span>        if len(plain_bytes) != plain_bytes_length:</span></span>
<span class="line"><span>            raise ValueError(&#39;Invalid Ciphertext.&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        plain_bytes_digest = padded_plain_bytes[4 + plain_bytes_length:4 + plain_bytes_length + SHA256.digest_size]</span></span>
<span class="line"><span>        if len(plain_bytes_digest) != SHA256.digest_size:</span></span>
<span class="line"><span>            raise ValueError(&#39;Invalid Ciphertext.&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if SHA256.new(plain_bytes).digest() != plain_bytes_digest:</span></span>
<span class="line"><span>            raise ValueError(&#39;Invalid Ciphertext.&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return plain_bytes.decode(&#39;utf-8&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &#39;__main__&#39;:</span></span>
<span class="line"><span>    import sys</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def Help():</span></span>
<span class="line"><span>        print(&#39;Usage:&#39;)</span></span>
<span class="line"><span>        print(&#39;    SecureCRTCipher.py &lt;enc|dec&gt; [-v2] [-p ConfigPassphrase] &lt;plaintext|ciphertext&gt;&#39;)</span></span>
<span class="line"><span>        print(&#39;&#39;)</span></span>
<span class="line"><span>        print(&#39;    &lt;enc|dec&gt;              &quot;enc&quot; for encryption, &quot;dec&quot; for decryption.&#39;)</span></span>
<span class="line"><span>        print(&#39;                           This parameter must be specified.&#39;)</span></span>
<span class="line"><span>        print(&#39;&#39;)</span></span>
<span class="line"><span>        print(&#39;    [-v2]                  Encrypt/Decrypt with &quot;Password V2&quot; algorithm.&#39;)</span></span>
<span class="line"><span>        print(&#39;                           This parameter is optional.&#39;)</span></span>
<span class="line"><span>        print(&#39;&#39;)</span></span>
<span class="line"><span>        print(&#39;    [-p ConfigPassphrase]  The config passphrase that SecureCRT uses.&#39;)</span></span>
<span class="line"><span>        print(&#39;                           This parameter is optional.&#39;)</span></span>
<span class="line"><span>        print(&#39;&#39;)</span></span>
<span class="line"><span>        print(&#39;    &lt;plaintext|ciphertext&gt; Plaintext string or ciphertext string.&#39;)</span></span>
<span class="line"><span>        print(&#39;                           NOTICE: Ciphertext string must be a hex string.&#39;)</span></span>
<span class="line"><span>        print(&#39;                           This parameter must be specified.&#39;)</span></span>
<span class="line"><span>        print(&#39;&#39;)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    def EncryptionRoutine(UseV2 : bool, ConfigPassphrase : str, Plaintext : str):</span></span>
<span class="line"><span>        try:</span></span>
<span class="line"><span>            if UseV2:</span></span>
<span class="line"><span>                print(SecureCRTCryptoV2(ConfigPassphrase).Encrypt(Plaintext))</span></span>
<span class="line"><span>            else:</span></span>
<span class="line"><span>                print(SecureCRTCrypto().Encrypt(Plaintext))</span></span>
<span class="line"><span>            return True</span></span>
<span class="line"><span>        except:</span></span>
<span class="line"><span>            print(&#39;Error: Failed to encrypt.&#39;)</span></span>
<span class="line"><span>            return False</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def DecryptionRoutine(UseV2 : bool, ConfigPassphrase : str, Ciphertext : str):</span></span>
<span class="line"><span>        try:</span></span>
<span class="line"><span>            if UseV2:</span></span>
<span class="line"><span>                print(SecureCRTCryptoV2(ConfigPassphrase).Decrypt(Ciphertext))</span></span>
<span class="line"><span>            else:</span></span>
<span class="line"><span>                print(SecureCRTCrypto().Decrypt(Ciphertext))</span></span>
<span class="line"><span>            return True</span></span>
<span class="line"><span>        except:</span></span>
<span class="line"><span>            print(&#39;Error: Failed to decrypt.&#39;)</span></span>
<span class="line"><span>            return False</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def Main(argc : int, argv : list):</span></span>
<span class="line"><span>        if 3 &lt;= argc and argc &lt;= 6:</span></span>
<span class="line"><span>            bUseV2 = False</span></span>
<span class="line"><span>            ConfigPassphrase = &#39;&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if argv[1].lower() == &#39;enc&#39;:</span></span>
<span class="line"><span>                bEncrypt = True</span></span>
<span class="line"><span>            elif argv[1].lower() == &#39;dec&#39;:</span></span>
<span class="line"><span>                bEncrypt = False</span></span>
<span class="line"><span>            else:</span></span>
<span class="line"><span>                Help()</span></span>
<span class="line"><span>                return -1</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            i = 2</span></span>
<span class="line"><span>            while i &lt; argc - 1:</span></span>
<span class="line"><span>                if argv[i].lower() == &#39;-v2&#39;:</span></span>
<span class="line"><span>                    bUseV2 = True</span></span>
<span class="line"><span>                    i += 1</span></span>
<span class="line"><span>                elif argv[i].lower() == &#39;-p&#39; and i + 1 &lt; argc - 1:</span></span>
<span class="line"><span>                    ConfigPassphrase = argv[i + 1]</span></span>
<span class="line"><span>                    i += 2</span></span>
<span class="line"><span>                else:</span></span>
<span class="line"><span>                    Help()</span></span>
<span class="line"><span>                    return -1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if bUseV2 == False and len(ConfigPassphrase) != 0:</span></span>
<span class="line"><span>                print(&#39;Error: ConfigPassphrase is not supported if &quot;-v2&quot; is not specified&#39;)</span></span>
<span class="line"><span>                return -1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if bEncrypt:</span></span>
<span class="line"><span>                return 0 if EncryptionRoutine(bUseV2, ConfigPassphrase, argv[-1]) else -1</span></span>
<span class="line"><span>            else:</span></span>
<span class="line"><span>                return 0 if DecryptionRoutine(bUseV2, ConfigPassphrase, argv[-1]) else -1</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            Help()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    exit(Main(len(sys.argv), sys.argv))</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、解密" tabindex="-1"><a class="header-anchor" href="#三、解密"><span>三、解密</span></a></h2><h3 id="帮助信息" tabindex="-1"><a class="header-anchor" href="#帮助信息"><span>帮助信息</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># python SecureCRTCipher.py</span></span>
<span class="line"><span>Usage:</span></span>
<span class="line"><span>    SecureCRTCipher.py &lt;enc|dec&gt; [-v2] [-p ConfigPassphrase] &lt;plaintext|ciphertext&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;enc|dec&gt;              &quot;enc&quot; for encryption, &quot;dec&quot; for decryption.</span></span>
<span class="line"><span>                           This parameter must be specified.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    [-v2]                  Encrypt/Decrypt with &quot;Password V2&quot; algorithm.</span></span>
<span class="line"><span>                           This parameter is optional.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    [-p ConfigPassphrase]  The config passphrase that SecureCRT uses.</span></span>
<span class="line"><span>                           This parameter is optional.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;plaintext|ciphertext&gt; Plaintext string or ciphertext string.</span></span>
<span class="line"><span>                           NOTICE: Ciphertext string must be a hex string.</span></span>
<span class="line"><span>                           This parameter must be specified.</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-如果ini配置文件是v2" tabindex="-1"><a class="header-anchor" href="#_1-如果ini配置文件是v2"><span>1.如果ini配置文件是v2</span></a></h3><p>执行命令行中执行python decrypt.py dec [-v2] 编码字符串</p><p>执行</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>python SecureCRTCipher.py dec -v2 加密串</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_2-如果ini配置文件是" tabindex="-1"><a class="header-anchor" href="#_2-如果ini配置文件是"><span>2.如果ini配置文件是</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>python SecureCRTCipher.py dec  加密串</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>例如：</p><p><img src="https://imgoss.xgss.net/picgo/image-20221102133949379.png?aliyun" alt="image-20221102133949379"></p><p>解密成功。</p>`,32)]))}const t=n(p,[["render",l]]),v=JSON.parse('{"path":"/article/881x9qgj/","title":"如何解密本机SecureCRT保存的密码","lang":"en-US","frontmatter":{"title":"如何解密本机SecureCRT保存的密码","createTime":"2025/05/27 17:51:17","permalink":"/article/881x9qgj/"},"git":{"createdTime":1749111496000,"updatedTime":1750129445000,"contributors":[{"name":"star","username":"star","email":"star@xgss.net","commits":2,"url":"https://github.com/star"}]},"readingTime":{"minutes":3.41,"words":1024},"filePathRelative":"software/如何解密本机SecureCRT保存的密码.md"}');export{t as comp,v as data};
