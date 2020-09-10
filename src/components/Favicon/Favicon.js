import React from 'react'
import { Helmet } from 'react-helmet'

const Favicon = ({ favicon }) => {
  if (!favicon) {
    return null
  }
  return (
    <Helmet>
      <link rel='icon' type='image/png' sizes='32x32' href={favicon.url} />
      <link rel='icon' type='image/png' sizes='96x96' href={favicon['96x96'].url} />
      <link rel='icon' type='image/png' sizes='192x192' href={favicon['192x192'].url} />
      <link rel='apple-touch-icon' sizes='60x60' href={favicon['60x60'].url} />
      <link rel='apple-touch-icon' sizes='144x144' href={favicon['144x144'].url} />
      <meta name='msapplication-TileImage' content={favicon['144x144'].url} />
    </Helmet>
  )
}

export default Favicon
