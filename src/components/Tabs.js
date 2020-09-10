import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { device } from './Grid/breakpoints'
import { renderRichText } from '../prismic'

const Tabs = ({ items, primary }) => {
  if (!items.length) return null
  const [active, setActive] = useState(items[0].item_title)
  const activeContent = () => renderRichText(items.find(item => item.item_title === active).item_content)
  const isVertical = primary.direction === 'Vertical'

  return (
    <S.TabWrapper isVertical={isVertical}>
      <S.List role='tablist' isVertical={isVertical}>
        {items.map((item, i) => (
          <S.Title
            key={i}
            active={item.item_title === active}
            aria-controls={`content-${i}`}
            role='tab'
            onClick={() => setActive(item.item_title)}
            isVertical={isVertical}
          >
            {item.item_title}
          </S.Title>
        ))}
        <S.BlankTab isVertical={isVertical} />
      </S.List>
      <S.Content role='tabpanel'>{activeContent()}</S.Content>
    </S.TabWrapper>
  )
}

Tabs.propTypes = {
  items: PropTypes.array,
  primary: PropTypes.object
}

Tabs.defaultProps = {
  items: [],
  primary: {}
}

const S = {
  TabWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    border: 1px solid var(--be-brand-primary);

    @media ${device.tablet} {
      flex-direction: ${props => props.isVertical ? 'row' : 'column'};
    }
  `,
  List: styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 0;
    list-style: none;
    background: var(--be-base-primary-light);

    @media ${device.tablet} {
      flex-direction: ${props => props.isVertical ? 'column' : 'row'};
      ${props => props.isVertical && `
        width: 200px;
      `}
    }
  `,
  Title: styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 150px;
    height: fit-content;
    min-height: 50px;
    padding: 10px;
    margin: 0;
    font-size: var(--be-font-size-subtitle4);
    line-height: var(--be-line-height-subtitle2);
    color: var(--be-brand-primary);
    text-align: center;
    cursor: pointer;
    background: var(--be-base-primary-light);
    border-bottom: 1px solid var(--be-brand-primary);

    &:first-child {
      ${props => props.isVertical && `
        border-top: none;
      `}
      ${props => !props.isVertical && `
        border-left: none;
      `}
    }

    ${props => props.active && `
    background: var(--be-base-primary);
    border: 1px solid var(--be-brand-primary);
    border-bottom: none;
    `}

    @media ${device.tablet} {
      ${props => props.isVertical && `
        width: 200px;
        border: none;
        border-right: 1px solid var(--be-brand-primary);
      `}

      ${props => props.isVertical && props.active && `
        border: 1px solid var(--be-brand-primary);
        border-right: none;
      `}
    }
  `,
  BlankTab: styled.li`
    margin: 0;

    @media ${device.tablet} {
      flex-grow: 1;
      border-bottom: 1px solid var(--be-brand-primary);

      ${props => props.isVertical && `
        border: none;
        border-right: 1px solid var(--be-brand-primary);
      `}
    }
  `,
  Content: styled.div`
    width: 100%;
    padding: 20px;
    font-size: var(--be-font-size-body1);
    background: var(--be-base-primary);
  `
}

export default Tabs
