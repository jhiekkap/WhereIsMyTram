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
  SafeAreaView,
  ScrollView,
} from 'react-native'
//import picture from '../img/icon_size_41px.png';
import Constants from 'expo-constants'

function Separator() {
  return <View style={styles.separator} />
}

const Modaali = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [language, setLanguage] = useState('js')

  return (
    <ScrollView style={styles.scrollView}> 
    <SafeAreaView style={styles.container}>
      <View>
        
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              console.log('Modal has been closed.')
            }}
          >
             
             
            <Separator />
            <View>
              <Text style={styles.title}>
                This layout strategy lets the title define the width of the
                button.
              </Text>
              <View style={styles.fixToText}>
                <Button
                  title='Left button'
                  onPress={() => Alert.alert('Left button pressed')}
                />
                <Button
                  title='Right button'
                  onPress={() => Alert.alert('Right button pressed')}
                />
              </View>
            </View>

            <View style={styles.modal}>
              <Text style={styles.text}>Otsikko</Text>
              <TouchableHighlight
                onPress={() => setModalVisible(!modalVisible)}
              >
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
          </Modal>
        
        <View style={styles.fixToText}>
          <Button
            style={styles.text}
            onPress={() => setModalVisible(!modalVisible)}
            title='menu'
          />
          <Button
            style={styles.text}
            onPress={() => setModalVisible(!modalVisible)}
            title='menu'
          />
          <Button
            style={styles.text}
            onPress={() => setModalVisible(!modalVisible)}
            title='menu'
          />
          <Button
            style={styles.text}
            onPress={() => setModalVisible(!modalVisible)}
            title='menu'
          />
          <Button
            style={styles.text}
            onPress={() => setModalVisible(!modalVisible)}
            title='menu'
          />
        </View>
      </View>
    </SafeAreaView>
    </ScrollView>

  )
}

export default Modaali

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:5,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  /* container2: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  }, */
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    //backgroundColor: '#f7021a',
    padding: 10,
  },
  text: {
    color: '#3f2949',
    //marginTop: 10,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
})
