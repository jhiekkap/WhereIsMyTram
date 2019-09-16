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
import { Audio } from 'expo-av';

const App = () => {
  const soundObject = new Audio.Sound();

  const play = async () => {
    try {
      await soundObject.loadAsync(require('./assets/foghorn-daniel_simon.mp3'))
      await soundObject.playAsync()
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }

 
  

  const [show, setShow] = useState(false)
  return (
    <View style={styles.container}>
      <NavigationBar
        componentLeft={() => < ComponentLeft  play={play} />}
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
      {show ? <Map style={styles.map} /> : <Menu style={styles.menu} />}
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
