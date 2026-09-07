---
title: CentOS 镜像
description: CentOS 镜像源配置与使用说明。
---

上游地址：rsync://mirror.centos.org/centos/

## 快速配置

```bash
sudo sed -i 's/mirrorlist.centos.org/mirrors.dlut.edu.cn/g' /etc/yum.repos.d/CentOS-Base.repo
sudo sed -i 's/^#baseurl=/baseurl=/g' /etc/yum.repos.d/CentOS-Base.repo
sudo sed -i 's/^baseurl=http:\/\/mirror.centos.org/baseurl=http:\/\/mirrors.dlut.edu.cn/g' /etc/yum.repos.d/CentOS-Base.repo
sudo yum clean all
sudo yum makecache
```

## 适用场景

- CentOS 7 / 8 兼容环境
- RHEL 兼容发行版
- 服务器基础环境

## 说明

如果您使用的是 DNF，也可以在替换仓库地址后执行 `dnf makecache` 更新缓存。
