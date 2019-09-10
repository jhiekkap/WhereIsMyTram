import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTrams } from './reducers/tramsReducer'
import { setStops } from './reducers/stopsReducer'
import { setMyStop } from './reducers/myStopReducer'
import './App.css'
import LeafletMap from './components/LeafletMap' 
import Sidebar from './components/Sidebar'
import client, { query } from './utils/client'

const App = ({ setTrams, setStops, setMyStop }) => {
  useEffect(() => {
    client.query({ query }).then(response => {
      console.log('GRAPHQL - QUERY!')
      let allStops = response.data.stopsByRadius.edges
        .map(edge => edge.node.stop)
        .filter(stop => stop.vehicleType === 0)
      setStops(allStops)
      setMyStop(allStops[0])
    })
  }, [])


  const update = () => {
    fetch('/trams')
      .then(response => response.json())
      .then(body => {
        setTrams(body)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    setInterval(() => {
      update()
    }, 1000)
  }, [])

  return (
    <div>
      <Sidebar />
      <LeafletMap />
    </div>
  )
}

/* const mapStateToProps = state => {
  return {
    settings: state.settings, 
  }
} */

const mapDispatchToProps = {
  setTrams,
  setStops,
  setMyStop,
}

export default connect(
  null,
  //mapStateToProps,
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
