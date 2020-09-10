import uuid from 'uuid/v4'
import Cookies from 'js-cookie'

const cookieName = 'session_id'

const getSessionId = () => {
  const existing = Cookies.get(cookieName)
  if (existing) {
    return existing
  }

  const sessionId = uuid()
  Cookies.set(cookieName, sessionId)
  return sessionId
}

const sessionId = getSessionId()

const track = (name, body) => (global.analytics && global.analytics.track(name, body)) || true
const page = name => (global.analytics && global.analytics.page(name)) || true
const identify = body => (global.analytics && global.analytics.identify(sessionId, body)) || true

if (global.window && global.window.analytics) {
  global.window.analytics.identify(sessionId)
}

export default {
  track,
  page,
  identify,
  getSessionId
}
