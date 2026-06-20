import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        gallery1: resolve(__dirname, 'gallery-1.html'),
      },
    },
  },
  define: {
    'process.env': process.env,
  },
  server: {
    proxy: {
      '/oauth/token': {
        target: `https://${process.env.VITE_AUTH0_DOMAIN}`,
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/oauth\/token/, '/oauth/token')
      },
      '/graphql': {
        target: process.env.VITE_APPSYNC_API_URL,
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/graphql/, '/graphql')
      }
    }
  }
});