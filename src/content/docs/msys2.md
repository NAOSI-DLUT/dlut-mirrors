---
title: 'MSYS2 镜像'
description: '在 Windows 的 MSYS2 环境中配置 pacman 镜像。'
category: '系统工具'
mark: 'MS'
color: '#587f6d'
---

## 确认安装环境

[msys2](/msys2/) 包含 MSYS 与 MinGW 系列仓库。安装器位于 `distrib/`。下面操作在 MSYS2 终端内执行，不是 Windows CMD；MSYS2 不能使用 Arch Linux 的 mirrorlist。

## 配置文件

备份 `/etc/pacman.d/` 中实际使用的 `mirrorlist.*` 文件。在对应文件顶部添加 CERNET 地址，并保留原服务器作后备。

对于 MSYS 仓库（常见文件为 `mirrorlist.msys`）：

```ini
Server = https://mirrors.cernet.edu.cn/msys2/msys/$arch/
```

对于 MinGW 仓库（常见文件为 `mirrorlist.mingw`）：

```ini
Server = https://mirrors.cernet.edu.cn/msys2/mingw/$repo/
```

以 `/etc/pacman.conf` 的实际 `Include` 为准，部分安装版本使用拆分 mirrorlist。保留原 URL 的仓库后缀，不手工把 UCRT64 与 MINGW64 相互替换。

## 完整升级

```bash
pacman -Syu
```

若更新核心运行库时提示关闭终端，应按提示关闭所有 MSYS2 进程，重新打开后再次执行 `pacman -Syu` 完成升级。不要只刷新索引后长期不升级。

## 恢复与排错

恢复原 mirrorlist，重新运行完整升级。签名问题先检查系统时间和 MSYS2 keyring，不能设置 `SigLevel = Never`。安装包已经下载但解压失败时，也要检查 Windows 安全软件及文件占用。

## 参考资料

- [TUNA msys2 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/msys2/)
- [MSYS2 镜像说明](https://www.msys2.org/dev/mirrors/)
