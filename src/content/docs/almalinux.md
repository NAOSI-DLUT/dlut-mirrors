---
icon: almalinux
title: 'AlmaLinux 镜像'
description: '按现有仓库节配置 AlmaLinux 9，保留系统签名与组件设置。'
category: 'Linux 发行版'
mark: 'Am'
color: '#587f6d'
---

## 适用范围

[almalinux](/almalinux/) 是 AlmaLinux 主仓库。本文以 AlmaLinux 9 为例；先用 `cat /etc/os-release` 确认系统版本。Kitten、Vault 与其他主版本不可混用。

## 更换仓库 URL

备份 `/etc/yum.repos.d/` 中需要修改的 AlmaLinux repo 文件。在 `[baseos]`、`[appstream]`、`[extras]` 节内注释 `mirrorlist=`，将对应 `baseurl` 改为以下内容：

```ini
[baseos]
baseurl=https://mirrors.cernet.edu.cn/almalinux/9/BaseOS/$basearch/os/

[appstream]
baseurl=https://mirrors.cernet.edu.cn/almalinux/9/AppStream/$basearch/os/

[extras]
baseurl=https://mirrors.cernet.edu.cn/almalinux/9/extras/$basearch/os/
```

仅替换 URL，不覆盖整个文件；保留发行版自带 `gpgkey`、`gpgcheck=1` 和 `enabled`。需要 CRB 时按官方文档启用相应节，其 9 系列目录为 `/almalinux/9/CRB/$basearch/os/`。

## 刷新与回退

```bash
sudo dnf makecache --refresh
dnf repolist
```

如果某架构返回 404，检查主镜像是否包含该组合。恢复修改前备份即可重新使用发行版镜像列表，再执行缓存刷新。换源不会迁移 Rocky、CentOS 或 RHEL 为 AlmaLinux。

## 参考资料

- [AlmaLinux 官方仓库说明](https://wiki.almalinux.org/repos/)
- [USTC Rocky Linux：同类 DNF 仓库配置参考](https://mirrors.ustc.edu.cn/help/rocky.html)
