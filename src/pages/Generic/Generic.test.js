import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import Generic from './index'

const renderWithRouter = children => render(
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

const defaultProps = {
  document: {
    data: {
      banner: [],
      breadcrumb: [],
      body: [],
      layout: {
        data: {
          'phones-links': [
            {
              __phone1: ''
            }
          ],
          footernav: [],
          general_info: {
            data: {}
          }
        }
      }
    }
  }
}

describe('Generic', () => {
  it('should render', () => {
    const { container } = renderWithRouter(<Generic {...defaultProps} />)

    expect(container).toBeInTheDocument()
  })
})
