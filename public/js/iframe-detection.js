function inIframe() {
  try {
    return window.self !== window.top
  } catch (e) {
    return true
  }
}

// Add iframe detection on page load
document.addEventListener('DOMContentLoaded', function () {
  // Only apply iframe styling if in an iframe
  if (inIframe()) {
    document.documentElement.setAttribute('data-theme', 'light')
    document.documentElement.classList.add('in-iframe')

    // Remove zoom functionality from images in iframe
    document.querySelectorAll('starlight-image-zoom-zoomable').forEach((el) => {
      const img = el.querySelector('img')
      const btn = el.querySelector('button')
      if (btn) btn.remove()
      if (img) {
        const newImg = img.cloneNode(true)
        el.parentNode.replaceChild(newImg, el)
      }
    })

    // Add MutationObserver to handle dynamically loaded images - ONLY IN IFRAME
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            // Element node
            const zoomables = node.querySelectorAll('starlight-image-zoom-zoomable')
            zoomables.forEach((el) => {
              const img = el.querySelector('img')
              const btn = el.querySelector('button')
              if (btn) btn.remove()
              if (img) {
                const newImg = img.cloneNode(true)
                el.parentNode.replaceChild(newImg, el)
              }
            })
          }
        })
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }
})
