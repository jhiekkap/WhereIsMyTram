import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setTrams } from './reducers/tramsReducer' 
import { setInit } from './reducers/settingsReducer'
import { setStops } from './reducers/stopsReducer'
import { setMyStop } from './reducers/myStopReducer'
import { setShowTrams } from './reducers/showTramsReducer' 
import './App.css'
import LeafletMap from './components/LeafletMap'
import Sidebar from './components/Sidebar' 
import client , { query } from './utils/client'

 

const App = ({
  setTrams,
  setShowTrams,  
  setStops,
  setMyStop,
  settings,
  setInit 
}) => {
 
  useEffect(() => {
  
    client.query({ query }).then(response => {
      let edges = response.data.stopsByRadius.edges
      let allStops = edges
        .map(edge => edge.node.stop)
        .filter(stop => stop.vehicleType === 0)
      setStops(allStops)
      setMyStop(allStops[0]) 
    })
  },[])

  const update = () => {
    
    fetch('/trams')
      .then(response => response.json())
      .then(body => {
        setTrams(body) 
        
        if(settings.init){
          console.log('INIT: ',settings.init)
          setInit(false)
         // setShowTrams(body)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

 useState(() =>{ 
  const timer = setInterval(() => { 
    update()
  }, 1000)}, [])
  
  return (
    <div> 
      <Sidebar />
      <LeafletMap />
    </div>
  )
}

  const mapStateToProps = state => {
  return {
    settings: state.settings,
  }
}  

const mapDispatchToProps = {
  setTrams,  
  setStops,
  setMyStop,
  setShowTrams, 
  setInit,
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App)







////////// GEOLOCATION

/*   if ("geolocation" in navigator) {
      console.log("geolocation is available");
    } else {
      console.log("geolocation is NOT available");
    }
    navigator.geolocation.getCurrentPosition(position => { 
  
      const query = gql`
        {
          stopsByRadius(lat: ${position.coords.latitude}, lon: ${position.coords.longitude}, radius: 1000) {
            edges {
              node {
                stop {
                  id
                  gtfsId
                   name
                  lat
                  lon 
                }
              }
            }
          }
        }
        ` 
      client.query({ query })
        .then((response) => {
          let edges = response.data.stopsByRadius.edges
          setStops(edges)
          edges.forEach(edge => {
            console.log('HSL: ', edge.node.stop)
          })
        })
      console.log("STARTING LOCATION \nlatitude: " + position.coords.latitude + " longitude: " + position.coords.longitude);
    }); */
