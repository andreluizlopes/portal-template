import React from 'react'
import PropTypes from 'prop-types'
import { RichText } from 'prismic-reactjs'
import styled from 'styled-components'

import { device } from '../Grid/breakpoints'

const Sitemap = ({ items }) => {
  const result = []
  let resultIndex = 0

  items.forEach((item) => {
    if (item.list_level === 'level_1') {
      resultIndex++
      result.push({ title: item.list })
    }
    if (item.list_level === 'level_2') {
      result[resultIndex - 1].children = item.list
    }
  })

  return (
    <S.Sitemap>
      {result.map((item, index) =>
        <S.Ul key={index}>
          <li>
            <S.Title>{RichText.render(item.title)}</S.Title>
            {RichText.render(item.children)}
          </li>
        </S.Ul>
      )}
    </S.Sitemap>
  )
}

Sitemap.propTypes = {
  items: PropTypes.array
}

Sitemap.defaultProps = {
  items: []
}

const S = {
  Sitemap: styled.div`
    display: block;
    color: var(--be-brand-primary);

    @media ${device.tablet} {
      display: flex;
      justify-content: space-between;
    }
  `,
  Ul: styled.ul`
    margin-bottom: 40px;

    li {
      margin-bottom: 15px;
    }

    a {
      color: var(--be-brand-primary);
    }
  `,
  Title: styled.div`
    margin-bottom: 15px;
  `
}

export default Sitemap
