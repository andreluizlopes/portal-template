import React from 'react'
import PropTypes from 'prop-types'
import Loadable from 'react-loadable'

import api from '../prismic'
import { compose } from '../utils/misc'
import handleRelationshipContent from './handleRelationshipContent'
import memoized from './HOC/memoized'
import analyticsWrapper from './HOC/analyticsWrapper'
import styledPage from './HOC/styledPage'
import { Loading } from '@escaletech/escale-components'
import NotFound from './NotFound'

import queryString from 'querystring'

const Generic = Loadable({
  loader: () => import(/* webpackChunkName: 'generic' */ './Generic'),
  loading: Loading
})

const pageTypes = [
  {
    prismicType: 'generic',
    page: Generic
  },
  {
    prismicType: 'redirect',
    page: Generic
  },
  {
    prismicType: 'not_found',
    page: NotFound
  }
]

const getPageByType = type => {
  const pt = pageTypes.find(elem => elem.prismicType === type)
  return pt ? pt.page : NotFound
}

const RouterPage = props => {
  const { type, done, ...rest } = props
  const Page = getPageByType(type)
  return done ? <Page {...rest} /> : <Loading />
}

const handleRedirect = (req, res, document) => {
  let { redirecturl, redirectcode } = (document && document.data) || {}
  if (req && res && redirecturl) {
    if (req.query && Object.keys(req.query).length) {
      redirecturl = redirecturl + '&' + queryString.stringify(req.query)
    }
    return res.redirect(parseInt(redirectcode) || 301, redirecturl)
  }
  return document
}

RouterPage.getInitialProps = ({ req, res, match }) => {
  const param = match.params[0].substring(1).replace(/^\/|\/$/g, '').replace(/\//g, '--') || 'home'
  if (match.url.includes('--')) res.redirect(301, match.url.replace('--', '/'))

  return api(req)
    .then(s => s.getByUID(pageTypes.map(page => page.prismicType), param))
    .then(document => handleRedirect(req, res, document))
    .then(document => handleRelationshipContent(req, document))
    .then(document => document || {})
    .then(async document => {
      return ({
        type: document.type,
        slug: document.uid,
        Page: getPageByType(document.type),
        document,
        done: true
      })
    })
    .then(({ Page, document, slug, ...props }) => Page && Page.getInitialProps
      ? Page.getInitialProps({ req, res, match, document, slug })
        .then(newProps => ({ document, slug, ...props, ...newProps }))
      : ({ document, slug, ...props }))
    .then(props => {
      const provider = match.url.split('/')[1] || ''

      return { ...props, provider }
    })
    .catch(console.error)
}

RouterPage.propTypes = {
  type: PropTypes.string,
  done: PropTypes.bool
}

export default compose(styledPage, memoized, analyticsWrapper)(RouterPage)
