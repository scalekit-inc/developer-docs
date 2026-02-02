// Only initialize PostHog in production environments
const isLocalhost =
  window.location.host.includes('127.0.0.1') || window.location.host.includes('localhost')
const isNetlify = window.location.host.includes('netlify.app')

const SESSION_STORAGE_KEY = 'sk_auth_session'
const SESSION_POLL_INTERVAL_MS = 1000
const SESSION_POLL_MAX_ATTEMPTS = 30

const readSession = () => {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

const identifyFromSession = () => {
  if (!window.posthog || typeof window.posthog.identify !== 'function') return false
  const session = readSession()
  if (!session || !session.authenticated) return false

  const uid = typeof session.uid === 'string' ? session.uid : null
  const xoid = typeof session.xoid === 'string' ? session.xoid : null

  if (!uid && !xoid) return false

  const lastUid = window.posthog.__sk_last_uid || null
  const lastXoid = window.posthog.__sk_last_xoid || null
  if (uid && uid !== lastUid) {
    window.posthog.identify(uid)
    window.posthog.__sk_last_uid = uid
  }
  if (xoid && xoid !== lastXoid && typeof window.posthog.group === 'function') {
    window.posthog.group('workspace', xoid)
    window.posthog.__sk_last_xoid = xoid
  }

  return true
}

const resetPosthogIdentity = () => {
  if (!window.posthog || typeof window.posthog.reset !== 'function') return
  window.posthog.reset()
  window.posthog.__sk_last_uid = null
  window.posthog.__sk_last_xoid = null
}

const watchForSession = () => {
  let attempts = 0
  const poll = () => {
    attempts += 1
    if (identifyFromSession() || attempts >= SESSION_POLL_MAX_ATTEMPTS) {
      clearInterval(intervalId)
    }
  }

  const intervalId = setInterval(poll, SESSION_POLL_INTERVAL_MS)
  poll()
}

if (!isLocalhost && !isNetlify) {
  !(function (t, e) {
    var o, n, p, r
    e.__SV ||
      ((window.posthog = e),
      (e._i = []),
      (e.init = function (i, s, a) {
        function g(t, e) {
          var o = e.split('.')
          ;(2 == o.length && ((t = t[o[0]]), (e = o[1])),
            (t[e] = function () {
              t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
            }))
        }
        ;(((p = t.createElement('script')).type = 'text/javascript'),
          (p.crossOrigin = 'anonymous'),
          (p.async = !0),
          (p.src =
            s.api_host.replace('.i.posthog.com', '-assets.i.posthog.com') + '/static/array.js'),
          (r = t.getElementsByTagName('script')[0]).parentNode.insertBefore(p, r))
        var u = e
        for (
          void 0 !== a ? (u = e[a] = []) : (a = 'posthog'),
            u.people = u.people || [],
            u.toString = function (t) {
              var e = 'posthog'
              return ('posthog' !== a && (e += '.' + a), t || (e += ' (stub)'), e)
            },
            u.people.toString = function () {
              return u.toString(1) + '.people (stub)'
            },
            o =
              'init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId captureTraceFeedback captureTraceMetric'.split(
                ' ',
              ),
            n = 0;
          n < o.length;
          n++
        )
          g(u, o[n])
        e._i.push([i, s, a])
      }),
      (e.__SV = 1))
  })(document, window.posthog || [])

  // Initialize PostHog
  posthog.init('phc_85pLP8gwYvRCQdxgLQP24iqXHPRGaLgEw4S4dgZHJZ', {
    api_host: 'https://ph.scalekit.com',
    person_profiles: 'identified_only',
  })

  watchForSession()
}

if (isNetlify || isLocalhost) {
  !(function (t, e) {
    var o, n, p, r
    e.__SV ||
      ((window.posthog = e),
      (e._i = []),
      (e.init = function (i, s, a) {
        function g(t, e) {
          var o = e.split('.')
          ;(2 == o.length && ((t = t[o[0]]), (e = o[1])),
            (t[e] = function () {
              t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
            }))
        }
        ;(((p = t.createElement('script')).type = 'text/javascript'),
          (p.crossOrigin = 'anonymous'),
          (p.async = !0),
          (p.src =
            s.api_host.replace('.i.posthog.com', '-assets.i.posthog.com') + '/static/array.js'),
          (r = t.getElementsByTagName('script')[0]).parentNode.insertBefore(p, r))
        var u = e
        for (
          void 0 !== a ? (u = e[a] = []) : (a = 'posthog'),
            u.people = u.people || [],
            u.toString = function (t) {
              var e = 'posthog'
              return ('posthog' !== a && (e += '.' + a), t || (e += ' (stub)'), e)
            },
            u.people.toString = function () {
              return u.toString(1) + '.people (stub)'
            },
            o =
              'init Re Ms Fs Pe Rs Cs capture Ve calculateEventProperties Ds register register_once register_for_session unregister unregister_for_session zs getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Ls As createPersonProfile Ns Is Us opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing is_capturing clear_opt_in_out_capturing Os debug I js getPageViewId captureTraceFeedback captureTraceMetric'.split(
                ' ',
              ),
            n = 0;
          n < o.length;
          n++
        )
          g(u, o[n])
        e._i.push([i, s, a])
      }),
      (e.__SV = 1))
  })(document, window.posthog || [])
  posthog.init('phc_KUlqDD4PiELsO4iZiYdTI3syM4m9FfWcA9sTKgxfC0m', {
    api_host: 'https://ph.scalekit.com',
    defaults: '2025-05-24',
    person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
  })
  console.log('PostHog initialized - Staging')
  watchForSession()
}

window.addEventListener('storage', (event) => {
  if (event.key === SESSION_STORAGE_KEY) {
    if (!event.newValue) {
      resetPosthogIdentity()
      return
    }
    identifyFromSession()
  }
})
