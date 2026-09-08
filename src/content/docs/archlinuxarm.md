---
icon: archlinux
title: 'Arch Linux ARM 镜像'
description: '使用 ARM 专用 pacman 路径，保留硬件平台的安装流程。'
category: 'Linux 发行版'
mark: 'ARM'
color: '#587f6d'
---

## 适用范围

[archlinuxarm](/archlinuxarm/) 面向 Arch Linux ARM，不能替代 x86_64 Arch Linux 的仓库。安装前先阅读官方对应硬件平台的说明，启动方式和系统镜像不能通用套用。

## 设置 mirrorlist

```bash
sudo cp -an /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.bak
```

在原文件顶部添加：

```ini
Server = https://mirrors.cernet.edu.cn/archlinuxarm/$arch/$repo
```

注意 ARM 仓库路径是 `$arch/$repo`，与 Arch x86_64 的 `$repo/os/$arch` 不同。保留系统的 `Architecture`、keyring 和签名检查设置。

## 验证与更新

```bash
sudo pacman -Syu
pacman -Si bash
```

不要仅刷新索引后长期不执行完整升级。找不到仓库时先核对设备支持情况与用户空间架构，不通过修改为另一架构绕过错误。

## 恢复

还原 mirrorlist 备份后执行完整升级。重新刷写硬件系统镜像是另一项操作，换源不需要格式化存储设备或改动引导分区。

## 参考资料

- [TUNA archlinuxarm 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/archlinuxarm/)
- [Arch Linux ARM 平台安装指南](https://archlinuxarm.org/platforms)
