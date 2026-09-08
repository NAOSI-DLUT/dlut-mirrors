---
icon: ubuntu
title: 'Ubuntu 镜像'
description: 'Ubuntu 的 DEB822 与传统 APT 配置，区分 x86 与 ARM 仓库。'
category: 'Linux 发行版'
mark: 'U'
color: '#d65a30'
mirrors: ['ubuntu', 'ubuntu-ports', 'ubuntu-releases', 'ubuntu-cdimage']
featured: { 'label': 'Ubuntu', 'order': 1 }
---

## 适用版本与架构

先运行 `cat /etc/os-release` 和 `dpkg --print-architecture`。以下完整示例适用于 **Ubuntu 24.04 LTS（noble）、amd64**；22.04 的代号为 `jammy`。其他版本请根据系统实际代号调整，换源不等于升级发行版。

[ubuntu 仓库](/ubuntu/) 用于 x86 软件包；ARM64、ARMHF、RISC-V 等使用 [ubuntu-ports](/ubuntu-ports/)。安装 ISO 请访问 [ubuntu-releases](/ubuntu-releases/) 或 [ubuntu-cdimage](/ubuntu-cdimage/)。

## Ubuntu 24.04 的 DEB822 配置

先备份 `/etc/apt/sources.list.d/ubuntu.sources`：

```bash
sudo cp -an /etc/apt/sources.list.d/ubuntu.sources /etc/apt/sources.list.d/ubuntu.sources.bak
```

编辑原文件，使用以下内容。安全更新保留官方地址，避免镜像同步延迟影响更新时效。

```text
Types: deb
URIs: https://mirrors.cernet.edu.cn/ubuntu/
Suites: noble noble-updates noble-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

Types: deb
URIs: http://security.ubuntu.com/ubuntu/
Suites: noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

ARM 等 ports 架构将第一段 URI 改成 `https://mirrors.cernet.edu.cn/ubuntu-ports/`，第二段使用官方 `http://ports.ubuntu.com/ubuntu-ports/`，其余代号与密钥保持一致。

## Ubuntu 22.04 的传统格式

若系统使用 `/etc/apt/sources.list`，先备份该文件，再写入下列内容。不要与 `.sources` 文件重复启用同一仓库。

```text
deb https://mirrors.cernet.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb https://mirrors.cernet.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb https://mirrors.cernet.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
deb http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse
```

## 验证与恢复

```bash
sudo apt update
apt-cache policy
```

检查是否出现 CERNET 或其调度到的高校地址。404 时先检查发行版代号和架构；签名错误时检查时间、系统 keyring 和上游同步状态，不要添加 `trusted=yes`。

恢复时将备份复制回原文件，再执行 `sudo apt update`。仅需要源码包时才增加 `deb-src`；日常使用无需启用 proposed。

## 参考资料

- [TUNA ubuntu 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)
- [TUNA ubuntu-ports 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu-ports/)
