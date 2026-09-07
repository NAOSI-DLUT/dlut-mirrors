---
title: Python 镜像
description: Python 相关镜像与包管理器配置说明。
featured:
  label: Python / pip
  order: 2
---

上游地址：rsync://mirrors.python.org/pypi/

## pip 配置

```ini
[global]
index-url = http://mirrors.dlut.edu.cn/pypi/simple
```

## 临时使用

```bash
pip install -i http://mirrors.dlut.edu.cn/pypi/simple package_name
```

## 适用场景

- Python 虚拟环境
- 科研与教学环境
- 自动化脚本与依赖安装
