---
icon: kalilinux
title: 'Kali Linux 镜像'
description: '配置 Kali Rolling 软件仓库，避免与 Debian 或 Ubuntu 混源。'
category: 'Linux 发行版'
mark: 'Ka'
color: '#587f6d'
---

## 适用范围

[kali](/kali/) 用于 Kali Linux。虽然 Kali 基于 Debian，仍不能把 Debian、Ubuntu 或第三方发行版的源直接加入 Kali。

用 `cat /etc/os-release` 确认系统。下列示例针对标准 `kali-rolling`，不适用于需要固定快照的环境。

## 配置 APT

```bash
sudo cp -an /etc/apt/sources.list /etc/apt/sources.list.bak
```

编辑原文件，将已有 Kali 主仓库替换为下列一行，避免保留重复条目：

```text
deb https://mirrors.cernet.edu.cn/kali/ kali-rolling main contrib non-free non-free-firmware
```

仅在需要编译源码包时增加相同地址的 `deb-src` 行。保留系统原有 Kali keyring，不添加 `trusted=yes`。

## 更新与验证

```bash
sudo apt update
apt-cache policy
```

确认索引成功后，按 Kali 的滚动升级说明执行系统更新。换源本身不要求立刻安装或移除工具包。

## 恢复与排错

恢复备份后运行 `sudo apt update`。如果原配置也已不可用，可参考官方 `http://http.kali.org/kali` 调度入口。404 时检查是否混用了快照分支；签名错误优先检查系统时间及 Kali 官方 keyring 更新说明。

## 参考资料

- [TUNA kali 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/kali/)
- [Kali 官方软件源](https://www.kali.org/docs/general-use/kali-linux-sources-list-repositories/)
