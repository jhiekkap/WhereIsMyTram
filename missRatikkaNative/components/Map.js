import React, { useState } from 'react'
/* import 
 //driverIcon,
  {
  //stopIcon,
  //myStopIcon,
  //lineStopIcon,
  //tramIcon,
  //myTramIcon,
} from '../utils/icons'  */

import { connect } from 'react-redux'
import { setShowTrams } from '../reducers/showTramsReducer'
import { setMyTram } from '../reducers/myTramReducer'
import { setTrams } from '../reducers/tramsReducer'
import {
  setCenter,
  setZoom,
  //setShowAlert,
  //openSidebar,
  //closeSidebar,
  setLine,
  setAlarm,
  //setShowSidebarOpenButton,
  //setIntro,
  //setShow,
  setShowLine,
  //setPosition,
} from '../reducers/settingsReducer'
import { setMyStop } from '../reducers/myStopReducer'
/* import driverIcon, {
  stopIcon,
  myStopIcon,         IKONIT?????????????????????
  lineStopIcon,
  tramIcon,
  myTramIcon,
} from '../utils/icons' */
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
  Image,
  Alert,
} from 'react-native'

import MapView, { Marker, Callout, UrlTile } from 'react-native-maps'
/* import { printDuration } from '../utils/helpers'
import alarmOnButton from '../assets/img/icon-alarm.png'
import alarmOffButton from '../assets/img/iconfinder_stop_green_61688.png'
import centerButton from '../assets/img/icons8-navigation-50.png'
import tramButton from '../assets/img/icons8-ice-cream-50.png'
 */

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
  showTrams,
}) =>
  /*  
  openSidebar,
  closeSidebar,
  setShowAlert,
  setShowSidebarOpenButton,
  setIntro,
  setShow,
  tramRoutesOnMap,
  stopsQuery,
  setPosition,  */
  {
    //console.log('RENDERING MÄPPI')

    const handleChooseTram = veh => {
      console.log('valitse nro: ', veh)
      let chosenTram = trams.find(tram => tram.veh == veh)
      //console.log('CHOSEN TRAM:', chosenTram)
      if (settings.possibleRoutes.includes(chosenTram.route)) {
        setMyTram(chosenTram)
        setLine(chosenTram.desi)
        //setShowTrams([chosenTram])
        setCenter(
          {
            latitude: chosenTram.lat,
            longitude: chosenTram.long,
            latitudeDelta:settings.center.latitudeDelta,
            longitudeDelta:settings.center.longitudeDelta
          })
        setZoom(16)
        setShowLine('')
      } else {
        console.log('ERROR! EI KULJE TÄMÄN PYSÄKIN KAUTTA!')
      }
    }

    const handleCancelTram = veh => {
      console.log('TRAM CANCELED', veh)
      setAlarm(false)
      setMyTram('')
      setTrams([])
      setShowTrams(trams)
      setLine('')
      //setZoom(16)
    }

    const handleSetMyStop = stop => {
      if (!myTram) {
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
      //console.log(trams.length, 'TRAMS:', new Date())
      //console.log('SETTINGS:', showTrams)
      /* let tramsToShow = trams.filter(tram =>
      showTrams.map(tram => tram.veh).includes(tram.veh)
    )  */
      let tramsToShow = trams

      if (tramsToShow) {
        return tramsToShow.map((tram, i) => {
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
    }

    const showStops = () => {
      return (
        stops &&
        stops.map((stop, i) => (
          <Marker
            //className='stops'
            //onPress={() => handleSetMyStop(stop)}
            key={i}
            coordinate={{ latitude: stop.lat, longitude: stop.lon }}
            //zIndexOffset={-500}
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

    /* const handleRegionChange = region => {
      //console.log(region)
      setCenter(region)
    } */

    return (
      <View style={styles.container}>
        {trams ? (
          <MapView
            style={styles.map}
            //initialRegion={settings.defaultCenter}
            region={settings.center}
            mapType='standard'
            onRegionChange={region => setCenter(region)}
            //followsUserLocation={true}
            //showsUserLocation={true}

            //zoom={settings.zoom}
            //zoomControlEnabled={true}
            //showsMyLocationButton={true}
          >
            <UrlTile
              urlTemplate='http://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
              maximumZ={19}
            />
            {ShowChosenTrams()}
            {/* <ShowTrams trams={trams} /> */}
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
              {/*   <Callout>
                <Text>I'm you!</Text>
              </Callout> */}
            </Marker>
          </MapView>
        ) : (
          <Text>loading...</Text>
        )}
      </View>
    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
})

const mapStateToProps = state => {
  return {
    trams: state.trams.trams,
    //tramRoutesOnMap: state.trams.tramRoutesOnMap,
    showTrams: state.showTrams,
    //showSidebar: state.showSidebar,
    //showSidebarOpenButton: state.showSidebarOpenButton,
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
  //setShowAlert,
  //openSidebar,
  //closeSidebar,
  setLine,
  setAlarm,
  //setShowSidebarOpenButton,
  //setIntro,
  //setShow,
  setTrams,
  setShowLine,
  //setPosition,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
