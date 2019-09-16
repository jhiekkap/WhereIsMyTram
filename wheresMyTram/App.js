import React from 'react'
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

const ComponentLeft = () => {
  return (
    <View style={{ flex: 1, alignItems: 'flex-start' }}>
      <TouchableOpacity
        style={{ justifyContent: 'center', flexDirection: 'row' }}
      >
        <Image
          source={require('./img/icon_size_41px.png')}
          style={{
            resizeMode: 'contain',
            width: 20,
            height: 20,
            alignSelf: 'center',
          }}
        />
        <Text style={{ color: 'white' }}>Back Home</Text>
      </TouchableOpacity>
    </View>
  )
}

const ComponentCenter = () => {
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('./img/tram-front-view.png')}
        style={{
          resizeMode: 'contain',
          width: 200,
          height: 35,
          alignSelf: 'center',
        }}
      />
    </View>
  )
}

const ComponentRight = () => {
  return (
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <TouchableOpacity onPress={() => Alert.alert('pöö')}>
        <Text style={{ color: 'white' }}> Right </Text>
      </TouchableOpacity>
    </View>
  )
}

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationBar
        componentLeft={() => <ComponentLeft />}
        componentCenter={() => <ComponentCenter />}
        componentRight={() => <ComponentRight />}
        navigationBarStyle={{ backgroundColor: '#215e79' }}
        statusBarStyle={{
          barStyle: 'light-content',
          backgroundColor: '#215e79',
        }}
      />
      <Map style={styles.map}/>
    </View>
  )
}

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
