import kebabCase from 'lodash/kebabCase'

export default function htmlID (text) {
  if (!text) {
    return {}
  }

  return {
    id: kebabCase(text)
  }
}
