// https://www.npmjs.com/package/navigationbar-react-native

import { NavigationBar } from 'navigationbar-react-native'
import {
  ComponentLeftUp,
  ComponentCenterUp,
  ComponentRightUp,
  ComponentLeftDown,
  ComponentCenterDown, 
  ComponentRightDown,
} from './components/Components'
//import play from './utils/sound'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { setTrams, setTramRoutesOnMap } from './reducers/tramsReducer'
import { setStops } from './reducers/stopsReducer'
import { setMyStop } from './reducers/myStopReducer'
import {
  setPosition,
  setCenter,
  setPossibleRoutes,
} from './reducers/settingsReducer'
import client, {
  tramStopsQuery,
  stopsByRadiusQuery,
  checkRoutes,
} from './utils/queries'
import Menu from './components/Menu'
import Map from './components/Map'

const Appi = ({
  trams,
  myTram,
  setTrams,
  myStop,
  setTramRoutesOnMap,
  setPossibleRoutes,
  setStops,
  setMyStop,
  setPosition,
  setCenter,
  settings,
}) => {
  //const [counter, setCounter] = useState(0)
  const [show, setShow] = useState(true)  
  //console.log('RENDERING APPI')
  useEffect(() => {
    client.query({ query: tramStopsQuery }).then(response => {
      console.log('GRAPHQL - ALLROUTES - QUERY:', response.data.routes.length)
      setTramRoutesOnMap(response.data.routes)
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

 /*  useEffect(() => {
    const timer = setInterval(() => {  */
      fetch('https://arcane-shore-64535.herokuapp.com/trams')
        .then(response => response.json())
        .then(body => {
          setTrams(body.map(tram => tram.VP))
          console.log(new Date())
          //console.log('MYSTOPPI', myStop)
        })
        .catch(error => {
          console.log(error)
        })
  /*   }, 1000)
  }, []) */

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
       {/* <NavigationBar
        componentLeft={() => <ComponentLeftUp  />}
        componentCenter={() => (
          <ComponentCenterUp setShow={setShow} show={show} />
        )}
        componentRight={() => <ComponentRightUp settings={settings}  setCenter={setCenter}/>}
        navigationBarStyle={{ backgroundColor: '#6FEFEA' }}
        statusBarStyle={{ 
          barStyle: 'light-content',
          backgroundColor: '#6FEFEA',
        }}
      />  */}

       {/* <Text>
        Open up to fart {trams.length} working on your räppi nr. {counter}!
      </Text>
      <Button title='push' onPress={() => setCounter(counter + 1)} />
  */}
      {show ? (
        <Map 
          style={styles.map}
        />
      ) : (
        <Menu style={styles.menu} />
      )}
 
      {/* <NavigationBar
        style={styles.navbarDown}
        componentLeft={() => <ComponentLeftDown show={show} setShow={setShow} />}
        componentCenter={() => (
          <ComponentCenterDown   settings={settings} setCenter={setCenter}/>
        )}
        componentRight={() => <ComponentRightDown trams={trams} myTram={myTram} setCenter={setCenter} settings={settings}/>}
        navigationBarStyle={{ backgroundColor: '#6FEFEA' }}
         statusBarStyle={{ 
          barStyle: 'light-content',
          backgroundColor: '#6FEFEA',
        }} 
      /> */}
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
    trams: state.trams.trams,
    myTram: state.myTram,
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
)(Appi)
