# Python自学16 - 对象的序列化和反序列化



在 Python 编程中，我们经常需要将内存中的对象（如列表、字典、自定义类的实例等）保存到文件中，或者在网络上传输对象。但内存中的对象是动态存在的，无法直接存储或传输，这就需要借助**序列化**和**反序列化**技术。本篇文章将详细讲解 Python 中对象序列化和反序列化的概念、常用模块及实际应用，帮助你轻松掌握这一重要知识点。

------

## 1️⃣ 什么是序列化和反序列化

在正式学习相关模块前，我们先明确两个核心概念：

- **序列化（Serialization）**：将内存中的**Python 对象**转换为**可存储或可传输的格式**（如二进制文件、JSON 字符串等）的过程。简单来说，就是把 “活” 的对象 “冻结” 成静态的数据流，方便保存到硬盘或通过网络发送。

- **反序列化（Deserialization）**：将序列化后的**数据流**恢复为内存中**Python 对象**的过程。相当于把 “冻结” 的对象 “解冻”，重新变成可操作、可使用的对象。

举个生活中的例子：把新鲜水果（内存对象）做成罐头（序列化），方便长期保存或运输；想吃的时候再打开罐头（反序列化），恢复水果的可食用状态。

💡 **应用场景**：

- 将数据保存到文件（持久化）
- 网络传输（API、Socket）
- 缓存（Redis、消息队列）

------

## 2️⃣ Python 常用序列化方式对比

| 序列化方式 | 模块 | 格式   | 可读性 | 跨语言 | 适用场景                          |
| ---------- | ---- | ------ | ------ | ------ | --------------------------------- |
| `pickle`   | 内置 | 二进制 | ❌      | ❌      | Python 内部对象存储               |
| `json`     | 内置 | 文本   | ✅      | ✅      | 配置文件、API 数据                |
| `marshal`  | 内置 | 二进制 | ❌      | ❌      | Python 字节码存储（不推荐跨版本） |

------

## 3️⃣ 使用 `pickle` 序列化与反序列化

`pickle` 是 Python 内置的二进制序列化模块，支持几乎所有 Python 对象。

```python
import pickle

# 定义一个对象
data = {
    "name": "星哥",
    "skills": ["Python", "Docker", "AI工具"],
    "level": 5
}

# 序列化到文件
with open("data.pkl", "wb") as f:
    pickle.dump(data, f)

# 从文件反序列化
with open("data.pkl", "rb") as f:
    loaded_data = pickle.load(f)

print(loaded_data)
```

✅ **优点**：支持复杂对象（类实例、函数等）
 ⚠ **缺点**：二进制不可读、跨语言不通用、存在安全风险（不要反序列化不可信数据）

------

## 4️⃣ 使用 `json` 序列化与反序列化

`json` 模块更适合跨语言数据交换。

```python
import json

data = {
    "name": "星哥",
    "skills": ["Python", "Docker", "AI工具"],
    "level": 5
}

# 序列化为 JSON 字符串
json_str = json.dumps(data, ensure_ascii=False)
print(json_str)

# 反序列化为 Python 对象
loaded_data = json.loads(json_str)
print(loaded_data)
```

💡 **注意**：`json` 只支持基本数据类型（dict、list、str、int、float、bool、None），自定义对象需要转换。

------

## 5️⃣ 自定义对象的序列化

如果我们有一个类实例，`json` 默认无法直接序列化，需要自定义转换方法。

```python
import json

class User:
    def __init__(self, name, level):
        self.name = name
        self.level = level

user = User("星哥", 5)

# 自定义序列化
def user_to_dict(obj):
    return {"name": obj.name, "level": obj.level}

# 序列化
json_str = json.dumps(user, default=user_to_dict, ensure_ascii=False)
print(json_str)

# 反序列化
def dict_to_user(d):
    return User(d["name"], d["level"])

loaded_user = json.loads(json_str, object_hook=dict_to_user)
print(loaded_user.name, loaded_user.level)
```

------

## 6️⃣ 安全提示

- **不要用 `pickle.load()` 反序列化不可信数据**，可能执行恶意代码。
- 跨语言或需要可读性时优先用 `json`。
- 大型数据可考虑 `msgpack`、`protobuf` 等高效格式。

------

## 7️⃣ 总结

- **pickle**：功能强大，适合 Python 内部存储，但不安全且不可跨语言。
- **json**：通用、可读，适合配置文件、API 数据。
- **marshal**：仅限内部使用，不推荐跨版本。
- 反序列化时要注意安全，尤其是来自外部的数据。

------

### 📌 实战建议

- **配置文件** → 用 `json`
- **临时缓存** → 用 `pickle`
- **跨语言通信** → 用 `json` / `protobuf`
- **安全第一** → 不反序列化不可信数据



