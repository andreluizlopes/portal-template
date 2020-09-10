import React from 'react'
import TestRenderer from 'react-test-renderer'

import UIBase from './UIBase'

describe('UIBase', () => {
  it('should render with default props', () => {
    const expectedProps = {
      constrains: false,
      marginBottom: 0,
      as: 'section'
    }

    const testRenderer = TestRenderer.create(<UIBase component={() => <h1>test</h1>} />)
    const testInstance = testRenderer.root
    const { constrains, marginBottom } = testInstance.props

    expect(constrains).toBeFalsy()
    expect(marginBottom).toBe(0)
    expect(testInstance.findAllByType(expectedProps.as)).toBeTruthy()
  })

  it('should render the wrapper component with provided "as" prop', () => {
    const props = {
      component: () => <h1>component</h1>,
      as: 'footer'
    }
    const testRenderer = TestRenderer.create(<UIBase {...props} />)
    const testInstance = testRenderer.root

    expect(testInstance.findAllByType(props.as)).toBeTruthy()
  })

  it('should throw an error when try to render without component prop', () => {
    expect(() => TestRenderer.create(<UIBase />))
      .toThrow(/The prop `component` is marked as required .*, but its value is `undefined`./)
  })
})
