

## 重装个完整版

```sh
sudo apt-get remove vim-common
sudo apt-get install vim
```

## 禁用鼠标

针对 vim 9 版本

```
set mouse-=a
```

## .vimrc

n 年前积累下来的配置, 很多可能已经变成了默认配置, 或者无需配置(如: 粘贴时的缩进处理)

```
"这个文件中, 等号两边不能有空格

"语法高亮
syntax on

"换行符
set fileformat=unix

"状态栏标尺
set ruler

"显示行号
set number

"自动缩进
set autoindent

"vim8以下的版本,开启自动缩进的话,粘贴时要手动开关粘贴模式.
set pastetoggle=<F9>

"制表符转换成空格
set expandtab

"制表符宽度
set tabstop=4

"格式化时制表符的宽度
set shiftwidth=4

"移动光标时，一次四个空格
set softtabstop=4 

"高亮当前行
set cursorline
```