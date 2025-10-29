# Frontmatter-Based Filtering System Implementation Guide

## Overview

This guide documents a flexible, content-driven filtering system that allows documentation pages to be automatically included in a browsable resource hub. The system uses frontmatter metadata to categorize and filter resources without requiring code changes for each new resource.

## Architecture

### Core Components

1. **Schema Definition** - Extends content schema with filtering metadata
2. **Frontmatter Metadata** - Authors add filtering info to their docs
3. **Data Collection** - Aggregates internal docs and external resources
4. **Dynamic Filter Generation** - Creates filters from available resources
5. **Client-Side Filtering** - JavaScript handles real-time filtering
6. **Icon Mapping** - Centralized icon resolution system

### Key Design Principles

- **Declarative**: Authors add metadata, not code
- **Multi-category**: Resources can belong to multiple categories
- **Multi-filter**: Resources can have multiple filter types
- **Dynamic**: Filters and counts are generated automatically
- **Client-side**: Fast filtering without server round-trips
- **Progressive Enhancement**: Works without JavaScript

## Implementation Steps

### Step 1: Define the Schema

Extend your content schema to include filtering metadata:

```typescript
// src/content.config.ts
import { z, defineCollection } from 'astro:content'
import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        browseCentral: z
          .object({
            label: z.string().optional(), // Custom display label
            filterType: z.array(
              // What type of resource
              z.enum(['code-sample', 'integration', 'tutorial', 'reference']),
            ),
            category: z.array(z.string()), // Which categories
            icon: z.string().optional(), // Icon identifier
          })
          .optional(),
      }),
    }),
  }),
}
```

### Step 2: Create Icon Mapping Utility

Create a centralized icon mapping system:

```typescript
// src/utils/icon-map.ts
import IconNodejs from '~icons/simple-icons/nodedotjs'
import IconPython from '~icons/simple-icons/python'
import IconGo from '~icons/simple-icons/go'
import IconLucideShield from '~icons/lucide/shield'
import IconLucideBook from '~icons/lucide/book'
import IconOcticonTabExternal from '~icons/octicon/tab-external-24'

// Static icon mapping for supported technologies
export const iconMap = {
  // Programming languages
  nodejs: IconNodejs,
  node: IconNodejs,
  python: IconPython,
  py: IconPython,
  go: IconGo,
  golang: IconGo,

  // Frameworks
  nextjs: IconTeenyiconsNextjsOutline,
  express: IconExpress,

  // Category icons
  shield: IconLucideShield,
  book: IconLucideBook,
  code: IconLucideCode,

  // Default
  external: IconOcticonTabExternal,
}

export type IconKey = keyof typeof iconMap

// Helper function to get icon component by key
export function getIconComponent(key?: string) {
  if (!key) return IconOcticonTabExternal
  const iconKey = key.toLowerCase() as IconKey
  return iconMap[iconKey] || IconOcticonTabExternal
}
```

### Step 3: Create Filter Components

#### FilterBar Component

```astro
---
// src/components/ui/browse-central/FilterBar.astro
import FilterToggle from './FilterToggle.astro'

interface Filter {
  type: string
  label: string
  count: number
}

interface Props {
  filters: Filter[]
}

const { filters } = Astro.props
---

<div class="filter-bar">
  <div class="filter-bar-content">
    <div class="filter-toggles">
      {
        filters.map((filter) => (
          <FilterToggle
            filterType={filter.type}
            label={filter.label}
            count={filter.count}
            isActive={true}
          />
        ))
      }
    </div>
  </div>
</div>

<style>
  .filter-bar {
    border-radius: 0.5rem;
    margin-bottom: 2rem;
  }

  .filter-bar-content {
    display: flex;
    align-items: baseline;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .filter-label {
    font-size: var(--sl-text-sm);
    font-weight: 500;
    color: var(--sl-color-gray-2);
    white-space: nowrap;
  }

  .filter-toggles {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
</style>
```

#### FilterToggle Component

```astro
---
// src/components/ui/browse-central/FilterToggle.astro
interface Props {
  filterType: string
  label: string
  count: number
  isActive?: boolean
}

const { filterType, label, count, isActive = true } = Astro.props
---

<label class="filter-toggle">
  <span class="filter-label">{label}:</span>
  <input
    type="checkbox"
    class="toggle-checkbox"
    data-filter-type={filterType}
    checked={isActive}
    aria-label={`Toggle ${label} filter`}
  />
  <span class="toggle-switch"></span>
</label>

<style>
  .filter-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    user-select: none;
  }

  .filter-label {
    font-size: var(--sl-text-sm);
    color: var(--sl-color-gray-2);
    font-weight: 500;
  }

  .toggle-checkbox {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 2.5rem;
    height: 1.25rem;
    background: var(--sl-color-gray-6);
    border-radius: 1.25rem;
    transition: background-color 0.2s ease;
  }

  .toggle-switch::after {
    content: '';
    position: absolute;
    top: 0.125rem;
    left: 0.125rem;
    width: 1rem;
    height: 1rem;
    background: white;
    border-radius: 50%;
    transition: transform 0.2s ease;
  }

  .toggle-checkbox:checked + .toggle-switch {
    background: var(--sl-color-blue);
  }

  .toggle-checkbox:checked + .toggle-switch::after {
    transform: translateX(1.25rem);
  }
</style>
```

#### ResourceCategory Component

```astro
---
// src/components/ui/browse-central/ResourceCategory.astro
interface Props {
  categoryName: string
}

const { categoryName } = Astro.props
---

<section class="resource-category" data-category-section={categoryName}>
  <h2 class="category-title">{categoryName}</h2>
  <div class="resource-list">
    <slot />
  </div>
</section>

<style>
  .resource-category {
    margin-bottom: 2rem;
    break-inside: avoid;
  }

  .category-title {
    font-size: var(--sl-text-lg);
    font-weight: 600;
    color: var(--sl-color-text);
    margin: 0 0 0.75rem 0;
  }

  .resource-list {
    display: flex;
    flex-direction: column;
  }
</style>
```

#### ResourceItem Component

```astro
---
// src/components/ui/browse-central/ResourceItem.astro
import { getIconComponent } from '@/utils/icon-map'

interface Props {
  title: string
  url: string
  icon?: string
  description?: string
  filterTypes: string[]
  categories: string[]
}

const { title, url, icon, description, filterTypes, categories } = Astro.props

const IconComponent = getIconComponent(icon)
const isExternal = url.startsWith('http')
---

<div
  class="resource-item"
  data-filter-types={JSON.stringify(filterTypes)}
  data-categories={JSON.stringify(categories)}
>
  <a
    href={url}
    class="resource-link"
    target={isExternal ? '_blank' : undefined}
    rel={isExternal ? 'noopener noreferrer' : undefined}
    title={description}
  >
    <IconComponent class="resource-icon" />
    <span class="resource-title">{title}</span>
  </a>
</div>

<style>
  .resource-item {
    display: block;
    margin-bottom: 0.5rem;
  }

  .resource-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: var(--sl-color-text);
    font-size: var(--sl-text-sm);
    border-bottom: 1px solid transparent;
    transition: border-bottom 0.15s ease;
  }

  .resource-link:hover {
    border-bottom: 1px solid currentColor;
  }

  .resource-icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    color: var(--sl-color-text-accent);
  }
</style>
```

### Step 4: Create the Main Page

```astro
---
// src/pages/win-with-scalekit.astro
import StarlightPage from '@astrojs/starlight/components/StarlightPage.astro'
import { getCollection } from 'astro:content'
import { externalResources } from '@/data/browse-central-external'
import FilterBar from '@/components/ui/browse-central/FilterBar.astro'
import ResourceCategory from '@/components/ui/browse-central/ResourceCategory.astro'
import ResourceItem from '@/components/ui/browse-central/ResourceItem.astro'

// Load internal docs with browseCentral metadata
const docsCollection = await getCollection('docs')
const browseCentralDocs = docsCollection
  .filter((doc) => doc.data.browseCentral)
  .map((doc) => ({
    title: doc.data.browseCentral?.label || doc.data.title,
    url: `/${doc.slug}/`,
    filterType: doc.data.browseCentral?.filterType || [],
    category: doc.data.browseCentral?.category || [],
    icon: doc.data.browseCentral?.icon,
    description: doc.data.description,
  }))

// Combine internal and external resources
const allResources = [...browseCentralDocs, ...externalResources]

// Organize resources by category
const categoryMap = new Map<string, typeof allResources>()
const categoryOrder = [
  'Start Here',
  'Core Authentication',
  'User & Organization Management',
  'Enterprise Features',
  'Social & Integrations',
  'Customization',
  'SDKs & Development Tools',
  'Best Practices & Concepts',
]

allResources.forEach((resource) => {
  resource.category.forEach((cat) => {
    if (!categoryMap.has(cat)) {
      categoryMap.set(cat, [])
    }
    categoryMap.get(cat)!.push(resource)
  })
})

// Discover all unique filter types
const allFilterTypes = new Set<string>()
allResources.forEach((resource) => {
  resource.filterType.forEach((type) => allFilterTypes.add(type))
})

// Calculate counts for each filter type
const filterCounts = new Map<string, number>()
allResources.forEach((resource) => {
  resource.filterType.forEach((type) => {
    filterCounts.set(type, (filterCounts.get(type) || 0) + 1)
  })
})

// Create filter data for FilterBar
const filterLabels = {
  'code-sample': 'Examples',
  integration: 'Integrations',
  tutorial: 'Tutorials',
  reference: 'Reference',
}

const filters = Array.from(allFilterTypes)
  .sort()
  .map((type) => ({
    type,
    label: filterLabels[type] || type,
    count: filterCounts.get(type) || 0,
  }))

// Get ordered categories
const orderedCategories = categoryOrder.filter((cat) => categoryMap.has(cat))
---

<StarlightPage
  frontmatter={{
    title: 'Win with Scalekit',
    description: 'Explore code samples, integrations, tutorials, and reference documentation',
    template: 'splash',
  }}
  headings={[]}
>
  <div class="win-with-scalekit-content">
    <p class="page-description">
      A collection of walkthrough tutorials, examples, and guides. Filter by type to find exactly
      what you need.
    </p>

    <FilterBar filters={filters} />

    <div class="resources-container">
      {
        orderedCategories.map((categoryName) => {
          const resources = categoryMap.get(categoryName) || []
          return (
            <ResourceCategory categoryName={categoryName}>
              {resources.map((resource) => (
                <ResourceItem
                  title={resource.title}
                  url={resource.url}
                  icon={resource.icon}
                  description={resource.description}
                  filterTypes={resource.filterType}
                  categories={resource.category}
                />
              ))}
            </ResourceCategory>
          )
        })
      }
    </div>

    <div class="empty-state" style="display: none;">
      <p>No resources match your selected filters.</p>
    </div>
  </div>
</StarlightPage>

<style is:global>
  .win-with-scalekit-content {
    width: 100%;
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .resources-container {
    margin-top: 2rem;
    column-count: 3;
    column-gap: 2.5rem;
  }

  @media (max-width: 72rem) {
    .resources-container {
      column-count: 2;
    }
  }

  @media (max-width: 50rem) {
    .resources-container {
      column-count: 1;
    }
  }
</style>

<script>
  // Client-side filtering logic
  function initializeFiltering() {
    const toggleCheckboxes = document.querySelectorAll('.toggle-checkbox')
    const resourceItems = document.querySelectorAll('.resource-item')
    const categorySections = document.querySelectorAll('[data-category-section]')
    const emptyState = document.querySelector('.empty-state')
    const resourcesContainer = document.querySelector('.resources-container')

    const activeFilters = new Set<string>()

    // Initialize all filters as active
    toggleCheckboxes.forEach((checkbox) => {
      const filterType = checkbox.getAttribute('data-filter-type')
      if (filterType && checkbox.checked) {
        activeFilters.add(filterType)
      }
    })

    // Toggle filter on checkbox change
    toggleCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        const filterType = checkbox.getAttribute('data-filter-type')
        if (!filterType) return

        if (checkbox.checked) {
          activeFilters.add(filterType)
        } else {
          activeFilters.delete(filterType)
        }

        updateDisplay()
      })
    })

    function updateDisplay() {
      let visibleCount = 0

      // Show/hide resource items based on active filters
      resourceItems.forEach((item) => {
        const filterTypesStr = item.getAttribute('data-filter-types')
        if (!filterTypesStr) return

        const itemFilterTypes = JSON.parse(filterTypesStr)
        const hasMatch = itemFilterTypes.some((type) => activeFilters.has(type))

        if (hasMatch || activeFilters.size === 0) {
          item.style.display = 'block'
          visibleCount++
        } else {
          item.style.display = 'none'
        }
      })

      // Show/hide category sections based on visible items
      categorySections.forEach((section) => {
        const visibleItems = section.querySelectorAll(
          '.resource-item:not([style*="display: none"])',
        )
        if (visibleItems.length > 0) {
          section.style.display = 'block'
        } else {
          section.style.display = 'none'
        }
      })

      // Show/hide empty state
      if (visibleCount === 0 && emptyState && resourcesContainer) {
        emptyState.style.display = 'block'
        resourcesContainer.style.display = 'none'
      } else if (emptyState && resourcesContainer) {
        emptyState.style.display = 'none'
        resourcesContainer.style.display = 'block'
      }
    }
  }

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFiltering)
  } else {
    initializeFiltering()
  }
</script>
```

### Step 5: Define External Resources

```typescript
// src/data/browse-central-external.ts
export interface ExternalResource {
  title: string
  label?: string
  url: string
  filterType: Array<'code-sample' | 'integration' | 'tutorial' | 'reference'>
  category: string[]
  icon?: string
  description?: string
}

export const externalResources: ExternalResource[] = [
  {
    title: 'Next.js Full-Stack Auth',
    url: 'https://github.com/example/nextjs-auth',
    filterType: ['code-sample'],
    category: ['Start Here', 'Core Authentication'],
    icon: 'nextjs',
    description: 'Complete React authentication flow',
  },
  {
    title: 'Express.js Example',
    url: 'https://github.com/example/express-auth',
    filterType: ['code-sample'],
    category: ['Core Authentication'],
    icon: 'express',
    description: 'Node.js authentication with sessions',
  },
  // ... more resources
]
```

### Step 6: Add Frontmatter to Docs

Authors add filtering metadata to their documentation:

```yaml
---
title: 'Quickstart Guide'
description: 'Get started with authentication'

browseCentral:
  filterType: ['tutorial']
  category: ['Start Here', 'Core Authentication']
  icon: 'shield'
---
```

Or with a custom label:

```yaml
---
title: 'Client Credentials Best Practices'
description: 'Secure API credentials'

browseCentral:
  label: 'Secure API Credentials' # Override title
  filterType: ['reference', 'tutorial']
  category: ['Best Practices & Concepts']
  icon: 'shield'
---
```

## Usage Examples

### Example 1: Simple Tutorial

```yaml
---
title: 'Getting Started'
browseCentral:
  filterType: ['tutorial']
  category: ['Start Here']
  icon: 'book'
---
```

### Example 2: Code Sample with Multiple Categories

```yaml
---
title: 'Next.js Authentication'
browseCentral:
  filterType: ['code-sample']
  category: ['Start Here', 'Core Authentication']
  icon: 'nextjs'
---
```

### Example 3: Reference Documentation

```yaml
---
title: 'API Reference'
browseCentral:
  filterType: ['reference']
  category: ['SDKs & Development Tools']
  icon: 'code'
---
```

### Example 4: Multi-Type Resource

```yaml
---
title: 'SSO Integration Guide'
browseCentral:
  filterType: ['tutorial', 'integration']
  category: ['Enterprise Features']
  icon: 'shield'
---
```

## Best Practices

### 1. Consistent Category Names

Use predefined category names to maintain consistency:

```typescript
const categoryOrder = [
  'Start Here',
  'Core Authentication',
  'User & Organization Management',
  'Enterprise Features',
  'Social & Integrations',
  'Customization',
  'SDKs & Development Tools',
  'Best Practices & Concepts',
]
```

### 2. Icon Naming Convention

Use lowercase, kebab-case for icon names:

- `nextjs` not `NextJS` or `next-js`
- `express` not `Express` or `expressjs`

### 3. Multiple Categories

Resources can belong to multiple categories for better discoverability:

```yaml
browseCentral:
  category: ['Start Here', 'Core Authentication']
```

### 4. Multiple Filter Types

Resources can have multiple filter types:

```yaml
browseCentral:
  filterType: ['code-sample', 'tutorial']
```

### 5. Custom Labels

Use custom labels when the title doesn't fit the context:

```yaml
browseCentral:
  label: 'Secure API Credentials' # Better than "Client Credentials Best Practices"
```

## Customization

### Adding New Filter Types

1. Update the schema enum:

```typescript
filterType: z.array(z.enum(['code-sample', 'integration', 'tutorial', 'reference', 'video']))
```

2. Add to filter labels:

```typescript
const filterLabels = {
  'code-sample': 'Examples',
  integration: 'Integrations',
  tutorial: 'Tutorials',
  reference: 'Reference',
  video: 'Videos', // New filter type
}
```

### Adding New Categories

1. Add to category order:

```typescript
const categoryOrder = [
  'Start Here',
  'Core Authentication',
  'New Category', // Add here
  // ... rest
]
```

2. Use in frontmatter:

```yaml
browseCentral:
  category: ['New Category']
```

### Adding New Icons

1. Import icon in `icon-map.ts`:

```typescript
import IconNewTech from '~icons/simple-icons/newtech'
```

2. Add to icon map:

```typescript
export const iconMap = {
  // ... existing icons
  newtech: IconNewTech,
}
```

3. Use in frontmatter:

```yaml
browseCentral:
  icon: 'newtech'
```

## Troubleshooting

### Resources Not Appearing

- Check that `browseCentral` is defined in frontmatter
- Verify `filterType` and `category` are arrays
- Ensure category names match `categoryOrder`

### Icons Not Showing

- Check icon name is lowercase
- Verify icon exists in `iconMap`
- Default icon will be used if not found

### Filtering Not Working

- Check browser console for JavaScript errors
- Verify `data-filter-types` attribute is set correctly
- Ensure filter types match schema enum values

## Performance Considerations

- **Client-side filtering**: Fast, no server round-trips
- **Progressive enhancement**: Works without JavaScript
- **Lazy loading**: Consider lazy loading icons for large lists
- **Caching**: Filter state could be persisted in localStorage

## Future Enhancements

- Search functionality
- URL-based filter state (query parameters)
- Filter persistence (localStorage)
- Sort options (alphabetical, date, popularity)
- Analytics tracking for filter usage
