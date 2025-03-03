import starlightPlugin from '@astrojs/starlight-tailwind';

// Generated color palettes
// const accent = {
//   200: '#bcc6f4',
//   600: '#5157da',
//   900: '#262b63',
//   950: '#1b2043',
// };
// const gray = {
//   100: '#f6f6f7',
//   200: '#ededf0',
//   300: '#c1c1c5',
//   400: '#8b8b91',
//   500: '#57575d',
//   700: '#38383d',
//   800: '#26262b',
//   900: '#18181a',
// };

// Generated color palettes
const accent = {
  50: '#F5F7FF', // Nearly white with hint of blue
  100: '#EDF0FF', // Very light blue for dark mode backgrounds
  200: '#DCE3FF', // Light blue with enough contrast for dark mode
  300: '#C2CDFF', // Mid-light blue
  400: '#A3B2FF', // Mid blue
  500: '#8096FF', // Medium blue with good contrast
  600: '#5A73F9', // Primary action color (good for buttons in both modes)
  700: '#3F54DD', // Darker blue (still visible in dark mode)
  800: '#2E3DB2', // Deep blue
  900: '#1F2B88', // Very deep blue (readable on white)
  950: '#141C5E', // Near-dark blue (excellent contrast on white)
  975: '#0E1445', // Very dark blue
  1000: '#080C2E', // Nearly black with hint of blue
};

const gray = {
  100: '#f6f6f6',
  200: '#edeeee',
  300: '#c1c2c2',
  400: '#8b8c8c',
  500: '#575858',
  700: '#383838',
  800: '#262727',
  900: '#181818',
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
