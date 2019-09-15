 

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  DrawerLayoutAndroid,
} from 'react-native';

import MapView, {Marker, Callout, UrlTile} from 'react-native-maps'; 
//import RosaPin from '../img/rosaPin.png'

const Map = () => { 

  const [pin, setPin] = useState({latitude: 37.78825, longitude: -122.4324});
  const [text, setText] = useState ('pöö')
 
  return (
    <View style={styles.container}>  
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        zoomControlEnabled={true}>
        <UrlTile
          urlTemplate="http://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
          maximumZ={19}
        />
        <Marker
          draggable={true}
          coordinate={pin}
          title="pöö"
          description="asiaa asiaa \r asiaa"
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
            <Text>{text}</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Map;
