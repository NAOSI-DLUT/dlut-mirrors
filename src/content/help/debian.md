---
title: Debian 镜像
description: Debian 镜像源配置与使用说明。
---

上游地址：rsync://ftp.debian.org/debian/

## 快速配置

```bash
sudo sed -i 's|deb.debian.org|mirrors.dlut.edu.cn|g' /etc/apt/sources.list
sudo sed -i 's|security.debian.org|mirrors.dlut.edu.cn|g' /etc/apt/sources.list
sudo apt update
```

## 适用场景

- Debian Stable
- Debian Testing
- Debian Unstable

## 说明

如果您需要更细粒度的源配置，可以保留 `main`、`contrib` 和 `non-free` 分区。
