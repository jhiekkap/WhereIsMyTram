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
} from 'react-native'

import MapView, { Marker, Callout, UrlTile } from 'react-native-maps'
/* import { printDuration } from '../utils/helpers'
import alarmOnButton from '../assets/img/icon-alarm.png'
import alarmOffButton from '../assets/img/iconfinder_stop_green_61688.png'
import centerButton from '../assets/img/icons8-navigation-50.png'
import tramButton from '../assets/img/icons8-ice-cream-50.png'
 */
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
}) =>
  /* 
 
  showTrams,
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
        setCenter({ lat: chosenTram.lat, lng: chosenTram.long })
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
    /* 
    const handleChangeZoom = e => {
      setZoom(e.target._zoom)
      //setCenter({lat:e.target._animateToCenter.lat, lng:e.target._animateToCenter.lng})
      console.log(
        'ZOOM',
        e.target._zoom,
        'CENTER',
        e.target._animateToCenter.lat,
        e.target._animateToCenter.lng
      )
    } */

    /* const handleCenterButton = () => {
      setCenter(settings.position)
      setZoom(16)
      closeSidebar()
    } */

    const handleSetMyStop = stop => {
      if (!myTram) {
        setMyStop(stop)
        setLine('')
      }
    }

    /*  const handleChangeCenter = e => {
      setZoom(e.target._zoom)
      console.log('CHANGED CENTER \n GET ZOOM: ', e.target._zoom)
      console.log('NEW CENTER:\n', e.latlng)
      setCenter(e.latlng)
      setPosition(e.latlng)
      stopsQuery(e.latlng)
    } */

    const popUp = tram => {
      let buttoni = () => {
        if (myTram && myTram.veh === tram.veh) {
          return <Button title='cancel' onPress={() => handleCancelTram(tram.veh)}/>
        } else if ((!myTram || (myTram && myTram.veh !== tram.veh)) &&
        settings.possibleRoutes.includes(tram.route) &&
        !settings.alarm) {
          return <Button title='choose' onPress={() => handleChooseTram(tram.veh)}/> 
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
          {/* (!myTram || (myTram && myTram.veh !== tram.veh)) &&
            settings.possibleRoutes.includes(tram.route) &&
            !settings.alarm && (
              <View>
                <Button
                  title='choose'
                  onPress={() => handleChooseTram(tram.veh)}
                />
              </View>
            ) */}

          {buttoni()}
          {/* (myTram && (myTram.veh === tram.veh)) &&   
          <TouchableHighlight onPress={() => handleCancelTram(tram.veh)}>
          <View><Text>cancel</Text></View>
          </TouchableHighlight>
            */}

          {/* (!myTram || (myTram && myTram.veh !== tram.veh)) &&
            settings.possibleRoutes.includes(tram.route) &&
            !settings.alarm && (
              <Button
                title='choose'
                //value={tram.veh}
                onPress={()=>handleChooseTram()}
              />
            )}
          {(myTram && myTram.veh === tram.veh) && (
            <Button
              title='cancel' 
              onPress={()=>handleCancelTram(tram.veh)}
            />
          ) */}
        </Callout>
      )
    }

    const ShowChosenTrams = () => {
      //console.log(trams.length, 'TRAMS:', new Date())
      //console.log('SETTINGS:', showTrams)
      /*  let tramsToShow = trams.trams.filter(tram =>
      trams.showTrams.map(tram => tram.veh).includes(tram.veh)
    )  */
      let tramsToShow = trams

      if (tramsToShow) {
        return tramsToShow.map((tram, i) => {
          if (tram.lat && tram.long) {
            return (
              <Marker
                //className='trams'
                key={i}
                /* icon={
                myTram && myTram.veh === tram.veh
                  ? myTramIcon(settings.zoom, tram.desi)
                  : tramIcon(settings.zoom, tram.desi)
              }   */
                image={require('../assets/img/icons8-color-50.png')}
                //icon={require(`../assets/img/trams/${tram.desi}tram.png`)}
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
            onPress={() => handleSetMyStop(stop)}
            key={i}
            /* image={
              stop.id === myStop.id
                ? require('../assets/img/iconfinder_5_41693.png')
                : require('../assets/img/rosaPin.png')
            } */
            coordinate={{ latitude: stop.lat, longitude: stop.lon }}
            //zIndexOffset={-500}
            pinColor={stop.id === myStop.id ? 'blue' : 'red'}
          >
            <Callout>
              <Text>{stop.name}</Text>
              <Text>{stop.gtfsId}</Text>
            </Callout>
          </Marker>
        ))
      )
    }

    return (
      <View style={styles.container}>
        {trams ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: settings.center.lat,
              longitude: settings.center.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            mapType='standard'
            //zoom={settings.zoom}
            //zoomControlEnabled={true}
            //showsMyLocationButton={true}
          >
            <UrlTile
              urlTemplate='http://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
              maximumZ={19}
            />
            {ShowChosenTrams()}
            {showStops()}
            <Marker
              coordinate={{
                latitude: settings.center.lat,
                longitude: settings.center.lng,
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
    //showTrams: state.showTrams,
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
