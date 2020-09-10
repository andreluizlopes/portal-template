import { linkResolver } from './prismic'

describe('test link resolver', () => {
  it('should resolve home url', () => {
    expect(linkResolver({ type: 'home' })).toBe('/')
  })

  it('should resolve generic url', () => {
    expect(linkResolver({ type: 'generic', uid: 'net--net-internet' })).toBe('/net/net-internet/')
  })
})
