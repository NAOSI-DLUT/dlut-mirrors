// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "大连理工大学开源镜像站",
      social: [
        { icon: "open-book", label: "文档", href: "/docs/" },
        { icon: "document", label: "博客", href: "/blog/" },
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/NAOSI-DLUT/dlut-mirrors",
        },
      ],
      sidebar: [
        {
          label: "帮助文档",
          autogenerate: { directory: "docs" },
        },
        {
          label: "博客",
          autogenerate: { directory: "blog" },
        },
      ],
    }),
  ],
});
