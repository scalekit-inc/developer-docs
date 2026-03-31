function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function inlineMd(text: string): string {
  return escHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener">$1</a>',
    )
}

export function renderMarkdown(text: string): string {
  const lines = text.split('\n')
  let html = ''
  let i = 0
  let inSources = false

  while (i < lines.length) {
    const line = lines[i]

    // Horizontal rule — check if next non-empty line is **Sources:**
    if (/^[-*_]{3,}$/.test(line.trim())) {
      let j = i + 1
      while (j < lines.length && lines[j].trim() === '') j++
      if (j < lines.length && /^\*\*Sources:\*\*/.test(lines[j])) {
        html += '<div class="sk-sources"><strong>Sources</strong>'
        inSources = true
        i = j + 1
        continue
      }
      html += '<hr>'
      i++
      continue
    }

    // Inside sources section
    if (inSources) {
      if (line.trim() === '') {
        i++
        continue
      }
      const linkMatch = line.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)/)
      if (linkMatch) {
        html += `<a class="sk-source-link" href="${linkMatch[2]}" target="_blank" rel="noopener">${escHtml(linkMatch[1])}</a>`
      } else {
        html += `<span>${inlineMd(line)}</span>`
      }
      i++
      continue
    }

    // Fenced code block
    if (line.startsWith('```')) {
      let code = ''
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        code += escHtml(lines[i]) + '\n'
        i++
      }
      html += `<pre><code>${code.trimEnd()}</code></pre>`
      i++
      continue
    }

    // Headings
    const hm = line.match(/^(#{1,3}) (.+)/)
    if (hm) {
      html += `<h${hm[1].length}>${inlineMd(hm[2])}</h${hm[1].length}>`
      i++
      continue
    }

    // Unordered list
    if (/^[-*+] /.test(line)) {
      html += '<ul>'
      while (i < lines.length && /^[-*+] /.test(lines[i])) {
        html += `<li>${inlineMd(lines[i].replace(/^[-*+] /, ''))}</li>`
        i++
      }
      html += '</ul>'
      continue
    }

    // Ordered list
    if (/^\d+\. /.test(line)) {
      html += '<ol>'
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        html += `<li>${inlineMd(lines[i].replace(/^\d+\. /, ''))}</li>`
        i++
      }
      html += '</ol>'
      continue
    }

    // Blank line
    if (line.trim() === '') {
      i++
      continue
    }

    // Paragraph
    html += `<p>${inlineMd(line)}</p>`
    i++
  }

  if (inSources) html += '</div>'
  return html
}
