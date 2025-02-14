import starlightPlugin from '@astrojs/starlight-tailwind';

// Generated color palettes
const accent = {
  200: '#bcc6f4',
  600: '#5157da',
  900: '#262b63',
  950: '#1b2043',
};
const gray = {
  100: '#f6f6f7',
  200: '#ededf0',
  300: '#c1c1c5',
  400: '#8b8b91',
  500: '#57575d',
  700: '#38383d',
  800: '#26262b',
  900: '#18181a',
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: { accent, gray },
      borderRadius: {
        base: '5px',
      },
      boxShadow: {
        light: '-2px 4px 0px 0px #000',
        dark: '-2px 4px 0px 0px #000',
      },
      translate: {
        boxShadowX: '-2px',
        boxShadowY: '4px',
        reverseBoxShadowX: '2px',
        reverseBoxShadowY: '-4px',
      },
      fontWeight: {
        base: '500',
        heading: '700',
      },
    },
  },
  plugins: [starlightPlugin()],
};
