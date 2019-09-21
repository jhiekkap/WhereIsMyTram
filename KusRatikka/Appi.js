import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import {
  setTrams,
  //setTramRoutesOnMap
} from './reducers/tramsReducer'
import { connect } from 'react-redux'

const Appi = ({ trams, setTrams }) => {
  const [counter, setCounter] = useState(0)

  //console.log('hellouuta')

  useEffect(() => {
    const timer = setInterval(() => {
      //setCounter(counter + 1)   ei toimi!!!!
      fetch('https://arcane-shore-64535.herokuapp.com/trams')
        .then(response => response.json())
        .then(body => {
          setTrams(body.map(tram => tram.VP)) 
          console.log(new Date())
        })
        .catch(error => {
          console.log(error)
        })
    }, 1000)
  }, [])

  return (
    <View style={styles.container}>
      <Text>
        Open up to fart {trams.length} working on your räppi nr. {counter}!
      </Text>
      <Button title='push' onPress={() => setCounter(counter + 1)} />
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

const mapStateToProps = state => {
  return {
    trams: state.trams.trams,
    /* settings: state.settings,
    myStop: state.myStop, */
  }
}

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
  mapStateToProps,
  //null,
  mapDispatchToProps
)(Appi)
