import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setShowTrams } from '../reducers/showTramsReducer'
import { setMyTram } from '../reducers/myTramReducer'
import { setTrams } from '../reducers/tramsReducer'
import {
  setCenter,
  setZoom,
  setLine,
  setAlarm,
  setShowLine,
  setDistance,
} from '../reducers/settingsReducer'
import { setMyStop } from '../reducers/myStopReducer'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  DrawerLayoutAndroid,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native'
import distance from '../utils/helpers'

import MapView, { Marker, Callout, UrlTile } from 'react-native-maps'

const tramIcons = {
  ///dynamic 'require' not supported in React Native:)
  '1': require('../assets/img/trams/1tram.png'),
  '1H': require('../assets/img/trams/1Htram.png'),
  '2': require('../assets/img/trams/2tram.png'),
  '2H': require('../assets/img/trams/2Htram.png'),
  '3': require('../assets/img/trams/3tram.png'),
  '3H': require('../assets/img/trams/3Htram.png'),
  '4': require('../assets/img/trams/4tram.png'),
  '4H': require('../assets/img/trams/4Htram.png'),
  '5': require('../assets/img/trams/5tram.png'),
  '5H': require('../assets/img/trams/5Htram.png'),
  '6': require('../assets/img/trams/6tram.png'),
  '6H': require('../assets/img/trams/6Htram.png'),
  '6T': require('../assets/img/trams/6Ttram.png'),
  '7': require('../assets/img/trams/7tram.png'),
  '7H': require('../assets/img/trams/7Htram.png'),
  '8': require('../assets/img/trams/8tram.png'),
  '8H': require('../assets/img/trams/8Htram.png'),
  '9': require('../assets/img/trams/9tram.png'),
  '9H': require('../assets/img/trams/9Htram.png'),
  '10': require('../assets/img/trams/10tram.png'),
  '10H': require('../assets/img/trams/10Htram.png'),
}

const Map = ({
  trams,
  stops,
  myStop,
  settings,
  setMyStop,
  myTram,
  setMyTram,
  setLine,
  setCenter,
  setZoom,
  setShowLine,
  setTrams,
  setAlarm,
  setShowTrams, 
  setDistance,
}) => {
  useEffect(() => {
    if (myTram) {
      let chosenTram = trams.find(tram => tram.veh === myTram.veh)
      let distanceNow = distance(
        myStop.lat,
        myStop.lon,
        chosenTram.lat,
        chosenTram.long
      )
      setDistance(distanceNow)
    }
  }, [trams])

  const handleChooseTram = veh => {
    console.log('TRAM CHOSEN: ', veh)
    let chosenTram = trams.find(tram => tram.veh == veh) 
    if (settings.possibleRoutes.includes(chosenTram.route)) {
      setMyTram(chosenTram)
      //setLine(chosenTram.desi) 
      /* setCenter({
        latitude: chosenTram.lat,
        longitude: chosenTram.long,
        latitudeDelta: settings.center.latitudeDelta,
        longitudeDelta: settings.center.longitudeDelta,
      })  */
    } else {
      console.log('ERROR! EI KULJE TÄMÄN PYSÄKIN KAUTTA!')
    }
  }

  const handleCancelTram = veh => {
    console.log('TRAM CANCELLED', veh)
    setAlarm(false)
    setMyTram('')
    setTrams([])
    setShowTrams(trams)
    setLine('') 
  }

  const handleSetMyStop = stop => {
    if (!myTram) {
      console.log('STOP SET: ', stop.name)
      setMyStop(stop)
      setLine('')
    }
  }

  const popUp = tram => {
    let buttoni = () => {
      if (myTram && myTram.veh === tram.veh) {
        return (
          <Button title='cancel' onPress={() => handleCancelTram(tram.veh)} />
        )
      } else if (
        (!myTram || (myTram && myTram.veh !== tram.veh)) &&
        settings.possibleRoutes.includes(tram.route) &&
        !settings.alarm
      ) {
        return (
          <Button title='choose' onPress={() => handleChooseTram(tram.veh)} />
        )
      }
    }

    return (
      <Callout>
        <Text> line:{tram.desi}</Text>
        <Text> vehicle:{tram.veh}</Text>
        <Text> speed:{(tram.spd * 3.6).toFixed(2)} km/h}</Text>
        {tram.stop && <Text> stop: {tram.stop}</Text>}
        <Text> route:{tram.route}</Text>
        <Text>
          {' '}
          {tram.dl > 0 ? 'ahead ' : 'lagging '} {Math.abs(tram.dl)} seconds
        </Text>
        <Text> {tram.drst === 0 ? 'doors closed' : 'doors open'}</Text>

        {buttoni()}
      </Callout>
    )
  }

  const ShowChosenTrams = () => { 
      return trams && trams.map((tram, i) => {
        if (tram.lat && tram.long) {
          return (
            <Marker
              key={i}
              image={tramIcons[tram.desi]}
              coordinate={{
                latitude: tram.lat,
                longitude: tram.long,
              }}
            >
              {popUp(tram)}
            </Marker>
          )
        }
      })
    } 

  const showStops = () => {
    return (
      stops &&
      stops.map((stop, i) => (
        <Marker 
          key={i}
          coordinate={{ latitude: stop.lat, longitude: stop.lon }} 
          pinColor={stop.id === myStop.id ? 'blue' : 'red'}
        >
          <Callout>
            {stop.id === myStop.id && <Text> My Stop:</Text>}
            <Text> {stop.name}</Text>
            <Text> {stop.gtfsId}</Text>
            {stop.id !== myStop.id && (
              <Button title='choose' onPress={() => handleSetMyStop(stop)} />
            )}
          </Callout>
        </Marker>
      ))
    )
  } 

  const alarmButton = () => {
    if (myTram) {
      return (
        <View
          style={settings.alarm ? styles.alarmOffButton : styles.alarmOnButton}
        >
          <Button  
            title='alarm' 
            onPress={() => {
              setAlarm(!settings.alarm)
              console.log(settings.alarm ? 'ALARM ON' : 'ALARM OFF')
            }}
          />
        </View>
      )
    }
  }

  const showDistance = () => {
    
    if (myTram && settings.distance  > 0) {
      return (
        <View style={styles.distance}>
          <Button title={settings.distance + ' m'} />
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      {trams ? (
        <MapView 
          style={styles.map} 
          initialRegion={settings.defaultCenter} 
          mapType='standard'
          //followsUserLocation={true}
          showsUserLocation={true} 
          zoomControlEnabled={true}
          showsMyLocationButton={true}
        >
          {/*  <UrlTile
              urlTemplate='http://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
              maximumZ={19}
            />  */}
          {ShowChosenTrams()}
          {showStops()}
          <Marker
            coordinate={{
              latitude: settings.position.latitude,
              longitude: settings.position.longitude,
            }}
            title='hei'
            description='tääl ollaan'
            image={require('../assets/img/icons8-policeman-female-48.png')}
          > 
          </Marker>
        </MapView>
      ) : (
        <Text>loading...</Text>
      )}
      {showDistance()}
      {alarmButton()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    /* flex: 1, */
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  alarmOnButton: {
    position: 'absolute', //use absolute position to show button on top of the map
    top: '5%',
    right: '5%', //for center align
    alignSelf: 'flex-end', //for align to right'
    color:'yellow',
    backgroundColor: '#e1eb34',
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  alarmOffButton: {
    position: 'absolute', //use absolute position to show button on top of the map
    top: '5%',
    right: '5%', //for center align
    alignSelf: 'flex-end', //for align to right
    color:'white',
    backgroundColor: '#eb5934',
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  distance: {
    position: 'absolute', //use absolute position to show button on top of the map
    top: '5%',
    left: '5%', //for center align
    alignSelf: 'flex-end', //for align to right
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
})

const mapStateToProps = state => {
  return {
    trams: state.trams.trams,  
    stops: state.stops,
    settings: state.settings,
    myStop: state.myStop,
    myTram: state.myTram,
  }
}

const mapDispatchToProps = {
  setShowTrams,
  setMyStop,
  setMyTram,
  setZoom,
  setCenter, 
  setLine,
  setAlarm, 
  setTrams,
  setShowLine, 
  setDistance,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
