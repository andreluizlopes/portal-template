import React, { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Link as RichLink } from 'prismic-reactjs'
import PropTypes from 'prop-types'

import { device, screenSize } from '../../components/Grid/breakpoints'
import { linkResolver } from '../../prismic'
import { LinkDuo } from '@escaletech/escale-components'
import ArrowRight from './arrow-right.svg'
import ArrowDown from './arrow-down.svg'
import ArrowLeft from './arrow-left.svg'
import ButtonOpenMenu from '../../images/menu_burger.svg'
import ButtonCloseMenu from '../../images/close_menu.svg'
import LogoZelas from '../../images/logos/zelas-conecta.svg'

const Menu = ({ menu }) => {
  if (!menu) return null

  const [openMenu, setOpenMenu] = useState(false)
  const [openSubMenu, setOpenSubMenu] = useState(false)
  const [isMobile, setMobile] = useState(false)

  useEffect(() => {
    setMobile(global.screen && global.screen.width < screenSize.lg)
  }, [])

  const toggleOpenMenu = () => {
    setOpenMenu(!openMenu)
    setOpenSubMenu(false)
  }

  return (
    <S.MenuWrapper data-component-name='menu'>
      {!openMenu && <ButtonOpenMenu className='toggleMenu' onClick={toggleOpenMenu} />}
      {openMenu && <ButtonCloseMenu className='toggleMenu' onClick={toggleOpenMenu} />}
      <S.Nav isOpenMenu={openMenu}>
        <MenuLinks
          menu={menu}
          isMobile={isMobile}
          isOpenSubMenu={openSubMenu}
          setOpenSubMenu={setOpenSubMenu}
          isOpenMenu={openMenu}
        />
        {isMobile &&
          <S.Footer>PORTAL DE PLANOS by <LogoZelas className='logo' /></S.Footer>}
      </S.Nav>
      {openMenu && <GlobalStyle />}
    </S.MenuWrapper>
  )
}

const MenuLinks = ({ menu, isMobile, isOpenSubMenu, setOpenSubMenu, isOpenMenu }) => {
  const [subMenuIndex, setSubMenuIndex] = useState(undefined)

  const toogleSubMenu = (index) => {
    setOpenSubMenu(!isOpenSubMenu)
    index === undefined ? setTimeout(() => setSubMenuIndex(index), 300) : setSubMenuIndex(index)
  }

  return (
    <S.Menu>
      {menu.map(({ primary, items }, index) => (
        <S.MenuItem key={index} isOpenSubMenu={isOpenSubMenu} className='menu-item'>
          {!isMobile &&
            <>
              <LinkDuo className='menu-link' to={RichLink.url(primary.link, linkResolver)}>{primary.label}</LinkDuo>
              {items.length > 0 && <ArrowDown className='icon' />}
              <SubMenuLinks items={items} />
            </>}
          {isMobile &&
            <S.MobileMenuWrapper onClick={() => toogleSubMenu(index)} isOpenMenu={isOpenMenu}>
              {primary.label} <ArrowRight className='icon' />
            </S.MobileMenuWrapper>}
        </S.MenuItem>
      ))}
      {isMobile && <MobileSubmenu isOpenSubMenu={isOpenSubMenu} toogleSubMenu={toogleSubMenu} menu={menu} subMenuIndex={subMenuIndex} />}
    </S.Menu>
  )
}

const SubMenuLinks = ({ items }) =>
  items.filter(sub => sub.label).length
    ? <S.SubMenu className='submenu'>
      {items.filter(sub => sub.label).map((subItems, index) => (
        <li className='submenu-item' key={index}>
          <LinkDuo className='submenu-link' to={RichLink.url(subItems.link, linkResolver)}>{subItems.label}</LinkDuo>
        </li>
      ))}
    </S.SubMenu>
    : null

const MobileSubmenu = ({ menu, subMenuIndex, isOpenSubMenu, toogleSubMenu }) => {
  const { items, primary } = subMenuIndex !== undefined ? menu[subMenuIndex] : {}

  return (
    <S.SubMenuWrapper isOpenSubMenu={isOpenSubMenu}>
      <S.Back>
        <ArrowLeft className='icon' onClick={() => toogleSubMenu(undefined)} />
      </S.Back>
      {subMenuIndex !== undefined &&
        <div className='submenu-column'>
          <LinkDuo className='submenu-link first-submenu-link' to={RichLink.url(primary.link, linkResolver)}>{primary.label}</LinkDuo>
          <SubMenuLinks items={items} />
        </div>}
    </S.SubMenuWrapper>
  )
}

const GlobalStyle = createGlobalStyle`
  #root {
    height: 100vh;
    overflow: hidden;
  }
`

Menu.propTypes = {
  menu: PropTypes.array
}

Menu.defaultProps = {
  items: [],
  menu: []
}

MenuLinks.propTypes = {
  menu: PropTypes.array,
  isMobile: PropTypes.bool,
  isOpenSubMenu: PropTypes.bool,
  setOpenSubMenu: PropTypes.func,
  isOpenMenu: PropTypes.bool
}

SubMenuLinks.propTypes = {
  items: PropTypes.array
}

MobileSubmenu.propTypes = {
  menu: PropTypes.array,
  subMenuIndex: PropTypes.string,
  isOpenSubMenu: PropTypes.bool,
  toogleSubMenu: PropTypes.func
}

const S = {
  MenuWrapper: styled.div`
    display: flex;
    align-items: center;
    height: 100%;

    .toggleMenu {
      position: absolute;
      top: 50%;
      right: 16px;
      font-size: 24px;
      color: var(--be-text-primary);
      transform: translate(-50%, -50%);

      @media ${device.desktop} { display: none; }
    }
  `,
  Nav: styled.nav`
    position: fixed;
    top: 85px;
    left: 0;
    width: 100%;
    height: calc(100vh - 85px);
    padding: 32px 32px 55px;
    margin: 0;
    overflow: hidden;
    background: var(--be-bg-secondary);
    transition: transform .3s .1s ease-in-out;
    transform: scaleY(${({ isOpenMenu }) => isOpenMenu ? '1' : '0'});
    transform-origin: top;

    .menu-item {
      opacity: ${({ isOpenMenu }) => isOpenMenu ? '1' : '0'};
      transition: ${({ isOpenMenu }) => isOpenMenu ? 'opacity .2s .3s' : 'opacity .2s'}, left .3s ease-in-out;
    }

    @media ${device.desktop} {
      position: static;
      width: auto;
      height: 100%;
      padding: 0;
      overflow: visible;
      background: none;
      transition: unset;
      transform: scaleY(1);

      .menu-item {
        opacity: 1;
      }
    }
  `,
  Menu: styled.ul`
    .menu-link, .submenu-link {
      font-size: var(--be-font-size-body2);
      color: var(--be-text-primary);
      white-space: nowrap;
    }

    .menu-link:hover, .submenu-link:hover {
      color: var(--be-brand-primary);
    }

    @media ${device.desktop} {
      display: flex;
      height: 100%;
      margin-bottom: 0;
    }
  `,
  MenuItem: styled.li`
    position: relative;
    left: ${({ isOpenSubMenu }) => isOpenSubMenu ? '-100vw' : '0'};
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    list-style: none;
    transition: opacity .2s, left .3s ease-in-out;

    div:first-child {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    .icon {
      margin-left: 4px;
      font-size: 16px;
    }

    @media ${device.desktop} {
      position: relative;
      flex-direction: row;
      align-items: center;
      width: auto;
      height: 100%;
      padding-left: 24px;
      margin-bottom: 0;

      &:hover {

        .icon {
          color: var(--be-brand-primary);
          transform: rotate(180deg);
        }

        .submenu {
          max-height: 500px;
          padding-top: 32px;
          padding-bottom: 32px;
          border-top: 2px solid var(--be-brand-primary);
          transition: border-top .2s, max-height .2s .1s ease-in-out, padding-top .2s .1s, padding-bottom .2s .1s;

          .submenu-item {
            opacity: 1;
            transition: opacity .2s .2s ease-in-out;
          }
        }
      }
    }
  `,
  SubMenuWrapper: styled.div`
    position: absolute;
    top: 0;
    left: ${({ isOpenSubMenu }) => isOpenSubMenu ? '0' : '100vw'};
    width: 100vw;
    height: 100%;
    padding: 35px 25px 65px;
    overflow-y: auto;
    background: var(--be-bg-secondary);
    transition: left .3s ease-in-out;

    .submenu-column {
      padding-left: 50px;

      .first-submenu-link {
        display: inline-block;
        margin-bottom: 20px;
        font-weight: var(--be-font-weight-semibold);
      }
    }

    @media ${device.desktop} { flex-direction: row; }
  `,
  SubMenu: styled.ul`
    list-style-type: none;

    .submenu-item {
      margin-bottom: 12px;
    }

    @media ${device.desktop} {
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 252px;
      max-height: 0;
      padding-top: 0;
      margin-bottom: 0;
      overflow: hidden;
      list-style: none;
      background-color: var(--be-bg-secondary);
      border-top: 0 solid transparent;
      box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
      transition: border-top .2s .2s, padding-top .2s, padding-bottom .2s, max-height .2s ease-in-out;

      .submenu-item {
        padding: 0 24px;
        margin-bottom: 8px;
        opacity: 0;

        .submenu-link {
          font-size: var(--be-font-size-body2);
        }
      }
    }
  `,
  MobileMenuWrapper: styled.div`
    width: 100%;
    opacity: ${({ isOpenMenu }) => isOpenMenu ? '1' : '0'};
    transition: opacity .8s ease-in-out;
  `,
  Back: styled.button`
    position: absolute;
    top: 30px;
    left: 25px;
    background: none;
    border: none;
    appearance: none;

    .icon {
      font-size: 24px;
    }
  `,
  Footer: styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 55px;
    padding: 16px;
    font-size: var(--be-font-size-caption2);
    font-weight: var(--be-font-weight-semibold);
    text-transform: none;
    background: var(--be-bg-secondary);

    .logo {
      font-size: 58px;
    }

    @media ${device.desktop} {
      display: none;
    }
  `
}

export default Menu
