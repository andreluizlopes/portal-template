import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { RichText, Link } from 'prismic-reactjs'

import { linkResolver } from '../../prismic'
import { LinkDuo, Card, Carousel } from '@escaletech/escale-components'

const CardImage = ({ items }) =>
  <S.CardImage data-component-name='CardImage'>
    <Carousel>
      {items.map((item, index) =>
        <Card className='card' key={index}>
          <S.Image image={item.image.url} />
          <S.Content className={item.label ? 'extra-margin' : ''}>
            <div className='title'>
              {RichText.render(item.title)}
            </div>
            {RichText.render(item.description)}
          </S.Content>
          {item.label && (
            <S.Button>
              <LinkDuo to={Link.url(item.link, linkResolver)} className='button'>{item.label}</LinkDuo>
            </S.Button>
          )}
        </Card>)}
    </Carousel>
  </S.CardImage>

CardImage.propTypes = {
  items: PropTypes.array
}

CardImage.defaultProps = {
  items: []
}

const S = {
  CardImage: styled.div`
    font-weight: var(--be-font-weight-semibold);

    .card {
      height: 100%;
    }
  `,
  Card: styled.div`
    width: 303px;
    background: var(--be-bg-secondary);
    box-shadow: var(--be-box-shadow-raised);
  `,
  Image: styled.div`
    width: 100%;
    height: 204px;
    background: url(${({ image }) => image}) no-repeat center / cover;
  `,
  Content: styled.div`
    padding: 24px;

    &.extra-margin {
      margin-bottom: 72px;
    }

    .title {
      margin-bottom: 10px;

      h2, h3, h4, h5, h6, p {
        margin-bottom: 0;
        font-size: var(--be-font-size-body1);
        font-weight: var(--be-font-weight-semibold);
        line-height: var(--be-line-height-body3);
      }
    }

    p {
      margin-bottom: 0;
      font-size: var(--be-font-size-body2);
    }
  `,
  Button: styled.div`
    position: absolute;
    bottom: 0;
    height: 72px;
    padding: 0 24px 24px;
  `
}

export default CardImage
