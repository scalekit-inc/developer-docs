/** Tag order for /apis. Keep in sync with openapi/extensions/all.yaml. */
export const SCALEKIT_TAG_ORDER = [
  'Organizations',
  'Permissions',
  'Users',
  'Connections',
  'Directory',
  'Roles',
  'Sessions',
  'Domains',
  'API Auth',
  'Magic link & OTP',
  'Passkeys',
  'Connected Accounts',
  'Connectors',
  'Tool Calling',
  'MCP Configurations',
]

/** Tag order for /agentkit/apis. Keep in sync with openapi/extensions/agentkit.yaml. */
export const AGENTKIT_TAG_ORDER = [
  'Connected Accounts',
  'Connectors',
  'Tool Calling',
  'MCP Configurations',
]

/** Tag order for /saaskit/apis. */
export const SAASKIT_TAG_ORDER = [
  'Organizations',
  'Permissions',
  'Users',
  'Connections',
  'Directory',
  'Roles',
  'Sessions',
  'Domains',
  'API Auth',
  'Magic link & OTP',
  'Passkeys',
]

/**
 * Self-contained tag sorter. Client-mode Scalar JSON.stringifies config, so
 * closures are lost. This function's toString() must revive on its own.
 */
export function createTagsSorter(tagOrder) {
  const orderLiteral = JSON.stringify(tagOrder)
  return new Function(
    'a',
    'b',
    `
    const tagOrder = ${orderLiteral};
    const tagName = (tag) => (typeof tag === 'string' ? tag : (tag?.name ?? ''));
    const getTagRank = (name) => {
      const rank = tagOrder.indexOf(name ?? '');
      return rank === -1 ? Number.POSITIVE_INFINITY : rank;
    };
    const nameA = tagName(a);
    const nameB = tagName(b);
    const rankA = getTagRank(nameA);
    const rankB = getTagRank(nameB);
    if (rankA !== rankB) return rankA - rankB;
    return nameA.localeCompare(nameB);
  `,
  )
}

/** Self-contained method-then-path sorter for AgentKit and SaaSKit. */
export function createMethodPathSorter() {
  return new Function(
    'a',
    'b',
    `
    const methodOrder = ['get', 'post', 'put', 'patch', 'delete'];
    const getMethodRank = (method) => {
      const rank = methodOrder.indexOf((method ?? '').toLowerCase());
      return rank === -1 ? Number.POSITIVE_INFINITY : rank;
    };
    const methodComparison = getMethodRank(a?.method) - getMethodRank(b?.method);
    if (methodComparison !== 0) return methodComparison;
    return (a?.path ?? '').localeCompare(b?.path ?? '');
  `,
  )
}

export function generateWebhookSlug(webhook) {
  const name = webhook?.name || webhook?.summary || 'list-of-events'
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Emit an object literal that keeps function-valued keys. */
export function serializeFunctionsToJs(fns) {
  const parts = Object.entries(fns)
    .filter(([, value]) => typeof value === 'function')
    .map(([key, value]) => `"${key}": ${value.toString()}`)
  return `{${parts.join(',')}}`
}
