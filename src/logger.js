const noOp = {
  info: () => {},
  warn: () => {},
  error: () => {},
  child: () => noOp
}

const prettyPrint = { levelFirst: true, colorize: true, translateTime: true }

export default global.window
  ? noOp
  : require('pino')({
    prettyPrint: process.env.NODE_ENV !== 'production' && prettyPrint,
    useLevelLabels: true
  })
