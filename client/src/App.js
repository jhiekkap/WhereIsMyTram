import React, { useEffect } from 'react'
import { setTrams, setTramRoutesOnMap } from './reducers/tramsReducer'
import { setStops, showStopsPopup } from './reducers/stopsReducer'
import { setMyStop } from './reducers/myStopReducer'
import {
  setPosition,
  setCenter,
  setPossibleRoutes,
} from './reducers/settingsReducer'
import checkRoutes from './utils/queryCheck'
import './App.css'
import LeafletMap from './components/LeafletMap'
import Sidebar from './components/Sidebar' 
import { connect } from 'react-redux'
import client, { tramStopsQuery, stopsByRadiusQuery } from './utils/queries'
 const RADIUS = 500

const App = ({
  setTrams,
  setStops,
  myStop,
  setMyStop,
  settings,
  setPosition,
  setCenter,
  setPossibleRoutes,
  setTramRoutesOnMap,
}) => {
 
  useEffect(() => { 
    client.query({ query:tramStopsQuery }).then(response => {
      console.log('GRAPHQL - ALLROUTES - QUERY!')
      console.log(response.data.routes)
      setTramRoutesOnMap(response.data.routes)
    })
  }, [])
  
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
        if (settings.geoLocation) {
          setCenter(location)
        }
 
        client.query({ query:stopsByRadiusQuery(location, RADIUS) }).then(response => { 
          let allStops = response.data.stopsByRadius.edges
            .map(edge => edge.node.stop)
            .filter(stop => stop.vehicleType === 0)
          setStops(allStops)
          console.log('GRAPHQL - QUERY:')
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
          setTrams(body.map(tram => tram.VP)) 
        })
        .catch(error => {
          console.log(error)
        })
    }, 1000)
  }, [])

  useEffect(() => {
    console.log('myStop changed:', myStop)
    if (myStop) {
      checkRoutes(myStop.gtfsId).then(routes => {
        let routeNumbers = routes.data.stop.routes.map(route =>
          route.gtfsId.slice(4)
        )
        console.log('routes going through this stop:', routeNumbers)
        setPossibleRoutes(routeNumbers)
      })
    }
  }, [myStop])

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
    myStop: state.myStop,
  }
}

const mapDispatchToProps = {
  setTrams,
  setStops,
  setMyStop,
  setPosition,
  setCenter,
  setPossibleRoutes,
  setTramRoutesOnMap,
}

export default connect( 
  mapStateToProps,
  mapDispatchToProps
)(App)
