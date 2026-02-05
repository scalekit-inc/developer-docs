/**
 * Pylon Chat Widget Configuration
 *
 * Initializes the Pylon chat widget with user session data.
 * Sets up window.pylon config before the widget script loads.
 *
 * Reference: https://docs.usepylon.com/pylon-docs/chat-widget/chat-setup
 */

;(function () {
  'use strict'

  // Pylon App ID
  var PYLON_APP_ID = '32a58676-d739-4f5c-9d97-2f28f9deb8a6'
  var SUPPORT_HASH_KEY = 'sk_support_hash'

  /**
   * Helper to safely get session from localStorage
   */
  var getSession = function () {
    try {
      var raw = localStorage.getItem('sk_auth_session')
      if (!raw) return null
      var session = JSON.parse(raw)
      return session && typeof session === 'object' ? session : null
    } catch (e) {
      return null
    }
  }

  /**
   * Sanitize email address
   */
  var sanitizeEmail = function (candidate) {
    if (typeof candidate !== 'string' || candidate.length === 0 || candidate.length > 254) {
      return null
    }
    if (
      candidate.indexOf('@') > 0 &&
      candidate.indexOf('@') < candidate.length - 1 &&
      candidate.indexOf('<') === -1 &&
      candidate.indexOf('>') === -1
    ) {
      return candidate.trim().toLowerCase()
    }
    return null
  }

  /**
   * Sanitize name
   */
  var sanitizeName = function (candidate) {
    if (typeof candidate !== 'string' || candidate.length === 0 || candidate.length > 200) {
      return null
    }
    var sanitized = candidate.replace(/<[^>]*>/g, '').trim()
    return sanitized.length > 0 ? sanitized : null
  }

  /**
   * Fetch email_hash from backend API
   * The email_hash is calculated server-side by ScaleKit for identity verification
   */
  var fetchEmailHash = function () {
    return fetch('/api/v1/users/support-hash', {
      method: 'GET',
      credentials: 'include',
    })
      .then(function (response) {
        if (!response.ok) return null
        return response.json()
      })
      .then(function (data) {
        if (!data) return null
        return data.support_hash || data.email_hash || null
      })
      .catch(function () {
        return null
      })
  }

  var getCachedSupportHash = function () {
    try {
      var cached = localStorage.getItem(SUPPORT_HASH_KEY)
      if (!cached) return null
      return cached
    } catch (e) {
      return null
    }
  }

  var setCachedSupportHash = function (supportHash) {
    try {
      if (!supportHash) return
      localStorage.setItem(SUPPORT_HASH_KEY, supportHash)
    } catch (e) {}
  }

  /**
   * Initialize Pylon configuration
   */
  var initializePylonConfig = function () {
    var session = getSession()

    if (!session || !session.authenticated) {
      return false
    }

    var claims =
      session.idTokenClaims && typeof session.idTokenClaims === 'object'
        ? session.idTokenClaims
        : {}
    var user = session.user && typeof session.user === 'object' ? session.user : {}

    // Extract email
    var email = sanitizeEmail(user.email) || sanitizeEmail(claims.email) || null

    // Extract name
    var name = null
    var nameCandidates = [
      user.name,
      claims.given_name && claims.family_name
        ? String(claims.given_name) + ' ' + String(claims.family_name)
        : null,
      claims.name,
    ]
    for (var j = 0; j < nameCandidates.length; j++) {
      name = sanitizeName(nameCandidates[j])
      if (name) break
    }

    // Extract uid (sub) and xoid
    var uid = null
    var uidCandidates = [claims.sub, claims.uid, session.uid]
    for (var k = 0; k < uidCandidates.length; k++) {
      if (typeof uidCandidates[k] === 'string' && uidCandidates[k].length > 0) {
        uid = uidCandidates[k]
        break
      }
    }

    var xoid = null
    var xoidCandidates = [claims.xoid, session.xoid]
    for (var m = 0; m < xoidCandidates.length; m++) {
      if (typeof xoidCandidates[m] === 'string' && xoidCandidates[m].length > 0) {
        xoid = xoidCandidates[m]
        break
      }
    }

    // Use email as name fallback
    if (!name && email) {
      name = email
    }

    console.log('[pylon] derived user for widget', {
      hasEmail: !!email,
      hasName: !!name,
      hasUid: !!uid,
      hasXoid: !!xoid,
    })

    // Build config object
    var pylonConfig = {
      chat_settings: {
        app_id: PYLON_APP_ID,
        email: email || undefined,
        name: name || undefined,
        account_external_id: xoid || undefined, // Workspace ID for Pylon
      },
    }

    // Add user_id if available
    if (uid) {
      pylonConfig.user_id = uid
    }

    // Fetch and add support_hash from backend API for identity verification
    if (email) {
      var cachedSupportHash = getCachedSupportHash()
      if (cachedSupportHash) {
        pylonConfig.chat_settings.email_hash = cachedSupportHash
        window.pylon = pylonConfig
        console.log('[pylon] support_hash loaded from cache')
      } else {
        fetchEmailHash().then(function (supportHash) {
          if (supportHash) {
            pylonConfig.chat_settings.email_hash = supportHash
            setCachedSupportHash(supportHash)
            console.log('[pylon] support_hash fetched from API')
          }
          // Set config (update if already set)
          window.pylon = pylonConfig
          console.log('[pylon] config set:', window.pylon)
        })
      }
    } else {
      // Set config immediately if no email
      window.pylon = pylonConfig
      console.log('[pylon] config set:', window.pylon)
    }

    return true
  }

  /**
   * Wait for authenticated session before configuring Pylon
   */
  var waitForAuthenticatedSession = function (attempts) {
    attempts = attempts || 0
    if (initializePylonConfig()) {
      return
    }

    if (attempts < 50) {
      setTimeout(function () {
        waitForAuthenticatedSession(attempts + 1)
      }, 100)
    } else {
      console.log('[pylon] no authenticated session found after wait')
    }
  }

  // Initialize when script loads
  waitForAuthenticatedSession()
})()
