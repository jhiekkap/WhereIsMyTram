const query = gql`
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

const query = gql`

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

const tramRoutesQuery = gql`

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

const tramStopsQuery = gql`
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