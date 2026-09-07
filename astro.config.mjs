import { defineConfig } from 'astro/config';

export default defineConfig({
  trailingSlash: 'always',
  redirects: { '/about/': '/blog/hello/', '/blog/welcome/': '/blog/hello/' },
});
