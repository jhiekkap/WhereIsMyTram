import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { setTrams, 
  //setTramRoutesOnMap 
} from './reducers/tramsReducer'
import { connect } from 'react-redux'

const Appi = () => {
  const [counter, setCounter] = useState(0)  

  //console.log('hellouta')

  useEffect(() => {
    const timer = setInterval(() => {
      //setCounter(counter + 1)   ei toimi!!!!
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

/* const mapStateToProps = state => {
  return {
    settings: state.settings,
    myStop: state.myStop,
  }
} */

 const mapDispatchToProps = {
  setTrams,
/*   setStops,
  setMyStop,
  setPosition,
  setCenter,
  setPossibleRoutes,
  setTramRoutesOnMap, */
} 

export default connect(
  //mapStateToProps,
  null,
  mapDispatchToProps
)(Appi)
