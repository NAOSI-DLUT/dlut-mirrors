---
icon: python
title: 'Python / pip 镜像'
description: 'pip、uv 与 Poetry 的 PyPI 配置、优先级和恢复方式。'
category: '开发工具'
mark: 'Py'
color: '#b18a26'
mirrors: ['python', 'pypi']
featured: { 'label': 'Python / pip', 'order': 2 }
---

## 选择正确入口

[pypi](/pypi/) 提供 Python 软件包索引；[python](/python/) 提供解释器发行文件。安装包索引地址必须以 `/simple/` 结尾，不能将解释器目录当作 pip 源。

以下命令在已激活的虚拟环境中执行；Windows 可将 `python` 换成实际可用的 `py`。

## pip 临时与持久配置

临时安装一个包：

```bash
python -m pip install --index-url https://mirrors.cernet.edu.cn/pypi/simple/ requests
```

设置当前用户的默认索引：

```bash
python -m pip config --user set global.index-url https://mirrors.cernet.edu.cn/pypi/simple/
python -m pip config debug
python -m pip index versions requests
```

环境变量 `PIP_INDEX_URL`、虚拟环境和项目配置可能覆盖用户设置。`pip config debug` 用于确认生效文件，不要把含有私有仓库凭据的输出公开。

不要为了 HTTPS 镜像增加 `trusted-host`。`extra-index-url` 不是可靠的主备机制，混用公开源与私有源还可能引入同名包冲突。

## uv

在项目的 `pyproject.toml` 中加入（已有同类配置时合并）：

```toml
[[tool.uv.index]]
name = "cernet"
url = "https://mirrors.cernet.edu.cn/pypi/simple/"
default = true
```

随后在项目中执行 `uv sync`。如需用户级配置，使用 uv 的 `uv.toml` 并将节名写成 `[[index]]`，不要混淆两种文件格式。

## Poetry

在项目目录执行：

```bash
poetry source add --priority=primary cernet https://mirrors.cernet.edu.cn/pypi/simple/
poetry source show
poetry install
```

这是项目级设置。已有 primary 索引时先检查优先级；新增 primary 会改变默认 PyPI 的使用方式。已锁定包不必仅因换源而批量升级。

## 恢复与排错

```bash
python -m pip config --user unset global.index-url
```

如果该键不存在，说明应检查其他配置层。uv 删除新增索引节；Poetry 执行 `poetry source remove cernet`。私有索引请恢复原配置而不是统一改为公开 PyPI。

新发布包可能尚未同步；平台或 Python 版本不匹配也会导致 `No matching distribution`。先核对包支持范围，再尝试官方 `https://pypi.org/simple/`。

## 参考资料

- [TUNA pypi 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/pypi/)
- [uv 索引配置](https://docs.astral.sh/uv/concepts/indexes/)
- [Poetry 仓库配置](https://python-poetry.org/docs/repositories/)
