import React, { useState } from 'react'
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
          icon={require('../img/rosaPin.png')}
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

export default Map
