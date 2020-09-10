import express from 'express'
import pino from 'express-pino-logger'

import logger from './logger'

let app = require('./server').default

if (module.hot) {
  module.hot.accept('./server', function () {
    console.log('🔁  HMR Reloading `./server`...')
    try {
      app = require('./server').default
    } catch (error) {
      console.error(error)
    }
  })
  console.info('✅  Server-side HMR Enabled!')
}

const port = process.env.PORT || 3000

express()
  .use(pino({ logger }))
  .use((req, res) => app.handle(req, res))
  .listen(port, function (err) {
    if (err) {
      logger.error(err.toString())
      return
    }
    logger.info(`Started on port ${port}`)
  })
