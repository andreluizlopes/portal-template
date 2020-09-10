import React from 'react'
import PropTypes from 'prop-types'

import Slices from './Slices'
import Layout from '../../containers/Layout'
import replaceVars from '../HOC/replaceVars'

import {
  BannerBox,
  BreadCrumb,
  UIBase,
  StructuredData,
  ModalStalker,
  Modal
} from '@escaletech/escale-components'

const Generic = ({ document, provider }) =>
  <div className={provider}>
    <Layout
      provider={provider}
      document={document}
      layout={document.data.layout}
      docType={document.type}
      relations={document.data.relations}
      articleList={document.data.article_list}
      uid={document.uid}
    >
      <main>
        <UIBase constrains component={BreadCrumb} marginTop={0} marginBottom={0} items={document.data.breadcrumb} background='var(--be-bg-secondary)' />
        <UIBase constrains horizontalMargin={0} component={BannerBox} marginTop={0} {...document.data.banner[0]} box={document.data.box} provider={provider} />
        <Slices provider={provider} slices={document.data.body} />
      </main>
    </Layout>
    <StructuredData data={document.data.google_structured_data} multipleData={document.data.structured_data} />
    {document.data.layout.data.modal && document.data.layout.data.modal.map((item, index) =>
      (item.type === 'stalker')
        ? <ModalStalker key={index} modal={item} />
        : <Modal key={index} id={item.id} title={item.title} content={item.content} />
    )}
  </div>

Generic.propTypes = {
  document: PropTypes.object.isRequired,
  provider: PropTypes.string,
  rating: PropTypes.object
}

export default replaceVars(Generic)
