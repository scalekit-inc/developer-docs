import { getCollection } from 'astro:content'

export interface Resource {
  title: string
  url: string
  filterType: string[]
  category: string[]
  description?: string
  icon?: string
}

export interface Filter {
  type: string
  label: string
  count: number
}

export interface ColumnItem {
  type: 'category' | 'resource'
  categoryName?: string
  resource?: Resource
  resources?: Resource[]
}

export interface Column {
  items: ColumnItem[]
  weight: number
}

const FILTER_LABELS = {
  'code-sample': 'Code samples',
  tutorial: 'Tutorials',
  video: 'Videos',
} as const

const CATEGORY_ORDER = [
  'Basics',
  'Getting Started',
  'Core Authentication',
  'Enterprise Features',
  'SDKs & Development Tools',
  'API Reference',
  'Best Practices',
  'Support',
] as const

export async function loadBrowserCentralDocs(): Promise<Resource[]> {
  const docsCollection = await getCollection('docs')

  return docsCollection
    .filter((doc) => doc.data.browseCentral)
    .map((doc) => {
      // Use custom slug from frontmatter if available, otherwise use the document id
      const pageSlug = doc.data.slug || doc.id

      return {
        title: doc.data.browseCentral?.label || doc.data.title,
        url: `/${pageSlug}/`,
        filterType: doc.data.browseCentral?.filterType || [],
        category: doc.data.browseCentral?.category || [],
        description: doc.data.description,
        icon: doc.data.browseCentral?.icon,
      }
    })
}

export function organizeResourcesByCategory(resources: Resource[]): Map<string, Resource[]> {
  const categoryMap = new Map<string, Resource[]>()

  resources.forEach((resource) => {
    resource.category.forEach((cat) => {
      if (!categoryMap.has(cat)) {
        categoryMap.set(cat, [])
      }
      categoryMap.get(cat)!.push(resource)
    })
  })

  return categoryMap
}

export function buildFilterData(resources: Resource[]): Filter[] {
  const allFilterTypes = new Set<string>()
  const filterCounts = new Map<string, number>()

  resources.forEach((resource) => {
    resource.filterType.forEach((type) => {
      allFilterTypes.add(type)
      filterCounts.set(type, (filterCounts.get(type) || 0) + 1)
    })
  })

  return Array.from(allFilterTypes)
    .sort()
    .map((type) => ({
      type,
      label: FILTER_LABELS[type as keyof typeof FILTER_LABELS] || type,
      count: filterCounts.get(type) || 0,
    }))
}

export function getOrderedCategories(categoryMap: Map<string, Resource[]>): string[] {
  return CATEGORY_ORDER.filter((cat) => categoryMap.has(cat))
}

export function distributeToColumns(
  orderedCategories: string[],
  categoryMap: Map<string, Resource[]>,
  columnCount: number = 3,
): Column[] {
  // Create arrays for each column with content tracking
  const columns: Column[] = Array.from({ length: columnCount }, () => ({
    items: [],
    weight: 0,
  }))

  // Distribute categories and their items across columns using balanced algorithm
  orderedCategories.forEach((categoryName) => {
    const resources = categoryMap.get(categoryName) || []

    // Calculate content weight (category title = 2 points, resource = 1 point)
    const categoryWeight = 2 + resources.length

    // Find column with least weight
    const targetColumnIndex = columns.reduce(
      (minIndex, col, index) => (col.weight < columns[minIndex].weight ? index : minIndex),
      0,
    )

    const targetColumn = columns[targetColumnIndex]

    // Add category title to target column
    targetColumn.items.push({
      type: 'category',
      categoryName,
      resources,
    })

    // Add resources to same column
    resources.forEach((resource) => {
      targetColumn.items.push({
        type: 'resource',
        resource,
        categoryName,
      })
    })

    // Update column weight
    targetColumn.weight += categoryWeight
  })

  return columns
}

export async function processExamplesData() {
  // Load and process all data
  const resources = await loadBrowserCentralDocs()
  const categoryMap = organizeResourcesByCategory(resources)
  const filters = buildFilterData(resources)
  const orderedCategories = getOrderedCategories(categoryMap)
  const columns = distributeToColumns(orderedCategories, categoryMap)

  return {
    resources,
    categoryMap,
    filters,
    orderedCategories,
    columns,
  }
}
