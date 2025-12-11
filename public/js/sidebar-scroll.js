// Auto-scroll active sidebar item into view on page load
document.addEventListener('DOMContentLoaded', function () {
  // Small delay to ensure sidebar is fully rendered
  setTimeout(function () {
    // Find the active sidebar link using Starlight's standard aria-current attribute
    const activeSidebarLink = document.querySelector('.sidebar [aria-current="page"]')

    if (activeSidebarLink) {
      // Scroll the active item into view with smooth behavior
      activeSidebarLink.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      })
    }
  }, 100)
})
