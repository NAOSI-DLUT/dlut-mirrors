---
icon: fdroid
title: 'F-Droid 镜像'
description: '给 F-Droid 官方仓库添加镜像，核对仓库签名身份。'
category: '系统工具'
mark: 'Fd'
color: '#587f6d'
---

## 镜像与仓库身份

[fdroid](/fdroid/) 镜像包含官方应用仓库及归档。客户端应通过仓库签名确认身份，不能只凭 URL 看起来像镜像就信任。

已安装官方 F-Droid 客户端时，打开仓库设置，查看官方仓库信息与镜像管理界面。不同客户端版本的菜单名称可能不同。

## 添加镜像

仓库地址为：

```text
https://mirrors.cernet.edu.cn/fdroid/repo/
```

通过客户端的官方仓库镜像管理入口添加。若使用“添加仓库”，务必核对其识别为同一官方仓库，而不是未知签名的新仓库。

TUNA 帮助列出的官方仓库 SHA-256 指纹为：

```text
43238D512C1E5EB2D6569F4A3AFBF5523418B82E0A3ED1552770ABB9A9C9CCAB
```

添加前与已信任客户端或 F-Droid 官方资料中的当前指纹交叉核对；若官方轮换密钥，以其验证说明为准。

## 归档与更新

只有需要旧版本时才启用 `/fdroid/archive/`，归档应用可能没有后续更新。刷新仓库索引，确认客户端没有签名或证书警告，再查看应用版本。

首次安装 F-Droid 本身应从官方发布渠道取得客户端，不直接采用文档中写死年份的 APK。

## 恢复

在客户端仓库设置中停用或移除新增镜像，保留官方仓库即可。换镜像不需要卸载已经安装的应用，也不需要关闭应用签名检查。

## 参考资料

- [TUNA fdroid 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/fdroid/)
- [F-Droid 官方网站](https://f-droid.org/)
