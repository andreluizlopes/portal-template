import { siteHost } from '../config'

const allowRobots = `User-agent: *
Sitemap: https://${siteHost}/sitemap.xml`

const disallowRobots = `User-agent: *
Disallow: /`

export default function robots (req, res) {
  res.type('text/txt')
  return res.send((req.hostname === siteHost) ? allowRobots : disallowRobots)
}
