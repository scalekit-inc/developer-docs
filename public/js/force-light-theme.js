// Force light theme before first paint.
// Inlined into <head> via astro.config.mjs (blocking, no defer) so it runs
// before starlight-theme-nova / astro-theme-toggle ThemeScript in the body.
// If you change this file, copy the IIFE into astro.config.mjs head config.
;(function () {
  try {
    localStorage.setItem('theme-toggle', 'light')
  } catch (_) {
    /* private mode / blocked storage */
  }

  var root = document.documentElement
  root.classList.remove('dark')
  root.setAttribute('data-theme', 'light')
  root.style.colorScheme = 'light'
})()
