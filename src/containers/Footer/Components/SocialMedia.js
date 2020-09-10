import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { device } from '../../../components/Grid/breakpoints'
import { renderRichText } from '../../../prismic'
import LogoTim from '../../../images/logos/tim.png'
import { lastUpdated } from '../lastUpdated'

const SocialMedia = ({ items }) =>
  <S.SocialMedia data-component-name='SocialMedia'>
    <S.Wrapper>
      <img src={LogoTim} className='logo-tim' />
      <S.LastUpdated>Última atualização do site: {lastUpdated()}</S.LastUpdated>
    </S.Wrapper>
    <S.Wrapper>
      {items.map((item, index) =>
        <S.Container key={index}>
          <S.Title>{renderRichText(item.title)}</S.Title>
          <S.List>
            <S.ListItem>{renderRichText(item.list)}</S.ListItem>
          </S.List>
        </S.Container>
      )}
    </S.Wrapper>
  </S.SocialMedia>

SocialMedia.propTypes = {
  items: PropTypes.array
}

SocialMedia.defaultProps = {
  items: []
}

const S = {
  SocialMedia: styled.div`
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    width: 100%;
    padding: var(--be-spacing-internal-03) var(--be-spacing-internal-05) var(--be-spacing-internal-05);

    @media ${device.desktop} {
      flex-direction: row;
      padding: 0;
    }
  `,
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: var(--be-spacing-internal-06) 0 var(--be-spacing-internal-03);

    .logo-tim {
      max-height: 28px;
      margin: 0 auto var(--be-spacing-internal-03);
      font-size: 125px;
    }

    &:first-child {
      flex-direction: column;
      border-top: 1px solid #414141;
    }

    @media ${device.desktop} {
      flex-direction: row;
      align-items: center;
      padding: var(--be-spacing-internal-07) 0;

      .logo-tim {
        max-height: 42px;
        margin-left: 0;
        font-size: 188px;
      }

      &:first-child {
        border-top: none;
      }
    }
  `,
  LastUpdated: styled.p`
    margin: 0;
    font-size: var(--be-font-size-caption1);
    color: var(--be-text-secondary);
    text-align: center;
  `,
  Title: styled.div`
    h2, h3, h4, h5, h6, p {
      width: 100%;
      margin: 0 auto 8px;
      font-size: var(--be-font-size-body3);
      font-weight: var(--be-font-weight-semibold);
      line-height: var(--be-line-height-body3);
      color: var(--be-text-secondary);
      text-align: left;
    }
  `,
  List: styled.ul`
    margin: 0;

    ul { margin: 0; }
    li { margin-bottom: 8px; }
  `,
  ListItem: styled.li`
    a {
      font-size: var(--be-font-size-body2);
      line-height: var(--be-line-height-body2);
      color: var(--be-text-secondary);
    }
  `,
  Container: styled.div`
    margin-bottom: var(--be-spacing-internal-07);

    @media ${device.desktop} {
      display: inline-block;
      margin: 0 0 0 var(--be-spacing-layout-05);
    }
  `
}

export default SocialMedia
