import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setTrams } from './reducers/tramsReducer'
import { setShowSidebar } from './reducers/showSidebarReducer'
import { setShowSidebarOpenButton } from './reducers/showSidebarOpenButtonReducer'
import { setStops } from './reducers/stopsReducer'
import { setMyStop } from './reducers/myStopReducer'
import { setShowTrams } from './reducers/showTramsReducer'
import './App.css'
import LeafletMap from './components/LeafletMap'
import Sidebar from './components/Sidebar'
import { Alert, Button } from 'react-bootstrap'
import client , { query } from './utils/client'

 

const App = ({
  setTrams,
  setShowTrams,
  setShowSidebar,
  setShowSidebarOpenButton,
  setStops,
  setMyStop,
}) => {
  
  const [showAlert,setShowAlert] = useState(false)

  useEffect(() => {
    client.query({ query }).then(response => {
      let edges = response.data.stopsByRadius.edges
      let allStops = edges
        .map(edge => edge.node.stop)
        .filter(stop => stop.vehicleType === 0)
      setStops(allStops)
      setMyStop(allStops[0])
      console.log('EDGES: ', edges)
      console.log('STOPIT: ', allStops)
      edges.forEach(edge => {
        console.log('HSL: ', edge.node.stop)
      })
    })
  })

  const update = () => {

    fetch('/trams')
      .then(response => response.json())
      .then(body => {
        setTrams(body)
        setShowTrams(body)
      })
      .catch(error => {
        console.log(error)
      })
  }
 
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
    <div>
      <Alert id='alert' show={showAlert} variant='danger'>
        <br/><br/><br/><br/><br/>      
        <Alert.Heading>How's it going?!</Alert.Heading>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
        <hr />
        <div className='d-flex justify-content-end'>
          <Button onClick={() => setShowAlert(false)} variant='warning'>
            Close me ya'll!
          </Button>
        </div>
      </Alert>
      <Sidebar 
      setShowAlert={setShowAlert}
      closeSidebar={closeSidebar} />
      <LeafletMap openSidebar={openSidebar} closeSidebar={closeSidebar} />
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
  setTrams,
  setShowSidebar,
  setShowSidebarOpenButton,
  setStops,
  setMyStop,
  setShowTrams,
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
