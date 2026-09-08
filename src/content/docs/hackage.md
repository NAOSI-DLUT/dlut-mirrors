---
icon: haskell
title: 'Haskell / Hackage 镜像'
description: '在 Cabal 中配置 Hackage HTTPS 镜像并保留安全索引校验。'
category: '开发工具'
mark: 'Hs'
color: '#587f6d'
---

## 范围

[hackage](/hackage/) 提供 Haskell 包索引与包文件。GHC 编译器、Stack 的 Stackage 快照和 GHCup 下载源分别配置，不会自动跟随。

## Cabal 配置

使用当前受支持的 cabal-install。通过 `cabal path`（支持该命令的版本）或客户端文档确认配置路径；传统位置为 `~/.cabal/config`，Windows 常见为 `%APPDATA%\cabal\config`，新版可能使用 XDG 目录。

备份后修改已有官方仓库节，只更改 URL 并保持安全校验：

```text
repository hackage.haskell.org
  url: https://mirrors.cernet.edu.cn/hackage/
  secure: True
```

保留原有 `root-keys` 与 `key-threshold`，不要复制未知来源的信任密钥列表。已有同名节时合并，不重复声明。

## 验证

```bash
cabal update
```

在已有项目中进行构建，检查日志中的索引与包下载信息。索引时间戳或签名失败可能是同步延迟，应等待或恢复官方源，不设置 `secure: False`。

## 恢复与 Stack

将 URL 改回 `https://hackage.haskell.org/` 或恢复备份，再运行 `cabal update`。Stack 使用自己的 `config.yaml` 和 Hackage 安全配置；不要把 Cabal 的 repository 节直接粘进 Stack 文件。

## 参考资料

- [TUNA hackage 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/hackage/)
- [Cabal 配置文档](https://cabal.readthedocs.io/en/stable/config.html)
