import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    chunkSizeWarningLimit: 1024 * 1024
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000, // 设置端口号为默认端口
    proxy: {
      // 代理配置示例
      '/api': {
        target: 'http://47.95.168.63', // 设置代理目标地址
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
