import React from 'react'
import TestRenderer from 'react-test-renderer'

import Grid from './'

describe('Grid', () => {
  it('should throw a warning when try to render with children other than `Column` type', () => {
    expect(() => TestRenderer.create(<Grid><div /></Grid>))
      .toThrow(/`Grid` children's is not of type `Column`./)
  })
})
