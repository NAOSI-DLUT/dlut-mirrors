---
category: 开发工具
mark: N
color: "#618944"
mirrors: [nodejs-release, npm]
title: Node.js 镜像
description: Node.js 相关镜像与包管理器配置说明。
featured:
  label: Node.js / npm
  order: 3
---

## 镜像入口

[通过本站访问 Node.js](/nodejs-release/)，请求会以 HTTP 302 跳转至 CERNET，再由其选择高校镜像站。

也可直接使用 `https://mirrors.cernet.edu.cn/nodejs-release/`。

## npm 配置

```bash
npm config set registry https://mirrors.cernet.edu.cn/npm/
```

[通过本站访问 npm](/npm/)。Node.js 安装文件使用 `nodejs-release`；npm 使用 `npm`，不能替换为 `/nodejs/` 或 `/yarn/`。

## 按版本配置

请参考 [CERNET Node.js 使用帮助](https://help.mirrors.cernet.edu.cn/nodejs-release/) 选择适用的版本、架构与仓库子路径。修改软件源之前请备份原有配置，保留包签名校验。
