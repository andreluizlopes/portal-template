import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

import Typography from './Typography'
import Variables from './Variables'
import Button from './Button'

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  #root {
    padding-top: 70px;
    background: var(--be-bg-primary);
  }

  img {
    max-width: 100%;
  }

  ${Variables}
  ${Typography}
  ${Button}
`

export default GlobalStyle
