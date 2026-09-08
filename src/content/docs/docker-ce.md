---
icon: docker
title: 'Docker CE 镜像'
description: '在 Ubuntu/Debian 上配置 Docker Engine 的 APT 软件仓库。'
category: '开发工具'
mark: 'Do'
color: '#587f6d'
---

## 仓库范围

[docker-ce](/docker-ce/) 提供 Docker Engine、CLI、containerd 和 Compose 插件的软件包。它不是 Docker Hub 加速器，不能填入 Docker 的 `registry-mirrors`。

下面适用于 Docker 官方仍支持的 Ubuntu 或 Debian。发行版衍生系统需要按 Docker 官方要求确定基础发行版代号。

## 准备密钥

已安装 Docker 时先记录版本、已有软件源和数据目录，按官方说明处理冲突包，不要直接删除容器数据。

```bash
sudo apt update
sudo apt install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
```

Ubuntu 使用官方 Ubuntu 密钥：

```bash
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

Debian 将上面 URL 中的 `/ubuntu/` 换成 `/debian/`。密钥从 Docker 官方取得；不要关闭 APT 签名检查。

## 添加软件源

以下完整示例针对 **Ubuntu 24.04 noble、amd64**。先备份已有 Docker 源，再将内容写入 `/etc/apt/sources.list.d/docker.sources`，避免同时保留重复的 `docker.list`：

```text
Types: deb
URIs: https://mirrors.cernet.edu.cn/docker-ce/linux/ubuntu
Suites: noble
Architectures: amd64
Components: stable
Signed-By: /etc/apt/keyrings/docker.asc
```

Debian 12 使用 `/linux/debian` 和 `bookworm`；Debian 13 使用 `trixie`。架构按 `dpkg --print-architecture` 输出修改，并确认 Docker 支持该组合。

## 安装与验证

```bash
sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
docker --version
docker compose version
```

`docker run hello-world` 还会访问容器 registry，失败不能直接判定本软件源有问题。

## 恢复官方源

将 URI 改为 `https://download.docker.com/linux/ubuntu` 或 Debian 对应路径，保留其余字段，再执行 `sudo apt update`。回退软件版本与回退源地址是不同操作。

## 参考资料

- [TUNA docker-ce 使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/docker-ce/)
- [Docker Ubuntu 安装说明](https://docs.docker.com/engine/install/ubuntu/)
- [Docker Debian 安装说明](https://docs.docker.com/engine/install/debian/)
