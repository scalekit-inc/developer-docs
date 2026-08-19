/**
 * Shared Scalar "Request Example" client picker for /apis, /agentkit/apis,
 * and /saaskit/apis.
 *
 * Persist the selected client globally across endpoints. Scalar stores this
 * preference under scalar-reference-selected-client-v2.
 *
 * Seed: first visit writes shell/curl; every visit writes colorMode=light.
 * Call seed synchronously before <ScalarComponent> hydrates so first paint
 * does not flash a different client.
 *
 * Bridge: Scalar only emits scalar-update-selected-client for non-custom
 * http-clients. SDK examples use custom/{lang} ids, so Scalar does not emit
 * that event. This bridge makes SDK selection global for inline request
 * examples only (skip [role="dialog"]).
 */

export const SELECTED_CLIENT_KEY = 'scalar-reference-selected-client-v2'
export const DEFAULT_CLIENT_ID = 'shell/curl'
export const COLOR_MODE_KEY = 'colorMode'
export const DEFAULT_COLOR_MODE = 'light'

// Scalar generates SDK examples from OpenAPI `x-codeSamples` and assigns them
// ids in the form `custom/<lang>`. For our spec, those SDK labels are consistent
// and map cleanly.
export const SDK_LABEL_TO_CLIENT_ID = new Map([
  ['Node.js SDK', 'custom/javascript'],
  ['Python SDK', 'custom/python'],
  ['Go SDK', 'custom/go'],
  ['Java SDK', 'custom/java'],
])

const pickerState = new WeakMap()

export function normalizePickerLabel(value) {
  return (value ?? '').replace(/\s+/g, ' ').trim()
}

export function clientIdFromPickerLabel(label) {
  return SDK_LABEL_TO_CLIENT_ID.get(normalizePickerLabel(label))
}

export function seedScalarClientPicker(storage) {
  try {
    const store = storage ?? globalThis.localStorage
    if (!store?.getItem(SELECTED_CLIENT_KEY)) {
      // Default to cURL on first visit (matches the previous `defaultHttpClient` behavior).
      store.setItem(SELECTED_CLIENT_KEY, DEFAULT_CLIENT_ID)
    }
    // Force Scalar into light mode regardless of system preference or stale localStorage.
    store.setItem(COLOR_MODE_KEY, DEFAULT_COLOR_MODE)
  } catch {
    // Ignore storage errors (private mode, blocked storage, etc.)
  }
}

function getPickerState(root) {
  let state = pickerState.get(root)
  if (!state) {
    state = {
      observedButtons: new WeakSet(),
      pageObserver: null,
    }
    pickerState.set(root, state)
  }
  return state
}

function getObserveTarget(root) {
  return root.documentElement ?? root
}

function queryAll(root, selector) {
  if (typeof root.querySelectorAll !== 'function') return []
  return root.querySelectorAll(selector)
}

function findScalarInstanceRoot(el, root) {
  const closest = el?.closest?.('[id^="scalar-client-"]')
  if (closest) return closest
  if (typeof root.getElementById === 'function') {
    return root.getElementById('scalar-client-0')
  }
  return root.querySelector?.('#scalar-client-0') ?? null
}

function syncCustomClientSelection(sourceEl, root) {
  if (!(sourceEl instanceof Element)) return
  // Keep this scoped to inline request examples, not the API client drawer/modal.
  if (sourceEl.closest?.('[role="dialog"]')) return

  const card = sourceEl.closest?.('.request-card')
  if (!card) return

  const pickerButton = card.querySelector('[data-testid="client-picker"]')
  if (!(pickerButton instanceof HTMLElement)) return

  const clientId = clientIdFromPickerLabel(pickerButton.textContent)
  if (!clientId) return

  try {
    const store = globalThis.localStorage
    const current = store?.getItem(SELECTED_CLIENT_KEY)
    if (current === clientId) return

    store.setItem(SELECTED_CLIENT_KEY, clientId)

    // Dispatch on the Scalar instance root so only that app instance updates.
    const instanceRoot = findScalarInstanceRoot(card, root)
    instanceRoot?.dispatchEvent(
      new CustomEvent('scalar-update-selected-client', {
        detail: clientId,
        bubbles: true,
        composed: true,
        cancelable: false,
      }),
    )
  } catch {
    // Ignore storage/DOM errors
  }
}

/**
 * Watch request-card client pickers and persist SDK selections globally.
 * Idempotent per root: ClientRouter can re-call this without stacking observers.
 */
export function initScalarClientPicker(root = document) {
  const state = getPickerState(root)
  const ElementCtor = globalThis.HTMLElement ?? globalThis.Element

  const attachObservers = () => {
    queryAll(root, '[data-testid="client-picker"]').forEach((btn) => {
      if (ElementCtor && !(btn instanceof ElementCtor)) return
      if (state.observedButtons.has(btn)) return

      state.observedButtons.add(btn)

      const observer = new MutationObserver(() => syncCustomClientSelection(btn, root))
      observer.observe(btn, { childList: true, subtree: true, characterData: true })
    })
  }

  if (!state.pageObserver) {
    // The SDK picker is a teleported combobox. It doesn't reliably emit a DOM
    // `change` event, so we watch for the selected label (the
    // `data-testid="client-picker"` button text) to change.
    // Attach initial observers and keep watching for new request cards as the
    // user navigates.
    state.pageObserver = new MutationObserver(() => attachObservers())
    state.pageObserver.observe(getObserveTarget(root), { childList: true, subtree: true })
  }

  attachObservers()
  return state
}
