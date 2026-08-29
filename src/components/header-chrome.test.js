import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '../..')
const toggle = readFileSync(
  join(root, 'src/components/overrides/HeaderProductToggle.astro'),
  'utf8',
)

test('product menu stacks options without an extra flex gap', () => {
  const open = toggle.slice(
    toggle.indexOf('.product-dropdown.is-open .product-dropdown__menu'),
    toggle.indexOf('@media (prefers-reduced-motion'),
  )
  assert.match(open, /gap:\s*0/)
  assert.equal(open.includes('gap: 0.25rem'), false)
})

test('product menu sits 8pt below the chip', () => {
  assert.match(toggle, /top:\s*calc\(100% \+ 0\.5rem\)/)
  assert.equal(toggle.includes('headerBox.bottom'), false)
  assert.equal(toggle.includes("closest('.header')"), false)
})

test('selected product option has no fill', () => {
  const active = toggle.slice(toggle.indexOf('.product-dropdown__item.is-active {'))
  assert.match(active, /background:\s*transparent/)
})
