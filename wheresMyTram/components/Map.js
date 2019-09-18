import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setShowTrams } from '../reducers/showTramsReducer'
import { setMyTram } from '../reducers/myTramReducer'
import { setTrams } from '../reducers/tramsReducer'
import {
  setCenter,
  setZoom,
  setShowAlert,
  openSidebar,
  closeSidebar,
  setLine,
  setAlarm,
  setShowSidebarOpenButton,
  setIntro,
  setShow,
  setShowLine,
  setPosition,
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
} from 'react-native'

import MapView, { Marker, Callout, UrlTile } from 'react-native-maps'
import { printDuration } from '../utils/helpers'
import alarmOnButton from '../assets/img/icon-alarm.png'
import alarmOffButton from '../assets/img/iconfinder_stop_green_61688.png'
import centerButton from '../assets/img/icons8-navigation-50.png'
import tramButton from '../assets/img/icons8-ice-cream-50.png'


const Map = (
  trams,
  setTrams,
  showTrams,
  setShowTrams,
  openSidebar,
  closeSidebar,
  setCenter,
  setZoom,
  stops,
  myStop,
  setMyStop,
  myTram,
  setMyTram,
  settings,
  setShowAlert,
  setLine,
  setAlarm,
  setShowSidebarOpenButton,
  setIntro,
  setShow,
  tramRoutesOnMap,
  setShowLine,
  stopsQuery,
  setPosition,) => {

  const [pin, setPin] = useState({
    latitude: 60.169748893653164,
    longitude: 24.940102100372314,
  }) 

  const handleChooseTram = e => {
    console.log('valitse nro: ', e.target.value, trams)
    let chosenTram = trams.find(tram => tram.veh == e.target.value)
    console.log('CHOSEN TRAM:', chosenTram)
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

 
  const handleCancelTram = e => {
    console.log('TRAM CANCELED', e.target.value)
    setAlarm(false)
    setMyTram('')
    setTrams([])
    setShowTrams(trams)
    setLine('')
    //setZoom(16)
  } 

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
  } 

  const handleCenterButton = () => {
    setCenter(settings.position)
    setZoom(16)
    closeSidebar()
  }

  const handleSetMyStop = stop => {
    if (!myTram) {
      setMyStop(stop)
      setLine('')
    }
  }

  const handleChangeCenter = e => {
    setZoom(e.target._zoom)
    console.log('CHANGED CENTER \n GET ZOOM: ', e.target._zoom)
    console.log('NEW CENTER:\n', e.latlng)
    setCenter(e.latlng)
    setPosition(e.latlng)
    stopsQuery(e.latlng)
  }

  const popUp = tram => {
    return (
      <Callout 
      //closeButton={false} 
      //value={tram.veh} 
      //autoPan={false}
      >
        <Text> line:{tram.desi}</Text> 
        <Text> vehicle:{tram.veh}</Text>
        <Text>  speed:{(tram.spd * 3.6).toFixed(2)} km/h}</Text>
        <Text>  {tram.stop && `stop: ${tram.stop}`}</Text>
        <Text> route:{tram.route}</Text>
         <Text>{tram.dl > 0 ? 'ahead ' : 'lagging '} {Math.abs(tram.dl)} seconds</Text>
        <Text> {tram.drst === 0 ? 'doors closed' : 'doors open'}</Text>
        
        {(!myTram || (myTram && myTram.veh !== tram.veh)) &&
          settings.possibleRoutes.includes(tram.route) &&
          !settings.alarm && (
            <Button title={'CHOOSE'} value={tram.veh} onPress={handleChooseTram}/>)}
        {myTram && myTram.veh === tram.veh && ( 
            <Button title={'CANCEL'} value={tram.veh} onPress={handleCancelTram}/>)}
      </Callout>
    )
  }

  const ShowChosenTrams = () => {
    //console.log('TRAMS:', trams.settings,  new Date())
     /* let tramsToShow = trams.trams.filter(tram =>
      showTrams.map(tram => tram.veh).includes(tram.veh)
    )  */
    let tramsToShow=trams 
    

    console.log(trams.length, 'trams')

    if (tramsToShow=100000) {
      return tramsToShow.map((tram, i) => (
        <Marker
          //className='trams'
          key={i}
          /* icon={
            myTram && myTram.veh === tram.veh
              ? myTramIcon(settings.zoom, tram.desi)
              : tramIcon(settings.zoom, tram.desi)
          } */
          //icon={require('../assets/img/rosaPin.png')} 
          image={require('../assets/img/trams/1tram.png')}
          coordinate={{
            latitude: tram.lat,
            longitude: tram.long,
          }}
          //zIndexOffset={500}
        >
          {/* popUp(tram) */}
          <Callout>
            <Text>hellooooasdasdasdoo</Text>
             
            <Text>hellooooasdasdasdoo</Text>
            <Text>hellooooasdasdasdoo</Text>
            <Text>hellooooasdasdasdoo</Text>
            <Text>hellooooasdasdasdoo</Text>
            <Text>hellooooasdasdasdoo</Text>
          </Callout>
        </Marker>
      ))
    }
  }





  return (
    <View style={styles.container}>
      {trams ? <MapView
        style={styles.map}
        initialRegion={{
          latitude: 60.169748893653164,
          longitude: 24.940102100372314,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType='standard'
        //zoomControlEnabled={true}
        //showsMyLocationButton={true}
      >
        <UrlTile
          urlTemplate='http://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
          maximumZ={19}
        />
        {trams && ShowChosenTrams()}
        <Marker 
          coordinate={pin}
          title='pöö'
          description='asiaa asiaa \r asiaa'
          image={require('../assets/img/trams/1tram.png')}
          pinColor={'blue'}
        >
          <Callout>
            <Text>hellooooasdasdasdoo</Text>
             
            <Text>hellooooasdasdasdoo</Text>
            <Text>hellooooasdasdasdoo</Text>
            <Text>hellooooasdasdasdoo</Text>
            <Text>hellooooasdasdasdoo</Text>
            <Text>hellooooasdasdasdoo</Text>
          </Callout>
        </Marker>
      </MapView> : <Text>loading...</Text>}
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
    tramRoutesOnMap: state.trams.tramRoutesOnMap,
    showTrams: state.showTrams,
    showSidebar: state.showSidebar,
    showSidebarOpenButton: state.showSidebarOpenButton,
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
  setShowAlert,
  openSidebar,
  closeSidebar,
  setLine,
  setAlarm,
  setShowSidebarOpenButton,
  setIntro,
  setShow,
  setTrams,
  setShowLine,
  setPosition,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
