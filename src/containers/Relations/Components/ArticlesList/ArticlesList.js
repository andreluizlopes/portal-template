import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { RichText } from 'prismic-reactjs'
import kebabCase from 'lodash/kebabCase'

import { device } from '../../../../components/Grid/breakpoints'

const ArticlesList = ({ items }) =>
  <div>
    <S.Title>Artigos Relacionados</S.Title>
    <S.Articles>
      {items.map((article, index) => (
        <S.Article key={index} columns={3}>
          {article.tags[0] && <Link to={`/category/${kebabCase(article.tags[0])}`}><S.Tag>{article.tags[0]}</S.Tag></Link>}
          <Link to={`/${article.uid.replace(/--/g, '/')}`}>
            <S.Thumb>
              <img className='image'
                src={article.thumbnail.url}
                alt={article.thumbnail.alt}
                title={article.thumbnail.copyright}
              />
            </S.Thumb>
            <S.Text>{RichText.asText(article.title)}</S.Text>
          </Link>
        </S.Article>
      ))}
    </S.Articles>
  </div>

const S = {
  Title: styled.h3`
    margin-bottom: 50px;
    font-size: 36px;
    color: var(--be-brand-primary);
  `,
  Articles: styled.div`
    @media ${device.tablet} {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10px;
    }
  `,
  Article: styled.article`
    width: 100%;
    margin-bottom: 28px;
    border-bottom: 1px solid #eee;

    @media ${device.tablet} {
      width: calc(${({ columns }) => 100 / columns}% - 20px);
      margin: 0 10px 28px;
    }

    &:last-child {
      margin-right: 0;
    }
  `,
  Tag: styled.div`
    position: absolute;
    width: 200px;
    height: 40px;
    padding: 12px;
    font-weight: 600;
    color: var(--be-brand-secondary);
    text-transform: capitalize;
    background-color: rgba(255, 255, 255, .8);
    border-bottom-right-radius: 100px;
  `,
  Thumb: styled.div`
    overflow: hidden;

    .image {
      width: 100%;
      height: auto;
    }
  `,
  Text: styled.p`
    margin: 15px 0;
    font-size: 22px;
  `
}

export default ArticlesList
