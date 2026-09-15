export type TrafficClass = 'coding_agent' | 'crawler' | 'automation' | 'unknown'

export type PathKind = 'agent_doc' | 'api_spec' | 'page'

export type AcceptKind = 'markdown' | 'html' | 'star' | 'other'

type Rule = { class: Exclude<TrafficClass, 'unknown'>; name: string; pattern: RegExp }

// First match wins. Only high-confidence tokens. No leftover *bot catch-all.
// Do not guess human from Mozilla — humans are $pageview events from posthog.js.
const RULES: Rule[] = [
  { class: 'coding_agent', name: 'claude-code', pattern: /claude-code\/|claude-cli\//i },
  { class: 'coding_agent', name: 'cursor', pattern: /Cursor\//i },
  { class: 'coding_agent', name: 'aider', pattern: /\bAider\//i },
  { class: 'coding_agent', name: 'codex', pattern: /\bcodex(?:-cli|-mcp-client)?\//i },
  { class: 'coding_agent', name: 'opencode', pattern: /\bopencode\b/i },
  { class: 'coding_agent', name: 'windsurf', pattern: /windsurf\/|codeium/i },
  { class: 'coding_agent', name: 'gemini-cli', pattern: /gemini-cli/i },
  { class: 'coding_agent', name: 'copilot', pattern: /\bcopilot\b/i },
  { class: 'coding_agent', name: 'cline', pattern: /\bcline\//i },
  { class: 'coding_agent', name: 'continue', pattern: /\bContinue\//i },
  { class: 'coding_agent', name: 'devin', pattern: /\bdevin\b/i },
  { class: 'coding_agent', name: 'junie', pattern: /\bjunie\b/i },
  { class: 'coding_agent', name: 'grok', pattern: /grok-agent\//i },
  { class: 'crawler', name: 'gptbot', pattern: /GPTBot/i },
  { class: 'crawler', name: 'oai-searchbot', pattern: /OAI-SearchBot/i },
  { class: 'crawler', name: 'chatgpt-user', pattern: /ChatGPT-User/i },
  { class: 'crawler', name: 'claude-user', pattern: /Claude-User/i },
  { class: 'crawler', name: 'claude-searchbot', pattern: /Claude-SearchBot/i },
  { class: 'crawler', name: 'claudebot', pattern: /ClaudeBot/i },
  { class: 'crawler', name: 'googlebot', pattern: /Googlebot/i },
  { class: 'crawler', name: 'adsbot-google', pattern: /AdsBot-Google/i },
  { class: 'crawler', name: 'google-other', pattern: /GoogleOther/i },
  { class: 'crawler', name: 'amazonbot', pattern: /Amazonbot/i },
  { class: 'crawler', name: 'applebot', pattern: /Applebot/i },
  { class: 'crawler', name: 'bingbot', pattern: /bingbot/i },
  { class: 'crawler', name: 'petalbot', pattern: /PetalBot/i },
  { class: 'crawler', name: 'sogou', pattern: /Sogou/i },
  { class: 'crawler', name: 'facebook', pattern: /facebookexternalhit/i },
  { class: 'crawler', name: 'meta-externalagent', pattern: /meta-externalagent/i },
  { class: 'crawler', name: 'meta-webindexer', pattern: /meta-webindexer/i },
  { class: 'crawler', name: 'perplexity', pattern: /PerplexityBot|Perplexity-User/i },
  { class: 'crawler', name: 'ahrefs', pattern: /AhrefsBot|AhrefsSiteAudit/i },
  { class: 'crawler', name: 'semrush', pattern: /SemrushBot/i },
  { class: 'crawler', name: 'bytespider', pattern: /Bytespider/i },
  { class: 'crawler', name: 'baiduspider', pattern: /Baiduspider/i },
  { class: 'crawler', name: 'mj12', pattern: /MJ12bot/i },
  { class: 'crawler', name: 'xai', pattern: /xAI-SearchBot|xAI-Grok|GrokBot|Grok-DeepSearch/i },
  {
    class: 'crawler',
    name: 'yandex',
    pattern: /YandexBot|YandexRenderResourcesBot|YaDirectFetcher/i,
  },
  { class: 'crawler', name: 'ccbot', pattern: /CCBot/i },
  { class: 'crawler', name: 'exa', pattern: /ExaSearchBot/i },
  { class: 'crawler', name: 'hubspot', pattern: /HubSpot Crawler/i },
  { class: 'crawler', name: 'you', pattern: /YouBot/i },
  { class: 'crawler', name: 'qwant', pattern: /Qwantbot/i },
  { class: 'crawler', name: 'seznam', pattern: /SeznamBot/i },
  { class: 'crawler', name: 'moz-dotbot', pattern: /DotBot/i },
  { class: 'crawler', name: 'barkrowler', pattern: /Barkrowler/i },
  { class: 'crawler', name: 'linkup', pattern: /LinkupBot/i },
  { class: 'crawler', name: 'url-crawler', pattern: /url-crawler\//i },
  { class: 'automation', name: 'algolia', pattern: /Algolia Crawler/i },
  { class: 'automation', name: 'lighthouse', pattern: /Chrome-Lighthouse/i },
  {
    class: 'automation',
    name: 'headless-browser',
    pattern: /HeadlessChrome|Playwright|Puppeteer/i,
  },
  { class: 'automation', name: 'uptime', pattern: /StackdriverMonitoring|UptimeChecks/i },
  { class: 'automation', name: 'deno', pattern: /^Deno\//i },
  { class: 'automation', name: 'bun', pattern: /^Bun\//i },
  { class: 'automation', name: 'scrapy', pattern: /^Scrapy\//i },
  { class: 'automation', name: 'mcp-linkcheck', pattern: /MCP-Use-LinkCheck/i },
  { class: 'automation', name: 'quigon', pattern: /quigon-manifest-fetcher/i },
  {
    class: 'automation',
    name: 'chrome-prefetch',
    pattern: /Chrome Privacy Preserving Prefetch Proxy/i,
  },
  { class: 'automation', name: 'curl', pattern: /^curl\//i },
  { class: 'automation', name: 'wget', pattern: /^wget\//i },
  { class: 'automation', name: 'axios', pattern: /^axios\//i },
  { class: 'automation', name: 'got', pattern: /^got\s*\(/i },
  { class: 'automation', name: 'go-http', pattern: /^Go-http-client/i },
  {
    class: 'automation',
    name: 'python-http',
    pattern: /python-requests|httpx|aiohttp|Python-urllib/i,
  },
  { class: 'automation', name: 'node-http', pattern: /^node-fetch|^undici/i },
]

export function classifyTraffic(ua: string): { trafficClass: TrafficClass; agentName: string } {
  for (const rule of RULES) {
    if (rule.pattern.test(ua)) {
      return { trafficClass: rule.class, agentName: rule.name }
    }
  }
  return { trafficClass: 'unknown', agentName: 'unknown' }
}

export function classifyPath(pathname: string): PathKind {
  if (
    /\.md$/i.test(pathname) ||
    /\/llms(-full|-small)?\.txt$/i.test(pathname) ||
    /\/_llms-txt\//i.test(pathname)
  ) {
    return 'agent_doc'
  }
  if (/^\/api\//.test(pathname) || /\.ya?ml$/i.test(pathname)) {
    return 'api_spec'
  }
  return 'page'
}

export function classifyAccept(accept: string): AcceptKind {
  if (!accept || accept === '*/*') return 'star'
  if (/text\/markdown/i.test(accept)) return 'markdown'
  if (/text\/html/i.test(accept)) return 'html'
  return 'other'
}
