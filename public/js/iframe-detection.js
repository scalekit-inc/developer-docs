// NOTE: This script is inlined in astro.config.mjs for early execution
// If you modify this file, update the inline version in astro.config.mjs (lines 114-119)
;(function () {
  function inIframe() {
    try {
      return window.self !== window.top
    } catch (e) {
      return true
    }
  }

  if (inIframe()) {
    // Force light mode immediately (before DOM loads)
    document.documentElement.setAttribute('data-theme', 'light')
    document.documentElement.classList.add('in-iframe')
    document.documentElement.style.colorScheme = 'light'

    // Override localStorage to prevent theme changes
    localStorage.setItem('theme-toggle', 'light')
    localStorage.setItem('colorMode', 'light')

    // Remove zoom functionality after DOM loads
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelectorAll('starlight-image-zoom-zoomable').forEach(function (el) {
        var img = el.querySelector('img')
        var btn = el.querySelector('button')
        if (btn) btn.remove()
        if (img) {
          var newImg = img.cloneNode(true)
          el.parentNode.replaceChild(newImg, el)
        }
      })

      // Observer for dynamically loaded images
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) {
              var zoomables = node.querySelectorAll('starlight-image-zoom-zoomable')
              zoomables.forEach(function (el) {
                var img = el.querySelector('img')
                var btn = el.querySelector('button')
                if (btn) btn.remove()
                if (img) {
                  var newImg = img.cloneNode(true)
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
    })
  }
})()
