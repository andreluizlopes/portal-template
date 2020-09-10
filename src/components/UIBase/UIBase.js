import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { device, screenSize } from '../Grid/breakpoints'

const UIBase = ({ component: Component, constrains, containerProps, style, background, marginTop, marginBottom, horizontalMargin, as, ...rest }) => (
  <S.UIBase background={background} marginTop={marginTop} marginBottom={marginBottom} style={style}>
    <Container constrains={constrains} as={as} {...containerProps} horizontalMargin={horizontalMargin}>
      <Component {...rest} />
    </Container>
  </S.UIBase>
)

UIBase.propTypes = {
  component: PropTypes.func.isRequired,
  constrains: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  style: PropTypes.object,
  background: PropTypes.string,
  marginTop: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  marginBottom: PropTypes.number,
  horizontalMargin: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  as: PropTypes.string,
  containerProps: PropTypes.array
}

UIBase.defaultProps = {
  constrains: false,
  style: {},
  marginBottom: 0,
  as: 'div'
}

const Container = ({ children, ...props }) => <S.Container {...props}>{children}</S.Container>

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

const getMarginTop = marginTop => {
  if (typeof marginTop === 'number') {
    return `margin-top: ${marginTop === 0 ? '0px' : `${marginTop}px`};`
  } else if (typeof marginTop === 'object') {
    return Object.keys(marginTop).map(key => (`
      margin-top: var(--be-spacing-layout-05);
      @media ${device[key]} {
        margin-top: ${marginTop[key]}px;
      }
    `)).join('\n')
  }

  return 'margin-top: var(--be-spacing-layout-05);'
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
    padding-right: 16px;
    padding-left: 16px;
    margin-right: auto;
    margin-left: auto;

    @media ${device.tablet} {
      padding-right: 24px;
      padding-left: 24px;
    }
  `
}

const S = {
  UIBase: styled.section`
    ${({
      background, marginTop, marginBottom
    }) => `
    ${background ? `background: ${background};` : ''}
    ${getMarginTop(marginTop)}
    display: flex;
    justify-content: center;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: ${marginBottom}px;
  `}
  `,

  Container: styled.div`
    width: 100%;
    max-width: ${({ constrains }) => typeof constrains === 'boolean' ? (constrains ? `${screenSize.lg}px` : '100%') : `${constrains}px`};
    ${({ horizontalMargin }) => getHorizontalMargin(horizontalMargin)}
  `
}

export {
  Container
}

export default UIBase
