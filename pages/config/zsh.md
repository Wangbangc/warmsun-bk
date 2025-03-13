

https://ohmyz.sh/


## .zshrc

```sh
plugins=(git extract sudo)
```


```sh
alias mkdir='mkdir -pv'
```


## theme 

```sh
vi ~/.oh-my-zsh/themes/robbyrussell.zsh-theme 
```

```sh
PROMPT="%(?:%{$fg_bold[green]%}%1{➜%} :%{$fg_bold[red]%}%1{➜%} ) %{$fg[cyan]%}%c%{$reset_color%}" # [!code --]
PROMPT="%(?:%{$fg_bold[green]%}%1{➜%} :%{$fg_bold[red]%}%1{➜%} )%m %{$fg[cyan]%}%c%{$reset_color%}" # [!code ++]
PROMPT+=' $(git_prompt_info)'

ZSH_THEME_GIT_PROMPT_PREFIX="%{$fg_bold[blue]%}git:(%{$fg[red]%}"
ZSH_THEME_GIT_PROMPT_SUFFIX="%{$reset_color%} "
ZSH_THEME_GIT_PROMPT_DIRTY="%{$fg[blue]%}) %{$fg[yellow]%}%1{✗%}"
ZSH_THEME_GIT_PROMPT_CLEAN="%{$fg[blue]%})"
```
