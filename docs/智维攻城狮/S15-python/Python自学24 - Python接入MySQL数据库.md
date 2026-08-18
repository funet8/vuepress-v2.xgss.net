# Python自学24 - Python接入MySQL数据库

本篇将进入一个非常实用的主题：**如何用 Python 连接并操作 MySQL 数据库**。这在实际开发中非常常见，无论是做数据存储、日志分析还是后台服务，都离不开数据库。

------

## 准备工作

在开始之前，需要确保以下环境准备就绪：

- 已安装 **MySQL 数据库**（本地或远程均可）
- 已创建一个测试数据库（例如 `test_db`）
- Python 环境中安装了 MySQL 驱动库

常见的 Python-MySQL 驱动有两个：

- `mysql-connector-python`（官方驱动）
- `PyMySQL`（轻量常用）

安装方式：

```bash
pip install mysql-connector-python
# 或
pip install PyMySQL
```

------

## 连接 MySQL 数据库

以 `mysql-connector-python` 为例，连接数据库的基本代码如下：

```python
import mysql.connector

# 建立连接
conn = mysql.connector.connect(
    host="localhost",      # 数据库主机地址
    user="root",           # 用户名
    password="123456",     # 密码
    database="test_db"     # 要连接的数据库
)

# 创建游标对象
cursor = conn.cursor()

print("数据库连接成功！")
```

如果使用 `PyMySQL`，写法类似：

```python
import pymysql

conn = pymysql.connect(
    host="localhost",
    user="root",
    password="123456",
    database="test_db",
    charset="utf8mb4"
)

cursor = conn.cursor()
print("数据库连接成功！")
```

------

## 执行 SQL 语句

### 1. 创建表

先在`test_db`数据库中创建`students`表，包含字段：`id`（主键自增）、`name`（姓名）、`age`（年龄）、`gender`（性别）。

```python
import pymysql
from pymysql import Error

def create_table():
    connection = None
    try:
        connection = pymysql.connect(
            host='localhost',
            user='root',
            password='123456',
            database='test_db',
            charset='utf8mb4'
        )
        cursor = connection.cursor()

        # 定义创建表的SQL语句（若表已存在则删除，避免重复创建）
        create_table_sql = """
        DROP TABLE IF EXISTS students;
        CREATE TABLE students (
            id INT AUTO_INCREMENT PRIMARY KEY,  # 主键自增
            name VARCHAR(50) NOT NULL,          # 姓名（非空）
            age INT DEFAULT 0,                  # 年龄（默认0）
            gender ENUM('男', '女', '其他')     # 性别（枚举类型，只能选指定值）
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        """

        # 执行SQL语句（多行SQL需用execute执行，无需分次）
        cursor.execute(create_table_sql)
        print("学生表（students）创建成功！")

    except Error as e:
        print(f"创建表失败！错误：{e}")
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == "__main__":
    create_table()
```

**验证**：登录 MySQL，执行`use test_db;`和`show tables;`，若能看到`students`表，则创建成功。

### 2. 插入数据

插入数据分 “单条插入” 和 “批量插入”，批量插入效率更高（减少网络交互次数）。

#### 单条插入：

```python
def insert_single_data():
    connection = None
    try:
        connection = pymysql.connect(
            host='localhost',
            user='root',
            password='123456',
            database='test_db',
            charset='utf8mb4'
        )
        cursor = connection.cursor()

        # 插入SQL（%s为占位符，避免SQL注入，后续讲解）
        insert_sql = "INSERT INTO students (name, age, gender) VALUES (%s, %s, %s);"
        # 数据（元组类型，与占位符顺序对应）
        data = ("张三", 20, "男")

        # 执行插入
        cursor.execute(insert_sql, data)
        # 提交事务（MySQL默认手动提交，插入/更新/删除需提交才生效）
        connection.commit()
        print(f"单条数据插入成功！插入的记录ID：{cursor.lastrowid}")  # lastrowid获取自增ID

    except Error as e:
        # 若出错，回滚事务（避免数据不一致）
        connection.rollback()
        print(f"插入失败！已回滚，错误：{e}")
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == "__main__":
    insert_single_data()
```

#### 批量插入：

```python
def insert_batch_data():
    connection = None
    try:
        connection = pymysql.connect(
            host='localhost',
            user='root',
            password='123456',
            database='test_db',
            charset='utf8mb4'
        )
        cursor = connection.cursor()

        insert_sql = "INSERT INTO students (name, age, gender) VALUES (%s, %s, %s);"
        # 批量数据（列表嵌套元组，每个元组对应一条记录）
        batch_data = [
            ("李四", 19, "女"),
            ("王五", 21, "男"),
            ("赵六", 22, "其他")
        ]

        # 批量执行（executemany，比循环execute高效）
        cursor.executemany(insert_sql, batch_data)
        connection.commit()
        print(f"批量数据插入成功！共插入 {cursor.rowcount} 条记录")  # rowcount获取影响行数

    except Error as e:
        connection.rollback()
        print(f"批量插入失败！错误：{e}")
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == "__main__":
    insert_batch_data()
```





### 3. 查询数据

查询是最常用的操作，通过`cursor.fetch*()`方法获取查询结果，常用方法有：

- `fetchone()`：获取**一条**结果（元组类型），无结果时返回`None`；
- `fetchall()`：获取**所有**结果（列表嵌套元组）；
- `fetchmany(n)`：获取**前 n 条**结果（列表嵌套元组）。

#### 示例：查询所有学生 + 条件查询

```python
def query_data():
    connection = None
    try:
        connection = pymysql.connect(
            host='localhost',
            user='root',
            password='123456',
            database='test_db',
            charset='utf8mb4'
        )
        cursor = connection.cursor()

        # 1. 查询所有学生（按年龄降序）
        print("=== 所有学生信息 ===")
        query_all_sql = "SELECT id, name, age, gender FROM students ORDER BY age DESC;"
        cursor.execute(query_all_sql)
        all_students = cursor.fetchall()  # 获取所有结果
        for student in all_students:
            # 解析元组：student[0]是id，student[1]是name，以此类推
            print(f"ID：{student[0]}, 姓名：{student[1]}, 年龄：{student[2]}, 性别：{student[3]}")

        # 2. 条件查询（年龄>20的学生）
        print("\n=== 年龄>20的学生 ===")
        query_cond_sql = "SELECT name, age FROM students WHERE age > %s;"
        cursor.execute(query_cond_sql, (20,))  # 条件参数（元组，即使单值也要加逗号）
        cond_students = cursor.fetchmany(10)  # 最多获取10条
        for student in cond_students:
            print(f"姓名：{student[0]}, 年龄：{student[1]}")

    except Error as e:
        print(f"查询失败！错误：{e}")
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == "__main__":
    query_data()
```







### 4. 更新数据

更新数据需注意添加`WHERE`条件，否则会**全表更新**（风险极高），建议先通过查询验证条件再执行更新。

```python
def update_data():
    connection = None
    try:
        connection = pymysql.connect(
            host='localhost',
            user='root',
            password='123456',
            database='test_db',
            charset='utf8mb4'
        )
        cursor = connection.cursor()

        # 更新SQL（将ID=1的学生年龄改为21）
        update_sql = "UPDATE students SET age = %s WHERE id = %s;"
        cursor.execute(update_sql, (21, 1))  # 参数：(新年龄, 目标ID)
        connection.commit()

        # 验证更新结果
        if cursor.rowcount > 0:
            print(f"更新成功！共影响 {cursor.rowcount} 条记录")
            # 重新查询ID=1的学生
            cursor.execute("SELECT name, age FROM students WHERE id = 1;")
            updated_student = cursor.fetchone()
            print(f"更新后：姓名：{updated_student[0]}, 年龄：{updated_student[1]}")
        else:
            print("未找到符合条件的记录，无需更新")

    except Error as e:
        connection.rollback()
        print(f"更新失败！已回滚，错误：{e}")
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == "__main__":
    update_data()
```







### 5. 删除数据

删除数据同样需加`WHERE`条件，避免误删全表，且删除后数据难以恢复，需格外谨慎。

```python
def delete_data():
    connection = None
    try:
        connection = pymysql.connect(
            host='localhost',
            user='root',
            password='123456',
            database='test_db',
            charset='utf8mb4'
        )
        cursor = connection.cursor()

        # 删除SQL（删除ID=4的学生，假设存在）
        delete_sql = "DELETE FROM students WHERE id = %s;"
        cursor.execute(delete_sql, (4,))
        connection.commit()

        if cursor.rowcount > 0:
            print(f"删除成功！共删除 {cursor.rowcount} 条记录")
        else:
            print("未找到符合条件的记录，无需删除")

    except Error as e:
        connection.rollback()
        print(f"删除失败！已回滚，错误：{e}")
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == "__main__":
    delete_data()
```



## 安全实践：避免 SQL 注入

在前面的示例中，我们用`%s`作为占位符传递参数，而不是直接拼接字符串（如`f"INSERT INTO students VALUES ({name}, {age})"`），这是为了**防止 SQL 注入攻击**。

### 为什么要避免字符串拼接？

假设用户输入姓名为`"张三'); DROP TABLE students; -- "`，若用字符串拼接 SQL：

```python
# 危险！字符串拼接会导致SQL注入
name = '张三'); DROP TABLE students; -- '
sql = f"INSERT INTO students (name) VALUES ('{name}');"
```

最终执行的 SQL 会变成：

```sql
INSERT INTO students (name) VALUES ('张三'); DROP TABLE students; -- ');
```

这会直接删除`students`表，造成数据丢失。

### 正确方式：参数化查询

用`%s`（PyMySQL/MariaDB）或`?`（mysql-connector-python）作为占位符，将参数与 SQL 语句分离，驱动会自动处理特殊字符，避免注入：

```python
# 正确：参数化查询
sql = "INSERT INTO students (name) VALUES (%s);"
cursor.execute(sql, (name,))  # 参数必须是元组或列表
```

## 常见问题与注意事项

1. **连接失败报错`Access denied for user 'root'@'localhost'`**：

   - 检查密码是否正确；

   - 若 MySQL 8.0+，可能是认证方式问题，需修改 root 用户的认证插件：

     ```sql
     ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '你的密码';
     FLUSH PRIVILEGES;  # 刷新权限
     ```

2. **中文乱码**：

   - 连接时指定`charset='utf8mb4'`（`utf8`在 MySQL 中是别名，实际不支持 emoji，`utf8mb4`才是完整的 UTF-8）；
   - 数据库和表的字符集也需设置为`utf8mb4`。

3. **事务未提交**：

   - 插入、更新、删除操作后必须调用`connection.commit()`，否则数据不会写入数据库；
   - 出错时需调用`connection.rollback()`，回滚到操作前状态，避免数据不一致。

4. **连接泄露**：

   - 无论操作成功与否，都需关闭游标（`cursor.close()`）和连接（`connection.close()`）；

   - 建议用

     ```
     with
     ```

     语句自动管理资源（Python 3.6 + 支持）：

     

     ```python
     with pymysql.connect(...) as connection:
         with connection.cursor() as cursor:
             cursor.execute(sql)
             connection.commit()
     # with块结束后，cursor和connection会自动关闭
     ```

## 最佳实践与注意事项

- **使用参数化查询**：避免 SQL 注入风险，不要拼接字符串。
- **及时关闭连接**：操作完成后要 `cursor.close()` 和 `conn.close()`。
- **事务管理**：涉及多条 SQL 时，注意 `commit()` 与 `rollback()`。
- **连接池**：在高并发场景下，推荐使用 `DBUtils` 或 `SQLAlchemy` 提供的连接池。

------

## 总结

本文介绍了 Python 接入 MySQL 的基本流程：

1. 安装驱动库
2. 建立数据库连接
3. 执行增删改查操作
4. 遵循最佳实践（参数化、事务、连接池）

掌握这些内容后，你就能用 Python 编写简单的数据库应用程序，为后续的数据分析、Web 开发和自动化运维打下坚实基础。