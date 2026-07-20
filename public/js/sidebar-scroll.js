/**
 * Sidebar helpers:
 * 1) Scroll the active item into view
 * 2) On AgentKit SDK pages, keep language groups expanded
 *    (Starlight sessionStorage can re-collapse after we set collapsed: false)
 */
function scrollActiveSidebarItem() {
  const activeSidebarLink = document.querySelector(
    '#starlight__sidebar [aria-current="page"], .sidebar [aria-current="page"]',
  )
  if (!activeSidebarLink) return
  activeSidebarLink.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest',
  })
}

/** AgentKit SDK topic: Node.js + Python language groups stay open by default. */
function expandAgentkitSdkLanguageGroups() {
  if (!location.pathname.startsWith('/agentkit/sdks')) return

  const labels = new Set(['Node.js SDK', 'Python SDK'])
  document
    .querySelectorAll('#starlight__sidebar details, .sidebar-pane details, nav details')
    .forEach((details) => {
      const label = details
        .querySelector(':scope > summary .group-label .large, :scope > summary .large')
        ?.textContent?.trim()
      if (label && labels.has(label)) {
        details.open = true
      }
    })
}

function runSidebarHelpers() {
  expandAgentkitSdkLanguageGroups()
  // After Starlight restore + layout
  setTimeout(() => {
    expandAgentkitSdkLanguageGroups()
    scrollActiveSidebarItem()
  }, 100)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runSidebarHelpers)
} else {
  runSidebarHelpers()
}

document.addEventListener('astro:page-load', runSidebarHelpers)
document.addEventListener('astro:after-swap', runSidebarHelpers)
