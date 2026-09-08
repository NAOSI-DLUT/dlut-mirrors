---
icon: nodedotjs
title: 'Node.js / npm 镜像'
description: 'npm、pnpm、Yarn 软件包索引与 Node.js 发行文件的区别。'
category: '开发工具'
mark: 'N'
color: '#618944'
mirrors: ['nodejs-release', 'npm']
featured: { 'label': 'Node.js / npm', 'order': 3 }
---

## 两类镜像

[npm](/npm/) 提供软件包 registry；[nodejs-release](/nodejs-release/) 提供 Node.js 二进制和源码。更改 npm registry 不会替换 Node.js 解释器，也不一定改变安装脚本下载 Electron 等附加文件的地址。

## npm 与 pnpm

临时查询，确认索引能访问：

```bash
npm view typescript version --registry=https://mirrors.cernet.edu.cn/npm/
```

npm 用户配置：

```bash
npm config set registry https://mirrors.cernet.edu.cn/npm/ --location=user
npm config get registry
```

pnpm 项目可在项目 `.npmrc` 中配置：

```ini
registry=https://mirrors.cernet.edu.cn/npm/
```

不要覆盖原有 scope、认证 token 或代理设置。`@company:registry` 等私有 scope 应继续指向公司仓库，切勿将私有 token 配给公共镜像。

## Yarn

Yarn 1（Classic）：

```bash
yarn config set registry https://mirrors.cernet.edu.cn/npm/
yarn config get registry
```

Yarn 2 及之后，在项目 `.yarnrc.yml` 中合并：

```yaml
npmRegistryServer: 'https://mirrors.cernet.edu.cn/npm/'
```

Yarn 的私有 scope 由 `npmScopes` 单独管理，不要盲目覆盖。

## Node.js 发行文件

使用 nvm-sh 的 Bash/Zsh 用户可临时指定二进制镜像：

```bash
NVM_NODEJS_ORG_MIRROR=https://mirrors.cernet.edu.cn/nodejs-release nvm install --lts
```

此配置不适用于另一个项目 nvm-windows。手工下载时从仓库选择版本与操作系统，使用发行版提供的 `SHASUMS256.txt` 及官方签名核验下载文件。

## 验证与恢复

用 `npm view typescript dist.tarball` 检查包下载 URL；元数据可能引用其他域名，这属于上游仓库的行为。已有 lockfile 也可能保留旧下载地址，不建议仅为换源删除整个锁文件。

npm 恢复：

```bash
npm config delete registry --location=user
```

pnpm 删除新增的 `.npmrc` 行；Yarn 1 使用 `yarn config delete registry`；新版 Yarn 删除新增配置。已存在自定义配置时恢复此前备份。

## 参考资料

- [npm registry 文档](https://docs.npmjs.com/cli/v11/using-npm/registry)
- [SJTUG npm 使用帮助](https://mirrors.sjtug.sjtu.edu.cn/docs/npm-registry)
- [nvm-sh 文档](https://github.com/nvm-sh/nvm)
