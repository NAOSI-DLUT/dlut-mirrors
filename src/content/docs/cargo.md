---
icon: rust
title: 'Cargo / crates.io 镜像'
description: '使用稀疏索引替换 crates.io，区分索引与包文件下载。'
category: '开发工具'
mark: 'Ca'
color: '#587f6d'
mirrors: ['crates.io-index', 'crates.io-index.git', 'crates.io']
---

## 前提

[crates.io-index](/crates.io-index/) 是 Cargo 索引。以下配置要求 Cargo 1.68 或更新版本，采用 sparse 协议，不需要完整克隆 Git 索引。

索引中的 `config.json` 决定包文件下载地址。CERNET 当前调度得到的索引可能仍指向 `static.crates.io`，因此更换索引不保证包文件也通过高校镜像下载。

## 配置 source replacement

备份并编辑 `~/.cargo/config.toml`，Windows 对应 `%USERPROFILE%\.cargo\config.toml`。设置了 `CARGO_HOME` 时使用该目录。

```toml
[source.crates-io]
replace-with = "cernet"

[source.cernet]
registry = "sparse+https://mirrors.cernet.edu.cn/crates.io-index/"
```

末尾斜杠和 `sparse+` 都不能省略。已有同名 TOML 节时应合并，不要重复追加。项目自己的 `.cargo/config.toml` 也可能影响最终设置。

## 验证

在含 `Cargo.toml` 与锁文件的项目中执行：

```bash
cargo fetch --locked -v
```

检查输出中的索引更新与下载情况。`cargo search` 涉及 registry API，不等同于依赖下载，不应仅靠搜索命令判断替换是否生效。

## 恢复与排错

删除本次增加的 `replace-with` 和 `[source.cernet]`，或恢复原配置即可。不要为了换源删除 `Cargo.lock`。

索引能访问但 crate 下载失败时检查实际下载域名。如果需要固定高校的完整包镜像，应采用该站公布的整套配置，不混拼索引与任意包下载目录。工具链本身的镜像见 [Rustup](/docs/rustup/)。

## 参考资料

- [TUNA crates.io-index 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/crates.io-index/)
- [Cargo source replacement](https://doc.rust-lang.org/cargo/reference/source-replacement.html)
