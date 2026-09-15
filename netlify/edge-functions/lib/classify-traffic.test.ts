import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { classifyAccept, classifyPath, classifyTraffic } from './classify-traffic.ts'

// User agents are 7-day production $http_log samples from PostHog.

describe('named tokens', () => {
  it('labels the site DocSearch indexer as automation', () => {
    assert.deepEqual(classifyTraffic('Algolia Crawler/v0.0.0'), {
      trafficClass: 'automation',
      agentName: 'algolia',
    })
  })

  it('labels Ahrefs site audit, not only AhrefsBot', () => {
    assert.deepEqual(
      classifyTraffic(
        'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.7922.173 Mobile Safari/537.36 (compatible; AhrefsSiteAudit/6.1; +http://ahrefs.com/robot/site-audit)',
      ),
      { trafficClass: 'crawler', agentName: 'ahrefs' },
    )
  })

  it('labels HubSpot, AdsBot, GoogleOther, and Exa', () => {
    assert.deepEqual(
      classifyTraffic(
        'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; HubSpot Crawler; +https://www.hubspot.com) Chrome/131.0.0.0 Safari/537.36',
      ),
      { trafficClass: 'crawler', agentName: 'hubspot' },
    )
    assert.deepEqual(classifyTraffic('AdsBot-Google (+http://www.google.com/adsbot.html)'), {
      trafficClass: 'crawler',
      agentName: 'adsbot-google',
    })
    assert.deepEqual(classifyTraffic('GoogleOther'), {
      trafficClass: 'crawler',
      agentName: 'google-other',
    })
    assert.deepEqual(
      classifyTraffic('Mozilla/5.0 (compatible; ExaSearchBot/1.0; +https://crawler.exa.ai/)'),
      { trafficClass: 'crawler', agentName: 'exa' },
    )
  })

  it('keeps Claude Code above Claude-User', () => {
    assert.deepEqual(
      classifyTraffic('Claude-User (claude-code/2.1.270; +https://support.anthropic.com/)'),
      { trafficClass: 'coding_agent', agentName: 'claude-code' },
    )
  })

  it('labels grok-agent as a coding agent, not the xAI crawler', () => {
    assert.deepEqual(classifyTraffic('Mozilla/5.0 (compatible; grok-agent/1.0; +https://x.ai)'), {
      trafficClass: 'coding_agent',
      agentName: 'grok',
    })
  })

  it('labels Bun and the Postman readiness fetcher as automation', () => {
    assert.deepEqual(classifyTraffic('Bun/1.4.2'), {
      trafficClass: 'automation',
      agentName: 'bun',
    })
    assert.deepEqual(
      classifyTraffic('quigon-manifest-fetcher/0.1 (Postman; agent-readiness indexing)'),
      { trafficClass: 'automation', agentName: 'quigon' },
    )
  })
})

describe('unknown leftovers', () => {
  it('does not guess human from a Chrome user-agent', () => {
    assert.deepEqual(
      classifyTraffic(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
      ),
      { trafficClass: 'unknown', agentName: 'unknown' },
    )
  })

  it('does not catch leftover *bot names', () => {
    assert.deepEqual(classifyTraffic('Mozilla/5.0 (compatible; PromptingBot/1.0.0)'), {
      trafficClass: 'unknown',
      agentName: 'unknown',
    })
  })
})

describe('classifyPath', () => {
  it('labels markdown and llms indexes as agent_doc', () => {
    assert.equal(classifyPath('/agentkit/overview.md'), 'agent_doc')
    assert.equal(classifyPath('/llms.txt'), 'agent_doc')
    assert.equal(classifyPath('/llms-full.txt'), 'agent_doc')
    assert.equal(classifyPath('/_llms-txt/agentkit.md'), 'agent_doc')
  })

  it('labels OpenAPI routes as api_spec', () => {
    assert.equal(classifyPath('/api/agentkit.scalar.yaml'), 'api_spec')
    assert.equal(classifyPath('/api/scalekit.scalar.json'), 'api_spec')
  })

  it('labels HTML docs as page', () => {
    assert.equal(classifyPath('/agentkit/overview/'), 'page')
  })
})

describe('classifyAccept', () => {
  it('prefers markdown when the client asks for it', () => {
    assert.equal(classifyAccept('text/markdown, text/html;q=0.9, */*;q=0.8'), 'markdown')
  })

  it('labels browser HTML accepts', () => {
    assert.equal(
      classifyAccept('text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'),
      'html',
    )
  })

  it('labels empty and */* as star', () => {
    assert.equal(classifyAccept(''), 'star')
    assert.equal(classifyAccept('*/*'), 'star')
  })
})
