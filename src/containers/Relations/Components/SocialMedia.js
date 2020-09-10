import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router'

import { siteHost } from '../../../server/config'
import { device } from '../../../components/Grid/breakpoints'

import Facebook from '../Icons/facebook.png'
import Twitter from '../Icons/twitter.png'
import GPlus from '../Icons/gplus.png'
import Linkedin from '../Icons/linkedin.png'

const SocialMedia = (props) => {
  return (
    <S.Container>
      <S.Content className='facebook' href={'https://www.facebook.com/sharer.php?u=https%3A%2F%2F' + siteHost + props.match.url} target='_blank' >
        <S.Icon src={Facebook} alt='Facebook' />
      </S.Content>
      <S.Content className='twitter' href={'https://twitter.com/intent/tweet?url=https%3A%2F%2F' + siteHost + props.match.url} target='_blank' >
        <S.Icon src={Twitter} alt='Twitter' />
      </S.Content>
      <S.Content className='gplus' href={'https://plus.google.com/share?url=https%3A%2F%2F' + siteHost + props.match.url} target='_blank' >
        <S.Icon src={GPlus} alt='Google Plus' />
      </S.Content>
      <S.Content className='linkedin' href={'https://www.linkedin.com/cws/share?url=https://' + siteHost + props.match.url} target='_blank' >
        <S.Icon src={Linkedin} alt='Linkedin' />
      </S.Content>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
  `,
  Content: styled.a`
    width: 25%;
    padding: 3px;
    margin: 0 auto;
    font-size: var(--be-font-size-body1);
    text-align: center;
    text-decoration: none;
    background: var(--be-base-primary);
    border-top-right-radius: 100px;
    border-bottom-left-radius: 100px;

    &.facebook {
      background: #3b5998;
    }

    &.twitter {
      background: #00b6f1;
    }

    &.gplus {
      background: #df4a32;
    }

    &.linkedin {
      background: #007bb6;
    }
  `,
  Icon: styled.img`
    height: 20px;
    padding: 0;
    margin: 0;
    background: white;
    border: none;

    @media ${device.tablet} {
      height: 25px;
    }
  `
}

export default withRouter(SocialMedia)
