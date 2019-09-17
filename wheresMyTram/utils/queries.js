import ApolloClient, { gql } from 'apollo-boost' 

const client = new ApolloClient({
  uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
})

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

export const stopsByRadiusQuery = (location, radius) => gql`
{
  stopsByRadius(lat:${location.lat}, lon:${location.lng}, radius:${radius}) {
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

export const checkRoutes =  stop => {
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



export default client



/* 

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
  ` */

//  pysäkin linjat

/* export const tramRoutesQuery = gql`

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
` */