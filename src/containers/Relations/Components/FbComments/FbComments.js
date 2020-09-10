import React from 'react'
import { FacebookProvider, Comments } from 'react-facebook'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { siteHost } from '../../../../server/config'

const FbComments = (props) =>
  <S.Container>
    <FacebookProvider appId='1698801053671366'>
      <Comments href={siteHost + props.location.pathname} />
    </FacebookProvider>
  </S.Container>

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
  `
}

export default withRouter(FbComments)
