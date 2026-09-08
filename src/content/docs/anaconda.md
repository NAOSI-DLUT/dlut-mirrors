---
icon: anaconda
title: 'Conda / Anaconda 镜像'
description: '配置 Conda 默认频道，检查平台覆盖并恢复原有频道。'
category: '开发工具'
mark: 'Co'
color: '#587f6d'
---

## 选择频道

[anaconda](/anaconda/) 提供安装器与 Conda 仓库。Miniconda 安装器位于 `miniconda/`，Anaconda 安装器位于 `archive/`。

不同高校对第三方频道和平台的同步范围不同。先确认所需频道包含 `linux-64`、`osx-arm64`、`win-64` 或实际平台目录；不要假定所有 nightly 与第三方频道都存在。镜像不会改变 Anaconda 频道本身的许可和使用条款。

## 用户级配置

运行 `conda config --show-sources` 查找生效配置，备份用户目录下 `.condarc`。在原配置中合并：

```yaml
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirrors.cernet.edu.cn/anaconda/pkgs/main
  - https://mirrors.cernet.edu.cn/anaconda/pkgs/r
  - https://mirrors.cernet.edu.cn/anaconda/pkgs/msys2
```

Windows 用户的文件通常为 `%USERPROFILE%\.condarc`。已有企业私有频道时应保留它们及原有优先级。

需要 conda-forge 且确认镜像覆盖目标平台后，可额外合并：

```yaml
custom_channels:
  conda-forge: https://mirrors.cernet.edu.cn/anaconda/cloud
```

## 验证配置

```bash
conda config --show-sources
conda clean --index-cache
conda search --override-channels -c https://mirrors.cernet.edu.cn/anaconda/pkgs/main python
```

`--override-channels` 让这次查询只使用指定频道。不要为测试直接更新整个 base 环境。

## 恢复与排错

恢复原 `.condarc` 并清理索引缓存。遇到 `PackagesNotFoundError`，检查频道、平台、包版本；TLS 错误应修复证书配置，不设置 `ssl_verify: false`。Conda 与 pip 的镜像设置独立，pip 另见 [Python 指南](/docs/python/)。

## 参考资料

- [TUNA anaconda 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/anaconda/)
