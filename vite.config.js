import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Change to '/' if using a custom domain
  base: '/stillwater-bakery/',

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        menu: resolve(__dirname, 'menu.html'),
        about: resolve(__dirname, 'about.html'),
        order: resolve(__dirname, 'order.html'),
        events: resolve(__dirname, 'events.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
