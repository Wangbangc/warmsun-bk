
## 查看当前状态

```sh
swapon
```

## 使用文件作为交换空间

```sh
fallocate -l 1G /swap.img

chmod 600 /swap.img

mkswap /swap.img

swapon /swap.img
```

## 持久化配置

```sh
# vi /etc/fstab
echo '/swap.img none swap sw 0 0' | sudo tee -a /etc/fstab
```

```sh
cat /proc/sys/vm/swappiness
cat /proc/sys/vm/vfs_cache_pressure

sysctl vm.vfs_cache_pressure=50
sysctl vm.swappiness=20

# vi /etc/sysctl.conf

# 使用 swap 的偏好程度，小一点
vm.swappiness = 20
# 回收 内存脏页 的偏好程度
vm.vfs_cache_pressure = 50
```

## 热关闭

```sh
# 可能会卡一会儿，要将使用中的交换空间转移到内存里去
swapoff -a
```