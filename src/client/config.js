const staging = {
  gtmId: ''
}
const production = {
  gtmId: ''
}

export default (global.window && global.window.location.host === '%HOST%')
  ? production
  : staging
