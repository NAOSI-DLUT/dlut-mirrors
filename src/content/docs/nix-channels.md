---
icon: nixos
title: 'Nix / NixOS 镜像'
description: '区分 channel 元数据与 binary cache，保留包签名信任。'
category: '系统工具'
mark: 'Ni'
color: '#587f6d'
---

## 两种配置

[nix-channels](/nix-channels/) 可包含 channel 快照与 `store` 二进制缓存。修改 channel 不会自动修改 substituter；flake 项目也不一定使用 channel。

## 二进制缓存

备份 Nix 配置。多用户安装通常编辑 `/etc/nix/nix.conf`，单用户通常为 `~/.config/nix/nix.conf`。合并：

```ini
substituters = https://mirrors.cernet.edu.cn/nix-channels/store https://cache.nixos.org/
```

保留已有受信缓存的 `trusted-public-keys`；这是官方缓存的镜像，不需要从陌生来源增加密钥。受限用户的配置可能被 daemon 忽略，应按安装方式修改管理员配置。

NixOS 22.05 及以后在系统配置中合并：

```nix
nix.settings.substituters = [
  "https://mirrors.cernet.edu.cn/nix-channels/store"
  "https://cache.nixos.org/"
];
```

按自己的系统配置流程应用更改，不为换源重建未知配置。

## Channel

先记录现有设置：

```bash
nix-channel --list
```

如果原本使用的就是 `nixpkgs-unstable`，可改为：

```bash
nix-channel --add https://mirrors.cernet.edu.cn/nix-channels/nixpkgs-unstable nixpkgs
nix-channel --update nixpkgs
```

固定 NixOS 稳定版本的用户必须保留原 channel 名与版本，不要照抄切到 unstable。flakes 中的 GitHub 输入与 `flake.lock` 不会因此改变。

## 验证与恢复

查看安装/构建日志中的 substituter；缺少该平台二进制包时，Nix 可能回退到官方缓存或本地构建。不要通过禁用签名要求处理缓存缺失。

恢复配置文件和此前记录的 channel URL，再更新同名 channel。macOS 的缓存覆盖可能与 Linux 不同，保留官方后备入口。

## 参考资料

- [TUNA nix-channels 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/nix-channels/)
- [Nix 配置参考](https://nix.dev/manual/nix/stable/command-ref/conf-file.html)
