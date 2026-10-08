import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'assets/icons/apple-touch-icon.png'],
        manifest: {
          id: '/',
          name: 'LoveQuiz – Test de Compatibilité Amoureuse & Outils Couple',
          short_name: 'LoveQuiz',
          description: 'Testez votre complicité de couple avec notre quiz gratuit en 15 questions. Basé sur la psychologie positive relationnelle.',
          theme_color: '#FF6B8A',
          background_color: '#FFFBF7',
          display: 'standalone',
          orientation: 'portrait',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/favicon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any',
            },
            {
              src: '/favicon.svg',
              sizes: '192x192',
              type: 'image/svg+xml',
              purpose: 'any',
            },
            {
              src: '/favicon.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,woff,woff2}'],
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'es2022',
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          quiz: path.resolve(__dirname, 'quiz.html'),
          blog: path.resolve(__dirname, 'blog.html'),
          article: path.resolve(__dirname, 'article.html'),
          tools: path.resolve(__dirname, 'tools.html'),
          mentions: path.resolve(__dirname, 'mentions.html'),
          confidentialite: path.resolve(__dirname, 'confidentialite.html'),
          about: path.resolve(__dirname, 'about.html'),
          notFound: path.resolve(__dirname, '404.html'),
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: false,
    },
    logLevel: 'silent' as const,
  };
});
