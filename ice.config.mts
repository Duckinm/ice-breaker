import { defineConfig } from '@ice/app';
import jsxPlus from '@ice/plugin-jsx-plus';
import store from '@ice/plugin-store';

import './src/env';

// The project config, see https://v3.ice.work/docs/guide/basic/config
const minify = process.env.NODE_ENV === 'production' ? 'swc' : false;
export default defineConfig(() => ({
  minify,
  ssr: true,
  ssg: false,
  server: {
    onDemand: true,
    format: 'esm',
  },
  mock: {
    exclude: ['custom/**', 'api.ts'],
  },
  postcss: {
    plugins: ['@tailwindcss/postcss'],
  },
  plugins: [
    store(),
    jsxPlus(),
  ],
}));
