# NAOSI Mirrors

基于 Astro 7 的手写镜像站前端，使用原生 Astro 页面、内容集合和 CSS，无 Starlight 或客户端 UI 框架。

## 开发

需要 Node.js 22.12+、pnpm 10。

```sh
pnpm install
pnpm dev
pnpm check
pnpm test
pnpm build
pnpm preview
```

开发服务器地址以终端输出为准。生产构建输出到 `dist/`，可部署到静态服务器；服务器需要支持目录 `index.html` 和自定义 `404.html`。

## 内容维护

- `src/pages/`：首页、帮助列表/详情、动态列表/详情、关于和 404 页面。
- `src/layouts/Layout.astro`：导航、页面元数据和页脚。
- `src/styles/global.css`：响应式样式，参考本地 `../naosi.org/uno.config.ts` 的绿色、纸白背景和细边框。
- `src/content/help/*.md`：使用帮助，保留 `/docs/<slug>/` URL。
- `src/content/posts/*.md`：动态文章，文件名决定 URL；原 `/blog/` 内容移入 `/blog/hello/`，`/blog/` 为动态列表。
- `public/mirrors.json`：镜像数据。构建时输出静态表格，浏览器加载时和手动刷新时重新请求该文件。请求失败保留上一次表格。
- `src/lib/mirrors.ts`：数据校验、日期格式化以及镜像分类/帮助路径映射；新增镜像时同步维护 `catalog`。未映射的镜像仍会显示，但没有帮助链接。

搜索支持名称和描述，与分类、同步状态组合筛选；按 `/` 聚焦搜索。没有 JavaScript 时仍显示构建时镜像列表和全部文档。同步日期固定使用北京时间，并处理空值、无效值和 Go 零值日期。

## Astro v7 迁移

依据 https://docs.astro.build/en/guides/upgrade-to/v7/ ：

- Astro 从 6.2.2 升至 7.3.1，更新 pnpm 锁文件，移除 Starlight 及不再使用的直接 sharp 依赖。
- 使用 `glob()`、独立 Zod schema、`getCollection()` / `render()` 替代 Starlight loader/schema 和隐式路由。
- 纯文本 MDX 文档转为 Markdown，由 v7 默认 Sätteri 处理，不再需要 MDX 集成或 remark/rehype 兼容层。
- 使用默认 Rust 编译器和 JSX 空白规则，通过构建和浏览器检查验证模板、代码块与行内链接。
- 本项目没有自定义 Vite 插件、`src/fetch.ts`、实验开关、Astro DB 或被移除的 transitions API，无对应迁移项。
- `astro check` 暂不支持 TypeScript 7 的原生编译器 API，开发依赖使用兼容的 TypeScript 6。

## 设计参考与数据性质

首页结合清华 TUNA、上海交大 SJTUG 的镜像列表/帮助/动态信息结构，以及 NAOSI 主站的配色、字体和卡片样式。也检查了 USTC 的公开入口，其完整主页依赖客户端渲染。

本站以 NAOSI Mirrors 品牌运营，由正式注册的 NAOSI 网络与开源协会负责维护，非学校官方运营；社团注册身份不代表镜像服务由学校运营或背书。运营说明位于 `/blog/hello/`。

当前仓库中的 `public/mirrors.json` 仍为原项目数据，最近记录为 2026 年 5 月；此次品牌与运营文案调整没有接入同步后端。正式服务应提供真实同步记录，并由维护者核验文档中的镜像域名、发行版版本和配置命令。页面明确提醒用户留意更新时间。

## 首页内容生成

首页「镜像站动态」读取 `posts` 内容集合，按日期倒序显示最新 3 篇；标题、日期、分类和摘要来自文章 frontmatter 的 `title`、`date`、可选 `category`、可选 `description`。

快捷指南读取 `help` 内容集合，只展示配置了 `featured` 的文档，按 `featured.order` 升序取前 3 项，显示文字使用 `featured.label`，链接由文档 ID 生成。例如：

```yaml
featured:
  label: Python / pip
  order: 2
```

这些内容在 Astro 构建时生成。开发模式修改 Markdown 后会更新；静态站部署后需要重新构建发布。
