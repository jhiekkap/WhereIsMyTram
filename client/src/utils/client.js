import ApolloClient, { gql } from 'apollo-boost'


const client = new ApolloClient({
    uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
  })

  export const query = gql`
  {
    stopsByRadius(lat: 60.170627, lon: 24.939946, radius: 400) {
      edges {
        node {
          stop {
            id
            gtfsId
            name
            lat
            lon
            vehicleType
          }
        } 
      }
    }
  }
`


export default client