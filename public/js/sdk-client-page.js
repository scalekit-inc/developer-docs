/**
 * SDK client reference pages: the top ClassBrowser is chrome-only (or first
 * method browser). Wire its expand/collapse + copy-json tools to all methods
 * on the page. Does not inject extra toolbar chrome.
 */
function getPageMethods(page) {
  return Array.from(
    page.querySelectorAll(
      '.sdk-method-section .cb-method, .sdk-method-browser .cb-method, .cb-method',
    ),
  )
}

function getChromeBrowser(page) {
  return (
    page.querySelector('.sdk-client-chrome .cb-browser') ||
    page.querySelector('.sdk-method-section .cb-browser') ||
    page.querySelector('.cb-browser')
  )
}

function methodName(el) {
  return (
    el.querySelector('summary .cb-hl')?.textContent?.trim() ||
    el.querySelector('summary')?.textContent?.trim() ||
    ''
  )
}

function initSdkClientPageChrome() {
  document.querySelectorAll('.sdk-client-page').forEach((page) => {
    const chrome = getChromeBrowser(page)
    if (!chrome || chrome.dataset.sdkChromeBound === '1') return
    chrome.dataset.sdkChromeBound = '1'

    const methods = () => getPageMethods(page)

    const toggle = chrome.querySelector('.cb-toggle-all')
    if (toggle) {
      // Replace default handler (which only searches inside one browser)
      const clone = toggle.cloneNode(true)
      toggle.replaceWith(clone)
      clone.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        const list = methods()
        if (!list.length) return
        const anyOpen = list.some((m) => m.open)
        list.forEach((m) => {
          m.open = !anyOpen
        })
        clone.classList.toggle('cb-all-expanded', !anyOpen)
        clone.setAttribute('aria-pressed', !anyOpen ? 'true' : 'false')
      })
    }

    const copyBtn = chrome.querySelector('.cb-copy-json')
    if (copyBtn) {
      const clone = copyBtn.cloneNode(true)
      copyBtn.replaceWith(clone)
      clone.addEventListener('click', async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const list = methods()
        const data = {
          name: chrome.querySelector('.cb-header-name')?.textContent?.trim(),
          language: chrome.dataset.language || undefined,
          source:
            chrome.querySelector('.cb-header .cb-source')?.textContent?.trim() ||
            undefined,
          type: chrome.querySelector('.cb-header .cb-badge')?.textContent?.trim(),
          methods: list.map((el) => methodName(el)).filter(Boolean),
        }
        try {
          await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
          clone.classList.add('cb-copied')
          clone.setAttribute('aria-label', 'Copied')
          setTimeout(() => {
            clone.classList.remove('cb-copied')
            clone.setAttribute('aria-label', 'Copy class data as JSON')
          }, 1500)
        } catch {
          /* ignore — package control has no error surface */
        }
      })
    }

    // TOC: truncated method names get a title tooltip
    document
      .querySelectorAll('starlight-toc a, .right-sidebar-panel nav a')
      .forEach((a) => {
        if (!a.title) {
          const t = a.textContent?.trim()
          if (t) a.title = t
        }
      })
  })
}

function boot() {
  // Drop temporary A/B/C review chrome if a prior session left it in the DOM
  document.querySelector('.sdk-method-title-picker')?.remove()
  if (document.body.dataset.methodTitle) delete document.body.dataset.methodTitle
  initSdkClientPageChrome()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot)
} else {
  boot()
}

document.addEventListener('astro:after-swap', () => {
  document.querySelectorAll('.cb-browser').forEach((b) => {
    delete b.dataset.sdkChromeBound
  })
  boot()
})
document.addEventListener('astro:page-load', boot)
// ClassBrowser inits on load; re-bind after it attaches its handlers
requestAnimationFrame(() => {
  requestAnimationFrame(boot)
})
