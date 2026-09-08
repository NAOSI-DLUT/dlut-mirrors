---
icon: gentoo
title: 'Gentoo 镜像'
description: '配置 Distfiles 与安装文件下载，区分 ebuild 同步协议。'
category: 'Linux 发行版'
mark: 'Ge'
color: '#587f6d'
mirrors: ['gentoo', 'gentoo-portage']
---

## 镜像包含什么

[gentoo](/gentoo/) 包含 Stage 3、distfiles 和部分二进制包。Portage 的 ebuild 仓库另有 [gentoo-portage](/gentoo-portage/) 等入口，内容与传输协议不能混淆。

## Distfiles 配置

备份 `/etc/portage/make.conf`，合并下面一行；已有 GENTOO_MIRRORS 时按需保留其他后备地址：

```bash
GENTOO_MIRRORS="https://mirrors.cernet.edu.cn/gentoo"
```

这影响编译软件时下载源文件，不会自动修改 ebuild 的同步服务器。

## 获取安装文件

进入 `/gentoo/releases/`，按 CPU 架构、init 系统、libc 和 profile 选择 Stage 3。下载与压缩包配套的签名及摘要，并依 Gentoo Handbook 从官方可信密钥核验。

不要把不同 libc 或 CPU 指令集的 Stage 3、binhost 混用。启用二进制包时，路径必须匹配系统 profile，并保留签名验证。

## ebuild 同步与验证

```bash
emerge --info
```

检查输出中的 GENTOO_MIRRORS。同步 ebuild 仍使用现有受信配置下的 `emaint sync -a`。

CERNET 的 HTTP 302 不提供 rsync 协议代理。不能把 `rsync://rsync.gentoo.org/gentoo-portage` 机械改成 `rsync://mirrors.cernet.edu.cn/...`；如需 rsync 镜像，直接使用高校明确公布的 rsync 服务。

## 恢复

恢复 make.conf 的原值即可。若另行修改了 binrepos 或 repos.conf，需要分别恢复。下载失败先检查具体源文件是否在镜像中，包本身有时会要求直接访问原作者站点。

## 参考资料

- [TUNA gentoo 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/gentoo/)
- [TUNA gentoo-portage 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/gentoo-portage/)
