---
category: Linux 发行版
mark: A
color: "#298ab2"
mirrors: [archlinux]
title: Arch Linux 镜像
description: Arch Linux 镜像源配置与使用说明。
---

## 镜像入口

[通过本站访问 Arch Linux](/archlinux/)，请求会以 HTTP 302 跳转至 CERNET，再由其选择高校镜像站。

也可直接使用 `https://mirrors.cernet.edu.cn/archlinux/`。

## pacman 配置

在 `/etc/pacman.d/mirrorlist` 中加入：

```ini
Server = https://mirrors.cernet.edu.cn/archlinux/$repo/os/$arch
```

随后执行 `sudo pacman -Syu` 完成完整系统升级，避免部分升级。

## 按版本配置

请参考 [CERNET Arch Linux 使用帮助](https://help.mirrors.cernet.edu.cn/archlinux/) 选择适用的版本、架构与仓库子路径。修改软件源之前请备份原有配置，保留包签名校验。
