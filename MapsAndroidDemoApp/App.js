/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import MapView, {Marker} from 'react-native-maps';

const App = () => {

  const[pin, setPin] = useState({latitude: 37.78825, longitude: -122.4324})

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
        <Marker draggable={true}
          coordinate={pin}
          title="pöö"
          description="asiaa"
          image={require('./rosaPin.png')}
          onDragEnd={(e) => setPin({latitude:e.nativeEvent.coordinate.latitude, longitude:e.nativeEvent.coordinate.longitude})}
        />
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

export default App;
