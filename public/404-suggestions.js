function score(candidatePath, attemptedSegments) {
  const candidateSegments = candidatePath.split('/').filter(Boolean)
  return attemptedSegments.reduce((n, seg) => n + (candidateSegments.includes(seg) ? 1 : 0), 0)
}

const attempted = window.location.pathname.split('/').filter(Boolean)

fetch('/sitemap-0.xml')
  .then((r) => r.text())
  .then((xml) => {
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
    const scored = locs
      .map((url) => ({ url, score: score(new URL(url).pathname, attempted) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)

    const container = document.getElementById('suggestions-container')
    if (!container) return
    if (scored.length === 0) return

    const items = scored
      .map(({ url }) => {
        const path = new URL(url).pathname
        const label = path
          .split('/')
          .filter(Boolean)
          .map((s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()))
          .join(' / ')
        return `<li><a href="${path}">${label}</a></li>`
      })
      .join('')

    container.innerHTML = `<p>Suggested pages</p><ul>${items}</ul>`
  })
  .catch(() => {})
