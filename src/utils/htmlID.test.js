import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import htmlID from './htmlID'

describe('htmlID', () => {
  it('should render component with ID', () => {
    const { getByTestId } = render(<div {...htmlID('My ID')} data-testid='teste' />)
    expect(getByTestId('teste')).toHaveAttribute('id', 'my-id')
  })

  it('should not render componente without ID', () => {
    const { getByTestId } = render(<div {...htmlID()} data-testid='teste' />)
    expect(getByTestId('teste')).not.toHaveAttribute('id')
  })
})
