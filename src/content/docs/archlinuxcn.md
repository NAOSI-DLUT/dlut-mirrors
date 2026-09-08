---
icon: archlinux
title: 'Arch Linux CN 镜像'
description: '配置中文社区附加仓库及其 keyring，不替代 Arch 官方仓库。'
category: 'Linux 发行版'
mark: 'CN'
color: '#587f6d'
---

## 仓库定位

[archlinuxcn](/archlinuxcn/) 是 Arch Linux 中文社区维护的非官方用户仓库，不等于 Arch 官方仓库，也不是 AUR 的完整二进制镜像。

下面适用于已有正常官方仓库与可信 keyring 的 Arch 系统。官方源配置见 [Arch Linux 指南](/docs/arch-linux/)。

## 添加仓库

备份 `/etc/pacman.conf`，在文件末尾合并：

```ini
[archlinuxcn]
Server = https://mirrors.cernet.edu.cn/archlinuxcn/$arch
```

已有同名节时仅修改 Server，不重复追加。保留原有签名策略。

## 导入社区 keyring

根据 Arch Linux CN 官方说明安装 `archlinuxcn-keyring`。在官方仓库正常、系统支持完整升级的情况下可使用：

```bash
sudo pacman -Syu archlinuxcn-keyring
```

该命令会同时进行完整系统升级，先阅读升级事务再确认。若首次导入遇到未知签名或信任不足，按社区当前的 keyring 引导说明处理；不要把 `SigLevel` 改成 `Never`。

## 验证与移除

```bash
pacman -Sl archlinuxcn
```

移除镜像配置时恢复备份或删除 `[archlinuxcn]` 节，再完整刷新升级。此前从社区安装的软件包不会自动卸载，需自行决定保留、迁移来源或移除。

## 参考资料

- [TUNA archlinuxcn 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/archlinuxcn/)
- [Arch Linux CN 仓库说明](https://github.com/archlinuxcn/repo)
