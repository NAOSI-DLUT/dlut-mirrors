---
icon: perl
title: 'Perl / CPAN 镜像'
description: '配置 CPAN Shell 镜像列表与新版客户端的优先 HTTPS 策略。'
category: '开发工具'
mark: 'Pl'
color: '#587f6d'
mirrors: ['CPAN']
---

## 确认配置位置

[CPAN](/CPAN/) 的大小写必须保留。用户配置通常位于 `~/.cpan/CPAN/MyConfig.pm`，首次运行 `cpan` 时可按提示生成；先备份已有配置。

## 配置 CPAN Shell

在终端输入 `cpan`，然后在 **CPAN 的交互提示符**中执行，勿当作普通 shell 命令：

```text
o conf urllist
o conf urllist unshift https://mirrors.cernet.edu.cn/CPAN/
o conf commit
quit
```

先查看原列表，已包含镜像时不重复添加。`unshift` 会把镜像放在首位，保留原地址作为后备。

## 新版 CPAN 的 pushy_https

CPAN 2.29 / Perl 5.36 及之后，如果客户端仍优先使用预设官方 HTTPS 地址，可在 CPAN Shell 中设置：

```text
o conf pushy_https 0
o conf commit
```

此选项调整镜像选择策略，不是关闭 TLS 证书验证。所配置的镜像仍使用 HTTPS。旧客户端没有该选项时无需添加。

## 验证与恢复

再次进入 CPAN，执行 `o conf urllist` 检查列表。查询或安装模块时检查下载 URL；编译型模块仍需要系统编译器和头文件。

回退时恢复 MyConfig.pm 备份，并重新打开 CPAN。用户自行设置的本地安装前缀不应因换源而删除；不建议为镜像测试直接覆盖系统 Perl 的模块。

## 参考资料

- [TUNA CPAN 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/CPAN/)
