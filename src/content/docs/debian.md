---
icon: debian
title: 'Debian 镜像'
description: 'Debian 12/13 软件仓库配置、固件组件与独立安全更新源。'
category: 'Linux 发行版'
mark: 'D'
color: '#c34764'
mirrors: ['debian', 'debian-security']
---

## 选择发行版

运行 `cat /etc/os-release` 确认代号：Debian 13 为 `trixie`，Debian 12 为 `bookworm`。本文以 Debian 13 为例；12 用户需将示例中所有 `trixie` 改为 `bookworm`。

[debian](/debian/) 是主仓库，[debian-security](/debian-security/) 是独立安全仓库。不要把 security 的目录直接并入主仓库，也不要将 stable、testing、sid 混用。

## DEB822 格式

适用于已经使用 `/etc/apt/sources.list.d/debian.sources` 的系统。先备份：

```bash
sudo cp -an /etc/apt/sources.list.d/debian.sources /etc/apt/sources.list.d/debian.sources.bak
```

编辑原文件：

```text
Types: deb
URIs: https://mirrors.cernet.edu.cn/debian/
Suites: trixie trixie-updates
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg

Types: deb
URIs: https://security.debian.org/debian-security
Suites: trixie-security
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg
```

`non-free-firmware` 从 Debian 12 开始独立；只需要自由软件时可保留 `main`，但请先确认设备固件需求。安全更新默认使用官方源。

## 传统 sources.list

如果使用 `/etc/apt/sources.list`，备份后采用下列格式，勿与 DEB822 重复启用：

```text
deb https://mirrors.cernet.edu.cn/debian/ trixie main contrib non-free non-free-firmware
deb https://mirrors.cernet.edu.cn/debian/ trixie-updates main contrib non-free non-free-firmware
deb https://security.debian.org/debian-security trixie-security main contrib non-free non-free-firmware
```

如确需 Backports，可单独增加 `trixie-backports`，并按 Debian Backports 官方说明选择性安装，而不是批量升级所有包。

## 验证与恢复

```bash
sudo apt update
apt-cache policy
```

恢复备份后再次更新索引。遇到 `Release file` 错误先检查系统时间和代号；不受支持的历史版本应查询归档仓库，不能靠关闭签名或有效期检查当作长期修复。

## 参考资料

- [TUNA debian 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/debian/)
- [Debian 安全更新 FAQ](https://www.debian.org/security/faq)
