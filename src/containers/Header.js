import React, { useEffect, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import PropTypes from 'prop-types'

import { device } from '../components/Grid/breakpoints'
import { Container } from '../components/UIBase'
import { LinkDuo } from '@escaletech/escale-components'
import ToolBar from './ToolBar'
import Menu from '../components/Menu'

const Header = ({ provider, menu, hasToolbar, toolbar, home, logo }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    global.window.addEventListener('scroll', handleScroll, { passive: true })
    return () => global.window.removeEventListener('scroll', handleScroll)
  }, [])

  let currentScroll = 0
  const minScroll = 85
  const handleScroll = () => {
    setVisible(currentScroll < minScroll || currentScroll > window.pageYOffset)
    currentScroll = window.pageYOffset
  }

  return (
    <S.Header className={visible ? 'visible' : 'hide'} provider={provider}>
      {hasToolbar && <ToolBar provider={provider} toolbar={toolbar} home={home} />}
      <Container constrains className='container'>
        {logo && logo.url &&
          <S.Logo>
            <LinkDuo to='/'> <S.ProviderLogo src={logo.url} alt={logo.alt} /></LinkDuo>
          </S.Logo>}
        <Menu menu={menu} />
      </Container>
      <GlobalStyle provider={provider} />
    </S.Header>
  )
}

const GlobalStyle = createGlobalStyle`
  #root {
    padding-top: 85px;

    @media ${device.desktop} {
      padding-top: 105px;
    }
  }
`

Header.propTypes = {
  provider: PropTypes.string,
  menu: PropTypes.array,
  toolbar: PropTypes.object,
  home: PropTypes.bool,
  hasToolbar: PropTypes.bool,
  logo: PropTypes.object
}

Header.defaultProps = {
  provider: '',
  menu: [],
  logo: {
    url: undefined,
    alt: undefined
  }
}

const S = {
  Header: styled.header`
    position: fixed;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 85px;
    background: var(--be-bg-secondary);
    border-bottom: 1px solid var(--be-border-primary);
    transition: transform .5s ease-out;

    &.hide {
      transform: translate3d(0, -105px, 0);
    }

    &.visible {
      transform: translate3d(0, 0, 0);
    }

    .container {
      position: relative;
      display: flex;
      align-items: center;
      height: 50px;
    }

    @media ${device.desktop} {
      height: 105px;

      .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
      }
    }
  `,
  Logo: styled.div`
    width: fit-content;

    @media ${device.desktop} {
      margin-top: 0;
    }
  `,
  ProviderLogo: styled.img`
    width: auto;
    height: 22px;

    @media ${device.desktop} {
      height: 27px;
    }
  `,
  AuthorizedAgent: styled.img`
    width: auto;
    height: 20px;
    margin-left: 12px;

    @media ${device.desktop} {
      height: 23px;
      margin-left: 27px;
    }
  `
}

export default Header
