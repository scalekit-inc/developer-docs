/**
 * SDK client reference pages: the top ClassBrowser is chrome-only (no methods).
 * Wire its expand/collapse + copy-json tools to all methods on the page.
 */
function initSdkClientPageChrome() {
  document.querySelectorAll('.sdk-client-page').forEach((page) => {
    const chrome = page.querySelector('.sdk-client-chrome .cb-browser')
    if (!chrome || chrome.dataset.sdkChromeBound === '1') return
    chrome.dataset.sdkChromeBound = '1'

    const toggle = chrome.querySelector('.cb-toggle-all')
    if (toggle) {
      // Replace default handler (which only searches inside chrome browser)
      const clone = toggle.cloneNode(true)
      toggle.replaceWith(clone)
      clone.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        const methods = page.querySelectorAll(
          '.sdk-method-browser .cb-method, .sdk-client-page .cb-method',
        )
        if (!methods.length) return
        const anyOpen = Array.from(methods).some((m) => m.open)
        methods.forEach((m) => {
          m.open = !anyOpen
        })
        clone.classList.toggle('cb-all-expanded', !anyOpen)
      })
    }

    const copyBtn = chrome.querySelector('.cb-copy-json')
    if (copyBtn) {
      const clone = copyBtn.cloneNode(true)
      copyBtn.replaceWith(clone)
      clone.addEventListener('click', async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const methods = page.querySelectorAll('.sdk-method-browser .cb-method')
        const data = {
          name: chrome.querySelector('.cb-header-name')?.textContent?.trim(),
          language: chrome.dataset.language || undefined,
          source: chrome.querySelector('.cb-header .cb-source')?.textContent?.trim() || undefined,
          type: chrome.querySelector('.cb-header .cb-badge')?.textContent?.trim() || undefined,
          methods: Array.from(methods).map((el) => ({
            name: el.querySelector('summary .cb-hl')?.textContent?.trim(),
          })),
        }
        try {
          await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
          clone.classList.add('cb-copied')
          setTimeout(() => clone.classList.remove('cb-copied'), 1500)
        } catch {
          /* ignore */
        }
      })
    }
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSdkClientPageChrome)
} else {
  initSdkClientPageChrome()
}
document.addEventListener('astro:after-swap', initSdkClientPageChrome)
// ClassBrowser inits on load; re-bind after it attaches its handlers
document.addEventListener('astro:page-load', initSdkClientPageChrome)
setTimeout(initSdkClientPageChrome, 0)
setTimeout(initSdkClientPageChrome, 100)
