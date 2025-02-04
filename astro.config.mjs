// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { starlightConfig } from './src/starlight.config.js';

// https://astro.build/config
export default defineConfig({
  integrations: [starlight(starlightConfig), react()],

  vite: {
    plugins: [tailwindcss()],
  },
});
