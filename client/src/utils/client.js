import ApolloClient, { gql } from 'apollo-boost'


const client = new ApolloClient({
    uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
  })

  let center = { lat: 60.169800, lng: 24.939500 }
  export const query = gql`
  {
    stopsByRadius(lat: ${center.lat}, lon:${center.lng}, radius: 400) {
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