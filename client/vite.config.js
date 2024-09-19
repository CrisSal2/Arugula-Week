import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === 'serve') {
    // Development config
    return {
      server: {
        proxy: {
          '/graphql': {
            target: 'http://localhost:4000',
            secure: false,
            changeOrigin: true,
          },
        },
      },
      plugins: [react()],
    };
  } else {
    // Production config
    return {
      plugins: [react()],
    };
  }
});









/* import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/graphql': {
        target:'http://localhost:4000',
      secure: false,
      changeOrigin: true,
      },
    },
  },
  plugins: [react()],
})
 */