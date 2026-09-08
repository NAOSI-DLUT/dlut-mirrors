---
icon: archlinux
title: 'Arch Linux 镜像'
description: '配置 pacman 镜像优先级，执行完整升级并处理同步错误。'
category: 'Linux 发行版'
mark: 'A'
color: '#298ab2'
mirrors: ['archlinux']
---

## 适用范围

[archlinux](/archlinux/) 面向 Arch Linux 的 x86_64 官方仓库。Arch Linux ARM、Arch Linux CN 和 Manjaro 使用不同仓库，不能套用本配置。

## 配置 mirrorlist

```bash
sudo cp -an /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.bak
```

将下面一行放到 `/etc/pacman.d/mirrorlist` 顶部，保留原有服务器作为后备：

```ini
Server = https://mirrors.cernet.edu.cn/archlinux/$repo/os/$arch
```

这里的 `$repo`、`$arch` 由 pacman 展开。通过 shell 写入时请使用单引号，避免提前展开成空字符串。保留 `/etc/pacman.conf` 中的签名校验设置。

## 更新与验证

```bash
sudo pacman -Syu
pacman -Si bash
```

Arch 是滚动发行版，不支持只执行 `pacman -Sy` 后单独安装软件的部分升级方式。确认源切换后索引损坏或不同步时，可执行一次 `sudo pacman -Syyu` 强制重新获取索引。

404 或校验和不符可能来自同步窗口，先等待同步完成或换回原镜像。不要将 `-Syyuu`（允许降级）作为常规换源步骤。

## 恢复默认配置

```bash
sudo cp /etc/pacman.d/mirrorlist.bak /etc/pacman.d/mirrorlist
sudo pacman -Syu
```

若使用 Reflector 自动生成 mirrorlist，后续运行可能覆盖手工添加的条目，应在自己的维护流程中保留所需配置。

## 参考资料

- [TUNA archlinux 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/archlinux/)
- [ArchWiki：镜像](https://wiki.archlinux.org/title/Mirrors)
