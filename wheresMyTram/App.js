// https://www.npmjs.com/package/navigationbar-react-native

import React, { useState, useEffect } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { NavigationBar } from 'navigationbar-react-native'
import Map from './components/Map'
import Menu from './components/Menu'
import {
  ComponentLeft,
  ComponentCenter,
  ComponentRight,
} from './components/Components'
/* import { setTrams, setTramRoutesOnMap } from './reducers/tramsReducer'
import { setStops } from './reducers/stopsReducer'
import { setMyStop } from './reducers/myStopReducer'
import { 
  setPosition,
  setCenter,
  setPossibleRoutes,
} from './reducers/settingsReducer' */
//import { connect } from 'react-redux'
/* import { Provider } from 'react-redux'
import store from './store' */
import play from './utils/sound'
import client, {
  tramStopsQuery,
  stopsByRadiusQuery,
  checkRoutes,
} from './utils/queries'

const App = (
  {
    /* setTrams,
  setStops,
  myStop,
  setMyStop,
  settings,
  setPosition,
  setCenter,
  setPossibleRoutes,
  setTramRoutesOnMap, */
  }
) => {
  const [show, setShow] = useState(true)
  const [trams, setTrams] = useState([])
  const [myTram, setMyTram] = useState('')
  const [myStop, setMyStop] = useState('')
  const [possibleRoutes, setPossibleroutes] = useState([])
  const [alarm, setAlarm] = useState(false)


  //console.log('rendering äppi', show)

  /*  useEffect(() => {
    client.query({ query: tramStopsQuery }).then(response => {
      //console.log('GRAPHQL - ALLROUTES - QUERY:', response.data.routes)
      setTramRoutesOnMap(response.data.routes)
    })
  }, []) */

  /*  const stopsQuery = location => {
    client
      .query({ query: stopsByRadiusQuery(location, settings.radius) })
      .then(response => {
        let allStops = response.data.stopsByRadius.edges
          .map(edge => edge.node.stop)
          .filter(stop => stop.vehicleType === 0)
        setStops(allStops)
        //console.log('GRAPHQL - stopsByRadiusQuery:', allStops)
        console.log(allStops.length, 'PYSÄKKIÄ LÖYTYI PAIKASTA', location.lat, location.lng)
        if (allStops.length > 0) {
          setMyStop(allStops[0])
        } else {
          setMyStop('')
        }
      })
  } */

  /* useEffect(() => {
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
        console.log(
          1,
          settings.geoLocation ? 'GEOLOCATION' : 'DEFAULT LOCATION',
          location
        )
        setPosition(location)
        setCenter(location)
        stopsQuery(location)
      })
    } else {
      stopsQuery(settings.defaultCenter)
      setCenter(settings.defaultCenter)
      setPosition(settings.defaultCenter) // ??????????????????????
    }
  }, [settings.geoLocation])  */

  /*  useEffect(() => { */
  const taimeri = setInterval(() => {
    //console.log('RATIKAT', ratikat)
    fetch('https://arcane-shore-64535.herokuapp.com/trams')
      .then(response => response.json())
      .then(body => {
        //console.log(body.length,'TRAMS', new Date())
        setTrams(body.map(tram => tram.VP))
      })
      .catch(error => {
        console.log(error)
      })
  }, 1000)
  /*   }, []) */

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
    <View style={styles.container}>
      <NavigationBar
        componentLeft={() => <ComponentLeft play={play} />}
        componentCenter={() => (
          <ComponentCenter setShow={setShow} show={show} />
        )}
        componentRight={() => <ComponentRight />}
        navigationBarStyle={{ backgroundColor: '#215e79' }}
        statusBarStyle={{
          barStyle: 'light-content',
          backgroundColor: '#215e79',
        }}
      />
      {show ? (
        <Map 
        trams={trams}
        myTram={myTram} 
        possibleRoutes={possibleRoutes}
        alarm={alarm}
        style={styles.map} />
      ) : (
        <Menu style={styles.menu} />
      )}
    </View>
  )
}

/* const mapStateToProps = state => {
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
} */

/* export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Appi) */

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  menu: {
    flex: 1,
    height: 10,
  },
  map: {
    flex: 1,
  },
})

/* 
import React, { Component, useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native'

import Map from './components/Map'
import Menu from './components/Menu'

const App = () => {
  return (
    <View style={styles.container}>
      <Menu />
      <Map />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  menu: {
    flex: 1,
    height: 10,
  },
  map: {
    flex: 1,
  },
})

export default App */

/* import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up Äpp.js to start working on your äpp!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */
