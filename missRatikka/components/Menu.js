// https://www.npmjs.com/package/react-native-picker-select

import React, { useState } from 'react'
import {
  Button,
  Text,
  TextInput,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Switch,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select'
// import RNPickerSelect, { defaultStyles } from './debug';

const sports = [
  {
    label: 'Football',
    value: 'football',
  },
  {
    label: 'Baseball',
    value: 'baseball',
  },
  {
    label: 'Hockey',
    value: 'hockey',
  },
]

const Menu = () => {
  const [favSport, setFavSport] = useState('baseball')

  const [witch, setWitch] = useState(false)

  const placeholder = {
    label: 'Select a sport...',
    value: null,
    color: '#9EA0A4',
  }  

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <View paddingVertical={5} />

        <Text>customi iconi using react-native-vector-icons</Text>
        {/* and value defined */}
        <RNPickerSelect
          placeholder={placeholder}
          items={sports}
          onValueChange={value => setFavSport(value)}
          style={{
            ///////////// Input IOS/ANDROID???????
            ...pickerSelectStyles,
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          value={favSport}
          useNativeAndroidPickerStyle={!Platform.OS === 'ios'} ///false????
          textInputProps={{ underlineColor: 'yellow' }}
          Icon={() => {
            return <Ionicons name='md-arrow-down' size={24} color='gray' />
          }}
        />
        <View paddingVertical={10} />

        <Text>Geolocation</Text>

        <Switch onValueChange={() => setWitch(!witch)} value={witch} />

        <View paddingVertical={5} />
      </ScrollView>
    </View>
  )
}

export default Menu

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  scrollContentContainer: {
    paddingTop: 40,
    paddingBottom: 10,
  },
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
})
