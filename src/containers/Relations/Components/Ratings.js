import React, { useState } from 'react'
import styled from 'styled-components'
import Rating from 'react-rating'
import { withRouter } from 'react-router-dom'

import StarLogo from '../../../images/star.svg'
import { setPageRating } from '../../../services/rating/api'

const Ratings = props => {
  const { location } = props
  const isClient = global.window !== undefined
  const storageRates = isClient ? JSON.parse(localStorage.getItem('pp_rate')) || {} : {}
  const initialRate = storageRates[location.pathname] || 0
  const [rate, setRate] = useState(initialRate)
  const [readOnly, setReadOnly] = useState((rate !== null && rate !== 0))

  const [rating, setRating] = useState(props.rating)
  const handleClick = async (e) => {
    const newRate = Object.assign(storageRates, { [location.pathname]: e })
    if (!rate) {
      setRate(e)
      setReadOnly(true)
      localStorage.setItem('pp_rate', JSON.stringify(newRate))
      const newRating = await setPageRating(location.pathname.replace('/', ''), e)
      setRating(newRating)
    }
  }

  return (
  <>
    { rating && <S.Container className='portal' itemScope itemType={rating.total && 'http://schema.org/Product'}>
      <span itemProp={rating.total && 'name'} className='product-name'>{props.uid && props.uid.replace('--', '/')}</span>
      <S.Legend itemProp={rating.total && 'aggregateRating'} itemScope itemType={rating.total && 'http://schema.org/AggregateRating'}>
        <S.Score itemProp={rating.total && 'ratingValue'}>{rating.average || 0}</S.Score>
        <S.Votes itemProp={rating.total && 'ratingCount'}>{rating.total || 0}</S.Votes>
      </S.Legend>
      {isClient && <Rating
        initialRating={rate}
        emptySymbol={<StarLogo className='icon empty-symbol' />}
        placeholderSymbol={<StarLogo className='icon placeholder-symbol' />}
        fullSymbol={<StarLogo className='icon full-symbol' />}
        onChange={(rate) => handleClick(rate)}
        readonly={readOnly}
      />}
    </S.Container>}
  </>
  )
}

const S = {
  Container: styled.div`
  display: flex;
  margin-bottom: 30px;

  .product-name {
    display: none;
  }

  .icon {
    width: 20px;
    height: 20px;
    margin-right: 3px;
    stroke: var(--be-brand-primary);

    &.empty-symbol {
      fill: #fff;
    }

    &.placeholder-symbol {
      fill: #ff6;
    }

    &.full-symbol {
      fill: #ffa019;
    }
  }
  `,
  Legend: styled.div`
    display: flex;
    align-items: center;
    margin-right: 5px;
    font-size: 14px;
    color: var(--be-bg-primary);
    border-radius: 10rem;
  `,
  Score: styled.span`
    padding: 3px 6px;
    color: var(--be-bg-primary);
    background-color: var(--be-text-primary);
    border-radius: 40px 10px 10px 40px;
  `,
  Votes: styled.span`
    padding: 2px 6px;
    color: var(--be-text-primary);
    background-color: var(--be-bg-primary);
    border: 1px solid;
    border-radius: 10px 40px 40px 10px;
  `
}

export default withRouter(Ratings)
