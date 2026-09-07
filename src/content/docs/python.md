---
category: 开发工具
mark: Py
color: "#b18a26"
mirrors: [python, pypi]
title: Python 镜像
description: Python 相关镜像与包管理器配置说明。
featured:
  label: Python / pip
  order: 2
---

## 镜像入口

[通过本站访问 Python](/pypi/)，请求会以 HTTP 302 跳转至 CERNET，再由其选择高校镜像站。

也可直接使用 `https://mirrors.cernet.edu.cn/pypi/`。

## pip 配置

```bash
python -m pip config set global.index-url https://mirrors.cernet.edu.cn/pypi/simple
```

`pypi` 是包索引，`python` 是 Python 发行文件仓库，两者用途不同。

## 按版本配置

请参考 [CERNET Python 使用帮助](https://help.mirrors.cernet.edu.cn/pypi/) 选择适用的版本、架构与仓库子路径。修改软件源之前请备份原有配置，保留包签名校验。
