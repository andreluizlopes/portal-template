import React from 'react'
import { RichText } from 'prismic-reactjs'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'

import htmlSerializer from './htmlSerializer'

describe('Helper: htmlSerializer', () => {
  let wrapper
  const content = [
    {
      type: 'paragraph',
      text:
        '"Link to anchor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat ExterLink non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." Link to anchor A',
      spans: [
        {
          start: 198,
          end: 214,
          type: 'hyperlink',
          data: {
            link_type: 'Web',
            url: 'https://google.com',
            target: '_blank'
          }
        },
        {
          start: 198,
          end: 214,
          type: 'label',
          data: {
            label: 'button'
          }
        },
        {
          start: 351,
          end: 360,
          type: 'label',
          data: {
            label: 'button'
          }
        },
        {
          start: 375,
          end: 384,
          type: 'hyperlink',
          data: {
            link_type: 'Web',
            url: 'https://google.com',
            target: '_blank'
          }
        },
        {
          start: 375,
          end: 384,
          type: 'label',
          data: {
            label: 'button'
          }
        },
        {
          start: 463,
          end: 479,
          type: 'hyperlink',
          data: {
            link_type: 'Web',
            url: 'https://contrateaqui.net/teste#anchor-link'
          }
        }
      ]
    }
  ]

  beforeEach(() => {
    wrapper = render(
      <BrowserRouter>
        {RichText.render(content, null, htmlSerializer)}
      </BrowserRouter>
    )
  })

  it('should call an anchor link', () => {
    const { getByText } = wrapper
    expect(getByText('Link to anchor A').closest('a')).toHaveAttribute(
      'href',
      '/teste#anchor-link'
    )
  })
})
