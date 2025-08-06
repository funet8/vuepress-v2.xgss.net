# 解决Nginx的HTTPS跨域内容显示问题



## 遇到的问题

最近星哥遇到一个问题就是

A域名、B域名同时记录解析到1.1.1.1服务器中

A域名配置了http和https

B域名配置了http，没有配置https

问题： B域名使用https访问，能看到A域名的内容

最简单的方法是把B域名也配置一个HTTPS的站点，但是因为B域名没有证书或者不需要https。

## 可能的原因：

当通过 HTTPS 访问 B 域名时，却显示了 A 域名的内容。这通常是因为 Nginx 在处理 B 域名的 HTTPS 请求时，找不到匹配的 HTTPS 服务器块，从而退回（fallback）到默认的（或第一个配置的）HTTPS 服务器块，而这个服务器块恰好是 A 域名的。

![image-20250730170843227](https://imgoss.xgss.net/picgo-tx2025/image-20250730170843227.png?tx)

# 配置默认HTTPS 服务器块

配置为服务器配置一个默认的 HTTPS 服务器块

如果您的服务器上托管了多个域名，并且希望确保任何对未知或未配置 HTTPS 域名的请求都不会落入其他域名的内容，这是一种更健壮的方法。

## 自签名证书

### 步骤一：生成私钥

首先，需要为您的证书生成一个私钥。这个私钥将用于加密和解密数据，并且应该妥善保管，切勿泄露。

在终端中运行以下命令：

```
cd /etc/nginx/ssl/
openssl genrsa -out default_server.key 2048
```

解释：

openssl genrsa: 这是 OpenSSL 中用于生成 RSA 私钥的命令。

-out default_server.key: 指定输出文件的名称。请将 default_server.key 替换为您的实际域名（例如 example.com.key），这样更容易识别。

2048: 指定私钥的长度为 2048 位，这是一个常用的安全长度。

执行此命令后，会在当前目录下生成一个名为 default_server.key 的文件，这就是您的私钥。

### 步骤二：生成证书签名请求 (CSR)

接下来，您需要生成一个证书签名请求 (CSR)。CSR 包含了您的公钥以及一些关于您的组织和域名的信息。通常，当您向 CA 申请证书时，您会把这个 CSR 发给他们。但在自签名的情况下，我们会用它来创建自己的证书。

```
openssl req -new -key default_server.key -out default_server.csr
```

解释：

- `openssl req`: 这是 OpenSSL 中用于生成 CSR 和管理证书的命令。
- `-new`: 表示生成一个新的 CSR。
- `-key default_server.key`: 指定使用上一步生成的私钥。
- `-out default_server.csr`: 指定输出 CSR 文件的名称。

执行此命令后，系统会提示您输入一些信息，这些信息将包含在您的证书中。请注意以下几点：

可以不用输入信息，全部回车。

- **Common Name (CN)**：这是最重要的一项。对于服务器证书，这里应该输入您的**域名**（例如 `example.com` 或 `www.example.com`）。如果您打算将此证书用于 IP 地址，则输入 IP 地址。如果用于多个域名，则需要一个支持 SAN (Subject Alternative Name) 的证书，这在基本自签名中不直接支持，但可以通过配置文件实现更复杂的自签名。
- **Organization Name (O)**, **Organization Unit (OU)**, **Locality (L)**, **State or Province (ST)**, **Country Name (C)**：这些是可选的组织信息。
- **Email Address**：可选。
- **A challenge password / An optional company name**: 这些可以留空，通常在自签名证书中不需要。

填写完毕后，会在当前目录下生成一个名为 default_server.csr` 的文件。

### 步骤三：自签名证书

最后一步是使用您自己的私钥来“签名”您刚刚生成的 CSR，从而创建自签名证书。

```
openssl x509 -req -days 365 -in default_server.csr -signkey default_server.key -out default_server.crt
```

- `openssl x509`: 这是 OpenSSL 中用于处理 X.509 证书的命令。
- `-req`: 表示输入的是一个 CSR。
- `-days 365`: 指定证书的有效期为 365 天。您可以根据需要调整这个数字。
- `-in default_server.csr`: 指定使用上一步生成的 CSR 文件。
- `-signkey default_server.key`: 指定用于签名的私钥，这里就是您自己的私钥。
- `-out default_server.crt`: 指定输出证书文件的名称。通常以 `.crt` 结尾。

执行此命令后，您会在当前目录下得到一个名为 default_server.crt` 的文件，这就是您的**自签名证书**！



## 配置nginx

```
server {
    listen 443 ssl default_server;
    server_name _; # 捕获所有未匹配的域名

    # 使用一个虚拟证书或通用证书
    ssl_certificate /etc/nginx/ssl/default_server.crt; # 虚拟或自签名证书的路径
    ssl_certificate_key /etc/nginx/ssl/default_server.key; # 虚拟或自签名密钥的路径

    # 返回 444（无响应）或重定向到 HTTP
    return 444; # 关闭连接而不发送任何响应
    # 或者重定向到通用的 HTTP 页面，或者直接拒绝
    # return 301 http://$host$request_uri;
    # deny all;
}

# 您的 A 域名现有 HTTPS 配置
server {
    listen 443 ssl;
    server_name A.com www.A.com; # 将 A.com 替换为您的实际 A 域名

    ssl_certificate /etc/nginx/ssl/A.com.crt;
    ssl_certificate_key /etc/nginx/ssl/A.com.key;

    # 您的 A 域名 HTTPS 内容配置
    root /var/www/A.com;
    index index.html;
}

# 您的 B 域名现有 HTTP 配置
server {
    listen 80;
    server_name B.com www.B.com; # 将 B.com 替换为您的实际 B 域名

    root /var/www/B.com;
    index index.html;
}

# 您的 A 域名现有 HTTP 配置（如果有的话）
server {
    listen 80;
    server_name A.com www.A.com;

    root /var/www/A.com;
    index index.html;
}
```

**解释：**

- `listen 443 ssl` 行上的 `default_server` 指令使得这个服务器块成为任何未匹配其他 `server_name` 的 443 端口 HTTPS 请求的**备用**。
- `server_name _;` 是表示捕获所有未匹配域名的常用方式（它永远不会匹配真实的域名）。
- `return 444;` 是 Nginx 特定的状态码，它会关闭连接而不向客户端发送任何响应。这对于阻止不必要的流量非常有用。或者，您可以使用 `deny all;` 或像方案一那样进行重定向。
- 您**必须**为这个默认的 HTTPS 块提供 `ssl_certificate` 和 `ssl_certificate_key`，以便 Nginx 可以完成 SSL 握手。在这里使用自签名或虚拟证书是完全可以的，它的目的只是为了捕获未配置的 HTTPS 请求。



# 省流版

```
生成证书：
cd /etc/nginx/ssl/
openssl genrsa -out default_server.key 2048
openssl req -new -key default_server.key -out default_server.csr
openssl x509 -req -days 3650 -in default_server.csr -signkey default_server.key -out default_server.crt

server {
    listen 443 ssl default_server;
    server_name _; # 捕获所有未匹配的域名

    # 使用一个虚拟证书或通用证书
    ssl_certificate /etc/nginx/ssl/default_server.crt; # 虚拟或自签名证书的路径
    ssl_certificate_key /etc/nginx/ssl/default_server.key; # 虚拟或自签名密钥的路径

    # 返回 444（无响应）或重定向到 HTTP
    return 444; # 关闭连接而不发送任何响应
    # 或者重定向到通用的 HTTP 页面，或者直接拒绝
    # return 301 http://$host$request_uri;
    # deny all;
}
```

查看证书

![img](https://imgoss.xgss.net/picgo-tx2025/QQ_1753862473287.png?tx)











