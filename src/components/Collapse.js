import React, { useState } from 'react'
import styled from 'styled-components'
import AnimateHeight from 'react-animate-height'
import PropTypes from 'prop-types'

import ArrowIcon from '../images/chevron.svg'

const Collapse = ({ title, children, className }) => {
  const [active, setActive] = useState(null)
  const [height, setHeight] = useState(0)

  const toggle = () => {
    height === 0 ? setHeight('auto') : setHeight(0)
    setActive(!active)
  }

  return (
    <div data-component-name='Collapse' className={className}>
      <S.Title onClick={() => toggle()} isActive={active} className='collapse-title'>
        {title} <ArrowIcon className='icon' />
      </S.Title>
      <S.Content isActive={active} className='collapse-content'>
        <AnimateHeight duration={200} height={height}>
          {children}
        </AnimateHeight>
      </S.Content>
    </div>
  )
}

Collapse.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string
}

Collapse.defaultProps = {
  title: ''
}

const S = {
  Title: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
    color: ${props => props.isActive ? 'var(--be-brand-primary)' : 'var(--be-text-primary)'};
    cursor: pointer;
    border-bottom: ${props => props.isActive ? 'none' : '1px solid var(--be-base-secondary)'};

    h1, h2, h3, h4, h5, h6, p, strong {
      margin-bottom: 0;
      font-size: var(--be-font-size-subtitle1);
      font-weight: var(--be-font-weight-semibold);
      line-height: var(--be-line-height-title4);
      color: ${props => props.isActive ? 'var(--be-brand-primary)' : 'var(--be-text-primary)'};
      vertical-align: middle;
    }

    .icon {
      width: 12px;
      margin-right: 10px;
      font-size: var(--be-font-size-title3);
      font-weight: var(--be-font-weight-bol);
      color: ${props => props.isActive ? 'var(--be-brand-primary)' : 'var(--be-text-primary)'};
      transform: ${props => props.isActive ? 'rotate(0)' : 'rotate(180deg)'};
    }
  `,
  Content: styled.div`
    margin: ${props => props.isActive ? '20px 0' : '0'};
    font-size: var(--be-font-size-body1);
    visibility: ${props => props.isActive ? 'visible' : 'hidden'};

    p, a, li {
      font-family: var(--font-family-sans-serif);
      font-size: var(--be-font-size-link3);
      line-height: 150%;
      color: var(--be-text-primary-dark);
    }

    li { margin: 0; }
  `
}

export default Collapse
