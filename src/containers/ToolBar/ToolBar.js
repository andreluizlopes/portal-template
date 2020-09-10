import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { LinkDuo } from '@escaletech/escale-components'
import { device } from '../../components/Grid/breakpoints'
import { Container } from '../../components/UIBase'
import logo from '../../images/logos/pp-dark.png'

const ToolBar = ({ provider, home }) =>
  <S.ToolBar data-component-name='ToolBar' provider={provider}>
    <Container constrains className='content'>
      {(!home || provider) &&
        <LinkDuo to='/' className='link'>
          <S.Logo src={logo} alt='contrateaqui' className='logo' />
        </LinkDuo>}
    </Container>
  </S.ToolBar>

ToolBar.propTypes = {
  provider: PropTypes.string,
  home: PropTypes.bool
}

const S = {
  ToolBar: styled.div`
    height: 35px;
    text-align: center;
    background: var(--be-bg-tertiary);

    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }

    .link {
      line-height: 0;
    }

    @media ${device.desktop} {
      .link {
        margin-right: calc(50% - 67.5px);
      }
    }
  `,
  Location: styled.a`
    display: flex;
    align-items: center;
    font-size: var(--be-font-size-caption1);
    color: var(--be-text-secondary);

    &:hover {
      color: var(--be-text-secondary);
    }

    &:only-child {
      margin: 0 auto;
    }

    .location-icon {
      margin-right: 6px;
      font-size: 16px;
    }

    .arrow-icon {
      margin-left: 6px;
      font-size: 8px;
    }

    @media ${device.desktop} {
      &:only-child {
        margin: unset;
      }
    }
  `,
  Logo: styled.img`
    width: 108px;
    height: auto;

    @media ${device.desktop} {
      width: 135px;
    }
  `

}

export default ToolBar
