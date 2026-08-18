import { test } from 'node:test'
import assert from 'node:assert/strict'
import { bindToggleAll, getPageMethods } from './sdk-client-page.js'

function createNode(tagName, props = {}) {
  const classSet = new Set()
  const attrs = {}
  const listeners = {}

  if (props.className) {
    for (const name of props.className.split(/\s+/).filter(Boolean)) {
      classSet.add(name)
    }
  }

  const node = {
    tagName: String(tagName).toUpperCase(),
    children: [],
    parentNode: null,
    textContent: props.textContent ?? '',
    open: Boolean(props.open),
    dataset: {},
    classList: {
      add(...names) {
        names.forEach((name) => classSet.add(name))
      },
      remove(...names) {
        names.forEach((name) => classSet.delete(name))
      },
      toggle(name, force) {
        if (force === true) {
          classSet.add(name)
          return true
        }
        if (force === false) {
          classSet.delete(name)
          return false
        }
        if (classSet.has(name)) {
          classSet.delete(name)
          return false
        }
        classSet.add(name)
        return true
      },
      contains(name) {
        return classSet.has(name)
      },
    },
    setAttribute(name, value) {
      attrs[name] = String(value)
    },
    getAttribute(name) {
      return Object.hasOwn(attrs, name) ? attrs[name] : null
    },
    querySelector(selector) {
      return queryAll(node, selector)[0] ?? null
    },
    querySelectorAll(selector) {
      return queryAll(node, selector)
    },
    cloneNode() {
      const clone = createNode(tagName, {
        className: [...classSet].join(' '),
        textContent: node.textContent,
        open: node.open,
      })
      for (const [name, value] of Object.entries(attrs)) {
        clone.setAttribute(name, value)
      }
      return clone
    },
    replaceWith(other) {
      const parent = node.parentNode
      if (!parent) return
      const index = parent.children.indexOf(node)
      parent.children[index] = other
      other.parentNode = parent
      node.parentNode = null
    },
    appendChild(child) {
      child.parentNode = node
      node.children.push(child)
      return child
    },
    addEventListener(type, fn, opts) {
      if (!listeners[type]) listeners[type] = []
      listeners[type].push({
        fn,
        capture: opts === true || opts?.capture === true,
      })
    },
    click() {
      dispatchClick(node)
    },
    _listeners: listeners,
  }

  return node
}

function walk(node, acc = []) {
  for (const child of node.children) {
    acc.push(child)
    walk(child, acc)
  }
  return acc
}

function matchesSimple(el, selector) {
  if (selector.startsWith('.')) return el.classList.contains(selector.slice(1))
  const tagged = /^([a-z][\w-]*)?\.([\w-]+)$/i.exec(selector)
  if (tagged) {
    if (tagged[1] && el.tagName !== tagged[1].toUpperCase()) return false
    return el.classList.contains(tagged[2])
  }
  return el.tagName === selector.toUpperCase()
}

function matchesSelector(el, selector) {
  const tokens = selector.split(/\s+/).filter(Boolean)
  if (tokens.length === 1) return matchesSimple(el, tokens[0])
  if (!matchesSimple(el, tokens[tokens.length - 1])) return false
  let ancestor = el.parentNode
  let tokenIndex = tokens.length - 2
  while (ancestor && tokenIndex >= 0) {
    if (matchesSimple(ancestor, tokens[tokenIndex])) tokenIndex -= 1
    ancestor = ancestor.parentNode
  }
  return tokenIndex < 0
}

function queryAll(root, selector) {
  const seen = new Set()
  const out = []
  const parts = selector
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
  for (const el of walk(root)) {
    if (parts.some((part) => matchesSelector(el, part)) && !seen.has(el)) {
      seen.add(el)
      out.push(el)
    }
  }
  return out
}

function dispatchClick(el) {
  const event = {
    type: 'click',
    defaultPrevented: false,
    propagationStopped: false,
    immediateStopped: false,
    preventDefault() {
      this.defaultPrevented = true
    },
    stopPropagation() {
      this.propagationStopped = true
    },
    stopImmediatePropagation() {
      this.immediateStopped = true
      this.propagationStopped = true
    },
  }

  const list = el._listeners.click ?? []
  for (const { fn, capture } of list.filter((entry) => entry.capture)) {
    if (event.immediateStopped) break
    fn(event)
  }
  if (!event.propagationStopped) {
    for (const { fn, capture } of list.filter((entry) => !entry.capture)) {
      if (event.immediateStopped) break
      fn(event)
    }
  }
  return event
}

function fakeClassBrowserPage(methodOpen = [false, false, false]) {
  const page = createNode('div', { className: 'sdk-client-page' })
  const chromeWrap = createNode('div', { className: 'sdk-client-chrome' })
  const chrome = createNode('div', { className: 'cb-browser' })
  const toggle = createNode('button', { className: 'cb-toggle-all' })
  const copy = createNode('button', { className: 'cb-copy-json' })

  chrome.appendChild(toggle)
  chrome.appendChild(copy)
  chromeWrap.appendChild(chrome)
  page.appendChild(chromeWrap)

  const methods = methodOpen.map((open, index) => {
    const section = createNode('div', { className: 'sdk-method-section' })
    const method = createNode('details', { className: 'cb-method', open })
    const summary = createNode('summary')
    const label = createNode('span', {
      className: 'cb-hl',
      textContent: `method${index}`,
    })
    summary.appendChild(label)
    method.appendChild(summary)
    section.appendChild(method)
    page.appendChild(section)
    return method
  })

  return { page, chrome, toggle, copy, methods }
}

test('clone replaces the original control so the old node has no listener', () => {
  const { page, chrome, toggle, methods } = fakeClassBrowserPage([false, false, false])
  let packageRan = false
  toggle.addEventListener('click', () => {
    packageRan = true
    methods[0].open = false
  })

  const bound = bindToggleAll(page, chrome)
  const current = chrome.querySelector('.cb-toggle-all')

  assert.ok(bound)
  assert.notEqual(current, toggle)
  assert.equal(toggle.parentNode, null)
  assert.equal(current.parentNode, chrome)
  assert.equal(toggle._listeners.click.length, 1)
  assert.equal(current._listeners.click.length, 1)
  assert.equal(current._listeners.click[0].capture, true)

  current.click()

  assert.equal(packageRan, false)
  assert.deepEqual(
    methods.map((method) => method.open),
    [true, true, true],
  )
})

test('click expand-all opens every method', () => {
  const { page, chrome, methods } = fakeClassBrowserPage([false, false, false])
  bindToggleAll(page, chrome)

  chrome.querySelector('.cb-toggle-all').click()

  assert.equal(getPageMethods(page).length, 3)
  assert.ok(methods.every((method) => method.open))
})

test('when all methods are open, click collapses all', () => {
  const { page, chrome, methods } = fakeClassBrowserPage([true, true, true])
  bindToggleAll(page, chrome)

  chrome.querySelector('.cb-toggle-all').click()

  assert.ok(methods.every((method) => !method.open))
})

test('mixed open and closed expands all instead of collapsing', () => {
  const { page, chrome, methods } = fakeClassBrowserPage([true, false, true])
  bindToggleAll(page, chrome)

  chrome.querySelector('.cb-toggle-all').click()

  assert.ok(methods.every((method) => method.open))
})
