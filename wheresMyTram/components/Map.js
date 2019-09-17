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
//import RosaPin from '../img/rosaPin.png'

const Map = () => {
  const [pin, setPin] = useState({
    latitude: 60.169748893653164,
    longitude: 24.940102100372314,
  })
  const [text, setText] = useState(false)

  return (
    <View style={styles.container}>
      <MapView
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
        <Marker
          draggable={true}
          coordinate={pin}
          title='pöö'
          description='asiaa asiaa \r asiaa'
          icon={require('../assets/img/rosaPin.png')}
          onDragEnd={e =>
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            })
          }
        >
          <Callout>
            <Text>hellooooasdasdasdoo</Text>
            <Text>{text ? 'pöö': 'öö'}</Text>
            <Button title='Press me' onPress={() => setText(!text)}/>
            <Text>hello</Text>
            <Text>hellooooasdasdasdoo</Text>
            <Text>hellooooasdasdasdoo</Text>
            <Text>hellooooasdasdasdoo</Text>
            <Text>hellooooasdasdasdoo</Text>
            <Text>hellooooasdasdasdoo</Text>
          </Callout>
        </Marker>
      </MapView>
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
