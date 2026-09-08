---
icon: kubernetes
title: 'Kubernetes 镜像'
description: '使用按次版本划分的软件仓库，区分系统软件包和容器镜像。'
category: '开发工具'
mark: 'K8'
color: '#587f6d'
---

## 仓库与版本

[kubernetes](/kubernetes/) 提供 kubeadm、kubelet、kubectl 等系统软件包，不是 `registry.k8s.io` 容器镜像代理。

现代仓库按 Kubernetes 次版本划分。下面以 `v1.35` 说明目录结构；实际版本必须符合集群的版本偏差策略，不应仅因为示例较新就升级生产节点。

## 已有 APT 仓库

先按 Kubernetes 官方说明建立 `pkgs.k8s.io` 仓库和官方 keyring，再备份当前源文件。把仓库 URL 替换为 CERNET，保留原 `signed-by` 密钥路径。常见传统格式如下：

```text
deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://mirrors.cernet.edu.cn/kubernetes/core:/stable:/v1.35/deb/ /
```

这是平面 APT 仓库，最后的 `/` 不能换成 `main` 或 Ubuntu 代号。若现有密钥路径不同，沿用自己的真实路径。现代 `.sources` 配置同样只替换 URI。

## RPM 仓库

在已有 Kubernetes repo 中替换 `baseurl`：

```ini
baseurl=https://mirrors.cernet.edu.cn/kubernetes/core:/stable:/v1.35/rpm/
```

保留原来的官方 `gpgkey`、`gpgcheck=1`、`exclude` 和启用状态。不要把 v1.35 仓库地址与其他次版本的升级计划混用。

## 验证与恢复

APT 用户：

```bash
sudo apt update
apt-cache policy kubelet kubectl kubeadm
```

RPM 用户可执行 `sudo dnf makecache --refresh`。验证源不需要执行 `kubeadm upgrade`、解除软件包 hold 或重启节点。

恢复时把对应 URI 改回 `https://pkgs.k8s.io/core:/stable:/v1.35/deb/` 或 RPM 路径，沿用集群实际次版本。容器镜像拉取失败应单独检查 registry，而不是修改这里的软件源。

## 参考资料

- [TUNA kubernetes 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/kubernetes/)
- [Kubernetes 官方 kubeadm 安装](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)
