---
title: Fedora 镜像
description: Fedora 镜像源配置与使用说明。
---

上游地址：rsync://mirrors.fedoraproject.org/fedora/

## 快速配置

```bash
sudo sed -i 's|metalink=https://mirrors.fedoraproject.org|baseurl=http://mirrors.dlut.edu.cn/fedora|g' /etc/yum.repos.d/fedora.repo
sudo dnf clean all
sudo dnf makecache
```

## 适用场景

- Fedora Workstation
- Fedora Server
- Fedora CoreOS 相关环境

## 说明

Fedora 建议优先使用 DNF 管理软件包，更新缓存后即可开始安装。
