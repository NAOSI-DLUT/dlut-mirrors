---
icon: raspberrypi
title: 'Raspberry Pi OS / Raspbian 镜像'
description: '区分 32 位 Raspbian、64 位 Debian 与树莓派附加仓库。'
category: 'Linux 发行版'
mark: 'Pi'
color: '#587f6d'
---

## 确认用户空间架构

```bash
cat /etc/os-release
dpkg --print-architecture
```

以包管理器输出为准：64 位内核也可能搭配 32 位用户空间。下列示例用于 **32 位 armhf、Bookworm 的 Raspbian 主仓库**；64 位 arm64 使用 Debian 主仓库，参见 [Debian 指南](/docs/debian/)。

## 配置主仓库

备份实际使用的 APT 文件。若使用 `/etc/apt/sources.list`，对应条目为：

```text
deb https://mirrors.cernet.edu.cn/raspbian/raspbian/ bookworm main contrib non-free rpi
```

两个 `raspbian` 是仓库布局的一部分，不要自行去掉。使用其他代号时保留系统实际代号，不能通过改为 `bookworm` 完成系统降级。

若系统采用 `.sources` 格式，只修改已有 Raspbian 节的 `URIs`，保留 `Suites`、`Components`、`Signed-By`，不要同时新增重复的传统条目。

## 树莓派附加仓库

主仓库与提供固件、内核等内容的树莓派附加仓库不同。本文保留 `raspi.list` 或对应 `.sources` 中的官方附加源；不要将所有带有 raspberrypi 的 URL 都替换为 Raspbian 主仓库。

## 验证与恢复

```bash
sudo apt update
apt-cache policy
```

检查架构、代号和重复源警告。恢复原文件后刷新索引即可回退地址；软件版本回退另行处理。跨主版本升级请按 Raspberry Pi OS 的官方建议操作。

## 参考资料

- [TUNA raspbian 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/raspbian/)
- [Raspberry Pi OS 官方文档](https://www.raspberrypi.com/documentation/computers/os.html)
