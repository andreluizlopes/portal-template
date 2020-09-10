import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

import { device } from '../../../components/Grid/breakpoints'
import ArrowDown from '../icons/arrow-down.svg'
import { RichText } from 'prismic-reactjs'

const CityList = ({ provider, items, history }) => {
  if (!items.length) return null

  const handleChange = (e) => {
    const path = new URL(e.target.value).pathname
    history.push(path)
  }
  return (
    <S.CityList data-component-name='CityList'>
      Veja a <span className='provider'>{provider}</span> em sua cidade
      <S.Wrapper>
        <ArrowDown className='icon' />
        <S.Select onChange={handleChange} className='select' defaultValue=''>
          <option value='' disabled>Selecione sua cidade</option>
          {items.map((item, index) =>
            <option value={item.link} key={index}>{RichText.asText(item.name)}</option>
          )}
        </S.Select>
      </S.Wrapper>
    </S.CityList>
  )
}

CityList.propTypes = {
  provider: PropTypes.string,
  items: PropTypes.array,
  history: PropTypes.object
}

CityList.defaultProps = {
  provider: '',
  items: [],
  history: {}
}

const S = {
  CityList: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px 16px;
    font-size: var(--be-font-size-subtitle1);
    line-height: var(--be-line-height-subtitle1);
    color: var(--be-text-secondary);
    background: var(--be-brand-primary);

    .provider {
      padding: 0 4px;
      text-transform: uppercase;
    }

    @media ${device.desktop} {
      flex-direction: row;
    }
  `,
  Wrapper: styled.div`
    position: relative;
    width: 100%;
    margin: 25px;

    .icon {
      position: absolute;
      right: 0;
      margin: 6px 17px;
      font-size: 33px;
    }

    .select {
      color: white;
    }

    @media ${device.desktop} {
      width: 415px;
    }
  `,
  Select: styled.select`
    position: relative;
    width: 100%;
    height: 45px;
    padding: 0 20px;
    font-size: var(--be-font-size-subtitle1);
    line-height: var(--be-line-height-subtitle1);
    background: transparent;
    border: 1px solid var(--be-text-secondary);
    appearance: none;

    &:focus {
      border: 1px solid var(--be-text-secondary);
    }
  `
}

export default withRouter(CityList)
