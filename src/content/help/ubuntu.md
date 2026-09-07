---
title: Ubuntu 镜像
description: Ubuntu 镜像源配置与使用说明。
featured:
  label: Ubuntu
  order: 1
---

上游地址：rsync://mirrors.ubuntu.com/ubuntu/

## 快速配置

```bash
sudo sed -i 's/archive.ubuntu.com/mirrors.dlut.edu.cn/g' /etc/apt/sources.list
sudo sed -i 's/security.ubuntu.com/mirrors.dlut.edu.cn/g' /etc/apt/sources.list
sudo apt update
```

## 适用场景

- Ubuntu 桌面版
- Ubuntu Server
- 基于 Ubuntu 的开发环境

## 说明

如果您使用的是新的 Ubuntu 版本，也可以手动将 `/etc/apt/sources.list` 中的官方源替换为 `mirrors.dlut.edu.cn`。
