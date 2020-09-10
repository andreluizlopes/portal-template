import React, { useState } from 'react'
import styled from 'styled-components'
import VMasker from 'vanilla-masker'
import axios from 'axios'
import PropTypes from 'prop-types'

import { device } from './Grid/breakpoints'
import { Container } from './UIBase'
import { Modal } from '@escaletech/escale-components'
import tvCabo from '../images/ZipCodeModal/tv_cabo.png'
import internet from '../images/ZipCodeModal/internet.png'
import telefone from '../images/ZipCodeModal/telefone.png'
import claroTv from '../images/ZipCodeModal/claro_tv.png'
import claroCelular from '../images/ZipCodeModal/claro_celular.png'
import claroFixo from '../images/ZipCodeModal/claro_fixo.png'
import LocationIcon from '../images/locationIcon.svg'
import htmlID from '../utils/htmlID'

const CheckZipCode = ({ primary, provider }) => {
  const [zipCode, setZipCode] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [operator, setOperator] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validateZipCode = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const coverage = await axios.get(`https://api.escaleos.escale.com.br/telecom-base-cep/availability?cep=${zipCode}&provider=${provider}`)
    setShowModal(true)
    setOperator(coverage.data.wired)
    setIsLoading(false)
  }

  return (
    <S.CheckZipCode onSubmit={validateZipCode} {...htmlID(primary.title)}>
      <Container constrains={848}>
        <S.Wrapper>
          <S.Title>{primary.title}</S.Title>
          <S.InputWrapper>
            <LocationIcon />
            <S.Input
              placeholder={primary.input_placeholder}
              type='tel'
              value={VMasker.toPattern(zipCode, '99999-999')}
              pattern='\d{5}-\d{3}'
              maxLength='9'
              onChange={e => setZipCode(e.target.value)}
            />
          </S.InputWrapper>
          <S.Button href='#zipcode'>{isLoading ? <LoadingDots /> : primary.button_text}</S.Button>
          <Modal id='zipcode' show={showModal}>
            {operator ? <ModalNet /> : <ModalClaro />}
          </Modal>
        </S.Wrapper>
      </Container>
    </S.CheckZipCode>
  )
}

CheckZipCode.propTypes = {
  primary: PropTypes.object,
  provider: PropTypes.string
}

const LoadingDots = () => <> <S.Dot /> <S.Dot /> <S.Dot /> </>

const ModalNet = () =>
  <>
    <S.ModalHeader>TEM NET NA SUA REGIÃO!</S.ModalHeader>
    <S.ModalContent>
      <S.ModalText>Ligue gratuitamente e aproveite nossas ofertas</S.ModalText>
      <S.ModalButton>0800 878 2600</S.ModalButton>
      <S.ModalProducts>
        <S.IconWrapper>
          <S.ProductIcon src={tvCabo} />
          TV A CABO
        </S.IconWrapper>
        <S.IconWrapper>
          <S.ProductIcon src={internet} style={{ width: '95px' }} />
          INTERNET
        </S.IconWrapper>
        <S.IconWrapper>
          <S.ProductIcon src={telefone} />
          TELEFONE
        </S.IconWrapper>
      </S.ModalProducts>
    </S.ModalContent>
  </>

const ModalClaro = () =>
  <>
    <S.ModalHeader className='claro'>TEM CLARO NA SUA REGIÃO!</S.ModalHeader>
    <S.ModalContent className='claro'>
      <S.ModalText className='claro'>Conheça as promoções da Claro!</S.ModalText>
      <S.ModalButton className='claro'>Saiba mais</S.ModalButton>
      <S.ModalProducts className='claro'>
        <S.IconWrapper>
          <S.ProductIcon src={claroTv} />
          CLARO TV
        </S.IconWrapper>
        <S.IconWrapper>
          <S.ProductIcon src={claroFixo} />
          CLARO CELULAR
        </S.IconWrapper>
        <S.IconWrapper>
          <S.ProductIcon src={claroCelular} />
          CLARO FIXO
        </S.IconWrapper>
      </S.ModalProducts>
    </S.ModalContent>
  </>

const S = {
  CheckZipCode: styled.form`
    height: fit-content;
    padding: 0;
    background: var(--be-bg-secondary);
    border-radius: 4px;
  `,
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 25px;
    color: var(--be-text-primary);
    text-align: center;

    @media ${device.desktop} {
      flex-direction: row;
    }
  `,
  Title: styled.p`
    display: inline-block;
    width: 100%;
    margin: 0;
    font-size: var(--be-font-size-subtitle1);
    font-weight: var(--be-font-weight-semibold);
    line-height: var(--be-line-height-body4);
    text-align: center;

    @media ${device.desktop} {
      width: 250px;
      min-width: 250px;
      text-align: right;
    }
  `,
  InputWrapper: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    margin: 16px;
    background: var(--be-bg-secondary);
    border: 1px solid #B4B4C1;
    border-radius: 4px;

    svg {
      width: 24px;
      height: 24px;
      margin-left: 16px;
    }

    @media ${device.desktop} {
      min-width: 384px;
      margin-left: 25px;
    }
  `,
  Input: styled.input`
    width: calc(100% - 56px);
    height: 38px;
    padding: 4px 12px 8px;
    font-size: var(--be-font-size-title4);
    border: none;
    outline: 0;

    ::placeholder {
      font-size: var(--be-font-size-body1);
      font-weight: var(--be-font-weight-regular);
      color: #A2A2A2;
    }
  `,
  Button: styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 170px;
    height: 40px;
    margin: 0;
    font-size: var(--be-font-size-body3);
    font-weight: var(--be-font-weight-semibold);
    color: var(--be-text-secondary);
    background: var(--be-brand-secondary);
    border: 1px solid #ccc;
    border-radius: 4px;
  `,
  Dot: styled.i`
    display: inline-block;
    width: 6px;
    height: 6px;
    margin: 4px;
    background: var(--be-text-secondary);
    border-radius: var(--be-shape-circle);
    animation: loader 1.3s linear infinite;

    &:nth-child(2) {
      animation-delay: -1.1s;
    }

    &:nth-child(3) {
      animation-delay: -.9s;
    }

    @keyframes loader {
      30% {
        opacity: .4;
      }
    }
  `,
  ModalHeader: styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 70px;
    padding: 25px 10px;
    font-family: Roboto, sans-serif;
    font-size: 32px;
    font-weight: lighter;
    line-height: 35px;
    color: #2e3191;
    text-align: center;
    vertical-align: middle;
    background: #68a9dd;

    &.claro {
      font-size: 21px;
      color: white;
      background: #ed1b24;
    }
  `,
  ModalContent: styled.div`
    min-height: 475px;
    padding: 0 15px;
    font-family: Roboto, sans-serif;
    text-align: center;
    background: #68a9dd;

    &.claro {
      min-height: 450px;
      background: white;
    }
  `,
  ModalText: styled.p`
    padding-top: 100px;
    font-size: 22px;
    color: white;

    &.claro {
      padding-top: 100px;
      color: #575859;
    }
  `,
  ModalButton: styled.button`
    width: 100%;
    padding: 12px;
    margin: 30px auto;
    font-size: var(--be-font-size-title2);
    font-weight: var(--be-font-weight-bold);
    color: white;
    background: #2e3191;
    border: 1px solid transparent;
    box-shadow: 5px 5px 15px black;

    @media ${device.desktop} {
      font-size: var(--be-font-size-title1);
    }

    &.claro {
      background: #ed1b24;
    }
  `,
  ModalProducts: styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    min-height: 150px;
    padding: 20px 0 35px;
    border-top: 1px solid white;

    &.claro {
      color: #575859;
      border-top: 1px solid #575859;
      div { color: #575859; }

      @media ${device.desktop} {
        img {
          width: 100px;
          margin: 0 16px;
        }
      }
    }
  `,
  IconWrapper: styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    font-size: 14px;
    color: white;

    @media ${device.desktop} {
      font-size: 17px;
    }
  `,
  ProductIcon: styled.img`
    width: 70px;
    margin: 0 16px;

    @media ${device.desktop} {
      width: 70px;
      margin: 0 36px;
    }
  `
}

export default CheckZipCode
