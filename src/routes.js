import buildRoutes from '@escaletech/razzle-sdk/lib/router'
import prismicSitemap from '@escaletech/razzle-sdk/lib/sitemap/prismic'
import prismicApi from './prismic'

const getGenericUrl = uid =>
  '/' + uid
    .replace(/--/g, '/')
    .replace(/home/g, '')

export default buildRoutes({
  '*': {
    loader: () => Promise.resolve(require('./pages/RouterPage')),
    chunkName: 'RouterPage',
    sitemap: prismicSitemap(prismicApi, ['generic'], getGenericUrl)
  }
})
