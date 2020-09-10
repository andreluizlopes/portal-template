import prismic from '@escaletech/razzle-sdk/lib/prismic'
import { RichText, Link } from 'prismic-reactjs'

const dashToSlash = doc => doc.uid ? `/${doc.uid.split('--').join('/')}/` : '/'

const defaultPath = () => '/'

const knownTypes = {
  home: defaultPath,
  generic: dashToSlash,
  catalog: dashToSlash
}

export const renderRichText = (text, serializer = null) =>
  RichText.render(text, linkResolver, serializer)

export const renderLink = link => Link.url(link, linkResolver)

export const linkResolver = doc => (knownTypes[doc.type] || defaultPath)(doc)

export default prismic({
  env: process.env.ENV,
  hosts: {
    buran: '',
    prismic: 'portal-template.cdn.prismic.io',
    site: '%HOST%'
  },
  linkResolver
})
