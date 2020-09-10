import React from 'react'
import PropTypes from 'prop-types'
import { AfterRoot, AfterData } from '@jaredpalmer/after'
import { ServerStyleSheet } from 'styled-components'

const Document = props => {
  const { helmet, assets, data, styleTags, req } = props
  const htmlAttrs = helmet.htmlAttributes.toComponent()
  const bodyAttrs = helmet.bodyAttributes.toComponent()

  return (
    <html {...htmlAttrs} lang='pt-BR'>
      <head>
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {assets.client.css && (
          <link rel='stylesheet' href={assets.client.css} />
        )}
        {styleTags}
      </head>
      <body {...bodyAttrs}>
        <noscript id='deferred-styles' data-deferred-styles>
          <link href='https://fonts.googleapis.com/css?family=Montserrat:400,600,700|Roboto:400,700&display=swap' rel='stylesheet' />
        </noscript>
        <AfterRoot />
        <AfterData data={data} />
        <script
          src={assets.client.js}
          defer
          crossOrigin='anonymous'
        />
        <PrismicSdk req={req} />
        <script dangerouslySetInnerHTML={
          { __html: 'var loadDeferredStyles=function(){var addStylesNode=document.querySelectorAll("[data-deferred-styles]");addStylesNode.forEach(element=>{var replacement=document.createElement("div");replacement.innerHTML=element.textContent;document.body.appendChild(replacement);element.parentElement.removeChild(element);});};var raf=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;if(raf)raf(function(){window.setTimeout(loadDeferredStyles,0);});else window.addEventListener(\'load\',loadDeferredStyles);' }
        }
        />
      </body>
    </html>
  )
}

Document.propTypes = {
  helmet: PropTypes.object,
  assets: PropTypes.object,
  data: PropTypes.object,
  req: PropTypes.object,
  styleTags: PropTypes.object
}

Document.getInitialProps = async ({ req, assets, data, renderPage }) => {
  const sheet = new ServerStyleSheet()
  const page = await renderPage(App => props => sheet.collectStyles(<App {...props} />))
  const styleTags = sheet.getStyleElement()

  return { req, assets, data, ...page, styleTags }
}

const cookieExists = (cookies, cookieName) => cookies && cookies.indexOf(`${cookieName}=`) >= 0

const PrismicSdk = ({ req }) => {
  if (!cookieExists(req.headers.cookie, 'io.prismic.preview') && !req.query.preview) {
    return null
  }

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: 'window.prismic = {endpoint: "https://%HOST_PRISMIC%/api/v2"}' }} />
      <script defer src='//static.cdn.prismic.io/prismic.min.js' />
    </>
  )
}

PrismicSdk.propTypes = {
  req: PropTypes.shape({
    headers: PropTypes.shape({
      cookie: PropTypes.string
    }),
    query: PropTypes.shape({
      preview: PropTypes.bool
    })
  })
}

export default Document
