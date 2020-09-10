import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { device, screenSize } from '../Grid/breakpoints'

const UIGrid = ({ background, children, horizontalMargin, constrains }) =>
  <S.UIGrid constrains={constrains}>
    {children}
  </S.UIGrid>

UIGrid.Item = ({ children, area, background }) =>
  <S.Item area={area} background={background}>
    {children}
  </S.Item>

UIGrid.propTypes = {
  background: PropTypes.string,
  constrains: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  horizontalMargin: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

UIGrid.Item.propTypes = {
  background: PropTypes.string,
  area: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

UIGrid.defaultProps = {
  constrains: false
}

const getHorizontalMargin = horizontalMargin => {
  if (typeof horizontalMargin === 'number') {
    return `margin: 0 ${horizontalMargin === 0 ? 'auto' : `${horizontalMargin}px`};`
  } else if (typeof horizontalMargin === 'object') {
    return Object.keys(horizontalMargin).map(key => (`
      margin: 0 24px;
      @media ${device[key]} {
        margin: 0 ${horizontalMargin[key]}px;
      }
    `)).join('\n')
  }

  return `
    padding-right: var(--be-spacing-layout-01);
    padding-left: var(--be-spacing-layout-01);
    margin-right: auto;
    margin-left: auto;

    @media ${device.tablet} {
      box-sizing: content-box;
      padding-right: var(--be-spacing-layout-02);
      padding-left: var(--be-spacing-layout-02);
    }
  `
}

const S = {
  UIGrid: styled.main`
    position: relative;
    display: grid;
    grid-template-rows: auto;
    grid-column-gap: 24px;
    grid-row-gap: 25px;
    grid-template-columns: repeat(auto-fill, minmax(${screenSize.sm}px, 1fr));
    grid-template-areas:
      'banner'
      'article-list'
      'card-offer'
      'article-list-end'
      'redirect-button'
      'floating-ad';
    width: 100%;
    max-width: ${({ constrains }) => typeof constrains === 'boolean' ? (constrains ? '100%' : `${screenSize.lg}px`) : `${constrains}px`};
    ${({ horizontalMargin }) => getHorizontalMargin(horizontalMargin)}
    padding-top: 30px;

    @media ${device.desktop} {
      grid-template-columns: repeat(4, 303px);
      grid-template-areas:
        'banner banner banner floating-ad'
        'article-list article-list article-list floating-ad'
        'card-offer card-offer card-offer floating-ad'
        'article-list-end article-list-end article-list-end floating-ad'
        'article-list-end article-list-end article-list-end floating-ad'
        'redirect-button redirect-button redirect-button redirect-button';
    }
  `,
  Item: styled.section`
    background: ${({ background }) => background ? `${background}` : ''};
    grid-area: ${({ area }) => area};
  `
}

export default UIGrid
