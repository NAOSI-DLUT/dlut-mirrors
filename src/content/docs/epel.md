---
title: 'EPEL 镜像'
description: '为 Enterprise Linux 配置额外软件包仓库，保留 GPG 校验。'
category: 'Linux 发行版'
mark: 'Ep'
color: '#587f6d'
---

## 适用系统

[epel](/epel/) 为 RHEL 及兼容发行版提供额外软件包，不替代 BaseOS 或 AppStream。以下示例以 Rocky Linux 9 为基准。

先按发行版官方说明启用所需 CRB/CodeReady Builder；这些依赖仓库的启用方式在 RHEL、Rocky 和 AlmaLinux 上不同。

## 安装与配置

Rocky Linux 可从现有仓库安装：

```bash
sudo dnf install epel-release
sudo cp -an /etc/yum.repos.d/epel.repo /etc/yum.repos.d/epel.repo.bak
```

编辑现有 `[epel]` 节，注释 `metalink=` 并设置：

```ini
baseurl=https://mirrors.cernet.edu.cn/epel/$releasever/Everything/$basearch/
```

保留原来的 `gpgcheck=1`、GPG 密钥路径及启用状态。该路径适用于本文的 EPEL 9；其他大版本需要核对布局。不必同时开启 testing、debug、source，EPEL Cisco OpenH264 也不属于这里的镜像范围。

## 验证与恢复

```bash
sudo dnf makecache --refresh
dnf repolist
```

缺依赖时先检查 CRB 是否启用和主版本是否一致，而不是关闭签名检查。将备份恢复到 `epel.repo` 后刷新缓存即可恢复原有 Metalink。

## 参考资料

- [TUNA epel 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/epel/)
- [Fedora EPEL 入门](https://docs.fedoraproject.org/en-US/epel/getting-started/)
