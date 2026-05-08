import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({ runtime: 'nodejs20.x' }),
    alias: {
      $components: './src/lib/components',
      $stores: './src/lib/stores',
      $types: './src/lib/types',
      $constants: './src/lib/constants'
    }
  }
}

export default config
