import { defineConfig } from 'fumadocs-mdx/config';
import { remarkRegistryUrl } from './lib/remark-registry-url.mjs';

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkRegistryUrl],
  },
});
