import React, { useRef, useEffect, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import PropTypes from 'prop-types'

import { device } from '../../components/Grid/breakpoints'
import Footernav from './Components/FooterNav'
import SocialMedia from './Components/SocialMedia'
import CityList from './Components/CityList'
import UIBase from '../../components/UIBase'

const Footer = ({ data, docType, provider }) => {
  const footer = useRef(false)
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    global.window.addEventListener('scroll', handleScroll, { passive: true })
    return () => global.window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = () => {
    const top = footer.current.getBoundingClientRect().top
    const offset = 200

    setVisible((top - offset) <= global.window.innerHeight)
  }

  const getSliceData = (slice) => {
    if (!data.footer) {
      return false
    }

    const filteredData = data.footer.filter(obj => obj.slice_type === slice)
    return filteredData.length ? filteredData[0].items : false
  }

  return (
    <S.Footer ref={footer} docType={docType} data-component-name='Footer'>
      {getSliceData('citylist') && <CityList items={getSliceData('citylist')} provider={provider} />}
      {data.footernav.length > 0 && <Footernav nav={data.footernav} />}
      {getSliceData('footerlinks') && <UIBase component={SocialMedia} marginTop={0} horizontalMargin={0} constrains items={getSliceData('footerlinks')} />}
      {isVisible && <GlobalStyle />}
    </S.Footer>
  )
}

Footer.propTypes = {
  data: PropTypes.object,
  docType: PropTypes.string,
  provider: PropTypes.string
}

Footer.defaultProps = {
  data: {},
  docType: '',
  provider: ''
}

const GlobalStyle = createGlobalStyle`
  :root {
    --position-conversionbar: 'static';
    --transform-conversionbar: 'translate3d(0, 0, 0)';
  }
`

const S = {
  Footer: styled.footer`
    font-size: var(--be-font-size-body2);
    line-height: var(--be-line-height-body2);
    color: var(--be-text-secondary);
    background: var(--be-bg-tertiary);

    a { text-decoration: none; }

    li { list-style: none; }
  `,
  FooterBar: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
    padding: var(--be-spacing-internal-05);

    .icon {
      font-size: 24px;
    }

    .logo {
      max-height: 22px;
      margin: 0 8px;
      font-size: 58px;
    }

    @media ${device.desktop} {
      padding: var(--be-spacing-internal-05) 0;
    }
  `,
  ByZelas: styled.div`
    display: flex;
    align-items: center;
    font-size: var(--be-font-size-caption2);
    font-weight: var(--be-font-weight-semibold);
    color: var(--be-text-primary-dark);
  `
}

export default Footer
