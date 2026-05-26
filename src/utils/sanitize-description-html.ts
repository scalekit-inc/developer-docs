import sanitizeHtml from 'sanitize-html'

/**
 * Strips all tags/attrs except <a> with http/https hrefs.
 * Used before set:html on connector descriptionHtml frontmatter values.
 */
export function sanitizeDescriptionHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ['a'],
    allowedAttributes: {
      a: ['href'],
    },
    allowedSchemes: ['https', 'http'],
  })
}
