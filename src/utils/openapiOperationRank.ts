import fs from 'node:fs'
import path from 'node:path'

export type OperationRankConfig = {
  default?: number
  'path-segments'?: Array<{ match: string; rank: number }>
}

/** Fallback when the spec extension is missing (e.g. stale local copy). */
export const DEFAULT_OPERATION_RANK_CONFIG: OperationRankConfig = {
  default: 0,
  'path-segments': [
    { match: ':external', rank: 1 },
    { match: ':search', rank: 2 },
  ],
}

export function getPathRank(pathStr: string, config: OperationRankConfig): number {
  for (const rule of config['path-segments'] ?? []) {
    if (rule.match && pathStr.includes(rule.match)) {
      return rule.rank
    }
  }
  return config.default ?? 0
}

export function loadOperationRankConfig(
  specRelativePath = 'public/api/scalekit.scalar.json',
): OperationRankConfig {
  const specPath = path.join(process.cwd(), specRelativePath)
  try {
    const raw = fs.readFileSync(specPath, 'utf8')
    const spec = JSON.parse(raw) as Record<string, unknown>
    const extension = spec['x-scalekit-docs-operation-rank']
    if (extension && typeof extension === 'object') {
      return extension as OperationRankConfig
    }
  } catch {
    // Fall through to default — build should not fail on missing spec during early setup.
  }
  return DEFAULT_OPERATION_RANK_CONFIG
}

type OperationSortValue = {
  method?: string
  path?: string
}

/**
 * Scalar serializes sorter functions with Function.prototype.toString() in HTML.
 * Closures are lost, so the returned function must be fully self-contained.
 */
export function createOperationsSorter(config: OperationRankConfig) {
  const configLiteral = JSON.stringify(config)

  return new Function(
    'a',
    'b',
    `
    const config = ${configLiteral};
    const methodOrder = ['get', 'post', 'put', 'patch', 'delete'];
    const getMethodRank = (method) => {
      const rank = methodOrder.indexOf((method ?? '').toLowerCase());
      return rank === -1 ? Number.POSITIVE_INFINITY : rank;
    };
    const getPathRank = (pathStr) => {
      for (const rule of config['path-segments'] ?? []) {
        if (rule.match && pathStr.includes(rule.match)) {
          return rule.rank;
        }
      }
      return config.default ?? 0;
    };
    const methodComparison = getMethodRank(a.method) - getMethodRank(b.method);
    if (methodComparison !== 0) {
      return methodComparison;
    }
    const rankComparison = getPathRank(a.path ?? '') - getPathRank(b.path ?? '');
    if (rankComparison !== 0) {
      return rankComparison;
    }
    return (a.path ?? '').localeCompare(b.path ?? '');
  `,
  ) as (a: OperationSortValue, b: OperationSortValue) => number
}
