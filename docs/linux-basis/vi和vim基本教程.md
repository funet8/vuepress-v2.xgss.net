---
title: vi和vim基本教程
createTime: 2025/05/27 17:51:17
permalink: /article/mvwlmgxc/
---
# 学好vim一篇就够了-vi和vim的使用教程



它是一个老式的文字处理工具，但是功能很齐全，不仅是文本处理工具，还是一个程序编辑工具，就连官方网站也说vim是一个程序开发工具而不是文字处理软件，因为它包含了很多额外的功能，如：多文件编辑，区块复制等，这些功能让我们在进行配置文件修改的时候会更方便。今天就来一起学习一下vi和vim。

## 什么是 vim？

Vim 是从 vi 发展出来的一个文本编辑器。代码补全、编译及错误跳转等方便编程的功能特别丰富，在程序员中被广泛使用。

简单的来说， vi 是老式的字处理器，不过功能已经很齐全了，但是还是有可以进步的地方。 vim 则可以说是程序开发者的一项很好用的工具。

![vi-vim](https://imgoss.xgss.net/picgo/vi-vim.jpg?aliyun)

## vi和vim的小差别

Linux 系统会内置 vi 文本编辑器。

Vim 具有程序编辑的能力，可以看做是 vi 的增强版本，主动的以字体颜色辨别语法的正确性，方便程序设计；代码补全，编译及错误跳转等方便编程的功能丰富，在程序员中被广泛的使用。

由于个别版本的linux默认只安装vi，所以你需要额外安装vim的软件包，另外vim在字符界面下不能输入中文，而在图形界面下能否输入中文则取决于系统中是否安装了中文输入法。



## **为什么要使用vim？**

虽然在linux下的文本编辑器众多，这些工具都有各自的优点，但是有几点是其它编辑工具所不能比拟的

- 所有的类Unix系统都内建vi，其它的编辑工具则不一定，而vim相当于是vi的升级版
- 很多软件的编辑界面都会调用vi，如后面提到的crontab、edquota等
- vim具有程序编辑能力，可以主动以字体颜色标识语法的正确性，方便代码编写
- 程序简单，编辑速度非常快



## 三种模式

由于vi/vim是一个全屏幕的文本编辑器，它工作在三种模式下：分别是命令模式、输入模式和末行模式。

可以分别从命令模式切换到输入模式和末行模式，也可以从末行模式或输入模式切换到命令模式，但是输入模式与末行模式之间不能互相切换。

![1571203454643.png](https://imgoss.xgss.net/picgo/1602392063340.png?aliyun)

### 命令模式：

用户刚刚启动 vi/vim，便进入了命令模式。

此状态下敲击键盘动作会被Vim识别为命令，而非输入字符。比如我们此时按下i，并不会输入一个字符，i被当作了一个命令。

以下是常用的几个命令：

```
i 切换到输入模式，以输入字符。
x 删除当前光标所在处的字符。
: 切换到底线命令模式，以在最底一行输入命令。
```


若想要编辑文本：启动Vim，进入了命令模式，按下i，切换到输入模式。

命令模式只有一些最基本的命令，因此仍要依靠底线命令模式输入更多命令。

### 输入模式

在命令模式下按下i就进入了输入模式。

在输入模式中，可以使用以下按键：

```
字符按键以及Shift组合，输入字符
ENTER，回车键，换行
BACK SPACE，退格键，删除光标前一个字符
DEL，删除键，删除光标后一个字符
方向键，在文本中移动光标
HOME/END，移动光标到行首/行尾
Page Up/Page Down，上/下翻页
Insert，切换光标为输入/替换模式，光标将变成竖线/下划线
ESC，退出输入模式，切换到命令模式
```



### 底线命令模式

在命令模式下按下:（英文冒号）就进入了底线命令模式。

底线命令模式可以输入单个或多个字符的命令，可用的命令非常多。

在底线命令模式中，基本的命令有：

```
1、:w? ?保存文件但不退出vi?
2、:w file 将修改另外保存到file中，不退出vi?
3、:w!? 强制保存，不推出vi
4.、:wq 保存退出
5、:wq! 强制保存文件，并退出vi 
6、:q 不保存文件，退出vi
7、:q!不保存文件，强制退出vi?
8、:e! 放弃所有修改，从上次保存文件开始再编辑
9、:wq? 保存文件并退出vi?
```


按ESC键可随时退出底线命令模式。



## 常用命令

基础打开文件，修改文件，保存退出，另存为文件。

```
vi /root/file.txt 打开文件路径
a 修改
Esc 冒号 w 保存  或者 ZZ  保存退出。
:wq!强行保存退出，只有文件所有者，或者是root用户。
:w  【保存】
:w /root/service.bak   【另存为】
```

### 三种模式下切换

```
命令模式 	:
插入模式 	a 或者 i  或者 o
编辑模式	ESC
```



### 搜索关键字

```
Esc /关键字 回车
n下一个 
shift+n 上一个
```



### 插入命令

```
a	【在光标后附加文本】
A	【在本行行末附加文本】
i 	【在光标前插入文本】
I	【在本行开始插入文本】
o	【在光标下插入新行】
O 	【在光标上插入新行】
```



### 定位命令

```
向左：
h或方向左键		【左移一个字符】
10h           	 向左移动10个字符，到行首会停止

向下：
j或方向下		【下移一行】
5j 				向下移动5行，或者5下箭头

向上：
k/方向上		【向上一行】
7k 				#向上移动7行

向右：
l/方向右键		【右边移一个字符】	
6l #向右移动6个字符，到行末会停止不会换行

$				【移至行尾】
0（零）			【移至行首】
H				【移至屏幕上端】
M				【移至屏幕中央】
L				【移至屏幕中下端】
W或w			【定位到当前句子的开始位置】
E或e			【定位到当前这句话的最后位置】

:set nu 		【设置行号】
:set nonu		【取消行号】
gg				【到第一行】
G				【到最后一行】
nG或4gg			【到第n行】到第四行
:n				【到第n行】


Ctrl+b          【在文件中向上移动一页（相当于 PageUp 键）】
Ctrl+f 			【在文件中向下移动一页（相当于 PageDown 键）】
```



### 撤销命令

这个命令很常用，要记住：

```
u   			【撤销上一步的操作】
Ctrl+r 			【恢复上一步被撤销的操作】
```

贴士：比如修改nginx的配置之后保存不退出 `:w`  再 ctrl+z将文档放在后台，用nignx -t ，或者重启nginx服务。如果有问题则快速回到文档编辑页面fg，再按u。保存

实例：

```
vi /etc/nginx/nginx.conf
i编辑
再 :w 保存
ctrl+z
[1]+  Stopped                 vi /etc/nginx/nginx.conf
# jobs
[1]+  Stopped                 vi /etc/nginx/nginx.conf
# nginx -t 测试nginx文档是否有错误。
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
# fg 将后台程序进入前台

```





### 删除命令

```
x				【删除光标所在字符】
nx				【删除光标所在处后n个字符】
dd				【删除光标所在行，ndd删除n行】
dG				【删除光标所在行到末尾的内容】
D				【删除从光标所在处到行尾】
:n1,n2d			【删除指定的行】 
:10,20d 		【删除第十行到第20行的内容】
光标移到第一行，然后dG	【删除所有内容】
```

小贴士，一般在操作在本地编辑好的文档，全部复制，然后将服务器文档 dG全部删除，在粘贴新的文档。




### 复制剪切命令

```
yy、Y			【复制当前行】
nyy、nY			【复制当前行一下n行】	
dd				【剪切当前行】
ndd				【剪切当前行一下n行】
p、P			【粘贴在当前光标所在行下活行上】
```



### 替换和取消命令

```
r 				【取代光标所在处字符】
R				【从光标所在处开始替换字符，按Esc结束】
u				【取消上一步操作】	
Ctrl+r 			【恢复上一步被撤销的操作】
```



### 搜索和替换命令

```
/string 			【向前搜索指定字符，搜索时请忽略大小写:set ic】
n					【搜索指定字符串的下一个出现位置】		
:%s/old/new/g		【全文替换指定字符】	
:%s/^#//g			【去掉以#注释】
:%s/^/#/g			【在全文开头添加#】	
:n1,n2s/old/new/g 	【在指定范围内替换指定字符串】
:n1,n2s/^/#/g
:s/str1/str2/       【用字符串 str2 替换本行中首次出现的字符串 str1】
g是全局参数，如果加上这个，你文中有多少就替换多少，如果不加，就只能一个一个的替换！
fa（或fb）			【查询这行a字母的的地方（或b字母）】
3fa					【在这行中查找a出现的第三个位置】
```



### 应用实例

```
导入其他文件内容
			:r   文件名

在vi执行命令
			:! 命令		
定义快捷键：
			:map 快捷键 触发命令			
		实例：
			:map ^P I# <ESC>   【键盘按键实现^P：ctrl+v ctrl+p或者 ctrl+v+p 】
			
			:map ^B 0x
连续注释：
		:n1,n2s/^/#/g
		:n1,n2s/^/#//g
		:n1,n2s/^/\/\//g
替换：
	:ab sammail samlee@163.com		
```



### 显示行号

```
:set nu    显示行号（注意前面输入冒号进入底行命令模式）
:set nonu  不显示行号
```



### **环境变量与记录**

.viminfo:记录用户的行为，之前编辑过的文件光标在什么位置，在这个文件中进行过什么操作等，自动建立

.vimrc：定义vim的默认设置，如是否显示行号等，需要手动生成

| 命令                              | 说明                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| :set nu /:set nonu                | 就是设定与取消行号！                                         |
| :set hlsearch /:set nohlsearch    | 搜索时是否高亮显示。默认值是 hlsearch                        |
| :set autoindent :set noautoindent | 是否自动缩排？autoindent 就是自动缩排。                      |
| :set backup/:set nobackup         | 是否自动备份，一般是 nobackup 的， 如果设定 backup 的话，那么当你更动任何一个档案时，则源文件会被另存成一个档名为 filename~ 的档案。 |
| :set ruler/:set noruler           | 是否显示右下角的一些状态栏说明                               |
| :set showmode/:set noshowmode     | 是否显示左下角的状态栏。                                     |
| :set backspace=(012)              | 一般来说， 如果我们按下 i 进入编辑模式后，可以利用backspace来删除任意字符的。 但是，某些版本则不许如此。这时就可以使用这个设置2 可以删除任意；0 或 1 仅可删除刚刚输入内容 |
| :set all                          | 显示目前所有的环境变量设定值。                               |
| :set                              | 显示与系统默认值不同的设置， 用户修改过的                    |
| :syntax on :syntax off            | 是否显示颜色                                                 |
| :set bg=dark :set bg=light        | 可用以显示不同的颜色色调，预设是『 light 』。如果你常常发现批注的字体深蓝色实在很不容易看， 那么这里可以设定为 dark 喔！试看看，会有不同的样式呢！ |

### **密码设置与取消**

加密

```
vim filename
:X
Warning: Using a weak encryption method; see :help 'cm'                                                                                   
Enter encryption key: 
输入密码
Enter encryption key: ******
Enter same key again: ******
保存（否则不加密）
 
# cat filename 
VimCrypt~01!i
# vim filename   （不能用vi）
Need encryption key for "filename"
Warning: Using a weak encryption method; see :help 'cm'
Enter encryption key: 
```



取消密码

```
vim filename--->输入正确密码--->:X--->空密码--->保存
vim filename--->:set key= --->保存

注意：不要对系统文件进行加密的操作
```



### 其他命令

```

J（大写）:将光标所在行下一行合并到该行，中间有空格间隔，光标移动到该空格处，要想达到在写字板中”[end]+[del]“的效果（即光标移动到行末，然后del使下一行提到该行），可以用Jx组合命令。

u（小写）：撤销上一次所做的操作。多次使用 u 命令会一步一步依次撤销之前做过的操作（在一次切换到文本输入模式中输入的所有文本算一次操作）。

U（大写）：一次性撤销自上次移动到当前行以来做过的所有操作，再使用一次 U 命令则撤销之前的 U 命令所做的操作，恢复被撤销的内容。所以U命令是不能一直撤销的，相当于只能撤销一步，再使用就是恢复了。

[ctrl]+ r：按住ctrl键和r，类似快捷键的用法，是恢复操作，与命令u（小写）对应，可以在多次使用u命令撤销多步后，用该命令多次恢复至最新。
.（小数点）：重复执行上一次的命令，注意和恢复不一样。例如重复粘贴，重复删除。
```



## 字符差异

由于linux和windows的系统差异，它们针对于文件的中的一些特殊符号表示方式也是不同的，比如说用来表示换行的符号等，如

```
# cat -A hello-linux.txt
hello$
$
# cat -A hello-windows.txt
hello^M$
^M$
```

如果这种文件是从windows拷贝到linux的一本小说的话，基本没什么问题，但是如果是一个我们需要执行指定工作的shell脚本就会出现问题，**因为linux不认识这种符号的含义，就会导致shell脚本无法执行（踩坑了很多次，都是在win编辑txt文本，再后缀名sh，导致莫名的报错）**。所以此时我们就要对这种文件进行处理

```
# unix2dos [-kn] file [newfile]
选项与参数：
-k  ：保留文件原本的 mtime 时间格式
-n  ：保留旧文件，将转换后的内容输出到新文件，如： dos2unix -n old new
```

还有一种方式就是直接在linux下编辑文件，再下载到win系统下使用IDE编辑器编辑开发，再回到linux全部粘贴。

## 总结

以上的常用命令和操作都是基于vim的基本原理形成的，vim的命令很强大，尤其底行命令模式甚至可以类似于一个小型的脚本语言。

如果有遗漏，欢迎留言告知，谢谢！

vim官网有一个经典的全键位图，如下

![vi-jianpantu](https://imgoss.xgss.net/picgo/vi-jianpantu.gif?aliyun)

