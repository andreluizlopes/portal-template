import React from 'react'

const store = {}

if (global.window) {
  try {
    const { __landingUrl, ...serverAppState } = JSON.parse(global.document.getElementById('server-app-state').innerText)
    store[__landingUrl] = { ...serverAppState }
  } catch (e) {
    console.warn(e)
  }
}

function memoized (WrappedComponent) {
  const Memoized = props =>
    <WrappedComponent {...props} />

  Memoized.getInitialProps = params => {
    const landingUrl = params.match.url
    return global.window && store[landingUrl]
      ? Promise.resolve(store[landingUrl])
      : WrappedComponent.getInitialProps(params).then(result => (store[landingUrl] = { ...result, __landingUrl: landingUrl, isLoaded: true }))
  }

  Memoized.displayName = `Memoized(${getDisplayName(WrappedComponent)})`

  return Memoized
}

export default memoized

function getDisplayName (WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
