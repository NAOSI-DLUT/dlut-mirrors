---
icon: homebrew
title: 'Homebrew 镜像'
description: '分别配置 Homebrew API 与 bottles，避免混淆源码仓库。'
category: '开发工具'
mark: 'Br'
color: '#587f6d'
mirrors: ['homebrew', 'homebrew-bottles']
---

## 镜像范围

[homebrew-bottles](/homebrew-bottles/) 提供预编译包与 API 数据。Homebrew 4 及之后的普通安装主要使用 API，不需要为了换源额外克隆全部 homebrew/core 与 homebrew/cask。

## 当前终端使用

在 Bash/Zsh 中执行：

```bash
export HOMEBREW_API_DOMAIN=https://mirrors.cernet.edu.cn/homebrew-bottles/api
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.cernet.edu.cn/homebrew-bottles
brew update
brew config
```

持续使用时，将两行 export 合并进自己的 shell 启动文件，例如 Zsh 的 `~/.zprofile`，重新打开终端。不要重复追加多组冲突定义。

## 验证

```bash
brew info wget
brew fetch --bottle wget
```

`brew fetch` 只下载用于检查，不安装软件。如果该平台或版本没有 bottle，Homebrew 可能需要源码构建；源码 URL 由 formula 定义，不一定通过本镜像。

## brew 本身与 Git 仓库

上面两项不替换 brew 程序本身的 Git 更新。CERNET 另有 [homebrew](/homebrew/) 等目录，但不同站点的 Git 路径约定可能不同。本指南保留 brew 官方 Git remote，不把普通目录 URL 当作 Git 仓库地址。

## 恢复

删除启动文件中的两项定义，并在当前终端执行：

```bash
unset HOMEBREW_API_DOMAIN HOMEBREW_BOTTLE_DOMAIN
brew update
```

如果此前改过 Git remote，还需按当时记录单独恢复。API 或 bottle 同步不一致时可暂时恢复官方地址，不要关闭校验和检查。

## 参考资料

- [TUNA homebrew 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/)
- [TUNA homebrew-bottles 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew-bottles/)
