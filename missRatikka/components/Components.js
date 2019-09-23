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

export const ComponentLeft = ({ play }) => { 
  return (
    <View style={{ flex: 1, alignItems: 'flex-start' }}>
      <TouchableOpacity
        style={{ justifyContent: 'center', flexDirection: 'row' }}
        onPress={() => play()}
      >
         <Image
            source={require('./../assets/img/icon_size_41px.png')}
            style={{
              resizeMode: 'contain',
              width: 20,
              height: 20,
              alignSelf: 'center',
            }}
          /> 
        <Text style={{ color: 'black' }}>Back Home</Text>
      </TouchableOpacity>
    </View>
  )
}

export const ComponentCenter = ({ show, setShow }) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          setShow(!show) 
        }}
      >
        {/* <Image
          source={require('./img/tram-front-view.png')}
          style={{
            resizeMode: 'contain',
            width: 200,
            height: 35,
            alignSelf: 'center',
          }} 
        /> */}
        <Text style={{ color: 'black', alignSelf: 'center' }}>
          {show ? 'menu' : 'mäp'} 
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export const ComponentRight = () => {
  return (
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <TouchableOpacity onPress={() => Alert.alert('möö')}>
        <Text style={{ color: 'black' }}> Right </Text>
      </TouchableOpacity>
    </View>
  )
}
