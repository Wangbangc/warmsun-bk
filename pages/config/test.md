
## .gitconfig

```sh
[user]
	name = chenyan
	email = chenyan@feling.net
[alias]
	st = status
	co = checkout
[color]
	diff = auto
	status = auto
	branch = auto
[push]
	default = simple
[pull]
    rebase = true
[core]
    editor = vim
[credential]
    helper = store 
```

## HTTP仓库 保存账号密码

远程仓库的地址如果不是 ssh 协议, 而是用的 http/https 协议. 默认的行为通常是每次提交/拉取都要输入账号密码. 可以修改配置, 让 git 客户端保存密码, 不用每次都输入.

执行:

```sh
git config --global credential.helper store
```

得到 .gitconfig:

```sh
[credential]
    helper = store 
```

密码明文保存在:

```sh
~/.git-credentials
```
