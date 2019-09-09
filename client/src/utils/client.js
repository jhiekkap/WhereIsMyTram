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


/* {
  stop(id: "HSL:1140447") {
    name
    stoptimesWithoutPatterns(numberOfDepartures:100 ) {
      scheduledArrival
      realtimeArrival
      arrivalDelay
      scheduledDeparture
      realtimeDeparture
      departureDelay
      realtime
      realtimeState
      serviceDay
      headsign 
      
      trip { 
        route {
          id
          longName
          shortName 
          
        }
      }
    }
  }
} */