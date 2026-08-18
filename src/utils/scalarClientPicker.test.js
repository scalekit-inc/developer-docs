import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  SELECTED_CLIENT_KEY,
  DEFAULT_CLIENT_ID,
  COLOR_MODE_KEY,
  DEFAULT_COLOR_MODE,
  SDK_LABEL_TO_CLIENT_ID,
  clientIdFromPickerLabel,
  seedScalarClientPicker,
  initScalarClientPicker,
} from './scalarClientPicker.js'

function memoryStorage(initial = {}) {
  const data = { ...initial }
  return {
    getItem(key) {
      return Object.hasOwn(data, key) ? data[key] : null
    },
    setItem(key, value) {
      data[key] = String(value)
    },
    dump() {
      return { ...data }
    },
  }
}

test('seed writes cURL only when the client key is empty', () => {
  const storage = memoryStorage()
  seedScalarClientPicker(storage)
  assert.equal(storage.getItem(SELECTED_CLIENT_KEY), DEFAULT_CLIENT_ID)
  assert.equal(DEFAULT_CLIENT_ID, 'shell/curl')
})

test('seed keeps a stored client on return visits', () => {
  const storage = memoryStorage({ [SELECTED_CLIENT_KEY]: 'custom/javascript' })
  seedScalarClientPicker(storage)
  assert.equal(storage.getItem(SELECTED_CLIENT_KEY), 'custom/javascript')
})

test('seed always writes light colorMode', () => {
  const storage = memoryStorage({ [COLOR_MODE_KEY]: 'dark' })
  seedScalarClientPicker(storage)
  assert.equal(storage.getItem(COLOR_MODE_KEY), DEFAULT_COLOR_MODE)
  assert.equal(DEFAULT_COLOR_MODE, 'light')
})

test('seed ignores storage errors', () => {
  assert.doesNotThrow(() => seedScalarClientPicker(undefined))
  assert.doesNotThrow(() =>
    seedScalarClientPicker({
      getItem() {
        throw new Error('blocked')
      },
      setItem() {
        throw new Error('blocked')
      },
    }),
  )
})

test('label map matches the four SDK clients', () => {
  assert.equal(clientIdFromPickerLabel('Node.js SDK'), 'custom/javascript')
  assert.equal(clientIdFromPickerLabel('Python SDK'), 'custom/python')
  assert.equal(clientIdFromPickerLabel('Go SDK'), 'custom/go')
  assert.equal(clientIdFromPickerLabel('Java SDK'), 'custom/java')
  assert.deepEqual(
    [...SDK_LABEL_TO_CLIENT_ID.entries()],
    [
      ['Node.js SDK', 'custom/javascript'],
      ['Python SDK', 'custom/python'],
      ['Go SDK', 'custom/go'],
      ['Java SDK', 'custom/java'],
    ],
  )
})

test('label lookup trims whitespace and ignores unknown labels', () => {
  assert.equal(clientIdFromPickerLabel('  Node.js   SDK  '), 'custom/javascript')
  assert.equal(clientIdFromPickerLabel('cURL'), undefined)
  assert.equal(clientIdFromPickerLabel(''), undefined)
  assert.equal(clientIdFromPickerLabel(null), undefined)
})

test('init is idempotent on the same root', () => {
  const observes = []
  const previousObserver = globalThis.MutationObserver
  globalThis.MutationObserver = class {
    observe(target, options) {
      observes.push({ target, options })
    }
    disconnect() {}
  }

  try {
    const documentElement = { id: 'html' }
    const fakeRoot = {
      documentElement,
      querySelectorAll() {
        return []
      },
      getElementById() {
        return null
      },
    }

    initScalarClientPicker(fakeRoot)
    initScalarClientPicker(fakeRoot)

    assert.equal(observes.length, 1)
    assert.equal(observes[0].target, documentElement)
    assert.deepEqual(observes[0].options, { childList: true, subtree: true })
  } finally {
    globalThis.MutationObserver = previousObserver
  }
})
