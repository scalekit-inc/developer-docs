export type OperatorKind = 'scalekit' | 'vendor-mcp'

export type Operator = {
  kind: OperatorKind
  label: string
}

export function displayTitle(title: string): string {
  return title.replace(/\s+connector$/i, '')
}

export function operatorOf(slug: string): Operator {
  return slug.toLowerCase().endsWith('mcp')
    ? { kind: 'vendor-mcp', label: 'Vendor MCP' }
    : { kind: 'scalekit', label: 'scalekit' }
}

export function normalizeAuth(authType: string): string {
  return authType
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/^OAuth2\.1/i, 'OAuth 2.1')
}

export function coverageLabel(toolCount: number): string {
  if (toolCount <= 0) return 'Coming soon'
  return `${toolCount} tool${toolCount === 1 ? '' : 's'}`
}
