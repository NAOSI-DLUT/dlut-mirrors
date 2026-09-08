---
icon: centos
title: 'CentOS 与 Stream 镜像'
description: '区分 CentOS Stream 与已停止维护的 CentOS Linux 历史归档。'
category: 'Linux 发行版'
mark: 'C'
color: '#8663a5'
mirrors: ['centos', 'centos-stream', 'centos-vault']
---

## 先区分产品

```bash
cat /etc/centos-release
```

CentOS Linux 7 已于 2024 年 6 月 30 日结束维护。它与 CentOS Stream 的软件包、仓库和升级路线不同。不要将旧 CentOS Linux 的地址直接改为 Stream 来尝试迁移。

- [centos-stream](/centos-stream/)：Stream 仓库。
- [centos-vault](/centos-vault/)：CentOS Linux 历史归档，不再提供持续安全更新。
- [centos](/centos/)：兼容入口，不能据此判断版本仍受支持。

## CentOS Stream 9

先备份 `/etc/yum.repos.d/centos.repo` 和 `centos-addons.repo`。在现有对应节内注释 `metalink=`，添加以下地址，保留原 `gpgkey`、`gpgcheck=1` 和启用状态：

```ini
[baseos]
baseurl=https://mirrors.cernet.edu.cn/centos-stream/9-stream/BaseOS/$basearch/os/

[appstream]
baseurl=https://mirrors.cernet.edu.cn/centos-stream/9-stream/AppStream/$basearch/os/

[crb]
baseurl=https://mirrors.cernet.edu.cn/centos-stream/9-stream/CRB/$basearch/os/
```

这只是 URL 片段，不应覆盖完整 repo 文件。Extras 等附加仓库可保留原配置；Stream 10 请先核实其仓库布局，不直接复制写死 9 的示例。

```bash
sudo dnf makecache --refresh
dnf repolist
```

## CentOS Linux 7 历史归档

仅用于旧环境复现或迁移过渡。备份原 repo 文件后，以最后一个小版本 `7.9.2009` 为例，在对应节中禁用旧 `mirrorlist` 并更换地址：

```ini
[base]
baseurl=https://mirrors.cernet.edu.cn/centos-vault/7.9.2009/os/$basearch/

[updates]
baseurl=https://mirrors.cernet.edu.cn/centos-vault/7.9.2009/updates/$basearch/

[extras]
baseurl=https://mirrors.cernet.edu.cn/centos-vault/7.9.2009/extras/$basearch/
```

保留系统原密钥及 `gpgcheck=1`，然后执行 `sudo yum makecache`。不要将 `$releasever` 展开的 `7` 当成 Vault 的完整小版本号。

## 恢复与迁移

将备份恢复到原 repo 文件后刷新缓存。CentOS Linux 7 恢复旧 mirrorlist 不保证恢复访问，长期方案是按发行版官方迁移指南迁往仍受支持的系统。

## 参考资料

- [TUNA centos 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/centos/)
- [TUNA centos-stream 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/centos-stream/)
- [TUNA centos-vault 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/centos-vault/)
