import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { siteHost } from '../server/config'
import ReactHelmet from 'react-helmet'

import Favicon from '../components/Favicon'

const Helmet = ({ children, document, location, favicon }) => {
  const url = siteHost + location.pathname

  if (document.body) {
    document.body.map((item, i) => {
      if (item.slice_type === ('banner')) {
        document.banner = item.primary.image.url
        return document.banner
      }
    })
  }

  const meta = [
    (document && document.meta_description && { name: 'description', content: document.meta_description }) || {},
    (document && document.meta_robots && { name: 'robots', content: document.meta_robots }) || {},
    (document && document.canonical && { property: 'og:url', content: document.canonical }) || {},
    (document && document.meta_title && { property: 'og:title', content: document.meta_title }) || {},
    (document && document.thumbnail && { property: 'og:image', content: document.thumbnail.url }) || {},
    (document && document.banner && { property: 'og:image', content: document.banner }) || {},
    (document && document.layout && { property: 'og:locale', content: 'pt_BR' }) || {},
    (document && document.site && { property: 'og:site_name', content: 'Planos Tim' }) || {}
  ]
  const title = (document && document.meta_title) || ''
  const defaultURL = document.canonical || url
  const link = [
    { rel: 'canonical', href: defaultURL }
  ]

  return (
    <>
      <ReactHelmet meta={meta} title={title} link={link}>
        {children}
      </ReactHelmet>
      <Favicon favicon={favicon} />
    </>
  )
}

Helmet.propTypes = {
  document: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  location: PropTypes.object
}

Helmet.defaultProps = {
  document: {}
}

export default withRouter(Helmet)
