import React from 'react'
import PropTypes from 'prop-types'

import Header from '../../containers/Header'
import Layout from '../../containers/Layout'
import UIBase from '../../components/UIBase'
import handleRelationshipContent from '../handleRelationshipContent'
import api from '../../prismic'

const NotFound = ({ document }) =>
  <div className='portal'>
    <Layout
      document={document}
      layout={document.data.layout}
      docType={document.type}
    >
      <UIBase constrains component={Header} marginTop={0} horizontalMargin={0} image={document.data.image} title={document.data.message} description={document.data.description} />
    </Layout>
  </div>

NotFound.propTypes = {
  document: PropTypes.object
}

NotFound.defaultProps = {
  document: {
    data: {
      layout: undefined
    },
    type: undefined
  }
}

NotFound.getInitialProps = async ({ req, res, match, history, location, ...ctx }) => {
  res && (res.statusCode = 404)
  const document = await api(req).then(s => s.getByUID(['not_found'], 'not-found'))
    .then(document => handleRelationshipContent(req, document))
    .then(document => ({ document }))

  return document
}

export default NotFound
