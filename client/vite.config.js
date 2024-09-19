import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig(({ command }) => {
  if (command === 'serve') {
    
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