import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const App = () => {
  const [counter, setCounter] = useState(0)
  //console.log('hello', counter)
  //let timer

  useEffect(() => {
    const timer = setInterval(() => {
      //setCounter(counter + 1)
      let heppi = Math.floor(Math.random() * 10) 
      console.log(heppi, new Date())
    }, 1000)
  }, [])

  return (
    <View style={styles.container}>
      <Text>Open up to fart working on your räppi nr. {counter}!</Text>
      <Button title='push' onPress={()=>setCounter(counter+1)}/> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
