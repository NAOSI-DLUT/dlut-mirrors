---
icon: opensuse
title: 'openSUSE 镜像'
description: '识别 RIS 自动仓库管理，按需修改 Tumbleweed 的镜像地址。'
category: 'Linux 发行版'
mark: 'Su'
color: '#587f6d'
---

## 先检查管理方式

```bash
zypper lr -u
zypper services
```

openSUSE 默认的 MirrorCache 已能自动选择镜像。由 `openSUSE-repos` / RIS 管理的仓库可能在刷新时重新生成；不要把手工修改成功一次误认为会永久保留。

本指南针对**手工管理仓库的 Tumbleweed**。Leap、Slowroll 与 Tumbleweed 的路径和升级机制不同，不能混用。RIS 管理的系统建议保留官方设置，或先按官方说明选择适合的管理方式。

## 修改已有仓库

备份 `/etc/zypp/repos.d/` 中需要修改的文件。按原节用途替换 `baseurl`，保留仓库别名、优先级、GPG 检查和启用状态：

| 原仓库用途 | 镜像 URL                                                          |
| ---------- | ----------------------------------------------------------------- |
| OSS        | `https://mirrors.cernet.edu.cn/opensuse/tumbleweed/repo/oss/`     |
| Non-OSS    | `https://mirrors.cernet.edu.cn/opensuse/tumbleweed/repo/non-oss/` |
| 更新仓库   | `https://mirrors.cernet.edu.cn/opensuse/update/tumbleweed/`       |

这些是现有仓库的替换地址，不要重复新增同用途仓库，也不要统一禁用 NVIDIA 等第三方仓库。

## 验证与升级

```bash
sudo zypper refresh
zypper lr -u
```

Tumbleweed 的完整快照升级通常使用 `sudo zypper dup`；先按官方说明审阅升级事务。仅换源验证时不必立即升级整个系统。

## 恢复

恢复 repo 文件备份并重新刷新。若地址又被自动覆盖，检查 RIS 服务与 `openSUSE-repos` 包，而不是反复覆盖配置。不要为了换源卸载所有 `openSUSE-repos-*` 包。

## 参考资料

- [TUNA opensuse 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/opensuse/)
