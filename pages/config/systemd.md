

init.d 的机制已经过时了, 习惯使用的 `service ssh status` 命令, 要转成 `systemctl status ssh` 了. 


## frps 案例

参考 frp 官网的 使用 systemd 教程. 

在 `/etc/systemd/system/` 下创建文件

```sh
sudo vi /etc/systemd/system/frps.service
```

写入内容

```sh
[Unit]
# 服务名称，可自定义
Description = frp server
After = network.target syslog.target
Wants = network.target

[Service]
Type = simple
# 启动frps的命令，需修改为您的frps的安装路径
ExecStart = /path/to/frps -c /path/to/frps.toml

[Install]
WantedBy = multi-user.target

```

就可以用 systemctl 命令管理程序的启动

```sh
# 启动frp
sudo systemctl start frps
# 停止frp
sudo systemctl stop frps
# 重启frp
sudo systemctl restart frps
# 查看frp状态
sudo systemctl status frps
```

设置开机启动

```sh
systemctl enable frps
```

## 开机进入命令行界面


```sh
# 开机进入 命令行界面
systemctl set-default multi-user.target

# 开机进入 图形界面
systemctl set-default graphical.target
```

