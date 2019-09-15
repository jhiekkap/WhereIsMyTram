import React, { useState } from 'react'
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  Image,
  Button,
  Picker,
  Alert,
  Separator,
  SafeAreaView,
} from 'react-native'
//import picture from '../img/icon_size_41px.png';
import Constants from 'expo-constants';

const Modaali = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [language, setLanguage] = useState('js')

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.')
        }}
      >
        <View style={styles.modal}>
          <Text style={styles.text}>Modal is open!</Text>
          <TouchableHighlight onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.text}>Close Modal</Text>
          </TouchableHighlight>
          </View>
          <View style={styles.modal}>
          <Picker
            selectedValue={language}
            style={{ width: 150 }}
            onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}
          >
            <Picker.Item label='Java' value='java' />
            <Picker.Item label='JavaScript' value='js' />
          </Picker>
          </View>
          <View style={styles.modal}>
          <Button
            title='Press me'
            onPress={() => Alert.alert('Simple Button pressed')}
          />
        </View>
      </Modal>
      <Button
        //style={styles.text}
        onPress={() => setModalVisible(!modalVisible)}
        title='open modal'
      />
     {/*  <Text onPress={() => setModalVisible(!modalVisible)} style={styles.text}>
        Open Modal
      </Text> */}

      {/* <Image source={picture} style={{ height: 30, width: 30 }} /> */}
    </View>
    </SafeAreaView>
  )
}

export default Modaali

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ede3f2',
    padding: 10,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f7021a',
    padding: 10,
  },
  text: {
    color: '#3f2949',
    marginTop: 40,
  },
})
