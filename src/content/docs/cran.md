---
icon: r
title: 'R / CRAN 镜像'
description: '设置 R 包安装源，区分 CRAN 软件包与系统 R 安装源。'
category: '科学计算'
mark: 'R'
color: '#587f6d'
mirrors: ['CRAN']
---

## 临时安装

[CRAN](/CRAN/) 路径大小写需要保留。在 R 控制台运行：

```r
install.packages("lattice", repos = "https://mirrors.cernet.edu.cn/CRAN/")
```

这会安装 R 包，不会更新操作系统中的 R 解释器。

## 会话与持久配置

当前 R 会话使用：

```r
options(repos = c(CRAN = "https://mirrors.cernet.edu.cn/CRAN/"))
getOption("repos")
```

需要持久化时，将 `options(...)` 合并进用户 `~/.Rprofile` 并重启 R。项目自己的 `.Rprofile` 可能优先生效；使用 renv 或组织内部仓库时先遵循项目设置，不覆盖它们。

## 平台差异

CRAN 同时包含源码包与部分平台的二进制包。Linux 安装源码包可能需要编译器及系统开发库，缺失系统依赖不是换源能解决的。

在 Ubuntu/Debian 上安装 R 本体，应依据 CRAN 官方针对该发行版的说明配置签名密钥和 APT 仓库，不能把上面的 R `repos` 选项当成 APT 配置。

## 恢复与验证

恢复 `.Rprofile` 原内容并重启；临时回到官方公共服务可运行：

```r
options(repos = c(CRAN = "https://cloud.r-project.org/"))
getOption("repos")
```

Bioconductor 使用独立仓库和版本关系，不会仅因修改 CRAN 自动切换。

## 参考资料

- [TUNA CRAN 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/CRAN/)
