---
category: Linux 发行版
mark: D
color: "#c34764"
title: Debian 镜像
description: Debian 镜像源配置与使用说明。
---

## 镜像入口

[通过本站访问 Debian](/debian/)，请求会以 HTTP 302 跳转至 CERNET，再由其选择高校镜像站。

也可直接使用 `https://mirrors.cernet.edu.cn/debian/`。

Debian 主仓库与安全更新分别使用 `debian` 和 `debian-security`，请不要将两者合并成同一路径。

## 按版本配置

请参考 [CERNET Debian 使用帮助](https://help.mirrors.cernet.edu.cn/debian/) 选择适用的版本、架构与仓库子路径。修改软件源之前请备份原有配置，保留包签名校验。
