---
icon: latex
title: 'TeX Live / CTAN 镜像'
description: '设置 TeX Live 包管理器源，区分年份与系统包管理方式。'
category: '科学计算'
mark: 'TeX'
color: '#587f6d'
mirrors: ['CTAN']
---

## 使用前确认

[CTAN](/CTAN/) 汇集 TeX 宏包与发行工具，路径中的大写字母不能改成小写。以下 `tlmgr` 指令适用于 TeX Live 官方安装器或 MacTeX 管理的安装。

如果 TeX Live 来自 Debian/Ubuntu 等系统软件包，应先遵循发行版的包管理方式，不直接用管理员 tlmgr 覆盖系统文件。

## 设置仓库

记录当前配置：

```bash
tlmgr --version
tlmgr option repository
```

设为 CERNET：

```bash
tlmgr option repository https://mirrors.cernet.edu.cn/CTAN/systems/texlive/tlnet
```

仓库 `tlnet` 跟随当前 TeX Live 年份。旧年份安装不能直接跨年度升级；遇到“本地与远程年份不匹配”，应按官方年度升级说明操作或选择对应历史仓库。

## 检查与更新

```bash
tlmgr update --list
```

确认年份一致、更新列表正常后再执行：

```bash
tlmgr update --self --all
```

共享安装可能需要管理员权限，按实际安装方式运行。网络安装器可从 `/CTAN/systems/texlive/tlnet/` 下载，安装前应检查下载文件与官方说明。

## MiKTeX 与恢复

MiKTeX 使用自己的 Console 设置软件包仓库，目录通常为 `/CTAN/systems/win32/miktex/tm/packages/`，不能填写 TeX Live 的 tlnet 地址。

TeX Live 恢复原仓库时，将之前记录的地址写回；也可使用官方自动选择入口：

```bash
tlmgr option repository https://mirror.ctan.org/systems/texlive/tlnet
```

## 参考资料

- [TUNA CTAN 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/CTAN/)
- [TeX Live tlmgr 文档](https://tug.org/texlive/tlmgr.html)
