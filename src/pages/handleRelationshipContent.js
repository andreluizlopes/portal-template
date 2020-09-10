import api from '../prismic'

const filterArticleList = results =>
  results.map(post =>
    ({ uid: post.uid, tags: post.tags, thumbnail: post.data.thumbnail, title: post.data.title }))

const handleRelationshipContent = async (req, document) => {
  if (!document) {
    return false
  }
  const newDocument = JSON.parse(JSON.stringify(document))

  // handle with primary layout relationship
  if (document.layout && document.layout.uid) {
    newDocument.layout = await api(req).then(s => s.getByUID(
      [document.layout.type],
      document.layout.uid,
      {
        fetchLinks: [
          'general_info.logo',
          'general_info.favicon',
          'general_info.gtm'
        ]
      }
    ))
  } else if (document.data && document.data.layout && document.data.layout.uid) {
    newDocument.data.layout = await api(req).then(s => s.getByUID([document.data.layout.type], document.data.layout.uid, {
      fetchLinks: [
        'general_info.logo',
        'general_info.favicon',
        'general_info.gtm'
      ]
    }))
  }

  // handle article_list
  if (document.data && document.data.relations && document.data.relations[0].article_list === 'true') {
    const articleList = await getArticleList(req, 'article', null, 6)
    newDocument.data.article_list = filterArticleList(articleList.results)
  }

  // handle with article_list/article_banner slices relationship
  const relationshipPromises = document.body
    ? document.body
      .filter(items => items.slice_type === 'article_list' || items.slice_type === 'home_banner')
      .map(({ primary }) => getArticleList(req, 'article', primary.tag, primary.size))
    : document.data.body
      .filter(items => items.slice_type === 'article_list')
      .map(({ primary }) => getArticleList(req, 'article', primary.tag, primary.size))

  const relationship = await Promise.all(relationshipPromises)
  let i = 0
  newDocument.body
    ? newDocument.body.forEach((items, index) => {
      if (items.slice_type === 'article_list' || items.slice_type === 'home_banner') {
        newDocument.body[index].items = filterArticleList(relationship[i].results)
        i++
      }
    })
    : newDocument.data.body.forEach((items, index) => {
      if (items.slice_type === 'article_list') {
        newDocument.data.body[index].items = filterArticleList(relationship[i].results)
        i++
      }
    })

  return newDocument
}

const getArticleList = (req, type, tag, pageSize = 20, page = 1) => {
  if (tag) {
    return api(req).then(s => s.listArticlesTypeTag(type, tag, pageSize, page))
  }

  return api(req).then(s => s.listArticlesType(type, pageSize))
}

export default handleRelationshipContent
