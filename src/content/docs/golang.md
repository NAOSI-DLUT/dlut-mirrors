---
icon: go
title: 'Go Modules 镜像'
description: '识别 Go 下载目录与模块代理，配置回退、校验和私有模块。'
category: '开发工具'
mark: 'Go'
color: '#587f6d'
mirrors: ['goproxy', 'golang', 'go']
---

## 两类仓库

[goproxy](/goproxy/) 用于 Go Modules 协议；[golang](/golang/) 与 [go](/go/) 是下载目录入口。不能把 Go 安装包目录填入 `GOPROXY`。

## CERNET 代理当前状态

2026-09-07 核对时，CERNET 清单包含 goproxy，但实际模块请求 `/goproxy/github.com/spf13/cobra/@v/list` 返回 404。因此目前不建议把 CERNET 的 goproxy 地址写入全局配置。目录存在不等于协议服务可用。

下面保留 Go 官方代理配置，待 CERNET 实际模块请求恢复后再考虑替换。官方代理的可达性取决于当前网络。

## 临时与持久配置

Bash/Zsh 可在项目内临时运行：

```bash
GOPROXY=https://proxy.golang.org,direct go mod download
```

跨平台的持久配置：

```bash
go env -w GOPROXY=https://proxy.golang.org,direct
go env GOPROXY GOSUMDB GOPRIVATE
```

逗号分隔的 `direct` 仅在代理返回 404/410 时回退，并不表示所有错误都会回退。下载行为还受当前 shell 的同名环境变量影响。

## 私有模块

在使用公司或个人私有模块前，按模块域名设置 `GOPRIVATE`，避免向公共代理查询私有路径。例如仅当你使用该私有域名时：

```bash
go env -w GOPRIVATE=git.example.com
```

已有配置时合并域名列表，不覆盖原值。不要为提高速度把 `GOSUMDB` 设为 `off`，公开模块仍应保留校验。

## 验证与恢复

在已有 `go.mod` 的项目内运行 `go mod download -x` 查看请求，日志可能包含项目路径。恢复本次持久设置：

```bash
go env -u GOPROXY
```

如此前有自定义值则恢复原值，并检查 shell 配置是否仍设置 GOPROXY。模块代理根目录不一定有可浏览首页，应以实际模块协议请求判断服务。

## 参考资料

- [Go Modules：GOPROXY 协议](https://go.dev/ref/mod#goproxy-protocol)
