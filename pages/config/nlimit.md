

## 查看

```sh
ulimit -n
```

## 修改

```sh
vi /etc/security/limits.conf
```

root 和 其他用户 要分别配置, 所以有两行.

```sh
root - nofile 1048576
* - nofile 1048576
```