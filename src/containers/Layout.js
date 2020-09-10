import React from 'react'
import PropTypes from 'prop-types'

import Helmet from '../components/Helmet'
import Header from './Header'
import Relations from './Relations'
import Footer from './Footer'
import { UIBase, ConversionBar } from '@escaletech/escale-components'

const Layout = ({ provider, children, document, layout, docType, relations, rating, uid, articleList, home }) => {
  const generalInfo = layout.data.general_info.data

  return (
    <>
      <Helmet
        document={document.data}
        favicon={generalInfo ? generalInfo.favicon : null}
      />
      <Header
        provider={provider}
        menu={layout.data && layout.data.menu}
        hasToolbar={layout.data.has_toolbar}
        toolbar={layout.data && layout.data.toolbar}
        home={home}
        logo={generalInfo ? generalInfo.logo : null}
      />
      {children}
      {relations && <Relations relations={relations[0]} rating={rating} articleList={articleList} uid={uid} constrains={docType === 'article' ? 883 : true} />}
      {((layout.data && layout.data.conversion_bar && layout.data.conversion_bar[0].conversion_text.length) ||
      (document && document.data.conversion_bar && document.data.conversion_bar.length)) &&
        <UIBase
          component={ConversionBar}
          horizontalMargin={0}
          style={{ minHeight: '80px' }}
          layoutData={layout.data.conversion_bar[0]}
          pageData={document && document.data.conversion_bar[0]}
        />}
      {layout.data && <Footer data={layout.data} docType={docType} provider={provider} />}
    </>
  )
}

Layout.propTypes = {
  provider: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]),
  document: PropTypes.object,
  layout: PropTypes.object,
  docType: PropTypes.string,
  relations: PropTypes.array,
  rating: PropTypes.object,
  uid: PropTypes.string,
  articleList: PropTypes.array,
  home: PropTypes.bool
}

export default Layout
