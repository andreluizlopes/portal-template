import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import VMasker from 'vanilla-masker'
import styled from 'styled-components'
import { RichText } from 'prismic-reactjs'

import { renderRichText } from '../../prismic'
import { zipCodeCoverage } from '../../services/zipCodeCoverage'
import { device } from '../Grid/breakpoints'
import { Modal } from '@escaletech/escale-components'
import Location from '../../images/locationIcon.svg'

const ModalZipCode = ({ primary, items, provider }) => {
  const [open, setOpen] = useState(false)
  const [hasProduct, setHasProduct] = useState('no')
  const [zipCode, setZipCode] = useState('')

  useEffect(() => {
    setZipCode(localStorage.getItem('pp_zipcode') || '')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const coverage = await zipCodeCoverage(zipCode)

    setOpen(true)
    setHasProduct(coverage[primary.provider || provider] ? 'yes' : 'no')
    localStorage.setItem('pp_zipcode', zipCode)
  }

  const close = () => {
    setOpen(false)
  }

  return (
    <S.ModalZipCode data-component-name='ModalZipCode'>
      <S.Form className='modal-zipcode__form' onSubmit={handleSubmit}>
        <S.Title className='modal-zipcode__title'>{RichText.render(primary.title)}</S.Title>
        <S.Input>
          <Location className='modal-zipcode__icon' />
          <input
            type='tel'
            className='modal-zipcode__input'
            value={VMasker.toPattern(zipCode, '99999-999')}
            placeholder='Digite seu CEP'
            pattern='\d{5}-\d{3}'
            maxLength='9'
            onChange={e => setZipCode(e.target.value)}
          />
        </S.Input>
        <button className='button'>{primary.label}</button>
      </S.Form>

      <S.Modal className='modal-zipcode' id='check-zipcode' open={open} close={close}>
        {items.filter(item => item.type === hasProduct).slice(0, 1).map((item, index) =>
          <div key={index}>
            <div className='title'>
              {RichText.render(item.title)}
            </div>
            <div className='content'>
              {renderRichText(item.content)}
            </div>
          </div>
        )}
      </S.Modal>
    </S.ModalZipCode>
  )
}

ModalZipCode.propTypes = {
  primary: PropTypes.object,
  items: PropTypes.array,
  provider: PropTypes.string
}

const S = {
  ModalZipCode: styled.div`
    padding: 24px;
    background: var(--be-bg-secondary);

    @media ${device.desktop} {
      padding: 26px;

      .modal-zipcode {
        width: 600px;
      }
    }

    .modal-zipcode {
      margin: auto;

      &__icon {
        width: 24px;
        height: 24px;
        margin-left: 16px;
      }

      &__input {
        width: calc(100% - 56px);
        height: 38px;
        padding: 4px 12px 8px;
        font-size: var(--be-font-size-title4);
        border: none;
        outline: 0;

        ::placeholder {
          font-family: var(--font-family-primary);
          font-size: var(--be-font-size-body1);
          font-weight: var(--be-font-weight-regular);
          color: #a2a2a2;
        }
      }
    }
  `,
  Form: styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--be-text-primary);
    text-align: center;
    border-radius: 4px;

    @media ${device.desktop} {
      flex-direction: row;
    }
  `,
  Title: styled.div`
    display: inline-block;
    width: 260px;
    margin: 0;

    h1, h2, h3, h4, h5, h6, p {
      margin-bottom: 0;
      font-size: var(--be-font-size-subtitle1);
      font-weight: var(--be-font-weight-semibold);
      line-height: var(--be-line-height-body4);
      color: var(--be-text-primary);
      text-align: center;
    }

    @media ${device.desktop} {


      h1, h2, h3, h4, h5, h6, p {
        text-align: right;
      }
    }
  `,
  Input: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 384px;
    height: 40px;
    margin: 16px;
    background: var(--be-bg-secondary);
    border: 1px solid #b4b4c1;
    border-radius: 4px;

    @media ${device.desktop} {
      min-width: 384px;
      margin: 0 16px 0 24px;
    }
  `,
  Modal: styled(Modal)`
    &.modal {
      padding: 0;
      text-align: center;

      .modal__close-icon {
        color: var(--be-text-secondary);
      }

      .title {
        width: 100%;
        padding: 24px;
        background: var(--be-brand-primary);

        p {
          margin-bottom: 0;
          font-size: var(--be-font-size-title4);
          color: var(--be-text-secondary);
        }
      }

      .content {
        padding: 24px;

        p {
          margin-bottom: 0;
        }
      }
    }
  `
}

export default ModalZipCode
