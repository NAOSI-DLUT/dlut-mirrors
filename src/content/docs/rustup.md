---
icon: rust
title: 'Rustup 工具链镜像'
description: '配置 Rust 工具链和 rustup 自更新地址，区分 Cargo 包索引。'
category: '开发工具'
mark: 'Rs'
color: '#587f6d'
---

## 镜像用途

[rustup](/rustup/) 用于 rustc、标准库、Cargo 工具链组件和 rustup 本身。Rust 项目依赖的 crates 索引另见 [Cargo 指南](/docs/cargo/)。

## 临时使用

已有 rustup 的 Linux/macOS 用户：

```bash
RUSTUP_DIST_SERVER=https://mirrors.cernet.edu.cn/rustup rustup toolchain install stable
```

PowerShell：

```powershell
$env:RUSTUP_DIST_SERVER = "https://mirrors.cernet.edu.cn/rustup"
rustup toolchain install stable
```

只需要一个项目固定的工具链时，以项目 `rust-toolchain.toml` 中的版本为准，不要为换源修改项目版本。

## 持久配置

Bash/Zsh 的启动配置文件中加入：

```bash
export RUSTUP_DIST_SERVER=https://mirrors.cernet.edu.cn/rustup
export RUSTUP_UPDATE_ROOT=https://mirrors.cernet.edu.cn/rustup/rustup
```

重新打开终端。PowerShell 用户可把对应 `$env:` 赋值放进自己的 `$PROFILE`。`RUSTUP_UPDATE_ROOT` 管 rustup 自更新，不应省略后面的第二个 `/rustup`。

## 验证与恢复

```bash
rustup show
rustc --version
cargo --version
```

镜像可能不保留指定日期的 nightly。找不到历史版本时，删除启动文件中的镜像设置，并在 Bash/Zsh 执行：

```bash
unset RUSTUP_DIST_SERVER RUSTUP_UPDATE_ROOT
```

PowerShell 使用 `Remove-Item Env:RUSTUP_DIST_SERVER, Env:RUSTUP_UPDATE_ROOT -ErrorAction SilentlyContinue`。重新运行安装或更新操作即可回到官方源。

## 参考资料

- [TUNA rustup 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/rustup/)
