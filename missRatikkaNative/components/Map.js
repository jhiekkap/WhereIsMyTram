import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setShowVehicles } from '../reducers/showVehiclesReducer'
import { setMyVehicle } from '../reducers/myVehicleReducer'
import { setVehicles } from '../reducers/vehiclesReducer'
import { 
  setAlarm, 
  setDistance,
} from '../reducers/settingsReducer'
import { setMyStop } from '../reducers/myStopReducer'
import { 
  StyleSheet, 
  View,
  Text, 
  Button,  
  Alert,
} from 'react-native'
import distance from '../utils/helpers'
import play from './../utils/sound' 
import MapView, { Marker, Callout } from 'react-native-maps' 
import {tramIcons} from './tramIcons' 


const Map = ({
  vehicles,
  stops,
  myStop,
  settings,
  setMyStop,
  myVehicle,
  setMyVehicle, /* 
  setVehicles, */
  setAlarm, 
  setDistance,
}) => {
  useEffect(() => {
    if (myVehicle) {
      let chosenVehicle = vehicles.find(vehicle => vehicle.veh === myVehicle.veh)
      let distanceNow = distance(
        myStop.lat,
        myStop.lon,
        chosenVehicle.lat,
        chosenVehicle.long
      )
      if (settings.alarm && distanceNow < 50) {
        setAlarm(false)
        setMyVehicle('')
        play()
        Alert.alert('Vehicle has arrived!')
      }
      setDistance(distanceNow)
    }
  }, [vehicles])

  const handleChooseVehicle = veh => {
    console.log('TRAM CHOSEN: ', veh)
    let chosenVehicle = vehicles.find(vehicle => vehicle.veh == veh)
    if (settings.possibleRoutes.includes(chosenVehicle.route)) {
      setMyVehicle(chosenVehicle)
    } else {
      console.log('ERROR! EI KULJE TÄMÄN PYSÄKIN KAUTTA!')
    }
  }

  const handleCancelVehicle = veh => {
    console.log('TRAM CANCELLED', veh)
    setAlarm(false)
    setMyVehicle('')
    //setVehicles([]) 
  }

  const handleSetMyStop = stop => {
    if (!myVehicle) {
      console.log('STOP SET: ', stop.name)
      setMyStop(stop) 
    }
  }

  const popUp = vehicle => {
    let buttoni = () => {
      if (myVehicle && myVehicle.veh === vehicle.veh) {
        return (
          <Button title='cancel' onPress={() => handleCancelVehicle(vehicle.veh)} />
        )
      } else if (
        (!myVehicle || (myVehicle && myVehicle.veh !== vehicle.veh)) &&
        settings.possibleRoutes.includes(vehicle.route) &&
        !settings.alarm
      ) {
        return (
          <Button title='choose' onPress={() => handleChooseVehicle(vehicle.veh)} />
        )
      }
    }

    return (
      <Callout>
        <Text> line:{vehicle.desi}</Text>
        <Text> vehicle:{vehicle.veh}</Text>
        <Text> speed:{(vehicle.spd * 3.6).toFixed(2)} km/h}</Text>
        {vehicle.stop && <Text> stop: {vehicle.stop}</Text>}
        <Text> route:{vehicle.route}</Text>
        <Text>
          {vehicle.dl > 0 ? ' ahead ' : ' lagging '} {Math.abs(vehicle.dl)} seconds
        </Text>
        <Text> {vehicle.drst === 0 ? 'doors closed' : 'doors open'}</Text>
        {buttoni()}
      </Callout>
    )
  }

  const ShowChosenVehicles = () => {
    return vehicles && vehicles.map((vehicle, i) => {
      if (vehicle.lat && vehicle.long) {
        let vehicleIcon = tramIcons[vehicle.desi]
        if (vehicle.veh === myVehicle.veh) {
          vehicleIcon = tramIcons['my' + vehicle.desi]
        }

        return (
          <Marker
            key={i}
            image={vehicleIcon}
            coordinate={{
              latitude: vehicle.lat,
              longitude: vehicle.long,
            }}
          >
            {popUp(vehicle)}
          </Marker>
        )
      }
    })
  }

  const showStops = () => {
    return (
      stops &&
      stops.map((stop, i) => (
        <Marker
          key={i}
          coordinate={{ latitude: stop.lat, longitude: stop.lon }}
          pinColor={stop.id === myStop.id ? 'blue' : 'red'}
        >
          <Callout>
            {stop.id === myStop.id && <Text> My Stop:</Text>}
            <Text> {stop.name}</Text>
            <Text> {stop.gtfsId}</Text>
            {!myVehicle && stop.id !== myStop.id && (
              <Button title='choose' onPress={() => handleSetMyStop(stop)} />
            )}
          </Callout>
        </Marker>
      ))
    )
  }

  const alarmButton = () => {
    if (myVehicle) {
      return (
        <View
          style={settings.alarm ? styles.alarmOffButton : styles.alarmOnButton}
        >
          <Button
            title='alarm'
            onPress={() => {
              if (settings.distance > 50) {
                setAlarm(!settings.alarm)
                console.log(settings.alarm ? 'ALARM ON' : 'ALARM OFF')
              } else {
                Alert.alert('Vehicle has alredy arrived!')
              }
            }}
          />
        </View>
      )
    }
  }

  const showDistance = () => {

    if (myVehicle && settings.distance > 0) {
      return (
        <View style={styles.distance}>
          <Button title={settings.distance + ' m'} />
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      {vehicles ? (
        <MapView
          style={styles.map}
          initialRegion={settings.defaultCenter}
          mapType='standard'
          //followsUserLocation={true}
          showsUserLocation={true}
          zoomControlEnabled={true}
          showsMyLocationButton={true}
        >
          {/*  <UrlTile
              urlTemplate='http://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
              maximumZ={19}
            />  */}
          {ShowChosenVehicles()}
          {showStops()}
          <Marker
            coordinate={{
              latitude: settings.position.latitude,
              longitude: settings.position.longitude,
            }}
            title='hei'
            description='tääl ollaan'
            image={require('../assets/img/icons8-policeman-female-48.png')}
          >
          </Marker>
        </MapView>
      ) : (
          <Text>loading...</Text>
        )}
      {showDistance()}
      {alarmButton()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    /* flex: 1, */
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  alarmOnButton: { 
    position: 'absolute', //use absolute position to show button on top of the map
    top: '5%',
    right: '5%', //for center align
    alignSelf: 'flex-end', //for align to right'
    color: 'yellow',
    backgroundColor: '#e1eb34',
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  alarmOffButton: {
    position: 'absolute', //use absolute position to show button on top of the map
    top: '5%',
    right: '5%', //for center align
    alignSelf: 'flex-end', //for align to right
    color: 'white',
    backgroundColor: '#eb5934',
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  distance: {
    position: 'absolute', //use absolute position to show button on top of the map
    top: '5%',
    left: '5%', //for center align
    alignSelf: 'flex-end', //for align to right
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  }, 
})

const mapStateToProps = state => {
  return {
    vehicles: state.vehicles.vehicles,
    stops: state.stops,
    settings: state.settings,
    myStop: state.myStop,
    myVehicle: state.myVehicle,
  }
}

const mapDispatchToProps = {
  setShowVehicles,
  setMyStop,
  setMyVehicle,
 /*  setZoom,
  setCenter,
  setLine, */
  setAlarm,
  setVehicles,
  /* setShowLine, */
  setDistance,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
