import ApolloClient, { gql } from 'apollo-boost'

const client = new ApolloClient({
  uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
})

const checkRoutes =  stop => {
  const query = gql`

    {
        stop(id: "${stop}") {
          name
          wheelchairBoarding
          routes {
            id
            shortName
            longName
            gtfsId
            
          }
        }
      }
      `

  return client.query({ query })
}

export default checkRoutes
