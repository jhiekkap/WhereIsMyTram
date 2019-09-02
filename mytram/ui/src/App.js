import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTrams } from './reducers/tramsReducer'
import { setShowSidebar } from './reducers/showSidebarReducer'
import { setShowSidebarOpenButton } from './reducers/showSidebarOpenButtonReducer'
import { setStops } from './reducers/stopsReducer'
import { setMyStop } from './reducers/myStopReducer'
import './App.css'
import LeafletMap from './components/LeafletMap'
import Sidebar from './components/Sidebar'
import ApolloClient, { gql } from 'apollo-boost' 

const client = new ApolloClient({
  uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'
})

const query = gql`
      {
        stopsByRadius(lat: 60.170627, lon: 24.939946, radius: 300) {
          edges {
            node {
              stop {
                id
                gtfsId
                 name
                lat
                lon 
                vehicleType
              }
            }
          }
        }
      }
      `

 
const App = ({
  setTrams,
  setShowSidebar,
  setShowSidebarOpenButton, 
  setStops, 
  setMyStop
}) => {

  console.log('rendering App!!!!!') 
 
  useEffect(() => {
    
    client.query({ query })
      .then((response) => {
        let edges = response.data.stopsByRadius.edges
        let stopit = edges.map(edge => edge.node.stop).filter(stop => stop.vehicleType === 0)
        setStops(stopit)
        setMyStop(stopit[0])
        console.log('EDGES: ', edges)
        console.log('STOPIT: ', stopit) 
        edges.forEach(edge => {
          console.log('HSL: ', edge.node.stop)
        })
      })
  })

 
  const update = () => {
    //fetch('http://localhost:3001/trams')   
    fetch('/trams')
      .then(response => response.json())
      .then(body => {
        setTrams(body)
      })
      .catch(error => {
        console.log(error)
      })
  }

  //useEffect(() => update(), [new Date()])
  setInterval(() => {
    update()
  }, 1000)

  const openSidebar = () => {
    setShowSidebar(true)
    setShowSidebarOpenButton(false)
    console.log('open!')
  }

  const closeSidebar = () => {
    setShowSidebar(false)
    setTimeout(() => {
      setShowSidebarOpenButton(true)
    }, 300)
    console.log('close!')
  }

  return (
    <div className='App'>
      <Sidebar
        closeSidebar={closeSidebar} 
      />
      <LeafletMap
        openSidebar={openSidebar}
        closeSidebar={closeSidebar} 
      />
    </div>
  )
}

/* const mapStateToProps = state => {
  return {
    stops: state.stops,
    myStop: state.myStop,
  }
} */

const mapDispatchToProps = {
  setTrams, setShowSidebar, setShowSidebarOpenButton, setStops,
  setMyStop
}

export default connect(
 null,
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


