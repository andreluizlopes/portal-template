import axios from 'axios'
import '@testing-library/jest-dom/extend-expect'

import { zipCodeCoverage } from './api'

jest.mock('axios')

describe('zipCodeCoverage', () => {
  it('should return an empty object without zip code', async () => {
    const coverage = await zipCodeCoverage()
    expect(coverage).toMatchObject({})
  })

  it('should return object if request is true', async () => {
    axios.get.mockResolvedValue({ data: { wired: true } })

    const coverage = await zipCodeCoverage('84031480')
    expect(coverage).toMatchObject({ vivo: true, claro: true })
  })

  it('should return object if request is false', async () => {
    axios.get.mockResolvedValue({ data: { wired: false } })

    const coverage = await zipCodeCoverage('37730000')
    expect(coverage).toMatchObject({ vivo: false, claro: false })
  })
})
