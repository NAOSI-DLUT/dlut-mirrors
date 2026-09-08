---
icon: fedora
title: 'Fedora 镜像'
description: '保留 Fedora 仓库密钥，按需将 Metalink 切换为指定镜像。'
category: 'Linux 发行版'
mark: 'f'
color: '#3c73aa'
---

## 什么时候需要换源

Fedora 默认 Metalink 会选择较新的镜像，网络正常时可以继续使用。仅在无法访问 Metalink 等情况下，考虑固定到 [fedora](/fedora/)。

以下路径适用于仍受支持、仓库仍在主镜像中的 Fedora Everything 版本。历史版本位于归档仓库；换源不会恢复其安全维护。

## 修改现有仓库

备份 `/etc/yum.repos.d/fedora.repo` 和 `/etc/yum.repos.d/fedora-updates.repo`：

```bash
sudo cp -an /etc/yum.repos.d/fedora.repo /etc/yum.repos.d/fedora.repo.bak
sudo cp -an /etc/yum.repos.d/fedora-updates.repo /etc/yum.repos.d/fedora-updates.repo.bak
```

只修改 `[fedora]` 与 `[updates]` 两个已启用节：注释其 `metalink=`，分别设置下列 `baseurl`。这是要合并进原节的片段，不是完整 repo 文件。

```ini
[fedora]
baseurl=https://mirrors.cernet.edu.cn/fedora/releases/$releasever/Everything/$basearch/os/

[updates]
baseurl=https://mirrors.cernet.edu.cn/fedora/updates/$releasever/Everything/$basearch/
```

保留原来的 `gpgcheck=1`、`gpgkey`、`enabled` 等字段，不启用 testing、debug 或 source。`$releasever` 与 `$basearch` 由 DNF 解析。

## 验证与恢复

```bash
sudo dnf makecache --refresh
dnf repolist
```

如找不到 repodata，核对版本是否仍受支持和镜像路径是否存在；如需及时安全更新，可恢复原来的 Metalink。将两份备份复制回原文件后再次运行上述刷新命令即可。

## 参考资料

- [TUNA fedora 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/fedora/)
