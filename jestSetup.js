const originalConsoleError = console.error

console.error = message => {
  if (/(Failed prop type)/.test(message)) {
    throw new Error(message)
  }

  originalConsoleError(message)
}

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {}
    }
  }
