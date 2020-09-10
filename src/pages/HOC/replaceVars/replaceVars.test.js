import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '@testing-library/react'

import replaceVars from './replaceVars'

const document = {
  primary: {
    text: 'Test __phone1 __phone2 __phone3 __phone4'
  },
  data: {
    layout: {
      data: {
        'vars': [
          {
            name: '__phone1',
            value: '111'
          },
          {
            name: '__phone2',
            value: '222 222'
          },
          {
            name: '__phone3',
            value: ''
          },
          {
            name: 'phone4',
            value: '444'
          }
        ]
      }
    }
  }
}

const Component = ({ document }) => {
  return <div>{document.primary.text}</div>
}

describe('ReplaceVars', () => {
  it('should replace __phone1 and __phone2', () => {
    const Replaced = replaceVars(Component)
    const { container } = render(<Replaced document={document} />)

    expect(container).toHaveTextContent('111')
    expect(container).toHaveTextContent('222 222')
  })

  it('should remove __phone3', () => {
    const Replaced = replaceVars(Component)
    const { container } = render(<Replaced document={document} />)

    expect(container).not.toHaveTextContent('__phone3')
  })

  it('should not replace phone4', () => {
    const Replaced = replaceVars(Component)
    const { container } = render(<Replaced document={document} />)

    expect(container).toHaveTextContent('__phone4')
  })
})
