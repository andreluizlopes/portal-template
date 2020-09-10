import React from 'react'
import styled from 'styled-components'
import { Link as RichLink } from 'prismic-reactjs'
import PropTypes from 'prop-types'

import { LinkDuo } from '@escaletech/escale-components'
import { linkResolver } from '../../../prismic'
import { device } from '../../../components/Grid/breakpoints'
import Collapse from '../../../components/Collapse'

const FooterNav = ({ nav }) =>
  <S.FooterNav data-component-name='FooterNav'>
    {nav.map(({ primary, items }, index) => (
      <S.Wrapper key={index}>
        <div className='desktop'>
          <S.ListTitle>
            <LinkDuo to={RichLink.url(primary.link, linkResolver)}>{primary.label}</LinkDuo>
          </S.ListTitle>
          <List items={items} />
        </div>
        <div className='mobile'>
          <Collapse title={primary.label}>
            <List items={items} />
          </Collapse>
        </div>
      </S.Wrapper>
    ))}
  </S.FooterNav>

const List = ({ items }) =>
  <S.List>
    {items.map((subItems, index) => (
      <S.ListItem key={index}>
        <LinkDuo to={RichLink.url(subItems.link, linkResolver)}>{subItems.label}</LinkDuo>
      </S.ListItem>
    ))}
  </S.List>

FooterNav.propTypes = {
  nav: PropTypes.array
}

FooterNav.defaultProps = {
  nav: []
}

const S = {
  FooterNav: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: fit-content;
    padding: var(--be-spacing-internal-07) var(--be-spacing-internal-05) var(--be-spacing-internal-02);
    margin: 0;
    list-style: none;

    @media ${device.desktop} {
      flex-direction: row;
      padding: 50px;
      border-bottom: 1px solid rgba(98, 126, 156, .21);
    }
  `,
  Wrapper: styled.div`
    display: inline-block;
    margin: 0;
    text-align: center;

    a, .collapse-title, .icon, .collapse-content a {
      color: var(--be-text-secondary);
    }

    a, .collapse-title {
      font-size: var(--be-font-size-body3);
      font-weight: var(--be-font-weight-semibold);
      line-height: var(--be-line-height-body3);
    }

    .collapse-title {
      border-bottom: 1px solid rgba(98, 126, 156, .21);
    }

    .collapse-content a {
      font-size: var(--be-font-size-body2);
    }

    .mobile { display: block; }
    .desktop { display: none; }

    @media ${device.desktop} {
      margin: 0 35px;

      .mobile { display: none; }
      .desktop { display: block; }
    }
  `,
  ListTitle: styled.p`
    margin: 0 0 7px;
    text-align: left;
  `,
  List: styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      margin: 0 0 7px;
      font-size: var(--be-font-size-body2);
      font-weight: var(--be-font-weight-regular);
    }
  `,
  ListItem: styled.li`
    display: flex;
    justify-content: start;
    margin: 0;
  `
}

export default FooterNav
