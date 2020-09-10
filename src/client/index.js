import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ensureReady, After } from '@jaredpalmer/after'
import TagManager from 'react-gtm-module'

import routes from '../routes'
import { GlobalState } from '../hooks/useGlobalState'
import gtmArgs from './config'

TagManager.initialize(gtmArgs)

ensureReady(routes)
  .then(data =>
    hydrate(
      <GlobalState>
        <BrowserRouter>
          <After data={data} routes={routes} />
        </BrowserRouter>
      </GlobalState>,
      document.getElementById('root')
    )
  )

if (module.hot) {
  module.hot.accept()
}
