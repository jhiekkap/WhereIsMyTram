import React, { useEffect } from 'react'
import { setTrams } from './reducers/tramsReducer'
import { setStops } from './reducers/stopsReducer'
import { setMyStop } from './reducers/myStopReducer'
import { setPosition, setCenter } from './reducers/settingsReducer'
import './App.css'
import LeafletMap from './components/LeafletMap'
import Sidebar from './components/Sidebar'
import ApolloClient, { gql } from 'apollo-boost'
import { connect } from 'react-redux'

const client = new ApolloClient({
  uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
})

const RADIUS = 500

const App = ({ setTrams, setStops, setMyStop, settings, setPosition, setCenter }) => {
  useEffect(() => {
    if ('geolocation' in navigator) {
      console.log('geolocation is available')
      navigator.geolocation.getCurrentPosition(position => {
        let location = settings.geoLocation
          ? {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
          : settings.defaultCenter
        console.log(
          1,
          settings.geoLocation ? 'GEOLOCATION' : 'DEFAULT LOCATION',
          location
        )
        setPosition(location)
        if(settings.geoLocation){
          setCenter(location)
        }
        const query = gql`
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
        client.query({ query }).then(response => {
          console.log('GRAPHQL - QUERY!', query)
          let allStops = response.data.stopsByRadius.edges
            .map(edge => edge.node.stop)
            .filter(stop => stop.vehicleType === 0)
          setStops(allStops)
          console.log(2, allStops)
          if (allStops.length > 0) {
            setMyStop(allStops[0])
          }
        })
      })
    } else {
      console.log('geolocation is NOT available')
    }
  }, [settings.geoLocation])

  useEffect(() => {
    setInterval(() => {
      fetch('/trams')
        .then(response => response.json())
        .then(body => {
          setTrams(body)
        })
        .catch(error => {
          console.log(error)
        })
    }, 1000)
  }, [])

  return (
    <div>
      <Sidebar />
      <LeafletMap />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    settings: state.settings,
  }
}

const mapDispatchToProps = {
  setTrams,
  setStops,
  setMyStop,
  setPosition,
  setCenter,
}

export default connect(
  //null,
  mapStateToProps,
  mapDispatchToProps
)(App)
