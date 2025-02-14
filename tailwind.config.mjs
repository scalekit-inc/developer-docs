import starlightPlugin from '@astrojs/starlight-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Neutral colors
        background: {
          DEFAULT: 'hsl(0 0% 100%)',
          subtle: 'hsl(0 0% 98%)',
        },
        foreground: {
          DEFAULT: 'hsl(0 0% 9%)',
          subtle: 'hsl(0 0% 40%)',
        },
        // Border and separator colors
        border: {
          DEFAULT: 'hsl(0 0% 89%)',
          subtle: 'hsl(0 0% 94%)',
        },
        // Primary brand colors
        primary: {
          DEFAULT: 'hsl(222 47% 31%)',
          foreground: 'hsl(0 0% 100%)',
          subtle: 'hsl(222 47% 95%)',
          hover: 'hsl(222 47% 26%)',
          active: 'hsl(222 47% 22%)',
        },
        // Success colors
        success: {
          DEFAULT: 'hsl(143 72% 29%)',
          foreground: 'hsl(0 0% 100%)',
          subtle: 'hsl(143 72% 95%)',
          hover: 'hsl(143 72% 24%)',
          active: 'hsl(143 72% 20%)',
        },
        // Warning colors
        warning: {
          DEFAULT: 'hsl(38 92% 50%)',
          foreground: 'hsl(0 0% 100%)',
          subtle: 'hsl(38 92% 95%)',
          hover: 'hsl(38 92% 45%)',
          active: 'hsl(38 92% 40%)',
        },
        // Error colors
        error: {
          DEFAULT: 'hsl(0 84% 60%)',
          foreground: 'hsl(0 0% 100%)',
          subtle: 'hsl(0 84% 95%)',
          hover: 'hsl(0 84% 55%)',
          active: 'hsl(0 84% 50%)',
        },
      },
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
