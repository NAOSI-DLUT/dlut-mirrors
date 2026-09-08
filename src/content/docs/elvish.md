---
title: 'Elvish 镜像'
description: '按操作系统和处理器选择 Elvish 发行文件并验证安装。'
category: '开发工具'
mark: 'E'
color: '#587f6d'
---

## 下载前确认平台

[elvish](/elvish/) 提供 Elvish Shell 的发行文件。请先确认操作系统与架构：Linux/macOS 可运行 `uname -s` 和 `uname -m`；Windows 在系统设置中查看系统类型。

## 选择发行文件

先打开 [Elvish 官方下载页](https://elv.sh/get/)，选择 OS、CPU 和稳定版本，确认官方推荐的文件名。再进入本站镜像目录查找相同文件，避免猜测压缩包后缀或固定已经过时的版本号。

日常脚本建议选择稳定版本，`HEAD` 是开发构建。镜像不一定保留全部历史构建；找不到对应文件时使用官方入口。

## 安装与验证

将压缩包解压后，把二进制放入用户可写、且位于 PATH 的目录，例如 Linux/macOS 的 `~/.local/bin`。Windows 可放入自建工具目录并将该目录加入用户 PATH。

```bash
elvish -version
```

先从现有终端启动 `elvish` 试用。镜像下载与更改登录 Shell 是两件事；需要设置默认 Shell 时按官方说明检查 `/etc/shells`，不要只因下载完成就修改系统登录配置。

## 更新与移除

更新时记录原版本并保留旧二进制，以便回退。移除时删除手工安装的文件与自行添加的 PATH 条目；由系统包管理器安装的 Elvish 应使用同一包管理器卸载。

## 参考资料

- [Elvish 官方安装说明](https://elv.sh/get/)
