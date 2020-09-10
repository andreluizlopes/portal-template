import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import { render } from '@testing-library/react'
import React from 'react'

import Sitemap from './'

const defaultProps = [
  { list_level: 'level_1', list: [{ type: 'heading2', text: 'Level 1', spans: [] }] },
  { list_level: 'level_2', list: [{ type: 'list-item', text: 'Level 2', spans: [] }] }
]

describe('Sitemap', () => {
  it('should render a list with two levels', () => {
    const { container } = render(<Sitemap items={defaultProps} />)

    const listLevel1 = container.querySelector('ul')
    const listLevel2 = listLevel1.querySelector('ul')

    expect(listLevel1.querySelector('h2').textContent).toBe('Level 1')
    expect(listLevel2.textContent).toBe('Level 2')
  })
})
