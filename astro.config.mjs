import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  adapter: cloudflare({ imageService: 'compile' }),
  session: false,
  trailingSlash: 'ignore',
  redirects: { '/about/': '/blog/hello/', '/blog/welcome/': '/blog/hello/' },
});
