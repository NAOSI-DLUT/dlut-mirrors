---
icon: alpinelinux
title: 'Alpine Linux 镜像'
description: '保留 Alpine 版本分支，配置 apk 的 main 与 community 仓库。'
category: 'Linux 发行版'
mark: 'Al'
color: '#587f6d'
---

## 确认当前分支

```sh
cat /etc/alpine-release
cat /etc/apk/repositories
```

[alpine](/alpine/) 包含不同稳定分支和 edge。换源时保留原来的 `v3.x` 分支；不要使用 `latest-stable` 意外跨版本升级，也不要混用 stable 与 edge。

## 更换地址

以下命令在 root shell 内执行，只替换官方 CDN 前缀，不改版本和组件：

```sh
cp -an /etc/apk/repositories /etc/apk/repositories.bak
sed -i 's#https\?://dl-cdn.alpinelinux.org/alpine#https://mirrors.cernet.edu.cn/alpine#g' /etc/apk/repositories
apk update
```

如果原地址不是官方 CDN，请手工编辑文件，将其镜像根目录改为 `https://mirrors.cernet.edu.cn/alpine`，保留后续版本与 `/main`、`/community` 路径。没有启用 community 时，不必为换源强行增加它。

## 验证与恢复

```sh
apk policy busybox
```

索引中应出现新仓库地址。恢复时将 `.bak` 复制回 `/etc/apk/repositories` 并执行 `apk update`。Dockerfile 中换源只影响该镜像构建阶段，容器之外的系统不会随之修改。

## 参考资料

- [TUNA alpine 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/alpine/)
