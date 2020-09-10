import React from 'react'

import analytics from '../../client/analytics'

const analyticsWrapper = WrappedPage => {
  const AnalyticsWrapper = props => {
    React.useEffect(() => {
      analytics.page()
    }, [])

    return <WrappedPage {...props} />
  }

  AnalyticsWrapper.getInitialProps = WrappedPage.getInitialProps

  return AnalyticsWrapper
}

export default analyticsWrapper
