---
title: 'Termux 镜像'
description: '配置 Android Termux 的主仓库及已启用的附加仓库。'
category: '系统工具'
mark: 'Tx'
color: '#587f6d'
---

## 推荐入口

先在 Termux 中运行 `termux-change-repo`，可以用交互界面选择可用高校镜像。需要显式使用 CERNET 调度时，再按以下步骤手工配置 [termux](/termux/)。

操作应在受支持的 Termux 环境内执行；不要用另一个具有 root 权限的 Android 文件管理器修改 Termux 私有目录。

## 主仓库

备份 `$PREFIX/etc/apt/sources.list`，编辑为：

```text
deb https://mirrors.cernet.edu.cn/termux/apt/termux-main stable main
```

这里的 `$PREFIX` 是 Termux 自己设置的环境变量，不要用 Linux 桌面系统的 `/etc/apt` 代替。

## 已启用的附加仓库

只在原本使用 X11 或 root 仓库时修改对应文件，勿为换源额外启用。

`$PREFIX/etc/apt/sources.list.d/x11.list`：

```text
deb https://mirrors.cernet.edu.cn/termux/apt/termux-x11 x11 main
```

`$PREFIX/etc/apt/sources.list.d/root.list`：

```text
deb https://mirrors.cernet.edu.cn/termux/apt/termux-root root stable
```

## 验证与恢复

```bash
pkg update
pkg upgrade
```

先查看更新输出，再确认升级。需要恢复时还原备份或重新运行 `termux-change-repo`。提示旧仓库不可用时先确认 Termux 应用和安装渠道是否受支持，不要使用 Debian 或 Ubuntu 仓库替代。

## 参考资料

- [TUNA termux 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/termux/)
- [Termux 包管理](https://github.com/termux/termux-packages/wiki/Package-Management)
