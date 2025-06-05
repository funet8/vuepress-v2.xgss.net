# 系统加固-Linux不允许用户使用密码登录，只能使用密钥登录



# 一、密码登录的安全隐患

传统的密码登录方式，尽管简单直接，却存在诸多安全隐患。首先，**密码本身容易被猜测或通过暴力破解手段获得**。特别是当用户设置了过于简单或常见的密码时，系统面临的安全风险将显著增加。其次，**密码在传输过程中可能会被截获**，尤其是在不安全的网络环境下，这进一步加剧了安全风险。最后，即使密码本身足够复杂且安全，但用户在不同平台间重复使用密码的习惯也容易导致“**一损俱损**”的连锁反应。

俗话不怕贼偷就怕贼惦记，服务器每天收到近万条尝试登录失败的通知。

![image-20241203153231920](https://imgoss.xgss.net/picgo/image-20241203153231920.png?aliyun)

# **二、密钥认证的优势**

与密码登录相比，密钥认证机制在安全性方面有着显著的优势。密钥认证基于公钥和私钥的加密技术，用户需要在本地生成一对密钥，其中公钥上传至服务器，私钥则保存在本地且不应泄露。在登录过程中，用户通过私钥对服务器发送的挑战进行签名，服务器则使用对应的公钥进行验证。由于私钥的私密性和不可复制性，这种认证方式极大地提高了登录过程的安全性。

此外，密钥认证还提供了更强的身份验证能力。即使攻击者获得了用户的公钥，也无法直接用于登录，因为私钥始终掌握在用户手中。同时，密钥认证还可以支持多因素认证，如结合密码、生物特征等，进一步提升系统安全性。

![image-20241203155625819](https://imgoss.xgss.net/picgo/image-20241203155625819.png?aliyun)



# 生成密钥对

生成 SSH 密钥对（包括公钥和私钥）是用于进行公钥认证的常见操作。以下是在 Linux 或 macOS 中生成 SSH 密钥对的步骤。

## 1: 生成 SSH 密钥对

1. 打开终端（Terminal）。

2. 使用 `ssh-keygen` 命令生成 SSH 密钥对：

   ```
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```

   这里：

   - `-t rsa`：指定使用 RSA 算法。
   - `-b 4096`：指定密钥长度为 4096 位（更长的密钥更安全）。
   - `-C "your_email@example.com"`：这是一个可选的标签，用于标识该密钥的用途。

3. 系统会提示你选择保存密钥的文件路径，默认保存在 `~/.ssh/id_rsa`：

   ```
   Enter file in which to save the key (/home/youruser/.ssh/id_rsa):
   ```

   如果你不想使用默认路径，可以指定一个路径，或者直接按 Enter 键使用默认路径。

4. 接下来，系统会提示你输入一个密码（可选），该密码用于保护你的私钥：

   ```
   Enter passphrase (empty for no passphrase):
   ```

   如果你希望设置一个密码保护私钥，输入密码；如果不需要密码保护，直接按 Enter 键。

## 步骤 2: 查看生成的密钥文件

生成的密钥对包含两个文件：

- **私钥**（默认文件为 `~/.ssh/id_rsa`）：不要将私钥泄露给任何人。
- **公钥**（默认文件为 `~/.ssh/id_rsa.pub`）：可以将公钥复制到远程服务器上，用于身份验证。

可以使用以下命令查看它们：

```
ls -l ~/.ssh/
```

## 步骤 3: 将公钥复制到远程服务器

为了使用 SSH 密钥认证登录远程服务器，你需要将公钥添加到远程服务器的 `~/.ssh/authorized_keys` 文件中。

### 手动方式

1. 复制公钥内容：

   使用 `cat` 命令查看公钥内容：

   ```
   cat ~/.ssh/id_rsa.pub
   ```

   复制输出的公钥内容（包括 `ssh-rsa` 开头和结束的部分）。

2. 将公钥添加到远程服务器：

   登录到远程服务器，进入 root 或目标用户的 `~/.ssh` 目录：

   ```
   ssh user@your_server_ip
   mkdir -p ~/.ssh
   chmod 700 ~/.ssh
   nano ~/.ssh/authorized_keys
   ```

   将复制的公钥粘贴到 `authorized_keys` 文件中，并保存退出。

3. 设置权限：

   ```
   chmod 600 ~/.ssh/authorized_keys
   ```

### 使用 `ssh-copy-id` 自动复制公钥

如果你有密码登录的权限，可以使用 `ssh-copy-id` 自动将公钥复制到远程服务器：

```
ssh-copy-id user@your_server_ip
```

系统会提示输入远程主机的密码，验证成功后会将公钥自动添加到远程服务器的 `~/.ssh/authorized_keys` 中。

## 步骤 4: 测试 SSH 登录

完成上述步骤后，尝试使用以下命令登录远程服务器，验证公钥认证是否成功：

```
ssh -i ~/.ssh/id_rsa user@your_server_ip
```

如果一切配置正确，你应该能够成功登录，无需输入密码（如果没有设置私钥的 passphrase）。



# 配置服务器SSHD



需求：

centos7系统，不允许root用户等使用密码登录，只能使用密钥登录，公钥为：ssh-rsa ABCd123

![image-20241203155919760](https://imgoss.xgss.net/picgo/image-20241203155919760.png?aliyun)

## 1. 配置 SSH 服务

编辑 `sshd` 配置文件：

```
vi /etc/ssh/sshd_config
在文件中修改或添加以下参数：
# 禁止密码认证
PasswordAuthentication no

# 允许公钥认证
PubkeyAuthentication yes

# 禁止 root 用户使用密码登录
PermitRootLogin prohibit-password
```

- `PasswordAuthentication no`：禁止所有用户使用密码登录。
- `PubkeyAuthentication yes`：允许使用公钥认证。
- `PermitRootLogin prohibit-password`：禁止 root 使用密码登录，但允许其通过公钥登录。

## 2. 添加公钥到 root 用户

将提供的公钥 `ssh-rsa ABCd123`  刚才生成的密钥添加到 `root` 用户的 `authorized_keys` 文件中。

执行以下命令：

```
sudo mkdir -p /root/.ssh
sudo chmod 700 /root/.ssh
echo "ssh-rsa ABCd123" | sudo tee /root/.ssh/authorized_keys
sudo chmod 600 /root/.ssh/authorized_keys
sudo chown -R root:root /root/.ssh
```

## 3. 重启 SSH 服务

保存修改后，重启 SSH 服务以应用更改：

```
sudo systemctl restart sshd
```

## 4. 测试登录

确保本地有对应的私钥文件，并用以下命令测试登录：

```
ssh -i /path/to/private_key root@your_server_ip
```

## 5. 检查日志

如果遇到问题，可以查看 `/var/log/secure` 获取详细日志：

```
sudo tail -f /var/log/secure
```

## 注意事项

- 确保防火墙允许 SSH 连接，必要时检查 `firewalld` 或 `iptables` 配置。
- 使用非 `root` 用户管理系统，`root` 权限仅在必要时通过 `sudo` 提升。

# 用shell脚本

```
#!/bin/bash

# 定义公钥内容
PUB_KEY="ssh-rsa ABCd123"

# 检查是否为root用户执行
if [ "$(id -u)" -ne 0 ]; then
    echo "请使用 root 用户执行此脚本！"
    exit 1
fi

echo "开始配置 SSH 服务..."

# 设置 root 用户的公钥
echo "配置 root 用户的公钥..."
mkdir -p /root/.ssh
chmod 700 /root/.ssh
echo "$PUB_KEY" >> /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys
chown -R root:root /root/.ssh
echo "公钥配置完成！"

# 修改 SSH 配置文件
echo "修改 SSH 配置文件..."
SSHD_CONFIG="/etc/ssh/sshd_config"

# 备份原配置文件
if [ ! -f "$SSHD_CONFIG.bak" ]; then
    cp $SSHD_CONFIG "$SSHD_CONFIG.bak"
    echo "原配置文件已备份到 $SSHD_CONFIG.bak"
fi

# 修改配置项
sed -i 's/^#*\(PasswordAuthentication\).*/\1 no/' $SSHD_CONFIG
sed -i 's/^#*\(PubkeyAuthentication\).*/\1 yes/' $SSHD_CONFIG
sed -i 's/^#*\(PermitRootLogin\).*/\1 prohibit-password/' $SSHD_CONFIG

# 确保关键配置存在
grep -q "^PasswordAuthentication no" $SSHD_CONFIG || echo "PasswordAuthentication no" >> $SSHD_CONFIG
grep -q "^PubkeyAuthentication yes" $SSHD_CONFIG || echo "PubkeyAuthentication yes" >> $SSHD_CONFIG
grep -q "^PermitRootLogin prohibit-password" $SSHD_CONFIG || echo "PermitRootLogin prohibit-password" >> $SSHD_CONFIG

echo "SSH 配置修改完成！"

# 重启 SSH 服务
echo "重启 SSH 服务..."
systemctl restart sshd
if [ $? -eq 0 ]; then
    echo "SSH 服务重启成功！"
else
    echo "SSH 服务重启失败，请检查配置。"
    exit 1
fi

echo "配置完成！root 用户已禁止密码登录，仅支持公钥认证。"

# 测试完成提示
echo "请使用以下命令测试登录："
echo "ssh -i /path/to/private_key root@your_server_ip"
```

# 结尾

通过禁用密码登录并启用密钥认证机制，Linux系统能够显著提升其安全性。这种加固措施不仅减少了因密码泄露或猜测而导致的安全风险，还为用户提供了更为便捷和安全的登录体验。当然，为了保持系统的持续安全，用户还应定期更新密钥、监控系统日志以及采取其他必要的安全措施。在数字化转型的浪潮中，让我们共同努力，为构建更加安全、可靠的数字世界贡献力量。