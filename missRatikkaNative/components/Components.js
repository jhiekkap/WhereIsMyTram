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

export const ComponentLeftUp = ({ play }) => {
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

export const ComponentCenterUp = ({ show, setShow }) => {
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

export const ComponentRightUp = () => {
  return (
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <TouchableOpacity onPress={() => Alert.alert('möö')}>
        <Text style={{ color: 'black' }}> Right </Text>
      </TouchableOpacity>
    </View>
  )
}

export const ComponentLeftDown = ({ show, setShow }) => {
  return (
    <View
      style={{
        flex: 1,
        //alignItems: 'flex-start',
        marginLeft: 20,
        marginBottom: 20,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setShow(!show)
        }}
      >
        {show ? (
          <Image
            source={require('../assets/img/icons8-settings-50.png')}
            style={{
              resizeMode: 'contain',
              width: 200,
              height: 35,
              alignSelf: 'center',
            }}
          />
        ) : (
          <Image
            source={require('../assets/img/icons8-europe-50.png')}
            style={{
              resizeMode: 'contain',
              width: 190,
              height: 35,
              alignSelf: 'center',
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  )
}

export const ComponentCenterDown = ({setCenter, settings}) => { 

  return (
    <View
      style={{ flex: 1, alignSelf: 'center', marginBottom: 20, marginLeft: 0 }}
    >
      <TouchableOpacity
        onPress={() => {
          setCenter(settings.position)
          console.log('SET CENTER TO OWN POSITION: ', settings.position)
        }}
      >
        <Image
          source={require('../assets/img/icons8-navigation-50.png')}
          style={{
            resizeMode: 'contain',
            width: 200,
            height: 35,
            alignSelf: 'center',
          }}
        />
      </TouchableOpacity>
    </View>
  )
}

export const ComponentRightDown = () => {
  return (
    <View
      style={{
        flex: 1,
        //alignItems: 'flex-end',
        alignSelf: 'center',
        marginBottom: 25,
        marginRight: 20,
      }}
    >
      <TouchableOpacity>
        <Image
          source={require('../assets/img/tram-front-view.png')}
          style={{
            resizeMode: 'contain',
            width: 250,
            height: 33,
            alignSelf: 'center',
          }}
        />
      </TouchableOpacity>
    </View>
  )
}
