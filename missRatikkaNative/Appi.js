
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { setVehicles, setVehicleRoutesOnMap } from './reducers/vehiclesReducer'
import { setStops } from './reducers/stopsReducer'
import { setMyStop } from './reducers/myStopReducer'
import {
  setPosition,
  setCenter,
  setPossibleRoutes,
} from './reducers/settingsReducer'
import client, {
  vehicleStopsQuery,
  stopsByRadiusQuery,
  checkRoutes,
} from './utils/queries'
import Menu from './components/Menu'
import Map from './components/Map'

const Appi = ({
  /* vehicles,
  myVehicle, */
  setVehicles,
  myStop,
  setVehicleRoutesOnMap,
  setPossibleRoutes,
  setStops,
  setMyStop,
  setPosition,
  setCenter,
  settings,
}) => { 
  const [show, setShow] = useState(true)  
  //console.log('RENDERING APPI')
  useEffect(() => {
    client.query({ query: vehicleStopsQuery('vehicle') }).then(response => {
      console.log('GRAPHQL - ALLROUTES - QUERY:', response.data.routes.length)
      setVehicleRoutesOnMap(response.data.routes)
    })
  }, [])

  const stopsQuery = location => {
    client
      .query({ query: stopsByRadiusQuery(location, settings.radius) })
      .then(response => {
        let allStops = response.data.stopsByRadius.edges
          .map(edge => edge.node.stop)
          .filter(stop => stop.vehicleType === 0)
        setStops(allStops)
        console.log('GRAPHQL - stopsByRadiusQuery:', allStops.length)
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
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }
          : settings.defaultCenter
        console.log(
          1,
          settings.geoLocation ? 'GEOLOCATION' : 'DEFAULT LOCATION',
          location
        )
        console.log('NJEEEEETTT')
        setPosition(...settings.position, {location})
        setCenter(...settings.center, {location})
        stopsQuery({location})
      })
    } else {
      console.log('DAAAAAA')
      stopsQuery(settings.defaultCenter)
      setCenter(settings.defaultCenter)
      setPosition(settings.defaultCenter) // ??????????????????????
    }
  }, [settings.geoLocation])

   useEffect(() => {
    const timer = setInterval(() => {   
      fetch('https://arcane-shore-64535.herokuapp.com/trams') ///////????????????
        .then(response => response.json())
        .then(body => {
          setVehicles(body.map(vehicle => vehicle.VP))
          console.log(new Date())
          //console.log('MYSTOPPI', myStop)
        })
        .catch(error => {
          console.log(error)
        })
     }, 1000)
  }, [])  

  useEffect(() => {
    console.log('myStop changed:', myStop.name)
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
    <View style={styles.container}> 
      {show ? (
        <Map 
          style={styles.map}
        />
      ) : (
        <Menu style={styles.menu} />
      )} 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6FEFEA',
    /* backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', */
  },
  menu: {
    flex: 1,
    height: 10,
  }, 
  map: {
    /* flex: 1, */
    top:0,
    right:0,
    bottom:0,
    left:0,
    position: 'absolute' 
  },
  navbar: {
    flex: 1,
    marginTop:0,
  },
  navbarDown: {
    flex: 1,
    marginTop:0, 
  },
})

const mapStateToProps = state => {
  return {
    vehicles: state.vehicles.vehicles,
    myVehicle: state.myVehicle,
    settings: state.settings,
    myStop: state.myStop,
  }
}

const mapDispatchToProps = {
  setVehicles,
  setStops,
  setMyStop,
  setPosition,
  setCenter,
  setPossibleRoutes,
  setVehicleRoutesOnMap,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Appi)
