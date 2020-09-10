import React from 'react'
import express from 'express'
import pino from 'express-pino-logger'
import bodyParser from 'body-parser'
import { previewHandler, webhookHandler } from '@escaletech/razzle-sdk/lib/prismic'
import renderPageHandler, { preloadHandler } from '@escaletech/razzle-sdk/lib/renderer'
import sitemapHandler from '@escaletech/razzle-sdk/lib/sitemap'

import logger from '../logger'
import robots from './handlers/robots'
import emailHandler from './handlers/emailHandler'
import { GlobalState } from '../hooks/useGlobalState'
import { EnvProvider } from '@escaletech/escale-components'
import Document from './Document'
import routes from '../routes'
import prismicApi from '../prismic'
import { cloudFrontId, siteHost } from './config'

const server = express()

if (module.hot) {
  const httpProxy = require('http-proxy')
  const apiProxy = httpProxy.createProxyServer()
  server.all('/api/v2', (req, res) =>
    apiProxy.web(req, res, { changeOrigin: true, target: `https://${siteHost}` }))
}

const daysInSeconds = 24 * 60 * 60

const maxAge = seconds => (req, res, next) => {
  res.setHeader('Cache-Control', `public, max-age=${seconds}`)
  return next()
}

const preload = preloadHandler([
  '<https://fonts.googleapis.com/css?family=Montserrat:light,regular,semibold,bold%7cAbril+Fatface:light,regular,bold&display=swap>;',
  '<https://fonts.gstatic.com>; rel=preconnect'
])

const renderer = renderPageHandler({
  Document,
  routes,
  assets: require(process.env.RAZZLE_ASSETS_MANIFEST),
  chunks: require(process.env.RAZZLE_CHUNKS_MANIFEST),
  getApp (node) {
    return (
      <GlobalState>
        <EnvProvider.Provider value={{ siteHost: `https://${siteHost}` }}>
          {node}
        </EnvProvider.Provider>
      </GlobalState>)
  }
})

const prismicPreview = previewHandler(prismicApi)
const prismicWebhook = webhookHandler('', cloudFrontId)

server
  .use(pino({ logger }))
  .use((_, res, next) => res.removeHeader('x-powered-by') || next())
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR, { maxAge: '7 days' }))
  .use(emailHandler)
  .get('/robots.txt', robots)
  .get('/sitemap.xml', [maxAge(7 * daysInSeconds), sitemapHandler({ routes, host: siteHost })])
  .get('/preview', prismicPreview)
  .post('/_prismic-webhook', bodyParser.json(), prismicWebhook)
  .get('/_probe', maxAge(0), (req, res) => res.status(200).json({ version: process.env.COMMIT_HASH }))
  .get('/*', [maxAge(1 * daysInSeconds), preload, renderer])

export default server
