

[ssh](./ssh.md) 中已经介绍了 -D 命令. 得到了一个支持 socks5 协议的端口. 这里要基于它得到一个支持 http 协议的端口. 

## 安装

```sh
apt install privoxy
```

## 配置

```sh
vi /etc/privoxy/config
```

搜索  `listen` 和 `socks5` 关键字

```
listen-address  10.168.1.101:17890

forward-socks5   /               127.0.0.1:7890  .
```

## 白名单

紧跟着 forward-socks5 下面那段

```
        forward         192.168.*.*/     .
        forward         10.*.*.*/        .
        forward         127.*.*.*/       .

        forward         localhost/       .
        forward         .feling.net/     .
        forward         .apihub.net/     .
        forward         .cn/             .
```

## 启动

```sh
service privoxy restart
```

## 各种软件怎么用它

### apt

```sh
apt -o Acquire::http::proxy="http://127.0.0.1:17890/" update
```

### docker pull

要从 systemd 配置。 https://docs.docker.com/config/daemon/proxy/#systemd-unit-file

```sh
mkdir -p /etc/systemd/system/docker.service.d
vi /etc/systemd/system/docker.service.d/http-proxy.conf
```

```sh
[Service]
Environment="HTTP_PROXY=http://localhost:17890"
Environment="HTTPS_PROXY=http://localhost:17890"
Environment="NO_PROXY=localhost,127.0.0.1,docker-registry.example.com,.corp"
```

```sh
systemctl daemon-reload
systemctl restart docker
systemctl show --property=Environment docker
```

### 群晖 docker 

```sh
sudo -i

mkdir -p /etc/systemd/system/pkg-ContainerManager-dockerd.service.d
vi /etc/systemd/system/pkg-ContainerManager-dockerd.service.d/http-proxy.conf

[Service]
Environment="HTTP_PROXY=http://10.168.1.101:17890"
Environment="HTTPS_PROXY=http://10.168.1.101:17890"
Environment="NO_PROXY=127.0.0.0/8,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,hb.apihub.net"

systemctl daemon-reload
systemctl restart pkg-ContainerManager-dockerd.service

systemctl show --property=Environment pkg-ContainerManager-dockerd.service


cat /var/packages/ContainerManager/etc/dockerd.json

{
  "data-root": "/var/packages/ContainerManager/var/docker",
  "insecure-registries": [
    "hb.apihub.net"
  ],
  "log-driver": "db",
  "registry-mirrors": [],
  "storage-driver": "btrfs"
}
```
### k3s

https://docs.k3s.io/zh/advanced

```sh
vi /etc/systemd/system/k3s.service.env
```

```sh
HTTP_PROXY=http://10.168.1.101:17890
HTTPS_PROXY=http://10.168.1.101:17890
NO_PROXY=127.0.0.0/8,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,.apihub.net
```

### 安卓手机

配置完后, 要 `关闭再打开 wifi`. 

这些年一直以为是 wifi 的代理功能被国内阉割了...后来无意中在哪个视频里看到, 这是安卓的 bug. 


### 环境变量

终端临时

```sh
export HTTPS_PROXY=http://10.168.1.101:17890
```

单命令临时

```sh
HTTPS_PROXY=http://10.168.1.101:17890 curl https://youtube.com
```