---
icon: openwrt
title: 'OpenWrt 镜像'
description: '按 opkg 或 apk 版本修改软件源，保持固件 ABI 与仓库一致。'
category: '系统工具'
mark: 'Ow'
color: '#587f6d'
---

## 确认版本与包管理器

```sh
cat /etc/openwrt_release
command -v opkg
command -v apk
```

OpenWrt 24.10 及之前通常使用 opkg；25.12 起使用 apk。以实际固件为准。厂商定制固件不一定遵循官方路径，换源前先确认其兼容性。

## opkg 配置

备份 `/etc/opkg/distfeeds.conf`。只替换官方根地址，保留版本、target、subtarget 和包架构：

```sh
cp -an /etc/opkg/distfeeds.conf /etc/opkg/distfeeds.conf.bak
sed -i 's#https\?://downloads.openwrt.org#https://mirrors.cernet.edu.cn/openwrt#g' /etc/opkg/distfeeds.conf
opkg update
```

## apk 配置

仅在系统实际使用该文件时执行：

```sh
cp -an /etc/apk/repositories.d/distfeeds.list /etc/apk/repositories.d/distfeeds.list.bak
sed -i 's#https\?://downloads.openwrt.org#https://mirrors.cernet.edu.cn/openwrt#g' /etc/apk/repositories.d/distfeeds.list
apk update
```

OpenWrt 的 apk 仓库不是 Alpine 仓库，不要加入 Alpine 源。保留固件自带的签名配置。

## 验证与恢复

检查更新索引结果，确认没有 ABI、签名或 404 错误。[openwrt](/openwrt/) 的最终高校站点未必同步 snapshots；快照固件尤其需要与内核版本匹配。

恢复对应备份再更新索引即可回退。软件源切换不是固件升级；不要批量升级所有内核模块来尝试修复 ABI 不匹配，固件升级应按设备官方流程进行。

## 参考资料

- [TUNA openwrt 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/openwrt/)
