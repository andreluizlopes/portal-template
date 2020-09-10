import robots from './robots'
import { siteHost } from '../config'

const mockResponse = () => {
  const res = {}
  res.send = jest.fn().mockReturnValue(res)
  res.type = jest.fn().mockReturnValue(res)
  return res
}

describe('Robots', () => {
  test('Allow robots', () => {
    const req = {}
    req.hostname = siteHost
    const res = mockResponse()
    robots(req, res)
    expect(res.send).toHaveBeenCalledWith('User-agent: *\nSitemap: https://' + siteHost + '/sitemap.xml')
  })
})
