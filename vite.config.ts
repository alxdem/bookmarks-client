import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
    plugins: [svgr(), react()],
    resolve: {
        alias: {
            '@': '/src',
            '@components': '/src/components',
            '@context': '/src/context',
            '@hooks': '/src/hooks',
            '@layouts': '/src/layouts',
            '@middlewares': '/src/middlewares',
            '@t': '/src/types',
            '@utils': '/src/utils',
            '@assets': '/src/assets',
        }
    }
})
