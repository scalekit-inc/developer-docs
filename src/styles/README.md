# Fold Styles System

This document describes the organized fold styles system for managing styles across all fold components in the Scalekit documentation site.

## Overview

The fold styles system provides a centralized, maintainable approach to styling the landing page fold components (Fold1, Fold2, Fold3, etc.). Previously, styles were scattered across individual components and global styles, leading to duplication and maintenance challenges.

## Architecture

### Core Files

- **`folds.css`** - Centralized styles for all fold components
- **`FoldCard.astro`** - Shared card component with consistent styling
- **`SharedStyles.astro`** - Imports centralized styles for fold components

### Style Organization

The `folds.css` file is organized into the following sections:

1. **Base Fold Styles** - Common fold container and background styles
2. **Fold Grid System** - Layout utilities for fold content
3. **Fold Header Styles** - Typography and spacing for fold headers
4. **Shared Card Styles** - Consistent styling for cards across folds
5. **Fold-Specific Styles** - Component-specific overrides and customizations
6. **Responsive Styles** - Mobile-first responsive breakpoints

## Usage

### Using Fold Components

Fold components now use the centralized styles system automatically:

```astro
<!-- Fold2.astro -->
<section class="fold fold--alternate fold-2 full-bleed">
  <FoldHeader className="fold-2-header" ... />
  <div class="fold-2-content">
    <CardGrid className="fold-card-grid">
      <FoldCard title="..." href="...">
        <p class="card-desc">...</p>
      </FoldCard>
    </CardGrid>
  </div>
</section>
```

### Available CSS Classes

#### Base Classes

- `.fold` - Base fold container with padding
- `.fold--light` - Light background variant
- `.fold--muted` - Muted background variant
- `.fold--alternate` - Alternate background variant

#### Layout Classes

- `.full-bleed` - Full viewport width container
- `.fold-grid` - Two-column grid layout
- `.fold-card-grid` - Responsive card grid (3 columns → 1 column)

#### Component Classes

- `.fold-card` - Shared card styling with hover effects
- `.fold-1`, `.fold-2`, `.fold-3` - Fold-specific containers
- `.fold-1-header`, `.fold-2-header`, `.fold-3-header` - Fold-specific headers

#### Responsive Breakpoints

- `1024px` - Tablet styles
- `768px` - Mobile styles
- `640px` - Small mobile styles
- `480px` - Extra small mobile styles

## Component Structure

### FoldCard Component

A shared card component that provides consistent styling:

```astro
<FoldCard title="Card Title" href="/link">
  <p class="card-desc">Description text</p>
</FoldCard>
```

### SharedStyles Component

Imports centralized styles for use in fold components:

```astro
<SharedStyles />
```

## Best Practices

### 1. Use Shared Components

- Always use `FoldCard` instead of custom card implementations
- Leverage `CardGrid` with `fold-card-grid` class for consistent layouts

### 2. Follow Naming Conventions

- Use `.fold-{number}-*` pattern for fold-specific styles
- Use `.fold-card-*` for shared card styles
- Use `.fold-*` for base fold utilities

### 3. Maintain Responsive Design

- Test all fold components at all breakpoints
- Use the established responsive classes in `folds.css`
- Follow mobile-first approach

### 4. Style Organization

- Add new fold styles to `folds.css`, not individual components
- Group related styles together with clear comments
- Use CSS custom properties for consistent values

## Adding New Folds

When creating a new fold component:

1. **Create the component** with appropriate CSS classes
2. **Add fold-specific styles** to `folds.css`
3. **Include SharedStyles** component for centralized styles
4. **Test responsiveness** at all breakpoints
5. **Update this documentation** with new classes/features

Example new fold structure:

```astro
<!-- Fold4.astro -->
<SharedStyles />

<section class="fold fold--light fold-4 full-bleed">
  <FoldHeader className="fold-4-header" ... />
  <div class="fold-4-content">
    <!-- Content -->
  </div>
</section>
```

## Maintenance

### Updating Styles

- Modify `folds.css` for global fold style changes
- Update component-specific styles in their respective sections
- Test across all fold components after changes

### Adding New Features

- Document new CSS classes in this README
- Follow established naming patterns
- Consider responsive implications

### Performance Considerations

- Styles are imported once via `SharedStyles.astro`
- Minimize CSS specificity to avoid override conflicts
- Use CSS custom properties for themeable values

## Migration Notes

This system replaced scattered styles from:

- Individual fold component `<style>` blocks
- Global styles in `index.astro`
- Duplicate card styling in Fold2 and Fold3

Benefits of the new system:

- **Reduced duplication** - Single source of truth for styles
- **Better maintainability** - Centralized style management
- **Consistent design** - Shared components ensure uniformity
- **Improved performance** - Reduced CSS redundancy
