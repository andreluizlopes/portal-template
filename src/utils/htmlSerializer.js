import React from 'react'

import { siteHost } from '../server/config'

const HOST = `https://${siteHost}`

const htmlSerializer = (type, element, children, key) => {
  const url = element.data && element.data.url

  switch (type) {
    case 'hyperlink':
      if (element.data.link_type === 'Web' && url.startsWith(HOST)) {
        const url = element.data.url.replace(HOST, '')
        return (
          <a href={url} key={key}>
            {children}
          </a>
        )
      }
      return null
    default:
      return null
  }
}

export default htmlSerializer
