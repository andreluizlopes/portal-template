import React from 'react'
import PropTypes from 'prop-types'

const StructuredData = ({ data, multipleData }) =>
  <>
    {data && <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: data }} />}
    {multipleData.map((singleData, index) =>
      singleData.data && <script key={index} type='application/ld+json' dangerouslySetInnerHTML={{ __html: singleData.data }} />
    )}
  </>

StructuredData.propTypes = {
  data: PropTypes.string,
  multipleData: PropTypes.array
}

StructuredData.defaultProps = {
  data: '',
  multipleData: [{ data: '' }]
}

export default StructuredData
