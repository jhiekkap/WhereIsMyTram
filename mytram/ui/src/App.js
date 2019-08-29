import React, { useState, useEffect } from 'react'
import './App.css'
import LeafletMap from './LeafletMap'
import SelectTram from './SelectTram'

const App = () => {
  const [trams, setTrams] = useState([])
  const [showTrams, setShowTrams] = useState([])

  const update = () => {
    fetch('http://localhost:3001/trams')
      .then(response => response.json())
      .then(body => {
        //console.log(body)
        //console.log(new Date())
        setTrams(body)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => update(), [new Date()])

  return (
    <div className='App'>
      <div className='App-header'>
        <h2>Where´s my tram?</h2>
      </div>
      <LeafletMap 
      showTrams={showTrams} 
      setShowTrams={setShowTrams}
      trams={trams}
      />
      <SelectTram 
      trams={trams} 
      showTrams={showTrams}
      setShowTrams={setShowTrams} 
      />
    </div>
  )
}

export default App
