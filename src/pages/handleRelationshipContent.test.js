import handleRelationshipContent from './handleRelationshipContent'

describe('handleRelationshipContent', () => {
  it('should return same document when there is no footer and article_list', async () => {
    const document = {
      body: []
    }

    const newDocument = await handleRelationshipContent(null, document)

    expect(JSON.stringify(newDocument)).toMatch(JSON.stringify(document))
  })
})
