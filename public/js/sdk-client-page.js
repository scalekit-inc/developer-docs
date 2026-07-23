/**
 * SDK client reference pages.
 *
 * Layout: one ClassBrowser per method; CSS hides headers after the first.
 * The package toggle only sees methods inside its own browser, so we rebind
 * the first header's expand/collapse (+ copy JSON) to every method on the page.
 *
 * Important: the package also attaches click handlers on load / after-swap.
 * We always clone the controls on boot so those listeners cannot stack and
 * reverse our expand-all result (see toggle handler below).
 */
function getPageMethods(page) {
  return Array.from(page.querySelectorAll('.sdk-method-section .cb-method, .cb-method'))
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

function syncToggleUi(btn, methods) {
  const fullyOpen = methods.length > 0 && methods.every((m) => m.open)
  btn.classList.toggle('cb-all-expanded', fullyOpen)
  btn.setAttribute('aria-expanded', fullyOpen ? 'true' : 'false')
  btn.setAttribute('title', fullyOpen ? 'Collapse all methods' : 'Expand all methods')
  btn.setAttribute('aria-label', fullyOpen ? 'Collapse all methods' : 'Expand all methods')
}

function bindToggleAll(page, chrome) {
  const toggle = chrome.querySelector('.cb-toggle-all')
  if (!toggle) return

  // Clone strips package listeners that would only toggle the first browser.
  const btn = toggle.cloneNode(true)
  toggle.replaceWith(btn)

  const methods = () => getPageMethods(page)
  syncToggleUi(btn, methods())

  btn.addEventListener(
    'click',
    (e) => {
      // Capture + stopImmediate: package bubble handlers never run.
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()

      const list = methods()
      if (!list.length) return

      // Fully open → collapse all. Anything else → expand all.
      // (anyOpen was wrong when the package closed only the first method.)
      const fullyOpen = list.every((m) => m.open)
      const nextOpen = !fullyOpen
      list.forEach((m) => {
        m.open = nextOpen
      })
      syncToggleUi(btn, list)
    },
    true,
  )
}

function bindCopyJson(page, chrome) {
  const copyBtn = chrome.querySelector('.cb-copy-json')
  if (!copyBtn) return

  const btn = copyBtn.cloneNode(true)
  copyBtn.replaceWith(btn)

  btn.addEventListener(
    'click',
    async (e) => {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()

      const list = getPageMethods(page)
      const data = {
        name: chrome.querySelector('.cb-header-name')?.textContent?.trim(),
        language: chrome.dataset.language || undefined,
        source: chrome.querySelector('.cb-header .cb-source')?.textContent?.trim() || undefined,
        type: chrome.querySelector('.cb-header .cb-badge')?.textContent?.trim(),
        methods: list.map((el) => methodName(el)).filter(Boolean),
      }
      try {
        await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
        btn.classList.add('cb-copied')
        btn.setAttribute('aria-label', 'Copied')
        setTimeout(() => {
          btn.classList.remove('cb-copied')
          btn.setAttribute('aria-label', 'Copy class data as JSON')
        }, 1500)
      } catch {
        /* no error surface on package control */
      }
    },
    true,
  )
}

function initSdkClientPageChrome() {
  document.querySelectorAll('.sdk-client-page').forEach((page) => {
    const chrome = getChromeBrowser(page)
    if (!chrome) return

    // Always rebind — package re-inits on astro:after-swap and would stack handlers.
    bindToggleAll(page, chrome)
    bindCopyJson(page, chrome)

    document.querySelectorAll('starlight-toc a, .right-sidebar-panel nav a').forEach((a) => {
      if (!a.title) {
        const t = a.textContent?.trim()
        if (t) a.title = t
      }
    })
  })
}

function boot() {
  document.querySelector('.sdk-method-title-picker')?.remove()
  if (document.body.dataset.methodTitle) delete document.body.dataset.methodTitle
  initSdkClientPageChrome()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot)
} else {
  boot()
}

document.addEventListener('astro:after-swap', boot)
document.addEventListener('astro:page-load', boot)

// ClassBrowser attaches its own handlers on load; rebind after it runs.
requestAnimationFrame(() => {
  requestAnimationFrame(boot)
})
