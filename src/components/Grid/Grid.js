import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { device } from './breakpoints'

const Grid = ({
  margin,
  gutter,
  aligment,
  offsetLeft,
  offsetRight,
  styles,
  children
}) => {
  const gutterSum = typeof gutter === 'object'
    ? Object.keys(gutter).reduce((reducer, key) => (
      {
        ...reducer,
        [key]: (children.length - 1) * gutter[key]
      }
    ),
    {})
    : (children.length - 1) * (gutter || 1)

  return (
    <S.Grid
      aligment={aligment}
      gutterSum={gutterSum}
      gutter={gutter}
      margin={margin}
      offsetLeft={offsetLeft}
      offsetRight={offsetRight}
      style={styles}
    >
      {React.Children.map(children, child =>
        React.cloneElement(child, { gutterSum })
      )}
    </S.Grid>
  )
}

Grid.propTypes = {
  aligment: PropTypes.string,
  gutterSum: PropTypes.oneOfType([
    PropTypes.shape({
      mobile: PropTypes.number,
      tablet: PropTypes.number,
      desktop: PropTypes.number
    }),
    PropTypes.number
  ]),
  gutter: PropTypes.oneOfType([
    PropTypes.shape({
      mobile: PropTypes.number,
      tablet: PropTypes.number,
      desktop: PropTypes.number
    }),
    PropTypes.number
  ]),
  margin: PropTypes.oneOfType([
    PropTypes.shape({
      mobile: PropTypes.number,
      tablet: PropTypes.number,
      desktop: PropTypes.number
    }),
    PropTypes.number
  ]),
  offsetLeft: PropTypes.oneOfType([
    PropTypes.shape({
      mobile: PropTypes.number,
      tablet: PropTypes.number,
      desktop: PropTypes.number
    }),
    PropTypes.number
  ]),
  offsetRight: PropTypes.oneOfType([
    PropTypes.shape({
      mobile: PropTypes.number,
      tablet: PropTypes.number,
      desktop: PropTypes.number
    }),
    PropTypes.number
  ]),
  styles: PropTypes.object,
  children: (props, propName, componentName) => {
    let error

    React.Children.forEach(props[propName], child => {
      if (child.type.name !== 'Column') {
        error = new Error(`\`${componentName}\` children's is not of type \`Column\`.`)
      }
    })

    return error
  }
}

const S = {
  Grid: styled.div`${({ margin, gutter, aligment, offsetLeft, offsetRight, gutterSum }) => `
    --column-size-mobile: calc(calc(100% - ${gutterSum && (gutterSum.mobile || gutterSum)}px) / 4);
    --margin-mobile: ${typeof margin === 'number' ? (margin + 'px') : (margin && (margin.mobile + 'px')) || 'calc(var(--be-grid-margin-mobile) / 2)'};
    --gutter-mobile: ${typeof gutter === 'number' ? (gutter / 2 + 'px') : (gutter && (gutter.mobile / 2 + 'px')) || 'calc(var(--be-grid-gutter-mobile) / 2)'};

    display: flex;
    flex-flow: wrap;
    justify-content: ${(aligment === 'center' && 'center') || (aligment === 'right' && 'flex-end') || (aligment === 'left' && 'left') || 'normal'};
    margin-right: var(--margin-mobile);
    margin-left: var(--margin-mobile);
    padding-right: calc(var(--column-size-mobile) * ${(offsetRight && ((offsetRight.mobile < 4 && offsetRight.mobile) || offsetRight)) || 0});
    padding-left: calc(var(--column-size-mobile) * ${(offsetLeft && ((offsetLeft.mobile < 4 && offsetLeft.mobile) || offsetLeft)) || 0});

    & > * {
      margin-right: var(--gutter-mobile);
      margin-left: var(--gutter-mobile);
    }

    @media ${device.tablet} {
      --column-size-tablet: calc(calc(100% - ${gutterSum && (gutterSum.tablet || gutterSum)}px) / 8);
      --margin-tablet: ${typeof margin === 'number' ? (margin + 'px') : (margin && (margin.tablet + 'px')) || 'calc(var(--be-grid-margin-tablet) / 2)'};
      --gutter-tablet: ${typeof gutter === 'number' ? (gutter / 2 + 'px') : (gutter && (gutter.tablet / 2 + 'px')) || 'calc(var(--be-grid-gutter-tablet) / 2)'};

      margin-right: var(--margin-tablet);
      margin-left: var(--margin-tablet);
      padding-right: calc(var(--column-size-tablet) * ${(offsetRight && ((offsetRight.tablet < 8 && offsetRight.tablet) || offsetRight)) || 0});
      padding-left: calc(calc(var(--column-size-tablet) * ${(offsetLeft && ((offsetLeft.tablet < 8 && offsetLeft.tablet) || offsetLeft)) || 0}));

      & > * {
        margin-right: var(--gutter-tablet);
        margin-left: var(--gutter-tablet);
      }
    }

    @media ${device.desktop} {
      --column-size-desktop: calc(calc(100% - ${gutterSum && (gutterSum.desktop || gutterSum)}px) / 12);
      --margin-desktop: ${typeof margin === 'number' ? (margin + 'px') : (margin && (margin.desktop + 'px')) || 'calc(var(--be-grid-margin-desktop) / 2)'};
      --gutter-desktop: ${typeof gutter === 'number' ? (gutter / 2 + 'px') : (gutter && (gutter.desktop / 2 + 'px')) || 'calc(var(--be-grid-gutter-desktop) / 2)'};

      margin-right: var(--margin-desktop);
      margin-left: var(--margin-desktop);
      padding-right: calc(var(--column-size-desktop) * ${(offsetRight && ((offsetRight.desktop < 12 && offsetRight.desktop) || offsetRight)) || 0});
      padding-left: calc(var(--column-size-desktop) * ${(offsetLeft && ((offsetLeft.desktop < 12 && offsetLeft.desktop) || offsetLeft)) || 0});

      & > * {
        margin-right: var(--gutter-desktop);
        margin-left: var(--gutter-desktop);
      }
    }

    & :first-of-type {
      margin-left: 0;
    }
    & :last-of-type {
      margin-right: 0;
    }
  `}`
}

export default Grid
