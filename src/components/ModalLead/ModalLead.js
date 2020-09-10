import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import VMasker from 'vanilla-masker'

import { sendLead } from '../../services/hubspot'
import { Modal, Input, LinkDuo } from '@escaletech/escale-components'
import { device } from '../Grid/breakpoints'
import { renderLink, renderRichText } from '../../prismic'
import World from '../../images/world.svg'

const ModalLead = ({ primary }) => {
  const [zipCode, setZipCode] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setZipCode(localStorage.getItem('pp_zipcode') || '')
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!localStorage.getItem('pp_zipcode')) {
      localStorage.setItem('pp_zipcode', zipCode)
    }

    if (zipCode && phone && primary.contact) {
      const url = document.location.href
      sendLead({ email, zipCode, phone, url })
      setOpen(!open)
    } else {
      setError(true)
    }
  }

  return (
    <S.ModalLead>
      <Modal
        id='lead'
        className='modal-lead'
        data-component-name='ModalLead'
      >
        <S.Image image={primary.image.url} mobileImage={primary.image.mobile.url} />
        <S.Fields onSubmit={handleSubmit}>
          <S.Title>{renderRichText(primary.title)}</S.Title>
          <S.Text>{renderRichText(primary.text)}</S.Text>
          <Input
            warning='Não é possível prosseguir sem preencher'
            placeholder={primary.zipcode}
            type='zipcode'
            maxLength='9'
            value={VMasker.toPattern(zipCode, '99999-999')}
            onChange={e => setZipCode(e.target.value)}
            error={error && !zipCode}
          />
          <Input
            warning='Não é possível prosseguir sem preencher'
            placeholder={primary.phone}
            type='phone'
            maxLength='14'
            value={VMasker.toPattern(phone, '(99)99999-9999')}
            onChange={e => setPhone(e.target.value)}
            error={error && !phone}
          />
          <Input
            warning='Não é possível prosseguir sem preencher'
            placeholder={primary.email}
            type='email'
            onChange={e => setEmail(e.target.value)}
            error={error && !email}
          />
          <S.Button className='button button--large'>{primary.button}</S.Button>
        </S.Fields>
        <S.Content className={`${open ? 'active' : ''}`}>
          <div className='wrapper'>
            <World className='icon' />
            <S.Title>{renderRichText(primary.heading)}</S.Title>
            <S.Text>{renderRichText(primary.content)}</S.Text>
            <LinkDuo className='phone' to={renderLink(primary.contact)}>{primary.label}</LinkDuo>
          </div>
        </S.Content>
      </Modal>
    </S.ModalLead>
  )
}

ModalLead.propTypes = {
  primary: PropTypes.shape({
    image: PropTypes.shape({
      url: PropTypes.string,
      mobile: PropTypes.shape({
        url: PropTypes.string
      })
    }),
    heading: PropTypes.array,
    title: PropTypes.array,
    text: PropTypes.array,
    content: PropTypes.array,
    phone: PropTypes.string,
    zipcode: PropTypes.string,
    label: PropTypes.string,
    email: PropTypes.string,
    contact: PropTypes.shape({
      url: PropTypes.string.isRequired
    }),
    button: PropTypes.string
  })
}

ModalLead.defaultProps = {
  primary: PropTypes.shape({
    image: {
      url: '',
      mobile: {
        url: ''
      }
    },
    title: '',
    zipcode: '',
    contact: {
      url: ''
    },
    button: ''
  })
}

const S = {
  ModalLead: styled.section`
    .modal-lead {
      height: 100%;
      margin: auto;
      overflow: hidden;

      .active {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        width: 100%;
        height: 100%;

        .wrapper {
          width: 400px;
          height: 200px;
          margin: auto;
          text-align: center;
        }
      }

      .icon {
        margin: auto auto 8px;
        font-size: 44px;
      }

      @media ${device.desktop} {
        .active {
          width: 524px;
        }
      }

      .modal__close-icon {
        color: var(--be-text-secondary);
      }

      @media ${device.desktop} {
        display: flex;
        width: 748px;
        height: 487px;

        .modal__close-icon {
          color: inherit;
        }
      }
    }
  `,
  Fields: styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;

    .field {
      & + .field {
        margin-top: 12px;
      }

      &--error {
        margin-bottom: 10px;
      }
    }
  `,
  Button: styled.button`
    width: 180px;
    margin-top: 24px;
  `,
  Image: styled.div`
    display: inline-block;
    width: 100%;
    height: 130px;
    margin-bottom: 68px;
    background: ${({ mobileImage, image }) => mobileImage || image ? `url(${mobileImage || image}) no-repeat center right / cover` : 'var(--be-brand-primary)'};

    @media ${device.desktop} {
      display: inline-block;
      width: 224px;
      height: 487px;
      background: ${({ image }) => image ? `url(${image})` : 'var(--be-brand-primary)'} no-repeat center / cover;
    }
  `,
  Title: styled.div`
    min-width: 276px;
    margin-bottom: 8px;
    text-align: center;

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-bottom: 0;
      font-size: var(--be-font-size-title4);
      font-weight: var(--be-font-weight-bold);
      line-height: var(--be-line-height-title4);
      color: var(--be-base-secondary-dark);
    }
  `,
  Text: styled.div`
    min-width: 276px;

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: var(--be-font-size-body1);
      line-height: var(--be-line-height-body1);
      color: var(--be-text-primary-dark);
      text-align: center;
    }
  `,
  Content: styled.div`
    display: none;
    background: var(--be-bg-secondary);

    .phone {
      font-size: var(--be-font-size-title2);
      font-weight: var(--be-font-weight-semibold);
      color: var(--be-base-secondary-dark);
      text-align: center;

      :hover {
        color: var(--be-base-secondary-dark);
      }

      @media ${device.desktop} {
        cursor: auto;
      }
    }
  `
}

export default ModalLead
