import ApolloClient, { gql } from 'apollo-boost' 


const query1 = gql`
  {
    routes(name: "2", transportModes: TRAM) {
      gtfsId
      shortName
      longName
      mode
      stops {
        gtfsId
      }
    }
  }
`

// linjan pysäkit

const query2 = gql`

{
    stop(id: "HSL:1112432") {
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

//  pysäkin linjat

export const tramRoutesQuery = gql`

{
  routes(transportModes: TRAM) {
    gtfsId
    shortName
    longName
    mode
    patterns{
      geometry {
        lat
        lon
      }
    }
  }
}
`

export const tramStopsQuery = gql`
{
  routes(transportModes: TRAM) {
    shortName
    longName
    stops {
      lat
      lon
    }
  }
}
`

export const stopsByRadiusQuery = (location, RADIUS) => gql`
{
  stopsByRadius(lat:${location.lat}, lon:${location.lng}, radius:${RADIUS}) {
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
 const client = new ApolloClient({
  uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
})


export default client