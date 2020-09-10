import axios from 'axios'
import { endpoint } from './config'

const vivoCoverage = coverage =>
  Object.keys(coverage).filter(item => coverage[item]).length > 0

const claroCoverage = coverage =>
  coverage.wired || false

export const zipCodeCoverage = async (zipCode) => {
  if (!zipCode) {
    return {}
  }

  const operators = Object.freeze({
    vivo: {
      api: axios.get(`${endpoint}?cep=${zipCode}&provider=vivo`)
    },
    claro: {
      api: axios.get(`${endpoint}?cep=${zipCode}`)
    }
  })

  const coverage = await Promise.all(Object.values(operators).map(item => item.api))

  return {
    vivo: vivoCoverage(coverage[0].data),
    claro: claroCoverage(coverage[1].data)
  }
}
