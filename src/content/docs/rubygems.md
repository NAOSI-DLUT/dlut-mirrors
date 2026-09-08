---
icon: rubygems
title: 'RubyGems / Bundler 镜像'
description: '分别配置 gem 与 Bundler，保留 Gemfile 中的官方源声明。'
category: '开发工具'
mark: 'Rb'
color: '#587f6d'
---

## gem 配置

先运行 `gem sources --list` 记录原配置，备份 `~/.gemrc`。使用 [rubygems](/rubygems/)：

```bash
gem sources --add https://mirrors.cernet.edu.cn/rubygems/ --remove https://rubygems.org/
gem sources --list
```

私有 gem 源应保留；删除操作只针对示例中的官方公开源。

## Bundler 镜像配置

Bundler 的设置独立于 `gem sources`。保持 Gemfile 的 `source "https://rubygems.org"`，用本地镜像映射替换下载位置：

```bash
bundle config set --global mirror.https://rubygems.org https://mirrors.cernet.edu.cn/rubygems/
bundle config list
```

仅对当前项目生效时使用 `--local` 代替 `--global`。在项目目录执行 `bundle install` 验证；无需为换源删除 `Gemfile.lock`。

## 恢复

```bash
gem sources --add https://rubygems.org/ --remove https://mirrors.cernet.edu.cn/rubygems/
bundle config unset --global mirror.https://rubygems.org
```

若使用项目级设置，相应改为 `--local`。编译原生扩展失败可能是缺少编译器或开发库，与 gem 镜像无关。

## 参考资料

- [TUNA rubygems 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/rubygems/)
