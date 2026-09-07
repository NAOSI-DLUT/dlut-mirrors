# NAOSI Mirrors

Astro 7 静态页面 + 原生 API 路由，使用 Cloudflare 适配器部署到 Workers。镜像目录来自 CERNET 校园网联合镜像站，文件请求经 HTTP 302 交由 CERNET 调度。本站不存储镜像文件、不代理下载流量。

## 开发与部署

需要 Node.js 22.12+、pnpm 10。

```sh
pnpm install
pnpm dev
pnpm check
pnpm test
pnpm build
```

`pnpm dev` 通过 Cloudflare 适配器在本地运行页面与 API。`pnpm build && pnpm preview` 可验证构建后的 Workers 运行时。

生产部署使用 **Cloudflare Workers**，静态资源与 API 在同一个项目中：

- 使用 `@astrojs/cloudflare` 适配器，Wrangler 配置见 `wrangler.jsonc`。
- Workers Git 集成：构建命令 `pnpm build`，部署命令 `pnpm exec wrangler deploy`。
- 或在完成 Cloudflare 登录后执行 `pnpm deploy`（包含构建）。
- 首次迁移需要创建 Workers 项目并绑定站点域名；现有 Pages 项目不会自动转换。
- 不需要自定义 Worker 入口、KV、D1 或环境密钥。Astro 适配器生成服务端产物。
- 首页、文档和博客预渲染；两个 API 入口通过 `prerender = false` 在请求时运行。

## 数据与重定向

- `GET /mirrors.json`：同源 JSON 接口，固定读取 `https://mirrors.cernet.edu.cn/static/json/legacy/cernet.json`，不接受任意上游 URL。
- 返回 `mirrors: [{ name, path }]`、`fetchedAt`、`sourceUpdatedAt`、`stale`。抓取时间与上游文件时间均不是仓库同步时间。
- 缓存有效期 5 分钟；上游失败时最多使用 24 小时内的旧数据，并设置 `stale: true`。冷启动无缓存或缓存过期时返回 503 和 `Retry-After`，页面保留当前表格并允许重试。
- Workers 使用标准 Cache API，各数据中心独立缓存，缓存可能被提前驱逐；Node 开发模式使用进程内缓存。不依赖持久化存储。
- `/<仓库>/<文件路径>?query`：仅允许目录中已有仓库及其子路径，GET/HEAD 返回 302 到 CERNET，保留文件路径、查询参数及路径大小写；未知仓库返回 404，其他方法不执行下载跳转。
- 不接受任意跳转目标；保留 `/docs/`、`/blog/` 等本站路径。路径取自上游清单，不按显示名猜测。例如 Node.js 是 `/nodejs-release/`，npm 是 `/npm/`。
- 清单不提供仓库大小、实际同步时间或可靠可用状态，因此首页不展示这些字段。目录中存在不代表文件始终可下载。
- 图片、源码和包管理器资源不会被本站抓取；302 后由访问者直接请求 CERNET，使其能够按访问者网络进行调度。

## 项目结构

- `src/content/docs/*.md` → `docs` 集合 → `/docs/<slug>/`
- `src/content/blog/*.md` → `blog` 集合 → `/blog/<slug>/`
- `src/pages/`：静态页面及 Astro API 路由；首页在浏览器中加载同源目录。
- `src/lib/mirrors.ts`：目录校验、路径匹配与展示信息回退。
- `src/lib/server/cernet.ts`：固定上游请求、缓存与失败回退。
- `src/lib/server/http.ts`：平台无关的 Request/Response 处理逻辑。
- `src/pages/mirrors.json.ts`：目录 API。
- `src/pages/[...mirror].ts`：镜像文件 302 API。
- `src/styles/global.css`：原生响应式 CSS，沿用 NAOSI 主站配色。

没有 JavaScript 时，文档和博客正常可读，首页提供 CERNET 入口。目录支持名称搜索、分类筛选、`/` 快捷键聚焦及手动刷新。

首页动态按 `blog` 文章日期倒序取最新 3 篇，读取 `title`、`date` 和可选的 `description`、`category`。快捷指南读取 `docs` 文档的 `featured`，按 `order` 升序取前 3 项：

```yaml
featured:
  label: Python / pip
  order: 2
```

镜像帮助链接通过 `getCollection('docs')` 自动生成：默认以文档 ID 匹配 CERNET 仓库路径；名称不同或一篇文档对应多个仓库时，在 frontmatter 设置 `mirrors: [nodejs-release, npm]`。分类、图标和颜色通过 `category`、`mark`、`color` 设置，未填写时使用默认值。分类筛选同样从内容生成；同一仓库匹配多篇文档时构建报错，避免随机选择。删除文档后，对应指南链接也会在重新构建时移除。

修改内容后需重新构建发布。运营说明位于 `/blog/hello/`，旧 `/about/`、`/blog/welcome/` 重定向到该文章。

## 技术与参考

已依据 [Astro v7 迁移指南](https://docs.astro.build/en/guides/upgrade-to/v7/) 升级到 Astro 7，移除 Starlight，使用原生内容集合、Sätteri Markdown 渲染与 Rust 编译器。TypeScript 使用兼容 `astro check` 的 6.x。

Cloudflare 适配器已移除 Pages 部署支持，因此使用 Workers 承载 Astro 原生 API。业务逻辑使用标准 Web Request/Response API。

- [CERNET 清单](https://mirrors.cernet.edu.cn/static/json/legacy/cernet.json)
- [MirrorZ 数据格式](https://github.com/mirrorz-org/mirrorz)
- [CERNET 302 调度](https://github.com/mirrorz-org/mirrorz-302)

NAOSI 是正式注册的学生社团，本站由社团自主运营，非学校官方运营。
