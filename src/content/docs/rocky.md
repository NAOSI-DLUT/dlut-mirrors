---
icon: rockylinux
title: 'Rocky Linux 镜像'
description: 'Rocky Linux 9/10 的 BaseOS、AppStream 和 Extras 镜像配置。'
category: 'Linux 发行版'
mark: 'R'
color: '#587f6d'
---

## 适用范围

[rocky](/rocky/) 提供 Rocky Linux 仓库。先查看 `cat /etc/os-release`；以下配置针对 9/10 的默认 repo 布局，8 使用的文件名不同。

## 修改现有配置

备份 `/etc/yum.repos.d/rocky.repo` 和 `rocky-extras.repo`。仅在要更换的仓库节中注释 `mirrorlist=`，设置对应 `baseurl`，保留密钥、`gpgcheck=1` 和启用状态。

```ini
[baseos]
baseurl=https://mirrors.cernet.edu.cn/rocky/$releasever/BaseOS/$basearch/os/

[appstream]
baseurl=https://mirrors.cernet.edu.cn/rocky/$releasever/AppStream/$basearch/os/

[extras]
baseurl=https://mirrors.cernet.edu.cn/rocky/$releasever/extras/$basearch/os/
```

上面是待合并的 URL 片段，不是完整 repo 文件。需要 CRB 时，将已有 `[crb]` 的路径设为 `https://mirrors.cernet.edu.cn/rocky/$releasever/CRB/$basearch/os/`，是否启用由软件依赖需求决定。

## 验证与恢复

```bash
sudo dnf makecache --refresh
dnf repolist
```

如果系统固定到已归档的小版本，不要将 `$releasever` 直接改成其他大版本；先确认组织的版本锁定策略和 Vault 路径。恢复原 repo 备份后再刷新缓存。

EPEL 是独立仓库，按 [EPEL 指南](/docs/epel/) 单独配置。

## 参考资料

- [USTC Rocky Linux 使用帮助](https://mirrors.ustc.edu.cn/help/rocky.html)
