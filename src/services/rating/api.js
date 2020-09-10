import graphqlClient from './client'

export const getPageRating = async function (url) {
  const query = {
    query: `
      query getRating {
        getRating(url: "${url}") {
          average
          lowestRate
          highestRate
          total
        }
      }
    `
  }

  const result = await graphqlClient(query)
  return result.data.getRating
}

export const setPageRating = async function (url, rate) {
  const mutation = {
    query: `
      mutation setRating {
        setRating(url: "${url}", rate: ${rate}) {
          average
          lowestRate
          highestRate
          total
        }
      }
    `
  }

  const result = await graphqlClient(mutation)
  return result.data.setRating
}
