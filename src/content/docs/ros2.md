---
icon: ros
title: 'ROS 2 镜像'
description: '为 Ubuntu 上已有的 ROS 2 APT 仓库替换地址，保留官方密钥。'
category: '科学计算'
mark: 'ROS'
color: '#587f6d'
---

## 版本组合

[ros2](/ros2/) 是 ROS 2 的软件包仓库。常见组合为 Ubuntu 24.04 Noble + ROS 2 Jazzy、Ubuntu 22.04 Jammy + ROS 2 Humble；是否仍受支持以 ROS 官方发行表为准。

不要把 ROS 1 的 `/ros/ubuntu/`、Debian 代号和 ROS 2 Ubuntu 仓库混用。rosdep 规则由 rosdistro 管理，不是此 APT 源的一部分。

## 先建立官方源

首次安装请先按照 ROS 官方针对所选发行版的说明安装官方源配置与 keyring。新版可能通过 `ros2-apt-source` 包维护它们，不再需要使用 `apt-key`。

备份当前 ROS 2 的 `.list` 或 `.sources` 文件，记录其由哪个软件包管理。这里只更改已有仓库地址，不重新导入其他来源的密钥。

## 替换 URI

对于传统格式，将原 `http://packages.ros.org/ros2/ubuntu` 或 HTTPS 形式替换为：

```text
https://mirrors.cernet.edu.cn/ros2/ubuntu
```

保留同一行的架构、`signed-by`、发行版代号与 `main`。对于 DEB822 格式，仅修改原 ROS 2 节的 `URIs` 字段；保留 `Signed-By`，包括可能嵌入的公钥内容。

## 验证

```bash
sudo apt update
apt-cache policy ros-jazzy-ros-base
```

Humble 用户把查询包名改为 `ros-humble-ros-base`。有候选版本后再按照官方教程选择安装内容；换源不要求重新安装整个 ROS 环境。

## 恢复与维护

恢复备份或改回官方 URI，然后刷新索引。如果 `ros2-apt-source` 更新后覆盖了手工改动，重新检查其管理的文件，不建立第二份重复源。新包尚未同步时可以暂用官方仓库。

## 参考资料

- [TUNA ros2 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/ros2/)
- [ROS 2 Jazzy Ubuntu 安装](https://docs.ros.org/en/jazzy/Installation/Ubuntu-Install-Debians.html)
