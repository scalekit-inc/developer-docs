export type TopicSlug = 'fsa' | 'sso' | 'scim' | 'agent-auth' | 'mcp' | 'm2m' | 'sdk' | 'quickstart'

const TOPIC_PATTERNS: Array<[TopicSlug, RegExp]> = [
  ['sdk', /\bsdk\b|webhook|api\s*reference|method\s*return|getSession|createUser/i],
  [
    'fsa',
    /\bfsa\b|full[\s-]stack\s*auth|\bsession\b|rbac|role.based|\buser.*org\b|\borg.*user\b|login\s*flow|sign[\s-]?in\s*flow/i,
  ],
  [
    'sso',
    /\bsso\b|saml|oidc(?!\s*vault)|single\s*sign[\s-]on|identity\s*provider|enterprise\s*login/i,
  ],
  [
    'scim',
    /\bscim\b|directory\s*sync|user\s*sync|provisioning|deprovisioning|group\s*sync|\bsync\b.*\bdirectory\b|\bdirectory\b/i,
  ],
  [
    'agent-auth',
    /agent\s*auth|ai\s*agent|oauth\s*vault|tool\s*call|mcp\s*connector|agent\s*connector/i,
  ],
  [
    'mcp',
    /\bmcp\b|model\s*context\s*protocol|dynamic\s*client\s*registration|mcp\s*server|mcp\s*auth/i,
  ],
  [
    'm2m',
    /m2m|machine[\s-]to[\s-]machine|client\s*credentials|api\s*key|service[\s-]to[\s-]service|service\s*account/i,
  ],
]

export function classifyQuery(query: string): TopicSlug {
  for (const [slug, pattern] of TOPIC_PATTERNS) {
    if (pattern.test(query)) return slug
  }
  return 'quickstart'
}
