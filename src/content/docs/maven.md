---
icon: apachemaven
title: 'Maven 镜像'
description: '仅替换 Maven Central，保留项目私有仓库与发布设置。'
category: '开发工具'
mark: 'Mv'
color: '#587f6d'
---

## 适用范围

[maven](/maven/) 为 Maven 仓库入口。配置镜像用于依赖解析，不会修改项目 `distributionManagement` 的发布目标。

## settings.xml

备份 `~/.m2/settings.xml`，Windows 通常为 `%USERPROFILE%\.m2\settings.xml`。在已有 `<settings>` 中合并下面 `<mirrors>`；已有镜像配置时不要重复创建同名节点。

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  <mirrors>
    <mirror>
      <id>cernet-central</id>
      <name>CERNET Maven Central</name>
      <url>https://mirrors.cernet.edu.cn/maven/</url>
      <mirrorOf>central</mirrorOf>
    </mirror>
  </mirrors>
</settings>
```

`mirrorOf` 限定 `central`，不使用 `*` 把公司仓库、插件专用仓库或 snapshots 一并重定向。保留原 `<servers>` 等配置，认证信息不应发送给公共镜像。

## 验证

在 Maven 项目内执行：

```bash
mvn help:effective-settings
mvn dependency:resolve
```

检查日志中的 `cernet-central` 和实际下载地址。本地 `.m2/repository` 已有缓存时不会重新下载，这是正常行为，不需要删除全部缓存。

## 恢复与范围限制

移除新增 `<mirror>` 或恢复备份。Gradle 不读取 Maven 的 settings.xml，需要在 Gradle 项目中单独配置仓库；Gradle Wrapper 发行包也与 Maven Central 不同。

找不到制品时先确认坐标、版本是否发布到 Central。私有制品与未同步的新版本不能靠反复清空缓存解决。

## 参考资料

- [SJTUG Maven Central 使用帮助](https://mirrors.sjtug.sjtu.edu.cn/docs/maven-central)
- [Maven 镜像配置](https://maven.apache.org/guides/mini/guide-mirror-settings.html)
