import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTrams, setTramRoutesOnMap } from './reducers/tramsReducer'
import { setStops } from './reducers/stopsReducer'
import { setMyStop } from './reducers/myStopReducer'
import {
  setPosition,
  setCenter,
  setPossibleRoutes,
} from './reducers/settingsReducer'
import './App.css'
import LeafletMap from './components/LeafletMap'
import Sidebar from './components/Sidebar'
import client, {
  vehicleStopsQuery,
  stopsByRadiusQuery,
  checkRoutes,
} from './utils/queries'

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
    client
      .query({ query: vehicleStopsQuery(settings.vehicleType) })
      .then(response => {
        console.log('GRAPHQL - ALLROUTES - QUERY:', response.data.routes)
        setTramRoutesOnMap(response.data.routes)
      })
  }, [])

  const stopsQuery = location => {
    client
      .query({ query: stopsByRadiusQuery(location, settings.radius) })
      .then(response => {
        let allStops = response.data.stopsByRadius.edges.map(
          edge => edge.node.stop
        )
          .filter(stop => stop.vehicleType === 0)
        setStops(allStops)
        console.log('GRAPHQL - stopsByRadiusQuery:', allStops)
        if (allStops.length > 0) {
          setMyStop(allStops[0])
        } else {
          setMyStop('')
        }
      })
  }

  useEffect(() => {
    if ('geolocation' in navigator) {
      console.log('geolocation is available')
    } else {
      console.log('geolocation is NOT available')
    }
    if (settings.geoLocation && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        let location = settings.geoLocation
          ? {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          : settings.defaultCenter
        console.log(1, settings.geoLocation ? 'GEOLOCATION' : 'DEFAULT LOCATION', location)
        setPosition(location)
        setCenter(location)
        stopsQuery(location)
      })
    } else {
      stopsQuery(settings.defaultCenter)
      setCenter(settings.defaultCenter)
      setPosition(settings.defaultCenter) // ??????????????????????
    }
  }, [settings.geoLocation])

  const paths = {
    'TRAM': '/trams',
    'BUS': '/buses',
    'TRAIN': '/trains'
  }

  useEffect(() => {
    let interval = setInterval(() => {
      fetch(paths[settings.vehicleType])
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
    console.log('myStop has changed:', myStop)
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
      <LeafletMap stopsQuery={stopsQuery} />{' '}
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
